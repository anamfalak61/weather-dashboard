import type { ReactNode } from 'react'
import { formatHour } from '@/lib/format'
import type { ForecastItem, WeatherData } from '@/lib/types'

interface HighlightsProps {
  current: WeatherData
  forecast: ForecastItem[]
}

interface CardProps {
  title: string
  className?: string
  children: ReactNode
}

function Card({ title, className = '', children }: CardProps) {
  return (
    <div className={`rounded-2xl bg-emerald-950/50 p-4 ring-1 ring-emerald-400/15 ${className}`}>
      <p className="mb-3 text-sm text-emerald-200/80">{title}</p>
      {children}
    </div>
  )
}

function Meter({ percent }: { percent: number }) {
  return (
    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-emerald-900">
      <div
        className="h-full rounded-full bg-emerald-400"
        style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }}
      />
    </div>
  )
}

export default function Highlights({ current, forecast }: HighlightsProps) {
  const slots = forecast.slice(0, 8)
  const timezone = current.timezone

  return (
    <section className="rounded-3xl bg-emerald-900/30 p-6 ring-1 ring-emerald-400/15">
      <h2 className="mb-4 text-xl font-semibold">Today&apos;s Highlight</h2>

      <div className="grid grid-cols-2 gap-3">
        <Card title="Chances of Rain" className="col-span-2">
          <div className="flex gap-2">
            {slots.map((item) => {
              const percent = Math.round(item.pop * 100)
              return (
                <div key={item.dt} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] text-emerald-200/70">{percent}%</span>
                  <div className="flex h-16 w-full items-end">
                    <div
                      className="w-full rounded-full bg-emerald-400"
                      style={{ height: `${Math.max(percent, 5)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-emerald-200/70">
                    {formatHour(item.dt, timezone)}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>

        <Card title="Wind Status">
          <p className="text-2xl font-semibold">
            {current.wind.speed} <span className="text-sm font-normal">m/s</span>
          </p>
          <Meter percent={(current.wind.speed / 20) * 100} />
        </Card>

        <Card title="Humidity">
          <p className="text-2xl font-semibold">{current.main.humidity}%</p>
          <Meter percent={current.main.humidity} />
        </Card>

        <Card title="Pressure" className="col-span-2">
          <p className="text-2xl font-semibold">
            {current.main.pressure} <span className="text-sm font-normal">hPa</span>
          </p>
        </Card>
      </div>
    </section>
  )
}