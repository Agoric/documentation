import { QuantumInsights } from "@/components/snapifi/quantum-insights"

export default function QuantumPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quantum Computing Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time quantum processing metrics and ultra-fast financial calculations
        </p>
      </div>

      <QuantumInsights />
    </div>
  )
}
