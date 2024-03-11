import { server } from "./src/app";
import mongoose from 'mongoose';

async function startServer() {
    try {
        // Conexión a la base de datos MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/Daiana');

        // Una vez conectado a la base de datos, inicia el servidor
        const PORT = 3001;
        server.listen(PORT, () => {
            console.log(`Server raised in port: ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();