\`\`\`tsx
import { useGlobalCitizenship } from "../../citizenship/GlobalCitizenshipContext"

const ImperiumStatusBar: React.FC = () => {
  const { currentCitizen } = useGlobalCitizenship()

  // 👉 If no active citizen yet, render nothing (or a minimal placeholder)
  //    instead of accessing currentCitizen.type and crashing.
  if (!currentCitizen) {
    return null // or you can show a spinner / “Guest” label
  }

  return (
    <div>
      {/* Imperium Status Bar Content */}
      <p>Citizen Type: {currentCitizen.type}</p>
    </div>
  )
}

export default ImperiumStatusBar
\`\`\`

\`\`\`tsx
import { useGlobalCitizenship } from "../../citizenship/GlobalCitizenshipContext"

const AdaptiveRegalToolbar: React.FC = () => {
  const { currentCitizen } = useGlobalCitizenship()

  // 👉 If no active citizen yet, render nothing (or a minimal placeholder)
  //    instead of accessing currentCitizen.type and crashing.
  if (!currentCitizen) {
    return null // or you can show a spinner / “Guest” label
  }

  return (
    <div>
      {/* Adaptive Regal Toolbar Content */}
      <p>Citizen Name: {currentCitizen.name}</p>
    </div>
  )
}

export default AdaptiveRegalToolbar;
\`\`\`

\`\`\`tsx
// components/navigation/realm-navigation-toolbar.tsx
import type React from "react"
import { useGlobalCitizenship } from "../../citizenship/GlobalCitizenshipContext"

const RealmNavigationToolbar: React.FC = () => {
  const { currentCitizen } = useGlobalCitizenship()

  // 👉 If no active citizen yet, render nothing (or a minimal placeholder)
  //    instead of accessing currentCitizen.type and crashing.
  if (!currentCitizen) {
    return null // or you can show a spinner / “Guest” label
  }

  return (
    <div>
      {/* Realm Navigation Toolbar Content */}
      <p>Citizen ID: {currentCitizen.id}</p>
    </div>
  )
}

export default RealmNavigationToolbar;
\`\`\`
