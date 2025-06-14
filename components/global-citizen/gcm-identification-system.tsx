"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Crown,
  Shield,
  Diamond,
  Globe,
  CheckCircle2,
  ArrowRight,
  Fingerprint,
  Scale,
  BanknoteIcon as Bank,
  Key,
  Scroll,
} from "lucide-react"
import { RoyalHolographicTitle } from "@/components/ui/royal-holographic-title"
import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"
import { ImperialCoinDisplay } from "@/components/ui/imperial-coin-display"

interface GCMSystemProps {
  onComplete?: (citizenData: any) => void
}

export function GCMIdentificationSystem({ onComplete }: GCMSystemProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState({
    // GCM Registration
    legalName: "",
    originCountry: "",
    currentResidence: "",
    occupation: "",

    // Domicile Request
    chosenDomicileName: "",
    digitalIdentityName: "",
    domicileJustification: "",

    // Citizen Declaration
    acceptsDigitization: false,
    acceptsJurisdiction: false,
    acceptsTerms: false,
  })

  const [certificates, setCertificates] = useState({
    gcm: null,
    gci: null,
    gcit: null,
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    {
      id: 1,
      title: "GCM Global Membership",
      description: "Initial platform prerequisite registration",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Domicile Request",
      description: "Establish digital jurisdiction residency",
      icon: Crown,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Citizens Declaration",
      description: "Digitization Certificate acceptance",
      icon: Scroll,
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: 4,
      title: "GCI Token Issuance",
      description: "Legal entity formation completion",
      icon: Diamond,
      color: "from-emerald-500 to-teal-500",
    },
  ]

  useEffect(() => {
    setProgress((currentStep / steps.length) * 100)
  }, [currentStep])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateGCIToken = () => {
    const timestamp = Date.now()
    const gcitNumber = `GCIT-${timestamp.toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`

    return {
      gcitNumber,
      legalOrigin: formData.originCountry,
      legalName: formData.legalName,
      domiciledName: formData.chosenDomicileName,
      digitalIdentity: formData.digitalIdentityName,
      conceptionDate: new Date().toISOString(),
      fiscalStartDate: new Date().toISOString(),
      maturityTerms: {
        principal: 70000,
        termYears: 50,
        interestRate: 0.269,
        maturityValue: 70000 * Math.pow(1 + 0.00269, 50),
      },
      jurisdiction: "Supreme Authority Global Digital Jurisdiction",
      trustee: "iBank&Trust Digital Custody Services",
    }
  }

  const handleStepComplete = async () => {
    setIsProcessing(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (currentStep === 4) {
      // Generate final GCI token
      const gciToken = generateGCIToken()
      setCertificates((prev) => ({ ...prev, gci: gciToken }))

      if (onComplete) {
        onComplete({
          ...formData,
          gciToken,
          completedSteps: [...completedSteps, currentStep],
        })
      }
    }

    setCompletedSteps((prev) => [...prev, currentStep])

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }

    setIsProcessing(false)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <RoyalHolographicTitle size="large" className="mb-4">
                Global Citizen Membership Registration
              </RoyalHolographicTitle>
              <p className="text-amber-200/80 text-lg">
                Establish your foundational membership for platform transaction eligibility
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="legalName" className="text-amber-200 font-medium">
                  Legal Full Name
                </Label>
                <Input
                  id="legalName"
                  value={formData.legalName}
                  onChange={(e) => handleInputChange("legalName", e.target.value)}
                  placeholder="Enter your complete legal name"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="originCountry" className="text-amber-200 font-medium">
                  Country of Legal Origin
                </Label>
                <Input
                  id="originCountry"
                  value={formData.originCountry}
                  onChange={(e) => handleInputChange("originCountry", e.target.value)}
                  placeholder="Your birth/citizenship country"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="currentResidence" className="text-amber-200 font-medium">
                  Current Residence
                </Label>
                <Input
                  id="currentResidence"
                  value={formData.currentResidence}
                  onChange={(e) => handleInputChange("currentResidence", e.target.value)}
                  placeholder="Current country of residence"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="occupation" className="text-amber-200 font-medium">
                  Primary Occupation
                </Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  placeholder="Your professional occupation"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100"
                  required
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-950/50 to-cyan-950/50 rounded-xl p-6 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-300">Membership Benefits</h3>
              </div>
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  Platform transaction eligibility
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  Access to DAX digital asset exchange
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  Formal domicile application rights
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  Legal entity formation pathway
                </li>
              </ul>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <RoyalHolographicTitle size="large" className="mb-4">
                Digital Domicile Request
              </RoyalHolographicTitle>
              <p className="text-amber-200/80 text-lg">
                Establish your residence within Supreme Authority Global Digital Jurisdiction
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="chosenDomicileName" className="text-amber-200 font-medium">
                  Chosen Domicile Name
                </Label>
                <Input
                  id="chosenDomicileName"
                  value={formData.chosenDomicileName}
                  onChange={(e) => handleInputChange("chosenDomicileName", e.target.value)}
                  placeholder="Your preferred name within digital jurisdiction"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="digitalIdentityName" className="text-amber-200 font-medium">
                  Digital Identity Name
                </Label>
                <Input
                  id="digitalIdentityName"
                  value={formData.digitalIdentityName}
                  onChange={(e) => handleInputChange("digitalIdentityName", e.target.value)}
                  placeholder="Your digital representation name"
                  className="border-amber-500/30 bg-amber-950/30 text-amber-100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="domicileJustification" className="text-amber-200 font-medium">
                  Domicile Justification
                </Label>
                <Textarea
                  id="domicileJustification"
                  value={formData.domicileJustification}
                  onChange={(e) => handleInputChange("domicileJustification", e.target.value)}
                  placeholder="Explain your reasons for seeking digital domicile status"
                  className="min-h-[120px] border-amber-500/30 bg-amber-950/30 text-amber-100"
                  required
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-bold text-purple-300">Domicile Rights</h3>
              </div>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-purple-400" />
                  Legal representation within digital jurisdiction
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-400" />
                  Protection under Supreme Authority bylaws
                </li>
                <li className="flex items-center gap-2">
                  <Bank className="h-4 w-4 text-purple-400" />
                  Access to iBank&Trust custody services
                </li>
                <li className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-purple-400" />
                  Full transaction and negotiation rights
                </li>
              </ul>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <RoyalHolographicTitle size="large" className="mb-4">
                Citizens Declaration of Digitization
              </RoyalHolographicTitle>
              <p className="text-amber-200/80 text-lg">
                Accept the terms and conditions for digital citizenship certification
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-950/50 to-yellow-950/50 rounded-xl p-6 border border-amber-500/30">
                <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
                  <Scroll className="h-6 w-6" />
                  Digital Rights & Responsibilities
                </h3>
                <div className="space-y-4 text-amber-200">
                  <p>
                    By accepting digitization, you acknowledge and agree to the following rights and responsibilities:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li>• Right to own, accept, liquidate, transact, transfer, and negotiate digital instruments</li>
                    <li>• Subordination to Supreme Authority Global Digital Jurisdiction bylaws</li>
                    <li>• Compliance with DAX ledger chain protocols and commands</li>
                    <li>• Recognition of iBank&Trust as designated trustee for digital assets</li>
                    <li>• Acceptance of $70,000 maturity terms over 50-year period at 0.269% rate</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="acceptsDigitization"
                    checked={formData.acceptsDigitization}
                    onChange={(e) => handleInputChange("acceptsDigitization", e.target.checked)}
                    className="w-5 h-5 text-amber-500 bg-amber-950/30 border-amber-500/30 rounded focus:ring-amber-500"
                  />
                  <Label htmlFor="acceptsDigitization" className="text-amber-200 font-medium">
                    I accept the Citizens Declaration of Digitization Certificate
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="acceptsJurisdiction"
                    checked={formData.acceptsJurisdiction}
                    onChange={(e) => handleInputChange("acceptsJurisdiction", e.target.checked)}
                    className="w-5 h-5 text-amber-500 bg-amber-950/30 border-amber-500/30 rounded focus:ring-amber-500"
                  />
                  <Label htmlFor="acceptsJurisdiction" className="text-amber-200 font-medium">
                    I accept subordination to Supreme Authority Global Digital Jurisdiction
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="acceptsTerms"
                    checked={formData.acceptsTerms}
                    onChange={(e) => handleInputChange("acceptsTerms", e.target.checked)}
                    className="w-5 h-5 text-amber-500 bg-amber-950/30 border-amber-500/30 rounded focus:ring-amber-500"
                  />
                  <Label htmlFor="acceptsTerms" className="text-amber-200 font-medium">
                    I accept the 50-year maturity terms and financial obligations
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <RoyalHolographicTitle size="large" className="mb-4">
                GCI Token Generation
              </RoyalHolographicTitle>
              <p className="text-amber-200/80 text-lg">Final step: Legal entity formation and token issuance</p>
            </div>

            {certificates.gci ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 rounded-xl border-4 border-gray-400 shadow-2xl relative overflow-hidden">
                      {/* Diamond clarity effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/40 to-transparent opacity-60" />

                      {/* Silver tint overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-400/30 to-gray-200/30" />

                      {/* Diamond shimmer */}
                      <div className="absolute inset-0 animate-pulse">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent transform rotate-45 animate-spin"
                          style={{ animationDuration: "8s" }}
                        />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col items-center justify-center text-gray-800">
                        <Diamond className="h-8 w-8 mb-2" />
                        <div className="text-xs font-bold">GCI</div>
                        <div className="text-xs">TOKEN</div>
                      </div>
                    </div>
                  </div>

                  <Badge className="bg-gradient-to-r from-gray-400 to-gray-600 text-white mb-4">
                    Silver Tinted • Diamond Clarity
                  </Badge>
                </div>

                <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-gray-500/30">
                  <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
                    <Fingerprint className="h-6 w-6" />
                    Global Citizen Identity Certificate
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">GCIT Number:</span>
                      <div className="font-mono text-gray-200 bg-gray-800/50 p-2 rounded mt-1">
                        {certificates.gci.gcitNumber}
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-400">Legal Origin:</span>
                      <div className="text-gray-200 mt-1">{certificates.gci.legalOrigin}</div>
                    </div>

                    <div>
                      <span className="text-gray-400">Legal Name:</span>
                      <div className="text-gray-200 mt-1">{certificates.gci.legalName}</div>
                    </div>

                    <div>
                      <span className="text-gray-400">Domiciled Name:</span>
                      <div className="text-gray-200 mt-1">{certificates.gci.domiciledName}</div>
                    </div>

                    <div>
                      <span className="text-gray-400">Digital Identity:</span>
                      <div className="text-gray-200 mt-1">{certificates.gci.digitalIdentity}</div>
                    </div>

                    <div>
                      <span className="text-gray-400">Fiscal Start Date:</span>
                      <div className="text-gray-200 mt-1">
                        {new Date(certificates.gci.fiscalStartDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4 bg-gray-600" />

                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-300">Maturity Terms</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Principal:</span>
                        <div className="text-green-400 font-bold">
                          ${certificates.gci.maturityTerms.principal.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">Term:</span>
                        <div className="text-gray-200">{certificates.gci.maturityTerms.termYears} years</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Rate:</span>
                        <div className="text-gray-200">{certificates.gci.maturityTerms.interestRate}%</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Maturity Value:</span>
                        <div className="text-green-400 font-bold">
                          ${certificates.gci.maturityTerms.maturityValue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4 bg-gray-600" />

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">Jurisdiction:</span>
                      <div className="text-gray-200">{certificates.gci.jurisdiction}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Trustee:</span>
                      <div className="text-gray-200">{certificates.gci.trustee}</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg px-6 py-2">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Legal Entity Formation Complete
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Diamond className="h-12 w-12 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-emerald-300 mb-2">Ready for Token Generation</h3>
                  <p className="text-emerald-200/80">
                    Click below to generate your GCI token and complete legal entity formation
                  </p>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.legalName && formData.originCountry && formData.currentResidence && formData.occupation
      case 2:
        return formData.chosenDomicileName && formData.digitalIdentityName && formData.domicileJustification
      case 3:
        return formData.acceptsDigitization && formData.acceptsJurisdiction && formData.acceptsTerms
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-amber-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,69,19,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(75,0,130,0.1),rgba(255,255,255,0))]" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4 text-center">
          <ImperialCoinDisplay size="hero" className="mb-6" />
          <RoyalHolographicTitle size="xl" className="mb-4">
            Global Citizen Membership System
          </RoyalHolographicTitle>
          <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
            Complete your journey to digital citizenship and unlock full platform transaction rights
          </p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="relative z-10 px-4 mb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${
                    completedSteps.includes(step.id)
                      ? "bg-green-500 border-green-400 text-white"
                      : currentStep === step.id
                        ? "bg-amber-500 border-amber-400 text-white"
                        : "bg-gray-700 border-gray-600 text-gray-400"
                  }
                `}
                >
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                    w-16 h-1 mx-2 transition-all duration-300
                    ${completedSteps.includes(step.id) ? "bg-green-500" : "bg-gray-600"}
                  `}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-2">
            <span className="text-amber-300 font-medium">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
            </span>
          </div>

          <Progress
            value={progress}
            className="h-3 bg-gray-800"
            indicatorClassName="bg-gradient-to-r from-amber-500 to-yellow-600"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <HolographicGlassCard className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-amber-500/30">
              <div>
                {currentStep > 1 && !completedSteps.includes(currentStep) && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                  >
                    Previous Step
                  </Button>
                )}
              </div>

              <div>
                {!completedSteps.includes(currentStep) && (
                  <Button
                    onClick={handleStepComplete}
                    disabled={!canProceed() || isProcessing}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 px-8 py-3 text-lg font-bold rounded-full shadow-lg shadow-amber-500/30"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : currentStep === 4 ? (
                      <>
                        <Diamond className="mr-2 h-5 w-5" />
                        Generate GCI Token
                      </>
                    ) : (
                      <>
                        Complete Step
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                )}

                {completedSteps.includes(currentStep) && currentStep < steps.length && (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-8 py-3 text-lg font-bold rounded-full"
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}

                {completedSteps.includes(4) && (
                  <Button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 px-8 py-3 text-lg font-bold rounded-full"
                  >
                    <Crown className="mr-2 h-5 w-5" />
                    Enter Platform
                  </Button>
                )}
              </div>
            </div>
          </HolographicGlassCard>
        </div>
      </div>
    </div>
  )
}
