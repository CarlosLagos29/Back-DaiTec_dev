import { Request, Response } from "express";
import { Generals } from "../../Models/Poducts/generals.model";
import { MakeUp } from "../../Models/Poducts/makeUp.model";
import { SkinCare } from "../../Models/Poducts/skinCares.model";


export const getAllProducts = async (req: Request, res: Response) => {
    try {

        const page = parseInt(req.query.page as string) || 1;
        const limit = 15;

        const generalsCount = await Generals.countDocuments();
        const makeUpCount = await MakeUp.countDocuments();
        const skinCareCount = await SkinCare.countDocuments();

        const totalDocumentsCount =   makeUpCount + skinCareCount + generalsCount;
        const generalsLimit = Math.round((generalsCount / totalDocumentsCount) * limit);
        const makeUpLimit = Math.round((makeUpCount / totalDocumentsCount) * limit);
        const skinCareLimit = Math.round((skinCareCount / totalDocumentsCount) * limit);


        const generals = await Generals.paginate({}, { page, limit: generalsLimit });
        const makeUp = await MakeUp.paginate({}, { page, limit: makeUpLimit });
        const skinCare = await SkinCare.paginate({}, { page, limit: skinCareLimit });

        const allProducts = [ ...makeUp.docs, ...skinCare.docs, ...generals.docs]
        allProducts.sort((a, b) => b.discount - a.discount);

        const totalProductos = allProducts.length
        const totalPages = Math.ceil(totalDocumentsCount/limit);
        return res.status(200).json({allProducts, totalPages, totalDocumentsCount,totalProductos});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


        // allProducts.sort((a, b) => b.discount - a.discount);
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