"use client"

import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Shield, Users, Globe, Award, PieChart, Building, Heart, Zap } from "lucide-react"

export function EconomicBenefitsSection() {
  const economicBenefits = [
    {
      title: "Zero Hidden Fees",
      description: "Transparent pricing with no surprise charges. All fees clearly disclosed upfront.",
      icon: <DollarSign className="w-8 h-8 text-green-400" />,
      value: "0%",
      label: "Hidden Fees",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Maximum Community Returns",
      description: "100% of profits reinvested into humanitarian initiatives and platform improvements.",
      icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
      value: "100%",
      label: "Profit Reinvestment",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Tax-Advantaged Structure",
      description: "Platform usage fees qualify as charitable contributions for tax deduction purposes.",
      icon: <PieChart className="w-8 h-8 text-purple-400" />,
      value: "35%",
      label: "Average Tax Savings",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Global Economic Impact",
      description: "Direct investment in underserved communities creates sustainable economic growth.",
      icon: <Globe className="w-8 h-8 text-yellow-400" />,
      value: "$2.8B",
      label: "Community Investment",
      color: "from-yellow-500/20 to-orange-500/20",
    },
  ]

  const structuralAdvantages = [
    {
      title: "Nonprofit Governance",
      description: "Board oversight ensures humanitarian mission alignment and transparent operations.",
      icon: <Building className="w-6 h-6" />,
    },
    {
      title: "Community Ownership",
      description: "Users have voting rights on platform development and humanitarian initiative selection.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Regulatory Compliance",
      description: "Full compliance with nonprofit regulations and financial service requirements.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Impact Transparency",
      description: "Real-time tracking and reporting of humanitarian impact and fund allocation.",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: "Sustainable Growth",
      description: "Self-sustaining model that grows stronger while serving more communities.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Global Recognition",
      description: "Certified B-Corp status and UN Sustainable Development Goals alignment.",
      icon: <Award className="w-6 h-6" />,
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow" />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow"
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
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Economically Sound & </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500">
              Beneficial Structure
            </span>
          </h2>

          <p className="text-cyan-100/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Our <strong className="text-green-300">nonprofit structure</strong> creates unprecedented economic benefits
            for users while ensuring <strong className="text-blue-300">sustainable humanitarian impact</strong>.
            Experience financial services that truly serve humanity's best interests.
          </p>
        </motion.div>

        {/* Economic Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {economicBenefits.map((benefit, index) => (
            <div key={index} className="relative group">
              <div className="relative rounded-2xl overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.color} backdrop-blur-sm border border-cyan-500/30`}
                />
                <div className="relative p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-900/30 to-purple-900/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
                      {benefit.icon}
                    </div>
                  </div>

                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{benefit.value}</div>
                  <div className="text-cyan-300 text-sm mb-4">{benefit.label}</div>

                  <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-cyan-100/80 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Structural Advantages */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500 mb-4">
              Structural Advantages
            </h3>
            <p className="text-cyan-100/80 text-lg max-w-3xl mx-auto">
              Our unique organizational structure provides unmatched benefits and transparency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {structuralAdvantages.map((advantage, index) => (
              <div key={index} className="relative group">
                <div className="relative rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border border-cyan-500/30" />
                  <div className="relative p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center mr-3 text-cyan-300">
                        {advantage.icon}
                      </div>
                      <h4 className="text-lg font-bold text-white">{advantage.title}</h4>
                    </div>
                    <p className="text-cyan-100/80 text-sm leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Economic Impact Statement */}
        <motion.div
          className="max-w-4xl mx-auto text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm border border-green-500/30" />
            <div className="relative p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400 mb-6">
                "Financial Services That Serve Humanity"
              </h3>
              <p className="text-cyan-100/90 text-lg leading-relaxed">
                By choosing SnapAiFi, you're not just accessing superior financial services – you're joining a
                <strong className="text-green-300"> global movement</strong> that transforms every transaction into an
                opportunity for
                <strong className="text-blue-300"> humanitarian impact</strong>. Our economically sound structure
                ensures that your financial success directly contributes to global prosperity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
