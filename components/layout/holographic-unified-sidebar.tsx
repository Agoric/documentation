"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Home,
  CreditCard,
  ShoppingCart,
  Brain,
  LineChart,
  Wallet,
  Sparkles,
  Settings,
  HelpCircle,
  User,
  Shield,
} from "lucide-react"
import { SupremeAuthorityLogo } from "@/components/ui/supreme-authority-logo"

// Define the navigation structure with categories and subcategories
const navigationStructure = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    id: "snapifi",
    label: "Snapifi",
    icon: <Sparkles className="h-5 w-5" />,
    subcategories: [
      {
        id: "snapifi-main",
        label: "Overview",
        href: "/dashboard/snapifi",
      },
      {
        id: "snapifi-real-estate",
        label: "Real Estate Strategy",
        href: "/dashboard/snapifi/real-estate-strategy",
      },
      {
        id: "snapifi-financial-goals",
        label: "Financial Goals",
        href: "/dashboard/snapifi/financial-goals",
      },
      {
        id: "snapifi-wellness",
        label: "Wellness",
        href: "/dashboard/snapifi/wellness",
      },
    ],
  },
  {
    id: "banking",
    label: "Banking",
    icon: <CreditCard className="h-5 w-5" />,
    href: "/dashboard/banking",
  },
  {
    id: "dax",
    label: "DAX",
    icon: <LineChart className="h-5 w-5" />,
    subcategories: [
      {
        id: "dax-main",
        label: "Overview",
        href: "/dashboard/dax",
      },
    ],
  },
  {
    id: "snap-dax",
    label: "Snap DAX",
    icon: <Wallet className="h-5 w-5" />,
    subcategories: [
      {
        id: "snap-dax-main",
        label: "Overview",
        href: "/dashboard/snap-dax",
      },
      {
        id: "snap-dax-onboarding",
        label: "Onboarding",
        href: "/dashboard/snap-dax/onboarding",
      },
    ],
  },
  {
    id: "dax-admin",
    label: "DAX Admin",
    icon: <Shield className="h-5 w-5" />,
    subcategories: [
      {
        id: "dax-admin-main",
        label: "Overview",
        href: "/dashboard/dax-admin",
      },
      {
        id: "dax-admin-identity",
        label: "Identity Management",
        href: "/dashboard/dax-admin/identity-management",
      },
      {
        id: "dax-admin-tax-benefits",
        label: "Tax Benefits",
        href: "/dashboard/dax-admin/tax-benefits",
      },
      {
        id: "dax-admin-international",
        label: "International Business",
        href: "/dashboard/dax-admin/international-business",
      },
      {
        id: "dax-admin-quantum-verification",
        label: "Quantum Verification",
        href: "/dashboard/dax-admin/quantum-verification",
      },
    ],
  },
  {
    id: "ecommerex",
    label: "ECommereX",
    icon: <ShoppingCart className="h-5 w-5" />,
    subcategories: [
      {
        id: "ecommerex-flagship",
        label: "Flagship Hub",
        href: "/dashboard/ecommerex/flagship-hub",
      },
      {
        id: "ecommerex-inventory",
        label: "Inventory Forecasting",
        href: "/dashboard/ecommerex/inventory-forecasting",
      },
      {
        id: "ecommerex-platform",
        label: "Platform Directory",
        href: "/dashboard/ecommerex/platform-directory",
      },
      {
        id: "ecommerex-product-detail",
        label: "Product Detail",
        href: "/dashboard/ecommerex/product-detail",
      },
      {
        id: "ecommerex-holographic-products",
        label: "Holographic Products",
        href: "/dashboard/ecommerex/holographic-products",
      },
    ],
  },
  {
    id: "ai-concierge",
    label: "AI Concierge",
    icon: <Brain className="h-5 w-5" />,
    href: "/dashboard/ai-concierge",
  },
  {
    id: "fintech-2035",
    label: "Fintech 2035",
    icon: <LineChart className="h-5 w-5" />,
    href: "/dashboard/fintech-2035",
  },
]

// Footer navigation items
const footerNavigation = [
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    href: "/dashboard/settings",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/dashboard/help",
  },
]

interface HolographicUnifiedSidebarProps {
  initialCollapsed?: boolean
}

export function HolographicUnifiedSidebar({ initialCollapsed = false }: HolographicUnifiedSidebarProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Track mouse position for lighting effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-expand categories based on current path
  useEffect(() => {
    navigationStructure.forEach((category) => {
      if (category.subcategories) {
        const shouldExpand = category.subcategories.some((subcategory) => pathname.startsWith(subcategory.href))
        if (shouldExpand && !expandedCategories.includes(category.id)) {
          setExpandedCategories((prev) => [...prev, category.id])
        }
      }
    })
  }, [pathname, expandedCategories])

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Toggle sidebar collapse
  const toggleCollapse = () => {
    setCollapsed(!collapsed)
    if (!collapsed) {
      // Close all expanded categories when collapsing
      setExpandedCategories([])
    }
  }

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    return pathname.startsWith(href) && href !== "/dashboard"
  }

  // Logo component
  const Logo = () => (
    <SupremeAuthorityLogo
      size={collapsed ? "sm" : "md"}
      showText={!collapsed}
      variant={collapsed ? "icon-only" : "compact"}
    />
  )

  // User profile component
  const UserProfile = () => (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
          <User className="h-8 w-8 p-1.5 text-white" />
        </div>
        <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[8px] text-white">
          3
        </div>
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">Alex Morgan</span>
          <span className="text-xs text-indigo-200">Premium</span>
        </div>
      )}
    </div>
  )

  return (
    <motion.div
      ref={sidebarRef}
      className={cn(
        "relative flex h-screen flex-col overflow-hidden rounded-r-xl border-r border-indigo-500/20 backdrop-blur-md",
        "bg-gradient-to-b from-indigo-950/40 via-slate-950/40 to-indigo-950/40",
        "transition-all duration-300 ease-in-out",
      )}
      style={{
        width: collapsed ? 80 : 280,
        boxShadow: "0 4px 20px rgba(30, 20, 70, 0.2)",
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dynamic lighting effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(129, 140, 248, 0.4), transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Holographic grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123, 97, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 5 + 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative flex items-center p-4">
        <Logo />
      </div>

      {/* User profile */}
      <div className="relative mb-6 px-4">
        <UserProfile />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <nav className="space-y-1">
          {navigationStructure.map((category) => (
            <div key={category.id} className="mb-1">
              {category.subcategories ? (
                <div>
                  {/* Category with subcategories */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    onMouseEnter={() => setHoveredItem(category.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn(
                      "relative flex w-full items-center justify-between rounded-md p-3 transition-all duration-200",
                      collapsed ? "justify-center" : "",
                      expandedCategories.includes(category.id) ? "text-white" : "text-indigo-300 hover:text-indigo-100",
                    )}
                  >
                    {/* Hover effect */}
                    <AnimatePresence>
                      {(hoveredItem === category.id || expandedCategories.includes(category.id)) && (
                        <motion.div
                          className={cn(
                            "absolute inset-0 rounded-md",
                            expandedCategories.includes(category.id)
                              ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80"
                              : "bg-indigo-500/10",
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 flex items-center">
                      <span className="text-current">{category.icon}</span>
                      {!collapsed && <span className="ml-3 flex-1 truncate">{category.label}</span>}
                    </div>

                    {!collapsed && (
                      <div className="relative z-10">
                        {expandedCategories.includes(category.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    )}

                    {/* Glass reflection effect */}
                    <div
                      className="absolute inset-0 rounded-md opacity-30"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 80%)",
                        pointerEvents: "none",
                      }}
                    />
                  </button>

                  {/* Subcategories */}
                  <AnimatePresence>
                    {expandedCategories.includes(category.id) && !collapsed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 mt-1 overflow-hidden"
                      >
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            href={subcategory.href}
                            onMouseEnter={() => setHoveredItem(subcategory.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={cn(
                              "relative mt-1 flex items-center rounded-md p-2 transition-all duration-200",
                              isActive(subcategory.href) ? "text-white" : "text-indigo-300 hover:text-indigo-100",
                            )}
                          >
                            {/* Active/hover indicator */}
                            <AnimatePresence>
                              {(hoveredItem === subcategory.id || isActive(subcategory.href)) && (
                                <motion.div
                                  className={cn(
                                    "absolute inset-0 rounded-md",
                                    isActive(subcategory.href)
                                      ? "bg-gradient-to-r from-indigo-600/60 to-purple-600/60"
                                      : "bg-indigo-500/10",
                                  )}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                />
                              )}
                            </AnimatePresence>

                            <div className="relative z-10 flex items-center">
                              <div className="mr-3 h-1.5 w-1.5 rounded-full bg-current" />
                              <span className="flex-1 truncate">{subcategory.label}</span>
                            </div>

                            {/* Glass reflection effect */}
                            <div
                              className="absolute inset-0 rounded-md opacity-30"
                              style={{
                                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 80%)",
                                pointerEvents: "none",
                              }}
                            />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Single category without subcategories
                <Link
                  href={category.href}
                  onMouseEnter={() => setHoveredItem(category.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative flex items-center rounded-md p-3 transition-all duration-200",
                    collapsed ? "justify-center" : "",
                    isActive(category.href) ? "text-white" : "text-indigo-300 hover:text-indigo-100",
                  )}
                >
                  {/* Active/hover indicator */}
                  <AnimatePresence>
                    {(hoveredItem === category.id || isActive(category.href)) && (
                      <motion.div
                        className={cn(
                          "absolute inset-0 rounded-md",
                          isActive(category.href)
                            ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80"
                            : "bg-indigo-500/10",
                        )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative z-10 flex items-center">
                    <span className="text-current">{category.icon}</span>
                    {!collapsed && <span className="ml-3 flex-1 truncate">{category.label}</span>}
                  </div>

                  {/* Glass reflection effect */}
                  <div
                    className="absolute inset-0 rounded-md opacity-30"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 80%)",
                      pointerEvents: "none",
                    }}
                  />
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="relative border-t border-indigo-500/20 p-3">
        <div className="space-y-1">
          {footerNavigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={cn(
                "relative flex items-center rounded-md p-3 transition-all duration-200",
                collapsed ? "justify-center" : "",
                isActive(item.href) ? "text-white" : "text-indigo-300 hover:text-indigo-100",
              )}
            >
              {/* Active/hover indicator */}
              <AnimatePresence>
                {(hoveredItem === item.id || isActive(item.href)) && (
                  <motion.div
                    className={cn(
                      "absolute inset-0 rounded-md",
                      isActive(item.href) ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80" : "bg-indigo-500/10",
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 flex items-center">
                <span className="text-current">{item.icon}</span>
                {!collapsed && <span className="ml-3 flex-1 truncate">{item.label}</span>}
              </div>

              {/* Glass reflection effect */}
              <div
                className="absolute inset-0 rounded-md opacity-30"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 80%)",
                  pointerEvents: "none",
                }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={toggleCollapse}
        className="absolute right-0 top-20 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-950/70 text-indigo-300 backdrop-blur-md hover:text-indigo-100"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Edge glow effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          boxShadow: `inset 0 0 20px rgba(129, 140, 248, 0.5)`,
          pointerEvents: "none",
        }}
      />
    </motion.div>
  )
}
