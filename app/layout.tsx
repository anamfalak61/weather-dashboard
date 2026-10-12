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
        className="min-h-screen text-slate-900 antialiased"
        style={{ background: 'linear-gradient(180deg, #f5f3ff 0%, #f1f5f9 100%)' }}
      >
        <main className="mx-auto w-full max-w-md px-4 py-10 sm:py-16">{children}</main>
      </body>
    </html>
  )
}