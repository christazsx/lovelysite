'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Pause, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AudioToggle } from '@/components/audio-toggle'

const loveSongs = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    quote: "This song feels like holding hands with your heart. 💕",
    color: "from-pink-400 to-rose-500",
    mood: "romantic",
    audioUrl: "/audio/perfect-ed-sheeran.mp3"
  },
  {
    title: "All of Me",
    artist: "John Legend",
    quote: "Every imperfection is perfectly perfect. ✨",
    color: "from-purple-400 to-pink-500",
    mood: "devoted",
    audioUrl: "/audio/all-of-me-john-legend.mp3"
  },
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    quote: "Growing old together never sounded so beautiful. 🌹",
    color: "from-red-400 to-pink-500",
    mood: "eternal",
    audioUrl: "/audio/thinking-out-loud.mp3"
  },
  {
    title: "A Thousand Years",
    artist: "Christina Perri",
    quote: "Time stops when love is this deep. ⏰💖",
    color: "from-indigo-400 to-purple-500",
    mood: "timeless",
    audioUrl: "/audio/thousand-years.mp3"
  },
  {
    title: "Blue",
    artist: "Yung Kai",
    quote: "My love will always stay by you😍",
    color: "from-orange-400 to-red-500",
    mood: "irresistible",
    audioUrl: "/audio/blue-yung-kai.mp3"
  },
  {
    title: "I Love You So",
    artist: "The Walters",
    quote: "I hope you feel what I felt when you shattered my soul✨",
    color: "from-yellow-400 to-orange-500",
    mood: "classic",
    audioUrl: "/audio/i-love-you-so.mp3"
  }
]

export default function PlaylistPage() {
  const [playingSong, setPlayingSong] = useState<number | null>(null)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({})

  const togglePlay = (index: number) => {
    // Stop currently playing audio
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }

    if (playingSong === index) {
      setPlayingSong(null)
      setCurrentAudio(null)
      setHearts([])
    } else {
      // Create or get audio element with specific song URL
      if (!audioRefs.current[index]) {
        audioRefs.current[index] = new Audio(loveSongs[index].audioUrl)
        audioRefs.current[index].loop = true
        audioRefs.current[index].volume = 0.5
        audioRefs.current[index].crossOrigin = "anonymous"
      }

      const audio = audioRefs.current[index]
      audio.play().catch(error => {
        console.log('Audio play failed:', error)
        // Fallback: show visual feedback even without audio
      })

      setCurrentAudio(audio)
      setPlayingSong(index)
      
      // Create floating hearts animation
      const newHearts = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }))
      setHearts(newHearts)
      
      // Clear hearts after animation
      setTimeout(() => setHearts([]), 3000)
    }
  }

  useEffect(() => {
    return () => {
      // Cleanup audio on unmount
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause()
        audio.currentTime = 0
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 relative overflow-hidden">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-3xl animate-bounce pointer-events-none z-10 opacity-70"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDuration: '2s'
          }}
        >
          💖
        </div>
      ))}

      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Love Zone
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-purple-600 mb-4 px-4">
            🎧 Love Playlist
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Songs that make hearts flutter and souls dance together ✨
          </p>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
          {loveSongs.map((song, index) => (
            <Card 
              key={index}
              className={`
                group cursor-pointer transform transition-all duration-300 hover:scale-105
                ${playingSong === index ? 'ring-4 ring-pink-300 shadow-2xl' : 'hover:shadow-xl'}
                bg-gradient-to-br ${song.color} border-0 overflow-hidden
              `}
              onClick={() => togglePlay(index)}
            >
              <CardContent className="p-4 sm:p-6 text-white relative">
                {/* Play/Pause Button */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`
                    w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm
                    flex items-center justify-center transition-all duration-300
                    ${playingSong === index ? 'animate-pulse' : 'group-hover:scale-110'}
                  `}>
                    {playingSong === index ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" />
                    )}
                  </div>
                  
                  {playingSong === index && (
                    <Heart className="w-6 h-6 text-white animate-bounce" />
                  )}
                </div>

                {/* Song Info */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-1">{song.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm">{song.artist}</p>
                </div>

                {/* Quote */}
                <div className={`
                  bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 transition-all duration-300
                  ${playingSong === index ? 'bg-white/20' : ''}
                `}>
                  <p className="text-xs sm:text-sm italic leading-relaxed">
                    {song.quote}
                  </p>
                </div>

                {/* Playing Indicator */}
                {playingSong === index && (
                  <div className="absolute top-4 right-4">
                    <div className="flex space-x-1">
                      <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                      <div className="w-1 h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}

                {/* Sparkle Effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-2 right-8 text-white animate-spin">✨</div>
                  <div className="absolute bottom-2 left-8 text-white animate-bounce">💫</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Now Playing */}
        {playingSong !== null && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-pink-200">
              <p className="text-pink-600 font-medium text-center">
                Now Playing: {loveSongs[playingSong].title} 🎵
              </p>
            </div>
          </div>
        )}
      </div>
      <AudioToggle />
    </div>
  )
}
