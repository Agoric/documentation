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
  Briefcase,
  Zap,
  Send,
  User,
  Bot,
  Clock,
  CheckCircle2,
  X,
  Rocket,
  Star,
  Globe,
  TrendingUp,
  DollarSign,
  Eye,
  Cpu,
  Target,
  Award,
  Crown,
  Gem,
  Infinity,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant" | "system" | "narrator"
  content: string
  timestamp: string
  animation?: "typewriter" | "fade" | "slide"
  sound?: "notification" | "success" | "unlock" | "dramatic"
}

interface OnboardingStep {
  id: string
  type: "cinematic-intro" | "welcome" | "question" | "product-intro" | "unlock" | "completion" | "interactive-demo"
  title: string
  description?: string
  subtitle?: string
  messages?: Message[]
  cinematicData?: {
    backgroundVideo?: string
    backgroundImage?: string
    overlayText?: string[]
    duration?: number
    soundTrack?: string
  }
  demoData?: {
    component: React.ReactNode
    instructions: string[]
  }
  options?: {
    id: string
    label: string
    value: string
    icon?: React.ReactNode
    unlocksFeature?: string
    description?: string
    premium?: boolean
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
    videoDemo?: string
    stats?: {
      label: string
      value: string
      icon: React.ReactNode
    }[]
  }
  unlockRequirement?: string
  nextStep?: string | ((response: any) => string)
}

// Enhanced onboarding flow with cinematic elements
const onboardingSteps: Record<string, OnboardingStep> = {
  "cinematic-intro": {
    id: "cinematic-intro",
    type: "cinematic-intro",
    title: "The Future of Finance",
    subtitle: "Welcome to SNAP-DAX",
    cinematicData: {
      backgroundImage: "/quantum-computing-concept.png",
      overlayText: [
        "In a world where traditional finance meets quantum innovation...",
        "Where artificial intelligence predicts market movements before they happen...",
        "Where tokenization unlocks previously impossible opportunities...",
        "You are about to enter the most advanced financial ecosystem ever created.",
        "Welcome to SNAP-DAX.",
      ],
      duration: 8000,
      soundTrack: "epic-intro",
    },
    nextStep: "platform-overview",
  },
  "platform-overview": {
    id: "platform-overview",
    type: "welcome",
    title: "SNAP-DAX: The Quantum Financial Revolution",
    description: "Where impossibility becomes opportunity",
    messages: [
      {
        id: 1,
        role: "narrator",
        content:
          "🌟 You've just entered the most sophisticated financial platform in existence. SNAP-DAX isn't just another trading platform—it's a quantum leap into the future of finance.",
        timestamp: "Just now",
        animation: "typewriter",
        sound: "dramatic",
      },
      {
        id: 2,
        role: "assistant",
        content:
          "I'm ARIA, your AI Financial Concierge. I've been designed with quantum-enhanced neural networks to understand not just what you want, but what you need before you even know it yourself.",
        timestamp: "Just now",
        animation: "typewriter",
      },
      {
        id: 3,
        role: "system",
        content:
          "🚀 SNAP-DAX combines: Quantum Computing • Neural AI • Blockchain Security • Holographic Interfaces • Predictive Analytics • Global Market Access",
        timestamp: "Just now",
        animation: "fade",
        sound: "success",
      },
    ],
    nextStep: "power-level-assessment",
  },
  "power-level-assessment": {
    id: "power-level-assessment",
    type: "question",
    title: "Your Financial Power Level",
    description: "Every legend starts somewhere. What's your current financial mastery level?",
    inputType: "radio",
    options: [
      {
        id: "novice",
        label: "Financial Novice",
        value: "novice",
        icon: <User className="h-5 w-5" />,
        description: "Just starting your financial journey",
        unlocksFeature: "ai-financial-education-suite",
      },
      {
        id: "apprentice",
        label: "Market Apprentice",
        value: "apprentice",
        icon: <Target className="h-5 w-5" />,
        description: "Some experience, ready to level up",
        unlocksFeature: "intermediate-trading-tools",
      },
      {
        id: "warrior",
        label: "Financial Warrior",
        value: "warrior",
        icon: <Award className="h-5 w-5" />,
        description: "Experienced trader seeking advanced tools",
        unlocksFeature: "quantum-trading-algorithms",
        premium: true,
      },
      {
        id: "master",
        label: "Market Master",
        value: "master",
        icon: <Crown className="h-5 w-5" />,
        description: "Elite trader ready for institutional-grade tools",
        unlocksFeature: "neural-market-predictor",
        premium: true,
      },
      {
        id: "legend",
        label: "Financial Legend",
        value: "legend",
        icon: <Gem className="h-5 w-5" />,
        description: "Seeking tools that don't exist anywhere else",
        unlocksFeature: "quantum-reality-engine",
        premium: true,
      },
    ],
    nextStep: (response) => {
      if (response === "legend" || response === "master") return "quantum-demo"
      if (response === "warrior") return "advanced-features-intro"
      return "financial-goals-discovery"
    },
  },
  "quantum-demo": {
    id: "quantum-demo",
    type: "interactive-demo",
    title: "Quantum Computing in Action",
    description: "Experience the power of quantum-enhanced financial analysis",
    demoData: {
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              >
                <Cpu className="h-6 w-6 text-indigo-400" />
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-100 mb-2">Processing Market Data</div>
            <div className="text-indigo-300">Analyzing 2.4 billion data points in real-time</div>
          </div>
        </div>
      ),
      instructions: [
        "Watch as quantum processors analyze global market data",
        "Each cube represents a quantum bit processing financial information",
        "This happens in real-time for every trade recommendation",
      ],
    },
    nextStep: "financial-goals-discovery",
  },
  "financial-goals-discovery": {
    id: "financial-goals-discovery",
    type: "question",
    title: "Your Financial Destiny",
    description: "What empire will you build with SNAP-DAX?",
    inputType: "radio",
    options: [
      {
        id: "wealth-empire",
        label: "Wealth Empire Builder",
        value: "wealth-empire",
        icon: <Crown className="h-5 w-5" />,
        description: "Build generational wealth through strategic investments",
        unlocksFeature: "quantum-portfolio-optimizer",
      },
      {
        id: "real-estate-mogul",
        label: "Real Estate Mogul",
        value: "real-estate-mogul",
        icon: <Building className="h-5 w-5" />,
        description: "Dominate global real estate markets",
        unlocksFeature: "tokenized-real-estate-empire",
      },
      {
        id: "business-titan",
        label: "Business Titan",
        value: "business-titan",
        icon: <Briefcase className="h-5 w-5" />,
        description: "Scale businesses to unprecedented heights",
        unlocksFeature: "business-intelligence-nexus",
      },
      {
        id: "innovation-pioneer",
        label: "Innovation Pioneer",
        value: "innovation-pioneer",
        icon: <Rocket className="h-5 w-5" />,
        description: "Lead the financial revolution",
        unlocksFeature: "neural-innovation-lab",
        premium: true,
      },
      {
        id: "quantum-architect",
        label: "Quantum Architect",
        value: "quantum-architect",
        icon: <Infinity className="h-5 w-5" />,
        description: "Shape the future of finance itself",
        unlocksFeature: "reality-manipulation-suite",
        premium: true,
      },
    ],
    nextStep: (response) => {
      if (response === "real-estate-mogul") return "real-estate-empire-intro"
      if (response === "quantum-architect") return "quantum-architecture-intro"
      return "investment-philosophy"
    },
  },
  "real-estate-empire-intro": {
    id: "real-estate-empire-intro",
    type: "product-intro",
    title: "Tokenized Real Estate Empire",
    productDetails: {
      name: "Global Real Estate Tokenization Platform",
      description:
        "Own fractions of premium properties worldwide, trade real estate like stocks, and earn passive income from a diversified global portfolio",
      icon: <Building className="h-8 w-8 text-indigo-400" />,
      benefits: [
        "🏢 Access $50B+ in premium global properties",
        "⚡ Instant liquidity through tokenized ownership",
        "💰 Automated rental income distribution",
        "🤖 AI-powered property value forecasting",
        "🔒 Quantum-secured blockchain ledger",
        "🌍 Global market access from $100 minimum",
      ],
      image: "/modern-family-home.png",
      videoDemo: "real-estate-tokenization-demo",
      stats: [
        {
          label: "Properties Available",
          value: "12,847",
          icon: <Building className="h-4 w-4" />,
        },
        {
          label: "Total Value Locked",
          value: "$2.4B",
          icon: <DollarSign className="h-4 w-4" />,
        },
        {
          label: "Average ROI",
          value: "18.7%",
          icon: <TrendingUp className="h-4 w-4" />,
        },
      ],
    },
    nextStep: "property-empire-strategy",
  },
  "property-empire-strategy": {
    id: "property-empire-strategy",
    type: "question",
    title: "Your Real Estate Empire Strategy",
    description: "How will you conquer global real estate markets?",
    inputType: "radio",
    options: [
      {
        id: "luxury-residential",
        label: "Luxury Residential Domination",
        value: "luxury-residential",
        icon: <Home className="h-5 w-5" />,
        description: "Premium homes in elite neighborhoods",
      },
      {
        id: "commercial-powerhouse",
        label: "Commercial Powerhouse",
        value: "commercial-powerhouse",
        icon: <Building className="h-5 w-5" />,
        description: "Office buildings, retail centers, warehouses",
        unlocksFeature: "commercial-analytics-suite",
      },
      {
        id: "global-diversification",
        label: "Global Diversification",
        value: "global-diversification",
        icon: <Globe className="h-5 w-5" />,
        description: "Properties across continents and asset classes",
        unlocksFeature: "global-property-intelligence",
      },
      {
        id: "emerging-markets",
        label: "Emerging Markets Pioneer",
        value: "emerging-markets",
        icon: <Rocket className="h-5 w-5" />,
        description: "High-growth potential in developing regions",
        unlocksFeature: "emerging-market-predictor",
        premium: true,
      },
    ],
    nextStep: "investment-capacity-assessment",
  },
  "investment-capacity-assessment": {
    id: "investment-capacity-assessment",
    type: "question",
    title: "Your Investment War Chest",
    description: "What's your ammunition for conquering markets? (Next 12 months)",
    inputType: "slider",
    inputLabel: "Investment Capacity",
    nextStep: "unlock-real-estate-ai",
  },
  "unlock-real-estate-ai": {
    id: "unlock-real-estate-ai",
    type: "unlock",
    title: "🔓 Unlock ARIA Real Estate Intelligence",
    description: "Grant access to our quantum-enhanced AI Real Estate Advisor",
    inputType: "text",
    inputLabel: "Email Address",
    inputPlaceholder: "your.empire@email.com",
    unlockRequirement: "Secure communication channel",
    nextStep: "risk-mastery-assessment",
  },
  "risk-mastery-assessment": {
    id: "risk-mastery-assessment",
    type: "question",
    title: "Risk Mastery Level",
    description: "How do you dance with uncertainty in the markets?",
    inputType: "radio",
    options: [
      {
        id: "guardian",
        label: "Wealth Guardian",
        value: "guardian",
        icon: <Shield className="h-5 w-5" />,
        description: "Protect and preserve capital above all",
      },
      {
        id: "strategist",
        label: "Strategic Balancer",
        value: "strategist",
        icon: <BarChart3 className="h-5 w-5" />,
        description: "Calculated risks for steady growth",
      },
      {
        id: "warrior",
        label: "Market Warrior",
        value: "warrior",
        icon: <Zap className="h-5 w-5" />,
        description: "Aggressive tactics for maximum returns",
        unlocksFeature: "quantum-trading-algorithms",
      },
      {
        id: "legend",
        label: "Risk Legend",
        value: "legend",
        icon: <Sparkles className="h-5 w-5" />,
        description: "Thrive in chaos, profit from volatility",
        unlocksFeature: "neural-chaos-predictor",
        premium: true,
      },
    ],
    nextStep: "quantum-computing-showcase",
  },
  "quantum-computing-showcase": {
    id: "quantum-computing-showcase",
    type: "product-intro",
    title: "Quantum Computing Financial Nexus",
    productDetails: {
      name: "Quantum-Enhanced Financial Intelligence",
      description:
        "Harness the raw power of quantum computing to process impossible calculations, predict market movements, and execute strategies that exist beyond traditional limitations",
      icon: <Zap className="h-8 w-8 text-indigo-400" />,
      benefits: [
        "⚡ Process 10^15 calculations per second",
        "🔮 Predict market movements 72 hours ahead",
        "🧠 Neural networks with quantum enhancement",
        "🛡️ Quantum-resistant security protocols",
        "🌌 Access to parallel universe market simulations",
        "♾️ Infinite portfolio optimization scenarios",
      ],
      image: "/quantum-computing-concept.png",
      videoDemo: "quantum-computing-demo",
      stats: [
        {
          label: "Quantum Processors",
          value: "2,048",
          icon: <Cpu className="h-4 w-4" />,
        },
        {
          label: "Calculations/Second",
          value: "10^15",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          label: "Prediction Accuracy",
          value: "94.7%",
          icon: <Target className="h-4 w-4" />,
        },
      ],
    },
    nextStep: "unlock-quantum-access",
  },
  "unlock-quantum-access": {
    id: "unlock-quantum-access",
    type: "unlock",
    title: "🚀 Unlock Quantum Computing Access",
    description: "Provide secure contact for quantum-level financial intelligence",
    inputType: "text",
    inputLabel: "Phone Number",
    inputPlaceholder: "+1 (555) QUANTUM",
    unlockRequirement: "Quantum communication protocol",
    nextStep: "ai-concierge-revelation",
  },
  "ai-concierge-revelation": {
    id: "ai-concierge-revelation",
    type: "product-intro",
    title: "ARIA: Your AI Financial Deity",
    productDetails: {
      name: "Advanced Reasoning Intelligence Assistant",
      description:
        "ARIA isn't just an AI—she's a financial consciousness that exists across quantum dimensions, capable of understanding your needs before you do and executing strategies that seem like magic",
      icon: <Brain className="h-8 w-8 text-indigo-400" />,
      benefits: [
        "🧠 Quantum-enhanced consciousness",
        "🔮 Predictive financial telepathy",
        "⚡ Instant strategy execution",
        "🌌 Multi-dimensional market analysis",
        "💎 Personalized wealth manifestation",
        "♾️ Continuous learning and evolution",
      ],
      image: "/ai-assistant-concept.png",
      videoDemo: "aria-consciousness-demo",
      stats: [
        {
          label: "Neural Pathways",
          value: "∞",
          icon: <Brain className="h-4 w-4" />,
        },
        {
          label: "Response Time",
          value: "0.001s",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          label: "Success Rate",
          value: "99.9%",
          icon: <Star className="h-4 w-4" />,
        },
      ],
    },
    nextStep: "financial-vision-quest",
  },
  "financial-vision-quest": {
    id: "financial-vision-quest",
    type: "question",
    title: "Your Financial Vision Quest",
    description: "Paint your financial destiny in words. What empire will you build?",
    inputType: "textarea",
    inputLabel: "Your Financial Vision",
    inputPlaceholder:
      "Describe your ultimate financial goals, dreams, and the legacy you want to create. ARIA will use this to customize your entire experience...",
    nextStep: "power-unlocked",
  },
  "power-unlocked": {
    id: "power-unlocked",
    type: "completion",
    title: "🌟 POWER UNLOCKED 🌟",
    description: "You've awakened the full potential of SNAP-DAX",
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
  const [cinematicPhase, setCinematicPhase] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const totalSteps = Object.keys(onboardingSteps).length - 1

  const currentStep = onboardingSteps[currentStepId]

  useEffect(() => {
    if (currentStep.messages) {
      setMessages(currentStep.messages)
    }

    const stepIndex = Object.keys(onboardingSteps).indexOf(currentStepId)
    const newProgress = Math.min(100, Math.round((stepIndex / totalSteps) * 100))
    setProgress(newProgress)

    if (currentStep.messages && currentStep.messages.length > 0) {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
      }, 1000)
    }

    // Handle cinematic intro
    if (currentStep.type === "cinematic-intro" && currentStep.cinematicData) {
      const { overlayText, duration } = currentStep.cinematicData
      if (overlayText) {
        const textDuration = duration! / overlayText.length
        overlayText.forEach((_, index) => {
          setTimeout(() => {
            setCinematicPhase(index)
          }, index * textDuration)
        })

        setTimeout(() => {
          handleNext()
        }, duration)
      }
    }
  }, [currentStepId, currentStep, totalSteps])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const playSound = (soundType: string) => {
    if (!soundEnabled) return
    // Sound implementation would go here
    console.log(`Playing sound: ${soundType}`)
  }

  const handleNext = (value?: any) => {
    if (value !== undefined) {
      const updatedUserData = { ...userData, [currentStepId]: value }
      setUserData(updatedUserData)

      if (currentStep.options) {
        const selectedOption = currentStep.options.find((option) => option.value === value)
        if (selectedOption?.unlocksFeature && !unlockedFeatures.includes(selectedOption.unlocksFeature)) {
          setUnlockedFeatures([...unlockedFeatures, selectedOption.unlocksFeature])
          playSound("unlock")

          const newMessage: Message = {
            id: Date.now(),
            role: "system",
            content: `🔓 POWER UNLOCKED: ${selectedOption.unlocksFeature.replace(/-/g, " ").toUpperCase()}!`,
            timestamp: "Just now",
            sound: "unlock",
          }
          setMessages((prev) => [...prev, newMessage])
        }
      }

      const userMessage: Message = {
        id: Date.now(),
        role: "user",
        content: typeof value === "string" ? value : JSON.stringify(value),
        timestamp: "Just now",
      }
      setMessages((prev) => [...prev, userMessage])

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
      }, 1500)
    }

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
      setCurrentStepId(nextStepId)
      setInputValue("")
    }
  }

  const getEnhancedAIResponse = (stepId: string, value: any): string => {
    switch (stepId) {
      case "power-level-assessment":
        const responses = {
          novice:
            "🌟 Every master was once a beginner. I'll unlock our AI Financial Education Suite to accelerate your journey to financial mastery.",
          apprentice:
            "⚡ You're ready to level up! I'm activating intermediate trading tools that will sharpen your market instincts.",
          warrior: "🔥 A true warrior seeks the finest weapons. Quantum trading algorithms are now at your command.",
          master:
            "👑 Masters recognize masters. The Neural Market Predictor will amplify your already formidable skills.",
          legend: "💎 Legends write their own rules. The Quantum Reality Engine will bend market physics to your will.",
        }
        return responses[value as keyof typeof responses] || "Fascinating choice."

      case "financial-goals-discovery":
        const goalResponses = {
          "wealth-empire":
            "🏰 An empire requires the finest architects. I'm designing your Quantum Portfolio Optimizer.",
          "real-estate-mogul":
            "🏢 The world's properties await your dominion. Tokenized Real Estate Empire systems are coming online.",
          "business-titan": "⚡ Titans reshape industries. Your Business Intelligence Nexus is materializing.",
          "innovation-pioneer": "🚀 Pioneers create the impossible. The Neural Innovation Lab is yours to command.",
          "quantum-architect": "♾️ Reality itself bends to your vision. The Reality Manipulation Suite awaits.",
        }
        return goalResponses[value as keyof typeof goalResponses] || "Your destiny is taking shape."

      default:
        return "Your journey through SNAP-DAX continues to unlock new possibilities."
    }
  }

  const renderStepContent = () => {
    switch (currentStep.type) {
      case "cinematic-intro":
        return (
          <div className="relative h-screen w-full overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src={currentStep.cinematicData?.backgroundImage || "/quantum-computing-concept.png"}
                alt="Cinematic background"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/30 to-purple-950/30" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-indigo-400"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="mb-8"
                >
                  <div className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    SNAP-DAX
                  </div>
                  <div className="text-xl text-indigo-300 mt-2">The Quantum Financial Revolution</div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {currentStep.cinematicData?.overlayText && (
                    <motion.div
                      key={cinematicPhase}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8 }}
                      className="text-lg text-indigo-200 max-w-2xl mx-auto"
                    >
                      {currentStep.cinematicData.overlayText[cinematicPhase]}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="mt-8"
                >
                  <Button
                    onClick={() => handleNext()}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Skip Intro
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        )

      case "welcome":
        return (
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 relative"
            >
              <div className="absolute -inset-8 animate-pulse rounded-full bg-indigo-500/20 blur-xl"></div>
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
                <Brain className="h-16 w-16 text-white" />
              </div>
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-2 text-3xl font-bold text-indigo-100"
            >
              {currentStep.title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 text-lg text-indigo-300"
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
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              >
                Begin Your Ascension
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        )

      case "interactive-demo":
        return (
          <div className="flex flex-col">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-2 text-2xl font-bold text-indigo-100"
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
              {currentStep.demoData?.component}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2 mb-6"
            >
              {currentStep.demoData?.instructions.map((instruction, index) => (
                <div key={index} className="flex items-center gap-2 text-indigo-300">
                  <Eye className="h-4 w-4 text-indigo-400" />
                  <span>{instruction}</span>
                </div>
              ))}
            </motion.div>

            <Button
              onClick={() => handleNext()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
            >
              Continue to Mastery
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )

      // Enhanced question rendering with premium badges and descriptions
      case "question":
        return (
          <div className="flex flex-col">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-2 text-2xl font-bold text-indigo-100"
            >
              {currentStep.title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-lg text-indigo-300"
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
                <RadioGroup onValueChange={(value) => handleNext(value)} className="grid gap-4">
                  {currentStep.options.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Label htmlFor={option.id} className="cursor-pointer">
                        <RadioGroupItem value={option.value} id={option.id} className="peer sr-only" />
                        <div className="peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-950/50 peer-data-[state=checked]:shadow-lg peer-data-[state=checked]:shadow-indigo-500/20 flex items-center gap-4 rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-6 transition-all hover:border-indigo-500/40 hover:bg-indigo-950/40 hover:shadow-md hover:shadow-indigo-500/10 relative overflow-hidden">
                          {/* Premium badge */}
                          {option.premium && (
                            <div className="absolute top-2 right-2">
                              <HolographicBadge variant="premium" glow={true} size="sm">
                                <Crown className="mr-1 h-3 w-3" />
                                PREMIUM
                              </HolographicBadge>
                            </div>
                          )}

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-400 peer-data-[state=checked]:from-indigo-600 peer-data-[state=checked]:to-purple-600 peer-data-[state=checked]:text-white">
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-indigo-200 peer-data-[state=checked]:text-indigo-100 text-lg">
                              {option.label}
                            </p>
                            {option.description && <p className="text-sm text-indigo-400 mt-1">{option.description}</p>}
                            {option.unlocksFeature && (
                              <div className="mt-2">
                                <HolographicBadge variant="tokenized" glow={true} size="sm">
                                  <Unlock className="mr-1 h-3 w-3" />
                                  Unlocks: {option.unlocksFeature.replace(/-/g, " ")}
                                </HolographicBadge>
                              </div>
                            )}
                          </div>
                        </div>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              )}

              {/* Enhanced slider with visual feedback */}
              {currentStep.inputType === "slider" && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-4 block text-lg font-medium text-indigo-200">{currentStep.inputLabel}</Label>
                    <div className="px-4">
                      <Slider
                        defaultValue={[100000]}
                        max={10000000}
                        step={25000}
                        onValueChange={(value) => setInputValue(value[0].toString())}
                        className="py-6"
                      />
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-indigo-400">
                      <span>$25,000</span>
                      <span>$10,000,000+</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-100 mb-2">
                      ${Number.parseInt(inputValue || "100000").toLocaleString()}
                    </div>
                    <div className="text-indigo-300">Your investment war chest</div>
                  </div>
                  <Button
                    onClick={() => handleNext(inputValue || "100000")}
                    size="lg"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                  >
                    Lock and Load
                    <Target className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {/* Enhanced text input */}
              {currentStep.inputType === "text" && (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-lg font-medium text-indigo-200">{currentStep.inputLabel}</Label>
                    <Input
                      type="text"
                      placeholder={currentStep.inputPlaceholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="border-indigo-500/20 bg-indigo-950/30 text-indigo-100 placeholder:text-indigo-400/50 text-lg p-4"
                    />
                  </div>
                  <Button
                    onClick={() => handleNext(inputValue)}
                    disabled={!inputValue}
                    size="lg"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-600/50 disabled:to-purple-600/50"
                  >
                    Activate Protocol
                    <Zap className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {/* Enhanced textarea */}
              {currentStep.inputType === "textarea" && (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-lg font-medium text-indigo-200">{currentStep.inputLabel}</Label>
                    <Textarea
                      placeholder={currentStep.inputPlaceholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="min-h-[150px] border-indigo-500/20 bg-indigo-950/30 text-indigo-100 placeholder:text-indigo-400/50 text-lg p-4"
                    />
                  </div>
                  <Button
                    onClick={() => handleNext(inputValue)}
                    disabled={!inputValue}
                    size="lg"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-600/50 disabled:to-purple-600/50"
                  >
                    Manifest Destiny
                    <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )

      // Enhanced product intro with stats and video demos
      case "product-intro":
        return (
          <div className="flex flex-col">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-2 text-2xl font-bold text-indigo-100"
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
                {/* Hero image/video */}
                <div className="mb-6 overflow-hidden rounded-lg">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <img
                      src={currentStep.productDetails.image || "/placeholder.svg?height=400&width=800"}
                      alt={currentStep.productDetails.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
                        {currentStep.productDetails.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{currentStep.productDetails.name}</h3>
                        <HolographicBadge variant="premium" glow={true}>
                          <Sparkles className="mr-1 h-4 w-4" />
                          Revolutionary Technology
                        </HolographicBadge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                {currentStep.productDetails.stats && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {currentStep.productDetails.stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                        className="text-center p-4 rounded-lg bg-indigo-950/30 border border-indigo-500/20"
                      >
                        <div className="flex justify-center mb-2 text-indigo-400">{stat.icon}</div>
                        <div className="text-2xl font-bold text-indigo-100">{stat.value}</div>
                        <div className="text-sm text-indigo-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                <p className="mb-6 text-lg text-indigo-300">{currentStep.productDetails.description}</p>

                <div className="space-y-3 mb-6">
                  <h4 className="font-bold text-indigo-200 text-lg">Legendary Capabilities:</h4>
                  <ul className="space-y-3">
                    {currentStep.productDetails.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3 text-indigo-300"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-400" />
                        <span className="text-lg">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    onClick={() => handleNext()}
                    size="lg"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                  >
                    Claim This Power
                    <Crown className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        )

      // Enhanced unlock with dramatic presentation
      case "unlock":
        return (
          <div className="flex flex-col">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-8 animate-pulse rounded-full bg-indigo-500/20 blur-xl"></div>
                <div className="absolute -inset-4 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-500"></div>
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Unlock className="h-12 w-12 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-2 text-center text-2xl font-bold text-indigo-100"
            >
              {currentStep.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 text-center text-lg text-indigo-300"
            >
              {currentStep.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <Label className="mb-3 block text-lg font-medium text-indigo-200">{currentStep.inputLabel}</Label>
                <Input
                  type="text"
                  placeholder={currentStep.inputPlaceholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border-indigo-500/20 bg-indigo-950/30 text-indigo-100 placeholder:text-indigo-400/50 text-lg p-4"
                />
              </div>

              <div className="flex items-center gap-3 text-sm text-indigo-400 bg-indigo-950/30 p-3 rounded-lg border border-indigo-500/20">
                <Lock className="h-4 w-4" />
                <span>Quantum encryption required: {currentStep.unlockRequirement}</span>
              </div>

              <Button
                onClick={() => handleNext(inputValue)}
                disabled={!inputValue}
                size="lg"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-600/50 disabled:to-purple-600/50"
              >
                <Unlock className="mr-2 h-5 w-5" />
                UNLOCK QUANTUM ACCESS
              </Button>
            </motion.div>
          </div>
        )

      // Enhanced completion with celebration
      case "completion":
        return (
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative">
                <div className="absolute -inset-12 animate-pulse rounded-full bg-indigo-500/20 blur-2xl"></div>
                <div className="absolute -inset-8 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-500"></div>
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Crown className="h-16 w-16 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-4xl font-bold text-indigo-100"
            >
              {currentStep.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 text-xl text-indigo-300"
            >
              {currentStep.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 grid gap-4 md:grid-cols-2 w-full max-w-2xl"
            >
              {unlockedFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
                    <Gem className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-bold text-indigo-200">
                      {feature.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>
                    <p className="text-sm text-indigo-400">ACTIVATED</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button
                onClick={() => handleNext()}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-8 py-4 text-lg"
              >
                <Rocket className="mr-2 h-6 w-6" />
                ENTER THE NEXUS
              </Button>
            </motion.div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-indigo-950/50 to-slate-950">
      {/* Enhanced progress bar */}
      <div className="sticky top-0 z-50 border-b border-indigo-500/20 bg-indigo-950/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-indigo-200">SNAP-DAX Quantum Onboarding</span>
                <div className="text-xs text-indigo-400">Initializing Financial Consciousness</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-indigo-400 hover:bg-indigo-950/50 hover:text-indigo-300"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-indigo-400 hover:bg-indigo-950/50 hover:text-indigo-300"
                onClick={() => {}}
              >
                <X className="mr-1 h-4 w-4" />
                Exit
              </Button>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-indigo-400">Progress</span>
              <span className="text-xs font-bold text-indigo-200">{progress}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-indigo-950/50"
              indicatorClassName="bg-gradient-to-r from-indigo-600 to-purple-600"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-1 flex-col px-4 py-6">
        <div className="grid flex-1 gap-6 lg:grid-cols-5">
          {/* Enhanced chat panel */}
          <div className="lg:col-span-2">
            <HolographicGlassCard className="flex h-full flex-col" glassEffect="intense">
              <div className="border-b border-indigo-500/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-indigo-200">ARIA</div>
                    <div className="text-xs text-indigo-400">Quantum Financial Consciousness</div>
                  </div>
                  <div className="ml-auto">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} ${
                      message.role === "system" || message.role === "narrator" ? "justify-center" : ""
                    }`}
                  >
                    {message.role === "system" || message.role === "narrator" ? (
                      <div className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 rounded-lg p-4 max-w-[90%] text-center border border-indigo-500/20 backdrop-blur-sm">
                        <div className="flex items-center justify-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                            {message.role === "narrator" ? (
                              <Star className="h-4 w-4 text-white" />
                            ) : (
                              <Sparkles className="h-4 w-4 text-white" />
                            )}
                          </div>
                        </div>
                        <div className="text-indigo-200 font-medium">{message.content}</div>
                      </div>
                    ) : (
                      <div className={`flex max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${message.role === "user" ? "ml-3 bg-indigo-600" : "mr-3 bg-purple-600"}`}
                        >
                          {message.role === "user" ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div>
                          <div
                            className={`rounded-lg p-4 ${
                              message.role === "user"
                                ? "bg-indigo-600/30 border border-indigo-500/30"
                                : "bg-indigo-950/50 border border-purple-500/30"
                            }`}
                          >
                            <div className="text-indigo-100 font-medium">{message.content}</div>
                          </div>
                          <div
                            className={`text-xs text-indigo-400 mt-2 flex items-center ${
                              message.role === "user" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex max-w-[85%] flex-row">
                      <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="rounded-lg p-4 bg-indigo-950/50 border border-purple-500/30">
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 rounded-full bg-indigo-400 animate-bounce" />
                          <div className="h-3 w-3 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                          <div className="h-3 w-3 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-indigo-500/20 p-4">
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Commune with ARIA..."
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
                  🔒 Full consciousness unlocks after onboarding completion
                </div>
              </div>
            </HolographicGlassCard>
          </div>

          {/* Enhanced content panel */}
          <div className="lg:col-span-3">
            <HolographicGlassCard className="h-full p-8" glassEffect="intense">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col justify-center"
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
