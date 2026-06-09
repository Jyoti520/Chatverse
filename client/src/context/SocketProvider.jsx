import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

export const SocketContext = createContext();

function SocketProvider({ children }) {
  const socketio = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const { loggeduser } = useAuth();
  //port
  const ENDPOINT = import.meta.env.VITE_API_URL;
  //handle socket
  useEffect(() => {
    if (!loggeduser) return;
    socketio.current = io(ENDPOINT, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketio.current.on("connect", () => {
      setSocketConnected(true);
      console.log("socket connected successfully");
    });
    socketio.current.on("disconnect", () => {
      setSocketConnected(false);
      console.log("socket disconnected");
    });
    return () => {
      socketio.current.disconnect();
      console.log("socket disconnnected");
    };
  }, [loggeduser]);

  useEffect(() => {
    if (!socketio.current || !loggeduser) return;

    socketio.current.emit("setup", loggeduser._id);
    console.log("user connected", loggeduser.username);

    return () => {
      socketio.current.off("setup");
      console.log("user disconnnected");
    };
  }, [loggeduser]);

  //socket for checking online users
  useEffect(() => {
    if (!socketio.current) return;
    const handleUserOnline = (users) => {
      setOnlineUsers(new Set(users));
    };

    socketio.current.on("users_online", handleUserOnline);

    return () => {
      socketio.current.off("users_online", handleUserOnline);
    };
  }, [socketio.current]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketio?.current,
        socketConnected,
        setSocketConnected,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
