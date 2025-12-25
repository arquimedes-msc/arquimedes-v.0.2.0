import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connection = await mysql.createConnection(process.env.DATABASE_URL);
console.log('🔗 Conectado ao banco de dados\n');

const [modules] = await connection.execute(`
  SELECT m.id, m.name, m.slug, d.name as discipline_name, d.id as discipline_id
  FROM modules m
  JOIN disciplines d ON m.disciplineId = d.id
  WHERE d.name LIKE '%Aritmética%' OR d.name LIKE '%Aritmetica%'
  ORDER BY d.id, m.id
`);

console.log('=== MÓDULOS DE ARITMÉTICA ===\n');

let currentDiscipline = '';
for (const m of modules) {
  if (m.discipline_name !== currentDiscipline) {
    currentDiscipline = m.discipline_name;
    console.log(`\n📚 ${currentDiscipline} (ID: ${m.discipline_id})`);
    console.log('─'.repeat(50));
  }
  console.log(`  ${m.id}. ${m.name}`);
}

console.log(`\n\nTotal: ${modules.length} módulos`);
await connection.end();
