import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"
import { Shield, CheckCircle2, Globe, Lock, FileText, Users } from "lucide-react"

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/70 p-6">
      <div className="container mx-auto max-w-4xl">
        <HolographicGlassCard className="p-8" glassEffect="medium">
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-blue-600">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-indigo-100 mb-2">Regulatory Compliance</h1>
              <h2 className="text-xl text-indigo-300 mb-4">Inclusive Lending and Credit Empirical Authority</h2>
              <p className="text-indigo-400">Committed to Global Financial Standards</p>
              <p className="text-sm text-indigo-500 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-6 text-indigo-200">
              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">1. Our Compliance Commitment</h3>
                <p className="mb-4">
                  The Inclusive Lending and Credit Empirical Authority ("ILCEA") is committed to maintaining the highest
                  standards of regulatory compliance across all jurisdictions where we operate. Our Economic Global
                  Citizenship platform adheres to international financial regulations while pioneering innovative
                  compliance frameworks for emerging financial technologies.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">2. Regulatory Framework</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-5 w-5 text-blue-400" />
                      <h4 className="font-semibold text-indigo-200">International Standards</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Basel III Banking Regulations</li>
                      <li>• FATF Anti-Money Laundering Guidelines</li>
                      <li>• ISO 27001 Information Security</li>
                      <li>• GDPR Data Protection Compliance</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-green-400" />
                      <h4 className="font-semibold text-indigo-200">Regional Compliance</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• SEC Securities Regulations (US)</li>
                      <li>• FCA Financial Conduct (UK)</li>
                      <li>• MiFID II Investment Services (EU)</li>
                      <li>• ASIC Corporate Law (Australia)</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lock className="h-5 w-5 text-purple-400" />
                      <h4 className="font-semibold text-indigo-200">Technology Compliance</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Quantum Cryptography Standards</li>
                      <li>• AI Ethics and Governance</li>
                      <li>• Blockchain Security Protocols</li>
                      <li>• Biometric Data Protection</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-yellow-400" />
                      <h4 className="font-semibold text-indigo-200">Consumer Protection</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Fair Lending Practices</li>
                      <li>• Truth in Lending Act</li>
                      <li>• Equal Credit Opportunity Act</li>
                      <li>• Consumer Financial Protection</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">3. Empirical Credit Authority Compliance</h3>
                <p className="mb-4">
                  Our innovative Empirical Credit Authority operates under strict compliance guidelines:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Fair Credit Reporting</h4>
                      <p className="text-sm text-indigo-300">
                        All credit assessments comply with Fair Credit Reporting Act requirements and international
                        equivalent standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Algorithm Transparency</h4>
                      <p className="text-sm text-indigo-300">
                        Our AI-driven credit models undergo regular audits for bias, fairness, and accuracy in
                        accordance with emerging AI governance standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Alternative Data Ethics</h4>
                      <p className="text-sm text-indigo-300">
                        Use of alternative data sources follows strict ethical guidelines and consumer consent
                        protocols.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">4. Anti-Money Laundering (AML) Program</h3>
                <p className="mb-4">ILCEA maintains a comprehensive AML program including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Customer Due Diligence (CDD) procedures</li>
                  <li>Enhanced Due Diligence (EDD) for high-risk customers</li>
                  <li>Suspicious Activity Reporting (SAR)</li>
                  <li>Currency Transaction Reporting (CTR)</li>
                  <li>Sanctions screening and monitoring</li>
                  <li>Beneficial ownership identification</li>
                  <li>Ongoing transaction monitoring</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">5. Know Your Customer (KYC) Requirements</h3>
                <p className="mb-4">All Economic Global Citizens must complete our comprehensive KYC process:</p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-200 mb-2">Identity Verification</h4>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Government-issued ID</li>
                      <li>• Biometric verification</li>
                      <li>• Address confirmation</li>
                      <li>• Quantum-secured storage</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-200 mb-2">Financial Profile</h4>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Income verification</li>
                      <li>• Source of funds</li>
                      <li>• Investment experience</li>
                      <li>• Risk tolerance</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-200 mb-2">Ongoing Monitoring</h4>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Transaction patterns</li>
                      <li>• Behavioral analysis</li>
                      <li>• Risk reassessment</li>
                      <li>• Compliance updates</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">6. Data Protection and Privacy</h3>
                <p className="mb-4">Our quantum-secured platform ensures the highest levels of data protection:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>GDPR compliance for EU citizens</li>
                  <li>CCPA compliance for California residents</li>
                  <li>Quantum encryption for all sensitive data</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Data minimization and purpose limitation</li>
                  <li>Right to be forgotten implementation</li>
                  <li>Cross-border data transfer safeguards</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">7. Licensing and Registration</h3>
                <p className="mb-4">
                  ILCEA maintains appropriate licenses and registrations in all operating jurisdictions:
                </p>
                <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-indigo-200 mb-2">Current Licenses</h4>
                      <ul className="text-sm text-indigo-300 space-y-1">
                        <li>• Money Services Business (MSB)</li>
                        <li>• Investment Adviser Registration</li>
                        <li>• Broker-Dealer License</li>
                        <li>• Alternative Trading System (ATS)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-200 mb-2">Regulatory Bodies</h4>
                      <ul className="text-sm text-indigo-300 space-y-1">
                        <li>• Financial Crimes Enforcement Network</li>
                        <li>• Securities and Exchange Commission</li>
                        <li>• Commodity Futures Trading Commission</li>
                        <li>• State Banking Regulators</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">8. Compliance Monitoring and Reporting</h3>
                <p className="mb-4">We maintain robust compliance monitoring systems:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Real-time transaction monitoring</li>
                  <li>Automated compliance reporting</li>
                  <li>Regular internal audits</li>
                  <li>Third-party compliance assessments</li>
                  <li>Regulatory examination cooperation</li>
                  <li>Continuous staff training programs</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">9. Contact Our Compliance Team</h3>
                <p className="mb-4">For compliance-related questions or to report concerns:</p>
                <div className="bg-indigo-950/50 p-4 rounded-lg border border-indigo-500/20">
                  <p>
                    <strong>Chief Compliance Officer</strong>
                  </p>
                  <p>Inclusive Lending and Credit Empirical Authority</p>
                  <p>Email: compliance@ilcea.com</p>
                  <p>Phone: +1 (555) ILCEA-CCO</p>
                  <p>Compliance Hotline: +1 (555) COMPLY-NOW</p>
                  <p>Address: [Corporate Compliance Address]</p>
                </div>
              </section>
            </div>
          </div>
        </HolographicGlassCard>
      </div>
    </div>
  )
}
