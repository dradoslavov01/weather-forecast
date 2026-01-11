import { Button, CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface LocationButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

export const LocationButton = ({
  onClick,
  loading,
  disabled = false,
}: LocationButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={
        loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <LocationOnIcon />
        )
      }
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth
      sx={{ mb: 3 }}
    >
      {loading ? "Getting Location..." : "Use My Location"}
    </Button>
  );
};
