import { server } from "./src/app";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT;
const DB_CONECTION = process.env.DB_CONECTION;

async function startServer() {
    try {
        // Conexión a la base de datos MongoDB
        await mongoose.connect(DB_CONECTION);

        // Una vez conectado a la base de datos, inicia el servidor
        server.listen(PORT, () => {
            console.log(`Server raised in port: ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();