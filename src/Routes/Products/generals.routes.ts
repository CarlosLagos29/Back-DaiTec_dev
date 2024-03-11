import express from "express";
import { createGenerals, updateGenerals, getByIdGenerals, getGenerals, deleteGenerals } from "../../Controllers/Products/generals.controller";

const router = express.Router();

router.get("/", getGenerals);
router.get("/:id", getByIdGenerals);

router.post("/", createGenerals);
router.put("/:id", updateGenerals);
router.delete("/:id", deleteGenerals);

export default router;