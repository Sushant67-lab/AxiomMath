import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('axiom_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);
  const isFirstMountRef = useRef(true);

  const applyTheme = (currentTheme: Theme, smooth: boolean) => {
    const root = document.documentElement;

    if (smooth) {
      setIsTransitioning(true);
      root.classList.add('theme-transitioning');
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
      transitionTimerRef.current = window.setTimeout(() => {
        root.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 480);
    } else {
      root.classList.remove('theme-transitioning');
    }

    if (currentTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
  };

  useEffect(() => {
    const smooth = !isFirstMountRef.current;
    applyTheme(theme, smooth);
    isFirstMountRef.current = false;

    try {
      localStorage.setItem('axiom_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (newTheme === theme) return;
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
