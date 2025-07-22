import React, { createContext, useContext, useState, ReactNode } from 'react';

const lightTheme = {
  mode: 'light',
  colors: {
    background: '#fff',
    text: '#222',
    card: '#fff',
    border: '#f0f0f0',
    subtitle: '#888',
    primary: '#3b82f6',
    accent: '#8e44ad',
    danger: '#e74c3c',
    icon: '#222',
  },
};

const darkTheme = {
  mode: 'dark',
  colors: {
    background: '#18181b',
    text: '#f4f4f5',
    card: '#23232a',
    border: '#27272a',
    subtitle: '#a1a1aa',
    primary: '#60a5fa',
    accent: '#a78bfa',
    danger: '#fb7185',
    icon: '#f4f4f5',
  },
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev.mode === 'light' ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 