"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Target,
  PiggyBank,
  AlertCircle,
  CheckCircle,
  Calendar,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back, Alex
          </h1>
          <p className="text-gray-600">Here's your financial overview and goals progress</p>
        </div>

        {/* Financial Overview Section - Referenced by Goal Prioritizing Orb */}
        <section id="financial-overview" className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Financial Overview</h2>
            <p className="text-gray-600">Monitor your financial health and optimization opportunities</p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            {/* Credit Score Section - Referenced by Goal Prioritizing Orb */}
            <div id="credit-score-section">
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-600">Credit Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Current Score - Referenced by Goal Prioritizing Orb */}
                    <div id="current-score" className="text-3xl font-bold text-green-700">
                      750
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+15 this month</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-green-600">Excellent range</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">Net Worth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-blue-700">$485K</div>
                  <div className="flex items-center text-sm text-blue-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+8.2% YTD</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="text-xs text-blue-600">Above avg for age</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-600">Monthly Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-purple-700">$8.5K</div>
                  <div className="flex items-center text-sm text-purple-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+12% vs last year</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-purple-600">Strong growth</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-600">Debt-to-Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-orange-700">18%</div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>-3% this quarter</span>
                  </div>
                  <Progress value={18} className="h-2" />
                  <p className="text-xs text-green-600">Excellent ratio</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Credit Optimization Card - Referenced by Goal Prioritizing Orb */}
          <div id="credit-optimization-card" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Credit Score Optimization</h3>
                <p className="text-sm text-gray-600">Boost your score by 20+ points with strategic actions</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                High Impact
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Optimization Tips - Referenced by Goal Prioritizing Orb */}
              <div id="optimization-tips" className="space-y-4">
                <h4 className="font-medium text-gray-900">Recommendations</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Pay down credit cards</p>
                      <p className="text-xs text-green-600">Reduce utilization from 35% to 15%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Keep old accounts open</p>
                      <p className="text-xs text-blue-600">Maintain credit history length</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Calculator - Referenced by Goal Prioritizing Orb */}
              <div id="payment-calculator" className="space-y-4">
                <h4 className="font-medium text-gray-900">Strategic Payment</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Recommended payment</div>
                    <div className="text-2xl font-bold text-gray-900">$500</div>
                    <div className="text-sm text-green-600">Expected score increase: +18 points</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current utilization:</span>
                      <span className="font-medium text-red-600">35%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>After payment:</span>
                      <span className="font-medium text-green-600">15%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Take Action</h4>
                {/* Pay Now Button - Referenced by Goal Prioritizing Orb */}
                <button
                  id="pay-now-button"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Make $500 Payment
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300">
                  Schedule Payment
                </button>
                <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                  <strong>Impact:</strong> This payment could increase your credit score by 15-20 points within 30 days.
                </div>
              </div>
            </div>

            {/* Credit Utilization Chart - Referenced by Goal Prioritizing Orb */}
            <div id="credit-utilization-chart" className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Credit Utilization by Card</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium">Chase Sapphire</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>$3,500 / $10,000</span>
                      <span className="text-red-600 font-medium">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium">Discover Card</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>$750 / $5,000</span>
                      <span className="text-yellow-600 font-medium">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Recommendation - Referenced by Goal Prioritizing Orb */}
            <div id="payment-recommendation" className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Smart Payment Strategy</p>
                  <p className="text-xs text-blue-600">
                    Pay $500 toward Chase Sapphire to reduce utilization to 30%, then focus on paying it down to 15% for
                    maximum score impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goal Tracker Section - Referenced by Goal Prioritizing Orb */}
        <section id="goal-tracker" className="mb-12">
          <div id="savings-goals-section" className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Goal Tracker</h2>
            <p className="text-gray-600">Monitor progress toward your financial objectives</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Emergency Fund Card - Referenced by Goal Prioritizing Orb */}
            <div id="emergency-fund-card" className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <PiggyBank className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Emergency Fund</h3>
                    <p className="text-sm text-gray-600">Build to $10,000</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  73%
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Current: $7,300</span>
                    <span>Goal: $10,000</span>
                  </div>
                  <Progress value={73} className="h-3" />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Monthly Progress</div>
                  <div className="text-lg font-bold text-gray-900">+$450</div>
                  <div className="text-xs text-green-600">On track to reach goal in 6 months</div>
                </div>

                {/* Auto Transfer Setup - Referenced by Goal Prioritizing Orb */}
                <div id="auto-transfer-setup" className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800">Optimize Your Savings</h4>
                  <p className="text-xs text-blue-600">Set up automatic transfers to reach your goal faster</p>

                  {/* Amount Input - Referenced by Goal Prioritizing Orb */}
                  <div id="amount-input" className="space-y-2">
                    <label className="block text-xs font-medium text-blue-700">Monthly Transfer Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="450"
                        defaultValue="450"
                      />
                    </div>
                  </div>

                  {/* Frequency Selector - Referenced by Goal Prioritizing Orb */}
                  <div id="frequency-selector" className="space-y-2">
                    <label className="block text-xs font-medium text-blue-700">Frequency</label>
                    <select className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
                      <option value="monthly">Monthly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>

                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors">
                    Set Up Auto-Transfer
                  </button>
                </div>
              </div>
            </div>

            {/* 50-Year Loan Goal */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">50-Year Loan</CardTitle>
                    <p className="text-sm text-gray-600">Pre-approval progress</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Application Status</span>
                      <span className="font-medium">45% Complete</span>
                    </div>
                    <Progress value={45} className="h-3" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Income verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Credit check completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full"></div>
                      <span>Document upload</span>
                    </div>
                  </div>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Continue Application</Button>
                </div>
              </CardContent>
            </Card>

            {/* Investment Portfolio Goal */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Portfolio Rebalance</CardTitle>
                    <p className="text-sm text-gray-600">Optimize allocation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Optimization Score</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <Progress value={60} className="h-3" />
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-orange-800">Action Needed</span>
                    </div>
                    <p className="text-xs text-orange-700">Tech allocation too high (45%). Consider rebalancing.</p>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">View Recommendations</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Quick Actions</h2>
            <p className="text-gray-600">Common tasks and shortcuts</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="p-6 h-auto flex-col gap-3">
              <CreditCard className="h-6 w-6" />
              <span>Make Payment</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col gap-3">
              <Target className="h-6 w-6" />
              <span>Set New Goal</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col gap-3">
              <TrendingUp className="h-6 w-6" />
              <span>View Investments</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex-col gap-3">
              <Calendar className="h-6 w-6" />
              <span>Schedule Call</span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
