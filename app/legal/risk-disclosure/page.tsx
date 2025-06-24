import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"
import { AlertTriangle, Shield, TrendingDown, TrendingUp } from "lucide-react"

export default function RiskDisclosurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/70 p-6">
      <div className="container mx-auto max-w-4xl">
        <HolographicGlassCard className="p-8" glassEffect="medium">
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-600 to-orange-600">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-indigo-100 mb-2">Risk Disclosure Statement</h1>
              <h2 className="text-xl text-indigo-300 mb-4">Inclusive Lending and Credit Empirical Authority</h2>
              <p className="text-indigo-400">Important Information for Economic Global Citizens</p>
              <p className="text-sm text-indigo-500 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="bg-yellow-950/30 border border-yellow-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-yellow-200">IMPORTANT RISK WARNING</h3>
              </div>
              <p className="text-yellow-100 font-semibold">
                All financial investments and lending activities carry inherent risks. You should carefully consider
                whether our services are suitable for your financial situation before participating in any ILCEA
                programs.
              </p>
            </div>

            <div className="space-y-6 text-indigo-200">
              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">1. General Investment Risks</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-5 w-5 text-red-400" />
                      <h4 className="font-semibold text-indigo-200">Market Risk</h4>
                    </div>
                    <p className="text-sm text-indigo-300">
                      Investment values may fluctuate due to market conditions, economic factors, and global events.
                    </p>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <h4 className="font-semibold text-indigo-200">Liquidity Risk</h4>
                    </div>
                    <p className="text-sm text-indigo-300">
                      Some investments may be difficult to sell quickly or at desired prices.
                    </p>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <h4 className="font-semibold text-indigo-200">Credit Risk</h4>
                    </div>
                    <p className="text-sm text-indigo-300">
                      Risk of loss due to borrower default or credit deterioration.
                    </p>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      <h4 className="font-semibold text-indigo-200">Technology Risk</h4>
                    </div>
                    <p className="text-sm text-indigo-300">
                      Risks associated with quantum computing, AI algorithms, and blockchain technology.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">2. Empirical Credit Assessment Risks</h3>
                <p className="mb-4">
                  Our Empirical Credit Authority uses advanced algorithms and alternative data sources. Important
                  considerations include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Credit assessments may differ from traditional scoring methods</li>
                  <li>Algorithm-based decisions may contain inherent biases or errors</li>
                  <li>Alternative data sources may not always accurately predict creditworthiness</li>
                  <li>Credit scores and lending decisions may change based on new data</li>
                  <li>Global economic citizenship metrics are experimental and evolving</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">3. Tokenized Asset Investment Risks</h3>
                <p className="mb-4">Tokenized investments carry specific risks:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Regulatory uncertainty around tokenized securities</li>
                  <li>Technology risks related to blockchain and smart contracts</li>
                  <li>Limited liquidity in secondary markets</li>
                  <li>Potential for total loss of investment</li>
                  <li>Cybersecurity risks and potential hacking</li>
                  <li>Volatility in underlying asset values</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">4. Quantum Computing and AI Risks</h3>
                <p className="mb-4">Our advanced technology systems present unique risks:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Quantum computing technology is still evolving and may contain errors</li>
                  <li>AI algorithms may make unexpected or biased decisions</li>
                  <li>System failures could impact service availability</li>
                  <li>Quantum security measures may not be foolproof</li>
                  <li>Technology updates may affect system performance</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">5. Regulatory and Legal Risks</h3>
                <p className="mb-4">
                  As a global platform offering innovative financial services, ILCEA faces regulatory risks:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Changing regulations may affect service availability</li>
                  <li>Compliance requirements may limit certain features</li>
                  <li>Legal challenges to new financial technologies</li>
                  <li>Cross-border regulatory conflicts</li>
                  <li>Potential restrictions on Economic Global Citizenship concepts</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">6. Lending and Credit Risks</h3>
                <p className="mb-4">For borrowers using our inclusive lending services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Failure to repay loans may damage your credit score</li>
                  <li>Interest rates may be higher than traditional lenders</li>
                  <li>Collateral may be required and could be lost</li>
                  <li>Early repayment penalties may apply</li>
                  <li>Default may result in legal action</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">7. Your Responsibilities</h3>
                <p className="mb-4">As an Economic Global Citizen, you are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Understanding all risks before making financial decisions</li>
                  <li>Only investing what you can afford to lose</li>
                  <li>Seeking independent financial advice when appropriate</li>
                  <li>Regularly monitoring your investments and credit</li>
                  <li>Reporting any concerns or issues promptly</li>
                  <li>Maintaining accurate and up-to-date information</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">8. Contact Information</h3>
                <p className="mb-4">For questions about risks or to report concerns:</p>
                <div className="bg-indigo-950/50 p-4 rounded-lg border border-indigo-500/20">
                  <p>
                    <strong>Risk Management Department</strong>
                  </p>
                  <p>Inclusive Lending and Credit Empirical Authority</p>
                  <p>Email: risk@ilcea.com</p>
                  <p>Phone: +1 (555) ILCEA-RISK</p>
                  <p>24/7 Risk Hotline: +1 (555) RISK-HELP</p>
                </div>
              </section>

              <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-6 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <h3 className="text-xl font-bold text-red-200">FINAL WARNING</h3>
                </div>
                <p className="text-red-100 font-semibold">
                  Past performance is not indicative of future results. All investments carry the risk of loss. Never
                  invest more than you can afford to lose. Seek professional financial advice before making investment
                  decisions.
                </p>
              </div>
            </div>
          </div>
        </HolographicGlassCard>
      </div>
    </div>
  )
}
