"use client"

import { GlobalCitizenshipProvider } from "@/contexts/global-citizenship-context"
import { CitizenProfileDashboard } from "@/components/citizenship/citizen-profile-dashboard"

export default function CitizenProfilePage() {
  return (
    <GlobalCitizenshipProvider>
      <CitizenProfileDashboard />
    </GlobalCitizenshipProvider>
  )
}
