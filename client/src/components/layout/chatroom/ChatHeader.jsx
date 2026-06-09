import { useState, useRef, useEffect } from "react";
import Button from "../../common/Button";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import MessageOptions from "./MessageOptions";
import Avatar from "../../common/Avatar";
import Input from "../../common/Input";
import { useAuth } from "../../../hooks/useAuth";
import { useChat } from "../../../hooks/useChat";
import { useSocket } from "../../../hooks/useSocket";


function ChatHeader({ goToBack }) {
  const [showMenu, setShowMenu] = useState(false);
  const { selectedChat } = useChat();
  const drawerRef = useRef();
  const { onlineUsers } = useSocket();
  const { loggeduser } = useAuth();

  const chatUser = selectedChat?.member?.find((c) => c._id !== loggeduser._id);

  const isOnline = onlineUsers?.has(chatUser?._id);

  // Optional: Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const chatName = selectedChat?.chatName ?? "Deleted User";

  return (
    <>
      {/* Header Bar */}
      <div className="bg-white dark:bg-white/5 border-b border-slate-200 dark:border-gray-500/30">
        <nav className="relative flex items-center justify-between gap-3 px-3 py-4 sm:px-6 ">
          {/* left section */}

          <div className="flex items-center justify-center gap-3 px-2 sm:px-4">
            {/* Back button */}
            <button
              className="flex md:hidden justify-center items-center w-9 h-9 sm:h-11 sm:w-11 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-cyan-400/5 rounded-2xl dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-cyan-400/10 shadow-sm border border-indigo-300/70 focus:bg-indigo-500/20 dark:border-indigo-400/20 text-indigo-700 dark:text-indigo-200 transition-all duration-300 cursor-pointer"
              onClick={goToBack}
            >
              <ArrowLeft size={16} />
            </button>

            {/* Sender chatname */}
            <Avatar>{chatName?.charAt(0).toUpperCase() || "D"}</Avatar>
            <div className="flex flex-col gap-1 leading-tight min-w-fit">
              <h1 className="truncate text-sn sm:text-base font-medium text-slate-800 dark:text-gray-200">
                {chatName?.charAt(0).toUpperCase() + chatName?.slice(1)}
              </h1>
              {/* status badge */}
              {isOnline && (
                <span className="text-sm font-medium text-emerald-400/80 dark:text-emerald-300/50">
                  Online
                </span>
              )}
            </div>
          </div>
          {/* Search Messages - ToDo */}
          <div className="flex justify-end sm:justify-center px-2 sm:px-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <Input
              className="bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-cyan-400/5 dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-cyan-400/10 backdrop-blur-xl border border-indigo-300/80 dark:border-indigo-400/15 px-5 py-3 pr-12 rounded-3xl focus:ring-2 focus:border-indigo-400 dark:focus:border-indigo-500/30 focus:ring-indigo-500/30"
              placeholder="Search here..."
              aria-label="Search Messages..."
            />
          </div>
          {/* Right Section */}
          <div className="relative flex items-center">
            <button
              className="flex justify-center items-center h-9 w-9 sm:h-11 sm:w-11 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-cyan-400/5 rounded-2xl dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-cyan-400/10 backdrop-blur-xl shadow-sm border border-indigo-300/70 dark:border-indigo-400/20 text-indigo-700 dark:text-indigo-200 transition-all duration-300 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            >
              <EllipsisVertical size={16} />
            </button>
          </div>
        </nav>
      </div>

      {/* Delete message option  */}
      <MessageOptions isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
}

export default ChatHeader;
