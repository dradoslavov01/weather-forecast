import { useCallback, useState } from "react";
import { AlertColor, Container, Typography } from "@mui/material";
import {
  SearchBar,
  LocationButton,
  ForecastList,
  HourlyForecast,
} from "@components";
import { useWeather, useGeolocation } from "@hooks";
import { DailyForecast } from "types/weather";

function App() {
  const { loading: geoLoading, getLocation } = useGeolocation();

  const { fetchByCity, cityName, forecasts, loading } = useWeather();

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
    </Container>
  );
}

export default App;
