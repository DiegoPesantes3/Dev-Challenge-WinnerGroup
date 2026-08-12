import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: { primary: true, type: "int", generated: true },
        email: { type: "varchar", unique: true },
        password: { type: "varchar" }
    },
    relations: {
        role: { target: "Role", type: "many-to-one", joinColumn: true, eager: true }
    }
});