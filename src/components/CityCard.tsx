import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  useMediaQuery,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchWeather from '../hooks/useFetchWeather';
import useFetchImage from '../hooks/useFetchImage';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import StyledDeleteButton from './StyledDeleteButton';

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
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[10],
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
  opacity: 0.4,
}));

const CityCard = ({ city, onRemove }: CityCardProps) => {
  const { weatherData, error, isLoading, getWeather } = useFetchWeather(city);
  const { theme } = useContext(WeatherContext);
  const imageUrl = useFetchImage(weatherData?.weather[0].main.toLowerCase());
  const textColor = theme === 'dark' ? 'white' : 'black';
  const cityNameColor = theme === 'dark' ? 'white' : '#1d1160';
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(city);
  };

  return (
    <StyledCard onClick={getWeather}>
      {imageUrl && <BackgroundImage imageUrl={imageUrl} />}
      <StyledDeleteButton color="inherit" onClick={handleRemove} sx={{ color: textColor }}>
        <DeleteIcon />
      </StyledDeleteButton>
      <CardContent style={{ position: 'relative', zIndex: 1 }}>
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : weatherData ? (
          <>
            <Typography
              variant="h4"
              style={{
                fontWeight: 'bold',
                color: cityNameColor,
                fontFamily: "Audiowide",
                marginBottom: '2rem',
                textAlign: 'left',
                fontSize: isSmallScreen ? '1.5rem' : '2rem',
              }}
            >
              {weatherData.name}
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="h1"
                style={{
                  color: 'orange',
                  fontSize: isSmallScreen ? '40px' : '64px',
                  fontWeight: '300',
                  lineHeight: '1.2',
                }}
              >
                {Math.round(weatherData.main.temp - 273.15)}°
              </Typography>

              <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginLeft: '16px' }}>
                <Box display="flex" flexDirection="column">
                  <Typography
                    variant="h5"
                    style={{
                      color: '#D22B2B',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                      fontSize: isSmallScreen ? '1rem' : '1.25rem',
                    }}
                  >
                    {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
                  </Typography>
                  <Typography style={{ color: textColor, fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>
                    Min: {Math.round(weatherData.main.temp_min - 273.15)}°C, Max: {Math.round(weatherData.main.temp_max - 273.15)}°C
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    style={{
                      width: isSmallScreen ? '36px' : '48px',
                      height: isSmallScreen ? '36px' : '48px',
                      marginLeft: '8px',
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Typography
              style={{
                color: textColor,
                marginTop: '0.5rem',
                fontSize: isSmallScreen ? '0.875rem' : '1rem',
              }}
            >
              Humidity: {weatherData.main.humidity}% | Speed: {weatherData.wind.speed} m/s
            </Typography>
          </>
        ) : (
          <Typography style={{ color: textColor }}>
            Loading <strong style={{ color: '#1e88e5' }}>{city}</strong> weather data...
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CityCard;
