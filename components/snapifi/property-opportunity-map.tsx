"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, DollarSign, Home } from "lucide-react"

export function PropertyOpportunityMap() {
  const [selectedArea, setSelectedArea] = useState("north-austin")

  const areas = [
    {
      id: "north-austin",
      name: "North Austin",
      averagePrice: "$435,000",
      appreciation: "+4.2%",
      inventory: 23,
      hotness: "high",
      x: 45,
      y: 30,
    },
    {
      id: "south-austin",
      name: "South Austin",
      averagePrice: "$465,000",
      appreciation: "+3.8%",
      inventory: 18,
      hotness: "medium",
      x: 40,
      y: 70,
    },
    {
      id: "east-austin",
      name: "East Austin",
      averagePrice: "$410,000",
      appreciation: "+5.1%",
      inventory: 31,
      hotness: "high",
      x: 70,
      y: 50,
    },
    {
      id: "west-austin",
      name: "West Austin",
      averagePrice: "$520,000",
      appreciation: "+2.9%",
      inventory: 12,
      hotness: "low",
      x: 20,
      y: 45,
    },
  ]

  const selectedAreaData = areas.find((area) => area.id === selectedArea)

  return (
    <div className="space-y-4">
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-lg" />

        {/* Map visualization */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {areas.map((area) => (
            <g key={area.id}>
              <circle
                cx={area.x}
                cy={area.y}
                r={area.hotness === "high" ? 8 : area.hotness === "medium" ? 6 : 4}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedArea === area.id
                    ? "fill-blue-600 stroke-blue-800 stroke-2"
                    : area.hotness === "high"
                      ? "fill-green-500 hover:fill-green-600"
                      : area.hotness === "medium"
                        ? "fill-yellow-500 hover:fill-yellow-600"
                        : "fill-gray-400 hover:fill-gray-500"
                }`}
                onClick={() => setSelectedArea(area.id)}
              />
              <text
                x={area.x}
                y={area.y - 12}
                className="text-xs font-medium fill-gray-700 text-center"
                textAnchor="middle"
              >
                {area.name.split(" ")[0]}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>High Opportunity</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span>Low</span>
          </div>
        </div>
      </div>

      {selectedAreaData && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium">{selectedAreaData.name}</h4>
            </div>
            <Badge
              className={
                selectedAreaData.hotness === "high"
                  ? "bg-green-100 text-green-800"
                  : selectedAreaData.hotness === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
              }
            >
              {selectedAreaData.hotness} opportunity
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="h-3 w-3" />
                <span>Avg Price</span>
              </div>
              <div className="font-medium">{selectedAreaData.averagePrice}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>Appreciation</span>
              </div>
              <div className="font-medium text-green-600">{selectedAreaData.appreciation}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Home className="h-3 w-3" />
                <span>Available</span>
              </div>
              <div className="font-medium">{selectedAreaData.inventory} homes</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
