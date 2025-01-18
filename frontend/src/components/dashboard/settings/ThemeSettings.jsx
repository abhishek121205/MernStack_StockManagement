import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const ThemeSettings = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 dark:text-white">Theme Settings</h3>
      <div className="flex items-center justify-between">
        <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
        <button
          onClick={toggleDarkMode}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
            darkMode ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ThemeSettings;