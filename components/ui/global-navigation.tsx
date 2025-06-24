"use client"

import { EnvironmentDropdown } from "./environment-dropdown"

export function GlobalNavigation() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <EnvironmentDropdown />
    </div>
  )
}
