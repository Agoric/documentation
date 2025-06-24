"use client"

import { Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

/**
 * A very small, self-contained overlay that indicates
 * whether the microphone is listening.
 *
 * Extend this later with transcription, commands, etc.
 */
export function VoiceControlInterface() {
  const [isListening, setIsListening] = useState(true)

  return (
    <button
      aria-label={isListening ? "Stop listening" : "Start listening"}
      onClick={() => setIsListening(!isListening)}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center",
        "justify-center rounded-full shadow-lg transition-colors",
        isListening
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-slate-100",
      )}
    >
      {isListening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
    </button>
  )
}
