import { analizadorGamer } from "../services/agent.js";

const PROMPT_SISTEMA = `Analiza esta imagen. ¿Es sobre videojuegos o 
hardware gamer? ¿Es real o parece falsa (editada, rumor sin base, mod de 
un juego, etc.)? Contrástala con tu únicamente con el medio IGN.`

export const verificarImagen = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ error: "No se proporcionó la URL de la imagen." });
        }

        console.log("Descargando la imagen desde Vercel Blob:", imageUrl);

        const respuestaImagen = await fetch(imageUrl);
        // 1. Aquí estaba el error (faltaba const y await)
        const arrayBuffer = await respuestaImagen.arrayBuffer();

        const mimeType = respuestaImagen.headers.get('content-type') || 'image/jpeg';

        const buffer = Buffer.from(arrayBuffer);
        // 2. Le arreglé el nombre a base64
        const base64String = buffer.toString('base64');

        const mensajeParaIA = [
            {
                role: "user",
                content: [
                    { type: "text", text: PROMPT_SISTEMA },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:${mimeType};base64,${base64String}`
                        }
                    }
                ]
            }
        ];

        console.log('Analizando con Gemini...')

        const resultadoIA = await analizadorGamer.invoke(mensajeParaIA);

        res.json(resultadoIA);

    } catch (error) {
        console.error("Error en la IA:", error);
        res.status(500).json({ error: "Hubo un problema al analizar la imagen." });
    }
};
