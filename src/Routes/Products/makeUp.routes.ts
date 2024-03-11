import express from "express";
import { createMakeUps, updateMakeUps, deleteMakeUps, getByIdMakeUps, getMakeUps } from "../../Controllers/Products/makeUp.controller";

const router = express.Router();

router.get("/", getMakeUps)
router.get("/:id", getByIdMakeUps)

router.post("/", createMakeUps)
router.put("/:id", updateMakeUps)
router.delete("/:id", deleteMakeUps)

export default router;