import { useState, useEffect, useContext } from 'react';
import { Grid, Container, Typography, Button, TextField, Box } from '@mui/material';
import CityCard from '../components/CityCard';
import { WeatherContext } from '../context/WeatherContext';
import Header from './Header';

const Dashboard = () => {
  const [cities, setCities] = useState<string[]>(() => {
    const savedCities = localStorage.getItem('cities');
    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [input, setInput] = useState('');
  const { theme } = useContext(WeatherContext);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  const addCity = () => {
    if (input.trim() && !cities.includes(input.trim())) {
      setCities([...cities, input.trim()]);
      setInput('');
    }
  };

  const removeCity = (cityToRemove: string) => {
    console.log(`Removing city: ${cityToRemove}`); // Debug line
    setCities(cities.filter((city) => city !== cityToRemove));
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} min-h-screen flex flex-col`}>
      <Header />

      <Container className={`flex-1 py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg shadow-lg`}>
        <Box className="text-center mb-8">
          <Box className="flex justify-center mb-4">
            <TextField
              label="City Name"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCity()}
              className="mr-2 w-full max-w-xs"
              InputProps={{
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
            <Button
              variant="contained"
              onClick={addCity}
              className="mt-2 bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out"
              style={{
                borderRadius: '8px',
              }}
            >
              Add
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
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
