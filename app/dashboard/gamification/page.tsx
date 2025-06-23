import type { Metadata } from "next"
import { GamificationDashboard } from "@/components/gamification-dashboard"

export const metadata: Metadata = {
  title: "Gamification Dashboard",
  description: "Track points, levels, badges, and progress.",
}

export default function GamificationDashboardPage() {
  return (
    <main className="flex flex-col gap-8 p-6">
      <h1 className="text-2xl font-bold">Gamification Dashboard</h1>
      <GamificationDashboard />
    </main>
  )
}
