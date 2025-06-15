import { AlertTriangle, FileText, Scale, Shield, Users } from "lucide-react"
import { Globe, Anchor, Copyright, Crown } from "lucide-react"

const legalDocuments = [
  {
    title: "Terms of Service",
    description: "Complete terms governing your use of the Inclusive Lending and Credit Empirical Authority platform",
    href: "/legal/terms-of-service",
    icon: FileText,
    category: "Platform Terms",
  },
  {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal and financial information",
    href: "/legal/privacy-policy",
    icon: Shield,
    category: "Privacy & Security",
  },
  {
    title: "Risk Disclosure",
    description: "Important information about risks associated with our financial services",
    href: "/legal/risk-disclosure",
    icon: AlertTriangle,
    category: "Risk Management",
  },
  {
    title: "Regulatory Compliance",
    description: "Our commitment to regulatory compliance and consumer protection",
    href: "/legal/compliance",
    icon: Scale,
    category: "Compliance",
  },
  {
    title: "User Agreement",
    description: "Detailed agreement covering Economic Global Citizenship benefits and responsibilities",
    href: "/legal/user-agreement",
    icon: Users,
    category: "User Rights",
  },
  {
    title: "Digital Domicile Declaration",
    description: "Establishment of SNAPPCREDITCOM Digital Realm and Economic Global Citizenship rights",
    href: "/legal/digital-domicile",
    icon: Globe,
    category: "Digital Sovereignty",
  },
  {
    title: "Realm Immunity Clause",
    description: "SNAPPCREDITCOM sovereign immunity within the Digital Admiralty Realm",
    href: "/legal/realm-immunity",
    icon: Shield,
    category: "Digital Sovereignty",
  },
  {
    title: "Digital Admiralty Jurisdiction",
    description: "Declaration of Digital Admiralty Realm Jurisdiction and maritime law authority",
    href: "/legal/admiralty-jurisdiction",
    icon: Anchor,
    category: "Digital Sovereignty",
  },
  {
    title: "Intellectual Property Rights",
    description: "Comprehensive copyright protection across all dimensions and realities",
    href: "/legal/intellectual-property",
    icon: Copyright,
    category: "Intellectual Property",
  },
  {
    title: "Diplomatic Immunity Declaration",
    description: "Diplomatic immunity for SNAPPCREDITCOM agents with accountability and settlement frameworks",
    href: "/legal/diplomatic-immunity",
    icon: Crown,
    category: "Digital Sovereignty",
  },
]

const LegalPage = () => {
  return (
    <div>
      <h1>Legal Documents</h1>
      <ul>
        {legalDocuments.map((doc, index) => (
          <li key={index}>
            <a href={doc.href}>
              {doc.title} - {doc.description}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LegalPage
