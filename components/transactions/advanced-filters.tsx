"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  CalendarIcon,
  DollarSign,
  Tag,
  MapPin,
  Building2,
  RotateCcw,
} from "lucide-react"
import { format } from "date-fns"

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
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

  const updateFilters = (updates: Partial<AdvancedFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleArrayFilter = (array: string[], value: string, key: keyof AdvancedFilters) => {
    const newArray = array.includes(value) ? array.filter((item) => item !== value) : [...array, value]
    updateFilters({ [key]: newArray })
  }

  const getActiveFilterCount = () => {
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

  const activeFilterCount = getActiveFilterCount()

  return (
    <Card className="bg-background/50 backdrop-blur-sm border-white/20">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0">
                  <Filter className="h-5 w-5 mr-2" />
                  <CardTitle className="text-lg">Advanced Filters</CardTitle>
                  {isExpanded ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                </Button>
              </CollapsibleTrigger>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {activeFilterCount} active
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <Button variant="outline" size="sm" onClick={onReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Quick Search - Always Visible */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search transactions..."
              value={filters.searchTerm}
              onChange={(e) => updateFilters({ searchTerm: e.target.value })}
              className="pl-10"
            />
            {filters.searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => updateFilters({ searchTerm: "" })}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Active Filters:</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {category}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => toggleArrayFilter(filters.categories, category, "categories")}
                      />
                    </Badge>
                  ))}
                  {filters.types.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      {type}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => toggleArrayFilter(filters.types, type, "types")}
                      />
                    </Badge>
                  ))}
                  {filters.accounts.map((account) => (
                    <Badge key={account} variant="secondary" className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {account}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => toggleArrayFilter(filters.accounts, account, "accounts")}
                      />
                    </Badge>
                  ))}
                  {(filters.dateRange.start || filters.dateRange.end) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      Date Range
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => updateFilters({ dateRange: { start: null, end: null } })}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categories */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Tag className="h-4 w-4" />
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
              <div className="space-y-3">
                <Label className="text-sm font-medium">Transaction Types</Label>
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
              <div className="space-y-3">
                <Label className="text-sm font-medium">Status</Label>
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
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
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

              {/* Merchants */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Merchants
                </Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableMerchants.slice(0, 10).map((merchant) => (
                    <div key={merchant} className="flex items-center space-x-2">
                      <Checkbox
                        id={`merchant-${merchant}`}
                        checked={filters.merchants.includes(merchant)}
                        onCheckedChange={() => toggleArrayFilter(filters.merchants, merchant, "merchants")}
                      />
                      <Label htmlFor={`merchant-${merchant}`} className="text-sm">
                        {merchant}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Filters */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Additional Filters</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has-location"
                      checked={filters.hasLocation === true}
                      onCheckedChange={(checked) => updateFilters({ hasLocation: checked ? true : null })}
                    />
                    <Label htmlFor="has-location" className="text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Has Location
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has-reference"
                      checked={filters.hasReference === true}
                      onCheckedChange={(checked) => updateFilters({ hasReference: checked ? true : null })}
                    />
                    <Label htmlFor="has-reference" className="text-sm">
                      Has Reference
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Date Range
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date" className="text-xs">
                    Start Date
                  </Label>
                  <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.start ? format(filters.dateRange.start, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.start || undefined}
                        onSelect={(date) => {
                          updateFilters({
                            dateRange: { ...filters.dateRange, start: date || null },
                          })
                          setStartDateOpen(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date" className="text-xs">
                    End Date
                  </Label>
                  <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.end ? format(filters.dateRange.end, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.end || undefined}
                        onSelect={(date) => {
                          updateFilters({
                            dateRange: { ...filters.dateRange, end: date || null },
                          })
                          setEndDateOpen(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Amount Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Amount Range
              </Label>
              <div className="space-y-4">
                <div className="px-3">
                  <Slider
                    value={[filters.amountRange.min, filters.amountRange.max]}
                    onValueChange={([min, max]) => updateFilters({ amountRange: { min, max } })}
                    max={10000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.amountRange.min.toLocaleString()}</span>
                  <span>${filters.amountRange.max.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
