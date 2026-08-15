import { z } from "zod"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { HumanMessage, SystemMessage } from "@langchain/core/messages"

export const reportSchema = z.object({
    isGamingTopic: z.boolean().describe(`True if the content is about
        videogames, consoles, or the gaming industry. 
        False if it isn't. `),

    thruthfulness: z.enum(["Fake New", "Doubtful", "Real"]).describe(
        "Truthfulness level of the rumor or image."
    ),

    confidenceLevel: z.number().min(0).max(100).describe(
        `Nivel de confianza de tu conclusión, del 0 al 100.`
    ),

    analysis: z.string().describe(
        `Brief explanation of why it is real, questionable, or fake, 
        looking for visual or industry-related inconsistencies 
        (e.g., 'Nintendo wouldn't release a game on PS5')`
    )
});

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0
});

const gamingAnalizer = llm.withStructuredOutput(reportSchema);

export const analyzeContentWithAI = async (textQuery, base64Image, mimetype, imageUrl) => {

    const systemPrompt = new SystemMessage(
        `You are a senior investigative journalist at IGN Latin America.
        Your job is to debunk or confirm rumors, leaks, and images 
        from the video game industry.`
    );

    const content = [];

    if (textQuery) {
        content.push({
            type: "text", text: `Rumor or context: ${textQuery}`
        });
    } else {
        content.push({
            type: "text", text: "Analyze the thruthfulness of the following image."
        });
    }

    if (base64Image && mimetype) {
        content.push({
            type: "image_url", image_url: `data:${mimetype};base64,${base64Image}`
        });
    } else if (imageUrl) {
        content.push({
            type: "image_url",
            imageUrl: imageUrl
        });
    }

    const humanPrompt = new HumanMessage({ content });

    const result = await gamingAnalizer.invoke([systemPrompt, humanPrompt])

    return result;
}