"use client"

import { useState } from "react"
import { MapPin, TrendingUp, DollarSign } from "lucide-react"

export function PropertyOpportunityMap() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const areas = [
    {
      id: "north-austin",
      name: "North Austin",
      opportunity: 85,
      avgPrice: "$435,000",
      appreciation: "+4.2%",
      color: "bg-green-500",
    },
    {
      id: "south-austin",
      name: "South Austin",
      opportunity: 92,
      avgPrice: "$465,000",
      appreciation: "+5.1%",
      color: "bg-blue-500",
    },
    {
      id: "east-austin",
      name: "East Austin",
      opportunity: 78,
      avgPrice: "$410,000",
      appreciation: "+3.8%",
      color: "bg-amber-500",
    },
    {
      id: "west-austin",
      name: "West Austin",
      opportunity: 65,
      avgPrice: "$520,000",
      appreciation: "+2.9%",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-100 rounded-lg p-6 h-48">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedArea === area.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${area.color}`} />
                  <span className="text-xs font-medium">{area.name}</span>
                </div>
                <div className="text-xs text-muted-foreground">{area.opportunity}% opportunity</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedArea && (
        <div className="p-4 border rounded-lg bg-muted/50">
          {(() => {
            const area = areas.find((a) => a.id === selectedArea)
            if (!area) return null
            return (
              <div>
                <h4 className="font-medium mb-2">{area.name}</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium">{area.avgPrice}</div>
                      <div className="text-muted-foreground">Avg Price</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium">{area.appreciation}</div>
                      <div className="text-muted-foreground">Appreciation</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <div>
                      <div className="font-medium">{area.opportunity}%</div>
                      <div className="text-muted-foreground">Opportunity</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
