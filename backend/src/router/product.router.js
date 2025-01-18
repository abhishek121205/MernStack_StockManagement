import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { addProduct, deleteProducts, getAllProducts, updateProducts } from "../controller/product.controller.js";

const productRouter = Router()

productRouter.post("/addProduct", verifyJwt, addProduct)
productRouter.get("/getAllProduct", verifyJwt, getAllProducts)
productRouter.delete("/deleteProduct/:id", verifyJwt, deleteProducts)
productRouter.patch("/updateProduct", verifyJwt, updateProducts)

export default productRouter 