"use client"

import type React from "react"
import { StrategicPlatformLayout } from "@/components/layout/strategic-platform-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <StrategicPlatformLayout>{children}</StrategicPlatformLayout>
}
