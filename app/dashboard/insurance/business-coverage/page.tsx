"use client"

import { useState } from "react"
import { useInsuranceCoverage } from "@/contexts/insurance-coverage-context"
import { InsuranceCoverageProvider } from "@/contexts/insurance-coverage-context"
import { BusinessCoverageForm } from "@/components/insurance/business-coverage-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  Shield,
  CheckCircle,
  ArrowLeft,
  CreditCard,
  TrendingUp,
  Home,
  Star,
  Users,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"

const businessCoverageTiers = [
  {
    tier: "business_tier1" as const,
    name: "Business Credit Acceleration Package",
    subtitle: "Acceleratio Crediti Negotium",
    amount: "$50,000",
    monthlyFee: "$99.99",
    icon: CreditCard,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    popular: false,
    features: [
      "Business credit score acceleration up to 150 points",
      "Commercial payment protection for 12 months",
      "Business identity theft protection",
      "Commercial credit monitoring and alerts",
      "Business financial counseling services",
      "Trade line establishment assistance",
      "Vendor credit optimization",
    ],
  },
  {
    tier: "business_tier2" as const,
    name: "Enhanced Business Credit Program",
    subtitle: "Programma Crediti Negotium Supremus",
    amount: "$250,000",
    monthlyFee: "$299.99",
    icon: TrendingUp,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20",
    popular: true,
    features: [
      "Enhanced business credit acceleration up to 250 points",
      "Commercial payment protection for 24 months",
      "Comprehensive business identity protection",
      "Premium commercial credit monitoring",
      "Dedicated business financial advisor",
      "Business debt consolidation assistance",
      "Commercial investment guidance",
      "SBA loan preparation assistance",
    ],
  },
  {
    tier: "business_tier3" as const,
    name: "Commercial Property Purchase Guarantee",
    subtitle: "Garantia Proprietatis Commercialis",
    amount: "$500,000",
    monthlyFee: "$599.99",
    icon: Home,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
    popular: false,
    features: [
      "Maximum business credit optimization",
      "Guaranteed commercial property financing approval",
      "Commercial payment protection for 36 months",
      "Comprehensive business liability coverage",
      "Commercial property protection insurance",
      "Business legal protection services",
      "Corporate wealth management services",
      "Business succession planning assistance",
    ],
  },
]

function BusinessCoverageContent() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { purchaseBusinessCreditAcceleration, purchaseCommercialPropertyWithFinancing } = useInsuranceCoverage()

  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier)
    setShowForm(true)
  }

  const handleFormSubmit = async (businessInfo: any) => {
    try {
      if (selectedTier === "business_tier3") {
        // Handle commercial property purchase
        console.log("Redirect to commercial property marketplace")
      } else {
        await purchaseBusinessCreditAcceleration(selectedTier as any, businessInfo)
      }
      setShowForm(false)
      setSelectedTier(null)
    } catch (error) {
      console.error("Purchase failed:", error)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setSelectedTier(null)
  }

  if (showForm && selectedTier) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button variant="outline" onClick={handleFormCancel} className="border-amber-400/30 text-amber-400 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Coverage Options
            </Button>
          </div>
          <BusinessCoverageForm
            selectedTier={selectedTier as any}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-amber-400/20 rounded-full">
              <Building className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Business Insurance Coverage
            </h1>
          </div>
          <p className="text-2xl italic font-serif text-amber-300/70">Assecuratio Negotium Protectionis</p>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Comprehensive business insurance coverage with certified letters and guaranteed commercial financing. All
            coverage amounts are doubled for business entities to provide enhanced protection for your commercial
            operations.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 text-sm flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Double Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400 mb-1">2x</div>
              <div className="text-xs text-gray-400">Individual amounts</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 text-sm flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Up to $500K
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400 mb-1">Max</div>
              <div className="text-xs text-gray-400">Coverage amount</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-400 text-sm flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Certified Letters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400 mb-1">100%</div>
              <div className="text-xs text-gray-400">Guaranteed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 text-sm flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Business Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
              <div className="text-xs text-gray-400">Dedicated support</div>
            </CardContent>
          </Card>
        </div>

        {/* Coverage Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {businessCoverageTiers.map((tier, index) => {
            const Icon = tier.icon

            return (
              <Card
                key={tier.tier}
                className={cn(
                  "relative cursor-pointer transition-all duration-300 hover:scale-105",
                  "bg-gradient-to-br from-black/40 to-purple-900/20",
                  tier.borderColor,
                  "hover:shadow-2xl hover:shadow-amber-400/10",
                  tier.popular ? "ring-2 ring-amber-400" : "",
                )}
                onClick={() => handleTierSelect(tier.tier)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-semibold px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className={cn("mx-auto mb-4 p-4 rounded-full w-fit", tier.bgColor)}>
                    <Icon className={cn("w-8 h-8", tier.color)} />
                  </div>
                  <CardTitle className={cn("text-xl", tier.color)}>{tier.name}</CardTitle>
                  <CardDescription className="text-amber-300/60 italic font-serif">{tier.subtitle}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className={cn("text-3xl font-bold mb-1", tier.color)}>{tier.amount}</div>
                    <div className="text-sm text-gray-400">Coverage Amount</div>
                    <div className={cn("text-lg font-semibold mt-2", tier.color)}>{tier.monthlyFee}</div>
                    <div className="text-xs text-gray-400">Monthly Premium</div>
                  </div>

                  <div className="space-y-3">
                    <h5 className={cn("font-semibold text-sm", tier.color)}>Key Benefits</h5>
                    {tier.features.slice(0, 5).map((feature, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-400">
                        <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {tier.features.length > 5 && (
                      <div className="text-xs text-gray-500 text-center">+{tier.features.length - 5} more benefits</div>
                    )}
                  </div>

                  <Button
                    className={cn(
                      "w-full font-semibold",
                      tier.tier === "business_tier1"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                        : tier.tier === "business_tier2"
                          ? "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTierSelect(tier.tier)
                    }}
                  >
                    {tier.tier === "business_tier3" ? (
                      <>
                        <Home className="w-4 h-4 mr-2" />
                        Purchase Commercial Property
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Get Business Coverage
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Information */}
        <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-400/20">
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Why Choose Business Coverage?
            </CardTitle>
            <CardDescription>Enhanced protection designed specifically for business entities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center text-amber-400 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Double Coverage Amounts
                </div>
                <p className="text-sm text-gray-400">
                  All business coverage amounts are exactly double the individual coverage to provide enhanced
                  protection for commercial operations
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-amber-400 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Business-Specific Benefits
                </div>
                <p className="text-sm text-gray-400">
                  Tailored benefits including SBA loan assistance, commercial credit optimization, and business
                  succession planning
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-amber-400 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Commercial Property Financing
                </div>
                <p className="text-sm text-gray-400">
                  Guaranteed commercial property financing with up to $500,000 coverage for property purchases through
                  our platform
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function BusinessCoveragePage() {
  return (
    <InsuranceCoverageProvider>
      <BusinessCoverageContent />
    </InsuranceCoverageProvider>
  )
}
