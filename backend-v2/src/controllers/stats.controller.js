import { AppDataSource } from "../config/db.js";

export const getDashboardStats = async (req, res) => {
    try {

        const globalTrends = await AppDataSource.query(`SELECT * FROM vw_global_trends`);

        const userActivity = await AppDataSource.query(`
            SELECT * FROM vw_user_activity 
            ORDER BY total_analyses DESC 
            LIMIT 5
        `);

        const totalFakeNewsRaw = await AppDataSource.query(`
            SELECT COUNT(*) AS total 
            FROM news_analysis 
            WHERE "iaVerdict" = 'Fake News'
        `);
        const totalFakeNews = totalFakeNewsRaw[0]?.total || 0;

        return res.status(200).json({
            trends: globalTrends,
            topUsers: userActivity,
            summary: {
                totalFakeNewsDetected: parseInt(totalFakeNews)
            }
        });

    } catch (error) {
        console.error("Stats Error:", error);
        return res.status(500).json({ error: "Internal Server Error loading stats" });
    }
};
