export interface Treaty {
  id: string
  name: string
  type: "bilateral" | "multilateral" | "regional" | "global"
  signatories: string[]
  dateSigned: string
  dateEntered: string
  status: "active" | "suspended" | "terminated" | "pending"
  subject: string[]
  text: string
  amendments: Amendment[]
  relatedTreaties: string[]
}

export interface Amendment {
  id: string
  date: string
  description: string
  affectedArticles: string[]
  status: "proposed" | "ratified" | "rejected"
}

export interface LegalFramework {
  jurisdiction: string
  treaties: string[]
  domesticLaws: string[]
  regulations: string[]
  precedents: string[]
}

class TreatyDatabase {
  private treaties: Map<string, Treaty> = new Map()
  private frameworks: Map<string, LegalFramework> = new Map()

  constructor() {
    this.initializeTreaties()
  }

  async searchTreaties(query: {
    subject?: string[]
    signatories?: string[]
    type?: string
    status?: string
  }): Promise<Treaty[]> {
    return Array.from(this.treaties.values()).filter((treaty) => {
      if (query.subject && !query.subject.some((s) => treaty.subject.includes(s))) return false
      if (query.signatories && !query.signatories.some((s) => treaty.signatories.includes(s))) return false
      if (query.type && treaty.type !== query.type) return false
      if (query.status && treaty.status !== query.status) return false
      return true
    })
  }

  async getTreaty(id: string): Promise<Treaty | null> {
    return this.treaties.get(id) || null
  }

  async getTreatiesByCountry(country: string): Promise<Treaty[]> {
    return Array.from(this.treaties.values()).filter((treaty) => treaty.signatories.includes(country))
  }

  async getLegalFramework(jurisdiction: string): Promise<LegalFramework | null> {
    return this.frameworks.get(jurisdiction) || null
  }

  async getApplicableTreaties(jurisdiction1: string, jurisdiction2: string): Promise<Treaty[]> {
    return Array.from(this.treaties.values()).filter(
      (treaty) => treaty.signatories.includes(jurisdiction1) && treaty.signatories.includes(jurisdiction2),
    )
  }

  async addTreaty(treaty: Omit<Treaty, "id">): Promise<string> {
    const id = `treaty_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newTreaty: Treaty = { ...treaty, id }
    this.treaties.set(id, newTreaty)
    return id
  }

  private initializeTreaties(): void {
    // Initialize with major international treaties
    const treaties: Omit<Treaty, "id">[] = [
      {
        name: "Vienna Convention on Diplomatic Relations",
        type: "multilateral",
        signatories: ["USA", "UK", "Germany", "France", "Japan", "China", "Russia", "Canada", "Australia"],
        dateSigned: "1961-04-18",
        dateEntered: "1964-04-24",
        status: "active",
        subject: ["diplomatic immunity", "international relations", "consular affairs"],
        text: "Convention establishing diplomatic immunity and relations between states...",
        amendments: [],
        relatedTreaties: [],
      },
      {
        name: "International Covenant on Civil and Political Rights",
        type: "multilateral",
        signatories: ["USA", "UK", "Germany", "France", "Japan", "Canada", "Australia", "Brazil", "India"],
        dateSigned: "1966-12-16",
        dateEntered: "1976-03-23",
        status: "active",
        subject: ["human rights", "civil liberties", "political rights"],
        text: "Covenant establishing fundamental civil and political rights...",
        amendments: [],
        relatedTreaties: [],
      },
      {
        name: "Basel III International Regulatory Framework",
        type: "multilateral",
        signatories: ["USA", "UK", "Germany", "France", "Japan", "Switzerland", "Canada", "Australia"],
        dateSigned: "2010-12-16",
        dateEntered: "2013-01-01",
        status: "active",
        subject: ["banking regulation", "financial stability", "capital requirements"],
        text: "Framework for international banking regulation and supervision...",
        amendments: [],
        relatedTreaties: [],
      },
    ]

    treaties.forEach((treaty) => {
      const id = `treaty_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      this.treaties.set(id, { ...treaty, id })
    })
  }
}

export const treatyDatabase = new TreatyDatabase()
