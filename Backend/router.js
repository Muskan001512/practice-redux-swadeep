import express from "express";
import userRoutes from "./routes/user.js";

const privateRoute = express.Router()

privateRoute.use("/users", userRoutes)

export default privateRoute;