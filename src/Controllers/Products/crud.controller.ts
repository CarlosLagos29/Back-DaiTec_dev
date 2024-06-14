import { Request, Response } from "express";
import { ProductsInterface } from "../../Types/products.types";
import { deleteCloud } from "../../Helpers/cloudinary.helpers";

import Products from "../../Models/Poducts/products.model";
import PaginateOptionsInterface from "../../Types/paginateOptions.types";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product: ProductsInterface = req.body;

        const findedProduct = await Products.findOne({ name: product.name });

        if (findedProduct) {
            return res.status(400).json({ message: `${findedProduct.source} ${findedProduct.name} ya existe!` });
        };

        if (product.colors) {
            const totalAvaility = product.colors.reduce((acc, color) => acc + color.availity, 0);

            product.available = totalAvaility;
            product.colors.sort((colorA, colorB) => colorB.availity - colorA.availity);
        };
        const newProduct = await new Products(product).save();

        return res.status(200).json({ newProduct, message: `${product.name} fue creado!` });
    } catch (error) {
        return res.status(500).json(error.message);

    };
};

export const getProductByName = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    try {
        const { name } = req.query;
        const option: PaginateOptionsInterface = {
            page,
            limit
        };
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return
        };

        const findedProduct = await Products.paginate({ name: { $regex: new RegExp(name, 'i') } }, option);

        if (!findedProduct) {
            return res.status(404).json({ message: `No se encontró ningun peoducto '${name}'` })
        } else {
            return res.status(200).json(findedProduct);
        }
    } catch (error) {
        return res.status(500).json(error.message);

    }
};

export const getAllProducts = async (_req: Request, res: Response, option: PaginateOptionsInterface) => {
    try {
        const allProducts = await Products.paginate({}, option)
        return res.status(200).json(allProducts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const editProduct = async (req: Request, res: Response) => {
    try {
        const updateProduct = req.body;
        const { id } = req.params;

        const findedProduct = await Products.findById(id);

        if (!findedProduct) {
            return res.status(404).json({ message: `No se encontro el producto con ID: ${id} para actualizar` })
        };

        await Products.findByIdAndUpdate(id, updateProduct, { new: true });
        return res.status(200).json({ message: `El Producto ${findedProduct.name} fue actualizado con exito` });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProducts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const findedProduct = await Products.findById(id);
        if (!findedProduct) {
            return res.status(404).json({ message: `No se encontro el producto con ID: ${id} para eliminar` })
        };

        findedProduct.img.forEach(async (image) => {
            await deleteCloud(image)
        });
        
        await Products.findByIdAndDelete(id);
        return res.status(200).json({ message: `El Producto ${findedProduct.name} fue eliminado con exito` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
};