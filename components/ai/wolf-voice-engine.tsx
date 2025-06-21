"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, VolumeX, Play, Pause, Zap, Crown } from "lucide-react"

interface WolfVoiceSettings {
  enabled: boolean
  volume: number
  playbackRate: number
  pitch: number
  useWolfSample: boolean
}

export function WolfVoiceEngine() {
  const [voiceSettings, setVoiceSettings] = useState<WolfVoiceSettings>({
    enabled: true,
    volume: 0.8,
    playbackRate: 1.1, // Slightly faster for energy
    pitch: 0.9, // Slightly lower for authority
    useWolfSample: true,
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [wolfSampleBuffer, setWolfSampleBuffer] = useState<AudioBuffer | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    // Initialize audio context for advanced audio processing
    if (typeof window !== "undefined") {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)
      synthRef.current = window.speechSynthesis

      // Load Wolf voice sample
      loadWolfSample()
    }

    return () => {
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [])

  const loadWolfSample = async () => {
    try {
      const response = await fetch("/audio/wolf-voice-sample.mp3")
      const arrayBuffer = await response.arrayBuffer()

      if (audioContext) {
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        setWolfSampleBuffer(audioBuffer)
      }
    } catch (error) {
      console.error("Failed to load Wolf voice sample:", error)
    }
  }

  const playWolfSample = () => {
    if (!audioContext || !wolfSampleBuffer || !voiceSettings.enabled) return

    try {
      const source = audioContext.createBufferSource()
      const gainNode = audioContext.createGain()

      source.buffer = wolfSampleBuffer
      source.playbackRate.value = voiceSettings.playbackRate
      gainNode.gain.value = voiceSettings.volume

      source.connect(gainNode)
      gainNode.connect(audioContext.destination)

      source.onended = () => setIsPlaying(false)

      source.start(0)
      setIsPlaying(true)
    } catch (error) {
      console.error("Error playing Wolf sample:", error)
      setIsPlaying(false)
    }
  }

  const speakWithWolfPersonality = async (text: string) => {
    if (!voiceSettings.enabled) return

    if (voiceSettings.useWolfSample && wolfSampleBuffer) {
      // Play the authentic Wolf sample first for personality
      playWolfSample()

      // Then speak the text with Wolf-like characteristics
      setTimeout(() => {
        speakWithSynthesis(text)
      }, 1500) // Delay to let sample play first
    } else {
      speakWithSynthesis(text)
    }
  }

  const speakWithSynthesis = (text: string) => {
    if (!synthRef.current) return

    synthRef.current.cancel()

    // Process text for Wolf-like delivery
    const wolfText = processTextForWolf(text)

    const utterance = new SpeechSynthesisUtterance(wolfText)

    // Select best available voice for Wolf personality
    const voices = synthRef.current.getVoices()
    const wolfVoice =
      voices.find((voice) => voice.name.includes("Google US English Male")) ||
      voices.find((voice) => voice.name.includes("Microsoft David")) ||
      voices.find((voice) => voice.name.includes("Alex")) ||
      voices.find((voice) => voice.lang.startsWith("en-US")) ||
      voices[0]

    if (wolfVoice) {
      utterance.voice = wolfVoice
    }

    utterance.rate = voiceSettings.playbackRate
    utterance.pitch = voiceSettings.pitch
    utterance.volume = voiceSettings.volume

    // Add Wolf-like emphasis and pauses
    utterance.onboundary = (event) => {
      if (event.name === "word" && Math.random() < 0.1) {
        // Occasionally add slight pauses for dramatic effect
        setTimeout(() => {}, 50)
      }
    }

    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    synthRef.current.speak(utterance)
    setIsPlaying(true)
  }

  const processTextForWolf = (text: string): string => {
    // Add Wolf of Wall Street personality to text
    return text
      .replace(/money/gi, "MONEY")
      .replace(/success/gi, "SUCCESS")
      .replace(/win/gi, "WIN")
      .replace(/champion/gi, "CHAMPION")
      .replace(/\./g, "... ") // Add dramatic pauses
      .replace(/!/g, "!") // Keep exclamations strong
      .replace(/\?/g, "?") // Keep questions natural
  }

  const wolfQuotes = [
    "I'm not fucking leaving! The show goes on!",
    "Money doesn't sleep, pal!",
    "The only thing standing between you and your goal is the story you keep telling yourself!",
    "Act as if! Act as if you're a wealthy man, rich already!",
    "I want you to deal with your problems by becoming rich!",
    "The name of the game, moving the money from the client's pocket to your pocket!",
    "There's no nobility in poverty. I've been a poor man, and I've been a rich man. And I choose rich every fucking time!",
  ]

  const playRandomWolfQuote = () => {
    const randomQuote = wolfQuotes[Math.floor(Math.random() * wolfQuotes.length)]
    speakWithWolfPersonality(randomQuote)
  }

  return (
    <div className="fixed top-20 right-6 z-40">
      <Card className="w-80 bg-gradient-to-br from-amber-900/95 to-orange-900/95 backdrop-blur-xl border-amber-400/30">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-bold">Wolf Voice Engine</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-400/30 text-xs">LEONARDO</Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setVoiceSettings((prev) => ({ ...prev, enabled: !prev.enabled }))}
                className={`w-8 h-8 p-0 ${voiceSettings.enabled ? "text-green-400" : "text-gray-400"}`}
              >
                {voiceSettings.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Wolf Sample Status */}
          <div className="mb-4 p-3 bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-lg border border-amber-400/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-amber-300 font-medium">Authentic Wolf Sample</div>
                <div className="text-xs text-amber-400">{wolfSampleBuffer ? "✅ Loaded & Ready" : "⏳ Loading..."}</div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setVoiceSettings((prev) => ({ ...prev, useWolfSample: !prev.useWolfSample }))}
                className={`${voiceSettings.useWolfSample ? "text-green-400" : "text-gray-400"}`}
              >
                {voiceSettings.useWolfSample ? "ON" : "OFF"}
              </Button>
            </div>
          </div>

          {/* Voice Controls */}
          <div className="space-y-3 mb-4">
            <div>
              <div className="text-sm text-amber-300 mb-1">Volume</div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceSettings.volume}
                onChange={(e) => setVoiceSettings((prev) => ({ ...prev, volume: Number.parseFloat(e.target.value) }))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="text-sm text-amber-300 mb-1">Speed ({voiceSettings.playbackRate.toFixed(1)}x)</div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.playbackRate}
                onChange={(e) =>
                  setVoiceSettings((prev) => ({ ...prev, playbackRate: Number.parseFloat(e.target.value) }))
                }
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="text-sm text-amber-300 mb-1">Pitch ({voiceSettings.pitch.toFixed(1)})</div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.pitch}
                onChange={(e) => setVoiceSettings((prev) => ({ ...prev, pitch: Number.parseFloat(e.target.value) }))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Test Buttons */}
          <div className="space-y-2 mb-4">
            <Button
              onClick={playWolfSample}
              disabled={!voiceSettings.enabled || !wolfSampleBuffer || isPlaying}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
            >
              {isPlaying ? (
                <div className="flex items-center space-x-2">
                  <Pause className="w-4 h-4" />
                  <span>Playing Wolf Sample...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Play Authentic Wolf Voice</span>
                </div>
              )}
            </Button>

            <Button
              onClick={playRandomWolfQuote}
              disabled={!voiceSettings.enabled || isPlaying}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
            >
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Random Wolf Quote</span>
              </div>
            </Button>
          </div>

          {/* Wolf Personality Indicators */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <div className="text-amber-400 font-bold">🎬</div>
              <div className="text-amber-300">Leonardo</div>
            </div>
            <div className="text-center">
              <div className="text-orange-400 font-bold">💰</div>
              <div className="text-orange-300">Wall Street</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 font-bold">🔥</div>
              <div className="text-red-300">High Energy</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">👑</div>
              <div className="text-yellow-300">Authority</div>
            </div>
          </div>

          {/* Status */}
          {isPlaying && (
            <div className="mt-4 p-2 bg-green-900/20 border border-green-400/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-green-300 text-sm">Wolf Voice Active</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
