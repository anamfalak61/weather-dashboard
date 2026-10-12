import type { RecentCity } from '@/lib/types'

const KEY = 'recent-cities-v2'
const MAX_ENTRIES = 6

export function loadHistory(): RecentCity[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as RecentCity[]) : []
  } catch {
    return []
  }
}

export function addCity(city: RecentCity): RecentCity[] {
  const updated = [
    city,
    ...loadHistory().filter((item) => item.name.toLowerCase() !== city.name.toLowerCase()),
  ].slice(0, MAX_ENTRIES)

  try {
    window.localStorage.setItem(KEY, JSON.stringify(updated))
  } catch {
    // Storage can be full or blocked. The dashboard still works without history.
  }

  return updated
}