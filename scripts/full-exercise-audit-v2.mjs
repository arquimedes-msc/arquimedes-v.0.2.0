import mysql from 'mysql2/promise';
import fs from 'fs';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [allExercises] = await connection.execute(`
  SELECT id, uniqueId, title, question, options, correctAnswer, exerciseType
  FROM standalone_exercises ORDER BY id
`);

console.log(`Total de exercícios: ${allExercises.length}`);

let stats = { total: allExercises.length, multipleChoice: 0, validated: 0, correct: 0, errors: [], cannotValidate: [] };

function extractNumber(str) {
  const s = String(str);
  let match = s.match(/-?\d{1,3}(?:\.\d{3})*,\d+/);
  if (match) return parseFloat(match[0].replace(/\./g, '').replace(',', '.'));
  match = s.match(/-?\d+[,\.]\d+/);
  if (match) return parseFloat(match[0].replace(',', '.'));
  match = s.match(/-?\d+/);
  if (match) return parseFloat(match[0]);
  return NaN;
}

function parseAndCalculate(question, options) {
  const q = question.toLowerCase();
  
  // Adição com 3 números
  let match = question.match(/(\d+)\s*\+\s*(\d+)\s*\+\s*(\d+)/);
  if (match) {
    const result = parseInt(match[1]) + parseInt(match[2]) + parseInt(match[3]);
    return { op: 'adição', result, calc: `${match[1]} + ${match[2]} + ${match[3]} = ${result}` };
  }
  
  // Adição simples
  match = question.match(/(\d+(?:[,\.]\d+)?)\s*\+\s*(\d+(?:[,\.]\d+)?)/);
  if (match && !question.includes('-')) {
    const n1 = parseFloat(match[1].replace(',', '.'));
    const n2 = parseFloat(match[2].replace(',', '.'));
    return { op: 'adição', result: n1 + n2, calc: `${n1} + ${n2} = ${n1 + n2}` };
  }
  
  // Subtração
  match = question.match(/(\d+(?:[,\.]\d+)?)\s*-\s*(\d+(?:[,\.]\d+)?)/);
  if (match) {
    const n1 = parseFloat(match[1].replace(',', '.'));
    const n2 = parseFloat(match[2].replace(',', '.'));
    return { op: 'subtração', result: n1 - n2, calc: `${n1} - ${n2} = ${n1 - n2}` };
  }
  
  // "tinha X gastou Y"
  if (q.includes('tinha') && (q.includes('gastou') || q.includes('deu') || q.includes('desceram') || q.includes('vendidas'))) {
    const nums = question.match(/\d+(?:[,\.]\d+)?/g);
    if (nums && nums.length >= 2) {
      const n1 = parseFloat(nums[0].replace(',', '.'));
      const n2 = parseFloat(nums[1].replace(',', '.'));
      return { op: 'subtração', result: n1 - n2, calc: `${n1} - ${n2} = ${n1 - n2}` };
    }
  }
  
  // "tinha X ganhou Y"
  if (q.includes('tinha') && (q.includes('ganhou') || q.includes('recebeu'))) {
    const nums = question.match(/\d+(?:[,\.]\d+)?/g);
    if (nums && nums.length >= 2) {
      const n1 = parseFloat(nums[0].replace(',', '.'));
      const n2 = parseFloat(nums[1].replace(',', '.'));
      return { op: 'adição', result: n1 + n2, calc: `${n1} + ${n2} = ${n1 + n2}` };
    }
  }
  
  // Multiplicação com 3 números
  match = question.match(/(\d+)\s*[×\*xX]\s*(\d+)\s*[×\*xX]\s*(\d+)/);
  if (match) {
    const result = parseInt(match[1]) * parseInt(match[2]) * parseInt(match[3]);
    return { op: 'multiplicação', result, calc: `${match[1]} × ${match[2]} × ${match[3]} = ${result}` };
  }
  
  // Multiplicação simples
  match = question.match(/(\d+(?:[,\.]\d+)?)\s*[×\*xX]\s*(\d+(?:[,\.]\d+)?)/);
  if (match) {
    const n1 = parseFloat(match[1].replace(',', '.'));
    const n2 = parseFloat(match[2].replace(',', '.'));
    return { op: 'multiplicação', result: n1 * n2, calc: `${n1} × ${n2} = ${n1 * n2}` };
  }
  
  // Divisão com resto
  if (q.includes('resto')) {
    match = question.match(/(\d+)\s*[÷\/]\s*(\d+)/);
    if (match) {
      const n1 = parseInt(match[1]);
      const n2 = parseInt(match[2]);
      const quociente = Math.floor(n1 / n2);
      const resto = n1 % n2;
      for (let i = 0; i < options.length; i++) {
        const opt = typeof options[i] === 'object' ? options[i].text : options[i];
        if (opt.includes(String(quociente)) && opt.includes('resto') && opt.includes(String(resto))) {
          return { op: 'divisão-resto', correctIndex: i, calc: `${n1} ÷ ${n2} = ${quociente} resto ${resto}` };
        }
      }
    }
  }
  
  // Divisão simples
  match = question.match(/(\d+(?:[,\.]\d+)?)\s*[÷\/]\s*(\d+(?:[,\.]\d+)?)/);
  if (match) {
    const n1 = parseFloat(match[1].replace(',', '.'));
    const n2 = parseFloat(match[2].replace(',', '.'));
    return { op: 'divisão', result: n1 / n2, calc: `${n1} ÷ ${n2} = ${n1 / n2}` };
  }
  
  // Porcentagem composta (aumento + desconto)
  if (q.includes('aumento') && q.includes('desconto')) {
    const valorMatch = question.match(/r\$\s*(\d+)/i);
    const aumentoMatch = question.match(/aumento\s+de\s+(\d+)%/i);
    const descontoMatch = question.match(/desconto\s+de\s+(\d+)%/i);
    if (valorMatch && aumentoMatch && descontoMatch) {
      const valor = parseFloat(valorMatch[1]);
      const aumento = parseFloat(aumentoMatch[1]);
      const desconto = parseFloat(descontoMatch[1]);
      const result = valor * (1 + aumento/100) * (1 - desconto/100);
      return { op: 'porcentagem-composta', result, calc: `${valor} × 1.${aumento} × 0.${100-desconto} = ${result}` };
    }
  }
  
  // Porcentagem simples
  match = question.match(/(\d+)%\s*de\s*(?:r\$\s*)?(\d+)/i);
  if (match) {
    const percent = parseFloat(match[1]);
    const value = parseFloat(match[2]);
    return { op: 'porcentagem', result: percent * value / 100, calc: `${percent}% de ${value} = ${percent * value / 100}` };
  }
  
  return null;
}

for (const exercise of allExercises) {
  if (exercise.exerciseType !== 'multiple_choice') continue;
  stats.multipleChoice++;
  
  let options;
  try {
    options = typeof exercise.options === 'string' ? JSON.parse(exercise.options) : exercise.options;
  } catch (e) { continue; }
  
  const calc = parseAndCalculate(exercise.question, options);
  if (!calc) {
    stats.cannotValidate.push({ exercise, reason: 'Padrão não reconhecido' });
    continue;
  }
  
  stats.validated++;
  
  // Se temos índice direto (divisão com resto)
  if (calc.correctIndex !== undefined) {
    let currentIdx = typeof exercise.correctAnswer === 'string' && exercise.correctAnswer.length === 1 
      ? exercise.correctAnswer.charCodeAt(0) - 'a'.charCodeAt(0) 
      : parseInt(exercise.correctAnswer);
    
    if (currentIdx === calc.correctIndex) {
      stats.correct++;
    } else {
      stats.errors.push({ exercise, calc, expectedAnswer: String.fromCharCode('a'.charCodeAt(0) + calc.correctIndex) });
    }
    continue;
  }
  
  // Encontrar resposta correta nas opções
  let correctIdx = -1;
  for (let i = 0; i < options.length; i++) {
    const optText = typeof options[i] === 'object' ? options[i].text : options[i];
    const optNum = extractNumber(optText);
    if (Math.abs(optNum - calc.result) < 0.01) {
      correctIdx = i;
      break;
    }
  }
  
  if (correctIdx === -1) {
    stats.errors.push({ exercise, calc, reason: `Resposta ${calc.result} não encontrada nas opções` });
    continue;
  }
  
  let currentIdx = typeof exercise.correctAnswer === 'string' && exercise.correctAnswer.length === 1 
    ? exercise.correctAnswer.charCodeAt(0) - 'a'.charCodeAt(0) 
    : parseInt(exercise.correctAnswer);
  
  if (currentIdx === correctIdx) {
    stats.correct++;
  } else {
    stats.errors.push({ 
      exercise, calc, 
      currentAnswer: exercise.correctAnswer,
      expectedAnswer: String.fromCharCode('a'.charCodeAt(0) + correctIdx)
    });
  }
}

console.log('\n=== RESUMO ===');
console.log(`Múltipla escolha: ${stats.multipleChoice}`);
console.log(`Validados: ${stats.validated}`);
console.log(`✅ Corretos: ${stats.correct}`);
console.log(`❌ Erros: ${stats.errors.length}`);
console.log(`⚠️ Não validáveis: ${stats.cannotValidate.length}`);

if (stats.errors.length > 0) {
  console.log('\n=== ERROS ===');
  for (const err of stats.errors) {
    console.log(`ID ${err.exercise.id}: ${err.reason || `atual=${err.currentAnswer} esperado=${err.expectedAnswer}`}`);
  }
  
  console.log('\n=== SQL PARA CORREÇÃO ===');
  for (const err of stats.errors) {
    if (err.expectedAnswer) {
      console.log(`UPDATE standalone_exercises SET correctAnswer = '${err.expectedAnswer}' WHERE id = ${err.exercise.id};`);
    }
  }
}

await connection.end();
