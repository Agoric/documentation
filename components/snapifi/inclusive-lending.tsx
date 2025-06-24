"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Building,
  Shield,
  TrendingUp,
  Globe,
  Coins,
  Calculator,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
} from "lucide-react"

interface LoanProduct {
  id: string
  name: string
  description: string
  minAmount: number
  maxAmount: number
  interestRate: number
  term: number
  features: string[]
  eligibility: string[]
  nftTokenized: boolean
  international: boolean
}

export function InclusiveLending() {
  const [loanAmount, setLoanAmount] = useState([250000])
  const [creditScore, setCreditScore] = useState(720)
  const [income, setIncome] = useState(85000)
  const [selectedLoan, setSelectedLoan] = useState<string>("asset-backed-50")

  const loanProducts: LoanProduct[] = [
    {
      id: "asset-backed-50",
      name: "50-Year Asset-Backed Loan",
      description: "Revolutionary 50-year loan terms with NFT tokenization for reduced default risk",
      minAmount: 100000,
      maxAmount: 2000000,
      interestRate: 3.2,
      term: 50,
      features: [
        "NFT tokenization for secondary market trading",
        "Reduced monthly payments",
        "Asset-backed security",
        "Flexible repayment options",
      ],
      eligibility: ["Credit score 650+", "Stable income", "Asset collateral"],
      nftTokenized: true,
      international: false,
    },
    {
      id: "consolidation-loan",
      name: "Debt Consolidation Loan",
      description: "Consolidate unsecured loans with extended terms and lower payments",
      minAmount: 25000,
      maxAmount: 500000,
      interestRate: 4.5,
      term: 30,
      features: [
        "Consolidate multiple debts",
        "Lower monthly payments",
        "Fixed interest rates",
        "No prepayment penalties",
      ],
      eligibility: ["Credit score 600+", "Debt-to-income ratio <50%", "Employment verification"],
      nftTokenized: false,
      international: false,
    },
    {
      id: "international-loan",
      name: "International Lending Program",
      description: "Specialized loans for Philippine banks and international markets",
      minAmount: 500000,
      maxAmount: 10000000,
      interestRate: 5.8,
      term: 25,
      features: [
        "International market exposure",
        "Currency hedging options",
        "Risk management tools",
        "Regulatory compliance",
      ],
      eligibility: ["Institutional borrower", "International banking license", "Regulatory approval"],
      nftTokenized: true,
      international: true,
    },
    {
      id: "real-estate-accelerator",
      name: "Real Estate Accelerator",
      description: "Fast-track property acquisition with accelerated down payment programs",
      minAmount: 50000,
      maxAmount: 1000000,
      interestRate: 3.8,
      term: 30,
      features: [
        "Accelerated down payment assistance",
        "Property acquisition focus",
        "Investment property eligible",
        "Portfolio building support",
      ],
      eligibility: ["Credit score 700+", "Real estate investment experience", "Down payment 10%+"],
      nftTokenized: true,
      international: false,
    },
  ]

  const currentLoan = loanProducts.find((loan) => loan.id === selectedLoan) || loanProducts[0]

  const calculateMonthlyPayment = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12
    const numPayments = years * 12
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    return monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment(loanAmount[0], currentLoan.interestRate, currentLoan.term)
  const traditionalPayment = calculateMonthlyPayment(loanAmount[0], currentLoan.interestRate, 30)

  const eligibilityScore = () => {
    let score = 0
    if (creditScore >= 700) score += 40
    else if (creditScore >= 650) score += 30
    else if (creditScore >= 600) score += 20

    if (income >= 100000) score += 30
    else if (income >= 75000) score += 25
    else if (income >= 50000) score += 20

    if (loanAmount[0] <= 500000) score += 20
    else if (loanAmount[0] <= 1000000) score += 15
    else score += 10

    return Math.min(score, 100)
  }

  const userEligibility = eligibilityScore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inclusive Lending Platform</h2>
          <p className="text-muted-foreground">Asset-backed loans with innovative 50-year terms and NFT tokenization</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          <Shield className="h-3 w-3 mr-1" />
          Quantum Approved
        </Badge>
      </div>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
          <TabsTrigger value="products">Loan Products</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="application">Apply Now</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calculator Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Loan Calculator</span>
                </CardTitle>
                <CardDescription>Calculate your monthly payments with our innovative loan terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Loan Amount: ${loanAmount[0].toLocaleString()}</Label>
                  <Slider
                    value={loanAmount}
                    onValueChange={setLoanAmount}
                    max={2000000}
                    min={25000}
                    step={25000}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credit-score">Credit Score</Label>
                  <Input
                    id="credit-score"
                    type="number"
                    value={creditScore}
                    onChange={(e) => setCreditScore(Number(e.target.value))}
                    min="300"
                    max="850"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Loan Product</Label>
                  <select
                    value={selectedLoan}
                    onChange={(e) => setSelectedLoan(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    {loanProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Comparison</CardTitle>
                <CardDescription>See how our innovative terms save you money</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ${Math.round(monthlyPayment).toLocaleString()}
                    </div>
                    <p className="text-sm text-blue-800">{currentLoan.term}-Year Term</p>
                    <p className="text-xs text-muted-foreground">Monthly Payment</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">
                      ${Math.round(traditionalPayment).toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-800">30-Year Term</p>
                    <p className="text-xs text-muted-foreground">Traditional Payment</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monthly Savings</span>
                    <span className="font-bold text-green-600">
                      ${Math.round(traditionalPayment - monthlyPayment).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate</span>
                    <span className="font-bold">{currentLoan.interestRate}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan Term</span>
                    <span className="font-bold">{currentLoan.term} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest</span>
                    <span className="font-bold">
                      ${Math.round(monthlyPayment * currentLoan.term * 12 - loanAmount[0]).toLocaleString()}
                    </span>
                  </div>
                </div>

                {currentLoan.nftTokenized && (
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Coins className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-900">NFT Tokenized</span>
                    </div>
                    <p className="text-sm text-purple-800">
                      This loan can be tokenized as an NFT for secondary market trading
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Eligibility Score</span>
                    <span>{userEligibility}%</span>
                  </div>
                  <Progress value={userEligibility} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {userEligibility >= 80 ? "Excellent" : userEligibility >= 60 ? "Good" : "Fair"} approval chances
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loanProducts.map((product) => (
              <Card
                key={product.id}
                className={`cursor-pointer transition-all ${selectedLoan === product.id ? "ring-2 ring-blue-500" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>{product.name}</span>
                    </CardTitle>
                    <div className="flex space-x-1">
                      {product.nftTokenized && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Coins className="h-3 w-3 mr-1" />
                          NFT
                        </Badge>
                      )}
                      {product.international && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Globe className="h-3 w-3 mr-1" />
                          Global
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">{product.interestRate}%</div>
                      <p className="text-xs text-muted-foreground">Interest Rate</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{product.term} years</div>
                      <p className="text-xs text-muted-foreground">Loan Term</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Features</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Eligibility</h4>
                    <ul className="space-y-1">
                      {product.eligibility.map((requirement, index) => (
                        <li key={index} className="flex items-center text-xs">
                          <AlertCircle className="h-3 w-3 text-orange-600 mr-2" />
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => setSelectedLoan(product.id)}
                    variant={selectedLoan === product.id ? "default" : "outline"}
                  >
                    {selectedLoan === product.id ? "Selected" : "Select Product"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Eligibility Assessment</span>
              </CardTitle>
              <CardDescription>Quantum-powered eligibility analysis for optimal loan matching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{userEligibility}%</div>
                <p className="text-muted-foreground">Overall Eligibility Score</p>
                <Progress value={userEligibility} className="h-3 mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{creditScore}</div>
                  <p className="text-sm text-muted-foreground">Credit Score</p>
                  <Badge
                    className={creditScore >= 700 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                  >
                    {creditScore >= 700 ? "Excellent" : "Good"}
                  </Badge>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">${income.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Annual Income</p>
                  <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">${loanAmount[0].toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Requested Amount</p>
                  <Badge className="bg-purple-100 text-purple-800">Qualified</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recommended Actions</h4>
                <div className="space-y-2">
                  {userEligibility < 80 && (
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900">Improve Credit Score</p>
                        <p className="text-sm text-yellow-800">
                          Consider credit optimization strategies to increase approval odds
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Pre-Qualified</p>
                      <p className="text-sm text-green-800">You meet the basic requirements for our lending programs</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Loan Application</span>
              </CardTitle>
              <CardDescription>Start your application for {currentLoan.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Selected Loan Product</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-800">Product:</span>
                    <span className="font-medium ml-2">{currentLoan.name}</span>
                  </div>
                  <div>
                    <span className="text-blue-800">Amount:</span>
                    <span className="font-medium ml-2">${loanAmount[0].toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-blue-800">Rate:</span>
                    <span className="font-medium ml-2">{currentLoan.interestRate}% APR</span>
                  </div>
                  <div>
                    <span className="text-blue-800">Term:</span>
                    <span className="font-medium ml-2">{currentLoan.term} years</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Application Process</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Submit Application</p>
                      <p className="text-sm text-muted-foreground">Complete our streamlined application form</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Quantum Processing</p>
                      <p className="text-sm text-muted-foreground">AI-powered underwriting in under 60 seconds</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Instant Decision</p>
                      <p className="text-sm text-muted-foreground">Receive approval decision immediately</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Fund Disbursement</p>
                      <p className="text-sm text-muted-foreground">Funds available within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Start Application
                </Button>
                <Button variant="outline" className="flex-1">
                  Schedule Consultation
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Powered by quantum computing for instant processing</p>
                <p>No impact to credit score during pre-qualification</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
