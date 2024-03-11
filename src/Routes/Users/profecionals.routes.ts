import express from "express";
import { createProfecionals, deleteProfecionals, getByIdProfecionals, getProfecionals, updateProfecionals } from "../../Controllers/Users/profecionals.controller";

const router = express.Router();

router.get("/", getProfecionals)
router.get("/:id", getByIdProfecionals)

router.post("/", createProfecionals)
router.put("/:id", updateProfecionals)
router.delete("/:id", deleteProfecionals)

export default router;
