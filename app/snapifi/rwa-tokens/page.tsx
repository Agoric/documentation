import { RWATokenization } from "@/components/snapifi/rwa-tokenization"

export default function RWATokensPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">RWA Tokenization Platform</h1>
        <p className="text-muted-foreground">Fractionalized real-world asset ownership through blockchain technology</p>
      </div>

      <RWATokenization />
    </div>
  )
}
