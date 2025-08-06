'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AudioGenerator } from '@/utils/audio-generator'
import { AudioToggle } from '@/components/audio-toggle'

const loveMessages = [
  "I love you in silence, but I hope you hear it anyway. 💕",
  "You're the reason I believe in love at first sight. ✨",
  "Every love song makes sense when I think of you. 🎵",
  "You're my favorite notification. 📱💖",
  "I'd choose you in every lifetime, in every universe. 🌟",
  "You make my heart skip beats like a broken record. 💓",
  "You're the plot twist I never saw coming. 📚💘",
  "I love you more than coffee, and that's saying something. ☕💕",
  "You're my favorite kind of magic. ✨💖",
  "I'd hold your hand in a horror movie. 🎬👻💕"
]

export default function EnvelopePage() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const audioGenerator = useRef<AudioGenerator | null>(null)

  useEffect(() => {
    audioGenerator.current = new AudioGenerator()
  }, [])

  const openEnvelope = () => {
    if (!isOpen) {
      // Play sound effect
      if (audioGenerator.current) {
        audioGenerator.current.playEnvelopeOpen()
      }
      
      setIsOpen(true)
      setCurrentMessage(loveMessages[Math.floor(Math.random() * loveMessages.length)])
      
      // Create sparkle effect
      const newSparkles = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }))
      setSparkles(newSparkles)
      
      // Clear sparkles after animation
      setTimeout(() => setSparkles([]), 2000)
    }
  }

  const openAnother = () => {
    setIsOpen(false)
    setSparkles([])
    setTimeout(() => {
      openEnvelope()
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 relative overflow-hidden">
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute text-2xl animate-ping pointer-events-none z-20"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDuration: '1s'
          }}
        >
          ✨
        </div>
      ))}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-pink-600 hover:text-pink-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Love Zone
            </Button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-pink-600 mb-8 text-center px-4">
            💌 Envelope of Love
          </h1>

          <div className="relative">
            {/* Envelope */}
            <div 
              className={`
                relative cursor-pointer transform transition-all duration-500
                ${isOpen ? 'scale-110' : 'hover:scale-105'}
              `}
              onClick={openEnvelope}
            >
              {/* Envelope Body */}
              <div className={`
                w-72 sm:w-80 md:w-96 h-48 sm:h-56 md:h-64 bg-gradient-to-br from-pink-200 to-rose-300 
                rounded-lg shadow-2xl border-4 border-white
                transition-all duration-500
                ${isOpen ? 'transform -translate-y-4' : ''}
              `}>
                {/* Envelope Flap */}
                <div className={`
                  absolute -top-2 left-0 w-full h-32
                  bg-gradient-to-br from-pink-300 to-rose-400
                  transform-gpu transition-all duration-700 ease-out
                  border-4 border-white rounded-t-lg
                  ${isOpen ? 'rotate-x-180 -translate-y-8' : ''}
                `} 
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformOrigin: 'top center',
                  transform: isOpen ? 'rotateX(180deg) translateY(-2rem)' : 'rotateX(0deg)'
                }}>
                  <Heart className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white w-8 h-8" />
                </div>

                {/* Envelope Content */}
                <div className="p-6 pt-8 h-full flex items-center justify-center">
                  {!isOpen ? (
                    <p className="text-pink-700 text-lg font-medium text-center">
                      Click to open your love letter 💕
                    </p>
                  ) : (
                    <div className="text-center animate-fade-in">
                      <div className="bg-white/90 rounded-lg p-4 sm:p-6 shadow-lg backdrop-blur-sm max-w-xs sm:max-w-sm">
                        <p className="text-pink-800 text-base sm:text-lg font-medium leading-relaxed">
                          {currentMessage}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Open Another Button */}
            {isOpen && (
              <div className="text-center mt-8 animate-fade-in">
                <Button 
                  onClick={openAnother}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Open Another Letter 💌
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AudioToggle />
    </div>
  )
}
