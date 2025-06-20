import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, BarChart3, TrendingUp } from "lucide-react"

export default function ReportsPage() {
  return (
    <DashboardLayout breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Reports" }]}>
      <div className="grid gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-sm text-indigo-600">View and export system reports</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Total Reports</h3>
                <p className="text-2xl font-bold">24</p>
              </div>
              <FileText className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">This Month</h3>
                <p className="text-2xl font-bold">8</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Growth</h3>
                <p className="text-2xl font-bold">+12%</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-900">Monthly Reports</CardTitle>
              <CardDescription>Download monthly performance reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-indigo-100 rounded-lg">
                <span className="font-medium">December 2024</span>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border border-indigo-100 rounded-lg">
                <span className="font-medium">November 2024</span>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-900">Analytics Reports</CardTitle>
              <CardDescription>Detailed analytics and insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-indigo-100 rounded-lg">
                <span className="font-medium">User Analytics</span>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border border-indigo-100 rounded-lg">
                <span className="font-medium">Performance Metrics</span>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
