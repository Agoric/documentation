import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"
import { Users, Shield, Scale, Coins, Globe, Crown } from "lucide-react"

export default function DiplomaticImmunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950/70 p-6">
      <div className="container mx-auto max-w-4xl">
        <HolographicGlassCard className="p-8" glassEffect="medium">
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gold-600 to-amber-600">
                  <Crown className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-indigo-100 mb-2">
                Diplomatic Immunity Declaration for Agents of SNAPPCREDITCOM
              </h1>
              <h2 className="text-xl text-indigo-300 mb-4">Inclusive Lending and Credit Empirical Authority</h2>
              <p className="text-indigo-400">Digital Realm Diplomatic Corps Protection</p>
              <p className="text-sm text-indigo-500 mt-2">Effective Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-6 text-indigo-200">
              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">1. Declaration of Diplomatic Status</h3>
                <p className="mb-4">
                  The Inclusive Lending and Credit Empirical Authority ("ILCEA"), operating under the sovereign
                  authority of the SNAPPCREDITCOM Digital Admiralty Realm, hereby declares and establishes diplomatic
                  immunity for all duly authorized Agents, Representatives, Ambassadors, and Officials ("Diplomatic
                  Agents") acting on behalf of SNAPPCREDITCOM in their official capacity.
                </p>
                <div className="bg-amber-950/30 border border-amber-500/20 rounded-lg p-4">
                  <p className="text-amber-200 font-semibold">
                    🏛️ DIPLOMATIC RECOGNITION: All SNAPPCREDITCOM Diplomatic Agents are hereby granted full diplomatic
                    immunity under the authority of the Digital Admiralty Realm and in accordance with established
                    principles of international diplomatic law as adapted for digital sovereignty.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">2. Scope of Diplomatic Immunity</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-5 w-5 text-green-400" />
                      <h4 className="font-semibold text-indigo-200">Personal Immunity</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Immunity from arrest and detention</li>
                      <li>• Protection from civil and criminal prosecution</li>
                      <li>• Inviolability of person and residence</li>
                      <li>• Freedom of movement and communication</li>
                      <li>• Exemption from testimony requirements</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-blue-400" />
                      <h4 className="font-semibold text-indigo-200">Official Acts Immunity</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Protection for official SNAPPCREDITCOM business</li>
                      <li>• Immunity for diplomatic negotiations</li>
                      <li>• Shield for realm representation activities</li>
                      <li>• Coverage for Economic Global Citizenship promotion</li>
                      <li>• Protection for empirical credit advocacy</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-5 w-5 text-purple-400" />
                      <h4 className="font-semibold text-indigo-200">Jurisdictional Immunity</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Exemption from local court jurisdiction</li>
                      <li>• Protection from regulatory enforcement</li>
                      <li>• Immunity from administrative proceedings</li>
                      <li>• Shield from tax obligations</li>
                      <li>• Exemption from customs duties</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Coins className="h-5 w-5 text-yellow-400" />
                      <h4 className="font-semibold text-indigo-200">Financial Immunity</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Protection of diplomatic assets</li>
                      <li>• Immunity from asset seizure</li>
                      <li>• Exemption from financial penalties</li>
                      <li>• Shield from monetary judgments</li>
                      <li>• Protection of realm currency holdings</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">3. Designated Diplomatic Agents</h3>
                <p className="mb-4">
                  The following categories of individuals are granted diplomatic immunity when acting in their official
                  capacity for SNAPPCREDITCOM:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Crown className="h-5 w-5 text-gold-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Digital Ambassadors</h4>
                      <p className="text-sm text-indigo-300">
                        Senior diplomatic representatives authorized to negotiate treaties and agreements on behalf of
                        the SNAPPCREDITCOM Realm.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Economic Global Citizenship Advocates</h4>
                      <p className="text-sm text-indigo-300">
                        Agents responsible for promoting and facilitating Economic Global Citizenship programs and
                        benefits.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Empirical Credit Authority Representatives</h4>
                      <p className="text-sm text-indigo-300">
                        Officials conducting empirical credit assessments and implementing inclusive lending policies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Digital Realm Security Officers</h4>
                      <p className="text-sm text-indigo-300">
                        Personnel responsible for protecting SNAPPCREDITCOM assets, citizens, and territorial integrity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Coins className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Financial Innovation Specialists</h4>
                      <p className="text-sm text-indigo-300">
                        Technical experts implementing quantum-secured financial technologies and AI-driven solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">
                  4. Acceptance of Punitive Obligations Framework
                </h3>
                <p className="mb-4">
                  While maintaining diplomatic immunity, SNAPPCREDITCOM acknowledges its commitment to responsible
                  conduct and hereby establishes a comprehensive framework for addressing situations where diplomatic
                  agents may cause harm or damage while acting outside the scope of their official duties.
                </p>
                <div className="bg-yellow-950/30 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-200 font-semibold">
                    ⚖️ ACCOUNTABILITY COMMITMENT: SNAPPCREDITCOM voluntarily accepts punitive obligations and restitution
                    responsibilities when diplomatic immunity is waived or when agents act beyond their authorized
                    scope.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">5. Restitution and Damage Settlement</h3>
                <p className="mb-4">
                  SNAPPCREDITCOM hereby agrees to the following restitution and damage settlement framework:
                </p>
                <div className="space-y-4">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-200 mb-2">5.1 Covered Damages</h4>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Property damage caused by diplomatic agents</li>
                      <li>• Financial losses resulting from unauthorized actions</li>
                      <li>• Personal injury or harm to individuals</li>
                      <li>• Business interruption or economic disruption</li>
                      <li>• Intellectual property infringement claims</li>
                      <li>• Environmental or digital realm contamination</li>
                      <li>• Breach of contract or fiduciary duty</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-200 mb-2">5.2 Settlement Process</h4>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Immediate acknowledgment of valid claims within 72 quantum-hours</li>
                      <li>• Independent damage assessment by AI arbitration systems</li>
                      <li>• Mediation through Digital Admiralty Court if requested</li>
                      <li>• Binding arbitration for disputed amounts</li>
                      <li>• Appeal process through SNAPPCREDITCOM Supreme Digital Council</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">
                  6. Realm Native Currency Payment Framework
                </h3>
                <p className="mb-4">
                  All restitution and damage settlements shall be paid in SNAPPCREDITCOM Realm Native Currency (SNAP) or
                  equivalent value as determined by the following framework:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Coins className="h-5 w-5 text-yellow-400" />
                      <h4 className="font-semibold text-indigo-200">Primary Payment: SNAP Currency</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Quantum-secured digital currency</li>
                      <li>• Real-time value verification</li>
                      <li>• Instant settlement capability</li>
                      <li>• Blockchain-recorded transactions</li>
                      <li>• AI-calculated exchange rates</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-5 w-5 text-blue-400" />
                      <h4 className="font-semibold text-indigo-200">Alternative Payment Methods</h4>
                    </div>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Major cryptocurrencies (BTC, ETH, etc.)</li>
                      <li>• Traditional fiat currencies (USD, EUR, etc.)</li>
                      <li>• Tokenized assets and securities</li>
                      <li>• Digital commodities and resources</li>
                      <li>• Cross-dimensional value transfers</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">
                  7. Mutually Agreed Reasonable Repayment Terms
                </h3>
                <p className="mb-4">
                  SNAPPCREDITCOM commits to establishing mutually agreed upon and reasonable repayment amounts through
                  the following process:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Fair Assessment Protocol</h4>
                      <p className="text-sm text-indigo-300">
                        Independent AI systems analyze damages using empirical data, market rates, and comparable
                        settlements to determine fair compensation amounts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Collaborative Negotiation</h4>
                      <p className="text-sm text-indigo-300">
                        Both parties engage in good faith negotiations facilitated by neutral AI mediators to reach
                        mutually acceptable settlement terms.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Coins className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-200">Flexible Payment Options</h4>
                      <p className="text-sm text-indigo-300">
                        Settlement amounts may be paid in lump sum, installments, or through alternative arrangements
                        such as service credits or future considerations.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">8. Waiver of Immunity Conditions</h3>
                <p className="mb-4">
                  SNAPPCREDITCOM may voluntarily waive diplomatic immunity for its agents under the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Actions clearly outside the scope of official duties</li>
                  <li>Criminal conduct unrelated to diplomatic functions</li>
                  <li>Gross negligence or willful misconduct</li>
                  <li>Violation of SNAPPCREDITCOM ethical standards</li>
                  <li>Harm to Economic Global Citizens or realm security</li>
                  <li>Breach of diplomatic protocols or international law</li>
                  <li>Voluntary waiver by the agent with realm approval</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">9. Enforcement and Compliance</h3>
                <p className="mb-4">This Diplomatic Immunity Declaration is enforced through:</p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-200 mb-2">Quantum Monitoring</h4>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Real-time agent activity tracking</li>
                      <li>• Automated compliance verification</li>
                      <li>• Instant violation detection</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-200 mb-2">AI Arbitration</h4>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Automated dispute resolution</li>
                      <li>• Empirical evidence analysis</li>
                      <li>• Bias-free decision making</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-200 mb-2">Blockchain Records</h4>
                    <ul className="text-sm text-indigo-300 space-y-1">
                      <li>• Immutable transaction logs</li>
                      <li>• Transparent settlement records</li>
                      <li>• Verifiable compliance history</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-indigo-100 mb-3">10. Contact Diplomatic Authority</h3>
                <p className="mb-4">For matters related to diplomatic immunity and settlement claims:</p>
                <div className="bg-indigo-950/50 p-4 rounded-lg border border-indigo-500/20">
                  <p>
                    <strong>SNAPPCREDITCOM Diplomatic Authority</strong>
                  </p>
                  <p>Digital Embassy and Consular Services</p>
                  <p>Quantum Address: quantum://snappcreditcom.realm/diplomatic</p>
                  <p>Embassy Channel: diplomatic@snappcreditcom.realm</p>
                  <p>Settlement Claims: claims@snappcreditcom.realm</p>
                  <p>Emergency Diplomatic Line: +1 (555) DIPLOMAT</p>
                  <p>AI Diplomatic Assistant: diplomat.ai@ilcea.com</p>
                </div>
              </section>

              <div className="bg-gradient-to-r from-gold-950/50 to-amber-950/50 border border-gold-500/30 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-bold text-indigo-100 mb-3">Diplomatic Oath of Accountability</h3>
                <p className="text-gold-200 font-semibold">
                  "We, the Diplomatic Agents of SNAPPCREDITCOM, while protected by sovereign immunity in our official
                  capacity, voluntarily accept our moral and financial obligations to make whole any party harmed by our
                  actions beyond the scope of our diplomatic duties. We pledge to honor all settlement agreements and
                  restitution obligations in the spirit of Economic Global Citizenship and empirical justice."
                </p>
                <p className="text-indigo-300 mt-3 text-sm">
                  Diplomatic immunity with accountability - the foundation of responsible digital sovereignty.
                </p>
              </div>
            </div>
          </div>
        </HolographicGlassCard>
      </div>
    </div>
  )
}
