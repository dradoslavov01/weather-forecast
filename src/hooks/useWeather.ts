import { useState, useCallback } from "react";
import {
  getForecastByCoordinates,
  getForecastByCity,
  groupForecastByDay,
} from "@services";
import type { DailyForecast, Coordinates } from "types/weather";

interface UseWeatherReturn {
  forecasts: DailyForecast[];
  loading: boolean;
  error: string | null;
  cityName: string | null;
  fetchByCoordinates: (coords: Coordinates) => Promise<void>;
  fetchByCity: (city: string) => Promise<void>;
}

// Managing weather forecast data
export const useWeather = (): UseWeatherReturn => {
  const [forecasts, setForecasts] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchByCoordinates = useCallback(async (coords: Coordinates) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getForecastByCoordinates(coords);
      const dailyForecasts = groupForecastByDay(response.list);
      setForecasts(dailyForecasts);
      setCityName(response.city.name);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch weather data";
      setError(errorMessage);
      setForecasts([]);
      setCityName(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCity = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getForecastByCity(city);
      const dailyForecasts = groupForecastByDay(response.list);
      setForecasts(dailyForecasts);
      setCityName(response.city.name);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch weather data";
      setError(errorMessage);
      setForecasts([]);
      setCityName(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    forecasts,
    loading,
    error,
    cityName,
    fetchByCoordinates,
    fetchByCity,
  };
};
