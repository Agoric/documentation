import { ExtensionIntegration } from "@/components/crypto/extension-integration"
import { PageWrapper } from "@/components/layout/page-wrapper"

export default function ExtensionIntegrationPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Extension Integration</h1>
          <p className="text-muted-foreground">Manage browser extension compatibility and wallet connections</p>
        </div>

        <ExtensionIntegration />
      </div>
    </PageWrapper>
  )
}
