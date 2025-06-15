"use client"

import { motion } from "framer-motion"
import { Crown, Shield, TrendingUp, Globe, Brain, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const platformFeatures = [
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Quantum Trading",
    description: "AI-powered trading algorithms with quantum computing acceleration for maximum returns.",
    color: "text-blue-400",
    bgColor: "bg-blue-950/20",
    borderColor: "border-blue-400/30",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Imperial Security",
    description: "Bank-grade encryption with biometric authentication and quantum-resistant protocols.",
    color: "text-green-400",
    bgColor: "bg-green-950/20",
    borderColor: "border-green-400/30",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI Concierge",
    description: "Personal financial advisor powered by advanced AI with real-time market analysis.",
    color: "text-purple-400",
    bgColor: "bg-purple-950/20",
    borderColor: "border-purple-400/30",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Global Access",
    description: "Worldwide financial services with multi-currency support and international compliance.",
    color: "text-amber-400",
    bgColor: "bg-amber-950/20",
    borderColor: "border-amber-400/30",
  },
]

const stats = [
  { value: "$2.4B+", label: "Assets Under Management", color: "text-green-400" },
  { value: "150K+", label: "Active Members", color: "text-blue-400" },
  { value: "99.9%", label: "Uptime Guarantee", color: "text-purple-400" },
  { value: "24/7", label: "Global Support", color: "text-amber-400" },
]

export function SupremeLandingV777() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section - Maximum Contrast */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Minimal background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251, 191, 36, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            {/* Imperial Crown Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <Crown className="h-16 w-16 text-amber-400" />
                <div className="text-6xl font-bold text-white">Supreme Authority</div>
                <Crown className="h-16 w-16 text-amber-400" />
              </div>
              <div className="text-amber-400 text-xl font-semibold tracking-wider">VERSION 777 • QUANTUM POWERED</div>
            </motion.div>

            {/* High-Contrast Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Financial Sovereignty
              <br />
              <span className="text-amber-400">Redefined</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Experience the future of wealth management with quantum-powered analytics, AI-driven insights, and
              imperial-grade security. Join the financial revolution.
            </motion.p>

            {/* Clear Call-to-Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-lg px-8 py-4 h-auto"
                >
                  Enter Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-950 font-bold text-lg px-8 py-4 h-auto"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      </section>

      {/* Stats Section - High Visibility */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-slate-300 font-medium text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Clean and Organized */}
      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Platform Excellence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-300 max-w-3xl mx-auto"
            >
              Engineered for maximum efficiency, eliminating redundancies while delivering unparalleled financial
              services.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full ${feature.bgColor} ${feature.borderColor} border-2 bg-opacity-50 backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`${feature.color} mb-4 flex justify-center`}>{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - High Impact */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-500 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Sparkles className="h-16 w-16 text-slate-950 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-950 mb-6">Ready to Ascend?</h2>
            <p className="text-xl text-slate-800 mb-8 max-w-2xl mx-auto">
              Join thousands of members who have elevated their financial status with Supreme Authority's
              quantum-powered platform.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-slate-950 hover:bg-slate-800 text-white font-bold text-xl px-12 py-6 h-auto"
              >
                Begin Your Journey
                <Crown className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
