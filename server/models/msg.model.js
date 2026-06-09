import mongoose from "mongoose";

//Message model for managing chat messages
const msgModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: {
      type: "String",
      trim: "true",
    },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },

    read: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

const Msg = mongoose.model("Msg", msgModel);
export { Msg };
