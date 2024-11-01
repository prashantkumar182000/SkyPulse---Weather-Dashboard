import { createContext, useState, useMemo, ReactNode, useEffect } from 'react';

interface WeatherContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const WeatherContext = createContext<WeatherContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
