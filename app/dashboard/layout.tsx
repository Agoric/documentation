"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { StrategicPlatformLayout } from "@/components/layout/strategic-platform-layout"
import { Home, TrendingUp, Wallet, Brain, Shield, Building, Zap } from "lucide-react"

const getBreadcrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = [
    {
      label: "Command Center",
      href: "/dashboard",
      icon: <Home className="h-3 w-3" />,
      isActive: pathname === "/dashboard",
    },
  ]

  if (segments.length > 1) {
    const section = segments[1]
    const sectionMap: Record<string, { label: string; icon: React.ReactNode }> = {
      snapifi: { label: "Snapifi", icon: <TrendingUp className="h-3 w-3" /> },
      "snap-dax": { label: "Snap DAX", icon: <Wallet className="h-3 w-3" /> },
      "ai-concierge": { label: "AI Concierge", icon: <Brain className="h-3 w-3" /> },
      "dax-admin": { label: "DAX Admin", icon: <Shield className="h-3 w-3" /> },
      "real-estate": { label: "Real Estate", icon: <Building className="h-3 w-3" /> },
      "fintech-2035": { label: "Fintech 2035", icon: <Zap className="h-3 w-3" /> },
      banking: { label: "Banking", icon: <Wallet className="h-3 w-3" /> },
      treasury: { label: "Treasury", icon: <Shield className="h-3 w-3" /> },
      "credit-suite": { label: "Credit Suite", icon: <TrendingUp className="h-3 w-3" /> },
      ecommerex: { label: "EcommerEX", icon: <Building className="h-3 w-3" /> },
      "global-citizen": { label: "Global Citizen", icon: <Shield className="h-3 w-3" /> },
    }

    if (sectionMap[section]) {
      breadcrumbs.push({
        label: sectionMap[section].label,
        href: `/dashboard/${section}`,
        icon: sectionMap[section].icon,
        isActive: pathname === `/dashboard/${section}`,
      })
    }

    if (segments.length > 2) {
      const subsection = segments[2]
      breadcrumbs.push({
        label: subsection
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        href: pathname,
        isActive: true,
      })
    }
  }

  return breadcrumbs
}

const getGuidancePrompts = (pathname: string) => {
  const prompts = []

  if (pathname === "/dashboard") {
    prompts.push({
      id: "welcome",
      title: "Welcome to Supreme Authority Platform",
      description: "Explore our quantum-powered financial ecosystem designed for 2035 markets.",
      action: "Start Tour",
      position: "center" as const,
      priority: "high" as const,
      category: "tutorial" as const,
    })
  }

  if (pathname.includes("/snap-dax")) {
    prompts.push({
      id: "snap-dax-intro",
      title: "Snap DAX Trading Platform",
      description: "Access real-time market data and execute trades with quantum precision.",
      action: "View Markets",
      position: "right" as const,
      priority: "medium" as const,
      category: "feature" as const,
    })
  }

  if (pathname.includes("/real-estate")) {
    prompts.push({
      id: "real-estate-guide",
      title: "Real Estate Trading Terminal",
      description: "Access tokenized real estate markets with advanced trading tools.",
      action: "Explore Properties",
      position: "right" as const,
      priority: "medium" as const,
      category: "feature" as const,
    })
  }

  if (pathname.includes("/onboarding")) {
    prompts.push({
      id: "onboarding-guide",
      title: "Platform Onboarding",
      description: "Complete your profile setup to unlock advanced trading features.",
      action: "Continue Setup",
      position: "top" as const,
      priority: "high" as const,
      category: "tutorial" as const,
    })
  }

  return prompts
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)
  const guidancePrompts = getGuidancePrompts(pathname)

  const getCurrentSection = () => {
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length > 1) {
      return segments[1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    }
    return "Command Center"
  }

  return (
    <StrategicPlatformLayout
      breadcrumbs={breadcrumbs}
      currentSection={getCurrentSection()}
      guidancePrompts={guidancePrompts}
      showGuidance={true}
      userLevel="expert"
    >
      {children}
    </StrategicPlatformLayout>
  )
}
