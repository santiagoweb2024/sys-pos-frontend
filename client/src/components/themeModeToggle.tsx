"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border transition-colors hover:bg-surface-100 dark:hover:bg-surface-700 border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-surface-700 dark:text-surface-200" />
      ) : (
        <Moon className="h-5 w-5 text-surface-700 dark:text-surface-200" />
      )}
    </button>
  );
}