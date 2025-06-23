"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Main dashboard component for the Gamification view.
 * Exposed as BOTH a named and default export so it can be imported either way:
 *   import { GamificationDashboard } from '@/components/gamification-dashboard'
 *   import GamificationDashboard from '@/components/gamification-dashboard'
 */
export function GamificationDashboard() {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Example dashboard cards – replace with real data/metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Points Earned</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">4,230</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Level</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">7</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold">12</CardContent>
      </Card>
    </section>
  )
}

/* Default export mirrors the named export for convenience */
export default GamificationDashboard
