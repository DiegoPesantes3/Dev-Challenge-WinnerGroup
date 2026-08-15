import express from "express";
import { AppDataSource } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js"
import userRoutes from "./src/routes/user.routes.js";
import analysisRouter from "./src/routes/analysis.routes.js";
import statsRoutes from "./src/routes/stats.routes.js";


const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/analyses", analysisRouter)
app.use("/api/stats", statsRoutes)

app.get('/', (req, res) => {
    res.json({ message: "Server is alive!" })
})

AppDataSource.initialize().then(() => {
    console.log("Database connected!");

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    });
}).catch((error) => {
    console.error("Error connecting db", error)
});




