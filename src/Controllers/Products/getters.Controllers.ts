import { Request, Response } from "express";

import Products from "../../Models/Poducts/products.model";
import PaginateOptionsInterface from "../../Types/paginateOptions.types";


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
            return getAllProducts(req, res, option);
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



const getAllProducts = async (req: Request, res: Response, option: PaginateOptionsInterface) => {
    try {

        const { source, skinType, crema, price, discount } = req.query;

        const filter: any = {};

        if (source) {
            filter.source = source;
        };

        if (skinType) {
            filter.skinType = skinType;
        };

        if (crema) {
            filter.crema = crema;
        };
        if (discount){
            filter.discount = { $gt: 0 };
        }
        
        const allProducts = await Products.paginate(filter, option);

        if(price){
            if(price === "high"){
                allProducts.docs.sort((a, b) => b.price - a.price);
            }
            else{
                allProducts.docs.sort((a, b) => a.price - b.price);
            }
        }
        else{
            allProducts.docs.sort((a, b) => b.discount - a.discount);
        };

        return res.status(200).json(allProducts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
