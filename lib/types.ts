export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface WeatherData {
  name: string
  coord: {
    lat: number
    lon: number
  }
  timezone: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  weather: WeatherCondition[]
  wind: {
    speed: number
  }
}

export interface ForecastItem {
  dt: number
  main: {
    temp: number
  }
  weather: WeatherCondition[]
  pop: number
}

export interface ForecastData {
  list: ForecastItem[]
}

export interface DashboardData {
  current: WeatherData
  forecast: ForecastItem[]
}

export interface ApiErrorBody {
  cod: number | string
  message: string
}

export type SearchStatus = 'idle' | 'loading' | 'error' | 'success'