import type { DashboardData } from '@/lib/types'

export class WeatherApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'WeatherApiError'
    this.status = status
  }
}

export function messageForStatus(status: number): string {
  switch (status) {
    case 400:
      return 'Please enter a city name.'
    case 401:
      return 'The weather service rejected the API key. Check OPENWEATHER_API_KEY and restart the server.'
    case 404:
      return 'City not found. Check the spelling and try again.'
    case 429:
      return 'Too many requests. Please wait a moment and try again.'
    default:
      return status >= 500
        ? 'The weather service is having problems. Please try again later.'
        : `Request failed with status ${status}.`
  }
}

export async function fetchDashboard(city: string): Promise<DashboardData> {
  let response: Response

  try {
    response = await fetch(`/api/dashboard?city=${encodeURIComponent(city)}`)
  } catch {
    throw new WeatherApiError('Network error. Please check your internet connection.', 0)
  }

  if (!response.ok) {
    throw new WeatherApiError(messageForStatus(response.status), response.status)
  }

  return (await response.json()) as DashboardData
}