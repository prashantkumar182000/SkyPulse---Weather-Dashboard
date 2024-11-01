import { useContext } from 'react';
import { Switch, FormControlLabel, Tooltip } from '@mui/material';
import { WeatherContext } from '../context/WeatherContext';
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun icon
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(WeatherContext);

  return (
    <Tooltip title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
      <FormControlLabel
        control={
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            icon={<Brightness7Icon />} // Sun icon when unchecked
            checkedIcon={<Brightness4Icon />} // Moon icon when checked
            sx={{
              '& .MuiSwitch-thumb': {
                transition: 'all 0.3s ease',
              },
              '&.Mui-checked .MuiSwitch-thumb': {
                transform: 'translateX(22px)', // Slide thumb on checked
              },
              '&.Mui-checked': {
                color: '#FFD600', // Custom color when checked (for moon)
              },
              '&.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#ff9800', // Track color when checked
              },
            }}
          />
        }
        label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        labelPlacement="start"
        sx={{
          color: theme === 'dark' ? '#e5e7eb' : '#111827',
          marginBottom: '20px',
        }}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
