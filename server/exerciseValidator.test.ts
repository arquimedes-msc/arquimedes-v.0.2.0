import { describe, it, expect, beforeAll } from 'vitest';
import { 
  extractNumber, 
  calculateExpectedResult, 
  validateMultipleChoiceExercise,
  validateExerciseBatch 
} from './exerciseValidator';

describe('extractNumber', () => {
  it('deve extrair número inteiro simples', () => {
    expect(extractNumber('42')).toBe(42);
    expect(extractNumber('100 figurinhas')).toBe(100);
    expect(extractNumber('R$ 250')).toBe(250);
  });

  it('deve extrair número decimal com vírgula (formato brasileiro)', () => {
    expect(extractNumber('12,5')).toBe(12.5);
    expect(extractNumber('R$ 262,50')).toBe(262.5);
  });

  it('deve extrair número decimal com ponto', () => {
    expect(extractNumber('12.5')).toBe(12.5);
    expect(extractNumber('4.5')).toBe(4.5);
  });

  it('deve extrair número com separador de milhar brasileiro', () => {
    // Nota: Números com ponto são interpretados como decimais por segurança
    // Para milhares, o contexto do exercício deve ser usado
    expect(extractNumber('8.675')).toBe(8.675);
    expect(extractNumber('1.234')).toBe(1.234);
  });

  it('deve extrair número negativo', () => {
    expect(extractNumber('-5')).toBe(-5);
    expect(extractNumber('-12,5')).toBe(-12.5);
  });

  it('deve retornar NaN para strings sem números', () => {
    expect(extractNumber('sem número')).toBeNaN();
    expect(extractNumber('')).toBeNaN();
  });
});

describe('calculateExpectedResult', () => {
  describe('Adição', () => {
    it('deve calcular adição simples: X + Y', () => {
      const result = calculateExpectedResult('Quanto é 25 + 17?');
      expect(result.result).toBe(42);
      expect(result.operation).toBe('adição');
    });

    it('deve calcular adição com 3 números: X + Y + Z', () => {
      const result = calculateExpectedResult('Calcule: 25 + 25 + 25');
      expect(result.result).toBe(75);
      expect(result.operation).toBe('adição');
    });

    it('deve calcular "tinha X ganhou Y"', () => {
      const result = calculateExpectedResult('Maria tinha 50 figurinhas e ganhou 30. Quantas tem agora?');
      expect(result.result).toBe(80);
      expect(result.operation).toBe('adição');
    });
  });

  describe('Subtração', () => {
    it('deve calcular subtração simples: X - Y', () => {
      const result = calculateExpectedResult('Quanto é 195 - 35?');
      expect(result.result).toBe(160);
      expect(result.operation).toBe('subtração');
    });

    it('deve calcular "tinha X gastou Y"', () => {
      const result = calculateExpectedResult('Maria tinha 195 figurinhas e deu 35 para sua amiga. Quantas ficaram?');
      expect(result.result).toBe(160);
      expect(result.operation).toBe('subtração');
    });

    it('deve calcular "tinha X desceram Y"', () => {
      const result = calculateExpectedResult('Um ônibus tinha 194 passageiros. Desceram 48. Quantos ficaram?');
      expect(result.result).toBe(146);
      expect(result.operation).toBe('subtração');
    });
  });

  describe('Multiplicação', () => {
    it('deve calcular multiplicação simples: X × Y', () => {
      const result = calculateExpectedResult('Quanto é 12 × 8?');
      expect(result.result).toBe(96);
      expect(result.operation).toBe('multiplicação');
    });

    it('deve calcular multiplicação com 3 números: X × Y × Z', () => {
      const result = calculateExpectedResult('Calcule: 5 × 6 × 4');
      expect(result.result).toBe(120);
      expect(result.operation).toBe('multiplicação');
    });
  });

  describe('Divisão', () => {
    it('deve calcular divisão simples: X ÷ Y', () => {
      const result = calculateExpectedResult('Quanto é 450 ÷ 100?');
      expect(result.result).toBe(4.5);
      expect(result.operation).toBe('divisão');
    });

    it('deve calcular divisão com barra: X / Y', () => {
      const result = calculateExpectedResult('Calcule: 100 / 4');
      expect(result.result).toBe(25);
      expect(result.operation).toBe('divisão');
    });
  });

  describe('Porcentagem', () => {
    it('deve calcular X% de Y', () => {
      const result = calculateExpectedResult('Quanto é 20% de 150?');
      expect(result.result).toBe(30);
      expect(result.operation).toBe('porcentagem');
    });

    it('deve calcular porcentagem com R$', () => {
      const result = calculateExpectedResult('Calcule 10% de R$ 500');
      expect(result.result).toBe(50);
      expect(result.operation).toBe('porcentagem');
    });
  });

  it('deve retornar null para padrões não reconhecidos', () => {
    const result = calculateExpectedResult('Qual é a capital do Brasil?');
    expect(result.result).toBeNull();
    expect(result.operation).toBeNull();
  });
});

describe('validateMultipleChoiceExercise', () => {
  it('deve validar exercício correto de subtração', () => {
    const exercise = {
      question: 'Maria tinha 195 figurinhas e deu 35 para sua amiga. Quantas ficaram?',
      options: ['160 figurinhas', '150 figurinhas', '180 figurinhas', '174 figurinhas'],
      correctAnswer: 'a'
    };
    
    const result = validateMultipleChoiceExercise(exercise);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.calculatedResult).toBe(160);
  });

  it('deve detectar resposta correta no índice errado', () => {
    const exercise = {
      question: 'Quanto é 100 - 30?',
      options: ['80', '70', '60', '90'],
      correctAnswer: 'a' // Errado! Deveria ser 'b' (70)
    };
    
    const result = validateMultipleChoiceExercise(exercise);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.expectedAnswerIndex).toBe(1); // índice de '70'
  });

  it('deve validar exercício com correctAnswer numérico', () => {
    const exercise = {
      question: 'Quanto é 50 + 25?',
      options: ['75', '65', '85', '70'],
      correctAnswer: 0
    };
    
    const result = validateMultipleChoiceExercise(exercise);
    expect(result.isValid).toBe(true);
  });

  it('deve reportar erro quando não há opções', () => {
    const exercise = {
      question: 'Quanto é 10 + 5?',
      options: [],
      correctAnswer: 'a'
    };
    
    const result = validateMultipleChoiceExercise(exercise);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Exercício não possui opções válidas');
  });

  it('deve reportar erro quando índice está fora do range', () => {
    const exercise = {
      question: 'Quanto é 10 + 5?',
      options: ['15', '20'],
      correctAnswer: 'e' // índice 4, mas só tem 2 opções
    };
    
    const result = validateMultipleChoiceExercise(exercise);
    expect(result.isValid).toBe(false);
  });

  it('deve adicionar warning para padrões não reconhecidos', () => {
    const exercise = {
      question: 'Qual é a capital do Brasil?', // Não é matemática
      options: ['Brasília', 'São Paulo', 'Rio de Janeiro', 'Salvador'],
      correctAnswer: 'a'
    };
    
    const result = validateMultipleChoiceExercise(exercise);
    expect(result.isValid).toBe(true); // Assume correto
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

describe('validateExerciseBatch', () => {
  it('deve validar lote de exercícios e retornar estatísticas', () => {
    const exercises = [
      {
        question: 'Quanto é 10 + 5?',
        options: ['15', '20', '10', '25'],
        correctAnswer: 'a'
      },
      {
        question: 'Quanto é 20 - 8?',
        options: ['10', '12', '14', '16'],
        correctAnswer: 'b'
      },
      {
        question: 'Quanto é 5 × 6?',
        options: ['25', '30', '35', '40'],
        correctAnswer: 'a' // Errado! Deveria ser 'b'
      }
    ];
    
    const result = validateExerciseBatch(exercises);
    
    expect(result.total).toBe(3);
    expect(result.valid).toBe(2);
    expect(result.invalid).toBe(1);
  });
});

// Testes de integração com exercícios reais do banco
describe('Validação de Exercícios Reais', () => {
  // Exercícios que foram corrigidos durante a auditoria
  const realExercises = [
    {
      id: 'EX-90002-016',
      question: 'Maria tinha 195 figurinhas e deu 35 para sua amiga. Quantas ficaram?',
      options: ['160 figurinhas', '150 figurinhas', '180 figurinhas', '174 figurinhas'],
      correctAnswer: 'a',
      expectedResult: 160
    },
    {
      id: 'EX-90002-015',
      question: 'Maria tinha 99 figurinhas e deu 81 para sua amiga. Quantas ficaram?',
      options: ['18 figurinhas', '6 figurinhas', '48 figurinhas', '30 figurinhas'],
      correctAnswer: 'a',
      expectedResult: 18
    },
    {
      id: 'EX-90002-014',
      question: 'Maria tinha 58 figurinhas e deu 46 para sua amiga. Quantas ficaram?',
      options: ['-3 figurinhas', '32 figurinhas', '12 figurinhas', '21 figurinhas'],
      correctAnswer: 'c',
      expectedResult: 12
    },
    {
      id: 'EX-90002-013',
      question: 'Um ônibus tinha 194 passageiros. Desceram 48. Quantos ficaram?',
      options: ['146 passageiros', '137 passageiros', '167 passageiros', '154 passageiros'],
      correctAnswer: 'a',
      expectedResult: 146
    }
  ];

  realExercises.forEach(ex => {
    it(`deve validar ${ex.id}: ${ex.question.substring(0, 50)}...`, () => {
      const result = validateMultipleChoiceExercise({
        question: ex.question,
        options: ex.options,
        correctAnswer: ex.correctAnswer
      });
      
      expect(result.isValid).toBe(true);
      expect(result.calculatedResult).toBe(ex.expectedResult);
    });
  });
});
