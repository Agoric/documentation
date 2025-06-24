"use client"

import { GlobalCitizenshipProvider } from "@/contexts/global-citizenship-context"
import EnhancedHomeDashboard from "@/components/dashboard/enhanced-home-dashboard"

export default function HomeDashboardPage() {
  return (
    <GlobalCitizenshipProvider>
      <EnhancedHomeDashboard />
    </GlobalCitizenshipProvider>
  )
}
