import { Request, Response } from "express";
import { Generals } from "../../Models/Poducts/generals.model";
import { MakeUp } from "../../Models/Poducts/makeUp.model";
import { SkinCare } from "../../Models/Poducts/skinCares.model";

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const generals = await Generals.find();
        const makeUp = await MakeUp.find();
        const skinCare = await SkinCare.find();

        const allProducts = [...generals, ...makeUp, ...skinCare];
        allProducts.sort((a, b) => b.discount - a.discount);

        return res.status(200).json(allProducts);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


export const discountedProducts = async (_req: Request, res: Response) => {
    try {
        const generalsWithDiscount = await Generals.find({ discount: { $gt: 0 } });
        const makeUpWithDiscount = await MakeUp.find({ discount: { $gt: 0 } });
        const skinCareWithDiscount = await SkinCare.find({ discount: { $gt: 0 } });

        const allProductsWithDiscount = [...generalsWithDiscount, ...makeUpWithDiscount, ...skinCareWithDiscount];

        return res.status(200).json(allProductsWithDiscount);

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getProductByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        if(!name || typeof name !== 'string' || name.trim() === '') {
            
            return getAllProducts(req, res);
        };
        const generals = await Generals.find({ name: { $regex: new RegExp(name, 'i') } });
        const makeUp = await MakeUp.find({ name: { $regex: new RegExp(name, 'i') } });
        const skinCare = await SkinCare.find({ name: { $regex: new RegExp(name, 'i') } });

        const matchingProducts = [...generals, ...makeUp, ...skinCare];

        return res.status(200).json(matchingProducts);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};