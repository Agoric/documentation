"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Filter, CalendarIcon, DollarSign, Tag, Building, MapPin, ChevronDown, X, RotateCcw } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export interface AdvancedFilters {
  searchTerm: string
  categories: string[]
  types: string[]
  statuses: string[]
  accounts: string[]
  merchants: string[]
  dateRange: {
    start: Date | null
    end: Date | null
  }
  amountRange: {
    min: number
    max: number
  }
  hasLocation: boolean | null
  hasReference: boolean | null
}

interface AdvancedFiltersProps {
  filters: AdvancedFilters
  onFiltersChange: (filters: AdvancedFilters) => void
  availableCategories: string[]
  availableAccounts: string[]
  availableMerchants: string[]
  onReset: () => void
}

export function AdvancedFilters({
  filters,
  onFiltersChange,
  availableCategories,
  availableAccounts,
  availableMerchants,
  onReset,
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilters = (updates: Partial<AdvancedFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleArrayFilter = (array: string[], value: string, key: keyof AdvancedFilters) => {
    const newArray = array.includes(value) ? array.filter((item) => item !== value) : [...array, value]
    updateFilters({ [key]: newArray })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.searchTerm) count++
    if (filters.categories.length > 0) count++
    if (filters.types.length > 0) count++
    if (filters.statuses.length > 0) count++
    if (filters.accounts.length > 0) count++
    if (filters.merchants.length > 0) count++
    if (filters.dateRange.start || filters.dateRange.end) count++
    if (filters.amountRange.min > 0 || filters.amountRange.max < 10000) count++
    if (filters.hasLocation !== null) count++
    if (filters.hasReference !== null) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <Card>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <CardTitle>Advanced Filters</CardTitle>
                {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount} active</Badge>}
              </div>
              <div className="flex items-center space-x-2">
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={onReset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                )}
                <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "transform rotate-180")} />
              </div>
            </div>
            <CardDescription>Filter transactions by multiple criteria for precise results</CardDescription>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label>Search</Label>
              <Input
                placeholder="Search descriptions, merchants, references..."
                value={filters.searchTerm}
                onChange={(e) => updateFilters({ searchTerm: e.target.value })}
              />
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !filters.dateRange.start && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.start ? format(filters.dateRange.start, "PPP") : <span>Start date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange.start || undefined}
                      onSelect={(date) =>
                        updateFilters({
                          dateRange: { ...filters.dateRange, start: date || null },
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !filters.dateRange.end && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.end ? format(filters.dateRange.end, "PPP") : <span>End date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange.end || undefined}
                      onSelect={(date) =>
                        updateFilters({
                          dateRange: { ...filters.dateRange, end: date || null },
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Amount Range */}
            <div className="space-y-4">
              <Label className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Amount Range
              </Label>
              <div className="px-3">
                <Slider
                  value={[filters.amountRange.min, filters.amountRange.max]}
                  onValueChange={([min, max]) => updateFilters({ amountRange: { min, max } })}
                  max={10000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${filters.amountRange.min}</span>
                  <span>${filters.amountRange.max}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categories */}
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Categories
                </Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => toggleArrayFilter(filters.categories, category, "categories")}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction Types */}
              <div className="space-y-2">
                <Label>Transaction Types</Label>
                <div className="space-y-2">
                  {["income", "expense", "transfer"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.types.includes(type)}
                        onCheckedChange={() => toggleArrayFilter(filters.types, type, "types")}
                      />
                      <Label htmlFor={`type-${type}`} className="text-sm capitalize">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="space-y-2">
                  {["completed", "pending", "failed"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={filters.statuses.includes(status)}
                        onCheckedChange={() => toggleArrayFilter(filters.statuses, status, "statuses")}
                      />
                      <Label htmlFor={`status-${status}`} className="text-sm capitalize">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accounts */}
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Accounts
                </Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableAccounts.map((account) => (
                    <div key={account} className="flex items-center space-x-2">
                      <Checkbox
                        id={`account-${account}`}
                        checked={filters.accounts.includes(account)}
                        onCheckedChange={() => toggleArrayFilter(filters.accounts, account, "accounts")}
                      />
                      <Label htmlFor={`account-${account}`} className="text-sm">
                        {account}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="space-y-4">
              <Label>Additional Filters</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Has Location Data
                  </Label>
                  <Select
                    value={filters.hasLocation === null ? "all" : filters.hasLocation ? "yes" : "no"}
                    onValueChange={(value) =>
                      updateFilters({
                        hasLocation: value === "all" ? null : value === "yes" ? true : false,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="yes">With Location</SelectItem>
                      <SelectItem value="no">Without Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Has Reference</Label>
                  <Select
                    value={filters.hasReference === null ? "all" : filters.hasReference ? "yes" : "no"}
                    onValueChange={(value) =>
                      updateFilters({
                        hasReference: value === "all" ? null : value === "yes" ? true : false,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="yes">With Reference</SelectItem>
                      <SelectItem value="no">Without Reference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {activeFiltersCount > 0 && (
              <div className="space-y-2">
                <Label>Active Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.searchTerm && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Search: {filters.searchTerm}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilters({ searchTerm: "" })} />
                    </Badge>
                  )}
                  {filters.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => toggleArrayFilter(filters.categories, category, "categories")}
                      />
                    </Badge>
                  ))}
                  {filters.types.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      {type}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => toggleArrayFilter(filters.types, type, "types")}
                      />
                    </Badge>
                  ))}
                  {(filters.dateRange.start || filters.dateRange.end) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Date Range
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => updateFilters({ dateRange: { start: null, end: null } })}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
