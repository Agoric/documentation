"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  Fuel,
  MapPin,
  DollarSign,
  TrendingUp,
  Navigation,
  Clock,
  Wrench,
  Zap,
  Route,
  AlertTriangle,
} from "lucide-react"

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  mileage: number
  fuelEfficiency: number
  lastService: string
  nextService: number
  estimatedValue: number
}

interface TripData {
  id: string
  date: string
  distance: number
  fuelUsed: number
  cost: number
  efficiency: number
  route: string
}

export function VehicleTracking() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("vehicle-1")
  const [fuelPrices, setFuelPrices] = useState({
    current: 3.45,
    trend: "up",
    change: 0.12,
  })

  const vehicles: Vehicle[] = [
    {
      id: "vehicle-1",
      make: "Toyota",
      model: "Camry Hybrid",
      year: 2022,
      mileage: 24500,
      fuelEfficiency: 52,
      lastService: "2024-01-15",
      nextService: 27500,
      estimatedValue: 28500,
    },
    {
      id: "vehicle-2",
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      mileage: 12000,
      fuelEfficiency: 0, // Electric
      lastService: "2024-01-20",
      nextService: 15000,
      estimatedValue: 42000,
    },
  ]

  const recentTrips: TripData[] = [
    {
      id: "trip-1",
      date: "2024-01-25",
      distance: 45.2,
      fuelUsed: 0.9,
      cost: 3.11,
      efficiency: 50.2,
      route: "Home → Office",
    },
    {
      id: "trip-2",
      date: "2024-01-24",
      distance: 128.5,
      fuelUsed: 2.4,
      cost: 8.28,
      efficiency: 53.5,
      route: "Austin → San Antonio",
    },
    {
      id: "trip-3",
      date: "2024-01-23",
      distance: 23.1,
      fuelUsed: 0.4,
      cost: 1.38,
      efficiency: 57.8,
      route: "Home → Grocery Store",
    },
  ]

  const monthlyStats = {
    totalMiles: 1247,
    totalFuelCost: 156.78,
    averageEfficiency: 51.2,
    co2Saved: 245, // lbs compared to average vehicle
    maintenanceCost: 89.5,
    totalCost: 246.28,
  }

  const optimizationTips = [
    {
      title: "Route Optimization",
      description: "Use Highway 35 instead of I-10 for 12% fuel savings",
      savings: "$4.50/week",
      icon: Route,
      color: "text-green-600",
    },
    {
      title: "Maintenance Alert",
      description: "Oil change due in 500 miles - schedule now for optimal efficiency",
      savings: "Prevent $200 repair",
      icon: Wrench,
      color: "text-orange-600",
    },
    {
      title: "Fuel Station Finder",
      description: "Cheapest gas within 5 miles: Shell on Main St ($3.32/gal)",
      savings: "$0.13/gallon",
      icon: Fuel,
      color: "text-blue-600",
    },
    {
      title: "Driving Behavior",
      description: "Reduce highway speed by 5mph for 8% better fuel economy",
      savings: "$12/month",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const currentVehicle = vehicles.find((v) => v.id === selectedVehicle) || vehicles[0]
  const isElectric = currentVehicle.fuelEfficiency === 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vehicle & Fuel Tracking</h2>
          <p className="text-muted-foreground">Optimize your transportation costs with smart tracking and analytics</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          <Car className="h-3 w-3 mr-1" />
          {vehicles.length} Vehicles
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trips">Trip History</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Vehicle Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Select Vehicle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedVehicle === vehicle.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-sm text-muted-foreground">{vehicle.mileage.toLocaleString()} miles</p>
                      </div>
                      <div className="text-right">
                        {vehicle.fuelEfficiency > 0 ? (
                          <div className="text-lg font-bold text-green-600">{vehicle.fuelEfficiency} MPG</div>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">
                            <Zap className="h-3 w-3 mr-1" />
                            Electric
                          </Badge>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Value: ${vehicle.estimatedValue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Miles Driven</CardTitle>
                <Navigation className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.totalMiles.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fuel Cost</CardTitle>
                <Fuel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${monthlyStats.totalFuelCost}</div>
                <p className="text-xs text-green-600">-8% vs last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monthlyStats.averageEfficiency} MPG</div>
                <p className="text-xs text-green-600">+2.1 vs vehicle avg</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${monthlyStats.totalCost}</div>
                <p className="text-xs text-muted-foreground">fuel + maintenance</p>
              </CardContent>
            </Card>
          </div>

          {/* Fuel Price Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Fuel className="h-5 w-5" />
                <span>Local Fuel Prices</span>
              </CardTitle>
              <CardDescription>Real-time fuel prices in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">${fuelPrices.current}</div>
                  <p className="text-sm text-blue-800">Current Price/Gallon</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div
                    className={`text-2xl font-bold ${fuelPrices.trend === "up" ? "text-red-600" : "text-green-600"}`}
                  >
                    {fuelPrices.trend === "up" ? "+" : "-"}${fuelPrices.change}
                  </div>
                  <p className="text-sm text-orange-800">Weekly Change</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$3.32</div>
                  <p className="text-sm text-green-800">Cheapest Nearby</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
              <CardDescription>Your contribution to reducing emissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{monthlyStats.co2Saved} lbs</div>
                  <p className="text-sm text-muted-foreground">CO₂ saved vs average vehicle</p>
                  <Progress value={75} className="h-2 mt-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Fuel Efficiency Rating</span>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Environmental Score</span>
                    <span className="font-bold text-green-600">8.7/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trees Equivalent</span>
                    <span className="font-bold">12 trees planted</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
              <CardDescription>Detailed breakdown of your recent journeys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{trip.route}</h4>
                        <p className="text-sm text-muted-foreground">{trip.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-bold">{trip.distance} mi</div>
                          <p className="text-muted-foreground">Distance</p>
                        </div>
                        <div>
                          <div className="font-bold">{trip.efficiency} MPG</div>
                          <p className="text-muted-foreground">Efficiency</p>
                        </div>
                        <div>
                          <div className="font-bold">${trip.cost}</div>
                          <p className="text-muted-foreground">Cost</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5" />
                <span>Maintenance Schedule</span>
              </CardTitle>
              <CardDescription>Keep your vehicle in optimal condition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Upcoming Maintenance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium">Oil Change</p>
                          <p className="text-sm text-muted-foreground">Due in 500 miles</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Tire Rotation</p>
                          <p className="text-sm text-muted-foreground">Due in 2,500 miles</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Maintenance History</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Oil Change</span>
                        <span className="text-sm text-muted-foreground">Jan 15, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground">24,000 miles • $45.99</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Brake Inspection</span>
                        <span className="text-sm text-muted-foreground">Dec 10, 2023</span>
                      </div>
                      <p className="text-sm text-muted-foreground">22,500 miles • $89.50</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Maintenance Savings</h4>
                <p className="text-sm text-blue-800">
                  Regular maintenance has saved you an estimated $1,200 in potential repairs this year. Your vehicle is
                  performing 15% better than average for its age and mileage.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Smart Optimization Tips</CardTitle>
              <CardDescription>AI-powered recommendations to reduce your transportation costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {optimizationTips.map((tip, index) => {
                  const IconComponent = tip.icon
                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <IconComponent className={`h-5 w-5 ${tip.color} mt-0.5`} />
                        <div className="flex-1">
                          <h4 className="font-medium">{tip.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <Badge className="bg-green-100 text-green-800">Save {tip.savings}</Badge>
                            <Button size="sm" variant="outline">
                              Apply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Route Optimization</CardTitle>
              <CardDescription>Find the most fuel-efficient routes for your regular trips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Route className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Smart Route Planning</h3>
                <p className="text-muted-foreground mb-4">
                  Get personalized route recommendations based on real-time traffic, fuel prices, and your vehicle's
                  efficiency
                </p>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  <Navigation className="h-4 w-4 mr-2" />
                  Plan Route
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
