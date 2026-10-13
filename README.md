# Weather Dashboard

A weather dashboard built with Next.js (App Router), TypeScript and Tailwind CSS. Search any city to see the current weather, a 5-day forecast, rain chances, sunrise and sunset, and your recent searches.

This is the live demo for the documentation site: https://quiz-docs.vercel.app

**Live demo:** https://weather-dashboard-lake-phi.vercel.app

## Features

- City search with loading and error states (401 and 404 handled)
- °C / °F switch
- Hourly and 5-day forecast
- Chance of rain, wind, humidity and pressure
- Recent searches saved in the browser
- Responsive layout
- API key kept on the server in a Route Handler

## Getting started

Requirements: Node.js 18 or newer and a free [OpenWeather](https://openweathermap.org) API key.

```bash
git clone https://github.com/anamfalak61/weather-dashboard.git
cd weather-dashboard
npm install
```

Create a `.env.local` file in the project root:

```bash
OPENWEATHER_API_KEY=your_key_here
```

Then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |

## Deployment

Deploy on Vercel and add the environment variable `OPENWEATHER_API_KEY` under Project Settings, Environment Variables. Redeploy after changing it.