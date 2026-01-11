import { describe, it, expect, vi, beforeEach } from "vitest";
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
} from "axios";
import {
  getForecastByCoordinates,
  getForecastByCity,
  groupForecastByDay,
} from "@services";
import { ForecastItem, sampleForecastItem } from "types/weather";

vi.mock("axios");
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

const mockAxiosError = (status: number, message: string) => {
  const response: AxiosResponse = {
    data: { message },
    status,
    statusText: message,
    headers: {} as AxiosHeaders,
    config: {} as InternalAxiosRequestConfig,
  };

  return new AxiosError(
    message,
    undefined,
    {} as InternalAxiosRequestConfig,
    undefined,
    response
  );
};

const sampleResponse = {
  data: {
    list: [sampleForecastItem, { ...sampleForecastItem, dt: 1700003600 }],
  },
};

beforeEach(() => {
  mockedAxios.get.mockReset();
});

describe("Weather API functions", () => {
  describe("getForecastByCoordinates", () => {
    it("should fetch forecast data by coordinates", async () => {
      mockedAxios.get.mockResolvedValueOnce(sampleResponse);

      const coords = { lat: 42, lon: 23 };
      const result = await getForecastByCoordinates(coords);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining("/forecast"),
        expect.objectContaining({
          params: expect.objectContaining({
            lat: coords.lat,
            lon: coords.lon,
          }),
        })
      );

      expect(result).toEqual(sampleResponse.data);
    });

    it("should throw error if API key is invalid", async () => {
      mockedAxios.get.mockRejectedValueOnce(
        mockAxiosError(401, "Invalid API key. Unauthorized")
      );

      await expect(
        getForecastByCoordinates({ lat: 0, lon: 0 })
      ).rejects.toThrow(
        "An unexpected error occurred while fetching weather data"
      );
    });
  });

  describe("getForecastByCity", () => {
    it("should fetch forecast data by city name", async () => {
      mockedAxios.get.mockResolvedValueOnce(sampleResponse);

      const cityName = "Sofia";
      const result = await getForecastByCity(cityName);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining("/forecast"),
        expect.objectContaining({
          params: expect.objectContaining({ q: cityName }),
        })
      );

      expect(result).toEqual(sampleResponse.data);
    });

    it("should throw error if city is not found", async () => {
      mockedAxios.get.mockRejectedValueOnce(
        mockAxiosError(404, "City not found.")
      );

      await expect(getForecastByCity("UnknownCity")).rejects.toThrow(
        "An unexpected error occurred while fetching weather data"
      );
    });
  });

  describe("groupForecastByDay", () => {
    it("should group forecast items by day and calculate min/max", () => {
      const items: ForecastItem[] = [
        sampleForecastItem,
        { ...sampleForecastItem, dt: sampleForecastItem.dt + 3600 },
      ];

      const grouped = groupForecastByDay(items);

      expect(grouped.length).toBe(1);
      expect(grouped[0].minTemp).toBe(20);
      expect(grouped[0].maxTemp).toBe(20);
      expect(grouped[0].hourly.length).toBe(2);
      expect(grouped[0].condition).toBe("clear sky");
    });
  });
});
