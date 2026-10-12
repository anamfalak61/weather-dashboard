import { NextResponse } from 'next/server'
import type { ApiErrorBody, WeatherData } from '@/lib/types'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function GET(request: Request) {
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { cod: 500, message: 'The server is missing OPENWEATHER_API_KEY.' },
      { status: 500 },
    )
  }

  const city = new URL(request.url).searchParams.get('city')?.trim()

  if (!city) {
    return NextResponse.json({ cod: 400, message: 'City is required.' }, { status: 400 })
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`

  let response: Response
  try {
    response = await fetch(url, { cache: 'no-store' })
  } catch {
    return NextResponse.json(
      { cod: 502, message: 'Could not reach the weather service.' },
      { status: 502 },
    )
  }

  const body: WeatherData | ApiErrorBody = await response.json()
  return NextResponse.json(body, { status: response.status })
}