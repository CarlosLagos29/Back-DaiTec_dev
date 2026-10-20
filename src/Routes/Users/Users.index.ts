import express from "express";
import profecionalsRoutes from "./profecionals.routes.ts";

const router = express.Router();

router.use("/profecionals", profecionalsRoutes);

export default router;
