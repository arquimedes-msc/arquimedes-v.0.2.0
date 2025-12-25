/**
 * AUDITORIA COMPLETA DE EXERCÍCIOS - ARQUIMEDES
 * 
 * Este script verifica TODOS os exercícios do banco de dados e gera
 * um relatório detalhado em Markdown com:
 * - Cada exercício testado
 * - Cálculo esperado
 * - Resposta marcada como correta
 * - Status: ✅ CORRETO ou ❌ ERRO
 */

import mysql from 'mysql2/promise';
import fs from 'fs';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Buscar TODOS os exercícios
const [allExercises] = await connection.execute(`
  SELECT 
    se.id, 
    se.uniqueId, 
    se.title,
    se.question, 
    se.options, 
    se.correctAnswer,
    se.exerciseType,
    se.difficulty,
    se.points,
    se.stepByStepExplanation,
    m.name as moduleName,
    d.name as disciplineName
  FROM standalone_exercises se
  LEFT JOIN modules m ON se.moduleId = m.id
  LEFT JOIN disciplines d ON se.disciplineId = d.id
  ORDER BY se.id
`);

console.log(`Total de exercícios no banco: ${allExercises.length}\n`);

// Estatísticas
let stats = {
  total: allExercises.length,
  multipleChoice: 0,
  fillBlanks: 0,
  slider: 0,
  matching: 0,
  validated: 0,
  correct: 0,
  errors: [],
  warnings: [],
  cannotValidate: []
};

// Funções de parsing para diferentes tipos de operações
const parsers = {
  // Subtração
  subtraction: [
    // "tinha X ... deu/gastou/desceram/vendidas Y"
    { 
      regex: /tinha\s*(?:R\$\s*)?(\d+).*?(?:gastou|deu|desceram|vendidas?)\s*(?:R\$\s*)?(\d+)/i,
      calc: (a, b) => a - b,
      name: 'subtração (tinha/deu)'
    },
    // "Calcule: X - Y"
    { 
      regex: /Calcule:\s*(\d+)\s*-\s*(\d+)/i,
      calc: (a, b) => a - b,
      name: 'subtração (calcule)'
    },
    // "Quanto é X - Y"
    { 
      regex: /Quanto\s+é\s+(\d+)\s*-\s*(\d+)/i,
      calc: (a, b) => a - b,
      name: 'subtração (quanto é)'
    },
    // "X - Y = ?"
    { 
      regex: /(\d+)\s*-\s*(\d+)\s*=\s*\?/i,
      calc: (a, b) => a - b,
      name: 'subtração (equação)'
    }
  ],
  
  // Adição
  addition: [
    // "tinha X ... ganhou/recebeu/comprou/chegaram Y"
    { 
      regex: /tinha\s*(?:R\$\s*)?(\d+).*?(?:ganhou|recebeu|comprou|chegaram|juntou)\s*(?:R\$\s*)?(\d+)/i,
      calc: (a, b) => a + b,
      name: 'adição (tinha/ganhou)'
    },
    // "Calcule: X + Y"
    { 
      regex: /Calcule:\s*(\d+)\s*\+\s*(\d+)/i,
      calc: (a, b) => a + b,
      name: 'adição (calcule)'
    },
    // "Quanto é X + Y"
    { 
      regex: /Quanto\s+é\s+(\d+)\s*\+\s*(\d+)/i,
      calc: (a, b) => a + b,
      name: 'adição (quanto é)'
    },
    // "X + Y = ?"
    { 
      regex: /(\d+)\s*\+\s*(\d+)\s*=\s*\?/i,
      calc: (a, b) => a + b,
      name: 'adição (equação)'
    },
    // "soma de X e Y"
    { 
      regex: /soma\s+de\s+(\d+)\s+e\s+(\d+)/i,
      calc: (a, b) => a + b,
      name: 'adição (soma de)'
    }
  ],
  
  // Multiplicação
  multiplication: [
    // "Calcule: X × Y" ou "X * Y" ou "X x Y"
    { 
      regex: /Calcule:\s*(\d+)\s*[×\*xX]\s*(\d+)/i,
      calc: (a, b) => a * b,
      name: 'multiplicação (calcule)'
    },
    // "Quanto é X × Y"
    { 
      regex: /Quanto\s+é\s+(\d+)\s*[×\*xX]\s*(\d+)/i,
      calc: (a, b) => a * b,
      name: 'multiplicação (quanto é)'
    },
    // "X × Y = ?"
    { 
      regex: /(\d+)\s*[×\*xX]\s*(\d+)\s*=\s*\?/i,
      calc: (a, b) => a * b,
      name: 'multiplicação (equação)'
    },
    // "comprou X ... cada um custa Y"
    { 
      regex: /(\d+)\s*(?:unidades?|pacotes?|caixas?|livros?|cadernos?|itens?).*?(?:R\$|custa|custam)\s*(\d+)/i,
      calc: (a, b) => a * b,
      name: 'multiplicação (compra)'
    },
    // "produto de X e Y"
    { 
      regex: /produto\s+de\s+(\d+)\s+e\s+(\d+)/i,
      calc: (a, b) => a * b,
      name: 'multiplicação (produto de)'
    }
  ],
  
  // Divisão
  division: [
    // "Calcule: X ÷ Y" ou "X / Y"
    { 
      regex: /Calcule:\s*(\d+)\s*[÷\/]\s*(\d+)/i,
      calc: (a, b) => Math.floor(a / b),
      name: 'divisão (calcule)'
    },
    // "Quanto é X ÷ Y"
    { 
      regex: /Quanto\s+é\s+(\d+)\s*[÷\/]\s*(\d+)/i,
      calc: (a, b) => Math.floor(a / b),
      name: 'divisão (quanto é)'
    },
    // "X ÷ Y = ?"
    { 
      regex: /(\d+)\s*[÷\/]\s*(\d+)\s*=\s*\?/i,
      calc: (a, b) => Math.floor(a / b),
      name: 'divisão (equação)'
    },
    // "dividir X ... Y pessoas/partes"
    { 
      regex: /(\d+).*?(?:dividir|repartir|distribuir).*?(\d+)/i,
      calc: (a, b) => Math.floor(a / b),
      name: 'divisão (dividir entre)'
    },
    // "X dividido por Y"
    { 
      regex: /(\d+)\s+dividido\s+por\s+(\d+)/i,
      calc: (a, b) => Math.floor(a / b),
      name: 'divisão (dividido por)'
    }
  ],
  
  // Porcentagem
  percentage: [
    // "X% de Y"
    { 
      regex: /(\d+)%\s*de\s*(?:R\$\s*)?(\d+)/i,
      calc: (a, b) => Math.round(a * b / 100),
      name: 'porcentagem (X% de Y)'
    },
    // "desconto de X% em Y"
    { 
      regex: /desconto\s*de\s*(\d+)%.*?(?:R\$\s*)?(\d+)/i,
      calc: (a, b) => Math.round(b - (a * b / 100)),
      name: 'porcentagem (desconto)'
    },
    // "aumento de X% em Y"
    { 
      regex: /aumento\s*de\s*(\d+)%.*?(?:R\$\s*)?(\d+)/i,
      calc: (a, b) => Math.round(b + (a * b / 100)),
      name: 'porcentagem (aumento)'
    }
  ]
};

// Função para extrair número de uma opção
function extractNumber(optText) {
  const str = String(optText);
  // Tentar extrair número (incluindo negativos e decimais)
  const match = str.match(/-?\d+(?:[.,]\d+)?/);
  if (match) {
    return parseFloat(match[0].replace(',', '.'));
  }
  return NaN;
}

// Função para tentar parsear e calcular resultado esperado
function parseAndCalculate(question) {
  for (const [category, patterns] of Object.entries(parsers)) {
    for (const pattern of patterns) {
      const match = question.match(pattern.regex);
      if (match) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        const result = pattern.calc(num1, num2);
        return {
          category,
          pattern: pattern.name,
          num1,
          num2,
          result,
          calculation: `${num1} ${category === 'addition' ? '+' : category === 'subtraction' ? '-' : category === 'multiplication' ? '×' : category === 'division' ? '÷' : '%'} ${num2} = ${result}`
        };
      }
    }
  }
  return null;
}

// Função para validar um exercício de múltipla escolha
function validateMultipleChoice(exercise) {
  const calc = parseAndCalculate(exercise.question);
  
  if (!calc) {
    return {
      status: 'cannot_validate',
      reason: 'Padrão de pergunta não reconhecido',
      exercise
    };
  }
  
  // Parse options
  let options;
  if (typeof exercise.options === 'string') {
    try {
      options = JSON.parse(exercise.options);
    } catch (e) {
      return {
        status: 'cannot_validate',
        reason: 'Erro ao parsear opções JSON',
        exercise
      };
    }
  } else if (Array.isArray(exercise.options)) {
    options = exercise.options;
  } else {
    return {
      status: 'cannot_validate',
      reason: 'Formato de opções inválido',
      exercise
    };
  }
  
  // Encontrar índice da resposta correta nas opções
  let correctIndex = -1;
  let optionValues = [];
  
  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    const optText = typeof opt === 'object' ? opt.text : opt;
    const optNum = extractNumber(optText);
    optionValues.push({ index: i, text: optText, value: optNum });
    
    if (Math.abs(optNum - calc.result) < 0.01) {
      correctIndex = i;
    }
  }
  
  if (correctIndex === -1) {
    return {
      status: 'error',
      reason: `Resposta correta (${calc.result}) não encontrada nas opções`,
      exercise,
      calc,
      options: optionValues
    };
  }
  
  // Verificar se correctAnswer está correto
  let currentAnswerIndex;
  if (typeof exercise.correctAnswer === 'string') {
    currentAnswerIndex = exercise.correctAnswer.charCodeAt(0) - 'a'.charCodeAt(0);
  } else {
    currentAnswerIndex = parseInt(exercise.correctAnswer);
  }
  
  const expectedAnswer = String.fromCharCode('a'.charCodeAt(0) + correctIndex);
  
  if (currentAnswerIndex !== correctIndex) {
    return {
      status: 'error',
      reason: `correctAnswer='${exercise.correctAnswer}' mas deveria ser '${expectedAnswer}'`,
      exercise,
      calc,
      options: optionValues,
      currentAnswer: exercise.correctAnswer,
      expectedAnswer
    };
  }
  
  return {
    status: 'correct',
    exercise,
    calc,
    options: optionValues,
    correctAnswer: exercise.correctAnswer
  };
}

// Processar todos os exercícios
let report = [];

for (const exercise of allExercises) {
  if (exercise.exerciseType === 'multiple_choice') {
    stats.multipleChoice++;
    const result = validateMultipleChoice(exercise);
    
    if (result.status === 'correct') {
      stats.validated++;
      stats.correct++;
    } else if (result.status === 'error') {
      stats.validated++;
      stats.errors.push(result);
    } else {
      stats.cannotValidate.push(result);
    }
    
    report.push(result);
  } else if (exercise.exerciseType === 'fill_blanks') {
    stats.fillBlanks++;
    // Fill blanks tem validação diferente - a resposta está no próprio exercício
    report.push({
      status: 'skipped',
      reason: 'Exercício de preencher lacunas - validação manual necessária',
      exercise
    });
  } else if (exercise.exerciseType === 'slider') {
    stats.slider++;
    report.push({
      status: 'skipped',
      reason: 'Exercício de slider - validação manual necessária',
      exercise
    });
  } else if (exercise.exerciseType === 'matching') {
    stats.matching++;
    report.push({
      status: 'skipped',
      reason: 'Exercício de correspondência - validação manual necessária',
      exercise
    });
  }
}

// Gerar relatório Markdown
let markdown = `# 📊 Relatório de Auditoria de Exercícios - Arquimedes

**Data da Auditoria:** ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}

**Versão do Sistema:** v2.45.0

---

## 📈 Resumo Executivo

| Métrica | Valor |
|---------|-------|
| **Total de Exercícios** | ${stats.total} |
| **Múltipla Escolha** | ${stats.multipleChoice} |
| **Preencher Lacunas** | ${stats.fillBlanks} |
| **Slider** | ${stats.slider} |
| **Correspondência** | ${stats.matching} |
| **Validados Automaticamente** | ${stats.validated} |
| **✅ Corretos** | ${stats.correct} |
| **❌ Com Erros** | ${stats.errors.length} |
| **⚠️ Não Validáveis** | ${stats.cannotValidate.length} |

### Taxa de Acerto
**${stats.validated > 0 ? ((stats.correct / stats.validated) * 100).toFixed(1) : 0}%** dos exercícios validados estão corretos.

---

## ✅ Exercícios Corretos (${stats.correct})

`;

// Listar exercícios corretos
const correctExercises = report.filter(r => r.status === 'correct');
for (const item of correctExercises) {
  const e = item.exercise;
  markdown += `### ${e.uniqueId || `ID-${e.id}`} - ${e.title || 'Sem título'}

**Pergunta:** ${e.question}

**Cálculo:** ${item.calc.calculation}

**Opções:**
${item.options.map((o, i) => `- ${String.fromCharCode('a'.charCodeAt(0) + i)}) ${o.text} ${i === (e.correctAnswer.charCodeAt(0) - 'a'.charCodeAt(0)) ? '✅' : ''}`).join('\n')}

**Resposta Correta:** ${e.correctAnswer.toUpperCase()}

**Status:** ✅ CORRETO

---

`;
}

// Listar erros
if (stats.errors.length > 0) {
  markdown += `## ❌ Exercícios com Erros (${stats.errors.length})

`;
  for (const item of stats.errors) {
    const e = item.exercise;
    markdown += `### ${e.uniqueId || `ID-${e.id}`} - ${e.title || 'Sem título'}

**Pergunta:** ${e.question}

**Cálculo Esperado:** ${item.calc?.calculation || 'N/A'}

**Opções:**
${item.options?.map((o, i) => `- ${String.fromCharCode('a'.charCodeAt(0) + i)}) ${o.text}`).join('\n') || 'N/A'}

**Problema:** ${item.reason}

**Resposta Atual:** ${item.currentAnswer || 'N/A'}
**Resposta Esperada:** ${item.expectedAnswer || 'N/A'}

**Status:** ❌ ERRO

---

`;
  }
}

// Listar não validáveis
if (stats.cannotValidate.length > 0) {
  markdown += `## ⚠️ Exercícios Não Validáveis Automaticamente (${stats.cannotValidate.length})

Estes exercícios têm formatos de pergunta que não foram reconhecidos pelo sistema de validação automática. Requerem revisão manual.

`;
  for (const item of stats.cannotValidate) {
    const e = item.exercise;
    markdown += `### ${e.uniqueId || `ID-${e.id}`}

**Pergunta:** ${e.question}

**Motivo:** ${item.reason}

---

`;
  }
}

// Conclusão
markdown += `## 🔒 Conclusão

`;

if (stats.errors.length === 0) {
  markdown += `### ✅ SISTEMA VALIDADO

Todos os **${stats.validated}** exercícios de múltipla escolha validáveis estão com as respostas corretas.

O sistema de exercícios do Arquimedes passou na auditoria completa.

`;
} else {
  markdown += `### ❌ ATENÇÃO: ERROS ENCONTRADOS

Foram encontrados **${stats.errors.length}** exercícios com respostas incorretas que precisam ser corrigidos.

`;
}

markdown += `### Metodologia de Validação

1. **Parsing da Pergunta:** Cada pergunta é analisada para identificar o tipo de operação matemática (adição, subtração, multiplicação, divisão, porcentagem).

2. **Cálculo do Resultado:** O resultado esperado é calculado matematicamente.

3. **Verificação das Opções:** O sistema verifica se o resultado calculado existe entre as opções disponíveis.

4. **Validação do correctAnswer:** O campo \`correctAnswer\` é comparado com o índice da opção que contém o resultado correto.

### Padrões Reconhecidos

| Operação | Padrões |
|----------|---------|
| Adição | "tinha X ganhou Y", "Calcule: X + Y", "Quanto é X + Y", "soma de X e Y" |
| Subtração | "tinha X gastou Y", "Calcule: X - Y", "Quanto é X - Y" |
| Multiplicação | "Calcule: X × Y", "Quanto é X × Y", "comprou X custam Y" |
| Divisão | "Calcule: X ÷ Y", "dividir X entre Y", "X dividido por Y" |
| Porcentagem | "X% de Y", "desconto de X%", "aumento de X%" |

---

**Relatório gerado automaticamente pelo sistema de auditoria do Arquimedes.**
`;

// Salvar relatório
fs.writeFileSync('/home/ubuntu/arquimedes/docs/AUDITORIA_EXERCICIOS.md', markdown);
console.log('Relatório salvo em: docs/AUDITORIA_EXERCICIOS.md');

// Imprimir resumo
console.log('\n=== RESUMO DA AUDITORIA ===');
console.log(`Total de exercícios: ${stats.total}`);
console.log(`Múltipla escolha: ${stats.multipleChoice}`);
console.log(`Validados: ${stats.validated}`);
console.log(`✅ Corretos: ${stats.correct}`);
console.log(`❌ Erros: ${stats.errors.length}`);
console.log(`⚠️ Não validáveis: ${stats.cannotValidate.length}`);

if (stats.errors.length > 0) {
  console.log('\n❌ ERROS ENCONTRADOS:');
  for (const err of stats.errors) {
    console.log(`  - ${err.exercise.uniqueId || err.exercise.id}: ${err.reason}`);
  }
}

await connection.end();

// Exit com código de erro se houver problemas
if (stats.errors.length > 0) {
  process.exit(1);
}
