import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  AlertColor,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  SearchBar,
  LocationButton,
  ForecastList,
  HourlyForecast,
} from "@components";
import { useWeather, useGeolocation } from "@hooks";
import { DailyForecast } from "types/weather";

function App() {
  const {
    forecasts,
    loading,
    error,
    cityName,
    fetchByCoordinates,
    fetchByCity,
  } = useWeather();

  const {
    coordinates,
    loading: geoLoading,
    error: geoError,
    getLocation,
  } = useGeolocation();

  const [selectedDay, setSelectedDay] = useState<DailyForecast | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = useCallback(
    (message: string, severity: AlertColor = "error") => {
      setSnackbar({
        open: true,
        message,
        severity,
      });
    },
    []
  );

  const handleLocationClick = async () => {
    await getLocation();
  };

  const handleCitySearch = async (city: string) => {
    try {
      await fetchByCity(city);
    } catch (err) {
      showSnackbar(
        err instanceof Error ? err.message : "Failed to fetch weather data",
        "error"
      );
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const handleLocationCoordinates = async () => {
      if (coordinates) {
        try {
          await fetchByCoordinates(coordinates);
        } catch (err) {
          showSnackbar(
            err instanceof Error ? err.message : "Failed to fetch weather data",
            "error"
          );
        }
      }
    };

    if (coordinates && !geoLoading) {
      handleLocationCoordinates();
    }
  }, [coordinates, geoLoading, showSnackbar, fetchByCoordinates]);

  useEffect(() => {
    if (geoError) {
      showSnackbar(geoError, "error");
    }
  }, [geoError, showSnackbar]);

  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error, showSnackbar]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Weather Forecast
      </Typography>

      <SearchBar onSearch={handleCitySearch} loading={loading} />
      <LocationButton
        onClick={handleLocationClick}
        loading={geoLoading}
        disabled={loading}
      />

      <ForecastList
        forecasts={forecasts}
        loading={loading}
        onDayClick={(forecast: DailyForecast) => setSelectedDay(forecast)}
        cityName={cityName}
      />

      <HourlyForecast
        open={selectedDay !== null}
        forecast={selectedDay}
        onClose={() => setSelectedDay(null)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
