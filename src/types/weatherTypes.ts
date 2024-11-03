export interface WeatherMain {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

export interface WeatherCondition {
  id: number;
  main: string; // e.g., "Clear", "Rain"
  description: string;
  icon: string;
}

export interface WeatherData {
  name: string; // City name
  main: WeatherMain; // Weather main information
  weather: WeatherCondition[]; // Array of weather conditions
  wind: {
    speed: number; // Wind speed
  };
}
