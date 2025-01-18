import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    userName: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password) {    
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);