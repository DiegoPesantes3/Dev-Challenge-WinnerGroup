import { EntitySchema } from "typeorm";

export const Role = new EntitySchema({
    name: "Role",
    tableName: "roles",
    columns: {
        id: { primary: true, type: "int", generated: true },
        name: { type: "varchar", length: "50", unique: true }
    }
});