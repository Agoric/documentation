"use client"

import { motion } from "framer-motion"
import { Heart, Globe, Users, Shield, Zap, Crown } from "lucide-react"

export function HumanitarianMissionBanner() {
  const missions = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Global Prosperity",
      description: "Ensuring economic opportunity reaches every corner of humanity",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Digital Equality",
      description: "Bridging the technological divide for universal access",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Financial Security",
      description: "Protecting and empowering individuals through sovereign finance",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Sustainable Future",
      description: "Building systems that serve generations to come",
    },
  ]

  return (
    <div className="relative bg-gradient-to-r from-green-900/20 via-emerald-900/20 to-green-900/20 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm overflow-hidden">
      {/* Humanitarian Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(5, 150, 105, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              The Caprelli Humanitarian Mandate
            </h2>
            <Crown className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-green-100 text-lg max-w-3xl mx-auto">
            "True imperial power lies not in dominion over others, but in the elevation of all humanity. The Caprelli
            legacy shall be measured by the prosperity, dignity, and hope we bring to every soul."
          </p>
        </motion.div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-green-800/20 to-emerald-800/20 border border-green-500/20 rounded-lg p-6 text-center hover:border-green-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(5, 150, 105, 0.3)" }}
            >
              <div className="text-green-400 mb-4 flex justify-center">{mission.icon}</div>
              <h3 className="text-green-100 font-bold text-lg mb-2">{mission.title}</h3>
              <p className="text-green-200/80 text-sm">{mission.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Imperial Seal */}
        <motion.div
          className="flex items-center justify-center mt-8 pt-6 border-t border-green-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-green-400 to-transparent" />
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-green-300 font-medium tracking-wider">IMPERIAL DECREE OF HUMANITY</span>
            <Zap className="w-6 h-6 text-yellow-400" />
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-green-400 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
