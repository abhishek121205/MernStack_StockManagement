import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isAvailable = (currentStock, addedStock) => {
    let tempStoreAddedStock = addedStock;
    let stockDifference = addedStock - currentStock;
    if (stockDifference < 0) return false;
    let checkDifference = parseInt(stockDifference) + parseInt(currentStock);

    if (tempStoreAddedStock == checkDifference) {
        return true
    } else {
        return false
    }
}

const addProduct = asyncHandler(async (req, res) => { //includes req.user._id
    const userId = req.user._id;
    if (!userId) throw new Error("You need to be loged in for adding products")

    const { stockManagement, productDescryption, productPrice, productName, numberOfStock } = req.body

    const fields = [stockManagement, productDescryption, productPrice, productName, numberOfStock];
    if (fields.some((val) => typeof val === "string" && val.trim() === "" || val == null)) {
        throw new Error("All Fields are required");
    }

    if (productPrice < 0) throw new Error("Invalid price");
    if (numberOfStock < 0) throw new Error("Invalid quantity");

    const productPayload = {
        userId: userId,
        stockManagement: stockManagement,
        productDescryption: productDescryption,
        productPrice: productPrice,
        productName: productName,
        numberOfStock: numberOfStock,
        addedStock: numberOfStock
    }

    const productAdded = await Product.create(productPayload)

    return res.status(201).json({
        success: true,
        message: "Product added successfully",
    })
})

const getAllProducts = asyncHandler(async (req, res) => { //includes req.user._id
    const userId = req?.user._id

    if (!userId) throw new Error("You are not logged in!")

    const allProducts = await Product.find({})

    return res.status(200).json({
        message: "product data fetched successfully",
        success: true,
        data: allProducts
    })
})

const updateProducts = asyncHandler(async (req, res) => { //includes req.user._id
    const userId = req?.user._id
    if (!userId) throw new Error("You are not logged in!")

    const { _id, addedStock, ...resBody } = req.body

    if (resBody.productPrice < 0) throw new Error("Invalid price")
    if (resBody.numberOfStock < 0) throw new Error("Invalid quantity")

    const checkAvailabality = await Product.findOne({ _id: _id })

    const isStockAvailable = isAvailable(resBody.numberOfStock, checkAvailabality.addedStock)
    if (!isStockAvailable) throw new Error("Product is out of stock")

    const updateProduct = await Product.findByIdAndUpdate(_id, resBody)

    return res.status(200).json({
        success: true,
        message: "Product updated successfully"
    })
})

const deleteProducts = asyncHandler(async (req, res) => { //includes req.user._id
    const userId = req?.user._id
    if (!userId) throw new Error("You are not logged in!")

    const productId = req?.params.id
    const deletedProduct = await Product.findByIdAndDelete({ _id: productId })

    return res.status(200).json({
        message: "product deleted successfully",
        success: true,
    })
})

const checkStock = asyncHandler(async (req, res) => { //includes req.user._id
    const userId = req?.user._id
    if (!userId) throw new Error("You are not logged in!")

    const productId = req?.params.id

    const product = await Product.findOne({ _id: productId })

    return res.status(200).json({
        success: true,
        message: `Current stock:${product.numberOfStock} & Available stock:${product.addedStock}`
    })
})

export { addProduct, getAllProducts, updateProducts, deleteProducts, checkStock }