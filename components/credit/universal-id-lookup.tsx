"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCreditAcceleration } from "@/contexts/credit-acceleration-context"
import {
  Search,
  FileText,
  Shield,
  Coins,
  Building,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
  Eye,
  Download,
  Share,
  RefreshCw,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LookupResult {
  id: string
  type: "loan" | "guarantee" | "token" | "escrow" | "payment" | "claim" | "transaction"
  status: string
  title: string
  description: string
  metadata: Record<string, any>
  relatedEntities: RelatedEntity[]
  timeline: TimelineEvent[]
  riskLevel: "low" | "medium" | "high"
  lastUpdated: Date
}

interface RelatedEntity {
  id: string
  type: string
  relationship: string
  status: string
  value?: number
}

interface TimelineEvent {
  date: Date
  event: string
  description: string
  actor: string
  status: "completed" | "pending" | "failed"
}

export function UniversalIDLookup() {
  const { loans, searchLoans } = useCreditAcceleration()

  const [searchId, setSearchId] = useState("2c979652-4ba9-43f5-b224-3ea78ebea859")
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Mock data for the specific UUID provided
  const mockLookupData: LookupResult = {
    id: "2c979652-4ba9-43f5-b224-3ea78ebea859",
    type: "loan",
    status: "active",
    title: "Premium Residential Loan - $485,000",
    description: "30-year fixed-rate mortgage for single-family residence with AI-approved terms",
    metadata: {
      borrowerName: "Sarah Chen",
      propertyAddress: "1247 Maple Grove Drive, Austin, TX 78704",
      loanAmount: 485000,
      interestRate: 0.0425,
      termMonths: 360,
      monthlyPayment: 2387.45,
      creditScore: 785,
      loanToValue: 0.78,
      debtToIncome: 0.24,
      originationDate: new Date("2024-01-15"),
      firstPaymentDate: new Date("2024-02-15"),
      currentBalance: 478250.33,
      paymentsRemaining: 354,
      escrowBalance: 8450.75,
      propertyValue: 620000,
      aiRiskScore: 0.08,
      aiConfidence: 0.94,
    },
    relatedEntities: [
      {
        id: "guarantee_7f8e9d2a-1b3c-4e5f-6789-0a1b2c3d4e5f",
        type: "guarantee",
        relationship: "payment_protection",
        status: "active",
        value: 97000,
      },
      {
        id: "token_a1b2c3d4-e5f6-7890-1234-567890abcdef",
        type: "fractional_token",
        relationship: "tokenized_asset",
        status: "trading",
        value: 485000,
      },
      {
        id: "escrow_9e8d7c6b-5a49-3827-1605-948372615038",
        type: "escrow_account",
        relationship: "payment_escrow",
        status: "active",
        value: 8450.75,
      },
      {
        id: "appraisal_f1e2d3c4-b5a6-9780-1234-567890fedcba",
        type: "property_appraisal",
        relationship: "collateral_valuation",
        status: "completed",
        value: 620000,
      },
    ],
    timeline: [
      {
        date: new Date("2024-01-15"),
        event: "Loan Originated",
        description: "Loan successfully funded and disbursed",
        actor: "QUICA Lending System",
        status: "completed",
      },
      {
        date: new Date("2024-01-20"),
        event: "Tokenization Completed",
        description: "Loan converted to 485,000 fractional tokens",
        actor: "Tokenization Engine",
        status: "completed",
      },
      {
        date: new Date("2024-02-01"),
        event: "Guarantee Activated",
        description: "Payment protection guarantee activated",
        actor: "QUICA Guarantee Corp",
        status: "completed",
      },
      {
        date: new Date("2024-02-15"),
        event: "First Payment Received",
        description: "On-time payment of $2,387.45 received",
        actor: "Borrower",
        status: "completed",
      },
      {
        date: new Date("2024-03-15"),
        event: "Payment Received",
        description: "Monthly payment processed successfully",
        actor: "Borrower",
        status: "completed",
      },
      {
        date: new Date("2024-04-15"),
        event: "Next Payment Due",
        description: "Monthly payment of $2,387.45 due",
        actor: "System",
        status: "pending",
      },
    ],
    riskLevel: "low",
    lastUpdated: new Date(),
  }

  const performLookup = async (id: string) => {
    setIsSearching(true)

    // Add to search history
    if (!searchHistory.includes(id)) {
      setSearchHistory((prev) => [id, ...prev.slice(0, 9)])
    }

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if it's the specific UUID provided
      if (id === "2c979652-4ba9-43f5-b224-3ea78ebea859") {
        setLookupResult(mockLookupData)
      } else {
        // Try to find in existing loans
        const foundLoan = Object.values(loans).find(
          (loan) => loan.loanId === id || loan.userId === id || loan.guaranteeId === id || loan.tokenId === id,
        )

        if (foundLoan) {
          setLookupResult({
            id: foundLoan.loanId,
            type: "loan",
            status: foundLoan.status,
            title: `Loan ${foundLoan.loanId} - $${foundLoan.requestedAmount.toLocaleString()}`,
            description: `${foundLoan.termMonths}-month loan application`,
            metadata: {
              borrowerName: `User ${foundLoan.userId}`,
              loanAmount: foundLoan.requestedAmount,
              interestRate: foundLoan.interestRate,
              creditScore: foundLoan.creditScore,
              aiRiskScore: foundLoan.aiRiskScore,
              aiConfidence: foundLoan.aiConfidence,
            },
            relatedEntities: [],
            timeline: [
              {
                date: foundLoan.applicationDate,
                event: "Application Submitted",
                description: "Loan application submitted for review",
                actor: "Borrower",
                status: "completed",
              },
            ],
            riskLevel: foundLoan.aiRiskScore > 0.3 ? "high" : foundLoan.aiRiskScore > 0.15 ? "medium" : "low",
            lastUpdated: foundLoan.updatedAt,
          })
        } else {
          setLookupResult(null)
        }
      }
    } catch (error) {
      console.error("Lookup failed:", error)
      setLookupResult(null)
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    if (searchId) {
      performLookup(searchId)
    }
  }, [])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-400 bg-green-900/20 border-green-400/30"
      case "medium":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-400/30"
      case "high":
        return "text-red-400 bg-red-900/20 border-red-400/30"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-400/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "loan":
        return <FileText className="w-5 h-5" />
      case "guarantee":
        return <Shield className="w-5 h-5" />
      case "token":
      case "fractional_token":
        return <Coins className="w-5 h-5" />
      case "escrow":
      case "escrow_account":
        return <Building className="w-5 h-5" />
      case "appraisal":
      case "property_appraisal":
        return <TrendingUp className="w-5 h-5" />
      default:
        return <Activity className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Universal ID Lookup System
          </h1>
          <p className="text-xl text-purple-200">Comprehensive tracking and analysis for all system entities</p>
        </motion.div>

        {/* Search Interface */}
        <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-400/30">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Entity Search & Lookup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter Loan ID, Guarantee ID, Token ID, or any system identifier..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="bg-blue-800/30 border-blue-600 text-blue-100 h-12 text-lg"
                />
              </div>
              <Button
                onClick={() => performLookup(searchId)}
                disabled={isSearching || !searchId}
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isSearching ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Search className="w-5 h-5 mr-2" />
                )}
                {isSearching ? "Searching..." : "Lookup"}
              </Button>
            </div>

            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-blue-300">Recent Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.slice(0, 5).map((historyId, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchId(historyId)
                        performLookup(historyId)
                      }}
                      className="text-xs bg-blue-800/20 border-blue-600/30 text-blue-200 hover:bg-blue-700/30"
                    >
                      {historyId.slice(0, 8)}...
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lookup Results */}
        <AnimatePresence>
          {lookupResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Entity Overview */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-400/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-purple-300 flex items-center">
                      {getTypeIcon(lookupResult.type)}
                      <span className="ml-2">{lookupResult.title}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRiskColor(lookupResult.riskLevel)}>
                        {lookupResult.riskLevel.toUpperCase()} RISK
                      </Badge>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-400/30">
                        {lookupResult.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-purple-200">{lookupResult.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-3 bg-purple-800/20 rounded-lg border border-purple-400/20">
                      <div className="text-sm text-gray-400">Entity ID</div>
                      <div className="font-mono text-purple-300 text-sm break-all">{lookupResult.id}</div>
                    </div>
                    <div className="p-3 bg-purple-800/20 rounded-lg border border-purple-400/20">
                      <div className="text-sm text-gray-400">Status</div>
                      <div className="font-semibold text-purple-300 capitalize">{lookupResult.status}</div>
                    </div>
                    <div className="p-3 bg-purple-800/20 rounded-lg border border-purple-400/20">
                      <div className="text-sm text-gray-400">Last Updated</div>
                      <div className="font-semibold text-purple-300">
                        {lookupResult.lastUpdated.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="p-3 bg-purple-800/20 rounded-lg border border-purple-400/20">
                      <div className="text-sm text-gray-400">Related Entities</div>
                      <div className="font-semibold text-purple-300">{lookupResult.relatedEntities.length}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Information */}
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-slate-800/30 border border-slate-600/30">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="related">Related Entities</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-400/30">
                    <CardHeader>
                      <CardTitle className="text-green-300 flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Entity Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(lookupResult.metadata).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <div className="text-sm text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </div>
                            <div className="text-green-300 font-medium">
                              {(typeof value === "number" && key.includes("Amount")) ||
                              key.includes("Value") ||
                              key.includes("Balance") ||
                              key.includes("Payment")
                                ? `$${value.toLocaleString()}`
                                : typeof value === "number" &&
                                    (key.includes("Rate") || key.includes("Score")) &&
                                    value < 1
                                  ? `${(value * 100).toFixed(2)}%`
                                  : typeof value === "object" && value instanceof Date
                                    ? value.toLocaleDateString()
                                    : String(value)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="related">
                  <Card className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 border-amber-400/30">
                    <CardHeader>
                      <CardTitle className="text-amber-300 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Related Entities ({lookupResult.relatedEntities.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {lookupResult.relatedEntities.map((entity, index) => (
                          <motion.div
                            key={entity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-amber-800/20 rounded-lg border border-amber-400/20 hover:border-amber-400/40 transition-colors cursor-pointer"
                            onClick={() => {
                              setSearchId(entity.id)
                              performLookup(entity.id)
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {getTypeIcon(entity.type)}
                                <div>
                                  <div className="font-medium text-amber-300">
                                    {entity.type.replace("_", " ").toUpperCase()}
                                  </div>
                                  <div className="text-sm text-gray-400">{entity.relationship.replace("_", " ")}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className="bg-amber-600/20 text-amber-300 border-amber-400/30 mb-1">
                                  {entity.status.toUpperCase()}
                                </Badge>
                                {entity.value && (
                                  <div className="text-sm text-amber-300">${entity.value.toLocaleString()}</div>
                                )}
                              </div>
                            </div>
                            <div className="mt-2 text-xs font-mono text-gray-400 break-all">{entity.id}</div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline">
                  <Card className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-indigo-400/30">
                    <CardHeader>
                      <CardTitle className="text-indigo-300 flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Entity Timeline ({lookupResult.timeline.length} events)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-96">
                        <div className="space-y-4">
                          {lookupResult.timeline.map((event, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start space-x-4 p-4 bg-indigo-800/20 rounded-lg border border-indigo-400/20"
                            >
                              <div className="flex-shrink-0 mt-1">{getStatusIcon(event.status)}</div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-indigo-300">{event.event}</h4>
                                  <span className="text-xs text-gray-400">{event.date.toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-300 mb-2">{event.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-indigo-400">by {event.actor}</span>
                                  <Badge
                                    className={
                                      event.status === "completed"
                                        ? "bg-green-600/20 text-green-300"
                                        : event.status === "pending"
                                          ? "bg-yellow-600/20 text-yellow-300"
                                          : "bg-red-600/20 text-red-300"
                                    }
                                  >
                                    {event.status.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="actions">
                  <Card className="bg-gradient-to-br from-slate-900/50 to-gray-900/50 border-slate-400/30">
                    <CardHeader>
                      <CardTitle className="text-slate-300 flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Available Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-600 to-cyan-600">
                          <Eye className="w-6 h-6" />
                          <span className="text-sm">View Details</span>
                        </Button>

                        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-green-600 to-emerald-600">
                          <Download className="w-6 h-6" />
                          <span className="text-sm">Export Data</span>
                        </Button>

                        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-purple-600 to-violet-600">
                          <Share className="w-6 h-6" />
                          <span className="text-sm">Share Link</span>
                        </Button>

                        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-amber-600 to-orange-600">
                          <TrendingUp className="w-6 h-6" />
                          <span className="text-sm">Performance</span>
                        </Button>

                        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-red-600 to-pink-600">
                          <AlertTriangle className="w-6 h-6" />
                          <span className="text-sm">Risk Analysis</span>
                        </Button>

                        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-indigo-600 to-blue-600">
                          <RefreshCw className="w-6 h-6" />
                          <span className="text-sm">Refresh Data</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        {!isSearching && searchId && !lookupResult && (
          <Card className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-400/30">
            <CardContent className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-300 mb-2">Entity Not Found</h3>
              <p className="text-red-200 mb-6">
                No entity found with ID: <span className="font-mono">{searchId}</span>
              </p>
              <Button onClick={() => setSearchId("")} className="bg-gradient-to-r from-red-600 to-pink-600">
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
