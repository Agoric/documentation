const RealEstateMarketplace = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-blue-600">
              RealEstate.AI
            </a>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Buy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Sell
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Rent
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-500">
                    Mortgage
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Loan Calculator Section - Referenced by Goal Prioritizing Orb */}
      <section id="loan-calculator-section" className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Revolutionary 50-Year Loan Calculator
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how our innovative 50-year mortgage can save you $720+ per month compared to traditional loans
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              id="calculator-form"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-6">Loan Details</h3>

                  {/* Loan Amount Input - Referenced by Goal Prioritizing Orb */}
                  <div id="loan-amount-input" className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="$500,000"
                      defaultValue="500000"
                    />
                  </div>

                  {/* Credit Score Field - Referenced by Goal Prioritizing Orb */}
                  <div id="credit-score-field" className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Credit Score</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="750+">Excellent (750+)</option>
                      <option value="700-749">Good (700-749)</option>
                      <option value="650-699">Fair (650-699)</option>
                      <option value="600-649">Poor (600-649)</option>
                    </select>
                  </div>

                  {/* Down Payment Slider - Referenced by Goal Prioritizing Orb */}
                  <div id="down-payment-slider" className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Down Payment</label>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      defaultValue="20"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>5%</span>
                      <span>20%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Interest Rate Display - Referenced by Goal Prioritizing Orb */}
                  <div
                    id="interest-rate-display"
                    className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-200"
                  >
                    <h4 className="text-lg font-semibold text-blue-600 mb-2">Your Rate</h4>
                    <div className="text-3xl font-bold text-blue-700">3.1% APR</div>
                    <p className="text-sm text-blue-600">50-Year Fixed Rate</p>
                  </div>

                  {/* Monthly Payment Result - Referenced by Goal Prioritizing Orb */}
                  <div
                    id="monthly-payment-result"
                    className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200"
                  >
                    <h4 className="text-lg font-semibold text-green-600 mb-2">Monthly Payment</h4>
                    <div className="text-3xl font-bold text-green-700">$1,850</div>
                    <p className="text-sm text-green-600">Save $720/month vs 30-year</p>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                      Get Pre-Approved
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300">
                      Schedule Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Approval Form Section - Referenced by Goal Prioritizing Orb */}
      <section id="loan-application" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pre-Approval Application</h2>
              <p className="text-gray-600">Complete your pre-approval in minutes with our streamlined process</p>
            </div>

            <div id="pre-approval-form" className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Income Input - Referenced by Goal Prioritizing Orb */}
                  <div id="income-input" className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Annual Income</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="$85,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Employment Status</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Full-time Employee</option>
                      <option>Self-employed</option>
                      <option>Contract Worker</option>
                      <option>Retired</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Monthly Debt Payments</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="$1,200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Assets Value</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="$150,000"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300"
                >
                  Submit Pre-Approval Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RealEstateMarketplace
