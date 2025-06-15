"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Crown, Shield, Sparkles, Mail, Phone, MapPin } from "lucide-react"

const footerSections = [
  {
    title: "Platform",
    links: [
      { name: "Snapifi", href: "/dashboard/snapifi" },
      { name: "DAX Trading", href: "/dashboard/dax" },
      { name: "Banking", href: "/dashboard/banking" },
      { name: "Real Estate", href: "/dashboard/real-estate" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "AI Concierge", href: "/dashboard/ai-concierge" },
      { name: "Quantum Analytics", href: "/dashboard/analytics" },
      { name: "Treasury", href: "/dashboard/treasury" },
      { name: "Global Citizen", href: "/dashboard/global-citizen" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Mission", href: "/mission" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Compliance", href: "/compliance" },
      { name: "Security", href: "/security" },
    ],
  },
]

export function HolographicFooter() {
  return (
    <footer className="relative bg-slate-950 border-t border-amber-400/30">
      {/* High contrast background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950" />

      {/* Minimal grid pattern for texture without distraction */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Header Section - High Contrast */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-amber-400" />
              <h2 className="text-3xl font-bold text-white">Supreme Authority</h2>
              <Crown className="h-8 w-8 text-amber-400" />
            </div>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Empowering global financial sovereignty through quantum-powered technology and imperial-grade security.
            </p>
          </motion.div>

          {/* Contact Information - Clear and Accessible */}
          <div className="flex flex-wrap justify-center gap-8 text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-amber-400" />
              <span className="text-white font-medium">contact@supremeauthority.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-amber-400" />
              <span className="text-white font-medium">+1 (555) 777-SUPREME</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-400" />
              <span className="text-white font-medium">Global Headquarters</span>
            </div>
          </div>
        </div>

        {/* Navigation Grid - High Contrast and Organized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-bold text-amber-400 mb-4 border-b border-amber-400/30 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Security & Trust Indicators - High Visibility */}
        <div className="border-t border-amber-400/30 pt-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-slate-200">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="font-semibold text-white">Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <span className="font-semibold text-white">Quantum Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <Crown className="h-5 w-5 text-amber-400" />
              <span className="font-semibold text-white">Imperial Grade</span>
            </div>
          </div>
        </div>

        {/* Copyright - Clean and Professional */}
        <div className="border-t border-slate-700 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 font-medium">© 2024 Supreme Authority. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-400">Version 777</span>
              <span className="text-amber-400 font-bold">●</span>
              <span className="text-slate-400">Quantum Powered</span>
              <span className="text-amber-400 font-bold">●</span>
              <span className="text-slate-400">Globally Trusted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom glow for depth without distraction */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
    </footer>
  )
}
