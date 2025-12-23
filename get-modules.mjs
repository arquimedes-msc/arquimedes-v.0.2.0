import { drizzle } from "drizzle-orm/mysql2";
import { modules } from "./drizzle/schema";

const db = drizzle(process.env.DATABASE_URL);
const allModules = await db.select().from(modules);
console.log("Módulos disponíveis:");
allModules.forEach(m => console.log(`ID: ${m.id}, Nome: ${m.title}, Slug: ${m.slug}, DisciplineId: ${m.disciplineId}`));
