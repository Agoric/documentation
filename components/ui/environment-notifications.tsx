"use client"
import { Bell } from "lucide-react"
import { useEnvironmentNotifications } from "@/hooks/use-environment-notifications"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

/**
 * Lists unread notifications for the current environment.
 */
export function EnvironmentNotifications() {
  const pathname = usePathname()
  const { getNotificationsForPath, markAllRead } = useEnvironmentNotifications()
  const notifications = getNotificationsForPath(pathname)

  if (notifications.length === 0) return null

  return (
    <div className="px-4 py-3 flex flex-col gap-2">
      <div className="flex items-center gap-2 font-medium text-sm">
        <Bell className="h-4 w-4" /> Notifications
        <Button size="xs" variant="ghost" className="ml-auto text-xs" onClick={() => markAllRead(pathname)}>
          Mark all read
        </Button>
      </div>

      {notifications.slice(0, 5).map((n) => (
        <div key={n.id} className="text-xs rounded-md bg-white/5 p-2 flex flex-col gap-0.5">
          <span className="font-medium">{n.title}</span>
          <span className="opacity-80">{n.message}</span>
        </div>
      ))}
    </div>
  )
}
