import { type NextRequest, NextResponse } from "next/server"
import { blockchainRegistry } from "@/lib/blockchain/legal-registry"
import { treatyDatabase } from "@/lib/treaties/treaty-database"
import { multiLanguageSupport } from "@/lib/i18n/multi-language-support"
import { digitalSignatureSystem } from "@/lib/digital-signatures/signature-system"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")
  const jurisdiction = searchParams.get("jurisdiction")
  const documentId = searchParams.get("documentId")
  const language = searchParams.get("language")

  try {
    switch (action) {
      case "documents":
        if (jurisdiction) {
          const documents = await blockchainRegistry.getDocumentsByJurisdiction(jurisdiction)
          return NextResponse.json({ documents })
        }
        break

      case "treaties":
        if (jurisdiction) {
          const treaties = await treatyDatabase.getTreatiesByCountry(jurisdiction)
          return NextResponse.json({ treaties })
        }
        break

      case "translate":
        if (documentId && language) {
          const translation = await multiLanguageSupport.translateDocument(documentId, language)
          return NextResponse.json({ translation })
        }
        break

      case "verify":
        if (documentId) {
          const isValid = await blockchainRegistry.verifyDocument(documentId)
          return NextResponse.json({ isValid })
        }
        break

      case "languages":
        const languages = await multiLanguageSupport.getSupportedLanguages()
        return NextResponse.json({ languages })
        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  } catch (error) {
    console.error("Compliance API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case "store_document":
        const documentId = await blockchainRegistry.storeDocument(body.document)
        return NextResponse.json({ documentId })

      case "add_treaty":
        const treatyId = await treatyDatabase.addTreaty(body.treaty)
        return NextResponse.json({ treatyId })

      case "request_signature":
        const requestId = await digitalSignatureSystem.createSignatureRequest(body.request)
        return NextResponse.json({ requestId })

      case "sign_document":
        const signature = await digitalSignatureSystem.signDocument(body.requestId, body.privateKey, body.passphrase)
        return NextResponse.json({ signature })

      case "create_certificate":
        const certificate = await digitalSignatureSystem.createCertificate(body.request)
        return NextResponse.json({ certificate })

      case "add_translation":
        await multiLanguageSupport.addTranslation(body.translation)
        return NextResponse.json({ success: true })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Compliance API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
