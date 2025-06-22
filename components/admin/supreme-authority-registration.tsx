"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { SupremeAuthorityCoin } from "@/components/branding/supreme-authority-coin"
import { Crown, Shield, CheckCircle, AlertTriangle, Mail, User, Lock } from "lucide-react"
import { motion } from "framer-motion"

interface RegistrationData {
  email: string
  username: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  title: string
}

interface LoginData {
  email: string
  password: string
}

export function SupremeAuthorityRegistration() {
  const [activeTab, setActiveTab] = useState("register")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    title: "Supreme Authority",
  })

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  })

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      // Validation
      if (!registrationData.email || !registrationData.username || !registrationData.password) {
        throw new Error("Please fill in all required fields")
      }

      if (registrationData.password !== registrationData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (registrationData.password.length < 8) {
        throw new Error("Password must be at least 8 characters long")
      }

      // Simulate registration process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create Supreme Authority account
      const supremeAuthorityAccount = {
        adminId: `supreme_${Date.now()}`,
        email: registrationData.email,
        username: registrationData.username,
        firstName: registrationData.firstName || "Supreme",
        lastName: registrationData.lastName || "Authority",
        title: registrationData.title,
        accessLevel: "supreme",
        securityClearance: "cosmic",
        registrationDate: new Date(),
        status: "active",
      }

      console.log("🎉 Supreme Authority Account Created:", supremeAuthorityAccount)

      setMessage({
        type: "success",
        text: `Supreme Authority account created successfully! Welcome, ${registrationData.email}`,
      })

      // Auto-switch to login tab after successful registration
      setTimeout(() => {
        setActiveTab("login")
        setLoginData({ email: registrationData.email, password: "" })
      }, 2000)
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Registration failed",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      if (!loginData.email || !loginData.password) {
        throw new Error("Please enter both email and password")
      }

      // Simulate login process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setMessage({
        type: "success",
        text: `Welcome back, Supreme Authority! Redirecting to command center...`,
      })

      // Redirect to admin dashboard
      setTimeout(() => {
        window.location.href = "/admin"
      }, 1500)
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Login failed",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <SupremeAuthorityCoin size="xl" variant="logo" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl text-amber-300 font-serif">Supreme Authority Portal</CardTitle>
              <CardDescription className="text-purple-200 font-serif">SUPREMA AUCTORITAS DIGITALIS</CardDescription>
            </div>
            <div className="flex justify-center space-x-2">
              <Badge variant="outline" className="border-amber-400 text-amber-300">
                <Crown className="w-3 h-3 mr-1" />
                COSMIC CLEARANCE
              </Badge>
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                <Shield className="w-3 h-3 mr-1" />
                IMPERIAL ACCESS
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-purple-800/30">
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
                >
                  Register
                </TabsTrigger>
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
                >
                  Login
                </TabsTrigger>
              </TabsList>

              {/* Registration Tab */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegistration} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-purple-200 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="supreme@authority.com"
                      value={registrationData.email}
                      onChange={(e) => setRegistrationData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-purple-200 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Username *
                    </Label>
                    <Input
                      id="username"
                      placeholder="SupremeAuthority"
                      value={registrationData.username}
                      onChange={(e) => setRegistrationData((prev) => ({ ...prev, username: e.target.value }))}
                      className="bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-purple-200">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Supreme"
                        value={registrationData.firstName}
                        onChange={(e) => setRegistrationData((prev) => ({ ...prev, firstName: e.target.value }))}
                        className="bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-purple-200">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Authority"
                        value={registrationData.lastName}
                        onChange={(e) => setRegistrationData((prev) => ({ ...prev, lastName: e.target.value }))}
                        className="bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-purple-200 flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Password *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter secure password"
                      value={registrationData.password}
                      onChange={(e) => setRegistrationData((prev) => ({ ...prev, password: e.target.value }))}
                      className="bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-purple-200 flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Confirm Password *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={registrationData.confirmPassword}
                      onChange={(e) => setRegistrationData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className="bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-400"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 mr-2"
                      >
                        <Crown className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Crown className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? "Creating Supreme Authority..." : "Register as Supreme Authority"}
                  </Button>

                  <p className="text-xs text-purple-300 text-center">
                    Registration grants immediate <strong>Supreme Authority</strong> access with{" "}
                    <strong>Cosmic Clearance</strong>
                  </p>
                </form>
              </TabsContent>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail" className="text-purple-200 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="loginEmail"
                      type="email"
                      placeholder="supreme@authority.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loginPassword" className="text-purple-200 flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Password
                    </Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                      className="bg-purple-800/30 border-amber-400/30 text-amber-100 placeholder:text-purple-400"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 mr-2"
                      >
                        <Shield className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Shield className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? "Authenticating..." : "Access Imperial Command"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Status Messages */}
            {message && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <Alert
                  className={`${
                    message.type === "success"
                      ? "bg-green-900/30 border-green-400/30"
                      : "bg-red-900/30 border-red-400/30"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  )}
                  <AlertDescription className={message.type === "success" ? "text-green-200" : "text-red-200"}>
                    {message.text}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-purple-300 text-sm mb-4">Supreme Authority Access Includes:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Badge variant="outline" className="border-amber-400/30 text-amber-300">
              Unlimited Transactions
            </Badge>
            <Badge variant="outline" className="border-purple-400/30 text-purple-300">
              Global User Management
            </Badge>
            <Badge variant="outline" className="border-green-400/30 text-green-300">
              System Configuration
            </Badge>
            <Badge variant="outline" className="border-blue-400/30 text-blue-300">
              Compliance Override
            </Badge>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
