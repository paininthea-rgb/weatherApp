# Weather App

A simple Next.js weather app powered by WeatherAPI.

## Features

- Search weather by city
- Clean results card with icons
- Error handling for missing/invalid API key

## Setup

1) Install dependencies

```bash
npm install
```

2) Create .env.local

```bash
NEXT_PUBLIC_API_KEY="YOUR_WEATHERAPI_KEY"
```

You can get a key at https://www.weatherapi.com/

3) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Notes

- The app uses the WeatherAPI current conditions endpoint.
- UI is in app/page.tsx.
