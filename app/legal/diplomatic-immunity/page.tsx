{
  /* Agent Certification Section - Referenced by Goal Prioritizing Orb */
}
;<section id="agent-certification" className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Diplomatic Agent Certification
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Become a certified SNAPPCREDITCOM diplomatic agent and unlock exclusive platform benefits
        </p>
      </div>

      {/* Agent Application Section - Referenced by Goal Prioritizing Orb */}
      <div
        id="agent-application-section"
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
      >
        {/* Certification Requirements - Referenced by Goal Prioritizing Orb */}
        <div id="certification-requirements" className="mb-8">
          <h3 className="text-xl font-semibold mb-6">Certification Requirements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-green-800">Platform Membership</h4>
                  <p className="text-sm text-green-600">Active SNAPPCREDITCOM account required</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-blue-800">Identity Verification</h4>
                  <p className="text-sm text-blue-600">Complete KYC process and background check</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-purple-800">Training Completion</h4>
                  <p className="text-sm text-purple-600">Pass diplomatic protocols exam (80% minimum)</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-orange-800">Professional Standing</h4>
                  <p className="text-sm text-orange-600">Clean legal record in all jurisdictions</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-teal-800">Oath of Service</h4>
                  <p className="text-sm text-teal-600">Commitment to uphold diplomatic principles</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-pink-800">Ongoing Compliance</h4>
                  <p className="text-sm text-pink-600">Annual recertification and ethics review</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form - Referenced by Goal Prioritizing Orb */}
        <div id="application-form" className="space-y-6">
          <h3 className="text-xl font-semibold mb-6">Agent Application Form</h3>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Legal Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full legal name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Financial Advisor, Attorney"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Jurisdiction of Practice</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Primary Jurisdiction</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia</option>
                  <option value="eu">European Union</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Experience Level</option>
                  <option value="0-2">0-2 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="6-10">6-10 Years</option>
                  <option value="11-15">11-15 Years</option>
                  <option value="15+">15+ Years</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Professional Licenses & Certifications</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="List your relevant professional licenses, certifications, and regulatory registrations"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Motivation for Diplomatic Agent Status</label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Explain why you seek diplomatic agent certification and how you plan to contribute to the SNAPPCREDITCOM community"
              ></textarea>
            </div>

            <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900">Oath of Service</h4>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label>
                    I solemnly affirm to uphold the principles of diplomatic immunity and digital sovereignty as
                    established by SNAPPCREDITCOM.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label>
                    I commit to representing SNAPPCREDITCOM with integrity and professionalism in all jurisdictions.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label>
                    I agree to maintain confidentiality and protect the interests of SNAPPCREDITCOM and its users.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label>
                    I acknowledge the responsibilities and privileges that come with diplomatic agent status.
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button - Referenced by Goal Prioritizing Orb */}
            <div className="flex gap-4">
              <button
                id="submit-button"
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300"
              >
                Submit Application for Review
              </button>
              <button
                type="button"
                className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Save Draft
              </button>
            </div>
          </form>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">Application Process Timeline</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>
                  <strong>Submission:</strong> Application reviewed within 48 hours
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>
                  <strong>Background Check:</strong> 5-7 business days
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>
                  <strong>Training & Exam:</strong> Self-paced, typically 2-3 days
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>
                  <strong>Certification:</strong> Issued within 24 hours of exam completion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits of Certification */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Legal Protection</h3>
          <p className="text-sm text-gray-600">
            Enhanced legal protections and immunity provisions across jurisdictions
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
            <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Exclusive Access</h3>
          <p className="text-sm text-gray-600">
            Priority access to platform features, beta programs, and special opportunities
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30">
          <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Network Access</h3>
          <p className="text-sm text-gray-600">
            Connect with other certified agents and participate in exclusive forums
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
