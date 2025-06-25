import { DatabaseStatus } from "@/components/snap-dax/database-status"

export default function Page() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <DatabaseStatus />
      <div>
        <h1>Digital Asset Exchange</h1>
        <p>Welcome to the Digital Asset Exchange!</p>
      </div>
    </div>
  )
}
