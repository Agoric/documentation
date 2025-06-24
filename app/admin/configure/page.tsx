"use client"

import { AdminAccessProvider } from "@/contexts/admin-access-context"
import { UniversalAccessConfiguratorDashboard } from "@/components/admin/universal-access-configurator-dashboard"

export default function AdminConfigurePage() {
  return (
    <AdminAccessProvider>
      <UniversalAccessConfiguratorDashboard />
    </AdminAccessProvider>
  )
}
