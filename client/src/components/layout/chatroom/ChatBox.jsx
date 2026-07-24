import { useEffect, useMemo, useRef, useState } from "react";
import Loader from "../../common/Loader";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { useChat } from "../../../hooks/useChat";
import { useSocket } from "../../../hooks/useSocket";
import { useAuth } from "../../../hooks/useAuth";
import { useMessage } from "../../../hooks/useMessage";
import { filterMessages } from "../../../utils/search";

const ChatBox = ({ activePage, goToBack }) => {
  const { socket } = useSocket();
  const { loggeduser } = useAuth();
  const { selectedChat } = useChat();
  const { messages, loading } = useMessage();
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);

  const chatMessages = selectedChat?._id
    ? messages[selectedChat._id] || []
    : [];

  const filteredMessages = useMemo(() => {
    return filterMessages(chatMessages, search);
  }, [chatMessages, search]);

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
        className={`w-full h-full flex-col justify-center items-center gap-2 text-center dark:bg-slate-900 ${
          activePage === "chatbox" ? "flex" : "hidden md:flex"
        }`}
      >
        <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
          Select a chat to start the conversation
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 h-full min-w-0 flex-col bg-white dark:bg-slate-900 transition-all duration-300 ${
        activePage === "chatbox" ? "flex" : "hidden md:flex"
      }`}
    >
      <ChatHeader goToBack={goToBack} search={search} setSearch={setSearch} />

      <div className="px-4 py-5 flex-1 overflow-y-auto min-h-0">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader textColor="text-indigo-500" />
          </div>
        ) : (
          <ChatMessage messages={filteredMessages} search={search} />
        )}
      </div>

      <div className="min-h-[72px] shrink-0">
        <ChatForm typing={typing} handleTyping={handleTyping} />
      </div>
    </div>
  );
};

export default ChatBox;