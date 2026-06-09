import { useState, useEffect, useContext, useCallback } from "react";
import { createContext } from "react";
import { accessChat, fetchChats, markRead } from "../services/chats";
import { useAuth } from "../hooks/useAuth";
import { useSocket } from "../hooks/useSocket";

export const ChatContext = createContext();

function ChatProvider({ children }) {
  const { loggeduser } = useAuth();
  const { socket } = useSocket();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatLoad, setChatLoad] = useState(false);
  const [chatErr, setChatErr] = useState(null);
  const [error, setError] = useState(null);

  //create chat
  const createChat = async (userId) => {
    if (!userId) return;

    const existChat = chats.find((c) =>
      c.member?.some((m) => m._id === userId),
    );
    //check existing chat
    if (existChat) {
      setSelectedChat(existChat);
      return;
    }
    setChatLoad(true);
    setChatErr(null);
    try {
      // create chats
      const data = await accessChat(userId);
      const chat = data.chat || data;

      const existChats = (prev) => {
        const alreadyExist = prev.some((c) => c._id === chat._id);
        return alreadyExist ? prev : [chat, ...prev];
      };
      setChats(existChats);
      setOriginalData(existChats);
      //set new chat
      setSelectedChat(chat);
    } catch (error) {
      setChatErr("Failed to create chat");
    } finally {
      setChatLoad(false);
    }
  };

  const getChats = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchChats();

      // sorted chats
      const recentChats = [...data.allChats].sort((a, b) => {
        const A = a.latestMessage?.createdAt
          ? new Date(a.latestMessage.createdAt).getTime()
          : 0;
        const B = b.latestMessage?.createdAt
          ? new Date(b.latestMessage.createdAt).getTime()
          : 0;
        return B - A;
      });

      setChats(recentChats);
      setOriginalData(recentChats);

      if (recentChats.length > 0) {
        const sortChats = recentChats[0];
        setSelectedChat(sortChats);
      }
    } catch (error) {
      setError(error.message || "chats not Found");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectChat = async (chat) => {
    if (!chat) return;

    //switch chat
    setSelectedChat(chat);

    if (chat.unreadMsgCount <= 0) return;
    //call API to mark read
    try {
      await markRead(chat._id);

      if (socket) {
        //handle mark chat as read event
        socket.emit("mark_as_read", {
          chatId: chat._id,
        });
      }

      //reset unread badge count
      const resetCount = (pre) =>
        pre.map((c) => (c._id === chat._id ? { ...c, unreadMsgCount: 0 } : c));

      setChats(resetCount);
      setOriginalData(resetCount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChats = (query) => {
    if (!query.trim()) {
      setChats(originalData);
      return;
    }
    const filteredChats = originalData.filter((chat) => {
      const sender = chat.member.find((m) => m._id !== loggeduser._id);
      if (!sender) return false;
      return sender.username.toLowerCase().includes(query.toLowerCase());
    });
    setChats(filteredChats);
  };

  //socket listener for read updates
  useEffect(() => {
    if (!socket) return;
    const handleReadUpdate = ({ chatId, userId }) => {
      const updateReadChats = (chatList) => {
        return chatList.map((chat) => {
          if (chat._id !== chatId) return chat;

          const isOwnMsg =
            String(chat.latestMessage?.sender?._id) === String(userId);

          return {
            ...chat,
            unreadMsgCount: 0,
            latestMessage: isOwnMsg
              ? { ...chat.latestMessage, read: true }
              : chat.latestMessage,
          };
        });
      };
      //reset unread badge count
      setChats((prev) => updateReadChats(prev));
      setOriginalData((prev) => updateReadChats(prev));
    };
    socket.on("read_update", handleReadUpdate);
    return () => socket.off("read_update", handleReadUpdate);
  }, [socket]);

  useEffect(() => {
    if (!loggeduser) return;
    getChats();
  }, [loggeduser, getChats]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        createChat,
        getChats,
        handleSelectChat,
        handleSearchChats,
        loading,
        error,
        chatLoad,
        chatErr,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
