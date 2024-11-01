import { Card, CardContent, Typography, CircularProgress, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useFetchWeather from '../hooks/useFetchWeather';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

interface CityCardProps {
  city: string;
  onRemove: (city: string) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[5],
  },
}));

const BackgroundImage = styled(Box)<{ imageUrl: string }>(({ imageUrl }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.3,
}));

const CityCard = ({ city, onRemove }: CityCardProps) => {
  const { data, error, loading, getWeather } = useFetchWeather(city);
  const { theme } = useContext(WeatherContext);
  const backgroundImageUrl = `https://source.unsplash.com/800x600/?${city},weather`;
  const textColor = theme === 'dark' ? 'white' : 'black';

  return (
    <StyledCard onClick={getWeather}>
      <BackgroundImage imageUrl={backgroundImageUrl} />
      <IconButton
        style={{ position: 'absolute', top: 16, right: 16, color: textColor, zIndex: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          console.log(`Attempting to remove city: ${city}`);
          onRemove(city);
        }}
      >
        <CloseIcon />
      </IconButton>
      <CardContent style={{ position: 'relative', zIndex: 1 }}>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : data ? (
          <>
    <Typography variant="h4" style={{ fontWeight: 'bold', color: "#1e88e5", marginBottom: '0.5rem' }}>
      {data.name}
    </Typography>
    <Typography style={{ color: textColor }}>
      Temperature: {(data.main.temp - 273.15).toFixed(2)}°C
    </Typography>
    <Typography style={{ color: textColor }}>
      Min: {(data.main.temp_min - 273.15).toFixed(2)}°C, Max: {(data.main.temp_max - 273.15).toFixed(2)}°C
    </Typography>
    <Typography style={{ color: textColor }}>
      Humidity: {data.main.humidity}%
    </Typography>
    <Typography style={{ color: textColor }}>
      Wind Speed: {data.wind.speed} m/s
    </Typography>
    <Typography style={{ color: textColor }}>
      Condition: {data.weather[0].description}
    </Typography>
    <img
      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
      alt={data.weather[0].description}
      style={{ width: '64px', height: '64px', marginTop: '8px' }}
    />
  </>
        ) : (
          <Typography style={{ color: textColor }}>
            Click to load <strong style={{ color: "#1e88e5" }}>{city}</strong> weather data
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CityCard;
