"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type PortalType = "imperial" | "citizen" | "vendor"

interface PortalContextType {
  currentPortal: PortalType
  setPortal: (portal: PortalType) => void
  portalConfig: {
    imperial: {
      name: "Imperial Command"
      description: "Backend Administration & System Control"
      color: "from-red-600 to-orange-600"
      icon: "👑"
      access: "admin"
    }
    citizen: {
      name: "Citizen Portal"
      description: "User Services & Financial Tools"
      color: "from-blue-600 to-cyan-600"
      icon: "👤"
      access: "user"
    }
    vendor: {
      name: "Vendor Hub"
      description: "Business Partners & Third-Party Services"
      color: "from-green-600 to-emerald-600"
      icon: "🏢"
      access: "vendor"
    }
  }
  getUserPortalAccess: () => PortalType[]
  switchPortal: (portal: PortalType) => Promise<boolean>
}

const PortalContext = createContext<PortalContextType | undefined>(undefined)

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [currentPortal, setCurrentPortal] = useState<PortalType>("citizen")

  const portalConfig = {
    imperial: {
      name: "Imperial Command",
      description: "Backend Administration & System Control",
      color: "from-red-600 to-orange-600",
      icon: "👑",
      access: "admin" as const,
    },
    citizen: {
      name: "Citizen Portal",
      description: "User Services & Financial Tools",
      color: "from-blue-600 to-cyan-600",
      icon: "👤",
      access: "user" as const,
    },
    vendor: {
      name: "Vendor Hub",
      description: "Business Partners & Third-Party Services",
      color: "from-green-600 to-emerald-600",
      icon: "🏢",
      access: "vendor" as const,
    },
  }

  const getUserPortalAccess = (): PortalType[] => {
    // In a real app, this would check user permissions
    // For demo purposes, we'll allow access to all portals
    return ["imperial", "citizen", "vendor"]
  }

  const setPortal = (portal: PortalType) => {
    const allowedPortals = getUserPortalAccess()
    if (allowedPortals.includes(portal)) {
      setCurrentPortal(portal)
      localStorage.setItem("snapifi-portal", portal)
    }
  }

  const switchPortal = async (portal: PortalType): Promise<boolean> => {
    const allowedPortals = getUserPortalAccess()
    if (allowedPortals.includes(portal)) {
      setCurrentPortal(portal)
      localStorage.setItem("snapifi-portal", portal)
      return true
    }
    return false
  }

  // Load saved portal preference
  useEffect(() => {
    const savedPortal = localStorage.getItem("snapifi-portal") as PortalType
    if (savedPortal && getUserPortalAccess().includes(savedPortal)) {
      setCurrentPortal(savedPortal)
    }
  }, [])

  return (
    <PortalContext.Provider
      value={{
        currentPortal,
        setPortal,
        portalConfig,
        getUserPortalAccess,
        switchPortal,
      }}
    >
      {children}
    </PortalContext.Provider>
  )
}

export function usePortal() {
  const context = useContext(PortalContext)
  if (context === undefined) {
    throw new Error("usePortal must be used within a PortalProvider")
  }
  return context
}
