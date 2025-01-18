import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import userRouter from "./router/user.router.js"
import productRouter from "./router/product.router.js"
import orderRouter from "./router/order.router.js"

const app = express()
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PATCH, DELETE",
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ limit: "12kb" }))
app.use(express.static("public"))
app.use("/user", userRouter)
app.use("/products", productRouter)
app.use("/order",orderRouter)

export { app }