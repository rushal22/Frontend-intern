// ThemeMode.jsx
import { useState, useEffect } from "react";

const useDarkMode = () => {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }

    // Return a cleanup function if needed, here no cleanup is necessary
    return () => {
      // Cleanup code if required
    };
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  return [darkMode, handleToggleDarkMode];
};

export default useDarkMode;
