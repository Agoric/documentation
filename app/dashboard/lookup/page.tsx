"use client"

import { CreditAccelerationProvider } from "@/contexts/credit-acceleration-context"
import { UniversalIDLookup } from "@/components/credit/universal-id-lookup"

export default function LookupPage() {
  return (
    <CreditAccelerationProvider>
      <UniversalIDLookup />
    </CreditAccelerationProvider>
  )
}
