"use client"

import { BadgeProgressionProvider } from "@/contexts/badge-progression-context"
import { ProgressionDashboard } from "@/components/branding/progression-dashboard"

export default function AuthorityProgressionPage() {
  return (
    <BadgeProgressionProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4">
              Authority Progression System
            </h1>
            <p className="text-2xl italic font-serif text-amber-300/70 mb-6">Systema Progressionis Auctoritatis</p>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Advance through the ranks of the Supreme Authority by completing missions, unlocking achievements, and
              demonstrating your worthiness to wield greater power in the global governance structure.
            </p>
          </div>

          {/* Main Dashboard */}
          <ProgressionDashboard />
        </div>
      </div>
    </BadgeProgressionProvider>
  )
}
