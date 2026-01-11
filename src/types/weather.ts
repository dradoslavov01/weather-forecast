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