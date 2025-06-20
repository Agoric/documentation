import { PageWrapper } from "@/components/layout/page-wrapper"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Building2, ShoppingBag, TrendingUp, Trophy, Scale, Globe, Shield, Coins } from "lucide-react"

const features = [
  {
    title: "QUICA Money Market",
    description: "Quantum Utility Investment Capitol Accelerator",
    icon: ShoppingBag,
    href: "/dashboard/ecommerex/holographic-products",
    gradient: "from-purple-600 to-cyan-600",
  },
  {
    title: "Real Estate Empire",
    description: "Domus Et Praedia Imperium",
    icon: Building2,
    href: "/dashboard/ecommerex/real-estate",
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    title: "SnapDax Trading",
    description: "Negotium Et Commercium Supremum",
    icon: TrendingUp,
    href: "/dashboard/snap-dax",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "Gamification Hub",
    description: "Ludus Victoriae Et Honores",
    icon: Trophy,
    href: "/dashboard/gamification",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Legal Framework",
    description: "Lex Digitalis Et Iurisdictio",
    icon: Scale,
    href: "/legal",
    gradient: "from-slate-600 to-gray-600",
  },
  {
    title: "Global Network",
    description: "Orbis Terrarum Connexus",
    icon: Globe,
    href: "/dashboard/global-network",
    gradient: "from-cyan-600 to-blue-600",
  },
]

export default function HomePage() {
  return (
    <PageWrapper title="SNAPIFICUS SUPREMA AUCTORITAS" subtitle="New World Wealth Navigation Assistant - Welcome Home">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <SupremeAuthorityCoin size="xl" variant="logo" />
          </div>
          <h2 className="text-4xl font-bold text-amber-300 font-serif mb-4">Economic Global Citizenship</h2>
          <p className="text-xl text-amber-300/80 font-serif italic max-w-2xl mx-auto">
            Introducing the Benefits of Digital Sovereignty and Financial Freedom
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link key={feature.title} href={feature.href}>
                <Card className="h-full bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105 group">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-amber-300 font-serif">{feature.title}</CardTitle>
                    <CardDescription className="text-amber-300/70 font-serif italic">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400/50"
                    >
                      Enter Realm
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Card className="bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-300 font-serif flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Admin Access
              </CardTitle>
              <CardDescription className="text-amber-300/70 font-serif italic">
                Supreme Authority Administrative Controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700">
                  Access Admin Panel
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-950/50 to-indigo-950/50 border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-amber-300 font-serif flex items-center">
                <Coins className="w-5 h-5 mr-2" />
                Banking Services
              </CardTitle>
              <CardDescription className="text-amber-300/70 font-serif italic">
                Snapifi Digital Banking Platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/banking">
                <Button className="w-full bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-700 hover:to-purple-700">
                  Access Banking
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}
