{
  /* Portfolio Management Section - Referenced by Goal Prioritizing Orb */
}
;<section id="portfolio-management" className="py-8">
  <div className="container mx-auto px-4">
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Portfolio Management</h2>
      <p className="text-gray-600">Optimize your investment allocation for better returns</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      {/* Portfolio Allocation Chart - Referenced by Goal Prioritizing Orb */}
      <div id="portfolio-allocation-chart" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Current Allocation</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Technology Stocks</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
              <span className="text-sm font-bold text-red-500">45%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Healthcare</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
              <span className="text-sm font-bold">25%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">International</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "15%" }}></div>
              </div>
              <span className="text-sm font-bold text-orange-500">15%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Bonds</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }}></div>
              </div>
              <span className="text-sm font-bold">15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rebalancing Tool - Referenced by Goal Prioritizing Orb */}
      <div id="rebalancing-tool" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Recommended Rebalancing</h3>
        <div className="space-y-4">
          {/* Tech Allocation Slider - Referenced by Goal Prioritizing Orb */}
          <div id="tech-allocation-slider" className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Technology Stocks</label>
              <span className="text-sm text-red-500">Reduce to 40%</span>
            </div>
            <input
              type="range"
              min="35"
              max="50"
              defaultValue="40"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* International Funds - Referenced by Goal Prioritizing Orb */}
          <div id="international-funds" className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">International Funds</label>
              <span className="text-sm text-green-500">Increase to 20%</span>
            </div>
            <input
              type="range"
              min="15"
              max="25"
              defaultValue="20"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Healthcare</label>
              <span className="text-sm">Maintain 25%</span>
            </div>
            <input
              type="range"
              min="20"
              max="30"
              defaultValue="25"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Bonds</label>
              <span className="text-sm">Maintain 15%</span>
            </div>
            <input
              type="range"
              min="10"
              max="20"
              defaultValue="15"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Rebalance Button - Referenced by Goal Prioritizing Orb */}
          <button
            id="rebalance-button"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 mt-6"
          >
            Execute Rebalancing
          </button>

          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <strong>Expected Impact:</strong> Reduce risk by 12% while maintaining similar returns through better
            diversification.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
