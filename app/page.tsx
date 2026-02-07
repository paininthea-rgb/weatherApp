"use client";

import { useState, type FormEvent } from "react";

interface WeatherData {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeatherErrorResponse {
  error?: {
    message?: string;
  };
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const fetchWeather = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setWeather(null);

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      setError("Missing API key. Set NEXT_PUBLIC_API_KEY in .env.local");
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${"287526afebec4d7998060021260702"}&q=${encodeURIComponent(
          city.trim()
        )}&aqi=no`
      );

      const data = (await response.json()) as WeatherData | WeatherErrorResponse;

      if (!response.ok || "error" in data) {
        throw new Error(data?.error?.message || "City not found");
      }

      setWeather(data as WeatherData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="sky-bg min-h-screen flex items-center justify-center">
      <div className="text-white">
      <h1 className="mb-4 text-2xl font-bold">Weather App</h1>
      <form className="flex gap-2 mb-4" onSubmit={fetchWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Get Weather
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {weather && (
        <div className="mt-4 w-full max-w-md rounded-xl bg-black/35 p-5 text-base font-normal shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{weather.location.name}</h2>
              <p className="text-sm text-white/80">Current conditions</p>
            </div>
            <img
              className="h-14 w-14"
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M14 14.76V5a2 2 0 0 0-4 0v9.76" />
                  <path d="M10 12a4 4 0 1 0 4 0" />
                </svg>
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">Temperature</p>
                <p className="text-lg font-semibold">{weather.current.temp_c}°C</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3.5C12 3.5 6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z" />
                </svg>
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">Humidity</p>
                <p className="text-lg font-semibold">{weather.current.humidity}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4l2.5 2.5" />
                </svg>
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">Condition</p>
                <p className="text-lg font-semibold">{weather.current.condition.text}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
