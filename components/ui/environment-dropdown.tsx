"use client"

import * as React from "react"
import {
  Check,
  ChevronDown,
  Globe,
  Building2,
  Shield,
  Gavel,
  Users,
  BarChart3,
  Gamepad2,
  ShoppingBag,
  Server,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter, usePathname } from "next/navigation"
import { KeyboardShortcutsHelp } from "./keyboard-shortcuts-help"
import { useEnvironmentShortcuts } from "@/hooks/use-keyboard-shortcuts"

const environments = [
  {
    category: "Main Platform",
    items: [
      {
        value: "/dashboard",
        label: "Main Dashboard",
        icon: BarChart3,
        description: "Overview and analytics",
        shortcut: "Alt+1",
      },
      {
        value: "/dashboard/snap-dax",
        label: "SNAP-DAX Trading",
        icon: Building2,
        description: "Financial trading platform",
        shortcut: "Alt+2",
      },
    ],
  },
  {
    category: "Commerce",
    items: [
      {
        value: "/dashboard/ecommerex/holographic-products",
        label: "EcommereX Shop",
        icon: ShoppingBag,
        description: "Holographic product marketplace",
        shortcut: "Alt+3",
      },
    ],
  },
  {
    category: "Gaming & Rewards",
    items: [
      {
        value: "/dashboard/gamification",
        label: "Gamification Hub",
        icon: Gamepad2,
        description: "Rewards and achievements",
        shortcut: "Alt+4",
      },
    ],
  },
  {
    category: "Legal Framework",
    items: [
      {
        value: "/legal",
        label: "Legal Center",
        icon: Gavel,
        description: "Legal documents and compliance",
        shortcut: "Alt+5",
      },
      {
        value: "/legal/compliance",
        label: "Compliance Portal",
        icon: Shield,
        description: "Regulatory compliance",
        shortcut: "Alt+6",
      },
      {
        value: "/legal/digital-domicile",
        label: "Digital Domicile",
        icon: Globe,
        description: "Digital jurisdiction declaration",
        shortcut: "Alt+7",
      },
      {
        value: "/legal/diplomatic-immunity",
        label: "Diplomatic Immunity",
        icon: Users,
        description: "Agent diplomatic status",
        shortcut: "Alt+8",
      },
    ],
  },
  {
    category: "Administration",
    items: [
      {
        value: "/admin/dashboard",
        label: "Admin Dashboard",
        icon: Server,
        description: "System administration",
        shortcut: "Alt+9",
      },
      {
        value: "/admin/users",
        label: "User Management",
        icon: Users,
        description: "Manage platform users",
        shortcut: "Alt+0",
      },
      {
        value: "/admin/system",
        label: "System Monitoring",
        icon: Server,
        description: "Infrastructure monitoring",
        shortcut: "Alt+S",
      },
    ],
  },
]

interface EnvironmentDropdownProps {
  className?: string
}

export function EnvironmentDropdown({ className }: EnvironmentDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize keyboard shortcuts
  useEnvironmentShortcuts()

  // Find current environment
  const currentEnvironment = React.useMemo(() => {
    for (const category of environments) {
      const found = category.items.find((item) => pathname.startsWith(item.value))
      if (found) return found
    }
    return environments[0].items[0] // Default to main dashboard
  }, [pathname])

  const handleSelect = (value: string) => {
    setOpen(false)
    router.push(value)
  }

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-[280px] justify-between bg-background/50 backdrop-blur-sm border-white/20 hover:bg-background/70",
              className,
            )}
          >
            <div className="flex items-center gap-2">
              <currentEnvironment.icon className="h-4 w-4" />
              <span className="truncate">{currentEnvironment.label}</span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0 bg-background/95 backdrop-blur-sm border-white/20">
          <Command>
            <CommandInput placeholder="Search environments..." />
            <CommandList>
              <CommandEmpty>No environment found.</CommandEmpty>
              {environments.map((category) => (
                <CommandGroup key={category.category} heading={category.category}>
                  {category.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => handleSelect(item.value)}
                      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/10"
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                          {item.shortcut}
                        </kbd>
                        <Check
                          className={cn("h-4 w-4", pathname.startsWith(item.value) ? "opacity-100" : "opacity-0")}
                        />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <KeyboardShortcutsHelp />
    </div>
  )
}
