import { useState } from 'react';
import { fetchWeather } from '../services/weatherAPI';
import { WeatherData } from '../types/weatherTypes';

const useFetchWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchWeather(city);
      setData(result);
    } catch (err) {
      setError("Failed to load weather data.");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, getWeather };
};

export default useFetchWeather;
