import { useState } from "react";
import {
  MessageCircle,
  SearchIcon,
  ArrowLeft,
  SquarePen,
} from "lucide-react";
import Loader from "../../common/Loader";
import ChatList from "./ChatList";
import Input from "../../common/Input";
import Contacts from "./Contacts";
import { useChat } from "../../../hooks/useChat";
import { formatUserName } from "../../../utils/format";
import { useAuth } from "../../../hooks/useAuth";
import Avatar from "../../common/Avatar";

function SideBar({ activePage, setActivePage }) {
  const {
    chats,
    loading,
    error,
    handleSelectChat,
    handleSearchChats,
    selectedChat,
    clearChatsErr,
  } = useChat();
  const { loggeduser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("messages");

  // Handle input change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (activeTab === "messages") handleSearchChats(value);
  };
  return (
    <>
      <div
        className={`${
          activePage === "sidebar" ? "block" : "hidden md:flex"
        } border-r border-slate-300 dark:border-white/[0.06] transition-all duration-300 flex flex-col bg-slate-50 dark:bg-slate-900/40 w-full h-full md:w-[300px] shrink-0`}
      >
        {/* Header */}
        <div className="px-4 pt-6 pb-3">
          <div className="pb-6 flex justify-between items-center gap-2 px-2">
            <div className="flex justify-center items-center gap-3">
              <Avatar>{loggeduser.username.charAt(0).toUpperCase()}</Avatar>
              <div className="flex flex-col items-start">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  {activeTab === "contacts" ? "Contacts" : "Chats"}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeTab === "contacts"
                    ? "Add users"
                    : `Welcome, ${formatUserName(loggeduser?.username)}`}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label={
                activeTab === "contacts" ? "Back to chats" : "Start a new chat"
              }
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-200 active:scale-95 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
              onClick={() => {
                setActiveTab(
                  activeTab === "contacts" ? "messages" : "contacts",
                );
                setSearchTerm("");
              }}
            >
              {activeTab === "contacts" ? (
                <ArrowLeft size={18} />
              ) : (
                <SquarePen size={18} />
              )}
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mt-3">
            <SearchIcon
              className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400 pointer-events-none z-10"
              size={20}
            />
            <Input
              className="pl-11 pr-4 py-2 bg-white dark:bg-white/[0.04] backdrop-blur-xl border border-black/10 dark:border-white/[0.08] rounded-xl focus:border-indigo-400/80 dark:focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20"
              placeholder={
                activeTab === "messages"
                  ? "Search chats..."
                  : "Search contacts..."
              }
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search..."
            />
          </div>
        </div>

        {/* Tabs : Chats and Contact */}
        {activeTab === "messages" ? (
          <>
            {/*Chats tab */}
            {loading && (
              <div className="flex flex-1 justify-center items-center transition-opacity duration-300 animate-fadein">
                <Loader textColor="text-indigo-500" />
              </div>
            )}
            {!loading && error && (
              <div className="mx-4 mt-4 rounded-xl border border-red-400/20 dark:border-red-500/20 bg-red-50 dark:bg-red-500/[0.05] px-4 py-3">
                <p className="text-xs font-medium text-red-500 dark:text-red-400 text-center">
                  {error}
                </p>
              </div>
            )}

            {!loading && !error && chats.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
                <MessageCircle
                  size={28}
                  className="text-slate-300 dark:text-slate-600"
                />
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  No conversations yet
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-600">
                  Switch to Contacts to start one
                </p>
              </div>
            )}

            {!loading && chats.length > 0 && (
              <div className="flex-1 overflow-y-auto">
                {chats.map((chat, index) => (
                  <ChatList
                    key={chat?._id}
                    chat={chat}
                    index={index}
                    handleChat={() => {
                      handleSelectChat(chat);
                      setActivePage("chatbox");
                    }}
                    isActive={selectedChat?._id === chat._id}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          //  Contact tab
          <Contacts search={searchTerm} />
        )}
      </div>
    </>
  );
}
export default SideBar;
