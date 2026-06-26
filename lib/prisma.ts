import "dotenv/config"; // Ensure env variables load before initializing the adapter
import { PrismaLibSql } from "@prisma/adapter-libsql"; 
import { PrismaClient } from "../app/generated/prisma/client"; 

// Fallback to local file string if DATABASE_URL isn't explicitly set in your .env
const dbUrl = process.env.DATABASE_URL || "file:./app.db";

const adapter = new PrismaLibSql({
  url: dbUrl,
});

const prisma = new PrismaClient({ adapter });

export default prisma;