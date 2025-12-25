import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Query direta para ver os exercícios de subtração
const [rows] = await connection.execute(`
  SELECT id, uniqueId, question, options, correctAnswer 
  FROM standalone_exercises 
  WHERE uniqueId LIKE 'EX-90002-%' 
  ORDER BY id 
  LIMIT 30
`);

console.log("=== EXERCÍCIOS DE SUBTRAÇÃO ===\n");

let errorsFound = [];
let fixCommands = [];

for (const row of rows) {
  console.log(`\nID: ${row.id} | UniqueId: ${row.uniqueId}`);
  console.log(`Pergunta: ${row.question}`);
  console.log(`correctAnswer atual: ${row.correctAnswer}`);
  
  // Extrair números da pergunta para calcular resposta correta
  const match = row.question.match(/(\d+).*?(\d+)/);
  if (match) {
    const num1 = parseInt(match[1]);
    const num2 = parseInt(match[2]);
    const correctResult = num1 - num2;
    console.log(`Cálculo: ${num1} - ${num2} = ${correctResult}`);
    
    // O campo options pode ser um objeto JS serializado, não JSON puro
    // Vamos ver o que está lá
    const optionsRaw = row.options;
    console.log(`Options (raw type): ${typeof optionsRaw}`);
    
    // Se options é uma string, tentar parsear
    let options;
    if (typeof optionsRaw === 'string') {
      try {
        options = JSON.parse(optionsRaw);
      } catch (e) {
        console.log(`Erro ao parsear JSON: ${e.message}`);
        console.log(`Options raw: ${optionsRaw.substring(0, 200)}`);
        continue;
      }
    } else if (Array.isArray(optionsRaw)) {
      options = optionsRaw;
    } else {
      console.log(`Options não é string nem array: ${optionsRaw}`);
      continue;
    }
    
    console.log(`Options parseadas:`, JSON.stringify(options, null, 2));
    
    // Verificar qual opção tem a resposta correta
    let correctIndex = -1;
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const optText = typeof opt === 'object' ? opt.text : opt;
      const optNum = parseInt(String(optText).match(/-?\d+/)?.[0] || 'NaN');
      console.log(`  Opção ${i}: "${optText}" (valor: ${optNum})`);
      if (optNum === correctResult) {
        correctIndex = i;
        console.log(`  ✅ Esta é a resposta correta!`);
      }
    }
    
    // Verificar se correctAnswer está correto
    // correctAnswer pode ser 'a', 'b', 'c', 'd' ou 0, 1, 2, 3
    let currentAnswerIndex;
    if (typeof row.correctAnswer === 'string') {
      currentAnswerIndex = row.correctAnswer.charCodeAt(0) - 'a'.charCodeAt(0);
    } else {
      currentAnswerIndex = parseInt(row.correctAnswer);
    }
    
    console.log(`  correctAnswer atual (índice): ${currentAnswerIndex}`);
    
    if (correctIndex !== -1 && currentAnswerIndex !== correctIndex) {
      console.log(`  ❌ ERRO! Deveria ser índice ${correctIndex}`);
      errorsFound.push({
        id: row.id,
        uniqueId: row.uniqueId,
        question: row.question,
        currentAnswer: row.correctAnswer,
        correctIndex: correctIndex,
        correctValue: correctResult
      });
      
      // Gerar comando SQL para corrigir
      const newAnswer = String.fromCharCode('a'.charCodeAt(0) + correctIndex);
      fixCommands.push(`UPDATE standalone_exercises SET correctAnswer = '${newAnswer}' WHERE id = ${row.id};`);
    } else if (correctIndex === -1) {
      console.log(`  ⚠️ AVISO: Nenhuma opção contém o resultado correto ${correctResult}!`);
    } else {
      console.log(`  ✓ correctAnswer está correto`);
    }
  }
}

console.log("\n\n=== RESUMO DE ERROS ===");
console.log(`Total de erros encontrados: ${errorsFound.length}`);

if (errorsFound.length > 0) {
  console.log("\n=== COMANDOS SQL PARA CORRIGIR ===");
  for (const cmd of fixCommands) {
    console.log(cmd);
  }
}

await connection.end();
