"use client"

import { useState } from "react"
import { GlareCard } from "@/components/ui/glare-card"
import {
  Globe,
  AlertTriangle,
  FileCheck,
  Phone,
  Heart,
  BarChart3,
  Wrench,
  GaugeCircle,
  SearchCheck,
  Languages,
  Briefcase,
} from "lucide-react"

export default function StackedGlareCards() {
  const [activeTab, setActiveTab] = useState(0)

  const features = [
    {
      title: "Understands Indian & International Languages",
      shortTitle: "Languages",
      description:
        "From Hindi, Tamil, and Marathi to English and beyond—RevenueGear analyzes voice data across languages to uncover insights, no matter how your customers speak.",
      icon: Globe,
    },
    {
      title: "Automatic Revenue Leak Classification",
      shortTitle: "Revenue Leak",
      description:
        "AI auto-tags every call with churn risk, service issues, overcharging, delay, or escalation—no manual effort needed.",
      icon: AlertTriangle,
    },
    {
      title: "Sales Intelligence",
      shortTitle: "Sales",
      description:
        "Understand customer budget, urgency to buy, test drive feedback, comparisons with competitors, and missed follow-ups—so your team can close faster.",
      icon: Briefcase,
    },
    {
      title: "100% Visibility & Analysis on All Recorded Calls",
      shortTitle: "Call Analysis",
      description:
        "Every single call is analyzed—outbound, inbound, Maintenance Reminders, PSFU—nothing is missed.",
      icon: SearchCheck,
    },
    {
      title: "Customer Sentiment Score in Each Call",
      shortTitle: "Sentiment Score",
      description:
        "Automatically detect tone and emotion to score every customer call—happy, neutral, or frustrated—at a glance.",
      icon: GaugeCircle,
    },
    {
      title: "Voice of Customer Dashboard",
      shortTitle: "Customer Dashboard",
      description:
        "Track positive and negative feedback, top complaint categories, sentiment trends, and team performance—all in one powerful view.",
      icon: BarChart3,
    },
    {
      title: "Service Insights",
      shortTitle: "Service",
      description:
        "Identify at-risk customers, repeat complaints, poor service quality, and unresolved issues. Get a daily hotlist to prevent churn and improve NPS.",
      icon: Wrench,
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-10">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
              activeTab === index
                ? "bg-white/90 text-gray-800 hover:bg-white shadow-lg border border-orange-200"
                : "text-white shadow-lg hover:shadow-xl border border-orange-300/50"
            }`}
            style={{
              backgroundColor: activeTab === index ? undefined : "#FF8C00",
            }}
          >
            {feature.shortTitle}
          </button>
        ))}
      </div>

      {/* Stacked Cards */}
      <div className="relative max-w-5xl mx-auto" style={{ height: "400px" }}>
        {features.map((feature, index) => {
          const isActive = index === activeTab
          const stackIndex = index - activeTab
          const isVisible = Math.abs(stackIndex) <= 2

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-out cursor-pointer ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{
                zIndex: isActive ? 50 : Math.max(0, 50 - Math.abs(stackIndex)),
                transform: `
                  translateY(${stackIndex * 12}px) 
                  translateX(${stackIndex * 8}px) 
                  scale(${1 - Math.abs(stackIndex) * 0.05})
                  rotateY(${stackIndex * 2}deg)
                `,
                transformOrigin: "center center",
              }}
              onClick={() => setActiveTab(index)}
            >
              <GlareCard
                className="flex flex-row items-center justify-start p-12 h-full gap-8 w-full min-h-[350px]"
                isHorizontal={true}
              >
                <div className="flex-shrink-0">
                  <feature.icon className="h-16 w-16 text-gray-800" />
                </div>
                <div className="text-left flex-1">
                  <h2 className="text-gray-800 font-bold text-4xl mb-4">{feature.title}</h2>
                  <p className="text-gray-700 text-xl leading-relaxed">{feature.description}</p>
                </div>
              </GlareCard>
            </div>
          )
        })}
      </div>

      {/* Stack Indicator */}
      <div className="flex justify-center mt-8 gap-2 relative z-10">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
              activeTab === index ? "bg-white shadow-lg hover:bg-gray-100 border border-orange-200" : "hover:shadow-md"
            }`}
            style={{
              backgroundColor: activeTab === index ? undefined : "#FF8C00",
            }}
          />
        ))}
      </div>
    </div>
  )
}
