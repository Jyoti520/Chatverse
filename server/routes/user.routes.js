import express from "express";
import {
  userRegister,
  login,
  getCurrentUser,
  getUsers,
  logout,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/authMiddlewares.js";
const router = express.Router();

//for registeration account

router.route("/signup").post(userRegister);
router.post("/login", login);
router.get("/me", protectRoute, getCurrentUser);
router.get("/", protectRoute, getUsers);
//router.put("/profile", authLayout, updateProfile);
router.post("/logout", logout);

export { router };
