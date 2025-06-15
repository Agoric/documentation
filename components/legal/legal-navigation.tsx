import Link from "next/link"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"
import { FileText, Shield, AlertTriangle, Users, Lock, Globe, CheckCircle2, Scale } from "lucide-react"

const legalDocuments = [
  {
    title: "Terms of Service",
    description: "Platform usage terms and Economic Global Citizenship agreement",
    icon: <FileText className="h-6 w-6 text-indigo-400" />,
    href: "/legal/terms-of-service",
    category: "Core Agreement",
  },
  {
    title: "Privacy Policy",
    description: "How we protect and use your personal information",
    icon: <Lock className="h-6 w-6 text-green-400" />,
    href: "/legal/privacy-policy",
    category: "Data Protection",
  },
  {
    title: "Risk Disclosure",
    description: "Important information about financial risks and investments",
    icon: <AlertTriangle className="h-6 w-6 text-yellow-400" />,
    href: "/legal/risk-disclosure",
    category: "Risk Management",
  },
  {
    title: "Regulatory Compliance",
    description: "Our commitment to global financial standards",
    icon: <Shield className="h-6 w-6 text-blue-400" />,
    href: "/legal/compliance",
    category: "Compliance",
  },
  {
    title: "User Agreement",
    description: "Comprehensive agreement for Economic Global Citizens",
    icon: <Users className="h-6 w-6 text-purple-400" />,
    href: "/legal/user-agreement",
    category: "User Rights",
  },
  {
    title: "Cookie Policy",
    description: "Information about cookies and tracking technologies",
    icon: <Globe className="h-6 w-6 text-orange-400" />,
    href: "/legal/cookie-policy",
    category: "Technical",
  },
]

export function LegalNavigation() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
            <Scale className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-indigo-100 mb-2">Legal Documentation</h1>
        <h2 className="text-xl text-indigo-300 mb-4">Inclusive Lending and Credit Empirical Authority</h2>
        <p className="text-indigo-400 max-w-2xl mx-auto">
          Comprehensive legal framework supporting your Economic Global Citizenship and New World Wealth Navigation
          experience
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {legalDocuments.map((doc, index) => (
          <Link key={index} href={doc.href}>
            <HolographicGlassCard
              className="h-full transition-all duration-300 hover:scale-105 cursor-pointer"
              glassEffect="light"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-indigo-400 mb-1">{doc.category}</div>
                    <CardTitle className="text-lg text-indigo-100">{doc.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-indigo-300">{doc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-indigo-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Updated {new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </HolographicGlassCard>
          </Link>
        ))}
      </div>

      <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-indigo-100 mb-3">Legal Support</h3>
        <p className="text-indigo-300 mb-4">
          Need help understanding our legal documentation or have questions about your rights as an Economic Global
          Citizen?
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-semibold text-indigo-200 mb-2">Legal Department</h4>
            <p className="text-sm text-indigo-400">Email: legal@ilcea.com</p>
            <p className="text-sm text-indigo-400">Phone: +1 (555) ILCEA-LAW</p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-200 mb-2">Compliance Office</h4>
            <p className="text-sm text-indigo-400">Email: compliance@ilcea.com</p>
            <p className="text-sm text-indigo-400">Phone: +1 (555) COMPLY-NOW</p>
          </div>
        </div>
      </div>
    </div>
  )
}
