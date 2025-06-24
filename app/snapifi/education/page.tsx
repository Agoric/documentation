import { FinancialEducation } from "@/components/snapifi/financial-education"

export default function EducationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Financial Education Center</h1>
        <p className="text-muted-foreground">
          Comprehensive financial literacy courses with certificates and achievements
        </p>
      </div>

      <FinancialEducation />
    </div>
  )
}
