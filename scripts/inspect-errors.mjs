import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// IDs com erros
const errorIds = [5, 15, 17, 18, 19, 27, 28, 29, 53, 54, 56, 68, 71];

const [rows] = await connection.execute(`
  SELECT id, uniqueId, question, options, correctAnswer
  FROM standalone_exercises 
  WHERE id IN (${errorIds.join(',')})
  ORDER BY id
`);

for (const row of rows) {
  console.log(`\n=== ID ${row.id} (${row.uniqueId || 'sem uniqueId'}) ===`);
  console.log(`Pergunta: ${row.question}`);
  console.log(`correctAnswer: ${row.correctAnswer}`);
  
  let options;
  if (typeof row.options === 'string') {
    options = JSON.parse(row.options);
  } else {
    options = row.options;
  }
  
  console.log('Opções:');
  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    const text = typeof opt === 'object' ? opt.text : opt;
    console.log(`  ${String.fromCharCode('a'.charCodeAt(0) + i)}) ${text}`);
  }
}

await connection.end();
