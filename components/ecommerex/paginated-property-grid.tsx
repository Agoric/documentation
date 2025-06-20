"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, SortAsc, SortDesc, Home, Building, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HolographicPropertyCard } from "./holographic-property-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { PropertyComparisonBar } from "./property-comparison-bar"

interface Property {
  id: string
  title: string
  description: string
  price: number
  monthlyPayment: number
  image: string
  type: string
  bedrooms: number
  bathrooms: number
  sqft: number
  yearBuilt: number
  rating: number
  location: string
  status: string
  features: string[]
  isHolographic?: boolean
  holographicFeatures?: string[]
  has360View?: boolean
  images360?: string[]
  daysOnMarket: number
  pricePerSqft: number
}

interface PaginatedPropertyGridProps {
  properties: Property[]
  itemsPerPage?: number
}

export function PaginatedPropertyGrid({ properties, itemsPerPage = 6 }: PaginatedPropertyGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("price")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Get unique types and statuses
  const types = useMemo(() => {
    const propertyTypes = Array.from(new Set(properties.map((p) => p.type)))
    return ["all", ...propertyTypes]
  }, [properties])

  const statuses = useMemo(() => {
    const propertyStatuses = Array.from(new Set(properties.map((p) => p.status)))
    return ["all", ...propertyStatuses]
  }, [properties])

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = selectedType === "all" || property.type === selectedType
      const matchesStatus = selectedStatus === "all" || property.status === selectedStatus

      let matchesPrice = true
      if (priceRange !== "all") {
        switch (priceRange) {
          case "under-500k":
            matchesPrice = property.price < 500000
            break
          case "500k-1m":
            matchesPrice = property.price >= 500000 && property.price < 1000000
            break
          case "1m-2m":
            matchesPrice = property.price >= 1000000 && property.price < 2000000
            break
          case "over-2m":
            matchesPrice = property.price >= 2000000
            break
        }
      }

      return matchesSearch && matchesType && matchesStatus && matchesPrice
    })

    // Sort properties
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Property]
      let bValue: any = b[sortBy as keyof Property]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [properties, searchTerm, selectedType, selectedStatus, priceRange, sortBy, sortOrder])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = filteredAndSortedProperties.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      if (start > 2) {
        pages.push("ellipsis-start")
      }

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i)
        }
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-300/70" />
            <Input
              placeholder="Search properties, locations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                handleFilterChange()
              }}
              className="border-indigo-500/20 bg-indigo-950/30 pl-8 text-indigo-200 placeholder:text-indigo-300/50 focus:border-indigo-500/50 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
                <SelectItem value="price" className="hover:bg-indigo-900/50">
                  Price
                </SelectItem>
                <SelectItem value="sqft" className="hover:bg-indigo-900/50">
                  Size
                </SelectItem>
                <SelectItem value="rating" className="hover:bg-indigo-900/50">
                  Rating
                </SelectItem>
                <SelectItem value="daysOnMarket" className="hover:bg-indigo-900/50">
                  Days on Market
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200"
            >
              {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select
            value={selectedType}
            onValueChange={(value) => {
              setSelectedType(value)
              handleFilterChange()
            }}
          >
            <SelectTrigger className="w-[180px] border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
              <Home className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
              {types.map((type) => (
                <SelectItem key={type} value={type} className="hover:bg-indigo-900/50">
                  {type === "all" ? "All Types" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedStatus}
            onValueChange={(value) => {
              setSelectedStatus(value)
              handleFilterChange()
            }}
          >
            <SelectTrigger className="w-[180px] border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
              <Building className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
              {statuses.map((status) => (
                <SelectItem key={status} value={status} className="hover:bg-indigo-900/50">
                  {status === "all" ? "All Statuses" : status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value)
              handleFilterChange()
            }}
          >
            <SelectTrigger className="w-[180px] border-indigo-500/20 bg-indigo-950/30 text-indigo-200">
              <DollarSign className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent className="border-indigo-500/20 bg-indigo-950/90 text-indigo-200">
              <SelectItem value="all" className="hover:bg-indigo-900/50">
                All Prices
              </SelectItem>
              <SelectItem value="under-500k" className="hover:bg-indigo-900/50">
                Under $500K
              </SelectItem>
              <SelectItem value="500k-1m" className="hover:bg-indigo-900/50">
                $500K - $1M
              </SelectItem>
              <SelectItem value="1m-2m" className="hover:bg-indigo-900/50">
                $1M - $2M
              </SelectItem>
              <SelectItem value="over-2m" className="hover:bg-indigo-900/50">
                Over $2M
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Info */}
      <div className="text-indigo-300/70 text-sm">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProperties.length)} of{" "}
        {filteredAndSortedProperties.length} properties
      </div>

      {/* Property Grid */}
      {currentProperties.length > 0 ? (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <HolographicPropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <div className="text-indigo-300/70 text-lg mb-2">No properties found</div>
          <div className="text-indigo-400/50 text-sm">Try adjusting your search or filter criteria</div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={`border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 cursor-pointer ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                  }`}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={`${page}-${index}`}>
                  {typeof page === "string" ? (
                    <PaginationEllipsis className="text-indigo-400/50" />
                  ) : (
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className={`border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 cursor-pointer ${
                        currentPage === page
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400/50"
                          : ""
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className={`border-indigo-500/20 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-200 cursor-pointer ${
                    currentPage === totalPages ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Property Comparison Bar */}
      <PropertyComparisonBar />
    </div>
  )
}
