import { useState, useRef, useEffect } from "react";
import Button from "../../common/Button";
import {
  ChevronLeft,
  MenuIcon,
  Moon,
  MoreVertical,
  Search,
  X,
} from "lucide-react";
import MessageOptions from "./MessageOptions";
import Avatar from "../../common/Avatar";
import Input from "../../common/Input";
import { useAuth } from "../../../hooks/useAuth";
import { useChat } from "../../../hooks/useChat";
import { useSocket } from "../../../hooks/useSocket";
import { formatUserName } from "../../../utils/format";

function ChatHeader({ goToBack, search, setSearch }) {
  const [showMenu, setShowMenu] = useState(false);
  const { selectedChat } = useChat();
  const drawerRef = useRef();
  const { onlineUsers } = useSocket();
  const { loggeduser } = useAuth();
  const [showSearchbar, setShowSearchbar] = useState(false);

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

  const closeSearch = () => {
    setShowSearchbar(false);
    setSearch("");
  };

  return (
    <>
      {/* Header Bar */}
      <div className="border-b border-slate-200 dark:border-white/[0.07]">
        <nav className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-8 ">
          {/* left section */}

          <div
            className={`flex min-w-0 items-center overflow-hidden gap-3 transition-all duration-300 ease ${
              showSearchbar
                ? "w-0 flex-none opacity-0"
                : "w-full flex-1 opacity-100"
            }`}
          >
            {/* Back button */}
            <button
              type="button"
              aria-label="Go back"
              className="flex md:hidden rounded-xl justify-center items-center w-9 h-9 sm:h-11 sm:w-11 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
              onClick={goToBack}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Sender chatname */}
            <div className="relative shrink-0">
              <Avatar>{chatName.charAt(0).toUpperCase()}</Avatar>
              {isOnline && (
                <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-emerald-500/70 ring-offset-2 ring-offset-white dark:ring-offset-slate-900" />
              )}
            </div>

            <div className="flex min-w-0 flex-col justify-center leading-tight">
              <h1 className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100 sm:text-base">
                {formatUserName(chatName)}
              </h1>
              {isOnline ? (
                <span className="text-xs text-emerald-600 dark:text-emerald-400">
                  Active now
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-yellow-500 dark:text-yellow-400">
                  <Moon size={11} className="fill-current" />
                  Offline
                </span>
              )}
            </div>
          </div>

          {/* Search Messages */}

          <div
            className={`${showSearchbar ? "flex-1" : "shrink-0"} flex items-center justify-center gap-2 `}
          >
            {showSearchbar && (
              <Input
                className={`relative border-0 backdrop-blur-xl bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500/40 dark:focus:ring-indigo-500/30 transition-all duration-200`}
                placeholder="Search Conversation..."
                aria-label="Search Messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
            <button
              className="w-9 h-9 flex justify-center items-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-indigo-500 dark:text-indigo-400 transition-colors duration-300"
              onClick={() =>
                showSearchbar ? closeSearch() : setShowSearchbar(true)
              }
              aria-label={showSearchbar ? "Close search" : "Search messages"}
            >
              {showSearchbar ? (
                <X size={20} className="text-red-500 dark:text-red-400" />
              ) : (
                <Search size={20} />
              )}
            </button>
            {!showSearchbar && (
              <button
                type="button"
                aria-label="More options"
                onClick={() => setShowMenu(!showMenu)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-indigo-500 transition-colors hover:bg-slate-100 dark:text-indigo-400 dark:hover:bg-white/10"
              >
                <MoreVertical size={20} />
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Delete message option  */}
      <MessageOptions isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
}

export default ChatHeader;
