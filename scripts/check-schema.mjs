import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [cols] = await connection.execute(`DESCRIBE standalone_exercises`);
console.log("Colunas da tabela standalone_exercises:");
for (const col of cols) {
  console.log(`  ${col.Field}: ${col.Type}`);
}

await connection.end();
