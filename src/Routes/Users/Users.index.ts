import express from "express";
import profecionalsRoutes from "./profecionals.routes"


const router = express.Router();

router.use("/profecionals", profecionalsRoutes);

export default router;