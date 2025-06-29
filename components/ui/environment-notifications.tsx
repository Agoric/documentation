"use client"
import { usePathname } from "next/navigation"
import { Bell, AlertTriangle, CheckCircle2, Info, X, ExternalLink, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEnvironmentNotifications } from "@/hooks/use-environment-notifications"

export function EnvironmentNotifications() {
  const pathname = usePathname()
  const { getNotifications, markAsRead, dismissNotification } = useEnvironmentNotifications()

  const notifications = getNotifications(pathname)
    .filter((n) => !n.read)
    .slice(0, 3)

  if (notifications.length === 0) {
    return null
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400"
      case "high":
        return "text-orange-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
        return AlertTriangle
      case "high":
        return Bell
      case "medium":
        return Info
      case "low":
        return CheckCircle2
      default:
        return Info
    }
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Bell className="h-4 w-4" />
        <span>Environment Notifications</span>
        <Badge variant="secondary" className="text-xs">
          {notifications.length}
        </Badge>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => {
          const IconComponent = getPriorityIcon(notification.priority)

          return (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <IconComponent className={`h-4 w-4 mt-0.5 ${getPriorityColor(notification.priority)}`} />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium text-sm">{notification.title}</div>
                  <div className="flex items-center gap-1">
                    {notification.priority === "critical" && <Zap className="h-3 w-3 text-red-400" />}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground mt-1">{notification.message}</div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{notification.timestamp}</span>
                  </div>

                  {notification.action && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs px-2"
                      onClick={() => {
                        notification.action?.onClick?.()
                        markAsRead(notification.id)
                      }}
                    >
                      {notification.action.label}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
