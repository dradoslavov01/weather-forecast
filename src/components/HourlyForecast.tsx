import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { DailyForecast } from "types/weather";

interface HourlyForecastProps {
  open: boolean;
  forecast: DailyForecast | null;
  onClose: () => void;
}

export const HourlyForecast = ({
  open,
  forecast,
  onClose,
}: HourlyForecastProps) => {
  if (!forecast) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">{forecast.dayName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {forecast.date}
          </Typography>
        </Box>
        <IconButton onClick={onClose} edge="end" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List>
          {forecast.hourly.map((hour, index) => {
            const weatherIconUrl = `https://openweathermap.org/img/wn/${hour.icon}.png`;
            return (
              <Box key={hour.timestamp}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={weatherIconUrl}
                    alt={hour.condition}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <ListItemText
                    disableTypography
                    primary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography variant="body1" fontWeight="medium">
                          {hour.time}
                        </Typography>
                        <Typography variant="h6">
                          {hour.temperature}°C
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {hour.condition}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Humidity: {hour.humidity}% | Wind:{" "}
                          {hour.windSpeed.toFixed(1)} m/s
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < forecast.hourly.length - 1 && <Divider />}
              </Box>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};
