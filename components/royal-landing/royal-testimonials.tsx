"use client"
import { motion } from "framer-motion"
import { Crown, Star, Quote } from "lucide-react"
import { FuturisticCard } from "@/components/ui/futuristic-card"

export function RoyalTestimonials() {
  const testimonials = [
    {
      name: "Alexander Sterling",
      title: "Tech Mogul & Digital Aristocrat",
      avatar: "👑",
      rating: 5,
      quote:
        "SNAPIFI Royal transformed my financial empire. The royal treatment and quantum-level security make me feel like true digital royalty. My portfolio has grown 300% since joining the aristocracy.",
    },
    {
      name: "Victoria Goldsworth",
      title: "Investment Baroness",
      avatar: "💎",
      rating: 5,
      quote:
        "Finally, a platform worthy of my status. The VIP concierge service and exclusive investment opportunities are unmatched. I rule my financial kingdom with absolute confidence.",
    },
    {
      name: "Marcus Platinum",
      title: "Crypto Duke",
      avatar: "⚡",
      rating: 5,
      quote:
        "The royal dashboard is a masterpiece. Managing my multi-billion portfolio feels effortless and elegant. The holographic interface makes every transaction feel like a royal decree.",
    },
    {
      name: "Isabella Diamond",
      title: "Real Estate Empress",
      avatar: "🏰",
      rating: 5,
      quote:
        "SNAPIFI Royal's global dominion feature helped me acquire properties across 50 countries. The royal vault keeps my assets safer than any medieval treasury ever could.",
    },
  ]

  return (
    <section id="testimonials" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Royal Testimonials
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Hear from the financial nobility who have ascended to digital royalty
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FuturisticCard
                variant="neural"
                className="h-full relative overflow-hidden group"
                glow={true}
                animated={true}
                interactive={true}
              >
                {/* Quote Icon */}
                <Quote
                  className="absolute top-4 right-4 text-yellow-400/30 group-hover:text-yellow-400/60 transition-colors"
                  size={32}
                />

                <div className="space-y-6">
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-purple-500 flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                      <p className="text-yellow-400 text-sm font-medium">{testimonial.title}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-300 leading-relaxed italic">"{testimonial.quote}"</blockquote>

                  {/* Royal Seal */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                    <Crown className="text-yellow-400" size={16} />
                    <span className="text-xs text-slate-400 font-medium">VERIFIED ROYAL MEMBER</span>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </FuturisticCard>
            </motion.div>
          ))}
        </div>

        {/* Royal Trust Indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "🏆", label: "Award Winning", desc: "Platform of the Year" },
              { icon: "🛡️", label: "Bank Grade Security", desc: "Military Encryption" },
              { icon: "⚡", label: "99.99% Uptime", desc: "Royal Reliability" },
              { icon: "👑", label: "VIP Support", desc: "24/7 Royal Service" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h4 className="text-yellow-400 font-semibold text-sm">{item.label}</h4>
                <p className="text-slate-400 text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
