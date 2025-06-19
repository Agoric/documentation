"use client"

import Link from "next/link"
import { Scale, Shield, Scroll, Crown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { motion } from "framer-motion"

const legalSections = [
  {
    id: "terms-of-service",
    title: "Terms of Service",
    latinTitle: "Conditiones Servitii",
    description: "Fundamental terms governing your use of the Snapifi platform and services",
    icon: Scroll,
    href: "/legal/terms-of-service",
    status: "Active",
    lastUpdated: "2024-01-15",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    latinTitle: "Politica Privatitatis",
    description: "How we collect, use, and protect your personal information and data",
    icon: Shield,
    href: "/legal/privacy-policy",
    status: "Active",
    lastUpdated: "2024-01-10",
    gradient: "from-indigo-600 to-cyan-600",
  },
  {
    id: "user-agreement",
    title: "User Agreement",
    latinTitle: "Pactum Usuarii",
    description: "Comprehensive agreement outlining user rights and responsibilities",
    icon: Scale,
    href: "/legal/user-agreement",
    status: "Active",
    lastUpdated: "2024-01-12",
    gradient: "from-amber-600 to-orange-600",
  },
  {
    id: "risk-disclosure",
    title: "Risk Disclosure",
    latinTitle: "Revelatio Periculi",
    description: "Important information about risks associated with digital assets and trading",
    icon: Crown,
    href: "/legal/risk-disclosure",
    status: "Active",
    lastUpdated: "2024-01-08",
    gradient: "from-red-600 to-pink-600",
  },
  {
    id: "compliance",
    title: "Compliance Framework",
    latinTitle: "Conformitas Legalis",
    description: "Our commitment to regulatory compliance and legal standards",
    icon: Globe,
    href: "/legal/compliance",
    status: "Active",
    lastUpdated: "2024-01-14",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    id: "digital-domicile",
    title: "Digital Domicile",
    latinTitle: "Domicilium Digitale",
    description: "Establishment of digital jurisdiction and sovereign authority",
    icon: Crown,
    href: "/legal/digital-domicile",
    status: "Active",
    lastUpdated: "2024-01-16",
    gradient: "from-purple-600 to-pink-600",
  },
]

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900">
      {/* Roman Column Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.1'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <SupremeAuthorityCoin size="xl" variant="logo" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif mb-4">
            Digital Legal Empire
          </h1>

          <p className="text-xl text-amber-300/80 max-w-3xl mx-auto leading-relaxed font-medium italic font-serif">
            Lex Digitalis Imperium
          </p>

          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        </motion.div>

        {/* Legal Sections Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {legalSections.map((section, index) => {
            const Icon = section.icon

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <Link href={section.href}>
                  <Card className="h-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20 hover:border-amber-400/40 transition-all duration-300 group cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${section.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          style={{
                            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                          }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <Badge
                          className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30"
                          style={{
                            clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                          }}
                        >
                          {section.status}
                        </Badge>
                      </div>

                      <CardTitle className="text-xl font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                        {section.title}
                      </CardTitle>

                      <CardDescription className="text-purple-200/80 font-medium italic font-serif">
                        {section.latinTitle}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="text-indigo-200/70 mb-4 leading-relaxed">{section.description}</p>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-amber-400/70">Last Updated: {section.lastUpdated}</span>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-300 hover:text-amber-200 hover:bg-amber-500/20 group-hover:translate-x-1 transition-all duration-300"
                        >
                          View Document →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer Notice */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm rounded-lg p-6 border border-amber-400/20">
            <h3 className="text-lg font-semibold text-amber-300 mb-2">Legal Notice</h3>
            <p className="text-indigo-200/80 leading-relaxed italic font-serif text-sm mb-2">Notitia Legalis</p>
            <p className="text-indigo-200/80 leading-relaxed">
              All legal documents are governed by the Supreme Authority of the Snapifi Digital Empire. By accessing
              these documents, you acknowledge the jurisdiction and sovereignty of our digital realm.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
