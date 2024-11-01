import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeToggle from '../components/ThemeToggle';

const Header = () => {
  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar className="flex justify-between items-center">
        <Box>
        <Typography variant="h4" component="div" className="font-bold custom-font">
  SkyPulse
</Typography>
          <Typography
            variant="subtitle1"
            className="text-sm"
            style={{ fontFamily: 'Poppins, sans-serif' }} // Apply font to tagline as well
          >
            Your daily weather insight
          </Typography>
        </Box>
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
