import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import rutasGamer from './routes/routes.js';


const app = express();

app.use(cors());
app.use(express.json());


// Rutas
app.get('/', (req, res) => {
    res.json({ mensaje: "Backend Fake detector IGN funcionando" });
});

app.use('/api', rutasGamer);




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});

