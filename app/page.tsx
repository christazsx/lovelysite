'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Mail, Music, StickyNote, MousePointer, Palette } from 'lucide-react'
import { AudioToggle } from '@/components/audio-toggle'

export default function HomePage() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate floating hearts
    const heartArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }))
    setHearts(heartArray)
  }, [])

  const experiences = [
    {
      title: "💌 Envelope of Love",
      description: "Open sweet love letters just for you",
      href: "/envelope",
      icon: Mail,
      gradient: "from-pink-300 to-rose-400"
    },
    {
      title: "🎧 Love Playlist",
      description: "Songs that make hearts flutter",
      href: "/playlist",
      icon: Music,
      gradient: "from-purple-300 to-pink-400"
    },
    {
      title: "💬 Sticky Notes of Love",
      description: "Drag around sweet messages",
      href: "/sticky-notes",
      icon: StickyNote,
      gradient: "from-yellow-300 to-orange-400"
    },
    {
      title: "💕 Click-a-Heart",
      description: "Get cute compliments with every click",
      href: "/click-heart",
      icon: MousePointer,
      gradient: "from-red-300 to-pink-400"
    },
    {
      title: "🖼️ Love Vibes",
      description: "Express your current mood",
      href: "/mood-vibes",
      icon: Palette,
      gradient: "from-indigo-300 to-purple-400"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Hearts Background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-300 opacity-20 animate-bounce pointer-events-none"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: '3s'
          }}
        >
          💖
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
            Welcome to the Love Zone 💘
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Click around. Send love. Feel love. You deserve it. ✨
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
          {experiences.map((experience, index) => (
            <Link
              key={experience.href}
              href={experience.href}
              className="group"
            >
              <div className={`
                bg-gradient-to-br ${experience.gradient} 
                rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl 
                transform hover:scale-105 transition-all duration-300
                border border-white/20 backdrop-blur-sm
                hover:rotate-1 group-hover:animate-pulse
              `}>
                <div className="text-center">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <experience.icon className="w-12 h-12 mx-auto text-white drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
                    {experience.title}
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    {experience.description}
                  </p>
                </div>
                
                {/* Sparkle effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-4 right-4 text-white animate-spin">✨</div>
                  <div className="absolute bottom-4 left-4 text-white animate-bounce">💫</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-500 italic">
            Made with 💖 for spreading love and joy
          </p>
        </div>
      </div>
      <AudioToggle />
    </div>
  )
}
