import type { Coordinates } from "types/weather";

export interface GeolocationError {
  code: number;
  message: string;
}

// Get user's current geolocation coordinates
export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: -1,
        message: "Geolocation is not supported by your browser",
      } as GeolocationError);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = "Failed to get location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timeout";
            break;
        }
        reject({
          code: error.code,
          message: errorMessage,
        } as GeolocationError);
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
      }
    );
  });
};
