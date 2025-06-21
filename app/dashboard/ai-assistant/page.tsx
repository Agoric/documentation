"use client"

import { ImperialAIChat } from "@/components/ai/imperial-ai-chat"
import { VoiceCommandCenter } from "@/components/ai/voice-command-center"
import { WolfConversationEngine } from "@/components/ai/wolf-conversation-engine"

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-red-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-300 mb-4 font-serif">AI Wolf Command Center</h1>
          <p className="text-xl text-red-200">Leonardo's Digital Twin - Ready to Make You RICH!</p>
          <div className="mt-4 p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-lg border border-red-400/30 max-w-2xl mx-auto">
            <p className="text-amber-300 font-medium">
              "I want you to deal with your problems by becoming RICH!" - AI Leonardo
            </p>
          </div>
        </div>

        {/* AI Chat Interface */}
        <ImperialAIChat />

        {/* Voice Command Center */}
        <VoiceCommandCenter />

        {/* Wolf Conversation Engine */}
        <WolfConversationEngine />
      </div>
    </div>
  )
}
