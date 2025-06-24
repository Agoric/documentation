import { GeniusAIConcierge } from "@/components/snapifi/genius-ai-concierge"

export default function AIConcierge() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Genius AI Concierge</h1>
        <p className="text-muted-foreground">
          Your personal financial assistant powered by quantum computing and machine learning
        </p>
      </div>

      <div className="max-w-4xl">
        <GeniusAIConcierge />
      </div>
    </div>
  )
}
