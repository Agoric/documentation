"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RoyalDiamondSlabCard } from "@/components/ui/royal-diamond-slab-card"
import { DiamondParticleSystem } from "@/components/ui/diamond-particle-system"
import { LaserEngravedText } from "@/components/ui/laser-engraved-text"
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <DiamondParticleSystem />

      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Main 404 Card */}
        <RoyalDiamondSlabCard className="mb-8 p-8 backdrop-blur-xl bg-black/20 border border-purple-500/30">
          <div className="space-y-6">
            {/* 404 Number with Holographic Effect */}
            <div className="relative">
              <LaserEngravedText
                text="404"
                className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              />
              <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-purple-500/20 blur-sm">404</div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Page Not Found</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                The page you're looking for seems to have vanished into the digital void. Don't worry, even the most
                sophisticated financial platforms have their mysteries.
              </p>
            </div>

            {/* Navigation Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Link href="/">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  <Home className="w-5 h-5 mr-2" />
                  Return Home
                </Button>
              </Link>

              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </RoyalDiamondSlabCard>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/credit-suite">
            <RoyalDiamondSlabCard className="p-4 hover:scale-105 transition-all duration-300 cursor-pointer bg-black/10 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold">Credit Suite</h3>
                <p className="text-gray-400 text-sm">Monitor your credit</p>
              </div>
            </RoyalDiamondSlabCard>
          </Link>

          <Link href="/real-estate">
            <RoyalDiamondSlabCard className="p-4 hover:scale-105 transition-all duration-300 cursor-pointer bg-black/10 backdrop-blur-sm border border-green-500/30 hover:border-green-400/50">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold">Real Estate</h3>
                <p className="text-gray-400 text-sm">Browse properties</p>
              </div>
            </RoyalDiamondSlabCard>
          </Link>

          <Link href="/investors/portal">
            <RoyalDiamondSlabCard className="p-4 hover:scale-105 transition-all duration-300 cursor-pointer bg-black/10 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold">Investor Portal</h3>
                <p className="text-gray-400 text-sm">Investment opportunities</p>
              </div>
            </RoyalDiamondSlabCard>
          </Link>
        </div>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Lost in the financial cosmos? Our <span className="text-purple-400 font-semibold">Genius Guide Orb</span> is
            here to help navigate you back to prosperity.
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40" />
      <div className="absolute bottom-32 left-16 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-50" />
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60" />
    </div>
  )
}
