import { v2 } from 'cloudinary';
import { Request, Response } from 'express';
import { deleteCloud, deleteServerImg } from '../../Helpers/cloudinary.helpers';

import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const { config, uploader } = v2;

config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

export const uploadImage = async (req: Request, res: Response) => {
    try {

        const result = await uploader.upload(req.file.path);
        res.status(200).json({ imageUrl: result.secure_url });


        const directory = path.join('uploads');
        deleteServerImg(directory);

    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ error: 'Error al subir la imagen a Cloudinary' });
    }
};

export const deleteImage = async (req: Request, res: Response) => {
    const { imageUrl } = req.body;
    try {

      const result = await deleteCloud(imageUrl);
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al eliminar la imagen de Cloudinary:', error);
      res.status(500).json({ error: 'Error al eliminar la imagen de Cloudinary' });
    }
  };