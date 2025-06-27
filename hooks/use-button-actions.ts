"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { toast } from "sonner"

export const useButtonActions = () => {
  const router = useRouter()

  // Navigation actions
  const navigateToSection = useCallback(
    (section: string) => {
      const sectionMap: Record<string, string> = {
        "credit-suite": "/credit-suite",
        "loan-center": "/citizen/loan-center",
        "real-estate": "/real-estate",
        "snap-dax": "/snap-dax/digital-asset-exchange",
        marketplace: "/commerce/marketplace",
        "financial-planning": "/dashboard/financial-planning",
        "business-suite": "/business-suite",
        settings: "/settings",
        profile: "/profile",
        dashboard: "/dashboard",
        analytics: "/dashboard/analytics",
        portfolio: "/dashboard/portfolio",
      }

      const path = sectionMap[section]
      if (path) {
        router.push(path)
      } else {
        toast.error(`Section "${section}" not found`)
      }
    },
    [router],
  )

  // Action handlers
  const handleCreditAction = useCallback(
    (action: string) => {
      const actionMap: Record<string, string> = {
        "view-score": "/credit-suite",
        simulator: "/credit-suite/simulator",
        dispute: "/credit-suite/dispute",
        monitoring: "/credit-suite/monitoring",
        reports: "/credit-suite/reports",
      }

      const path = actionMap[action]
      if (path) {
        router.push(path)
      }
    },
    [router],
  )

  const handleLoanAction = useCallback(
    (action: string, loanType?: string) => {
      const baseMap: Record<string, string> = {
        apply: "/citizen/loan-center",
        calculator: "/citizen/loan-center/calculator",
        status: "/citizen/loan-center/status",
        documents: "/citizen/loan-center/documents",
      }

      const loanTypeMap: Record<string, string> = {
        home: "/citizen/loan-center/home-loan",
        auto: "/citizen/loan-center/auto-loan",
        personal: "/citizen/loan-center/personal-loan",
        business: "/citizen/loan-center/business-loan",
        fha: "/citizen/loan-center/fha-loan",
        va: "/citizen/loan-center/va-loan",
        usda: "/citizen/loan-center/usda-loan",
        sba: "/citizen/loan-center/sba-loan",
      }

      let path = baseMap[action]
      if (loanType && loanTypeMap[loanType]) {
        path = loanTypeMap[loanType]
      }

      if (path) {
        router.push(path)
      }
    },
    [router],
  )

  const handleRealEstateAction = useCallback(
    (action: string, propertyId?: string) => {
      const actionMap: Record<string, string> = {
        browse: "/real-estate",
        favorites: "/real-estate/favorites",
        search: "/real-estate/search",
        calculator: "/real-estate/calculator",
      }

      let path = actionMap[action]
      if (action === "view" && propertyId) {
        path = `/real-estate/property/${propertyId}`
      } else if (action === "bid" && propertyId) {
        path = `/real-estate/property/${propertyId}/bid`
      }

      if (path) {
        router.push(path)
      }
    },
    [router],
  )

  const handleTradingAction = useCallback(
    (action: string) => {
      const actionMap: Record<string, string> = {
        dashboard: "/snap-dax/digital-asset-exchange",
        buy: "/snap-dax/trade/buy",
        sell: "/snap-dax/trade/sell",
        portfolio: "/snap-dax/portfolio",
        analytics: "/snap-dax/analytics",
        research: "/snap-dax/research",
        news: "/snap-dax/news",
      }

      const path = actionMap[action]
      if (path) {
        router.push(path)
      }
    },
    [router],
  )

  const handleCommerceAction = useCallback(
    (action: string, productId?: string) => {
      const actionMap: Record<string, string> = {
        marketplace: "/commerce/marketplace",
        cart: "/commerce/cart",
        orders: "/commerce/orders",
        wishlist: "/commerce/wishlist",
      }

      let path = actionMap[action]
      if (action === "product" && productId) {
        path = `/commerce/product/${productId}`
      }

      if (path) {
        router.push(path)
      }
    },
    [router],
  )

  // Generic action handler
  const handleAction = useCallback(
    (actionType: string, action: string, id?: string) => {
      switch (actionType) {
        case "navigation":
          navigateToSection(action)
          break
        case "credit":
          handleCreditAction(action)
          break
        case "loan":
          handleLoanAction(action, id)
          break
        case "real-estate":
          handleRealEstateAction(action, id)
          break
        case "trading":
          handleTradingAction(action)
          break
        case "commerce":
          handleCommerceAction(action, id)
          break
        default:
          toast.error(`Unknown action type: ${actionType}`)
      }
    },
    [
      navigateToSection,
      handleCreditAction,
      handleLoanAction,
      handleRealEstateAction,
      handleTradingAction,
      handleCommerceAction,
    ],
  )

  return {
    navigateToSection,
    handleCreditAction,
    handleLoanAction,
    handleRealEstateAction,
    handleTradingAction,
    handleCommerceAction,
    handleAction,
  }
}
