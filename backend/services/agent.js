import { z } from 'zod'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

export const reporteSchema = z.object({
    esTemaGamer: z.boolean().describe(
        'True si la imagen es sobre videojuegos, consolas o el mundo gamer, False si no lo es.'),
    veracidad: z.enum(['rojo', 'amarillo', 'verde']).describe(
        'rojo: Fake News, amarillo: Dudoso, verde: Real'),
    analisis: z.string().describe(
        'Breve y concisa descripción de si coincide con IGN y por qué se le dio ese color')

});

const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-3.1-flash-lite',
    temperature: 0
});

export const analizadorGamer = llm.withStructuredOutput(reporteSchema);

