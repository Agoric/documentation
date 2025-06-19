"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Commodities Futures Trading System
export interface CommodityContract {
  contractId: string
  commodityType: "precious_metals" | "energy" | "agriculture" | "carbon_credits" | "industrial_metals"
  commodityName: string
  contractSymbol: string

  // Contract Specifications
  contractSize: number
  contractUnit: string
  minimumPriceIncrement: number
  currency: string

  // Pricing Information
  currentPrice: number
  previousClose: number
  dailyChange: number
  dailyChangePercent: number

  // Market Data
  bidPrice: number
  askPrice: number
  bidSize: number
  askSize: number
  volume: number
  openInterest: number

  // Contract Details
  deliveryMonth: string
  expirationDate: Date
  firstNoticeDate: Date
  lastTradingDate: Date

  // Quality Specifications
  qualitySpecs: QualitySpecification[]

  // Delivery Information
  deliveryLocations: DeliveryLocation[]
  deliveryMethod: "physical" | "cash_settled" | "both"

  // Market Hours
  tradingHours: TradingHours

  // Historical Data
  priceHistory: PricePoint[]

  // Risk Metrics
  volatility: number
  beta: number
  correlation: Record<string, number>
}

export interface QualitySpecification {
  parameter: string
  specification: string
  tolerance: string
  testMethod: string
}

export interface DeliveryLocation {
  locationId: string
  locationName: string
  address: string
  storageCapacity: number
  deliveryPremium: number
  certifiedWarehouse: boolean
}

export interface TradingHours {
  marketOpen: string
  marketClose: string
  timezone: string
  tradingDays: string[]
  holidays: Date[]
}

export interface PricePoint {
  timestamp: Date
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface FuturesPosition {
  positionId: string
  accountId: string
  contractId: string
  positionType: "long" | "short"

  // Position Details
  quantity: number
  entryPrice: number
  currentPrice: number
  marketValue: number

  // P&L Information
  unrealizedPnL: number
  realizedPnL: number
  totalPnL: number

  // Margin Information
  initialMargin: number
  maintenanceMargin: number
  marginExcess: number
  marginCall: boolean

  // Position Dates
  openDate: Date
  lastUpdateDate: Date

  // Risk Metrics
  deltaEquivalent: number
  riskExposure: number

  // Orders
  activeOrders: FuturesOrder[]

  // Position History
  positionHistory: PositionEvent[]
}

export interface FuturesOrder {
  orderId: string
  accountId: string
  contractId: string
  orderType: "market" | "limit" | "stop" | "stop_limit" | "market_if_touched"
  orderSide: "buy" | "sell"

  // Order Quantities
  orderQuantity: number
  filledQuantity: number
  remainingQuantity: number

  // Pricing
  orderPrice?: number
  stopPrice?: number
  limitPrice?: number

  // Order Status
  orderStatus: "pending" | "working" | "partially_filled" | "filled" | "cancelled" | "rejected"

  // Time Information
  orderDate: Date
  expirationDate?: Date
  timeInForce: "day" | "gtc" | "ioc" | "fok"

  // Execution Information
  fills: OrderFill[]
  averageFillPrice: number

  // Order Conditions
  conditions: OrderCondition[]

  // Risk Controls
  riskChecks: RiskCheck[]
}

export interface OrderFill {
  fillId: string
  fillQuantity: number
  fillPrice: number
  fillTime: Date
  executionVenue: string
  commission: number
  fees: number
}

export interface OrderCondition {
  conditionType: "price" | "time" | "volume" | "volatility"
  conditionValue: number
  conditionOperator: "greater_than" | "less_than" | "equal_to"
  isActive: boolean
}

export interface RiskCheck {
  checkType: "position_limit" | "margin_requirement" | "concentration_limit" | "volatility_limit"
  checkResult: "passed" | "failed" | "warning"
  checkMessage: string
  checkTime: Date
}

export interface PositionEvent {
  eventId: string
  eventType: "open" | "increase" | "decrease" | "close" | "margin_call" | "delivery_notice"
  eventDate: Date
  quantity: number
  price: number
  description: string
}

export interface MarginAccount {
  accountId: string
  accountName: string
  accountType: "individual" | "institutional" | "corporate"

  // Account Balances
  cashBalance: number
  marginBalance: number
  totalEquity: number
  availableMargin: number
  usedMargin: number

  // Margin Requirements
  initialMarginRequirement: number
  maintenanceMarginRequirement: number
  marginCallThreshold: number

  // Account Limits
  tradingLimits: TradingLimits

  // Risk Metrics
  portfolioRisk: PortfolioRisk

  // Account History
  accountHistory: AccountEvent[]
}

export interface TradingLimits {
  maxPositionSize: number
  maxOrderSize: number
  maxDailyVolume: number
  maxOpenPositions: number
  concentrationLimit: number
  leverageLimit: number
}

export interface PortfolioRisk {
  totalRiskExposure: number
  valueAtRisk: number
  expectedShortfall: number
  portfolioVolatility: number
  correlationRisk: number
  concentrationRisk: number
}

export interface AccountEvent {
  eventId: string
  eventType: "deposit" | "withdrawal" | "margin_call" | "interest_charge" | "commission" | "fee"
  eventDate: Date
  amount: number
  description: string
  balance: number
}

export interface DerivativeContract {
  contractId: string
  derivativeType: "option" | "swap" | "forward" | "structured_product"
  underlyingContractId: string

  // Contract Terms
  contractSize: number
  expirationDate: Date
  settlementType: "physical" | "cash"

  // Pricing
  currentPrice: number
  theoreticalValue: number
  intrinsicValue: number
  timeValue: number

  // Greeks (for options)
  delta?: number
  gamma?: number
  theta?: number
  vega?: number
  rho?: number

  // Risk Metrics
  riskMetrics: DerivativeRiskMetrics
}

export interface DerivativeRiskMetrics {
  deltaEquivalent: number
  gammaRisk: number
  vegaRisk: number
  thetaDecay: number
  rhoSensitivity: number
}

export interface MarketData {
  contractId: string
  timestamp: Date

  // Price Data
  lastPrice: number
  bidPrice: number
  askPrice: number
  bidSize: number
  askSize: number

  // Volume Data
  volume: number
  openInterest: number

  // Daily Statistics
  dailyHigh: number
  dailyLow: number
  dailyOpen: number
  previousClose: number

  // Market Indicators
  impliedVolatility?: number
  openInterestChange: number
  volumeWeightedAveragePrice: number
}

export interface TradingStrategy {
  strategyId: string
  strategyName: string
  strategyType: "arbitrage" | "spread" | "momentum" | "mean_reversion" | "carry" | "volatility"

  // Strategy Parameters
  parameters: Record<string, number>

  // Target Contracts
  targetContracts: string[]

  // Risk Management
  maxRiskExposure: number
  stopLossLevel: number
  takeProfitLevel: number

  // Performance Metrics
  performance: StrategyPerformance

  // Strategy Status
  isActive: boolean
  lastExecutionDate: Date
}

export interface StrategyPerformance {
  totalReturn: number
  annualizedReturn: number
  sharpeRatio: number
  maxDrawdown: number
  winRate: number
  profitFactor: number

  // Trade Statistics
  totalTrades: number
  winningTrades: number
  losingTrades: number
  averageWin: number
  averageLoss: number
}

interface CommoditiesFuturesContextType {
  // Market Data
  commodityContracts: Record<string, CommodityContract>
  marketData: Record<string, MarketData>

  // Trading
  futuresPositions: Record<string, FuturesPosition>
  futuresOrders: Record<string, FuturesOrder>
  marginAccounts: Record<string, MarginAccount>

  // Derivatives
  derivativeContracts: Record<string, DerivativeContract>

  // Trading Strategies
  tradingStrategies: Record<string, TradingStrategy>

  // Market Data Functions
  getMarketData: (contractId: string) => MarketData | null
  subscribeToMarketData: (contractId: string, callback: (data: MarketData) => void) => () => void
  getPriceHistory: (contractId: string, period: string) => PricePoint[]

  // Trading Functions
  placeFuturesOrder: (
    order: Omit<FuturesOrder, "orderId" | "orderDate" | "orderStatus" | "fills" | "averageFillPrice">,
  ) => Promise<FuturesOrder>
  cancelFuturesOrder: (orderId: string) => Promise<void>
  modifyFuturesOrder: (orderId: string, modifications: Partial<FuturesOrder>) => Promise<void>

  // Position Management
  getPositions: (accountId: string) => FuturesPosition[]
  closePosition: (positionId: string, quantity?: number) => Promise<void>
  rollPosition: (positionId: string, newContractId: string) => Promise<FuturesPosition>

  // Margin Management
  calculateMarginRequirement: (contractId: string, quantity: number) => Promise<number>
  checkMarginAdequacy: (accountId: string) => Promise<boolean>
  addMargin: (accountId: string, amount: number) => Promise<void>
  withdrawMargin: (accountId: string, amount: number) => Promise<void>

  // Risk Management
  calculatePortfolioRisk: (accountId: string) => Promise<PortfolioRisk>
  performRiskCheck: (order: Partial<FuturesOrder>) => Promise<RiskCheck[]>
  setRiskLimits: (accountId: string, limits: Partial<TradingLimits>) => Promise<void>

  // Derivatives Trading
  createDerivativeContract: (
    contract: Omit<DerivativeContract, "contractId" | "currentPrice" | "theoreticalValue">,
  ) => Promise<DerivativeContract>
  calculateGreeks: (contractId: string) => Promise<Partial<DerivativeContract>>

  // Strategy Management
  createTradingStrategy: (
    strategy: Omit<TradingStrategy, "strategyId" | "performance" | "lastExecutionDate">,
  ) => Promise<TradingStrategy>
  executeStrategy: (strategyId: string) => Promise<void>
  backtestStrategy: (strategyId: string, startDate: Date, endDate: Date) => Promise<StrategyPerformance>

  // Analytics
  generatePerformanceReport: (accountId: string, period: string) => Promise<PerformanceReport>
  getMarketAnalysis: (contractId: string) => Promise<MarketAnalysis>

  // Delivery Management
  requestDelivery: (positionId: string) => Promise<DeliveryRequest>
  manageDelivery: (deliveryId: string, action: "accept" | "offset") => Promise<void>
}

export interface PerformanceReport {
  accountId: string
  reportPeriod: { start: Date; end: Date }

  // Performance Metrics
  totalReturn: number
  annualizedReturn: number
  sharpeRatio: number
  maxDrawdown: number
  volatility: number

  // Trading Statistics
  totalTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  profitFactor: number

  // Position Analysis
  averageHoldingPeriod: number
  largestWin: number
  largestLoss: number

  // Risk Metrics
  valueAtRisk: number
  expectedShortfall: number

  // Breakdown by Commodity
  commodityBreakdown: Record<string, CommodityPerformance>
}

export interface CommodityPerformance {
  commodityType: string
  totalReturn: number
  numberOfTrades: number
  winRate: number
  averageReturn: number
}

export interface MarketAnalysis {
  contractId: string
  analysisDate: Date

  // Technical Analysis
  technicalIndicators: TechnicalIndicator[]
  supportLevels: number[]
  resistanceLevels: number[]
  trend: "bullish" | "bearish" | "neutral"

  // Fundamental Analysis
  supplyDemandBalance: "surplus" | "deficit" | "balanced"
  seasonalFactors: string[]
  economicIndicators: EconomicIndicator[]

  // Market Sentiment
  sentimentScore: number
  institutionalFlow: "buying" | "selling" | "neutral"
  retailFlow: "buying" | "selling" | "neutral"

  // Price Forecasts
  priceTargets: PriceTarget[]
  volatilityForecast: number

  // Risk Factors
  riskFactors: string[]
  opportunities: string[]
}

export interface TechnicalIndicator {
  indicator: string
  value: number
  signal: "buy" | "sell" | "neutral"
  strength: number
}

export interface EconomicIndicator {
  indicator: string
  currentValue: number
  previousValue: number
  impact: "positive" | "negative" | "neutral"
}

export interface PriceTarget {
  timeframe: string
  targetPrice: number
  probability: number
  scenario: "bull" | "base" | "bear"
}

export interface DeliveryRequest {
  deliveryId: string
  positionId: string
  contractId: string
  quantity: number
  deliveryMonth: string
  requestDate: Date
  deliveryLocation: string
  status: "pending" | "approved" | "rejected" | "completed"
}

const CommoditiesFuturesContext = createContext<CommoditiesFuturesContextType | undefined>(undefined)

export const useCommoditiesFutures = () => {
  const context = useContext(CommoditiesFuturesContext)
  if (!context) {
    throw new Error("useCommoditiesFutures must be used within a CommoditiesFuturesProvider")
  }
  return context
}

// Sample commodity contracts
const sampleCommodityContracts: Record<string, CommodityContract> = {
  GC_2025_06: {
    contractId: "GC_2025_06",
    commodityType: "precious_metals",
    commodityName: "Gold",
    contractSymbol: "GC",
    contractSize: 100,
    contractUnit: "troy ounces",
    minimumPriceIncrement: 0.1,
    currency: "USD",
    currentPrice: 2045.5,
    previousClose: 2038.2,
    dailyChange: 7.3,
    dailyChangePercent: 0.36,
    bidPrice: 2045.2,
    askPrice: 2045.8,
    bidSize: 25,
    askSize: 30,
    volume: 125000,
    openInterest: 450000,
    deliveryMonth: "June 2025",
    expirationDate: new Date(2025, 5, 26),
    firstNoticeDate: new Date(2025, 4, 30),
    lastTradingDate: new Date(2025, 5, 24),
    qualitySpecs: [
      { parameter: "Purity", specification: "99.5% minimum", tolerance: "±0.1%", testMethod: "Fire assay" },
      { parameter: "Weight", specification: "100 troy ounces", tolerance: "±5%", testMethod: "Certified scale" },
    ],
    deliveryLocations: [
      {
        locationId: "COMEX_NY",
        locationName: "COMEX New York",
        address: "New York, NY",
        storageCapacity: 1000000,
        deliveryPremium: 0,
        certifiedWarehouse: true,
      },
    ],
    deliveryMethod: "physical",
    tradingHours: {
      marketOpen: "18:00",
      marketClose: "17:00",
      timezone: "EST",
      tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      holidays: [],
    },
    priceHistory: [],
    volatility: 0.18,
    beta: 0.85,
    correlation: {
      SI_2025_06: 0.72,
      CL_2025_06: -0.15,
    },
  },
  CL_2025_06: {
    contractId: "CL_2025_06",
    commodityType: "energy",
    commodityName: "Crude Oil",
    contractSymbol: "CL",
    contractSize: 1000,
    contractUnit: "barrels",
    minimumPriceIncrement: 0.01,
    currency: "USD",
    currentPrice: 78.45,
    previousClose: 77.92,
    dailyChange: 0.53,
    dailyChangePercent: 0.68,
    bidPrice: 78.42,
    askPrice: 78.48,
    bidSize: 100,
    askSize: 150,
    volume: 285000,
    openInterest: 1200000,
    deliveryMonth: "June 2025",
    expirationDate: new Date(2025, 4, 20),
    firstNoticeDate: new Date(2025, 3, 25),
    lastTradingDate: new Date(2025, 4, 18),
    qualitySpecs: [
      { parameter: "API Gravity", specification: "37-42 degrees", tolerance: "±1 degree", testMethod: "ASTM D287" },
      { parameter: "Sulfur Content", specification: "0.42% maximum", tolerance: "±0.05%", testMethod: "ASTM D4294" },
    ],
    deliveryLocations: [
      {
        locationId: "CUSHING_OK",
        locationName: "Cushing, Oklahoma",
        address: "Cushing, OK",
        storageCapacity: 76000000,
        deliveryPremium: 0,
        certifiedWarehouse: true,
      },
    ],
    deliveryMethod: "physical",
    tradingHours: {
      marketOpen: "18:00",
      marketClose: "17:00",
      timezone: "EST",
      tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      holidays: [],
    },
    priceHistory: [],
    volatility: 0.32,
    beta: 1.15,
    correlation: {
      GC_2025_06: -0.15,
      NG_2025_06: 0.45,
    },
  },
}

const sampleMarginAccounts: Record<string, MarginAccount> = {
  account_001: {
    accountId: "account_001",
    accountName: "Global Commodities Trading Account",
    accountType: "institutional",
    cashBalance: 5000000,
    marginBalance: 4500000,
    totalEquity: 5250000,
    availableMargin: 3750000,
    usedMargin: 750000,
    initialMarginRequirement: 500000,
    maintenanceMarginRequirement: 400000,
    marginCallThreshold: 0.8,
    tradingLimits: {
      maxPositionSize: 1000,
      maxOrderSize: 500,
      maxDailyVolume: 10000,
      maxOpenPositions: 50,
      concentrationLimit: 0.25,
      leverageLimit: 10,
    },
    portfolioRisk: {
      totalRiskExposure: 2500000,
      valueAtRisk: 125000,
      expectedShortfall: 187500,
      portfolioVolatility: 0.15,
      correlationRisk: 0.08,
      concentrationRisk: 0.12,
    },
    accountHistory: [],
  },
}

export const CommoditiesFuturesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [commodityContracts, setCommodityContracts] = useState<Record<string, CommodityContract>>(sampleCommodityContracts)
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({})
  const [futuresPositions, setFuturesPositions] = useState<Record<string, FuturesPosition>>({})
  const [futuresOrders, setFuturesOrders] = useState<Record<string, FuturesOrder>>({})
  const [marginAccounts, setMarginAccounts] = useState<Record<string, MarginAccount>>(sampleMarginAccounts)
  const [derivativeContracts, setDerivativeContracts] = useState<Record<string, DerivativeContract>>({})
  const [tradingStrategies, setTradingStrategies] = useState<Record<string, TradingStrategy>>({})

  // Simulate real-time market data updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateMarketData()
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const updateMarketData = () => {
    const updatedMarketData: Record<string, MarketData> = {}
    
    Object.values(commodityContracts).forEach(contract => {
      const priceChange = (Math.random() - 0.5) * contract.currentPrice * 0.01 // ±1% random change
      const newPrice = Math.max(0, contract.currentPrice + priceChange)
      
      updatedMarketData[contract.contractId] = {
        contractId: contract.contractId,
        timestamp: new Date(),
        lastPrice: newPrice,
        bidPrice: newPrice - contract.minimumPriceIncrement,
        askPrice: newPrice + contract.minimumPriceIncrement,
        bidSize: Math.floor(Math.random() * 100) + 10,
        askSize: Math.floor(Math.random() * 100) + 10,
        volume: contract.volume + Math.floor(Math.random() * 1000),
        openInterest: contract.openInterest,
        dailyHigh: Math.max(contract.currentPrice, newPrice),
        dailyLow: Math.min(contract.currentPrice, newPrice),
        dailyOpen: contract.previousClose,
        previousClose: contract.previousClose,
        openInterestChange: Math.floor(Math.random() * 2000) - 1000,
        volumeWeightedAveragePrice: (contract.currentPrice + newPrice) / 2,
      }

      // Update contract current price
      setCommodityContracts(prev => ({
        ...prev,
        [contract.contractId]: {
          ...prev[contract.contractId],
          currentPrice: newPrice,
          dailyChange: newPrice - contract.previousClose,
          dailyChangePercent: ((newPrice - contract.previousClose) / contract.previousClose) * 100,
        }
      }))
    })

    setMarketData(updatedMarketData)
  }

  const getMarketData = (contractId: string): MarketData | null => {
    return marketData[contractId] || null
  }

  const subscribeToMarketData = (contractId: string, callback: (data: MarketData) => void): (() => void) => {
    const interval = setInterval(() => {
      const data = getMarketData(contractId)
      if (data) {
        callback(data)
      }
    }, 1000)

    return () => clearInterval(interval)
  }

  const getPriceHistory = (contractId: string, period: string): PricePoint[] => {
    // Mock price history generation
    const contract = commodityContracts[contractId]
    if (!contract) return []

    const history: PricePoint[] = []
    const days = period === "1M" ? 30 : period === "3M" ? 90 : period === "1Y" ? 365 : 7
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const basePrice = contract.currentPrice * (1 + (Math.random() - 0.5) * 0.1)
      
      history.push({
        timestamp: date,
        open: basePrice,
        high: basePrice * (1 + Math.random() * 0.02),
        low: basePrice * (1 - Math.random() * 0.02),
        close: basePrice * (1 + (Math.random() - 0.5) * 0.01),
        volume: Math.floor(Math.random() * 10000) + 1000,
      })
    }

    return history
  }

  const placeFuturesOrder = async (order: Omit<FuturesOrder, 'orderId' | 'orderDate' | 'orderStatus' | 'fills' | 'averageFillPrice'>): Promise<FuturesOrder> => {
    const orderId = `order_${Date.now()}`
    
    const newOrder: FuturesOrder = {
      ...order,
      orderId,
      orderDate: new Date(),
      orderStatus: "working",
      fills: [],
      averageFillPrice: 0,
      filledQuantity: 0,
      remainingQuantity: order.orderQuantity,
      conditions: order.conditions || [],
      riskChecks: await performRiskCheck(order),
    }

    // Check if risk checks passed
    const failedChecks = newOrder.riskChecks.filter(check => check.checkResult === "failed")
    if (failedChecks.length > 0) {
      newOrder.orderStatus = "rejected"
    }

    setFuturesOrders(prev => ({
      ...prev,
      [orderId]: newOrder
    }))

    // Simulate order execution for market orders
    if (newOrder.orderType === "market" && newOrder.orderStatus === "working") {
      setTimeout(() => {
        executeOrder(orderId)
      }, 1000)
    }

    return newOrder
  }

  const executeOrder = async (orderId: string) => {
    const order = futuresOrders[orderId]
    if (!order || order.orderStatus !== "working") return

    const contract = commodityContracts[order.contractId]
    if (!contract) return

    const fillPrice = order.orderSide === "buy" ? contract.currentPrice * 1.001 : contract.currentPrice * 0.999
    const fillQuantity = order.remainingQuantity

    const fill: OrderFill = {
      fillId: `fill_${Date.now()}`,
      fillQuantity,
      fillPrice,
      fillTime: new Date(),
      executionVenue: "SUPREME_EXCHANGE",
      commission: fillQuantity * 2.50, // $2.50 per contract
      fees: fillQuantity * 0.85, // $0.85 per contract in fees
    }

    setFuturesOrders(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        orderStatus: "filled",
        filledQuantity: fillQuantity,
        remainingQuantity: 0,
        fills: [...prev[orderId].fills, fill],
        averageFillPrice: fillPrice,
      }
    }))

    // Create or update position
    await updatePosition(order, fill)
  }

  const updatePosition = async (order: FuturesOrder, fill: OrderFill) => {
    const positionKey = `${order.accountId}_${order.contractId}`
    const existingPosition = futuresPositions[positionKey]

    if (existingPosition) {
      // Update existing position
      const newQuantity = order.orderSide === "buy" 
        ? existingPosition.quantity + fill.fillQuantity
        : existingPosition.quantity - fill.fillQuantity

      const newPositionType: "long" | "short" = newQuantity > 0 ? "long" : "short"
      const contract = commodityContracts[order.contractId]
      
      setFuturesPositions(prev => ({
        ...prev,
        [positionKey]: {
          ...prev[positionKey],
          quantity: Math.abs(newQuantity),
          positionType: newPositionType,
          currentPrice: contract?.currentPrice || 0,
          marketValue: Math.abs(newQuantity) * (contract?.currentPrice || 0) * (contract?.contractSize || 1),
          lastUpdateDate: new Date(),
        }
      }))
    } else {
      // Create new position
      const contract = commodityContracts[order.contractId]
      const positionId = `pos_${Date.now()}`
      
      const newPosition: FuturesPosition = {
        positionId,
        accountId: order.accountId,
        contractId: order.contractId,
        positionType: order.orderSide === "buy" ? "long" : "short",
        quantity: fill.fillQuantity,
        entryPrice: fill.fillPrice,
        currentPrice: contract?.currentPrice || fill.fillPrice,
        marketValue: fill.fillQuantity * (contract?.currentPrice || fill.fillPrice) * (contract?.contractSize || 1),
        unrealizedPnL: 0,
        realizedPnL: 0,
        totalPnL: 0,
        initialMargin: await calculateMarginRequirement(order.contractId, fill.fillQuantity),
        maintenanceMargin: (await calculateMarginRequirement(order.contractId, fill.fillQuantity)) * 0.8,
        marginExcess: 0,
        marginCall: false,
        openDate: new Date(),
        lastUpdateDate: new Date(),
        deltaEquivalent: fill.fillQuantity * (contract?.contractSize || 1),
        riskExposure: fill.fillQuantity * fill.fillPrice * (contract?.contractSize || 1),
        activeOrders: [],
        positionHistory: [{
          eventId: `event_${Date.now()}`,
          eventType: "open",
          eventDate: new Date(),
          quantity: fill.fillQuantity,
          price: fill.fillPrice,
          description: "Position opened"
        }],
      }

      setFuturesPositions(prev => ({
        ...prev,
        [positionKey]: newPosition
      }))
    }
  }

  const cancelFuturesOrder = async (orderId: string): Promise<void> => {
    setFuturesOrders(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        orderStatus: "cancelled"
      }
    }))
  }

  const modifyFuturesOrder = async (orderId: string, modifications: Partial<FuturesOrder>): Promise<void> => {
    setFuturesOrders(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        ...modifications
      }
    }))
  }

  const getPositions = (accountId: string): FuturesPosition[] => {
    return Object.values(futuresPositions).filter(position => position.accountId === accountId)
  }

  const closePosition = async (\
