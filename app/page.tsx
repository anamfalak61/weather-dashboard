'use client'

import { useEffect, useState } from 'react'
import RecentSearches from '@/components/RecentSearches'
import SearchBar from '@/components/SearchBar'
import WeatherCard from '@/components/WeatherCard'
import { addCity, loadHistory } from '@/lib/history'
import type { SearchStatus, WeatherData } from '@/lib/types'
import { fetchWeather, WeatherApiError } from '@/lib/weather'

export default function Home() {
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  async function search(city: string) {
    setStatus('loading')
    setErrorMessage('')

    try {
      const data = await fetchWeather(city)
      setWeather(data)
      setHistory(addCity(data.name))
      setStatus('success')
    } catch (error) {
      setErrorMessage(
        error instanceof WeatherApiError
          ? error.message
          : 'Something went wrong. Please try again.',
      )
      setStatus('error')
    }
  }

  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Weather <span className="text-violet-600">Dashboard</span>
        </h1>
        <p className="mt-2 text-slate-500">Check the weather in any city, instantly.</p>
      </header>

      <SearchBar onSearch={search} disabled={status === 'loading'} />
      <RecentSearches cities={history} onSelect={search} />

      <div className="mt-8">
        {status === 'idle' && (
          <div className="rounded-3xl border-2 border-dashed border-violet-200 bg-white/60 p-10 text-center">
            <p aria-hidden="true" className="text-4xl">
              ⛅
            </p>
            <p className="mt-3 text-slate-600">Search for a city to see its weather.</p>
          </div>
        )}

        {status === 'loading' && (
          <div
            role="status"
            aria-label="Loading weather"
            className="animate-pulse rounded-3xl bg-white/80 p-8 shadow-lg ring-1 ring-violet-100"
          >
            <div className="h-4 w-1/3 rounded-full bg-slate-200" />
            <div className="mt-6 h-16 w-1/2 rounded-2xl bg-slate-200" />
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-200" />
            </div>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center font-medium text-red-700"
          >
            {errorMessage}
          </div>
        )}

        {status === 'success' && weather && <WeatherCard data={weather} />}
      </div>
    </div>
  )
}