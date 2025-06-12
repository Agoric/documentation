"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HolographicNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleGetStarted = () => {
    router.push("/dashboard/snap-dax/onboarding")
  }

  const handleLogin = () => {
    router.push("/dashboard")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/30 backdrop-blur-xl border-b border-cyan-500/20 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-70 blur-sm" />
            <span className="text-white font-bold text-xl relative z-10">S</span>
          </motion.div>
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 font-bold text-2xl"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            SnapAiFi
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks scrollToSection={scrollToSection} />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-900/30"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-none relative overflow-hidden group"
              onClick={handleGetStarted}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <span className="relative z-10">Get Started</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-cyan-300"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/80 backdrop-blur-xl border-b border-cyan-500/20"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <NavLinks mobile setMobileMenuOpen={setMobileMenuOpen} scrollToSection={scrollToSection} />
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-cyan-900/30">
              <Button
                variant="ghost"
                className="justify-start text-cyan-300 hover:text-cyan-100 hover:bg-cyan-900/30"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-none"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

function NavLinks({ mobile = false, setMobileMenuOpen = () => {}, scrollToSection }: any) {
  const links = [
    { name: "Features", href: "features" },
    { name: "Demo", href: "product-demo" },
    { name: "Benefits", href: "benefits" },
    { name: "Testimonials", href: "testimonials" },
  ]

  return links.map((link) => (
    <button
      key={link.name}
      onClick={() => scrollToSection(link.href)}
      className={`text-cyan-300 hover:text-cyan-100 transition-colors ${
        mobile ? "py-2 px-4 hover:bg-cyan-900/20 rounded-md text-left" : ""
      }`}
    >
      {link.name}
    </button>
  ))
}
