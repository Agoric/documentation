"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

// Guarantee Arbitrage Types
export interface GuaranteeArbitrageInstrument {
  instrumentId: string
  principalAmount: number

  // Primary Guarantee Structure
  guaranteeProvider: string
  guaranteeCost: number // Bank rate (e.g., 0.055 for 5.5%)
  guaranteeAmount: number
  guaranteeTerm: number // Days until payout trigger

  // Payout Trigger
  payoutTriggerDate: Date
  payoutAmount: number
  payoutStatus: "pending" | "triggered" | "paid" | "failed"

  // Secondary Market Structure
  secondaryOffering: SecondaryOffering

  // Performance Tracking
  totalProfit: number
  profitMargin: number
  roi: number

  // Status
  status: "structuring" | "active" | "payout_triggered" | "secondary_sold" | "completed"
  createdDate: Date
  lastUpdated: Date
}

export interface SecondaryOffering {
  offeringId: string
  instrumentId: string

  // Investment Terms
  minimumInvestment: number
  maximumInvestment: number
  totalOfferingSize: number
  interestRate: number // 25% simple interest
  lockupPeriod: number // 5 years in days

  // Investor Structure
  investors: SecondaryInvestor[]
  totalInvested: number
  remainingCapacity: number

  // Payout Schedule
  payoutSchedule: PayoutSchedule[]

  // Status
  offeringStatus: "open" | "fully_subscribed" | "closed" | "paying_out" | "completed"
  openDate: Date
  closeDate?: Date
}

export interface SecondaryInvestor {
  investorId: string
  investorName: string
  investmentAmount: number
  investmentDate: Date

  // Lock-up Terms
  lockupStartDate: Date
  lockupEndDate: Date
  earlyWithdrawalPenalty: number

  // Returns
  expectedReturn: number
  paidReturns: number
  remainingReturns: number

  // Status
  status: "active" | "locked" | "matured" | "withdrawn"
}

export interface PayoutSchedule {
  payoutId: string
  payoutDate: Date
  payoutAmount: number
  payoutType: "interest" | "principal" | "final"
  status: "scheduled" | "paid" | "overdue"

  // Investor Allocations
  investorAllocations: {
    investorId: string
    allocationAmount: number
    paidAmount?: number
    paidDate?: Date
  }[]
}

export interface ArbitrageCalculation {
  // Input Parameters
  principalAmount: number
  guaranteeCost: number
  secondaryRate: number
  lockupYears: number

  // Guarantee Costs
  guaranteeFee: number
  guaranteePayoutAmount: number

  // Secondary Market
  secondaryInvestmentNeeded: number
  totalInterestOwed: number

  // Profit Analysis
  grossProfit: number
  netProfit: number
  profitMargin: number
  roi: number

  // Risk Metrics
  breakEvenTime: number
  maxLoss: number
  probabilityOfProfit: number
}

export interface ArbitrageStrategy {
  strategyId: string
  strategyName: string

  // Strategy Parameters
  targetGuaranteeCost: number
  targetSecondaryRate: number
  targetLockupPeriod: number
  targetProfitMargin: number

  // Execution Timeline
  guaranteeAcquisitionDays: number
  payoutTriggerDays: number
  secondaryMarketingDays: number
  totalCycleDays: number

  // Risk Management
  maxExposure: number
  diversificationRules: string[]
  exitStrategies: string[]

  // Performance
  executedDeals: number
  totalProfit: number
  averageROI: number
  successRate: number
}

// Context Interface
interface GuaranteeArbitrageContextType {
  instruments: Record<string, GuaranteeArbitrageInstrument>
  strategies: Record<string, ArbitrageStrategy>

  // Instrument Management
  createArbitrageInstrument: (params: Partial<GuaranteeArbitrageInstrument>) => Promise<GuaranteeArbitrageInstrument>
  triggerPayout: (instrumentId: string) => Promise<void>

  // Secondary Market
  createSecondaryOffering: (instrumentId: string, terms: Partial<SecondaryOffering>) => Promise<SecondaryOffering>
  addSecondaryInvestor: (offeringId: string, investor: Partial<SecondaryInvestor>) => Promise<SecondaryInvestor>
  processPayouts: (offeringId: string) => Promise<void>

  // Calculations
  calculateArbitrage: (
    principal: number,
    guaranteeCost: number,
    secondaryRate: number,
    lockupYears: number,
  ) => ArbitrageCalculation

  // Strategy Management
  createStrategy: (strategy: Partial<ArbitrageStrategy>) => Promise<ArbitrageStrategy>
  executeStrategy: (strategyId: string, principal: number) => Promise<GuaranteeArbitrageInstrument>

  // Analytics
  getPortfolioMetrics: () => any
  getStrategyPerformance: (strategyId: string) => any
}

const GuaranteeArbitrageContext = createContext<GuaranteeArbitrageContextType | undefined>(undefined)

export const useGuaranteeArbitrage = () => {
  const context = useContext(GuaranteeArbitrageContext)
  if (!context) {
    throw new Error("useGuaranteeArbitrage must be used within a GuaranteeArbitrageProvider")
  }
  return context
}

// Sample Data
const sampleStrategy: ArbitrageStrategy = {
  strategyId: "STRAT_90DAY_25PCT",
  strategyName: "90-Day Trigger + 25% Secondary Lock",

  targetGuaranteeCost: 0.055, // 5.5% bank rate
  targetSecondaryRate: 0.25, // 25% simple interest
  targetLockupPeriod: 1825, // 5 years
  targetProfitMargin: 0.195, // 19.5% spread

  guaranteeAcquisitionDays: 30,
  payoutTriggerDays: 90,
  secondaryMarketingDays: 60,
  totalCycleDays: 180,

  maxExposure: 50000000, // $50M max exposure
  diversificationRules: [
    "Max 20% per guarantee provider",
    "Max 30% per secondary investor",
    "Geographic diversification required",
  ],
  exitStrategies: [
    "Early payout trigger if guarantee cost drops",
    "Secondary rate adjustment if market conditions change",
    "Portfolio rebalancing quarterly",
  ],

  executedDeals: 12,
  totalProfit: 8750000,
  averageROI: 0.195,
  successRate: 0.92,
}

const sampleInstrument: GuaranteeArbitrageInstrument = {
  instrumentId: "ARB_2c979652-4ba9-43f5-b224-3ea78ebea859",
  principalAmount: 37200000, // From the 60x leveraged amount

  guaranteeProvider: "QUICA Guarantee Corporation",
  guaranteeCost: 0.055, // 5.5% bank rate
  guaranteeAmount: 37200000,
  guaranteeTerm: 90, // 90 days to trigger

  payoutTriggerDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  payoutAmount: 37200000,
  payoutStatus: "pending",

  secondaryOffering: {
    offeringId: "SEC_OFFER_001",
    instrumentId: "ARB_2c979652-4ba9-43f5-b224-3ea78ebea859",

    minimumInvestment: 100000,
    maximumInvestment: 5000000,
    totalOfferingSize: 37200000,
    interestRate: 0.25, // 25% simple interest
    lockupPeriod: 1825, // 5 years

    investors: [],
    totalInvested: 0,
    remainingCapacity: 37200000,

    payoutSchedule: [],

    offeringStatus: "open",
    openDate: new Date(),
  },

  totalProfit: 0,
  profitMargin: 0,
  roi: 0,

  status: "active",
  createdDate: new Date(),
  lastUpdated: new Date(),
}

export const GuaranteeArbitrageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [instruments, setInstruments] = useState<Record<string, GuaranteeArbitrageInstrument>>({
    [sampleInstrument.instrumentId]: sampleInstrument,
  })

  const [strategies, setStrategies] = useState<Record<string, ArbitrageStrategy>>({
    [sampleStrategy.strategyId]: sampleStrategy,
  })

  const createArbitrageInstrument = useCallback(
    async (params: Partial<GuaranteeArbitrageInstrument>): Promise<GuaranteeArbitrageInstrument> => {
      const instrumentId = `ARB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      const newInstrument: GuaranteeArbitrageInstrument = {
        instrumentId,
        principalAmount: params.principalAmount || 0,
        guaranteeProvider: params.guaranteeProvider || "Default Guarantee Corp",
        guaranteeCost: params.guaranteeCost || 0.055,
        guaranteeAmount: params.guaranteeAmount || params.principalAmount || 0,
        guaranteeTerm: params.guaranteeTerm || 90,
        payoutTriggerDate: new Date(Date.now() + (params.guaranteeTerm || 90) * 24 * 60 * 60 * 1000),
        payoutAmount: params.payoutAmount || params.guaranteeAmount || params.principalAmount || 0,
        payoutStatus: "pending",
        secondaryOffering: {
          offeringId: `SEC_${instrumentId}`,
          instrumentId,
          minimumInvestment: 100000,
          maximumInvestment: 5000000,
          totalOfferingSize: params.principalAmount || 0,
          interestRate: 0.25,
          lockupPeriod: 1825,
          investors: [],
          totalInvested: 0,
          remainingCapacity: params.principalAmount || 0,
          payoutSchedule: [],
          offeringStatus: "open",
          openDate: new Date(),
        },
        totalProfit: 0,
        profitMargin: 0,
        roi: 0,
        status: "structuring",
        createdDate: new Date(),
        lastUpdated: new Date(),
        ...params,
      }

      setInstruments((prev) => ({
        ...prev,
        [instrumentId]: newInstrument,
      }))

      return newInstrument
    },
    [],
  )

  const triggerPayout = useCallback(async (instrumentId: string): Promise<void> => {
    setInstruments((prev) => ({
      ...prev,
      [instrumentId]: {
        ...prev[instrumentId],
        payoutStatus: "triggered",
        status: "payout_triggered",
        lastUpdated: new Date(),
      },
    }))
  }, [])

  const createSecondaryOffering = useCallback(
    async (instrumentId: string, terms: Partial<SecondaryOffering>): Promise<SecondaryOffering> => {
      const instrument = instruments[instrumentId]
      if (!instrument) throw new Error("Instrument not found")

      const offering: SecondaryOffering = {
        ...instrument.secondaryOffering,
        ...terms,
      }

      setInstruments((prev) => ({
        ...prev,
        [instrumentId]: {
          ...prev[instrumentId],
          secondaryOffering: offering,
          lastUpdated: new Date(),
        },
      }))

      return offering
    },
    [instruments],
  )

  const addSecondaryInvestor = useCallback(
    async (offeringId: string, investor: Partial<SecondaryInvestor>): Promise<SecondaryInvestor> => {
      const investorId = `INV_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`

      const newInvestor: SecondaryInvestor = {
        investorId,
        investorName: investor.investorName || `Investor ${investorId}`,
        investmentAmount: investor.investmentAmount || 0,
        investmentDate: new Date(),
        lockupStartDate: new Date(),
        lockupEndDate: new Date(Date.now() + 1825 * 24 * 60 * 60 * 1000), // 5 years
        earlyWithdrawalPenalty: 0.1, // 10% penalty
        expectedReturn: (investor.investmentAmount || 0) * 0.25 * 5, // 25% simple for 5 years
        paidReturns: 0,
        remainingReturns: (investor.investmentAmount || 0) * 0.25 * 5,
        status: "locked",
        ...investor,
      }

      // Find and update the instrument with this offering
      setInstruments((prev) => {
        const updatedInstruments = { ...prev }

        Object.keys(updatedInstruments).forEach((instrumentId) => {
          const instrument = updatedInstruments[instrumentId]
          if (instrument.secondaryOffering.offeringId === offeringId) {
            const updatedOffering = {
              ...instrument.secondaryOffering,
              investors: [...instrument.secondaryOffering.investors, newInvestor],
              totalInvested: instrument.secondaryOffering.totalInvested + newInvestor.investmentAmount,
              remainingCapacity: instrument.secondaryOffering.remainingCapacity - newInvestor.investmentAmount,
            }

            updatedInstruments[instrumentId] = {
              ...instrument,
              secondaryOffering: updatedOffering,
              lastUpdated: new Date(),
            }
          }
        })

        return updatedInstruments
      })

      return newInvestor
    },
    [],
  )

  const processPayouts = useCallback(
    async (offeringId: string): Promise<void> => {
      // Find instrument with this offering
      const instrument = Object.values(instruments).find((inst) => inst.secondaryOffering.offeringId === offeringId)

      if (!instrument) return

      // Calculate annual interest payments
      const annualInterestRate = 0.25 // 25% simple interest
      const payoutSchedule: PayoutSchedule[] = []

      for (let year = 1; year <= 5; year++) {
        const payoutDate = new Date(Date.now() + year * 365 * 24 * 60 * 60 * 1000)
        const isLastYear = year === 5

        instrument.secondaryOffering.investors.forEach((investor) => {
          const interestPayment = investor.investmentAmount * annualInterestRate
          const principalPayment = isLastYear ? investor.investmentAmount : 0
          const totalPayment = interestPayment + principalPayment

          payoutSchedule.push({
            payoutId: `PAYOUT_${year}_${investor.investorId}`,
            payoutDate,
            payoutAmount: totalPayment,
            payoutType: isLastYear ? "final" : "interest",
            status: "scheduled",
            investorAllocations: [
              {
                investorId: investor.investorId,
                allocationAmount: totalPayment,
              },
            ],
          })
        })
      }

      setInstruments((prev) => ({
        ...prev,
        [instrument.instrumentId]: {
          ...prev[instrument.instrumentId],
          secondaryOffering: {
            ...prev[instrument.instrumentId].secondaryOffering,
            payoutSchedule,
          },
          lastUpdated: new Date(),
        },
      }))
    },
    [instruments],
  )

  const calculateArbitrage = useCallback(
    (principal: number, guaranteeCost: number, secondaryRate: number, lockupYears: number): ArbitrageCalculation => {
      // Guarantee costs
      const guaranteeFee = principal * guaranteeCost
      const guaranteePayoutAmount = principal

      // Secondary market requirements
      const secondaryInvestmentNeeded = principal
      const totalInterestOwed = principal * secondaryRate * lockupYears // Simple interest

      // Profit calculation
      const grossProfit = guaranteePayoutAmount - guaranteeFee
      const netProfit = grossProfit - totalInterestOwed
      const profitMargin = netProfit / principal
      const roi = netProfit / guaranteeFee

      // Risk metrics
      const breakEvenTime = guaranteeFee / (guaranteePayoutAmount / 90) // Days to break even
      const maxLoss = guaranteeFee + totalInterestOwed * 0.1 // Guarantee fee + 10% of interest
      const probabilityOfProfit = guaranteeCost < secondaryRate ? 0.85 : 0.15

      return {
        principalAmount: principal,
        guaranteeCost,
        secondaryRate,
        lockupYears,
        guaranteeFee,
        guaranteePayoutAmount,
        secondaryInvestmentNeeded,
        totalInterestOwed,
        grossProfit,
        netProfit,
        profitMargin,
        roi,
        breakEvenTime,
        maxLoss,
        probabilityOfProfit,
      }
    },
    [],
  )

  const createStrategy = useCallback(async (strategy: Partial<ArbitrageStrategy>): Promise<ArbitrageStrategy> => {
    const strategyId = `STRAT_${Date.now()}`

    const newStrategy: ArbitrageStrategy = {
      strategyId,
      strategyName: strategy.strategyName || "New Arbitrage Strategy",
      targetGuaranteeCost: strategy.targetGuaranteeCost || 0.055,
      targetSecondaryRate: strategy.targetSecondaryRate || 0.25,
      targetLockupPeriod: strategy.targetLockupPeriod || 1825,
      targetProfitMargin: (strategy.targetSecondaryRate || 0.25) - (strategy.targetGuaranteeCost || 0.055),
      guaranteeAcquisitionDays: strategy.guaranteeAcquisitionDays || 30,
      payoutTriggerDays: strategy.payoutTriggerDays || 90,
      secondaryMarketingDays: strategy.secondaryMarketingDays || 60,
      totalCycleDays:
        (strategy.guaranteeAcquisitionDays || 30) +
        (strategy.payoutTriggerDays || 90) +
        (strategy.secondaryMarketingDays || 60),
      maxExposure: strategy.maxExposure || 50000000,
      diversificationRules: strategy.diversificationRules || [],
      exitStrategies: strategy.exitStrategies || [],
      executedDeals: 0,
      totalProfit: 0,
      averageROI: 0,
      successRate: 0,
      ...strategy,
    }

    setStrategies((prev) => ({
      ...prev,
      [strategyId]: newStrategy,
    }))

    return newStrategy
  }, [])

  const executeStrategy = useCallback(
    async (strategyId: string, principal: number): Promise<GuaranteeArbitrageInstrument> => {
      const strategy = strategies[strategyId]
      if (!strategy) throw new Error("Strategy not found")

      const instrument = await createArbitrageInstrument({
        principalAmount: principal,
        guaranteeCost: strategy.targetGuaranteeCost,
        guaranteeTerm: strategy.payoutTriggerDays,
        guaranteeAmount: principal,
        payoutAmount: principal,
      })

      // Update strategy performance
      setStrategies((prev) => ({
        ...prev,
        [strategyId]: {
          ...prev[strategyId],
          executedDeals: prev[strategyId].executedDeals + 1,
        },
      }))

      return instrument
    },
    [strategies, createArbitrageInstrument],
  )

  const getPortfolioMetrics = useCallback(() => {
    const allInstruments = Object.values(instruments)
    const totalPrincipal = allInstruments.reduce((sum, inst) => sum + inst.principalAmount, 0)
    const totalProfit = allInstruments.reduce((sum, inst) => sum + inst.totalProfit, 0)
    const activeInstruments = allInstruments.filter((inst) => inst.status === "active").length
    const completedInstruments = allInstruments.filter((inst) => inst.status === "completed").length

    return {
      totalInstruments: allInstruments.length,
      totalPrincipal,
      totalProfit,
      activeInstruments,
      completedInstruments,
      averageROI: totalProfit / totalPrincipal || 0,
      portfolioHealth: totalProfit > 0 ? "profitable" : "break_even",
    }
  }, [instruments])

  const getStrategyPerformance = useCallback(
    (strategyId: string) => {
      const strategy = strategies[strategyId]
      if (!strategy) return null

      const strategyInstruments = Object.values(instruments).filter(
        (inst) =>
          inst.guaranteeCost === strategy.targetGuaranteeCost &&
          inst.secondaryOffering.interestRate === strategy.targetSecondaryRate,
      )

      const totalPrincipal = strategyInstruments.reduce((sum, inst) => sum + inst.principalAmount, 0)
      const totalProfit = strategyInstruments.reduce((sum, inst) => sum + inst.totalProfit, 0)

      return {
        ...strategy,
        actualExecutions: strategyInstruments.length,
        actualTotalPrincipal: totalPrincipal,
        actualTotalProfit: totalProfit,
        actualROI: totalProfit / totalPrincipal || 0,
      }
    },
    [strategies, instruments],
  )

  return (
    <GuaranteeArbitrageContext.Provider
      value={{
        instruments,
        strategies,
        createArbitrageInstrument,
        triggerPayout,
        createSecondaryOffering,
        addSecondaryInvestor,
        processPayouts,
        calculateArbitrage,
        createStrategy,
        executeStrategy,
        getPortfolioMetrics,
        getStrategyPerformance,
      }}
    >
      {children}
    </GuaranteeArbitrageContext.Provider>
  )
}
