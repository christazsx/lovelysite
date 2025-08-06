import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SoundProvider } from '@/components/sound-manager'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Love Zone - Interactive Love Website',
  description: 'An interactive love-themed website designed to deliver cute, emotional, and playful micro-interactions around love, crushes, compliments, music, and emotional expression.',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SoundProvider>
          {children}
        </SoundProvider>
      </body>
    </html>
  )
}
