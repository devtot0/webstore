import express from "express";
const router = express.Router();
import { authUser } from '../controllers/userController.js';

//POST request to user's login
router.post('/login', authUser);



export default router;
