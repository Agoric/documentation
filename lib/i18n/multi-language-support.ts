export interface Translation {
  key: string
  language: string
  text: string
  context?: string
  verified: boolean
  translator?: string
}

export interface LegalTranslation {
  documentId: string
  originalLanguage: string
  translations: Map<string, Translation[]>
  certifiedTranslations: string[]
}

export interface Language {
  code: string
  name: string
  nativeName: string
  rtl: boolean
  legalSupport: boolean
  certificationRequired: boolean
}

class MultiLanguageSupport {
  private translations: Map<string, Translation[]> = new Map()
  private legalTranslations: Map<string, LegalTranslation> = new Map()
  private supportedLanguages: Map<string, Language> = new Map()

  constructor() {
    this.initializeLanguages()
  }

  async translateDocument(documentId: string, targetLanguage: string, requireCertification = false): Promise<string> {
    const legalTranslation = this.legalTranslations.get(documentId)
    if (!legalTranslation) {
      throw new Error("Document not found for translation")
    }

    const translations = legalTranslation.translations.get(targetLanguage)
    if (!translations) {
      // Simulate AI translation
      const translatedText = await this.performAITranslation(documentId, targetLanguage)

      if (requireCertification) {
        await this.requestCertifiedTranslation(documentId, targetLanguage)
      }

      return translatedText
    }

    if (requireCertification && !legalTranslation.certifiedTranslations.includes(targetLanguage)) {
      await this.requestCertifiedTranslation(documentId, targetLanguage)
    }

    return translations.map((t) => t.text).join(" ")
  }

  async addTranslation(translation: Translation): Promise<void> {
    const key = translation.key
    const existing = this.translations.get(key) || []
    existing.push(translation)
    this.translations.set(key, existing)
  }

  async getTranslation(key: string, language: string): Promise<string | null> {
    const translations = this.translations.get(key)
    if (!translations) return null

    const translation = translations.find((t) => t.language === language && t.verified)
    return translation?.text || null
  }

  async getSupportedLanguages(): Promise<Language[]> {
    return Array.from(this.supportedLanguages.values())
  }

  async getLegalSupportedLanguages(): Promise<Language[]> {
    return Array.from(this.supportedLanguages.values()).filter((lang) => lang.legalSupport)
  }

  async validateLegalTranslation(documentId: string, language: string): Promise<boolean> {
    const legalTranslation = this.legalTranslations.get(documentId)
    if (!legalTranslation) return false

    return legalTranslation.certifiedTranslations.includes(language)
  }

  async requestCertifiedTranslation(documentId: string, targetLanguage: string): Promise<void> {
    // Simulate certified translation request
    const legalTranslation = this.legalTranslations.get(documentId)
    if (legalTranslation) {
      // Add to certified translations after "processing"
      setTimeout(() => {
        legalTranslation.certifiedTranslations.push(targetLanguage)
      }, 5000)
    }
  }

  private async performAITranslation(documentId: string, targetLanguage: string): Promise<string> {
    // Simulate AI translation
    return `[AI Translated to ${targetLanguage}] Legal document content...`
  }

  private initializeLanguages(): void {
    const languages: Language[] = [
      {
        code: "en",
        name: "English",
        nativeName: "English",
        rtl: false,
        legalSupport: true,
        certificationRequired: false,
      },
      {
        code: "es",
        name: "Spanish",
        nativeName: "Español",
        rtl: false,
        legalSupport: true,
        certificationRequired: true,
      },
      {
        code: "fr",
        name: "French",
        nativeName: "Français",
        rtl: false,
        legalSupport: true,
        certificationRequired: true,
      },
      {
        code: "de",
        name: "German",
        nativeName: "Deutsch",
        rtl: false,
        legalSupport: true,
        certificationRequired: true,
      },
      { code: "zh", name: "Chinese", nativeName: "中文", rtl: false, legalSupport: true, certificationRequired: true },
      {
        code: "ja",
        name: "Japanese",
        nativeName: "日本語",
        rtl: false,
        legalSupport: true,
        certificationRequired: true,
      },
      { code: "ar", name: "Arabic", nativeName: "العربية", rtl: true, legalSupport: true, certificationRequired: true },
      {
        code: "ru",
        name: "Russian",
        nativeName: "Русский",
        rtl: false,
        legalSupport: true,
        certificationRequired: true,
      },
      {
        code: "pt",
        name: "Portuguese",
        nativeName: "Português",
        rtl: false,
        legalSupport: true,
        certificationRequired: true,
      },
      {
        code: "it",
        name: "Italian",
        nativeName: "Italiano",
        rtl: false,
        legalSupport: true,
        certificationRequired: true,
      },
    ]

    languages.forEach((lang) => {
      this.supportedLanguages.set(lang.code, lang)
    })
  }
}

export const multiLanguageSupport = new MultiLanguageSupport()
