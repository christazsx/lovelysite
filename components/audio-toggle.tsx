'use client'

import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSound } from './sound-manager'

export function AudioToggle() {
  const [isMuted, setIsMuted] = useState(false)
  const { setVolume } = useSound()

  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    setVolume(newMutedState ? 0 : 0.5)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMute}
      className="fixed top-2 sm:top-4 right-2 sm:right-4 z-50 bg-white/80 backdrop-blur-sm hover:bg-white/90 p-2 sm:p-3"
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      ) : (
        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      )}
    </Button>
  )
}
