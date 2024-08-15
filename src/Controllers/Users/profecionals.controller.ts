import { Request, Response } from "express";
import { Profecionals } from "../../Models/Users/profecinals.model";
import { deleteCloud } from "../../Helpers/cloudinary.helpers";


export const createProfecionals = async (req: Request, res: Response) => {
    try {
        const profecional = req.body

        const findedProfecional = await Profecionals.findOne({ name: profecional.name });

        if (findedProfecional) {
            return res.status(400).json({ message: `${profecional.name} ya esta guardado en la base de datos` });
        };

        const newProfecional = await new Profecionals(profecional).save();

        return res.status(200).json(newProfecional);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getProfecionals = async (_req: Request, res: Response) => {
    try {
        const allProfecional = await Profecionals.find();

        return res.status(200).json(allProfecional);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getByIdProfecionals = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findedProfecional = await Profecionals.findById(id);

        if (!findedProfecional) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        return res.status(200).json(findedProfecional);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const updateProfecionals = async (req: Request, res: Response) => {
    try {
        const updateData = req.body
        const { id } = req.params;

        const findedProfecional = await Profecionals.findById(id);
        if (!findedProfecional) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        const updatedProduct = await Profecionals.findByIdAndUpdate(id, updateData, { new: true })

        

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const deleteProfecionals = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findedProfecional = await Profecionals.findById(id);
        if (!findedProfecional) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        await deleteCloud(findedProfecional.img);
        
        await Profecionals.findByIdAndDelete(id);

        return res.status(200).json(`${findedProfecional.name} fue eliminado con exito`);
    } catch (error) {
        return res.status(500).json(error.message);
    }
} 