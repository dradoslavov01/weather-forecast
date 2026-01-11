import { Grid, Paper, Typography, CircularProgress, Box } from "@mui/material";
import { ForecastCard } from "./ForecastCard";
import type { DailyForecast } from "types/weather";

interface ForecastListProps {
  forecasts: DailyForecast[];
  loading: boolean;
  onDayClick: (forecast: DailyForecast) => void;
  cityName?: string | null;
}

export const ForecastList = ({
  forecasts,
  loading,
  onDayClick,
  cityName,
}: ForecastListProps) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (forecasts.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No forecast data available
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Search for a city or use your location to get weather forecast
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {cityName && (
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          {cityName} - 5 Day Forecast
        </Typography>
      )}
      <Grid container spacing={3}>
        {forecasts.map((forecast) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={forecast.timestamp}>
            <ForecastCard
              forecast={forecast}
              onClick={() => onDayClick(forecast)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
