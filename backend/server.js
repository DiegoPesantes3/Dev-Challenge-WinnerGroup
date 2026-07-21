import express from 'express'
import cors from 'cors'
import multer from 'multer';
import 'dotenv/config'

import { analizadorGamer } from './services/agent.js';


const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });


// Rutas
app.get('/', (req, res) => {
    res.json({ mensaje: "Backend Fake detector IGN funcionando" });
});


app.post('/api/verificar', upload.single('imagen'),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ninguna imagen.' });
        }

        console.log('Imagen recibida!', req.file.originalname);

        res.json({ mensaje: 'Imagen recibida en backend.' });
    });




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});

