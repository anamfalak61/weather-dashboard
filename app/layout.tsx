import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'Weather Dashboard',
  description: 'Search the weather in any city',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="min-h-screen text-emerald-50 antialiased"
        style={{ background: 'radial-gradient(circle at top, #0d2b1f 0%, #04100a 65%)' }}
      >
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>
      </body>
    </html>
  )
}