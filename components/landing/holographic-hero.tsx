"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HolographicHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()

      const x = (clientX - left) / width
      const y = (clientY - top) / height

      const glowElements = heroRef.current.querySelectorAll(".glow-effect")
      glowElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.setProperty("--mouse-x", `${x}`)
          el.style.setProperty("--mouse-y", `${y}`)
        }
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={heroRef} id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px] opacity-20 animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-blue-900/20 to-transparent opacity-30" />

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-10" />
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">The Future of Finance is </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
              Intelligent
            </span>
          </motion.h1>

          <motion.p
            className="text-cyan-100/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            SnapAiFi combines cutting-edge AI with holographic interfaces to transform your financial experience.
            Visualize, optimize, and grow your wealth like never before.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-none relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <span className="relative z-10 flex items-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-500 text-cyan-300 hover:bg-cyan-950/30 hover:text-cyan-100"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Holographic Display */}
            <div className="absolute inset-0 glow-effect rounded-3xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/30 shadow-lg flex items-center justify-center overflow-hidden">
              {/* Glass reflection effect */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)",
                }}
              />

              {/* Edge glow effect */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: "inset 0 0 20px rgba(79, 209, 197, 0.3), 0 0 30px rgba(79, 209, 197, 0.2)",
                }}
              />

              {/* Floating elements */}
              <div className="relative w-full h-full p-8">
                {/* Financial data visualization */}
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 backdrop-blur-md flex flex-col justify-center p-4 animate-float-slow">
                  <div className="h-2 w-3/4 bg-cyan-400/50 rounded-full mb-2" />
                  <div className="h-2 w-1/2 bg-blue-400/50 rounded-full" />
                </div>

                {/* AI assistant visualization */}
                <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-gradient-radial from-cyan-500/30 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center animate-pulse-slow">
                  <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-500/40 animate-spin-slow" />
                </div>

                {/* Holographic chart */}
                <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/4 animate-float">
                  <div className="relative h-full flex items-end justify-around">
                    {[0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.7].map((height, i) => (
                      <div
                        key={i}
                        className="w-[8%] bg-gradient-to-t from-cyan-500/80 to-blue-500/80 rounded-t-sm"
                        style={{ height: `${height * 100}%` }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-full opacity-50 bg-gradient-to-t from-transparent to-white/20" />
                      </div>
                    ))}
                  </div>
                  <div className="h-[1px] w-full bg-cyan-400/50 mt-1" />
                </div>

                {/* Floating particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-cyan-400/80"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float-particle ${3 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 5}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-75 animate-glow" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-cyan-500/50 flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
        
        .animate-float-slow {
          animation: float-slow 8s infinite ease-in-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s infinite linear;
        }
        
        .animate-glow {
          animation: glow 4s infinite ease-in-out;
        }
        
        .glow-effect {
          --mouse-x: 0.5;
          --mouse-y: 0.5;
          position: relative;
        }
        
        .glow-effect::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 
            calc(var(--mouse-x) * 100%) 
            calc(var(--mouse-y) * 100%), 
            rgba(79, 209, 197, 0.15), 
            transparent 40%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .glow-effect:hover::after {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
