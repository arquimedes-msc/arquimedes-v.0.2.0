import mysql from "mysql2/promise";
import fs from "fs";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in environment");
  process.exit(1);
}

async function insertExercises() {
  console.log("🔌 Connecting to database...");
  
  const connection = await mysql.createConnection(DATABASE_URL)
  
  console.log("✅ Connected!");
  
  // Ler SQL do arquivo
  const sql = fs.readFileSync("/home/ubuntu/arquimedes/insert_exercises_final.sql", "utf-8");
  
  console.log(`📝 Executing SQL (${sql.length} characters)...`);
  
  try {
    await connection.query(sql);
    console.log("✅ 90 exercícios inseridos com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inserir exercícios:", error.message);
    process.exit(1);
  } finally {
    await connection.end();
    console.log("🔌 Connection closed");
  }
}

insertExercises();
