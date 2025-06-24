"use client"

import { Shield, Eye, Lock, Database, UserCheck, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { motion } from "framer-motion"

const privacySections = [
  {
    id: "data-collection",
    title: "Data Collection",
    latinTitle: "Collectio Datorum",
    icon: Database,
    content:
      "We collect information necessary to provide our services, including account details, transaction history, and platform usage data.",
  },
  {
    id: "data-usage",
    title: "Data Usage",
    latinTitle: "Usus Datorum",
    icon: Eye,
    content:
      "Your data is used to enhance platform functionality, provide personalized services, and ensure security compliance.",
  },
  {
    id: "data-protection",
    title: "Data Protection",
    latinTitle: "Protectio Datorum",
    icon: Lock,
    content:
      "We implement advanced encryption and security measures to protect your personal information and digital assets.",
  },
  {
    id: "user-rights",
    title: "User Rights",
    latinTitle: "Iura Usuarii",
    icon: UserCheck,
    content:
      "You have the right to access, modify, or delete your personal data in accordance with digital privacy laws.",
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    latinTitle: "Communicatio Datorum",
    icon: Globe,
    content: "We do not sell personal data. Limited sharing occurs only for essential services and legal compliance.",
  },
  {
    id: "cookies-tracking",
    title: "Cookies & Tracking",
    latinTitle: "Cookies et Tracking",
    icon: Shield,
    content: "We use cookies and tracking technologies to improve user experience and platform functionality.",
  },
]

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>

          <p className="text-xl text-amber-300/80 max-w-3xl mx-auto leading-relaxed font-medium mb-6 italic font-serif">
            Politica Privatitatis
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-500/30">
              <Shield className="w-3 h-3 mr-1" />
              GDPR Compliant
            </Badge>
            <Badge className="bg-cyan-600/20 text-cyan-300 border-cyan-500/30">
              <Lock className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
            <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              <UserCheck className="w-3 h-3 mr-1" />
              User Rights Protected
            </Badge>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
        </motion.div>

        {/* Privacy Overview */}
        <motion.div
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-xl border-amber-400/20">
            <CardHeader>
              <CardTitle className="text-amber-300 font-serif text-xl flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy Foundation
              </CardTitle>
              <CardDescription className="text-purple-200/80 italic font-serif">
                Fundamenta Privatitatis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-200/80 leading-relaxed mb-4">
                The Snapifi platform operates under the highest standards of data protection and user privacy. Our
                commitment to safeguarding your personal information is fundamental to our digital sovereignty.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-amber-300 font-semibold">Last Updated:</span>
                  <div className="text-indigo-200/80">January 10, 2024</div>
                </div>
                <div>
                  <span className="text-amber-300 font-semibold">Effective Date:</span>
                  <div className="text-indigo-200/80">January 10, 2024</div>
                </div>
                <div>
                  <span className="text-amber-300 font-semibold">Jurisdiction:</span>
                  <div className="text-indigo-200/80">Digital Sovereign Territory</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Sections */}
        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {privacySections.map((section, index) => {
            const Icon = section.icon

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-xl border-amber-400/20 hover:border-amber-400/40 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-amber-600 to-purple-600 rounded-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-amber-300 font-serif text-lg">{section.title}</CardTitle>
                        <CardDescription className="text-purple-200/80 font-medium italic font-serif">
                          {section.latinTitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-indigo-200/80 leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* User Rights & Controls */}
        <motion.div
          className="max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-cyan-900/20 to-indigo-900/20 backdrop-blur-xl border-cyan-400/30">
            <CardHeader>
              <CardTitle className="text-cyan-300 font-serif text-xl flex items-center">
                <UserCheck className="w-5 h-5 mr-2" />
                User Controls
              </CardTitle>
              <CardDescription className="text-cyan-200/80 italic font-serif">Controles Usuarii</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-cyan-300">Data Access Rights</h4>
                  <ul className="space-y-2 text-indigo-200/80 text-sm">
                    <li>• Request a copy of your personal data</li>
                    <li>• View data processing activities</li>
                    <li>• Access transaction history</li>
                    <li>• Download account information</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-cyan-300">Privacy Controls</h4>
                  <ul className="space-y-2 text-indigo-200/80 text-sm">
                    <li>• Modify privacy settings</li>
                    <li>• Control data sharing preferences</li>
                    <li>• Manage cookie preferences</li>
                    <li>• Request data deletion</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button
                  className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white px-8"
                  style={{
                    clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Manage Privacy Settings
                </Button>

                <Button variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 px-8">
                  <Database className="w-4 h-4 mr-2" />
                  Request Data Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="max-w-4xl mx-auto mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-xl border-amber-400/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-amber-300 font-serif mb-2">Privacy Contact</h3>
              <p className="text-indigo-200/80 text-sm leading-relaxed">
                For privacy-related inquiries, data requests, or concerns about your personal information, please
                contact our Data Protection Officer at privacy@snapifi.com or through our secure portal.
              </p>
              <p className="text-xs italic font-serif text-amber-300/70 mt-2">Contactus Privacy</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
