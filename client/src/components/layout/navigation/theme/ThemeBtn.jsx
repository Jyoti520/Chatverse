import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../../hooks/useTheme";

function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className="relative flex justify-center items-center h-10 w-10 sm:w-12 sm:h-12 mx-auto bg-white hover:bg-slate-50 dark:bg-white/5 border border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-slate-200  shadow-sm shadow-slate-200/70 dark:shadow-none transition-all hover:scale-[1.03] active:scale-90 duration-300 text-center font-medium rounded-2xl"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
}

export default ThemeBtn;
