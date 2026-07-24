import { Bell } from "lucide-react";

function Notifications() {
  return (
    <button
      className="relative flex items-center justify-center h-9 w-9 rounded-xl
        text-slate-500 dark:text-slate-400
        hover:bg-black/[0.05] dark:hover:bg-white/[0.06]
        hover:text-slate-700 dark:hover:text-slate-200
        active:scale-95 transition-all duration-150"
      aria-label="Notifications"
    >
      <Bell size={18} />
      {/* Unread dot */}
      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#0f0f13]" />
    </button>
  );
}

export default Notifications;