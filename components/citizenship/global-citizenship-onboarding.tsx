import { useGlobalCitizenship } from "@/lib/hooks/use-global-citizenship"

export default function GlobalCitizenshipOnboarding() {
  const { currentCitizen } = useGlobalCitizenship()

  if (!currentCitizen) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-xl font-semibold tracking-tight">Welcome to Global Citizenship&nbsp;Onboarding</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Select your participant type below to begin the registration workflow.
        </p>
        {/* existing onboarding start buttons already rendered further down */}
      </div>
    )
  }

  return (
    <div>
      {/* rest of code here */}
      Global Citizenship Onboarding Content
    </div>
  )
}
