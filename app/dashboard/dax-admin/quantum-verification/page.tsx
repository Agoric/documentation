import { QuantumSecureVerification } from "@/components/dax-admin/quantum-secure-verification"

export default function QuantumVerificationPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Quantum-Secure Verification</h1>
        <p className="text-muted-foreground">
          Ultra-secure charitable contribution verification using post-quantum cryptography and multi-dimensional
          blockchain technology
        </p>
      </div>

      <QuantumSecureVerification />
    </div>
  )
}
