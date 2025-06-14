"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff, Volume2, VolumeX, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VoiceProfile {
  id: string
  name: string
  description: string
  accent: string
  tone: string
}

const voiceProfiles: VoiceProfile[] = [
  {
    id: "morgan-freeman",
    name: "Morgan Freeman",
    description: "Authoritative & Wise",
    accent: "American",
    tone: "Deep & Calming",
  },
  {
    id: "david-attenborough",
    name: "David Attenborough",
    description: "Documentary Narrator",
    accent: "British",
    tone: "Educational & Engaging",
  },
  {
    id: "james-earl-jones",
    name: "James Earl Jones",
    description: "Commanding Presence",
    accent: "American",
    tone: "Powerful & Resonant",
  },
  {
    id: "helen-mirren",
    name: "Helen Mirren",
    description: "Sophisticated & Elegant",
    accent: "British",
    tone: "Refined & Articulate",
  },
]

export function CelebrityVoiceAIController() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [selectedVoice, setSelectedVoice] = useState("morgan-freeman")
  const [volume, setVolume] = useState([75])
  const [speed, setSpeed] = useState([100])
  const [isConnected, setIsConnected] = useState(true)

  // Simulate connection status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(Math.random() > 0.1) // 90% uptime simulation
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleListening = () => {
    setIsListening(!isListening)
  }

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking)
  }

  const selectedProfile = voiceProfiles.find((v) => v.id === selectedVoice)

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg border border-purple-400/30"
        >
          <Mic className="w-6 h-6" />
        </Button>
        {isConnected && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 bg-black/90 border border-purple-500/30 backdrop-blur-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white">Voice AI Assistant</span>
              <Badge variant="outline" className="text-xs border-purple-400/50 text-purple-300">
                {isConnected ? "ONLINE" : "OFFLINE"}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </Button>
          </div>

          {/* Voice Profile Selection */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 mb-2 block">Voice Profile</label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger className="bg-gray-900/50 border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {voiceProfiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{profile.name}</span>
                      <span className="text-xs text-gray-400">{profile.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Current Voice Info */}
          {selectedProfile && (
            <div className="mb-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-purple-300">{selectedProfile.name}</span>
                <Badge variant="outline" className="text-xs border-purple-400/50 text-purple-300">
                  {selectedProfile.accent}
                </Badge>
              </div>
              <p className="text-xs text-gray-400">{selectedProfile.tone}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-2 mb-4">
            <Button
              onClick={toggleListening}
              className={`flex-1 ${isListening ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
            >
              {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isListening ? "Stop" : "Listen"}
            </Button>
            <Button
              onClick={toggleSpeaking}
              variant="outline"
              className={`flex-1 border-gray-700 ${isSpeaking ? "bg-blue-600 hover:bg-blue-700" : ""}`}
            >
              {isSpeaking ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isSpeaking ? "Pause" : "Speak"}
            </Button>
          </div>

          {/* Volume Control */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-400">Volume</label>
              <span className="text-xs text-gray-400">{volume[0]}%</span>
            </div>
            <div className="flex items-center gap-2">
              <VolumeX className="w-4 h-4 text-gray-400" />
              <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
              <Volume2 className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Speed Control */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-400">Speech Speed</label>
              <span className="text-xs text-gray-400">{speed[0]}%</span>
            </div>
            <Slider value={speed} onValueChange={setSpeed} min={50} max={200} step={10} className="flex-1" />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Status: {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Ready"}</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
              <span>{isConnected ? "Connected" : "Disconnected"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
