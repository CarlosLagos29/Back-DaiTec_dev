import * as fs from "fs";
import * as path from "path";
import { v2 } from "cloudinary";

function getPublicIdFromUrl(imageUrl: string) {
  const startIndex = imageUrl.lastIndexOf("/") + 1;
  const endIndex = imageUrl.lastIndexOf(".");

  const publicId = imageUrl.substring(startIndex, endIndex);

  return publicId;
}

export function deleteServerImg(directory: string) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((archive) => {
      const rutaArchivo = path.join(directory, archive);

      fs.unlinkSync(rutaArchivo);
    });
  } else {
    return "La Carpeta es incorrecta";
  }
}

export async function deleteCloud(url: string | Array<string>) {
    
  if (Array.isArray(url)) {
    const promises = url.map(async (adress) => {
      const publicId = getPublicIdFromUrl(adress as string);
      const response = await v2.uploader.destroy(publicId);
      return response;
    });

    const result = Promise.all(promises);
    return result;
  } else {
    const publicId = getPublicIdFromUrl(url as string);

    const result = await v2.uploader.destroy(publicId);

    return result;
  }
}
