// src/routes/userRouter.js (or .ts)\
import { Router } from 'express';
import { get } from 'mongoose';
import { getProfileOfUser } from '../controllers/userController.js';
import { authMiddleWare } from '../middlewares/authMiddleware.js';


const userRouter = Router();

userRouter.get('/me', authMiddleWare, getProfileOfUser);

export default userRouter;