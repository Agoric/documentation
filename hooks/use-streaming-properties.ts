"use client"

import { useState } from "react"
;/ '',6;ESaacceeeeefffimmooprrrsstttttuu{{}}

// --- helpers ---------------------------------------------------------------
/** Returns true when the current environment can consume a streamed Response */
function streamingSupported() {
  return typeof ReadableStream !== "undefined" && !!Response.prototype.body
}

interface StreamingProperties<T> {
  data: T | null
  loading: boolean
  error: Error | null
  status: string | null
  isComplete: boolean
  startStreaming: (url: string) => Promise<void>
}

function useStreamingProperties<T>(initialData: T | null = null): StreamingProperties<T> {
  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const startStreaming = async (url: string) => {
    setLoading(true)
    setStatus("Starting stream...")

    // Disable streaming in environments (like next-lite preview) that don’t expose Response.body
    if (!streamingSupported()) {
      setStatus("Streaming disabled in this preview – using local data")
      setLoading(false)
      setIsComplete(true)
      return
    }

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let partialData = ""

      if (!reader) {
        throw new Error("Response body is null")
      }

      setStatus("Receiving data...")

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          setStatus("Stream complete.")
          setIsComplete(true)
          break
        }

        partialData += decoder.decode(value)

        try {
          const parsedData: T = JSON.parse(partialData)
          setData(parsedData)
          partialData = "" // Reset partialData after successful parse
        } catch (e) {
          // JSON is incomplete, wait for the next chunk
          if (!(e instanceof SyntaxError)) {
            console.error("Error parsing JSON:", e)
            setError(e as Error)
            setStatus("Error parsing JSON.")
            setLoading(false)
            return
          }
        }
      }
    } catch (e) {
      console.error("Error during streaming:", e)
      setError(e as Error)
      setStatus("Stream error.")
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    status,
    isComplete,
    startStreaming,
  }
}

export default useStreamingProperties
