"use client"

import type React from "react"
import { ImperiumStatusBar } from "@/components/navigation/imperium-status-bar"
import { FuturisticCommandCenter } from "@/components/navigation/futuristic-command-center"
import { ImperialAIChat } from "@/components/ai/imperial-ai-chat"
import { VoiceCommandCenter } from "@/components/ai/voice-command-center"
import { NeuralBackgroundEffects } from "@/components/effects/neural-background-effects"

interface ImperiumLayoutProps {
  children: React.ReactNode
}

export function ImperiumLayout({ children }: ImperiumLayoutProps) {
  return (
    <div className="min-h-screen relative">
      {/* Neural Background Effects */}
      <NeuralBackgroundEffects />

      {/* Status Bar */}
      <ImperiumStatusBar />

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Navigation Systems */}
      <FuturisticCommandCenter />

      {/* AI Assistant */}
      <ImperialAIChat />

      {/* Voice Command Center */}
      <VoiceCommandCenter />
    </div>
  )
}
