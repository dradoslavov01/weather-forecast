import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import type { DailyForecast } from 'types/weather';

interface ForecastCardProps {
  forecast: DailyForecast;
  onClick: () => void;
}

export const ForecastCard = ({ forecast, onClick }: ForecastCardProps) => {
  const weatherIconUrl = `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`;

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        height: '100%',
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {forecast.dayName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {forecast.date}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <Box
            component="img"
            src={weatherIconUrl}
            alt={forecast.condition}
            sx={{ width: 64, height: 64 }}
          />
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <Typography variant="h4" component="div">
              {forecast.maxTemp}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {forecast.minTemp}°C
            </Typography>
          </Box>
        </Box>

        <Chip
          label={forecast.condition}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 2 }}
        >
          Click for hourly details
        </Typography>
      </CardContent>
    </Card>
  );
};

