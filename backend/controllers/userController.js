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
  const { name, email, password } = req.body.email;

  //find if user exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw newError("User already exists");
  }

  //mongoose middleware is used to encrpyt the password
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
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

//Update user profile - user updates their own profile
//PUT /api/users/profile
//private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//Get all users
//GET /api/users
//private/admin
const getUsers = asyncHandler(async (req, res) => {
  //empty object because we want to get all users
  const users = await User.find({});
  res.json();
});

//Delete user
//DELETE /api/users/:id
//private/admin
const deleteUser = asyncHandler(async (req, res) => {
  //empty object because we want to get all users
  //find by Id is a mongoose method
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.json();
});

//Get a user by ID
//GET /api/users/:id
//private/admin
const getUserById = asyncHandler(async (req, res) => {
  //empty object because we want to get all users
  const user = await (await User.findById(req.params.id)).select("-password");

  if (user) {
    res.json();
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


//Update user profile - admin updates any profile
//PUT /api/users/:id
//private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
 
    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});


export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
