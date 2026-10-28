# Weather App (Async JavaScript)

A weather app that fetches live data from the OpenWeatherMap API. Built with plain HTML, CSS, and JavaScript.

## Features

- Search weather by city name
- Current temperature, condition, humidity, and feels-like temperature
- Weather icon from OpenWeatherMap
- Loading indicator while fetching
- User-friendly error messages ("City not found", network errors)
- Search history (last 5 cities) saved in `localStorage` — click a chip to search again
- Responsive layout

## Setup

The app needs a free OpenWeatherMap API key.

1. Sign up at [openweathermap.org/api](https://openweathermap.org/api) and copy your API key (it can take ~10 minutes to activate).
2. Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```
