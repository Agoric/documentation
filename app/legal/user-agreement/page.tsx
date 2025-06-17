import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"
import { FileText, Users, Shield, Globe, Crown, Scroll } from "lucide-react"

export default function UserAgreementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/70 to-purple-950/50 p-6">
      <div className="container mx-auto max-w-4xl">
        <HolographicGlassCard className="p-8" glassEffect="medium" holographicIntensity="moderate">
          <div className="space-y-8">
            {/* Imperial Header */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 shadow-lg shadow-amber-500/30">
                    <Crown className="h-10 w-10 text-amber-100" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <Scroll className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mb-2">
                FOEDUS CIVITATIS ECONOMICAE
              </h1>
              <p className="text-xl text-amber-200/80 mb-4">Economic Citizenship Agreement</p>

              <h2 className="text-2xl text-indigo-300 mb-4">AUCTORITAS EMPIRICA CREDITUM ET MUTUUM INCLUSIVUM</h2>
              <p className="text-indigo-400 mb-2">Inclusive Lending and Credit Empirical Authority</p>
              <p className="text-sm text-indigo-500">RENOVATUM: {new Date().toLocaleDateString()} • Last Updated</p>
            </div>

            <div className="space-y-8 text-indigo-200">
              {/* Welcome Section */}
              <section>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">
                  I. SALVE AD CIVITATEM ECONOMICAM GLOBALEM
                </h3>
                <p className="text-lg text-amber-200/70 mb-4">Welcome to Global Economic Citizenship</p>
                <p className="mb-4 leading-relaxed">
                  Welcome home to the Inclusive Lending and Credit Empirical Authority ("ILCEA"). By creating an account
                  and using our New World Wealth Navigation Assistant, you become an Economic Global Citizen and agree
                  to this User Agreement. This agreement governs your relationship with ILCEA and your access to
                  revolutionary financial services.
                </p>
              </section>

              {/* Citizenship Benefits */}
              <section>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">
                  II. BENEFICIA CIVITATIS ECONOMICAE
                </h3>
                <p className="text-lg text-amber-200/70 mb-4">Economic Citizenship Benefits</p>
                <p className="mb-6">As an Economic Global Citizen, you gain access to:</p>

                <div className="grid gap-6 md:grid-cols-2">
                  <HolographicGlassCard className="p-6" glassEffect="light">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="h-6 w-6 text-blue-400" />
                      <div>
                        <h4 className="font-semibold text-amber-300">ACCESSUS FINANCIALIS GLOBALIS</h4>
                        <p className="text-sm text-blue-300">Global Financial Access</p>
                      </div>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-2">
                      <li>• Worldwide financial services</li>
                      <li>• Cross-border investment opportunities</li>
                      <li>• Multi-currency support</li>
                      <li>• International credit recognition</li>
                    </ul>
                  </HolographicGlassCard>

                  <HolographicGlassCard className="p-6" glassEffect="light">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-6 w-6 text-green-400" />
                      <div>
                        <h4 className="font-semibold text-amber-300">AUCTORITAS CREDITUM EMPIRICA</h4>
                        <p className="text-sm text-green-300">Empirical Credit Authority</p>
                      </div>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-2">
                      <li>• Advanced credit assessment</li>
                      <li>• Alternative data integration</li>
                      <li>• Inclusive lending opportunities</li>
                      <li>• Dynamic credit optimization</li>
                    </ul>
                  </HolographicGlassCard>

                  <HolographicGlassCard className="p-6" glassEffect="light">
                    <div className="flex items-center gap-3 mb-4">
                      <Users className="h-6 w-6 text-purple-400" />
                      <div>
                        <h4 className="font-semibold text-amber-300">NAVIGATIO DIVITIARUM AI</h4>
                        <p className="text-sm text-purple-300">AI Wealth Navigation</p>
                      </div>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-2">
                      <li>• Personalized financial guidance</li>
                      <li>• Quantum-powered analytics</li>
                      <li>• Therapeutic financial support</li>
                      <li>• Behavioral pattern optimization</li>
                    </ul>
                  </HolographicGlassCard>

                  <HolographicGlassCard className="p-6" glassEffect="light">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="h-6 w-6 text-yellow-400" />
                      <div>
                        <h4 className="font-semibold text-amber-300">TECHNOLOGIAE REVOLUTIONARIAE</h4>
                        <p className="text-sm text-yellow-300">Revolutionary Technologies</p>
                      </div>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-2">
                      <li>• Tokenized asset investments</li>
                      <li>• Quantum-secured transactions</li>
                      <li>• Blockchain-based ownership</li>
                      <li>• Neural market prediction</li>
                    </ul>
                  </HolographicGlassCard>
                </div>
              </section>

              {/* Account Creation */}
              <section>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">
                  III. CREATIO ET VERIFICATIO RATIONIS
                </h3>
                <p className="text-lg text-amber-200/70 mb-4">Account Creation and Verification</p>
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

              {/* Financial Services */}
              <section>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">
                  IV. USUS SERVITII FINANCIALIS
                </h3>
                <p className="text-lg text-amber-200/70 mb-4">Financial Services Usage</p>

                <div className="space-y-6">
                  <HolographicGlassCard className="p-6" glassEffect="light">
                    <h4 className="font-semibold text-amber-300 mb-2">SERVITIA MUTUORUM • Lending Services:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-indigo-300">
                      <li>You agree to repay all borrowed amounts according to agreed terms</li>
                      <li>Interest rates and fees will be clearly disclosed before acceptance</li>
                      <li>Default may result in collection actions and credit reporting</li>
                      <li>Collateral requirements may apply to certain loan products</li>
                    </ul>
                  </HolographicGlassCard>

                  <HolographicGlassCard className="p-6" glassEffect="light">
                    <h4 className="font-semibold text-amber-300 mb-2">SERVITIA INVESTIMENTI • Investment Services:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-indigo-300">
                      <li>All investments carry risk of loss, including total loss</li>
                      <li>Past performance does not guarantee future results</li>
                      <li>You are responsible for understanding investment risks</li>
                      <li>Diversification does not guarantee against loss</li>
                    </ul>
                  </HolographicGlassCard>

                  <HolographicGlassCard className="p-6" glassEffect="light">
                    <h4 className="font-semibold text-amber-300 mb-2">SERVITIA CREDITUM • Credit Services:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-indigo-300">
                      <li>Credit decisions are based on empirical assessment algorithms</li>
                      <li>Credit terms may change based on updated assessments</li>
                      <li>You have the right to dispute credit decisions</li>
                      <li>Credit information may be shared with authorized parties</li>
                    </ul>
                  </HolographicGlassCard>
                </div>
              </section>

              {/* Technology Usage */}
              <section>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">
                  V. USUS TECHNOLOGIAE ET LIMITATIONES
                </h3>
                <p className="text-lg text-amber-200/70 mb-4">Technology Usage and Limitations</p>
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

              {/* Contact Information */}
              <section>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">
                  VI. INFORMATIONES CONTACTUS
                </h3>
                <p className="text-lg text-amber-200/70 mb-4">Contact Information</p>
                <p className="mb-4">For questions about this User Agreement or your Economic Global Citizenship:</p>
                <HolographicGlassCard className="p-6" glassEffect="medium">
                  <div className="text-center">
                    <p className="font-semibold text-amber-300 mb-2">DEPARTMENTUM RELATIONUM CLIENTIUM</p>
                    <p className="text-amber-200/70 mb-4">Customer Relations Department</p>
                    <div className="space-y-2 text-indigo-300">
                      <p>Inclusive Lending and Credit Empirical Authority</p>
                      <p>Email: support@ilcea.com</p>
                      <p>Phone: +1 (555) ILCEA-HELP</p>
                      <p>24/7 Support: +1 (555) GLOBAL-CITIZEN</p>
                    </div>
                  </div>
                </HolographicGlassCard>
              </section>

              {/* Agreement Acceptance */}
              <HolographicGlassCard className="p-8 mt-8" glassEffect="heavy" holographicIntensity="intense">
                <div className="text-center">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">
                    ACCEPTATIO FOEDERIS
                  </h3>
                  <p className="text-lg text-amber-200/70 mb-4">Agreement Acceptance</p>
                  <p className="text-indigo-200 mb-4">
                    By using ILCEA services, you acknowledge that you have read, understood, and agree to be bound by
                    this User Agreement. You also confirm that you meet all eligibility requirements for Economic Global
                    Citizenship and will comply with all applicable laws and regulations.
                  </p>
                  <p className="text-amber-300 font-semibold text-lg">SALVE DOMUM AD FUTURUM FINANCIAE</p>
                  <p className="text-amber-200/70 mt-2">
                    Welcome home to the future of finance. Your journey as an Economic Global Citizen begins now.
                  </p>
                </div>
              </HolographicGlassCard>
            </div>
          </div>
        </HolographicGlassCard>
      </div>
    </div>
  )
}
