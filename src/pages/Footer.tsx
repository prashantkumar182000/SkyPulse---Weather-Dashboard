import { Typography } from '@mui/material';

const Footer = () => (
  <footer className="py-4 bg-gray-200 text-center">
    <Typography variant="body2" color="textSecondary">
      © {new Date().getFullYear()} SkyPulse - Weather Dashboard. Powered by OpenWeatherMap.
    </Typography>
  </footer>
);

export default Footer;
