import {
  BarChart3,
  Building2,
  ShoppingBag,
  Gamepad2,
  Gavel,
  Shield,
  Globe,
  Users,
  Home,
  FileText,
  Settings,
  Package,
  Scale,
  UserCheck,
  Monitor,
} from "lucide-react"

export interface BreadcrumbItem {
  label: string
  path: string
  icon?: any
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  // Always start with home
  breadcrumbs.push({
    label: "Home",
    path: "/",
    icon: Home,
  })

  let currentPath = ""

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Map segments to readable labels and icons
    const segmentInfo = getSegmentInfo(segment, currentPath, segments, index)

    if (segmentInfo) {
      breadcrumbs.push({
        label: segmentInfo.label,
        path: currentPath,
        icon: segmentInfo.icon,
      })
    }
  })

  return breadcrumbs
}

function getSegmentInfo(segment: string, fullPath: string, allSegments: string[], index: number) {
  // Dashboard routes
  if (segment === "dashboard") {
    return { label: "Dashboard", icon: BarChart3 }
  }

  if (segment === "snap-dax") {
    return { label: "SNAP-DAX Trading", icon: Building2 }
  }

  if (segment === "ecommerex") {
    return { label: "EcommereX", icon: ShoppingBag }
  }

  if (segment === "holographic-products") {
    return { label: "Holographic Products", icon: Package }
  }

  if (segment === "gamification") {
    return { label: "Gamification Hub", icon: Gamepad2 }
  }

  // Legal routes
  if (segment === "legal") {
    return { label: "Legal Center", icon: Gavel }
  }

  if (segment === "compliance") {
    return { label: "Compliance Portal", icon: Shield }
  }

  if (segment === "digital-domicile") {
    return { label: "Digital Domicile", icon: Globe }
  }

  if (segment === "diplomatic-immunity") {
    return { label: "Diplomatic Immunity", icon: UserCheck }
  }

  if (segment === "privacy-policy") {
    return { label: "Privacy Policy", icon: FileText }
  }

  if (segment === "terms-of-service") {
    return { label: "Terms of Service", icon: FileText }
  }

  if (segment === "user-agreement") {
    return { label: "User Agreement", icon: FileText }
  }

  if (segment === "risk-disclosure") {
    return { label: "Risk Disclosure", icon: FileText }
  }

  if (segment === "realm-immunity") {
    return { label: "Realm Immunity", icon: Shield }
  }

  if (segment === "admiralty-jurisdiction") {
    return { label: "Admiralty Jurisdiction", icon: Scale }
  }

  if (segment === "intellectual-property") {
    return { label: "Intellectual Property", icon: FileText }
  }

  // Admin routes
  if (segment === "admin") {
    return { label: "Administration", icon: Settings }
  }

  if (segment === "users" && allSegments.includes("admin")) {
    return { label: "User Management", icon: Users }
  }

  if (segment === "system") {
    return { label: "System Monitoring", icon: Monitor }
  }

  // Generic fallback - capitalize and replace hyphens
  return {
    label: segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    icon: FileText,
  }
}

export function getCurrentEnvironmentFromPath(pathname: string) {
  // Define environment mappings
  const environmentMappings = [
    {
      pattern: /^\/dashboard\/ecommerex\/holographic-products/,
      name: "EcommereX Shop",
      category: "Commerce",
    },
    {
      pattern: /^\/dashboard\/snap-dax/,
      name: "SNAP-DAX Trading",
      category: "Main Platform",
    },
    {
      pattern: /^\/dashboard\/gamification/,
      name: "Gamification Hub",
      category: "Gaming & Rewards",
    },
    {
      pattern: /^\/dashboard/,
      name: "Main Dashboard",
      category: "Main Platform",
    },
    {
      pattern: /^\/legal\/compliance/,
      name: "Compliance Portal",
      category: "Legal Framework",
    },
    {
      pattern: /^\/legal\/digital-domicile/,
      name: "Digital Domicile",
      category: "Legal Framework",
    },
    {
      pattern: /^\/legal\/diplomatic-immunity/,
      name: "Diplomatic Immunity",
      category: "Legal Framework",
    },
    {
      pattern: /^\/legal/,
      name: "Legal Center",
      category: "Legal Framework",
    },
    {
      pattern: /^\/admin\/users/,
      name: "User Management",
      category: "Administration",
    },
    {
      pattern: /^\/admin\/system/,
      name: "System Monitoring",
      category: "Administration",
    },
    {
      pattern: /^\/admin/,
      name: "Admin Dashboard",
      category: "Administration",
    },
  ]

  for (const mapping of environmentMappings) {
    if (mapping.pattern.test(pathname)) {
      return mapping
    }
  }

  return {
    name: "Home",
    category: "Platform",
  }
}
