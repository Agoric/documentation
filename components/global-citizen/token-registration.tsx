"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { HolographicGlassCard } from "../snap-dax/holographic-glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { HolographicBadge } from "../snap-dax/holographic-badge"
import { Fingerprint, Globe, Shield, FileText, CheckCircle2, ArrowRight, Crown, Key, Sparkles } from "lucide-react"

interface TokenRegistrationProps {
  onComplete?: (userData: any) => void
}

export function GlobalCitizenTokenRegistration({ onComplete }: TokenRegistrationProps) {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    citizenship: "",
    birthdate: "",
    assetDescription: "",
    assetValue: "",
    purpose: "",
  })
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [socialImpactNumber, setSocialImpactNumber] = useState("")
  const [skrReceipt, setSkrReceipt] = useState({
    id: "",
    timestamp: "",
    assetValue: "",
    impactScore: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateSocialImpactNumber = () => {
    // Generate a unique Social Impact Number (SIN)
    const prefix = "SIN"
    const timestamp = Date.now().toString().slice(-8)
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    return `${prefix}-${timestamp}-${random}`
  }

  const generateSKRReceipt = () => {
    // Generate a Safe Keeping Receipt (SKR)
    const id = `SKR-${Date.now().toString(36).toUpperCase()}`
    const timestamp = new Date().toISOString()
    const assetValue = formData.assetValue || "Undisclosed"
    const impactScore = Math.floor(Math.random() * 50) + 50 // 50-100 impact score

    return {
      id,
      timestamp,
      assetValue,
      impactScore,
    }
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
      setProgress((step + 1) * 25)
    } else {
      // Complete registration
      const sin = generateSocialImpactNumber()
      const skr = generateSKRReceipt()

      setSocialImpactNumber(sin)
      setSkrReceipt(skr)
      setRegistrationComplete(true)

      if (onComplete) {
        onComplete({
          ...formData,
          socialImpactNumber: sin,
          skrReceipt: skr,
        })
      }
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-amber-200">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full legal name"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100 placeholder:text-amber-400/50"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-amber-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100 placeholder:text-amber-400/50"
                  required
                />
              </div>
              <div>
                <Label htmlFor="citizenship" className="text-amber-200">
                  Citizenship
                </Label>
                <Input
                  id="citizenship"
                  name="citizenship"
                  value={formData.citizenship}
                  onChange={handleInputChange}
                  placeholder="Enter your country of citizenship"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100 placeholder:text-amber-400/50"
                  required
                />
              </div>
              <div>
                <Label htmlFor="birthdate" className="text-amber-200">
                  Date of Birth
                </Label>
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100 placeholder:text-amber-400/50"
                  required
                />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              Asset Donation
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="assetDescription" className="text-amber-200">
                  Asset Description
                </Label>
                <Textarea
                  id="assetDescription"
                  name="assetDescription"
                  value={formData.assetDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the asset you're donating to SnapAiFi Trust"
                  className="min-h-[100px] border-amber-500/30 bg-amber-950/30 text-amber-100 placeholder:text-amber-400/50"
                  required
                />
              </div>
              <div>
                <Label htmlFor="assetValue" className="text-amber-200">
                  Estimated Asset Value
                </Label>
                <Input
                  id="assetValue"
                  name="assetValue"
                  value={formData.assetValue}
                  onChange={handleInputChange}
                  placeholder="Enter the estimated value of your asset"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100 placeholder:text-amber-400/50"
                  required
                />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              Purpose & Intent
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="purpose" className="text-amber-200">
                  Purpose of Registration
                </Label>
                <Textarea
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Describe your purpose for Global Citizen Token Registration"
                  className="min-h-[150px] border-amber-500/30 bg-amber-950/30 text-amber-100 placeholder:text-amber-400/50"
                  required
                />
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              Review & Confirm
            </h2>
            <div className="space-y-4 rounded-xl bg-amber-950/30 p-4 border border-amber-500/30">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-amber-300 font-medium">Full Name:</p>
                  <p className="text-amber-100">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-amber-300 font-medium">Email:</p>
                  <p className="text-amber-100">{formData.email}</p>
                </div>
                <div>
                  <p className="text-amber-300 font-medium">Citizenship:</p>
                  <p className="text-amber-100">{formData.citizenship}</p>
                </div>
                <div>
                  <p className="text-amber-300 font-medium">Date of Birth:</p>
                  <p className="text-amber-100">{formData.birthdate}</p>
                </div>
              </div>
              <div>
                <p className="text-amber-300 font-medium">Asset Description:</p>
                <p className="text-amber-100">{formData.assetDescription}</p>
              </div>
              <div>
                <p className="text-amber-300 font-medium">Asset Value:</p>
                <p className="text-amber-100">{formData.assetValue}</p>
              </div>
              <div>
                <p className="text-amber-300 font-medium">Purpose:</p>
                <p className="text-amber-100">{formData.purpose}</p>
              </div>
            </div>
            <div className="rounded-xl bg-yellow-950/30 p-4 border border-yellow-500/30">
              <div className="flex items-center gap-2 text-yellow-300">
                <Shield className="h-5 w-5" />
                <p className="font-medium">
                  By confirming, you agree to donate the specified asset to SnapAiFi Trust and receive a Social Impact
                  Number.
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderCompletionContent = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <div className="relative h-24 w-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/30 to-yellow-600/30 blur-xl animate-pulse" />
              <div className="relative h-full w-full flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-600">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
            </div>
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-2"
          >
            Registration Complete!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-amber-200 mb-8"
          >
            Your Global Citizen Token has been registered and your asset has been donated to SnapAiFi Trust.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-xl bg-gradient-to-br from-amber-950/50 to-yellow-950/50 p-6 border border-amber-500/30"
        >
          <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
            <Fingerprint className="h-6 w-6" />
            Your Social Impact Number (SIN)
          </h3>
          <div className="bg-amber-950/50 rounded-lg p-4 border border-amber-500/30 mb-4">
            <p className="text-2xl font-mono text-amber-100 text-center">{socialImpactNumber}</p>
          </div>
          <p className="text-amber-200 text-sm">
            This is your unique identifier in the SnapAiFi ecosystem. Keep it safe and use it for all future
            transactions.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-xl bg-gradient-to-br from-amber-950/50 to-yellow-950/50 p-6 border border-amber-500/30"
        >
          <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Safe Keeping Receipt (SKR)
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-amber-500/30 pb-2">
              <span className="text-amber-300">Receipt ID:</span>
              <span className="text-amber-100 font-mono">{skrReceipt.id}</span>
            </div>
            <div className="flex justify-between items-center border-b border-amber-500/30 pb-2">
              <span className="text-amber-300">Timestamp:</span>
              <span className="text-amber-100">{new Date(skrReceipt.timestamp).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-b border-amber-500/30 pb-2">
              <span className="text-amber-300">Asset Value:</span>
              <span className="text-amber-100">{skrReceipt.assetValue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-300">Impact Score:</span>
              <div className="flex items-center gap-2">
                <span className="text-amber-100">{skrReceipt.impactScore}</span>
                <HolographicBadge variant="premium" glow={true} size="sm">
                  <Sparkles className="mr-1 h-3 w-3" />
                  {skrReceipt.impactScore >= 80 ? "EXCEPTIONAL" : "EXCELLENT"}
                </HolographicBadge>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() => {
              if (onComplete) {
                onComplete({
                  ...formData,
                  socialImpactNumber,
                  skrReceipt,
                })
              }
            }}
            className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-8 py-4 text-lg font-bold rounded-full shadow-lg shadow-amber-500/30"
          >
            <Crown className="mr-2 h-5 w-5" />
            Enter Global Citizen Portal
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-amber-950 to-indigo-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.2),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(251,191,36,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(251,191,36,0.1),rgba(255,255,255,0))]" />
      </div>

      {/* Progress bar */}
      {!registrationComplete && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 p-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 flex items-center justify-between text-sm text-amber-300">
              <span>Registration Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-amber-950/50"
              indicatorClassName="bg-gradient-to-r from-amber-500 to-yellow-600"
            />
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <HolographicGlassCard className="p-8">
            {!registrationComplete ? (
              <>
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-4">
                    <Globe className="h-8 w-8 text-amber-400" />
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
                      Global Citizen Token Registration
                    </h1>
                  </div>
                </div>

                {renderStepContent()}

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-6 py-3 rounded-full shadow-lg shadow-amber-500/30"
                  >
                    {step === 4 ? (
                      <>
                        <Key className="mr-2 h-5 w-5" />
                        Complete Registration
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              renderCompletionContent()
            )}
          </HolographicGlassCard>
        </div>
      </div>
    </div>
  )
}
