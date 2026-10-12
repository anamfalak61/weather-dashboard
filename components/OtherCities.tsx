import Image from 'next/image'
import { formatTemp, type Unit } from '@/lib/format'
import type { RecentCity } from '@/lib/types'

interface OtherCitiesProps {
  cities: RecentCity[]
  activeName: string
  unit: Unit
  onSelect: (city: string) => void
}

export default function OtherCities({ cities, activeName, unit, onSelect }: OtherCitiesProps) {
  const others = cities
    .filter((city) => city.name.toLowerCase() !== activeName.toLowerCase())
    .slice(0, 4)

  if (others.length === 0) return null

  return (
    <section>
      <h2 className="mb-1 text-xl font-semibold">Other Cities</h2>
      <p className="mb-3 text-xs text-emerald-200/60">
        Temperatures from your last search of each city
      </p>

      <ul className="grid grid-cols-2 gap-3">
        {others.map((city) => (
          <li key={city.name}>
            <button
              type="button"
              onClick={() => onSelect(city.name)}
              className="flex w-full items-center justify-between rounded-2xl bg-emerald-900/40 p-4 text-left ring-1 ring-emerald-400/15 transition hover:bg-emerald-800/50 hover:ring-emerald-400/40"
            >
              <div>
                <p className="text-2xl font-semibold">
                  {formatTemp(city.temp, unit)}
                  <span className="text-base">{unit}</span>
                </p>
                <p className="text-sm">{city.name}</p>
                <p className="text-xs capitalize text-emerald-200/70">{city.description}</p>
              </div>
              <Image
                src={`https://openweathermap.org/img/wn/${city.icon}.png`}
                alt=""
                width={48}
                height={48}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}