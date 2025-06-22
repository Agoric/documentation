"use client"

import { QUICAPrivateInstrumentsProvider } from "@/contexts/quica-private-instruments-context"
import { PrivateInstrumentsDashboard } from "@/components/quica/private-instruments-dashboard"

export default function QUICAPrivatePage() {
  return (
    <QUICAPrivateInstrumentsProvider>
      <PrivateInstrumentsDashboard />
    </QUICAPrivateInstrumentsProvider>
  )
}
