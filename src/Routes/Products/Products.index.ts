import express from "express";
import {
    createProduct,
    deleteProducts,
    editProduct,
    getProductById,
} from "../../Controllers/Products/crud.controller.ts";
import { getProductByName } from "../../Controllers/Products/getters.Controllers.ts";
import { validateBody } from "../../Middlewares/validateBody.ts";
import { productCreateSchema, productUpdateSchema } from "../../Schemas/products.schema.ts";

const router = express.Router();

router.get("/", getProductByName);
router.get("/:id", getProductById);

router.post("/", validateBody(productCreateSchema), createProduct);
router.put("/:id", validateBody(productUpdateSchema), editProduct);
router.delete("/:id", deleteProducts);

export default router;
