"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Define types for Fractional Ownership system
export interface FractionalOwnership {
  id: string
  ownerId: string
  ownerType: "individual" | "institutional"
  productId: string
  productType: "real_estate" | "holographic_products" | "commodities" | "guaranteed_products" | "marketplace_services"
  ownershipPercentage: number
  initialInvestment: number
  currentValue: number
  profitShare: number
  acquisitionDate: Date

  // Profit Distribution
  profitHistory: ProfitDistribution[]
  totalProfitsReceived: number
  annualizedReturn: number

  // Product Details
  productDetails: ProductDetails

  // Ownership Rights
  votingRights: boolean
  managementRights: boolean
  transferRights: boolean

  // Performance Metrics
  performanceMetrics: PerformanceMetrics
}

export interface ProductDetails {
  name: string
  description: string
  category: string
  totalValue: number
  totalOwners: number
  availableShares: number
  minimumInvestment: number
  expectedROI: {
    min: number
    max: number
    timeframe: number // years
  }
  riskLevel: "low" | "medium" | "high"
  accessLevel: "individual" | "institutional" | "both"
}

export interface ProfitDistribution {
  distributionId: string
  date: Date
  amount: number
  source: "product_revenue" | "appreciation" | "dividends" | "commodity_gains"
  distributionType: "quarterly" | "annual" | "event_based"
  taxImplications: TaxImplications
}

export interface TaxImplications {
  taxableAmount: number
  taxCategory: "capital_gains" | "dividend_income" | "ordinary_income"
  withholdingRate: number
  estimatedTaxLiability: number
}

export interface PerformanceMetrics {
  totalReturn: number
  annualizedReturn: number
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  profitFactor: number
  winRate: number
  averageHoldingPeriod: number // days
}

export interface CommoditiesMarket {
  marketId: string
  commodityType: "precious_metals" | "energy" | "agriculture" | "industrial_metals" | "carbon_credits"
  currentPrice: number
  priceHistory: PricePoint[]

  // ROI Structure
  guaranteedROI: {
    minROI: number // 5%
    maxROI: number // 25%
    minimumHoldingPeriod: number // 2.5 years
  }

  // Market Access
  individualAccess: boolean
  institutionalAccess: boolean

  // Market Metrics
  totalVolume: number
  activeParticipants: number
  averageROI: number
  marketCapitalization: number
}

export interface PricePoint {
  date: Date
  price: number
  volume: number
}

export interface GuaranteedProduct {
  productId: string
  productName: string
  guaranteeType: "insurance" | "financing" | "investment" | "service"
  guaranteedReturns: number
  minimumInvestment: number
  accessLevel: "institutional" // Only institutional access
  institutionalRequirements: InstitutionalRequirements
}

export interface InstitutionalRequirements {
  minimumAssets: number
  minimumRevenue: number
  creditRating: string
  regulatoryCompliance: string[]
  businessType: string[]
}

export interface OwnershipPortfolio {
  portfolioId: string
  ownerId: string
  ownerType: "individual" | "institutional"
  totalInvestment: number
  currentValue: number
  totalProfits: number

  // Holdings
  fractionalOwnerships: FractionalOwnership[]
  commodityPositions: CommodityPosition[]
  guaranteedProducts: GuaranteedProduct[]

  // Performance
  portfolioPerformance: PerformanceMetrics
  diversificationScore: number
  riskScore: number
}

export interface CommodityPosition {
  positionId: string
  commodityType: string
  quantity: number
  averageCost: number
  currentValue: number
  unrealizedGains: number
  holdingPeriod: number // days
  targetROI: number
  projectedMaturity: Date
}

interface FractionalOwnershipContextType {
  // Portfolio Management
  ownershipPortfolios: Record<string, OwnershipPortfolio>
  commoditiesMarkets: Record<string, CommoditiesMarket>
  guaranteedProducts: GuaranteedProduct[]

  // Ownership Functions
  purchaseFractionalOwnership: (
    productId: string,
    investmentAmount: number,
    ownerId: string,
    ownerType: "individual" | "institutional",
  ) => Promise<FractionalOwnership>

  // Commodities Trading
  enterCommodityPosition: (
    commodityType: string,
    investmentAmount: number,
    ownerId: string,
    ownerType: "individual" | "institutional",
  ) => Promise<CommodityPosition>

  // Guaranteed Products (Institutional Only)
  purchaseGuaranteedProduct: (productId: string, investmentAmount: number, institutionalId: string) => Promise<boolean>

  // Access Control
  checkProductAccess: (productId: string, ownerType: "individual" | "institutional") => boolean
  getAvailableProducts: (ownerType: "individual" | "institutional") => ProductDetails[]

  // Profit Distribution
  distributeProfits: (productId: string, totalProfit: number) => Promise<void>
  calculateOwnershipProfits: (ownershipId: string, totalProfit: number) => number

  // Portfolio Analytics
  getPortfolioPerformance: (ownerId: string) => PerformanceMetrics
  calculateROI: (ownershipId: string) => number
  projectCommodityReturns: (positionId: string) => {
    projectedROI: number
    timeToTarget: number
    confidenceLevel: number
  }

  // Market Data
  getCommodityPrices: () => Record<string, number>
  getMarketTrends: (commodityType: string) => any

  // Utility Functions
  validateInstitutionalRequirements: (institutionalId: string) => boolean
  calculateDiversificationScore: (portfolioId: string) => number
  generateOwnershipCertificate: (ownershipId: string) => Promise<string>
}

const FractionalOwnershipContext = createContext<FractionalOwnershipContextType | undefined>(undefined)

export const useFractionalOwnership = () => {
  const context = useContext(FractionalOwnershipContext)
  if (!context) {
    throw new Error("useFractionalOwnership must be used within a FractionalOwnershipProvider")
  }
  return context
}

// Sample data and configurations
const sampleCommoditiesMarkets: Record<string, CommoditiesMarket> = {
  precious_metals: {
    marketId: "PREC-METALS-001",
    commodityType: "precious_metals",
    currentPrice: 2450.75, // Gold price per oz
    priceHistory: [
      { date: new Date(2024, 0, 1), price: 2100.0, volume: 1500000 },
      { date: new Date(2024, 6, 1), price: 2350.0, volume: 1750000 },
      { date: new Date(), price: 2450.75, volume: 1650000 },
    ],
    guaranteedROI: {
      minROI: 0.05, // 5%
      maxROI: 0.25, // 25%
      minimumHoldingPeriod: 2.5, // 2.5 years
    },
    individualAccess: true,
    institutionalAccess: true,
    totalVolume: 125000000,
    activeParticipants: 15420,
    averageROI: 0.147, // 14.7%
    marketCapitalization: 2500000000,
  },
  energy: {
    marketId: "ENERGY-001",
    commodityType: "energy",
    currentPrice: 85.5, // Oil price per barrel
    priceHistory: [
      { date: new Date(2024, 0, 1), price: 75.0, volume: 2500000 },
      { date: new Date(2024, 6, 1), price: 82.0, volume: 2750000 },
      { date: new Date(), price: 85.5, volume: 2650000 },
    ],
    guaranteedROI: {
      minROI: 0.05,
      maxROI: 0.25,
      minimumHoldingPeriod: 2.5,
    },
    individualAccess: true,
    institutionalAccess: true,
    totalVolume: 350000000,
    activeParticipants: 8750,
    averageROI: 0.162, // 16.2%
    marketCapitalization: 4200000000,
  },
  carbon_credits: {
    marketId: "CARBON-001",
    commodityType: "carbon_credits",
    currentPrice: 45.25, // Price per carbon credit
    priceHistory: [
      { date: new Date(2024, 0, 1), price: 35.0, volume: 500000 },
      { date: new Date(2024, 6, 1), price: 42.0, volume: 650000 },
      { date: new Date(), price: 45.25, volume: 580000 },
    ],
    guaranteedROI: {
      minROI: 0.05,
      maxROI: 0.25,
      minimumHoldingPeriod: 2.5,
    },
    individualAccess: true,
    institutionalAccess: true,
    totalVolume: 75000000,
    activeParticipants: 12500,
    averageROI: 0.189, // 18.9%
    marketCapitalization: 1800000000,
  },
}

const sampleGuaranteedProducts: GuaranteedProduct[] = [
  {
    productId: "GUARANTEED-INS-001",
    productName: "Institutional Insurance Coverage",
    guaranteeType: "insurance",
    guaranteedReturns: 0.045, // 4.5% guaranteed
    minimumInvestment: 500000,
    accessLevel: "institutional",
    institutionalRequirements: {
      minimumAssets: 10000000,
      minimumRevenue: 5000000,
      creditRating: "A-",
      regulatoryCompliance: ["SOX", "GDPR", "Basel III"],
      businessType: ["corporation", "llc", "partnership"],
    },
  },
  {
    productId: "GUARANTEED-FIN-001",
    productName: "Guaranteed Financing Products",
    guaranteeType: "financing",
    guaranteedReturns: 0.055, // 5.5% guaranteed
    minimumInvestment: 1000000,
    accessLevel: "institutional",
    institutionalRequirements: {
      minimumAssets: 25000000,
      minimumRevenue: 10000000,
      creditRating: "A",
      regulatoryCompliance: ["SOX", "GDPR", "Basel III", "Dodd-Frank"],
      businessType: ["corporation", "financial_institution"],
    },
  },
]

const sampleProductDetails: Record<string, ProductDetails> = {
  real_estate_portfolio: {
    name: "Global Real Estate Portfolio",
    description: "Diversified real estate investments across major global markets",
    category: "real_estate",
    totalValue: 500000000,
    totalOwners: 2500,
    availableShares: 15.5, // 15.5% still available
    minimumInvestment: 10000,
    expectedROI: {
      min: 0.08, // 8%
      max: 0.18, // 18%
      timeframe: 3,
    },
    riskLevel: "medium",
    accessLevel: "both",
  },
  holographic_tech: {
    name: "Holographic Technology Products",
    description: "Cutting-edge holographic display and interaction technology",
    category: "holographic_products",
    totalValue: 250000000,
    totalOwners: 1200,
    availableShares: 22.3, // 22.3% still available
    minimumInvestment: 5000,
    expectedROI: {
      min: 0.12, // 12%
      max: 0.35, // 35%
      timeframe: 2,
    },
    riskLevel: "high",
    accessLevel: "both",
  },
  marketplace_services: {
    name: "QUICA Marketplace Services",
    description: "Revenue share from marketplace transaction fees and services",
    category: "marketplace_services",
    totalValue: 150000000,
    totalOwners: 5000,
    availableShares: 8.7, // 8.7% still available
    minimumInvestment: 2500,
    expectedROI: {
      min: 0.06, // 6%
      max: 0.15, // 15%
      timeframe: 1,
    },
    riskLevel: "low",
    accessLevel: "both",
  },
}

export const FractionalOwnershipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ownershipPortfolios, setOwnershipPortfolios] = useState<Record<string, OwnershipPortfolio>>({})
  const [commoditiesMarkets, setCommoditiesMarkets] =
    useState<Record<string, CommoditiesMarket>>(sampleCommoditiesMarkets)
  const [guaranteedProducts, setGuaranteedProducts] = useState<GuaranteedProduct[]>(sampleGuaranteedProducts)

  // Ownership Functions
  const purchaseFractionalOwnership = async (
    productId: string,
    investmentAmount: number,
    ownerId: string,
    ownerType: "individual" | "institutional",
  ): Promise<FractionalOwnership> => {
    const productDetails = sampleProductDetails[productId]
    if (!productDetails) throw new Error("Product not found")

    // Check access level
    if (!checkProductAccess(productId, ownerType)) {
      throw new Error("Access denied for this product")
    }

    // Calculate ownership percentage
    const ownershipPercentage = (investmentAmount / productDetails.totalValue) * 100

    const newOwnership: FractionalOwnership = {
      id: `ownership_${Date.now()}`,
      ownerId,
      ownerType,
      productId,
      productType: productDetails.category as any,
      ownershipPercentage,
      initialInvestment: investmentAmount,
      currentValue: investmentAmount, // Initially same as investment
      profitShare: 0,
      acquisitionDate: new Date(),
      profitHistory: [],
      totalProfitsReceived: 0,
      annualizedReturn: 0,
      productDetails,
      votingRights: ownershipPercentage >= 1.0, // 1% or more gets voting rights
      managementRights: ownershipPercentage >= 5.0, // 5% or more gets management rights
      transferRights: true,
      performanceMetrics: {
        totalReturn: 0,
        annualizedReturn: 0,
        volatility: 0,
        sharpeRatio: 0,
        maxDrawdown: 0,
        profitFactor: 1,
        winRate: 0,
        averageHoldingPeriod: 0,
      },
    }

    // Add to portfolio
    if (!ownershipPortfolios[ownerId]) {
      ownershipPortfolios[ownerId] = {
        portfolioId: `portfolio_${ownerId}`,
        ownerId,
        ownerType,
        totalInvestment: 0,
        currentValue: 0,
        totalProfits: 0,
        fractionalOwnerships: [],
        commodityPositions: [],
        guaranteedProducts: [],
        portfolioPerformance: {
          totalReturn: 0,
          annualizedReturn: 0,
          volatility: 0,
          sharpeRatio: 0,
          maxDrawdown: 0,
          profitFactor: 1,
          winRate: 0,
          averageHoldingPeriod: 0,
        },
        diversificationScore: 0,
        riskScore: 0,
      }
    }

    setOwnershipPortfolios((prev) => ({
      ...prev,
      [ownerId]: {
        ...prev[ownerId],
        fractionalOwnerships: [...prev[ownerId].fractionalOwnerships, newOwnership],
        totalInvestment: prev[ownerId].totalInvestment + investmentAmount,
        currentValue: prev[ownerId].currentValue + investmentAmount,
      },
    }))

    return newOwnership
  }

  // Commodities Trading
  const enterCommodityPosition = async (
    commodityType: string,
    investmentAmount: number,
    ownerId: string,
    ownerType: "individual" | "institutional",
  ): Promise<CommodityPosition> => {
    const market = commoditiesMarkets[commodityType]
    if (!market) throw new Error("Commodity market not found")

    // Both individual and institutional can access commodities
    const quantity = investmentAmount / market.currentPrice
    const targetROI =
      Math.random() * (market.guaranteedROI.maxROI - market.guaranteedROI.minROI) + market.guaranteedROI.minROI

    const position: CommodityPosition = {
      positionId: `pos_${Date.now()}`,
      commodityType,
      quantity,
      averageCost: market.currentPrice,
      currentValue: investmentAmount,
      unrealizedGains: 0,
      holdingPeriod: 0,
      targetROI,
      projectedMaturity: new Date(Date.now() + market.guaranteedROI.minimumHoldingPeriod * 365 * 24 * 60 * 60 * 1000),
    }

    // Add to portfolio
    if (!ownershipPortfolios[ownerId]) {
      ownershipPortfolios[ownerId] = {
        portfolioId: `portfolio_${ownerId}`,
        ownerId,
        ownerType,
        totalInvestment: 0,
        currentValue: 0,
        totalProfits: 0,
        fractionalOwnerships: [],
        commodityPositions: [],
        guaranteedProducts: [],
        portfolioPerformance: {
          totalReturn: 0,
          annualizedReturn: 0,
          volatility: 0,
          sharpeRatio: 0,
          maxDrawdown: 0,
          profitFactor: 1,
          winRate: 0,
          averageHoldingPeriod: 0,
        },
        diversificationScore: 0,
        riskScore: 0,
      }
    }

    setOwnershipPortfolios((prev) => ({
      ...prev,
      [ownerId]: {
        ...prev[ownerId],
        commodityPositions: [...prev[ownerId].commodityPositions, position],
        totalInvestment: prev[ownerId].totalInvestment + investmentAmount,
        currentValue: prev[ownerId].currentValue + investmentAmount,
      },
    }))

    return position
  }

  // Guaranteed Products (Institutional Only)
  const purchaseGuaranteedProduct = async (
    productId: string,
    investmentAmount: number,
    institutionalId: string,
  ): Promise<boolean> => {
    const product = guaranteedProducts.find((p) => p.productId === productId)
    if (!product) throw new Error("Guaranteed product not found")

    // Validate institutional requirements
    if (!validateInstitutionalRequirements(institutionalId)) {
      throw new Error("Institutional requirements not met")
    }

    if (investmentAmount < product.minimumInvestment) {
      throw new Error("Investment amount below minimum requirement")
    }

    // Add to institutional portfolio
    if (!ownershipPortfolios[institutionalId]) {
      ownershipPortfolios[institutionalId] = {
        portfolioId: `portfolio_${institutionalId}`,
        ownerId: institutionalId,
        ownerType: "institutional",
        totalInvestment: 0,
        currentValue: 0,
        totalProfits: 0,
        fractionalOwnerships: [],
        commodityPositions: [],
        guaranteedProducts: [],
        portfolioPerformance: {
          totalReturn: 0,
          annualizedReturn: 0,
          volatility: 0,
          sharpeRatio: 0,
          maxDrawdown: 0,
          profitFactor: 1,
          winRate: 0,
          averageHoldingPeriod: 0,
        },
        diversificationScore: 0,
        riskScore: 0,
      }
    }

    setOwnershipPortfolios((prev) => ({
      ...prev,
      [institutionalId]: {
        ...prev[institutionalId],
        guaranteedProducts: [...prev[institutionalId].guaranteedProducts, product],
        totalInvestment: prev[institutionalId].totalInvestment + investmentAmount,
        currentValue: prev[institutionalId].currentValue + investmentAmount,
      },
    }))

    return true
  }

  // Access Control
  const checkProductAccess = (productId: string, ownerType: "individual" | "institutional"): boolean => {
    const productDetails = sampleProductDetails[productId]
    if (!productDetails) return false

    return productDetails.accessLevel === "both" || productDetails.accessLevel === ownerType
  }

  const getAvailableProducts = (ownerType: "individual" | "institutional"): ProductDetails[] => {
    return Object.values(sampleProductDetails).filter(
      (product) => product.accessLevel === "both" || product.accessLevel === ownerType,
    )
  }

  // Profit Distribution
  const distributeProfits = async (productId: string, totalProfit: number): Promise<void> => {
    // Find all owners of this product
    const productOwners: FractionalOwnership[] = []

    Object.values(ownershipPortfolios).forEach((portfolio) => {
      portfolio.fractionalOwnerships.forEach((ownership) => {
        if (ownership.productId === productId) {
          productOwners.push(ownership)
        }
      })
    })

    // Distribute profits proportionally
    for (const ownership of productOwners) {
      const ownerProfit = calculateOwnershipProfits(ownership.id, totalProfit)

      const profitDistribution: ProfitDistribution = {
        distributionId: `dist_${Date.now()}_${ownership.id}`,
        date: new Date(),
        amount: ownerProfit,
        source: "product_revenue",
        distributionType: "quarterly",
        taxImplications: {
          taxableAmount: ownerProfit * 0.85, // 85% taxable
          taxCategory: "dividend_income",
          withholdingRate: 0.15,
          estimatedTaxLiability: ownerProfit * 0.15,
        },
      }

      // Update ownership record
      setOwnershipPortfolios((prev) => ({
        ...prev,
        [ownership.ownerId]: {
          ...prev[ownership.ownerId],
          fractionalOwnerships: prev[ownership.ownerId].fractionalOwnerships.map((o) =>
            o.id === ownership.id
              ? {
                  ...o,
                  profitHistory: [...o.profitHistory, profitDistribution],
                  totalProfitsReceived: o.totalProfitsReceived + ownerProfit,
                  profitShare: o.profitShare + ownerProfit,
                }
              : o,
          ),
          totalProfits: prev[ownership.ownerId].totalProfits + ownerProfit,
        },
      }))
    }
  }

  const calculateOwnershipProfits = (ownershipId: string, totalProfit: number): number => {
    // Find the ownership record
    for (const portfolio of Object.values(ownershipPortfolios)) {
      const ownership = portfolio.fractionalOwnerships.find((o) => o.id === ownershipId)
      if (ownership) {
        return totalProfit * (ownership.ownershipPercentage / 100)
      }
    }
    return 0
  }

  // Portfolio Analytics
  const getPortfolioPerformance = (ownerId: string): PerformanceMetrics => {
    const portfolio = ownershipPortfolios[ownerId]
    if (!portfolio) {
      return {
        totalReturn: 0,
        annualizedReturn: 0,
        volatility: 0,
        sharpeRatio: 0,
        maxDrawdown: 0,
        profitFactor: 1,
        winRate: 0,
        averageHoldingPeriod: 0,
      }
    }

    const totalReturn =
      (portfolio.currentValue + portfolio.totalProfits - portfolio.totalInvestment) / portfolio.totalInvestment
    const annualizedReturn = totalReturn // Simplified calculation

    return {
      totalReturn,
      annualizedReturn,
      volatility: 0.12, // Placeholder
      sharpeRatio: annualizedReturn / 0.12,
      maxDrawdown: -0.05, // Placeholder
      profitFactor: 1.25, // Placeholder
      winRate: 0.75, // Placeholder
      averageHoldingPeriod: 365, // Placeholder
    }
  }

  const calculateROI = (ownershipId: string): number => {
    for (const portfolio of Object.values(ownershipPortfolios)) {
      const ownership = portfolio.fractionalOwnerships.find((o) => o.id === ownershipId)
      if (ownership) {
        return (
          (ownership.currentValue + ownership.totalProfitsReceived - ownership.initialInvestment) /
          ownership.initialInvestment
        )
      }
    }
    return 0
  }

  const projectCommodityReturns = (positionId: string) => {
    for (const portfolio of Object.values(ownershipPortfolios)) {
      const position = portfolio.commodityPositions.find((p) => p.positionId === positionId)
      if (position) {
        const timeToTarget = (position.projectedMaturity.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        return {
          projectedROI: position.targetROI,
          timeToTarget: Math.max(0, timeToTarget),
          confidenceLevel: 0.85, // 85% confidence in commodities ROI
        }
      }
    }
    return { projectedROI: 0, timeToTarget: 0, confidenceLevel: 0 }
  }

  // Market Data
  const getCommodityPrices = (): Record<string, number> => {
    const prices: Record<string, number> = {}
    Object.entries(commoditiesMarkets).forEach(([key, market]) => {
      prices[key] = market.currentPrice
    })
    return prices
  }

  const getMarketTrends = (commodityType: string) => {
    const market = commoditiesMarkets[commodityType]
    if (!market) return null

    const priceChange =
      market.priceHistory.length > 1
        ? ((market.currentPrice - market.priceHistory[0].price) / market.priceHistory[0].price) * 100
        : 0

    return {
      trend: priceChange > 0 ? "bullish" : "bearish",
      priceChange,
      volatility: 0.15, // Placeholder
      momentum: priceChange > 5 ? "strong" : priceChange > 0 ? "moderate" : "weak",
    }
  }

  // Utility Functions
  const validateInstitutionalRequirements = (institutionalId: string): boolean => {
    // Simplified validation - in real implementation, would check actual institutional data
    return true
  }

  const calculateDiversificationScore = (portfolioId: string): number => {
    const portfolio = ownershipPortfolios[portfolioId]
    if (!portfolio) return 0

    // Calculate diversification based on number of different asset types
    const assetTypes = new Set()
    portfolio.fractionalOwnerships.forEach((o) => assetTypes.add(o.productType))
    portfolio.commodityPositions.forEach((p) => assetTypes.add(p.commodityType))

    return Math.min(assetTypes.size * 20, 100) // Max 100% diversification score
  }

  const generateOwnershipCertificate = async (ownershipId: string): Promise<string> => {
    // Generate a certificate for fractional ownership
    return `OWNERSHIP-CERT-${ownershipId}-${Date.now()}`
  }

  return (
    <FractionalOwnershipContext.Provider
      value={{
        ownershipPortfolios,
        commoditiesMarkets,
        guaranteedProducts,
        purchaseFractionalOwnership,
        enterCommodityPosition,
        purchaseGuaranteedProduct,
        checkProductAccess,
        getAvailableProducts,
        distributeProfits,
        calculateOwnershipProfits,
        getPortfolioPerformance,
        calculateROI,
        projectCommodityReturns,
        getCommodityPrices,
        getMarketTrends,
        validateInstitutionalRequirements,
        calculateDiversificationScore,
        generateOwnershipCertificate,
      }}
    >
      {children}
    </FractionalOwnershipContext.Provider>
  )
}
