import { useAuth } from "../../../hooks/useAuth";
import { useSocket } from "../../../hooks/useSocket";

function ChatList({ chat, index, handleChat }) {
  const { onlineUsers } = useSocket();
  const { loggeduser } = useAuth();

  const chatUser = chat?.member?.find((c) => String(c._id) !== String(loggeduser._id));

  const isOnline = onlineUsers.has(String(chatUser?._id));


  const chatName = chat.chatName || "DeletedUser";
  const latestMessage = chat?.latestMessage || "no message yet";
  const content = latestMessage?.content || "no message yet";
  const isSenderMessage= String(chat.latestMessage?.sender?._id)===String(loggeduser._id)

    if (!chat) {
    return (
      <div className="flex justify-center items-center text-indigo-500 dark:text-indigo-400 font-medium px-6 py-4 text-sm">
        No Conservation yet
      </div>
    );
  }

  return (
    chat && (
      <>
        <div
          className="group px-4 py-3 mx-2 my-1 hover:bg-slate-100 dark:hover:bg-white/[0.03] transition-all duration-300 cursor-pointer animate-slidein rounded-2xl "
          style={{ animationDelay: `${index * 0.08}s` }}
          onClick={handleChat}
          aria-roledescription="open chat"
        >
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            {/* user avatar */}
            <button
              className={`relative h-10 w-10 sm:h-11 sm:w-11 flex justify-center items-center text-white rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 text-sm font-semibold transition-all duration-300  shadow-sm shadow-indigo-500/20 dark:shadow-none`}
            > 
            {/* status badge */}
              {isOnline && (
                <div
                  className={`absolute right-0 bottom-0 h-3 w-3 border border-white rounded-full bg-emerald-400`}
                ></div>
              )}
              {chatName?.charAt(0).toUpperCase() || "Deleted user"}
            </button>

            {/* chatName and message */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-6 justify-between">
                <h2 className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200">
                  {chatName?.charAt(0).toUpperCase() + chatName?.slice(1) ||
                    "Deleted user"}
                </h2>

                <p className="text-xs whitespace-nowrap text-slate-500 dark:text-slate-400">
                  {latestMessage?.createdAt
                    ? new Date(latestMessage?.createdAt).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </p>
                {chat.unreadMsgCount > 0 && !isSenderMessage && (
                  <span className="absolute right-2 bottom-3 h-5 w-5 px-1.5 text-[11px] min-w-[20px] rounded-full bg-indigo-500 flex items-center justify-center text-white dark:bg-indigo-500/80 font-medium">
                    {chat?.unreadMsgCount}
                  </span>
                )}
              </div>

              {latestMessage ? (
                <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
                  {content.length > 20
                    ? content.substring(0, 20) + "..."
                    : content}
                </p>
              ) : (
                "no messages yet"
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ChatList;
