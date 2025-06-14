"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Music, Crown, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { imperialAmbient } from "@/lib/imperial-ambient-audio"

interface ImperialAmbientControllerProps {
  autoStart?: boolean
  defaultTrack?: string
  compact?: boolean
  className?: string
}

export function ImperialAmbientController({
  autoStart = false,
  defaultTrack = "throne-room",
  compact = false,
  className = "",
}: ImperialAmbientControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(30)
  const [currentTrack, setCurrentTrack] = useState(defaultTrack)
  const [isExpanded, setIsExpanded] = useState(!compact)
  const [availableTracks, setAvailableTracks] = useState<any[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize available tracks
    setAvailableTracks(imperialAmbient.getAvailableTracks())

    // Auto-start if requested
    if (autoStart && !isInitialized) {
      handlePlay()
      setIsInitialized(true)
    }
  }, [autoStart, isInitialized])

  const handlePlay = async () => {
    try {
      await imperialAmbient.startAmbientMusic(currentTrack)
      imperialAmbient.setVolume(volume / 100)
      imperialAmbient.fadeIn(2000)
      setIsPlaying(true)
    } catch (error) {
      console.error("Failed to start imperial ambient music:", error)
    }
  }

  const handlePause = () => {
    imperialAmbient.fadeOut(1000)
    setIsPlaying(false)
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0]
    setVolume(vol)
    imperialAmbient.setVolume(vol / 100)
  }

  const handleTrackChange = (trackId: string) => {
    setCurrentTrack(trackId)
    if (isPlaying) {
      imperialAmbient.switchTrack(trackId, 3000)
    }
  }

  const toggleMute = () => {
    if (volume > 0) {
      imperialAmbient.setVolume(0)
      setVolume(0)
    } else {
      const newVolume = 30
      setVolume(newVolume)
      imperialAmbient.setVolume(newVolume / 100)
    }
  }

  const currentTrackInfo = availableTracks.find((track) => track.id === currentTrack)

  if (compact && !isExpanded) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Card className="bg-black/80 backdrop-blur-md border-yellow-500/30 shadow-2xl">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={isPlaying ? handlePause : handlePlay}
                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <div className="flex items-center gap-1">
                <Music className="h-3 w-3 text-yellow-400" />
                {isPlaying && (
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-3 bg-yellow-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(true)}
                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`${compact ? "fixed bottom-4 right-4 z-50" : ""} ${className}`}>
      <Card className="bg-black/80 backdrop-blur-md border-yellow-500/30 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Imperial Ambient
            </CardTitle>
            {compact && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsExpanded(false)}
                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          </div>
          {currentTrackInfo && (
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                <Sparkles className="w-3 h-3 mr-1" />
                {currentTrackInfo.name}
              </Badge>
              {isPlaying && <Badge className="bg-green-500/20 text-green-300 border-green-400/30">Playing</Badge>}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <Button
              onClick={isPlaying ? handlePause : handlePlay}
              className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30"
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>

            <div className="flex items-center gap-2 flex-1">
              <Button size="sm" variant="ghost" onClick={toggleMute} className="text-yellow-400 hover:text-yellow-300">
                {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>

              <Slider value={[volume]} onValueChange={handleVolumeChange} max={100} step={1} className="flex-1" />

              <span className="text-xs text-yellow-300/70 w-8">{volume}%</span>
            </div>
          </div>

          {/* Track Selection */}
          <div className="space-y-2">
            <div className="text-sm text-yellow-300/80 font-medium">Ambient Tracks:</div>
            <div className="grid grid-cols-1 gap-2">
              {availableTracks.map((track) => (
                <Button
                  key={track.id}
                  variant="ghost"
                  onClick={() => handleTrackChange(track.id)}
                  className={`justify-start text-left h-auto p-3 ${
                    currentTrack === track.id
                      ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                      : "text-yellow-400/70 hover:text-yellow-300 hover:bg-yellow-500/10"
                  }`}
                >
                  <div>
                    <div className="font-medium">{track.name}</div>
                    <div className="text-xs opacity-70">{track.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Audio Visualizer */}
          {isPlaying && (
            <div className="flex items-center justify-center gap-1 py-2">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-yellow-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Status */}
          <div className="text-center">
            <p className="text-xs text-yellow-300/60">
              {isPlaying ? "🎵 Imperial ambience active" : "⏸️ Ambient music paused"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
