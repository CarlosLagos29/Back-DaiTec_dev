import { Request, Response } from "express";
import { MakeUp } from "../../Models/Poducts/makeUp.model"; 

export const createMakeUps = async (req: Request, res: Response) => {
    try {
        const makeUp = req.body

        const findedMakeUp = await MakeUp.findOne({ name: makeUp.name });

        if (findedMakeUp) {
            return res.status(400).json({ message: `${makeUp.name} ya esta guardado en la base de datos` });
        };

        const newMakeUp = await new MakeUp(makeUp).save()

        return res.status(200).json(newMakeUp);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getMakeUps = async (_req: Request, res: Response) => {
    try {
        const allMakeUps = await MakeUp.find()

        return res.status(200).json(allMakeUps);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getByIdMakeUps = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findedMakeUp = await MakeUp.findById(id);

        if (!findedMakeUp) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        return res.status(200).json(findedMakeUp);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const updateMakeUps = async (req: Request, res: Response) => {
    try {
        const updateData = req.body
        const { id } = req.params;

        const findedMakeUp = await MakeUp.findById(id);
        if (!findedMakeUp) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        const updatedProduct = await MakeUp.findByIdAndUpdate(id, updateData, { new: true })

        console.log(`${findedMakeUp.name} fue actualizado con exito`)

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const deleteMakeUps = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findedMakeUp = await MakeUp.findById(id);
        if (!findedMakeUp) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        await MakeUp.findByIdAndDelete(id);

        return res.status(200).json(`${findedMakeUp.name} fue eliminado con exito`);
    } catch (error) {
        return res.status(500).json(error.message);
    }
} 
