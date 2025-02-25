'use client';

import React, { createContext, useContext, useState } from 'react';

type ThemeType = 'gold' | 'green';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'gold',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>('gold');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={
          theme === 'gold'
            ? 'flex h-screen animate-pulse-gold flex-col items-center text-white'
            : 'flex h-screen animate-pulse-green flex-col items-center text-white'
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
