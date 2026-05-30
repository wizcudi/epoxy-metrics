import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EpoxyMetrics — Epoxy Flooring Job Board',
  description: 'Find epoxy flooring jobs or hire skilled installers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
          <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}