import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const makeOrder = asyncHandler(async (req, res) => { //includes req.user._id
    const userId = req.user._id;
    if (!userId) throw new Error("You are not logged in")

    const { perProductPrice, addedStockNumber, productId } = req.body;

    const fields = [perProductPrice, addedStockNumber, productId];
    if (fields.some((val) => typeof val === "string" && val.trim() === "" || val == null)) {
        throw new Error("All Fields are required");
    }

    const isStockManageable = await Product.findById({ _id: productId })
    // console.log("isStockManageable", isStockManageable);

    if (!isStockManageable.stockManagement) throw new Error("Stock is not manageable in this product!")

    const orderPayload = {
        userId: userId,
        perProductPrice: perProductPrice,
        addedStockNumber: addedStockNumber,
        productId: productId
    }

    const createOrder = await Order.create(orderPayload)

    return res.status(201).json({
        message: "Order created successfully",
        success: true,
    })
})

const getAllOrder = asyncHandler(async (req, res) => { //includes req.user._id
    const userId = req.user._id;
    if (!userId) throw new Error("You are not logged in")

    const getAllOrder = await Order.aggregate([
        {
            $match: { userId: userId }
        },
        {
            $lookup: {
                from: "products",
                foreignField: "_id",
                localField: "productId",
                as: "productId",
                pipeline: [
                    {
                        $project: {
                            productName: 1,
                            productPrice: 1,
                            productDescryption: 1,
                            numberOfStock: 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                totalOrderAmount: { $multiply: ["$perProductPrice", "$addedStockNumber"] }
            }
        },
    ])

    return res.status(200).json({
        success: true,
        message: "All orders fetched successfully",
        data: getAllOrder
    })
})

export { makeOrder, getAllOrder }