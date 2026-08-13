import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1] //si existe devuelve lo de la derecha

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" })
    }

}

export const requireAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({ error: "Access denied. Admin required" })
    }

    const existingRole = req.user.role

    if (existingRole !== "Admin") {
        return res.status(403).json({ error: "Invalid Role. Admin required." })
    }

    next()

}
