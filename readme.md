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

Open config.js and replace the placeholder with your key:

javascript
const API_KEY = 'your-real-key-here';
Run Locally
bash
git clone https://github.com/asundah/weather-app-async-js.git

cd weather-app-async-js
Then complete the Setup section above and open index.html in your browser.

No installation or build step required.

Notes on API Key Security
This app calls OpenWeatherMap directly from the browser, so the key is visible in DevTools. For a free-tier weather key this is acceptable. For paid or write-access keys, requests should be proxied through a backend so the key never reaches the browser.

Project Structure

weather-app-async-js/
├── index.html # Markup
├── style.css # Styling
├── config.example.js # API key template (safe to commit)
├── config.js # Your real key (gitignored)
└── app.js # Fetch logic, rendering, and history

License
MIT
