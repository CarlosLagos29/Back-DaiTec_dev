import { Request, Response } from "express";
import { Generals } from "../../Models/Poducts/generals.model";
import { MakeUp } from "../../Models/Poducts/makeUp.model"; 
import { SkinCare } from "../../Models/Poducts/skinCares.model"; 

export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const generals = await Generals.find();
        const makeUp = await MakeUp.find();
        const skinCare = await SkinCare.find();

        const allProducts = [...generals, ...makeUp, ... skinCare]

        return res.status(200).json(allProducts);
    } catch (error) {
        return res.status(500).json(error.message); 
    }
}


export const discountedProducts = async (_req: Request, res: Response) => {
    try {
        const generalsWithDiscount = await Generals.find({ discount: { $exists: true, $ne: null } });
        const makeUpWithDiscount = await MakeUp.find({ discount: { $exists: true, $ne: null } });
        const skinCareWithDiscount = await SkinCare.find({ discount: { $exists: true, $ne: null } });

        const allProductsWithDiscount = [...generalsWithDiscount, ...makeUpWithDiscount, ...skinCareWithDiscount];
        
        return res.status(200).json(allProductsWithDiscount); // Devuelve los productos

    } catch (error) {
        return res.status(500).json(error.message); 
    }
}