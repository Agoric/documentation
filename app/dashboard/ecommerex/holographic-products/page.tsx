import { ProductComparisonProvider } from "@/contexts/product-comparison-context"
import { HolographicProductsDashboard } from "./HolographicProductsDashboard"

export default function HolographicProductsPage() {
  return (
    <ProductComparisonProvider>
      <HolographicProductsDashboard />
    </ProductComparisonProvider>
  )
}
