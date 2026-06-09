import { useState } from "react";
import { SendHorizontal,  } from "lucide-react";
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
      //console.log(data.sendMsg ? "Message send" : "Failed to send a message");
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
              <span className="absolute -top-4 p-2 left-8 text-xs text-emerald-700 dark:text-emerald-400 z-10 transition-all ease-in-out font-medium">
                typing<span className="animate-bounce size-2">...</span>
              </span>
              
            )}
      <form
        className="w-full px-3 py-2 flex justify-center gap-3 items-center bg-white/90 dark:bg-slate-900/40 border-2 border-white/30 dark:border-white/10 rounded-2xl backdrop-blur-2xl shadow-xl shadow-indigo-500/30 dark:shadow-none focus-within:border-indigo-300 dark:focus-within:border-indigo-500/30
        focus-within:shadow-indigo-500/30 transition-all duration-300"
        onSubmit={handleNewMessage}
      >  
       
        <Input
          className="flex-1 min-w-0 px-2 py-3 text-[15px] bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium border-none"
          placeholder="Type your message..."
          onChange={handleChange}
          value={newMessage}
          required
        />
        <button
          className={`flex h-11 w-11 cursor-pointer justify-center items-center rounded-2xl transition-all duration-300 ${
            newMessage.trim()
              ? "bg-gradient-to-br from-indigo-500 to-blue-500 text-white hover:scale-[1.03] active:scale-95 shadow-md shadow-indigo-500/20"
              : "bg-slate-100 text-slate-400 dark:text-slate-500 dark:bg-white/[0.04] cursor-not-allowed"
          }`}
          type="submit"
          disabled={!newMessage.trim()}
        >
            <SendHorizontal
              size={20}
            />
        </button>
      </form>
    </div>
  );
}

export default ChatForm;
