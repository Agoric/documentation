import { ShieldCheck, Briefcase } from "lucide-react"

const betaFeatures = [
  {
    id: "ai-powered-insights",
    name: "AI-Powered Insights",
    description: "Unlock deeper insights with our AI-driven analytics.",
    status: "beta" as const,
    progress: 65,
    category: "Analytics",
    icon: "📈",
    riskLevel: "low" as const,
    features: ["Automated data analysis", "Predictive modeling", "Personalized recommendations"],
    risks: ["Data accuracy", "Algorithm bias", "Privacy concerns"],
    estimatedCompletion: "2023-12-31",
    isEnabled: true,
  },
  {
    id: "enhanced-security-protocols",
    name: "Enhanced Security Protocols",
    description: "Protect your data with our advanced security measures.",
    status: "alpha" as const,
    progress: 40,
    category: "Security",
    icon: "🔒",
    riskLevel: "high" as const,
    features: ["Multi-factor authentication", "End-to-end encryption", "Real-time threat detection"],
    risks: ["System vulnerabilities", "Data breaches", "User adoption challenges"],
    estimatedCompletion: "2024-01-15",
    isEnabled: false,
  },
  {
    id: "credit-suite-quantum",
    name: "Quantum Credit Suite",
    description: "AI-powered credit optimization using quantum algorithms",
    status: "beta" as const,
    progress: 88,
    category: "Financial AI",
    icon: ShieldCheck,
    riskLevel: "medium" as const,
    features: [
      "Quantum credit score prediction",
      "AI-powered debt optimization",
      "Real-time credit monitoring",
      "Predictive financial modeling",
      "Automated credit repair",
    ],
    risks: ["Credit algorithm accuracy", "Financial data privacy", "Regulatory compliance"],
    estimatedCompletion: "2024-02-15",
    isEnabled: true,
  },
  {
    id: "business-suite-neural",
    name: "Neural Business Suite",
    description: "Advanced business intelligence with neural network analysis",
    status: "alpha" as const,
    progress: 72,
    category: "Business AI",
    icon: Briefcase,
    riskLevel: "high" as const,
    features: [
      "Neural market analysis",
      "AI business strategy generation",
      "Predictive revenue modeling",
      "Automated competitor analysis",
      "Quantum risk assessment",
    ],
    risks: [
      "Business strategy accuracy",
      "Market prediction volatility",
      "Competitive intelligence ethics",
      "Data source reliability",
    ],
    estimatedCompletion: "2024-03-20",
    isEnabled: true,
  },
]

const Page = () => {
  return (
    <div>
      <h1>Beta Lab</h1>
      <p>Explore our experimental features and provide feedback.</p>
      <ul>
        {betaFeatures.map((feature) => (
          <li key={feature.id}>
            <h2>{feature.name}</h2>
            <p>{feature.description}</p>
            <p>Status: {feature.status}</p>
            <p>Progress: {feature.progress}%</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
