import express from "express";
import { createProduct, deleteProducts,editProduct, getProductById } from "../../Controllers/Products/crud.controller";
import { getProductByName } from "../../Controllers/Products/getters.Controllers";

const router = express.Router();

router.get('/', getProductByName);
router.get('/:id', getProductById);

router.post('/', createProduct);
router.put('/:id', editProduct);
router.delete('/:id', deleteProducts);


export default router;

