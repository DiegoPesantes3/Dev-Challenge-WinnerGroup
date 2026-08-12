import { DataSource } from 'typeorm'
import 'dotenv/config'
import { Role } from '../entities/Role.js'
import { User } from '../entities/User.js'
import { NewsAnalysis } from '../entities/NewsAnalysis.js'
import { AuditLog } from '../entities/AuditLog.js'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Role, User, NewsAnalysis, AuditLog]
})
