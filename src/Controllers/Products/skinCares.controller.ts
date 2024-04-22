import { Request, Response } from "express";
import { SkinCare } from "../../Models/Poducts/skinCares.model"; 

export const createSkinCares = async (req: Request, res: Response) => {
    try {
        const skinCare = req.body

        const findedSkinCare = await SkinCare.findOne({ name: skinCare.name });

        if (findedSkinCare) {
            return res.status(400).json({ message: `${skinCare.name} ya esta guardado en la base de datos` });
        };

        const newSkinCare = await new SkinCare(skinCare).save()

        return res.status(200).json(newSkinCare);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getSkinCares = async (req: Request, res: Response) => {
     const page = parseInt(req.query.page as string) || 1;
     const limit = parseInt(req.query.limit as string) || 10;
    try {
        const options = {
            page,
            limit
        }
        const allSkinCares = await SkinCare.paginate({}, options);
        allSkinCares.docs.sort((a, b) => b.discount - a.discount);

        return res.status(200).json(allSkinCares);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const getByIdSkinCares = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findedGeneral = await SkinCare.findById(id);

        if (!findedGeneral) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        return res.status(200).json(findedGeneral);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const updateSkinCares = async (req: Request, res: Response) => {
    try {
        const updateData = req.body
        const { id } = req.params;

        const findedSkinCare = await SkinCare.findById(id);
        if (!findedSkinCare) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        const updatedProduct = await SkinCare.findByIdAndUpdate(id, updateData, { new: true })

        console.log(`${findedSkinCare.name} fue actualizado con exito`)

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const deleteSkinCares = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findedSkinCare = await SkinCare.findById(id);
        if (!findedSkinCare) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        await SkinCare.findByIdAndDelete(id);

        return res.status(200).json(`${findedSkinCare.name} fue eliminado con exito`);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}; 

export const cremaFilter = async (_req: Request, res: Response) =>{
    try {
        const cremas = await SkinCare.find().select('-_id crema');
        let filter = new Set();
        
        cremas.forEach(c => {
            filter.add(c.crema)
        });

        return res.status(200).json([...filter]);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}