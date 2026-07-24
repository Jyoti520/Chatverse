import Settings from "./settings/Settings";
import ThemeBtn from "./theme/ThemeBtn";
import Logo from "../../../assets/Logo";
import Notifications from "./Notifications";

function Header() {
  return (
    <header className="sticky top-0 w-full h-[70px] flex items-center justify-between px-5 py-3 bg-white/5 dark:from-indigo-500/10 dark:to-blue-900/10 border-b dark:border-slate-500/30 z-[999]">
            
      <Logo text="text-xl"/>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 p-2">
      <Notifications/>
      <ThemeBtn/>
      <Settings/>
      </div>
      
      </div>
    </header>
  );
}

export default Header;



