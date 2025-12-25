import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await connection.execute(`
  SELECT 
    d.id as disciplineId, 
    d.name as disciplineName,
    d.slug as disciplineSlug,
    m.id as moduleId,
    m.name as moduleName,
    m.slug as moduleSlug,
    m.description as moduleDescription,
    m.order as moduleOrder
  FROM disciplines d
  LEFT JOIN modules m ON d.id = m.disciplineId
  WHERE d.slug LIKE '%aritmetica%' OR d.name LIKE '%Aritmética%'
  ORDER BY d.id, m.order
`);

console.log('\n=== MÓDULOS DE ARITMÉTICA ===\n');

let currentDiscipline = null;
for (const row of rows) {
  if (currentDiscipline !== row.disciplineName) {
    currentDiscipline = row.disciplineName;
    console.log(`\n📚 ${row.disciplineName} (ID: ${row.disciplineId})`);
    console.log('─'.repeat(50));
  }
  if (row.moduleId) {
    console.log(`  ${row.moduleOrder}. ${row.moduleName} (ID: ${row.moduleId})`);
    if (row.moduleDescription) {
      console.log(`     ${row.moduleDescription.substring(0, 60)}...`);
    }
  }
}

await connection.end();
