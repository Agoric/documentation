"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, User, Shield, Zap, Crown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function PlatformEnrollmentFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  })
  const router = useRouter()

  const enrollmentSteps = [
    {
      id: "interest",
      title: "Express Interest",
      description: "Join our exclusive waitlist for early access to the platform",
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      id: "verification",
      title: "Identity Verification",
      description: "Secure biometric verification for platform access",
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "onboarding",
      title: "Platform Onboarding",
      description: "Guided tour of all platform features and capabilities",
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: "activation",
      title: "Account Activation",
      description: "Full access to all platform realms and features",
      icon: <Crown className="w-8 h-8 text-green-400" />,
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
  ]

  const membershipTiers = [
    {
      name: "Explorer",
      price: "Free",
      description: "Basic access to platform features",
      features: ["Basic AI Assistant", "Limited Trading Features", "Community Access", "Educational Resources"],
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-900/20 to-cyan-900/20",
      borderColor: "border-blue-500/30",
    },
    {
      name: "Sovereign",
      price: "$99/month",
      description: "Full platform access with premium features",
      features: [
        "Advanced AI Concierge",
        "Full Trading Suite",
        "Priority Support",
        "Exclusive Insights",
        "Tax Optimization",
        "Global Citizen Benefits",
      ],
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-900/20 to-indigo-900/20",
      borderColor: "border-purple-500/30",
      popular: true,
    },
    {
      name: "Imperial",
      price: "$299/month",
      description: "Ultimate access with personalized services",
      features: [
        "Dedicated AI Advisor",
        "Institutional Trading",
        "White-Glove Service",
        "Custom Solutions",
        "Direct Impact Allocation",
        "Board Advisory Access",
      ],
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-900/20 to-orange-900/20",
      borderColor: "border-yellow-500/30",
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEnrollment = (tier: string) => {
    // Store enrollment data and redirect to onboarding
    localStorage.setItem("enrollmentTier", tier)
    localStorage.setItem("enrollmentData", JSON.stringify(formData))
    router.push("/dashboard/snap-dax/onboarding")
  }

  const isFormValid = formData.email && formData.name && formData.phone

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow" />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow"
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
              <User className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Join the </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
              Financial Revolution
            </span>
          </h2>

          <p className="text-cyan-100/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Begin your journey with <strong className="text-cyan-300">SnapAiFi</strong> and experience the future of
            <strong className="text-purple-300"> humanitarian finance</strong>. Choose your membership tier and start
            making a global impact today.
          </p>
        </motion.div>

        {/* Enrollment Steps */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Enrollment Process</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {enrollmentSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="relative rounded-xl overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} backdrop-blur-sm border ${step.borderColor}`}
                  />
                  <div className="relative p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-900/30 to-purple-900/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>

                    <div className="text-lg font-bold text-white mb-2">
                      {index + 1}. {step.title}
                    </div>
                    <p className="text-cyan-100/80 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Arrow */}
                {index < enrollmentSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Membership Tiers */}
        <motion.div
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Choose Your Membership</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <div key={tier.name} className={`relative ${tier.popular ? "scale-105" : ""}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="relative rounded-2xl overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tier.bgColor} backdrop-blur-sm border ${tier.borderColor}`}
                  />
                  <div className="relative p-8">
                    <div className="text-center mb-6">
                      <h4 className="text-2xl font-bold text-white mb-2">{tier.name}</h4>
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500 mb-2">
                        {tier.price}
                      </div>
                      <p className="text-cyan-100/80 text-sm">{tier.description}</p>
                    </div>

                    <div className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-cyan-100/90">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      size="lg"
                      onClick={() => handleEnrollment(tier.name)}
                      disabled={!isFormValid}
                      className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white border-none relative overflow-hidden group py-4 text-lg`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Choose {tier.name} <Crown className="ml-2 h-5 w-5" />
                      </span>
                    </Button>
                  </div>
                </div>

                {tier.popular && (
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl blur-xl" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Enrollment Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border border-cyan-500/30" />
            <div className="relative p-8">
              <h3 className="text-2xl font-bold text-white text-center mb-6">Complete Your Enrollment</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-cyan-300 text-sm font-semibold mb-2">Full Name *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border-cyan-500/30 text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-cyan-300 text-sm font-semibold mb-2">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border-cyan-500/30 text-white"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-cyan-300 text-sm font-semibold mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border-cyan-500/30 text-white"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-cyan-100/80 text-sm mb-6">
                  By enrolling, you agree to our Terms of Service and Privacy Policy. You'll receive updates about your
                  enrollment status and platform launch.
                </p>

                <Button
                  size="lg"
                  onClick={() => router.push("/dashboard/snap-dax/onboarding")}
                  disabled={!isFormValid}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-none relative overflow-hidden group px-8 py-4 text-lg disabled:opacity-50"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                  <span className="relative z-10 flex items-center">
                    Begin Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
