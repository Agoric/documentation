import type React from "react"
import { Shield, LayoutDashboard, Users, Calculator, Globe, Lock } from "lucide-react"

interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: React.ReactNode
  description?: string
  items?: NavItem[]
}

export const navigationItems: NavItem[] = [
  {
    title: "DAX Admin",
    icon: <Shield className="h-4 w-4" />,
    items: [
      {
        title: "Overview",
        href: "/dashboard/dax-admin",
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        title: "Identity Management",
        href: "/dashboard/dax-admin/identity-management",
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Tax Benefits",
        href: "/dashboard/dax-admin/tax-benefits",
        icon: <Calculator className="h-4 w-4" />,
      },
      {
        title: "International Business",
        href: "/dashboard/dax-admin/international-business",
        icon: <Globe className="h-4 w-4" />,
      },
      {
        title: "Quantum Verification",
        href: "/dashboard/dax-admin/quantum-verification",
        icon: <Lock className="h-4 w-4" />,
      },
    ],
  },
]
