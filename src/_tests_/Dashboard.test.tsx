import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

describe('Dashboard Page', () => {
  it('renders the main heading', () => {
    render(<Dashboard />);
    expect(screen.getByRole('heading', { name: /Weather Dashboard/i })).toBeInTheDocument();
  });

  it('displays a list of city weather cards', () => {
    render(<Dashboard />);
    expect(screen.getAllByTestId('city-card')).toHaveLength(3); // Replace with actual number
  });
});
