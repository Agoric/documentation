"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

export const WolfVoiceEngine = forwardRef<any, {}>((props, ref) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [voiceSettings, setVoiceSettings] = useState<WolfVoiceSettings>({
    enabled: true,
    volume: 0.8,
    playbackRate: 1.1,
    pitch: 0.9,
    useWolfSample: true,
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [wolfSampleBuffer, setWolfSampleBuffer] = useState<AudioBuffer | null>(null)

  const synthRef = useRef<SpeechSynthesis | null>(null)

  useImperativeHandle(ref, () => ({
    speakWithWolfPersonality: (text: string) => speakWithWolfPersonality(text),
  }))

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)
      synthRef.current = window.speechSynthesis

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
      playWolfSample()

      setTimeout(() => {
        speakWithSynthesis(text)
      }, 1500)
    } else {
      speakWithSynthesis(text)
    }
  }

  const speakWithSynthesis = (text: string) => {
    if (!synthRef.current) return

    synthRef.current.cancel()

    const wolfText = processTextForWolf(text)
    const utterance = new SpeechSynthesisUtterance(wolfText)

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

    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    synthRef.current.speak(utterance)
    setIsPlaying(true)
  }

  const processTextForWolf = (text: string): string => {
    return text
      .replace(/money/gi, "MONEY")
      .replace(/success/gi, "SUCCESS")
      .replace(/win/gi, "WIN")
      .replace(/champion/gi, "CHAMPION")
      .replace(/\./g, "... ")
      .replace(/!/g, "!")
      .replace(/\?/g, "?")
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
    <div className="fixed bottom-6 left-34 z-40">
      <AnimatePresence>
        {!isExpanded ? (
          // Retracted State - Floating Orb
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
            className="relative cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 shadow-2xl flex items-center justify-center ${
                isPlaying ? "shadow-amber-500/50" : ""
              }`}
              animate={
                isPlaying
                  ? {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 20px rgba(245, 158, 11, 0.5)",
                        "0 0 40px rgba(249, 115, 22, 0.7)",
                        "0 0 20px rgba(245, 158, 11, 0.5)",
                      ],
                    }
                  : {
                      boxShadow: [
                        "0 0 15px rgba(245, 158, 11, 0.3)",
                        "0 0 25px rgba(249, 115, 22, 0.5)",
                        "0 0 15px rgba(245, 158, 11, 0.3)",
                      ],
                    }
              }
              transition={
                isPlaying
                  ? { repeat: Number.POSITIVE_INFINITY, duration: 1 }
                  : { repeat: Number.POSITIVE_INFINITY, duration: 3 }
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="w-5 h-5 text-white" />
            </motion.div>

            {/* Status indicators */}
            <div className="absolute -top-1 -right-1">
              {isPlaying && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  className="w-3 h-3 bg-amber-400 rounded-full"
                />
              )}
            </div>

            {/* Tooltip */}
            <motion.div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 bg-gradient-to-r from-amber-900/95 to-orange-900/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-amber-400/30"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2">
                <Crown className="w-3 h-3" />
                <span>Wolf Voice</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-900/95"></div>
            </motion.div>

            {/* Quick controls */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  setVoiceSettings((prev) => ({ ...prev, enabled: !prev.enabled }))
                }}
                className={`w-8 h-8 p-0 rounded-full ${
                  voiceSettings.enabled ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {voiceSettings.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </motion.div>
        ) : (
          // Expanded State - Full Interface
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20, transition: { duration: 0.3 } }}
            className="w-80"
          >
            <Card className="bg-gradient-to-br from-amber-900/95 to-orange-900/95 backdrop-blur-xl border-amber-400/30">
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
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsExpanded(false)}
                      className="w-8 h-8 p-0 text-amber-400"
                    >
                      ×
                    </Button>
                  </div>
                </div>

                {/* Wolf Sample Status */}
                <div className="mb-4 p-3 bg-gradient-to-r from-amber-800/30 to-orange-800/30 rounded-lg border border-amber-400/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-amber-300 font-medium">Authentic Wolf Sample</div>
                      <div className="text-xs text-amber-400">
                        {wolfSampleBuffer ? "✅ Loaded & Ready" : "⏳ Loading..."}
                      </div>
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
                      onChange={(e) =>
                        setVoiceSettings((prev) => ({ ...prev, volume: Number.parseFloat(e.target.value) }))
                      }
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
                      onChange={(e) =>
                        setVoiceSettings((prev) => ({ ...prev, pitch: Number.parseFloat(e.target.value) }))
                      }
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

WolfVoiceEngine.displayName = "WolfVoiceEngine"
