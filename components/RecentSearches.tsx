interface RecentSearchesProps {
  cities: string[]
  onSelect: (city: string) => void
}

export default function RecentSearches({ cities, onSelect }: RecentSearchesProps) {
  if (cities.length === 0) return null

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Recent searches
      </h2>
      <ul className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <li key={city}>
            <button
              type="button"
              onClick={() => onSelect(city)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-violet-50 hover:text-violet-700 hover:ring-violet-300"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {city}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}