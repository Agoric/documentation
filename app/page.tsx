"use client"
import { PlatformHub } from "@/components/platform-hub/platform-hub"
import { DemoContextProvider } from "@/contexts/demo-context"
import { DemoBanner } from "@/components/ui/demo-banner"

export default function HomePage() {
  return (
    <DemoContextProvider>
      <div className="relative">
        <DemoBanner />
        <PlatformHub />
      </div>
    </DemoContextProvider>
  )
}
