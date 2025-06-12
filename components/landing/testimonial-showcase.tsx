"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function TestimonialShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: "Alex Morgan",
      role: "Entrepreneur",
      image: "/professional-headshot-entrepreneur.png",
      content:
        "SnapAiFi has completely transformed how I manage my business finances. The holographic visualizations make complex financial data instantly understandable, and the AI recommendations have helped me optimize my cash flow in ways I never thought possible.",
    },
    {
      name: "Sarah Chen",
      role: "Investment Analyst",
      image: "/female-analyst-headshot.png",
      content:
        "As someone who works with financial data daily, I'm blown away by SnapAiFi's capabilities. The platform's predictive analytics have given me insights that would have taken days to discover manually. It's like having a quantum supercomputer as your personal financial advisor.",
    },
    {
      name: "Marcus Johnson",
      role: "Personal Finance Blogger",
      image: "/finance-blogger-headshot.png",
      content:
        "I've reviewed dozens of financial platforms, and SnapAiFi is in a league of its own. The holographic interface isn't just visually stunning—it's incredibly functional. My readers have reported significant improvements in their financial decision-making after switching to SnapAiFi.",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow" />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-10 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">What Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">Users Say</span>
          </h2>
          <p className="text-cyan-100/70 max-w-2xl mx-auto">
            Discover how SnapAiFi is transforming financial experiences for people just like you.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div ref={testimonialsRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="relative">
                    {/* Holographic Card */}
                    <div className="relative rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/30" />

                      {/* Glass reflection effect */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)",
                        }}
                      />

                      {/* Content */}
                      <div className="relative p-8 md:p-10">
                        <div className="flex items-center mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>

                        <p className="text-cyan-100/90 text-lg mb-8 italic">"{testimonial.content}"</p>

                        <div className="flex items-center">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-cyan-500/50">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{testimonial.name}</h4>
                            <p className="text-cyan-300/70 text-sm">{testimonial.role}</p>
                          </div>
                        </div>

                        {/* Floating particles */}
                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 rounded-full bg-cyan-400/80"
                              style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.5 + 0.3,
                                animation: `float-particle ${3 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 5}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-[20px] blur-md opacity-70 animate-glow" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-950/30 hover:text-cyan-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-cyan-400 w-6" : "bg-cyan-700/50 hover:bg-cyan-600/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-950/30 hover:text-cyan-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
