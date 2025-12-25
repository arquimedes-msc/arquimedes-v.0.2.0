/**
 * Módulo de Validação de Exercícios - Arquimedes
 * 
 * Este módulo fornece funções para validar exercícios de múltipla escolha,
 * garantindo que a resposta correta esteja presente nas opções e que o
 * campo correctAnswer aponte para o índice correto.
 */

export interface ExerciseValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  calculatedResult?: number | string;
  expectedAnswerIndex?: number;
}

export interface MultipleChoiceExercise {
  question: string;
  options: string[] | { text: string }[];
  correctAnswer: string | number;
}

/**
 * Extrai um número de uma string, suportando formatos brasileiros e americanos
 */
export function extractNumber(str: string): number {
  const s = String(str);
  
  // Formato brasileiro com milhar: 1.234,56
  let match = s.match(/-?\d{1,3}(?:\.\d{3})*,\d+/);
  if (match) {
    return parseFloat(match[0].replace(/\./g, '').replace(',', '.'));
  }
  
  // Formato americano com milhar: 1,234.56
  match = s.match(/-?\d{1,3}(?:,\d{3})*\.\d+/);
  if (match) {
    return parseFloat(match[0].replace(/,/g, ''));
  }
  
  // Número inteiro com separador de milhar brasileiro: 1.234
  match = s.match(/-?\d{1,3}(?:\.\d{3})+(?![,\d])/);
  if (match) {
    return parseFloat(match[0].replace(/\./g, ''));
  }
  
  // Número decimal simples: 12,5 ou 12.5
  match = s.match(/-?\d+[,\.]\d+/);
  if (match) {
    return parseFloat(match[0].replace(',', '.'));
  }
  
  // Número inteiro simples
  match = s.match(/-?\d+/);
  if (match) {
    return parseFloat(match[0]);
  }
  
  return NaN;
}

/**
 * Tenta calcular o resultado esperado de uma pergunta matemática
 */
export function calculateExpectedResult(question: string): { result: number | null; operation: string | null } {
  const q = question.toLowerCase();
  
  // Adição com 3 números: X + Y + Z
  let match = question.match(/(\d+)\s*\+\s*(\d+)\s*\+\s*(\d+)/);
  if (match) {
    const result = parseInt(match[1]) + parseInt(match[2]) + parseInt(match[3]);
    return { result, operation: 'adição' };
  }
  
  // Adição simples: X + Y
  match = question.match(/(\d+(?:[,\.]\d+)?)\s*\+\s*(\d+(?:[,\.]\d+)?)/);
  if (match && !question.includes('-')) {
    const n1 = parseFloat(match[1].replace(',', '.'));
    const n2 = parseFloat(match[2].replace(',', '.'));
    return { result: n1 + n2, operation: 'adição' };
  }
  
  // Subtração: X - Y
  match = question.match(/(\d+(?:[,\.]\d+)?)\s*-\s*(\d+(?:[,\.]\d+)?)/);
  if (match) {
    const n1 = parseFloat(match[1].replace(',', '.'));
    const n2 = parseFloat(match[2].replace(',', '.'));
    return { result: n1 - n2, operation: 'subtração' };
  }
  
  // "tinha X gastou/deu Y"
  if ((q.includes('tinha') || q.includes('tem')) && 
      (q.includes('gastou') || q.includes('deu') || q.includes('desceram') || q.includes('vendidas'))) {
    const nums = question.match(/\d+(?:[,\.]\d+)?/g);
    if (nums && nums.length >= 2) {
      const n1 = parseFloat(nums[0].replace(',', '.'));
      const n2 = parseFloat(nums[1].replace(',', '.'));
      return { result: n1 - n2, operation: 'subtração' };
    }
  }
  
  // "tinha X ganhou/recebeu Y"
  if ((q.includes('tinha') || q.includes('tem')) && 
      (q.includes('ganhou') || q.includes('recebeu'))) {
    const nums = question.match(/\d+(?:[,\.]\d+)?/g);
    if (nums && nums.length >= 2) {
      const n1 = parseFloat(nums[0].replace(',', '.'));
      const n2 = parseFloat(nums[1].replace(',', '.'));
      return { result: n1 + n2, operation: 'adição' };
    }
  }
  
  // Multiplicação com 3 números: X × Y × Z
  match = question.match(/(\d+)\s*[×\*xX]\s*(\d+)\s*[×\*xX]\s*(\d+)/);
  if (match) {
    const result = parseInt(match[1]) * parseInt(match[2]) * parseInt(match[3]);
    return { result, operation: 'multiplicação' };
  }
  
  // Multiplicação simples: X × Y
  match = question.match(/(\d+(?:[,\.]\d+)?)\s*[×\*xX]\s*(\d+(?:[,\.]\d+)?)/);
  if (match) {
    const n1 = parseFloat(match[1].replace(',', '.'));
    const n2 = parseFloat(match[2].replace(',', '.'));
    return { result: n1 * n2, operation: 'multiplicação' };
  }
  
  // Divisão simples: X ÷ Y
  match = question.match(/(\d+(?:[,\.]\d+)?)\s*[÷\/]\s*(\d+(?:[,\.]\d+)?)/);
  if (match && !q.includes('resto')) {
    const n1 = parseFloat(match[1].replace(',', '.'));
    const n2 = parseFloat(match[2].replace(',', '.'));
    return { result: n1 / n2, operation: 'divisão' };
  }
  
  // Porcentagem: X% de Y
  match = question.match(/(\d+(?:[,\.]\d+)?)\s*%\s*de\s*(?:r\$\s*)?(\d+(?:[,\.]\d+)?)/i);
  if (match) {
    const percent = parseFloat(match[1].replace(',', '.'));
    const value = parseFloat(match[2].replace(',', '.'));
    return { result: percent * value / 100, operation: 'porcentagem' };
  }
  
  return { result: null, operation: null };
}

/**
 * Valida um exercício de múltipla escolha
 */
export function validateMultipleChoiceExercise(exercise: MultipleChoiceExercise): ExerciseValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validar que temos opções
  if (!exercise.options || !Array.isArray(exercise.options) || exercise.options.length === 0) {
    errors.push('Exercício não possui opções válidas');
    return { isValid: false, errors, warnings };
  }
  
  // Validar que temos correctAnswer
  if (exercise.correctAnswer === null || exercise.correctAnswer === undefined) {
    errors.push('Exercício não possui resposta correta definida');
    return { isValid: false, errors, warnings };
  }
  
  // Converter correctAnswer para índice
  let correctIndex: number;
  if (typeof exercise.correctAnswer === 'string') {
    if (exercise.correctAnswer.length === 1 && exercise.correctAnswer >= 'a' && exercise.correctAnswer <= 'd') {
      correctIndex = exercise.correctAnswer.charCodeAt(0) - 'a'.charCodeAt(0);
    } else {
      correctIndex = parseInt(exercise.correctAnswer);
    }
  } else {
    correctIndex = exercise.correctAnswer;
  }
  
  // Validar que o índice está dentro do range
  if (correctIndex < 0 || correctIndex >= exercise.options.length) {
    errors.push(`Índice da resposta correta (${correctIndex}) está fora do range de opções (0-${exercise.options.length - 1})`);
    return { isValid: false, errors, warnings };
  }
  
  // Tentar calcular resultado esperado
  const { result: calculatedResult, operation } = calculateExpectedResult(exercise.question);
  
  if (calculatedResult !== null) {
    // Verificar se o resultado calculado está nas opções
    let foundIndex = -1;
    for (let i = 0; i < exercise.options.length; i++) {
      const opt = exercise.options[i];
      const optText = typeof opt === 'object' ? opt.text : opt;
      const optNum = extractNumber(optText);
      
      if (Math.abs(optNum - calculatedResult) < 0.01) {
        foundIndex = i;
        break;
      }
    }
    
    if (foundIndex === -1) {
      warnings.push(`Resultado calculado (${calculatedResult}) não encontrado nas opções - pode ser exercício especial`);
    } else if (foundIndex !== correctIndex) {
      errors.push(`Resposta correta deveria ser '${String.fromCharCode('a'.charCodeAt(0) + foundIndex)}' (índice ${foundIndex}) mas está marcada como '${String.fromCharCode('a'.charCodeAt(0) + correctIndex)}' (índice ${correctIndex})`);
      return { 
        isValid: false, 
        errors, 
        warnings, 
        calculatedResult, 
        expectedAnswerIndex: foundIndex 
      };
    }
    
    return { 
      isValid: errors.length === 0, 
      errors, 
      warnings, 
      calculatedResult, 
      expectedAnswerIndex: foundIndex 
    };
  }
  
  // Se não conseguimos calcular, assumimos que está correto mas adicionamos warning
  warnings.push('Não foi possível validar automaticamente - padrão de pergunta não reconhecido');
  
  return { isValid: true, errors, warnings };
}

/**
 * Valida um lote de exercícios e retorna estatísticas
 */
export function validateExerciseBatch(exercises: MultipleChoiceExercise[]): {
  total: number;
  valid: number;
  invalid: number;
  warnings: number;
  results: { exercise: MultipleChoiceExercise; validation: ExerciseValidationResult }[];
} {
  const results = exercises.map(exercise => ({
    exercise,
    validation: validateMultipleChoiceExercise(exercise)
  }));
  
  return {
    total: exercises.length,
    valid: results.filter(r => r.validation.isValid).length,
    invalid: results.filter(r => !r.validation.isValid).length,
    warnings: results.filter(r => r.validation.warnings.length > 0).length,
    results
  };
}
