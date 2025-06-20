"use client"

import { useState } from "react"
import { Globe, ChevronDown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useRealm } from "@/contexts/realm-context"

export function RealmSwitcher() {
  const { user, activeRealm, availableRealms, switchRealm } = useRealm()
  const [isLoading, setIsLoading] = useState(false)

  const handleRealmSwitch = async (realmId: string) => {
    setIsLoading(true)
    await switchRealm(realmId)
    setIsLoading(false)
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 hover:from-indigo-100 hover:to-purple-100"
        >
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-900">
              {activeRealm ? activeRealm.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Select Realm"}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-indigo-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-indigo-600" />
          <span>Available Realms</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {availableRealms.map((realm) => (
          <DropdownMenuItem
            key={realm}
            onClick={() => handleRealmSwitch(realm)}
            className="flex items-center justify-between cursor-pointer"
            disabled={isLoading}
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <span>{realm.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
            </div>
            {activeRealm === realm && <Badge className="bg-indigo-600 text-white text-xs">Active</Badge>}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/realm" className="flex items-center space-x-2 cursor-pointer">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>Realm Portal</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
