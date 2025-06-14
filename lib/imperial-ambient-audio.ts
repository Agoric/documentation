export class ImperialAmbientAudio {
  private audioContext: AudioContext | null = null
  private masterGain: GainNode | null = null
  private currentTrack: AudioBufferSourceNode | null = null
  private isPlaying = false
  private volume = 0.3
  private currentAmbientType = "throne-room"
  private fadeInterval: NodeJS.Timeout | null = null

  // Ambient music configurations
  private ambientTracks = {
    "throne-room": {
      name: "Imperial Throne Room",
      description: "Majestic orchestral ambience with royal grandeur",
      baseFrequency: 220,
      harmonics: [1, 1.5, 2, 2.5, 3],
      tempo: 60,
      reverb: 0.8,
    },
    "royal-court": {
      name: "Royal Court Assembly",
      description: "Ceremonial music for important decisions",
      baseFrequency: 174,
      harmonics: [1, 1.25, 1.5, 2, 2.5],
      tempo: 72,
      reverb: 0.6,
    },
    "golden-chamber": {
      name: "Golden Chamber",
      description: "Luxurious ambient tones with golden resonance",
      baseFrequency: 256,
      harmonics: [1, 1.618, 2, 2.618, 3.236],
      tempo: 54,
      reverb: 0.9,
    },
    "imperial-dawn": {
      name: "Imperial Dawn",
      description: "Uplifting morning court music",
      baseFrequency: 293.66,
      harmonics: [1, 1.2, 1.5, 1.8, 2.4],
      tempo: 80,
      reverb: 0.5,
    },
    "sovereign-meditation": {
      name: "Sovereign Meditation",
      description: "Deep contemplative tones for strategic thinking",
      baseFrequency: 136.1,
      harmonics: [1, 1.5, 2, 3, 4],
      tempo: 45,
      reverb: 1.0,
    },
  }

  constructor() {
    this.initializeAudioContext()
  }

  private async initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.masterGain = this.audioContext.createGain()
      this.masterGain.connect(this.audioContext.destination)
      this.masterGain.gain.value = this.volume
    } catch (error) {
      console.warn("Imperial Audio: Could not initialize audio context", error)
    }
  }

  private createImperialOscillator(frequency: number, type: OscillatorType = "sine"): OscillatorNode {
    if (!this.audioContext) throw new Error("Audio context not initialized")

    const oscillator = this.audioContext.createOscillator()
    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    return oscillator
  }

  private createReverbEffect(reverbAmount: number): ConvolverNode {
    if (!this.audioContext) throw new Error("Audio context not initialized")

    const convolver = this.audioContext.createConvolver()
    const length = this.audioContext.sampleRate * 3 // 3 seconds of reverb
    const impulse = this.audioContext.createBuffer(2, length, this.audioContext.sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 2)
        channelData[i] = (Math.random() * 2 - 1) * decay * reverbAmount
      }
    }

    convolver.buffer = impulse
    return convolver
  }

  private createLowPassFilter(frequency: number): BiquadFilterNode {
    if (!this.audioContext) throw new Error("Audio context not initialized")

    const filter = this.audioContext.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    filter.Q.setValueAtTime(1, this.audioContext.currentTime)
    return filter
  }

  private generateImperialAmbience(trackConfig: any): AudioBufferSourceNode {
    if (!this.audioContext || !this.masterGain) throw new Error("Audio context not initialized")

    // Create multiple oscillators for rich harmonic content
    const oscillators: OscillatorNode[] = []
    const gains: GainNode[] = []

    trackConfig.harmonics.forEach((harmonic: number, index: number) => {
      const freq = trackConfig.baseFrequency * harmonic
      const osc = this.createImperialOscillator(freq, index % 2 === 0 ? "sine" : "triangle")
      const gain = this.audioContext.createGain()

      // Create volume envelope for each harmonic
      const volume = 0.1 / (index + 1) // Decreasing volume for higher harmonics
      gain.gain.setValueAtTime(0, this.audioContext.currentTime)
      gain.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 2)

      oscillators.push(osc)
      gains.push(gain)
    })

    // Create effects chain
    const reverb = this.createReverbEffect(trackConfig.reverb)
    const filter = this.createLowPassFilter(800) // Warm, mellow tone
    const masterGain = this.audioContext.createGain()
    masterGain.gain.value = 0.3

    // Connect audio graph
    oscillators.forEach((osc, index) => {
      osc.connect(gains[index])
      gains[index].connect(filter)
    })

    filter.connect(reverb)
    reverb.connect(masterGain)
    masterGain.connect(this.masterGain)

    // Add subtle modulation for organic feel
    const lfo = this.createImperialOscillator(0.1, "sine")
    const lfoGain = this.audioContext.createGain()
    lfoGain.gain.value = 0.02

    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)

    // Start all oscillators
    const startTime = this.audioContext.currentTime
    oscillators.forEach((osc) => osc.start(startTime))
    lfo.start(startTime)

    // Create a source node to represent this complex ambient track
    const sourceNode = this.audioContext.createBufferSource()

    // Store references for cleanup
    sourceNode._imperialOscillators = oscillators
    sourceNode._imperialLFO = lfo

    return sourceNode
  }

  async startAmbientMusic(trackType = "throne-room") {
    if (!this.audioContext) {
      await this.initializeAudioContext()
    }

    if (this.audioContext?.state === "suspended") {
      await this.audioContext.resume()
    }

    this.stopAmbientMusic()

    const trackConfig = this.ambientTracks[trackType as keyof typeof this.ambientTracks]
    if (!trackConfig) {
      console.warn(`Imperial Audio: Unknown track type: ${trackType}`)
      return
    }

    try {
      this.currentTrack = this.generateImperialAmbience(trackConfig)
      this.currentAmbientType = trackType
      this.isPlaying = true

      console.log(`🎵 Imperial Audio: Now playing "${trackConfig.name}"`)
    } catch (error) {
      console.error("Imperial Audio: Failed to start ambient music", error)
    }
  }

  stopAmbientMusic() {
    if (this.currentTrack) {
      // Stop all oscillators
      const oscillators = (this.currentTrack as any)._imperialOscillators || []
      const lfo = (this.currentTrack as any)._imperialLFO

      oscillators.forEach((osc: OscillatorNode) => {
        try {
          osc.stop()
        } catch (e) {
          // Oscillator might already be stopped
        }
      })

      if (lfo) {
        try {
          lfo.stop()
        } catch (e) {
          // LFO might already be stopped
        }
      }

      this.currentTrack = null
    }
    this.isPlaying = false
  }

  fadeIn(duration = 3000) {
    if (!this.masterGain) return

    this.masterGain.gain.setValueAtTime(0, this.audioContext!.currentTime)
    this.masterGain.gain.linearRampToValueAtTime(this.volume, this.audioContext!.currentTime + duration / 1000)
  }

  fadeOut(duration = 3000) {
    if (!this.masterGain) return

    this.masterGain.gain.linearRampToValueAtTime(0, this.audioContext!.currentTime + duration / 1000)

    setTimeout(() => {
      this.stopAmbientMusic()
    }, duration)
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioContext!.currentTime)
    }
  }

  switchTrack(newTrackType: string, crossfadeDuration = 2000) {
    if (newTrackType === this.currentAmbientType) return

    if (this.isPlaying) {
      this.fadeOut(crossfadeDuration / 2)
      setTimeout(() => {
        this.startAmbientMusic(newTrackType)
        this.fadeIn(crossfadeDuration / 2)
      }, crossfadeDuration / 2)
    } else {
      this.startAmbientMusic(newTrackType)
    }
  }

  getCurrentTrack() {
    return this.currentAmbientType
  }

  getAvailableTracks() {
    return Object.entries(this.ambientTracks).map(([key, config]) => ({
      id: key,
      name: config.name,
      description: config.description,
    }))
  }

  isCurrentlyPlaying() {
    return this.isPlaying
  }

  getVolume() {
    return this.volume
  }
}

// Singleton instance
export const imperialAmbient = new ImperialAmbientAudio()
