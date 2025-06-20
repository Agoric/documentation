import { PageWrapper } from "@/components/page-wrapper"
import { RealEstateMarketplace } from "@/components/ecommerex/real-estate-marketplace"
import { ZillowApiStatus } from "@/components/ecommerex/zillow-api-status"

export default function Page() {
  return (
    <PageWrapper title="Real Estate">
      <ZillowApiStatus />
      <RealEstateMarketplace />
    </PageWrapper>
  )
}
