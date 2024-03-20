import { Request, Response } from "express";
import { Generals, Generalsnterface } from "../../Models/Poducts/generals.model";

export const createGenerals = async (req: Request, res: Response) => {
    try {
        const product: Generalsnterface = req.body

        const findedProduct = await Generals.findOne({ name: product.name });

        if (findedProduct) {
            return res.status(400).json({ message: `${product.name} ya esta guardado en la base de datos` });
        };

        const newProduct = await new Generals(product).save()

        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getGenerals = async (_req: Request, res: Response) => {
    try {
        const allGenerals = await Generals.find()

        return res.status(200).json(allGenerals);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getByIdGenerals = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findedGeneral = await Generals.findById(id);

        if (!findedGeneral) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        return res.status(200).json(findedGeneral);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const updateGenerals = async (req: Request, res: Response) => {
    try {
        const updateData = req.body
        const { id } = req.params;

        const findedGeneral = await Generals.findById(id);
        if (!findedGeneral) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        const updatedProduct = await Generals.findByIdAndUpdate(id, updateData, { new: true })

        console.log(`${findedGeneral.name} fue actualizado con exito`)

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const deleteGenerals = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const findedGeneral = await Generals.findById(id);
        if (!findedGeneral) {
            return res.status(404).json({ message: `No se encontro el producto con el id: ${id}` });
        }

        await Generals.findByIdAndDelete(id);

        return res.status(200).json(`${findedGeneral.name} fue eliminado con exito`);
    } catch (error) {
        return res.status(500).json(error.message);
    }
} 
