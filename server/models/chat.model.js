import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    chatName: { type: String, lowercase: true, trim: true },
    member: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Msg",
    },
    unreadMsgCount:{type:Number, default:0}
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export { Chat };
