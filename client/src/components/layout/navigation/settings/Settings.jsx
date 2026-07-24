import { useState } from "react";
import { Settings, X } from "lucide-react";
import Logout from "../../../auth/Logout";
import AboutInfo from "./AboutInfo";
import ProfileSection from "./ProfileSection";
import Notification from "./Notification";
import Security from "./Security"
import Avatar from "../../../common/Avatar";
import {useAuth} from "../../../../hooks/useAuth"

function Setting() {
  const [openSettings, setOpenSettings] = useState(false);
  const {loggeduser} =useAuth();

  return (
    <>
      <button
        className="relative flex justify-center items-center h-8 w-8 sm:w-10 sm:h-10 mx-auto bg-white hover:bg-slate-50 dark:bg-white/5 border border-slate-300/80 dark:border-white/10 text-slate-700 dark:text-slate-200  shadow-sm shadow-slate-200/70 dark:shadow-none transition-all hover:scale-[1.03] active:scale-95 duration-150 text-center font-medium rounded-xl"
        onClick={() => setOpenSettings(true)}
        aria-label="Open Settings"
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
          className="absolute right-4 top-4 text-red-500 dark:text-red-400 px-1 py-2 transition-all duration-200 cursor-pointer active:scale-95"
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

export default Setting;
