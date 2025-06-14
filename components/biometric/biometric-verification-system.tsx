"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Fingerprint, Camera, Shield, CheckCircle2, AlertTriangle, Scan, Eye, Lock } from "lucide-react"
import { RoyalHolographicTitle } from "@/components/ui/royal-holographic-title"
import { HolographicGlassCard } from "@/components/snap-dax/holographic-glass-card"

interface BiometricData {
  fingerprint?: {
    template: string
    quality: number
    verified: boolean
    timestamp: string
  }
  facial?: {
    template: string
    confidence: number
    verified: boolean
    timestamp: string
    landmarks: number[]
  }
  voice?: {
    template: string
    confidence: number
    verified: boolean
    timestamp: string
  }
}

interface BiometricVerificationProps {
  onVerificationComplete: (biometricData: BiometricData) => void
  requiredMethods?: ("fingerprint" | "facial" | "voice")[]
  gciToken?: any
}

export function BiometricVerificationSystem({
  onVerificationComplete,
  requiredMethods = ["fingerprint", "facial"],
  gciToken,
}: BiometricVerificationProps) {
  const [currentMethod, setCurrentMethod] = useState<"fingerprint" | "facial" | "voice" | null>(null)
  const [biometricData, setBiometricData] = useState<BiometricData>({})
  const [isCapturing, setIsCapturing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Simulated fingerprint scanner
  const [fingerprintScanProgress, setFingerprintScanProgress] = useState(0)
  const [fingerprintQuality, setFingerprintQuality] = useState(0)

  // Facial recognition state
  const [faceDetected, setFaceDetected] = useState(false)
  const [faceConfidence, setFaceConfidence] = useState(0)
  const [facialLandmarks, setFacialLandmarks] = useState<number[]>([])

  // Voice recognition state
  const [isRecording, setIsRecording] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [voiceConfidence, setVoiceConfidence] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  // Calculate overall progress
  useEffect(() => {
    const completedMethods = requiredMethods.filter((method) => biometricData[method]?.verified).length
    const totalMethods = requiredMethods.length
    setProgress((completedMethods / totalMethods) * 100)

    if (completedMethods === totalMethods) {
      setIsComplete(true)
      onVerificationComplete(biometricData)
    }
  }, [biometricData, requiredMethods, onVerificationComplete])

  // Cleanup function
  const cleanup = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
  }, [])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  // Fingerprint scanning simulation
  const startFingerprintScan = async () => {
    setCurrentMethod("fingerprint")
    setIsCapturing(true)
    setError(null)
    setFingerprintScanProgress(0)
    setFingerprintQuality(0)

    // Simulate fingerprint scanning process
    const scanInterval = setInterval(() => {
      setFingerprintScanProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(scanInterval)
          completeFingerprintScan()
          return 100
        }
        return newProgress
      })

      setFingerprintQuality((prev) => Math.min(prev + Math.random() * 10, 95))
    }, 200)

    // Simulate scan completion after 3-5 seconds
    setTimeout(
      () => {
        clearInterval(scanInterval)
        if (fingerprintScanProgress < 100) {
          completeFingerprintScan()
        }
      },
      3000 + Math.random() * 2000,
    )
  }

  const completeFingerprintScan = () => {
    const quality = 85 + Math.random() * 10 // 85-95% quality
    const template = generateBiometricTemplate("fingerprint")

    setBiometricData((prev) => ({
      ...prev,
      fingerprint: {
        template,
        quality,
        verified: quality > 80,
        timestamp: new Date().toISOString(),
      },
    }))

    setIsCapturing(false)
    setCurrentMethod(null)
  }

  // Facial recognition
  const startFacialRecognition = async () => {
    setCurrentMethod("facial")
    setIsCapturing(true)
    setError(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()

        // Start face detection simulation
        const detectionInterval = setInterval(() => {
          simulateFaceDetection()
        }, 100)

        // Complete after 5 seconds
        setTimeout(() => {
          clearInterval(detectionInterval)
          completeFacialRecognition()
        }, 5000)
      }
    } catch (err) {
      setError("Camera access denied. Please enable camera permissions.")
      setIsCapturing(false)
      setCurrentMethod(null)
    }
  }

  const simulateFaceDetection = () => {
    // Simulate face detection with increasing confidence
    setFaceDetected(true)
    setFaceConfidence((prev) => Math.min(prev + Math.random() * 5, 95))

    // Generate facial landmarks (simplified)
    const landmarks = Array.from({ length: 68 }, () => Math.random() * 100)
    setFacialLandmarks(landmarks)
  }

  const completeFacialRecognition = () => {
    const confidence = 88 + Math.random() * 10 // 88-98% confidence
    const template = generateBiometricTemplate("facial")

    setBiometricData((prev) => ({
      ...prev,
      facial: {
        template,
        confidence,
        verified: confidence > 85,
        timestamp: new Date().toISOString(),
        landmarks: facialLandmarks,
      },
    }))

    cleanup()
    setIsCapturing(false)
    setCurrentMethod(null)
  }

  // Voice recognition
  const startVoiceRecognition = async () => {
    setCurrentMethod("voice")
    setIsCapturing(true)
    setIsRecording(true)
    setError(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Set up audio analysis
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      // Start audio level monitoring
      const monitorAudio = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(average)
        }
      }

      const audioInterval = setInterval(monitorAudio, 100)

      // Simulate voice confidence building
      const confidenceInterval = setInterval(() => {
        setVoiceConfidence((prev) => Math.min(prev + Math.random() * 8, 92))
      }, 200)

      // Complete after 4 seconds
      setTimeout(() => {
        clearInterval(audioInterval)
        clearInterval(confidenceInterval)
        completeVoiceRecognition()
      }, 4000)
    } catch (err) {
      setError("Microphone access denied. Please enable microphone permissions.")
      setIsCapturing(false)
      setCurrentMethod(null)
    }
  }

  const completeVoiceRecognition = () => {
    const confidence = 86 + Math.random() * 10 // 86-96% confidence
    const template = generateBiometricTemplate("voice")

    setBiometricData((prev) => ({
      ...prev,
      voice: {
        template,
        confidence,
        verified: confidence > 80,
        timestamp: new Date().toISOString(),
      },
    }))

    cleanup()
    setIsCapturing(false)
    setIsRecording(false)
    setCurrentMethod(null)
  }

  // Generate biometric template (simulated)
  const generateBiometricTemplate = (type: string): string => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    return `${type.toUpperCase()}_${timestamp}_${random}`.replace(/[^A-Z0-9_]/g, "")
  }

  const getBiometricIcon = (method: string) => {
    switch (method) {
      case "fingerprint":
        return Fingerprint
      case "facial":
        return Camera
      case "voice":
        return Eye
      default:
        return Shield
    }
  }

  const renderBiometricCapture = () => {
    if (!currentMethod) return null

    switch (currentMethod) {
      case "fingerprint":
        return (
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-48 h-48">
              {/* Fingerprint scanner visualization */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-4 border-blue-500/30">
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border-2 border-blue-400/40">
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-700/40 to-cyan-700/40 flex items-center justify-center">
                    <Fingerprint className="h-16 w-16 text-blue-300" />
                  </div>
                </div>
              </div>

              {/* Scanning animation */}
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 animate-spin"
                style={{ animationDuration: "2s" }}
              />

              {/* Progress ring */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="50%" cy="50%" r="90" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="4" />
                <circle
                  cx="50%"
                  cy="50%"
                  r="90"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - fingerprintScanProgress / 100)}`}
                  className="transition-all duration-300"
                />
              </svg>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-300">Scan Progress</span>
                  <span className="text-blue-200">{Math.round(fingerprintScanProgress)}%</span>
                </div>
                <Progress
                  value={fingerprintScanProgress}
                  className="h-2 bg-blue-950"
                  indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-300">Quality Score</span>
                  <span className="text-blue-200">{Math.round(fingerprintQuality)}%</span>
                </div>
                <Progress
                  value={fingerprintQuality}
                  className="h-2 bg-blue-950"
                  indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>
            </div>

            <p className="text-blue-200">Place your finger on the scanner and hold steady</p>
          </div>
        )

      case "facial":
        return (
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-80 h-60 bg-black rounded-lg overflow-hidden border-2 border-purple-500/30">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />

              {/* Face detection overlay */}
              {faceDetected && (
                <div className="absolute inset-4 border-2 border-green-400 rounded-lg">
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-green-400" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-green-400" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-green-400" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-green-400" />

                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Face Detected
                  </div>
                </div>
              )}

              {/* Scanning grid */}
              <div className="absolute inset-0 opacity-30">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-purple-400/20" />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-purple-300">Recognition Confidence</span>
                  <span className="text-purple-200">{Math.round(faceConfidence)}%</span>
                </div>
                <Progress
                  value={faceConfidence}
                  className="h-2 bg-purple-950"
                  indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                <Camera className="h-5 w-5 text-purple-400" />
                <span className="text-purple-200">Look directly at the camera</span>
              </div>
            </div>
          </div>
        )

      case "voice":
        return (
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-48 h-48">
              {/* Voice visualization */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-4 border-green-500/30 flex items-center justify-center">
                <div className="relative">
                  <Eye className="h-16 w-16 text-green-300" />
                  {/* Audio level rings */}
                  {[1, 2, 3].map((ring) => (
                    <div
                      key={ring}
                      className="absolute inset-0 rounded-full border-2 border-green-400/40 animate-ping"
                      style={{
                        animationDelay: `${ring * 0.3}s`,
                        animationDuration: "2s",
                        transform: `scale(${1 + ring * 0.3})`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Audio level indicator */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-green-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-100"
                  style={{ width: `${(audioLevel / 255) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-300">Voice Confidence</span>
                  <span className="text-green-200">{Math.round(voiceConfidence)}%</span>
                </div>
                <Progress
                  value={voiceConfidence}
                  className="h-2 bg-green-950"
                  indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>

              <div className="bg-green-950/30 rounded-lg p-4 border border-green-500/30">
                <p className="text-green-200 font-medium mb-2">Please say:</p>
                <p className="text-green-100 text-lg italic">
                  "I am {gciToken?.legalName || "John Doe"} and I authorize this biometric verification for my Global
                  Citizen Identity token."
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-gray-500"}`} />
                <span className="text-green-200">{isRecording ? "Recording..." : "Ready to record"}</span>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <RoyalHolographicTitle size="large" className="mb-4">
          Biometric Verification
        </RoyalHolographicTitle>
        <p className="text-amber-200/80 text-lg">Secure your GCI token with advanced biometric authentication</p>
      </div>

      {/* Overall progress */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-amber-300">Verification Progress</span>
          <span className="text-amber-200">{Math.round(progress)}% Complete</span>
        </div>
        <Progress
          value={progress}
          className="h-3 bg-amber-950"
          indicatorClassName="bg-gradient-to-r from-amber-500 to-yellow-600"
        />
      </div>

      {/* Biometric methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requiredMethods.map((method) => {
          const Icon = getBiometricIcon(method)
          const isVerified = biometricData[method]?.verified
          const isActive = currentMethod === method

          return (
            <HolographicGlassCard
              key={method}
              className={`p-6 transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-amber-500 bg-amber-950/20"
                  : isVerified
                    ? "ring-2 ring-green-500 bg-green-950/20"
                    : "hover:bg-amber-950/10"
              }`}
            >
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-16 h-16">
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
                      isVerified
                        ? "bg-gradient-to-br from-green-500 to-emerald-600"
                        : isActive
                          ? "bg-gradient-to-br from-amber-500 to-yellow-600"
                          : "bg-gradient-to-br from-gray-600 to-gray-700"
                    }`}
                  >
                    {isVerified ? (
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    ) : (
                      <Icon className="h-8 w-8 text-white" />
                    )}
                  </div>

                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-pulse" />
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-amber-200 capitalize">{method} Recognition</h3>
                  <p className="text-sm text-amber-300/70">
                    {isVerified ? "Verified successfully" : isActive ? "Capturing..." : `Tap to start ${method} scan`}
                  </p>
                </div>

                {biometricData[method] && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-amber-400">Quality:</span>
                      <span className="text-amber-200">
                        {Math.round(biometricData[method]?.quality || biometricData[method]?.confidence || 0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-400">Verified:</span>
                      <Badge className={isVerified ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                        {isVerified ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                )}

                {!isVerified && !isActive && (
                  <Button
                    onClick={() => {
                      switch (method) {
                        case "fingerprint":
                          startFingerprintScan()
                          break
                        case "facial":
                          startFacialRecognition()
                          break
                        case "voice":
                          startVoiceRecognition()
                          break
                      }
                    }}
                    disabled={isCapturing}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700"
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Start Scan
                  </Button>
                )}

                {isActive && (
                  <Button
                    onClick={() => {
                      cleanup()
                      setCurrentMethod(null)
                      setIsCapturing(false)
                    }}
                    variant="outline"
                    className="w-full border-red-500/30 text-red-300 hover:bg-red-500/10"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </HolographicGlassCard>
          )
        })}
      </div>

      {/* Active capture interface */}
      <AnimatePresence>
        {currentMethod && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <HolographicGlassCard className="p-8">{renderBiometricCapture()}</HolographicGlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error display */}
      {error && (
        <Alert className="border-red-500/30 bg-red-950/30">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-200">{error}</AlertDescription>
        </Alert>
      )}

      {/* Completion status */}
      {isComplete && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-300 mb-2">Biometric Verification Complete</h3>
            <p className="text-green-200">Your GCI token is now secured with biometric authentication</p>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg px-6 py-2">
            <Lock className="mr-2 h-5 w-5" />
            Quantum-Secured
          </Badge>
        </motion.div>
      )}
    </div>
  )
}
