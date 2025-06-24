"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Define types for Global Citizenship system
export interface GlobalCitizen {
  id: string
  type: "individual" | "business" | "institution"
  registrationDate: Date
  status: "pending" | "active" | "suspended" | "terminated"

  // Basic Information
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
  }

  // QGI Information
  qgiAllocation: number // $250k for individual, $500k-$1M for business/institution
  qgiInstrumentId: string
  socialImpactScore: number

  // Digital Domicile
  digitalDomicileId: string
  taxBenefitContract: TaxBenefitContract
  membershipDues: MembershipDues

  // Bond Information
  bondAllocation: number // 2/60 of QGI allocation
  bondPurchaseDate?: Date
  bondMaturityDate?: Date
  bondCertificateId?: string

  // SNAPPCREDITCOM Integration
  creditLineReplacement: {
    originalCreditLimit: number
    qgiReplacementValue: number
    effectiveDate: Date
    terms: string[]
  }

  // Profile Specific Data
  individualProfile?: IndividualProfile
  businessProfile?: BusinessProfile
  institutionProfile?: InstitutionProfile
}

export interface IndividualProfile {
  firstName: string
  lastName: string
  dateOfBirth: Date
  nationality: string
  occupation: string
  annualIncome: number
  investmentExperience: "novice" | "intermediate" | "advanced" | "expert"
  riskTolerance: "conservative" | "moderate" | "aggressive"
  investmentGoals: string[]
  kycStatus: "pending" | "verified" | "rejected"
  accreditedInvestor: boolean
}

export interface BusinessProfile {
  businessName: string
  businessType: string
  incorporationDate: Date
  taxId: string
  industry: string
  annualRevenue: number
  employeeCount: number
  businessDescription: string
  keyPersonnel: {
    name: string
    title: string
    ownership: number
  }[]
  complianceStatus: "pending" | "verified" | "rejected"
  businessLicense: string
}

export interface InstitutionProfile {
  institutionName: string
  institutionType: "nonprofit" | "government" | "educational" | "healthcare" | "financial"
  establishedDate: Date
  registrationNumber: string
  mission: string
  assetsUnderManagement: number
  beneficiaryCount: number
  governanceStructure: string
  boardMembers: {
    name: string
    title: string
    tenure: number
  }[]
  regulatoryStatus: "pending" | "verified" | "rejected"
  taxExemptStatus?: string
}

export interface TaxBenefitContract {
  contractId: string
  effectiveDate: Date
  expirationDate: Date
  benefitType: "deduction" | "credit" | "exemption" | "deferral"
  estimatedAnnualBenefit: number
  filingRequirements: string[]
  complianceObligations: string[]
  digitalDomicileJurisdiction: string
  status: "active" | "pending" | "expired" | "terminated"
}

export interface MembershipDues {
  initialPayment: number
  paymentDate: Date
  paymentMethod: string
  recurringAmount: number
  frequency: "monthly" | "quarterly" | "annually"
  nextDueDate: Date
  paymentHistory: {
    date: Date
    amount: number
    status: "paid" | "pending" | "failed"
    transactionId: string
  }[]
}

export interface QGIFund {
  fundId: string
  fundType: "social_impact" | "institutional"
  totalAssets: number
  participantCount: number
  averageAllocation: number
  liquidityRatio: number
  bondHoldings: {
    totalValue: number
    averageMaturity: number
    yieldToMaturity: number
  }
  performanceMetrics: {
    ytdReturn: number
    annualizedReturn: number
    volatility: number
    sharpeRatio: number
  }
  socialImpactMetrics: {
    beneficiariesReached: number
    projectsFunded: number
    sustainabilityScore: number
    communityImpact: number
  }
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
  estimatedTime: number // in minutes
  dependencies: string[]
}

interface GlobalCitizenshipContextType {
  currentCitizen: GlobalCitizen
  onboardingProgress: OnboardingStep[]
  qgiFunds: Record<string, QGIFund>

  // Registration Functions
  startRegistration: (type: "individual" | "business" | "institution") => void
  updateProfile: (profileData: Partial<GlobalCitizen>) => void
  submitRegistration: () => Promise<boolean>

  // Payment Processing
  processMembershipPayment: (paymentData: any) => Promise<boolean>
  calculateQGIAllocation: (type: string, businessSize?: string) => number
  calculateBondAllocation: (qgiAmount: number) => number

  // QGI Fund Management
  addToQGIFund: (citizenId: string, amount: number) => void
  purchaseBond: (citizenId: string, amount: number) => Promise<boolean>
  updateFundLiquidity: (fundType: string, amount: number) => void

  // Tax Benefit System
  generateTaxBenefitContract: (citizen?: GlobalCitizen | null) => TaxBenefitContract | null
  prepareTaxDocuments: (citizenId: string) => Promise<any[]>

  // Digital Domicile
  establishDigitalDomicile: (citizen?: GlobalCitizen | null) => Promise<string | null>
  updateDomicileStatus: (domicileId: string, status: string) => void

  // Credit Line Replacement
  replaceCreditLine: (citizen?: GlobalCitizen | null) => void
  calculateCreditReplacement: (qgiAmount: number) => number

  // Utility Functions
  getOnboardingSteps: (type: string) => OnboardingStep[]
  validateKYC: (citizenId: string) => Promise<boolean>
  generateCitizenshipCertificate: (citizenId: string) => Promise<string>
  getQGIPerformance: (fundType: string) => any
  getCitizenshipBenefits: (citizenId?: string) => string[]
}

const GlobalCitizenshipContext = createContext<GlobalCitizenshipContextType | undefined>(undefined)

export const useGlobalCitizenship = () => {
  const context = useContext(GlobalCitizenshipContext)
  if (!context) {
    throw new Error("useGlobalCitizenship must be used within a GlobalCitizenshipProvider")
  }
  return context
}

// Sample data and configurations
const sampleQGIFunds: Record<string, QGIFund> = {
  social_impact: {
    fundId: "QGI-SI-001",
    fundType: "social_impact",
    totalAssets: 125000000, // $125M
    participantCount: 500,
    averageAllocation: 250000,
    liquidityRatio: 0.15,
    bondHoldings: {
      totalValue: 20833333, // 2/60 of total allocations
      averageMaturity: 50,
      yieldToMaturity: 0.045,
    },
    performanceMetrics: {
      ytdReturn: 0.087,
      annualizedReturn: 0.092,
      volatility: 0.12,
      sharpeRatio: 1.34,
    },
    socialImpactMetrics: {
      beneficiariesReached: 50000,
      projectsFunded: 125,
      sustainabilityScore: 8.7,
      communityImpact: 9.2,
    },
  },
  institutional: {
    fundId: "QGI-INST-001",
    fundType: "institutional",
    totalAssets: 375000000, // $375M
    participantCount: 500,
    averageAllocation: 750000,
    liquidityRatio: 0.18,
    bondHoldings: {
      totalValue: 62500000, // 2/60 of total allocations
      averageMaturity: 50,
      yieldToMaturity: 0.045,
    },
    performanceMetrics: {
      ytdReturn: 0.094,
      annualizedReturn: 0.098,
      volatility: 0.1,
      sharpeRatio: 1.52,
    },
    socialImpactMetrics: {
      beneficiariesReached: 150000,
      projectsFunded: 375,
      sustainabilityScore: 9.1,
      communityImpact: 9.5,
    },
  },
}

const onboardingStepsConfig = {
  individual: [
    {
      id: "personal_info",
      title: "Personal Information",
      description: "Provide basic personal details and contact information",
      completed: false,
      required: true,
      estimatedTime: 5,
      dependencies: [],
    },
    {
      id: "kyc_verification",
      title: "Identity Verification",
      description: "Complete KYC process with document upload",
      completed: false,
      required: true,
      estimatedTime: 10,
      dependencies: ["personal_info"],
    },
    {
      id: "investment_profile",
      title: "Investment Profile",
      description: "Define investment goals and risk tolerance",
      completed: false,
      required: true,
      estimatedTime: 8,
      dependencies: ["kyc_verification"],
    },
    {
      id: "qgi_allocation",
      title: "QGI Allocation Setup",
      description: "Configure your $250,000 Social Impact QGI allocation",
      completed: false,
      required: true,
      estimatedTime: 5,
      dependencies: ["investment_profile"],
    },
    {
      id: "membership_payment",
      title: "Membership Payment",
      description: "Process initial membership dues payment",
      completed: false,
      required: true,
      estimatedTime: 3,
      dependencies: ["qgi_allocation"],
    },
    {
      id: "digital_domicile",
      title: "Digital Domicile Establishment",
      description: "Establish digital domicile and tax benefit contract",
      completed: false,
      required: true,
      estimatedTime: 7,
      dependencies: ["membership_payment"],
    },
    {
      id: "bond_purchase",
      title: "Bond Investment",
      description: "Automatic purchase of US 50-year Corporate Bond",
      completed: false,
      required: true,
      estimatedTime: 2,
      dependencies: ["digital_domicile"],
    },
  ],
  business: [
    {
      id: "business_info",
      title: "Business Information",
      description: "Provide business details and incorporation documents",
      completed: false,
      required: true,
      estimatedTime: 10,
      dependencies: [],
    },
    {
      id: "business_verification",
      title: "Business Verification",
      description: "Verify business registration and compliance status",
      completed: false,
      required: true,
      estimatedTime: 15,
      dependencies: ["business_info"],
    },
    {
      id: "institutional_profile",
      title: "Institutional Profile",
      description: "Define business investment strategy and goals",
      completed: false,
      required: true,
      estimatedTime: 12,
      dependencies: ["business_verification"],
    },
    {
      id: "qgi_sizing",
      title: "QGI Allocation Sizing",
      description: "Determine QGI allocation based on business size ($500K-$1M)",
      completed: false,
      required: true,
      estimatedTime: 8,
      dependencies: ["institutional_profile"],
    },
    {
      id: "membership_payment",
      title: "Membership Payment",
      description: "Process initial institutional membership dues",
      completed: false,
      required: true,
      estimatedTime: 5,
      dependencies: ["qgi_sizing"],
    },
    {
      id: "digital_domicile",
      title: "Digital Domicile Establishment",
      description: "Establish corporate digital domicile and tax benefits",
      completed: false,
      required: true,
      estimatedTime: 10,
      dependencies: ["membership_payment"],
    },
    {
      id: "bond_purchase",
      title: "Bond Investment",
      description: "Automatic purchase of proportional US 50-year Corporate Bond",
      completed: false,
      required: true,
      estimatedTime: 3,
      dependencies: ["digital_domicile"],
    },
  ],
}

export const GlobalCitizenshipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Simple placeholder citizen so UI never crashes before real data loads
  const guestCitizen: GlobalCitizen = {
    id: "guest",
    type: "individual",
    registrationDate: new Date(),
    status: "pending",
    name: "Guest Citizen",
    email: "guest@example.com",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    qgiAllocation: 0,
    qgiInstrumentId: "",
    socialImpactScore: 0,
    digitalDomicileId: "",
    taxBenefitContract: {} as TaxBenefitContract,
    membershipDues: {} as MembershipDues,
    bondAllocation: 0,
    creditLineReplacement: {
      originalCreditLimit: 0,
      qgiReplacementValue: 0,
      effectiveDate: new Date(),
      terms: [],
    },
  }

  const [currentCitizen, setCurrentCitizen] = useState<GlobalCitizen>(guestCitizen)
  const [onboardingProgress, setOnboardingProgress] = useState<OnboardingStep[]>([])
  const [qgiFunds, setQGIFunds] = useState<Record<string, QGIFund>>(sampleQGIFunds)

  // Registration Functions
  const startRegistration = (type: "individual" | "business" | "institution") => {
    const steps = getOnboardingSteps(type)
    setOnboardingProgress(steps)

    const newCitizen: GlobalCitizen = {
      id: `citizen_${Date.now()}`,
      type,
      registrationDate: new Date(),
      status: "pending",
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
      qgiAllocation: calculateQGIAllocation(type),
      qgiInstrumentId: `QGI-${type.toUpperCase()}-${Date.now()}`,
      socialImpactScore: 0,
      digitalDomicileId: "",
      taxBenefitContract: {} as TaxBenefitContract,
      membershipDues: {} as MembershipDues,
      bondAllocation: 0,
      creditLineReplacement: {
        originalCreditLimit: 0,
        qgiReplacementValue: 0,
        effectiveDate: new Date(),
        terms: [],
      },
    }

    newCitizen.bondAllocation = calculateBondAllocation(newCitizen.qgiAllocation)
    setCurrentCitizen(newCitizen)
  }

  const updateProfile = (profileData: Partial<GlobalCitizen>) => {
    if (!currentCitizen) return
    setCurrentCitizen({ ...currentCitizen, ...profileData })
  }

  const submitRegistration = async (): Promise<boolean> => {
    if (!currentCitizen) return false

    try {
      // Simulate registration submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setCurrentCitizen({
        ...currentCitizen,
        status: "active",
      })

      return true
    } catch (error) {
      console.error("Registration submission failed:", error)
      return false
    }
  }

  // Payment Processing
  const processMembershipPayment = async (paymentData: any): Promise<boolean> => {
    if (!currentCitizen) return false

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const membershipDues: MembershipDues = {
        initialPayment: paymentData.amount,
        paymentDate: new Date(),
        paymentMethod: paymentData.method,
        recurringAmount: paymentData.recurringAmount || 0,
        frequency: paymentData.frequency || "annually",
        nextDueDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        paymentHistory: [
          {
            date: new Date(),
            amount: paymentData.amount,
            status: "paid",
            transactionId: `TXN_${Date.now()}`,
          },
        ],
      }

      setCurrentCitizen({
        ...currentCitizen,
        membershipDues,
      })

      // Trigger QGI fund addition and bond purchase
      addToQGIFund(currentCitizen.id, currentCitizen.qgiAllocation)
      await purchaseBond(currentCitizen.id, currentCitizen.bondAllocation)

      return true
    } catch (error) {
      console.error("Payment processing failed:", error)
      return false
    }
  }

  const calculateQGIAllocation = (type: string, businessSize?: string): number => {
    switch (type) {
      case "individual":
        return 250000
      case "business":
        return businessSize === "large" ? 1000000 : 500000
      case "institution":
        return 750000 // Average between 500k-1M
      default:
        return 250000
    }
  }

  const calculateBondAllocation = (qgiAmount: number): number => {
    return Math.round((qgiAmount * 2) / 60) // 2/60 of QGI allocation
  }

  // QGI Fund Management
  const addToQGIFund = (citizenId: string, amount: number) => {
    if (!currentCitizen) return

    const fundType = currentCitizen.type === "individual" ? "social_impact" : "institutional"

    setQGIFunds((prev) => ({
      ...prev,
      [fundType]: {
        ...prev[fundType],
        totalAssets: prev[fundType].totalAssets + amount,
        participantCount: prev[fundType].participantCount + 1,
        averageAllocation: (prev[fundType].totalAssets + amount) / (prev[fundType].participantCount + 1),
      },
    }))
  }

  const purchaseBond = async (citizenId: string, amount: number): Promise<boolean> => {
    if (!currentCitizen) return false

    try {
      // Simulate bond purchase
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const bondMaturityDate = new Date()
      bondMaturityDate.setFullYear(bondMaturityDate.getFullYear() + 50)

      setCurrentCitizen({
        ...currentCitizen,
        bondPurchaseDate: new Date(),
        bondMaturityDate,
        bondCertificateId: `BOND-${Date.now()}`,
      })

      // Update fund bond holdings
      const fundType = currentCitizen.type === "individual" ? "social_impact" : "institutional"
      setQGIFunds((prev) => ({
        ...prev,
        [fundType]: {
          ...prev[fundType].bondHoldings,
          totalValue: prev[fundType].bondHoldings.totalValue + amount,
        },
      }))

      return true
    } catch (error) {
      console.error("Bond purchase failed:", error)
      return false
    }
  }

  const updateFundLiquidity = (fundType: string, amount: number) => {
    setQGIFunds((prev) => ({
      ...prev,
      [fundType]: {
        ...prev[fundType],
        liquidityRatio:
          ((prev[fundType].totalAssets + amount) / prev[fundType].totalAssets) * prev[fundType].liquidityRatio,
      },
    }))
  }

  // Tax Benefit System
  const generateTaxBenefitContract = (citizen?: GlobalCitizen | null): TaxBenefitContract | null => {
    if (!citizen) return null
    return {
      contractId: `TBC-${Date.now()}`,
      effectiveDate: new Date(),
      expirationDate: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000), // 10 years
      benefitType: "deduction",
      estimatedAnnualBenefit: citizen.qgiAllocation * 0.15, // 15% of QGI allocation
      filingRequirements: [
        "Annual QGI performance report",
        "Social impact documentation",
        "Digital domicile compliance certificate",
      ],
      complianceObligations: [
        "Maintain active global citizenship status",
        "Submit quarterly impact reports",
        "Comply with digital domicile regulations",
      ],
      digitalDomicileJurisdiction: "QUICA Digital Territory",
      status: "active",
    }
  }

  const prepareTaxDocuments = async (citizenId: string): Promise<any[]> => {
    // Simulate tax document preparation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return [
      {
        documentType: "QGI Tax Benefit Certificate",
        documentId: `TBC-${citizenId}-${new Date().getFullYear()}`,
        generatedDate: new Date(),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
      {
        documentType: "Digital Domicile Tax Filing",
        documentId: `DDTF-${citizenId}-${new Date().getFullYear()}`,
        generatedDate: new Date(),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    ]
  }

  // Digital Domicile
  const establishDigitalDomicile = async (citizen?: GlobalCitizen | null): Promise<string | null> => {
    if (!citizen) return null

    // Simulate digital domicile establishment
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const domicileId = `DD-${citizen.type.toUpperCase()}-${Date.now()}`

    const taxBenefitContract = generateTaxBenefitContract(citizen)

    setCurrentCitizen({
      ...citizen,
      digitalDomicileId: domicileId,
      taxBenefitContract,
    })

    return domicileId
  }

  const updateDomicileStatus = (domicileId: string, status: string) => {
    if (!currentCitizen || currentCitizen.digitalDomicileId !== domicileId) return

    setCurrentCitizen({
      ...currentCitizen,
      taxBenefitContract: {
        ...currentCitizen.taxBenefitContract,
        status: status as any,
      },
    })
  }

  // Credit Line Replacement
  const replaceCreditLine = (citizen?: GlobalCitizen | null) => {
    if (!citizen) return

    const replacementValue = calculateCreditReplacement(citizen.qgiAllocation)

    setCurrentCitizen({
      ...citizen,
      creditLineReplacement: {
        originalCreditLimit: replacementValue * 0.8, // Assume 80% of QGI value was original limit
        qgiReplacementValue: replacementValue,
        effectiveDate: new Date(),
        terms: [
          "QGI allocation serves as collateral replacement",
          "No traditional credit line required",
          "SNAPPCREDITCOM 509a2 inclusive lending fulfilled",
          "Automatic renewal with active citizenship",
        ],
      },
    })
  }

  const calculateCreditReplacement = (qgiAmount: number): number => {
    return qgiAmount // 1:1 replacement ratio
  }

  // Utility Functions
  const getOnboardingSteps = (type: string): OnboardingStep[] => {
    return onboardingStepsConfig[type as keyof typeof onboardingStepsConfig] || []
  }

  const validateKYC = async (citizenId: string): Promise<boolean> => {
    // Simulate KYC validation
    await new Promise((resolve) => setTimeout(resolve, 5000))
    return true
  }

  const generateCitizenshipCertificate = async (citizenId: string): Promise<string> => {
    // Simulate certificate generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return `CERT-${citizenId}-${Date.now()}`
  }

  const getQGIPerformance = (fundType: string) => {
    return qgiFunds[fundType]?.performanceMetrics || null
  }

  const getCitizenshipBenefits = (citizenId?: string): string[] => {
    const citizen = citizenId ? (currentCitizen?.id === citizenId ? currentCitizen : null) : currentCitizen

    if (!citizen) return []

    return [
      `$${citizen.qgiAllocation.toLocaleString()} QGI allocation`,
      `$${citizen.bondAllocation.toLocaleString()} US 50-year Corporate Bond`,
      `$${citizen.taxBenefitContract?.estimatedAnnualBenefit?.toLocaleString() || 0} estimated annual tax benefit`,
      "Digital domicile tax optimization",
      "SNAPPCREDITCOM inclusive lending access",
      "Global citizenship privileges",
      "QUICA marketplace participation",
    ]
  }

  return (
    <GlobalCitizenshipContext.Provider
      value={{
        currentCitizen,
        onboardingProgress,
        qgiFunds,
        startRegistration,
        updateProfile,
        submitRegistration,
        processMembershipPayment,
        calculateQGIAllocation,
        calculateBondAllocation,
        addToQGIFund,
        purchaseBond,
        updateFundLiquidity,
        generateTaxBenefitContract,
        prepareTaxDocuments,
        establishDigitalDomicile,
        updateDomicileStatus,
        replaceCreditLine,
        calculateCreditReplacement,
        getOnboardingSteps,
        validateKYC,
        generateCitizenshipCertificate,
        getQGIPerformance,
        getCitizenshipBenefits,
      }}
    >
      {children}
    </GlobalCitizenshipContext.Provider>
  )
}
