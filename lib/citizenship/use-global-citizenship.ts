/**
 * Re-export the `useGlobalCitizenship` hook so components can import it
 * from "@/lib/citizenship/use-global-citizenship" without breaking.
 *
 * Keeping this thin re-export avoids scattered path changes and lets
 * IntelliSense continue to resolve the alias correctly.
 */
export { useGlobalCitizenship } from "@/contexts/global-citizenship-context"
