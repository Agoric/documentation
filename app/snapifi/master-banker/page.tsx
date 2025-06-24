import { MasterBanker } from "@/components/snapifi/master-banker"

export default function MasterBankerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Master Banker</h1>
        <p className="text-muted-foreground">
          Elite financial advisor with predictive analytics and strategic insights
        </p>
      </div>

      <div className="max-w-4xl">
        <MasterBanker />
      </div>
    </div>
  )
}
