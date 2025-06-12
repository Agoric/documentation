"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Home, Building2, CreditCard, Landmark, ArrowRight } from "lucide-react"

export function LoanPortfolio() {
  const [activeTab, setActiveTab] = useState("available")

  const availableLoans = [
    {
      id: "loan1",
      name: "50-Year Property Loan",
      icon: <Home className="h-4 w-4 text-blue-600" />,
      amount: "$750,000",
      rate: "4.25%",
      term: "50 years",
      eligibility: 92,
      status: "Available",
      description: "Long-term property loan with reduced monthly payments and NFT tokenization.",
    },
    {
      id: "loan2",
      name: "Debt Consolidation",
      icon: <CreditCard className="h-4 w-4 text-green-600" />,
      amount: "$50,000",
      rate: "5.75%",
      term: "10 years",
      eligibility: 85,
      status: "Available",
      description: "Consolidate high-interest debt into a single, manageable payment.",
    },
    {
      id: "loan3",
      name: "Commercial Property",
      icon: <Building2 className="h-4 w-4 text-amber-600" />,
      amount: "$350,000",
      rate: "5.25%",
      term: "30 years",
      eligibility: 65,
      status: "Partial",
      description: "Financing for commercial real estate with tokenized ownership options.",
    },
    {
      id: "loan4",
      name: "International Loan",
      icon: <Landmark className="h-4 w-4 text-purple-600" />,
      amount: "$100,000",
      rate: "6.50%",
      term: "15 years",
      eligibility: 30,
      status: "Not Available",
      description: "Cross-border lending for international property and investments.",
    },
  ]

  const currentLoans = [
    {
      id: "current1",
      name: "Home Mortgage",
      icon: <Home className="h-4 w-4 text-blue-600" />,
      originalAmount: "$320,000",
      currentBalance: "$295,450",
      rate: "4.75%",
      term: "30 years",
      progress: 12,
      monthlyPayment: "$1,675",
      nextPayment: "June 1, 2023",
    },
    {
      id: "current2",
      name: "Auto Loan",
      icon: <CreditCard className="h-4 w-4 text-green-600" />,
      originalAmount: "$35,000",
      currentBalance: "$22,340",
      rate: "3.25%",
      term: "5 years",
      progress: 45,
      monthlyPayment: "$635",
      nextPayment: "May 15, 2023",
    },
  ]

  return (
    <div className="h-full">
      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="available">Available Loans</TabsTrigger>
          <TabsTrigger value="current">Current Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="h-[calc(100%-40px)] overflow-y-auto">
          <div className="space-y-4">
            {availableLoans.map((loan) => (
              <div key={loan.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {loan.icon}
                    <span className="font-medium">{loan.name}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      loan.status === "Available"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : loan.status === "Partial"
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {loan.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{loan.description}</p>
                <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                  <div>
                    <div className="text-muted-foreground text-xs">Amount</div>
                    <div className="font-medium">{loan.amount}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Rate</div>
                    <div className="font-medium">{loan.rate}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Term</div>
                    <div className="font-medium">{loan.term}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Eligibility</span>
                    <span>{loan.eligibility}%</span>
                  </div>
                  <Progress
                    value={loan.eligibility}
                    className={`h-2 ${
                      loan.eligibility > 80 ? "bg-green-100" : loan.eligibility > 50 ? "bg-amber-100" : "bg-red-100"
                    }`}
                  >
                    <div
                      className={`h-full rounded-full ${
                        loan.eligibility > 80 ? "bg-green-600" : loan.eligibility > 50 ? "bg-amber-600" : "bg-red-600"
                      }`}
                      style={{ width: `${loan.eligibility}%` }}
                    />
                  </Progress>
                </div>
                <div className="mt-3 flex justify-end">
                  <div className="text-sm text-primary flex items-center gap-1 cursor-pointer">
                    <span>Apply Now</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="current" className="h-[calc(100%-40px)] overflow-y-auto">
          <div className="space-y-4">
            {currentLoans.map((loan) => (
              <div key={loan.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  {loan.icon}
                  <span className="font-medium">{loan.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <div className="text-muted-foreground text-xs">Original Amount</div>
                    <div className="font-medium">{loan.originalAmount}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Current Balance</div>
                    <div className="font-medium">{loan.currentBalance}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Interest Rate</div>
                    <div className="font-medium">{loan.rate}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Term</div>
                    <div className="font-medium">{loan.term}</div>
                  </div>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span>Paid Off</span>
                    <span>{loan.progress}%</span>
                  </div>
                  <Progress value={loan.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Monthly Payment</div>
                    <div className="font-medium">{loan.monthlyPayment}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Next Payment</div>
                    <div className="font-medium">{loan.nextPayment}</div>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <div className="text-sm text-primary flex items-center gap-1 cursor-pointer">
                    <span>View Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
