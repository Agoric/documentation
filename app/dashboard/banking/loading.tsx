import { Skeleton } from "@/components/ui/skeleton"

export default function BankingLoading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>
      <div className="grid gap-4">
        <Skeleton className="h-[200px] rounded-xl" />
        <div className="grid grid-cols-3 gap-2 mb-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-md" />
            ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-[200px] rounded-xl" />
            ))}
        </div>
      </div>
    </div>
  )
}
