"use client"

import { GlobalCitizenshipProvider } from "@/contexts/global-citizenship-context"
import { GlobalCitizenshipOnboarding } from "@/components/citizenship/global-citizenship-onboarding"

export default function GlobalCitizenshipRegistrationPage() {
  return (
    <GlobalCitizenshipProvider>
      <GlobalCitizenshipOnboarding />
    </GlobalCitizenshipProvider>
  )
}
