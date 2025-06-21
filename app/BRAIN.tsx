"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  firstName: string
  lastName: string
  email: string
  dealership: string
  address: string
  phone: string
  message: string
}

export default function ContactForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    dealership: "",
    address: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.dealership || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    const subject = `Demo Request from ${formData.firstName} ${formData.lastName}`
    const body = `
      First Name: ${formData.firstName}
      Last Name: ${formData.lastName}
      Email: ${formData.email}
      Dealership: ${formData.dealership}
      Address: ${formData.address}
      Phone: ${formData.phone}
      Message: ${formData.message || "No message provided"}

      This request was submitted via the RevenueGear contact form.
    `.replace(/^\s+/gm, '')

    const encodedSubject = encodeURIComponent(subject)
    const encodedBody = encodeURIComponent(body)

    window.location.href = `mailto:anand@clickto.tech?subject=${encodedSubject}&body=${encodedBody}`

    toast({
      title: "Email Client Opened",
      description: "Please review and send the pre-filled email to contact us.",
    })
  }

  return (
    <section id="brain" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white relative overflow-hidden">
      {/* Background dots */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23fbbf24' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Start Catching Revenue Leak Signals{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Before They Cost You
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join leading dealerships already protecting millions in revenue with RevenueGear
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6">Request a Demo</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="dealership" className="block text-sm font-medium text-gray-300 mb-2">
                  Dealership Name *
                </label>
                <input
                  type="text"
                  id="dealership"
                  name="dealership"
                  value={formData.dealership}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your dealership name"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                  Dealership Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your dealership address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  placeholder="Tell us about your specific needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
              >
                Send Email
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
              <p className="text-gray-300 text-lg mb-8">
                Ready to transform your customer service and protect your revenue? Our team is here to help you get started.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-gray-300">+91 9632213191</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Email Us</div>
                  <div className="text-gray-300">anand@clickto.tech</div>
                </div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-6 rounded-2xl border border-amber-500/30 text-center">
              <h4 className="font-bold text-lg mb-2">Assuring Our Best, Always!</h4>
            </div>

            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-6 rounded-2xl border border-amber-500/30 text-center">
              <h4 className="font-bold text-lg mb-2">
                Made with <span className="text-red-500">❤️</span> at RevLabs
              </h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
