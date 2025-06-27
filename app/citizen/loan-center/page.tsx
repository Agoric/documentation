"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, FileText, Upload, Eye, Home, Building2, Car, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"

const loanTypes = [
  {
    type: "Home Loan",
    description: "Secure your dream home with our flexible home loan options.",
    rate: "6.5%",
    maxAmount: "$500,000",
    term: "30 years",
    icon: <Home className="w-5 h-5" />,
  },
  {
    type: "Business Loan",
    description: "Grow your business with our tailored business loan solutions.",
    rate: "7.2%",
    maxAmount: "$250,000",
    term: "10 years",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    type: "Auto Loan",
    description: "Drive away in your new car with our competitive auto loan rates.",
    rate: "4.9%",
    maxAmount: "$50,000",
    term: "5 years",
    icon: <Car className="w-5 h-5" />,
  },
  {
    type: "Education Loan",
    description: "Invest in your future with our affordable education loan programs.",
    rate: "5.8%",
    maxAmount: "$100,000",
    term: "10 years",
    icon: <GraduationCap className="w-5 h-5" />,
  },
]

export default function LoanCenterDashboard() {
  const router = useRouter()

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold mb-6">Loan Center</h1>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button className="h-20 flex-col gap-2" onClick={() => router.push("/citizen/loan-center/calculator")}>
          <Calculator className="w-6 h-6" />
          Loan Calculator
        </Button>
        <Button className="h-20 flex-col gap-2" onClick={() => router.push("/citizen/loan-center/pre-qualification")}>
          <FileText className="w-6 h-6" />
          Pre-Qualify
        </Button>
        <Button className="h-20 flex-col gap-2" onClick={() => router.push("/citizen/loan-center/documents")}>
          <Upload className="w-6 h-6" />
          Upload Docs
        </Button>
        <Button className="h-20 flex-col gap-2" onClick={() => router.push("/citizen/loan-center/status")}>
          <Eye className="w-6 h-6" />
          Check Status
        </Button>
      </div>

      {/* Loan Types Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loanTypes.map((loan) => (
          <Card key={loan.type} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">{loan.icon}</div>
                  <div>
                    <h3 className="font-semibold">{loan.type}</h3>
                    <p className="text-sm text-slate-600">{loan.description}</p>
                  </div>
                </div>
                <Badge variant="secondary">{loan.rate}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500">Max Amount</p>
                  <p className="font-medium">{loan.maxAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Term</p>
                  <p className="font-medium">{loan.term}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => router.push(`/citizen/loan-center/${loan.type.toLowerCase().replace(" ", "-")}`)}
                >
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/citizen/loan-center/calculator?type=${loan.type}`)}
                >
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
