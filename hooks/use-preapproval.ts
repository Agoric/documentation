"use client"

import { useState, useEffect } from "react"

interface PreApprovalData {
  firstName: string
  lastName: string
  email: string
  phone: string
  annualIncome: string
  loanAmount: string
  loanType: string
  propertyType: string
  downPayment: string
  creditScore?: number
}

interface PreApprovalStatus {
  id: string
  status: "pending" | "approved" | "denied" | "expired"
  approvedAmount: number
  interestRate: number
  monthlyPayment: number
  certificateId: string
  expirationDate: string
  daysRemaining: number
  createdAt: Date
  conditions?: string[]
  benefits: string[]
}

interface InstantQuote {
  estimatedRate: number
  monthlyPayment: number
  approvalOdds: number
  maxLoanAmount: number
}

export function usePreApproval() {
  const [preApprovalStatus, setPreApprovalStatus] = useState<PreApprovalStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for existing pre-approval on mount
  useEffect(() => {
    checkExistingPreApproval()
  }, [])

  const checkExistingPreApproval = async () => {
    try {
      // In a real app, this would check localStorage or API
      const stored = localStorage.getItem("preApprovalStatus")
      if (stored) {
        const status = JSON.parse(stored)
        // Check if still valid
        if (new Date(status.expirationDate) > new Date()) {
          setPreApprovalStatus(status)
        } else {
          localStorage.removeItem("preApprovalStatus")
        }
      }
    } catch (error) {
      console.error("Error checking pre-approval status:", error)
    }
  }

  const submitPreApproval = async (data: PreApprovalData): Promise<PreApprovalStatus> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock approval logic based on income and credit
      const income = Number.parseInt(data.annualIncome)
      const loanAmount = Number.parseInt(data.loanAmount)
      const creditScore = data.creditScore || 750

      const debtToIncomeRatio = (loanAmount * 0.004) / (income / 12) // Rough monthly payment estimate
      const approved = debtToIncomeRatio < 0.43 && creditScore > 620 && income > 50000

      if (!approved) {
        throw new Error("Pre-approval denied based on current criteria")
      }

      // Calculate approved amount (conservative estimate)
      const maxApprovedAmount = Math.min(
        loanAmount,
        income * 4, // 4x income rule
        Math.floor((income * 0.28 * 12) / 0.04), // 28% DTI rule
      )

      // Calculate interest rate based on credit score
      let baseRate = 3.1 // 50-year base rate
      if (creditScore < 680) baseRate += 0.5
      else if (creditScore < 720) baseRate += 0.25
      else if (creditScore >= 800) baseRate -= 0.25

      const monthlyPayment = calculateMonthlyPayment(maxApprovedAmount, baseRate, 50)

      const approvalStatus: PreApprovalStatus = {
        id: `PA-${Date.now()}`,
        status: "approved",
        approvedAmount: maxApprovedAmount,
        interestRate: baseRate,
        monthlyPayment,
        certificateId: `CERT-${Date.now().toString(36).toUpperCase()}`,
        expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        daysRemaining: 90,
        createdAt: new Date(),
        benefits: [
          "Exclusive interest rates",
          "Priority processing",
          "Premium property access",
          "Dedicated loan specialist",
          "Closing cost credits",
          "Investor matching priority",
        ],
      }

      // Store in localStorage (in real app, would be in database)
      localStorage.setItem("preApprovalStatus", JSON.stringify(approvalStatus))
      setPreApprovalStatus(approvalStatus)

      return approvalStatus
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Pre-approval failed"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const getInstantQuote = async (params: {
    loanAmount: number
    annualIncome: number
    downPayment: number
    creditScore: number
  }): Promise<InstantQuote> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const { loanAmount, annualIncome, creditScore } = params

    // Calculate estimated rate
    let estimatedRate = 3.1
    if (creditScore < 680) estimatedRate += 0.5
    else if (creditScore < 720) estimatedRate += 0.25
    else if (creditScore >= 800) estimatedRate -= 0.25

    // Calculate monthly payment
    const monthlyPayment = calculateMonthlyPayment(loanAmount, estimatedRate, 50)

    // Calculate approval odds
    const debtToIncomeRatio = monthlyPayment / (annualIncome / 12)
    let approvalOdds = 95
    if (debtToIncomeRatio > 0.28) approvalOdds -= 20
    if (debtToIncomeRatio > 0.36) approvalOdds -= 30
    if (creditScore < 680) approvalOdds -= 25
    if (creditScore < 620) approvalOdds -= 40

    // Calculate max loan amount
    const maxLoanAmount = Math.min(
      annualIncome * 4,
      Math.floor((annualIncome * 0.28 * 12) / (estimatedRate / 100 / 12)),
    )

    return {
      estimatedRate,
      monthlyPayment,
      approvalOdds: Math.max(10, approvalOdds),
      maxLoanAmount,
    }
  }

  const unlockPremiumFeatures = async () => {
    // Simulate unlocking premium features
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      premiumFeaturesUnlocked: true,
      exclusiveRates: true,
      priorityProcessing: true,
      premiumPropertyAccess: true,
      dedicatedSpecialist: true,
      closingCostCredits: 5000,
      investorMatching: true,
    }
  }

  const getPreApprovalBenefits = () => {
    return [
      {
        title: "Exclusive Interest Rates",
        description: "Access to rates 0.25% below market average",
        icon: "TrendingUp",
      },
      {
        title: "Priority Processing",
        description: "Fast-track approval in 24-48 hours",
        icon: "Zap",
      },
      {
        title: "Premium Property Access",
        description: "Early access to luxury and off-market properties",
        icon: "Home",
      },
      {
        title: "Dedicated Loan Specialist",
        description: "Personal loan officer for white-glove service",
        icon: "Users",
      },
      {
        title: "Closing Cost Credits",
        description: "Up to $5,000 in closing cost assistance",
        icon: "Gift",
      },
      {
        title: "Investor Matching Priority",
        description: "Priority matching with premium investors",
        icon: "Star",
      },
    ]
  }

  const calculateMonthlyPayment = (loanAmount: number, interestRate: number, years: number): number => {
    const monthlyRate = interestRate / 100 / 12
    const numPayments = years * 12

    if (monthlyRate === 0) return loanAmount / numPayments

    return Math.round(
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1),
    )
  }

  const isPreApproved = preApprovalStatus?.status === "approved"

  return {
    preApprovalStatus,
    isLoading,
    error,
    isPreApproved,
    submitPreApproval,
    getInstantQuote,
    unlockPremiumFeatures,
    getPreApprovalBenefits,
    checkExistingPreApproval,
  }
}
