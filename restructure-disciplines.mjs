import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.js';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

console.log('🔄 Reestruturando disciplinas em 4 grandes áreas...\n');

// 1. Renomear disciplina existente para "Aritmética"
console.log('1️⃣ Renomeando "Matemática Básica" para "Aritmética"...');
await db.update(schema.disciplines)
  .set({
    name: 'Aritmética',
    slug: 'aritmetica',
    description: 'Fundamentos de números, operações básicas e cálculos práticos do dia a dia',
    icon: '🔢'
  })
  .where(eq(schema.disciplines.slug, 'matematica-basica'));

console.log('✅ Disciplina "Aritmética" atualizada\n');

// 2. Criar as outras 3 disciplinas
console.log('2️⃣ Criando disciplinas Álgebra, Geometria e Cálculo...');

const newDisciplines = [
  {
    name: 'Álgebra',
    slug: 'algebra',
    description: 'Equações, funções, polinômios e estruturas algébricas',
    icon: '📐',
    order: 2
  },
  {
    name: 'Geometria',
    slug: 'geometria',
    description: 'Formas, espaço, medidas e relações geométricas',
    icon: '📏',
    order: 3
  },
  {
    name: 'Cálculo',
    slug: 'calculo',
    description: 'Limites, derivadas, integrais e análise matemática',
    icon: '∫',
    order: 4
  }
];

for (const disc of newDisciplines) {
  await db.insert(schema.disciplines).values(disc);
  console.log(`✅ Disciplina "${disc.name}" criada`);
}

console.log('\n✨ Reestruturação concluída!');
console.log('\n📊 Estrutura atual:');
console.log('  1. Aritmética (com 4 módulos existentes)');
console.log('  2. Álgebra (vazia)');
console.log('  3. Geometria (vazia)');
console.log('  4. Cálculo (vazio)');

await connection.end();
