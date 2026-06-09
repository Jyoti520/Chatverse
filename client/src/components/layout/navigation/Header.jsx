import Settings from "./settings/Settings";
import ThemeBtn from "./theme/ThemeBtn";
import Logo from "../../../assets/Logo";

function Header() {
  return (
    <header className="sticky top-0 w-full h-[70px] flex items-center justify-between px-5 py-3 bg-white/5 dark:from-indigo-500/10 dark:to-blue-900/10 border-b dark:border-gray-500/30 rounded-b-xl z-[999]">
            
      <Logo/>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/40 dark:bg-white/5 p-2">
      <ThemeBtn/>
      <Settings/>
      </div>
      
      </div>
    </header>
  );
}

export default Header;



