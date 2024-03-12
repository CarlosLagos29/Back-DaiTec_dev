import express from "express";
import generalsRoutes from "./generals.routes";
import makeUpRoutes from "./makeUp.routes";
import skinCareRoutes from "./skinCare.routes"
import { getAllProducts } from "../../Controllers/Products/allProducts.controller";

const router = express.Router();

router.get("/", getAllProducts);
router.use("/generals", generalsRoutes);
router.use("/makeups", makeUpRoutes);
router.use("/skincares", skinCareRoutes);

export default router;

