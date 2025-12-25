import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const [columns] = await connection.execute('DESCRIBE standalone_videos');
console.log('Colunas da tabela standalone_videos:');
for (const col of columns) {
  console.log(`  - ${col.Field} (${col.Type})`);
}
await connection.end();
