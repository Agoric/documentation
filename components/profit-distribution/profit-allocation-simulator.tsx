"use client"

import { useState } from "react"
import { useProfitDistribution } from "@/contexts/profit-distribution-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calculator, TrendingUp, Heart, Building2, ArrowRight, Play } from "lucide-react"

export function ProfitAllocationSimulator() {
  const { calculateDistribution, distributeProfit } = useProfitDistribution()

  const [simulationAmount, setSimulationAmount] = useState<string>("100000")
  const [profitSource, setProfitSource] = useState<string>("marketplace_fees")
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationResult, setSimulationResult] = useState<any>(null)

  const profitSources = [
    { value: "membership_fees", label: "Membership Fees", description: "Global citizenship registration fees" },
    { value: "qgi_returns", label: "QGI Returns", description: "Investment returns from QGI funds" },
    { value: "bond_yields", label: "Bond Yields", description: "Interest from corporate bonds" },
    { value: "marketplace_fees", label: "Marketplace Fees", description: "Transaction fees from QUICA marketplace" },
    { value: "other", label: "Other Revenue", description: "Miscellaneous revenue streams" },
  ]

  const handleSimulation = () => {
    const amount = Number.parseFloat(simulationAmount)
    if (isNaN(amount) || amount <= 0) return

    const distribution = calculateDistribution(amount)

    // Calculate projected impact
    const bondMaturityValue = (amount / 3) * Math.pow(1.045, 50) // 50-year growth at 4.5%
    const socialProgramFunding = bondMaturityValue * 0.5
    const iBankTrustAddition = bondMaturityValue * 0.5

    setSimulationResult({
      totalProfit: amount,
      distribution,
      bondMaturityValue,
      socialProgramFunding,
      iBankTrustAddition,
      estimatedBeneficiaries: amount / 3 / 10, // $10 per beneficiary
      estimatedProjects: Math.floor(amount / 3 / 50000), // $50k per project
      infrastructureAllocation: socialProgramFunding / 3,
      educationAllocation: socialProgramFunding / 3,
      essentialAidAllocation: socialProgramFunding / 3,
    })
  }

  const handleExecuteDistribution = async () => {
    if (!simulationResult) return

    setIsSimulating(true)
    try {
      await distributeProfit(simulationResult.totalProfit, profitSource)
      setSimulationResult(null)
      setSimulationAmount("100000")
    } catch (error) {
      console.error("Distribution execution failed:", error)
    } finally {
      setIsSimulating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-amber-400/20">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Profit Allocation Simulator
          </CardTitle>
          <CardDescription>
            Simulate profit distribution across Social Impact QGI, iBank&Trust, and Long-term Bonds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="profit-amount" className="text-amber-400">
                  Profit Amount ($)
                </Label>
                <Input
                  id="profit-amount"
                  type="number"
                  value={simulationAmount}
                  onChange={(e) => setSimulationAmount(e.target.value)}
                  placeholder="Enter profit amount"
                  className="bg-black/20 border-amber-400/30 text-white"
                />
              </div>

              <div>
                <Label htmlFor="profit-source" className="text-amber-400">
                  Profit Source
                </Label>
                <Select value={profitSource} onValueChange={setProfitSource}>
                  <SelectTrigger className="bg-black/20 border-amber-400/30 text-white">
                    <SelectValue placeholder="Select profit source" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-amber-400/30">
                    {profitSources.map((source) => (
                      <SelectItem key={source.value} value={source.value} className="text-white hover:bg-amber-400/10">
                        <div>
                          <div className="font-semibold">{source.label}</div>
                          <div className="text-xs text-gray-400">{source.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSimulation}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Simulation
              </Button>
            </div>

            <div className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-400/20">
                <div className="text-3xl font-bold text-purple-400 mb-2">1/3 : 1/3 : 1/3</div>
                <div className="text-gray-400">Distribution Formula</div>
                <div className="text-sm text-gray-500 mt-2">Equal allocation across three strategic channels</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-blue-400/10 rounded border border-blue-400/20">
                  <Heart className="w-4 h-4 mx-auto text-blue-400 mb-1" />
                  <div className="text-xs text-blue-400">Social Impact</div>
                </div>
                <div className="p-3 bg-green-400/10 rounded border border-green-400/20">
                  <Building2 className="w-4 h-4 mx-auto text-green-400 mb-1" />
                  <div className="text-xs text-green-400">iBank&Trust</div>
                </div>
                <div className="p-3 bg-amber-400/10 rounded border border-amber-400/20">
                  <TrendingUp className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                  <div className="text-xs text-amber-400">50yr Bonds</div>
                </div>
              </div>
            </div>
          </div>

          {simulationResult && (
            <>
              <Separator className="bg-amber-400/20" />

              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Simulation Results</h3>
                  <div className="text-3xl font-bold text-white">${simulationResult.totalProfit.toLocaleString()}</div>
                  <div className="text-gray-400">Total Profit Distribution</div>
                </div>

                {/* Immediate Distribution */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-400/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-400 text-sm flex items-center">
                        <Heart className="w-4 h-4 mr-2" />
                        Social Impact QGI
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-blue-400 mb-2">
                        ${simulationResult.distribution.socialImpactQGI.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400 mb-3">Immediate allocation</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Beneficiaries:</span>
                          <span className="text-blue-400">
                            {simulationResult.estimatedBeneficiaries.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Projects:</span>
                          <span className="text-blue-400">{simulationResult.estimatedProjects}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-400/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-green-400 text-sm flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        iBank&Trust
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-green-400 mb-2">
                        ${simulationResult.distribution.iBankTrust.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400 mb-3">Immediate deposit</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Interest Rate:</span>
                          <span className="text-green-400">3.5% - 4.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Compounding:</span>
                          <span className="text-green-400">Monthly</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-400/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-amber-400 text-sm flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        50yr Bond
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-amber-400 mb-2">
                        ${simulationResult.distribution.longTermBond.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400 mb-3">Bond purchase</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Yield Rate:</span>
                          <span className="text-amber-400">4.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Maturity:</span>
                          <span className="text-amber-400">50 years</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bond Maturity Impact */}
                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-400/20">
                  <CardHeader>
                    <CardTitle className="text-purple-400 flex items-center">
                      <ArrowRight className="w-5 h-5 mr-2" />
                      50-Year Bond Maturity Impact
                    </CardTitle>
                    <CardDescription>Projected value and distribution at bond maturity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">
                            ${simulationResult.bondMaturityValue.toLocaleString()}
                          </div>
                          <div className="text-gray-400">Total Maturity Value</div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Social Programs (50%)</span>
                            <span className="text-purple-400 font-semibold">
                              ${simulationResult.socialProgramFunding.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">iBank&Trust (50%)</span>
                            <span className="text-purple-400 font-semibold">
                              ${simulationResult.iBankTrustAddition.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-400">Social Program Breakdown</div>
                          <div className="text-gray-400 text-sm">50% allocation distribution</div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Infrastructure (33.33%)</span>
                            <span className="text-purple-400">
                              ${simulationResult.infrastructureAllocation.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Education (33.33%)</span>
                            <span className="text-purple-400">
                              ${simulationResult.educationAllocation.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Essential Aid (33.34%)</span>
                            <span className="text-purple-400">
                              ${simulationResult.essentialAidAllocation.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setSimulationResult(null)}
                    variant="outline"
                    className="border-gray-400/30 text-gray-400"
                  >
                    Clear Simulation
                  </Button>
                  <Button
                    onClick={handleExecuteDistribution}
                    disabled={isSimulating}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
                  >
                    {isSimulating ? "Executing..." : "Execute Distribution"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
