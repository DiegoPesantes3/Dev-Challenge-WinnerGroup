import { EntitySchema } from "typeorm";

export const NewsAnalysis = new EntitySchema({
    name: "NewsAnalysis",
    tableName: "news_analysis",
    columns: {
        id: { primary: true, type: "int", generated: true },
        title: { type: "varchar" },
        analyzedText: { type: "text" },
        iaVerdict: { type: "varchar" },
        createdAt: { type: "timestamp" },
        confidenceLevel: { type: "float" }
    },
    relations: {
        user: { target: "User", type: "many-to-one" }
    },
    checks: [
        { expression: `"confidenceLevel" >= 0 AND "confidenceLevel" <= 100` }
    ]
});