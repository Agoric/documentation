"use client"
import { useGlobalCitizenship } from "@/contexts/global-citizenship-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  User,
  Building,
  University,
  TrendingUp,
  Shield,
  FileText,
  CreditCard,
  Globe,
  Award,
  Calendar,
  DollarSign,
  PieChart,
  Download,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

const getTypeIcon = (type: string) => {
  switch (type) {
    case "individual":
      return User
    case "business":
      return Building
    case "institution":
      return University
    default:
      return User
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-400 bg-green-400/10 border-green-400/30"
    case "pending":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30"
    case "suspended":
      return "text-red-400 bg-red-400/10 border-red-400/30"
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/30"
  }
}

export function CitizenProfileDashboard() {
  const { currentCitizen, qgiFunds, getQGIPerformance, getCitizenshipBenefits, prepareTaxDocuments } =
    useGlobalCitizenship()

  if (!currentCitizen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-amber-400 mb-4">No Active Citizenship</h1>
          <p className="text-gray-400 mb-8">Please complete your global citizenship registration first.</p>
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold">
            Start Registration
          </Button>
        </div>
      </div>
    )
  }

  const TypeIcon = getTypeIcon(currentCitizen.type)
  const fundType = currentCitizen.type === "individual" ? "social_impact" : "institutional"
  const qgiPerformance = getQGIPerformance(fundType)
  const benefits = getCitizenshipBenefits(currentCitizen.id)

  const bondYield = currentCitizen.bondAllocation * 0.045 // 4.5% annual yield
  const qgiYield = currentCitizen.qgiAllocation * (qgiPerformance?.ytdReturn || 0.087)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-amber-400/20 to-purple-400/20 rounded-full">
              <TypeIcon className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-amber-400">{currentCitizen.name || "Global Citizen"}</h1>
              <p className="text-amber-300/70 italic font-serif">Civis Globalis</p>
              <div className="flex items-center space-x-3 mt-1">
                <Badge className={cn("text-xs", getStatusColor(currentCitizen.status))}>
                  {currentCitizen.status.toUpperCase()}
                </Badge>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 text-sm">ID: {currentCitizen.id}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 text-sm">
                  Registered: {currentCitizen.registrationDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-amber-400/30 text-amber-400">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="border-amber-400/30 text-amber-400">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 text-sm flex items-center">
                <PieChart className="w-4 h-4 mr-2" />
                QGI Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400 mb-1">
                ${currentCitizen.qgiAllocation.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">YTD Return: +${qgiYield.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 text-sm flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Bond Investment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400 mb-1">
                ${currentCitizen.bondAllocation.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Annual Yield: +${bondYield.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-400 text-sm flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Tax Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400 mb-1">
                ${currentCitizen.taxBenefitContract.estimatedAnnualBenefit?.toLocaleString() || "0"}
              </div>
              <div className="text-xs text-gray-400">Annual Estimated</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-400/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 text-sm flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Social Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {currentCitizen.socialImpactScore.toFixed(1)}/10
              </div>
              <div className="text-xs text-gray-400">Impact Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QGI Fund Performance */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/20 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  QGI Fund Performance
                </CardTitle>
                <CardDescription>
                  {fundType === "social_impact" ? "Social Impact QGI Fund" : "Institutional QGI Fund"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">
                      {((qgiPerformance?.ytdReturn || 0) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">YTD Return</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">
                      {((qgiPerformance?.annualizedReturn || 0) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">Annualized</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">
                      {((qgiPerformance?.volatility || 0) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">Volatility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-400">
                      {qgiPerformance?.sharpeRatio.toFixed(2) || "0.00"}
                    </div>
                    <div className="text-xs text-gray-400">Sharpe Ratio</div>
                  </div>
                </div>

                <Separator className="bg-amber-400/20 mb-6" />

                <div className="space-y-4">
                  <h4 className="text-amber-400 font-semibold">Fund Overview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Assets</span>
                      <span className="text-white font-semibold">
                        ${qgiFunds[fundType]?.totalAssets.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Participants</span>
                      <span className="text-white font-semibold">
                        {qgiFunds[fundType]?.participantCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Liquidity Ratio</span>
                      <span className="text-white font-semibold">
                        {((qgiFunds[fundType]?.liquidityRatio || 0) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bond Holdings</span>
                      <span className="text-white font-semibold">
                        ${qgiFunds[fundType]?.bondHoldings.totalValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Digital Domicile & Tax Benefits */}
            <Card className="bg-black/20 border-green-400/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Digital Domicile & Tax Benefits
                </CardTitle>
                <CardDescription>Your tax optimization and digital domicile status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Domicile ID</span>
                    <span className="text-green-400 font-mono text-sm">
                      {currentCitizen.digitalDomicileId || "Pending"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Contract Status</span>
                    <Badge
                      className={cn("text-xs", getStatusColor(currentCitizen.taxBenefitContract.status || "pending"))}
                    >
                      {currentCitizen.taxBenefitContract.status?.toUpperCase() || "PENDING"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Jurisdiction</span>
                    <span className="text-green-400">
                      {currentCitizen.taxBenefitContract.digitalDomicileJurisdiction || "QUICA Digital Territory"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Contract Expires</span>
                    <span className="text-green-400">
                      {currentCitizen.taxBenefitContract.expirationDate?.toLocaleDateString() || "N/A"}
                    </span>
                  </div>

                  <Separator className="bg-green-400/20" />

                  <div>
                    <h5 className="text-green-400 font-semibold mb-2">Filing Requirements</h5>
                    <ul className="space-y-1">
                      {(currentCitizen.taxBenefitContract.filingRequirements || []).map((req, index) => (
                        <li key={index} className="text-sm text-gray-400 flex items-center">
                          <div className="w-1 h-1 bg-green-400 rounded-full mr-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => prepareTaxDocuments(currentCitizen.id)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Prepare Tax Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Citizenship Benefits */}
            <Card className="bg-black/20 border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Citizenship Benefits
                </CardTitle>
                <CardDescription>Your active global citizenship privileges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Credit Line Replacement */}
            <Card className="bg-black/20 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Credit Line Replacement
                </CardTitle>
                <CardDescription>SNAPPCREDITCOM 509a2 inclusive lending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">QGI Replacement Value</span>
                    <span className="text-blue-400 font-semibold">
                      ${currentCitizen.creditLineReplacement.qgiReplacementValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Effective Date</span>
                    <span className="text-blue-400">
                      {currentCitizen.creditLineReplacement.effectiveDate.toLocaleDateString()}
                    </span>
                  </div>
                  <Separator className="bg-blue-400/20" />
                  <div>
                    <h5 className="text-blue-400 font-semibold mb-2 text-sm">Terms</h5>
                    <ul className="space-y-1">
                      {currentCitizen.creditLineReplacement.terms.map((term, index) => (
                        <li key={index} className="text-xs text-gray-400 flex items-start">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bond Investment Details */}
            <Card className="bg-black/20 border-amber-400/20">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  US 50yr Corporate Bond
                </CardTitle>
                <CardDescription>Your automatic bond investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Bond Value</span>
                    <span className="text-amber-400 font-semibold">
                      ${currentCitizen.bondAllocation.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Purchase Date</span>
                    <span className="text-amber-400">
                      {currentCitizen.bondPurchaseDate?.toLocaleDateString() || "Pending"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Maturity Date</span>
                    <span className="text-amber-400">
                      {currentCitizen.bondMaturityDate?.toLocaleDateString() || "Pending"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Annual Yield</span>
                    <span className="text-green-400 font-semibold">${bondYield.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Certificate ID</span>
                    <span className="text-amber-400 font-mono text-xs">
                      {currentCitizen.bondCertificateId || "Pending"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-black/20 border-gray-400/20">
              <CardHeader>
                <CardTitle className="text-gray-400 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-amber-400/30 text-amber-400">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="w-full border-blue-400/30 text-blue-400">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View QGI Performance
                  </Button>
                  <Button variant="outline" className="w-full border-green-400/30 text-green-400">
                    <Shield className="w-4 h-4 mr-2" />
                    Manage Domicile
                  </Button>
                  <Button variant="outline" className="w-full border-purple-400/30 text-purple-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
