import { Card, CardContent, Typography, CircularProgress, IconButton, Box, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useFetchWeather from '../hooks/useFetchWeather';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
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
  opacity: 0.3,
}));

const CityCard = ({ city, onRemove }: CityCardProps) => {
  const { data, error, loading, getWeather } = useFetchWeather(city);
  const { theme } = useContext(WeatherContext);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const textColor = theme === 'dark' ? 'white' : 'black';
  const cityNameColor = theme === 'dark' ? 'white' : '#1e88e5';
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Media query for small screens

  useEffect(() => {
    const fetchImage = async () => {
      if (data) {
        const condition = data.weather[0].main.toLowerCase();
        const apiKey = 'rkLqsF0rpXalqKnUXAh7ELJaZ5bjVSXkJIJZz1QqkDzUFUtqd8xMOj32';
        const imageResponse = await fetch(`https://api.pexels.com/v1/search?query=${condition}&per_page=1`, {
          headers: {
            Authorization: apiKey,
          },
        });
        const imageData = await imageResponse.json();
        if (imageData.photos.length > 0) {
          setImageUrl(imageData.photos[0].src.original);
        }
      }
    };

    fetchImage();
  }, [data]);

  return (
    <StyledCard onClick={getWeather}>
      {imageUrl && <BackgroundImage imageUrl={imageUrl} />}
      <IconButton
        style={{ position: 'absolute', top: 16, right: 16, color: textColor, zIndex: 2 }}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(city);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <CardContent style={{ position: 'relative', zIndex: 1 }}>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : data ? (
          <>
            {/* City Name with color based on theme */}
            <Typography
              variant="h4"
              style={{
                fontWeight: 'bold',
                color: cityNameColor,
                fontFamily: 'Cursive',
                marginBottom: '2rem',
                textAlign: 'left',
                fontSize: isSmallScreen ? '1.5rem' : '2rem',
              }}
            >
              {data.name}
            </Typography>

            {/* Flex container for temperature and weather details */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {/* Temperature on the left in orange */}
              <Typography
                variant="h1"
                style={{
                  color: 'orange',
                  fontSize: isSmallScreen ? '40px' : '64px',
                  fontWeight: '300',
                  lineHeight: '1.2',
                }}
              >
                {Math.round(data.main.temp - 273.15)}°
              </Typography>

              {/* Right side: Weather description, min/max temperatures, and weather icon */}
              <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginLeft: '16px' }}>
  {/* Left Box: Weather description and min/max temperature */}
  <Box display="flex" flexDirection="column">
  <Typography
  variant="h5"
  style={{
    color: "#D22B2B", // Set text color to red
    fontWeight: 'bold', // Make the text bold
    marginBottom: '0.5rem',
    fontSize: isSmallScreen ? '1rem' : '1.25rem',
  }}
>
  {data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}
</Typography>

    <Typography style={{ color: textColor, fontSize: isSmallScreen ? '0.875rem' : '1rem' }}>
      Min: {Math.round(data.main.temp_min - 273.15)}°C, Max: {Math.round(data.main.temp_max - 273.15)}°C
    </Typography>
  </Box>

  {/* Right Box: Weather icon */}
  <Box display="flex" justifyContent="center" alignItems="center">
    <img
      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
      alt={data.weather[0].description}
      style={{
        width: isSmallScreen ? '36px' : '48px',
        height: isSmallScreen ? '36px' : '48px',
        marginLeft: '8px',
      }}
    />
  </Box>
</Box>
            </Box>

            {/* Additional details like humidity and wind speed */}
            <Typography
              style={{
                color: textColor,
                marginTop: '0.5rem',
                fontSize: isSmallScreen ? '0.875rem' : '1rem',
              }}
            >
              Humidity: {data.main.humidity}% | Speed: {data.wind.speed} m/s
            </Typography>
          </>
        ) : (
          <Typography style={{ color: textColor }}>
            Loading <strong style={{ color: "#1e88e5" }}>{city}</strong> weather data...
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CityCard;
