export type Unit = 'C' | 'F'

export function formatTemp(celsius: number, unit: Unit): string {
  const value = unit === 'C' ? celsius : (celsius * 9) / 5 + 32
  return `${Math.round(value)}°`
}

// OpenWeather sends times in UTC plus the city's offset in seconds.
// Adding the offset first lets us read the city's local time with the UTC getters.
function localDate(unixSeconds: number, timezoneOffset: number): Date {
  return new Date((unixSeconds + timezoneOffset) * 1000)
}

function to12Hour(hours: number): { display: number; suffix: 'AM' | 'PM' } {
  return {
    display: hours % 12 === 0 ? 12 : hours % 12,
    suffix: hours >= 12 ? 'PM' : 'AM',
  }
}

export function localHour(unixSeconds: number, timezoneOffset: number): number {
  return localDate(unixSeconds, timezoneOffset).getUTCHours()
}

export function formatHour(unixSeconds: number, timezoneOffset: number): string {
  const { display, suffix } = to12Hour(localHour(unixSeconds, timezoneOffset))
  return `${display} ${suffix}`
}

export function formatClock(unixSeconds: number, timezoneOffset: number): string {
  const date = localDate(unixSeconds, timezoneOffset)
  const { display, suffix } = to12Hour(date.getUTCHours())
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  return `${display}:${minutes} ${suffix}`
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return `${hours} hr ${minutes} min`
}

export function dayKey(unixSeconds: number, timezoneOffset: number): string {
  return localDate(unixSeconds, timezoneOffset).toISOString().slice(0, 10)
}

export function weekdayShort(unixSeconds: number, timezoneOffset: number): string {
  return localDate(unixSeconds, timezoneOffset).toLocaleDateString('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  })
}