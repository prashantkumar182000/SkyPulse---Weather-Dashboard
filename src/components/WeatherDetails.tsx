import { Card, CardContent, Typography } from '@mui/material';
import { WeatherData } from '../types/weatherTypes';

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{data.name}</Typography>
      <Typography>Temperature: {data.main.temp}°C</Typography>
      <Typography>Min Temperature: {data.main.temp_min}°C</Typography>
      <Typography>Max Temperature: {data.main.temp_max}°C</Typography>
      <Typography>Humidity: {data.main.humidity}%</Typography>
      <Typography>Speed: {data.wind.speed} m/s</Typography>
      <Typography>Condition: {data.weather[0].description}</Typography>
    </CardContent>
  </Card>
);

export default WeatherDetails;
