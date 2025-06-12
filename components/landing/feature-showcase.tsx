"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart3, Brain, Shield, TrendingUp, Zap, Layers } from "lucide-react"

export function FeatureShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Insights",
      description:
        "Advanced algorithms analyze your financial data to provide personalized recommendations and insights.",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Holographic Visualization",
      description: "Experience your financial data in stunning 3D holographic displays for intuitive understanding.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quantum-Secure",
      description: "State-of-the-art security protocols protect your financial data with quantum-resistant encryption.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Predictive Analytics",
      description: "Forecast financial trends and opportunities with our advanced predictive modeling system.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-Time Processing",
      description:
        "Instant transaction processing and updates ensure you always have the latest financial information.",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Multi-Platform Integration",
      description: "Seamlessly connect with all your financial accounts and services in one unified interface.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow" />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Revolutionary </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">Features</span>
          </h2>
          <p className="text-cyan-100/70 max-w-2xl mx-auto">
            SnapAiFi combines cutting-edge technology with intuitive design to deliver a financial experience unlike any
            other.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="relative group">
              <div className="relative rounded-2xl overflow-hidden">
                {/* Holographic Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl" />

                {/* Glass reflection effect */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)",
                  }}
                />

                {/* Content */}
                <div className="relative p-6 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-cyan-300">{feature.icon}</div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-cyan-100/70 flex-grow">{feature.description}</p>

                  {/* Floating particles */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-cyan-400/80"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animation: `float-particle ${2 + Math.random() * 3}s infinite ease-in-out ${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 rounded-[18px] blur-md opacity-0 group-hover:opacity-100 group-hover:from-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
