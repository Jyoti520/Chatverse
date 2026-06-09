import jwt from "jsonwebtoken";

export const generateToken = (res, userid) => {
  const expireInMs=  7 * 24 * 60 * 60 * 1000;
  //here id is key name of usertoken id
  const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, {
    expiresIn: expireInMs / 1000,
  });
  const cookieOptions = { 
    httpOnly: true,
    secure: process.env.NODE_ENV==="production",
    maxAge: expireInMs,
    sameSite: process.env.NODE_ENV==="production" ? "None":"Lax"
  };

  return res.cookie("access_token", token, cookieOptions);
};
