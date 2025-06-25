"use client"
import { motion } from "framer-motion"
import { Crown, CrownIcon as Scepter, Shield, Gem } from "lucide-react"
import { QuantumButton } from "@/components/ui/quantum-button"

export function RoyalHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Royal Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 via-purple-500/5 to-transparent" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Crown Animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 200 }}
        >
          <Crown className="text-yellow-400 mx-auto" size={80} />
        </motion.div>

        {/* Royal Title */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            REIGN
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            SUPREME
          </span>
        </motion.h1>

        {/* Royal Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Command the ultimate financial empire with{" "}
          <span className="text-yellow-400 font-semibold">SNAPIFI ROYAL</span> - Where kings and queens of finance rule
          their digital domains with unparalleled power and prestige.
        </motion.p>

        {/* Royal Features Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {[
            { icon: Crown, title: "Royal Status", desc: "VIP Treatment" },
            { icon: Scepter, title: "Ultimate Power", desc: "Full Control" },
            { icon: Shield, title: "Royal Security", desc: "Fort Knox Level" },
            { icon: Gem, title: "Precious Assets", desc: "Diamond Tier" },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-4 rounded-xl bg-gradient-to-b from-yellow-400/10 to-purple-500/10 border border-yellow-400/20 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <feature.icon className="text-yellow-400 mx-auto mb-2" size={32} />
              <h3 className="text-yellow-200 font-semibold text-sm">{feature.title}</h3>
              <p className="text-slate-400 text-xs">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Royal CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <QuantumButton variant="plasma" size="xl" className="min-w-[250px]">
            <Crown size={20} />
            Ascend to the Throne
          </QuantumButton>

          <QuantumButton variant="hologram" size="xl" className="min-w-[250px]">
            <Scepter size={20} />
            View Royal Demo
          </QuantumButton>
        </motion.div>

        {/* Royal Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {[
            { number: "10M+", label: "Royal Subjects" },
            { number: "$50B+", label: "Assets Under Crown" },
            { number: "99.9%", label: "Royal Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Royal Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
