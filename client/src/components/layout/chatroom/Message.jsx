import { useEffect, useRef, useState } from "react";
import { Check, CheckCheck, Copy } from "lucide-react";
import { toast } from "react-toastify";
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
  const isOnline = onlineUsers?.has(chatUser?._id);

  const query = search.trim();

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

  const handleCopy = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      clearTimeout(timeoutRef.current);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
      toast.success("Message copied!");
    } catch (error) {
      toast.error("copy failed");
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="px-4 sm:px-6 py-2">
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
                className={`absolute border-2 border-white right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-emerald-400`}
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

      {/* message bubble */}
      <div className={`group flex w-full items-center gap-1 ${isSender ? "justify-end" : "justify-start"}`}>
        {isSender ? (
          <>
            {/* copy button */}
            <button
              className="shrink-0 rounded p-1 text-slate-400 opacity-0 transition-opacity duration-150 hover:!opacity-100 focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-60 disabled:pointer-events-none disabled:opacity-0 dark:text-slate-500"
              onClick={() => handleCopy(message?.content)}
              disabled={!message.content}
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
            </button>

            <div className="relative flex w-full max-w-[75%] min-w-0 flex-col rounded-2xl py-3 pl-4 pr-3.5 sm:max-w-[30%] rounded-br-md bg-indigo-500 dark:bg-indigo-600 text-white">
              {/* message text */}
              <p className="whitespace-pre-wrap break-words pr-14 leading-relaxed text-sm sm:text-base">
                {highlightSearch(message.content, query) || "no messages yet"}
              </p>

              {/* time */}
              <span className="pointer-events-none absolute bottom-2 right-3.5 flex items-center gap-1 text-[11px] text-indigo-100/75">
                {formattedTime(message.createdAt)}
                {message.read ? (
                  <CheckCheck size={13} className="text-blue-100" />
                ) : (
                  <Check size={13} className="text-blue-100/70" />
                )}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="relative flex w-full max-w-[75%] min-w-0 flex-col rounded-2xl py-3 pl-4 pr-3.5 sm:max-w-[30%] rounded-bl-md bg-slate-900/[0.05] text-slate-800 dark:bg-slate-800 dark:text-slate-100">

              {/* message text */}
              <p className="whitespace-pre-wrap break-words pr-14 leading-relaxed text-sm sm:text-base">
                {highlightSearch(message.content, query) || "no messages yet"}
              </p>

              {/* time */}
              <span className="pointer-events-none absolute bottom-2 right-3.5 flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                {formattedTime(message.createdAt)}
              </span>
            </div>

            {/* copy button */}
            <button
              className="shrink-0 rounded p-1 text-slate-400 opacity-0 transition-opacity duration-150 hover:!opacity-100 focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-60 disabled:pointer-events-none disabled:opacity-0 dark:text-slate-500"
              onClick={() => handleCopy(message?.content)}
              disabled={!message.content}
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Message;