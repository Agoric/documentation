"use client"

import { ImperialAIChat } from "@/components/ai/imperial-ai-chat"
import { VoiceCommandCenter } from "@/components/ai/voice-command-center"

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-300 mb-4 font-serif">Imperial AI Command Center</h1>
          <p className="text-xl text-purple-200">Experience the future of voice-enabled digital sovereignty</p>
        </div>

        {/* AI Chat Interface */}
        <ImperialAIChat />

        {/* Voice Command Center */}
        <VoiceCommandCenter />
      </div>
    </div>
  )
}
