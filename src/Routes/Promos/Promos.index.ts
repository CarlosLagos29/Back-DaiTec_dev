import express from "express";
import { createPromo, deleteProm, getPromos } from "../../Controllers/Promos/promos.contoller.ts";

const router = express.Router();

router.get("/", getPromos);
router.post("/", createPromo);

router.delete("/:id", deleteProm);

export default router;
