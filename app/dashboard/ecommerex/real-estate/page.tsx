import { PageWrapper } from "@/components/layout/page-wrapper"
import { RealEstateMarketplace } from "./RealEstateMarketplace"
import { ZillowApiStatus } from "@/components/ecommerex/zillow-api-status"

export default function Page() {
  return (
    <PageWrapper title="Real Estate">
      <ZillowApiStatus />
      <RealEstateMarketplace />
    </PageWrapper>
  )
}
