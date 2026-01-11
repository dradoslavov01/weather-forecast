import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "@components";

describe("SearchBar", () => {
  it("should render search input", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByLabelText(/search by city name/i);
    expect(input).toBeInTheDocument();
  });

  it("should call onSearch when form is submitted", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByLabelText(/search by city name/i);
    const searchButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Sofia" } });
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledWith("Sofia");
  });

  it("should call onSearch on Enter key press", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByLabelText(/search by city name/i);

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.submit(input.closest("form")!);

    expect(onSearch).toHaveBeenCalledWith("London");
  });

  it("should trim whitespace from search term", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByLabelText(/search by city name/i);
    const searchButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "  New York  " } });
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledWith("New York");
  });

  it("should not call onSearch for empty input", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeDisabled();
  });
});
