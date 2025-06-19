"use client"

import type React from "react"

import { useState } from "react"
import { AdminAccessProvider, useAdminAccess } from "@/contexts/admin-access-context"
import { SupremeAuthorityAdminDashboard } from "@/components/admin/supreme-authority-admin-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { Crown, Shield, Lock } from "lucide-react"
import { motion } from "framer-motion"

function AdminLoginForm() {
  const { login, isAuthenticated } = useAdminAccess()
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const success = await login(credentials)
      if (!success) {
        alert("Invalid credentials")
      }
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    return <SupremeAuthorityAdminDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-96 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <SupremeAuthorityCoin size="xl" variant="logo" animated />
            </motion.div>
            <div>
              <CardTitle className="text-2xl text-amber-300 font-serif">Supreme Authority Access</CardTitle>
              <CardDescription className="text-purple-200 font-serif tracking-wider">
                SUPREMA AUCTORITAS DIGITALIS
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Crown className="absolute left-3 top-3 h-4 w-4 text-amber-400" />
                  <Input
                    type="text"
                    placeholder="Imperial Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="pl-10 bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-300"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-amber-400" />
                  <Input
                    type="password"
                    placeholder="Supreme Passphrase"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="pl-10 bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-300"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Access Imperial Command
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-purple-300">Authorized Personnel Only</p>
              <p className="text-xs text-purple-400 mt-1">All access attempts are logged and monitored</p>
            </div>

            {/* Demo Credentials Hint */}
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-400/20 rounded-lg">
              <p className="text-xs text-amber-300 text-center">
                <strong>Demo Access:</strong> Any username/password combination will grant Supreme Authority access
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminAccessProvider>
      <AdminLoginForm />
    </AdminAccessProvider>
  )
}
