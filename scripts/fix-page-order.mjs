import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Get all pages from Subtração module (90002)
const [subtractionPages] = await connection.query(
  'SELECT id, title, `order` FROM pages WHERE moduleId = 90002 ORDER BY `order`, id'
);

console.log('Found', subtractionPages.length, 'pages');

// Update order sequentially
for (let i = 0; i < subtractionPages.length; i++) {
  const page = subtractionPages[i];
  const newOrder = i + 1;
  
  console.log(`Updating page ${page.id} (${page.title}) from order ${page.order} to ${newOrder}`);
  
  await connection.query(
    'UPDATE pages SET `order` = ? WHERE id = ?',
    [newOrder, page.id]
  );
}

console.log('✅ All pages updated successfully!');
await connection.end();
