"use client"

import { useState } from "react"
import { usePortal } from "@/contexts/portal-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Crown, User, Building2, ChevronDown, Shield, Zap, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

const portalIcons = {
  imperial: Crown,
  citizen: User,
  vendor: Building2,
}

export function PortalSwitcher() {
  const { currentPortal, portalConfig, getUserPortalAccess, switchPortal } = usePortal()
  const [isOpen, setIsOpen] = useState(false)
  const [switching, setSwitching] = useState(false)

  const allowedPortals = getUserPortalAccess()
  const CurrentIcon = portalIcons[currentPortal]

  const handlePortalSwitch = async (portal: typeof currentPortal) => {
    if (portal === currentPortal) return

    setSwitching(true)
    const success = await switchPortal(portal)
    if (success) {
      setIsOpen(false)
      // Add a small delay for visual feedback
      setTimeout(() => setSwitching(false), 500)
    } else {
      setSwitching(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-gradient-to-r backdrop-blur-sm border-white/20 hover:border-white/40 transition-all duration-300",
            portalConfig[currentPortal].color,
            "text-white hover:text-white",
          )}
        >
          <CurrentIcon className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{portalConfig[currentPortal].name}</span>
          <span className="sm:hidden">{portalConfig[currentPortal].icon}</span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-sm border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Portal Selection
          </DialogTitle>
          <DialogDescription>
            Choose your access portal to navigate different areas of the Snapifi platform
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {allowedPortals.map((portalKey) => {
            const portal = portalConfig[portalKey]
            const Icon = portalIcons[portalKey]
            const isActive = currentPortal === portalKey
            const isImperial = portalKey === "imperial"
            const isCitizen = portalKey === "citizen"
            const isVendor = portalKey === "vendor"

            return (
              <Card
                key={portalKey}
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:scale-105 border-white/20 backdrop-blur-sm",
                  isActive
                    ? `bg-gradient-to-br ${portal.color} border-white/40 shadow-lg`
                    : "bg-background/50 hover:bg-background/70 hover:border-white/30",
                )}
                onClick={() => handlePortalSwitch(portalKey)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-primary")} />
                      <span className={cn("text-sm", isActive ? "text-white" : "text-foreground")}>{portal.name}</span>
                    </div>
                    {isActive && (
                      <Badge variant="secondary" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className={cn(isActive ? "text-white/80" : "text-muted-foreground")}>
                    {portal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {isImperial && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Shield className="h-3 w-3" />
                          <span className={isActive ? "text-white/90" : "text-muted-foreground"}>
                            System Administration
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Zap className="h-3 w-3" />
                          <span className={isActive ? "text-white/90" : "text-muted-foreground"}>Backend Controls</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Crown className="h-3 w-3" />
                          <span className={isActive ? "text-white/90" : "text-muted-foreground"}>
                            Imperial Authority
                          </span>
                        </div>
                      </div>
                    )}

                    {isCitizen && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <User className="h-3 w-3" />
                          <span className={isActive ? "text-white/90" : "text-muted-foreground"}>
                            Personal Dashboard
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Shield className="h-3 w-3" />
                          <span className={isActive ? "text-white/90" : "text-muted-foreground"}>
                            Financial Services
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Zap className="h-3 w-3" />
                          <span className={isActive ? "text-white/90" : "text-muted-foreground"}>AI-Powered Tools</span>
                        </div>
                      </div>
                    )}

                    {isVendor && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Building2 className="h-3 w-3" />
                          <span className={isActive ? "text-white/90" : "text-muted-foreground"}>Business Portal</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Shield className="h-3 w-3" />
                          <span className={isActive ? "text-white/90" : "text-muted-foreground"}>Partner Services</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Zap className="h-3 w-3" />
                          <span className={isActive ? "text-white/90" : "text-muted-foreground"}>
                            Third-Party Integration
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {switching && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              Switching portals...
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
