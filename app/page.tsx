import { CaprelliImperialHeader } from "@/components/ui/caprelli-imperial-header"
import { HumanitarianMissionBanner } from "@/components/ui/humanitarian-mission-banner"
import { ImperialCard } from "@/components/ui/imperial-card"
import { ImperialThemeProvider } from "@/components/ui/imperial-theme-provider"
import { HolographicNavbar } from "@/components/landing/holographic-navbar"
import { HolographicHero } from "@/components/landing/holographic-hero"
import { FeatureShowcase } from "@/components/landing/feature-showcase"
import { PlatformBenefits } from "@/components/landing/platform-benefits"
import { HolographicCTA } from "@/components/landing/holographic-cta"
import { TestimonialShowcase } from "@/components/landing/testimonial-showcase"
import { HolographicFooter } from "@/components/landing/holographic-footer"
import { InteractiveProductDemo } from "@/components/landing/interactive-product-demo"
import { GCMIdentificationSystem } from "@/components/global-citizen/gcm-identification-system"
import { Crown, Shield, Globe, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <ImperialThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <HolographicNavbar />

        {/* Imperial Header */}
        <CaprelliImperialHeader />

        {/* Humanitarian Mission */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <HumanitarianMissionBanner />
          </div>
        </section>

        {/* GCM System with Imperial Styling */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
                Imperial Citizenship Registry
              </h2>
              <p className="text-yellow-200 text-lg max-w-3xl mx-auto">
                Join the sovereign digital nation under the Caprelli Imperial Authority. Your path to global economic
                citizenship begins here.
              </p>
            </div>
            <GCMIdentificationSystem />
          </div>
        </section>

        {/* Imperial Platform Features */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
                Imperial Digital Dominion
              </h2>
              <p className="text-yellow-200 text-lg">
                Command the future of global economics through sovereign digital authority
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ImperialCard
                title="Supreme Authority"
                icon={<Crown className="w-5 h-5 text-yellow-400" />}
                variant="gold"
              >
                <p className="text-yellow-100">
                  Exercise sovereign control over your digital economic empire with imperial-grade security and
                  authority.
                </p>
              </ImperialCard>

              <ImperialCard
                title="Global Protection"
                icon={<Shield className="w-5 h-5 text-blue-400" />}
                variant="bronze"
              >
                <p className="text-blue-100">
                  Your assets are protected by quantum-secured vaults and the full authority of the Caprelli
                  jurisdiction.
                </p>
              </ImperialCard>

              <ImperialCard
                title="Humanitarian Impact"
                icon={<Globe className="w-5 h-5 text-green-400" />}
                variant="humanitarian"
              >
                <p className="text-green-100">
                  Every transaction contributes to global prosperity initiatives, elevating humanity through economic
                  empowerment.
                </p>
              </ImperialCard>

              <ImperialCard
                title="Digital Innovation"
                icon={<Zap className="w-5 h-5 text-purple-400" />}
                variant="silver"
              >
                <p className="text-purple-100">
                  Harness cutting-edge technology that serves humanity while maintaining the dignity of imperial
                  leadership.
                </p>
              </ImperialCard>
            </div>
          </div>
        </section>

        <HolographicHero />
        <FeatureShowcase />
        <InteractiveProductDemo />
        <PlatformBenefits />
        <TestimonialShowcase />
        <HolographicCTA />
        <HolographicFooter />
      </div>
    </ImperialThemeProvider>
  )
}
