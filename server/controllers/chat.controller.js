import mongoose from "mongoose";
import { Chat } from "../models/chat.model.js";
import { Msg } from "../models/msg.model.js";

//get chatname
const getChatName = (chat, currentId) => {
  const isReceiver = chat.member.find(
    (m) => m._id.toString() !== currentId.toString(),
  );
  return isReceiver ? isReceiver.username : "Deleted user";
};

const accessChat = async function (req, res) {
  //other user's id
  const { userId } = req.body;

  //get logged userid from auth
  const { id: currentId } = req.decoded;

  if (!userId) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  if(!mongoose.Types.ObjectId.isValid(userId)){
     return res.status(400).json({ message: "Invalid user" });
  }
  if (String(userId) === String(currentId)) {
    return res.status(403).json({ message: "self chat is restricted" });
  }

  try {
    const userObjId = new mongoose.Types.ObjectId(userId);
    const currentObjId = new mongoose.Types.ObjectId(currentId);
    //  Check if the chat already exists between the two users
    let existChat = await Chat.findOne({
      member: { $all: [currentObjId, userObjId] },
    })
      .populate("member", "username email")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "username email" },
      });
      
    //set chatName for existing chat and If a chat exists, populate info in latestMessage
    if (existChat) {
      existChat.chatName = getChatName(existChat, currentId);
      return res
        .status(200)
        .json({ chat: existChat, message: "chat already exists" });
    }

    // Create a new chat if it doesn't exist
    const newChat = await Chat.create({
      member: [currentObjId, userObjId],
    });

    // Create and return the newly populated chat
    const populatedChat = await Chat.findById(newChat._id)
      .populate("member", "username email")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "username email" },
      });

    //get chatname for new created chat
    populatedChat.chatName = getChatName(populatedChat, currentId);
    
    return res.status(201).json({
      chat: populatedChat,
      message: "Chat Created successfully",
    });
    
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchChats = async (req, res) => {
  try {
    const { id: currentId } = req.decoded;
    const chatExist = await Chat.find({
      member: currentId,
    })
      .populate("member", "username email")

      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "username email",
        },
      })
      .sort({ updatedAt: -1 });

    if (chatExist.length === 0) {
      return res
        .status(200)
        .json({ allChats: [], message: "No Conservation Yet" });
    }
    const updatedChat = chatExist.map((chat) => {
      chat = chat.toObject();
      chat.chatName = getChatName(chat, currentId);
      return chat;
    });

    res
      .status(200)
      .json({ allChats: updatedChat, message: "Chats fetched Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const readChat = async (req, res) => {
  const { chatId } = req.params;
   
  if(!mongoose.Types.ObjectId.isValid(chatId)){
     return res.status(400).json({ message: "Invalid user" });
  }
  //get logged userid from auth
  try {
    const { id: currentId } = req.decoded;
    await Msg.updateMany(
      { chatId, sender: { $ne: currentId }, read: false },
      { $set: { read: true } },
    );
    //reset unread message to 0
    await Chat.findByIdAndUpdate(chatId, { unreadMsgCount: 0 });
    res.status(200).json({ message: "message marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark messages as read" });
  }
};

export { accessChat, fetchChats, readChat };
