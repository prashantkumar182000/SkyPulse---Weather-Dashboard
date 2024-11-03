// src/_tests_/ThemeToggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';

describe('ThemeToggle Component', () => {
  it('renders a toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument(); // Change button to checkbox
  });

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />);
    const toggleCheckbox = screen.getByRole('checkbox'); // Use checkbox role
    
    fireEvent.click(toggleCheckbox);
    expect(document.body.classList.contains('dark-theme')).toBeTruthy();
  });
});
