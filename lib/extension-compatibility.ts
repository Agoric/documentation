// Chrome Extension Compatibility Layer
export class ExtensionCompatibilityManager {
  private static instance: ExtensionCompatibilityManager
  private extensionDetected = false
  private conflictingExtensions: string[] = []

  static getInstance(): ExtensionCompatibilityManager {
    if (!ExtensionCompatibilityManager.instance) {
      ExtensionCompatibilityManager.instance = new ExtensionCompatibilityManager()
    }
    return ExtensionCompatibilityManager.instance
  }

  // Detect problematic extensions
  detectExtensions(): void {
    if (typeof window === "undefined") return

    // Check for common wallet extensions
    const extensionChecks = [
      { name: "MetaMask", check: () => !!(window as any).ethereum?.isMetaMask },
      { name: "Coinbase Wallet", check: () => !!(window as any).ethereum?.isCoinbaseWallet },
      { name: "Trust Wallet", check: () => !!(window as any).ethereum?.isTrust },
      { name: "Generic Extension", check: () => document.querySelector('script[src*="chrome-extension"]') },
    ]

    extensionChecks.forEach(({ name, check }) => {
      if (check()) {
        console.log(`Detected extension: ${name}`)
        this.extensionDetected = true
      }
    })
  }

  // Prevent extension conflicts
  preventConflicts(): void {
    if (typeof window === "undefined") return

    // Prevent extension script injection conflicts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            if (element.tagName === "SCRIPT" && element.getAttribute("src")?.includes("chrome-extension")) {
              console.warn("Extension script detected, applying compatibility fixes")
              this.applyCompatibilityFixes()
            }
          }
        })
      })
    })

    observer.observe(document.head, { childList: true, subtree: true })
  }

  private applyCompatibilityFixes(): void {
    // Fix common CSS conflicts
    const style = document.createElement("style")
    style.textContent = `
      /* Prevent extension CSS from affecting our dashboard */
      .horizon-dashboard * {
        box-sizing: border-box !important;
      }
      
      /* Ensure our modals stay on top */
      [data-radix-portal] {
        z-index: 999999 !important;
      }
      
      /* Prevent extension overlays from blocking our UI */
      body > div[style*="position: fixed"] {
        pointer-events: none !important;
      }
      
      body > div[style*="position: fixed"] * {
        pointer-events: auto !important;
      }
    `
    document.head.appendChild(style)
  }

  // Safe wallet integration
  async connectWallet(): Promise<any> {
    if (typeof window === "undefined") return null

    try {
      const ethereum = (window as any).ethereum
      if (!ethereum) {
        throw new Error("No wallet extension detected")
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      return { accounts, provider: ethereum }
    } catch (error) {
      console.error("Wallet connection failed:", error)
      return null
    }
  }
}

export const extensionManager = ExtensionCompatibilityManager.getInstance()
