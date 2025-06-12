"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, BarChart3, Brain, Shield, Zap, TrendingUp, Layers, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [query])

  return matches
}

type FeatureDemo = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  interface: React.ReactNode
  mobileInterface: React.ReactNode
}

export function InteractiveProductDemo() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showFeatureList, setShowFeatureList] = useState(false)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const features: FeatureDemo[] = [
    {
      id: "ai-insights",
      title: "AI-Powered Insights",
      description:
        "Our advanced AI analyzes your financial data to provide personalized recommendations and insights, helping you make smarter financial decisions.",
      icon: <Brain className="h-6 w-6" />,
      interface: <AiInsightsInterface />,
      mobileInterface: <AiInsightsMobileInterface />,
    },
    {
      id: "holographic-viz",
      title: "Holographic Visualization",
      description:
        "Experience your financial data in stunning 3D holographic displays that make complex information intuitive and actionable.",
      icon: <BarChart3 className="h-6 w-6" />,
      interface: <HolographicVizInterface />,
      mobileInterface: <HolographicVizMobileInterface />,
    },
    {
      id: "quantum-secure",
      title: "Quantum-Secure Protection",
      description:
        "State-of-the-art security protocols protect your financial data with quantum-resistant encryption and advanced threat detection.",
      icon: <Shield className="h-6 w-6" />,
      interface: <QuantumSecureInterface />,
      mobileInterface: <QuantumSecureMobileInterface />,
    },
    {
      id: "predictive-analytics",
      title: "Predictive Analytics",
      description:
        "Forecast financial trends and opportunities with our advanced predictive modeling system that helps you stay ahead of market changes.",
      icon: <TrendingUp className="h-6 w-6" />,
      interface: <PredictiveAnalyticsInterface />,
      mobileInterface: <PredictiveAnalyticsMobileInterface />,
    },
    {
      id: "realtime-processing",
      title: "Real-Time Processing",
      description:
        "Instant transaction processing and updates ensure you always have the latest financial information at your fingertips.",
      icon: <Zap className="h-6 w-6" />,
      interface: <RealtimeProcessingInterface />,
      mobileInterface: <RealtimeProcessingMobileInterface />,
    },
    {
      id: "multi-platform",
      title: "Multi-Platform Integration",
      description:
        "Seamlessly connect with all your financial accounts and services in one unified interface for complete financial visibility.",
      icon: <Layers className="h-6 w-6" />,
      interface: <MultiPlatformInterface />,
      mobileInterface: <MultiPlatformMobileInterface />,
    },
  ]

  useEffect(() => {
    // Handle auto-play functionality
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setActiveFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1))
      }, 8000)
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [isAutoPlaying, features.length])

  // Pause auto-play on user interaction
  const handleManualNavigation = (index: number) => {
    setIsAutoPlaying(false)
    setActiveFeature(index)
    setShowFeatureList(false)

    // Resume auto-play after 30 seconds of inactivity
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
    }

    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 30000)
  }

  const handleNext = () => {
    handleManualNavigation(activeFeature === features.length - 1 ? 0 : activeFeature + 1)
  }

  const handlePrev = () => {
    handleManualNavigation(activeFeature === 0 ? features.length - 1 : activeFeature - 1)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!demoRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = demoRef.current.getBoundingClientRect()

      const x = (clientX - left) / width
      const y = (clientY - top) / height

      const glowElements = demoRef.current.querySelectorAll(".glow-effect")
      glowElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.setProperty("--mouse-x", `${x}`)
          el.style.setProperty("--mouse-y", `${y}`)
        }
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="product-demo" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 to-cyan-950/50" />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow" />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Experience </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">SnapAiFi</span>
            <span className="text-white"> in Action</span>
          </h2>
          <p className="text-cyan-100/70 max-w-2xl mx-auto">
            Take a tour of our revolutionary platform and discover how SnapAiFi transforms your financial experience.
          </p>
        </motion.div>

        <div ref={demoRef} className="relative max-w-6xl mx-auto">
          {/* Mobile Feature Selection Dropdown */}
          {isMobile && (
            <div className="mb-4 relative z-20">
              <Button
                variant="outline"
                className="w-full flex items-center justify-between border-cyan-500/50 bg-black/30 text-cyan-100 hover:bg-cyan-950/50"
                onClick={() => setShowFeatureList(!showFeatureList)}
              >
                <div className="flex items-center">
                  {features[activeFeature].icon}
                  <span className="ml-2">{features[activeFeature].title}</span>
                </div>
                <Menu className="h-5 w-5" />
              </Button>

              {showFeatureList && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg overflow-hidden z-30">
                  {features.map((feature, index) => (
                    <button
                      key={feature.id}
                      className={`w-full text-left px-4 py-3 flex items-center ${
                        index === activeFeature
                          ? "bg-cyan-500/20 text-cyan-100"
                          : "text-cyan-100/70 hover:bg-cyan-900/30"
                      }`}
                      onClick={() => handleManualNavigation(index)}
                    >
                      <span className="mr-3">{feature.icon}</span>
                      {feature.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Main Demo Interface */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-black/40 backdrop-blur-sm border border-cyan-500/30 shadow-2xl">
            {/* Interface Header */}
            <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-3 md:p-4 border-b border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400" />
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400" />
              </div>
              <div className="text-cyan-100 text-sm md:text-base font-medium">SnapAiFi Platform</div>
              <div className="w-16 md:w-20" />
            </div>

            {/* Demo Content */}
            <div className="relative h-[400px] md:h-[600px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {isMobile ? features[activeFeature].mobileInterface : features[activeFeature].interface}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-cyan-500/50 bg-black/30 text-cyan-300 hover:bg-cyan-950/50 hover:text-cyan-100"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>

                <div className="flex space-x-1 md:space-x-2">
                  {features.map((feature, index) => (
                    <button
                      key={feature.id}
                      className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                        index === activeFeature ? "bg-cyan-400 w-6 md:w-8" : "bg-cyan-800 hover:bg-cyan-600"
                      }`}
                      onClick={() => handleManualNavigation(index)}
                      aria-label={`View ${feature.title}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-cyan-500/50 bg-black/30 text-cyan-300 hover:bg-cyan-950/50 hover:text-cyan-100"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Description */}
          <div className="mt-6 md:mt-8 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl md:rounded-2xl p-4 md:p-6 glow-effect">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center mr-3 md:mr-4">
                <div className="text-cyan-300">{features[activeFeature].icon}</div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white">{features[activeFeature].title}</h3>
            </div>
            <p className="text-sm md:text-base text-cyan-100/70">{features[activeFeature].description}</p>
          </div>

          {/* Edge glow effect */}
          <div
            className="absolute -inset-1 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(45deg, rgba(79, 209, 197, 0.2), rgba(79, 70, 229, 0.2))",
              filter: "blur(20px)",
              zIndex: -1,
            }}
          />
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes rotate-3d {
          0% { transform: rotateX(60deg) rotateZ(0deg); }
          100% { transform: rotateX(60deg) rotateZ(360deg); }
        }
        
        @keyframes rotate-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes scan-bg {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
        
        @keyframes scan-line {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        
        @keyframes scan-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-beam {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float-binary {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(8, 145, 178, 0.5));
        }
        
        .perspective-\[1200px\] {
          perspective: 1200px;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-cyan-500\/30::-webkit-scrollbar-thumb {
          background-color: rgba(8, 145, 178, 0.3);
          border-radius: 3px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }
        
        .animate-float-slow {
          animation: float-slow 6s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}

// Desktop Interface Components
function AiInsightsInterface() {
  // Desktop interface implementation (existing code)
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-6 flex flex-col">
      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex flex-col">
          <div className="text-cyan-300 font-medium mb-4">Financial Assistant</div>
          <div className="space-y-3 mb-6">
            {["Dashboard", "Insights", "Planning", "Investments", "Settings"].map((item) => (
              <div
                key={item}
                className={`px-3 py-2 rounded-lg ${
                  item === "Insights" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-100/70 hover:bg-cyan-900/30"
                } cursor-pointer transition-colors`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
              <div className="text-cyan-100 font-medium mb-2">AI Assistant</div>
              <div className="text-cyan-100/70 text-sm">Ask me anything about your finances</div>
              <div className="mt-3 relative">
                <input
                  type="text"
                  className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 placeholder-cyan-100/50 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="Ask a question..."
                />
                <div className="absolute right-3 top-2.5 text-cyan-300 animate-pulse">
                  <Zap className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9 space-y-4">
          {/* Header */}
          <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-4">
            <div className="text-2xl font-semibold text-white mb-2">Welcome back, Alex</div>
            <div className="text-cyan-100/70">Here are your personalized financial insights</div>
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Insight Card 1 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-radial from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-3">
                <div className="text-cyan-100 font-medium">Spending Analysis</div>
                <div className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full">AI Insight</div>
              </div>

              <div className="text-cyan-100/90 mb-3">
                You've spent 15% less on dining this month compared to last month.
              </div>

              <div className="flex justify-between items-center">
                <div className="text-cyan-100/70 text-sm">Updated 2 hours ago</div>
                <div className="text-cyan-300 text-sm cursor-pointer hover:text-cyan-100 transition-colors">
                  View Details
                </div>
              </div>

              {/* Animated highlight */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 w-0 group-hover:w-full transition-all duration-700" />
            </div>

            {/* Insight Card 2 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-cyan-500/30 p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-radial from-purple-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-3">
                <div className="text-cyan-100 font-medium">Investment Opportunity</div>
                <div className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">AI Insight</div>
              </div>

              <div className="text-cyan-100/90 mb-3">
                Based on your goals, consider increasing your retirement contribution by 3%.
              </div>

              <div className="flex justify-between items-center">
                <div className="text-cyan-100/70 text-sm">Updated 1 day ago</div>
                <div className="text-purple-300 text-sm cursor-pointer hover:text-purple-100 transition-colors">
                  Take Action
                </div>
              </div>

              {/* Animated highlight */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-blue-500 w-0 group-hover:w-full transition-all duration-700" />
            </div>

            {/* Insight Card 3 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-xl border border-cyan-500/30 p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-radial from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-3">
                <div className="text-cyan-100 font-medium">Savings Goal</div>
                <div className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">AI Insight</div>
              </div>

              <div className="text-cyan-100/90 mb-3">
                You're on track to reach your vacation savings goal 2 months early!
              </div>

              <div className="flex justify-between items-center">
                <div className="text-cyan-100/70 text-sm">Updated 5 hours ago</div>
                <div className="text-green-300 text-sm cursor-pointer hover:text-green-100 transition-colors">
                  View Goal
                </div>
              </div>

              {/* Animated highlight */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 w-0 group-hover:w-full transition-all duration-700" />
            </div>

            {/* Insight Card 4 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-amber-900/30 rounded-xl border border-cyan-500/30 p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-radial from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-3">
                <div className="text-cyan-100 font-medium">Bill Reminder</div>
                <div className="bg-amber-500/20 text-amber-300 text-xs px-2 py-1 rounded-full">AI Insight</div>
              </div>

              <div className="text-cyan-100/90 mb-3">
                Your electricity bill is due in 3 days. It's $15 higher than usual.
              </div>

              <div className="flex justify-between items-center">
                <div className="text-cyan-100/70 text-sm">Updated today</div>
                <div className="text-amber-300 text-sm cursor-pointer hover:text-amber-100 transition-colors">
                  Pay Now
                </div>
              </div>

              {/* Animated highlight */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-400 to-blue-500 w-0 group-hover:w-full transition-all duration-700" />
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-cyan-400/10 to-transparent" />

            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center mr-3">
                <Brain className="h-4 w-4 text-cyan-300" />
              </div>
              <div className="text-cyan-100 font-medium">AI Financial Summary</div>
            </div>

            <div className="text-cyan-100/90 mb-3">
              Based on your recent activity, you're making excellent progress toward your financial goals. Your
              emergency fund is fully funded, and your investment portfolio is well-diversified. Consider optimizing
              your tax strategy before the end of the quarter.
            </div>

            <div className="flex justify-end">
              <div className="text-cyan-300 text-sm cursor-pointer hover:text-cyan-100 transition-colors">
                Get Detailed Analysis
              </div>
            </div>

            {/* Animated scan line */}
            <div
              className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
              style={{ animation: "scan-line 3s linear infinite" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Other desktop interfaces remain the same as in the original component
function HolographicVizInterface() {
  // Existing implementation
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-6 flex flex-col">
      {/* Content remains the same as original */}
      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex flex-col">
          <div className="text-cyan-300 font-medium mb-4">Financial Visualizer</div>
          <div className="space-y-3 mb-6">
            {["Overview", "Investments", "Spending", "Income", "Goals"].map((item) => (
              <div
                key={item}
                className={`px-3 py-2 rounded-lg ${
                  item === "Investments" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-100/70 hover:bg-cyan-900/30"
                } cursor-pointer transition-colors`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
              <div className="text-cyan-100 font-medium mb-2">Visualization Controls</div>
              <div className="space-y-3 mt-3">
                <div>
                  <div className="text-cyan-100/70 text-sm mb-1">Time Range</div>
                  <select className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                    <option>Last 12 Months</option>
                    <option>Year to Date</option>
                    <option>Last 3 Years</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <div className="text-cyan-100/70 text-sm mb-1">View Mode</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-cyan-500/20 text-cyan-100 px-3 py-2 rounded-lg text-center cursor-pointer">
                      3D
                    </div>
                    <div className="bg-black/30 text-cyan-100/70 px-3 py-2 rounded-lg text-center cursor-pointer hover:bg-cyan-900/30">
                      2D
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9 space-y-4">
          {/* Header */}
          <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex justify-between items-center">
            <div>
              <div className="text-xl font-semibold text-white">Investment Portfolio</div>
              <div className="text-cyan-100/70">Holographic 3D visualization</div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-500/50 bg-black/30 text-cyan-300 hover:bg-cyan-950/50 hover:text-cyan-100"
              >
                Share
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-none"
              >
                Export
              </Button>
            </div>
          </div>

          {/* 3D Visualization */}
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-4 h-[350px] relative overflow-hidden">
            {/* 3D Portfolio Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[500px] h-[300px] perspective-[1200px]">
                {/* 3D Pie Chart */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
                  style={{
                    transform: "rotateX(60deg) rotateZ(0deg)",
                    transformStyle: "preserve-3d",
                    animation: "rotate-3d 20s linear infinite",
                  }}
                >
                  {/* Pie Segments */}
                  <div
                    className="absolute w-full h-full rounded-full overflow-hidden"
                    style={{
                      clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                      background: "linear-gradient(135deg, rgba(6, 182, 212, 0.7), rgba(59, 130, 246, 0.7))",
                      transformStyle: "preserve-3d",
                      transform: "translateZ(10px)",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                  <div
                    className="absolute w-full h-full rounded-full overflow-hidden"
                    style={{
                      clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 0%, 50% 0%)",
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.7), rgba(5, 150, 105, 0.7))",
                      transformStyle: "preserve-3d",
                      transform: "translateZ(10px)",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                  <div
                    className="absolute w-full h-full rounded-full overflow-hidden"
                    style={{
                      clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                      background: "linear-gradient(135deg, rgba(245, 158, 11, 0.7), rgba(217, 119, 6, 0.7))",
                      transformStyle: "preserve-3d",
                      transform: "translateZ(20px)",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                  <div
                    className="absolute w-full h-full rounded-full overflow-hidden"
                    style={{
                      clipPath: "polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)",
                      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.7), rgba(185, 28, 28, 0.7))",
                      transformStyle: "preserve-3d",
                      transform: "translateZ(15px)",
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10" />
                  </div>

                  {/* Center */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(25px)",
                    }}
                  />

                  {/* Floating Labels */}
                  {[
                    { label: "Stocks", value: "45%", angle: 45, distance: 140, color: "rgba(6, 182, 212, 1)" },
                    { label: "Bonds", value: "30%", angle: 135, distance: 140, color: "rgba(16, 185, 129, 1)" },
                    { label: "Real Estate", value: "15%", angle: 225, distance: 140, color: "rgba(245, 158, 11, 1)" },
                    { label: "Crypto", value: "10%", angle: 315, distance: 140, color: "rgba(239, 68, 68, 1)" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="absolute flex flex-col items-center"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translateX(${Math.cos((item.angle * Math.PI) / 180) * item.distance}px) translateY(${
                          Math.sin((item.angle * Math.PI) / 180) * item.distance
                        }px) translateZ(30px)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        className="text-white font-bold text-lg mb-1"
                        style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}
                      >
                        {item.value}
                      </div>
                      <div className="text-white/80 text-sm" style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}>
                        {item.label}
                      </div>
                      <div
                        className="mt-2 w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Grid Floor */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/30"
                  style={{
                    transform: "rotateX(60deg) translateZ(-50px)",
                    background:
                      "radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, rgba(8, 145, 178, 0.05) 50%, transparent 70%)",
                    boxShadow: "0 0 40px rgba(8, 145, 178, 0.2)",
                  }}
                >
                  {/* Grid Lines */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute left-0 right-0 h-px bg-cyan-500/20"
                      style={{ top: `${(i + 1) * 10}%` }}
                    />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute top-0 bottom-0 w-px bg-cyan-500/20"
                      style={{ left: `${(i + 1) * 10}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Scan Line Effect */}
            <div
              className="absolute left-0 top-0 w-full h-full pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, transparent, transparent 99px, rgba(8, 145, 178, 0.1) 99px, rgba(8, 145, 178, 0.1) 100px)",
                backgroundSize: "100% 100px",
                animation: "scan-bg 10s linear infinite",
              }}
            />

            {/* Floating Particles */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animation: `float-particle ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Total Value</div>
              <div className="text-2xl font-bold text-white">$245,678.90</div>
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12.4% YTD</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Risk Level</div>
              <div className="text-2xl font-bold text-white">Moderate</div>
              <div className="mt-2 w-full h-2 bg-black/30 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-gradient-to-r from-green-500 to-yellow-500 rounded-full" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Projected Growth</div>
              <div className="text-2xl font-bold text-white">8.5% / year</div>
              <div className="flex items-center mt-2 text-cyan-300 text-sm cursor-pointer">
                <span>View Projection</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuantumSecureInterface() {
  // Existing implementation
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-6 flex flex-col">
      {/* Security Dashboard Content */}
      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex flex-col">
          <div className="text-cyan-300 font-medium mb-4">Security Center</div>
          <div className="space-y-3 mb-6">
            {["Dashboard", "Permissions", "Encryption", "Activity Log", "Settings"].map((item) => (
              <div
                key={item}
                className={`px-3 py-2 rounded-lg ${
                  item === "Encryption" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-100/70 hover:bg-cyan-900/30"
                } cursor-pointer transition-colors`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
              <div className="text-cyan-100 font-medium mb-2">Security Status</div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div className="text-green-400">Protected</div>
              </div>
              <div className="text-cyan-100/70 text-sm">Your data is secured with quantum-resistant encryption</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9 space-y-4">
          {/* Header */}
          <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-4">
            <div className="text-xl font-semibold text-white mb-1">Quantum-Secure Encryption</div>
            <div className="text-cyan-100/70">Advanced protection against quantum computing threats</div>
          </div>

          {/* Encryption Visualization */}
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-4 h-[350px] relative overflow-hidden">
            {/* Encryption Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-2xl h-full">
                {/* Central Data Sphere */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="w-40 h-40 rounded-full bg-gradient-radial from-cyan-500/30 to-blue-500/10 border border-cyan-500/50 flex items-center justify-center"
                    style={{ boxShadow: "0 0 30px rgba(8, 145, 178, 0.3)" }}
                  >
                    <div className="w-32 h-32 rounded-full bg-gradient-radial from-cyan-500/20 to-blue-500/5 border border-cyan-500/30 flex items-center justify-center animate-pulse-slow">
                      <div className="w-20 h-20 rounded-full bg-gradient-radial from-cyan-500/10 to-blue-500/0 border border-cyan-500/20 flex items-center justify-center">
                        <Shield className="h-8 w-8 text-cyan-300" />
                      </div>
                    </div>
                  </div>

                  {/* Orbiting Encryption Keys */}
                  <div
                    className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20"
                    style={{ animation: "rotate-orbit 20s linear infinite" }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-cyan-500/30 border border-cyan-500/50 flex items-center justify-center"
                      style={{ boxShadow: "0 0 15px rgba(8, 145, 178, 0.5)" }}
                    >
                      <div className="text-cyan-100 text-xs font-mono">256</div>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20"
                    style={{ animation: "rotate-orbit 30s linear infinite reverse" }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500/30 border border-blue-500/50 flex items-center justify-center"
                      style={{ boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                    >
                      <div className="text-blue-100 text-xs font-mono">512</div>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20"
                    style={{ animation: "rotate-orbit 40s linear infinite" }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-500/30 border border-purple-500/50 flex items-center justify-center"
                      style={{ boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                    >
                      <div className="text-purple-100 text-xs font-mono">1024</div>
                    </div>
                  </div>
                </div>

                {/* Encryption Beams */}
                <div className="absolute inset-0">
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i * 45 * Math.PI) / 180
                    const length = 150 + Math.random() * 50
                    const startX = "50%"
                    const startY = "50%"
                    const endX = `calc(50% + ${Math.cos(angle) * length}px)`
                    const endY = `calc(50% + ${Math.sin(angle) * length}px)`

                    return (
                      <div
                        key={i}
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                          opacity: 0.6,
                          animation: `pulse-beam ${2 + Math.random() * 3}s infinite ease-in-out ${Math.random() * 2}s`,
                        }}
                      >
                        <svg width="100%" height="100%" className="absolute top-0 left-0">
                          <defs>
                            <linearGradient id={`beam-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="rgba(8, 145, 178, 0.7)" />
                              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.7)" />
                            </linearGradient>
                          </defs>
                          <line
                            x1={startX}
                            y1={startY}
                            x2={endX}
                            y2={endY}
                            stroke={`url(#beam-gradient-${i})`}
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            style={{ animation: "dash 1s linear infinite" }}
                          />
                        </svg>
                      </div>
                    )
                  })}
                </div>

                {/* Binary Data Particles */}
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-[10px] font-mono"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      color: Math.random() > 0.5 ? "rgba(8, 145, 178, 0.7)" : "rgba(59, 130, 246, 0.7)",
                      opacity: Math.random() * 0.7 + 0.3,
                      animation: `float-binary ${3 + Math.random() * 7}s infinite ease-in-out ${Math.random() * 5}s`,
                    }}
                  >
                    {Math.random() > 0.5 ? "1" : "0"}
                  </div>
                ))}
              </div>
            </div>

            {/* Scan Line Effect */}
            <div
              className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, transparent, transparent 99px, rgba(8, 145, 178, 0.2) 99px, rgba(8, 145, 178, 0.2) 100px)",
                backgroundSize: "100% 100px",
                animation: "scan-bg 10s linear infinite",
              }}
            />
          </div>

          {/* Security Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Encryption Level</div>
              <div className="text-2xl font-bold text-white">Post-Quantum</div>
              <div className="flex items-center mt-2 text-cyan-300 text-sm">
                <Shield className="h-4 w-4 mr-1" />
                <span>Lattice-based cryptography</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Security Score</div>
              <div className="text-2xl font-bold text-white">98/100</div>
              <div className="mt-2 w-full h-2 bg-black/30 rounded-full overflow-hidden">
                <div className="h-full w-[98%] bg-gradient-to-r from-cyan-500 to-green-500 rounded-full" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Last Security Scan</div>
              <div className="text-2xl font-bold text-white">2 mins ago</div>
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <span>No threats detected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PredictiveAnalyticsInterface() {
  // Existing implementation
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-6 flex flex-col">
      {/* Predictive Analytics Content */}
      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex flex-col">
          <div className="text-cyan-300 font-medium mb-4">Predictive Models</div>
          <div className="space-y-3 mb-6">
            {["Market Trends", "Spending Forecast", "Income Projection", "Investment Growth", "Custom Models"].map(
              (item) => (
                <div
                  key={item}
                  className={`px-3 py-2 rounded-lg ${
                    item === "Market Trends" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-100/70 hover:bg-cyan-900/30"
                  } cursor-pointer transition-colors`}
                >
                  {item}
                </div>
              ),
            )}
          </div>
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
              <div className="text-cyan-100 font-medium mb-2">Prediction Accuracy</div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="text-green-400">High Confidence</div>
              </div>
              <div className="text-cyan-100/70 text-sm">Based on 5 years of historical data and market patterns</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9 space-y-4">
          {/* Header */}
          <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex justify-between items-center">
            <div>
              <div className="text-xl font-semibold text-white">Market Trends Prediction</div>
              <div className="text-cyan-100/70">AI-powered forecast for the next 12 months</div>
            </div>
            <div className="flex space-x-3">
              <select className="bg-black/30 border border-cyan-500/30 rounded-lg px-3 py-1.5 text-cyan-100 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option>S&P 500</option>
                <option>NASDAQ</option>
                <option>Dow Jones</option>
                <option>Custom Index</option>
              </select>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-none"
              >
                Update Model
              </Button>
            </div>
          </div>

          {/* Prediction Chart */}
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-4 h-[350px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full p-4">
                {/* Chart Grid */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="h-full w-px bg-cyan-500/10"
                      style={{ left: `${(i + 1) * 16.666}%` }}
                    />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`h-${i}`} className="w-full h-px bg-cyan-500/10" style={{ top: `${(i + 1) * 20}%` }} />
                  ))}
                </div>

                {/* Historical Data Line */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="historical-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(8, 145, 178, 0.5)" />
                      <stop offset="100%" stopColor="rgba(8, 145, 178, 0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,120 L50,100 L100,110 L150,90 L200,105 L250,80 L300,70 L350,85 L400,60"
                    fill="none"
                    stroke="rgba(8, 145, 178, 1)"
                    strokeWidth="3"
                    className="drop-shadow-glow"
                  />
                  <path
                    d="M0,120 L50,100 L100,110 L150,90 L200,105 L250,80 L300,70 L350,85 L400,60 L400,200 L0,200 Z"
                    fill="url(#historical-gradient)"
                    opacity="0.5"
                  />
                </svg>

                {/* Prediction Line */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="prediction-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M400,60 L450,75 L500,50 L550,65 L600,40"
                    fill="none"
                    stroke="rgba(59, 130, 246, 1)"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    className="drop-shadow-glow"
                  />
                  <path
                    d="M400,60 L450,75 L500,50 L550,65 L600,40 L600,200 L400,200 Z"
                    fill="url(#prediction-gradient)"
                    opacity="0.5"
                  />
                </svg>

                {/* Axis Labels */}
                <div className="absolute bottom-2 left-4 text-cyan-100/70 text-sm">2023</div>
                <div className="absolute bottom-2 right-4 text-blue-300 text-sm">2024 (Projected)</div>
                <div className="absolute top-4 left-4 text-cyan-100/70 text-sm">+20%</div>
                <div className="absolute top-4 right-4 text-blue-300 text-sm">+15%</div>
              </div>
            </div>
          </div>

          {/* Prediction Summary */}
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center mr-3">
                <TrendingUp className="h-4 w-4 text-cyan-300" />
              </div>
              <div className="text-cyan-100 font-medium">Market Trend Summary</div>
            </div>
            <div className="text-cyan-100/90 mb-3">
              Based on our analysis, the S&P 500 is projected to grow by 12.5% over the next 12 months, driven by strong
              tech sector performance and increasing consumer confidence.
            </div>
            <div className="flex justify-end">
              <div className="text-cyan-300 text-sm cursor-pointer hover:text-cyan-100 transition-colors">
                View Detailed Report
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RealtimeProcessingInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-6 flex flex-col">
      {/* Real-Time Processing Content */}
      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex flex-col">
          <div className="text-cyan-300 font-medium mb-4">Transaction Monitor</div>
          <div className="space-y-3 mb-6">
            {["Live Feed", "Analytics", "Alerts", "Settings"].map((item) => (
              <div
                key={item}
                className={`px-3 py-2 rounded-lg ${
                  item === "Live Feed" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-100/70 hover:bg-cyan-900/30"
                } cursor-pointer transition-colors`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
              <div className="text-cyan-100 font-medium mb-2">System Status</div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div className="text-green-400">Operational</div>
              </div>
              <div className="text-cyan-100/70 text-sm">Real-time data processing and updates</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9 space-y-4">
          {/* Header */}
          <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex justify-between items-center">
            <div>
              <div className="text-xl font-semibold text-white">Real-Time Transaction Feed</div>
              <div className="text-cyan-100/70">Live monitoring of financial activity</div>
            </div>
            <div className="flex space-x-3">
              <select className="bg-black/30 border border-cyan-500/30 rounded-lg px-3 py-1.5 text-cyan-100 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option>All Accounts</option>
                <option>Checking</option>
                <option>Savings</option>
                <option>Credit Card</option>
              </select>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-none"
              >
                Export Data
              </Button>
            </div>
          </div>

          {/* Transaction Feed */}
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-4 h-[350px] relative overflow-hidden">
            <div className="absolute inset-0">
              {/* Sample Transactions */}
              <div className="space-y-3 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent h-full">
                {[
                  { merchant: "Whole Foods", amount: "-$42.50", time: "Just now", type: "payment" },
                  { merchant: "Payroll Deposit", amount: "+$1,250", time: "2 mins", type: "deposit" },
                  { merchant: "Netflix", amount: "-$9.99", time: "15 mins", type: "payment" },
                  { merchant: "Transfer to Savings", amount: "-$500", time: "1 hour", type: "transfer" },
                  { merchant: "Amazon", amount: "-$78.20", time: "3 hours", type: "payment" },
                  { merchant: "Interest Payment", amount: "+$12.35", time: "5 hours", type: "deposit" },
                  { merchant: "Starbucks", amount: "-$5.45", time: "8 hours", type: "payment" },
                ].map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-black/20 rounded-xl p-3 border border-cyan-500/20"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          tx.type === "payment"
                            ? "bg-red-500/20 text-red-400"
                            : tx.type === "deposit"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {tx.type === "payment" ? "-" : tx.type === "deposit" ? "+" : "T"}
                      </div>
                      <div>
                        <div className="text-white font-medium">{tx.merchant}</div>
                        <div className="text-cyan-100/70 text-sm">{tx.time} ago</div>
                      </div>
                    </div>
                    <div
                      className={`text-lg font-medium ${tx.amount.startsWith("+") ? "text-green-400" : "text-white"}`}
                    >
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scan Line Effect */}
            <div
              className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, transparent, transparent 99px, rgba(8, 145, 178, 0.2) 99px, rgba(8, 145, 178, 0.2) 100px)",
                backgroundSize: "100% 100px",
                animation: "scan-bg 10s linear infinite",
              }}
            />
          </div>

          {/* Processing Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Transactions / Sec</div>
              <div className="text-2xl font-bold text-white">142</div>
              <div className="flex items-center mt-2 text-cyan-300 text-sm">
                <Zap className="h-4 w-4 mr-1" />
                <span>Real-time</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Average Latency</div>
              <div className="text-2xl font-bold text-white">12 ms</div>
              <div className="mt-2 w-full h-2 bg-black/30 rounded-full overflow-hidden">
                <div className="h-full w-[12%] bg-gradient-to-r from-green-500 to-cyan-500 rounded-full" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Data Integrity</div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <Shield className="h-4 w-4 mr-1" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MultiPlatformInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-6 flex flex-col">
      {/* Multi-Platform Integration Content */}
      <div className="flex-1 grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex flex-col">
          <div className="text-cyan-300 font-medium mb-4">Connected Accounts</div>
          <div className="space-y-3 mb-6">
            {["Dashboard", "Accounts", "Transactions", "Settings"].map((item) => (
              <div
                key={item}
                className={`px-3 py-2 rounded-lg ${
                  item === "Accounts" ? "bg-cyan-500/20 text-cyan-100" : "text-cyan-100/70 hover:bg-cyan-900/30"
                } cursor-pointer transition-colors`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4 border border-cyan-500/30">
              <div className="text-cyan-100 font-medium mb-2">Account Sync</div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div className="text-green-400">Synchronized</div>
              </div>
              <div className="text-cyan-100/70 text-sm">All accounts are connected and up-to-date</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9 space-y-4">
          {/* Header */}
          <div className="bg-black/30 rounded-xl border border-cyan-500/30 p-4 flex justify-between items-center">
            <div>
              <div className="text-xl font-semibold text-white">Multi-Platform Integration</div>
              <div className="text-cyan-100/70">Seamlessly connect all your financial accounts</div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-500/50 bg-black/30 text-cyan-300 hover:bg-cyan-950/50 hover:text-cyan-100"
              >
                Add Account
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-none"
              >
                Manage Accounts
              </Button>
            </div>
          </div>

          {/* Platform Visualization */}
          <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-xl border border-cyan-500/30 p-4 h-[350px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Central Connection Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-radial from-cyan-500/30 to-blue-500/10 border border-cyan-500/50 flex items-center justify-center">
                  <Layers className="h-8 w-8 text-cyan-300" />
                </div>

                {/* Connected Platforms */}
                {[
                  { name: "Chase", color: "blue", angle: 0 },
                  { name: "Vanguard", color: "green", angle: 72 },
                  { name: "AmEx", color: "purple", angle: 144 },
                  { name: "Coinbase", color: "amber", angle: 216 },
                  { name: "Robinhood", color: "red", angle: 288 },
                ].map((platform, index) => {
                  const x = Math.cos((platform.angle * Math.PI) / 180) * 150
                  const y = Math.sin((platform.angle * Math.PI) / 180) * 150

                  return (
                    <div
                      key={index}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                      }}
                    >
                      <div
                        className={`w-12 h-12 rounded-full bg-${platform.color}-500/20 border border-${platform.color}-500/50 flex items-center justify-center`}
                      >
                        <div className={`text-${platform.color}-300 text-xl font-bold`}>{platform.name.charAt(0)}</div>
                      </div>
                    </div>
                  )
                })}

                {/* Connection Lines */}
                <svg className="absolute top-0 left-0 w-full h-full">
                  {[0, 72, 144, 216, 288].map((angle, index) => {
                    const x = Math.cos((angle * Math.PI) / 180) * 150
                    const y = Math.sin((angle * Math.PI) / 180) * 150

                    return (
                      <line
                        key={index}
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${x}px)`}
                        y2={`calc(50% + ${y}px)`}
                        stroke="rgba(8, 145, 178, 0.3)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    )
                  })}
                </svg>
              </div>
            </div>

            {/* Scan Line Effect */}
            <div
              className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, transparent, transparent 99px, rgba(8, 145, 178, 0.2) 99px, rgba(8, 145, 178, 0.2) 100px)",
                backgroundSize: "100% 100px",
                animation: "scan-bg 10s linear infinite",
              }}
            />
          </div>

          {/* Integration Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Total Accounts</div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="flex items-center mt-2 text-cyan-300 text-sm">
                <Layers className="h-4 w-4 mr-1" />
                <span>Connected</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Total Balance</div>
              <div className="text-2xl font-bold text-white">$342,156.78</div>
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+$5,432.10</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl border border-cyan-500/30 p-4">
              <div className="text-cyan-100/70 text-sm mb-1">Data Sync</div>
              <div className="text-2xl font-bold text-white">Real-time</div>
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <Zap className="h-4 w-4 mr-1" />
                <span>Up-to-date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mobile Interface Components
function AiInsightsMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-4 flex flex-col">
      <div className="flex-1 space-y-4">
        {/* Mobile Header */}
        <div className="bg-black/30 rounded-lg border border-cyan-500/30 p-3">
          <div className="text-lg font-semibold text-white mb-1">AI Insights</div>
          <div className="text-cyan-100/70 text-sm">Personalized financial recommendations</div>
        </div>

        {/* Mobile Insights Grid */}
        <div className="space-y-3">
          {[
            { title: "Spending Analysis", insight: "15% less dining expenses this month", color: "cyan" },
            { title: "Investment Tip", insight: "Consider increasing retirement by 3%", color: "purple" },
            { title: "Savings Goal", insight: "Vacation fund 2 months ahead!", color: "green" },
            { title: "Bill Alert", insight: "Electricity bill due in 3 days", color: "amber" },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r from-${item.color}-900/30 to-blue-900/30 rounded-lg border border-cyan-500/30 p-3 relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-cyan-100 font-medium text-sm">{item.title}</div>
                <div className={`bg-${item.color}-500/20 text-${item.color}-300 text-xs px-2 py-1 rounded-full`}>
                  AI
                </div>
              </div>
              <div className="text-cyan-100/90 text-sm mb-2">{item.insight}</div>
              <div className="text-cyan-100/60 text-xs">Updated recently</div>
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-${item.color}-400 to-blue-500 w-full`}
              />
            </div>
          ))}
        </div>

        {/* Mobile AI Summary */}
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
          <div className="flex items-center mb-2">
            <Brain className="h-4 w-4 text-cyan-300 mr-2" />
            <div className="text-cyan-100 font-medium text-sm">AI Summary</div>
          </div>
          <div className="text-cyan-100/90 text-sm">
            You're making excellent progress toward your financial goals. Consider optimizing your tax strategy.
          </div>
        </div>
      </div>
    </div>
  )
}

function HolographicVizMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-4 flex flex-col">
      <div className="flex-1 space-y-4">
        {/* Mobile Header */}
        <div className="bg-black/30 rounded-lg border border-cyan-500/30 p-3">
          <div className="text-lg font-semibold text-white mb-1">Portfolio Visualization</div>
          <div className="text-cyan-100/70 text-sm">3D holographic data display</div>
        </div>

        {/* Mobile 3D Visualization */}
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg border border-cyan-500/30 p-4 h-48 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Simplified 3D Pie Chart for Mobile */}
              <div
                className="w-full h-full rounded-full bg-gradient-conic from-cyan-500/50 via-blue-500/50 via-green-500/50 via-amber-500/50 to-cyan-500/50 animate-spin-slow border-2 border-cyan-500/30"
                style={{ animation: "spin 20s linear infinite" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-cyan-300" />
              </div>
            </div>
          </div>

          {/* Floating Data Points */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400/60 animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Mobile Portfolio Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Total Value</div>
            <div className="text-lg font-bold text-white">$245,678</div>
            <div className="flex items-center mt-1 text-green-400 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.4%</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Risk Level</div>
            <div className="text-lg font-bold text-white">Moderate</div>
            <div className="mt-1 w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-green-500 to-yellow-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuantumSecureMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-4 flex flex-col">
      <div className="flex-1 space-y-4">
        {/* Mobile Header */}
        <div className="bg-black/30 rounded-lg border border-cyan-500/30 p-3">
          <div className="text-lg font-semibold text-white mb-1">Quantum Security</div>
          <div className="text-cyan-100/70 text-sm">Advanced encryption protection</div>
        </div>

        {/* Mobile Security Visualization */}
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg border border-cyan-500/30 p-4 h-48 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Central Security Shield */}
              <div className="w-24 h-24 rounded-full bg-gradient-radial from-cyan-500/30 to-blue-500/10 border border-cyan-500/50 flex items-center justify-center animate-pulse-slow">
                <Shield className="h-8 w-8 text-cyan-300" />
              </div>

              {/* Orbiting Security Elements */}
              <div className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/20 animate-spin-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-500/50 flex items-center justify-center">
                  <div className="text-cyan-100 text-xs font-mono">256</div>
                </div>
              </div>
            </div>
          </div>

          {/* Binary Data */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xs font-mono text-cyan-400/60 animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>

        {/* Mobile Security Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Encryption</div>
            <div className="text-sm font-bold text-white">Post-Quantum</div>
            <div className="flex items-center mt-1 text-cyan-300 text-xs">
              <Shield className="h-3 w-3 mr-1" />
              <span>Secure</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Security Score</div>
            <div className="text-sm font-bold text-white">98/100</div>
            <div className="mt-1 w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full w-[98%] bg-gradient-to-r from-cyan-500 to-green-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PredictiveAnalyticsMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-4 flex flex-col">
      <div className="flex-1 space-y-4">
        {/* Mobile Header */}
        <div className="bg-black/30 rounded-lg border border-cyan-500/30 p-3">
          <div className="text-lg font-semibold text-white mb-1">Predictive Analytics</div>
          <div className="text-cyan-100/70 text-sm">AI-powered market forecasting</div>
        </div>

        {/* Mobile Chart */}
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg border border-cyan-500/30 p-4 h-48 relative overflow-hidden">
          <div className="absolute inset-0 p-2">
            {/* Simplified Chart for Mobile */}
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="mobile-chart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(8, 145, 178, 0.5)" />
                  <stop offset="100%" stopColor="rgba(8, 145, 178, 0)" />
                </linearGradient>
              </defs>
              {/* Historical line */}
              <path
                d="M20,120 L60,100 L100,110 L140,90 L180,105 L220,80"
                fill="none"
                stroke="rgba(8, 145, 178, 1)"
                strokeWidth="2"
              />
              {/* Prediction line */}
              <path
                d="M220,80 L260,70 L300,85 L340,60"
                fill="none"
                stroke="rgba(59, 130, 246, 1)"
                strokeWidth="2"
                strokeDasharray="3,3"
              />
              {/* Fill area */}
              <path
                d="M20,120 L60,100 L100,110 L140,90 L180,105 L220,80 L220,160 L20,160 Z"
                fill="url(#mobile-chart-gradient)"
                opacity="0.3"
              />
            </svg>

            {/* Chart Labels */}
            <div className="absolute bottom-2 left-2 text-cyan-100/70 text-xs">Historical</div>
            <div className="absolute bottom-2 right-2 text-blue-300 text-xs">Predicted</div>
          </div>
        </div>

        {/* Mobile Prediction Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Predicted Growth</div>
            <div className="text-lg font-bold text-white">+12.5%</div>
            <div className="flex items-center mt-1 text-cyan-300 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>12 months</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Confidence</div>
            <div className="text-lg font-bold text-white">87%</div>
            <div className="mt-1 w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full w-[87%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RealtimeProcessingMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-4 flex flex-col">
      <div className="flex-1 space-y-4">
        {/* Mobile Header */}
        <div className="bg-black/30 rounded-lg border border-cyan-500/30 p-3">
          <div className="text-lg font-semibold text-white mb-1">Real-Time Processing</div>
          <div className="text-cyan-100/70 text-sm">Live transaction monitoring</div>
        </div>

        {/* Mobile Transaction Feed */}
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg border border-cyan-500/30 p-3 h-56 relative overflow-hidden">
          <div className="space-y-2 h-full overflow-y-auto">
            {[
              { merchant: "Whole Foods", amount: "-$42.50", time: "Just now", type: "payment" },
              { merchant: "Payroll Deposit", amount: "+$1,250", time: "2 mins", type: "deposit" },
              { merchant: "Netflix", amount: "-$9.99", time: "15 mins", type: "payment" },
              { merchant: "Transfer to Savings", amount: "-$500", time: "1 hour", type: "transfer" },
            ].map((tx, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg border ${index === 0 ? "bg-cyan-500/20 border-cyan-500/50 animate-pulse-slow" : "bg-black/20 border-cyan-500/20"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs ${
                        tx.type === "payment"
                          ? "bg-red-500/20 text-red-400"
                          : tx.type === "deposit"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {tx.type === "payment" ? "-" : tx.type === "deposit" ? "+" : "→"}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{tx.merchant}</div>
                      <div className="text-cyan-100/60 text-xs">{tx.time} ago</div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${tx.amount.startsWith("+") ? "text-green-400" : "text-white"}`}>
                    {tx.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Processing Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Processing Speed</div>
            <div className="text-lg font-bold text-white">12ms</div>
            <div className="flex items-center mt-1 text-cyan-300 text-xs">
              <Zap className="h-3 w-3 mr-1" />
              <span>Average</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Today's Volume</div>
            <div className="text-lg font-bold text-white">142</div>
            <div className="flex items-center mt-1 text-green-400 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Transactions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MultiPlatformMobileInterface() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-950 to-cyan-950 p-4 flex flex-col">
      <div className="flex-1 space-y-4">
        {/* Mobile Header */}
        <div className="bg-black/30 rounded-lg border border-cyan-500/30 p-3">
          <div className="text-lg font-semibold text-white mb-1">Multi-Platform Integration</div>
          <div className="text-cyan-100/70 text-sm">Connected financial accounts</div>
        </div>

        {/* Mobile Platform Visualization */}
        <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg border border-cyan-500/30 p-4 h-48 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Central Hub */}
              <div className="w-16 h-16 rounded-full bg-gradient-radial from-cyan-500/30 to-blue-500/10 border border-cyan-500/50 flex items-center justify-center">
                <Layers className="h-6 w-6 text-cyan-300" />
              </div>

              {/* Connected Platforms */}
              {[
                { name: "Chase", color: "blue", angle: 0 },
                { name: "Vanguard", color: "green", angle: 72 },
                { name: "AmEx", color: "purple", angle: 144 },
                { name: "Coinbase", color: "amber", angle: 216 },
                { name: "Robinhood", color: "red", angle: 288 },
              ].map((platform, index) => {
                const x = Math.cos((platform.angle * Math.PI) / 180) * 60
                const y = Math.sin((platform.angle * Math.PI) / 180) * 60

                return (
                  <div
                    key={index}
                    className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                    }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-${platform.color}-500/20 border border-${platform.color}-500/50 flex items-center justify-center text-xs font-bold text-${platform.color}-300`}
                    >
                      {platform.name.charAt(0)}
                    </div>
                  </div>
                )
              })}

              {/* Connection Lines */}
              <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
                {[0, 72, 144, 216, 288].map((angle, index) => {
                  const x2 = Math.cos((angle * Math.PI) / 180) * 60
                  const y2 = Math.sin((angle * Math.PI) / 180) * 60

                  return (
                    <line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${x2}px)`}
                      y2={`calc(50% + ${y2}px)`}
                      stroke="rgba(8, 145, 178, 0.5)"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  )
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Integration Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Total Balance</div>
            <div className="text-lg font-bold text-white">$342,156</div>
            <div className="flex items-center mt-1 text-green-400 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+$5,432</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-cyan-500/30 p-3">
            <div className="text-cyan-100/70 text-xs mb-1">Connected</div>
            <div className="text-lg font-bold text-white">12 Accounts</div>
            <div className="flex items-center mt-1 text-cyan-300 text-xs">
              <Zap className="h-3 w-3 mr-1" />
              <span>Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
