'use client'

import { createContext, useContext, useRef, ReactNode } from 'react'

interface SoundContextType {
  playSound: (soundName: string) => void
  playMusic: (musicName: string) => void
  stopAllMusic: () => void
  setVolume: (volume: number) => void
}

const SoundContext = createContext<SoundContextType | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const soundsRef = useRef<{ [key: string]: HTMLAudioElement }>({})
  const musicRef = useRef<HTMLAudioElement | null>(null)

  const initializeSound = (soundName: string, src: string, volume = 0.5) => {
    if (!soundsRef.current[soundName]) {
      soundsRef.current[soundName] = new Audio(src)
      soundsRef.current[soundName].volume = volume
    }
    return soundsRef.current[soundName]
  }

  const playSound = (soundName: string) => {
    let audio: HTMLAudioElement

    switch (soundName) {
      case 'heartPop':
        audio = initializeSound('heartPop', '/audio/heart-pop.mp3', 0.3)
        break
      case 'envelopeOpen':
        audio = initializeSound('envelopeOpen', '/audio/envelope-open.mp3', 0.4)
        break
      case 'paperFlutter':
        audio = initializeSound('paperFlutter', '/audio/paper-flutter.mp3', 0.3)
        break
      case 'sparkle':
        audio = initializeSound('sparkle', '/audio/sparkle.mp3', 0.2)
        break
      default:
        return
    }

    audio.currentTime = 0
    audio.play().catch(error => console.log('Sound play failed:', error))
  }

  const playMusic = (musicName: string) => {
    stopAllMusic()
    
    let src: string
    switch (musicName) {
      case 'romantic':
        src = '/audio/romantic-bg.mp3'
        break
      case 'upbeat':
        src = '/audio/upbeat-bg.mp3'
        break
      case 'soft':
        src = '/audio/soft-bg.mp3'
        break
      case 'dreamy':
        src = '/audio/dreamy-bg.mp3'
        break
      default:
        return
    }

    musicRef.current = new Audio(src)
    musicRef.current.loop = true
    musicRef.current.volume = 0.3
    musicRef.current.play().catch(error => console.log('Music play failed:', error))
  }

  const stopAllMusic = () => {
    if (musicRef.current) {
      musicRef.current.pause()
      musicRef.current.currentTime = 0
      musicRef.current = null
    }
  }

  const setVolume = (volume: number) => {
    Object.values(soundsRef.current).forEach(audio => {
      audio.volume = volume
    })
    if (musicRef.current) {
      musicRef.current.volume = volume
    }
  }

  return (
    <SoundContext.Provider value={{ playSound, playMusic, stopAllMusic, setVolume }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}
