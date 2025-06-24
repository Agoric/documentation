"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Home,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Search,
  Star,
  Building,
  Car,
  ShoppingCart,
  Utensils,
  Zap,
} from "lucide-react"

interface LocationData {
  city: string
  state: string
  medianHomePrice: number
  medianRent: number
  costOfLivingIndex: number
  averageSalary: number
  affordabilityRatio: number
  trend: "up" | "down" | "stable"
  zillow_data: {
    homeValue: number
    rentEstimate: number
    priceChange: number
  }
}

export function GeoAnalytics() {
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [userProfile] = useState({
    currentSalary: 85000,
    profession: "Software Engineer",
    currentLocation: "Austin, TX",
  })

  const topLocations: LocationData[] = [
    {
      city: "Austin",
      state: "TX",
      medianHomePrice: 450000,
      medianRent: 2100,
      costOfLivingIndex: 108,
      averageSalary: 92000,
      affordabilityRatio: 4.9,
      trend: "up",
      zillow_data: {
        homeValue: 465000,
        rentEstimate: 2150,
        priceChange: 3.2,
      },
    },
    {
      city: "Denver",
      state: "CO",
      medianHomePrice: 520000,
      medianRent: 2300,
      costOfLivingIndex: 112,
      averageSalary: 88000,
      affordabilityRatio: 5.9,
      trend: "up",
      zillow_data: {
        homeValue: 535000,
        rentEstimate: 2350,
        priceChange: 2.8,
      },
    },
    {
      city: "Raleigh",
      state: "NC",
      medianHomePrice: 380000,
      medianRent: 1800,
      costOfLivingIndex: 95,
      averageSalary: 78000,
      affordabilityRatio: 4.9,
      trend: "stable",
      zillow_data: {
        homeValue: 385000,
        rentEstimate: 1825,
        priceChange: 1.3,
      },
    },
    {
      city: "Nashville",
      state: "TN",
      medianHomePrice: 420000,
      medianRent: 1950,
      costOfLivingIndex: 102,
      averageSalary: 75000,
      affordabilityRatio: 5.6,
      trend: "up",
      zillow_data: {
        homeValue: 435000,
        rentEstimate: 1975,
        priceChange: 3.6,
      },
    },
  ]

  const costBreakdown = [
    { category: "Housing", percentage: 35, amount: 2975, icon: Home },
    { category: "Transportation", percentage: 15, amount: 1275, icon: Car },
    { category: "Food", percentage: 12, amount: 1020, icon: Utensils },
    { category: "Shopping", percentage: 10, amount: 850, icon: ShoppingCart },
    { category: "Utilities", percentage: 8, amount: 680, icon: Zap },
    { category: "Other", percentage: 20, amount: 1700, icon: DollarSign },
  ]

  useEffect(() => {
    setSelectedLocation(topLocations[0])
  }, [])

  const getAffordabilityColor = (ratio: number) => {
    if (ratio <= 4) return "text-green-600"
    if (ratio <= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getAffordabilityLabel = (ratio: number) => {
    if (ratio <= 4) return "Excellent"
    if (ratio <= 6) return "Good"
    return "Challenging"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Geo-Analytics Dashboard</h2>
          <p className="text-muted-foreground">Cost-of-living analysis powered by Zillow API and Census data</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <MapPin className="h-3 w-3 mr-1" />
          Real-time Data
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Compare</TabsTrigger>
          <TabsTrigger value="affordability">Affordability</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Location Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter city, state (e.g., Austin, TX)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="flex-1"
                />
                <Button>Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Location Analysis */}
          {selectedLocation && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Median Home Price</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${selectedLocation.medianHomePrice.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {selectedLocation.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    +{selectedLocation.zillow_data.priceChange}% this year
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Median Rent</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${selectedLocation.medianRent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">per month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cost of Living</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedLocation.costOfLivingIndex}</div>
                  <p className="text-xs text-muted-foreground">index (100 = national avg)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Affordability</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getAffordabilityColor(selectedLocation.affordabilityRatio)}`}>
                    {selectedLocation.affordabilityRatio}x
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getAffordabilityLabel(selectedLocation.affordabilityRatio)}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Cost Breakdown</CardTitle>
              <CardDescription>
                Based on ${userProfile.currentSalary.toLocaleString()} salary in {selectedLocation?.city},{" "}
                {selectedLocation?.state}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costBreakdown.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm">${item.amount}</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location Comparison</CardTitle>
              <CardDescription>Compare top locations for {userProfile.profession}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLocations.map((location, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedLocation?.city === location.city ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {location.city}, {location.state}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Home: ${location.medianHomePrice.toLocaleString()} • Rent: $
                          {location.medianRent.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            location.affordabilityRatio <= 4
                              ? "bg-green-100 text-green-800"
                              : location.affordabilityRatio <= 6
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {getAffordabilityLabel(location.affordabilityRatio)}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          Avg Salary: ${location.averageSalary.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affordability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Salary vs Cost Analysis</CardTitle>
              <CardDescription>How your income compares to local living costs</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedLocation && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Your Profile</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Current Salary</span>
                          <span className="font-medium">${userProfile.currentSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Profession</span>
                          <span className="font-medium">{userProfile.profession}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Take-home</span>
                          <span className="font-medium">
                            ${Math.round((userProfile.currentSalary * 0.75) / 12).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">
                        {selectedLocation.city}, {selectedLocation.state}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Local Avg Salary</span>
                          <span className="font-medium">${selectedLocation.averageSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost of Living Index</span>
                          <span className="font-medium">{selectedLocation.costOfLivingIndex}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Housing Affordability</span>
                          <span className={`font-medium ${getAffordabilityColor(selectedLocation.affordabilityRatio)}`}>
                            {getAffordabilityLabel(selectedLocation.affordabilityRatio)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Recommendation</h4>
                    <p className="text-sm text-blue-800">
                      {selectedLocation.affordabilityRatio <= 4
                        ? "Excellent choice! Your salary provides comfortable living with good savings potential."
                        : selectedLocation.affordabilityRatio <= 6
                          ? "Good option. You'll have moderate housing costs with some savings opportunities."
                          : "Consider negotiating a higher salary or exploring more affordable areas for better financial health."}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Relocation Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLocations
                    .filter((loc) => loc.affordabilityRatio <= 5)
                    .map((location, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">
                            {location.city}, {location.state}
                          </h4>
                          <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Great balance of cost and opportunity for {userProfile.profession}
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Potential savings: $
                          {Math.max(
                            0,
                            Math.round((userProfile.currentSalary * 0.75) / 12) - location.medianRent - 2000,
                          ).toLocaleString()}
                          /month
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Salary Negotiation Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-900">Market Analysis</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      {userProfile.profession} in {selectedLocation?.city} typically earn 15-20% above your current
                      salary
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Target Salary Range</span>
                      <span className="font-medium">
                        ${Math.round(userProfile.currentSalary * 1.15).toLocaleString()} - $
                        {Math.round(userProfile.currentSalary * 1.25).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Negotiation Confidence</span>
                      <span className="font-medium text-green-600">High</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
