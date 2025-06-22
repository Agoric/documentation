"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Bot,
  Brain,
  Sparkles,
  Target,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
  Star,
  PieChart,
  Users,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface OnboardingStep {
  id: string
  title: string
  description: string
  type: "welcome" | "profile" | "goals" | "risk" | "preferences" | "verification" | "complete"
  fields: OnboardingField[]
  aiRecommendations?: string[]
  estimatedTime: number
}

interface OnboardingField {
  id: string
  label: string
  type: "text" | "email" | "number" | "select" | "checkbox" | "radio" | "textarea"
  required: boolean
  options?: string[]
  placeholder?: string
  validation?: (value: any) => boolean
  aiSuggestion?: string
}

interface UserProfile {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    country: string
  }
  financialProfile: {
    annualIncome: string
    netWorth: string
    investmentExperience: string
    currentInvestments: string[]
  }
  goals: {
    primaryGoal: string
    timeHorizon: string
    targetAmount: string
    riskTolerance: string
  }
  preferences: {
    communicationMethod: string
    updateFrequency: string
    advisoryLevel: string
    interests: string[]
  }
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to Snapifi",
    description: "Let our AI guide you through a personalized onboarding experience",
    type: "welcome",
    fields: [],
    estimatedTime: 1,
  },
  {
    id: "profile",
    title: "Personal Information",
    description: "Help us understand who you are",
    type: "profile",
    fields: [
      {
        id: "firstName",
        label: "First Name",
        type: "text",
        required: true,
        placeholder: "Enter your first name",
      },
      {
        id: "lastName",
        label: "Last Name",
        type: "text",
        required: true,
        placeholder: "Enter your last name",
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "your.email@example.com",
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "text",
        required: false,
        placeholder: "+1 (555) 123-4567",
      },
      {
        id: "country",
        label: "Country",
        type: "select",
        required: true,
        options: ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Other"],
      },
    ],
    estimatedTime: 3,
  },
  {
    id: "goals",
    title: "Investment Goals",
    description: "What are you looking to achieve?",
    type: "goals",
    fields: [
      {
        id: "primaryGoal",
        label: "Primary Investment Goal",
        type: "radio",
        required: true,
        options: [
          "Wealth Building",
          "Retirement Planning",
          "Income Generation",
          "Capital Preservation",
          "Education Funding",
          "Real Estate Investment",
        ],
      },
      {
        id: "timeHorizon",
        label: "Investment Time Horizon",
        type: "select",
        required: true,
        options: ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"],
      },
      {
        id: "targetAmount",
        label: "Target Investment Amount",
        type: "select",
        required: true,
        options: ["$1,000 - $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "$100,000 - $500,000", "$500,000+"],
      },
    ],
    aiRecommendations: [
      "Based on your age, a 10+ year horizon is typically recommended",
      "Wealth building goals pair well with diversified portfolios",
      "Consider starting with our QGI Social Impact program",
    ],
    estimatedTime: 4,
  },
  {
    id: "risk",
    title: "Risk Assessment",
    description: "Understanding your risk tolerance helps us recommend suitable investments",
    type: "risk",
    fields: [
      {
        id: "riskTolerance",
        label: "Risk Tolerance",
        type: "radio",
        required: true,
        options: [
          "Conservative - Preserve capital, minimal risk",
          "Moderate - Balanced growth with some risk",
          "Aggressive - Maximum growth, higher risk acceptable",
          "Ultra-Aggressive - Speculative investments welcome",
        ],
      },
      {
        id: "investmentExperience",
        label: "Investment Experience",
        type: "select",
        required: true,
        options: ["Beginner", "Some Experience", "Experienced", "Expert"],
      },
      {
        id: "currentInvestments",
        label: "Current Investment Types",
        type: "checkbox",
        required: false,
        options: ["Stocks", "Bonds", "Real Estate", "Cryptocurrency", "Commodities", "Private Equity", "None"],
      },
    ],
    aiRecommendations: [
      "Your risk profile suggests a balanced approach",
      "Consider our Imperial Real Estate portfolio",
      "Supreme Authority Bonds offer stable returns",
    ],
    estimatedTime: 5,
  },
  {
    id: "preferences",
    title: "Communication Preferences",
    description: "How would you like to stay informed?",
    type: "preferences",
    fields: [
      {
        id: "communicationMethod",
        label: "Preferred Communication",
        type: "checkbox",
        required: true,
        options: ["Email", "SMS", "Phone", "In-App Notifications", "Mail"],
      },
      {
        id: "updateFrequency",
        label: "Update Frequency",
        type: "radio",
        required: true,
        options: ["Daily", "Weekly", "Monthly", "Quarterly", "As Needed"],
      },
      {
        id: "advisoryLevel",
        label: "Advisory Service Level",
        type: "select",
        required: true,
        options: ["Self-Directed", "Guided", "Managed", "White-Glove"],
      },
    ],
    estimatedTime: 3,
  },
  {
    id: "verification",
    title: "Account Verification",
    description: "Secure your account with additional verification",
    type: "verification",
    fields: [
      {
        id: "twoFactor",
        label: "Enable Two-Factor Authentication",
        type: "checkbox",
        required: false,
        options: ["SMS", "Authenticator App", "Email"],
      },
      {
        id: "biometric",
        label: "Enable Biometric Authentication",
        type: "checkbox",
        required: false,
        options: ["Fingerprint", "Face Recognition"],
      },
    ],
    estimatedTime: 2,
  },
  {
    id: "complete",
    title: "Welcome to Your Financial Future",
    description: "Your account is ready! Here's what we've prepared for you.",
    type: "complete",
    fields: [],
    estimatedTime: 1,
  },
]

export function AIOnboardingSystem() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({})
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [aiInsights, setAiInsights] = useState<string[]>([])
  const [completionPercentage, setCompletionPercentage] = useState(0)

  const currentStepData = onboardingSteps[currentStep]
  const totalSteps = onboardingSteps.length

  useEffect(() => {
    setCompletionPercentage((currentStep / (totalSteps - 1)) * 100)
  }, [currentStep, totalSteps])

  // AI-powered insights based on user input
  useEffect(() => {
    if (currentStep > 1) {
      generateAIInsights()
    }
  }, [currentStep, formData])

  const generateAIInsights = () => {
    const insights: string[] = []

    if (formData.primaryGoal === "Wealth Building") {
      insights.push("💡 AI Recommendation: Consider our Quantum Investment Portfolio for maximum growth potential")
    }

    if (formData.riskTolerance?.includes("Conservative")) {
      insights.push("🛡️ AI Insight: Supreme Authority Bonds align perfectly with your conservative approach")
    }

    if (formData.targetAmount?.includes("$100,000+")) {
      insights.push("👑 AI Suggestion: You qualify for our Imperial tier with exclusive benefits")
    }

    if (formData.timeHorizon === "10+ years") {
      insights.push("📈 AI Analysis: Long-term horizon allows for compound growth strategies")
    }

    setAiInsights(insights)
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const handleNext = async () => {
    setIsLoading(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }

    setIsLoading(false)
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const renderField = (field: OnboardingField) => {
    const value = formData[field.id] || ""

    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <div key={field.id} className="space-y-2">
            <Label className="text-purple-200">{field.label}</Label>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="bg-purple-800/30 border-purple-600 text-purple-100"
              required={field.required}
            />
            {field.aiSuggestion && (
              <p className="text-amber-300 text-sm flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Suggestion: {field.aiSuggestion}
              </p>
            )}
          </div>
        )

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label className="text-purple-200">{field.label}</Label>
            <Textarea
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="bg-purple-800/30 border-purple-600 text-purple-100"
              required={field.required}
            />
          </div>
        )

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label className="text-purple-200">{field.label}</Label>
            <Select value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
              <SelectTrigger className="bg-purple-800/30 border-purple-600 text-purple-100">
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      case "radio":
        return (
          <div key={field.id} className="space-y-3">
            <Label className="text-purple-200">{field.label}</Label>
            <RadioGroup value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
              {field.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-purple-100 text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case "checkbox":
        return (
          <div key={field.id} className="space-y-3">
            <Label className="text-purple-200">{field.label}</Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={(value as string[])?.includes(option) || false}
                    onCheckedChange={(checked) => {
                      const currentValues = (value as string[]) || []
                      if (checked) {
                        handleFieldChange(field.id, [...currentValues, option])
                      } else {
                        handleFieldChange(
                          field.id,
                          currentValues.filter((v) => v !== option),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={option} className="text-purple-100 text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case "welcome":
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center"
            >
              <Bot className="w-12 h-12 text-white" />
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-amber-300 mb-4">Welcome to Snapifi</h2>
              <p className="text-purple-200 text-lg mb-6">
                Our AI will guide you through a personalized onboarding experience tailored to your financial goals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-purple-800/30 rounded-lg">
                  <Brain className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <h3 className="text-amber-300 font-semibold">AI-Powered</h3>
                  <p className="text-purple-200 text-sm">Intelligent recommendations based on your profile</p>
                </div>

                <div className="p-4 bg-purple-800/30 rounded-lg">
                  <Shield className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <h3 className="text-amber-300 font-semibold">Secure</h3>
                  <p className="text-purple-200 text-sm">Bank-level security for your information</p>
                </div>

                <div className="p-4 bg-purple-800/30 rounded-lg">
                  <Target className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <h3 className="text-amber-300 font-semibold">Personalized</h3>
                  <p className="text-purple-200 text-sm">Tailored to your unique financial situation</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "complete":
        return (
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 mx-auto bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold text-amber-300 mb-4">Welcome to Your Financial Future!</h2>
              <p className="text-purple-200 text-lg mb-6">
                Based on your profile, we've prepared personalized recommendations just for you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-amber-400/30">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <PieChart className="w-6 h-6 text-amber-400" />
                      <h3 className="text-amber-300 font-semibold">Recommended Portfolio</h3>
                    </div>
                    <p className="text-purple-200 text-sm mb-3">
                      Based on your {formData.riskTolerance?.split(" - ")[0]} risk tolerance
                    </p>
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600">View Portfolio</Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-800/30 to-indigo-800/30 border-amber-400/30">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Users className="w-6 h-6 text-amber-400" />
                      <h3 className="text-amber-300 font-semibold">Personal Advisor</h3>
                    </div>
                    <p className="text-purple-200 text-sm mb-3">{formData.advisoryLevel} service level assigned</p>
                    <Button variant="outline" className="w-full bg-purple-800/30 border-purple-600 text-purple-100">
                      Meet Your Advisor
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div className="space-y-4">{currentStepData.fields.map(renderField)}</div>

            {/* AI Insights */}
            {aiInsights.length > 0 && (
              <Card className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-amber-400/30">
                <CardHeader>
                  <CardTitle className="text-amber-300 flex items-center text-lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-amber-200 text-sm">{insight}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Step Recommendations */}
            {currentStepData.aiRecommendations && (
              <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-400/30">
                <CardHeader>
                  <CardTitle className="text-blue-300 flex items-center text-lg">
                    <Brain className="w-5 h-5 mr-2" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {currentStepData.aiRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-blue-200 text-sm">{rec}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-amber-300">AI-Powered Onboarding</h1>
            <Badge variant="outline" className="text-purple-200">
              Step {currentStep + 1} of {totalSteps}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-purple-200">Progress</span>
              <span className="text-purple-200">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-purple-300">
            <span>Estimated time: {currentStepData.estimatedTime} min</span>
            <span>
              Total time remaining:{" "}
              {onboardingSteps.slice(currentStep).reduce((sum, step) => sum + step.estimatedTime, 0)} min
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-amber-400/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-amber-300 text-xl">{currentStepData.title}</CardTitle>
            <CardDescription className="text-purple-200">{currentStepData.description}</CardDescription>
          </CardHeader>

          <CardContent>
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
          </CardContent>

          {/* Navigation */}
          <div className="p-6 border-t border-purple-600/30">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="bg-purple-800/30 border-purple-600 text-purple-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentStep ? "bg-amber-400 w-8" : i < currentStep ? "bg-green-400" : "bg-purple-600"
                    }`}
                  />
                ))}
              </div>

              {currentStep < totalSteps - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 mr-2"
                      >
                        <Zap className="w-4 h-4" />
                      </motion.div>
                      AI Processing...
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    /* Handle completion */
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Complete Setup
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
