import { useGlobalCitizenship } from "@/lib/citizenship/use-global-citizenship"

export const CitizenProfileDashboard = () => {
  const { currentCitizen } = useGlobalCitizenship()

  // Guard: if no current citizen yet, show a placeholder instead of crashing
  if (!currentCitizen) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h2 className="text-2xl font-semibold">No active citizenship profile found</h2>
        <p className="mt-2 text-muted-foreground">
          Start the registration process to create your global-citizen profile.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Example usage of currentCitizen - replace with actual dashboard content */}
      <h1>Welcome, {currentCitizen.firstName}</h1>
      <p>Email: {currentCitizen.email}</p>
    </div>
  )
}
