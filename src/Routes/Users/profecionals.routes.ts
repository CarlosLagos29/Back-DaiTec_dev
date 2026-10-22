import express from "express";
import {
    createProfecionals,
    deleteProfecionals,
    getByIdProfecionals,
    getProfecionals,
    updateProfecionals,
} from "../../Controllers/Users/profecionals.controller.ts";
import { validateBody } from "../../Middlewares/validateBody.ts";
import {
    profecionalCreateSchema,
    profecionalUpdateSchema,
} from "../../Schemas/profecionals.schema.ts";

const router = express.Router();

router.get("/", getProfecionals);
router.get("/:id", getByIdProfecionals);

router.post("/", validateBody(profecionalCreateSchema), createProfecionals);
router.put("/:id", validateBody(profecionalUpdateSchema), updateProfecionals);
router.delete("/:id", deleteProfecionals);

export default router;
