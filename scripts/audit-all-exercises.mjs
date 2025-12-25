import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Buscar TODOS os exercícios de múltipla escolha
const [rows] = await connection.execute(`
  SELECT id, uniqueId, question, options, correctAnswer, moduleId
  FROM standalone_exercises 
  WHERE exerciseType = 'multiple_choice'
  ORDER BY id
`);

console.log(`Total de exercícios de múltipla escolha: ${rows.length}\n`);

let errorsFound = [];
let fixCommands = [];

// Função para extrair operação e calcular resultado
function parseAndCalculate(question) {
  // Padrões para diferentes tipos de problemas
  
  // Subtração: "tinha X ... deu/gastou/desceram/vendidas Y"
  let match = question.match(/tinha\s*(?:R\$\s*)?(\d+).*?(?:gastou|deu|desceram|vendidas?)\s*(?:R\$\s*)?(\d+)/i);
  if (match) {
    return { op: 'subtração', num1: parseInt(match[1]), num2: parseInt(match[2]), result: parseInt(match[1]) - parseInt(match[2]) };
  }
  
  // Subtração direta: "Calcule: X - Y"
  match = question.match(/Calcule:\s*(\d+)\s*-\s*(\d+)/i);
  if (match) {
    return { op: 'subtração', num1: parseInt(match[1]), num2: parseInt(match[2]), result: parseInt(match[1]) - parseInt(match[2]) };
  }
  
  // Adição: "tinha X ... ganhou/recebeu/comprou Y"
  match = question.match(/tinha\s*(?:R\$\s*)?(\d+).*?(?:ganhou|recebeu|comprou|chegaram)\s*(?:R\$\s*)?(\d+)/i);
  if (match) {
    return { op: 'adição', num1: parseInt(match[1]), num2: parseInt(match[2]), result: parseInt(match[1]) + parseInt(match[2]) };
  }
  
  // Adição direta: "Calcule: X + Y"
  match = question.match(/Calcule:\s*(\d+)\s*\+\s*(\d+)/i);
  if (match) {
    return { op: 'adição', num1: parseInt(match[1]), num2: parseInt(match[2]), result: parseInt(match[1]) + parseInt(match[2]) };
  }
  
  // Adição: "Quanto é X + Y"
  match = question.match(/Quanto\s+é\s+(\d+)\s*\+\s*(\d+)/i);
  if (match) {
    return { op: 'adição', num1: parseInt(match[1]), num2: parseInt(match[2]), result: parseInt(match[1]) + parseInt(match[2]) };
  }
  
  // Multiplicação: "X × Y" ou "X * Y" ou "X x Y"
  match = question.match(/Calcule:\s*(\d+)\s*[×\*xX]\s*(\d+)/i);
  if (match) {
    return { op: 'multiplicação', num1: parseInt(match[1]), num2: parseInt(match[2]), result: parseInt(match[1]) * parseInt(match[2]) };
  }
  
  // Multiplicação: "Quanto é X × Y"
  match = question.match(/Quanto\s+é\s+(\d+)\s*[×\*xX]\s*(\d+)/i);
  if (match) {
    return { op: 'multiplicação', num1: parseInt(match[1]), num2: parseInt(match[2]), result: parseInt(match[1]) * parseInt(match[2]) };
  }
  
  // Multiplicação: "comprou X ... cada um custa Y" ou "X unidades ... Y cada"
  match = question.match(/(\d+)\s*(?:unidades?|pacotes?|caixas?|livros?|cadernos?).*?(?:R\$|custa)\s*(\d+)/i);
  if (match) {
    return { op: 'multiplicação', num1: parseInt(match[1]), num2: parseInt(match[2]), result: parseInt(match[1]) * parseInt(match[2]) };
  }
  
  // Divisão: "X ÷ Y" ou "X / Y"
  match = question.match(/Calcule:\s*(\d+)\s*[÷\/]\s*(\d+)/i);
  if (match) {
    return { op: 'divisão', num1: parseInt(match[1]), num2: parseInt(match[2]), result: Math.floor(parseInt(match[1]) / parseInt(match[2])) };
  }
  
  // Divisão: "Quanto é X ÷ Y"
  match = question.match(/Quanto\s+é\s+(\d+)\s*[÷\/]\s*(\d+)/i);
  if (match) {
    return { op: 'divisão', num1: parseInt(match[1]), num2: parseInt(match[2]), result: Math.floor(parseInt(match[1]) / parseInt(match[2])) };
  }
  
  // Divisão: "dividir X ... Y pessoas/partes"
  match = question.match(/(\d+).*?(?:dividir|repartir|distribuir).*?(\d+)/i);
  if (match) {
    return { op: 'divisão', num1: parseInt(match[1]), num2: parseInt(match[2]), result: Math.floor(parseInt(match[1]) / parseInt(match[2])) };
  }
  
  // Porcentagem: "X% de Y"
  match = question.match(/(\d+)%\s*de\s*(?:R\$\s*)?(\d+)/i);
  if (match) {
    return { op: 'porcentagem', num1: parseInt(match[1]), num2: parseInt(match[2]), result: Math.round(parseInt(match[1]) * parseInt(match[2]) / 100) };
  }
  
  // Porcentagem: "desconto de X% em Y"
  match = question.match(/desconto\s*de\s*(\d+)%.*?(?:R\$\s*)?(\d+)/i);
  if (match) {
    const percent = parseInt(match[1]);
    const value = parseInt(match[2]);
    return { op: 'porcentagem-desconto', num1: percent, num2: value, result: Math.round(value - (percent * value / 100)) };
  }
  
  return null;
}

// Função para extrair número de uma opção
function extractNumber(optText) {
  // Remover R$, unidades, etc e pegar o número
  const match = String(optText).match(/-?\d+(?:[.,]\d+)?/);
  if (match) {
    return parseFloat(match[0].replace(',', '.'));
  }
  return NaN;
}

for (const row of rows) {
  const calc = parseAndCalculate(row.question);
  
  if (!calc) {
    // Não conseguiu parsear a pergunta - pular
    continue;
  }
  
  // Parse options
  let options;
  if (typeof row.options === 'string') {
    try {
      options = JSON.parse(row.options);
    } catch (e) {
      continue;
    }
  } else if (Array.isArray(row.options)) {
    options = row.options;
  } else {
    continue;
  }
  
  // Encontrar índice da resposta correta
  let correctIndex = -1;
  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    const optText = typeof opt === 'object' ? opt.text : opt;
    const optNum = extractNumber(optText);
    if (Math.abs(optNum - calc.result) < 0.01) {
      correctIndex = i;
      break;
    }
  }
  
  if (correctIndex === -1) {
    // Resposta correta não encontrada nas opções
    console.log(`⚠️ ${row.uniqueId}: Resposta ${calc.result} não encontrada nas opções`);
    console.log(`   Pergunta: ${row.question}`);
    console.log(`   Opções: ${options.map(o => typeof o === 'object' ? o.text : o).join(', ')}`);
    continue;
  }
  
  // Verificar se correctAnswer está correto
  let currentAnswerIndex;
  if (typeof row.correctAnswer === 'string') {
    currentAnswerIndex = row.correctAnswer.charCodeAt(0) - 'a'.charCodeAt(0);
  } else {
    currentAnswerIndex = parseInt(row.correctAnswer);
  }
  
  if (currentAnswerIndex !== correctIndex) {
    errorsFound.push({
      id: row.id,
      uniqueId: row.uniqueId,
      operation: calc.op,
      question: row.question,
      currentAnswer: row.correctAnswer,
      correctIndex: correctIndex,
      correctValue: calc.result
    });
    
    const newAnswer = String.fromCharCode('a'.charCodeAt(0) + correctIndex);
    fixCommands.push(`UPDATE standalone_exercises SET correctAnswer = '${newAnswer}' WHERE id = ${row.id};`);
  }
}

console.log("\n\n=== RESUMO DE ERROS ===");
console.log(`Total de erros encontrados: ${errorsFound.length}`);

// Agrupar por operação
const byOp = {};
for (const err of errorsFound) {
  byOp[err.operation] = byOp[err.operation] || [];
  byOp[err.operation].push(err);
}

for (const [op, errs] of Object.entries(byOp)) {
  console.log(`\n${op.toUpperCase()}: ${errs.length} erros`);
  for (const err of errs) {
    console.log(`  ID ${err.id} (${err.uniqueId}): ${err.currentAnswer} -> ${String.fromCharCode('a'.charCodeAt(0) + err.correctIndex)}`);
  }
}

if (fixCommands.length > 0) {
  console.log("\n\n=== COMANDOS SQL PARA CORRIGIR ===");
  for (const cmd of fixCommands) {
    console.log(cmd);
  }
}

await connection.end();
