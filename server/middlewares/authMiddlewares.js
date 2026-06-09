import jwt from "jsonwebtoken";
//for restricting unlogged users for accessing data
//they need to login to access data
const protectRoute = async (req, res, next) => {
  try {
    const token =
      req.cookies.access_token || req.header("Authorization")?.replace("Bearer ","")
     //token from cookies
    if (!token) {
      //console.log("no token provided returning undefined");
      return res.status(401).json({ message: "Unauthorized - No Token Provided " });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decodedToken) {
     return res.status(401).json({ message: "Invalid token : User not found" });
    }
    req.decoded =decodedToken; //attach to req as it is a logged user document
    next(); //pass to controller
  } catch (error) {
     //console.log("user not found", error.message || error);
     return res.status(401).json({ message: "Unauthorised request" });
   
  }

  
};

export { protectRoute };
