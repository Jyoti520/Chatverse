import { useState } from "react";
import { X } from "lucide-react";
import Logout from "../../../auth/Logout";
import AboutInfo from "./AboutInfo";
import ProfileSection from "./ProfileSection";
import Notification from "./Notification";
import Security from "./Security"
import Avatar from "../../../common/Avatar";
import {useAuth} from "../../../../hooks/useAuth"

function Settings() {
  const [openSettings, setOpenSettings] = useState(false);
  const {loggeduser} =useAuth();

  return (
    <>
      <button
        className="group flex items-center justify-center text-center font-semibold rounded-2xl hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 shadow-sm shadow-slate-300/80 dark:shadow-none hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
        onClick={() => setOpenSettings(true)}
      >
        {/* Avatar */}
        <Avatar>
          {loggeduser ? loggeduser.username.charAt(0).toUpperCase() : "D"}
        </Avatar>
        
      </button>

      {openSettings && (
  <div
    className="fixed z-[9999] inset-0 w-full justify-end h-screen flex bg-black/20"
    onClick={() => setOpenSettings(false)}
    role="dialog"
    aria-modal="true"
  >
    <div
      className="w-full h-screen sm:w-[480px] md:w-[420px] bg-white/90 custom-scrollbar dark:bg-slate-950 rounded-2xl animate-slidein p-6 space-y-6 transition-transform duration-300 overflow-y-auto overflow-x-hidden border-l border-white/10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex gap-4 justify-between">
        <h2 className="text-slate-700 dark:text-slate-200 text-xl">Settings</h2>
        <button
          className="absolute right-4 top-4 text-red-500 dark:text-red-400 px-1 py-2 transition-all duration-300 cursor-pointer"
          onClick={() => setOpenSettings(false)}
        >
          <X />
        </button>
      </div>

      <ProfileSection />
      <Notification />
      <Security />
      <AboutInfo />
      <Logout />
    </div>
  </div>
)}
    </>
  );
}

export default Settings;
