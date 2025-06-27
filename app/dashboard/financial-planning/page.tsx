import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TOOLS = [
  {
    href: "/dashboard/financial-planning/budget-calculator",
    title: "Budget Calculator",
    description: "Track income & expenses to stay on target.",
  },
  {
    href: "/dashboard/financial-planning/investment-planner",
    title: "Investment Planner",
    description: "Project portfolio growth & asset allocation.",
  },
  {
    href: "/dashboard/financial-planning/debt-manager",
    title: "Debt Manager",
    description: "Visualize payoff timelines & interest savings.",
  },
  {
    href: "/dashboard/financial-planning/retirement-simulator",
    title: "Retirement Simulator",
    description: "Forecast retirement income & savings needs.",
  },
]

export default function FinancialPlanningOverview() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Financial Planning Tools</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((tool) => (
          <Card
            key={tool.href}
            className={cn(
              // subtle glass / holographic vibe—remove if you have your own theme utility
              "bg-white/60 shadow-lg backdrop-blur-sm dark:bg-zinc-900/60",
            )}
          >
            <CardHeader>
              <CardTitle className="text-lg">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between gap-4">
              <p className="text-sm text-muted-foreground">{tool.description}</p>

              <Button asChild variant="secondary" className="mt-2 w-full">
                <Link href={tool.href}>
                  Open&nbsp;
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
