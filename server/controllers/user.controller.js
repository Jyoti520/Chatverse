import { User } from "../models/user.model.js";
import { generateToken } from "../config/generateToken.js";
import bcrypt from "bcryptjs";

// user creation method
const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    //check if email or username is already exist in database
    const userExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) {
      return res.status(401).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //user creation
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      message: "User created successfully",
    });
  } catch (error) {
    //console.error(error.message || error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //check user is type password or email
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields!" });
  }
  try {
    //check if user is already exists or not
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    if (!user.password) {
      return res.status(401).json({ message: "password is undefined" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    //console.log(checkPassword ? "exist " : " not password", checkPassword);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    generateToken(res, user._id);

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      message: "Login Successfully",
    });
  } catch (error) {
    //console.error(error, "Login error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const { id } = req.decoded;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(401).json({ message: "User not logged in" });

    return res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    //console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.decoded.id },
  
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    //console.error(error.message || error);
    res.status(500).json({ message: "Unable to fetch users" });
  }
};


const logout = async (req, res) => {
  //clear cookies of users
  return res
    .status(200)
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    })
    .json({ message: "Logout Successfully" });
};

export { userRegister, login, getCurrentUser, getUsers, logout }; 
