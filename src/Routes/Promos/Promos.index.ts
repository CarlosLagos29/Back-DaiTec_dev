import express from "express";
import { createPromo, deleteProm, getPromos } from "../../Controllers/Promos/promos.contoller.ts";
import { validateBody } from "../../Middlewares/validateBody.ts";
import { promoCreateSchema } from "../../Schemas/promos.schema.ts";

const router = express.Router();

router.get("/", getPromos);
router.post("/", validateBody(promoCreateSchema), createPromo);

router.delete("/:id", deleteProm);

export default router;
