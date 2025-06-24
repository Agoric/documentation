import { createHash } from "crypto"

export interface LegalDocument {
  id: string
  title: string
  type: "agreement" | "treaty" | "regulation" | "policy"
  jurisdiction: string[]
  content: string
  hash: string
  timestamp: number
  signatures: DigitalSignature[]
  version: number
  status: "draft" | "active" | "superseded" | "revoked"
}

export interface DigitalSignature {
  signerId: string
  signerName: string
  signerRole: string
  timestamp: number
  signature: string
  publicKey: string
  verified: boolean
}

export interface BlockchainTransaction {
  txHash: string
  blockNumber: number
  timestamp: number
  gasUsed: number
  status: "pending" | "confirmed" | "failed"
}

class BlockchainLegalRegistry {
  private documents: Map<string, LegalDocument> = new Map()
  private transactions: Map<string, BlockchainTransaction> = new Map()

  async storeDocument(document: Omit<LegalDocument, "id" | "hash" | "timestamp">): Promise<string> {
    const id = this.generateDocumentId()
    const hash = this.calculateDocumentHash(document.content)
    const timestamp = Date.now()

    const legalDoc: LegalDocument = {
      ...document,
      id,
      hash,
      timestamp,
      signatures: [],
    }

    // Simulate blockchain storage
    const txHash = await this.submitToBlockchain(legalDoc)
    this.documents.set(id, legalDoc)

    return id
  }

  async getDocument(id: string): Promise<LegalDocument | null> {
    return this.documents.get(id) || null
  }

  async verifyDocument(id: string): Promise<boolean> {
    const document = this.documents.get(id)
    if (!document) return false

    const currentHash = this.calculateDocumentHash(document.content)
    return currentHash === document.hash
  }

  async getDocumentsByJurisdiction(jurisdiction: string): Promise<LegalDocument[]> {
    return Array.from(this.documents.values()).filter((doc) => doc.jurisdiction.includes(jurisdiction))
  }

  async addSignature(documentId: string, signature: DigitalSignature): Promise<boolean> {
    const document = this.documents.get(documentId)
    if (!document) return false

    // Verify signature
    const isValid = await this.verifyDigitalSignature(signature, document.hash)
    if (!isValid) return false

    signature.verified = true
    document.signatures.push(signature)

    // Update on blockchain
    await this.updateDocumentOnBlockchain(document)
    return true
  }

  private generateDocumentId(): string {
    return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private calculateDocumentHash(content: string): string {
    return createHash("sha256").update(content).digest("hex")
  }

  private async submitToBlockchain(document: LegalDocument): Promise<string> {
    // Simulate blockchain transaction
    const txHash = `0x${Math.random().toString(16).substr(2, 64)}`
    const transaction: BlockchainTransaction = {
      txHash,
      blockNumber: Math.floor(Math.random() * 1000000),
      timestamp: Date.now(),
      gasUsed: Math.floor(Math.random() * 100000),
      status: "pending",
    }

    this.transactions.set(txHash, transaction)

    // Simulate confirmation after 3 seconds
    setTimeout(() => {
      transaction.status = "confirmed"
    }, 3000)

    return txHash
  }

  private async updateDocumentOnBlockchain(document: LegalDocument): Promise<void> {
    // Simulate blockchain update
    await this.submitToBlockchain(document)
  }

  private async verifyDigitalSignature(signature: DigitalSignature, documentHash: string): Promise<boolean> {
    // Simulate signature verification
    return signature.signature.length > 0 && signature.publicKey.length > 0
  }
}

export const blockchainRegistry = new BlockchainLegalRegistry()
