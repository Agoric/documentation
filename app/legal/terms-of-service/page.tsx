import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/70 p-6">
      <div className="container mx-auto max-w-4xl">
        <HolographicGlassCard className="p-8" glassEffect="medium">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-indigo-100 mb-2">Terms of Service</h1>
              <h2 className="text-xl text-indigo-300 mb-4">Inclusive Lending and Credit Empirical Authority</h2>
              <p className="text-indigo-400">New World Wealth Navigation Assistant</p>
              <p className="text-sm text-indigo-500 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-6 text-indigo-200">
              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">1. Platform Mission and Services</h3>
                <p className="mb-4">
                  Welcome to the Inclusive Lending and Credit Empirical Authority ("ILCEA", "we", "us", or "our"). Our
                  platform serves as your New World Wealth Navigation Assistant, introducing the benefits of Economic
                  Global Citizenship. We welcome you home to a revolutionary financial ecosystem designed to democratize
                  access to advanced financial instruments and credit opportunities.
                </p>
                <p className="mb-4">
                  ILCEA provides empirical credit assessment, inclusive lending solutions, tokenized asset management,
                  quantum-secured financial transactions, and AI-powered wealth navigation services to qualified users
                  worldwide.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">2. Economic Global Citizenship</h3>
                <p className="mb-4">
                  By using our platform, you become part of our Economic Global Citizenship community, which provides:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access to global financial markets and opportunities</li>
                  <li>Empirical credit scoring based on comprehensive data analysis</li>
                  <li>Inclusive lending products regardless of traditional credit barriers</li>
                  <li>Tokenized asset investment opportunities</li>
                  <li>AI-powered financial guidance and wealth navigation</li>
                  <li>Quantum-secured transaction processing</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">
                  3. User Eligibility and Account Requirements
                </h3>
                <p className="mb-4">To access ILCEA services, you must:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Be at least 18 years of age (or legal age in your jurisdiction)</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Complete our empirical credit assessment process</li>
                  <li>Agree to ongoing monitoring for compliance and risk management</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">
                  4. Financial Services and Risk Disclosure
                </h3>
                <p className="mb-4">ILCEA provides advanced financial services including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Empirical credit assessment and scoring</li>
                  <li>Inclusive lending products and credit facilities</li>
                  <li>Tokenized real estate and asset investments</li>
                  <li>Quantum computing-powered portfolio optimization</li>
                  <li>AI-driven financial planning and wealth management</li>
                </ul>
                <p className="mt-4 font-semibold text-yellow-400">
                  IMPORTANT: All financial investments carry risk. Past performance does not guarantee future results.
                  You may lose some or all of your invested capital.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">5. Empirical Credit Authority</h3>
                <p className="mb-4">
                  Our Empirical Credit Authority utilizes advanced algorithms, machine learning, and comprehensive data
                  analysis to assess creditworthiness beyond traditional scoring methods. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Alternative data sources for credit assessment</li>
                  <li>Real-time financial behavior analysis</li>
                  <li>Global economic citizenship scoring</li>
                  <li>Quantum-secured credit verification</li>
                  <li>Continuous credit profile optimization</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">6. Platform Usage and Conduct</h3>
                <p className="mb-4">Users agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the platform only for lawful purposes</li>
                  <li>Provide accurate and truthful information</li>
                  <li>Maintain the security of their account credentials</li>
                  <li>Comply with all applicable financial regulations</li>
                  <li>Report any suspicious or unauthorized activity</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">7. Intellectual Property</h3>
                <p className="mb-4">
                  All content, technology, algorithms, and intellectual property on the ILCEA platform are proprietary
                  and protected by applicable laws. Users are granted a limited, non-exclusive license to use the
                  platform for its intended purposes.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">8. Limitation of Liability</h3>
                <p className="mb-4">
                  ILCEA's liability is limited to the maximum extent permitted by law. We are not liable for indirect,
                  incidental, or consequential damages arising from platform use or financial decisions made based on
                  our services.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">9. Governing Law and Dispute Resolution</h3>
                <p className="mb-4">
                  These terms are governed by applicable financial services regulations and international law. Disputes
                  will be resolved through binding arbitration in accordance with established financial industry
                  practices.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">10. Contact Information</h3>
                <p className="mb-4">For questions about these Terms of Service, please contact:</p>
                <div className="bg-indigo-950/50 p-4 rounded-lg border border-indigo-500/20">
                  <p>
                    <strong>Inclusive Lending and Credit Empirical Authority</strong>
                  </p>
                  <p>Legal Department</p>
                  <p>Email: legal@ilcea.com</p>
                  <p>Phone: +1 (555) ILCEA-LAW</p>
                </div>
              </section>
            </div>
          </div>
        </HolographicGlassCard>
      </div>
    </div>
  )
}
