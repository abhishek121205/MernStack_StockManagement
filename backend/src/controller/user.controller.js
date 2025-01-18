import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signupUser = asyncHandler(async (req, res) => {
    const { password, userName } = req.body


    const fields = [password, userName];
    if (fields.some((val) => typeof val === "string" && val.trim() === "" || val == null)) {
        throw new Error("All Fields are required");
    }

    const userPayload = {
        userName: userName,
        password: password,
    }

    const createdUser = await User.create(userPayload)

    return res.status(201).json({
        success: true,
        message: "User created successfully",
    })
})

const loginUser = asyncHandler(async (req, res) => {
    const { password, userName } = req.body


    if ([password, userName].some((val) => val?.trim() === "")) {
        throw new Error("All fields are required")
    }

    const user = await User.findOne({ userName })
    if (!user) throw new Error("User not exists")

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) throw new Error("Incorrect Password")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .cookie("accessedUser", user, options)
        .status(200)
        .json({
            success: true,
            message: "Loged In successfully"
        })
})

const getCurrentUser = asyncHandler(async (req, res) => {  // includes req.user
    const userId = req?.user._id
    if (!userId) throw new Error("You are not logged in!")

    return res.status(200).json({
        success: true,
        message: "Current user fetched successfully",
        data: req.user
    })
})

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req?.user._id
    if (!userId) throw new Error("You are not logged in!")

    const options = {
        httpOnly: true,
        secure: false
    }

    return res.status(200)
        .clearCookie("accessedUser", options)
        .json({
            success: true,
            message: "Log out successfully"
        })

})

export { signupUser, loginUser, getCurrentUser,logoutUser }

