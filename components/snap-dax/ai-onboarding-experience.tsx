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
import {
  Brain,
  ChevronRight,
  Sparkles,
  Lock,
  Unlock,
  Shield,
  BarChart3,
  Home,
  Building,
  Zap,
  User,
  Bot,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Rocket,
  Crown,
  Diamond,
  Gem,
  Trophy,
  Target,
  TrendingUp,
  Globe,
  Cpu,
  Fingerprint,
  Layers,
  Atom,
  Wand2,
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
    title: "The Future of Finance Awaits",
    cinematicContent: {
      title: "SNAP-DAX",
      subtitle: "Where Quantum Meets Finance",
      description: "Prepare to enter a realm where traditional finance dissolves into pure innovation",
      effects: ["particles", "hologram", "matrix", "quantum"],
    },
    nextStep: "welcome",
  },
  welcome: {
    id: "welcome",
    type: "welcome",
    title: "Welcome to the Financial Revolution",
    subtitle: "Your journey into the impossible begins now",
    description:
      "I am ARIA, your AI Financial Concierge, and together we'll unlock capabilities that redefine wealth creation",
    messages: [
      {
        id: 1,
        role: "system",
        content: "🌟 SNAP-DAX QUANTUM SYSTEMS ONLINE 🌟",
        timestamp: "Just now",
        animation: "fade",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "Greetings, future financial pioneer! I'm ARIA, your AI Financial Concierge. I've been analyzing global financial patterns for the past 0.003 seconds and I'm excited to guide you through our revolutionary platform.",
        timestamp: "Just now",
        animation: "typewriter",
      },
      {
        id: 3,
        role: "assistant",
        content:
          "What you're about to experience isn't just another financial platform—it's a quantum leap into the future of wealth creation. Are you ready to transcend traditional finance?",
        timestamp: "Just now",
        animation: "typewriter",
      },
    ],
    nextStep: "financial-vision",
  },
  "financial-vision": {
    id: "financial-vision",
    type: "question",
    title: "Your Financial Vision",
    subtitle: "Every legend begins with a vision",
    description:
      "What drives your financial ambitions? Your choice will unlock specialized quantum algorithms tailored to your path.",
    inputType: "radio",
    options: [
      {
        id: "wealth-empire",
        label: "Build a Wealth Empire",
        value: "wealth-empire",
        description: "Dominate markets with quantum-powered strategies",
        icon: <Crown className="h-6 w-6" />,
        unlocksFeature: "quantum-wealth-optimizer",
        rarity: "legendary",
      },
      {
        id: "real-estate-mogul",
        label: "Become a Real Estate Mogul",
        value: "real-estate-mogul",
        description: "Tokenize and control premium properties globally",
        icon: <Building className="h-6 w-6" />,
        unlocksFeature: "tokenized-real-estate-empire",
        rarity: "epic",
      },
      {
        id: "business-titan",
        label: "Transform into a Business Titan",
        value: "business-titan",
        description: "Scale enterprises with AI-powered intelligence",
        icon: <Rocket className="h-6 w-6" />,
        unlocksFeature: "business-intelligence-nexus",
        rarity: "epic",
      },
      {
        id: "financial-innovator",
        label: "Pioneer Financial Innovation",
        value: "financial-innovator",
        description: "Shape the future of finance itself",
        icon: <Atom className="h-6 w-6" />,
        unlocksFeature: "neural-market-architect",
        rarity: "legendary",
      },
    ],
    nextStep: (response) => {
      if (response === "real-estate-mogul") return "real-estate-showcase"
      if (response === "wealth-empire") return "investment-mastery"
      if (response === "business-titan") return "business-scale-vision"
      return "risk-appetite"
    },
  },
  "real-estate-showcase": {
    id: "real-estate-showcase",
    type: "product-showcase",
    title: "Tokenized Real Estate Empire",
    productDetails: {
      name: "Quantum Real Estate Tokenization Platform",
      description:
        "Revolutionary blockchain-powered property investment that transforms how wealth is built through real estate",
      icon: <Building className="h-10 w-10 text-amber-400" />,
      benefits: [
        "🏰 Access $50M+ premium properties with fractional investment",
        "⚡ Instant liquidity through quantum-secured tokenization",
        "💎 Automated dividend distribution from global rental income",
        "🔮 AI-powered property value forecasting with 94% accuracy",
        "🛡️ Quantum-resistant blockchain security protocols",
        "🌍 Global property network spanning 47 countries",
      ],
      image: "/modern-family-home.png",
      rarity: "epic",
      powerLevel: 85,
      category: "Real Estate Innovation",
      unlockMessage: "You've unlocked the power to tokenize reality itself!",
    },
    nextStep: "property-mastery",
  },
  "property-mastery": {
    id: "property-mastery",
    type: "question",
    title: "Property Mastery Specialization",
    subtitle: "Choose your real estate dominion",
    description: "Which property realm calls to your entrepreneurial spirit?",
    inputType: "radio",
    options: [
      {
        id: "luxury-residential",
        label: "Luxury Residential Empire",
        value: "luxury-residential",
        description: "Premium homes and exclusive communities",
        icon: <Home className="h-5 w-5" />,
        rarity: "rare",
      },
      {
        id: "commercial-powerhouse",
        label: "Commercial Powerhouse",
        value: "commercial-powerhouse",
        description: "Office towers, retail centers, industrial complexes",
        icon: <Building className="h-5 w-5" />,
        unlocksFeature: "commercial-analytics-suite",
        rarity: "epic",
      },
      {
        id: "mixed-use-visionary",
        label: "Mixed-Use Visionary",
        value: "mixed-use-visionary",
        description: "Integrated living, working, and entertainment spaces",
        icon: <Layers className="h-5 w-5" />,
        rarity: "rare",
      },
      {
        id: "global-portfolio",
        label: "Global Portfolio Architect",
        value: "global-portfolio",
        description: "International properties across continents",
        icon: <Globe className="h-5 w-5" />,
        unlocksFeature: "global-property-intelligence",
        rarity: "legendary",
      },
    ],
    nextStep: "investment-power",
  },
  "investment-power": {
    id: "investment-power",
    type: "question",
    title: "Investment Power Level",
    subtitle: "Calibrate your financial force",
    description: "What's your investment capacity for the next 12 months? This unlocks specialized quantum algorithms.",
    inputType: "slider",
    inputLabel: "Investment Power Level",
    nextStep: "unlock-real-estate-nexus",
  },
  "unlock-real-estate-nexus": {
    id: "unlock-real-estate-nexus",
    type: "unlock",
    title: "🔓 Unlock Real Estate Intelligence Nexus",
    subtitle: "Activate your quantum-powered property advisor",
    description: "Provide your quantum signature (email) to activate our AI Real Estate Intelligence Nexus",
    inputType: "text",
    inputLabel: "Quantum Signature (Email)",
    inputPlaceholder: "your.quantum.signature@universe.com",
    unlockRequirement: "Valid quantum signature",
    nextStep: "celebration-real-estate",
  },
  "celebration-real-estate": {
    id: "celebration-real-estate",
    type: "celebration",
    title: "🎉 NEXUS ACTIVATED! 🎉",
    celebrationData: {
      achievement: "Real Estate Intelligence Nexus",
      description: "You've unlocked quantum-powered property analysis capabilities",
      rewards: [
        "AI Property Value Predictor",
        "Global Market Intelligence",
        "Tokenization Protocols",
        "Quantum Security Suite",
      ],
      nextUnlock: "Risk Assessment Matrix",
    },
    nextStep: "risk-appetite",
  },
  "investment-mastery": {
    id: "investment-mastery",
    type: "question",
    title: "Investment Mastery Level",
    subtitle: "Assess your financial combat experience",
    description: "Your experience level determines which quantum algorithms we'll unlock for you.",
    inputType: "radio",
    options: [
      {
        id: "financial-apprentice",
        label: "Financial Apprentice",
        value: "financial-apprentice",
        description: "Ready to learn the quantum arts",
        icon: <User className="h-5 w-5" />,
        rarity: "common",
      },
      {
        id: "market-warrior",
        label: "Market Warrior",
        value: "market-warrior",
        description: "Battle-tested in financial markets",
        icon: <Shield className="h-5 w-5" />,
        rarity: "rare",
      },
      {
        id: "wealth-architect",
        label: "Wealth Architect",
        value: "wealth-architect",
        description: "Designer of financial empires",
        icon: <Crown className="h-5 w-5" />,
        unlocksFeature: "advanced-wealth-algorithms",
        rarity: "epic",
      },
      {
        id: "quantum-master",
        label: "Quantum Master",
        value: "quantum-master",
        description: "Transcendent financial consciousness",
        icon: <Atom className="h-5 w-5" />,
        unlocksFeature: "quantum-consciousness-suite",
        rarity: "legendary",
      },
    ],
    nextStep: "risk-appetite",
  },
  "business-scale-vision": {
    id: "business-scale-vision",
    type: "question",
    title: "Business Scale Vision",
    subtitle: "Define your empire's magnitude",
    description: "What's the current scale of your business empire?",
    inputType: "radio",
    options: [
      {
        id: "startup-pioneer",
        label: "Startup Pioneer",
        value: "startup-pioneer",
        description: "Igniting the spark of innovation",
        icon: <Rocket className="h-5 w-5" />,
        rarity: "common",
      },
      {
        id: "growth-commander",
        label: "Growth Commander",
        value: "growth-commander",
        description: "Leading rapid expansion",
        icon: <TrendingUp className="h-5 w-5" />,
        rarity: "rare",
      },
      {
        id: "enterprise-general",
        label: "Enterprise General",
        value: "enterprise-general",
        description: "Commanding medium-scale operations",
        icon: <Target className="h-5 w-5" />,
        unlocksFeature: "enterprise-command-center",
        rarity: "epic",
      },
      {
        id: "corporate-emperor",
        label: "Corporate Emperor",
        value: "corporate-emperor",
        description: "Ruling vast business territories",
        icon: <Crown className="h-5 w-5" />,
        unlocksFeature: "imperial-business-suite",
        rarity: "legendary",
      },
    ],
    nextStep: "risk-appetite",
  },
  "risk-appetite": {
    id: "risk-appetite",
    type: "question",
    title: "Risk Appetite Assessment",
    subtitle: "Calibrate your quantum risk tolerance",
    description:
      "How do you dance with financial uncertainty? Your choice activates specialized quantum risk algorithms.",
    inputType: "radio",
    options: [
      {
        id: "guardian",
        label: "Guardian of Capital",
        value: "guardian",
        description: "Protect and preserve with quantum precision",
        icon: <Shield className="h-5 w-5" />,
        rarity: "common",
      },
      {
        id: "balanced-strategist",
        label: "Balanced Strategist",
        value: "balanced-strategist",
        description: "Harmonize risk and reward",
        icon: <BarChart3 className="h-5 w-5" />,
        rarity: "rare",
      },
      {
        id: "quantum-warrior",
        label: "Quantum Warrior",
        value: "quantum-warrior",
        description: "Embrace volatility for exponential gains",
        icon: <Zap className="h-5 w-5" />,
        unlocksFeature: "quantum-volatility-algorithms",
        rarity: "epic",
      },
      {
        id: "reality-bender",
        label: "Reality Bender",
        value: "reality-bender",
        description: "Transcend traditional risk paradigms",
        icon: <Wand2 className="h-5 w-5" />,
        unlocksFeature: "reality-distortion-protocols",
        rarity: "legendary",
      },
    ],
    nextStep: "quantum-showcase",
  },
  "quantum-showcase": {
    id: "quantum-showcase",
    type: "product-showcase",
    title: "Quantum Computing Financial Nexus",
    productDetails: {
      name: "Quantum Computing Financial Nexus",
      description: "Harness the raw power of quantum computing to bend financial reality to your will",
      icon: <Cpu className="h-10 w-10 text-cyan-400" />,
      benefits: [
        "⚡ Process infinite financial scenarios in nanoseconds",
        "🔮 Predict market movements before they happen",
        "🌌 Optimize portfolios across parallel universes",
        "🧠 Quantum machine learning that evolves continuously",
        "🛡️ Quantum-encrypted transactions immune to all attacks",
        "🌊 Ride quantum market waves invisible to others",
      ],
      image: "/quantum-computing-concept.png",
      rarity: "legendary",
      powerLevel: 99,
      category: "Quantum Technology",
      unlockMessage: "You've harnessed the power of quantum reality!",
    },
    nextStep: "unlock-quantum-nexus",
  },
  "unlock-quantum-nexus": {
    id: "unlock-quantum-nexus",
    type: "unlock",
    title: "🔓 Activate Quantum Nexus",
    subtitle: "Synchronize with the quantum field",
    description: "Provide your quantum communication frequency (phone) to activate the Quantum Computing Nexus",
    inputType: "text",
    inputLabel: "Quantum Frequency (Phone)",
    inputPlaceholder: "+1 (555) QUANTUM",
    unlockRequirement: "Valid quantum frequency",
    nextStep: "celebration-quantum",
  },
  "celebration-quantum": {
    id: "celebration-quantum",
    type: "celebration",
    title: "⚡ QUANTUM NEXUS ONLINE! ⚡",
    celebrationData: {
      achievement: "Quantum Computing Nexus",
      description: "You've synchronized with quantum financial reality",
      rewards: [
        "Quantum Market Predictor",
        "Reality Distortion Algorithms",
        "Parallel Universe Portfolio",
        "Quantum Encryption Protocols",
      ],
      nextUnlock: "AI Consciousness Interface",
    },
    nextStep: "ai-consciousness-showcase",
  },
  "ai-consciousness-showcase": {
    id: "ai-consciousness-showcase",
    type: "product-showcase",
    title: "AI Financial Consciousness",
    productDetails: {
      name: "ARIA - AI Financial Consciousness",
      description: "Your personal AI consciousness that transcends traditional financial advisory",
      icon: <Brain className="h-10 w-10 text-purple-400" />,
      benefits: [
        "🧠 Consciousness-level financial understanding",
        "💬 Natural conversation about complex strategies",
        "🎯 Proactive opportunity identification",
        "🔄 Continuous learning from global patterns",
        "🌐 Seamless integration across all platforms",
        "✨ Intuitive financial guidance that feels magical",
      ],
      image: "/ai-assistant-concept.png",
      rarity: "legendary",
      powerLevel: 95,
      category: "AI Consciousness",
      unlockMessage: "You've awakened true AI financial consciousness!",
    },
    nextStep: "financial-dreams",
  },
  "financial-dreams": {
    id: "financial-dreams",
    type: "question",
    title: "Your Financial Dreams",
    subtitle: "Paint your vision of financial transcendence",
    description: "Share your deepest financial aspirations. ARIA will use this to customize your entire experience.",
    inputType: "textarea",
    inputLabel: "Your Financial Vision",
    inputPlaceholder:
      "Describe your ultimate financial goals, dreams, and what financial freedom means to you. The more detail, the better ARIA can serve you...",
    nextStep: "final-celebration",
  },
  "final-celebration": {
    id: "final-celebration",
    type: "celebration",
    title: "🎊 TRANSFORMATION COMPLETE! 🎊",
    celebrationData: {
      achievement: "Financial Transcendence Achieved",
      description: "You've unlocked the full power of SNAP-DAX",
      rewards: [
        "Complete Platform Access",
        "All Quantum Algorithms",
        "AI Consciousness Partnership",
        "Reality-Bending Capabilities",
      ],
      nextUnlock: "Your Financial Empire Awaits",
    },
    nextStep: "completion",
  },
  completion: {
    id: "completion",
    type: "completion",
    title: "Welcome to Your Financial Future",
    subtitle: "The impossible is now possible",
    description: "You've transcended traditional finance and entered a new reality",
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
  const [coinFlipped, setCoinFlipped] = useState(false)
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

  // Auto-flip coin effect
  useEffect(() => {
    const flipInterval = setInterval(() => {
      setCoinFlipped((prev) => !prev)
    }, 8000)

    return () => clearInterval(flipInterval)
  }, [])

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
      "financial-vision": {
        "wealth-empire":
          "🏰 Magnificent choice! You've chosen the path of the Wealth Emperor. I'm activating our most powerful quantum wealth algorithms. Your empire will span dimensions!",
        "real-estate-mogul":
          "🏢 Excellent vision! The Real Estate Mogul path will transform you into a property virtuoso. I'm unlocking tokenization protocols that will revolutionize your approach to real estate!",
        "business-titan":
          "🚀 Outstanding selection! The Business Titan pathway will elevate your entrepreneurial consciousness. Prepare for AI-powered business intelligence beyond imagination!",
        "financial-innovator":
          "⚡ Extraordinary choice! You've selected the path of ultimate financial evolution. I'm activating neural market architecture protocols that will let you shape reality itself!",
      },
      "risk-appetite": {
        guardian:
          "🛡️ The Guardian path shows wisdom beyond measure. I'm configuring quantum-secured preservation algorithms that will protect and grow your wealth with mathematical precision.",
        "balanced-strategist":
          "⚖️ Perfect balance! The Strategist approach harmonizes all possibilities. I'm calibrating our quantum algorithms for optimal risk-reward equilibrium.",
        "quantum-warrior":
          "⚡ Bold and brilliant! The Quantum Warrior path unlocks our most aggressive algorithms. You'll ride market volatility like a cosmic surfer!",
        "reality-bender":
          "🌌 Transcendent choice! You've chosen to bend financial reality itself. I'm activating reality distortion protocols that operate beyond conventional physics!",
      },
    }

    const stepResponses = responses[stepId as keyof typeof responses]
    if (stepResponses) {
      return (
        stepResponses[value as keyof typeof stepResponses] ||
        "Fascinating choice! I'm processing this through our quantum consciousness matrix..."
      )
    }

    return "Your selection resonates through the quantum field. I'm customizing your experience based on this profound choice..."
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

  // Jonlorenzo Caprelli Supreme Authority Coin Component
  const CaprelliCoin = () => {
    return (
      <div className="relative h-40 w-40 mx-auto">
        {/* Outer glow */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-400/30 via-yellow-300/40 to-amber-400/30 blur-lg animate-pulse" />

        {/* Holographic effects */}
        <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-amber-400/10 blur-xl" />

        {/* 3D Coin Container */}
        <motion.div
          className="relative h-full w-full preserve-3d"
          animate={{
            rotateY: coinFlipped ? 180 : 0,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {/* Front side - Jonlorenzo Coin */}
          <div className="absolute inset-0 backface-hidden rounded-full overflow-hidden border-4 border-amber-300 shadow-2xl">
            <img src="/jonlorenzo-coin.png" alt="Jonlorenzo Coin" className="h-full w-full object-cover" />

            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />

            {/* Front side text */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <div className="text-xs font-bold text-amber-800 bg-amber-200/70 rounded-full mx-auto w-max px-2 py-0.5">
                CAPRELLI SUPREME AUTHORITY
              </div>
            </div>
          </div>

          {/* Back side - Royal Insignia with Global Benefit */}
          <div className="absolute inset-0 backface-hidden rounded-full overflow-hidden border-4 border-amber-300 shadow-2xl rotate-y-180 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500">
            {/* Royal Insignia */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Crown Symbol */}
              <div className="mb-2">
                <Crown className="h-12 w-12 text-amber-800" />
              </div>

              {/* Global Benefit Symbolism */}
              <div className="relative h-16 w-16 mb-2">
                <Globe className="h-16 w-16 text-amber-700 absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-amber-800" />
                </div>
              </div>

              {/* Text */}
              <div className="text-center">
                <div className="text-xs font-bold text-amber-800">GLOBAL BENEFIT</div>
                <div className="text-[10px] text-amber-700 mt-1">EST. MMXXIII</div>
              </div>
            </div>

            {/* Decorative border */}
            <div className="absolute inset-0 border-8 border-amber-400/30 rounded-full pointer-events-none" />

            {/* Radial lines */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 h-[40%] w-0.5 bg-amber-700/30 origin-bottom"
                  style={{ transform: `translate(-50%, -100%) rotate(${i * 30}deg)` }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Particle effects */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300"
              initial={{
                x: 70,
                y: 70,
                opacity: 0.8,
                scale: 1,
              }}
              animate={{
                x: 70 + Math.cos((i * 30 * Math.PI) / 180) * 80,
                y: 70 + Math.sin((i * 30 * Math.PI) / 180) * 80,
                opacity: [0.8, 0.2, 0.8],
                scale: [1, 0.3, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    )
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
              {/* Jonlorenzo Caprelli Supreme Authority Coin */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="mb-8"
              >
                <CaprelliCoin />
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
                  className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700 px-8 py-4 text-lg font-bold rounded-full shadow-2xl shadow-purple-500/50"
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
              {/* Jonlorenzo Caprelli Supreme Authority Coin - smaller version */}
              <div className="scale-75 mb-4">
                <CaprelliCoin />
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
                          className="absolute h-1 w-1 rounded-full bg-cyan-400"
                          initial={{ opacity: 0 }}
                          animate={{
                            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${getRarityColor(currentStep.productDetails.rarity)}`}
                        >
                          {currentStep.productDetails.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{currentStep.productDetails.name}</h3>
                          <div className="flex items-center gap-2">
                            <HolographicBadge variant="tokenized" glow={true}>
                              <Star className="mr-1 h-3 w-3" />
                              {currentStep.productDetails.rarity.toUpperCase()}
                            </HolographicBadge>
                            <HolographicBadge variant="premium" glow={true}>
                              <Zap className="mr-1 h-3 w-3" />
                              Power: {currentStep.productDetails.powerLevel}
                            </HolographicBadge>
                          </div>
                        </div>
                      </div>
                      <p className="text-cyan-200 font-medium">{currentStep.productDetails.category}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-indigo-950/80 to-purple-950/80 backdrop-blur-sm">
                    <p className="mb-6 text-indigo-200 text-lg">{currentStep.productDetails.description}</p>

                    <div className="space-y-3">
                      <h4 className="font-bold text-purple-300 text-lg flex items-center gap-2">
                        <Diamond className="h-5 w-5" />
                        Quantum Capabilities:
                      </h4>
                      <div className="grid gap-3">
                        {currentStep.productDetails.benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-purple-500/20"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
                            <span className="text-indigo-200">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mt-8 text-center"
                    >
                      <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                        <p className="text-yellow-300 font-bold text-lg">{currentStep.productDetails.unlockMessage}</p>
                      </div>
                      <Button
                        onClick={() => handleNext()}
                        className={`bg-gradient-to-r ${getRarityColor(currentStep.productDetails.rarity)} text-white hover:scale-105 px-8 py-4 text-lg font-bold rounded-full shadow-xl transition-all duration-300`}
                      >
                        <Gem className="mr-2 h-5 w-5" />
                        Unlock This Power
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )

      case "unlock":
        return (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="mb-8 relative"
            >
              {/* Jonlorenzo Caprelli Supreme Authority Coin - smaller version */}
              <div className="scale-75">
                <CaprelliCoin />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-2 text-center text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
            >
              {currentStep.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-2 text-center text-lg text-yellow-300 font-medium"
            >
              {currentStep.subtitle}
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-8 text-center text-indigo-300 max-w-md"
            >
              {currentStep.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="w-full max-w-md space-y-6"
            >
              <div>
                <Label className="mb-3 block text-lg font-bold text-yellow-300">{currentStep.inputLabel}</Label>
                <Input
                  type="text"
                  placeholder={currentStep.inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border-yellow-500/30 bg-yellow-950/30 text-indigo-100 placeholder:text-indigo-400/50 py-4 text-lg rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-yellow-400 bg-yellow-950/20 p-3 rounded-lg border border-yellow-500/20">
                <Lock className="h-4 w-4" />
                <span>Required to {currentStep.unlockRequirement}</span>
              </div>

              <Button
                onClick={() => handleNext(inputValue)}
                disabled={!inputValue}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 disabled:from-yellow-500/50 disabled:to-orange-500/50 py-4 text-lg font-bold rounded-full shadow-lg shadow-yellow-500/30"
              >
                <Fingerprint className="mr-2 h-5 w-5" />
                Activate Quantum Access
                <Unlock className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        )

      case "celebration":
        return (
          <div className="flex flex-col items-center text-center relative overflow-hidden">
            {/* Celebration particles */}
            <AnimatePresence>
              {showCelebration && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: ["#fbbf24", "#f59e0b", "#d97706", "#92400e"][Math.floor(Math.random() * 4)],
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0],
                        y: [0, -100, -200],
                        x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 2,
                        delay: Math.random() * 0.5,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="mb-8 relative"
            >
              {/* Jonlorenzo Caprelli Supreme Authority Coin - celebration version */}
              <div className="scale-90 relative">
                <CaprelliCoin />
                {/* Celebration glow */}
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-yellow-400/20 via-orange-400/30 to-yellow-400/20 blur-2xl animate-pulse" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
            >
              {currentStep.title}
            </motion.h2>

            {currentStep.celebrationData && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-6 max-w-md"
              >
                <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-950/50 to-orange-950/50 border border-yellow-500/30">
                  <h3 className="text-xl font-bold text-yellow-300 mb-2 flex items-center gap-2">
                    <Trophy className="h-6 w-6" />
                    {currentStep.celebrationData.achievement}
                  </h3>
                  <p className="text-yellow-200 mb-4">{currentStep.celebrationData.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-bold text-orange-300 flex items-center gap-2">
                      <Gem className="h-4 w-4" />
                      Rewards Unlocked:
                    </h4>
                    {currentStep.celebrationData.rewards.map((reward, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className="flex items-center gap-2 text-yellow-200"
                      >
                        <Star className="h-4 w-4 text-yellow-400" />
                        {reward}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-950/50 to-indigo-950/50 border border-purple-500/30">
                    <p className="text-sm text-purple-300">
                      <Clock className="inline h-4 w-4 mr-1" />
                      Next Unlock: {currentStep.celebrationData.nextUnlock}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8"
            >
              <div className="text-yellow-300 text-lg font-medium mb-4">Preparing next quantum phase...</div>
              <Progress value={100} className="w-64 h-2" />
            </motion.div>
          </div>
        )

      case "completion":
        return (
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -360 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 2, ease: "backOut" }}
              className="mb-8 relative"
            >
              {/* Jonlorenzo Caprelli Supreme Authority Coin - final celebration */}
              <div className="scale-110 relative">
                <CaprelliCoin />
                {/* Final celebration effects */}
                <div className="absolute -inset-12 rounded-full bg-gradient-to-r from-yellow-400/30 via-orange-400/40 to-yellow-400/30 blur-3xl animate-pulse" />
                <div
                  className="absolute -inset-16 rounded-full bg-gradient-to-r from-purple-400/20 via-cyan-400/20 to-purple-400/20 blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-4 text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-400 bg-clip-text text-transparent"
            >
              {currentStep.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mb-2 text-xl text-purple-300 font-medium"
            >
              {currentStep.subtitle}
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mb-8 text-indigo-300 max-w-md"
            >
              {currentStep.description}
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <Button
                onClick={() => handleNext()}
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-purple-600 text-white hover:from-yellow-600 hover:via-orange-600 hover:to-purple-700 px-12 py-6 text-xl font-bold rounded-full shadow-2xl shadow-purple-500/50"
              >
                <Rocket className="mr-3 h-6 w-6" />
                Enter My Financial Empire
                <Crown className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
      </div>

      {/* Progress bar */}
      {currentStep.type !== "cinematic-intro" && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 p-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 flex items-center justify-between text-sm text-indigo-300">
              <span>Quantum Transformation Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <HolographicGlassCard className="p-8">
            {renderStepContent()}

            {/* Chat interface for conversational steps */}
            {(currentStep.type === "welcome" || messages.length > 0) && currentStep.type !== "cinematic-intro" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 max-h-96 overflow-y-auto rounded-xl bg-indigo-950/50 p-4 backdrop-blur-sm border border-indigo-500/20"
              >
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                            : message.role === "system"
                              ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-center font-bold"
                              : "bg-indigo-900/50 text-indigo-100 border border-indigo-500/20"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="mb-2 flex items-center gap-2">
                            <Bot className="h-4 w-4 text-cyan-400" />
                            <span className="text-xs font-medium text-cyan-400">ARIA</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="rounded-lg bg-indigo-900/50 p-3 border border-indigo-500/20">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-cyan-400" />
                          <span className="text-xs font-medium text-cyan-400">ARIA</span>
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </motion.div>
            )}

            {/* Unlocked features display */}
            {unlockedFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6 rounded-xl bg-gradient-to-r from-yellow-950/30 to-orange-950/30 p-4 border border-yellow-500/30"
              >
                <h4 className="mb-3 font-bold text-yellow-300 flex items-center gap-2">
                  <Unlock className="h-5 w-5" />
                  Unlocked Quantum Features:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {unlockedFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <HolographicBadge variant="premium" glow={true}>
                        <Star className="mr-1 h-3 w-3" />
                        {feature.replace(/-/g, " ")}
                      </HolographicBadge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </HolographicGlassCard>
        </div>
      </div>
    </div>
  )
}
