"use client"

import { useState } from "react"
import { MemberMarketplace } from "@/components/snap-dax/member-marketplace"
import { TokenizationHub } from "@/components/snap-dax/tokenization-hub"
import { TransactionCenter } from "@/components/snap-dax/transaction-center"
import { ProductAddition } from "@/components/snap-dax/product-addition"
import { PlatformOverview } from "@/components/snap-dax/platform-overview"
import { HolographicHeader } from "@/components/snap-dax/holographic-header"
import { HolographicGlassTabs } from "@/components/snap-dax/holographic-glass-tabs"
import { HolographicGlassSidebar } from "@/components/snap-dax/holographic-glass-sidebar"
import {
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
  ArrowLeftRight,
  Plus,
  Users,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  BarChart3,
  Wallet,
  Globe,
  CircleDollarSign,
} from "lucide-react"

export function SnapDaxDashboardWithGlass() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Define tabs
  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "marketplace", label: "Marketplace", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "tokenization", label: "Tokenization", icon: <Sparkles className="h-4 w-4" /> },
    { id: "transactions", label: "Transactions", icon: <ArrowLeftRight className="h-4 w-4" /> },
    { id: "add-product", label: "Add Product", icon: <Plus className="h-4 w-4" /> },
  ]

  // Define sidebar sections
  const sidebarSections = [
    {
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
        { id: "marketplace", label: "Marketplace", icon: <ShoppingBag className="h-5 w-5" /> },
        { id: "tokenization", label: "Tokenization", icon: <Sparkles className="h-5 w-5" /> },
        { id: "transactions", label: "Transactions", icon: <ArrowLeftRight className="h-5 w-5" /> },
        { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
      ],
    },
    {
      title: "Management",
      items: [
        { id: "products", label: "Products", icon: <Plus className="h-5 w-5" />, badge: { count: 3 } },
        { id: "users", label: "Users", icon: <Users className="h-5 w-5" /> },
        { id: "wallet", label: "Wallet", icon: <Wallet className="h-5 w-5" /> },
        { id: "global", label: "Global Access", icon: <Globe className="h-5 w-5" /> },
      ],
    },
    {
      title: "Account",
      items: [
        { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
        { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" />, badge: { count: 5 } },
        { id: "help", label: "Help & Support", icon: <HelpCircle className="h-5 w-5" /> },
        { id: "logout", label: "Logout", icon: <LogOut className="h-5 w-5" /> },
      ],
    },
  ]

  // Handle sidebar item click
  const handleSidebarItemClick = (itemId: string) => {
    setActiveSidebarItem(itemId)

    // Map sidebar items to tabs when applicable
    if (itemId === "dashboard") setActiveTab("overview")
    else if (itemId === "marketplace") setActiveTab("marketplace")
    else if (itemId === "tokenization") setActiveTab("tokenization")
    else if (itemId === "transactions") setActiveTab("transactions")
    else if (itemId === "products") setActiveTab("add-product")
  }

  // Logo component for sidebar
  const SidebarLogo = () => (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <CircleDollarSign className="h-5 w-5 text-white z-10" />
        <div className="absolute inset-0 rounded-full border-2 border-indigo-300/30"></div>
        <div className="absolute h-full w-full bg-gradient-to-r from-gold-500/20 to-purple-500/20 blur-sm"></div>
        <span className="absolute text-[9px] font-bold text-white/80 -bottom-0.5">SA</span>
      </div>
      {!sidebarCollapsed && <div className="text-lg font-bold text-white">SNAP-DAX</div>}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/70">
      <HolographicHeader
        title="SNAP-DAX Platform"
        subtitle="Tokenization & Members-Only Marketplace"
        stats={[
          { label: "Active Members", value: "2,458" },
          { label: "Total Products", value: "1,245" },
          { label: "Tokenized Assets", value: "$24.5M" },
          { label: "24h Volume", value: "$1.2M" },
        ]}
      />

      <div className="container mx-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden md:block">
            <HolographicGlassSidebar
              sections={sidebarSections}
              activeItemId={activeSidebarItem}
              onItemClick={handleSidebarItemClick}
              collapsible={true}
              initialCollapsed={sidebarCollapsed}
              logo={<SidebarLogo />}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Tabs */}
            <HolographicGlassTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} glassEffect="medium" />

            {/* Tab content */}
            <div className="space-y-6">
              {activeTab === "overview" && <PlatformOverview />}
              {activeTab === "marketplace" && <MemberMarketplace />}
              {activeTab === "tokenization" && <TokenizationHub />}
              {activeTab === "transactions" && <TransactionCenter />}
              {activeTab === "add-product" && <ProductAddition />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
