"use client"

import { useEffect, useRef, useState } from "react"

interface VoiceActivityDetectorProps {
  onVoiceStart: () => void
  onVoiceEnd: () => void
  onVolumeChange: (volume: number) => void
  isEnabled: boolean
  sensitivity?: number
}

export function VoiceActivityDetector({
  onVoiceStart,
  onVoiceEnd,
  onVolumeChange,
  isEnabled,
  sensitivity = 0.01,
}: VoiceActivityDetectorProps) {
  const [isDetecting, setIsDetecting] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isEnabled && !isDetecting) {
      startDetection()
    } else if (!isEnabled && isDetecting) {
      stopDetection()
    }

    return () => {
      stopDetection()
    }
  }, [isEnabled])

  const startDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      streamRef.current = stream
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream)

      analyserRef.current.fftSize = 256
      analyserRef.current.smoothingTimeConstant = 0.8
      microphoneRef.current.connect(analyserRef.current)

      setIsDetecting(true)
      detectVoiceActivity()
    } catch (error) {
      console.error("Error starting voice activity detection:", error)
    }
  }

  const stopDetection = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current)
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
    }

    setIsDetecting(false)
  }

  const detectVoiceActivity = () => {
    if (!analyserRef.current || !isDetecting) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserRef.current.getByteFrequencyData(dataArray)

    // Calculate RMS (Root Mean Square) for volume
    let sum = 0
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i] * dataArray[i]
    }
    const rms = Math.sqrt(sum / bufferLength)
    const volume = rms / 255

    onVolumeChange(volume)

    // Voice activity detection
    if (volume > sensitivity) {
      onVoiceStart()

      // Clear any existing silence timeout
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current)
        silenceTimeoutRef.current = null
      }
    } else {
      // Start silence timeout if not already started
      if (!silenceTimeoutRef.current) {
        silenceTimeoutRef.current = setTimeout(() => {
          onVoiceEnd()
          silenceTimeoutRef.current = null
        }, 1500) // 1.5 seconds of silence
      }
    }

    animationFrameRef.current = requestAnimationFrame(detectVoiceActivity)
  }

  return null // This is a utility component with no UI
}
