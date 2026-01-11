import { useState } from "react";
import { getCurrentLocation, GeolocationError } from "@services";
import type { Coordinates } from "types/weather";

interface UseGeolocationReturn {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
  getLocation: () => Promise<void>;
}

// Managing geolocation state and requests
export const useGeolocation = (): UseGeolocationReturn => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const coords = await getCurrentLocation();
      setCoordinates(coords);
    } catch (err) {
      const geolocationError = err as GeolocationError;
      setError(geolocationError.message);
      setCoordinates(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    coordinates,
    loading,
    error,
    getLocation,
  };
};
