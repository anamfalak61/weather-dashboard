import Image from 'next/image'
import { formatTemp, type Unit } from '@/lib/format'
import type { ForecastItem, WeatherData } from '@/lib/types'

interface CurrentWeatherProps {
  current: WeatherData
  forecast: ForecastItem[]
  unit: Unit
  onUnitChange: (unit: Unit) => void
}

export default function CurrentWeather({
  current,
  forecast,
  unit,
  onUnitChange,
}: CurrentWeatherProps) {
  const condition = current.weather[0]
  if (!condition) return null

  const next24Hours = forecast.slice(0, 8).map((item) => item.main.temp)
  const high = Math.max(current.main.temp, ...next24Hours)
  const low = Math.min(current.main.temp, ...next24Hours)

  return (
    <section
      className="relative overflow-hidden rounded-3xl p-6 text-emerald-50 shadow-2xl shadow-black/40 sm:p-8"
      style={{ background: 'linear-gradient(135deg, #0f4a33 0%, #0a2f21 100%)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div className="relative flex items-start justify-between gap-4">
        <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-emerald-950">
          <span aria-hidden="true">📍</span>
          {current.name}, {current.sys.country}
        </p>

        <div
          role="group"
          aria-label="Temperature unit"
          className="flex rounded-full bg-emerald-950/60 p-1 text-sm font-semibold"
        >
          {(['C', 'F'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={unit === option}
              onClick={() => onUnitChange(option)}
              className={`rounded-full px-3 py-1 transition ${
                unit === option
                  ? 'bg-emerald-400 text-emerald-950'
                  : 'text-emerald-100/70 hover:text-white'
              }`}
            >
              °{option}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold">Weather</p>
          <p className="text-sm text-emerald-200/70">Now</p>
        </div>
        <Image
          src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
          alt={condition.description}
          width={160}
          height={160}
          className="drop-shadow-xl"
        />
      </div>

      <div className="relative mt-2 flex items-end justify-between gap-4">
        <div>
          <p className="text-7xl font-extrabold tracking-tight sm:text-8xl">
            {formatTemp(current.main.temp, unit)}
            <span className="text-5xl">{unit}</span>
          </p>
          <p className="mt-1 text-sm text-emerald-200/80">
            Feels like {formatTemp(current.main.feels_like, unit)}
          </p>
        </div>

        <div className="text-right text-sm text-emerald-200/80">
          <p className="mb-1 capitalize text-emerald-50">{condition.description}</p>
          <p>
            High: {formatTemp(high, unit)} · Low: {formatTemp(low, unit)}
          </p>
        </div>
      </div>
    </section>
  )
}