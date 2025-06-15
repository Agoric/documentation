import type React from "react"
import { SupremeAuthorityLogo } from "@/components/ui/logo"

const HolographicFooter: React.FC = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <SupremeAuthorityLogo size="lg" />
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
              "Decentralized Banking Democratized Wealth"
            </h3>
            <p className="text-cyan-300/80">Empowering Global Financial Freedom Through Imperial Innovation</p>
          </div>
        </div>
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Supreme Authority. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default HolographicFooter
