import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Exercícios de fração
const [rows] = await connection.execute(`
  SELECT id, question, options, correctAnswer
  FROM standalone_exercises 
  WHERE id IN (86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100)
  ORDER BY id
`);

for (const row of rows) {
  console.log(`\n=== ID ${row.id} ===`);
  console.log(`Pergunta: ${row.question}`);
  console.log(`correctAnswer: ${row.correctAnswer}`);
  
  let options = typeof row.options === 'string' ? JSON.parse(row.options) : row.options;
  console.log('Opções:');
  for (let i = 0; i < options.length; i++) {
    const text = typeof options[i] === 'object' ? options[i].text : options[i];
    const isCorrect = (row.correctAnswer === String.fromCharCode('a'.charCodeAt(0) + i) || row.correctAnswer === String(i));
    console.log(`  ${String.fromCharCode('a'.charCodeAt(0) + i)}) ${text}${isCorrect ? ' ✓' : ''}`);
  }
}

await connection.end();
