"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../pages/Navbar";
import { ThreeDMarquee } from "../components/ui/container-scroll-animation";
import { TypewriterEffectSmooth } from "../components/ui/text-generate-effect";
import { Tabs } from "../components/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { FeatureCard } from "../components/FeatureCard";
import {
  Globe,
  Settings,
  FlaskConical,
  FileText,
  Sparkles,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import Hero from '../pages/hero';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Animation from '../pages/animation';


gsap.registerPlugin(ScrollTrigger);

 const words = [
  { text: "95% of customer calls at a vehicle dealership" },
  { text: "are never reviewed." },
  {
    text: "That’s why customers leave silently.",
    className: "text-yellow-500 dark:text-orange-500",
  },
];


// Card data with natural sizing
const cardData = [
  { image: "src/pages/1.jpg" },
  { image: "src/pages/2.jpg" },
  { image: "src/pages/3.jpg" },
  { image: "src/pages/4.jpg" },
  { image: "src/pages/5.jpg" },
  { image: "src/pages/6.jpg" },
  { image: "src/pages/7.jpg" },
  { image: "src/pages/8.jpg" },
  { image: "src/pages/9.jpg" },
  { image: "src/pages/10.jpg" },
  { image: "src/pages/11.jpg" },
  { image: "src/pages/12.jpg" },
];

function MysteryHeading() {
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const text = heading.textContent;
    const words = text.split(' ');
    heading.innerHTML = words.map((word, i) => 
      `<span class="mystery-word inline-block mr-1 opacity-0 transform translate-y-8">${word}</span>`
    ).join('');

    const wordElements = heading.querySelectorAll('.mystery-word');
    
    // Animate words in
    wordElements.forEach((word, index) => {
      setTimeout(() => {
        word.style.transition = 'all 0.6s ease-out';
        word.style.opacity = '1';
        word.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  return (
    <div className="relative py-32 bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full animate-pulse"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-black leading-tight tracking-tight"
          >
            The                     Mystery            of              Vanishing
          </h2>
           <h2 
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-black leading-tight tracking-tight"
          >
             Customers
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center space-x-4"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-yellow-400" />
          <p className="text-lg md:text-xl text-black-300 font-medium">
            Discover the business story
          </p>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-yellow-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex justify-center space-x-8"
        >
          {[
            { icon: '📊', label: 'Analytics' },
            { icon: '🎯', label: 'Strategy' },
            { icon: '💼', label: 'Business' },
            { icon: '🔍', label: 'Insights' }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center space-y-2 opacity-70 hover:opacity-100 transition-opacity duration-300"
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            >
              <div className="text-2xl md:text-3xl">
                {item.icon}
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF9F6] to-transparent" />
    </div>
  );
}

// Cards Scroll Animation Component
function CardsScrollAnimation() {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const comicPanels = [
    {
      id: 1,
      imagePlaceholder: "images/1.jpg"
    },
    {
      id: 2,
      imagePlaceholder: "images/2.jpg"
    },
    {
      id: 3,
      imagePlaceholder: "images/3.jpg"
    },
    {
      id: 4,
      imagePlaceholder: "images/4.jpg"
    },
     {
      id: 5,
      imagePlaceholder: "images/5.jpg"
    },
     {
      id: 6,
      imagePlaceholder: "images/6.jpg"
    },
     {
      id: 7,
      imagePlaceholder: "images/7.jpg"
    },
     {
      id: 8,
      imagePlaceholder: "images/8.jpg"
    },
     {
      id: 9,
      imagePlaceholder: "images/9.jpg"
    },
     {
      id: 10,
      imagePlaceholder: "images/10.jpg"
    },
     {
      id: 11,
      imagePlaceholder: "images/11.jpg"
    },
     {
      id: 12,
      imagePlaceholder: "images/12.jpg"
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentPanel((prev) => (prev + 1) % comicPanels.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, comicPanels.length]);

  const nextPanel = () => {
    setCurrentPanel((prev) => (prev + 1) % comicPanels.length);
  };

  const prevPanel = () => {
    setCurrentPanel((prev) => (prev - 1 + comicPanels.length) % comicPanels.length);
  };

  const goToPanel = (index) => {
    setCurrentPanel(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative py-32 bg-gradient-to-b from-white-50 via-amber-100 to-white-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-yellow-700 text-white text-center py-6">
            </div>

            <div className="relative h-6 md:h-[705px] bg-amber-900 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPanel}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={comicPanels[currentPanel].imagePlaceholder}
                    alt={`Comic Panel ${comicPanels[currentPanel].id}`}
                    className="w-full h-half object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={prevPanel}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-amber-500/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-amber-500/30 transition-all duration-300 z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextPanel}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-500/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-amber-500/30 transition-all duration-300 z-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="bg-amber-50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlayPause}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isPlaying 
                        ? 'bg-amber-600 text-white hover:bg-amber-700' 
                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                    }`}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <span className="text-amber-800 font-medium">
                    Panel {currentPanel + 1} of {comicPanels.length}
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-2 mb-4">
                {comicPanels.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPanel(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentPanel 
                        ? 'bg-yellow-600 scale-125' 
                        : 'bg-amber-300 hover:bg-amber-400'
                    }`}
                  />
                ))}
              </div>

              <div className="w-full bg-amber-300 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-yellow-600 to-amber-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentPanel + 1) / comicPanels.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <div className="flex gap-4 pb-4">
              {comicPanels.map((panel, index) => (
                <button
                  key={panel.id}
                  onClick={() => goToPanel(index)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentPanel 
                      ? 'border-amber-600 scale-110' 
                      : 'border-amber-300 hover:border-amber-500'
                  }`}
                >
                  <img
                    src={panel.imagePlaceholder}
                    alt={`Panel ${panel.id}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const images = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];

  const tabs = [
  {
    title: "Global Language Intelligence",
    value: "product",
    content: (
      <FeatureCard
        icon={<Globe className="w-6 h-6 text-white" />}
        title="Global Language Intelligence"
        description="AI-powered multilingual understanding with 95%+ accuracy across international and Indian languages"
      />
    ),
  },
  {
    title: "Revenue Leak Detection",
    value: "Detects All Revenue Leaks",
    content: (
      <FeatureCard
        icon={<Settings className="w-6 h-6 text-white" />}
        title="Revenue Leak Detection"
        description="Advanced analytics to identify churn risks, billing issues, service gaps, and missed opportunities"
      />
    ),
  },
  {
    title: "Smart Complaint Categorization",
    value: "Automatic Complaint Classification",
    content: (
      <FeatureCard
        icon={<FlaskConical className="w-6 h-6 text-white" />}
        title="Smart Complaint Categorization"
        description="Intelligent auto-tagging system that organizes feedback into actionable business insights"
      />
    ),
  },
  {
    title: "Complete Call Analytics",
    value: "100% Visibility on All Recorded Calls",
    content: (
      <FeatureCard
        icon={<PhoneCall className="w-6 h-6 text-white" />}
        title="Complete Call Analytics"
        description="Comprehensive analysis of every customer interaction including service follow-ups and maintenance alerts"
      />
    ),
  },
  {
    title: "Customer Happiness Index",
    value: "Customer Sentiment Score",
    content: (
      <FeatureCard
        icon={<Sparkles className="w-6 h-6 text-white" />}
        title="Customer Happiness Index"
        description="Real-time emotion detection through voice patterns and conversation analysis"
      />
    ),
  },
  {
    title: "Voice Insights Dashboard",
    value: "Voice of Customer Dashboard",
    content: (
      <FeatureCard
        icon={<Sparkles className="w-6 h-6 text-white" />}
        title="Voice Insights Dashboard"
        description="Centralized command center for tracking sentiment trends, team performance, and business impact"
      />
    ),
  },
];


  return (
    <div className="bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 text-[#333333]">
      <Navbar />
      
      {/* Hero Section with 3D Marquee */}
      <div className="relative h-[40rem] overflow-hidden">
        <ThreeDMarquee images={images} />
        <div className="absolute inset-0 bg-amber-900/60 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20 px-4 text-center">
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to RevenueGear
            </motion.h1>
            <motion.p
              className="mt-4 text-lg md:text-2xl text-amber-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI-powered voice intelligence for dealerships to eliminate revenue
              leaks.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Text Generate Effect Section */}
      <div className="container mx-auto px-6 py-24 max-w-6xl text-center">
        <div className="text-5xl md:text-7xl font-extrabold text-amber-900">
          <TypewriterEffectSmooth words={words} />
        </div>
      </div>

      {/* Hero Component */}
      <div className="relative z-10 mb-20 mt-30">
        <Hero />
      </div>

      {/* Tabs Section - Now positioned between Hero and Mystery Heading */}
      <div className="relative z-20 w-full px-4 md:px-0 max-w-7xl mx-auto py-20 mb-20 bg-gradient-to-b from-white to-amber-50">
        <Tabs tabs={tabs} />
      </div>

      {/* Mystery Heading */}
      <div className="relative z-10 mt-40">
        <MysteryHeading />
      </div>

      {/* Cards Scroll Animation */}
      <CardsScrollAnimation />
    </div>
  );
}