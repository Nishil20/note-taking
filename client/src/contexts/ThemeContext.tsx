import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { user } = useAuth();
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from user settings or localStorage
    if (user?.settings?.theme) {
      return user.settings.theme as Theme;
    }
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 