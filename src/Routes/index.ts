import express from "express";
import productsRoutes from "./Products/Products.index";
import servicesRoutes from "./Services/Services.index";
import usersRoutes from "./Users/Users.index";
import imagesRoutes from "./Cloudinary/cloudinary.routes"


const router = express.Router();

router.use("/products", productsRoutes);
router.use("/services", servicesRoutes);
router.use("/users", usersRoutes);
router.use("/images", imagesRoutes );
export default router;