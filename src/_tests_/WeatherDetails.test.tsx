import { render, screen } from '@testing-library/react';
import WeatherDetails from '../components/WeatherDetails';
import { WeatherData } from '../types/weatherTypes'; // Ensure the import is correct

describe('WeatherDetails Component', () => {
  const weatherData: WeatherData = {
    name: 'Test City',
    main: {
      temp: 25,
      temp_min: 20,
      temp_max: 30,
      humidity: 60,
    },
    wind: {
      speed: 10,
    },
    weather: [
      {
        id: 800, // Example weather condition id for clear sky
        main: 'Clear',
        description: 'clear sky',
        icon: '01d', // Icon code for clear sky
      },
    ],
  };

  it('renders city name', () => {
    render(<WeatherDetails data={weatherData} />);
    expect(screen.getByText(/Test City/i)).toBeInTheDocument();
  });

  it('renders humidity data', () => {
    render(<WeatherDetails data={weatherData} />);
    expect(screen.getByText(/Humidity: 60%/i)).toBeInTheDocument();
  });

  it('displays wind speed', () => {
    render(<WeatherDetails data={weatherData} />);
    expect(screen.getByText(/Speed: 10 m\/s/i)).toBeInTheDocument();
  });

  it('shows min and max temperature', () => {
    render(<WeatherDetails data={weatherData} />);
    expect(screen.getByText(/Min Temperature: 20°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Max Temperature: 30°C/i)).toBeInTheDocument();
  });

  it('displays weather condition', () => {
    render(<WeatherDetails data={weatherData} />);
    expect(screen.getByText(/Condition: clear sky/i)).toBeInTheDocument();
  });
});
