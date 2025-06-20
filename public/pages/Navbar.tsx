"use client"

import { useState } from "react"
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/Navbar"
import {
  Globe,
  AlertCircle,
  Tag,
  Phone,
  HeartPulse,
  BarChart3,
} from "lucide-react"

const services = [
  {
    name: "International & Indian Language Support",
    description:
      "Understands customer calls in any language with 95%+ accuracy",
    icon: <Globe className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Detects All Revenue Leaks",
    description:
      "Churn signals, repeat complaints, missed follow-ups, and overcharging patterns",
    icon: <AlertCircle className="w-6 h-6 text-rose-500" />,
  },
  {
    name: "Automatic Complaint Classification",
    description:
      "AI-powered tagging and categorization with zero manual work required",
    icon: <Tag className="w-6 h-6 text-purple-500" />,
  },
  {
    name: "100% Call Review",
    description:
      "Analyzes every call including maintenance reminders and post-service calls",
    icon: <Phone className="w-6 h-6 text-green-500" />,
  },
  {
    name: "Customer Sentiment Score",
    description:
      "Real-time detection of frustration and happiness from voice tone",
    icon: <HeartPulse className="w-6 h-6 text-orange-500" />,
  },
  {
    name: "Voice of Customer Dashboard",
    description:
      "Track team performance, feedback trends, and customer satisfaction",
    icon: <BarChart3 className="w-6 h-6 text-cyan-500" />,
  },
]

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <nav className="w-full relative z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-6 py-4 w-full">
        {/* Left - Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md">
            <img
              src="/logo.png" 
              alt="RevenueGear Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a placeholder or default image
                e.currentTarget.src = "https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=RG"
              }}
            />
          </div>
          <span className="text-xl font-semibold text-black dark:text-white">
            REVENUEGEAR
          </span>
        </div>

        {/* Center - Navigation */}
        <div className="flex-1 flex justify-center">
          <Menu setActive={setActive}>
            {/* Services Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="grid grid-cols-2 gap-4 p-4 text-sm max-w-3xl">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 max-w-sm"
                  >
                    <div className="mt-1">{service.icon}</div>
                    <div>
                      <p className="font-semibold text-black dark:text-white">
                        {service.name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </MenuItem>

            {/* Products Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="text-sm grid grid-cols-1 gap-30 p-4">
                <ProductItem
                  title="REVLABS"
                  href="https://revlabs.tech/"
                  src="https://revlabs.tech/_next/static/media/Hero3.6b108da8.svg"
                  description="Unify data from within and outside your company—ask questions in plain English and unlock actionable intelligence."
                />
                
              </div>
            </MenuItem>

            {/* Pricing Dropdown */}
            
          </Menu>
        </div>

        {/* Right - Contact */}
        <div>
          <a
            href="https://revlabs.tech/#contact"
            className="bg-yellow-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  )
}
