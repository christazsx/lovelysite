'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AudioGenerator } from '@/utils/audio-generator'
import { AudioToggle } from '@/components/audio-toggle'

const loveNotes = [
  "You're my favorite person 💕",
  "I love your laugh 😊",
  "You make everything better ✨",
  "You're absolutely amazing 🌟",
  "I'm grateful for you 🙏",
  "You light up my world 💡",
  "You're one in a million 💎",
  "I believe in you 💪",
  "You're perfectly imperfect 💖",
  "You deserve all the love 🌹",
  "You're my sunshine ☀️",
  "I'm proud of you 🏆",
  "You're incredibly special 🦋",
  "You make me smile 😄",
  "You're worth it all 💝"
]

const noteColors = [
  'bg-yellow-200 border-yellow-300',
  'bg-pink-200 border-pink-300',
  'bg-purple-200 border-purple-300',
  'bg-blue-200 border-blue-300',
  'bg-green-200 border-green-300',
  'bg-orange-200 border-orange-300'
]

interface Note {
  id: number
  message: string
  x: number
  y: number
  color: string
  rotation: number
}

export default function StickyNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [draggedNote, setDraggedNote] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const audioGenerator = useRef<AudioGenerator | null>(null)

  useEffect(() => {
    audioGenerator.current = new AudioGenerator()
  }, [])

  const addNote = () => {
    // Play sound effect
    if (audioGenerator.current) {
      audioGenerator.current.playPaperFlutter()
    }
    
    const newNote: Note = {
      id: Date.now(),
      message: loveNotes[Math.floor(Math.random() * loveNotes.length)],
      x: Math.random() * 60 + 10, // 10-70% from left
      y: Math.random() * 60 + 20, // 20-80% from top
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
      rotation: (Math.random() - 0.5) * 20 // -10 to 10 degrees
    }
    setNotes(prev => [...prev, newNote])
  }

  const handleMouseDown = (e: React.MouseEvent, noteId: number) => {
    const note = notes.find(n => n.id === noteId)
    if (!note || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const noteElement = e.currentTarget as HTMLElement
    const noteRect = noteElement.getBoundingClientRect()
    
    setDraggedNote(noteId)
    setDragOffset({
      x: e.clientX - noteRect.left,
      y: e.clientY - noteRect.top
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNote === null || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100
    const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100

    setNotes(prev => prev.map(note => 
      note.id === draggedNote 
        ? { ...note, x: Math.max(0, Math.min(85, x)), y: Math.max(0, Math.min(85, y)) }
        : note
    ))
  }

  const handleMouseUp = () => {
    setDraggedNote(null)
    setDragOffset({ x: 0, y: 0 })
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Love Zone
            </Button>
          </Link>
          
          <Button 
            onClick={addNote}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Love Note
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-orange-600 mb-4 px-4">
            💬 Sticky Notes of Love
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Drag the notes around and create your own love board ✨
          </p>
        </div>

        {/* Notes Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] bg-white/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl border-2 border-white/50 shadow-xl overflow-hidden mx-4 sm:mx-0"
          style={{ cursor: draggedNote ? 'grabbing' : 'default' }}
        >
          {/* Cork board texture */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, #8B4513 2px, transparent 2px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {notes.map((note) => (
            <div
              key={note.id}
              className={`
                absolute w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 p-3 sm:p-4 rounded-lg shadow-lg cursor-grab active:cursor-grabbing
                transform transition-transform duration-200 hover:scale-105 hover:shadow-xl
                ${note.color} border-2 select-none
                ${draggedNote === note.id ? 'z-50 scale-110' : 'z-10'}
              `}
              style={{
                left: `${note.x}%`,
                top: `${note.y}%`,
                transform: `rotate(${note.rotation}deg) ${draggedNote === note.id ? 'scale(1.1)' : ''}`,
              }}
              onMouseDown={(e) => handleMouseDown(e, note.id)}
            >
              {/* Pin */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full shadow-md border-2 border-red-600"></div>
              
              {/* Note Content */}
              <div className="h-full flex items-center justify-center text-center">
                <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                  {note.message}
                </p>
              </div>

              {/* Tape effect */}
              <div className="absolute -top-1 right-4 w-8 h-4 bg-white/60 transform rotate-12 rounded-sm"></div>
            </div>
          ))}

          {/* Instructions */}
          {notes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-2xl mb-4">📝</p>
                <p className="text-lg">Click "Add Love Note" to start creating your love board!</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {notes.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-lg text-gray-600">
              You have {notes.length} love note{notes.length !== 1 ? 's' : ''} on your board 💕
            </p>
          </div>
        )}
      </div>
      <AudioToggle />
    </div>
  )
}
