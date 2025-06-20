"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useGlobalCitizenship } from "@/contexts/global-citizenship-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Building, University, TrendingUp, CheckCircle, Clock, DollarSign, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const citizenshipTypes = [
  {
    type: "individual",
    icon: User,
    title: "Individual Global Citizen",
    subtitle: "Personal Global Citizenship",
    qgiAllocation: "$250,000",
    bondAllocation: "$8,333",
    description: "Perfect for individuals seeking global citizenship benefits and tax optimization",
    features: [
      "Social Impact QGI allocation",
      "Digital domicile establishment",
      "Tax benefit contract",
      "US 50-year Corporate Bond",
      "SNAPPCREDITCOM credit line replacement",
      "Global marketplace access",
    ],
    estimatedTime: "45 minutes",
    membershipFee: "$2,500",
  },
  {
    type: "business",
    icon: Building,
    title: "Business Global Citizenship",
    subtitle: "Corporate Global Citizenship",
    qgiAllocation: "$500,000 - $1,000,000",
    bondAllocation: "$16,667 - $33,333",
    description: "Ideal for businesses seeking international expansion and tax benefits",
    features: [
      "Institutional QGI allocation",
      "Corporate digital domicile",
      "Business tax optimization",
      "Proportional bond investment",
      "Enhanced credit facilities",
      "B2B marketplace privileges",
    ],
    estimatedTime: "90 minutes",
    membershipFee: "$10,000 - $25,000",
  },
  {
    type: "institution",
    icon: University,
    title: "Institutional Global Citizenship",
    subtitle: "Organizational Global Citizenship",
    qgiAllocation: "$750,000",
    bondAllocation: "$25,000",
    description: "Designed for institutions, nonprofits, and large organizations",
    features: [
      "Institutional QGI allocation",
      "Organizational digital domicile",
      "Institutional tax benefits",
      "Strategic bond portfolio",
      "Institutional credit access",
      "Exclusive institutional marketplace",
    ],
    estimatedTime: "120 minutes",
    membershipFee: "$15,000",
  },
]

export function GlobalCitizenshipOnboarding() {
  const {
    currentCitizen,
    onboardingProgress,
    qgiFunds,
    startRegistration,
    updateProfile,
    processMembershipPayment,
    establishDigitalDomicile,
    replaceCreditLine,
    getCitizenshipBenefits,
  } = useGlobalCitizenship()

  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<any>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const completedSteps = onboardingProgress.filter((step) => step.completed).length
  const totalSteps = onboardingProgress.length
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

  const handleTypeSelection = (type: string) => {
    setSelectedType(type)
    startRegistration(type as any)
  }

  const handleStepComplete = async (stepId: string) => {
    setIsProcessing(true)

    try {
      switch (stepId) {
        case "membership_payment":
          await processMembershipPayment({
            amount: Number.parseFloat(formData.membershipFee || "2500"),
            method: formData.paymentMethod || "card",
            recurringAmount: 500,
            frequency: "annually",
          })
          break

        case "digital_domicile":
          if (currentCitizen) {
            await establishDigitalDomicile(currentCitizen)
            replaceCreditLine(currentCitizen)
          }
          break

        default:
          // Handle other steps
          break
      }

      // Mark step as completed
      // This would typically update the onboarding progress
    } catch (error) {
      console.error("Step completion failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))

    if (currentCitizen) {
      updateProfile({ [field]: value })
    }
  }

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Global Citizenship Registration
            </motion.h1>
            <motion.p
              className="text-2xl italic font-serif text-amber-300/70 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Registratio Civitatis Globalis
            </motion.p>
            <motion.p
              className="text-gray-400 max-w-3xl mx-auto text-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join the QUICA Global Citizen community and unlock exclusive investment opportunities, tax benefits, and
              digital domicile advantages through our revolutionary QGI system.
            </motion.p>
          </div>

          {/* QGI Fund Performance Overview */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-400/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Social Impact QGI Fund
                </CardTitle>
                <CardDescription>Individual Global Citizens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Assets</span>
                    <span className="text-blue-400 font-semibold">
                      ${qgiFunds.social_impact?.totalAssets.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Participants</span>
                    <span className="text-blue-400 font-semibold">
                      {qgiFunds.social_impact?.participantCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">YTD Return</span>
                    <span className="text-green-400 font-semibold">
                      {((qgiFunds.social_impact?.performanceMetrics.ytdReturn || 0) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Social Impact Score</span>
                    <span className="text-amber-400 font-semibold">
                      {qgiFunds.social_impact?.socialImpactMetrics.sustainabilityScore.toFixed(1)}/10
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/20 to-amber-900/20 border-purple-400/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Institutional QGI Fund
                </CardTitle>
                <CardDescription>Business & Institutional Citizens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Assets</span>
                    <span className="text-purple-400 font-semibold">
                      ${qgiFunds.institutional?.totalAssets.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Participants</span>
                    <span className="text-purple-400 font-semibold">
                      {qgiFunds.institutional?.participantCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">YTD Return</span>
                    <span className="text-green-400 font-semibold">
                      {((qgiFunds.institutional?.performanceMetrics.ytdReturn || 0) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Community Impact</span>
                    <span className="text-amber-400 font-semibold">
                      {qgiFunds.institutional?.socialImpactMetrics.communityImpact.toFixed(1)}/10
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Citizenship Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {citizenshipTypes.map((citizenship, index) => {
              const Icon = citizenship.icon
              return (
                <motion.div
                  key={citizenship.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Card
                    className={cn(
                      "h-full cursor-pointer transition-all duration-300 hover:scale-105",
                      "bg-gradient-to-br from-black/40 to-purple-900/20 border-amber-400/20",
                      "hover:border-amber-400/40 hover:shadow-2xl hover:shadow-amber-400/10",
                    )}
                    onClick={() => handleTypeSelection(citizenship.type)}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-amber-400/20 to-purple-400/20 rounded-full w-fit">
                        <Icon className="w-8 h-8 text-amber-400" />
                      </div>
                      <CardTitle className="text-xl text-amber-400">{citizenship.title}</CardTitle>
                      <CardDescription className="text-amber-300/60 italic font-serif">
                        {citizenship.subtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-400 mb-1">{citizenship.qgiAllocation}</div>
                        <div className="text-sm text-gray-400">QGI Allocation</div>
                        <div className="text-lg font-semibold text-purple-400 mt-2">{citizenship.bondAllocation}</div>
                        <div className="text-xs text-gray-400">US 50yr Bond</div>
                      </div>

                      <Separator className="bg-amber-400/20" />

                      <p className="text-sm text-gray-300 text-center">{citizenship.description}</p>

                      <div className="space-y-2">
                        {citizenship.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-400">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                            {feature}
                          </div>
                        ))}
                        <div className="text-xs text-gray-500 text-center">
                          +{citizenship.features.length - 3} more benefits
                        </div>
                      </div>

                      <Separator className="bg-amber-400/20" />

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          {citizenship.estimatedTime}
                        </div>
                        <div className="flex items-center text-amber-400 font-semibold">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {citizenship.membershipFee}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold"
                        onClick={() => handleTypeSelection(citizenship.type)}
                      >
                        Start Registration
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Onboarding Flow UI would continue here...
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-amber-400">
              {citizenshipTypes.find((t) => t.type === selectedType)?.title} Registration
            </h1>
            <Badge variant="outline" className="text-amber-400 border-amber-400/30">
              Step {completedSteps + 1} of {totalSteps}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>{completedSteps} completed</span>
            <span>{totalSteps - completedSteps} remaining</span>
          </div>
        </div>

        {/* Current Step Content */}
        <Card className="bg-black/20 border-amber-400/20">
          <CardHeader>
            <CardTitle className="text-amber-400">
              {onboardingProgress[currentStep]?.title || "Registration Complete"}
            </CardTitle>
            <CardDescription>
              {onboardingProgress[currentStep]?.description || "Your global citizenship registration is complete!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step-specific content would be rendered here based on currentStep */}
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">
                Step content for {onboardingProgress[currentStep]?.id} would be implemented here.
              </p>
              <Button
                onClick={() => {
                  if (onboardingProgress[currentStep]) {
                    handleStepComplete(onboardingProgress[currentStep].id)
                  }
                  setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))
                }}
                disabled={isProcessing}
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold"
              >
                {isProcessing ? "Processing..." : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Summary */}
        {currentCitizen && (
          <Card className="mt-8 bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-400/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Your Global Citizenship Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getCitizenshipBenefits(currentCitizen.id).map((benefit, index) => (
                  <div key={index} className="flex items-center text-sm text-green-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    {benefit}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
