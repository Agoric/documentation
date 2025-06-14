import { ImperialThemeProvider } from "@/components/ui/imperial-theme-provider"
import { HolographicNavbar } from "@/components/landing/holographic-navbar"
import { SequentialLandingFlow } from "@/components/landing/sequential-landing-flow"
import { NonprofitMissionShowcase } from "@/components/landing/nonprofit-mission-showcase"
import { ProductRealmEnvironments } from "@/components/landing/product-realm-environments"
import { EconomicBenefitsSection } from "@/components/landing/economic-benefits-section"
import { DonationCallToAction } from "@/components/landing/donation-call-to-action"
import { PlatformEnrollmentFlow } from "@/components/landing/platform-enrollment-flow"
import { HolographicFooter } from "@/components/landing/holographic-footer"

export default function HomePage() {
  return (
    <ImperialThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <HolographicNavbar />

        {/* Sequential Landing Flow - Guides users step by step */}
        <SequentialLandingFlow />

        {/* Nonprofit Mission & Economic Structure */}
        <NonprofitMissionShowcase />

        {/* Product Realms & Environments */}
        <ProductRealmEnvironments />

        {/* Economic Benefits & Sound Structure */}
        <EconomicBenefitsSection />

        {/* Donation Prompts & Humanitarian Impact */}
        <DonationCallToAction />

        {/* Platform Enrollment Flow */}
        <PlatformEnrollmentFlow />

        <HolographicFooter />
      </div>
    </ImperialThemeProvider>
  )
}
