import axios, { AxiosError } from "axios";
import type {
  OpenWeatherForecastResponse,
  ForecastItem,
  DailyForecast,
  HourlyForecast,
  Coordinates,
} from "types/weather";
import { getStartOfDay, formatTime } from "@utils/dateHelpers";

const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Get API key from environment variables
const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeatherMap API key is not configured.");
  }

  return apiKey;
};

// Get 5-day weather forecast by coordinates
export const getForecastByCoordinates = async (
  coords: Coordinates
): Promise<OpenWeatherForecastResponse> => {
  try {
    const apiKey = getApiKey();
    const response = await axios.get<OpenWeatherForecastResponse>(
      `${API_BASE_URL}/forecast`,
      {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appid: apiKey,
          units: "metric",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string; cod: string }>;
      if (axiosError.response) {
        // Handle 401 Unauthorized (Invalid API key)
        if (axiosError.response.status === 401) {
          throw new Error("Invalid API key. Unauthorized.");
        }
        throw new Error(
          axiosError.response.data?.message ||
            `API Error: ${axiosError.response.status}`
        );
      }
      if (axiosError.request) {
        throw new Error("Network error: Could not reach weather API");
      }
    }
    throw new Error("An unexpected error occurred while fetching weather data");
  }
};

// Get 5-day weather forecast by city name
export const getForecastByCity = async (
  cityName: string
): Promise<OpenWeatherForecastResponse> => {
  try {
    const apiKey = getApiKey();
    const response = await axios.get<OpenWeatherForecastResponse>(
      `${API_BASE_URL}/forecast`,
      {
        params: {
          q: cityName,
          appid: apiKey,
          units: "metric",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string; cod: string }>;
      if (axiosError.response) {
        // Handle 401 Unauthorized (Invalid API key)
        if (axiosError.response.status === 401) {
          throw new Error("Invalid API key. Unauthorized.");
        }
        if (axiosError.response.status === 404) {
          throw new Error(`City "${cityName}" not found`);
        }
        throw new Error(
          axiosError.response.data?.message ||
            `API Error: ${axiosError.response.status}`
        );
      }
      if (axiosError.request) {
        throw new Error("Network error: Could not reach weather API");
      }
    }
    throw new Error("An unexpected error occurred while fetching weather data");
  }
};

// Group forecast items by day and extract daily summaries
export const groupForecastByDay = (
  forecastItems: ForecastItem[]
): DailyForecast[] => {
  const dailyMap = new Map<number, ForecastItem[]>();

  // Group items by day
  forecastItems.forEach((item) => {
    const dayStart = getStartOfDay(item.dt);
    if (!dailyMap.has(dayStart)) {
      dailyMap.set(dayStart, []);
    }
    dailyMap.get(dayStart)!.push(item);
  });

  // Convert to DailyForecast array
  const dailyForecasts: DailyForecast[] = [];

  dailyMap.forEach((items, dayStart) => {
    // Calculate min/max temperatures for the day
    const temps = items.map((item) => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    // Use the middle item of the day as representative condition
    const representativeIndex = Math.floor(items.length / 2);
    const representative = items[representativeIndex];

    // Create hourly forecasts
    const hourly: HourlyForecast[] = items.map((item) => ({
      time: formatTime(item.dt),
      timestamp: item.dt,
      temperature: Math.round(item.main.temp),
      condition: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
    }));

    const date = new Date(dayStart * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const dateString = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    dailyForecasts.push({
      date: dateString,
      dayName,
      timestamp: dayStart,
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      condition: representative.weather[0].description,
      icon: representative.weather[0].icon,
      hourly,
    });
  });

  // Sort by timestamp and take first 5 days
  return dailyForecasts.sort((a, b) => a.timestamp - b.timestamp).slice(0, 5);
};
