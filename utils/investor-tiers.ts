export interface InvestorTier {
  id: string
  name: string
  minInvestment: number
  maxInvestment: number | null
  minReturn: number
  maxReturn: number
  color: string
  benefits: string[]
  badge: string
}

export const INVESTOR_TIERS: InvestorTier[] = [
  {
    id: "bronze",
    name: "Bronze Investor",
    minInvestment: 0,
    maxInvestment: 100000,
    minReturn: 10,
    maxReturn: 12,
    color: "from-amber-600 to-amber-800",
    badge: "🥉",
    benefits: [
      "Basic investment opportunities",
      "Monthly portfolio reports",
      "Standard customer support",
      "Access to educational resources",
    ],
  },
  {
    id: "silver",
    name: "Silver Investor",
    minInvestment: 100000,
    maxInvestment: 500000,
    minReturn: 13,
    maxReturn: 16,
    color: "from-gray-400 to-gray-600",
    badge: "🥈",
    benefits: [
      "Premium investment opportunities",
      "Weekly portfolio updates",
      "Priority customer support",
      "Advanced analytics dashboard",
      "Quarterly strategy calls",
    ],
  },
  {
    id: "gold",
    name: "Gold Investor",
    minInvestment: 500000,
    maxInvestment: 1000000,
    minReturn: 17,
    maxReturn: 20,
    color: "from-yellow-400 to-yellow-600",
    badge: "🥇",
    benefits: [
      "Exclusive investment opportunities",
      "Real-time portfolio tracking",
      "Dedicated account manager",
      "Custom investment strategies",
      "Monthly strategy calls",
      "Early access to new products",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Investor",
    minInvestment: 1000000,
    maxInvestment: 2500000,
    minReturn: 21,
    maxReturn: 23,
    color: "from-slate-300 to-slate-500",
    badge: "💎",
    benefits: [
      "Ultra-exclusive opportunities",
      "Live portfolio monitoring",
      "Personal wealth advisor",
      "Bespoke investment solutions",
      "Weekly strategy sessions",
      "VIP event invitations",
      "Tax optimization strategies",
    ],
  },
  {
    id: "diamond",
    name: "Diamond Investor",
    minInvestment: 2500000,
    maxInvestment: null,
    minReturn: 24,
    maxReturn: 25,
    color: "from-blue-400 to-purple-600",
    badge: "💎✨",
    benefits: [
      "Private placement opportunities",
      "24/7 portfolio concierge",
      "Family office services",
      "Institutional-grade strategies",
      "Daily market briefings",
      "Exclusive networking events",
      "Advanced tax planning",
      "Legacy wealth planning",
    ],
  },
]

export function getInvestorTier(totalInvested: number): InvestorTier {
  for (const tier of INVESTOR_TIERS) {
    if (totalInvested >= tier.minInvestment && (tier.maxInvestment === null || totalInvested <= tier.maxInvestment)) {
      return tier
    }
  }
  return INVESTOR_TIERS[0] // Default to Bronze
}

export function calculateTierReturn(totalInvested: number, baseReturn: number): number {
  const tier = getInvestorTier(totalInvested)

  // Calculate position within tier range
  const tierRange = (tier.maxInvestment || 10000000) - tier.minInvestment
  const positionInTier = totalInvested - tier.minInvestment
  const tierProgress = Math.min(positionInTier / tierRange, 1)

  // Calculate return within tier range
  const returnRange = tier.maxReturn - tier.minReturn
  const tierBonus = tier.minReturn + returnRange * tierProgress

  return Math.min(tierBonus, tier.maxReturn)
}

export function getNextTier(currentTier: InvestorTier): InvestorTier | null {
  const currentIndex = INVESTOR_TIERS.findIndex((tier) => tier.id === currentTier.id)
  if (currentIndex < INVESTOR_TIERS.length - 1) {
    return INVESTOR_TIERS[currentIndex + 1]
  }
  return null
}

export function getProgressToNextTier(totalInvested: number): {
  currentTier: InvestorTier
  nextTier: InvestorTier | null
  progress: number
  amountNeeded: number
} {
  const currentTier = getInvestorTier(totalInvested)
  const nextTier = getNextTier(currentTier)

  if (!nextTier) {
    return {
      currentTier,
      nextTier: null,
      progress: 100,
      amountNeeded: 0,
    }
  }

  const amountNeeded = nextTier.minInvestment - totalInvested
  const tierRange = nextTier.minInvestment - currentTier.minInvestment
  const progress = Math.max(0, Math.min(100, ((totalInvested - currentTier.minInvestment) / tierRange) * 100))

  return {
    currentTier,
    nextTier,
    progress,
    amountNeeded,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}
