"use client"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateBreadcrumbs, getCurrentEnvironmentFromPath } from "@/utils/breadcrumb-utils"
import { usePathname, useRouter } from "next/navigation"

interface BreadcrumbNavigationProps {
  className?: string
}

export function BreadcrumbNavigation({ className }: BreadcrumbNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const breadcrumbs = generateBreadcrumbs(pathname)
  const currentEnvironment = getCurrentEnvironmentFromPath(pathname)

  const handleBreadcrumbClick = (path: string) => {
    if (path !== pathname) {
      router.push(path)
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Environment Context */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-white/10">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" />
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{currentEnvironment.category}</span>
          <span className="mx-1">•</span>
          <span>{currentEnvironment.name}</span>
        </div>
      </div>

      {/* Breadcrumb Trail */}
      <nav aria-label="Breadcrumb" className="px-3">
        <ol className="flex items-center space-x-1 text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            const Icon = crumb.icon || Home

            return (
              <li key={crumb.path} className="flex items-center">
                {index > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground mx-1 flex-shrink-0" />}
                <button
                  onClick={() => handleBreadcrumbClick(crumb.path)}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors",
                    isLast
                      ? "text-foreground font-medium bg-white/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                    crumb.path === pathname && "bg-white/10",
                  )}
                  disabled={crumb.path === pathname}
                >
                  <Icon className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate max-w-[120px]">{crumb.label}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Quick Stats */}
      <div className="px-3 py-2 bg-black/20 rounded-lg border border-white/5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Current Path</span>
          <code className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono">{pathname}</code>
        </div>
      </div>
    </div>
  )
}
