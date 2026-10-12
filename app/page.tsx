'use client'

import { useEffect, useState } from 'react'
import CurrentWeather from '@/components/CurrentWeather'
import ForecastPanel from '@/components/ForecastPanel'
import Highlights from '@/components/Highlights'
import OtherCities from '@/components/OtherCities'
import SearchBar from '@/components/SearchBar'
import type { Unit } from '@/lib/format'
import { addCity, loadHistory } from '@/lib/history'
import type { DashboardData, RecentCity, SearchStatus } from '@/lib/types'
import { fetchDashboard, WeatherApiError } from '@/lib/weather'

export default function Home() {
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [data, setData] = useState<DashboardData | null>(null)
  const [unit, setUnit] = useState<Unit>('C')
  const [errorMessage, setErrorMessage] = useState('')
  const [history, setHistory] = useState<RecentCity[]>([])

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  async function search(city: string) {
    setStatus('loading')
    setErrorMessage('')

    try {
      const result = await fetchDashboard(city)
      const condition = result.current.weather[0]

      setData(result)
      setHistory(
        addCity({
          name: result.current.name,
          country: result.current.sys.country,
          temp: result.current.main.temp,
          icon: condition?.icon ?? '01d',
          description: condition?.description ?? '',
        }),
      )
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
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Weather <span className="text-emerald-400">Dashboard</span>
        </h1>
        <div className="w-full sm:max-w-md">
          <SearchBar onSearch={search} disabled={status === 'loading'} />
        </div>
      </header>

      <div className="mt-8">
        {status === 'idle' && (
          <div className="rounded-3xl border-2 border-dashed border-emerald-400/30 bg-emerald-900/20 p-10 text-center">
            <p aria-hidden="true" className="text-4xl">
              ⛅
            </p>
            <p className="mt-3 text-emerald-100/80">Search for a city to see its weather.</p>
          </div>
        )}

        {status === 'loading' && (
          <div
            role="status"
            aria-label="Loading weather"
            className="animate-pulse rounded-3xl bg-emerald-900/40 p-8"
          >
            <div className="h-4 w-1/4 rounded-full bg-emerald-800/70" />
            <div className="mt-8 h-24 w-1/2 rounded-2xl bg-emerald-800/70" />
            <div className="mt-6 h-4 w-1/3 rounded-full bg-emerald-800/70" />
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-center font-medium text-red-200"
          >
            {errorMessage}
          </div>
        )}

        {status === 'success' && data && (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <CurrentWeather
                current={data.current}
                forecast={data.forecast}
                unit={unit}
                onUnitChange={setUnit}
              />
              <ForecastPanel current={data.current} forecast={data.forecast} unit={unit} />
            </div>
            <div className="space-y-6 lg:col-span-2">
              <Highlights current={data.current} forecast={data.forecast} />
              <OtherCities
                cities={history}
                activeName={data.current.name}
                unit={unit}
                onSelect={search}
              />
            </div>
          </div>
        )}

        {status !== 'success' && (
          <div className="mt-8">
            <OtherCities cities={history} activeName="" unit={unit} onSelect={search} />
          </div>
        )}
      </div>
    </div>
  )
}