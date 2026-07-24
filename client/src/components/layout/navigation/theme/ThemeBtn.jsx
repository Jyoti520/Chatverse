import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../../hooks/useTheme";

function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="relative flex items-center justify-center h-9 w-9 rounded-xl
        text-slate-500 dark:text-slate-400
        hover:bg-black/[0.05] dark:hover:bg-white/[0.06]
        hover:text-slate-700 dark:hover:text-slate-200
        active:scale-95 transition-all duration-150"
        onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400 fill-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-500 fill-indigo-500" />
      )}
    </button>
  );
}

export default ThemeBtn;
