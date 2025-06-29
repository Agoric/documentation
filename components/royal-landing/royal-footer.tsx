"use client"
import { motion } from "framer-motion"
import { Crown, Shield, Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from "lucide-react"

export function RoyalFooter() {
  return (
    <footer className="relative py-20 px-6 border-t border-yellow-400/20">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <Crown className="text-yellow-400" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                SNAPIFI ROYAL
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Empowering financial royalty with cutting-edge technology and unparalleled service. Rule your financial
              empire with confidence.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400/20 to-purple-500/20 flex items-center justify-center text-yellow-400 hover:text-white hover:scale-110 transition-all"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-yellow-400">Royal Services</h3>
            <ul className="space-y-2">
              {[
                "Royal Dashboard",
                "Investment Management",
                "Wealth Advisory",
                "Portfolio Analytics",
                "Risk Management",
                "Tax Optimization",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-yellow-400">Royal Support</h3>
            <ul className="space-y-2">
              {[
                "Help Center",
                "VIP Concierge",
                "Security Center",
                "API Documentation",
                "System Status",
                "Royal Academy",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-yellow-400">Royal Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="text-yellow-400" size={16} />
                <span className="text-slate-400 text-sm">royalty@snapifi.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-yellow-400" size={16} />
                <span className="text-slate-400 text-sm">+1 (800) ROYAL-01</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-yellow-400" size={16} />
                <span className="text-slate-400 text-sm">Royal Tower, Financial District</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <span>© 2024 SNAPIFI ROYAL. All rights reserved.</span>
            <Shield className="text-yellow-400" size={16} />
            <span>Secured by Royal Guard</span>
          </div>

          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              Royal Agreement
            </a>
          </div>
        </motion.div>

        {/* Royal Seal */}
        <motion.div
          className="absolute top-10 right-10 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Crown size={120} className="text-yellow-400" />
        </motion.div>
      </div>
    </footer>
  )
}
