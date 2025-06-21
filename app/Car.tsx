"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment, PerspectiveCamera } from "@react-three/drei"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import type { Group } from "three"
import { Poppins, Inter } from "next/font/google"
import {
  Brain,
  CheckCircle,
  Wrench,
  Briefcase,
  BarChart3,
  Frown,
  AlertTriangle,
  Search,
  Globe,
  Users,
  TrendingUp,
  Shield,
  Clock,
  FileText,
} from "lucide-react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

interface Brand {
  logo: string
}

const brands: Brand[] = [
  {
    logo: "brand1.png",
  },
  {
    logo: "brand-2.png",
  },
  {
    logo: "brand-3.png",
  },
  {
    logo: "brand4.png",
  },
  {
    logo: "brand-4.png",
  },
  {
    logo: "brand-6.png",
  },
  {
    logo: "brand7.png",
  },
  {
    logo: "brand-8.png",
  },
  {
    logo: "brand-9.png",
  },
  {
    logo: "brand-10.png",
  },
]

interface RotatingModelProps {
  scrollY: number
}

function RotatingModel({ scrollY }: RotatingModelProps) {
  const modelRef = useRef<Group>(null)
  const { scene } = useGLTF("20.glb")

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = scrollY * 0.005
      modelRef.current.rotation.x = Math.sin(scrollY * 0.003) * 0.1
      // Remove any position changes - keep the car fixed in place
    }
  })

  return (
    <group ref={modelRef} scale={[1, 1, 1]} position={[0, -1.8, 0]}>
      <primitive object={scene} />
    </group>
  )
}

interface SceneProps {
  scrollY: number
}

function Scene({ scrollY }: SceneProps) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, -0.3, 6]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />
      <RotatingModel scrollY={scrollY} />
      <Environment preset="city" />

      {/* Warm transparent overlay */}
      <mesh position={[0, -0.44, 4.9]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#FEF3C7" transparent={true} opacity={0.7} />
      </mesh>
    </>
  )
}

const FlyText = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  flyDirection = "up",
  flyDistance = 100,
  scale = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  flyDirection?: "up" | "down" | "left" | "right"
  flyDistance?: number
  scale?: boolean
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: `-${threshold * 100}% 0px -${threshold * 100}% 0px`,
  })

  let initialX = 0
  let initialY = 0
  let exitX = 0
  let exitY = 0

  switch (flyDirection) {
    case "up":
      initialY = flyDistance
      exitY = -flyDistance
      break
    case "down":
      initialY = -flyDistance
      exitY = flyDistance
      break
    case "left":
      initialX = flyDistance
      exitX = -flyDistance
      break
    case "right":
      initialX = -flyDistance
      exitX = flyDistance
      break
  }

  return (
    <div ref={ref} className="overflow-visible">
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{
              opacity: 0,
              x: initialX,
              y: initialY,
              scale: scale ? 0.5 : 1,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: exitX,
              y: exitY,
              scale: scale ? 0.5 : 1,
              transition: {
                duration: duration * 0.8,
                ease: [0.32, 0.72, 0, 1],
              },
            }}
            transition={{
              duration: duration,
              delay: delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const EnhancedStaggeredText = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  flyDirection = "up",
  flyDistance = 80,
  style,
}: {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  flyDirection?: "up" | "down" | "left" | "right"
  flyDistance?: number
  style?: React.CSSProperties
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" })
  const words = text.split(" ")

  let initialX = 0
  let initialY = 0

  switch (flyDirection) {
    case "up":
      initialY = flyDistance
      break
    case "down":
      initialY = -flyDistance
      break
    case "left":
      initialX = flyDistance
      break
    case "right":
      initialX = -flyDistance
      break
  }

  return (
    <div ref={ref} className={className}>
      <AnimatePresence>
        {isInView && (
          <div className="flex flex-wrap justify-center gap-2">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  x: initialX,
                  y: initialY,
                  scale: 0.3,
                  rotateX: -45,
                  rotateY: flyDirection === "left" || flyDirection === "right" ? -30 : 0,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: delay + index * staggerDelay,
                  ease: [0.215, 0.61, 0.355, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                className="inline-block whitespace-nowrap"
                style={{
                  transformOrigin: "center center",
                  textShadow: "0 4px 8px rgba(249, 160, 27, 0.3)",
                  fontFamily: poppins.style.fontFamily,
                  ...style,
                }}
                whileHover={{
                  scale: 1.1,
                  color: "#F9A01B",
                  textShadow: "0 6px 12px rgba(249, 160, 27, 0.5)",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div className="flex-shrink-0 mx-6 group cursor-pointer">
      <div className="relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
        <img
          src={brand.logo || "logo.png"}
          alt="Brand Logo"
          className="w-32 h-32 object-contain transition-all duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  )
}

// Our Contributions Component
const OurContributions: React.FC = () => {
  const contributions = [
    {
      icon: Users,
      title: "Daily Customer Hotlist",
      description: "Know who to save or convert.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: "Upto 25% Customer Retention",
      description: "Save at-risk customers with timely action.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: BarChart3,
      title: "40% More Insights",
      description: "Compared to manual data capturing.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Shield,
      title: "100% Customer Voice Visibility",
      description: "Analyze every call, every sentiment.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Clock,
      title: "Faster Issue Resolution",
      description: "Spot service gaps. Fix fast.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: FileText,
      title: "Simple English Reports",
      description: "Just ask for reports in simple English.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
  ]

  return (
    <section id="contributions" className="py-1 bg-transparent">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-inter bold text-gray-900 mb-6 ${poppins.className}`}>
            Our Contributions To{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Your Business
            </span>
          </h2>
        </motion.div>

        {/* Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributions.map((contribution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer text-center"
              whileHover={{
                boxShadow: "0 20px 40px rgba(249, 160, 27, 0.3)",
                y: -8,
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div
                className={`w-16 h-16 ${contribution.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                <contribution.icon size={32} className={contribution.color} />
              </div>

              <h3
                className={`text-xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors mb-4 ${poppins.className}`}
              >
                {contribution.title}
              </h3>

              <p className={`text-gray-600 leading-relaxed ${poppins.className}`}>{contribution.description}</p>

              <div className="mt-6 flex items-center justify-center text-amber-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Component integrated
const Features: React.FC = () => {
  const capabilities = [
    {
      icon: CheckCircle,
      title: "21 points checklist",
      description: "Every call goes through a 21-point checklist uncovering both service and sales insights.",
    },
    {
      icon: Wrench,
      title: "Service Insights",
      description:
        "Identify at-risk customers, repeat complaints, poor service quality, and unresolved issues. Get a daily hotlist to prevent churn and improve NPS score.",
    },
    {
      icon: Briefcase,
      title: "Sales Intelligence",
      description:
        "Understand customer budget, urgency to buy, test drive feedback, comparisons with competitors—So your team is focusing on the right leads.",
    },
    {
      icon: BarChart3,
      title: "Voice of Customer Dashboard",
      description:
        "Track positive and negative feedback, top complaint categories, sentiment trends, and team performance—all in one powerful view.",
    },
    {
      icon: Frown,
      title: "Customer Sentiment Score in Each Call",
      description: "Automatically detect tone and emotion to score every customer call.",
    },
    {
      icon: AlertTriangle,
      title: "Automatic Revenue Leak Classification",
      description: "AI Agent tags every call where focus is needed— 0% manual effort needed.",
    },
    {
      icon: Search,
      title: "100% Visibility & Analysis on All Recorded Calls",
      description: "Every single call is analyzed—outbound, inbound, Maintenance Reminders, PSFU—nothing is missed.",
    },
    {
      icon: Globe,
      title: "Understands Indian & International Languages",
      description:
        "English,Hindi, Tamil, Marathi, Malayalam, Kannada, Telugu, RevenueGear analyzes customer voice data across languages and dialects.",
    },
  ]

  return (
    <section id="capabilities" className="py-20 bg-transparent">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-inter bold text-gray-900 mb-6 ${poppins.className}`}>
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              Capabilities
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              whileHover={{
                boxShadow: "0 20px 40px rgba(249, 160, 27, 0.3)",
                y: -10,
                scale: 1.08,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <capability.icon size={24} className="text-white" />
              </div>
              <h3
                className={`text-xl font-bold text-gray-900 group-hover:text-INTER BOLD-700 transition-colors ${poppins.className}`}
              >
                {capability.title}
              </h3>
              <p className={`text-gray-600 leading-relaxed ${poppins.className}`}>{capability.description}</p>

              <div className="mt-6 flex items-center text-amber-600 font-INTER BOLD opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function RevenueGearLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  const [scrollDirection, setScrollDirection] = useState("up")
  const [lastScrollY, setLastScrollY] = useState(0)

  // Model opacity and scale - keep fixed size and position
  const modelOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  // Remove the modelScale transform completely

  const [audioStarted, setAudioStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Audio handling - more aggressive autoplay detection
  useEffect(() => {
    let hasTriedAutoplay = false

    const tryPlayAudio = async () => {
      if (!audioRef.current || audioStarted) return

      try {
        audioRef.current.volume = 0.5
        await audioRef.current.play()
        setAudioStarted(true)
        console.log("Audio started successfully")
        return true
      } catch (error) {
        console.log("Audio play attempt failed:", error)
        return false
      }
    }

    // Try to play immediately on component mount
    const attemptAutoplay = async () => {
      if (hasTriedAutoplay) return
      hasTriedAutoplay = true

      const success = await tryPlayAudio()
      if (success) {
        // Remove all listeners if successful
        document.removeEventListener("click", handleInteraction)
        document.removeEventListener("scroll", handleInteraction)
        document.removeEventListener("touchstart", handleInteraction)
        document.removeEventListener("keydown", handleInteraction)
        document.removeEventListener("mousemove", handleInteraction)
        window.removeEventListener("focus", handleInteraction)
      }
    }

    const handleInteraction = async () => {
      const success = await tryPlayAudio()
      if (success) {
        // Remove all listeners after successful start
        document.removeEventListener("click", handleInteraction)
        document.removeEventListener("scroll", handleInteraction)
        document.removeEventListener("touchstart", handleInteraction)
        document.removeEventListener("keydown", handleInteraction)
        document.removeEventListener("mousemove", handleInteraction)
        window.removeEventListener("focus", handleInteraction)
      }
    }

    // Try autoplay first
    attemptAutoplay()

    // Add multiple event listeners for user interaction
    document.addEventListener("click", handleInteraction, { passive: true })
    document.addEventListener("scroll", handleInteraction, { passive: true })
    document.addEventListener("touchstart", handleInteraction, { passive: true })
    document.addEventListener("keydown", handleInteraction, { passive: true })
    document.addEventListener("mousemove", handleInteraction, { passive: true })
    window.addEventListener("focus", handleInteraction, { passive: true })

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("scroll", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
      document.removeEventListener("mousemove", handleInteraction)
      window.removeEventListener("focus", handleInteraction)
    }
  }, [audioStarted])

  // Additional audio setup and retry mechanism
  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    // Set up audio properties
    audio.preload = "auto"
    audio.volume = 0.5

    // Try to load the audio
    const handleCanPlay = () => {
      console.log("Audio can play")
    }

    const handleLoadedData = () => {
      console.log("Audio loaded")
    }

    const handleError = (e: Event) => {
      console.log("Audio error:", e)
    }

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadeddata", handleLoadedData)
    audio.addEventListener("error", handleError)

    // Force load
    audio.load()

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadeddata", handleLoadedData)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }

      setLastScrollY(currentScrollY)
      setScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div className={`relative min-h-screen ${poppins.className}`} style={{ backgroundColor: "#F0F0E6" }}>
      {/* Audio Element - plays once until it ends */}
      <audio ref={audioRef} preload="auto" style={{ display: "none" }}>
        <source src="1000.mp4" type="audio/mp4" />
        <source src="1000.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Navigation Header */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2"
        style={{ backgroundColor: "white" }} // Exact match from logo
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Logo on the left */}
        <motion.img
          src="321.png"
          alt="Revenue Gear Logo"
          className="w-[120px] h-auto object-contain"
          initial={{ y: 0 }}
          animate={{ y: -3 }}
          whileHover={{
            scale: 1.05,
            y: -8,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        />

        {/* Navigation Menu - centered */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#hero"
            className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Home
          </a>
          <a
            href="#brands"
            className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Our Brands
          </a>
          <a
            href="#contributions"
            className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("contributions")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Our Contributions
          </a>
          <a
            href="#capabilities"
            className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Our Capabilities
          </a>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden"
          >
            <div className="flex flex-col space-y-4 p-4">
              <a
                href="#hero"
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Home
              </a>
              <a
                href="#brands"
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Our Brands
              </a>
              <a
                href="#contributions"
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  document.getElementById("contributions")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Our Contributions
              </a>
              <a
                href="#capabilities"
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault()
                  setMobileMenuOpen(false)
                  document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Our Capabilities
              </a>
            </div>
          </motion.div>
        )}

        {/* Contact Us Button on the right */}
        <motion.a
          href="https://revlabs.tech/#contact"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium tracking-wide shadow-md text-xs md:text-sm transition-all text-center"
          style={{
            background: `linear-gradient(to right, #F9A01B, #F97316)`,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 6px 12px rgba(249, 160, 27, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex flex-col items-center justify-center">
            <span>Hear Every Customer.</span>
            <span>Fix What Matters. Now!</span>
          </span>
        </motion.a>
      </motion.nav>

      {/* 3D Model Section */}
      <motion.div
        className="fixed inset-0 w-full h-full"
        style={{
          opacity: modelOpacity,
          // Remove scale: modelScale
        }}
      >
        <Canvas className="w-full h-full">
          <Scene scrollY={scrollY} />
        </Canvas>
      </motion.div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            {/* Main Headline - Centered */}
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-4xl font-bold text-gray-900 mb-10 leading-tight max-w-5xl mx-auto"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  You never forget a bad experience.
                </span>
                <br />
                <span className="text-gray-900">95% of car dealership calls go unreviewed —</span>
                <br></br>
                <span className="text-gray-900">That's when customers leave and revenue leaks.</span>
              </motion.h1>
            </div>

            {/* Content Grid - Two columns below headline */}
            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
              {/* Left Content - Descriptive Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-13px text-black-600 leading-relaxed"
                >
                  Only <span className="text-orange-500 font-bold">1</span> in{" "}
                  <span className="text-orange-500 font-bold">75</span> customer calls gets reviewed at a car dealership
                  — the rest go unheard.
                  <br />
                  <br />
                  <span className="text-orange-500 font-bold">RevenueGear's</span> AI agent analyzes{" "}
                  <span className="text-orange-500 font-bold">100%</span> of your customer calls. Flag customer churn
                  risks, repeat issues, poor service quality gaps etc. instantly.
                  <br />
                  Unlock sales signals like budget, competitor brands analysis, test drive feedback, and buying intent.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-13px text-darkgray-600 leading-relaxed"
                >
                  Get a <span className="text-orange-500 font-bold">hotlist</span> of at-risk customers to retain and
                  sales inquiries that could convert — with 360 voice analytics and agent performance – across Indian
                  and global languages.
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
                ></motion.div>
              </motion.div>

              {/* Right Content - Call Analysis Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <div className="space-y-6">
                    {/* Waveform Animation - Smoother version */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Brain size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-2">Call Analysis</div>
                        <div className="flex items-center gap-1">
                          {[...Array(15)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-gradient-to-t from-amber-500 to-orange-500 rounded-full"
                              style={{ height: `${Math.random() * 20 + 15}px` }}
                              animate={{
                                height: [
                                  `${Math.random() * 20 + 15}px`,
                                  `${Math.random() * 25 + 10}px`,
                                  `${Math.random() * 20 + 15}px`,
                                ],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.15,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Insights */}
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-700 font-medium">High churn risk detected</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-amber-700 font-medium">Customer frustration: High</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.4 }}
                        className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-700 font-medium">Can Save Customer: Yes</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted Brands Section */}
        <div id="brands" className="relative z-10 py-2">
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-inter bold text-gray-900 mb-8 ${poppins.className}`}>
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Customers'{" "}
              </span>
              <span className={`text-4xl lg:text-5xl font-inter bold text-gray-900 mb-8 ${poppins.className}`}>
                Brands
              </span>
            </h2>
          </div>

          {/* Single Line Brand Animation */}
          <div className="relative space-y-8 py-8">
            <div className="relative overflow-hidden">
              {/* Gradient Fade Effects */}
              <div className="absolute left-0 top-0 w-32 h-full bg-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-32 h-full bg-transparent z-10"></div>

              <div className="flex animate-scroll-left">
                {[...brands, ...brands, ...brands].map((brand, index) => (
                  <BrandLogo key={`brand-${index}`} brand={brand} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Contributions Section */}
        <OurContributions />

        {/* Features Section */}
        <Features />
      </div>

      {/* Custom CSS for horizontal animations */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
