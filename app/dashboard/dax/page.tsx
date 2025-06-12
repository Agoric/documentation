import type { Metadata } from "next"
import DaxDashboardClient from "./DaxDashboardClient"

export const metadata: Metadata = {
  title: "DAX Dashboard",
  description: "Digital Asset Exchange Dashboard",
}

export default function DaxPage() {
  return (
    <div className="container mx-auto py-6">
      <DaxDashboardClient />
    </div>
  )
}
