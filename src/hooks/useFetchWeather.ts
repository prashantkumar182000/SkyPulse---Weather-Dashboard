import { useState, useEffect } from 'react';
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
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError("City not found. Please try again.");
      } else {
        setError("Failed to load weather data. Please try again later.");
      }
    } finally {
      setLoading(false); // Ensure loading is set to false after API call
    }
  };

  useEffect(() => {
    if (city) {
      getWeather();
    }
  }, [city]); // Fetch new data whenever the city changes

  return { data, error, loading, getWeather };
};

export default useFetchWeather;
