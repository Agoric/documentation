import { createHash, randomBytes } from "crypto"

export interface DigitalSignatureRequest {
  documentId: string
  signerId: string
  signerName: string
  signerRole: string
  signerEmail: string
  requiresWitness: boolean
  witnessId?: string
  expiresAt: number
}

export interface SignatureVerification {
  isValid: boolean
  signedAt: number
  signerId: string
  documentHash: string
  certificateChain: string[]
  trustLevel: "low" | "medium" | "high" | "legal"
}

export interface DigitalCertificate {
  id: string
  subjectName: string
  issuerName: string
  serialNumber: string
  validFrom: number
  validTo: number
  publicKey: string
  keyUsage: string[]
  certificateType: "personal" | "organizational" | "legal" | "government"
  trustLevel: number
}

interface DigitalSignature {
  signerId: string
  signerName: string
  signerRole: string
  timestamp: number
  signature: string
  publicKey: string
  verified: boolean
}

class DigitalSignatureSystem {
  private certificates: Map<string, DigitalCertificate> = new Map()
  private signatures: Map<string, DigitalSignature> = new Map()
  private pendingRequests: Map<string, DigitalSignatureRequest> = new Map()

  async createSignatureRequest(request: Omit<DigitalSignatureRequest, "expiresAt">): Promise<string> {
    const requestId = this.generateRequestId()
    const signatureRequest: DigitalSignatureRequest = {
      ...request,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }

    this.pendingRequests.set(requestId, signatureRequest)

    // Send notification to signer
    await this.sendSignatureNotification(signatureRequest)

    return requestId
  }

  async signDocument(requestId: string, privateKey: string, passphrase?: string): Promise<DigitalSignature> {
    const request = this.pendingRequests.get(requestId)
    if (!request) {
      throw new Error("Signature request not found or expired")
    }

    if (Date.now() > request.expiresAt) {
      throw new Error("Signature request has expired")
    }

    // Get document hash
    const documentHash = await this.getDocumentHash(request.documentId)

    // Create signature
    const signature: DigitalSignature = {
      signerId: request.signerId,
      signerName: request.signerName,
      signerRole: request.signerRole,
      timestamp: Date.now(),
      signature: await this.createSignature(documentHash, privateKey),
      publicKey: await this.getPublicKey(privateKey),
      verified: false,
    }

    // Verify signature immediately
    const verification = await this.verifySignature(signature, documentHash)
    signature.verified = verification.isValid

    this.signatures.set(requestId, signature)
    this.pendingRequests.delete(requestId)

    return signature
  }

  async verifySignature(signature: DigitalSignature, documentHash: string): Promise<SignatureVerification> {
    try {
      // Simulate signature verification
      const isValid = await this.cryptographicVerification(signature, documentHash)

      // Check certificate validity
      const certificate = await this.getCertificateByPublicKey(signature.publicKey)
      const certificateValid = certificate && this.isCertificateValid(certificate)

      return {
        isValid: isValid && certificateValid,
        signedAt: signature.timestamp,
        signerId: signature.signerId,
        documentHash,
        certificateChain: certificate ? [certificate.id] : [],
        trustLevel: this.calculateTrustLevel(certificate),
      }
    } catch (error) {
      return {
        isValid: false,
        signedAt: signature.timestamp,
        signerId: signature.signerId,
        documentHash,
        certificateChain: [],
        trustLevel: "low",
      }
    }
  }

  async createCertificate(request: {
    subjectName: string
    organizationName?: string
    email: string
    certificateType: "personal" | "organizational" | "legal" | "government"
    validityPeriod: number // in days
  }): Promise<DigitalCertificate> {
    const certificate: DigitalCertificate = {
      id: this.generateCertificateId(),
      subjectName: request.subjectName,
      issuerName: "Horizon Legal Authority",
      serialNumber: this.generateSerialNumber(),
      validFrom: Date.now(),
      validTo: Date.now() + request.validityPeriod * 24 * 60 * 60 * 1000,
      publicKey: this.generatePublicKey(),
      keyUsage: ["digitalSignature", "nonRepudiation", "keyEncipherment"],
      certificateType: request.certificateType,
      trustLevel: this.calculateInitialTrustLevel(request.certificateType),
    }

    this.certificates.set(certificate.id, certificate)
    return certificate
  }

  async getCertificate(id: string): Promise<DigitalCertificate | null> {
    return this.certificates.get(id) || null
  }

  async revokeCertificate(id: string, reason: string): Promise<void> {
    const certificate = this.certificates.get(id)
    if (certificate) {
      certificate.validTo = Date.now()
      // Add to certificate revocation list
      await this.addToCRL(id, reason)
    }
  }

  private async getDocumentHash(documentId: string): Promise<string> {
    // Simulate getting document hash from blockchain registry
    return createHash("sha256").update(`document_${documentId}`).digest("hex")
  }

  private async createSignature(documentHash: string, privateKey: string): Promise<string> {
    // Simulate digital signature creation
    const data = documentHash + privateKey
    return createHash("sha256").update(data).digest("hex")
  }

  private async getPublicKey(privateKey: string): Promise<string> {
    // Simulate public key derivation
    return createHash("sha256")
      .update(privateKey + "public")
      .digest("hex")
  }

  private async cryptographicVerification(signature: DigitalSignature, documentHash: string): Promise<boolean> {
    // Simulate cryptographic verification
    const expectedSignature = createHash("sha256")
      .update(documentHash + "derived_private_key")
      .digest("hex")
    return signature.signature.length === expectedSignature.length
  }

  private async getCertificateByPublicKey(publicKey: string): Promise<DigitalCertificate | null> {
    return Array.from(this.certificates.values()).find((cert) => cert.publicKey === publicKey) || null
  }

  private isCertificateValid(certificate: DigitalCertificate): boolean {
    const now = Date.now()
    return now >= certificate.validFrom && now <= certificate.validTo
  }

  private calculateTrustLevel(certificate: DigitalCertificate | null): "low" | "medium" | "high" | "legal" {
    if (!certificate) return "low"

    switch (certificate.certificateType) {
      case "government":
        return "legal"
      case "legal":
        return "legal"
      case "organizational":
        return "high"
      case "personal":
        return "medium"
      default:
        return "low"
    }
  }

  private calculateInitialTrustLevel(type: string): number {
    switch (type) {
      case "government":
        return 100
      case "legal":
        return 95
      case "organizational":
        return 80
      case "personal":
        return 60
      default:
        return 30
    }
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${randomBytes(8).toString("hex")}`
  }

  private generateCertificateId(): string {
    return `cert_${Date.now()}_${randomBytes(8).toString("hex")}`
  }

  private generateSerialNumber(): string {
    return randomBytes(16).toString("hex").toUpperCase()
  }

  private generatePublicKey(): string {
    return randomBytes(32).toString("hex")
  }

  private async sendSignatureNotification(request: DigitalSignatureRequest): Promise<void> {
    // Simulate sending notification
    console.log(`Signature request sent to ${request.signerEmail}`)
  }

  private async addToCRL(certificateId: string, reason: string): Promise<void> {
    // Simulate adding to Certificate Revocation List
    console.log(`Certificate ${certificateId} revoked: ${reason}`)
  }
}

export const digitalSignatureSystem = new DigitalSignatureSystem()
