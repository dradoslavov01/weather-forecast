import { useState, FormEvent } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

export const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedCity = searchTerm.trim();
    if (trimmedCity) {
      onSearch(trimmedCity);
    }
  };

  const handleSearchClick = () => {
    const trimmedCity = searchTerm.trim();
    if (trimmedCity) {
      onSearch(trimmedCity);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 1 }}
      >
        <TextField
          fullWidth
          label="Search by city name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
          placeholder="e.g., Sofia, Varna, London"
          InputProps={{
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setSearchTerm("")}
                  edge="end"
                  size="small"
                  disabled={loading}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={loading || !searchTerm.trim()}
          onClick={handleSearchClick}
          sx={{ minWidth: 56 }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};
