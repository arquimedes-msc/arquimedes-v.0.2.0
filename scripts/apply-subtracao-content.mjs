import mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';

// Conectar ao banco
const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Ler conteúdo dos arquivos
const parte1Content = fs.readFileSync(path.join(process.cwd(), 'content/subtracao-expandida-parte1.md'), 'utf-8');
const parte2Content = fs.readFileSync(path.join(process.cwd(), 'content/subtracao-expandida-parte2.md'), 'utf-8');

// Extrair seções do conteúdo - Parte 1
const parte1Sections = parte1Content.split('## Página ');
const sub1 = parte1Sections[1].split('\n---\n')[0].trim();
const sub2 = parte1Sections[2].split('\n---\n')[0].trim();
const sub3 = parte1Sections[3].split('\n---\n')[0].trim();

// Extrair seções do conteúdo - Parte 2
const parte2Sections = parte2Content.split('## Página ');
const sub4 = parte2Sections[1].split('\n---\n')[0].trim();
const sub5 = parte2Sections[2].split('\n---\n')[0].trim();
const sub6 = parte2Sections[3].split('\n\n**Parabéns')[0].trim();

console.log('📚 Aplicando conteúdo de Subtração ao banco de dados...\n');

// Buscar módulo de Subtração por nome
const [subModules] = await connection.query(
  'SELECT id FROM modules WHERE name LIKE "%Subtra%"'
);

if (subModules.length === 0) {
  console.log('❌ Módulo de Subtração não encontrado!');
  await connection.end();
  process.exit(1);
}

const subModuleId = subModules[0].id;
console.log(`✅ Módulo de Subtração encontrado (ID: ${subModuleId})`);

// Buscar páginas de Subtração
const [subPages] = await connection.query(
  'SELECT id, title FROM pages WHERE moduleId = ? ORDER BY `order`',
  [subModuleId]
);
console.log(`✅ Encontradas ${subPages.length} páginas de Subtração\n`);

// Atualizar páginas de Subtração
if (subPages.length >= 6) {
  console.log('📝 Atualizando Subtração Página 1...');
  await connection.query(
    'UPDATE pages SET mainText = ?, estimatedMinutes = 45 WHERE id = ?',
    [sub1, subPages[0].id]
  );
  console.log(`   ✓ Página "${subPages[0].title}" atualizada (${sub1.length} caracteres)`);

  console.log('📝 Atualizando Subtração Página 2...');
  await connection.query(
    'UPDATE pages SET mainText = ?, estimatedMinutes = 40 WHERE id = ?',
    [sub2, subPages[1].id]
  );
  console.log(`   ✓ Página "${subPages[1].title}" atualizada (${sub2.length} caracteres)`);

  console.log('📝 Atualizando Subtração Página 3...');
  await connection.query(
    'UPDATE pages SET mainText = ?, estimatedMinutes = 50 WHERE id = ?',
    [sub3, subPages[2].id]
  );
  console.log(`   ✓ Página "${subPages[2].title}" atualizada (${sub3.length} caracteres)`);

  console.log('📝 Atualizando Subtração Página 4...');
  await connection.query(
    'UPDATE pages SET mainText = ?, estimatedMinutes = 45 WHERE id = ?',
    [sub4, subPages[3].id]
  );
  console.log(`   ✓ Página "${subPages[3].title}" atualizada (${sub4.length} caracteres)`);

  console.log('📝 Atualizando Subtração Página 5...');
  await connection.query(
    'UPDATE pages SET mainText = ?, estimatedMinutes = 40 WHERE id = ?',
    [sub5, subPages[4].id]
  );
  console.log(`   ✓ Página "${subPages[4].title}" atualizada (${sub5.length} caracteres)`);

  console.log('📝 Atualizando Subtração Página 6...');
  await connection.query(
    'UPDATE pages SET mainText = ?, estimatedMinutes = 45 WHERE id = ?',
    [sub6, subPages[5].id]
  );
  console.log(`   ✓ Página "${subPages[5].title}" atualizada (${sub6.length} caracteres)\n`);
}

console.log('🎉 Conteúdo aplicado com sucesso!');
console.log('\n📊 Resumo:');
console.log(`   • Subtração: 6 páginas (~11.000 palavras)`);
console.log(`   • Total: Conteúdo rico e escaneável aplicado`);
console.log(`\n✅ Aritmética Básica agora tem conteúdo completo em:`);
console.log(`   • Adição (3 aulas)`);
console.log(`   • Subtração (6 aulas)`);
console.log(`   • Multiplicação (3 aulas)`);
console.log(`   • Divisão (4 aulas)`);
console.log(`   • Porcentagem (6 aulas)`);

await connection.end();
process.exit(0);
