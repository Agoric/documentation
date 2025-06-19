"use client"

import { AdminAccessProvider } from "@/contexts/admin-access-context"
import { SupremeAuthorityAdminDashboard } from "@/components/admin/supreme-authority-admin-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { Crown, Shield, Users, DollarSign, BarChart3, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

function DemoLanding() {
  const [showAdmin, setShowAdmin] = useState(false)

  if (showAdmin) {
    return (
      <AdminAccessProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950">
          <div className="p-6">
            <Button
              onClick={() => setShowAdmin(false)}
              className="mb-4 bg-amber-500/20 border border-amber-400/30 text-amber-300 hover:bg-amber-500/30"
            >
              ← Back to Demo Overview
            </Button>
            <SupremeAuthorityAdminDashboard />
          </div>
        </div>
      </AdminAccessProvider>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SupremeAuthorityCoin size="xl" variant="logo" animated />
        <h1 className="text-5xl font-bold text-amber-300 font-serif mt-6 mb-4">SNAPIFI PLATFORM DEMO</h1>
        <p className="text-xl text-purple-200 font-serif tracking-wider">SUPREMA AUCTORITAS DIGITALIS</p>
        <p className="text-lg text-purple-300 mt-4 max-w-3xl mx-auto">
          Experience the complete financial sovereignty platform with holographic interfaces, imperial authority
          systems, and quantum-level financial operations.
        </p>
      </motion.div>

      {/* Feature Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 h-full">
            <CardHeader>
              <Crown className="w-12 h-12 text-amber-400 mb-4" />
              <CardTitle className="text-amber-300 font-serif">Supreme Authority Access</CardTitle>
              <CardDescription className="text-purple-200">
                Imperial-level administrative control over the entire platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-purple-300 space-y-2">
                <li>• Cosmic security clearance</li>
                <li>• Universal platform oversight</li>
                <li>• Real-time system monitoring</li>
                <li>• Imperial command privileges</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 h-full">
            <CardHeader>
              <Users className="w-12 h-12 text-amber-400 mb-4" />
              <CardTitle className="text-amber-300 font-serif">User Management</CardTitle>
              <CardDescription className="text-purple-200">
                Comprehensive oversight of global citizens and entities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-purple-300 space-y-2">
                <li>• Global citizenship registry</li>
                <li>• Business entity management</li>
                <li>• Verification workflows</li>
                <li>• Account status control</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 h-full">
            <CardHeader>
              <DollarSign className="w-12 h-12 text-amber-400 mb-4" />
              <CardTitle className="text-amber-300 font-serif">Financial Sovereignty</CardTitle>
              <CardDescription className="text-purple-200">Advanced financial operations and oversight</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-purple-300 space-y-2">
                <li>• $500M+ total assets</li>
                <li>• Real-time transaction monitoring</li>
                <li>• Risk management systems</li>
                <li>• Automated compliance</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 h-full">
            <CardHeader>
              <Shield className="w-12 h-12 text-amber-400 mb-4" />
              <CardTitle className="text-amber-300 font-serif">Security Command</CardTitle>
              <CardDescription className="text-purple-200">
                Military-grade security and threat monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-purple-300 space-y-2">
                <li>• Real-time threat detection</li>
                <li>• Biometric authentication</li>
                <li>• IP address management</li>
                <li>• Incident response system</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 h-full">
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-amber-400 mb-4" />
              <CardTitle className="text-amber-300 font-serif">Analytics Engine</CardTitle>
              <CardDescription className="text-purple-200">Advanced analytics and reporting systems</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-purple-300 space-y-2">
                <li>• Real-time dashboard metrics</li>
                <li>• User growth analytics</li>
                <li>• Transaction volume tracking</li>
                <li>• Performance monitoring</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 h-full">
            <CardHeader>
              <Zap className="w-12 h-12 text-amber-400 mb-4" />
              <CardTitle className="text-amber-300 font-serif">System Control</CardTitle>
              <CardDescription className="text-purple-200">Platform configuration and maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-purple-300 space-y-2">
                <li>• 99.97% system uptime</li>
                <li>• Automated maintenance</li>
                <li>• Configuration management</li>
                <li>• Data export capabilities</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Demo Access */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-amber-900/30 to-amber-800/30 border-amber-400/50">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-300 font-serif">Experience Supreme Authority</CardTitle>
            <CardDescription className="text-amber-200">
              Access the complete administrative interface with full imperial privileges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300">1,247</div>
                <div className="text-amber-200">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300">$125M</div>
                <div className="text-amber-200">Platform Volume</div>
              </div>
            </div>

            <Button
              onClick={() => setShowAdmin(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 text-lg"
            >
              <Crown className="w-5 h-5 mr-2" />
              Launch Supreme Authority Dashboard
            </Button>

            <div className="text-xs text-amber-300/80 bg-amber-500/10 p-3 rounded-lg">
              <strong>Demo Access:</strong> Click above to experience the full admin interface. All features are
              functional with simulated data for demonstration purposes.
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Platform Features Summary */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <h2 className="text-3xl font-bold text-amber-300 font-serif mb-6">Complete Platform Ecosystem</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-sm">
          <div className="text-purple-200">
            <div className="font-medium text-amber-300">Financial Services</div>
            <div>Banking • Insurance • Investments</div>
          </div>
          <div className="text-purple-200">
            <div className="font-medium text-amber-300">Digital Commerce</div>
            <div>Marketplace • Real Estate • Trading</div>
          </div>
          <div className="text-purple-200">
            <div className="font-medium text-amber-300">Legal Framework</div>
            <div>Compliance • Jurisdiction • Rights</div>
          </div>
          <div className="text-purple-200">
            <div className="font-medium text-amber-300">Advanced Tech</div>
            <div>Holographic UI • AI • Gamification</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function DemoPage() {
  return <DemoLanding />
}
