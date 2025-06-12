import { HolographicNavbar } from "@/components/landing/holographic-navbar"
import { HolographicHero } from "@/components/landing/holographic-hero"
import { FeatureShowcase } from "@/components/landing/feature-showcase"
import { PlatformBenefits } from "@/components/landing/platform-benefits"
import { HolographicCTA } from "@/components/landing/holographic-cta"
import { TestimonialShowcase } from "@/components/landing/testimonial-showcase"
import { HolographicFooter } from "@/components/landing/holographic-footer"
import { InteractiveProductDemo } from "@/components/landing/interactive-product-demo"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <HolographicNavbar />
      <HolographicHero />
      <FeatureShowcase />
      <PlatformBenefits />
      <InteractiveProductDemo />
      <HolographicCTA />
      <TestimonialShowcase />
      <HolographicFooter />
    </main>
  )
}
