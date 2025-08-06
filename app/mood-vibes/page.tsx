'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AudioGenerator } from '@/utils/audio-generator'
import { AudioToggle } from '@/components/audio-toggle'

const moods = [
  {
    emoji: "💘",
    title: "In Love",
    description: "Head over heels, butterflies everywhere",
    gradient: "from-pink-400 via-red-400 to-rose-500",
    bgGradient: "from-pink-100 to-rose-200",
    quote: "Falling for you is my favorite accident. 💕",
    music: "romantic",
    particles: ["💕", "💖", "💗", "💘", "💝"]
  },
  {
    emoji: "😳",
    title: "Crushing",
    description: "That nervous excitement feeling",
    gradient: "from-purple-400 via-pink-400 to-red-400",
    bgGradient: "from-purple-100 to-pink-200",
    quote: "You make my heart skip like a broken record. 💓",
    music: "upbeat",
    particles: ["😊", "🥰", "😍", "🤗", "✨"]
  },
  {
    emoji: "🫠",
    title: "Blushing",
    description: "Melting from all the sweetness",
    gradient: "from-orange-400 via-pink-400 to-red-400",
    bgGradient: "from-orange-100 to-pink-200",
    quote: "You're the reason I smile at random moments. 😊",
    music: "soft",
    particles: ["☺️", "😌", "🥺", "💫", "🌸"]
  },
  {
    emoji: "🤞",
    title: "Hoping",
    description: "Wishing for something beautiful",
    gradient: "from-blue-400 via-purple-400 to-pink-400",
    bgGradient: "from-blue-100 to-purple-200",
    quote: "Maybe we're meant to find each other. 🌟",
    music: "dreamy",
    particles: ["🌟", "✨", "💫", "🌙", "🦋"]
  }
]

export default function MoodVibesPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [particles, setParticles] = useState<Array<{ id: number; emoji: string; x: number; y: number; delay: number }>>([])
  const audioGenerator = useRef<AudioGenerator | null>(null)

  useEffect(() => {
    audioGenerator.current = new AudioGenerator()
  }, [])

  const selectMood = (index: number) => {
    setSelectedMood(index)
    const mood = moods[index]

    if (audioGenerator.current) {
      audioGenerator.current.playSparkle() // sparkle sound stays
      audioGenerator.current.playMoodMusic(mood.music) // vibe music
    }

    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      emoji: mood.particles[Math.floor(Math.random() * mood.particles.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }))

    setParticles(newParticles)

    setTimeout(() => {
      setParticles([])
    }, 4000)
  }

  const resetMood = () => {
    setSelectedMood(null)
    setParticles([])

    if (audioGenerator.current) {
      audioGenerator.current.stopMoodMusic() // stop vibe music
    }
  }

  return (
    <div className={`
      min-h-screen transition-all duration-1000 relative overflow-hidden
      ${selectedMood !== null 
        ? `bg-gradient-to-br ${moods[selectedMood].bgGradient}` 
        : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100'
      }
    `}>
      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-4xl animate-bounce pointer-events-none z-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s'
          }}
        >
          {particle.emoji}
        </div>
      ))}

      <div className="container mx-auto px-4 py-8 relative z-20">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Love Zone
            </Button>
          </Link>

          {selectedMood !== null && (
            <Button 
              onClick={resetMood}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm"
            >
              Choose Another Mood
            </Button>
          )}
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-purple-600 mb-4 px-4">
            🖼️ Love Vibes
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            How are you feeling about love today? ✨
          </p>
        </div>

        {selectedMood === null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
            {moods.map((mood, index) => (
              <Card
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-0 overflow-hidden"
                onClick={() => selectMood(index)}
              >
                <CardContent className={`p-6 sm:p-8 bg-gradient-to-br ${mood.gradient} text-white relative`}>
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {mood.emoji}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{mood.title}</h3>
                    <p className="text-white/90 text-base sm:text-lg">{mood.description}</p>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute top-4 right-4 text-white animate-spin">✨</div>
                    <div className="absolute bottom-4 left-4 text-white animate-bounce">💫</div>
                    <div className="absolute top-1/2 left-4 text-white animate-pulse">💖</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <div className="text-6xl sm:text-7xl md:text-8xl mb-6 animate-bounce">
                {moods[selectedMood].emoji}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-700 mb-4">
                {moods[selectedMood].title}
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8">
                {moods[selectedMood].description}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50 mb-8 mx-4 sm:mx-0">
              <p className="text-lg sm:text-2xl md:text-3xl font-medium text-gray-700 italic leading-relaxed">
                {moods[selectedMood].quote}
              </p>
            </div>

            <div className={`
              w-full h-24 sm:h-32 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${moods[selectedMood].gradient} 
              shadow-2xl relative overflow-hidden mb-8 mx-4 sm:mx-0
            `}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-base sm:text-xl font-medium text-center px-4">
                  Your current love vibe ✨
                </div>
              </div>

              <div className="absolute top-4 left-8 text-white animate-pulse">💕</div>
              <div className="absolute bottom-4 right-8 text-white animate-bounce">💖</div>
              <div className="absolute top-1/2 left-1/4 text-white animate-spin">✨</div>
              <div className="absolute top-1/4 right-1/4 text-white animate-pulse">💫</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <p className="text-lg text-gray-600 mb-2">Perfect music for this mood:</p>
              <p className="text-xl font-medium text-gray-700 capitalize">
                {moods[selectedMood].music} vibes 🎵
              </p>
            </div>
          </div>
        )}
      </div>
      <AudioToggle />
    </div>
  )
}
