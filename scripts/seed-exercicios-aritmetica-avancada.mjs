/**
 * Script para inserir 90 exercícios de Aritmética Avançada
 * 18 exercícios por módulo (5 módulos × 18 = 90)
 */

import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('📝 Inserindo exercícios de Aritmética Avançada...\n');

// Buscar IDs das páginas
const [pages] = await conn.execute(`
  SELECT p.id, p.title, p.slug, m.name as moduleName, m.id as moduleId
  FROM pages p
  JOIN modules m ON p.moduleId = m.id
  WHERE m.disciplineId = 120001
  ORDER BY m.\`order\`, p.\`order\`
`);

console.log(`Encontradas ${pages.length} páginas\n`);

// Mapear páginas por slug
const pageMap = {};
pages.forEach(p => {
  pageMap[p.slug] = p.id;
});

// Exercícios organizados por página
const exercisesData = [
  // ========================================
  // MÓDULO 1: Sistemas de Numeração (18 exercícios)
  // ========================================
  
  // Página: Sistema Decimal e Posicional (5 exercícios)
  {
    pageSlug: 'sistema-decimal-posicional',
    exercises: [
      {
        type: 'multiple_choice',
        question: 'Qual é o valor do algarismo 7 no número 3.745?',
        options: [
          { id: 'a', text: '7' },
          { id: 'b', text: '70' },
          { id: 'c', text: '700' },
          { id: 'd', text: '7.000' }
        ],
        expectedAnswer: 'c',
        hints: ['O 7 está na posição das centenas']
      },
      {
        type: 'simple_input',
        question: 'Decomponha o número 2.506 como soma de potências de 10. Qual é o resultado de 2×10³ + 5×10² + 0×10¹ + 6×10⁰?',
        expectedAnswer: '2506',
        alternativeAnswers: ['2.506'],
        hints: ['2×1000 + 5×100 + 0×10 + 6×1']
      },
      {
        type: 'multiple_choice',
        question: 'No sistema decimal, qual é a base utilizada?',
        options: [
          { id: 'a', text: '2' },
          { id: 'b', text: '8' },
          { id: 'c', text: '10' },
          { id: 'd', text: '16' }
        ],
        expectedAnswer: 'c',
        hints: ['Decimal vem de "dez"']
      },
      {
        type: 'simple_input',
        question: 'Quantos zeros tem o número 10⁵?',
        expectedAnswer: '5',
        hints: ['10⁵ = 100.000']
      },
      {
        type: 'multiple_choice',
        question: 'Qual é a importância do zero no sistema posicional?',
        options: [
          { id: 'a', text: 'Não tem importância' },
          { id: 'b', text: 'Serve como marcador de posição' },
          { id: 'c', text: 'Representa números negativos' },
          { id: 'd', text: 'Indica divisão' }
        ],
        expectedAnswer: 'b',
        hints: ['Sem o zero, não distinguiríamos 35 de 305']
      }
    ]
  },
  
  // Página: Sistema Binário (5 exercícios)
  {
    pageSlug: 'sistema-binario',
    exercises: [
      {
        type: 'simple_input',
        question: 'Converta o número binário 1101 para decimal.',
        expectedAnswer: '13',
        hints: ['1×8 + 1×4 + 0×2 + 1×1']
      },
      {
        type: 'simple_input',
        question: 'Converta o número decimal 25 para binário.',
        expectedAnswer: '11001',
        hints: ['Divida por 2 sucessivamente e leia os restos de baixo para cima']
      },
      {
        type: 'multiple_choice',
        question: 'Quantos valores diferentes podemos representar com 8 bits?',
        options: [
          { id: 'a', text: '8' },
          { id: 'b', text: '16' },
          { id: 'c', text: '128' },
          { id: 'd', text: '256' }
        ],
        expectedAnswer: 'd',
        hints: ['2⁸ = 256']
      },
      {
        type: 'simple_input',
        question: 'Qual é o próximo número binário após 1111?',
        expectedAnswer: '10000',
        hints: ['1111 + 1 = ?']
      },
      {
        type: 'multiple_choice',
        question: 'Por que os computadores usam o sistema binário?',
        options: [
          { id: 'a', text: 'Porque é mais fácil para humanos' },
          { id: 'b', text: 'Porque os circuitos têm dois estados: ligado e desligado' },
          { id: 'c', text: 'Porque usa menos dígitos' },
          { id: 'd', text: 'Porque foi inventado primeiro' }
        ],
        expectedAnswer: 'b',
        hints: ['Pense em como funcionam os circuitos eletrônicos']
      }
    ]
  },
  
  // Página: Sistema Hexadecimal (4 exercícios)
  {
    pageSlug: 'sistema-hexadecimal',
    exercises: [
      {
        type: 'simple_input',
        question: 'Converta o número hexadecimal 2A para decimal.',
        expectedAnswer: '42',
        hints: ['2×16 + A×1 = 2×16 + 10×1']
      },
      {
        type: 'simple_input',
        question: 'Converta o número decimal 255 para hexadecimal.',
        expectedAnswer: 'FF',
        alternativeAnswers: ['ff'],
        hints: ['255 = 15×16 + 15']
      },
      {
        type: 'multiple_choice',
        question: 'Qual cor RGB corresponde ao código #FF0000?',
        options: [
          { id: 'a', text: 'Azul' },
          { id: 'b', text: 'Verde' },
          { id: 'c', text: 'Vermelho' },
          { id: 'd', text: 'Amarelo' }
        ],
        expectedAnswer: 'c',
        hints: ['#RRGGBB - o primeiro par representa vermelho']
      },
      {
        type: 'simple_input',
        question: 'Converta o binário 11110000 para hexadecimal.',
        expectedAnswer: 'F0',
        alternativeAnswers: ['f0'],
        hints: ['Agrupe de 4 em 4: 1111 0000 = F 0']
      }
    ]
  },
  
  // Página: Conversão entre Sistemas (4 exercícios)
  {
    pageSlug: 'conversao-sistemas',
    exercises: [
      {
        type: 'simple_input',
        question: 'Converta 100 decimal para binário.',
        expectedAnswer: '1100100',
        hints: ['Divida por 2 sucessivamente']
      },
      {
        type: 'simple_input',
        question: 'Converta 10101010 binário para hexadecimal.',
        expectedAnswer: 'AA',
        alternativeAnswers: ['aa'],
        hints: ['1010 1010 = A A']
      },
      {
        type: 'multiple_choice',
        question: 'Qual é o valor de 1 byte em bits?',
        options: [
          { id: 'a', text: '4 bits' },
          { id: 'b', text: '8 bits' },
          { id: 'c', text: '16 bits' },
          { id: 'd', text: '32 bits' }
        ],
        expectedAnswer: 'b',
        hints: ['1 byte = 8 bits']
      },
      {
        type: 'simple_input',
        question: 'Converta o hexadecimal 1F para decimal.',
        expectedAnswer: '31',
        hints: ['1×16 + F×1 = 16 + 15']
      }
    ]
  },

  // ========================================
  // MÓDULO 2: Divisibilidade e Números Primos (18 exercícios)
  // ========================================
  
  // Página: Critérios de Divisibilidade (4 exercícios)
  {
    pageSlug: 'criterios-divisibilidade',
    exercises: [
      {
        type: 'multiple_choice',
        question: 'O número 2.340 é divisível por quais números?',
        options: [
          { id: 'a', text: '2, 3, 5 e 9' },
          { id: 'b', text: '2, 3, 4, 5, 6, 9 e 10' },
          { id: 'c', text: 'Apenas 2 e 5' },
          { id: 'd', text: '2, 3, 5, 6 e 10' }
        ],
        expectedAnswer: 'b',
        hints: ['Verifique cada critério: termina em 0, soma dos dígitos = 9']
      },
      {
        type: 'simple_input',
        question: 'Qual é a soma dos algarismos de 12.345? O número é divisível por 3?',
        expectedAnswer: '15',
        hints: ['1+2+3+4+5 = ?']
      },
      {
        type: 'multiple_choice',
        question: 'Para um número ser divisível por 6, ele deve ser divisível por:',
        options: [
          { id: 'a', text: '2 e 3' },
          { id: 'b', text: '2 e 4' },
          { id: 'c', text: '3 e 4' },
          { id: 'd', text: '1 e 6' }
        ],
        expectedAnswer: 'a',
        hints: ['6 = 2 × 3']
      },
      {
        type: 'simple_input',
        question: 'O número 1.234 é divisível por 4? Responda SIM ou NAO.',
        expectedAnswer: 'NAO',
        alternativeAnswers: ['NÃO', 'Não', 'nao', 'não'],
        hints: ['Verifique os dois últimos algarismos: 34 ÷ 4 = ?']
      }
    ]
  },
  
  // Página: Números Primos e Compostos (4 exercícios)
  {
    pageSlug: 'numeros-primos-compostos',
    exercises: [
      {
        type: 'multiple_choice',
        question: 'Qual dos números abaixo é primo?',
        options: [
          { id: 'a', text: '51' },
          { id: 'b', text: '53' },
          { id: 'c', text: '55' },
          { id: 'd', text: '57' }
        ],
        expectedAnswer: 'b',
        hints: ['Teste divisibilidade por primos até √n']
      },
      {
        type: 'simple_input',
        question: 'Quantos números primos existem entre 1 e 10?',
        expectedAnswer: '4',
        hints: ['2, 3, 5, 7']
      },
      {
        type: 'multiple_choice',
        question: 'O número 1 é:',
        options: [
          { id: 'a', text: 'Primo' },
          { id: 'b', text: 'Composto' },
          { id: 'c', text: 'Nem primo nem composto' },
          { id: 'd', text: 'Par' }
        ],
        expectedAnswer: 'c',
        hints: ['O 1 tem apenas um divisor']
      },
      {
        type: 'simple_input',
        question: 'Qual é o único número primo par?',
        expectedAnswer: '2',
        hints: ['Todos os outros pares são divisíveis por 2']
      }
    ]
  },
  
  // Página: Fatoração em Primos (4 exercícios)
  {
    pageSlug: 'fatoracao-primos',
    exercises: [
      {
        type: 'simple_input',
        question: 'Fatore 72 em primos. Qual é o expoente de 2?',
        expectedAnswer: '3',
        hints: ['72 = 2³ × 3²']
      },
      {
        type: 'multiple_choice',
        question: 'Qual é a fatoração de 100?',
        options: [
          { id: 'a', text: '2² × 5²' },
          { id: 'b', text: '2 × 50' },
          { id: 'c', text: '4 × 25' },
          { id: 'd', text: '10²' }
        ],
        expectedAnswer: 'a',
        hints: ['100 = 4 × 25 = 2² × 5²']
      },
      {
        type: 'simple_input',
        question: 'Quantos divisores tem o número 36?',
        expectedAnswer: '9',
        hints: ['36 = 2² × 3². Divisores = (2+1) × (2+1)']
      },
      {
        type: 'simple_input',
        question: 'Fatore 180 em primos. Escreva como 2^a × 3^b × 5^c. Qual é o valor de a+b+c?',
        expectedAnswer: '5',
        hints: ['180 = 2² × 3² × 5¹, então a=2, b=2, c=1']
      }
    ]
  },
  
  // Página: MDC e MMC Avançados (3 exercícios)
  {
    pageSlug: 'mdc-mmc-avancados',
    exercises: [
      {
        type: 'simple_input',
        question: 'Calcule o MDC(48, 60).',
        expectedAnswer: '12',
        hints: ['48 = 2⁴×3, 60 = 2²×3×5. MDC = primos comuns com menores expoentes']
      },
      {
        type: 'simple_input',
        question: 'Calcule o MMC(12, 18).',
        expectedAnswer: '36',
        hints: ['12 = 2²×3, 18 = 2×3². MMC = todos os primos com maiores expoentes']
      },
      {
        type: 'multiple_choice',
        question: 'Se MDC(a,b) = 6 e a×b = 180, qual é o MMC(a,b)?',
        options: [
          { id: 'a', text: '18' },
          { id: 'b', text: '30' },
          { id: 'c', text: '36' },
          { id: 'd', text: '60' }
        ],
        expectedAnswer: 'b',
        hints: ['a × b = MDC × MMC, então MMC = 180 ÷ 6']
      }
    ]
  },
  
  // Página: Aplicações Práticas (3 exercícios)
  {
    pageSlug: 'aplicacoes-divisibilidade',
    exercises: [
      {
        type: 'simple_input',
        question: 'Uma escola tem 120 meninos e 150 meninas. Qual o maior número de grupos iguais que podem ser formados?',
        expectedAnswer: '30',
        hints: ['MDC(120, 150)']
      },
      {
        type: 'simple_input',
        question: 'Dois ônibus partem juntos. Um passa a cada 15 min e outro a cada 20 min. Em quantos minutos estarão juntos novamente?',
        expectedAnswer: '60',
        hints: ['MMC(15, 20)']
      },
      {
        type: 'multiple_choice',
        question: 'Para cortar um retângulo de 24cm × 36cm em quadrados iguais (maiores possíveis), qual deve ser o lado?',
        options: [
          { id: 'a', text: '6 cm' },
          { id: 'b', text: '8 cm' },
          { id: 'c', text: '12 cm' },
          { id: 'd', text: '18 cm' }
        ],
        expectedAnswer: 'c',
        hints: ['MDC(24, 36)']
      }
    ]
  },

  // ========================================
  // MÓDULO 3: Progressões (18 exercícios)
  // ========================================
  
  // Página: Progressão Aritmética (5 exercícios)
  {
    pageSlug: 'progressao-aritmetica',
    exercises: [
      {
        type: 'simple_input',
        question: 'Na PA (3, 7, 11, 15, ...), qual é a razão?',
        expectedAnswer: '4',
        hints: ['r = a₂ - a₁']
      },
      {
        type: 'simple_input',
        question: 'Na PA (2, 5, 8, ...), qual é o 10º termo?',
        expectedAnswer: '29',
        hints: ['a₁₀ = 2 + (10-1) × 3']
      },
      {
        type: 'multiple_choice',
        question: 'Uma PA tem a₁ = 5 e r = -2. Ela é:',
        options: [
          { id: 'a', text: 'Crescente' },
          { id: 'b', text: 'Decrescente' },
          { id: 'c', text: 'Constante' },
          { id: 'd', text: 'Alternada' }
        ],
        expectedAnswer: 'b',
        hints: ['Se r < 0, a PA é decrescente']
      },
      {
        type: 'simple_input',
        question: 'Quantos termos tem a PA (5, 8, 11, ..., 50)?',
        expectedAnswer: '16',
        hints: ['50 = 5 + (n-1) × 3']
      },
      {
        type: 'simple_input',
        question: 'O 5º termo de uma PA é 17 e a razão é 3. Qual é o primeiro termo?',
        expectedAnswer: '5',
        hints: ['a₅ = a₁ + 4r, então 17 = a₁ + 12']
      }
    ]
  },
  
  // Página: Soma de PA (4 exercícios)
  {
    pageSlug: 'soma-pa',
    exercises: [
      {
        type: 'simple_input',
        question: 'Calcule a soma dos 10 primeiros termos da PA (1, 3, 5, 7, ...).',
        expectedAnswer: '100',
        hints: ['Soma dos n primeiros ímpares = n²']
      },
      {
        type: 'simple_input',
        question: 'Calcule a soma: 1 + 2 + 3 + ... + 100.',
        expectedAnswer: '5050',
        hints: ['S = (1 + 100) × 100 / 2']
      },
      {
        type: 'multiple_choice',
        question: 'A soma dos 5 primeiros termos de uma PA é 35 e o primeiro termo é 3. Qual é a razão?',
        options: [
          { id: 'a', text: '2' },
          { id: 'b', text: '3' },
          { id: 'c', text: '4' },
          { id: 'd', text: '5' }
        ],
        expectedAnswer: 'b',
        hints: ['S₅ = 5 × [2×3 + 4r] / 2 = 35']
      },
      {
        type: 'simple_input',
        question: 'Qual é a soma dos números pares de 2 a 20?',
        expectedAnswer: '110',
        hints: ['PA: 2, 4, 6, ..., 20. São 10 termos.']
      }
    ]
  },
  
  // Página: Progressão Geométrica (5 exercícios)
  {
    pageSlug: 'progressao-geometrica',
    exercises: [
      {
        type: 'simple_input',
        question: 'Na PG (2, 6, 18, 54, ...), qual é a razão?',
        expectedAnswer: '3',
        hints: ['q = a₂ / a₁']
      },
      {
        type: 'simple_input',
        question: 'Na PG (3, 6, 12, ...), qual é o 7º termo?',
        expectedAnswer: '192',
        hints: ['a₇ = 3 × 2⁶']
      },
      {
        type: 'multiple_choice',
        question: 'Uma PG tem a₁ = 100 e q = 0,5. Ela é:',
        options: [
          { id: 'a', text: 'Crescente' },
          { id: 'b', text: 'Decrescente' },
          { id: 'c', text: 'Constante' },
          { id: 'd', text: 'Alternada' }
        ],
        expectedAnswer: 'b',
        hints: ['Se 0 < q < 1 e a₁ > 0, a PG é decrescente']
      },
      {
        type: 'simple_input',
        question: 'O 3º termo de uma PG é 12 e o 5º termo é 48. Qual é a razão?',
        expectedAnswer: '2',
        hints: ['a₅/a₃ = q², então 48/12 = q²']
      },
      {
        type: 'simple_input',
        question: 'Uma população de bactérias dobra a cada hora. Se há 100 bactérias inicialmente, quantas haverá após 5 horas?',
        expectedAnswer: '3200',
        hints: ['100 × 2⁵']
      }
    ]
  },
  
  // Página: Soma de PG (4 exercícios)
  {
    pageSlug: 'soma-pg',
    exercises: [
      {
        type: 'simple_input',
        question: 'Calcule a soma dos 5 primeiros termos da PG (1, 2, 4, 8, ...).',
        expectedAnswer: '31',
        hints: ['S₅ = 1 × (2⁵ - 1) / (2 - 1)']
      },
      {
        type: 'simple_input',
        question: 'Calcule a soma da PG infinita (8, 4, 2, 1, ...).',
        expectedAnswer: '16',
        hints: ['S∞ = a₁ / (1 - q) = 8 / 0,5']
      },
      {
        type: 'multiple_choice',
        question: 'Para que a soma de uma PG infinita exista, a razão deve:',
        options: [
          { id: 'a', text: 'Ser maior que 1' },
          { id: 'b', text: 'Ser igual a 1' },
          { id: 'c', text: 'Estar entre -1 e 1 (exclusive)' },
          { id: 'd', text: 'Ser negativa' }
        ],
        expectedAnswer: 'c',
        hints: ['|q| < 1']
      },
      {
        type: 'simple_input',
        question: 'Calcule: 1 + 3 + 9 + 27 + 81.',
        expectedAnswer: '121',
        hints: ['PG com a₁=1, q=3, n=5']
      }
    ]
  },

  // ========================================
  // MÓDULO 4: Análise Combinatória (18 exercícios)
  // ========================================
  
  // Página: Princípio Fundamental da Contagem (5 exercícios)
  {
    pageSlug: 'principio-fundamental-contagem',
    exercises: [
      {
        type: 'simple_input',
        question: 'Um restaurante oferece 3 entradas, 4 pratos principais e 2 sobremesas. Quantas refeições diferentes são possíveis?',
        expectedAnswer: '24',
        hints: ['3 × 4 × 2']
      },
      {
        type: 'simple_input',
        question: 'Quantas senhas de 4 dígitos (0-9) são possíveis, podendo repetir?',
        expectedAnswer: '10000',
        hints: ['10⁴']
      },
      {
        type: 'simple_input',
        question: 'Quantas senhas de 4 dígitos (0-9) são possíveis, sem repetir?',
        expectedAnswer: '5040',
        hints: ['10 × 9 × 8 × 7']
      },
      {
        type: 'multiple_choice',
        question: 'João tem 5 camisas e 3 calças. De quantas maneiras pode se vestir?',
        options: [
          { id: 'a', text: '8' },
          { id: 'b', text: '15' },
          { id: 'c', text: '35' },
          { id: 'd', text: '125' }
        ],
        expectedAnswer: 'b',
        hints: ['5 × 3']
      },
      {
        type: 'simple_input',
        question: 'Quantos resultados diferentes são possíveis ao lançar 3 moedas?',
        expectedAnswer: '8',
        hints: ['2³']
      }
    ]
  },
  
  // Página: Permutações (5 exercícios)
  {
    pageSlug: 'permutacoes',
    exercises: [
      {
        type: 'simple_input',
        question: 'De quantas maneiras 5 pessoas podem formar uma fila?',
        expectedAnswer: '120',
        hints: ['5!']
      },
      {
        type: 'simple_input',
        question: 'Quantos anagramas tem a palavra AMOR?',
        expectedAnswer: '24',
        hints: ['4 letras distintas: 4!']
      },
      {
        type: 'simple_input',
        question: 'Quantos anagramas tem a palavra BANANA?',
        expectedAnswer: '60',
        hints: ['6! / (3! × 2!)']
      },
      {
        type: 'multiple_choice',
        question: 'De quantas maneiras 6 pessoas podem sentar em uma mesa circular?',
        options: [
          { id: 'a', text: '6' },
          { id: 'b', text: '120' },
          { id: 'c', text: '720' },
          { id: 'd', text: '5040' }
        ],
        expectedAnswer: 'b',
        hints: ['Permutação circular: (n-1)! = 5!']
      },
      {
        type: 'simple_input',
        question: 'Qual é o valor de 6!?',
        expectedAnswer: '720',
        hints: ['6 × 5 × 4 × 3 × 2 × 1']
      }
    ]
  },
  
  // Página: Arranjos (4 exercícios)
  {
    pageSlug: 'arranjos',
    exercises: [
      {
        type: 'simple_input',
        question: 'Calcule A(5,3).',
        expectedAnswer: '60',
        hints: ['5 × 4 × 3']
      },
      {
        type: 'simple_input',
        question: 'Em uma corrida com 10 atletas, de quantas maneiras o pódio (1º, 2º, 3º) pode ser formado?',
        expectedAnswer: '720',
        hints: ['A(10,3) = 10 × 9 × 8']
      },
      {
        type: 'multiple_choice',
        question: 'Qual é a diferença entre arranjo e permutação?',
        options: [
          { id: 'a', text: 'Arranjo usa todos os elementos' },
          { id: 'b', text: 'Permutação usa parte dos elementos' },
          { id: 'c', text: 'Arranjo usa parte dos elementos, permutação usa todos' },
          { id: 'd', text: 'Não há diferença' }
        ],
        expectedAnswer: 'c',
        hints: ['Arranjo: parte. Permutação: todos.']
      },
      {
        type: 'simple_input',
        question: 'Quantos números de 3 algarismos distintos podem ser formados com 1, 2, 3, 4, 5?',
        expectedAnswer: '60',
        hints: ['A(5,3)']
      }
    ]
  },
  
  // Página: Combinações (4 exercícios)
  {
    pageSlug: 'combinacoes',
    exercises: [
      {
        type: 'simple_input',
        question: 'Calcule C(6,2).',
        expectedAnswer: '15',
        hints: ['6! / (2! × 4!) = 30/2']
      },
      {
        type: 'simple_input',
        question: 'De quantas maneiras podemos escolher 3 pessoas de um grupo de 8?',
        expectedAnswer: '56',
        hints: ['C(8,3) = 8×7×6 / 3×2×1']
      },
      {
        type: 'multiple_choice',
        question: 'Na combinação, a ordem dos elementos:',
        options: [
          { id: 'a', text: 'Importa' },
          { id: 'b', text: 'Não importa' },
          { id: 'c', text: 'Depende do problema' },
          { id: 'd', text: 'É sempre crescente' }
        ],
        expectedAnswer: 'b',
        hints: ['Combinação: ordem não importa']
      },
      {
        type: 'simple_input',
        question: 'Na Mega-Sena, escolhemos 6 números de 60. Quantas apostas diferentes são possíveis? (Responda em milhões, arredondado)',
        expectedAnswer: '50',
        hints: ['C(60,6) ≈ 50 milhões']
      }
    ]
  },

  // ========================================
  // MÓDULO 5: Raciocínio Lógico (18 exercícios)
  // ========================================
  
  // Página: Sequências Numéricas (5 exercícios)
  {
    pageSlug: 'sequencias-numericas',
    exercises: [
      {
        type: 'simple_input',
        question: 'Qual é o próximo termo da sequência: 2, 5, 8, 11, 14, ?',
        expectedAnswer: '17',
        hints: ['PA com r = 3']
      },
      {
        type: 'simple_input',
        question: 'Qual é o próximo termo da sequência: 3, 6, 12, 24, ?',
        expectedAnswer: '48',
        hints: ['PG com q = 2']
      },
      {
        type: 'simple_input',
        question: 'Qual é o próximo termo da sequência: 1, 1, 2, 3, 5, 8, ?',
        expectedAnswer: '13',
        hints: ['Fibonacci: soma dos dois anteriores']
      },
      {
        type: 'simple_input',
        question: 'Qual é o próximo termo da sequência: 1, 4, 9, 16, 25, ?',
        expectedAnswer: '36',
        hints: ['Quadrados perfeitos: 6²']
      },
      {
        type: 'multiple_choice',
        question: 'Qual é o padrão da sequência 2, 6, 18, 54?',
        options: [
          { id: 'a', text: 'Soma 4' },
          { id: 'b', text: 'Multiplica por 3' },
          { id: 'c', text: 'Soma 6' },
          { id: 'd', text: 'Multiplica por 2' }
        ],
        expectedAnswer: 'b',
        hints: ['6/2 = 3, 18/6 = 3, 54/18 = 3']
      }
    ]
  },
  
  // Página: Problemas de Lógica (5 exercícios)
  {
    pageSlug: 'problemas-logica',
    exercises: [
      {
        type: 'multiple_choice',
        question: 'Se "Todo cachorro late" é verdadeiro, qual é a negação?',
        options: [
          { id: 'a', text: 'Nenhum cachorro late' },
          { id: 'b', text: 'Algum cachorro não late' },
          { id: 'c', text: 'Todo cachorro não late' },
          { id: 'd', text: 'Algum cachorro late' }
        ],
        expectedAnswer: 'b',
        hints: ['Negação de "Todo A é B" é "Existe A que não é B"']
      },
      {
        type: 'multiple_choice',
        question: 'Se p é V e q é F, qual é o valor de p → q?',
        options: [
          { id: 'a', text: 'Verdadeiro' },
          { id: 'b', text: 'Falso' },
          { id: 'c', text: 'Indeterminado' },
          { id: 'd', text: 'Depende do contexto' }
        ],
        expectedAnswer: 'b',
        hints: ['O condicional só é falso quando p é V e q é F']
      },
      {
        type: 'multiple_choice',
        question: 'Qual é a negação de "Se estudo, então passo"?',
        options: [
          { id: 'a', text: 'Se não estudo, então não passo' },
          { id: 'b', text: 'Estudo e não passo' },
          { id: 'c', text: 'Não estudo ou passo' },
          { id: 'd', text: 'Se passo, então estudo' }
        ],
        expectedAnswer: 'b',
        hints: ['Negação de p → q é p ∧ ~q']
      },
      {
        type: 'simple_input',
        question: 'Em um grupo de 50 pessoas, 30 falam inglês e 25 falam espanhol. Se 10 falam os dois, quantas não falam nenhum?',
        expectedAnswer: '5',
        hints: ['Falam pelo menos um = 30 + 25 - 10 = 45']
      },
      {
        type: 'multiple_choice',
        question: 'Ana é mais alta que Bia. Carla é mais baixa que Bia. Quem é a mais alta?',
        options: [
          { id: 'a', text: 'Ana' },
          { id: 'b', text: 'Bia' },
          { id: 'c', text: 'Carla' },
          { id: 'd', text: 'Não é possível determinar' }
        ],
        expectedAnswer: 'a',
        hints: ['Ana > Bia > Carla']
      }
    ]
  },
  
  // Página: Raciocínio Proporcional (4 exercícios)
  {
    pageSlug: 'raciocinio-proporcional',
    exercises: [
      {
        type: 'simple_input',
        question: 'Se 5 kg de arroz custam R$ 25, quanto custam 8 kg?',
        expectedAnswer: '40',
        hints: ['Regra de três direta: 25 × 8 / 5']
      },
      {
        type: 'simple_input',
        question: 'Se 4 pedreiros fazem uma obra em 6 dias, em quantos dias 8 pedreiros fariam?',
        expectedAnswer: '3',
        hints: ['Inversamente proporcional: 4 × 6 / 8']
      },
      {
        type: 'simple_input',
        question: 'Divida R$ 900 entre A, B e C na proporção 2:3:4. Quanto recebe B?',
        expectedAnswer: '300',
        hints: ['Soma = 9 partes. B = 3/9 × 900']
      },
      {
        type: 'multiple_choice',
        question: 'Velocidade e tempo de viagem (mesma distância) são grandezas:',
        options: [
          { id: 'a', text: 'Diretamente proporcionais' },
          { id: 'b', text: 'Inversamente proporcionais' },
          { id: 'c', text: 'Não proporcionais' },
          { id: 'd', text: 'Iguais' }
        ],
        expectedAnswer: 'b',
        hints: ['Maior velocidade = menor tempo']
      }
    ]
  },
  
  // Página: Problemas de Concursos (4 exercícios)
  {
    pageSlug: 'problemas-concursos',
    exercises: [
      {
        type: 'simple_input',
        question: 'A idade de Maria é o triplo da idade de sua filha. Daqui a 10 anos, será o dobro. Qual a idade de Maria?',
        expectedAnswer: '30',
        hints: ['Filha: x, Maria: 3x. 3x+10 = 2(x+10)']
      },
      {
        type: 'simple_input',
        question: 'João pinta uma casa em 12 dias. Pedro em 8 dias. Juntos, em quantos dias pintam? (Responda como fração simplificada: numerador)',
        expectedAnswer: '24',
        hints: ['1/12 + 1/8 = 5/24 por dia. Tempo = 24/5 dias']
      },
      {
        type: 'simple_input',
        question: 'Um produto teve aumento de 20% e depois desconto de 20%. O preço final é que porcentagem do original?',
        expectedAnswer: '96',
        hints: ['100 × 1,20 × 0,80 = 96']
      },
      {
        type: 'simple_input',
        question: 'Um carro vai de A a B (100 km) a 50 km/h e volta a 100 km/h. Qual a velocidade média total? (Arredonde para inteiro)',
        expectedAnswer: '67',
        hints: ['Tempo total = 2h + 1h = 3h. Distância = 200 km. VM = 200/3 ≈ 66,67']
      }
    ]
  }
];

// Inserir exercícios
let totalExercises = 0;

for (const pageData of exercisesData) {
  const pageId = pageMap[pageData.pageSlug];
  
  if (!pageId) {
    console.log(`⚠️ Página não encontrada: ${pageData.pageSlug}`);
    continue;
  }
  
  console.log(`\n📄 ${pageData.pageSlug} (ID: ${pageId})`);
  
  for (let i = 0; i < pageData.exercises.length; i++) {
    const ex = pageData.exercises[i];
    
    await conn.execute(
      `INSERT INTO exercises (pageId, \`order\`, type, question, expectedAnswer, alternativeAnswers, hints, options)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pageId,
        i + 1,
        ex.type,
        ex.question,
        ex.expectedAnswer,
        ex.alternativeAnswers ? JSON.stringify(ex.alternativeAnswers) : null,
        ex.hints ? JSON.stringify(ex.hints) : null,
        ex.options ? JSON.stringify(ex.options) : null
      ]
    );
    
    totalExercises++;
    console.log(`  ✅ Exercício ${i + 1}: ${ex.question.substring(0, 50)}...`);
  }
}

console.log(`\n🎉 ${totalExercises} exercícios de Aritmética Avançada inseridos com sucesso!`);

await conn.end();
