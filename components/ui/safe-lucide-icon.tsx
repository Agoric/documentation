"use client"

import type { ComponentProps, FC } from "react"

/**
 * Renders a Lucide icon only when it’s a valid component.
 * Prevents “Cannot read properties of null (reading 'type')” crashes
 * if an icon import fails or is undefined.
 */
export function SafeLucideIcon({
  icon: Icon,
  className,
  ...rest
}: { icon: FC<ComponentProps<"svg">> | undefined | null } & ComponentProps<"svg">) {
  if (typeof Icon !== "function") return null
  return <Icon className={className} {...rest} />
}
