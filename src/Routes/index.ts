import express from "express";
import productsRoutes from "./Products/Products.index.ts";
import servicesRoutes from "./Services/Services.index.ts";
import usersRoutes from "./Users/Users.index.ts";
import imagesRoutes from "./Cloudinary/cloudinary.routes.ts";
import promosRouter from "./Promos/Promos.index.ts";

const router = express.Router();

router.use("/products", productsRoutes);
router.use("/services", servicesRoutes);
router.use("/users", usersRoutes);
router.use("/images", imagesRoutes);
router.use("/promos", promosRouter);

export default router;
