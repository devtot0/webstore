import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//authenticate users, send back token to access protected routes
//POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  //get data from the body
  const { email, password } = req.body.email;
  
  //find user whose email matches
  const user = await User.findOne({email: email});

  //checking if the user exists
  if(user && (await user.matchPassword(password))){

  }

});

export { authUser };
