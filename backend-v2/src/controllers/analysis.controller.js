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
}

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
}


export const deleteAnalysis = async (req, res) => {

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
}


