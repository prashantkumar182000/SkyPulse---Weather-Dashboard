import { useState, useEffect, useContext } from 'react';
import { Grid, Container, Typography, TextField, Box, InputAdornment, IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CityCard from '../components/CityCard';
import { WeatherContext } from '../context/WeatherContext';
import Header from './Header';
import { fetchWeather } from '../services/weatherAPI';
import bgVideo from '../assets/weather-video.mp4';

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
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${input}&appid=25d3136e94e25b01ddbdfc74d809fd63`);
        const data = await response.json();
        if (data && data.list) {
          setSuggestions(data.list.map((city: { name: string }) => city.name));
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
      await fetchWeather(trimmedInput);
      setCities([...cities, trimmedInput]);
      setInput('');
      setSuggestions([]);
      setError(null);
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
    <div className="min-h-screen flex flex-col font-['Roboto', 'Montserrat'] relative">
      {/* Background Video */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover opacity-40">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* Main Content */}
      <Container
        className="relative flex-1 py-8 z-10 overflow-y-auto"
        style={{
          height: 'calc(100vh - 128px)', // Subtracting header (64px) and footer (64px) height from total screen height
          marginTop: '64px', 
          marginBottom: '64px', // Space for footer
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box className="text-center mb-8">
          <Box className="flex justify-center mb-2 relative">
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
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                },
              }}
              InputLabelProps={{
                style: {
                  color: theme === 'dark' ? '#e0e0e0' : '#000',
                },
              }}
              FormHelperTextProps={{
                style: {
                  color: theme === 'dark' ? '#B0B0B0' : '#5f6368',
                },
              }}
            />
            {suggestions.length > 0 && (
 <Paper elevation={2} style={{ maxHeight: '100px', overflowY: 'auto', width: '320px', position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 1, marginTop: '4px' }}>                <List>
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

        {/* Cities Grid */}
        <Grid container spacing={3} style={{ marginTop: suggestions.length > 0 ? '100px' : '0' }}>
          {cities.map((city) => (
            <Grid item xs={12} sm={6} md={4} key={city}>
              <CityCard city={city} onRemove={removeCity} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full z-20">
        <footer className="bg-gray-700 text-white py-4">
          <Container className="text-center">
            <Typography variant="body2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Weather data powered by OpenWeather API. SkyPulse © {new Date().getFullYear()}.
            </Typography>
          </Container>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
