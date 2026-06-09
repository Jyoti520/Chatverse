import { useState } from "react";
import { MessageCircle, SearchIcon, User } from "lucide-react";
import Loader from "../../common/Loader";
import ChatList from "./ChatList";
import Input from "../../common/Input";
import Contacts from "./Contacts";
import { useChat } from "../../../hooks/useChat";

function SideBar({ activePage, setActivePage }) {
  const {
    chats,
    loading,
    error,
    handleSelectChat,
    handleSearchChats,
    selectedChat,
    clearChatsErr
  } = useChat();
  const [searchChat, setSearchChat] = useState("");
  const [activeTab, setActiveTab] = useState("messages");

  return (
    <>
      <div
        className={`${
          activePage === "sidebar" ? "block" : "hidden md:flex"
        } border-r border-slate-200 dark:border-white/10 transition-all duration-300 flex flex-col dark:bg-slate-900/40 w-full h-full md:w-[380px] `}
      >
        {/* tabs */}
        <div className="flex justify-between items-center px-5 py-4 overflow-x-hidde">
          {/* Title */}
          <h2 className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 font-semibold tracking-tight">
            {activeTab === "messages" ? "Messages" : "Contacts"}
          </h2>
          {/* Toggle button */}
          <button
            className="flex justify-center items-center h-11 w-11 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-cyan-400/5 rounded-2xl dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-cyan-400/10 backdrop-blur-xl shadow-sm border border-indigo-200/70 dark:border-indigo-400/20 text-indigo-700 dark:text-indigo-200 transition-all duration-300 cursor-pointer"
            aria-label="Switch between messages and contacts"
            onClick={() =>
              setActiveTab((pre) =>
                pre === "messages" ? "contacts" : "messages",
              )
            }
          >
            {activeTab === "messages" ? (
              <User size={20} />
            ) : (
              <MessageCircle size={20} />
            )}
          </button>
        </div>

        {/* Tabs : Chats and Contact */}
        {activeTab === "messages" ? (
          <>
            {/* Search bar */}
            <div className="relative pb-3 pt-4 px-4">
              <Input
                className="bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-cyan-400/5 dark:from-indigo-500/10 dark:via-blue-500/10 dark:to-cyan-400/10 backdrop-blur-xl border-2 border-indigo-300/80 dark:border-indigo-400/15 px-5 py-4 pr-12 rounded-2xl focus:ring-2 focus:border-indigo-400 dark:focus:border-indigo-500/30 focus:ring-indigo-500/30"
                placeholder="Search here..."
                value={searchChat}
                onChange={(e) => {
                  setSearchChat(e.target.value);
                  handleSearchChats(e.target.value);
                }}
                aria-label="Search conversations..."
              />
              <SearchIcon
                className="absolute top-[54%] -translate-y-1/2 right-8 text-indigo-400/80 dark:text-indigo-300/50 pointer-events-none"
                size={20}
                aria-label="search chat"
              />
            </div>
            {/*Chats tab */}
            {loading && (
              <div className="flex justify-center items-center h-[80vh] transition-opacity duration-300 animate-fadein">
                <Loader textColor="text-indigo-500" />
              </div>
            )}
            {!loading && error && (
              <h3 className=" text-red-500 bg-red-500/5 mt-6 place-items-center text-center text-base md:text-sm text-wrap p-2 tracking-wider">
                {error}
              </h3>
            )}

            {!loading && !error && chats.length === 0 && (
              <h3 className=" text-indigo-500 dark:text-indigo-400 mt-6 text-center font-medium text-sm text-wrap p-2">
                No Conservations yet , Join a chat to see messages here
              </h3>
            )}
            {!loading && chats.length > 0 && (
              <div className="overflow-y-auto">
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

          <Contacts />
        )}
      </div>
    </>
  );
}
export default SideBar;
