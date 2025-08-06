'use client'

// Generate simple audio tones for demo purposes
export class AudioGenerator {
  private audioContext: AudioContext | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  playHeartPop() {
    // Create a cute "pop" sound
    this.createTone(800, 0.1, 'sine')
    setTimeout(() => this.createTone(1200, 0.05, 'sine'), 50)
  }

  playSparkle() {
    // Create a magical sparkle sound
    this.createTone(1500, 0.1, 'triangle')
    setTimeout(() => this.createTone(1800, 0.08, 'triangle'), 30)
    setTimeout(() => this.createTone(2100, 0.06, 'triangle'), 60)
  }

  playEnvelopeOpen() {
    // Create a paper rustling sound
    this.createTone(200, 0.3, 'sawtooth')
    setTimeout(() => this.createTone(150, 0.2, 'sawtooth'), 100)
  }

  playPaperFlutter() {
    // Create a paper flutter sound
    this.createTone(300, 0.15, 'square')
    setTimeout(() => this.createTone(250, 0.1, 'square'), 80)
  }
}
