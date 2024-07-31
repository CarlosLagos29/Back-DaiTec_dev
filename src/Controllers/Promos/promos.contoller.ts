import { Response, Request } from "express";

import PromosInterface from "../../Types/promos.types";
import Promos from "../../Models/Promos/promos.model";

export const createPromo = async (req: Request, res: Response) => {
  try {
    const prom: PromosInterface = req.body;

    const findPromo = await Promos.findOne({ name: prom.name });

    if (findPromo) {
      return res
        .status(400)
        .json({
          message: `La promo ${prom.name} ya existe en la base de datos`,
        });
    }

    const newProm = await new Promos(prom).save();

    return res.status(201).json(newProm);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getPromos = async (_req: Request, res: Response) => {
  try {
    const allProm = await Promos.find();

    allProm.reverse();

    return res.status(200).json(allProm);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteProm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findedProm = await Promos.findById(id);

    if (!findedProm) {
      return res.status(404).json(`No se encontro la promo con id:${id}`);
    }

    await Promos.findByIdAndDelete(id);

    return res
      .status(200)
      .json(`La promo ${findedProm.name} fue eliminada correctamente`);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
