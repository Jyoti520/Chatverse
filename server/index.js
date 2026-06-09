import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { router as userRoutes } from "./routes/user.routes.js";
import { router as chatRoutes } from "./routes/chat.routes.js";
import { router as msgRoutes } from "./routes/msg.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";


//load environment variables
dotenv.config();

//MongoDb connection
connectDB();

//initialise app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

//creating port for server
const PORT = process.env.PORT;

//connecting server to socket.io 
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

//check if server is running
app.get("/", (req, res) => {
  res.send("<h1>server working</h1>");
});


//Routes
app.use("/api/auth", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/msg", msgRoutes);

// Optional: rs error handling middleware
app.use((err, res) => {
  res.status(500).json({ message: "Internal Server Error" });
});

/***=======SOCKET_IO CONNECTION==============***/
const onlineUsers = new Map();
io.on("connection", (socket) => {

  socket.on("setup", (userId) => {
    socket.userId = userId;
    if (!userId) return socket.disconnect();
   
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);
    socket.join(userId);
    io.emit("users_online", Array.from(onlineUsers.keys()));
  });

  //join chat room
  socket.on("join_chat", (chatId, chatName = "sender") => {
    socket.join(chatId);
    //console.log(`socket joined room ${chatName}`);
  });

  socket.on("leave_chat", (chatId, chatName = "sender") => {
    socket.leave(chatId);
    //console.log(`socket leave room ${chatName}`);
  });

  //handle typing indicator
  socket.on("start_typing", ({ chatId, userId }) => {
    socket.to(chatId).emit("start_typing", {
      chatId,
      userId,
    });
  });
  //handle stop typing indicator
  socket.on("stop_typing", ({ chatId, userId }) => {
    socket.to(chatId).emit("stop_typing", { chatId, userId });
  });

  socket.on("new_message", (newMessage) => {
    //newMessage : {sender , content, chatId }
    if(!newMessage?.chatId?._id) return;
    
    try {
      const msgChatId = newMessage.chatId._id;
    
      socket.to(msgChatId).emit("message_received", newMessage);
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("mark_as_read", ({ chatId }) => {
    try {
      socket.to(chatId).emit("read_update", {
        chatId,
        userId : socket.userId
      });
      //console.log("Messages marked read by chat");
    } catch (error) {
      console.error("Mark as read error", error);
    }
  });
  //disconnect event
  socket.on("disconnect", () => {
    const userId = socket.userId;
    if (!userId) return;
    const sockets = onlineUsers.get(userId);
    if (!sockets) return;
    sockets.delete(socket.id);

    if (sockets.size === 0) {
      onlineUsers.delete(userId);
    }
    //update users status
    io.emit("users_online", Array.from(onlineUsers.keys()));
  });
});
//start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
