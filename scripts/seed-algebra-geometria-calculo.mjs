import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';
import { eq, sql, inArray } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

console.log('📝 Criando páginas e exercícios para Álgebra, Geometria e Cálculo...\n');

// Buscar módulos
const modules = await db.select().from(schema.modules)
  .where(inArray(schema.modules.disciplineId, [30001, 30002, 30003]))
  .orderBy(schema.modules.disciplineId, schema.modules.order);

console.log(`✅ Encontrados ${modules.length} módulos\n`);

let totalPages = 0;
let totalExercises = 0;

for (const module of modules) {
  // Criar 1 página por módulo com conteúdo básico (máx 250 chars)
  const [pageResult] = await db.insert(schema.pages).values({
    moduleId: module.id,
    title: `Introdução - ${module.name}`,
    slug: `intro-${module.slug}`,
    order: 1,
    mainText: `Conteúdo introdutório sobre ${module.name}. Conceitos fundamentais e exemplos práticos para iniciar seus estudos neste módulo.`,
    estimatedMinutes: 15,
  });
  
  const pageId = pageResult.insertId;
  totalPages++;
  
  // Criar 5 exercícios por página
  const exercises = [];
  for (let i = 1; i <= 5; i++) {
    exercises.push({
      pageId: pageId,
      order: i,
      type: 'simple_input',
      question: `Exercício ${i}: Questão prática sobre ${module.name}`,
      expectedAnswer: String(i),
    });
  }
  
  await db.insert(schema.exercises).values(exercises);
  totalExercises += 5;
  
  console.log(`  ✅ ${module.name}: 1 página + 5 exercícios`);
}

console.log(`\n✨ Total: ${totalPages} páginas e ${totalExercises} exercícios criados!\n`);

await connection.end();
