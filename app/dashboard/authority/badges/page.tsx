"use client"

import { HolographicBadgeSystem } from "@/components/branding/holographic-badge-system"
import { SupremeAuthorityBadgeCollection } from "@/components/branding/supreme-authority-shields"

export default function AuthorityBadgesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4">
            Supreme Authority Insignia System
          </h1>
          <p className="text-2xl italic font-serif text-amber-300/70 mb-6">Systema Insignium Auctoritatis Supremae</p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Holographic projection shields and badges representing the eternal longevity of the Supreme Authority reign
            over global checks and balance. Each insignia embodies a specific ideological classification within the
            supreme governance structure.
          </p>
        </div>

        {/* User Badge System */}
        <HolographicBadgeSystem userIdeology="sovereign" userTier="master" showCollection={true} />

        {/* Complete Badge Collection */}
        <SupremeAuthorityBadgeCollection />

        {/* Authority Hierarchy */}
        <div className="bg-gradient-to-br from-black/40 to-amber-900/20 rounded-lg p-8 backdrop-blur-sm border border-amber-400/20">
          <h2 className="text-3xl font-bold text-amber-400 mb-6 text-center">Supreme Authority Hierarchy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { tier: "initiate", roman: "I", description: "Foundation Level" },
              { tier: "adept", roman: "II", description: "Specialized Training" },
              { tier: "master", roman: "III", description: "Leadership Authority" },
              { tier: "grandmaster", roman: "IV", description: "Strategic Command" },
              { tier: "supreme", roman: "V", description: "Absolute Authority" },
            ].map((level) => (
              <div key={level.tier} className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">{level.roman}</div>
                <div className="text-lg font-semibold text-amber-300 capitalize mb-2">{level.tier}</div>
                <div className="text-sm text-gray-400">{level.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
