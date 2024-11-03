import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this is imported
import CityCard from '../components/CityCard';

describe('CityCard Component', () => {
  const cityName = 'New York'; // Change this to a string

  it('renders city name', () => {
    render(<CityCard city={cityName} onRemove={() => {}} />); // Pass string city name
    expect(screen.getByText(/New York/i)).toBeInTheDocument();
  });

  it('displays correct temperature', () => {
    render(<CityCard city={cityName} onRemove={() => {}} />);
    expect(screen.getByText(/25/i)).toBeInTheDocument(); // Adjust based on your component's implementation
  });

  it('shows weather description', () => {
    render(<CityCard city={cityName} onRemove={() => {}} />);
    expect(screen.getByText(/Sunny/i)).toBeInTheDocument(); // Adjust based on your component's implementation
  });
});
