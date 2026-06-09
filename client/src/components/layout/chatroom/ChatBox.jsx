import { useEffect, useRef, useState } from "react";
import Loader from "../../common/Loader";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { useChat } from "../../../hooks/useChat";
import { useSocket } from "../../../hooks/useSocket";
import { useAuth } from "../../../hooks/useAuth";
import { useMessage } from "../../../hooks/useMessage";


const ChatBox = ({ activePage, goToBack }) => {
  const { socket } = useSocket();
  const { loggeduser } = useAuth();
  const { selectedChat } = useChat();
  const { messages, loading } = useMessage();
  const [typing, setTyping] = useState(false);

  const chatMessages = selectedChat?._id
    ? messages[selectedChat._id] || []
    : [];

  const typingTimeout = useRef(null);
  // typing event handling
  const handleTyping = () => {
    if (!socket || !selectedChat) return;
    socket.emit("start_typing", {
      chatId: selectedChat._id,
      userId: loggeduser._id,
    });
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stop_typing", {
        chatId: selectedChat._id,
        userId: loggeduser._id,
      });
    }, 1200);
  };
  //handle socket event for typing
  useEffect(() => {
    if (!socket || !selectedChat?._id) return;

    const onTyping = ({ chatId, userId }) => {
      if (userId === loggeduser._id) return;
      if (chatId === selectedChat._id) setTyping(true);
    };
    const stopTyping = ({ chatId, userId }) => {
      if (userId === loggeduser._id) return;
      if (chatId === selectedChat._id) setTyping(false);
    };

    socket.on("start_typing", onTyping);
    socket.on("stop_typing", stopTyping);

    return () => {
      socket.off("start_typing", onTyping);
      socket.off("stop_typing", stopTyping);
    };
  }, [socket, selectedChat?._id, loggeduser]);

  if (!selectedChat?._id) {
    return (
      <div
        className={`w-full flex justify-center items-center text-slate-700 text-xl h-screen text-center dark:text-slate-200 bg-gradient-to-br from-indigo-500/15 via-blue-500/15 to-cyan-400/20 dark:from-slate-950 dark:via-blue-950/40 dark:to-slate-900 ${activePage === "chatbox" ? "block" : "hidden md:flex"}`}
      >
        Select a chat to start conservation
      </div>
    );
  }

  return (
    <div
      className={`h-full w-full flex flex-col bg-gradient-to-br from-indigo-500/15 via-blue-500/15 to-cyan-400/2 dark:from-slate-950 dark:via-blue-950/40 dark:to-slate-900 transition-all duration-300 ${
        activePage === "chatbox" ? "flex" : "hidden md:flex"
      }`}
    >
      <ChatHeader goToBack={goToBack} />

      <div className="px-4 py-5 flex-1 overflow-y-auto min-h-0">
        {loading ? (
          <Loader textColor={"text-indigo-500"} />
        ) : (
          <ChatMessage messages={chatMessages} />
        )}
      </div>

      <div className="min-h-[72px] shrink-0">
        <ChatForm typing={typing} handleTyping={handleTyping} />
      </div>
    </div>
  );
};

export default ChatBox;
