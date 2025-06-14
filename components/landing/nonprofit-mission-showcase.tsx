"use client"

import { motion } from "framer-motion"
import { Heart, Users, Globe, TrendingUp, Shield, Award, Handshake, Building } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NonprofitMissionShowcase() {
  const missionStats = [
    { label: "Communities Served", value: "2.3M+", icon: <Users className="w-6 h-6" /> },
    { label: "Humanitarian Projects", value: "847", icon: <Heart className="w-6 h-6" /> },
    { label: "Countries Reached", value: "156", icon: <Globe className="w-6 h-6" /> },
    { label: "Economic Impact", value: "$2.8B", icon: <TrendingUp className="w-6 h-6" /> },
  ]

  const nonprofitBenefits = [
    {
      title: "100% Transparent Operations",
      description: "Every dollar tracked, every impact measured, every decision made with humanitarian purpose.",
      icon: <Shield className="w-8 h-8 text-green-400" />,
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Zero Profit Extraction",
      description: "All surplus funds reinvested into community development and platform enhancement.",
      icon: <Award className="w-8 h-8 text-blue-400" />,
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Community-First Governance",
      description: "User-driven decisions with humanitarian advisory board oversight.",
      icon: <Handshake className="w-8 h-8 text-purple-400" />,
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Sustainable Economic Model",
      description: "Self-sustaining platform that grows stronger while serving humanity better.",
      icon: <Building className="w-8 h-8 text-yellow-400" />,
      color: "from-yellow-500/20 to-orange-500/20",
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow" />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/30 to-blue-500/30 backdrop-blur-sm border border-green-500/30 flex items-center justify-center">
              <Heart className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Nonprofit </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
              Humanitarian Mission
            </span>
          </h2>

          <p className="text-cyan-100/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            SnapAiFi operates as a <strong className="text-green-300">501(c)(3) nonprofit organization</strong>{" "}
            dedicated to creating sustainable economic opportunities for underserved communities worldwide. Every
            feature, every innovation, every success serves our core mission of{" "}
            <strong className="text-blue-300">global economic empowerment</strong>.
          </p>
        </motion.div>

        {/* Mission Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {missionStats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm border border-green-500/30" />
                <div className="relative p-6 text-center">
                  <div className="flex justify-center mb-3 text-green-400">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-green-200/80 text-sm">{stat.label}</div>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-green-500/10 to-blue-600/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Nonprofit Benefits */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {nonprofitBenefits.map((benefit, index) => (
            <div key={index} className="relative group">
              <div className="relative rounded-2xl overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} backdrop-blur-sm border border-cyan-500/30`}
                />
                <div className="relative p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-900/30 to-purple-900/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center mr-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                  </div>
                  <p className="text-cyan-100/80 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Economic Structure Explanation */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-green-900/20 backdrop-blur-sm border border-yellow-500/30" />
            <div className="relative p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-400 mb-4">
                Economically Sound & Beneficial Structure
              </h3>
              <p className="text-cyan-100/90 text-lg leading-relaxed mb-6">
                Our unique nonprofit model creates a{" "}
                <strong className="text-yellow-300">sustainable economic ecosystem</strong> where:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-gradient-to-br from-green-800/20 to-emerald-800/20 rounded-lg p-4 border border-green-500/30">
                  <div className="text-green-300 font-semibold mb-2">Revenue Reinvestment</div>
                  <div className="text-green-100/80 text-sm">
                    100% of platform profits fund humanitarian initiatives and platform improvements
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-800/20 to-cyan-800/20 rounded-lg p-4 border border-blue-500/30">
                  <div className="text-blue-300 font-semibold mb-2">Tax Benefits</div>
                  <div className="text-blue-100/80 text-sm">
                    Users receive tax deductions for platform usage fees as charitable contributions
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-800/20 to-pink-800/20 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-purple-300 font-semibold mb-2">Community Ownership</div>
                  <div className="text-purple-100/80 text-sm">
                    Platform governance shared with user community and humanitarian board
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white border-none relative overflow-hidden group px-8 py-4 text-lg"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            <span className="relative z-10 flex items-center">
              Learn More About Our Mission <Heart className="ml-2 h-5 w-5" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
