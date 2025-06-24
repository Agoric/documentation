export interface Feature {
  id: string
  name: string
  description: string
  category: "banking" | "trading" | "ai" | "legal" | "voice" | "analytics" | "security" | "premium"
  status: "locked" | "unlocked" | "beta" | "premium"
  dependencies: string[]
  unlockConditions: {
    userLevel?: number
    completedGoals?: string[]
    minimumBalance?: number
    verificationLevel?: "basic" | "advanced" | "premium"
  }
}

export interface UserFeatureAccess {
  userId: string
  unlockedFeatures: string[]
  userLevel: number
  verificationLevel: "basic" | "advanced" | "premium"
  totalBalance: number
  completedGoals: string[]
}

class FeatureUnlockSystem {
  private features: Map<string, Feature> = new Map()
  private userAccess: Map<string, UserFeatureAccess> = new Map()

  constructor() {
    this.initializeFeatures()
  }

  private initializeFeatures(): void {
    const allFeatures: Feature[] = [
      // Banking Features
      {
        id: "basic_banking",
        name: "Basic Banking",
        description: "Standard banking operations and account management",
        category: "banking",
        status: "unlocked",
        dependencies: [],
        unlockConditions: {},
      },
      {
        id: "business_banking",
        name: "Business Banking",
        description: "Advanced business banking and corporate accounts",
        category: "banking",
        status: "unlocked",
        dependencies: ["basic_banking"],
        unlockConditions: { userLevel: 2 },
      },
      {
        id: "international_transfers",
        name: "International Transfers",
        description: "Global money transfers and currency exchange",
        category: "banking",
        status: "unlocked",
        dependencies: ["basic_banking"],
        unlockConditions: { verificationLevel: "advanced" },
      },
      {
        id: "private_banking",
        name: "Private Banking",
        description: "Exclusive private banking services",
        category: "banking",
        status: "premium",
        dependencies: ["business_banking"],
        unlockConditions: { minimumBalance: 1000000, userLevel: 5 },
      },

      // Trading Features
      {
        id: "crypto_trading",
        name: "Cryptocurrency Trading",
        description: "Advanced crypto trading with real-time data",
        category: "trading",
        status: "unlocked",
        dependencies: [],
        unlockConditions: { userLevel: 1 },
      },
      {
        id: "forex_trading",
        name: "Forex Trading",
        description: "Foreign exchange trading platform",
        category: "trading",
        status: "unlocked",
        dependencies: ["crypto_trading"],
        unlockConditions: { userLevel: 3 },
      },
      {
        id: "algorithmic_trading",
        name: "Algorithmic Trading",
        description: "AI-powered automated trading strategies",
        category: "trading",
        status: "premium",
        dependencies: ["forex_trading"],
        unlockConditions: { userLevel: 4, minimumBalance: 100000 },
      },
      {
        id: "institutional_trading",
        name: "Institutional Trading",
        description: "High-volume institutional trading access",
        category: "trading",
        status: "premium",
        dependencies: ["algorithmic_trading"],
        unlockConditions: { userLevel: 5, minimumBalance: 5000000 },
      },

      // AI Features
      {
        id: "ai_concierge",
        name: "AI Concierge",
        description: "Personal AI financial assistant",
        category: "ai",
        status: "unlocked",
        dependencies: [],
        unlockConditions: {},
      },
      {
        id: "ai_investment_advisor",
        name: "AI Investment Advisor",
        description: "AI-powered investment recommendations",
        category: "ai",
        status: "unlocked",
        dependencies: ["ai_concierge"],
        unlockConditions: { userLevel: 2 },
      },
      {
        id: "ai_risk_management",
        name: "AI Risk Management",
        description: "Advanced AI risk assessment and management",
        category: "ai",
        status: "premium",
        dependencies: ["ai_investment_advisor"],
        unlockConditions: { userLevel: 4, minimumBalance: 250000 },
      },
      {
        id: "ai_market_prediction",
        name: "AI Market Prediction",
        description: "Predictive market analysis and forecasting",
        category: "ai",
        status: "premium",
        dependencies: ["ai_risk_management"],
        unlockConditions: { userLevel: 5, minimumBalance: 1000000 },
      },

      // Legal Features
      {
        id: "basic_compliance",
        name: "Basic Compliance",
        description: "Standard legal compliance and documentation",
        category: "legal",
        status: "unlocked",
        dependencies: [],
        unlockConditions: {},
      },
      {
        id: "blockchain_registry",
        name: "Blockchain Legal Registry",
        description: "Immutable legal document storage",
        category: "legal",
        status: "unlocked",
        dependencies: ["basic_compliance"],
        unlockConditions: { verificationLevel: "advanced" },
      },
      {
        id: "digital_signatures",
        name: "Digital Signatures",
        description: "Legally binding digital signature system",
        category: "legal",
        status: "unlocked",
        dependencies: ["blockchain_registry"],
        unlockConditions: { verificationLevel: "advanced" },
      },
      {
        id: "international_legal",
        name: "International Legal Services",
        description: "Global legal compliance and treaty management",
        category: "legal",
        status: "premium",
        dependencies: ["digital_signatures"],
        unlockConditions: { userLevel: 4, verificationLevel: "premium" },
      },

      // Voice Features
      {
        id: "voice_navigation",
        name: "Voice Navigation",
        description: "Voice-controlled platform navigation",
        category: "voice",
        status: "unlocked",
        dependencies: [],
        unlockConditions: {},
      },
      {
        id: "voice_commands",
        name: "Voice Commands",
        description: "Advanced voice command execution",
        category: "voice",
        status: "unlocked",
        dependencies: ["voice_navigation"],
        unlockConditions: { userLevel: 1 },
      },
      {
        id: "voice_biometrics",
        name: "Voice Biometrics",
        description: "Voice-based authentication and security",
        category: "voice",
        status: "premium",
        dependencies: ["voice_commands"],
        unlockConditions: { userLevel: 3, verificationLevel: "premium" },
      },

      // Analytics Features
      {
        id: "basic_analytics",
        name: "Basic Analytics",
        description: "Standard financial analytics and reporting",
        category: "analytics",
        status: "unlocked",
        dependencies: [],
        unlockConditions: {},
      },
      {
        id: "advanced_analytics",
        name: "Advanced Analytics",
        description: "Comprehensive financial analysis and insights",
        category: "analytics",
        status: "unlocked",
        dependencies: ["basic_analytics"],
        unlockConditions: { userLevel: 2 },
      },
      {
        id: "predictive_analytics",
        name: "Predictive Analytics",
        description: "AI-powered predictive financial modeling",
        category: "analytics",
        status: "premium",
        dependencies: ["advanced_analytics"],
        unlockConditions: { userLevel: 4, minimumBalance: 500000 },
      },

      // Security Features
      {
        id: "basic_security",
        name: "Basic Security",
        description: "Standard security protocols and encryption",
        category: "security",
        status: "unlocked",
        dependencies: [],
        unlockConditions: {},
      },
      {
        id: "advanced_security",
        name: "Advanced Security",
        description: "Multi-factor authentication and biometrics",
        category: "security",
        status: "unlocked",
        dependencies: ["basic_security"],
        unlockConditions: { verificationLevel: "advanced" },
      },
      {
        id: "quantum_security",
        name: "Quantum Security",
        description: "Quantum-resistant encryption and security",
        category: "security",
        status: "premium",
        dependencies: ["advanced_security"],
        unlockConditions: { userLevel: 5, verificationLevel: "premium" },
      },

      // Premium Features
      {
        id: "concierge_service",
        name: "Personal Concierge Service",
        description: "24/7 personal financial concierge",
        category: "premium",
        status: "premium",
        dependencies: [],
        unlockConditions: { userLevel: 4, minimumBalance: 1000000 },
      },
      {
        id: "exclusive_investments",
        name: "Exclusive Investments",
        description: "Access to exclusive investment opportunities",
        category: "premium",
        status: "premium",
        dependencies: [],
        unlockConditions: { userLevel: 5, minimumBalance: 5000000 },
      },
      {
        id: "global_citizenship",
        name: "Global Citizenship Services",
        description: "Comprehensive global citizenship and residency services",
        category: "premium",
        status: "premium",
        dependencies: [],
        unlockConditions: { userLevel: 5, verificationLevel: "premium" },
      },
    ]

    allFeatures.forEach((feature) => {
      this.features.set(feature.id, feature)
    })
  }

  unlockAllFeatures(userId: string): UserFeatureAccess {
    const allFeatureIds = Array.from(this.features.keys())

    const userAccess: UserFeatureAccess = {
      userId,
      unlockedFeatures: allFeatureIds,
      userLevel: 5, // Maximum level
      verificationLevel: "premium",
      totalBalance: 10000000, // $10M balance
      completedGoals: ["credit_improvement", "savings_goal", "investment_target", "business_setup"],
    }

    this.userAccess.set(userId, userAccess)
    return userAccess
  }

  getUserFeatures(userId: string): Feature[] {
    const userAccess = this.userAccess.get(userId)
    if (!userAccess) return []

    return userAccess.unlockedFeatures
      .map((featureId) => this.features.get(featureId))
      .filter((feature): feature is Feature => feature !== undefined)
  }

  checkFeatureAccess(userId: string, featureId: string): boolean {
    const userAccess = this.userAccess.get(userId)
    if (!userAccess) return false

    return userAccess.unlockedFeatures.includes(featureId)
  }

  getFeaturesByCategory(category: string): Feature[] {
    return Array.from(this.features.values()).filter((feature) => feature.category === category)
  }

  getAllFeatures(): Feature[] {
    return Array.from(this.features.values())
  }

  getUnlockProgress(userId: string): {
    totalFeatures: number
    unlockedFeatures: number
    progressPercentage: number
    nextUnlocks: Feature[]
  } {
    const userAccess = this.userAccess.get(userId)
    const totalFeatures = this.features.size
    const unlockedFeatures = userAccess?.unlockedFeatures.length || 0
    const progressPercentage = (unlockedFeatures / totalFeatures) * 100

    // Get next features that can be unlocked
    const nextUnlocks = Array.from(this.features.values())
      .filter((feature) => !userAccess?.unlockedFeatures.includes(feature.id))
      .slice(0, 3)

    return {
      totalFeatures,
      unlockedFeatures,
      progressPercentage,
      nextUnlocks,
    }
  }
}

export const featureUnlockSystem = new FeatureUnlockSystem()
