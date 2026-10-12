export interface WeatherCondition {
    id: number
    main: string
    description: string
    icon: string
}

export interface WeatherData {
    name: string
    sys: {
        country: string
    }
    main: {
        temp: number
        feels_like: number
        humidity: number
    }
    weather: WeatherCondition[]
    wind: {
        speed: number
    }
}

export interface ApiErrorBody {
    cod: number | string
    message: string
}

export type SearchStatus = 'idle' | 'loading' | 'error' | 'success'