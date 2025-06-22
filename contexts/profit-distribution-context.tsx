"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Define types for Profit Distribution system
export interface ProfitDistribution {
  id: string
  date: Date
  totalProfit: number
  distributionBreakdown: {
    socialImpactQGI: number // 1/3 of profit
    iBankTrust: number // 1/3 of profit
    longTermBond: number // 1/3 of profit
  }
  source: "membership_fees" | "qgi_returns" | "bond_yields" | "marketplace_fees" | "other"
  status: "pending" | "distributed" | "completed"
  transactionIds: {
    socialImpactId?: string
    iBankTrustId?: string
    bondPurchaseId?: string
  }
}

export interface IBankTrustAccount {
  accountId: string
  accountType: "operational" | "reserve" | "maturity_proceeds"
  balance: number
  currency: "USD"
  lastUpdated: Date
  transactions: IBankTransaction[]
  interestRate: number
  compoundingFrequency: "daily" | "monthly" | "quarterly" | "annually"
}

export interface IBankTransaction {
  id: string
  date: Date
  type: "deposit" | "withdrawal" | "interest" | "transfer"
  amount: number
  description: string
  source: "profit_distribution" | "bond_maturity" | "interest_earned" | "operational"
  balance: number
}

export interface LongTermBond {
  bondId: string
  purchaseDate: Date
  maturityDate: Date
  principalAmount: number
  currentValue: number
  yieldRate: number
  bondType: "infrastructure_education_bond"
  status: "active" | "matured" | "redeemed"

  // Maturity Distribution Plan
  maturityDistribution: {
    totalMaturityValue: number
    infrastructureEducationAid: number // 50% of maturity value
    iBankTrustTransfer: number // 50% of maturity value
  }

  // Infrastructure/Education Allocation
  socialProgramAllocation: {
    infrastructure: number // 33.33% of the 50%
    education: number // 33.33% of the 50%
    essentialAid: number // 33.34% of the 50%
  }
}

export interface SocialImpactQGIContribution {
  contributionId: string
  date: Date
  amount: number
  source: "profit_distribution"
  impactMetrics: {
    estimatedBeneficiaries: number
    projectsFunded: number
    sustainabilityScore: number
  }
  allocationBreakdown: {
    directImpact: number // 60%
    programDevelopment: number // 25%
    administration: number // 15%
  }
}

export interface InfrastructureEducationFund {
  fundId: string
  totalAssets: number
  lastUpdated: Date

  allocationBreakdown: {
    infrastructure: {
      amount: number
      projects: InfrastructureProject[]
    }
    education: {
      amount: number
      programs: EducationProgram[]
    }
    essentialAid: {
      amount: number
      initiatives: EssentialAidInitiative[]
    }
  }

  performanceMetrics: {
    totalBeneficiaries: number
    projectsCompleted: number
    ongoingProjects: number
    impactScore: number
  }
}

export interface InfrastructureProject {
  projectId: string
  name: string
  description: string
  fundingAmount: number
  status: "planned" | "in_progress" | "completed" | "on_hold"
  startDate: Date
  expectedCompletion: Date
  beneficiaries: number
  location: string
  category: "transportation" | "utilities" | "communications" | "housing" | "healthcare_facilities"
}

export interface EducationProgram {
  programId: string
  name: string
  description: string
  fundingAmount: number
  status: "active" | "completed" | "planned"
  startDate: Date
  duration: number // in months
  participants: number
  ageGroup: "early_childhood" | "primary" | "secondary" | "higher_education" | "adult_learning"
  focus: "literacy" | "numeracy" | "technology" | "vocational" | "leadership" | "entrepreneurship"
}

export interface EssentialAidInitiative {
  initiativeId: string
  name: string
  description: string
  fundingAmount: number
  status: "active" | "completed" | "emergency"
  startDate: Date
  beneficiaries: number
  location: string
  category: "food_security" | "clean_water" | "healthcare" | "emergency_relief" | "housing_assistance"
  urgencyLevel: "low" | "medium" | "high" | "critical"
}

export interface ProfitDistributionSummary {
  totalProfitsDistributed: number
  distributionPeriod: {
    startDate: Date
    endDate: Date
  }

  cumulativeDistributions: {
    socialImpactQGI: {
      totalContributed: number
      beneficiariesReached: number
      projectsFunded: number
    }
    iBankTrust: {
      totalDeposited: number
      interestEarned: number
      currentBalance: number
    }
    longTermBonds: {
      totalInvested: number
      bondsActive: number
      estimatedMaturityValue: number
      yearsToFirstMaturity: number
    }
  }

  projectedImpact: {
    next10Years: {
      socialImpactFunding: number
      infrastructureInvestment: number
      educationFunding: number
      essentialAidProvision: number
    }
    bondMaturityImpact: {
      totalMaturityProceeds: number
      socialProgramFunding: number
      iBankTrustAddition: number
    }
  }
}

interface ProfitDistributionContextType {
  // Current State
  profitDistributions: ProfitDistribution[]
  iBankTrustAccounts: Record<string, IBankTrustAccount>
  longTermBonds: LongTermBond[]
  socialImpactContributions: SocialImpactQGIContribution[]
  infrastructureEducationFund: InfrastructureEducationFund
  distributionSummary: ProfitDistributionSummary

  // Distribution Functions
  distributeProfit: (totalProfit: number, source: string) => Promise<ProfitDistribution>
  calculateDistribution: (totalProfit: number) => {
    socialImpactQGI: number
    iBankTrust: number
    longTermBond: number
  }

  // Social Impact QGI Functions
  contributeToSocialImpactQGI: (amount: number) => Promise<SocialImpactQGIContribution>
  getSocialImpactMetrics: () => any

  // iBank&Trust Functions
  depositToIBankTrust: (amount: number, accountType: string) => Promise<IBankTransaction>
  getIBankTrustBalance: (accountType: string) => number
  calculateIBankInterest: (accountId: string) => number

  // Long-Term Bond Functions
  purchaseLongTermBond: (amount: number) => Promise<LongTermBond>
  calculateBondMaturityValue: (bondId: string) => number
  planBondMaturityDistribution: (bondId: string) => {
    infrastructureEducationAid: number
    iBankTrustTransfer: number
  }

  // Infrastructure/Education Fund Functions
  allocateToInfrastructure: (amount: number) => Promise<void>
  allocateToEducation: (amount: number) => Promise<void>
  allocateToEssentialAid: (amount: number) => Promise<void>
  createInfrastructureProject: (project: Omit<InfrastructureProject, "projectId">) => Promise<InfrastructureProject>
  createEducationProgram: (program: Omit<EducationProgram, "programId">) => Promise<EducationProgram>
  createEssentialAidInitiative: (
    initiative: Omit<EssentialAidInitiative, "initiativeId">,
  ) => Promise<EssentialAidInitiative>

  // Reporting Functions
  generateDistributionReport: (startDate: Date, endDate: Date) => Promise<any>
  getProjectedImpact: (years: number) => any
  getBondMaturitySchedule: () => LongTermBond[]
  getSocialProgramFunding: () => any

  // Utility Functions
  validateDistribution: (distribution: ProfitDistribution) => boolean
  getDistributionHistory: (limit?: number) => ProfitDistribution[]
  calculateTotalImpact: () => any
}

const ProfitDistributionContext = createContext<ProfitDistributionContextType | undefined>(undefined)

export const useProfitDistribution = () => {
  const context = useContext(ProfitDistributionContext)
  if (!context) {
    throw new Error("useProfitDistribution must be used within a ProfitDistributionProvider")
  }
  return context
}

// Sample data
const sampleIBankTrustAccounts: Record<string, IBankTrustAccount> = {
  operational: {
    accountId: "IBANK-OP-001",
    accountType: "operational",
    balance: 2500000,
    currency: "USD",
    lastUpdated: new Date(),
    transactions: [],
    interestRate: 0.035, // 3.5% annual
    compoundingFrequency: "monthly",
  },
  reserve: {
    accountId: "IBANK-RES-001",
    accountType: "reserve",
    balance: 1750000,
    currency: "USD",
    lastUpdated: new Date(),
    transactions: [],
    interestRate: 0.042, // 4.2% annual
    compoundingFrequency: "quarterly",
  },
  maturity_proceeds: {
    accountId: "IBANK-MAT-001",
    accountType: "maturity_proceeds",
    balance: 0, // Will receive bond maturity proceeds in 50 years
    currency: "USD",
    lastUpdated: new Date(),
    transactions: [],
    interestRate: 0.045, // 4.5% annual
    compoundingFrequency: "annually",
  },
}

const sampleInfrastructureEducationFund: InfrastructureEducationFund = {
  fundId: "IEF-001",
  totalAssets: 15000000,
  lastUpdated: new Date(),
  allocationBreakdown: {
    infrastructure: {
      amount: 5000000,
      projects: [
        {
          projectId: "INFRA-001",
          name: "Global Digital Infrastructure Network",
          description: "Expanding high-speed internet access to underserved communities",
          fundingAmount: 2500000,
          status: "in_progress",
          startDate: new Date(2024, 0, 1),
          expectedCompletion: new Date(2026, 11, 31),
          beneficiaries: 50000,
          location: "Multiple Global Locations",
          category: "communications",
        },
      ],
    },
    education: {
      amount: 5000000,
      programs: [
        {
          programId: "EDU-001",
          name: "Global Financial Literacy Initiative",
          description: "Teaching financial literacy and investment principles worldwide",
          fundingAmount: 1500000,
          status: "active",
          startDate: new Date(2024, 2, 1),
          duration: 36,
          participants: 25000,
          ageGroup: "adult_learning",
          focus: "entrepreneurship",
        },
      ],
    },
    essentialAid: {
      amount: 5000000,
      initiatives: [
        {
          initiativeId: "AID-001",
          name: "Clean Water Access Program",
          description: "Providing clean water infrastructure to communities in need",
          fundingAmount: 2000000,
          status: "active",
          startDate: new Date(2024, 1, 1),
          beneficiaries: 75000,
          location: "Sub-Saharan Africa",
          category: "clean_water",
          urgencyLevel: "high",
        },
      ],
    },
  },
  performanceMetrics: {
    totalBeneficiaries: 150000,
    projectsCompleted: 12,
    ongoingProjects: 8,
    impactScore: 8.7,
  },
}

export const ProfitDistributionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profitDistributions, setProfitDistributions] = useState<ProfitDistribution[]>([])
  const [iBankTrustAccounts, setIBankTrustAccounts] =
    useState<Record<string, IBankTrustAccount>>(sampleIBankTrustAccounts)
  const [longTermBonds, setLongTermBonds] = useState<LongTermBond[]>([])
  const [socialImpactContributions, setSocialImpactContributions] = useState<SocialImpactQGIContribution[]>([])
  const [infrastructureEducationFund, setInfrastructureEducationFund] = useState<InfrastructureEducationFund>(
    sampleInfrastructureEducationFund,
  )

  // Calculate distribution breakdown
  const calculateDistribution = (totalProfit: number) => {
    const oneThird = totalProfit / 3
    return {
      socialImpactQGI: oneThird,
      iBankTrust: oneThird,
      longTermBond: oneThird,
    }
  }

  // Main profit distribution function
  const distributeProfit = async (totalProfit: number, source: string): Promise<ProfitDistribution> => {
    const distribution = calculateDistribution(totalProfit)

    const newDistribution: ProfitDistribution = {
      id: `DIST-${Date.now()}`,
      date: new Date(),
      totalProfit,
      distributionBreakdown: distribution,
      source: source as any,
      status: "pending",
      transactionIds: {},
    }

    try {
      // 1. Contribute to Social Impact QGI
      const socialImpactContribution = await contributeToSocialImpactQGI(distribution.socialImpactQGI)
      newDistribution.transactionIds.socialImpactId = socialImpactContribution.contributionId

      // 2. Deposit to iBank&Trust
      const iBankTransaction = await depositToIBankTrust(distribution.iBankTrust, "operational")
      newDistribution.transactionIds.iBankTrustId = iBankTransaction.id

      // 3. Purchase Long-Term Bond
      const longTermBond = await purchaseLongTermBond(distribution.longTermBond)
      newDistribution.transactionIds.bondPurchaseId = longTermBond.bondId

      newDistribution.status = "distributed"
      setProfitDistributions((prev) => [...prev, newDistribution])

      return newDistribution
    } catch (error) {
      console.error("Profit distribution failed:", error)
      newDistribution.status = "pending"
      setProfitDistributions((prev) => [...prev, newDistribution])
      throw error
    }
  }

  // Social Impact QGI Functions
  const contributeToSocialImpactQGI = async (amount: number): Promise<SocialImpactQGIContribution> => {
    const contribution: SocialImpactQGIContribution = {
      contributionId: `SIQ-${Date.now()}`,
      date: new Date(),
      amount,
      source: "profit_distribution",
      impactMetrics: {
        estimatedBeneficiaries: Math.floor(amount / 10), // $10 per beneficiary estimate
        projectsFunded: Math.floor(amount / 50000), // $50k per project estimate
        sustainabilityScore: 8.5,
      },
      allocationBreakdown: {
        directImpact: amount * 0.6,
        programDevelopment: amount * 0.25,
        administration: amount * 0.15,
      },
    }

    setSocialImpactContributions((prev) => [...prev, contribution])
    return contribution
  }

  const getSocialImpactMetrics = () => {
    const totalContributed = socialImpactContributions.reduce((sum, contrib) => sum + contrib.amount, 0)
    const totalBeneficiaries = socialImpactContributions.reduce(
      (sum, contrib) => sum + contrib.impactMetrics.estimatedBeneficiaries,
      0,
    )
    const totalProjects = socialImpactContributions.reduce(
      (sum, contrib) => sum + contrib.impactMetrics.projectsFunded,
      0,
    )

    return {
      totalContributed,
      totalBeneficiaries,
      totalProjects,
      averageImpactScore:
        socialImpactContributions.reduce((sum, contrib) => sum + contrib.impactMetrics.sustainabilityScore, 0) /
          socialImpactContributions.length || 0,
    }
  }

  // iBank&Trust Functions
  const depositToIBankTrust = async (amount: number, accountType: string): Promise<IBankTransaction> => {
    const account = iBankTrustAccounts[accountType]
    if (!account) throw new Error(`Account type ${accountType} not found`)

    const transaction: IBankTransaction = {
      id: `IBANK-TXN-${Date.now()}`,
      date: new Date(),
      type: "deposit",
      amount,
      description: `Profit distribution deposit - 1/3 allocation`,
      source: "profit_distribution",
      balance: account.balance + amount,
    }

    setIBankTrustAccounts((prev) => ({
      ...prev,
      [accountType]: {
        ...account,
        balance: account.balance + amount,
        lastUpdated: new Date(),
        transactions: [...account.transactions, transaction],
      },
    }))

    return transaction
  }

  const getIBankTrustBalance = (accountType: string): number => {
    return iBankTrustAccounts[accountType]?.balance || 0
  }

  const calculateIBankInterest = (accountId: string): number => {
    const account = Object.values(iBankTrustAccounts).find((acc) => acc.accountId === accountId)
    if (!account) return 0

    const annualInterest = account.balance * account.interestRate
    switch (account.compoundingFrequency) {
      case "monthly":
        return annualInterest / 12
      case "quarterly":
        return annualInterest / 4
      case "annually":
        return annualInterest
      default:
        return annualInterest / 365 // daily
    }
  }

  // Long-Term Bond Functions
  const purchaseLongTermBond = async (amount: number): Promise<LongTermBond> => {
    const purchaseDate = new Date()
    const maturityDate = new Date(purchaseDate)
    maturityDate.setFullYear(maturityDate.getFullYear() + 50)

    // Calculate maturity value (assuming 4.5% annual compound growth)
    const maturityValue = amount * Math.pow(1.045, 50)

    const bond: LongTermBond = {
      bondId: `BOND-LT-${Date.now()}`,
      purchaseDate,
      maturityDate,
      principalAmount: amount,
      currentValue: amount,
      yieldRate: 0.045,
      bondType: "infrastructure_education_bond",
      status: "active",
      maturityDistribution: {
        totalMaturityValue: maturityValue,
        infrastructureEducationAid: maturityValue * 0.5, // 50% to social programs
        iBankTrustTransfer: maturityValue * 0.5, // 50% to iBank&Trust
      },
      socialProgramAllocation: {
        infrastructure: (maturityValue * 0.5) / 3, // 33.33% of the 50%
        education: (maturityValue * 0.5) / 3, // 33.33% of the 50%
        essentialAid: (maturityValue * 0.5) / 3, // 33.34% of the 50%
      },
    }

    setLongTermBonds((prev) => [...prev, bond])
    return bond
  }

  const calculateBondMaturityValue = (bondId: string): number => {
    const bond = longTermBonds.find((b) => b.bondId === bondId)
    if (!bond) return 0

    const yearsToMaturity = (bond.maturityDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365)
    return bond.principalAmount * Math.pow(1 + bond.yieldRate, Math.max(0, yearsToMaturity))
  }

  const planBondMaturityDistribution = (bondId: string) => {
    const bond = longTermBonds.find((b) => b.bondId === bondId)
    if (!bond) return { infrastructureEducationAid: 0, iBankTrustTransfer: 0 }

    return {
      infrastructureEducationAid: bond.maturityDistribution.infrastructureEducationAid,
      iBankTrustTransfer: bond.maturityDistribution.iBankTrustTransfer,
    }
  }

  // Infrastructure/Education Fund Functions
  const allocateToInfrastructure = async (amount: number): Promise<void> => {
    setInfrastructureEducationFund((prev) => ({
      ...prev,
      allocationBreakdown: {
        ...prev.allocationBreakdown,
        infrastructure: {
          ...prev.allocationBreakdown.infrastructure,
          amount: prev.allocationBreakdown.infrastructure.amount + amount,
        },
      },
      totalAssets: prev.totalAssets + amount,
      lastUpdated: new Date(),
    }))
  }

  const allocateToEducation = async (amount: number): Promise<void> => {
    setInfrastructureEducationFund((prev) => ({
      ...prev,
      allocationBreakdown: {
        ...prev.allocationBreakdown,
        education: {
          ...prev.allocationBreakdown.education,
          amount: prev.allocationBreakdown.education.amount + amount,
        },
      },
      totalAssets: prev.totalAssets + amount,
      lastUpdated: new Date(),
    }))
  }

  const allocateToEssentialAid = async (amount: number): Promise<void> => {
    setInfrastructureEducationFund((prev) => ({
      ...prev,
      allocationBreakdown: {
        ...prev.allocationBreakdown,
        essentialAid: {
          ...prev.allocationBreakdown.essentialAid,
          amount: prev.allocationBreakdown.essentialAid.amount + amount,
        },
      },
      totalAssets: prev.totalAssets + amount,
      lastUpdated: new Date(),
    }))
  }

  const createInfrastructureProject = async (
    project: Omit<InfrastructureProject, "projectId">,
  ): Promise<InfrastructureProject> => {
    const newProject: InfrastructureProject = {
      ...project,
      projectId: `INFRA-${Date.now()}`,
    }

    setInfrastructureEducationFund((prev) => ({
      ...prev,
      allocationBreakdown: {
        ...prev.allocationBreakdown,
        infrastructure: {
          ...prev.allocationBreakdown.infrastructure,
          projects: [...prev.allocationBreakdown.infrastructure.projects, newProject],
        },
      },
    }))

    return newProject
  }

  const createEducationProgram = async (program: Omit<EducationProgram, "programId">): Promise<EducationProgram> => {
    const newProgram: EducationProgram = {
      ...program,
      programId: `EDU-${Date.now()}`,
    }

    setInfrastructureEducationFund((prev) => ({
      ...prev,
      allocationBreakdown: {
        ...prev.allocationBreakdown,
        education: {
          ...prev.allocationBreakdown.education,
          programs: [...prev.allocationBreakdown.education.programs, newProgram],
        },
      },
    }))

    return newProgram
  }

  const createEssentialAidInitiative = async (
    initiative: Omit<EssentialAidInitiative, "initiativeId">,
  ): Promise<EssentialAidInitiative> => {
    const newInitiative: EssentialAidInitiative = {
      ...initiative,
      initiativeId: `AID-${Date.now()}`,
    }

    setInfrastructureEducationFund((prev) => ({
      ...prev,
      allocationBreakdown: {
        ...prev.allocationBreakdown,
        essentialAid: {
          ...prev.allocationBreakdown.essentialAid,
          initiatives: [...prev.allocationBreakdown.essentialAid.initiatives, newInitiative],
        },
      },
    }))

    return newInitiative
  }

  // Utility Functions
  const validateDistribution = (distribution: ProfitDistribution): boolean => {
    const { socialImpactQGI, iBankTrust, longTermBond } = distribution.distributionBreakdown
    const total = socialImpactQGI + iBankTrust + longTermBond
    return Math.abs(total - distribution.totalProfit) < 0.01 // Allow for rounding errors
  }

  const getDistributionHistory = (limit?: number): ProfitDistribution[] => {
    const sorted = [...profitDistributions].sort((a, b) => b.date.getTime() - a.date.getTime())
    return limit ? sorted.slice(0, limit) : sorted
  }

  const calculateTotalImpact = () => {
    const socialImpact = getSocialImpactMetrics()
    const totalIBankBalance = Object.values(iBankTrustAccounts).reduce((sum, account) => sum + account.balance, 0)
    const totalBondValue = longTermBonds.reduce((sum, bond) => sum + calculateBondMaturityValue(bond.bondId), 0)

    return {
      socialImpact,
      iBankTrustTotal: totalIBankBalance,
      longTermBondValue: totalBondValue,
      infrastructureEducationFund: infrastructureEducationFund.totalAssets,
    }
  }

  // Generate comprehensive distribution summary
  const distributionSummary: ProfitDistributionSummary = {
    totalProfitsDistributed: profitDistributions.reduce((sum, dist) => sum + dist.totalProfit, 0),
    distributionPeriod: {
      startDate: new Date(2024, 0, 1),
      endDate: new Date(),
    },
    cumulativeDistributions: {
      socialImpactQGI: {
        totalContributed: socialImpactContributions.reduce((sum, contrib) => sum + contrib.amount, 0),
        beneficiariesReached: socialImpactContributions.reduce(
          (sum, contrib) => sum + contrib.impactMetrics.estimatedBeneficiaries,
          0,
        ),
        projectsFunded: socialImpactContributions.reduce(
          (sum, contrib) => sum + contrib.impactMetrics.projectsFunded,
          0,
        ),
      },
      iBankTrust: {
        totalDeposited: Object.values(iBankTrustAccounts).reduce((sum, account) => sum + account.balance, 0),
        interestEarned: Object.values(iBankTrustAccounts).reduce(
          (sum, account) => sum + calculateIBankInterest(account.accountId),
          0,
        ),
        currentBalance: Object.values(iBankTrustAccounts).reduce((sum, account) => sum + account.balance, 0),
      },
      longTermBonds: {
        totalInvested: longTermBonds.reduce((sum, bond) => sum + bond.principalAmount, 0),
        bondsActive: longTermBonds.filter((bond) => bond.status === "active").length,
        estimatedMaturityValue: longTermBonds.reduce(
          (sum, bond) => sum + bond.maturityDistribution.totalMaturityValue,
          0,
        ),
        yearsToFirstMaturity:
          longTermBonds.length > 0
            ? Math.min(
                ...longTermBonds.map(
                  (bond) => (bond.maturityDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365),
                ),
              )
            : 0,
      },
    },
    projectedImpact: {
      next10Years: {
        socialImpactFunding: socialImpactContributions.reduce((sum, contrib) => sum + contrib.amount, 0) * 10,
        infrastructureInvestment: infrastructureEducationFund.allocationBreakdown.infrastructure.amount * 5,
        educationFunding: infrastructureEducationFund.allocationBreakdown.education.amount * 5,
        essentialAidProvision: infrastructureEducationFund.allocationBreakdown.essentialAid.amount * 5,
      },
      bondMaturityImpact: {
        totalMaturityProceeds: longTermBonds.reduce(
          (sum, bond) => sum + bond.maturityDistribution.totalMaturityValue,
          0,
        ),
        socialProgramFunding: longTermBonds.reduce(
          (sum, bond) => sum + bond.maturityDistribution.infrastructureEducationAid,
          0,
        ),
        iBankTrustAddition: longTermBonds.reduce((sum, bond) => sum + bond.maturityDistribution.iBankTrustTransfer, 0),
      },
    },
  }

  // Additional utility functions
  const generateDistributionReport = async (startDate: Date, endDate: Date) => {
    const filteredDistributions = profitDistributions.filter((dist) => dist.date >= startDate && dist.date <= endDate)

    return {
      period: { startDate, endDate },
      distributions: filteredDistributions,
      summary: {
        totalProfit: filteredDistributions.reduce((sum, dist) => sum + dist.totalProfit, 0),
        socialImpactTotal: filteredDistributions.reduce(
          (sum, dist) => sum + dist.distributionBreakdown.socialImpactQGI,
          0,
        ),
        iBankTrustTotal: filteredDistributions.reduce((sum, dist) => sum + dist.distributionBreakdown.iBankTrust, 0),
        longTermBondTotal: filteredDistributions.reduce(
          (sum, dist) => sum + dist.distributionBreakdown.longTermBond,
          0,
        ),
      },
    }
  }

  const getProjectedImpact = (years: number) => {
    const currentAnnualDistribution = profitDistributions.reduce((sum, dist) => sum + dist.totalProfit, 0)
    const projectedTotal = currentAnnualDistribution * years

    return {
      totalProjectedProfit: projectedTotal,
      socialImpactProjection: projectedTotal / 3,
      iBankTrustProjection: projectedTotal / 3,
      longTermBondProjection: projectedTotal / 3,
      estimatedBeneficiaries: (projectedTotal / 3 / 10) * years,
      estimatedProjects: (projectedTotal / 3 / 50000) * years,
    }
  }

  const getBondMaturitySchedule = (): LongTermBond[] => {
    return longTermBonds
      .filter((bond) => bond.status === "active")
      .sort((a, b) => a.maturityDate.getTime() - b.maturityDate.getTime())
  }

  const getSocialProgramFunding = () => {
    return {
      currentFunding: infrastructureEducationFund.totalAssets,
      projectedBondMaturityFunding: longTermBonds.reduce(
        (sum, bond) => sum + bond.maturityDistribution.infrastructureEducationAid,
        0,
      ),
      breakdown: infrastructureEducationFund.allocationBreakdown,
      performanceMetrics: infrastructureEducationFund.performanceMetrics,
    }
  }

  return (
    <ProfitDistributionContext.Provider
      value={{
        profitDistributions,
        iBankTrustAccounts,
        longTermBonds,
        socialImpactContributions,
        infrastructureEducationFund,
        distributionSummary,
        distributeProfit,
        calculateDistribution,
        contributeToSocialImpactQGI,
        getSocialImpactMetrics,
        depositToIBankTrust,
        getIBankTrustBalance,
        calculateIBankInterest,
        purchaseLongTermBond,
        calculateBondMaturityValue,
        planBondMaturityDistribution,
        allocateToInfrastructure,
        allocateToEducation,
        allocateToEssentialAid,
        createInfrastructureProject,
        createEducationProgram,
        createEssentialAidInitiative,
        generateDistributionReport,
        getProjectedImpact,
        getBondMaturitySchedule,
        getSocialProgramFunding,
        validateDistribution,
        getDistributionHistory,
        calculateTotalImpact,
      }}
    >
      {children}
    </ProfitDistributionContext.Provider>
  )
}
