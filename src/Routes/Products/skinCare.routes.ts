import express from "express";
import { createSkinCares, updateSkinCares, getByIdSkinCares, getSkinCares, deleteSkinCares, cremaFilter } from "../../Controllers/Products/skinCares.controller";

const router = express.Router();

router.get("/", getSkinCares);
router.get("/filter", cremaFilter);
router.get("/:id", getByIdSkinCares);

router.post("/", createSkinCares);
router.put("/:id", updateSkinCares);
router.delete("/:id", deleteSkinCares);

export default router;