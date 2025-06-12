"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { HolographicBadge } from "./holographic-badge"
import {
  Brain,
  ChevronRight,
  Sparkles,
  Unlock,
  Shield,
  BarChart3,
  Home,
  Building,
  Zap,
  User,
  Star,
  Rocket,
  Crown,
  Target,
  TrendingUp,
  Globe,
  Layers,
  Atom,
  Wand2,
  SnowflakeIcon as Confetti,
} from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
  animation?: "typewriter" | "fade" | "slide"
}

interface OnboardingStep {
  id: string
  type: "cinematic-intro" | "welcome" | "question" | "product-showcase" | "unlock" | "celebration" | "completion"
  title: string
  subtitle?: string
  description?: string
  messages?: Message[]
  cinematicContent?: {
    title: string
    subtitle: string
    description: string
    effects: ("particles" | "hologram" | "matrix" | "quantum")[]
  }
  options?: {
    id: string
    label: string
    value: string
    icon?: React.ReactNode
    description?: string
    unlocksFeature?: string
    rarity?: "common" | "rare" | "epic" | "legendary"
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
    rarity: "common" | "rare" | "epic" | "legendary"
    powerLevel: number
    category: string
    unlockMessage: string
  }
  unlockRequirement?: string
  nextStep?: string | ((response: any) => string)
  celebrationData?: {
    achievement: string
    description: string
    rewards: string[]
    nextUnlock: string
  }
}

// Enhanced onboarding flow with more excitement
const onboardingSteps: Record<string, OnboardingStep> = {
  "cinematic-intro": {
    id: "cinematic-intro",
    type: "cinematic-intro",
    title: "Advanced Financial Technology Platform",
    cinematicContent: {
      title: "SNAP-DAX",
      subtitle: "Intelligent Financial Solutions",
      description: "Experience next-generation financial tools powered by advanced analytics and AI",
      effects: ["particles", "hologram", "matrix", "quantum"],
    },
    nextStep: "welcome",
  },
  welcome: {
    id: "welcome",
    type: "welcome",
    title: "Welcome to SNAP-DAX",
    subtitle: "Your intelligent financial partner",
    description:
      "I'm ARIA, your AI Financial Advisor. Let's customize your experience based on your financial objectives.",
    messages: [
      {
        id: 1,
        role: "system",
        content: "SNAP-DAX Platform Initialized",
        timestamp: "Just now",
        animation: "fade",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "Welcome to SNAP-DAX. I'm ARIA, your AI Financial Advisor. I'll help you navigate our comprehensive financial platform and customize it to your specific needs.",
        timestamp: "Just now",
        animation: "typewriter",
      },
      {
        id: 3,
        role: "assistant",
        content:
          "To provide you with the most relevant tools and insights, I'll need to understand your financial goals and preferences. This will take just a few minutes.",
        timestamp: "Just now",
        animation: "typewriter",
      },
    ],
    nextStep: "financial-objectives",
  },
  "financial-objectives": {
    id: "financial-objectives",
    type: "question",
    title: "Primary Financial Objectives",
    subtitle: "Help us understand your main focus",
    description:
      "What is your primary financial objective? This will help us prioritize the most relevant tools and features for you.",
    inputType: "radio",
    options: [
      {
        id: "wealth-accumulation",
        label: "Wealth Accumulation",
        value: "wealth-accumulation",
        description: "Build long-term wealth through strategic investments",
        icon: <TrendingUp className="h-6 w-6" />,
        unlocksFeature: "advanced-portfolio-analytics",
        rarity: "epic",
      },
      {
        id: "real-estate-investment",
        label: "Real Estate Investment",
        value: "real-estate-investment",
        description: "Focus on property investment and real estate opportunities",
        icon: <Building className="h-6 w-6" />,
        unlocksFeature: "real-estate-analytics-suite",
        rarity: "rare",
      },
      {
        id: "business-growth",
        label: "Business Growth & Expansion",
        value: "business-growth",
        description: "Scale your business with advanced financial tools",
        icon: <Rocket className="h-6 w-6" />,
        unlocksFeature: "business-intelligence-dashboard",
        rarity: "epic",
      },
      {
        id: "portfolio-diversification",
        label: "Portfolio Diversification",
        value: "portfolio-diversification",
        description: "Explore alternative investments and new markets",
        icon: <BarChart3 className="h-6 w-6" />,
        unlocksFeature: "alternative-investment-tools",
        rarity: "rare",
      },
    ],
    nextStep: (response) => {
      if (response === "real-estate-investment") return "real-estate-focus"
      if (response === "wealth-accumulation") return "investment-experience"
      if (response === "business-growth") return "business-profile"
      return "risk-assessment"
    },
  },
  "real-estate-focus": {
    id: "real-estate-focus",
    type: "product-showcase",
    title: "Real Estate Investment Platform",
    productDetails: {
      name: "Comprehensive Real Estate Analytics",
      description:
        "Advanced tools for property analysis, market research, and investment tracking with real-time data and predictive modeling.",
      icon: <Building className="h-10 w-10 text-blue-400" />,
      benefits: [
        "Market analysis and property valuation tools",
        "Investment performance tracking and reporting",
        "Automated rental income management",
        "Property market trend analysis and forecasting",
        "Portfolio diversification recommendations",
        "Tax optimization strategies for real estate",
      ],
      image: "/modern-family-home.png",
      rarity: "epic",
      powerLevel: 85,
      category: "Real Estate Technology",
      unlockMessage: "Access to comprehensive real estate investment tools",
    },
    nextStep: "property-investment-type",
  },
  "property-investment-type": {
    id: "property-investment-type",
    type: "question",
    title: "Investment Property Focus",
    subtitle: "Define your real estate investment strategy",
    description: "Which type of real estate investment aligns with your strategy?",
    inputType: "radio",
    options: [
      {
        id: "residential-rental",
        label: "Residential Rental Properties",
        value: "residential-rental",
        description: "Single-family homes, condos, and small multi-family units",
        icon: <Home className="h-5 w-5" />,
        rarity: "common",
      },
      {
        id: "commercial-properties",
        label: "Commercial Real Estate",
        value: "commercial-properties",
        description: "Office buildings, retail spaces, and industrial properties",
        icon: <Building className="h-5 w-5" />,
        unlocksFeature: "commercial-property-analytics",
        rarity: "epic",
      },
      {
        id: "mixed-portfolio",
        label: "Diversified Portfolio",
        value: "mixed-portfolio",
        description: "Combination of residential and commercial properties",
        icon: <Layers className="h-5 w-5" />,
        rarity: "rare",
      },
      {
        id: "international-markets",
        label: "International Markets",
        value: "international-markets",
        description: "Properties in multiple countries and markets",
        icon: <Globe className="h-5 w-5" />,
        unlocksFeature: "global-market-intelligence",
        rarity: "legendary",
      },
    ],
    nextStep: "investment-timeline",
  },
  "investment-timeline": {
    id: "investment-timeline",
    type: "question",
    title: "Investment Timeline",
    subtitle: "Define your investment horizon",
    description: "What is your typical investment timeline for real estate projects?",
    inputType: "slider",
    inputLabel: "Investment Timeline (Years)",
    nextStep: "unlock-real-estate-tools",
  },
  "unlock-real-estate-tools": {
    id: "unlock-real-estate-tools",
    type: "unlock",
    title: "Activate Real Estate Tools",
    subtitle: "Complete your profile setup",
    description: "Please provide your email to activate personalized real estate analytics and market insights.",
    inputType: "text",
    inputLabel: "Email Address",
    inputPlaceholder: "your.email@example.com",
    unlockRequirement: "Valid email address",
    nextStep: "celebration-real-estate",
  },
  "celebration-real-estate": {
    id: "celebration-real-estate",
    type: "celebration",
    title: "Real Estate Tools Activated",
    celebrationData: {
      achievement: "Real Estate Investment Suite",
      description: "You now have access to comprehensive real estate analysis tools",
      rewards: [
        "Property Valuation Tools",
        "Market Analysis Dashboard",
        "Investment Performance Tracking",
        "Tax Optimization Strategies",
      ],
      nextUnlock: "Risk Assessment Profile",
    },
    nextStep: "risk-assessment",
  },
  "investment-experience": {
    id: "investment-experience",
    type: "question",
    title: "Investment Experience Level",
    subtitle: "Help us calibrate our recommendations",
    description: "What best describes your investment experience?",
    inputType: "radio",
    options: [
      {
        id: "beginner-investor",
        label: "New to Investing",
        value: "beginner-investor",
        description: "Limited investment experience, seeking guidance",
        icon: <User className="h-5 w-5" />,
        rarity: "common",
      },
      {
        id: "intermediate-investor",
        label: "Intermediate Investor",
        value: "intermediate-investor",
        description: "Some experience with stocks, bonds, and basic strategies",
        icon: <BarChart3 className="h-5 w-5" />,
        rarity: "rare",
      },
      {
        id: "experienced-investor",
        label: "Experienced Investor",
        value: "experienced-investor",
        description: "Extensive experience with various investment vehicles",
        icon: <Target className="h-5 w-5" />,
        unlocksFeature: "advanced-investment-strategies",
        rarity: "epic",
      },
      {
        id: "professional-investor",
        label: "Professional/Institutional",
        value: "professional-investor",
        description: "Professional money manager or institutional investor",
        icon: <Crown className="h-5 w-5" />,
        unlocksFeature: "institutional-grade-tools",
        rarity: "legendary",
      },
    ],
    nextStep: "risk-assessment",
  },
  "business-profile": {
    id: "business-profile",
    type: "question",
    title: "Business Profile",
    subtitle: "Tell us about your business",
    description: "What stage is your business currently in?",
    inputType: "radio",
    options: [
      {
        id: "startup-phase",
        label: "Startup Phase",
        value: "startup-phase",
        description: "Early-stage business seeking growth capital",
        icon: <Rocket className="h-5 w-5" />,
        rarity: "common",
      },
      {
        id: "growth-stage",
        label: "Growth Stage",
        value: "growth-stage",
        description: "Established business looking to scale operations",
        icon: <TrendingUp className="h-5 w-5" />,
        rarity: "rare",
      },
      {
        id: "mature-business",
        label: "Mature Business",
        value: "mature-business",
        description: "Established company optimizing financial operations",
        icon: <Building className="h-5 w-5" />,
        unlocksFeature: "enterprise-financial-suite",
        rarity: "epic",
      },
      {
        id: "multiple-ventures",
        label: "Multiple Ventures",
        value: "multiple-ventures",
        description: "Managing multiple businesses or investments",
        icon: <Layers className="h-5 w-5" />,
        unlocksFeature: "multi-entity-management",
        rarity: "legendary",
      },
    ],
    nextStep: "risk-assessment",
  },
  "risk-assessment": {
    id: "risk-assessment",
    type: "question",
    title: "Risk Tolerance Assessment",
    subtitle: "Define your investment risk profile",
    description: "How would you describe your comfort level with investment risk?",
    inputType: "radio",
    options: [
      {
        id: "conservative",
        label: "Conservative",
        value: "conservative",
        description: "Prefer stable, low-risk investments with steady returns",
        icon: <Shield className="h-5 w-5" />,
        rarity: "common",
      },
      {
        id: "moderate",
        label: "Moderate",
        value: "moderate",
        description: "Balanced approach with moderate risk for reasonable returns",
        icon: <BarChart3 className="h-5 w-5" />,
        rarity: "rare",
      },
      {
        id: "aggressive",
        label: "Aggressive",
        value: "aggressive",
        description: "Comfortable with higher risk for potential higher returns",
        icon: <Zap className="h-5 w-5" />,
        unlocksFeature: "advanced-trading-algorithms",
        rarity: "epic",
      },
      {
        id: "sophisticated",
        label: "Sophisticated Investor",
        value: "sophisticated",
        description: "Experienced with complex strategies and alternative investments",
        icon: <Brain className="h-5 w-5" />,
        unlocksFeature: "institutional-investment-tools",
        rarity: "legendary",
      },
    ],
    nextStep: "analytics-showcase",
  },
  "analytics-showcase": {
    id: "analytics-showcase",
    type: "product-showcase",
    title: "Advanced Analytics Platform",
    productDetails: {
      name: "AI-Powered Financial Analytics",
      description:
        "Comprehensive financial analysis tools powered by artificial intelligence and machine learning for superior investment insights.",
      icon: <Brain className="h-10 w-10 text-purple-400" />,
      benefits: [
        "Real-time market analysis and trend identification",
        "Predictive modeling for investment opportunities",
        "Automated portfolio optimization and rebalancing",
        "Risk assessment and scenario planning tools",
        "Performance tracking and detailed reporting",
        "Integration with multiple data sources and platforms",
      ],
      image: "/analytics-dashboard.png",
      rarity: "legendary",
      powerLevel: 95,
      category: "Financial Technology",
      unlockMessage: "Access to advanced AI-powered financial analytics",
    },
    nextStep: "unlock-analytics-platform",
  },
  "unlock-analytics-platform": {
    id: "unlock-analytics-platform",
    type: "unlock",
    title: "Activate Analytics Platform",
    subtitle: "Complete your platform setup",
    description: "Please provide your phone number for account verification and to receive important platform updates.",
    inputType: "text",
    inputLabel: "Phone Number",
    inputPlaceholder: "+1 (555) 123-4567",
    unlockRequirement: "Valid phone number",
    nextStep: "celebration-analytics",
  },
  "celebration-analytics": {
    id: "celebration-analytics",
    type: "celebration",
    title: "Analytics Platform Activated",
    celebrationData: {
      achievement: "Advanced Analytics Suite",
      description: "You now have access to our complete financial analytics platform",
      rewards: [
        "AI Market Analysis",
        "Predictive Investment Models",
        "Automated Portfolio Tools",
        "Advanced Risk Management",
      ],
      nextUnlock: "Platform Integration",
    },
    nextStep: "platform-integration",
  },
  "platform-integration": {
    id: "platform-integration",
    type: "product-showcase",
    title: "Platform Integration Hub",
    productDetails: {
      name: "Comprehensive Financial Integration",
      description:
        "Connect and manage all your financial accounts, investments, and business operations from a single, unified platform.",
      icon: <Layers className="h-10 w-10 text-green-400" />,
      benefits: [
        "Bank and brokerage account integration",
        "Real-time transaction monitoring and categorization",
        "Automated financial reporting and tax preparation",
        "Multi-currency and international account support",
        "Secure data encryption and privacy protection",
        "API access for custom integrations and automation",
      ],
      image: "/data-analytics-visualization.png",
      rarity: "epic",
      powerLevel: 90,
      category: "Platform Integration",
      unlockMessage: "Complete platform integration capabilities unlocked",
    },
    nextStep: "financial-goals",
  },
  "financial-goals": {
    id: "financial-goals",
    type: "question",
    title: "Financial Goals & Objectives",
    subtitle: "Define your success metrics",
    description:
      "Please share your specific financial goals and what success looks like for you. This helps us provide more targeted recommendations.",
    inputType: "textarea",
    inputLabel: "Your Financial Goals",
    inputPlaceholder:
      "Describe your short-term and long-term financial objectives, target returns, timeline, and any specific areas of focus...",
    nextStep: "final-celebration",
  },
  "final-celebration": {
    id: "final-celebration",
    type: "celebration",
    title: "Platform Setup Complete",
    celebrationData: {
      achievement: "SNAP-DAX Platform Activated",
      description: "Your personalized financial platform is now ready with all features unlocked",
      rewards: [
        "Complete Platform Access",
        "Personalized Dashboard",
        "AI Financial Advisor",
        "Advanced Analytics Suite",
      ],
      nextUnlock: "Your Financial Dashboard",
    },
    nextStep: "completion",
  },
  completion: {
    id: "completion",
    type: "completion",
    title: "Welcome to Your Financial Future",
    subtitle: "Your personalized platform is ready",
    description: "You now have access to all SNAP-DAX features tailored to your financial objectives",
    nextStep: "dashboard",
  },
}

interface AIOnboardingExperienceProps {
  onComplete?: (userData: any) => void
  initialStep?: string
}

export function AIOnboardingExperience({ onComplete, initialStep = "cinematic-intro" }: AIOnboardingExperienceProps) {
  const [currentStepId, setCurrentStepId] = useState(initialStep)
  const [userData, setUserData] = useState<Record<string, any>>({})
  const [progress, setProgress] = useState(0)
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const totalSteps = Object.keys(onboardingSteps).length - 1

  const currentStep = onboardingSteps[currentStepId]

  useEffect(() => {
    if (currentStep.messages) {
      setMessages([])
      // Animate messages in sequence
      currentStep.messages.forEach((message, index) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, message])
        }, index * 1500)
      })
    }

    const stepIndex = Object.keys(onboardingSteps).indexOf(currentStepId)
    const newProgress = Math.min(100, Math.round((stepIndex / totalSteps) * 100))
    setProgress(newProgress)
  }, [currentStepId, currentStep, totalSteps])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleNext = (value?: any) => {
    if (value !== undefined) {
      const updatedUserData = { ...userData, [currentStepId]: value }
      setUserData(updatedUserData)

      // Check for feature unlocks
      if (currentStep.options) {
        const selectedOption = currentStep.options.find((option) => option.value === value)
        if (selectedOption?.unlocksFeature && !unlockedFeatures.includes(selectedOption.unlocksFeature)) {
          setUnlockedFeatures([...unlockedFeatures, selectedOption.unlocksFeature])

          const newMessage: Message = {
            id: Date.now(),
            role: "system",
            content: `🌟 FEATURE UNLOCKED: ${selectedOption.unlocksFeature.replace(/-/g, " ").toUpperCase()}! 🌟`,
            timestamp: "Just now",
            animation: "fade",
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
        animation: "slide",
      }
      setMessages((prev) => [...prev, userMessage])

      // AI response
      setIsTyping(true)
      setTimeout(() => {
        const responseContent = getEnhancedAIResponse(currentStepId, value)
        if (responseContent) {
          const aiMessage: Message = {
            id: Date.now() + 1,
            role: "assistant",
            content: responseContent,
            timestamp: "Just now",
            animation: "typewriter",
          }
          setMessages((prev) => [...prev, aiMessage])
        }
        setIsTyping(false)
      }, 2000)
    }

    // Handle celebration steps
    if (currentStep.type === "celebration") {
      setShowCelebration(true)
      setTimeout(() => {
        setShowCelebration(false)
      }, 3000)
    }

    // Navigate to next step
    let nextStepId = ""
    if (typeof currentStep.nextStep === "function") {
      nextStepId = currentStep.nextStep(value)
    } else if (typeof currentStep.nextStep === "string") {
      nextStepId = currentStep.nextStep
    }

    if (nextStepId === "dashboard") {
      if (onComplete) {
        onComplete(userData)
      }
    } else if (nextStepId) {
      setTimeout(
        () => {
          setCurrentStepId(nextStepId)
          setInputValue("")
        },
        currentStep.type === "celebration" ? 3000 : 500,
      )
    }
  }

  const getEnhancedAIResponse = (stepId: string, value: any): string => {
    const responses = {
      "financial-objectives": {
        "wealth-accumulation":
          "Excellent choice. I'm configuring our advanced portfolio analytics to help you build long-term wealth through strategic investment planning.",
        "real-estate-investment":
          "Great selection. Our real estate analytics suite will provide you with comprehensive market data and investment analysis tools.",
        "business-growth":
          "Perfect. I'm activating our business intelligence dashboard to help you scale your operations with data-driven insights.",
        "portfolio-diversification":
          "Smart approach. Our alternative investment tools will help you explore new opportunities and optimize your portfolio allocation.",
      },
      "risk-assessment": {
        conservative:
          "I'm configuring conservative investment strategies focused on capital preservation and steady growth with lower volatility.",
        moderate: "I'll set up a balanced approach that optimizes the risk-return ratio for your investment portfolio.",
        aggressive:
          "I'm activating advanced trading algorithms designed for higher-growth investment strategies with increased risk tolerance.",
        sophisticated:
          "Excellent. I'm unlocking institutional-grade tools for complex investment strategies and alternative asset classes.",
      },
    }

    const stepResponses = responses[stepId as keyof typeof responses]
    if (stepResponses) {
      return (
        stepResponses[value as keyof typeof stepResponses] ||
        "Thank you for that information. I'm customizing your platform experience based on your preferences."
      )
    }

    return "I'm processing your selection and tailoring the platform to meet your specific financial needs."
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-orange-500"
      case "epic":
        return "from-purple-400 to-pink-500"
      case "rare":
        return "from-blue-400 to-cyan-500"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "shadow-2xl shadow-yellow-500/50"
      case "epic":
        return "shadow-xl shadow-purple-500/50"
      case "rare":
        return "shadow-lg shadow-blue-500/50"
      default:
        return "shadow-md shadow-gray-500/50"
    }
  }

  const renderStepContent = () => {
    switch (currentStep.type) {
      case "cinematic-intro":
        return (
          <div className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden">
            {/* Quantum particle field */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-cyan-400"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                  }}
                  animate={{
                    x: [
                      Math.random() * window.innerWidth,
                      Math.random() * window.innerWidth,
                      Math.random() * window.innerWidth,
                    ],
                    y: [
                      Math.random() * window.innerHeight,
                      Math.random() * window.innerHeight,
                      Math.random() * window.innerHeight,
                    ],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Matrix rain effect */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-green-400 font-mono text-xs"
                  style={{ left: `${i * 5}%` }}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: window.innerHeight + 100, opacity: [0, 1, 0] }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                >
                  {Array.from({ length: 10 }, () => Math.random().toString(36).charAt(0)).join("")}
                </motion.div>
              ))}
            </div>

            {/* Main content */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="relative z-10 text-center"
            >
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto"
              >
                <Atom className="h-16 w-16 text-white" />
              </motion.div>

              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mb-4 text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                {currentStep.cinematicContent?.title}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mb-2 text-xl text-cyan-300"
              >
                {currentStep.cinematicContent?.subtitle}
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="mb-8 text-indigo-300 max-w-2xl mx-auto"
              >
                {currentStep.cinematicContent?.description}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
              >
                <Button
                  onClick={() => handleNext()}
                  className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700 px-8 py-4 text-lg font-bold rounded-full shadow-2xl shadow-purple-500/50"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Enter the Quantum Realm
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Holographic grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>
        )

      case "welcome":
        return (
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="mb-6 relative"
            >
              <div className="absolute -inset-8 animate-pulse rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-xl"></div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-600">
                <Brain className="h-12 w-12 text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-2 text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {currentStep.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-2 text-lg text-purple-300 font-medium"
            >
              {currentStep.subtitle}
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-8 text-indigo-300 max-w-md"
            >
              {currentStep.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                onClick={() => handleNext()}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full shadow-lg shadow-purple-500/30"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Begin My Transformation
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        )

      case "question":
        return (
          <div className="flex flex-col">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="mb-2 text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {currentStep.title}
              </h2>
              {currentStep.subtitle && (
                <p className="text-lg text-purple-300 font-medium mb-2">{currentStep.subtitle}</p>
              )}
              <p className="text-indigo-300">{currentStep.description}</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              {currentStep.inputType === "radio" && currentStep.options && (
                <RadioGroup onValueChange={(value) => handleNext(value)} className="grid gap-4">
                  {currentStep.options.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Label htmlFor={option.id} className="cursor-pointer">
                        <RadioGroupItem value={option.value} id={option.id} className="peer sr-only" />
                        <div
                          className={`peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-950/50 peer-data-[state=checked]:${getRarityGlow(option.rarity || "common")} flex items-center gap-4 rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-6 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-950/40 hover:scale-105`}
                        >
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${getRarityColor(option.rarity || "common")} peer-data-[state=checked]:shadow-lg`}
                          >
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold text-indigo-100 text-lg">{option.label}</p>
                              {option.rarity && option.rarity !== "common" && (
                                <HolographicBadge variant="tokenized" glow={true} size="sm">
                                  <Star className="mr-1 h-3 w-3" />
                                  {option.rarity.toUpperCase()}
                                </HolographicBadge>
                              )}
                            </div>
                            <p className="text-indigo-300 text-sm mb-2">{option.description}</p>
                            {option.unlocksFeature && (
                              <div className="flex items-center gap-1">
                                <Unlock className="h-3 w-3 text-yellow-400" />
                                <span className="text-xs text-yellow-400 font-medium">
                                  Unlocks: {option.unlocksFeature.replace(/-/g, " ")}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              )}

              {currentStep.inputType === "slider" && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <Label className="text-xl font-bold text-purple-300 mb-4 block">{currentStep.inputLabel}</Label>
                    <div className="relative px-4">
                      <Slider
                        defaultValue={[100000]}
                        max={2000000}
                        step={25000}
                        onValueChange={(value) => setInputValue(value[0].toString())}
                        className="py-6"
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                          ${Number.parseInt(inputValue || "100000").toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-indigo-400">
                      <span>$25,000</span>
                      <span>$2,000,000+</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleNext(inputValue || "100000")}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 py-4 text-lg font-bold rounded-full shadow-lg shadow-purple-500/30"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Lock In My Power Level
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              {currentStep.inputType === "text" && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div>
                    <Label className="mb-3 block text-lg font-bold text-purple-300">{currentStep.inputLabel}</Label>
                    <Input
                      type="text"
                      placeholder={currentStep.inputPlaceholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="border-purple-500/30 bg-purple-950/30 text-indigo-100 placeholder:text-indigo-400/50 py-4 text-lg rounded-xl"
                    />
                  </div>
                  <Button
                    onClick={() => handleNext(inputValue)}
                    disabled={!inputValue}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 disabled:from-purple-600/50 disabled:to-cyan-600/50 py-4 text-lg font-bold rounded-full shadow-lg shadow-purple-500/30"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Activate Quantum Signature
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}

              {currentStep.inputType === "textarea" && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div>
                    <Label className="mb-3 block text-lg font-bold text-purple-300">{currentStep.inputLabel}</Label>
                    <Textarea
                      placeholder={currentStep.inputPlaceholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="min-h-[150px] border-purple-500/30 bg-purple-950/30 text-indigo-100 placeholder:text-indigo-400/50 text-lg rounded-xl"
                    />
                  </div>
                  <Button
                    onClick={() => handleNext(inputValue)}
                    disabled={!inputValue}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 disabled:from-purple-600/50 disabled:to-cyan-600/50 py-4 text-lg font-bold rounded-full shadow-lg shadow-purple-500/30"
                  >
                    <Wand2 className="mr-2 h-5 w-5" />
                    Manifest My Vision
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )

      case "product-showcase":
        return (
          <div className="flex flex-col">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="mb-4 text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {currentStep.title}
              </h2>
            </motion.div>

            {currentStep.productDetails && (
              <motion.div
                initial={{ y: 30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl ${getRarityGlow(currentStep.productDetails.rarity)} border-2 border-gradient-to-r ${getRarityColor(currentStep.productDetails.rarity)}`}
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={
                        currentStep.productDetails.image ||
                        "/placeholder.svg?height=400&width=800&query=futuristic+technology" ||
                        "/placeholder.svg"
                      }
                      alt={currentStep.productDetails.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/50 to-transparent" />

                    {/* Floating particles over image */}
                    <div className="absolute inset-0">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute h-2 w-2 rounded-full bg-cyan-400"
                          initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0,
                          }}
                          animate={{
                            x: [
                              Math.random() * window.innerWidth,
                              Math.random() * window.innerWidth,
                              Math.random() * window.innerWidth,
                            ],
                            y: [
                              Math.random() * window.innerHeight,
                              Math.random() * window.innerHeight,
                              Math.random() * window.innerHeight,
                            ],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {currentStep.productDetails.name}
                    </h3>
                    <p className="mb-4 text-lg text-indigo-300">{currentStep.productDetails.description}</p>
                    <ul className="mb-6 list-disc pl-6 text-indigo-400">
                      {currentStep.productDetails.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => handleNext()}
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-full shadow-lg shadow-purple-500/30"
                    >
                      <Unlock className="mr-2 h-4 w-4" />
                      Unlock Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-indigo-950 text-white">
      <Progress value={progress} className="absolute top-4 w-full" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="bg-gradient-to-br from-purple-600 to-cyan-600 p-8 rounded-2xl text-center">
            <Confetti className="h-12 w-12 mb-4 text-white" />
            <h2 className="mb-2 text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Congratulations!
            </h2>
            <p className="mb-4 text-lg text-white">{currentStep.celebrationData?.description}</p>
            <ul className="mb-6 list-disc pl-6 text-white">
              {currentStep.celebrationData?.rewards.map((reward, index) => (
                <li key={index}>{reward}</li>
              ))}
            </ul>
            <p className="mb-8 text-lg text-white">Next Unlock: {currentStep.celebrationData?.nextUnlock}</p>
            <Button
              onClick={() => handleNext()}
              className="bg-gradient-to-r from-purple-700 to-cyan-700 text-white hover:from-purple-800 hover:to-cyan-800 px-6 py-3 rounded-full shadow-lg shadow-purple-500/30"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
      <div ref={messagesEndRef} className="h-0" />
    </div>
  )
}
