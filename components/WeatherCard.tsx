import Image from 'next/image'
import type { WeatherData } from '@/lib/types'

function gradientFor(main: string, icon: string): string {
  const isNight = icon.endsWith('n')

  switch (main) {
    case 'Clear':
      return isNight
        ? 'linear-gradient(135deg, #1e1b4b, #4c1d95)'
        : 'linear-gradient(135deg, #38bdf8, #6366f1)'
    case 'Clouds':
      return 'linear-gradient(135deg, #64748b, #334155)'
    case 'Rain':
    case 'Drizzle':
      return 'linear-gradient(135deg, #3b82f6, #1e3a8a)'
    case 'Thunderstorm':
      return 'linear-gradient(135deg, #7c3aed, #1e1b4b)'
    case 'Snow':
      return 'linear-gradient(135deg, #7dd3fc, #818cf8)'
    default:
      return 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
  }
}

interface StatProps {
  emoji: string
  label: string
  value: string
}

function Stat({ emoji, label, value }: StatProps) {
  return (
    <div className="rounded-2xl bg-white/15 p-3 text-center ring-1 ring-white/20 backdrop-blur-sm">
      <p aria-hidden="true" className="text-xl">
        {emoji}
      </p>
      <dt className="mt-1 text-xs uppercase tracking-wide text-white/75">{label}</dt>
      <dd className="text-lg font-semibold">{value}</dd>
    </div>
  )
}

export default function WeatherCard({ data }: { data: WeatherData }) {
  const condition = data.weather[0]
  if (!condition) return null

  return (
    <section
      className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl shadow-violet-300/50 sm:p-8"
      style={{ background: gradientFor(condition.main, condition.icon) }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
      />

      <div className="relative">
        <p className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
          {data.name}, {data.sys.country}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-7xl font-extrabold tracking-tight">
            {Math.round(data.main.temp)}°
          </p>
          <Image
            src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
            alt={condition.description}
            width={120}
            height={120}
            className="drop-shadow-lg"
          />
        </div>

        <p className="text-xl font-medium capitalize">{condition.description}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          <Stat emoji="🌡️" label="Feels like" value={`${Math.round(data.main.feels_like)}°`} />
          <Stat emoji="💧" label="Humidity" value={`${data.main.humidity}%`} />
          <Stat emoji="💨" label="Wind" value={`${data.wind.speed} m/s`} />
        </dl>
      </div>
    </section>
  )
}