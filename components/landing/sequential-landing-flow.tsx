"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Play, TrendingUp, Shield, Globe, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SequentialLandingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const steps = [
    {
      id: "welcome",
      title: "Welcome to the Future of Global Economics",
      subtitle: "SnapAiFi: Where Humanity Meets Financial Innovation",
      description:
        "Join the world's first humanitarian-focused financial platform that combines cutting-edge AI technology with a mission to elevate global prosperity.",
      icon: <Crown className="w-12 h-12 text-yellow-400" />,
      cta: "Discover Our Mission",
      benefits: [
        "100% Nonprofit Structure",
        "AI-Powered Financial Intelligence",
        "Global Economic Empowerment",
        "Quantum-Secured Platform",
      ],
    },
    {
      id: "mission",
      title: "Our Humanitarian Mission",
      subtitle: "Transforming Lives Through Economic Empowerment",
      description:
        "Every transaction, every feature, every innovation serves our core mission: creating sustainable economic opportunities for underserved communities worldwide.",
      icon: <Globe className="w-12 h-12 text-green-400" />,
      cta: "See Our Impact",
      benefits: [
        "Direct Community Investment",
        "Microfinance Initiatives",
        "Educational Scholarships",
        "Healthcare Access Programs",
      ],
    },
    {
      id: "technology",
      title: "Revolutionary Technology Stack",
      subtitle: "2035-Grade Financial Infrastructure",
      description:
        "Experience the most advanced financial platform ever created, featuring holographic interfaces, quantum security, and AI that truly understands your needs.",
      icon: <Shield className="w-12 h-12 text-cyan-400" />,
      cta: "Explore Technology",
      benefits: [
        "Holographic Data Visualization",
        "Quantum-Resistant Encryption",
        "Neural Network Analytics",
        "Real-Time Global Processing",
      ],
    },
    {
      id: "benefits",
      title: "Unmatched Economic Benefits",
      subtitle: "Prosperity That Serves Humanity",
      description:
        "Our unique nonprofit structure means every profit is reinvested into humanitarian initiatives while providing you with superior financial services.",
      icon: <TrendingUp className="w-12 h-12 text-purple-400" />,
      cta: "Calculate Benefits",
      benefits: [
        "Zero Hidden Fees",
        "Maximum Returns to Community",
        "Tax-Advantaged Giving",
        "Transparent Impact Tracking",
      ],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [steps.length])

  const handleGetStarted = () => {
    router.push("/dashboard/snap-dax/onboarding")
  }

  const handleWatchDemo = () => {
    // Scroll to product demo section
    document.getElementById("product-demo")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px] opacity-20 animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-blue-900/20 to-transparent opacity-30" />

        {/* Sequential Progress Indicators */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentStep
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 w-8"
                  : index < currentStep
                    ? "bg-green-400"
                    : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Step Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-900/30 to-purple-900/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
                {steps[currentStep].icon}
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full blur-xl opacity-50 animate-pulse" />
            </div>
          </motion.div>

          {/* Step Content */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
              {steps[currentStep].title}
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-yellow-300 mb-6 font-semibold"
          >
            {steps[currentStep].subtitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-cyan-100/80 text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {steps[currentStep].description}
          </motion.p>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {steps[currentStep].benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 text-center"
              >
                <div className="text-cyan-300 font-semibold text-sm">{benefit}</div>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-none relative overflow-hidden group px-8 py-4 text-lg"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <span className="relative z-10 flex items-center">
                {steps[currentStep].cta} <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleWatchDemo}
              className="border-cyan-500 text-cyan-300 hover:bg-cyan-950/30 hover:text-cyan-100 px-8 py-4 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Step Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex justify-center gap-2 mt-12"
          >
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep ? "bg-cyan-400 w-8" : "bg-cyan-700/50 hover:bg-cyan-600/50"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-8 h-12 rounded-full border-2 border-cyan-500/50 flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
