"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type SpeechRecognitionType =
  | (typeof window extends never
      ? never
      : window & typeof globalThis & { webkitSpeechRecognition?: any })["SpeechRecognition"]
  | null

export function useVoiceControl() {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionType>(null)

  // Initialise SpeechRecognition once on mount (if the browser supports it)
  useEffect(() => {
    if (typeof window === "undefined") return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition API not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = false
    recognition.continuous = true

    recognition.onend = () => {
      // When the user stops talking, automatically stop-listening state
      setIsListening(false)
    }

    // Placeholder: handle results (you can extend this later).
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("")
      console.log("[VoiceControl] Transcript:", transcript)
      // TODO: parse commands / dispatch actions
    }

    recognitionRef.current = recognition
  }, [])

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return
    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (e) {
      console.error("VoiceControl start error:", e)
    }
  }, [])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return
    recognitionRef.current.stop()
    setIsListening(false)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop?.()
    }
  }, [])

  return { isListening, startListening, stopListening }
}
