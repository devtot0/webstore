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

//register a new user
//POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  //get data from the body
  const {name, email, password } = req.body.email;

  //find if user exists
  const userExists = await User.findOne({ email: email });

  if(userExists){
    res.status(400);
    throw newError('User already exists');
  }

  //mongoose middleware is used to encrpyt the password
  const user = await User.create({
    name,
    email,
    password
  });

  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
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

export { authUser, registerUser, getUserProfile };
