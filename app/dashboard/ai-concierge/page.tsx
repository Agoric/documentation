import type { Metadata } from "next"
import AIConciergeClient from "./AIConciergeClient"

export const metadata: Metadata = {
  title: "AI Concierge",
  description: "Your personal AI assistant for financial insights and guidance",
}

export default function AIConciergeSettingsPage() {
  return <AIConciergeClient />
}
