"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function PlatformBenefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const benefits = [
    {
      title: "Visualize Your Financial Future",
      description:
        "Our holographic 3D visualization technology transforms complex financial data into intuitive, interactive displays that help you understand your financial position at a glance.",
      image: "/holographic-display.png",
    },
    {
      title: "AI-Powered Financial Advisor",
      description:
        "SnapAiFi's advanced AI analyzes your spending patterns, investment portfolio, and financial goals to provide personalized recommendations that optimize your financial health.",
      image: "/neural-interface.png",
      reverse: true,
    },
    {
      title: "Secure Quantum Encryption",
      description:
        "Your financial data is protected by state-of-the-art quantum-resistant encryption, ensuring your sensitive information remains secure against even the most advanced threats.",
      image: "/biometric-security.png",
    },
  ]

  return (
    <section id="benefits" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-cyan-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow"
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
            <span className="text-white">Transform Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
              Financial Experience
            </span>
          </h2>
          <p className="text-cyan-100/70 max-w-2xl mx-auto">
            Discover how SnapAiFi's innovative platform can revolutionize the way you manage, visualize, and grow your
            wealth.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-24">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${benefit.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-12`}
            >
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{benefit.title}</h3>
                <p className="text-cyan-100/70 text-lg mb-6">{benefit.description}</p>
                <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
              </div>

              <div className="flex-1 relative">
                <div className="relative aspect-video w-full max-w-lg mx-auto">
                  {/* Holographic Display */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/30 shadow-lg">
                    {/* Glass reflection effect */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)",
                      }}
                    />

                    {/* Image */}
                    <div className="relative h-full w-full p-2">
                      <div className="relative h-full w-full overflow-hidden rounded-xl">
                        <Image
                          src={benefit.image || "/placeholder.svg"}
                          alt={benefit.title}
                          fill
                          className="object-cover"
                        />

                        {/* Scan line effect */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="h-[1px] w-full bg-cyan-400/50 absolute top-0 left-0 animate-scan-line" />
                        </div>

                        {/* Holographic overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-[24px] blur-xl opacity-50 animate-glow" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        
        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }
      `}</style>
    </section>
  )
}
