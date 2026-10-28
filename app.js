// DOM ELEMENTS
const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const statusE1 = document.querySelector("#status");
const resultE1 = document.querySelector("#result");
const historyE1 = document.querySelector("#history");

const cityName = document.querySelector("#city-name");
const condition = document.querySelector("#condition");
const icon = document.querySelector("#icon");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const feelsLike = document.querySelector("#feels-like");

// STATE
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// HISTORY
function loadHistory() {
  const saved = localStorage.getItem("weatherHistory");
  return saved ? JSON.parse(saved) : [];
}

function saveHistory(list) {
  localStorage.setItem("weatherHistory", JSON.stringify(list));
}

function addToHistory(city) {
  const history = loadHistory();
  const normalized = city.trim();
  const filtered = history.filter(function (c) {
    return c.toLowerCase() !== normalized.toLowerCase();
  });
  filtered.unshift(normalized);
  saveHistory(filtered.slice(0, 5));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  historyE1.innerHTML = "";

  history.forEach(function (city) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "history-chip";
    chip.textContent = city;
    chip.addEventListener("click", function () {
      fetchWeather(city);
    });
    historyE1.appendChild(chip);
  });
}

// UI HELPERS
function setStatus(message, isError) {
  statusE1.textContent = message;
  if (isError) {
    statusE1.classList.add("error");
  } else {
    statusE1.classList.remove("error");
  }
}

function showResult() {
  resultE1.classList.remove("hidden");
}

function hideResult() {
  resultE1.classList.add("hidden");
}

// FETCH & RENDER
async function fetchWeather(city) {
  if (!city || city.trim() === "") return;

  setStatus("Loading...", false);
  hideResult();
  const submitButton = form.querySelector("button");
  submitButton.disabled = true;

  const url =
    BASE_URL +
    "?q=" +
    encodeURIComponent(city) +
    "&appid=" +
    API_KEY +
    "&units=metric";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Check the spelling and try again.");
      }
      throw new Error("Could not fetch weather (" + response.status + ").");
    }

    const data = await response.json();
    renderWeather(data);
    addToHistory(data.name);
    setStatus("", false);
  } catch (err) {
    setStatus(err.message || "Something went wrong. Please try again.", true);
  } finally {
    submitButton.disabled = false;
  }
}

function renderWeather(data) {
  cityName.textContent = data.name + ", " + data.sys.country;
  condition.textContent = data.weather[0].description;
  icon.src =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  temp.textContent = Math.round(data.main.temp);
  humidity.textContent = data.main.humidity;
  feelsLike.textContent = Math.round(data.main.feels_like);
  showResult();
}

// EVENTS
form.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchWeather(cityInput.value);
  cityInput.value = "";
  cityInput.focus();
});

// BOOT
renderHistory();
