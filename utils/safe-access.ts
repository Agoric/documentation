// Utility functions for safe property access
export function safeAccess<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  return obj?.[key]
}

export function safeTypeAccess(item: any): string {
  if (!item) return "unknown"
  if (typeof item.type === "string") return item.type
  if (typeof item.type === "number") return item.type.toString()
  return "unknown"
}

export function validateItem(item: any): boolean {
  return item !== null && item !== undefined && typeof item === "object" && "type" in item
}
