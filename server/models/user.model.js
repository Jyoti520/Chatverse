import mongoose from "mongoose";

//User model for managing  different users

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true, lowercase: true, sparse:true },
    password: { type: String , required : true, select:false},
  },
  {
    timestamps: true, //when users created at and updated at
  },
);

const User = mongoose.model("User", userSchema);
export { User };
