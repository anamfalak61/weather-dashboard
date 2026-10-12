'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  dayKey,
  formatClock,
  formatDuration,
  formatHour,
  formatTemp,
  localHour,
  weekdayShort,
  type Unit,
} from '@/lib/format'
import type { ForecastItem, WeatherData } from '@/lib/types'

type Tab = 'today' | 'week'

interface ForecastPanelProps {
  current: WeatherData
  forecast: ForecastItem[]
  unit: Unit
}

interface DaySummary {
  key: string
  label: string
  high: number
  low: number
  icon: string
}

function summarizeDays(forecast: ForecastItem[], timezone: number): DaySummary[] {
  const groups = new Map<string, ForecastItem[]>()

  for (const item of forecast) {
    const key = dayKey(item.dt, timezone)
    groups.set(key, [...(groups.get(key) ?? []), item])
  }

  return Array.from(groups.entries())
    .slice(0, 5)
    .map(([key, items], index) => {
      const temps = items.map((item) => item.main.temp)
      // Use the slot closest to midday as the icon for the whole day.
      const midday = items.reduce((best, item) =>
        Math.abs(localHour(item.dt, timezone) - 12) < Math.abs(localHour(best.dt, timezone) - 12)
          ? item
          : best,
      )

      return {
        key,
        label: index === 0 ? 'Today' : weekdayShort(midday.dt, timezone),
        high: Math.max(...temps),
        low: Math.min(...temps),
        icon: midday.weather[0]?.icon ?? '01d',
      }
    })
}

function SunRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-emerald-200/70">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  )
}

export default function ForecastPanel({ current, forecast, unit }: ForecastPanelProps) {
  const [tab, setTab] = useState<Tab>('today')
  const timezone = current.timezone
  const hours = forecast.slice(0, 5)
  const days = summarizeDays(forecast, timezone)
  const dayLength = current.sys.sunset - current.sys.sunrise

  return (
    <section className="grid gap-4 rounded-3xl bg-emerald-900/30 p-6 ring-1 ring-emerald-400/15 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Today / Week</h2>
          <div role="group" aria-label="Forecast range" className="flex rounded-full bg-emerald-950/60 p-1 text-sm font-semibold">
            {(['today', 'week'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={tab === option}
                onClick={() => setTab(option)}
                className={`rounded-full px-3 py-1 capitalize transition ${
                  tab === option
                    ? 'bg-emerald-400 text-emerald-950'
                    : 'text-emerald-100/70 hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {tab === 'today' ? (
          <ul className="grid grid-cols-5 gap-2">
            {hours.map((item) => {
              const condition = item.weather[0]
              return (
                <li
                  key={item.dt}
                  className="flex flex-col items-center gap-1 rounded-full bg-emerald-800/40 px-1 py-3 text-xs ring-1 ring-emerald-400/15"
                >
                  <span className="text-emerald-200/80">{formatHour(item.dt, timezone)}</span>
                  {condition && (
                    <Image
                      src={`https://openweathermap.org/img/wn/${condition.icon}.png`}
                      alt={condition.description}
                      width={40}
                      height={40}
                    />
                  )}
                  <span className="font-semibold">{formatTemp(item.main.temp, unit)}</span>
                </li>
              )
            })}
          </ul>
        ) : (
          <ul className="space-y-2">
            {days.map((day) => (
              <li
                key={day.key}
                className="flex items-center justify-between rounded-2xl bg-emerald-800/40 px-4 py-1 ring-1 ring-emerald-400/15"
              >
                <span className="w-16 font-medium">{day.label}</span>
                <Image
                  src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                  alt=""
                  width={40}
                  height={40}
                />
                <span className="text-sm font-semibold">
                  {formatTemp(day.high, unit)}{' '}
                  <span className="font-normal text-emerald-200/60">
                    / {formatTemp(day.low, unit)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4 rounded-2xl bg-emerald-950/50 p-4 ring-1 ring-emerald-400/15">
        <SunRow label="Sunrise" value={formatClock(current.sys.sunrise, timezone)} />
        <SunRow label="Sunset" value={formatClock(current.sys.sunset, timezone)} />
        <SunRow label="Day length" value={formatDuration(dayLength)} />
      </div>
    </section>
  )
}