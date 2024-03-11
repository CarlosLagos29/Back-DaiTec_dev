import express from "express";
import productsRoutes from "./Products/Products.index";
import servicesRoutes from "./Services/Services.index";
import usersRoutes from "./Users/Users.index";


const router = express.Router();

router.use("/products", productsRoutes);
router.use("/services", servicesRoutes);
router.use("/users", usersRoutes);

export default router;