import { HolographicBackground } from "@/components/ui/holographic-background"

const DaxDashboardClient = () => {
  return (
    <HolographicBackground variant="dashboard">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Your dashboard content goes here */}
        <h1>DAX Dashboard</h1>
        <p>Welcome to the DAX Dashboard!</p>
      </div>
    </HolographicBackground>
  )
}

export default DaxDashboardClient
