import express from "express";
import generalsRoutes from "./generals.routes";
import makeUpRoutes from "./makeUp.routes";
import skinCareRoutes from "./skinCare.routes"
import { getAllProducts, discountedProducts, getProductByName } from "../../Controllers/Products/allProducts.controller";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/search", getProductByName);
router.get("/discounted", discountedProducts);
router.use("/generals", generalsRoutes);
router.use("/makeups", makeUpRoutes);
router.use("/skincares", skinCareRoutes);

export default router;

