"use client"

import type React from "react"

import { RetractingDashboard } from "@/components/ui/retracting-dashboard"
import { CelebrityVoiceAIController } from "@/components/ui/celebrity-voice-ai-controller"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RetractingDashboard className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {children}

      {/* Global Voice AI Controller */}
      <CelebrityVoiceAIController />
    </RetractingDashboard>
  )
}
