"use client"
import {
  Home,
  ShoppingBag,
  Building2,
  TrendingUp,
  CreditCard,
  Trophy,
  Scale,
  Globe,
  Crown,
  User,
  Settings,
  DollarSign,
  Calendar,
  Star,
} from "lucide-react"
import { LiquidMeltingSidebar } from "./liquid-melting-sidebar"

const environments = [
  {
    id: "home",
    title: "Home",
    latin: "HOME",
    icon: Home,
    path: "/dashboard/home",
    color: "from-amber-500 to-yellow-600",
    subOptions: [
      { title: "Dashboard", path: "/dashboard/home", icon: Home },
      { title: "Profile", path: "/dashboard/profile", icon: User },
      { title: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
  },
  {
    id: "market",
    title: "QUICA Market",
    latin: "MARKET",
    icon: ShoppingBag,
    path: "/dashboard/ecommerex/holographic-products",
    color: "from-purple-500 to-indigo-600",
    subOptions: [
      { title: "Holographic Products", path: "/dashboard/ecommerex/holographic-products", icon: ShoppingBag },
      { title: "Product Comparison", path: "/dashboard/comparison", icon: TrendingUp },
      { title: "Market Analytics", path: "/dashboard/analytics", icon: TrendingUp },
    ],
  },
  {
    id: "realestate",
    title: "Real Estate Empire",
    latin: "REAL ESTATE",
    icon: Building2,
    path: "/dashboard/ecommerex/real-estate",
    color: "from-green-500 to-emerald-600",
    subOptions: [
      { title: "Property Search", path: "/dashboard/ecommerex/real-estate", icon: Building2 },
      { title: "Investment Properties", path: "/dashboard/investments", icon: TrendingUp },
      { title: "Property Management", path: "/dashboard/property-mgmt", icon: Settings },
      { title: "Market Analysis", path: "/dashboard/market-analysis", icon: TrendingUp },
    ],
  },
  {
    id: "trading",
    title: "SnapDax Trading",
    latin: "TRADING",
    icon: TrendingUp,
    path: "/dashboard/snap-dax",
    color: "from-blue-500 to-cyan-600",
    subOptions: [
      { title: "Trading Dashboard", path: "/dashboard/snap-dax", icon: TrendingUp },
      { title: "Portfolio Management", path: "/dashboard/portfolio", icon: DollarSign },
      { title: "Market Data", path: "/dashboard/market-data", icon: TrendingUp },
      { title: "AI Trading Assistant", path: "/dashboard/ai-trading", icon: Star, badge: "NEW" },
    ],
  },
  {
    id: "banking",
    title: "Snapifi Banking",
    latin: "BANKING",
    icon: CreditCard,
    path: "/dashboard/banking",
    color: "from-cyan-500 to-blue-600",
    subOptions: [
      { title: "Account Overview", path: "/dashboard/banking", icon: CreditCard },
      { title: "Transfers & Payments", path: "/dashboard/banking/transfers", icon: DollarSign },
      { title: "Business Banking", path: "/dashboard/banking/business", icon: Building2 },
      { title: "Credit Services", path: "/dashboard/banking/credit", icon: TrendingUp },
    ],
  },
  {
    id: "gamification",
    title: "Achievement Hub",
    latin: "ACHIEVEMENTS",
    icon: Trophy,
    path: "/dashboard/gamification",
    color: "from-amber-500 to-orange-600",
    subOptions: [
      { title: "Achievements", path: "/dashboard/gamification", icon: Trophy },
      { title: "Leaderboards", path: "/dashboard/leaderboards", icon: Star },
      { title: "Rewards Store", path: "/dashboard/rewards", icon: ShoppingBag },
      { title: "Daily Challenges", path: "/dashboard/challenges", icon: Calendar, badge: "DAILY" },
    ],
  },
  {
    id: "legal",
    title: "Legal Framework",
    latin: "LEGAL",
    icon: Scale,
    path: "/legal",
    color: "from-gray-500 to-slate-600",
    subOptions: [
      { title: "Legal Documents", path: "/legal", icon: Scale },
      { title: "Compliance Center", path: "/legal/compliance", icon: Settings },
      { title: "Digital Domicile", path: "/legal/digital-domicile", icon: Globe },
      { title: "IP Protection", path: "/legal/intellectual-property", icon: Scale },
    ],
  },
  {
    id: "citizenship",
    title: "Global Citizenship",
    latin: "CITIZENSHIP",
    icon: Globe,
    path: "/citizenship/profile",
    color: "from-blue-500 to-purple-600",
    subOptions: [
      { title: "Citizen Profile", path: "/citizenship/profile", icon: User },
      { title: "Citizenship Benefits", path: "/citizenship/benefits", icon: Star },
      { title: "Registration", path: "/citizenship/register", icon: Globe },
      { title: "Tax Services", path: "/citizenship/tax", icon: DollarSign },
    ],
  },
  {
    id: "admin",
    title: "Supreme Authority",
    latin: "ADMIN",
    icon: Crown,
    path: "/admin",
    color: "from-purple-500 to-amber-600",
    subOptions: [
      { title: "Admin Dashboard", path: "/admin", icon: Crown },
      { title: "User Management", path: "/admin/users", icon: User },
      { title: "Feature Management", path: "/admin/features", icon: Settings },
      { title: "System Configuration", path: "/admin/configure", icon: Settings },
    ],
  },
]

// Mock citizen data - replace with actual user data
const citizenData = {
  name: "Alexander Magnus",
  romanName: "Alexander Magnus Supremus",
  title: "Global Citizen - Level VII",
  id: "GC-2024-789456",
  level: 7,
  qgiBalance: 250000,
  bondValue: 8333,
  status: "active",
  memberSince: "2024-01-15",
  nextLevelProgress: 75,
  avatar: "/placeholder-user.jpg",
}

export function ComprehensiveEnvironmentToolbar() {
  return <LiquidMeltingSidebar />
}
