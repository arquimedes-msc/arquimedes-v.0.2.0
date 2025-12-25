import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Query direta para ver os exercícios de subtração
const result = await connection.execute(`
  SELECT id, uniqueId, question, options, correctAnswer 
  FROM standalone_exercises 
  WHERE uniqueId LIKE 'EX-90002-%' 
  ORDER BY id 
  LIMIT 30
`);

console.log("=== EXERCÍCIOS DE SUBTRAÇÃO ===\n");

let errorsFound = [];

for (const row of result[0]) {
  console.log(`ID: ${row.id} | UniqueId: ${row.uniqueId}`);
  console.log(`Pergunta: ${row.question}`);
  console.log(`Resposta Correta (índice): ${row.correctAnswer}`);
  
  // Parse options e verificar
  try {
    const options = JSON.parse(row.options);
    
    // Extrair números da pergunta para calcular resposta correta
    const match = row.question.match(/(\d+).*?(\d+)/);
    if (match) {
      const num1 = parseInt(match[1]);
      const num2 = parseInt(match[2]);
      const correctResult = num1 - num2;
      console.log(`Cálculo: ${num1} - ${num2} = ${correctResult}`);
      
      // Verificar qual opção tem a resposta correta
      let foundCorrect = false;
      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        const optText = typeof opt === 'object' ? opt.text : opt;
        const optNum = parseInt(optText.match(/-?\d+/)?.[0] || '0');
        console.log(`  Opção ${i}: "${optText}" (valor: ${optNum})`);
        if (optNum === correctResult) {
          foundCorrect = true;
          console.log(`  ✅ Resposta correta está na opção ${i}`);
          if (row.correctAnswer !== i) {
            console.log(`  ❌ ERRO! correctAnswer=${row.correctAnswer} mas deveria ser ${i}`);
            errorsFound.push({
              id: row.id,
              uniqueId: row.uniqueId,
              question: row.question,
              currentAnswer: row.correctAnswer,
              correctAnswer: i,
              correctValue: correctResult
            });
          }
        }
      }
      if (!foundCorrect) {
        console.log(`  ⚠️ AVISO: Nenhuma opção contém o resultado correto ${correctResult}!`);
      }
    }
  } catch (e) {
    console.log(`Erro ao parsear: ${e.message}`);
  }
  console.log("---\n");
}

console.log("\n=== RESUMO DE ERROS ===");
console.log(`Total de erros encontrados: ${errorsFound.length}`);
for (const err of errorsFound) {
  console.log(`\nID ${err.id} (${err.uniqueId}):`);
  console.log(`  Pergunta: ${err.question}`);
  console.log(`  Resposta correta: ${err.correctValue}`);
  console.log(`  correctAnswer atual: ${err.currentAnswer} -> deveria ser: ${err.correctAnswer}`);
}

await connection.end();
