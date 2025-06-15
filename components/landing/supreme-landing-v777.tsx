"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HolographicNavbar } from "./holographic-navbar"
import { HolographicHero } from "./holographic-hero"
import { FeatureShowcase } from "./feature-showcase"
import { PlatformBenefits } from "./platform-benefits"
import { TestimonialShowcase } from "./testimonial-showcase"
import { HolographicCTA } from "./holographic-cta"
import { HolographicFooter } from "./holographic-footer"
import { SequentialLandingFlow } from "./sequential-landing-flow"
import { NonprofitMissionShowcase } from "./nonprofit-mission-showcase"
import { ProductRealmEnvironments } from "./product-realm-environments"
import { EconomicBenefitsSection } from "./economic-benefits-section"
import { DonationCallToAction } from "./donation-call-to-action"
import { PlatformEnrollmentFlow } from "./platform-enrollment-flow"
import { ImperialAmbientController } from "@/components/ui/imperial-ambient-controller"
import { PlatformTaglineBanner } from "@/components/ui/platform-tagline-banner"

export function SupremeLandingV777() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const sections = [
    { id: "hero", component: HolographicHero },
    { id: "mission", component: NonprofitMissionShowcase },
    { id: "features", component: FeatureShowcase },
    { id: "benefits", component: PlatformBenefits },
    { id: "economic", component: EconomicBenefitsSection },
    { id: "realms", component: ProductRealmEnvironments },
    { id: "testimonials", component: TestimonialShowcase },
    { id: "enrollment", component: PlatformEnrollmentFlow },
    { id: "donation", component: DonationCallToAction },
    { id: "cta", component: HolographicCTA },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Platform Tagline Banner */}
      <PlatformTaglineBanner
        version="777"
        tagline="Decentralized Banking • Democratized Wealth • Supreme Authority"
        showVersion={true}
        imperial={true}
      />

      {/* Navigation */}
      <HolographicNavbar />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {/* Sequential Landing Flow */}
            <SequentialLandingFlow sections={sections} />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <HolographicFooter />

      {/* Imperial Ambient Controller */}
      <ImperialAmbientController autoStart={true} defaultTrack="imperial-march" compact={true} />
    </div>
  )
}
