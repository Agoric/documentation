export interface QGIUtility {
  id: string
  name: string
  category: "banking" | "trading" | "real-estate" | "credit" | "insurance" | "ai" | "citizenship"
  performanceMetrics: {
    revenue: number
    userGrowth: number
    transactionVolume: number
    profitMargin: number
    customerSatisfaction: number
    systemUptime: number
  }
  weight: number // Importance in overall calculation
  lastUpdated: Date
}

export interface SACTokenMetrics {
  currentPrice: number
  totalSupply: number
  circulatingSupply: number
  marketCap: number
  dailyVolume: number
  priceChange24h: number
  performanceIndex: number
  backingValue: number
  distributionRate: number
}

export class SupremeAuthorityCoinSystem {
  private utilities: Map<string, QGIUtility> = new Map()
  private tokenMetrics: SACTokenMetrics
  private performanceHistory: Array<{ timestamp: Date; index: number; price: number }> = []

  constructor() {
    this.tokenMetrics = {
      currentPrice: 1.0,
      totalSupply: 1000000000, // 1 billion SAC tokens
      circulatingSupply: 250000000, // 250 million in circulation
      marketCap: 0,
      dailyVolume: 0,
      priceChange24h: 0,
      performanceIndex: 100,
      backingValue: 0,
      distributionRate: 0.05, // 5% daily distribution rate
    }
    this.initializeQGIUtilities()
  }

  private initializeQGIUtilities() {
    const utilities: QGIUtility[] = [
      {
        id: "snapifi-banking",
        name: "Snapifi Banking Suite",
        category: "banking",
        performanceMetrics: {
          revenue: 2500000,
          userGrowth: 15.2,
          transactionVolume: 45000000,
          profitMargin: 23.5,
          customerSatisfaction: 94.2,
          systemUptime: 99.8,
        },
        weight: 0.2,
        lastUpdated: new Date(),
      },
      {
        id: "dax-trading",
        name: "DAX Trading Platform",
        category: "trading",
        performanceMetrics: {
          revenue: 1800000,
          userGrowth: 22.1,
          transactionVolume: 125000000,
          profitMargin: 31.2,
          customerSatisfaction: 91.7,
          systemUptime: 99.9,
        },
        weight: 0.18,
        lastUpdated: new Date(),
      },
      {
        id: "real-estate-marketplace",
        name: "Supreme Real Estate Marketplace",
        category: "real-estate",
        performanceMetrics: {
          revenue: 3200000,
          userGrowth: 18.5,
          transactionVolume: 89000000,
          profitMargin: 28.7,
          customerSatisfaction: 96.1,
          systemUptime: 99.7,
        },
        weight: 0.15,
        lastUpdated: new Date(),
      },
      {
        id: "credit-acceleration",
        name: "Credit Acceleration Engine",
        category: "credit",
        performanceMetrics: {
          revenue: 1950000,
          userGrowth: 25.3,
          transactionVolume: 67000000,
          profitMargin: 35.1,
          customerSatisfaction: 92.8,
          systemUptime: 99.6,
        },
        weight: 0.12,
        lastUpdated: new Date(),
      },
      {
        id: "insurance-coverage",
        name: "Supreme Insurance Coverage",
        category: "insurance",
        performanceMetrics: {
          revenue: 1400000,
          userGrowth: 12.7,
          transactionVolume: 34000000,
          profitMargin: 26.3,
          customerSatisfaction: 89.4,
          systemUptime: 99.5,
        },
        weight: 0.1,
        lastUpdated: new Date(),
      },
      {
        id: "ai-concierge",
        name: "AI Concierge System",
        category: "ai",
        performanceMetrics: {
          revenue: 980000,
          userGrowth: 35.2,
          transactionVolume: 15000000,
          profitMargin: 42.1,
          customerSatisfaction: 97.3,
          systemUptime: 99.9,
        },
        weight: 0.08,
        lastUpdated: new Date(),
      },
      {
        id: "global-citizenship",
        name: "Global Citizenship Platform",
        category: "citizenship",
        performanceMetrics: {
          revenue: 2100000,
          userGrowth: 28.9,
          transactionVolume: 23000000,
          profitMargin: 38.5,
          customerSatisfaction: 95.6,
          systemUptime: 99.8,
        },
        weight: 0.17,
        lastUpdated: new Date(),
      },
    ]

    utilities.forEach((utility) => {
      this.utilities.set(utility.id, utility)
    })
  }

  calculatePerformanceIndex(): number {
    let weightedScore = 0
    let totalWeight = 0

    this.utilities.forEach((utility) => {
      const metrics = utility.performanceMetrics

      // Normalize metrics to 0-100 scale
      const revenueScore = Math.min((metrics.revenue / 5000000) * 100, 100)
      const growthScore = Math.min(metrics.userGrowth * 2, 100)
      const volumeScore = Math.min((metrics.transactionVolume / 200000000) * 100, 100)
      const marginScore = Math.min(metrics.profitMargin * 2, 100)
      const satisfactionScore = metrics.customerSatisfaction
      const uptimeScore = metrics.systemUptime

      // Calculate composite score for this utility
      const utilityScore =
        revenueScore * 0.25 +
        growthScore * 0.2 +
        volumeScore * 0.2 +
        marginScore * 0.15 +
        satisfactionScore * 0.1 +
        uptimeScore * 0.1

      weightedScore += utilityScore * utility.weight
      totalWeight += utility.weight
    })

    return Math.round((weightedScore / totalWeight) * 100) / 100
  }

  calculateTokenPrice(): number {
    const performanceIndex = this.calculatePerformanceIndex()
    const basePrice = 1.0
    const performanceMultiplier = performanceIndex / 100
    const demandFactor = this.calculateDemandFactor()

    return Math.round(basePrice * performanceMultiplier * demandFactor * 10000) / 10000
  }

  private calculateDemandFactor(): number {
    // Simulate demand based on utility performance and market conditions
    const totalRevenue = Array.from(this.utilities.values()).reduce(
      (sum, utility) => sum + utility.performanceMetrics.revenue,
      0,
    )

    const avgGrowth =
      Array.from(this.utilities.values()).reduce((sum, utility) => sum + utility.performanceMetrics.userGrowth, 0) /
      this.utilities.size

    return 1 + totalRevenue / 50000000 + avgGrowth / 100
  }

  calculateBackingValue(): number {
    const totalRevenue = Array.from(this.utilities.values()).reduce(
      (sum, utility) => sum + utility.performanceMetrics.revenue,
      0,
    )

    const totalVolume = Array.from(this.utilities.values()).reduce(
      (sum, utility) => sum + utility.performanceMetrics.transactionVolume,
      0,
    )

    // Backing value based on revenue and transaction volume
    return (totalRevenue * 12 + totalVolume * 0.01) / this.tokenMetrics.circulatingSupply
  }

  updateTokenMetrics(): SACTokenMetrics {
    const previousPrice = this.tokenMetrics.currentPrice
    const newPrice = this.calculateTokenPrice()
    const performanceIndex = this.calculatePerformanceIndex()
    const backingValue = this.calculateBackingValue()

    this.tokenMetrics = {
      ...this.tokenMetrics,
      currentPrice: newPrice,
      priceChange24h: ((newPrice - previousPrice) / previousPrice) * 100,
      performanceIndex,
      backingValue,
      marketCap: newPrice * this.tokenMetrics.circulatingSupply,
      dailyVolume: this.calculateDailyVolume(),
    }

    // Store historical data
    this.performanceHistory.push({
      timestamp: new Date(),
      index: performanceIndex,
      price: newPrice,
    })

    // Keep only last 30 days of history
    if (this.performanceHistory.length > 720) {
      // 30 days * 24 hours
      this.performanceHistory = this.performanceHistory.slice(-720)
    }

    return this.tokenMetrics
  }

  private calculateDailyVolume(): number {
    // Simulate daily volume based on market cap and activity
    const baseVolume = this.tokenMetrics.marketCap * 0.05 // 5% of market cap
    const volatilityFactor = Math.abs(this.tokenMetrics.priceChange24h) / 10
    return Math.round(baseVolume * (1 + volatilityFactor))
  }

  getUtilityPerformance(): QGIUtility[] {
    return Array.from(this.utilities.values()).sort((a, b) => {
      const scoreA = this.calculateUtilityScore(a)
      const scoreB = this.calculateUtilityScore(b)
      return scoreB - scoreA
    })
  }

  private calculateUtilityScore(utility: QGIUtility): number {
    const metrics = utility.performanceMetrics
    return (
      (metrics.revenue / 1000000) * 0.3 +
      metrics.userGrowth * 0.2 +
      (metrics.transactionVolume / 10000000) * 0.2 +
      metrics.profitMargin * 0.15 +
      metrics.customerSatisfaction * 0.1 +
      metrics.systemUptime * 0.05
    )
  }

  distributeTokens(userPerformanceScore: number): number {
    const baseDistribution = 100 // Base tokens per day
    const performanceMultiplier = userPerformanceScore / 100
    const systemPerformanceBonus = this.tokenMetrics.performanceIndex / 100

    return Math.round(baseDistribution * performanceMultiplier * systemPerformanceBonus)
  }

  getTokenMetrics(): SACTokenMetrics {
    return this.tokenMetrics
  }

  getPerformanceHistory(): Array<{ timestamp: Date; index: number; price: number }> {
    return this.performanceHistory
  }

  updateUtilityMetrics(utilityId: string, metrics: Partial<QGIUtility["performanceMetrics"]>): void {
    const utility = this.utilities.get(utilityId)
    if (utility) {
      utility.performanceMetrics = { ...utility.performanceMetrics, ...metrics }
      utility.lastUpdated = new Date()
      this.updateTokenMetrics()
    }
  }
}

// Singleton instance
export const sacTokenSystem = new SupremeAuthorityCoinSystem()
