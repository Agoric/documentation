import { DAXAIAssistant } from "@/components/dax-admin/dax-ai-assistant"
import { QGICreationInterface } from "@/components/dax-admin/qgi-creation-interface"
import { CitizenshipProcessor } from "@/components/dax-admin/citizenship-processor"
import { TaxBenefitsOptimizer } from "@/components/dax-admin/tax-benefits-optimizer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DAXAdminPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">DAX Administration</h1>
        <p className="text-muted-foreground">
          Manage Quantum Gains Instruments, citizenship applications, and tax benefits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="qgi" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="qgi">QGI Creation</TabsTrigger>
              <TabsTrigger value="citizenship">Citizenship</TabsTrigger>
              <TabsTrigger value="tax">Tax Benefits</TabsTrigger>
            </TabsList>
            <TabsContent value="qgi">
              <QGICreationInterface />
            </TabsContent>
            <TabsContent value="citizenship">
              <CitizenshipProcessor />
            </TabsContent>
            <TabsContent value="tax">
              <TaxBenefitsOptimizer />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <DAXAIAssistant />
        </div>
      </div>
    </div>
  )
}
