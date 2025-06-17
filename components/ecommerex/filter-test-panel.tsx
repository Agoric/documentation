"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface FilterState {
  search: string
  category: string
  priceRange: string
  minRating: number
  holographicOnly: boolean
  has360ViewOnly: boolean
  inStockOnly: boolean
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  rating: number
  stock: number
  platforms: string[]
  isHolographic?: boolean
  holographicFeatures?: string[]
  has360View?: boolean
}

interface FilterTestPanelProps {
  products: Product[]
  onTestComplete: (results: TestResult[]) => void
}

interface TestResult {
  testName: string
  passed: boolean
  error?: string
  resultCount: number
  expectedBehavior: string
}

export function FilterTestPanel({ products, onTestComplete }: FilterTestPanelProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])

  const filterProducts = (products: Product[], filters: FilterState): Product[] => {
    try {
      return products.filter((product) => {
        // Search filter
        if (
          filters.search &&
          !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !product.description.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false
        }

        // Category filter
        if (filters.category !== "all" && product.category !== filters.category) {
          return false
        }

        // Price range filter
        if (filters.priceRange !== "all") {
          const price = product.price
          switch (filters.priceRange) {
            case "under-100":
              if (price >= 100) return false
              break
            case "100-200":
              if (price < 100 || price >= 200) return false
              break
            case "200-500":
              if (price < 200 || price >= 500) return false
              break
            case "500-1000":
              if (price < 500 || price >= 1000) return false
              break
            case "over-1000":
              if (price < 1000) return false
              break
          }
        }

        // Rating filter
        if (filters.minRating > 0 && product.rating < filters.minRating) {
          return false
        }

        // Special filters with null safety
        if (filters.holographicOnly && !product.isHolographic) return false
        if (filters.has360ViewOnly && !product.has360View) return false
        if (filters.inStockOnly && product.stock === 0) return false

        return true
      })
    } catch (error) {
      console.error("Filter error:", error)
      return []
    }
  }

  const runTests = async () => {
    setIsRunning(true)
    const testResults: TestResult[] = []

    // Test cases
    const testCases: Array<{ name: string; filters: FilterState; expectedBehavior: string }> = [
      {
        name: "No Filters (All Products)",
        filters: {
          search: "",
          category: "all",
          priceRange: "all",
          minRating: 0,
          holographicOnly: false,
          has360ViewOnly: false,
          inStockOnly: false,
        },
        expectedBehavior: "Should return all products",
      },
      {
        name: "Search Filter - 'Neural'",
        filters: {
          search: "Neural",
          category: "all",
          priceRange: "all",
          minRating: 0,
          holographicOnly: false,
          has360ViewOnly: false,
          inStockOnly: false,
        },
        expectedBehavior: "Should return products containing 'Neural' in name or description",
      },
      {
        name: "Category Filter - Audio",
        filters: {
          search: "",
          category: "Audio",
          priceRange: "all",
          minRating: 0,
          holographicOnly: false,
          has360ViewOnly: false,
          inStockOnly: false,
        },
        expectedBehavior: "Should return only Audio category products",
      },
      {
        name: "Price Range - Under $100",
        filters: {
          search: "",
          category: "all",
          priceRange: "under-100",
          minRating: 0,
          holographicOnly: false,
          has360ViewOnly: false,
          inStockOnly: false,
        },
        expectedBehavior: "Should return products under $100",
      },
      {
        name: "Price Range - $500-$1000",
        filters: {
          search: "",
          category: "all",
          priceRange: "500-1000",
          minRating: 0,
          holographicOnly: false,
          has360ViewOnly: false,
          inStockOnly: false,
        },
        expectedBehavior: "Should return products between $500-$1000",
      },
      {
        name: "Rating Filter - 4.5+ Stars",
        filters: {
          search: "",
          category: "all",
          priceRange: "all",
          minRating: 4.5,
          holographicOnly: false,
          has360ViewOnly: false,
          inStockOnly: false,
        },
        expectedBehavior: "Should return products with rating >= 4.5",
      },
      {
        name: "Holographic Only",
        filters: {
          search: "",
          category: "all",
          priceRange: "all",
          minRating: 0,
          holographicOnly: true,
          has360ViewOnly: false,
          inStockOnly: false,
        },
        expectedBehavior: "Should return only holographic products",
      },
      {
        name: "360° View Only",
        filters: {
          search: "",
          category: "all",
          priceRange: "all",
          minRating: 0,
          holographicOnly: false,
          has360ViewOnly: true,
          inStockOnly: false,
        },
        expectedBehavior: "Should return only products with 360° view",
      },
      {
        name: "In Stock Only",
        filters: {
          search: "",
          category: "all",
          priceRange: "all",
          minRating: 0,
          holographicOnly: false,
          has360ViewOnly: false,
          inStockOnly: true,
        },
        expectedBehavior: "Should return only products with stock > 0",
      },
      {
        name: "Combined - Holographic + Audio + In Stock",
        filters: {
          search: "",
          category: "Audio",
          priceRange: "all",
          minRating: 0,
          holographicOnly: true,
          has360ViewOnly: false,
          inStockOnly: true,
        },
        expectedBehavior: "Should return holographic audio products that are in stock",
      },
      {
        name: "Combined - Search + Price + Rating",
        filters: {
          search: "Pro",
          category: "all",
          priceRange: "200-500",
          minRating: 4.5,
          holographicOnly: false,
          has360ViewOnly: false,
          inStockOnly: false,
        },
        expectedBehavior: "Should return products with 'Pro' in name, price $200-500, rating >= 4.5",
      },
      {
        name: "All Filters Combined",
        filters: {
          search: "Quantum",
          category: "Wearables",
          priceRange: "500-1000",
          minRating: 4.8,
          holographicOnly: true,
          has360ViewOnly: true,
          inStockOnly: true,
        },
        expectedBehavior: "Should apply all filters simultaneously",
      },
    ]

    // Run each test
    for (const testCase of testCases) {
      try {
        const filteredProducts = filterProducts(products, testCase.filters)

        // Validate results
        let passed = true
        let error = ""

        // Basic validation - no errors thrown
        if (filteredProducts === null || filteredProducts === undefined) {
          passed = false
          error = "Filter returned null or undefined"
        }

        // Validate specific filter logic
        if (passed && filteredProducts.length > 0) {
          for (const product of filteredProducts) {
            // Search validation
            if (testCase.filters.search) {
              const searchTerm = testCase.filters.search.toLowerCase()
              if (
                !product.name.toLowerCase().includes(searchTerm) &&
                !product.description.toLowerCase().includes(searchTerm)
              ) {
                passed = false
                error = `Product "${product.name}" doesn't match search term "${testCase.filters.search}"`
                break
              }
            }

            // Category validation
            if (testCase.filters.category !== "all" && product.category !== testCase.filters.category) {
              passed = false
              error = `Product "${product.name}" has wrong category: ${product.category} vs ${testCase.filters.category}`
              break
            }

            // Price validation
            if (testCase.filters.priceRange !== "all") {
              const price = product.price
              let priceValid = true
              switch (testCase.filters.priceRange) {
                case "under-100":
                  priceValid = price < 100
                  break
                case "100-200":
                  priceValid = price >= 100 && price < 200
                  break
                case "200-500":
                  priceValid = price >= 200 && price < 500
                  break
                case "500-1000":
                  priceValid = price >= 500 && price < 1000
                  break
                case "over-1000":
                  priceValid = price >= 1000
                  break
              }
              if (!priceValid) {
                passed = false
                error = `Product "${product.name}" price $${price} doesn't match range ${testCase.filters.priceRange}`
                break
              }
            }

            // Rating validation
            if (testCase.filters.minRating > 0 && product.rating < testCase.filters.minRating) {
              passed = false
              error = `Product "${product.name}" rating ${product.rating} below minimum ${testCase.filters.minRating}`
              break
            }

            // Special filters validation
            if (testCase.filters.holographicOnly && !product.isHolographic) {
              passed = false
              error = `Product "${product.name}" is not holographic but holographic filter is active`
              break
            }

            if (testCase.filters.has360ViewOnly && !product.has360View) {
              passed = false
              error = `Product "${product.name}" doesn't have 360° view but filter is active`
              break
            }

            if (testCase.filters.inStockOnly && product.stock === 0) {
              passed = false
              error = `Product "${product.name}" is out of stock but in-stock filter is active`
              break
            }
          }
        }

        testResults.push({
          testName: testCase.name,
          passed,
          error,
          resultCount: filteredProducts.length,
          expectedBehavior: testCase.expectedBehavior,
        })

        // Add small delay to show progress
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (err) {
        testResults.push({
          testName: testCase.name,
          passed: false,
          error: err instanceof Error ? err.message : "Unknown error",
          resultCount: 0,
          expectedBehavior: testCase.expectedBehavior,
        })
      }
    }

    setResults(testResults)
    setIsRunning(false)
    onTestComplete(testResults)
  }

  const passedTests = results.filter((r) => r.passed).length
  const totalTests = results.length

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Filter Combination Tests</span>
          <Button onClick={runTests} disabled={isRunning}>
            {isRunning ? "Running Tests..." : "Run All Tests"}
          </Button>
        </CardTitle>
        {results.length > 0 && (
          <div className="flex items-center gap-4">
            <Badge variant={passedTests === totalTests ? "default" : "destructive"}>
              {passedTests}/{totalTests} Tests Passed
            </Badge>
            <span className="text-sm text-gray-500">
              Success Rate: {totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.passed ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {result.passed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <h4 className="font-medium">{result.testName}</h4>
                    <p className="text-sm text-gray-600">{result.expectedBehavior}</p>
                  </div>
                </div>
                <Badge variant="outline">{result.resultCount} results</Badge>
              </div>
              {result.error && (
                <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-700">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Error:</span>
                  </div>
                  <p className="mt-1">{result.error}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
