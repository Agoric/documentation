"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

// 🟢 Lazy-import so we don’t even parse the voice library unless we have a mic.
async function loadVoiceSystem() {
  const mod = await import("@/lib/enhanced-genius-voice-system")
  return mod.EnhancedGeniusVoiceSystem as {
    startVoiceAnalysis: (stream: MediaStream) => Promise<void>
    stopVoiceAnalysis: () => void
  }
}

/** Ask the user for a microphone and return the stream (or throw). */
async function getMicrophone() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Your browser does not support audio capture.")
  }
  return navigator.mediaDevices.getUserMedia({ audio: true })
}

export default function EnhancedGeniusGuideOrb() {
  const [status, setStatus] = useState<"idle" | "running" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let voiceSystem: { stopVoiceAnalysis: () => void } | null = null

    async function init() {
      try {
        // 1️⃣ Ask for mic permission first
        const stream = await getMicrophone()

        // 2️⃣ Dynamically import the heavy voice engine
        const GeniusVoice = await loadVoiceSystem()

        // 3️⃣ Start analysis
        await GeniusVoice.startVoiceAnalysis(stream)
        voiceSystem = GeniusVoice
        setStatus("running")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error while starting voice analysis")
        setStatus("error")
      }
    }

    init()

    // Cleanup when the component unmounts
    return () => {
      voiceSystem?.stopVoiceAnalysis?.()
    }
  }, [])

  if (status === "error") {
    return (
      <Alert variant="destructive" className="max-w-md">
        <AlertTitle>Voice analysis failed</AlertTitle>
        <AlertDescription className="whitespace-pre-wrap">{error}</AlertDescription>
        <Button
          className="mt-4"
          onClick={() => {
            // Try again
            setStatus("idle")
            setError(null)
          }}
        >
          Retry
        </Button>
      </Alert>
    )
  }

  return (
    <div className="flex items-center justify-center">
      {status === "running" ? (
        <span className="animate-pulse text-brand-600">🔊 Listening…</span>
      ) : (
        <span className="text-gray-500">Requesting microphone…</span>
      )}
    </div>
  )
}
