"use client"

import { cn } from "@/lib/utils"

/**
 * A slim banner that appears at the very top of the page.
 * It can be toggled or styled further but, out-of-the-box,
 * it simply advertises that the user is viewing a demo build.
 */
export function DemoBanner({
  className,
  message = "You are viewing the live demo build – features and data are for demonstration only.",
}: {
  className?: string
  message?: string
}) {
  return (
    <div
      className={cn(
        "w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400",
        "py-2 px-3 text-center text-sm font-medium text-white shadow-md",
        className,
      )}
      role="status"
    >
      {message}
    </div>
  )
}

/* optional default export so consumers can `import DemoBanner from ...` */
export default DemoBanner
