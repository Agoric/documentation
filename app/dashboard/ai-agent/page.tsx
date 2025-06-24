"use client"

import { SupremeAIAgentDashboard } from "@/components/ai/supreme-ai-agent-dashboard"
import { AIAgentAutomationProvider } from "@/contexts/ai-agent-automation-context"
import { AISightNavigationProvider } from "@/contexts/ai-sight-navigation-context"

export default function AIAgentPage() {
  return (
    <AISightNavigationProvider>
      <AIAgentAutomationProvider>
        <div className="min-h-screen bg-gradient-to-br from-royal-50 to-royal-100">
          <div className="container mx-auto px-4 py-8">
            <SupremeAIAgentDashboard />
          </div>
        </div>
      </AIAgentAutomationProvider>
    </AISightNavigationProvider>
  )
}
