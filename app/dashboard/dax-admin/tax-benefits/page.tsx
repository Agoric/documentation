import { TaxBenefitsOptimizer } from "@/components/dax-admin/tax-benefits-optimizer"

export default function TaxBenefitsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">DAX Tax Benefits</h1>
        <p className="text-muted-foreground">
          Optimize tax benefits through charitable contributions and Imperial Trust pledges
        </p>
      </div>

      <TaxBenefitsOptimizer />
    </div>
  )
}
