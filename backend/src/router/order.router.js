import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getAllOrder, makeOrder } from "../controller/order.controller.js";

const orderRouter = Router()

orderRouter.post("/makeOrder", verifyJwt, makeOrder)
orderRouter.get("/getAllOrder", verifyJwt, getAllOrder)

export default orderRouter 