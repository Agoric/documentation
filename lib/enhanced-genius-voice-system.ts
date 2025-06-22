export interface VoiceProfile {
  userId: string
  voiceSignature: VoiceSignature
  speechPatterns: SpeechPattern[]
  emotionalBaseline: EmotionalBaseline
  stressIndicators: StressIndicator[]
  preferredCharacter: CharacterProfile
  conversationHistory: ConversationEntry[]
  lastGreeting: Date | null
  lastAudibleGreeting: Date | null
}

export interface VoiceSignature {
  pitch: number[]
  tone: number[]
  cadence: number[]
  volume: number[]
  breathingPattern: number[]
  speechRate: number
  pausePatterns: number[]
}

export interface SpeechPattern {
  timeOfDay: string
  emotionalState: string
  voiceCharacteristics: VoiceSignature
  contextTags: string[]
  timestamp: Date
}

export interface EmotionalBaseline {
  normalPitch: number
  normalTone: number
  normalCadence: number
  normalVolume: number
  normalSpeechRate: number
  confidenceLevel: number
}

export interface StressIndicator {
  type: "pitch_elevation" | "speech_rate_increase" | "volume_fluctuation" | "breathing_irregularity" | "pause_frequency"
  severity: "low" | "medium" | "high" | "critical"
  confidence: number
  timestamp: Date
  context: string
}

export interface CharacterProfile {
  id: string
  name: string
  personality: string
  voiceStyle: string
  responsePatterns: string[]
  empathyLevel: number
  charismaLevel: number
  youtubeVideoId?: string
  customAudioClips: AudioClip[]
  themeColors: ThemeColors
  conversationStyle: ConversationStyle
}

export interface AudioClip {
  id: string
  name: string
  url: string
  context: "greeting" | "concern" | "celebration" | "comfort" | "motivation"
  duration: number
}

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  glow: string
}

export interface ConversationStyle {
  formalityLevel: number // 1-10
  empathyResponse: string[]
  motivationalPhrases: string[]
  concernExpressions: string[]
  celebrationPhrases: string[]
  distractionTechniques: DistractionTechnique[]
}

export interface DistractionTechnique {
  id: string
  name: string
  type: "self_development" | "relaxation" | "entertainment" | "physical_activity" | "creative"
  description: string
  duration: string
  instructions: string[]
  effectiveness: number
}

export interface ConversationEntry {
  id: string
  timestamp: Date
  userInput: string
  aiResponse: string
  emotionalContext: EmotionalContext
  stressLevel: number
  responseType: "normal" | "empathetic" | "concerned" | "motivational" | "distraction"
  effectiveness: number
}

export interface EmotionalContext {
  detectedEmotion: "happy" | "sad" | "stressed" | "excited" | "angry" | "neutral" | "anxious"
  confidence: number
  stressLevel: number
  energyLevel: number
  needsSupport: boolean
}

export interface GreetingSchedule {
  userId: string
  lastDailyGreeting: Date | null
  lastAudibleGreeting: Date | null
  greetingPreferences: GreetingPreferences
}

export interface GreetingPreferences {
  formalGreetingTime: string // "morning" | "afternoon" | "evening"
  audibleGreetingEnabled: boolean
  personalizedGreetings: boolean
  characterVoiceEnabled: boolean
}

// Enhanced Genius Voice System
export class EnhancedGeniusVoiceSystem {
  private voiceProfiles: Map<string, VoiceProfile> = new Map()
  private audioContext: AudioContext | null = null
  private mediaRecorder: MediaRecorder | null = null
  private isListening = false
  private stressDetectionActive = true

  constructor() {
    this.initializeAudioContext()
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.error("Audio context initialization failed:", error)
    }
  }

  async createVoiceProfile(userId: string, characterProfile: CharacterProfile): Promise<VoiceProfile> {
    const profile: VoiceProfile = {
      userId,
      voiceSignature: {
        pitch: [],
        tone: [],
        cadence: [],
        volume: [],
        breathingPattern: [],
        speechRate: 0,
        pausePatterns: [],
      },
      speechPatterns: [],
      emotionalBaseline: {
        normalPitch: 0,
        normalTone: 0,
        normalCadence: 0,
        normalVolume: 0,
        normalSpeechRate: 0,
        confidenceLevel: 0,
      },
      stressIndicators: [],
      preferredCharacter: characterProfile,
      conversationHistory: [],
      lastGreeting: null,
      lastAudibleGreeting: null,
    }

    this.voiceProfiles.set(userId, profile)
    return profile
  }

  async startVoiceAnalysis(userId: string): Promise<void> {
    if (!this.audioContext) {
      await this.initializeAudioContext()
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      this.mediaRecorder = new MediaRecorder(stream)
      this.isListening = true

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.analyzeAudioData(userId, event.data)
        }
      }

      this.mediaRecorder.start(1000) // Analyze every second
    } catch (error) {
      console.error("Voice analysis initialization failed:", error)
    }
  }

  private async analyzeAudioData(userId: string, audioData: Blob): Promise<void> {
    const profile = this.voiceProfiles.get(userId)
    if (!profile) return

    try {
      // Convert blob to audio buffer for analysis
      const arrayBuffer = await audioData.arrayBuffer()
      const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer)

      // Analyze voice characteristics
      const voiceAnalysis = this.extractVoiceFeatures(audioBuffer)

      // Update voice signature
      this.updateVoiceSignature(profile, voiceAnalysis)

      // Detect stress levels
      const stressLevel = this.detectStressLevel(profile, voiceAnalysis)

      // Update emotional context
      const emotionalContext = this.analyzeEmotionalContext(voiceAnalysis, stressLevel)

      // Store analysis results
      this.updateSpeechPatterns(profile, voiceAnalysis, emotionalContext)
    } catch (error) {
      console.error("Audio analysis failed:", error)
    }
  }

  private extractVoiceFeatures(audioBuffer: AudioBuffer): VoiceAnalysis {
    const channelData = audioBuffer.getChannelData(0)

    // Extract basic features (simplified for demo)
    const pitch = this.calculatePitch(channelData)
    const volume = this.calculateVolume(channelData)
    const speechRate = this.calculateSpeechRate(channelData)
    const pausePatterns = this.detectPauses(channelData)

    return {
      pitch,
      volume,
      speechRate,
      pausePatterns,
      timestamp: new Date(),
    }
  }

  private calculatePitch(audioData: Float32Array): number {
    // Simplified pitch detection using autocorrelation
    let maxCorrelation = 0
    let bestPeriod = 0

    for (let period = 20; period < 400; period++) {
      let correlation = 0
      for (let i = 0; i < audioData.length - period; i++) {
        correlation += audioData[i] * audioData[i + period]
      }
      if (correlation > maxCorrelation) {
        maxCorrelation = correlation
        bestPeriod = period
      }
    }

    return bestPeriod > 0 ? 44100 / bestPeriod : 0
  }

  private calculateVolume(audioData: Float32Array): number {
    let sum = 0
    for (let i = 0; i < audioData.length; i++) {
      sum += audioData[i] * audioData[i]
    }
    return Math.sqrt(sum / audioData.length)
  }

  private calculateSpeechRate(audioData: Float32Array): number {
    // Simplified speech rate calculation
    const threshold = 0.01
    let speechSegments = 0
    let inSpeech = false

    for (let i = 0; i < audioData.length; i++) {
      const amplitude = Math.abs(audioData[i])
      if (amplitude > threshold && !inSpeech) {
        speechSegments++
        inSpeech = true
      } else if (amplitude <= threshold) {
        inSpeech = false
      }
    }

    return speechSegments / (audioData.length / 44100) // segments per second
  }

  private detectPauses(audioData: Float32Array): number[] {
    const threshold = 0.005
    const pauses: number[] = []
    let pauseStart = -1

    for (let i = 0; i < audioData.length; i++) {
      const amplitude = Math.abs(audioData[i])
      if (amplitude <= threshold && pauseStart === -1) {
        pauseStart = i
      } else if (amplitude > threshold && pauseStart !== -1) {
        const pauseDuration = (i - pauseStart) / 44100
        if (pauseDuration > 0.1) {
          // Only count pauses longer than 100ms
          pauses.push(pauseDuration)
        }
        pauseStart = -1
      }
    }

    return pauses
  }

  private detectStressLevel(profile: VoiceProfile, analysis: VoiceAnalysis): number {
    if (profile.emotionalBaseline.confidenceLevel < 0.5) {
      return 0 // Not enough baseline data
    }

    let stressScore = 0
    const baseline = profile.emotionalBaseline

    // Pitch elevation indicates stress
    if (analysis.pitch > baseline.normalPitch * 1.2) {
      stressScore += 0.3
    }

    // Increased speech rate indicates stress
    if (analysis.speechRate > baseline.normalSpeechRate * 1.3) {
      stressScore += 0.25
    }

    // Volume fluctuation indicates stress
    if (analysis.volume > baseline.normalVolume * 1.5 || analysis.volume < baseline.normalVolume * 0.5) {
      stressScore += 0.2
    }

    // Irregular pause patterns indicate stress
    const avgPauseLength = analysis.pausePatterns.reduce((a, b) => a + b, 0) / analysis.pausePatterns.length
    if (avgPauseLength > 0.5 || analysis.pausePatterns.length > 10) {
      stressScore += 0.25
    }

    return Math.min(stressScore, 1.0)
  }

  private analyzeEmotionalContext(analysis: VoiceAnalysis, stressLevel: number): EmotionalContext {
    let detectedEmotion: EmotionalContext["detectedEmotion"] = "neutral"
    let confidence = 0.5

    if (stressLevel > 0.7) {
      detectedEmotion = "stressed"
      confidence = 0.8
    } else if (stressLevel > 0.4) {
      detectedEmotion = "anxious"
      confidence = 0.7
    } else if (analysis.pitch > 200 && analysis.speechRate > 3) {
      detectedEmotion = "excited"
      confidence = 0.6
    } else if (analysis.volume < 0.1 && analysis.speechRate < 1.5) {
      detectedEmotion = "sad"
      confidence = 0.6
    }

    return {
      detectedEmotion,
      confidence,
      stressLevel,
      energyLevel: Math.min(analysis.volume * analysis.speechRate, 1.0),
      needsSupport: stressLevel > 0.5,
    }
  }

  private updateVoiceSignature(profile: VoiceProfile, analysis: VoiceAnalysis): void {
    profile.voiceSignature.pitch.push(analysis.pitch)
    profile.voiceSignature.volume.push(analysis.volume)
    profile.voiceSignature.pausePatterns.push(...analysis.pausePatterns)

    // Keep only recent data (last 100 samples)
    if (profile.voiceSignature.pitch.length > 100) {
      profile.voiceSignature.pitch = profile.voiceSignature.pitch.slice(-100)
      profile.voiceSignature.volume = profile.voiceSignature.volume.slice(-100)
    }

    // Update baseline if we have enough data
    if (profile.voiceSignature.pitch.length >= 50) {
      this.updateEmotionalBaseline(profile)
    }
  }

  private updateEmotionalBaseline(profile: VoiceProfile): void {
    const signature = profile.voiceSignature

    profile.emotionalBaseline.normalPitch = signature.pitch.reduce((a, b) => a + b, 0) / signature.pitch.length
    profile.emotionalBaseline.normalVolume = signature.volume.reduce((a, b) => a + b, 0) / signature.volume.length
    profile.emotionalBaseline.confidenceLevel = Math.min(signature.pitch.length / 100, 1.0)
  }

  private updateSpeechPatterns(profile: VoiceProfile, analysis: VoiceAnalysis, context: EmotionalContext): void {
    const pattern: SpeechPattern = {
      timeOfDay: this.getTimeOfDay(),
      emotionalState: context.detectedEmotion,
      voiceCharacteristics: {
        pitch: [analysis.pitch],
        tone: [],
        cadence: [],
        volume: [analysis.volume],
        breathingPattern: [],
        speechRate: analysis.speechRate,
        pausePatterns: analysis.pausePatterns,
      },
      contextTags: this.generateContextTags(context),
      timestamp: new Date(),
    }

    profile.speechPatterns.push(pattern)

    // Keep only recent patterns (last 1000)
    if (profile.speechPatterns.length > 1000) {
      profile.speechPatterns = profile.speechPatterns.slice(-1000)
    }
  }

  private getTimeOfDay(): string {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 17) return "afternoon"
    if (hour < 21) return "evening"
    return "night"
  }

  private generateContextTags(context: EmotionalContext): string[] {
    const tags: string[] = []

    if (context.stressLevel > 0.5) tags.push("stressed")
    if (context.energyLevel > 0.7) tags.push("high_energy")
    if (context.energyLevel < 0.3) tags.push("low_energy")
    if (context.needsSupport) tags.push("needs_support")

    tags.push(context.detectedEmotion)

    return tags
  }

  async generateEmpathicResponse(userId: string, userInput: string, context: EmotionalContext): Promise<string> {
    const profile = this.voiceProfiles.get(userId)
    if (!profile) return "I'm here to help you."

    const character = profile.preferredCharacter
    let response = ""

    if (context.needsSupport && context.stressLevel > 0.6) {
      // High stress - express concern and offer support
      response = this.generateConcernedResponse(character, context)
    } else if (context.stressLevel > 0.3) {
      // Moderate stress - acknowledge and offer gentle support
      response = this.generateSupportiveResponse(character, context)
    } else if (context.detectedEmotion === "excited" || context.detectedEmotion === "happy") {
      // Positive emotions - celebrate and encourage
      response = this.generateCelebratoryResponse(character, context)
    } else {
      // Normal conversation
      response = this.generateNormalResponse(character, userInput)
    }

    // Store conversation entry
    const entry: ConversationEntry = {
      id: `conv_${Date.now()}`,
      timestamp: new Date(),
      userInput,
      aiResponse: response,
      emotionalContext: context,
      stressLevel: context.stressLevel,
      responseType: this.determineResponseType(context),
      effectiveness: 0.8, // Will be updated based on user feedback
    }

    profile.conversationHistory.push(entry)

    return response
  }

  private generateConcernedResponse(character: CharacterProfile, context: EmotionalContext): string {
    const concerns = character.conversationStyle.concernExpressions
    const randomConcern = concerns[Math.floor(Math.random() * concerns.length)]

    return `${randomConcern} I can sense you're going through something challenging right now. I'm here to listen and help you work through this. Would you like to talk about what's bothering you, or would you prefer I suggest some techniques to help you feel better?`
  }

  private generateSupportiveResponse(character: CharacterProfile, context: EmotionalContext): string {
    const empathy = character.conversationStyle.empathyResponse
    const randomEmpathy = empathy[Math.floor(Math.random() * empathy.length)]

    return `${randomEmpathy} I notice you might be feeling a bit stressed. That's completely normal, and I'm here to support you. What would be most helpful right now - talking through what's on your mind, or taking a moment to focus on something positive?`
  }

  private generateCelebratoryResponse(character: CharacterProfile, context: EmotionalContext): string {
    const celebrations = character.conversationStyle.celebrationPhrases
    const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)]

    return `${randomCelebration} I love hearing the positive energy in your voice! It's wonderful to see you in such great spirits. What's got you feeling so good today?`
  }

  private generateNormalResponse(character: CharacterProfile, userInput: string): string {
    // Generate contextual response based on character personality
    return `I understand what you're saying. Based on your unique communication style, let me help you with that in the most effective way possible.`
  }

  private determineResponseType(context: EmotionalContext): ConversationEntry["responseType"] {
    if (context.stressLevel > 0.6) return "concerned"
    if (context.stressLevel > 0.3) return "empathetic"
    if (context.detectedEmotion === "happy" || context.detectedEmotion === "excited") return "motivational"
    if (context.needsSupport) return "distraction"
    return "normal"
  }

  async suggestDistractionTechnique(userId: string, stressLevel: number): Promise<DistractionTechnique | null> {
    const profile = this.voiceProfiles.get(userId)
    if (!profile) return null

    const techniques = profile.preferredCharacter.conversationStyle.distractionTechniques

    // Filter techniques based on stress level
    const appropriateTechniques = techniques.filter((technique) => {
      if (stressLevel > 0.8) return technique.type === "relaxation"
      if (stressLevel > 0.5) return technique.type === "self_development" || technique.type === "creative"
      return true
    })

    if (appropriateTechniques.length === 0) return null

    return appropriateTechniques[Math.floor(Math.random() * appropriateTechniques.length)]
  }

  shouldProvideGreeting(userId: string): { daily: boolean; audible: boolean } {
    const profile = this.voiceProfiles.get(userId)
    if (!profile) return { daily: false, audible: false }

    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000)

    const needsDailyGreeting = !profile.lastGreeting || profile.lastGreeting < oneDayAgo
    const needsAudibleGreeting = !profile.lastAudibleGreeting || profile.lastAudibleGreeting < twoDaysAgo

    return {
      daily: needsDailyGreeting,
      audible: needsAudibleGreeting,
    }
  }

  async generatePersonalizedGreeting(userId: string, isAudible = false): Promise<string> {
    const profile = this.voiceProfiles.get(userId)
    if (!profile) return "Hello! I'm your Genius Guide, ready to assist you today."

    const character = profile.preferredCharacter
    const timeOfDay = this.getTimeOfDay()
    const userName = "Champion" // Could be personalized further

    let greeting = ""

    if (isAudible) {
      greeting = `Good ${timeOfDay}, ${userName}! It's wonderful to connect with you again. I've been learning from our conversations and I'm excited to continue supporting your journey toward supreme authority. How are you feeling today?`
    } else {
      greeting = `Good ${timeOfDay}, ${userName}. I hope you're having an excellent day. I'm here and ready to assist you with anything you need - from strategic planning to just having a meaningful conversation. What would you like to focus on today?`
    }

    // Update greeting timestamps
    const now = new Date()
    profile.lastGreeting = now
    if (isAudible) {
      profile.lastAudibleGreeting = now
    }

    return greeting
  }

  stopVoiceAnalysis(): void {
    if (this.mediaRecorder && this.isListening) {
      this.mediaRecorder.stop()
      this.isListening = false
    }
  }

  getVoiceProfile(userId: string): VoiceProfile | null {
    return this.voiceProfiles.get(userId) || null
  }
}

interface VoiceAnalysis {
  pitch: number
  volume: number
  speechRate: number
  pausePatterns: number[]
  timestamp: Date
}

export const enhancedGeniusVoiceSystem = new EnhancedGeniusVoiceSystem()
