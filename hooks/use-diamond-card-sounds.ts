"use client"

import * as React from "react"

interface DiamondCardSounds {
  playLaserCut: () => void
  playDiamondChime: () => void
  playAchievementSound: () => void
  playHoverSound: () => void
  playUnlockSound: () => void
}

export function useDiamondCardSounds(enabled = true): DiamondCardSounds {
  const audioContextRef = React.useRef<AudioContext | null>(null)
  const gainNodeRef = React.useRef<GainNode | null>(null)

  React.useEffect(() => {
    if (!enabled) return

    // Initialize Web Audio API
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)
      gainNodeRef.current.gain.value = 0.3 // Set volume to 30%
    } catch (error) {
      console.warn("Web Audio API not supported:", error)
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [enabled])

  const createTone = React.useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.3) => {
      if (!enabled || !audioContextRef.current || !gainNodeRef.current) return

      try {
        const oscillator = audioContextRef.current.createOscillator()
        const envelope = audioContextRef.current.createGain()

        oscillator.connect(envelope)
        envelope.connect(gainNodeRef.current)

        oscillator.frequency.value = frequency
        oscillator.type = type

        // ADSR envelope
        const now = audioContextRef.current.currentTime
        envelope.gain.setValueAtTime(0, now)
        envelope.gain.linearRampToValueAtTime(volume, now + 0.01) // Attack
        envelope.gain.exponentialRampToValueAtTime(volume * 0.7, now + 0.1) // Decay
        envelope.gain.setValueAtTime(volume * 0.7, now + duration - 0.1) // Sustain
        envelope.gain.exponentialRampToValueAtTime(0.001, now + duration) // Release

        oscillator.start(now)
        oscillator.stop(now + duration)
      } catch (error) {
        console.warn("Error creating tone:", error)
      }
    },
    [enabled],
  )

  const playLaserCut = React.useCallback(() => {
    if (!enabled) return

    // Laser cutting sound: high-frequency sweep with noise
    const frequencies = [2000, 2200, 2400, 2200, 2000, 1800]
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        createTone(freq, 0.1, "sawtooth", 0.2)
      }, index * 50)
    })

    // Add some white noise for the cutting effect
    setTimeout(() => {
      createTone(4000, 0.3, "square", 0.1)
    }, 100)
  }, [createTone, enabled])

  const playDiamondChime = React.useCallback(() => {
    if (!enabled) return

    // Diamond chime: crystalline bell-like sound
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
    notes.forEach((note, index) => {
      setTimeout(() => {
        createTone(note, 0.8, "sine", 0.25)
        // Add harmonic
        createTone(note * 2, 0.6, "sine", 0.1)
      }, index * 100)
    })
  }, [createTone, enabled])

  const playAchievementSound = React.useCallback(() => {
    if (!enabled) return

    // Achievement fanfare: triumphant ascending notes
    const fanfare = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99] // C4 to G5
    fanfare.forEach((note, index) => {
      setTimeout(() => {
        createTone(note, 0.4, "triangle", 0.3)
        // Add octave for richness
        createTone(note * 2, 0.3, "sine", 0.15)
      }, index * 80)
    })

    // Final chord
    setTimeout(() => {
      ;[523.25, 659.25, 783.99].forEach((note) => {
        createTone(note, 1.0, "sine", 0.2)
      })
    }, 500)
  }, [createTone, enabled])

  const playHoverSound = React.useCallback(() => {
    if (!enabled) return

    // Subtle hover sound: gentle chime
    createTone(880, 0.15, "sine", 0.15)
    setTimeout(() => {
      createTone(1108, 0.1, "sine", 0.1)
    }, 50)
  }, [createTone, enabled])

  const playUnlockSound = React.useCallback(() => {
    if (!enabled) return

    // Unlock sound: magical sparkle
    const sparkle = [1760, 2217.46, 2793.83, 3520] // A6 to A7
    sparkle.forEach((note, index) => {
      setTimeout(() => {
        createTone(note, 0.3, "sine", 0.2)
      }, index * 60)
    })
  }, [createTone, enabled])

  return {
    playLaserCut,
    playDiamondChime,
    playAchievementSound,
    playHoverSound,
    playUnlockSound,
  }
}
