"use client"

import { ImperialAIChat } from "@/components/ai/imperial-ai-chat"
import { VoiceCommandCenter } from "@/components/ai/voice-command-center"
import { WolfConversationEngine } from "@/components/ai/wolf-conversation-engine"
import { EnhancedVoiceEngine } from "@/components/ai/enhanced-voice-engine"

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-red-950 to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-300 mb-4 font-serif">Real AI Voice Command Center</h1>
          <p className="text-xl text-red-200">Leonardo's Digital Twin with REAL Human Voice!</p>
          <div className="mt-4 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-400/30 max-w-2xl mx-auto">
            <p className="text-green-300 font-medium">
              🎤 Powered by ElevenLabs AI Voice Technology - Get your free API key at elevenlabs.io
            </p>
          </div>
        </div>

        {/* AI Chat Interface with Real Voice */}
        <ImperialAIChat />

        {/* Enhanced Voice Engine */}
        <EnhancedVoiceEngine />

        {/* Voice Command Center */}
        <VoiceCommandCenter />

        {/* Wolf Conversation Engine */}
        <WolfConversationEngine />
      </div>
    </div>
  )
}
