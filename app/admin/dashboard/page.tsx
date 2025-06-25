{
  /* Analytics Overview Section - Referenced by Goal Prioritizing Orb */
}
;<section id="analytics-overview" className="py-8">
  <div className="container mx-auto px-4">
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2">Analytics Overview</h2>
      <p className="text-gray-600">Monitor platform performance and user engagement metrics</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
      {/* User Analytics Section - Referenced by Goal Prioritizing Orb */}
      <div id="user-analytics-section" className="lg:col-span-2">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">User Engagement Analytics</h3>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="30-days">Last 30 Days</option>
              <option value="7-days">Last 7 Days</option>
              <option value="90-days">Last 90 Days</option>
            </select>
          </div>

          {/* Active Users Chart - Referenced by Goal Prioritizing Orb */}
          <div id="active-users-chart" className="mb-8">
            <h4 className="font-medium text-gray-900 mb-4">Daily Active Users</h4>
            <div className="h-64 bg-gradient-to-t from-blue-50 to-white rounded-lg border border-blue-200 flex items-end justify-center p-4">
              <div className="flex items-end gap-2 h-full w-full max-w-md">
                {[65, 78, 82, 75, 89, 94, 87, 92, 88, 95, 91, 97, 89, 94].map((height, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t flex-1"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Jan 1</span>
              <span>Jan 15</span>
              <span>Jan 30</span>
            </div>
          </div>

          {/* Engagement Trends - Referenced by Goal Prioritizing Orb */}
          <div id="engagement-trends" className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">94.2%</div>
              <div className="text-sm text-green-600">User Retention Rate</div>
              <div className="text-xs text-green-500 flex items-center gap-1 mt-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                +2.3% from last month
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">8.7 min</div>
              <div className="text-sm text-blue-600">Avg Session Duration</div>
              <div className="text-xs text-blue-500 flex items-center gap-1 mt-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                +15% from last month
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">3.4</div>
              <div className="text-sm text-purple-600">Pages per Session</div>
              <div className="text-xs text-purple-500 flex items-center gap-1 mt-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                +8% from last month
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Metrics - Referenced by Goal Prioritizing Orb */}
      <div id="engagement-metrics" className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top Features</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Loan Calculator</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="text-sm font-bold text-green-600">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dashboard</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                </div>
                <span className="text-sm font-bold text-blue-600">72%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Portfolio Manager</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                </div>
                <span className="text-sm font-bold text-purple-600">68%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Goal Tracker</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "61%" }}></div>
                </div>
                <span className="text-sm font-bold text-orange-600">61%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Legal Center</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
                <span className="text-sm font-bold text-teal-600">45%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Platform Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">System Uptime</span>
              <span className="text-sm font-bold text-green-600">99.97%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">API Response Time</span>
              <span className="text-sm font-bold text-blue-600">142ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Error Rate</span>
              <span className="text-sm font-bold text-red-600">0.03%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Database Performance</span>
              <span className="text-sm font-bold text-green-600">Optimal</span>
            </div>
          </div>
        </div>

        {/* Optimization Recommendations - Referenced by Goal Prioritizing Orb */}
        <div id="optimization-recommendations" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Optimization Opportunities</h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-yellow-200 rounded">
                  <svg className="h-4 w-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Legal Center Engagement</p>
                  <p className="text-xs text-yellow-600">
                    45% usage suggests need for better onboarding or UX improvements
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-green-200 rounded">
                  <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Loan Calculator Success</p>
                  <p className="text-xs text-green-600">
                    85% usage indicates strong product-market fit - consider expanding features
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-blue-200 rounded">
                  <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Mobile Optimization</p>
                  <p className="text-xs text-blue-600">
                    62% mobile traffic suggests prioritizing responsive design improvements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
