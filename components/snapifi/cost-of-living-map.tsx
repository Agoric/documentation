"use client"

import { useState } from "react"
import { MapPin, Home, Building2, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CostOfLivingMapProps {
  fullSize?: boolean
}

export function CostOfLivingMap({ fullSize = false }: CostOfLivingMapProps) {
  const [activeLocation, setActiveLocation] = useState<string | null>("sf")

  const locations = [
    {
      id: "sf",
      name: "San Francisco",
      position: { top: "30%", left: "15%" },
      homePrice: "$1,250,000",
      rent: "$3,850",
      salary: "$145,000",
      affordability: "Low",
      color: "bg-red-500",
    },
    {
      id: "austin",
      name: "Austin",
      position: { top: "55%", left: "35%" },
      homePrice: "$450,000",
      rent: "$1,850",
      salary: "$125,000",
      affordability: "High",
      color: "bg-green-500",
    },
    {
      id: "nyc",
      name: "New York",
      position: { top: "35%", left: "80%" },
      homePrice: "$950,000",
      rent: "$3,500",
      salary: "$135,000",
      affordability: "Low",
      color: "bg-red-500",
    },
    {
      id: "denver",
      name: "Denver",
      position: { top: "40%", left: "30%" },
      homePrice: "$520,000",
      rent: "$2,100",
      salary: "$120,000",
      affordability: "Medium",
      color: "bg-amber-500",
    },
    {
      id: "raleigh",
      name: "Raleigh",
      position: { top: "45%", left: "75%" },
      homePrice: "$380,000",
      rent: "$1,650",
      salary: "$115,000",
      affordability: "High",
      color: "bg-green-500",
    },
  ]

  return (
    <div className={`relative w-full ${fullSize ? "h-[400px]" : "h-[200px]"} bg-slate-100 rounded-lg overflow-hidden`}>
      {/* Map background */}
      <div className="absolute inset-0 bg-[url('/usa-map-outline.png')] bg-cover bg-center opacity-80"></div>

      {/* Location pins */}
      {locations.map((location) => (
        <div
          key={location.id}
          className={`absolute cursor-pointer transition-all duration-300 ${
            activeLocation === location.id ? "scale-125 z-10" : "hover:scale-110"
          }`}
          style={{ top: location.position.top, left: location.position.left }}
          onClick={() => setActiveLocation(location.id)}
        >
          <div className={`h-4 w-4 rounded-full ${location.color} animate-pulse`}></div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap">
            <Badge
              variant="outline"
              className={`text-xs ${activeLocation === location.id ? "bg-white shadow-md" : "bg-white/80"}`}
            >
              {location.name}
            </Badge>
          </div>
        </div>
      ))}

      {/* Location details */}
      {activeLocation && (
        <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">{locations.find((l) => l.id === activeLocation)?.name}</span>
            </div>
            <Badge
              variant="outline"
              className={`${
                locations.find((l) => l.id === activeLocation)?.affordability === "High"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : locations.find((l) => l.id === activeLocation)?.affordability === "Medium"
                    ? "bg-amber-100 text-amber-800 border-amber-200"
                    : "bg-red-100 text-red-800 border-red-200"
              }`}
            >
              {locations.find((l) => l.id === activeLocation)?.affordability} Affordability
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Home className="h-3 w-3 text-muted-foreground" />
              <span>{locations.find((l) => l.id === activeLocation)?.homePrice}</span>
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="h-3 w-3 text-muted-foreground" />
              <span>{locations.find((l) => l.id === activeLocation)?.rent}/mo</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3 text-muted-foreground" />
              <span>{locations.find((l) => l.id === activeLocation)?.salary}/yr</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
