"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInsuranceCoverage } from "@/contexts/insurance-coverage-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Home,
  CreditCard,
  TrendingUp,
  FileText,
  Download,
  CheckCircle,
  DollarSign,
  Users,
  Star,
  ArrowUp,
  AlertCircle,
  Phone,
  Lock,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const coverageTiers = [
  {
    tier: "tier1",
    name: "Credit Acceleration Package",
    subtitle: "Acceleratio Crediti Basicus",
    amount: "$25,000",
    monthlyFee: "$49.99",
    icon: CreditCard,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    features: [
      "Credit score acceleration up to 150 points",
      "Payment protection for 12 months",
      "Identity theft protection",
      "Credit monitoring and alerts",
      "Financial counseling services",
    ],
  },
  {
    tier: "tier2",
    name: "Enhanced Credit Program",
    subtitle: "Programma Crediti Supremus",
    amount: "$125,000",
    monthlyFee: "$149.99",
    icon: TrendingUp,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20",
    features: [
      "Enhanced credit acceleration up to 250 points",
      "Payment protection for 24 months",
      "Comprehensive identity protection",
      "Premium credit monitoring",
      "Dedicated financial advisor",
      "Debt consolidation assistance",
      "Investment guidance",
    ],
  },
  {
    tier: "tier3",
    name: "Home Purchase Guarantee",
    subtitle: "Garantia Domus Emptionis",
    amount: "$250,000",
    monthlyFee: "$299.99",
    icon: Home,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
    features: [
      "Maximum credit optimization",
      "Guaranteed home financing approval",
      "Payment protection for 36 months",
      "Comprehensive life and disability coverage",
      "Property protection insurance",
      "Legal protection services",
      "Wealth management services",
      "Estate planning assistance",
    ],
  },
]

export function InsuranceCoverageDashboard() {
  const {
    activeCoverages,
    availableUpgrades,
    insuranceMetrics,
    purchaseCreditAcceleration,
    purchaseHomeWithFinancing,
    upgradeCoverage,
    generateCertifiedLetter,
    downloadCertificate,
    submitClaim,
    calculateUpgradeCost,
    getEligibleUpgrades,
    calculateCreditImpact
  } = useInsuranceCoverage()

  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handlePurchaseCoverage = async (tier: "tier1" | "tier2") => {
    setIsProcessing(true)
    try {
      await purchaseCreditAcceleration(tier, "current_citizen_id")
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleUpgradeCoverage = async (coverageId: string, targetTier: "tier2" | "tier3") => {
    setIsProcessing(true)
    try {
      await upgradeCoverage(coverageId, targetTier)
    } catch (error) {
      console.error("Upgrade failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const totalCoverageAmount = activeCoverages.reduce((sum, coverage) => sum + coverage.coverageAmount, 0)
  const activePolicies = activeCoverages.filter(c => c.status === "active").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Insurance Coverage Dashboard
            </h1>
            <p className="text-2xl italic font-serif text-amber-300/70 mt-2">Assecuratio Protectionis Systematis</p>
            <p className="text-gray-400 mt-2">
              Comprehensive insurance coverage with certified letters and guaranteed financing
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-amber-400/30 text-amber-400">
              <Download className="w-4 h-4 mr-2" />
              Download Certificates
            </Button>
            <Button variant="outline" className="border-amber-400/30 text-amber-400">
              <Phone className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 text-sm flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Active Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400 mb-1">{activePolicies}</div>
              <div className="text-xs text-gray-400">Total active coverage</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 text-sm flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Total Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400 mb-1">
                ${totalCoverageAmount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Combined coverage amount</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-400 text-sm flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Satisfaction Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400 mb-1">
                {insuranceMetrics.customerSatisfactionScore.toFixed(1)}/5.0
              </div>
              <div className="text-xs text-gray-400">Customer satisfaction</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 text-sm flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Global Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {insuranceMetrics.totalActivePolicies.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Worldwide coverage</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-amber-400/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-amber-400/20 data-[state=active]:text-amber-400"
            >
              Coverage Overview
            </TabsTrigger>
            <TabsTrigger
              value="purchase"
              className="data-[state=active]:bg-blue-400/20 data-[state=active]:text-blue-400"
            >
              Purchase Coverage
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-green-400/20 data-[state=active]:text-green-400"
            >
              Certificates
            </TabsTrigger>
            <TabsTrigger
              value="claims"
              className="data-[state=active]:bg-purple-400/20 data-[state=active]:text-purple-400"
            >
              Claims & Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {activeCoverages.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeCoverages.map((coverage) => {
                  const tierInfo = coverageTiers.find(t => t.tier === coverage.coverageLevel)
                  const Icon = tierInfo?.icon || Shield
                  
                  return (
                    <Card key={coverage.id} className={cn("bg-black/20", tierInfo?.borderColor)}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={cn("p-2 rounded-full", tierInfo?.bgColor)}>
                              <Icon className={cn("w-5 h-5", tierInfo?.color)} />
                            </div>
                            <div>
                              <CardTitle className={cn("text-lg", tierInfo?.color)}>
                                {tierInfo?.name}
                              </CardTitle>
                              <CardDescription className="italic font-serif">
                                {tierInfo?.subtitle}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className={cn("text-xs", 
                            coverage.status === "active" ? "text-green-400 bg-green-400/10 border-green-400/30" :
                            "text-gray-400 bg-gray-400/10 border-gray-400/30"
                          )}>
                            {coverage.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className={cn("text-2xl font-bold", tierInfo?.color)}>
                              ${coverage.coverageAmount.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">Coverage Amount</div>
                          </div>
                          <div>
                            <div className={cn("text-lg font-semibold", tierInfo?.color)}>
                              {coverage.certificateNumber}
                            </div>
                            <div className="text-xs text-gray-400">Certificate Number</div>
                          </div>
                        </div>

                        <Separator className={cn(tierInfo?.borderColor)} />

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Effective Date</span>
                            <span className={tierInfo?.color}>{coverage.effectiveDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Expiration Date</span>
                            <span className={tierInfo?.color}>{coverage.expirationDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Underwriter</span>
                            <span className={tierInfo?.color}>{coverage.underwriter}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className={cn("flex-1", `border-${tierInfo?.color?.split('-')[1]}-400/30`, tierInfo?.color)}
                            onClick={() => downloadCertificate(coverage.id)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Certificate
                          </Button>
                          {coverage.coverageLevel !== "tier3" && (
                            <Button
                              size="sm"
                              className={cn("flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold")}
                              onClick={() => handleUpgradeCoverage(coverage.id, coverage.coverageLevel === "tier1" ? "tier2" : "tier3")}
                              disabled={isProcessing}
                            >
                              <ArrowUp className="w-4 h-4 mr-2" />
                              Upgrade
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="bg-black/20 border-amber-400/20">
                <CardContent className="text-center py-12">
                  <Shield className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-amber-400 mb-2">No Active Coverage</h3>
                  <p className="text-gray-400 mb-6">
                    Purchase your first insurance coverage to get started with certified protection.
                  </p>
                  <Button
                    onClick={() => setActiveTab("purchase")}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold"
                  >
                    Purchase Coverage
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="purchase" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coverageTiers.map((tier, index) => {
                const Icon = tier.icon
                const creditImpact = calculateCreditImpact(tier.tier)
                
                return (
                  <motion.div
                    key={tier.tier}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      className={cn(
                        "h-full cursor-pointer transition-all duration-300 hover:scale-105",
                        "bg-gradient-to-br from-black/40 to-purple-900/20",
                        tier.borderColor,
                        selectedTier === tier.tier ? "ring-2 ring-amber-400" : "",
                        "hover:shadow-2xl hover:shadow-amber-400/10"
                      )}
                      onClick={() => setSelectedTier(tier.tier)}
                    >
                      <CardHeader className="text-center">
                        <div className={cn("mx-auto mb-4 p-4 rounded-full w-fit", tier.bgColor)}>
                          <Icon className={cn("w-8 h-8", tier.color)} />
                        </div>
                        <CardTitle className={cn("text-xl", tier.color)}>{tier.name}</CardTitle>
                        <CardDescription className="text-amber-300/60 italic font-serif">
                          {tier.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className={cn("text-3xl font-bold mb-1", tier.color)}>{tier.amount}</div>
                          <div className="text-sm text-gray-400">Coverage Amount</div>
                          <div className={cn("text-lg font-semibold mt-2", tier.color)}>{tier.monthlyFee}</div>
                          <div className="text-xs text-gray-400">Monthly Premium</div>
                        </div>

                        <Separator className={tier.borderColor} />

                        {creditImpact && (
                          <div className="space-y-2">
                            <h5 className={cn("font-semibold text-sm", tier.color)}>Credit Impact</h5>
                            <div className="grid grid-cols-1 gap-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Score Increase</span>
                                <span className={tier.color}>+{creditImpact.scoreIncrease} points</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Credit Line</span>
                                <span className={tier.color}>+${creditImpact.creditLineIncrease.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Rate Reduction</span>
                                <span className={tier.color}>-{(creditImpact.rateReduction * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <Separator className={tier.borderColor} />

                        <div className="space-y-2">
                          <h5 className={cn("font-semibold text-sm", tier.color)}>Key Benefits</h5>
                          {tier.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-400">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                              {feature}
                            </div>
                          ))}
                          {tier.features.length > 4 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{tier.features.length - 4} more benefits
                            </div>
                          )}
                        </div>

                        <Button
                          className={cn(
                            "w-full font-semibold",
                            tier.tier === "tier3" 
                              ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                              : "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black"
                          )}
                          onClick={() => {
                            if (tier.tier === "tier3") {
                              // Redirect to home purchase flow
                              console.log("Redirect to home purchase")
                            } else {
                              handlePurchaseCoverage(tier.tier as "tier1" | "tier2")
                            }
                          }}
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            "Processing..."
                          ) : tier.tier === "tier3" ? (
                            <>
                              <Home className="w-4 h-4 mr-2" />
                              Purchase Home
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 mr-2" />
                              Purchase Coverage
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Special Home Purchase Section */}
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Guaranteed Home Financing Program
                </CardTitle>
                <CardDescription>
                  Purchase a home through our platform with guaranteed financing and automatic $250,000 coverage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-green-400 font-semibold">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Guaranteed Approval
                    </div>
                    <p className="text-sm text-gray-400">
                      100% financing approval guarantee for conforming inclusive lending parameters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-green-400 font-semibold">
                      <Lock className="w-4 h-4 mr-2" />
                      Fixed 4.5% Rate
                    </div>
                    <p className="text-sm text-gray-400">
                      Locked interest rate regardless of market conditions or credit score
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-green-400 font-semibold">
                      <Zap className="w-4 h-4 mr-2" />
                      24-Hour Processing
                    </div>
                    <p className="text-sm text-gray-400">
                      Fastest home loan processing in the industry with instant pre-approval
                    </p>
                  </div>
                </div>

                <Separator className="bg-green-400/20 my-6" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-green-400 font-semibold">Ready to purchase your dream home?</h4>
                    <p className="text-gray-400 text-sm">Browse our real estate marketplace with guaranteed financing</p>
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold">
                    <Home className="w-4 h-4 mr-2" />
                    Browse Properties
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-amber-400/20">
                <CardHeader>
                  <CardTitle className="text-amber-400 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Certified Letters
                  </CardTitle>
                  <CardDescription>Official insurance certificates and documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  {activeCoverages.length > 0 ? (
                    <div className="space-y-4">
                      {activeCoverages.map((coverage) => (
                        <div key={coverage.id} className="flex items-center justify-between p-4 bg-amber-400/5 rounded-lg border border-amber-400/10">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-amber-400/20 rounded-full flex items-center justify-center">
                              <FileText className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                              <div className="text-amber-400 font-semibold">{coverage.certificateNumber}</div>
                              <div className="text-gray-400 text-sm">
                                ${coverage.coverageAmount.toLocaleString()} Coverage
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-amber-400/30 text-amber-400"
                              onClick={() => downloadCertificate(coverage.id)}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No certificates available</p>
                      <p className="text-gray-500 text-sm">Purchase coverage to generate certified letters</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-blue-400/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Certificate Verification
                  </CardTitle>
                  <CardDescription>Verify the authenticity of insurance certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Certificate Number
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Enter certificate number..."
                          className="flex-1 px-3 py-2 bg-black/20 border border-blue-400/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        />
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Verify
                        </Button>
                      </div>
                    </div>

                    <Separator className="bg-blue-400/20" />

                    <div className="space-y-3">
                      <h5 className="text-blue-400 font-semibold">Certificate Features</h5>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          Digital signature verification
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          Blockchain-secured authenticity
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          Real-time status validation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          Global recognition network
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="claims" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-purple-400/20">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Submit a Claim
                  </CardTitle>
                  <CardDescription>File an insurance claim for covered incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Coverage Policy
                      </label>
                      <select className="w-full px-3 py-2 bg-black/20 border border-purple-400/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50">
                        <option value="">Select a policy...</option>
                        {activeCoverages.map((coverage) => (
                          <option key={coverage.id} value={coverage.id}>
                            {coverage.certificateNumber} - ${coverage.coverageAmount.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Claim Type
                      </label>
                      <select className="w-full px-3 py-2 bg-black/20 border border-purple-400/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50">
                        <option value="">Select claim type...</option>
                        <option value="payment_default">Payment Default</option>
                        <option value="job_loss">Job Loss</option>
                        <option value="disability">Disability</option>
                        <option value="property_damage">Property Damage</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Claim Amount
                      </label>
                      <input
                        type="number"
                        placeholder="Enter claim amount..."
                        className="w-full px-3 py-2 bg-black/20 border border-purple-400/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe the incident..."
                        className="w-full\
