"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"

interface DataItem {
  id: string
  type: string
  name: string
  description?: string
}

export default function HomePage() {
  const [data, setData] = useState<DataItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call with potential null response
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data - sometimes might be null
        const mockData: DataItem[] = [
          { id: "1", type: "user", name: "John Doe", description: "Admin user" },
          { id: "2", type: "post", name: "First Post", description: "Sample post" },
          { id: "3", type: "comment", name: "Great article!", description: "User comment" },
        ]

        setData(mockData)
      } catch (err) {
        setError("Failed to fetch data")
        console.error("Error fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleItemClick = (item: DataItem | null) => {
    // Safe null check before accessing properties
    if (!item || !item.type) {
      console.warn("Item or item.type is null/undefined")
      return
    }

    console.log(`Clicked item of type: ${item.type}`)
  }

  const renderItem = (item: DataItem | null, index: number) => {
    // Null check for the item
    if (!item) {
      return (
        <Card key={`empty-${index}`} className="border-dashed">
          <CardContent className="p-4">
            <p className="text-gray-500 italic">No data available</p>
          </CardContent>
        </Card>
      )
    }

    // Safe access with optional chaining and fallbacks
    const itemType = item.type || "unknown"
    const itemName = item.name || "Unnamed"
    const itemDescription = item.description || "No description"

    return (
      <Card key={item.id || `item-${index}`} className="cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="capitalize">{itemType}</span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">{itemName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-3">{itemDescription}</p>
          <Button onClick={() => handleItemClick(item)} variant="outline" size="sm">
            View Details
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard with error-safe data handling</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Safe rendering with null checks */}
        {data && data.length > 0 ? (
          data.map((item, index) => renderItem(item, index))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Data loaded:</strong> {data ? "Yes" : "No"}
            </p>
            <p>
              <strong>Items count:</strong> {data?.length || 0}
            </p>
            <p>
              <strong>Loading state:</strong> {loading ? "True" : "False"}
            </p>
            <p>
              <strong>Error state:</strong> {error || "None"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
