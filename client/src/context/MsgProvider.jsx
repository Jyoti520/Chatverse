import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth.js";
import { useChat } from "../hooks/useChat.js";
import { useSocket } from "../hooks/useSocket.js";
import {
  createMessage,
  fetchMessages,
  deleteMessages,
} from "../services/msgs.js";

export const MsgContext = createContext();

function MsgProvider({ children }) {
  const { loggeduser } = useAuth();
  const { socket } = useSocket();
  const { setChats, selectedChat } = useChat();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({});

  /*-----------------FETCHING MESSAGES----------------------- */
  useEffect(() => {
    if (!selectedChat?._id) return;

    const getMessages = async () => {
      setLoading(true);

      try {
        const data = await fetchMessages(selectedChat?._id);
        setMessages((pre) => ({
          ...pre,
          [selectedChat?._id]: data.allMessage ?? data,
        }));
      } catch (error) {
        toast.error(error.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedChat?._id]);

  useEffect(() => {
    if (!selectedChat || !socket) return;
    socket.emit("join_chat", selectedChat._id, selectedChat.chatName);
    return () => {
      socket.emit("leave_chat", selectedChat._id, selectedChat.chatName);
    };
  }, [socket, selectedChat]);

  /*-----------------SEND MESSAGE----------------------- */
  const sendMessage = async (text, chatId) => {
    if (!text.trim() || !chatId || !socket) return;
    //api call
    try {
      const data = await createMessage(text, chatId);
      const populatedMessage = {
        ...data.sendMsg,
        sender: { _id: loggeduser._id, username: loggeduser.username },
      };
      //emit new message
      socket.emit("new_message", data?.sendMsg);

      //add new message into messages state
      setMessages((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), data?.sendMsg],
      }));

      //update latestMessage in chats
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === chatId ? { ...chat, latestMessage: data.sendMsg } : chat,
        ),
      );
      return data;
    } catch (error) {
      toast.error(error.message || "Failed to send a message");
    }
  };

  /*----------------DELETE MESSAGES BY MONTH-WISE-----------*/
  const deleteMessagesByMonth = async (chatId, year, month) => {
    const selectedMonth = `${year}-${month}`;
    try {
      const data = await deleteMessages(chatId, year, month);
      toast.success(`Messages deleted`);
      setMessages((pre) => ({
        ...pre,
        [chatId]: (pre[chatId] || []).filter(
          (msg) => !msg.createdAt.startsWith(selectedMonth),
        ),
      }));
    } catch (error) {
      //console.error(error.message);
      toast.error(error.message || "Message deletion failed");
    }
  };

  /*-----------------SOCKET LISTENERS----------------------- */

  useEffect(() => {
    if (!socket) return;

    const handleLatestMessage = (newMessage) => {
      const chatId = newMessage.chatId._id;
      const isSender =
        String(newMessage.sender._id) === String(loggeduser?._id);
      const isChatOpen = chatId === selectedChat?._id;

      if (!isSender) {
        setMessages((prev) => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), newMessage],
        }));
      }

      //update sidebar latestMessage in chats
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === chatId
            ? {
                ...chat,
                latestMessage: newMessage,
                unreadMsgCount:
                  !isSender && !isChatOpen
                    ? (chat.unreadMsgCount || 0) + 1
                    : chat.unreadMsgCount,
              }
            : chat,
        ),
      );
    };

    socket.on("message_received", handleLatestMessage);
    return () => socket.off("message_received", handleLatestMessage);
  }, [loggeduser, socket, selectedChat]);

  return (
    <MsgContext.Provider
      value={{ sendMessage, deleteMessagesByMonth, messages, loading }}
    >
      {children}
    </MsgContext.Provider>
  );
};

export default MsgProvider;
