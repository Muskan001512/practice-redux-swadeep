import express from "express";
import userRoutes from "./routes/user.js";
import venueRoutes from "./routes/venue.js"
import categoryRoutes from "./routes/category.js"
const privateRoute = express.Router()

privateRoute.use("/users", userRoutes)
privateRoute.use("/venues", venueRoutes)
privateRoute.use("/category", categoryRoutes)

export default privateRoute;