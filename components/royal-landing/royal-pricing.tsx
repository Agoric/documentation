"use client"
import { motion } from "framer-motion"
import { Crown, Check, Star, Gem, Zap } from "lucide-react"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { QuantumButton } from "@/components/ui/quantum-button"

export function RoyalPricing() {
  const plans = [
    {
      name: "Noble",
      icon: Star,
      price: "$99",
      period: "/month",
      description: "For aspiring financial nobility",
      features: [
        "Basic Royal Dashboard",
        "Standard Security",
        "Email Support",
        "5 Investment Accounts",
        "Monthly Reports",
        "Mobile App Access",
      ],
      color: "from-blue-400 to-blue-600",
      popular: false,
    },
    {
      name: "Royal",
      icon: Crown,
      price: "$299",
      period: "/month",
      description: "For true financial royalty",
      features: [
        "Full Royal Dashboard",
        "Quantum Security",
        "VIP Concierge Support",
        "Unlimited Accounts",
        "Real-time Analytics",
        "Priority Execution",
        "Personal Wealth Advisor",
        "Exclusive Investment Access",
      ],
      color: "from-yellow-400 to-yellow-600",
      popular: true,
    },
    {
      name: "Emperor",
      icon: Gem,
      price: "$999",
      period: "/month",
      description: "For financial emperors and empresses",
      features: [
        "Supreme Royal Dashboard",
        "Military-Grade Security",
        "24/7 Royal Guard Support",
        "Unlimited Everything",
        "AI-Powered Insights",
        "Instant Execution",
        "Dedicated Team",
        "Private Investment Opportunities",
        "Global Market Access",
        "Custom Solutions",
      ],
      color: "from-purple-400 to-pink-600",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
              Royal Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Choose your royal tier and ascend to financial greatness
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold">
                    👑 MOST POPULAR
                  </div>
                </motion.div>
              )}

              <FuturisticCard
                variant={plan.popular ? "hologram" : "glass"}
                className={`h-full relative ${plan.popular ? "scale-105 border-2 border-yellow-400/50" : ""}`}
                glow={plan.popular}
                animated={true}
                interactive={true}
              >
                <div className="text-center space-y-6">
                  {/* Plan Icon */}
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${plan.color} p-5`}>
                    <plan.icon className="w-full h-full text-white" />
                  </div>

                  {/* Plan Name */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="py-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
                      <span className="text-slate-400">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Check className="text-green-400 flex-shrink-0" size={16} />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <QuantumButton variant={plan.popular ? "plasma" : "secondary"} size="lg" className="w-full">
                      <plan.icon size={16} />
                      {plan.popular ? "Claim Your Crown" : `Choose ${plan.name}`}
                    </QuantumButton>
                  </div>
                </div>

                {/* Royal Seal for Popular Plan */}
                {plan.popular && (
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Crown className="text-yellow-400" size={24} />
                  </motion.div>
                )}
              </FuturisticCard>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <FuturisticCard variant="neon" className="max-w-2xl mx-auto p-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Zap className="text-cyan-400" size={32} />
              <h3 className="text-2xl font-bold text-white">Royal Guarantee</h3>
            </div>
            <p className="text-slate-300">
              Not satisfied with your royal treatment? Get a full refund within 30 days. Your satisfaction is our royal
              decree.
            </p>
          </FuturisticCard>
        </motion.div>
      </div>
    </section>
  )
}
