"use client"
import { usePathname } from "next/navigation"
import { AlertTriangle, Info, CheckCircle, XCircle, Bell, X, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEnvironmentNotifications } from "@/hooks/use-environment-notifications"

export function EnvironmentNotifications() {
  const pathname = usePathname()
  const { getNotifications, markAsRead, dismissNotification } = useEnvironmentNotifications()

  const notifications = getNotifications(pathname)

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "medium":
        return <Info className="h-4 w-4 text-blue-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/10 border-red-500/20"
      case "high":
        return "bg-orange-500/10 border-orange-500/20"
      case "medium":
        return "bg-blue-500/10 border-blue-500/20"
      case "low":
        return "bg-green-500/10 border-green-500/20"
      default:
        return "bg-gray-500/10 border-gray-500/20"
    }
  }

  const handleAction = (notificationId: string, action: () => void) => {
    action()
    markAsRead(notificationId)
  }

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
          <Badge variant="secondary" className="text-xs">
            {notifications.filter((n) => !n.read).length}
          </Badge>
        </h3>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border ${getPriorityColor(notification.priority)} ${
              notification.read ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              {getPriorityIcon(notification.priority)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(notification.timestamp)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissNotification(notification.id)}
                      className="h-6 w-6 p-0 hover:bg-white/10"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                {notification.action && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAction(notification.id, notification.action!.handler)}
                    className="mt-2 h-7 text-xs hover:bg-white/10"
                  >
                    {notification.action.label}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
