import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, signupUser } from "../controller/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const userRouter = Router()

userRouter.post("/signUp", signupUser)
userRouter.post("/login", loginUser)
userRouter.get("/getCurrentUser", verifyJwt, getCurrentUser)
userRouter.get("/logout", verifyJwt, logoutUser)

export default userRouter 