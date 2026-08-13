import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../config/db.js"

const userRepo = AppDataSource.getRepository("User");

export const register = async (req, res) => {

    try {

        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        };

        const existingUser = await userRepo.findOne({ where: { email } })

        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" })
        }

        const hash = await bcrypt.hash(password, 10)
        await userRepo.save({ email, password: hash })

        return res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }

}

export const login = async (req, res) => {

    try {

        const email = req.body.email
        const password = req.body.password

        const foundedUser = await userRepo.findOne({ where: { email } })

        if (!foundedUser) {
            return res.status(404).json({ message: "User is not registered" })
        }

        const comparedPassword = await bcrypt.compare(password, foundedUser.password)

        if (!comparedPassword) {
            return res.status(401).json({ message: "Password doesn't match" })
        }

        const token = jwt.sign(
            { id: foundedUser.id, role: foundedUser.role, email: foundedUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        return res.status(200).json({ token })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }





}


