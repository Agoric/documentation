"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

/*  ⬇  Defer to the client so SSR never sends an empty (`null`) element. */
const ProductManagerAI = dynamic<ComponentType>(() => import("@/components/ai/product-manager-ai"), {
  ssr: false,
  loading: () => null,
})

export default function AIProductManagerPage() {
  return <ProductManagerAI />
}
