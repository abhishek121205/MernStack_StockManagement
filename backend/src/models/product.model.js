import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productName: {
        required: true,
        type: String
    },
    productPrice: {
        required: true,
        type: Number
    },
    productDescryption: {
        required: true,
        type: String,
        default:null
    },
    stockManagement: {
        required: true,
        type: Boolean,
        default:false
    },
    numberOfStock:{
        type: Number,
        default:0
    }
}, {
    timestamps: true
})


export const Product = mongoose.model("Product", productSchema);