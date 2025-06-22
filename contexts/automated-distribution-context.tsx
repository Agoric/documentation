"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Automated Profit Distribution System
export interface DistributionSchedule {
  scheduleId: string
  productId: string
  distributionType: "quarterly" | "monthly" | "annual" | "event_based"
  nextDistributionDate: Date
  lastDistributionDate: Date | null
  totalDistributionAmount: number
  distributionFrequency: number // days
  isActive: boolean

  // Distribution Rules
  distributionRules: DistributionRules

  // Historical Data
  distributionHistory: DistributionEvent[]

  // Performance Metrics
  totalDistributed: number
  averageDistribution: number
  distributionGrowthRate: number
}

export interface DistributionRules {
  minimumDistributionAmount: number
  maximumDistributionAmount: number
  distributionPercentage: number // % of profits to distribute
  retainedEarningsPercentage: number // % to retain for growth

  // Tax Optimization
  taxOptimization: boolean
  preferredTaxTreatment: "capital_gains" | "dividend_income" | "mixed"

  // Reinvestment Options
  automaticReinvestment: boolean
  reinvestmentPercentage: number

  // Eligibility Criteria
  minimumOwnershipForDistribution: number // minimum % ownership to receive distributions
  holdingPeriodRequirement: number // days
}

export interface DistributionEvent {
  eventId: string
  distributionDate: Date
  totalAmount: number
  recipientCount: number
  averagePerRecipient: number
  distributionSource: "product_revenue" | "capital_appreciation" | "dividend_income" | "commodity_gains"

  // Individual Distributions
  individualDistributions: IndividualDistribution[]

  // Event Metrics
  distributionEfficiency: number
  processingTime: number // milliseconds
  successRate: number
}

export interface IndividualDistribution {
  recipientId: string
  recipientType: "individual" | "institutional"
  ownershipId: string
  distributionAmount: number
  ownershipPercentage: number

  // Tax Information
  taxWithholding: number
  netDistribution: number
  taxDocumentId: string

  // Payment Information
  paymentMethod: "bank_transfer" | "crypto" | "reinvestment"
  paymentStatus: "pending" | "completed" | "failed"
  paymentDate: Date | null

  // Reinvestment Details
  reinvestmentAmount: number
  reinvestmentProductId: string | null
}

interface AutomatedDistributionContextType {
  // Distribution Schedules
  distributionSchedules: Record<string, DistributionSchedule>

  // Distribution Management
  createDistributionSchedule: (productId: string, rules: DistributionRules) => Promise<DistributionSchedule>
  updateDistributionSchedule: (scheduleId: string, updates: Partial<DistributionSchedule>) => Promise<void>
  pauseDistributionSchedule: (scheduleId: string) => Promise<void>
  resumeDistributionSchedule: (scheduleId: string) => Promise<void>

  // Distribution Execution
  executeDistribution: (scheduleId: string, distributionAmount: number) => Promise<DistributionEvent>
  calculateDistributionAmounts: (scheduleId: string, totalAmount: number) => Promise<IndividualDistribution[]>

  // Distribution Analytics
  getDistributionHistory: (productId: string) => DistributionEvent[]
  getRecipientDistributionHistory: (recipientId: string) => IndividualDistribution[]
  calculateDistributionProjections: (scheduleId: string) => Promise<DistributionProjection[]>

  // Tax Management
  generateTaxDocuments: (recipientId: string, year: number) => Promise<TaxDocument[]>
  optimizeDistributionTiming: (scheduleId: string) => Promise<Date>

  // Reinvestment Management
  processReinvestments: (eventId: string) => Promise<void>
  updateReinvestmentPreferences: (recipientId: string, preferences: ReinvestmentPreferences) => Promise<void>
}

export interface DistributionProjection {
  projectionDate: Date
  projectedAmount: number
  confidenceLevel: number
  basedOnMetrics: string[]
}

export interface TaxDocument {
  documentId: string
  documentType: "1099-DIV" | "1099-INT" | "K-1" | "INTERNATIONAL"
  taxYear: number
  recipientId: string
  totalDistributions: number
  taxableAmount: number
  withheldAmount: number
  documentUrl: string
  generatedDate: Date
}

export interface ReinvestmentPreferences {
  automaticReinvestment: boolean
  reinvestmentPercentage: number
  preferredProducts: string[]
  riskTolerance: "conservative" | "moderate" | "aggressive"
  diversificationTargets: Record<string, number>
}

const AutomatedDistributionContext = createContext<AutomatedDistributionContextType | undefined>(undefined)

export const useAutomatedDistribution = () => {
  const context = useContext(AutomatedDistributionContext)
  if (!context) {
    throw new Error("useAutomatedDistribution must be used within an AutomatedDistributionProvider")
  }
  return context
}

// Sample distribution schedules
const sampleDistributionSchedules: Record<string, DistributionSchedule> = {
  real_estate_portfolio: {
    scheduleId: "DIST-RE-001",
    productId: "real_estate_portfolio",
    distributionType: "quarterly",
    nextDistributionDate: new Date(2025, 2, 31), // March 31, 2025
    lastDistributionDate: new Date(2024, 11, 31), // December 31, 2024
    totalDistributionAmount: 2500000,
    distributionFrequency: 90,
    isActive: true,
    distributionRules: {
      minimumDistributionAmount: 100,
      maximumDistributionAmount: 1000000,
      distributionPercentage: 0.75, // 75% of profits distributed
      retainedEarningsPercentage: 0.25, // 25% retained
      taxOptimization: true,
      preferredTaxTreatment: "capital_gains",
      automaticReinvestment: false,
      reinvestmentPercentage: 0,
      minimumOwnershipForDistribution: 0.01, // 0.01% minimum
      holdingPeriodRequirement: 30, // 30 days
    },
    distributionHistory: [
      {
        eventId: "DIST-EVENT-001",
        distributionDate: new Date(2024, 11, 31),
        totalAmount: 2500000,
        recipientCount: 2500,
        averagePerRecipient: 1000,
        distributionSource: "product_revenue",
        individualDistributions: [],
        distributionEfficiency: 0.98,
        processingTime: 45000,
        successRate: 0.995,
      },
    ],
    totalDistributed: 7500000,
    averageDistribution: 1000,
    distributionGrowthRate: 0.12,
  },
  holographic_tech: {
    scheduleId: "DIST-HOLO-001",
    productId: "holographic_tech",
    distributionType: "quarterly",
    nextDistributionDate: new Date(2025, 2, 31),
    lastDistributionDate: new Date(2024, 11, 31),
    totalDistributionAmount: 1800000,
    distributionFrequency: 90,
    isActive: true,
    distributionRules: {
      minimumDistributionAmount: 250,
      maximumDistributionAmount: 500000,
      distributionPercentage: 0.8, // 80% of profits distributed
      retainedEarningsPercentage: 0.2, // 20% retained for R&D
      taxOptimization: true,
      preferredTaxTreatment: "dividend_income",
      automaticReinvestment: true,
      reinvestmentPercentage: 0.25, // 25% auto-reinvested
      minimumOwnershipForDistribution: 0.005, // 0.005% minimum
      holdingPeriodRequirement: 60, // 60 days
    },
    distributionHistory: [],
    totalDistributed: 5400000,
    averageDistribution: 1500,
    distributionGrowthRate: 0.25,
  },
}

export const AutomatedDistributionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [distributionSchedules, setDistributionSchedules] =
    useState<Record<string, DistributionSchedule>>(sampleDistributionSchedules)

  // Check for due distributions every minute
  useEffect(() => {
    const interval = setInterval(() => {
      checkForDueDistributions()
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const checkForDueDistributions = async () => {
    const now = new Date()

    for (const schedule of Object.values(distributionSchedules)) {
      if (schedule.isActive && schedule.nextDistributionDate <= now) {
        // Auto-execute distribution
        const estimatedAmount = schedule.averageDistribution * 1.05 // 5% growth estimate
        await executeDistribution(schedule.scheduleId, estimatedAmount)
      }
    }
  }

  const createDistributionSchedule = async (
    productId: string,
    rules: DistributionRules,
  ): Promise<DistributionSchedule> => {
    const scheduleId = `DIST-${productId.toUpperCase()}-${Date.now()}`

    const newSchedule: DistributionSchedule = {
      scheduleId,
      productId,
      distributionType: "quarterly",
      nextDistributionDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      lastDistributionDate: null,
      totalDistributionAmount: 0,
      distributionFrequency: 90,
      isActive: true,
      distributionRules: rules,
      distributionHistory: [],
      totalDistributed: 0,
      averageDistribution: 0,
      distributionGrowthRate: 0,
    }

    setDistributionSchedules((prev) => ({
      ...prev,
      [scheduleId]: newSchedule,
    }))

    return newSchedule
  }

  const updateDistributionSchedule = async (
    scheduleId: string,
    updates: Partial<DistributionSchedule>,
  ): Promise<void> => {
    setDistributionSchedules((prev) => ({
      ...prev,
      [scheduleId]: {
        ...prev[scheduleId],
        ...updates,
      },
    }))
  }

  const pauseDistributionSchedule = async (scheduleId: string): Promise<void> => {
    await updateDistributionSchedule(scheduleId, { isActive: false })
  }

  const resumeDistributionSchedule = async (scheduleId: string): Promise<void> => {
    await updateDistributionSchedule(scheduleId, { isActive: true })
  }

  const executeDistribution = async (scheduleId: string, distributionAmount: number): Promise<DistributionEvent> => {
    const schedule = distributionSchedules[scheduleId]
    if (!schedule) throw new Error("Distribution schedule not found")

    const startTime = Date.now()

    // Calculate individual distributions
    const individualDistributions = await calculateDistributionAmounts(scheduleId, distributionAmount)

    // Process payments
    const successfulDistributions = individualDistributions.filter((dist) => {
      // Simulate payment processing
      const success = Math.random() > 0.005 // 99.5% success rate
      dist.paymentStatus = success ? "completed" : "failed"
      dist.paymentDate = success ? new Date() : null
      return success
    })

    const processingTime = Date.now() - startTime

    const distributionEvent: DistributionEvent = {
      eventId: `DIST-EVENT-${Date.now()}`,
      distributionDate: new Date(),
      totalAmount: distributionAmount,
      recipientCount: individualDistributions.length,
      averagePerRecipient: distributionAmount / individualDistributions.length,
      distributionSource: "product_revenue",
      individualDistributions,
      distributionEfficiency: successfulDistributions.length / individualDistributions.length,
      processingTime,
      successRate: successfulDistributions.length / individualDistributions.length,
    }

    // Update schedule
    const nextDistributionDate = new Date(Date.now() + schedule.distributionFrequency * 24 * 60 * 60 * 1000)

    setDistributionSchedules((prev) => ({
      ...prev,
      [scheduleId]: {
        ...prev[scheduleId],
        lastDistributionDate: new Date(),
        nextDistributionDate,
        distributionHistory: [...prev[scheduleId].distributionHistory, distributionEvent],
        totalDistributed: prev[scheduleId].totalDistributed + distributionAmount,
        averageDistribution:
          (prev[scheduleId].totalDistributed + distributionAmount) / (prev[scheduleId].distributionHistory.length + 1),
      },
    }))

    // Process reinvestments
    await processReinvestments(distributionEvent.eventId)

    return distributionEvent
  }

  const calculateDistributionAmounts = async (
    scheduleId: string,
    totalAmount: number,
  ): Promise<IndividualDistribution[]> => {
    const schedule = distributionSchedules[scheduleId]
    if (!schedule) return []

    // This would integrate with the fractional ownership context to get actual owners
    // For now, simulating with sample data
    const mockOwners = [
      { id: "owner1", type: "individual" as const, ownershipPercentage: 5.5, ownershipId: "own1" },
      { id: "owner2", type: "institutional" as const, ownershipPercentage: 12.3, ownershipId: "own2" },
      { id: "owner3", type: "individual" as const, ownershipPercentage: 2.1, ownershipId: "own3" },
    ]

    return mockOwners.map((owner) => {
      const distributionAmount = totalAmount * (owner.ownershipPercentage / 100)
      const taxWithholding = distributionAmount * (owner.type === "individual" ? 0.15 : 0.21)
      const netDistribution = distributionAmount - taxWithholding
      const reinvestmentAmount = schedule.distributionRules.automaticReinvestment
        ? netDistribution * schedule.distributionRules.reinvestmentPercentage
        : 0

      return {
        recipientId: owner.id,
        recipientType: owner.type,
        ownershipId: owner.ownershipId,
        distributionAmount,
        ownershipPercentage: owner.ownershipPercentage,
        taxWithholding,
        netDistribution: netDistribution - reinvestmentAmount,
        taxDocumentId: `TAX-${owner.id}-${Date.now()}`,
        paymentMethod: reinvestmentAmount > 0 ? ("reinvestment" as const) : ("bank_transfer" as const),
        paymentStatus: "pending" as const,
        paymentDate: null,
        reinvestmentAmount,
        reinvestmentProductId: reinvestmentAmount > 0 ? schedule.productId : null,
      }
    })
  }

  const getDistributionHistory = (productId: string): DistributionEvent[] => {
    const schedule = Object.values(distributionSchedules).find((s) => s.productId === productId)
    return schedule?.distributionHistory || []
  }

  const getRecipientDistributionHistory = (recipientId: string): IndividualDistribution[] => {
    const allDistributions: IndividualDistribution[] = []

    Object.values(distributionSchedules).forEach((schedule) => {
      schedule.distributionHistory.forEach((event) => {
        const recipientDistributions = event.individualDistributions.filter((dist) => dist.recipientId === recipientId)
        allDistributions.push(...recipientDistributions)
      })
    })

    return allDistributions
  }

  const calculateDistributionProjections = async (scheduleId: string): Promise<DistributionProjection[]> => {
    const schedule = distributionSchedules[scheduleId]
    if (!schedule) return []

    const projections: DistributionProjection[] = []
    const baseAmount = schedule.averageDistribution
    const growthRate = schedule.distributionGrowthRate

    for (let i = 1; i <= 12; i++) {
      // Next 12 quarters
      const projectionDate = new Date(Date.now() + i * schedule.distributionFrequency * 24 * 60 * 60 * 1000)
      const projectedAmount = baseAmount * Math.pow(1 + growthRate, i)

      projections.push({
        projectionDate,
        projectedAmount,
        confidenceLevel: Math.max(0.5, 0.95 - i * 0.05), // Decreasing confidence over time
        basedOnMetrics: ["historical_growth", "market_trends", "product_performance"],
      })
    }

    return projections
  }

  const generateTaxDocuments = async (recipientId: string, year: number): Promise<TaxDocument[]> => {
    const distributions = getRecipientDistributionHistory(recipientId)
    const yearDistributions = distributions.filter(
      (dist) => dist.paymentDate && dist.paymentDate.getFullYear() === year,
    )

    if (yearDistributions.length === 0) return []

    const totalDistributions = yearDistributions.reduce((sum, dist) => sum + dist.distributionAmount, 0)
    const taxableAmount = yearDistributions.reduce(
      (sum, dist) => sum + (dist.distributionAmount - dist.taxWithholding),
      0,
    )
    const withheldAmount = yearDistributions.reduce((sum, dist) => sum + dist.taxWithholding, 0)

    return [
      {
        documentId: `TAX-DOC-${recipientId}-${year}`,
        documentType: "1099-DIV",
        taxYear: year,
        recipientId,
        totalDistributions,
        taxableAmount,
        withheldAmount,
        documentUrl: `/tax-documents/${recipientId}/${year}/1099-div.pdf`,
        generatedDate: new Date(),
      },
    ]
  }

  const optimizeDistributionTiming = async (scheduleId: string): Promise<Date> => {
    // Optimize for tax efficiency - typically end of quarters
    const now = new Date()
    const currentQuarter = Math.floor(now.getMonth() / 3)
    const nextQuarterEnd = new Date(now.getFullYear(), (currentQuarter + 1) * 3, 0) // Last day of next quarter

    return nextQuarterEnd
  }

  const processReinvestments = async (eventId: string): Promise<void> => {
    // Find the distribution event and process reinvestments
    for (const schedule of Object.values(distributionSchedules)) {
      const event = schedule.distributionHistory.find((e) => e.eventId === eventId)
      if (event) {
        const reinvestments = event.individualDistributions.filter((dist) => dist.reinvestmentAmount > 0)

        // Process each reinvestment (would integrate with fractional ownership context)
        for (const reinvestment of reinvestments) {
          console.log(`Processing reinvestment of $${reinvestment.reinvestmentAmount} for ${reinvestment.recipientId}`)
          // This would call purchaseFractionalOwnership from the fractional ownership context
        }
        break
      }
    }
  }

  const updateReinvestmentPreferences = async (
    recipientId: string,
    preferences: ReinvestmentPreferences,
  ): Promise<void> => {
    // Store reinvestment preferences (would integrate with user preferences system)
    console.log(`Updated reinvestment preferences for ${recipientId}`, preferences)
  }

  return (
    <AutomatedDistributionContext.Provider
      value={{
        distributionSchedules,
        createDistributionSchedule,
        updateDistributionSchedule,
        pauseDistributionSchedule,
        resumeDistributionSchedule,
        executeDistribution,
        calculateDistributionAmounts,
        getDistributionHistory,
        getRecipientDistributionHistory,
        calculateDistributionProjections,
        generateTaxDocuments,
        optimizeDistributionTiming,
        processReinvestments,
        updateReinvestmentPreferences,
      }}
    >
      {children}
    </AutomatedDistributionContext.Provider>
  )
}
