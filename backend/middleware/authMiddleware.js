import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//used whenever we want to protect a route
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //if the request header is authorization and starts with bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  );

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    //it will turn into an array when bearer is zero index and token one index
    token = req.headers.authorization.split(" ")[1];
    //can get users' ID with decoded._id
    //getting a decoded token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //fetching user from a request
    //thanks to it we have access to user data in all our protected routes - the point of custom auth middleware
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const isAdmin = (req, res, next) => {
  if(req.user && req.user.isAdmin){
    next();
  } else {
    res.status(401);
    throw new Error('User has not administrator rights.')
  }
}

export { protect, isAdmin };
