import { RoyalVaultDashboard } from "@/components/crypto/royal-vault-dashboard"
import { RoyalVaultProvider } from "@/contexts/royal-vault-context"

export default function CryptoPage() {
  return (
    <RoyalVaultProvider>
      <RoyalVaultDashboard />
    </RoyalVaultProvider>
  )
}
