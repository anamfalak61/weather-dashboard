import { NextResponse } from 'next/server'
import type { ApiErrorBody, DashboardData, ForecastData, WeatherData } from '@/lib/types'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function errorBody(status: number, message: string) {
  return NextResponse.json({ cod: status, message }, { status })
}

export async function GET(request: Request) {
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return errorBody(500, 'The server is missing OPENWEATHER_API_KEY.')
  }

  const city = new URL(request.url).searchParams.get('city')?.trim()

  if (!city) {
    return errorBody(400, 'City is required.')
  }

  let currentResponse: Response
  try {
    currentResponse = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
      { cache: 'no-store' },
    )
  } catch {
    return errorBody(502, 'Could not reach the weather service.')
  }

  if (!currentResponse.ok) {
    const error: ApiErrorBody = await currentResponse.json()
    return NextResponse.json(error, { status: currentResponse.status })
  }

  const current: WeatherData = await currentResponse.json()
  const { lat, lon } = current.coord

  let forecastResponse: Response
  try {
    forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      { cache: 'no-store' },
    )
  } catch {
    return errorBody(502, 'Could not reach the weather service.')
  }

  if (!forecastResponse.ok) {
    const error: ApiErrorBody = await forecastResponse.json()
    return NextResponse.json(error, { status: forecastResponse.status })
  }

  const forecast: ForecastData = await forecastResponse.json()
  const body: DashboardData = { current, forecast: forecast.list }

  return NextResponse.json(body)
}