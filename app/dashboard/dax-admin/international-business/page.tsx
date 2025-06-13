import { InternationalBusinessTaxOptimizer } from "@/components/dax-admin/international-business-tax-optimizer"

export default function InternationalBusinessPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">International Business Tax Benefits</h1>
        <p className="text-muted-foreground">
          Optimize global tax benefits with currency exchange rate adjustments and jurisdiction-specific compliance
        </p>
      </div>

      <InternationalBusinessTaxOptimizer />
    </div>
  )
}
