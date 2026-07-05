import { useEffect, useRef, useState } from "react";
import { Check, CheckCheck, Copy, CopyCheckIcon } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../common/Button";
import Avatar from "../../common/Avatar";
import { useAuth } from "../../../hooks/useAuth";
import { useSocket } from "../../../hooks/useSocket";
import { formattedTime, formatUserName } from "../../../utils/format";

function Message({ showName, message, search }) {
  const { loggeduser } = useAuth();
  const { onlineUsers } = useSocket();
  const [isCopied, setCopied] = useState(false);
  const timeoutRef = useRef();

  const isSender =
    message?.sender?._id?.toString() === loggeduser._id?.toString();
  const chatUser = message?.chatId?.member?.find(
    (c) => c._id !== loggeduser._id,
  );
  const query = search.trim();
  const isMatch =
    query.length > 0 &&
    (message?.content ?? "").toLowerCase().includes(query.toLowerCase());

  const highlightSearch = (text, term) => {
    if (!term) return text;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark
          key={index}
          className="rounded bg-indigo-300/40 px-0.5 text-slate-900 dark:bg-indigo-300/40"
        >
          {part}
        </mark>
      ) : (
        <span key={index}>{part}</span>
      ),
    );
  };
  const isOnline = onlineUsers.has(chatUser?._id);

  const handleCopy = async (text) => {
    if(!text) return;
    try {
      await navigator.clipboard.writeText(text);
      clearTimeout(timeoutRef.current);
      setCopied(true);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 1500);
      toast.success("Message copied!");
    } catch (error) {
      toast.error("copy failed");
    }
  };
    useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="px-4 sm:px-6 py-2 ">
      {/* user header */}
      {showName && (
        <div
          className={`flex w-full mb-2 items-center gap-3 ${
            isSender ? "justify-end" : "justify-start"
          }`}
        >
          <Avatar className="relative">
            {isOnline && (
              <span
                className={`absolute border-2 border-white right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-emerald-400 `}
              ></span>
            )}
            {isSender
              ? "You".charAt(0)
              : (message?.sender?.username?.charAt().toUpperCase() ?? "D")}
          </Avatar>
          <h1 className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200">
            {isSender
              ? "You"
              : formatUserName(message?.sender?.username)
              }
          </h1>
        </div>
      )}
      <div
        className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`relative group flex flex-col items-start justify-center w-full max-w-[75%] sm:max-w-[40%] px-4 py-2.5 rounded-2xl transition-colors duration-300 min-w-0 select-text ${
            isSender
              ? "rounded-tr-sm  bg-blue-500/80 backdrop-blur-xl text-white shadow-sm shadow-indigo-500/10"
              : "rounded-tl-sm text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-white/[0.04] border border-white/10 backdrop-blur-xl"
          }`}
        >
          {/* message text */}
          <p className="whitespace-pre-wrap break-all leading-relaxed text-sm sm:text-base">
            {highlightSearch(message.content, query)|| "no messages yet"}
          </p>
          {/* message footer */}
          <div className="flex items-center justify-end mt-2 gap-2">
            {/* message time */}
            <p className="text-xs opacity-70">{formattedTime(message.createdAt)}</p>

            {/* read status */}
            <span>
              {isSender ? (
                message.read ? (
                  <CheckCheck className="text-blue-300" size={16} />
                ) : (
                  <Check
                    className="text-slate-700 dark:text-slate-300"
                    size={16}
                  />
                )
              ) : (
                ""
              )}
            </span>
            {/*copy message button */}
            <button
               className="opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
              onClick={() => handleCopy(message?.content)} disabled={!message.content}

            >
              {isCopied ? <CopyCheckIcon size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
