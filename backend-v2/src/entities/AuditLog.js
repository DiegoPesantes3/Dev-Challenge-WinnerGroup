import { EntitySchema } from "typeorm";

export const AuditLog = new EntitySchema({
    name: "AuditLog",
    tableName: "audit_log",
    columns: {
        id: { primary: true, type: "int", generated: true },
        action: { type: "varchar" },
        affectedEntity: { type: "varchar" },
        date: { type: "timestamp" },
        db_user: { type: "varchar" }
    }
});

