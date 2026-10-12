const KEY = 'recent-cities'
const MAX_ENTRIES = 5

export function loadHistory(): string[] {
    if (typeof window === 'undefined') return []

    try {
        const raw = window.localStorage.getItem(KEY)
        return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
        return []
    }
}

export function addCity(city: string): string[] {
    const updated = [
        city,
        ...loadHistory().filter((item) => item.toLowerCase() !== city.toLowerCase()),
    ].slice(0, MAX_ENTRIES)

    try {
        window.localStorage.setItem(KEY, JSON.stringify(updated))
    } catch {
        // Storage can be full or blocked. The dashboard still works without history.
    }

    return updated
}