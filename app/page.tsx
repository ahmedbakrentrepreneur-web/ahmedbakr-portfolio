"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const scrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage("Message sent successfully! I'll get back to you soon.")
        formRef.current?.reset()
      } else {
        setSubmitMessage(data.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Error sending message. Please try again.")
      console.error("[v0] Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, `rgba(217, 119, 6, ${p.alpha})`)
        gradient.addColorStop(1, `rgba(180, 83, 9, ${p.alpha * 0.3})`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-950 to-slate-950 text-white overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div
            className="absolute top-40 right-1/4 w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 animate-pulse">
            Ahmed Bakr
          </h1>
          <p className="text-lg md:text-2xl text-amber-100 mb-4 leading-relaxed font-light">
            Business Entrepreneur & Digital Strategist
          </p>
          <p className="text-base md:text-lg text-amber-200/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            Building tomorrow's digital businesses with strategic expertise in AI, technology, and market expansion
          </p>
          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50 text-slate-950"
          >
            Let's Work Together
          </button>
        </div>
      </section>

      {/* About Section - Investor-Focused */}
      <section className="relative py-20 px-4 md:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200">
            Executive Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-amber-600/50">
                <img
                  src="/images/design-mode/ahmed-photo.jpg"
                  alt="Ahmed Bakr"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-amber-50 leading-relaxed font-light">
                As a visionary entrepreneur, I specialize in building and scaling digital businesses through innovative
                strategies, cutting-edge technology, and market expertise. My multidisciplinary approach combines deep
                business acumen with hands-on digital execution.
              </p>
              <p className="text-lg text-amber-50 leading-relaxed font-light">
                With proven expertise across SaaS strategy, front-end design, copywriting, media buying, and financial
                markets, I help founders and investors identify opportunities, optimize operations, and achieve
                exponential growth in the digital economy.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-amber-500/20 border border-amber-400/50 rounded-full text-amber-200 text-sm font-medium">
                  Business Strategy
                </span>
                <span className="px-4 py-2 bg-amber-500/20 border border-amber-400/50 rounded-full text-amber-200 text-sm font-medium">
                  Digital Innovation
                </span>
                <span className="px-4 py-2 bg-amber-500/20 border border-amber-400/50 rounded-full text-amber-200 text-sm font-medium">
                  Market Growth
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - With AI Tools */}
      <section className="relative py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200">
            Professional Skills & AI Expertise
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🤖",
                title: "AI & ML Tools",
                desc: "ChatGPT, Claude, Gemini, Perplexity, Midjourney, DALL-E, Copilot",
              },
              { icon: "🎨", title: "Front-End Design", desc: "Modern UI/UX with latest design tools and frameworks" },
              { icon: "✍️", title: "Strategic Copywriting", desc: "High-converting messaging and content strategy" },
              {
                icon: "🔍",
                title: "SEO & Optimization",
                desc: "Search engine optimization, technical SEO, content strategy",
              },
              { icon: "🧠", title: "Prompt Engineering", desc: "Advanced AI prompting techniques for maximum results" },
              { icon: "🎯", title: "Branding", desc: "Brand strategy, identity design, market positioning" },
              {
                icon: "🏠",
                title: "Real Estate Marketing",
                desc: "Property marketing, digital campaigns, lead generation",
              },
              {
                icon: "📊",
                title: "Technical Analysis",
                desc: "Financial market analysis, chart patterns, trading strategies",
              },
              {
                icon: "💹",
                title: "Economic Analysis",
                desc: "Market trends, economic indicators, investment insights",
              },
              { icon: "📈", title: "SaaS Strategy", desc: "Product development, market positioning, scaling" },
              {
                icon: "📢",
                title: "Media Buyer",
                desc: "Strategic media buying, campaign optimization, performance marketing",
              },
              {
                icon: "💰",
                title: "Financial Markets",
                desc: "Investment analysis, market trends, wealth optimization",
              },
            ].map((skill, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 border border-amber-600/30 hover:border-amber-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer"
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-amber-300 group-hover:text-amber-200 transition-colors">
                  {skill.title}
                </h3>
                <p className="text-gray-300 group-hover:text-amber-50 transition-colors text-sm leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects & Initiatives Section */}
      <section className="relative py-20 px-4 md:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200">
            Projects & Initiatives
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "MP Fast",
                desc: "High-performance digital platform for market analysis and rapid decision-making",
                link: "https://mpfast.vercel.app/",
                tag: "Live Platform",
              },
              {
                title: "TradinCap",
                desc: "Advanced trading and investment platform with real-time market insights",
                link: "https://tradincap.vercel.app/",
                tag: "Investment Platform",
              },
            ].map((project, i) => (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 border border-amber-600/30 hover:border-amber-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-400/50 rounded-full text-amber-200 text-xs font-medium">
                    {project.tag}
                  </span>
                </div>
                <p className="text-gray-300 group-hover:text-amber-50 transition-colors mb-4">{project.desc}</p>
                <div className="flex items-center gap-2 text-amber-400 group-hover:text-amber-300 font-semibold">
                  <span>Explore Project</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* What I'm Looking For Section */}
      <section className="relative py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200">
            What I'm Looking For
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="p-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 border border-amber-600/30 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-amber-300">Strategic Partners with Vision</h3>
                <p className="text-lg text-amber-50 leading-relaxed font-light">
                  I'm seeking investors and partners who share more than just capital—they bring vision, strategic
                  thinking, and a commitment to building meaningful ventures. If you're passionate about innovation,
                  market disruption, and creating lasting value in the digital economy, let's connect.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-amber-600/30">
                <div className="space-y-3">
                  <h4 className="font-bold text-amber-300 text-lg">I Value:</h4>
                  <ul className="space-y-2 text-amber-50/80">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>Strategic vision and market insight</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>Long-term growth partnerships</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>Collaborative decision-making</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>Innovation-first mentality</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-amber-300 text-lg">Ideal Opportunities:</h4>
                  <ul className="space-y-2 text-amber-50/80">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 mt-1">→</span>
                      <span>SaaS & B2B ventures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 mt-1">→</span>
                      <span>AI-powered platforms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 mt-1">→</span>
                      <span>Digital asset & fintech</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 mt-1">→</span>
                      <span>Scale-up accelerators</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50 text-slate-950"
              >
                Let's Discuss Your Vision
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment & Impact Section */}
      <section className="relative py-20 px-4 md:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200">
            Business Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: "50+", label: "Projects Delivered", desc: "Across multiple industries and markets" },
              { metric: "100%", label: "Client Satisfaction", desc: "Consistent excellence in execution" },
              { metric: "$10M+", label: "Revenue Generated", desc: "For portfolio companies and clients" },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 border border-amber-600/30 hover:border-amber-400/60 transition-all hover:shadow-lg hover:shadow-amber-500/20"
              >
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200 mb-4">
                  {item.metric}
                </div>
                <h3 className="text-xl font-semibold text-amber-300 mb-2">{item.label}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Investment Ready */}
      <section ref={contactSectionRef} className="relative py-20 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-200">
            Let's Build Together
          </h2>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-8 md:p-12 border border-amber-600/30 shadow-2xl hover:border-amber-400/60 transition-all">
            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-amber-200 mb-2 font-semibold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-amber-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-amber-200 mb-2 font-semibold">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-amber-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-amber-200 mb-2 font-semibold">Your Message</label>
                <textarea
                  name="message"
                  placeholder="Tell me about your vision..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-amber-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-semibold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50 text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Start Conversation"}
              </button>

              {submitMessage && (
                <p
                  className={`text-center font-semibold ${submitMessage.includes("successfully") ? "text-green-400" : "text-red-400"}`}
                >
                  {submitMessage}
                </p>
              )}
            </form>

            <div className="mt-12 pt-8 border-t border-amber-600/30">
              <p className="text-amber-100 mb-6 text-center font-light">Direct Contact:</p>
              <div className="space-y-3 text-center">
                <p className="text-amber-50">
                  <span className="text-amber-300 font-semibold">Email:</span> ahmedbakrofficiall@gmail.com
                </p>
              </div>

              <div className="flex justify-center gap-6 mt-8">
                <a
                  href="https://www.linkedin.com/in/ahmed-bakr-635692274/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 border border-amber-600/30 rounded-full hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 group"
                  title="Connect on LinkedIn"
                >
                  <span className="text-xl">💼</span>
                  <span className="text-amber-100 group-hover:text-blue-300 font-semibold transition-colors">
                    LinkedIn
                  </span>
                </a>
              </div>

              <p className="text-gray-400 text-sm mt-4 text-center font-light">
                Connect with me on LinkedIn to explore partnership opportunities and stay updated on my latest ventures
                in business strategy and digital innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 md:px-8 border-t border-amber-600/30 bg-slate-900/50">
        <div className="max-w-6xl mx-auto text-center text-amber-200/60 font-light">
          <p>© 2025 Ahmed Bakr. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  )
}
