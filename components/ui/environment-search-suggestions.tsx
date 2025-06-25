"use client"
import { useRouter } from "next/navigation"
import { Lightbulb, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Shown inside the CommandEmpty slot when no environments match the search.
 * Provides smart-but-static suggestions the user can jump to.
 */
export function EnvironmentSearchSuggestions() {
  const router = useRouter()

  const suggestions = [
    { label: "Main Dashboard", path: "/dashboard" },
    { label: "EcommereX Shop", path: "/dashboard/ecommerex/holographic-products" },
    { label: "Compliance Portal", path: "/legal/compliance" },
  ]

  return (
    <div className="flex flex-col gap-2 px-4 py-6 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Lightbulb className="h-4 w-4 shrink-0" />
        <span>Try one of these popular destinations:</span>
      </div>

      {suggestions.map((s) => (
        <Button key={s.path} variant="ghost" className="justify-start px-2 gap-2" onClick={() => router.push(s.path)}>
          <ArrowRight className="h-3 w-3 opacity-60" />
          {s.label}
        </Button>
      ))}
    </div>
  )
}
