import { SupremeLandingV777 } from "@/components/landing/supreme-landing-v777"
import { HolographicFooter } from "@/components/landing/holographic-footer"
import { ImperialThemeProvider } from "@/components/ui/imperial-theme-provider"

export default function HomePage() {
  return (
    <ImperialThemeProvider>
      <main className="min-h-screen">
        <SupremeLandingV777 />
        <HolographicFooter />
      </main>
    </ImperialThemeProvider>
  )
}
