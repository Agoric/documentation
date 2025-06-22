import { Building2, Zap, Briefcase } from "lucide-react"
import {
  BarChart,
  Calendar,
  CreditCard,
  KanbanSquare,
  LayoutDashboardIcon as Dashboard,
  ListChecks,
  type LucideIcon,
  Mail,
  MessagesSquare,
  Settings,
  Users2,
} from "lucide-react"

export type NavigationItem = {
  id: string
  label: string
  icon: LucideIcon
  href: string
  category: string
  description: string
  badge?: string
  color?: string
}

export const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    category: "General",
    description: "Your main overview page",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart,
    href: "/dashboard/analytics",
    category: "General",
    description: "Deep dive into your data",
  },
  {
    id: "projects",
    label: "Projects",
    icon: KanbanSquare,
    href: "/dashboard/projects",
    category: "General",
    description: "Manage your ongoing projects",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: ListChecks,
    href: "/dashboard/tasks",
    category: "General",
    description: "Keep track of your to-do list",
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: CreditCard,
    href: "/dashboard/invoices",
    category: "General",
    description: "Send and manage your invoices",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users2,
    href: "/dashboard/customers",
    category: "General",
    description: "Manage your customer base",
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessagesSquare,
    href: "/dashboard/chat",
    category: "General",
    description: "Communicate in real-time",
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    href: "/dashboard/email",
    category: "General",
    description: "Manage your inbox",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar,
    href: "/dashboard/calendar",
    category: "General",
    description: "Stay organized with a calendar",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    category: "General",
    description: "Configure your application",
  },
  {
    id: "real-estate-marketplace",
    label: "Real Estate Marketplace",
    icon: Building2,
    href: "/dashboard/real-estate-marketplace",
    category: "Marketplaces",
    description: "Global property investment platform",
    badge: "Premium",
    color: "text-green-400",
  },
  {
    id: "qgi-marketplace",
    label: "QGI Marketplace",
    icon: Zap,
    href: "/dashboard/qgi-marketplace",
    category: "Marketplaces",
    description: "Quantum Global Investment platform",
    badge: "Quantum",
    color: "text-purple-400",
  },
  {
    id: "business-suite",
    label: "Business Suite",
    icon: Briefcase,
    href: "/dashboard/business-suite",
    category: "Business",
    description: "Complete business management platform",
    badge: "Enterprise",
    color: "text-blue-400",
  },
]
