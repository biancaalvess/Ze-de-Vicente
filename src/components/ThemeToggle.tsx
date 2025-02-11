import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 sm:p-3 rounded-full bg-gray-200 dark:bg-gray-800 
                hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors
                shadow-lg"
      aria-label="Alternar tema"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
      ) : (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200" />
      )}
    </button>
  );
}