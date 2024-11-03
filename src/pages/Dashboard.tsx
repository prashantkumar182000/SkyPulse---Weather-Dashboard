import { useState, useEffect, useContext } from 'react';
import { Grid, Container, Typography, TextField, Box, InputAdornment, IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CityCard from '../components/CityCard';
import { WeatherContext } from '../context/WeatherContext';
import Header from './Header';
import { fetchWeather } from '../services/weatherAPI';

const Dashboard = () => {
  const [cities, setCities] = useState<string[]>(() => {
    const savedCities = localStorage.getItem('cities');
    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useContext(WeatherContext);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    const fetchCitySuggestions = async () => {
      if (input.length < 2) {
        setSuggestions([]); // Clear suggestions if input is less than 2 characters
        return;
      }

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${input}&appid=25d3136e94e25b01ddbdfc74d809fd63`);
        const data = await response.json();
        if (data && data.list) {
          setSuggestions(data.list.map((city: { name: string }) => city.name)); // Extract city names
        }
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
      }
    };

    fetchCitySuggestions();
  }, [input]);

  const addCity = async (city: string) => {
    const trimmedInput = city.trim();
    if (!trimmedInput) return;

    const existingCity = cities.find(city => city.toLowerCase() === trimmedInput.toLowerCase());
    if (existingCity) {
      setError("City already added!");
      return;
    }

    try {
      await fetchWeather(trimmedInput); // Verify city existence
      setCities([...cities, trimmedInput]);
      setInput('');
      setSuggestions([]); // Clear suggestions on successful add
      setError(null); // Clear error on successful add
    } catch {
      setError("City not found. Please check the spelling.");
    }
  };

  const removeCity = (cityToRemove: string) => {
    setCities(cities.filter((city) => city !== cityToRemove));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSuggestionClick = (city: string) => {
    addCity(city);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} min-h-screen flex flex-col`}>
      <Header />

      {/* Add top margin to avoid content being hidden under the fixed header */}
      <Container className={`flex-1 py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg shadow-lg`} style={{ marginTop: '64px' }}>
        <Box className="text-center mb-8">
          <Box className="flex justify-center mb-2" style={{ position: 'relative' }}>
            <TextField
              label="City Name"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && addCity(input)}
              error={Boolean(error)}
              helperText={error}
              className="mr-2 w-full max-w-xs"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => addCity(input)}
                      color="primary"
                      aria-label="search city"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  backgroundColor: theme === 'dark' ? '#424242' : '#fff',
                  borderRadius: '8px',
                },
              }}
              InputLabelProps={{
                style: {
                  color: theme === 'dark' ? '#e0e0e0' : '#000',
                },
              }}
            />
            {suggestions.length > 0 && (
              <Paper elevation={2} style={{ maxHeight: '100px', overflowY: 'auto', width: '320px', position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 1, marginTop: '4px' }}>
                <List>
                  {suggestions.map((city) => (
                    <ListItem
                    component="button"
                    onClick={() => handleSuggestionClick(city)}
                    key={city}
                    style={{ width: '100%' }}
                  >
                    <ListItemText primary={city} />
                  </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
        </Box>

        {/* Add margin to the Grid container if suggestions are visible */}
        <Grid container spacing={3} style={{ marginTop: suggestions.length > 0 ? '100px' : '0' }}>
          {cities.map((city) => (
            <Grid item xs={12} sm={6} md={4} key={city}>
              <CityCard city={city} onRemove={removeCity} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <footer className="bg-gray-700 text-white py-4">
        <Container className="text-center">
          <Typography variant="body2">
            Weather data powered by OpenWeather API. SkyPulse © {new Date().getFullYear()}.
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Dashboard;
