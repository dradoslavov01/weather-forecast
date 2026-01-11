import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCurrentLocation, GeolocationError } from "@services";

describe("getCurrentLocation", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should resolve with coordinates when geolocation succeeds", async () => {
    const mockGetCurrentPosition = vi.fn((success) => {
      success({
        coords: {
          latitude: 42.6977,
          longitude: 23.3219,
        },
      });
    });

    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: mockGetCurrentPosition,
      },
    });

    const result = await getCurrentLocation();

    expect(result).toEqual({
      lat: 42.6977,
      lon: 23.3219,
    });

    expect(mockGetCurrentPosition).toHaveBeenCalledOnce();
  });

  it("should reject if geolocation is not supported", async () => {
    vi.stubGlobal("navigator", {});

    await expect(getCurrentLocation()).rejects.toEqual({
      code: -1,
      message: "Geolocation is not supported by your browser",
    } satisfies GeolocationError);
  });

  it("should handle PERMISSION_DENIED error", async () => {
    const mockError = {
      code: 1,
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    };

    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: vi.fn((_success, error) => {
          error(mockError);
        }),
      },
    });

    await expect(getCurrentLocation()).rejects.toEqual({
      code: 1,
      message: "Location access denied by user",
    });
  });

  it("should handle POSITION_UNAVAILABLE error", async () => {
    const mockError = {
      code: 2,
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    };

    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: vi.fn((_success, error) => {
          error(mockError);
        }),
      },
    });

    await expect(getCurrentLocation()).rejects.toEqual({
      code: 2,
      message: "Location information unavailable",
    });
  });

  it("should handle TIMEOUT error", async () => {
    const mockError = {
      code: 3,
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    };

    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: vi.fn((_success, error) => {
          error(mockError);
        }),
      },
    });

    await expect(getCurrentLocation()).rejects.toEqual({
      code: 3,
      message: "Location request timeout",
    });
  });

  it("should fallback to default error message for unknown error", async () => {
    const mockError = {
      code: 999,
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    };

    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: vi.fn((_success, error) => {
          error(mockError);
        }),
      },
    });

    await expect(getCurrentLocation()).rejects.toEqual({
      code: 999,
      message: "Failed to get location",
    });
  });
});
