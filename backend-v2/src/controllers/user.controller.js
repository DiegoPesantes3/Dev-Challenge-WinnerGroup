import { AppDataSource } from "../config/db.js"

const userRepo = AppDataSource.getRepository("User")

export const getAllUsers = async (req, res) => {

    try {

        const allUsers = await userRepo.find()

        if (allUsers.length === 0) {
            return res.status(200).json({ message: "The are not users to show" })
        }

        return res.status(200).json({ allUsers })

    } catch (error) {

        return res.status(500).json({ error: "Internal server error" })
    }

}


export const getUsersById = async (req, res) => {

    try {

        const userId = req.params.id

        if (!userId) {
            return res.status(400).json({ message: "ID not provided" })
        }

        const userById = await userRepo.findOne({ where: { id: userId } })
        if (!userById) {
            return res.status(404).json({ message: "User doesn't founded" })
        }

        return res.status(200).json({ userById })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }

}

export const deleteUser = async (req, res) => {

    try {

        const userId = req.params.id

        const foundedUser = await userRepo.findOne({ where: { id: userId } })
        if (!foundedUser) {
            return res.status(404).json({ message: "User doesn't founded" })
        }

        await userRepo.delete(userId)

        return res.status(200).json({ message: `User ${userId} deleted successfully` })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }

}

