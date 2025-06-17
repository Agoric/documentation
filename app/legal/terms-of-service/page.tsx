"use client"

import { Scroll, Shield, Scale, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { motion } from "framer-motion"

const sections = [
  {
    id: "acceptance",
    title: "ACCEPTATIO CONDITIONUM",
    englishTitle: "Acceptance of Terms",
    content:
      "By accessing and using the Snapifi platform, you acknowledge and agree to be bound by these Terms of Service and all applicable laws and regulations.",
  },
  {
    id: "definitions",
    title: "DEFINITIONES",
    englishTitle: "Definitions",
    content:
      "The Platform refers to all Snapifi services, websites, applications, and digital infrastructure operated under the Supreme Authority.",
  },
  {
    id: "user-obligations",
    title: "OBLIGATIONES USUARII",
    englishTitle: "User Obligations",
    content:
      "Users must comply with all platform rules, maintain account security, and conduct themselves in accordance with community standards.",
  },
  {
    id: "intellectual-property",
    title: "PROPRIETAS INTELLECTUALIS",
    englishTitle: "Intellectual Property",
    content:
      "All platform content, trademarks, and intellectual property remain the exclusive property of Snapifi and its licensors.",
  },
  {
    id: "limitation-liability",
    title: "LIMITATIO RESPONSABILITATIS",
    englishTitle: "Limitation of Liability",
    content:
      "The platform operates under limited liability terms as established by the Supreme Authority's digital jurisdiction.",
  },
  {
    id: "termination",
    title: "TERMINATIO",
    englishTitle: "Termination",
    content: "Either party may terminate this agreement under specified conditions with appropriate notice periods.",
  },
]

export default function TermsOfServicePage() {
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

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent font-serif mb-4">
            CONDITIONES SERVITII
          </h1>

          <p className="text-xl text-amber-300/80 max-w-3xl mx-auto leading-relaxed font-medium mb-6">
            Terms of Service & User Agreement
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30">
              <Shield className="w-3 h-3 mr-1" />
              Active Document
            </Badge>
            <Badge className="bg-amber-600/20 text-amber-300 border-amber-500/30">
              <Scroll className="w-3 h-3 mr-1" />
              Version 2.1
            </Badge>
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              <Scale className="w-3 h-3 mr-1" />
              Legal Framework
            </Badge>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        </motion.div>

        {/* Document Metadata */}
        <motion.div
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader>
              <CardTitle className="text-amber-300 font-serif text-xl flex items-center">
                <Crown className="w-5 h-5 mr-2" />
                AUCTORITAS SUPREMA
              </CardTitle>
              <CardDescription className="text-purple-200/80">Supreme Authority & Jurisdiction Notice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-amber-300 font-semibold">Effective Date:</span>
                  <div className="text-indigo-200/80">January 15, 2024</div>
                </div>
                <div>
                  <span className="text-amber-300 font-semibold">Last Updated:</span>
                  <div className="text-indigo-200/80">January 15, 2024</div>
                </div>
                <div>
                  <span className="text-amber-300 font-semibold">Jurisdiction:</span>
                  <div className="text-indigo-200/80">Digital Sovereign Territory</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-xl border-amber-400/20 hover:border-amber-400/40 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-amber-300 font-serif text-lg">{section.title}</CardTitle>
                  <CardDescription className="text-purple-200/80 font-medium">{section.englishTitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo-200/80 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Agreement Actions */}
        <motion.div
          className="max-w-4xl mx-auto mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-amber-900/20 to-purple-900/20 backdrop-blur-xl border-amber-400/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-amber-300 font-serif mb-4">CONFIRMATIO CONSENSUS</h3>
              <p className="text-indigo-200/80 mb-6 leading-relaxed">
                By continuing to use the Snapifi platform, you confirm your acceptance of these Terms of Service and
                acknowledge the Supreme Authority's jurisdiction over all platform activities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8"
                  style={{
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />I Accept Terms
                </Button>

                <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/20 px-8">
                  <Scroll className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Notice */}
        <motion.div
          className="max-w-4xl mx-auto mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <p className="text-sm text-indigo-300/60">
            This document is governed by the laws and regulations of the Snapifi Digital Empire. For questions regarding
            these terms, please contact our Legal Department.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
