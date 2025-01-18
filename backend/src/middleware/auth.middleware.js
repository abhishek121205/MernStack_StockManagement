import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
    const cookieUser = req.cookies?.accessedUser

    if (!cookieUser) throw new Error("you are not loged in")

    const user = await User.findById(cookieUser._id).select("-password")

    if (!user) throw new Error("Invalid access")

    req.user = user
    next()
})

export { verifyJwt }