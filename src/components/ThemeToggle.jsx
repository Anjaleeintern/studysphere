import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 left-50 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 transition hover:scale-110"
    >
      {theme === "light" ? (
        <Moon className="text-gray-900 dark:text-white" size={22} />
      ) : (
        <Sun className="text-yellow-400" size={22} />
      )}
    </button>
  );
}
