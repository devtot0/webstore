import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//authenticate users, send back token to access protected routes
//POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  //get data from the body
  const { email, password } = req.body.email;

  //find user whose email matches
  const user = await User.findOne({ email: email });

  //checking if the user exists
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    //if user is not found or password doesn't match
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//Get user profile
//GET /api/users/profile
//private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

export { authUser, getUserProfile };
