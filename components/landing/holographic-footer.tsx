"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react"

export function HolographicFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Support", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-radial from-blue-900/10 to-transparent opacity-30" />

        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Back to top button */}
        <div className="flex justify-center mb-16">
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-colors relative group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowUp className="h-5 w-5" />
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 rounded-full blur-md opacity-0 group-hover:opacity-100 group-hover:from-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-500" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-70 blur-sm" />
                <span className="text-white font-bold text-xl relative z-10">S</span>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 font-bold text-2xl">
                SnapAiFi
              </span>
            </Link>
            <p className="text-cyan-100/70 mb-6">
              Revolutionizing financial experiences with AI-powered holographic interfaces and quantum-secure
              technology.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center text-cyan-300 hover:text-cyan-100 transition-colors relative group"
                  aria-label={social.label}
                >
                  {social.icon}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 rounded-full blur-md opacity-0 group-hover:opacity-100 group-hover:from-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-cyan-100/70 hover:text-cyan-300 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyan-900/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cyan-100/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SnapAiFi. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-cyan-100/50 hover:text-cyan-300 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-cyan-100/50 hover:text-cyan-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-cyan-100/50 hover:text-cyan-300 text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
