"use client"

import EnhancedHomeDashboard from "@/components/dashboard/enhanced-home-dashboard"
import { PageWrapper } from "@/components/layout/page-wrapper"

export default function HomePage() {
  return (
    <PageWrapper showSidebar={false}>
      <EnhancedHomeDashboard />
    </PageWrapper>
  )
}
