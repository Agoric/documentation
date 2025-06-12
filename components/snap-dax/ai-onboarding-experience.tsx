"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HolographicGlassCard } from "./holographic-glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { HolographicBadge } from "./holographic-badge"
import { RotatingHolographicCoin } from "@/components/ui/rotating-holographic-coin"
import {
  ChevronRight,
  Sparkles,
  Lock,
  Unlock,
  Shield,
  BarChart3,
  Home,
  Building,
  Briefcase,
  Lightbulb,
  Zap,
  Send,
  User,
  Bot,
  Clock,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
}

interface OnboardingStep {
  id: string
  type: "welcome" | "question" | "product-intro" | "unlock" | "completion"
  title: string
  description?: string
  messages?: Message[]
  options?: {
    id: string
    label: string
    value: string
    icon?: React.ReactNode
    unlocksFeature?: string
  }[]
  inputType?: "text" | "textarea" | "slider" | "radio" | "checkbox" | "none"
  inputLabel?: string
  inputPlaceholder?: string
  productDetails?: {
    name: string
    description: string
    icon: React.ReactNode
    benefits: string[]
    image?: string
  }
  unlockRequirement?: string
  nextStep?: string | ((response: any) => string)
}

// Define the onboarding flow
const onboardingSteps: Record<string, OnboardingStep> = {
  welcome: {
    id: "welcome",
    type: "welcome",
    title: "Welcome to SNAP-DAX",
    description: "The world's most advanced financial platform",
    messages: [
      {
        id: 1,
        role: "system",
        content:
          "Welcome to SNAP-DAX, the revolutionary financial platform that brings unprecedented tools, instruments, and strategies to your fingertips.",
        timestamp: "Just now",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "I'm your AI Concierge, and I'll guide you through our platform's revolutionary capabilities. Together, we'll unlock financial tools the world has only dreamed about until now.",
        timestamp: "Just now",
      },
    ],
    nextStep: "financial-goals",
  },
  "financial-goals": {
    id: "financial-goals",
    type: "question",
    title: "Your Financial Aspirations",
    description: "What are your primary financial goals?",
    inputType: "radio",
    options: [
      {
        id: "wealth-building",
        label: "Building Wealth",
        value: "wealth-building",
        icon: <Briefcase className="h-5 w-5" />,
        unlocksFeature: "quantum-portfolio-optimizer",
      },
      {
        id: "real-estate",
        label: "Real Estate Acquisition",
        value: "real-estate",
        icon: <Home className="h-5 w-5" />,
        unlocksFeature: "tokenized-real-estate",
      },
      {
        id: "business",
        label: "Business Expansion",
        value: "business",
        icon: <Building className="h-5 w-5" />,
        unlocksFeature: "business-intelligence-suite",
      },
      {
        id: "innovation",
        label: "Financial Innovation",
        value: "innovation",
        icon: <Lightbulb className="h-5 w-5" />,
        unlocksFeature: "neural-market-predictor",
      },
    ],
    nextStep: (response) => {
      if (response === "real-estate") return "real-estate-intro"
      if (response === "wealth-building") return "investment-experience"
      if (response === "business") return "business-scale"
      return "risk-tolerance"
    },
  },
  "real-estate-intro": {
    id: "real-estate-intro",
    type: "product-intro",
    title: "Tokenized Real Estate Platform",
    productDetails: {
      name: "Tokenized Real Estate Platform",
      description:
        "Revolutionary approach to property investment through fractional ownership and blockchain technology",
      icon: <Building className="h-8 w-8 text-indigo-400" />,
      benefits: [
        "Access premium properties with fractional investment",
        "Instant liquidity through tokenized ownership",
        "Automated dividend distribution from rental income",
        "AI-powered property value forecasting",
        "Quantum-secured blockchain ledger",
      ],
      image: "/modern-family-home.png",
    },
    nextStep: "property-preference",
  },
  "property-preference": {
    id: "property-preference",
    type: "question",
    title: "Property Preferences",
    description: "What type of properties are you most interested in?",
    inputType: "radio",
    options: [
      {
        id: "residential",
        label: "Residential",
        value: "residential",
        icon: <Home className="h-5 w-5" />,
      },
      {
        id: "commercial",
        label: "Commercial",
        value: "commercial",
        icon: <Building className="h-5 w-5" />,
        unlocksFeature: "commercial-analytics",
      },
      {
        id: "mixed-use",
        label: "Mixed-Use",
        value: "mixed-use",
        icon: <Briefcase className="h-5 w-5" />,
      },
      {
        id: "international",
        label: "International",
        value: "international",
        icon: <Zap className="h-5 w-5" />,
        unlocksFeature: "global-property-network",
      },
    ],
    nextStep: "investment-capacity",
  },
  "investment-capacity": {
    id: "investment-capacity",
    type: "question",
    title: "Investment Capacity",
    description: "What is your approximate investment capacity for the next 12 months?",
    inputType: "slider",
    inputLabel: "Investment Capacity",
    nextStep: "unlock-real-estate-ai",
  },
  "unlock-real-estate-ai": {
    id: "unlock-real-estate-ai",
    type: "unlock",
    title: "Unlock Real Estate AI Advisor",
    description: "Share your email to unlock our AI-powered Real Estate Advisor",
    inputType: "text",
    inputLabel: "Email Address",
    inputPlaceholder: "your.email@example.com",
    unlockRequirement: "Valid email address",
    nextStep: "risk-tolerance",
  },
  "risk-tolerance": {
    id: "risk-tolerance",
    type: "question",
    title: "Risk Tolerance Assessment",
    description: "How would you describe your risk tolerance for financial investments?",
    inputType: "radio",
    options: [
      {
        id: "conservative",
        label: "Conservative",
        value: "conservative",
        icon: <Shield className="h-5 w-5" />,
      },
      {
        id: "moderate",
        label: "Moderate",
        value: "moderate",
        icon: <BarChart3 className="h-5 w-5" />,
      },
      {
        id: "aggressive",
        label: "Aggressive",
        value: "aggressive",
        icon: <Zap className="h-5 w-5" />,
        unlocksFeature: "quantum-trading-algorithms",
      },
      {
        id: "visionary",
        label: "Visionary",
        value: "visionary",
        icon: <Sparkles className="h-5 w-5" />,
        unlocksFeature: "neural-market-predictor",
      },
    ],
    nextStep: "quantum-computing-intro",
  },
  "investment-experience": {
    id: "investment-experience",
    type: "question",
    title: "Investment Experience",
    description: "How would you rate your investment experience?",
    inputType: "radio",
    options: [
      {
        id: "beginner",
        label: "Beginner",
        value: "beginner",
        icon: <User className="h-5 w-5" />,
      },
      {
        id: "intermediate",
        label: "Intermediate",
        value: "intermediate",
        icon: <BarChart3 className="h-5 w-5" />,
      },
      {
        id: "advanced",
        label: "Advanced",
        value: "advanced",
        icon: <Briefcase className="h-5 w-5" />,
        unlocksFeature: "advanced-trading-suite",
      },
      {
        id: "expert",
        label: "Expert",
        value: "expert",
        icon: <Sparkles className="h-5 w-5" />,
        unlocksFeature: "institutional-tools",
      },
    ],
    nextStep: "risk-tolerance",
  },
  "business-scale": {
    id: "business-scale",
    type: "question",
    title: "Business Scale",
    description: "What is the current scale of your business?",
    inputType: "radio",
    options: [
      {
        id: "startup",
        label: "Startup",
        value: "startup",
        icon: <Lightbulb className="h-5 w-5" />,
      },
      {
        id: "small",
        label: "Small Business",
        value: "small",
        icon: <Building className="h-5 w-5" />,
      },
      {
        id: "medium",
        label: "Medium Enterprise",
        value: "medium",
        icon: <Briefcase className="h-5 w-5" />,
        unlocksFeature: "enterprise-analytics",
      },
      {
        id: "large",
        label: "Large Corporation",
        value: "large",
        icon: <BarChart3 className="h-5 w-5" />,
        unlocksFeature: "corporate-suite",
      },
    ],
    nextStep: "risk-tolerance",
  },
  "quantum-computing-intro": {
    id: "quantum-computing-intro",
    type: "product-intro",
    title: "Quantum Computing Financial Suite",
    productDetails: {
      name: "Quantum Computing Financial Suite",
      description: "Harness the power of quantum computing for unprecedented financial analysis and optimization",
      icon: <Zap className="h-8 w-8 text-indigo-400" />,
      benefits: [
        "Process complex financial models in seconds",
        "Identify market patterns invisible to traditional systems",
        "Optimize investment portfolios with quantum algorithms",
        "Predict market movements with quantum machine learning",
        "Secure transactions with quantum-resistant cryptography",
      ],
      image: "/quantum-computing-concept.png",
    },
    nextStep: "unlock-quantum-access",
  },
  "unlock-quantum-access": {
    id: "unlock-quantum-access",
    type: "unlock",
    title: "Unlock Quantum Computing Access",
    description: "Share your phone number to unlock our Quantum Computing Financial Suite",
    inputType: "text",
    inputLabel: "Phone Number",
    inputPlaceholder: "+1 (555) 123-4567",
    unlockRequirement: "Valid phone number",
    nextStep: "ai-concierge-intro",
  },
  "ai-concierge-intro": {
    id: "ai-concierge-intro",
    type: "product-intro",
    title: "AI Financial Concierge",
    productDetails: {
      name: "AI Financial Concierge",
      description: "Your personal AI assistant for navigating the complex world of finance",
      icon: <RotatingHolographicCoin size="sm" speed="medium" glow={false} />,
      benefits: [
        "24/7 personalized financial guidance",
        "Natural language interface for complex financial queries",
        "Proactive investment opportunities identification",
        "Automated financial planning and goal tracking",
        "Seamless integration with all platform tools",
      ],
      image: "/ai-assistant-concept.png",
    },
    nextStep: "financial-interests",
  },
  "financial-interests": {
    id: "financial-interests",
    type: "question",
    title: "Financial Interests",
    description: "Which financial areas are you most interested in exploring?",
    inputType: "textarea",
    inputLabel: "Your Interests",
    inputPlaceholder:
      "Tell us about your financial interests, goals, and what you hope to achieve with our platform...",
    nextStep: "completion",
  },
  completion: {
    id: "completion",
    type: "completion",
    title: "Onboarding Complete",
    description: "You've unlocked revolutionary financial tools",
    nextStep: "dashboard",
  },
}

interface AIOnboardingExperienceProps {
  onComplete?: (userData: any) => void
  initialStep?: string
}

export function AIOnboardingExperience({ onComplete, initialStep = "welcome" }: AIOnboardingExperienceProps) {
  const [currentStepId, setCurrentStepId] = useState(initialStep)
  const [userData, setUserData] = useState<Record<string, any>>({})
  const [progress, setProgress] = useState(0)
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const totalSteps = Object.keys(onboardingSteps).length - 1 // Exclude completion

  const currentStep = onboardingSteps[currentStepId]

  useEffect(() => {
    // Initialize messages if the step has them
    if (currentStep.messages) {
      setMessages(currentStep.messages)
    }

    // Calculate progress
    const stepIndex = Object.keys(onboardingSteps).indexOf(currentStepId)
    const newProgress = Math.min(100, Math.round((stepIndex / totalSteps) * 100))
    setProgress(newProgress)

    // Simulate typing for new messages
    if (currentStep.messages && currentStep.messages.length > 0) {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
      }, 1000)
    }
  }, [currentStepId, currentStep, totalSteps])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleNext = (value?: any) => {
    // Save user response
    if (value !== undefined) {
      const updatedUserData = { ...userData, [currentStepId]: value }
      setUserData(updatedUserData)

      // Check if this response unlocks a feature
      if (currentStep.options) {
        const selectedOption = currentStep.options.find((option) => option.value === value)
        if (selectedOption?.unlocksFeature && !unlockedFeatures.includes(selectedOption.unlocksFeature)) {
          setUnlockedFeatures([...unlockedFeatures, selectedOption.unlocksFeature])

          // Add a system message about unlocking a feature
          const newMessage: Message = {
            id: Date.now(),
            role: "system",
            content: `🔓 You've unlocked access to our ${selectedOption.unlocksFeature.replace(/-/g, " ")}!`,
            timestamp: "Just now",
          }
          setMessages((prev) => [...prev, newMessage])
        }
      }

      // Add user message
      const userMessage: Message = {
        id: Date.now(),
        role: "user",
        content: typeof value === "string" ? value : JSON.stringify(value),
        timestamp: "Just now",
      }
      setMessages((prev) => [...prev, userMessage])

      // Simulate AI response
      setIsTyping(true)
      setTimeout(() => {
        let responseContent = ""

        if (currentStep.type === "question") {
          responseContent = getAIResponseForQuestion(currentStepId, value)
        } else if (currentStep.type === "unlock") {
          responseContent = `Thank you for providing your ${currentStep.inputLabel?.toLowerCase()}. You've successfully unlocked additional features!`
        }

        if (responseContent) {
          const aiMessage: Message = {
            id: Date.now() + 1,
            role: "assistant",
            content: responseContent,
            timestamp: "Just now",
          }
          setMessages((prev) => [...prev, aiMessage])
        }

        setIsTyping(false)
      }, 1500)
    }

    // Determine next step
    let nextStepId = ""
    if (typeof currentStep.nextStep === "function") {
      nextStepId = currentStep.nextStep(value)
    } else if (typeof currentStep.nextStep === "string") {
      nextStepId = currentStep.nextStep
    }

    if (nextStepId === "dashboard") {
      // Onboarding complete
      if (onComplete) {
        onComplete(userData)
      }
    } else if (nextStepId) {
      setCurrentStepId(nextStepId)
      setInputValue("")
    }
  }

  const getAIResponseForQuestion = (stepId: string, value: any): string => {
    switch (stepId) {
      case "financial-goals":
        return value === "real-estate"
          ? "Real estate is an excellent choice for building long-term wealth. Our tokenized real estate platform will revolutionize how you invest in properties."
          : value === "wealth-building"
            ? "Building wealth requires strategic planning and advanced tools. Our quantum computing financial suite will give you an unprecedented edge."
            : value === "business"
              ? "Growing your business demands sophisticated financial instruments. Our AI-powered business intelligence tools will help you scale efficiently."
              : "Innovation drives financial evolution. Our neural market prediction system will help you stay ahead of emerging trends."

      case "risk-tolerance":
        return value === "conservative"
          ? "A conservative approach prioritizes capital preservation. I'll configure your dashboard to highlight our quantum-secured stable investment options."
          : value === "moderate"
            ? "A balanced approach to risk and reward. Our AI will recommend a diversified portfolio with moderate growth potential."
            : value === "aggressive"
              ? "You're comfortable with higher volatility for greater returns. I'll unlock our quantum trading algorithms designed for aggressive growth strategies."
              : "As a visionary investor, you seek cutting-edge opportunities. Our neural market predictor will help you identify emerging trends before they become mainstream."

      case "property-preference":
        return `${value.charAt(0).toUpperCase() + value.slice(1)} properties offer unique advantages. I'll customize your tokenized real estate dashboard to prioritize ${value} opportunities.`

      default:
        return "Thank you for sharing this information. I'm customizing your experience based on your preferences."
    }
  }

  const renderStepContent = () => {
    switch (currentStep.type) {
      case "welcome":
        return (
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <RotatingHolographicCoin size="lg" speed="medium" glow={true} />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-2 text-2xl font-bold text-indigo-100"
            >
              {currentStep.title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 text-indigo-300"
            >
              {currentStep.description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                onClick={() => handleNext()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              >
                Begin Your Journey
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        )

      case "question":
        return (
          <div className="flex flex-col">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-2 text-xl font-bold text-indigo-100"
            >
              {currentStep.title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-indigo-300"
            >
              {currentStep.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              {currentStep.inputType === "radio" && currentStep.options && (
                <RadioGroup onValueChange={(value) => handleNext(value)} className="grid gap-4 md:grid-cols-2">
                  {currentStep.options.map((option) => (
                    <Label key={option.id} htmlFor={option.id} className="cursor-pointer">
                      <RadioGroupItem value={option.value} id={option.id} className="peer sr-only" />
                      <div className="peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-950/50 flex items-center gap-4 rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-4 transition-all hover:border-indigo-500/40 hover:bg-indigo-950/40">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-400 peer-data-[state=checked]:from-indigo-600 peer-data-[state=checked]:to-purple-600 peer-data-[state=checked]:text-white">
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-indigo-200 peer-data-[state=checked]:text-indigo-100">
                            {option.label}
                          </p>
                          {option.unlocksFeature && (
                            <div className="mt-1">
                              <HolographicBadge variant="tokenized" glow={true} size="sm">
                                <Unlock className="mr-1 h-3 w-3" />
                                Unlocks Feature
                              </HolographicBadge>
                            </div>
                          )}
                        </div>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              )}

              {currentStep.inputType === "slider" && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-2 block text-indigo-200">{currentStep.inputLabel}</Label>
                    <div className="px-2">
                      <Slider
                        defaultValue={[50000]}
                        max={1000000}
                        step={10000}
                        onValueChange={(value) => setInputValue(value[0].toString())}
                        className="py-4"
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-indigo-400">
                      <span>$10,000</span>
                      <span>$1,000,000+</span>
                    </div>
                  </div>
                  <div className="text-center text-xl font-bold text-indigo-100">
                    ${Number.parseInt(inputValue || "50000").toLocaleString()}
                  </div>
                  <Button
                    onClick={() => handleNext(inputValue || "50000")}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {currentStep.inputType === "text" && (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-indigo-200">{currentStep.inputLabel}</Label>
                    <Input
                      type="text"
                      placeholder={currentStep.inputPlaceholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="border-indigo-500/20 bg-indigo-950/30 text-indigo-100 placeholder:text-indigo-400/50"
                    />
                  </div>
                  <Button
                    onClick={() => handleNext(inputValue)}
                    disabled={!inputValue}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-600/50 disabled:to-purple-600/50"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {currentStep.inputType === "textarea" && (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-indigo-200">{currentStep.inputLabel}</Label>
                    <Textarea
                      placeholder={currentStep.inputPlaceholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="min-h-[120px] border-indigo-500/20 bg-indigo-950/30 text-indigo-100 placeholder:text-indigo-400/50"
                    />
                  </div>
                  <Button
                    onClick={() => handleNext(inputValue)}
                    disabled={!inputValue}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-600/50 disabled:to-purple-600/50"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )

      case "product-intro":
        return (
          <div className="flex flex-col">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-2 text-xl font-bold text-indigo-100"
            >
              {currentStep.title}
            </motion.h2>

            {currentStep.productDetails && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <img
                      src={
                        currentStep.productDetails.image ||
                        "/placeholder.svg?height=300&width=600&query=futuristic+financial+technology" ||
                        "/placeholder.svg"
                      }
                      alt={currentStep.productDetails.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent" />
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, transparent 50%, rgba(168, 85, 247, 0.3) 100%)",
                        mixBlendMode: "overlay",
                      }}
                    />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
                        {currentStep.productDetails.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{currentStep.productDetails.name}</h3>
                        <HolographicBadge variant="tokenized" glow={true} size="sm">
                          <Sparkles className="mr-1 h-3 w-3" />
                          Revolutionary Technology
                        </HolographicBadge>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-indigo-300">{currentStep.productDetails.description}</p>

                <div className="space-y-2">
                  <h4 className="font-medium text-indigo-200">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {currentStep.productDetails.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                        className="flex items-start gap-2 text-indigo-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-400" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-6"
                >
                  <Button
                    onClick={() => handleNext()}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                  >
                    Explore This Feature
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        )

      case "unlock":
        return (
          <div className="flex flex-col">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 animate-pulse rounded-full bg-indigo-500/20 blur-md"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Unlock className="h-8 w-8 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-2 text-center text-xl font-bold text-indigo-100"
            >
              {currentStep.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 text-center text-indigo-300"
            >
              {currentStep.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <div>
                <Label className="mb-2 block text-indigo-200">{currentStep.inputLabel}</Label>
                <Input
                  type="text"
                  placeholder={currentStep.inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border-indigo-500/20 bg-indigo-950/30 text-indigo-100 placeholder:text-indigo-400/50"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-indigo-400">
                <Lock className="h-3 w-3" />
                <span>Required to {currentStep.unlockRequirement}</span>
              </div>

              <Button
                onClick={() => handleNext(inputValue)}
                disabled={!inputValue}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-600/50 disabled:to-purple-600/50"
              >
                Unlock Access
                <Unlock className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        )

      case "completion":
        return (
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="relative">
                <div className="absolute -inset-6 animate-pulse rounded-full bg-indigo-500/20 blur-md"></div>
                <RotatingHolographicCoin size="lg" speed="fast" glow={true} />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-2 text-2xl font-bold text-indigo-100"
            >
              {currentStep.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 text-indigo-300"
            >
              {currentStep.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6 grid gap-4 md:grid-cols-2"
            >
              {unlockedFeatures.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
                    <Unlock className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium text-indigo-200">
                      {feature.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>
                    <p className="text-xs text-indigo-400">Unlocked</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                onClick={() => handleNext()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              >
                Enter Your Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-indigo-950/70">
      {/* Progress bar */}
      <div className="sticky top-0 z-10 border-b border-indigo-500/20 bg-indigo-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <RotatingHolographicCoin size="sm" speed="medium" glow={false} />
              </div>
              <span className="font-medium text-indigo-200">SNAP-DAX Onboarding</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-indigo-400 hover:bg-indigo-950/50 hover:text-indigo-300"
              onClick={() => {
                // Handle skip or exit
              }}
            >
              <X className="mr-1 h-4 w-4" />
              Exit
            </Button>
          </div>
          <div className="mt-2">
            <Progress
              value={progress}
              className="h-1 bg-indigo-950/50"
              indicatorClassName="bg-gradient-to-r from-indigo-600 to-purple-600"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-1 flex-col px-4 py-6">
        <div className="grid flex-1 gap-6 md:grid-cols-5">
          {/* Chat panel */}
          <div className="md:col-span-2">
            <HolographicGlassCard className="flex h-full flex-col" glassEffect="medium">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} ${
                      message.role === "system" ? "justify-center" : ""
                    }`}
                  >
                    {message.role === "system" ? (
                      <div className="bg-indigo-950/50 rounded-lg p-3 max-w-[85%] text-center border border-indigo-500/20 backdrop-blur-sm">
                        <div className="flex items-center justify-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="text-indigo-200">{message.content}</div>
                      </div>
                    ) : (
                      <div className={`flex max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${message.role === "user" ? "ml-2 bg-indigo-600" : "mr-2 bg-purple-600"}`}
                        >
                          {message.role === "user" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "user"
                                ? "bg-indigo-600/30 border border-indigo-500/30"
                                : "bg-indigo-950/50 border border-purple-500/30"
                            }`}
                          >
                            <div className="text-indigo-100">{message.content}</div>
                          </div>
                          <div
                            className={`text-xs text-indigo-400 mt-1 flex items-center ${
                              message.role === "user" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[85%] flex-row">
                      <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="rounded-lg p-3 bg-indigo-950/50 border border-purple-500/30">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" />
                          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                          <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-indigo-500/20 p-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Ask me anything about our platform..."
                    className="border-indigo-500/20 bg-indigo-950/30 text-indigo-100 placeholder:text-indigo-400/50"
                    disabled
                  />
                  <Button
                    size="icon"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                    disabled
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-center text-xs text-indigo-400">
                  Complete onboarding to unlock full AI conversation
                </div>
              </div>
            </HolographicGlassCard>
          </div>

          {/* Content panel */}
          <div className="md:col-span-3">
            <HolographicGlassCard className="h-full p-6" glassEffect="medium">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </HolographicGlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
