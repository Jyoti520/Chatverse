import { Msg } from "../models/msg.model.js";
import { Chat } from "../models/chat.model.js";

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const { id: currentId } = req.decoded;
  try {
    const newMessage = await Msg.create({
      sender: currentId,
      content,
      chatId, //chatId
      read: true, //sender has seen it
    });

    const populatedMsg = await Msg.findById(newMessage._id)
      .populate("sender", "username email")
      .populate({
        path: "chatId",
        select: "member latestMessage",
        model: "Chat",
        populate: {
          path: "member",
          select: "username email",
          model: "User",
        },
      });

    if (!populatedMsg) {
      return res.status(404).json({ message: "Message Not Found!" });
    }
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    const receiverId = chat.member.find(
      (memberId) => memberId.toString() !== currentId,
    );

    if (receiverId) {
      chat.unreadMsgCount += 1;
      await chat.save();
    }
    //update chat with latest message
    await Chat.findByIdAndUpdate(
      chatId, //chatId
      {
        latestMessage: newMessage._id,
      },
      {
        new: true,
      },
    );

    const updatedMessage = await Chat.findById(chatId)
      .populate("member", "username email")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "username email" },
      });

    res.status(201).json({
      message: "Message sent successfully",
      sendMsg: populatedMsg,
      updatedMessage,
    });
  } catch (error) {
    //console.error(error, "Message send failed" || error.message);
    res.status(500).json({ message: "Internal Connection Error" });
  }
};

const accessMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const { id: currentUserId } = req.decoded;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }
    const isMember = chat.member.some(
      (member) => member.toString() === currentUserId,
    );

    if (!isMember) {
      return res.status(403).json({ message: "Chat Access Denied" });
    }

    const message = await Msg.find({ chatId })
      .populate("sender", "username email")
      .populate({
        path: "chatId", //chat reference
        select: "member latestMessage",
        populate: {
          path: "member",
          select: "username email",
        },
      });
   
    res
      .status(200)
      .json({ message: "Messages fetch Successfully!", allMessage: message });
  } catch (error) {
    //console.error(error || error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteMessages = async (req, res) => {
  const { chatId, year, month } = req.body;

  if (!chatId || !year || !month) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (isNaN(year) || isNaN(month)) {
    return res.status(400).json({ message: "Invalid fields" });
  }
  const numericMonth = Number(month);
  const numericYear = Number(year);

  if (numericMonth < 1 || numericMonth > 12) {
    return res.status(400).json({ message: "Invalid month" });
  }

  try {
    const { id: currentId } = req.decoded;
    const startDate = new Date(numericYear, numericMonth - 1, 1);
    const endDate = new Date(numericYear, numericMonth, 1);
    const message = await Msg.find({ chatId });

    const result = await Msg.deleteMany({
      chatId: chatId,
      sender: currentId,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    return res.status(200).json({
      message: "Messages deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Connection Error" });
  }
};

export { sendMessage, accessMessage, deleteMessages };
