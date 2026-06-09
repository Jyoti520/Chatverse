import express from "express";
import { protectRoute } from "../middlewares/authMiddlewares.js";
import {
  accessChat,
  fetchChats,
  readChat,
} from "../controllers/chat.controller.js";
const router = express.Router();
router.post("/access", protectRoute, accessChat);
router.get("/", protectRoute, fetchChats);
router.put("/read/:chatId", protectRoute, readChat);
export { router };
