export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  
  export interface Wind {
    speed: number;
    deg: number;
  }
  
  export interface Clouds {
    all: number;
  }
  
  export interface ForecastItem {
    dt: number;
    main: MainWeatherData;
    weather: WeatherCondition[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    dt_txt: string;
  }
  
  export interface OpenWeatherForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  }
  
  export interface HourlyForecast {
    time: string;
    timestamp: number;
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
  }
  
  export interface DailyForecast {
    date: string;
    dayName: string;
    timestamp: number;
    minTemp: number;
    maxTemp: number;
    condition: string;
    icon: string;
    hourly: HourlyForecast[];
  }
  
  export interface Coordinates {
    lat: number;
    lon: number;
  }
  
  export const sampleForecastItem: ForecastItem = {
    dt: 1700000000,
    main: {
      temp: 20,
      feels_like: 19,
      temp_min: 18,
      temp_max: 22,
      pressure: 1015,
      humidity: 50,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    clouds: {
      all: 0,
    },
    wind: {
      speed: 3,
      deg: 180,
    },
    visibility: 10000,
    pop: 0,
    dt_txt: "2024-01-01 12:00:00",
  };
  