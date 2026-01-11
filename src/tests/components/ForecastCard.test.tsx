import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ForecastCard } from "@components";
import type { DailyForecast } from "types/weather";

const mockForecast: DailyForecast = {
  date: "Jan 15, 2024",
  dayName: "Monday",
  timestamp: 1705324800,
  minTemp: 5,
  maxTemp: 15,
  condition: "clear sky",
  icon: "01d",
  hourly: [],
};

describe("ForecastCard", () => {
  it("should render forecast information", () => {
    const onClick = vi.fn();
    render(<ForecastCard forecast={mockForecast} onClick={onClick} />);

    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument();
    expect(screen.getByText("15°C")).toBeInTheDocument();
    expect(screen.getByText("5°C")).toBeInTheDocument();
    expect(screen.getByText("clear sky")).toBeInTheDocument();
  });

  it("should call onClick when card is clicked", () => {
    const onClick = vi.fn();
    render(<ForecastCard forecast={mockForecast} onClick={onClick} />);

    const card = screen.getByText("Monday").closest('[class*="MuiCard"]');
    fireEvent.click(card!);

    expect(onClick).toHaveBeenCalled();
  });

  it("should display weather icon", () => {
    const onClick = vi.fn();
    render(<ForecastCard forecast={mockForecast} onClick={onClick} />);

    const image = screen.getByAltText("clear sky");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("01d"));
  });
});
