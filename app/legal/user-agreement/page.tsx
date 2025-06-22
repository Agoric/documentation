import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"
import { FileText, Users, Shield, Globe } from "lucide-react"

export default function UserAgreementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/70 p-6">
      <div className="container mx-auto max-w-4xl">
        <HolographicGlassCard className="p-8" glassEffect="medium">
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-indigo-100 mb-2">User Agreement</h1>
              <h2 className="text-xl text-indigo-300 mb-4">Inclusive Lending and Credit Empirical Authority</h2>
              <p className="text-indigo-400">Economic Global Citizenship Agreement</p>
              <p className="text-sm text-indigo-500 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-6 text-indigo-200">
              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">
                  1. Welcome to Economic Global Citizenship
                </h3>
                <p className="mb-4">
                  Welcome home to the Inclusive Lending and Credit Empirical Authority ("ILCEA"). By creating an account
                  and using our New World Wealth Navigation Assistant, you become an Economic Global Citizen and agree
                  to this User Agreement. This agreement governs your relationship with ILCEA and your access to
                  revolutionary financial services.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">2. Economic Global Citizenship Benefits</h3>
                <p className="mb-4">As an Economic Global Citizen, you gain access to:</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-5 w-5 text-blue-400" />
                      <h4 className="font-semibold text-indigo-200">Global Financial Access</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Worldwide financial services</li>
                      <li>• Cross-border investment opportunities</li>
                      <li>• Multi-currency support</li>
                      <li>• International credit recognition</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-5 w-5 text-green-400" />
                      <h4 className="font-semibold text-indigo-200">Empirical Credit Authority</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Advanced credit assessment</li>
                      <li>• Alternative data integration</li>
                      <li>• Inclusive lending opportunities</li>
                      <li>• Dynamic credit optimization</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-purple-400" />
                      <h4 className="font-semibold text-indigo-200">AI Wealth Navigation</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Personalized financial guidance</li>
                      <li>• Quantum-powered analytics</li>
                      <li>• Therapeutic financial support</li>
                      <li>• Behavioral pattern optimization</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-yellow-400" />
                      <h4 className="font-semibold text-indigo-200">Revolutionary Technologies</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Tokenized asset investments</li>
                      <li>• Quantum-secured transactions</li>
                      <li>• Blockchain-based ownership</li>
                      <li>• Neural market prediction</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">3. Account Creation and Verification</h3>
                <p className="mb-4">To become an Economic Global Citizen, you must:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete personal information</li>
                  <li>Complete our comprehensive KYC (Know Your Customer) process</li>
                  <li>Undergo empirical credit assessment</li>
                  <li>Verify your identity through multiple authentication methods</li>
                  <li>Agree to ongoing monitoring and compliance requirements</li>
                  <li>Maintain current and accurate account information</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">4. Financial Services Usage</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-indigo-200 mb-2">Lending Services:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-indigo-300">
                      <li>You agree to repay all borrowed amounts according to agreed terms</li>
                      <li>Interest rates and fees will be clearly disclosed before acceptance</li>
                      <li>Default may result in collection actions and credit reporting</li>
                      <li>Collateral requirements may apply to certain loan products</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-200 mb-2">Investment Services:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-indigo-300">
                      <li>All investments carry risk of loss, including total loss</li>
                      <li>Past performance does not guarantee future results</li>
                      <li>You are responsible for understanding investment risks</li>
                      <li>Diversification does not guarantee against loss</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-200 mb-2">Credit Services:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-indigo-300">
                      <li>Credit decisions are based on empirical assessment algorithms</li>
                      <li>Credit terms may change based on updated assessments</li>
                      <li>You have the right to dispute credit decisions</li>
                      <li>Credit information may be shared with authorized parties</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">5. Technology Usage and Limitations</h3>
                <p className="mb-4">
                  Our platform utilizes advanced technologies including quantum computing, artificial intelligence, and
                  blockchain systems. You acknowledge that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Technology systems may experience downtime or errors</li>
                  <li>AI algorithms may make decisions you disagree with</li>
                  <li>Quantum security measures are evolving and not foolproof</li>
                  <li>Blockchain transactions may be irreversible</li>
                  <li>System updates may affect functionality</li>
                  <li>You should not rely solely on automated systems for financial decisions</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">6. Fees and Charges</h3>
                <p className="mb-4">ILCEA may charge fees for various services, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account maintenance and service fees</li>
                  <li>Transaction processing fees</li>
                  <li>Investment management fees</li>
                  <li>Lending origination and servicing fees</li>
                  <li>Premium feature access fees</li>
                  <li>International transfer fees</li>
                </ul>
                <p className="mt-4 text-sm text-indigo-400">
                  All fees will be clearly disclosed before charges are incurred.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">7. Privacy and Data Usage</h3>
                <p className="mb-4">
                  By using ILCEA services, you consent to our collection and use of your data as described in our
                  Privacy Policy, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Financial and personal information collection</li>
                  <li>Behavioral pattern analysis for credit assessment</li>
                  <li>AI-powered financial guidance personalization</li>
                  <li>Sharing with authorized service providers</li>
                  <li>Compliance reporting to regulatory authorities</li>
                  <li>Marketing and service improvement analytics</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">8. Prohibited Activities</h3>
                <p className="mb-4">As an Economic Global Citizen, you agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use services for illegal activities or money laundering</li>
                  <li>Provide false or misleading information</li>
                  <li>Attempt to manipulate or hack our systems</li>
                  <li>Share account credentials with unauthorized parties</li>
                  <li>Engage in market manipulation or insider trading</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Use services in prohibited jurisdictions</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">9. Account Termination</h3>
                <p className="mb-4">ILCEA may suspend or terminate your Economic Global Citizenship for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violation of this User Agreement</li>
                  <li>Suspicious or fraudulent activity</li>
                  <li>Failure to maintain account requirements</li>
                  <li>Regulatory or legal requirements</li>
                  <li>Extended account inactivity</li>
                  <li>Risk management concerns</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">10. Dispute Resolution</h3>
                <p className="mb-4">Disputes will be resolved through:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Direct communication with our customer service team</li>
                  <li>Internal escalation to our dispute resolution department</li>
                  <li>Mediation through approved financial services mediators</li>
                  <li>Binding arbitration if mediation is unsuccessful</li>
                </ol>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">11. Contact Information</h3>
                <p className="mb-4">For questions about this User Agreement or your Economic Global Citizenship:</p>
                <div className="bg-indigo-950/50 p-4 rounded-lg border border-indigo-500/20">
                  <p>
                    <strong>Customer Relations Department</strong>
                  </p>
                  <p>Inclusive Lending and Credit Empirical Authority</p>
                  <p>Email: support@ilcea.com</p>
                  <p>Phone: +1 (555) ILCEA-HELP</p>
                  <p>24/7 Support: +1 (555) GLOBAL-CITIZEN</p>
                  <p>Address: [Corporate Customer Service Address]</p>
                </div>
              </section>

              <div className="bg-indigo-950/50 border border-indigo-500/30 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold text-indigo-100 mb-3">Agreement Acceptance</h3>
                <p className="text-indigo-200">
                  By using ILCEA services, you acknowledge that you have read, understood, and agree to be bound by this
                  User Agreement. You also confirm that you meet all eligibility requirements for Economic Global
                  Citizenship and will comply with all applicable laws and regulations.
                </p>
                <p className="text-indigo-300 mt-3 text-sm">
                  Welcome home to the future of finance. Your journey as an Economic Global Citizen begins now.
                </p>
              </div>
            </div>
          </div>
        </HolographicGlassCard>
      </div>
    </div>
  )
}
