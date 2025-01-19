import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { addProduct, checkStock, deleteProducts, getAllProducts, updateProducts } from "../controller/product.controller.js";

const productRouter = Router()

productRouter.post("/addProduct", verifyJwt, addProduct)
productRouter.get("/getAllProduct", verifyJwt, getAllProducts)
productRouter.delete("/deleteProduct/:id", verifyJwt, deleteProducts)
productRouter.patch("/updateProduct", verifyJwt, updateProducts)
productRouter.get("/getStock/:id", verifyJwt, checkStock)

export default productRouter 