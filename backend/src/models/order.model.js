import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    addedStockNumber: {
        required: true,
        type: Number
    },
    perProductPrice: {
        required: true,
        type: Number,
    },
}, {
    timestamps: true
})


export const Order = mongoose.model("Order", orderSchema);