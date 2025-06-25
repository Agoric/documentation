"use client"
import { RefreshCw, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"

/**
 * Small strip of context-sensitive quick-action buttons.
 * For now we ship two generic actions; extend as needed.
 */
export function EnvironmentTools() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="secondary" onClick={() => router.refresh()} className="gap-1">
        <RefreshCw className="h-4 w-4" />
        Refresh
      </Button>

      <Button size="sm" variant="secondary" onClick={() => router.push(`${pathname}?settings=1`)} className="gap-1">
        <Settings className="h-4 w-4" />
        Settings
      </Button>
    </div>
  )
}
