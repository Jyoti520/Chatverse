import { useState } from "react";
import { SendHorizonalIcon, SendHorizontal } from "lucide-react";
import Input from "../../common/Input";
import { toast } from "react-toastify";
import { useChat } from "../../../hooks/useChat";
import { useMessage } from "../../../hooks/useMessage";

function ChatForm({ typing, handleTyping }) {
  const { selectedChat } = useChat();
  const { sendMessage } = useMessage();
  const [newMessage, setNewMessage] = useState("");

  //send message response
  const handleNewMessage = async (e) => {
    e.preventDefault();
    // console.log("message send");
    if (!newMessage) return;
    try {
      await sendMessage(newMessage, selectedChat._id);
      
    } catch (error) {
      console.error("Failed to send message");
    }
    setNewMessage("");
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    handleTyping();
  };
  return (
    <div className="relative w-full px-4 py-3">
      {typing && (
        <div className="absolute -top-7 left-8 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-emerald-600 shadow-sm shadow-slate-900/5 dark:bg-slate-800 dark:text-emerald-400 dark:shadow-black/20">
          Typing
          <span className="flex gap-0.5">
            <span className="h-1 w-1 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.2s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.1s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-emerald-500" />
          </span>
        </div>
      )}
      <form
        className="flex w-full items-center gap-2 px-4 py-2 shadow-sm shadow-slate-900/5 transition-all duration-200 focus-within:border-indigo-300 focus-within:shadow-md focus-within:shadow-indigo-500/10  dark:shadow-black/20 dark:focus-within:border-indigo-500/40"
        onSubmit={handleNewMessage}
      >
        <Input
          className="flex-1 min-w-0 px-6 py-3 text-base bg-slate-200 dark:bg-white/[0.04] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/60 dark:focus:ring-indigo-500/30  transition-all font-medium border-none rounded-2xl backdrop-blur-lg"
          placeholder="Type your message..."
          onChange={handleChange}
          value={newMessage}
          required
          autofocus
        />
        <button
          className={`flex h-11 w-11 shrink-0 cursor-pointer justify-center items-center rounded-xl transition-all duration-200 ${
            newMessage.trim()
              ? "bg-gradient-to-br from-indigo-600 to-blue-500 text-white active:scale-95 shadow-sm hover:shadow-indigo-500/30"
              : "bg-slate-200 text-slate-400 dark:text-slate-600 dark:bg-white/[0.04] cursor-not-allowed"
          }`}
          type="submit"
          disabled={!newMessage.trim()}
        >
          <SendHorizonalIcon size={17} />
        </button>
      </form>
    </div>
  );
}

export default ChatForm;
