import { SetupWizard } from "@/components/snap-dax/setup-wizard"

export default function SnapDaxSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            SnappAiFi DAX Setup
          </h1>
          <p className="text-gray-600 mt-2">Initialize your Digital Asset Exchange with government-backed QGI bonds</p>
        </div>
        <SetupWizard />
      </div>
    </div>
  )
}
