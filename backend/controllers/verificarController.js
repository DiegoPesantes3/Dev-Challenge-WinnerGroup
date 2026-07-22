import { analizadorGamer } from "../services/agent.js";

const PROMPT_SISTEMA = `Analiza esta imagen. ¿Es sobre videojuegos o 
hardware gamer? ¿Es real o parece falsa (editada, generada por IA, rumor sin base, mod de 
un juego, etc.)? Contrástala únicamente con el medio IGN.`

export const verificarImagen = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        let base64String = '';
        let mimeType = 'image/jpeg';

        if (req.file) {
            console.log("Procesando imagen subida desde el cliente...");
            mimeType = req.file.mimetype;
            base64String = req.file.buffer.toString('base64');
        }
        else if (imageUrl) {
            console.log("Descargando la imagen desde URL:", imageUrl);
            const respuestaImagen = await fetch(imageUrl);

            if (!respuestaImagen.ok) {
                return res.status(400).json({ error: "No se pudo descargar la imagen de la URL proporcionada." });
            }

            const arrayBuffer = await respuestaImagen.arrayBuffer();
            mimeType = respuestaImagen.headers.get('content-type') || 'image/jpeg';
            const buffer = Buffer.from(arrayBuffer);
            base64String = buffer.toString('base64');
        }

        else {
            return res.status(400).json({ error: "Debes proporcionar una imagen física o una URL." });
        }

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
