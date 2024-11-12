# [SkyPulse](https://skypulse-wd.netlify.app/) - Dynamic Weather Dashboard
A dynamic weather dashboard built with Vite, TypeScript, and React, featuring real-time weather data, city management, and a responsive design. The application supports dark/light mode and utilizes the OpenWeather API for accurate weather updates.

https://github.com/user-attachments/assets/9722b6ab-d61e-4136-b30e-5549e9cc1f80

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Tech Stack and Dependencies](#tech-stack-and-dependencies)
- [API Key Requirements](#api-key-requirements)
- [Features List](#features-list)
- [Assumptions Made](#assumptions-made)
- [Future Improvements](#future-improvements)
## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/DynamicWeatherDashboard.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd DynamicWeatherDashboard
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up your environment variables**:
   - Create a `.env` file in the root directory and add your OpenWeather API key:
     ```
     VITE_API_KEY=your_openweather_api_key
     ```
5. **Run the development server**:
   ```bash
   npm run dev
   ```
## Tech Stack and Dependencies
- **Frontend**: React, TypeScript, Vite
- **UI Framework**: Material-UI
- **Styling**: Tailwind CSS (if using)
- **API**: OpenWeatherMap
- **State Management**: Context API (optional)
### Project Tree
```DynamicWeatherDashboard/
├── public/
│   ├── index.html
│   └── icons/
├── src/
│   ├── assets/                   // Images and icons
│   │   └── weather-video.mp4     // Background video for the dashboard
│   ├── components/               // Core reusable components
│   │   ├── CityCard.tsx          // Component for each city weather card
│   │   ├── WeatherDetails.tsx    // Component for detailed weather view
│   │   |── ThemeToggle.tsx       // Dark/Light theme toggle
|   |   └── StyledDeleteButton.tsx // Separate styled component for IconButton 
│   ├── hooks/                    // Custom hooks
│   │   |── useFetchWeather.ts    // API fetching logic
|   |   └── useFetchImage.ts      // Card image fetching logic
│   ├── context/                  // Context API (optional)
│   │   └── WeatherContext.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx         // Main dashboard page
│   │   ├── Header.tsx            // Header component
│   │   └── NotFound.tsx          // 404 page (optional)
│   ├── services/                 // API services
│   │   └── weatherAPI.ts         // OpenWeatherMap API calls
│   ├── utils/                    // Utility functions
│   │   └── formatDate.ts         // Utility for date formatting
│   ├── types/                    // TypeScript types and interfaces
│   │   └── weatherTypes.ts       // Weather-related types
│   ├── __tests__/                // Unit tests
│   │   ├── CityCard.test.tsx     // Unit tests for CityCard component
│   │   ├── WeatherDetails.test.tsx // Unit tests for WeatherDetails component
│   │   ├── ThemeToggle.test.tsx  // Unit tests for ThemeToggle component
│   │   ├── Dashboard.test.tsx    // Unit tests for Dashboard page
│   │   └── useFetchWeather.test.ts // Unit tests for useFetchWeather hook
│   ├── App.tsx                   // Root component
│   ├── main.tsx                  // Main entry
│   ├── index.css                 // Tailwind CSS styles (if using Tailwind)
│   └── theme.ts                  // Theme configuration
├── .env                          // API key for OpenWeatherMap
├── jest.config.ts                // Jest configuration
├── jest.setup.js                 // Jest setup file (for jest-dom setup)
├── vite.config.ts                // Vite configuration
├── package.json
└── tsconfig.json                 // TypeScript configuration

```
## API Key Requirements
- You need an API key from OpenWeatherMap to access the weather data. Sign up at [OpenWeatherMap](https://openweathermap.org/) to get your API key and add it to the `.env` file as shown in the setup instructions.
## Features List
- Search for multiple cities and view their current weather data.
- View temperature, humidity, wind speed, and weather conditions.
- Toggle between dark and light themes.
- Responsive design for mobile and desktop views.
- City management (add/remove cities).
## Assumptions Made
- Users have an internet connection to fetch weather data.
- The OpenWeather API is available and operational.
## Future Improvements
- Add more weather details such as forecasts and historical data.
- Allow users to save their favorite cities for quick access.
