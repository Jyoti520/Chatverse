import express from "express";
const router = express.Router();
import { protectRoute } from "../middlewares/authMiddlewares.js";
import {
  sendMessage,
  accessMessage,
  deleteMessages,
} from "../controllers/msg.controller.js";

router.post("/send", protectRoute, sendMessage);
router.get("/:chatId", protectRoute, accessMessage);
router.delete("/delete-month", protectRoute, deleteMessages);

export { router };
