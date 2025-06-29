"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserControlPanel } from "./user-control-panel"
import { PlatformControlPanel } from "./platform-control-panel"
import { User, Server, Shield } from "lucide-react"

interface ControlPanelManagerProps {
  userRole?: "admin" | "moderator" | "user"
  className?: string
}

export function ControlPanelManager({ userRole = "user", className }: ControlPanelManagerProps) {
  const [activeTab, setActiveTab] = React.useState("user")

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            User Controls
          </TabsTrigger>
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            Platform Controls
            {userRole !== "user" && <Shield className="h-3 w-3 text-emerald-500" />}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="mt-6">
          <UserControlPanel />
        </TabsContent>

        <TabsContent value="platform" className="mt-6">
          <PlatformControlPanel userRole={userRole} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
