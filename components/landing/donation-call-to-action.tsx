"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Users, TrendingUp, Gift, Star, Award, Zap, Crown, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DonationCallToAction() {
  const [donationAmount, setDonationAmount] = useState("100")
  const [selectedImpact, setSelectedImpact] = useState(0)

  const donationTiers = [
    { amount: 25, label: "Supporter", icon: <Heart className="w-5 h-5" />, color: "from-pink-500 to-rose-600" },
    { amount: 100, label: "Advocate", icon: <Users className="w-5 h-5" />, color: "from-blue-500 to-cyan-600" },
    { amount: 500, label: "Champion", icon: <Star className="w-5 h-5" />, color: "from-purple-500 to-indigo-600" },
    { amount: 1000, label: "Guardian", icon: <Shield className="w-5 h-5" />, color: "from-green-500 to-emerald-600" },
    { amount: 5000, label: "Sovereign", icon: <Crown className="w-5 h-5" />, color: "from-yellow-500 to-orange-600" },
  ]

  const impactAreas = [
    {
      title: "Microfinance Initiatives",
      description: "Provide small loans to entrepreneurs in developing countries to start or expand their businesses.",
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      impact: "1,247 businesses funded",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Educational Scholarships",
      description: "Fund education for underprivileged children and adults to break the cycle of poverty.",
      icon: <Award className="w-8 h-8 text-blue-400" />,
      impact: "3,892 students supported",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Healthcare Access",
      description: "Provide essential healthcare services and medical supplies to underserved communities.",
      icon: <Heart className="w-8 h-8 text-red-400" />,
      impact: "156,000 people served",
      color: "from-red-500/20 to-pink-500/20",
    },
    {
      title: "Technology Infrastructure",
      description: "Build digital infrastructure to connect remote communities to the global economy.",
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      impact: "847 communities connected",
      color: "from-purple-500/20 to-indigo-500/20",
    },
  ]

  const calculateImpact = (amount: number) => {
    return {
      meals: Math.floor(amount * 4),
      education: Math.floor(amount / 50),
      healthcare: Math.floor(amount / 25),
      microloans: Math.floor(amount / 100),
    }
  }

  const impact = calculateImpact(Number.parseInt(donationAmount) || 0)

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow" />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-green-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow"
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/30 to-green-500/30 backdrop-blur-sm border border-pink-500/30 flex items-center justify-center">
              <Gift className="w-8 h-8 text-pink-400" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Amplify Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-green-500">
              Humanitarian Impact
            </span>
          </h2>

          <p className="text-cyan-100/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Every donation directly funds <strong className="text-pink-300">life-changing initiatives</strong> around
            the world. Join our mission to create{" "}
            <strong className="text-green-300">sustainable economic opportunities</strong> for underserved communities
            globally.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Interface */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-green-900/20 backdrop-blur-sm border border-pink-500/30" />
                <div className="relative p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Make a Donation</h3>

                  {/* Donation Tiers */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {donationTiers.map((tier, index) => (
                      <button
                        key={index}
                        onClick={() => setDonationAmount(tier.amount.toString())}
                        className={`p-4 rounded-lg border transition-all duration-300 ${
                          donationAmount === tier.amount.toString()
                            ? `bg-gradient-to-r ${tier.color} text-white border-transparent`
                            : "bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border-cyan-500/30 text-cyan-300 hover:text-cyan-100"
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          {tier.icon}
                          <div className="text-sm font-semibold mt-1">${tier.amount}</div>
                          <div className="text-xs opacity-80">{tier.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-6">
                    <label className="block text-cyan-300 text-sm font-semibold mb-2">Custom Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300">$</span>
                      <Input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="pl-8 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border-cyan-500/30 text-white"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  {/* Impact Preview */}
                  <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 mb-6">
                    <h4 className="text-green-300 font-semibold mb-3">Your Impact</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center">
                        <div className="text-white font-bold">{impact.meals}</div>
                        <div className="text-green-200/80">Meals Provided</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold">{impact.education}</div>
                        <div className="text-green-200/80">Days of Education</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold">{impact.healthcare}</div>
                        <div className="text-green-200/80">Healthcare Visits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold">{impact.microloans}</div>
                        <div className="text-green-200/80">Microloans Funded</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-pink-500 to-green-600 hover:from-pink-400 hover:to-green-500 text-white border-none relative overflow-hidden group py-4 text-lg"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-400 to-green-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                    <span className="relative z-10 flex items-center justify-center">
                      Donate ${donationAmount} <Heart className="ml-2 h-5 w-5" />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Impact Areas */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Where Your Donation Goes</h3>

              <div className="space-y-4">
                {impactAreas.map((area, index) => (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedImpact === index ? "ring-2 ring-cyan-400" : ""
                    }`}
                    onClick={() => setSelectedImpact(index)}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${area.color} backdrop-blur-sm border border-cyan-500/30`}
                    />
                    <div className="relative p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-900/30 to-purple-900/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center mr-4 flex-shrink-0">
                          {area.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-2">{area.title}</h4>
                          <p className="text-cyan-100/80 text-sm mb-3 leading-relaxed">{area.description}</p>
                          <div className="text-cyan-300 font-semibold text-sm">{area.impact}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Donation Benefits */}
        <motion.div
          className="max-w-4xl mx-auto text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-green-900/20 backdrop-blur-sm border border-yellow-500/30" />
            <div className="relative p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-400 mb-6">
                Tax-Deductible Donations
              </h3>
              <p className="text-cyan-100/90 text-lg leading-relaxed mb-6">
                As a <strong className="text-yellow-300">501(c)(3) nonprofit organization</strong>, all donations to
                SnapAiFi are
                <strong className="text-green-300"> fully tax-deductible</strong>. You'll receive a donation receipt for
                your records, and your contribution directly supports our humanitarian mission worldwide.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-gradient-to-br from-yellow-800/20 to-orange-800/20 rounded-lg p-4 border border-yellow-500/30">
                  <div className="text-yellow-300 font-semibold mb-2">Tax Benefits</div>
                  <div className="text-yellow-100/80 text-sm">Full deduction on federal and state taxes</div>
                </div>
                <div className="bg-gradient-to-br from-green-800/20 to-emerald-800/20 rounded-lg p-4 border border-green-500/30">
                  <div className="text-green-300 font-semibold mb-2">Impact Tracking</div>
                  <div className="text-green-100/80 text-sm">Quarterly reports on your donation's impact</div>
                </div>
                <div className="bg-gradient-to-br from-blue-800/20 to-cyan-800/20 rounded-lg p-4 border border-blue-500/30">
                  <div className="text-blue-300 font-semibold mb-2">Recognition</div>
                  <div className="text-blue-100/80 text-sm">Donor recognition and exclusive updates</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
