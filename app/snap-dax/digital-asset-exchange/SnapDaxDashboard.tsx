"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Calculator, Globe, RefreshCw, Search, TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SnapDaxDashboard() {
  const router = useRouter()

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Digital Asset Exchange Dashboard</h1>
        <p className="text-muted-foreground">Your gateway to the world of digital asset trading.</p>
      </div>

      {/* Quick Trading Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Button className="h-16 flex-col gap-2" onClick={() => router.push("/snap-dax/trade/buy")}>
          <TrendingUp className="w-5 h-5" />
          Buy
        </Button>
        <Button
          className="h-16 flex-col gap-2"
          variant="destructive"
          onClick={() => router.push("/snap-dax/trade/sell")}
        >
          <TrendingDown className="w-5 h-5" />
          Sell
        </Button>
        <Button
          className="h-16 flex-col gap-2 bg-transparent"
          variant="outline"
          onClick={() => router.push("/snap-dax/portfolio")}
        >
          <Wallet className="w-5 h-5" />
          Portfolio
        </Button>
        <Button
          className="h-16 flex-col gap-2 bg-transparent"
          variant="outline"
          onClick={() => router.push("/snap-dax/analytics")}
        >
          <BarChart className="w-5 h-5" />
          Analytics
        </Button>
      </div>

      {/* Trading Tools */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Trading Tools</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-12 bg-transparent"
            onClick={() => router.push("/snap-dax/tools/calculator")}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculator
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-transparent"
            onClick={() => router.push("/snap-dax/tools/converter")}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Converter
          </Button>
          <Button variant="outline" className="h-12 bg-transparent" onClick={() => router.push("/snap-dax/research")}>
            <Search className="w-4 h-4 mr-2" />
            Research
          </Button>
          <Button variant="outline" className="h-12 bg-transparent" onClick={() => router.push("/snap-dax/news")}>
            <Globe className="w-4 h-4 mr-2" />
            News
          </Button>
        </CardContent>
      </Card>

      {/* Additional Content (Example) */}
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Stay updated with the latest market trends and insights.</p>
        </CardContent>
      </Card>
    </div>
  )
}
