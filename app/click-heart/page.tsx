'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AudioGenerator } from '@/utils/audio-generator'
import { AudioToggle } from '@/components/audio-toggle'

const compliments = [
  "You're cuter than a love song chorus. 🎵",
  "I'd hold your hand in a horror game. 👻💕",
  "You're my favorite notification. 📱✨",
  "You make my heart do little backflips. 🤸‍♀️💖",
  "You're the reason I smile at my phone. 📱😊",
  "You're like a warm hug on a cold day. 🤗",
  "You're my favorite kind of trouble. 😈💕",
  "You're the plot twist I never saw coming. 📚💘",
  "You're more addictive than my morning coffee. ☕💖",
  "You're the missing piece I didn't know I needed. 🧩",
  "You make ordinary moments feel magical. ✨",
  "You're my favorite person to think about. 💭💕",
  "You're the reason I believe in fairy tales. 🧚‍♀️",
  "You're like sunshine on a rainy day. ☀️🌧️",
  "You're my happy place. 🏠💖"
]

interface FloatingHeart {
  id: number
  x: number
  y: number
  size: number
  duration: number
}

interface Compliment {
  id: number
  text: string
  x: number
  y: number
}

export default function ClickHeartPage() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [compliment, setCompliment] = useState<Compliment | null>(null)
  const [clickCount, setClickCount] = useState(0)
  const audioGenerator = useRef<AudioGenerator | null>(null)

  // Generate initial floating hearts with responsive sizes
  useEffect(() => {
    const initialHearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      size: Math.random() * 20 + 15, // Smaller base size for mobile
      duration: Math.random() * 3 + 2
    }))
    setHearts(initialHearts)
  }, [])

  // Initialize audio generator
  useEffect(() => {
    audioGenerator.current = new AudioGenerator()
  }, [])

  const handleHeartClick = (e: React.MouseEvent, heartId: number) => {
    e.stopPropagation()
    
    // Play sound effect
    if (audioGenerator.current) {
      audioGenerator.current.playHeartPop()
    }
    
    // Get click position
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Show compliment
    const newCompliment = {
      id: Date.now(),
      text: compliments[Math.floor(Math.random() * compliments.length)],
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    }
    
    setCompliment(newCompliment)
    setClickCount(prev => prev + 1)
    
    // Create burst of small hearts
    const burstHearts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i + 1000,
      x: newCompliment.x + (Math.random() - 0.5) * 20,
      y: newCompliment.y + (Math.random() - 0.5) * 20,
      size: Math.random() * 15 + 10,
      duration: 1
    }))
    
    setHearts(prev => [...prev, ...burstHearts])
    
    // Clear compliment after 3 seconds
    setTimeout(() => {
      setCompliment(null)
    }, 3000)
    
    // Remove burst hearts after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => !burstHearts.some(burst => burst.id === heart.id)))
    }, 1000)
    
    // Move the clicked heart to a new position
    setHearts(prev => prev.map(heart => 
      heart.id === heartId 
        ? {
            ...heart,
            x: Math.random() * 90 + 5,
            y: Math.random() * 90 + 5,
            size: Math.random() * 20 + 15 // Smaller base size for mobile
          }
        : heart
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-50 to-rose-100 relative overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-red-600 hover:text-red-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Love Zone
            </Button>
          </Link>
          
          <div className="text-red-600 font-medium">
            Hearts clicked: {clickCount} 💕
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-red-600 mb-4 px-4">
            💕 Click-a-Heart
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Click the floating hearts to receive cute compliments! ✨
          </p>
        </div>

        {/* Floating Hearts */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute cursor-pointer transform hover:scale-125 transition-transform duration-200 z-10"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}px`,
              animation: `float ${heart.duration}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
            onClick={(e) => handleHeartClick(e, heart.id)}
          >
            💖
          </div>
        ))}

        {/* Compliment Popup */}
        {compliment && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${compliment.x}%`,
              top: `${compliment.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-2xl border-2 border-pink-200 max-w-xs sm:max-w-sm mx-4">
              <p className="text-pink-700 font-medium text-center text-base sm:text-lg">
                {compliment.text}
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r-2 border-b-2 border-pink-200"></div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 px-4">
          <div className="bg-white/90 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-pink-200">
            <p className="text-pink-600 font-medium text-center text-sm sm:text-base">
              Click the hearts for sweet compliments! 💕
            </p>
          </div>
        </div>

        {/* Achievement Messages */}
        {clickCount === 10 && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl p-6 shadow-2xl animate-pulse">
              <p className="text-2xl font-bold text-center">
                🎉 Heart Collector! You're amazing! 🎉
              </p>
            </div>
          </div>
        )}
      </div>
      <AudioToggle />
    </div>
  )
}
