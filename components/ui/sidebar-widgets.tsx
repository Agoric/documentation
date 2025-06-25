"use client"

import * as React from "react"
import {
  Activity,
  BarChart3,
  Bitcoin,
  Cloud,
  DollarSign,
  Eye,
  EyeOff,
  Plus,
  Settings,
  TrendingUp,
  Users,
  Zap,
  AlertTriangle,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSidebarWidgets, type Widget, type WidgetType } from "@/hooks/use-sidebar-widgets"

const widgetTypes: WidgetType[] = [
  {
    id: "stats",
    name: "Quick Stats",
    description: "Display key platform statistics",
    icon: BarChart3,
    defaultConfig: { showUsers: true, showRevenue: true, showUptime: true },
    sizes: ["small", "medium", "large"],
  },
  {
    id: "status",
    name: "System Status",
    description: "Monitor system health and services",
    icon: Zap,
    defaultConfig: { showServices: true, showAlerts: true },
    sizes: ["small", "medium"],
  },
  {
    id: "activity",
    name: "Recent Activity",
    description: "Show recent platform activity",
    icon: Activity,
    defaultConfig: { maxItems: 5, showTimestamps: true },
    sizes: ["medium", "large"],
  },
  {
    id: "weather",
    name: "Weather",
    description: "Current weather information",
    icon: Cloud,
    defaultConfig: { location: "New York", unit: "celsius" },
    sizes: ["small", "medium"],
  },
  {
    id: "crypto",
    name: "Crypto Prices",
    description: "Cryptocurrency price tracker",
    icon: Bitcoin,
    defaultConfig: { coins: ["BTC", "ETH", "ADA"], showChange: true },
    sizes: ["medium", "large"],
  },
]

// Widget Components
function StatsWidget({ widget }: { widget: Widget }) {
  const stats = [
    { label: "Users", value: "12,543", icon: Users, show: widget.config.showUsers },
    { label: "Revenue", value: "$45.2K", icon: DollarSign, show: widget.config.showRevenue },
    { label: "Uptime", value: "99.9%", icon: TrendingUp, show: widget.config.showUptime },
  ].filter((stat) => stat.show)

  return (
    <div className="space-y-2">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <stat.icon className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
          <span className="text-sm font-medium">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}

function StatusWidget({ widget }: { widget: Widget }) {
  const services = [
    { name: "API", status: "online", color: "text-green-500" },
    { name: "Database", status: "online", color: "text-green-500" },
    { name: "Cache", status: "warning", color: "text-yellow-500" },
  ]

  const alerts = [
    { message: "High CPU usage", severity: "warning" },
    { message: "Disk space low", severity: "critical" },
  ]

  return (
    <div className="space-y-3">
      {widget.config.showServices && (
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-muted-foreground">Services</h4>
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <span className="text-xs">{service.name}</span>
              <div className={cn("h-2 w-2 rounded-full", service.color.replace("text-", "bg-"))} />
            </div>
          ))}
        </div>
      )}

      {widget.config.showAlerts && alerts.length > 0 && (
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-muted-foreground">Alerts</h4>
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-center gap-2">
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
              <span className="text-xs">{alert.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ActivityWidget({ widget }: { widget: Widget }) {
  const activities = [
    { action: "User login", user: "john@example.com", time: "2m ago" },
    { action: "New transaction", user: "alice@example.com", time: "5m ago" },
    { action: "System backup", user: "system", time: "1h ago" },
    { action: "User registration", user: "bob@example.com", time: "2h ago" },
    { action: "Password reset", user: "carol@example.com", time: "3h ago" },
  ].slice(0, widget.config.maxItems)

  return (
    <div className="space-y-2">
      {activities.map((activity, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">{activity.action}</span>
            {widget.config.showTimestamps && <span className="text-xs text-muted-foreground">{activity.time}</span>}
          </div>
          <span className="text-xs text-muted-foreground">{activity.user}</span>
        </div>
      ))}
    </div>
  )
}

function WeatherWidget({ widget }: { widget: Widget }) {
  const weather = {
    location: widget.config.location,
    temperature: widget.config.unit === "celsius" ? "22°C" : "72°F",
    condition: "Partly Cloudy",
    icon: Sun,
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">{weather.location}</div>
          <div className="text-xs text-muted-foreground">{weather.condition}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{weather.temperature}</div>
          <weather.icon className="h-4 w-4 ml-auto" />
        </div>
      </div>
    </div>
  )
}

function CryptoWidget({ widget }: { widget: Widget }) {
  const prices = [
    { symbol: "BTC", price: "$43,250", change: "+2.5%" },
    { symbol: "ETH", price: "$2,680", change: "-1.2%" },
    { symbol: "ADA", price: "$0.45", change: "+5.8%" },
  ].filter((coin) => widget.config.coins.includes(coin.symbol))

  return (
    <div className="space-y-2">
      {prices.map((coin) => (
        <div key={coin.symbol} className="flex items-center justify-between">
          <span className="text-xs font-medium">{coin.symbol}</span>
          <div className="text-right">
            <div className="text-xs">{coin.price}</div>
            {widget.config.showChange && (
              <div className={cn("text-xs", coin.change.startsWith("+") ? "text-green-500" : "text-red-500")}>
                {coin.change}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function WidgetRenderer({ widget }: { widget: Widget }) {
  const components = {
    stats: StatsWidget,
    status: StatusWidget,
    activity: ActivityWidget,
    weather: WeatherWidget,
    crypto: CryptoWidget,
  }

  const Component = components[widget.type as keyof typeof components]
  if (!Component) return null

  return <Component widget={widget} />
}

function WidgetCard({
  widget,
  onEdit,
  onToggle,
  onRemove,
}: {
  widget: Widget
  onEdit: (widget: Widget) => void
  onToggle: (widgetId: string) => void
  onRemove: (widgetId: string) => void
}) {
  return (
    <Card
      className={cn(
        "bg-background/50 border-white/10 transition-all duration-200",
        widget.size === "small" && "min-h-[120px]",
        widget.size === "medium" && "min-h-[160px]",
        widget.size === "large" && "min-h-[200px]",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">{widget.title}</CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => onToggle(widget.id)}>
              {widget.enabled ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Settings className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Widget: {widget.title}</DialogTitle>
                </DialogHeader>
                <WidgetEditor widget={widget} onSave={onEdit} onRemove={onRemove} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {widget.enabled ? (
          <WidgetRenderer widget={widget} />
        ) : (
          <div className="flex items-center justify-center h-16 text-muted-foreground">
            <EyeOff className="h-4 w-4 mr-2" />
            <span className="text-sm">Widget disabled</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function WidgetEditor({
  widget,
  onSave,
  onRemove,
}: {
  widget: Widget
  onSave: (widget: Widget) => void
  onRemove: (widgetId: string) => void
}) {
  const [editedWidget, setEditedWidget] = React.useState(widget)

  const handleSave = () => {
    onSave(editedWidget)
  }

  const handleConfigChange = (key: string, value: any) => {
    setEditedWidget({
      ...editedWidget,
      config: { ...editedWidget.config, [key]: value },
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="widget-title">Title</Label>
        <Input
          id="widget-title"
          value={editedWidget.title}
          onChange={(e) => setEditedWidget({ ...editedWidget, title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="widget-size">Size</Label>
        <Select
          value={editedWidget.size}
          onValueChange={(value: "small" | "medium" | "large") => setEditedWidget({ ...editedWidget, size: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Widget-specific configuration */}
      {widget.type === "stats" && (
        <div className="space-y-3">
          <Label>Display Options</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-users">Show Users</Label>
              <Switch
                id="show-users"
                checked={editedWidget.config.showUsers}
                onCheckedChange={(checked) => handleConfigChange("showUsers", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-revenue">Show Revenue</Label>
              <Switch
                id="show-revenue"
                checked={editedWidget.config.showRevenue}
                onCheckedChange={(checked) => handleConfigChange("showRevenue", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-uptime">Show Uptime</Label>
              <Switch
                id="show-uptime"
                checked={editedWidget.config.showUptime}
                onCheckedChange={(checked) => handleConfigChange("showUptime", checked)}
              />
            </div>
          </div>
        </div>
      )}

      {widget.type === "weather" && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="weather-location">Location</Label>
            <Input
              id="weather-location"
              value={editedWidget.config.location}
              onChange={(e) => handleConfigChange("location", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weather-unit">Temperature Unit</Label>
            <Select value={editedWidget.config.unit} onValueChange={(value) => handleConfigChange("unit", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="celsius">Celsius</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="destructive" onClick={() => onRemove(widget.id)}>
          Remove Widget
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}

interface SidebarWidgetsProps {
  className?: string
}

export function SidebarWidgets({ className }: SidebarWidgetsProps) {
  const { widgets, enabledWidgets, toggleWidget, updateWidget, addWidget, removeWidget, resetWidgets } =
    useSidebarWidgets()

  const handleAddWidget = (type: string) => {
    const widgetType = widgetTypes.find((t) => t.id === type)
    if (widgetType) {
      addWidget(type, widgetType.defaultConfig)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Widget Management Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Widgets</h3>
        <div className="flex items-center gap-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Widget</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                {widgetTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant="outline"
                    className="justify-start h-auto p-3"
                    onClick={() => handleAddWidget(type.id)}
                  >
                    <type.icon className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={resetWidgets}>
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Enabled Widgets */}
      <div className="space-y-3">
        {enabledWidgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            onEdit={updateWidget}
            onToggle={toggleWidget}
            onRemove={removeWidget}
          />
        ))}
      </div>

      {/* Empty State */}
      {enabledWidgets.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No widgets enabled</p>
          <p className="text-xs">Click the + button to add widgets</p>
        </div>
      )}
    </div>
  )
}
