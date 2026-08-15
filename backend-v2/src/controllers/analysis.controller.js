import fs from "fs/promises";
import { analyzeContentWithAI } from "../services/ia.service.js";
import { AppDataSource } from "../config/db.js";


const newsAnalysisRepo = AppDataSource.getRepository("NewsAnalysis")

export const getUserHistory = async (req, res) => {
    try {

        const newId = req.user.id

        const userHistory = await newsAnalysisRepo.find({ where: { user: { id: newId } } })

        return res.status(200).json({ userHistory })


    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
};

export const getAnalysisById = async (req, res) => {

    try {

        const userId = req.user.id
        const newId = req.params.id

        const analysis = await newsAnalysisRepo.findOne({
            where: { id: newId, user: { id: userId } }
        })

        if (!analysis) {
            return res.status(404).json({ message: `IA Analysis doesn't exist with id: ${newId}` })
        }

        return res.status(200).json({ analysis })

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
};


export const deleteAnalysis = async (req, res) => {

    try {

        const userId = req.user.id
        const newId = req.params.id

        const analysis = await newsAnalysisRepo.findOne({
            where: { id: newId, user: { id: userId } }
        })

        if (!analysis) {
            return res.status(404).json({ message: "IA analysis with does not exist. Nothing to delete." })
        }

        await newsAnalysisRepo.delete(newId)

        return res.status(200).json({ message: `Analysis with id: ${newId} deleted successfully.` })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error." })
    }


};

export const analyzeNews = async (req, res) => {
    try {

        const { textQuery, imageUrl } = req.body || {};

        let base64Image = null;
        let mimetype = null;

        if (req.file) {

            const fileBuffer = await fs.readFile(req.file.path);
            base64Image = fileBuffer.toString("base64");
            mimetype = req.file.mimetype;
        }

        if (!textQuery && !imageUrl && !base64Image) {
            return res.status(400).json({ error: "Please provide text, an image URL, or upload an image." });
        }

        const iaResult = await analyzeContentWithAI(textQuery, base64Image, mimetype, imageUrl);

        if (!iaResult.isGamingTopic) {
            return res.status(400).json({
                error: "The content is not related to video games.",
                analysis: iaResult.analysis
            });
        }

        const newAnalysis = await newsAnalysisRepo.save({
            title: textQuery || "Image Analysis",
            analyzedText: iaResult.analysis,
            iaVerdict: iaResult.thruthfulness,
            createdAt: new Date(),
            confidenceLevel: iaResult.confidenceLevel,
            user: { id: req.user.id }
        });

        return res.status(200).json(newAnalysis);
    } catch (error) {
        console.error("AI Analysis Error:", error);
        return res.status(500).json({ error: "Internal Server Error during analysis." });
    }

}
