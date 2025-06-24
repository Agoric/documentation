import { InclusiveLending } from "@/components/snapifi/inclusive-lending"

export default function LendingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inclusive Lending Platform</h1>
        <p className="text-muted-foreground">
          Revolutionary 50-year asset-backed loans with NFT tokenization and international reach
        </p>
      </div>

      <InclusiveLending />
    </div>
  )
}
