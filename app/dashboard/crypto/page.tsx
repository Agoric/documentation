"use client"

import { RoyalVaultProvider } from "@/contexts/royal-vault-context"
import { RoyalVaultDashboard } from "@/components/crypto/royal-vault-dashboard"

export default function CryptoPage() {
  return (
    <RoyalVaultProvider>
      <RoyalVaultDashboard />
    </RoyalVaultProvider>
  )
}
