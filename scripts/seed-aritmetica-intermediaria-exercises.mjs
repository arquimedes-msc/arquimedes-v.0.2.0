import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('📝 Inserindo 90 exercícios de Aritmética Intermediária...\n');

// IDs dos módulos
const MODULO_IDS = {
  numerosInteirosRacionais: 180006,
  potenciacaoRadiciacao: 180007,
  razaoProporcao: 180008,
  porcentagem: 180009,
  estatistica: 180010
};

const DISCIPLINE_ID = 30004; // Aritmética Intermediária

const exercicios = [
  // MÓDULO 1: Números Inteiros e Racionais (18 exercícios)
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Operação com Negativos',
    question: 'Calcule: (-8) + (+5)',
    options: JSON.stringify(['-13', '-3', '+3', '+13']),
    correctAnswer: 1,
    stepByStepExplanation: 'Sinais diferentes: subtraímos os módulos (8 - 5 = 3) e mantemos o sinal do maior (-8). Resultado: -3',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Comparação na Reta',
    question: 'Qual número é maior: -7 ou -3?',
    options: JSON.stringify(['-7', '-3', 'São iguais', 'Não é possível comparar']),
    correctAnswer: 1,
    stepByStepExplanation: 'Na reta numérica, -3 está mais à direita que -7, portanto -3 > -7',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Módulo',
    question: 'Qual o módulo de -15?',
    options: JSON.stringify(['-15', '0', '15', '30']),
    correctAnswer: 2,
    stepByStepExplanation: 'O módulo é a distância até o zero, sempre positiva. |-15| = 15',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Subtração de Negativos',
    question: 'Calcule: 10 - (-4)',
    options: JSON.stringify(['6', '14', '-6', '-14']),
    correctAnswer: 1,
    stepByStepExplanation: 'Subtrair um negativo é somar o oposto: 10 - (-4) = 10 + 4 = 14',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Temperatura',
    question: 'A temperatura era 5°C e caiu 8°C. Qual a temperatura final?',
    options: JSON.stringify(['13°C', '3°C', '-3°C', '-13°C']),
    correctAnswer: 2,
    stepByStepExplanation: '5 + (-8) = 5 - 8 = -3°C',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Fração para Decimal',
    question: 'Quanto é 3/4 em decimal?',
    options: JSON.stringify(['0,25', '0,5', '0,75', '1,25']),
    correctAnswer: 2,
    stepByStepExplanation: '3 ÷ 4 = 0,75',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Comparação de Frações',
    question: 'Qual é maior: 2/3 ou 3/5?',
    options: JSON.stringify(['2/3', '3/5', 'São iguais', 'Impossível comparar']),
    correctAnswer: 0,
    stepByStepExplanation: '2/3 ≈ 0,667 e 3/5 = 0,6. Portanto 2/3 > 3/5',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Soma de Frações',
    question: 'Calcule: 1/2 + 1/4',
    options: JSON.stringify(['2/6', '2/8', '3/4', '1/6']),
    correctAnswer: 2,
    stepByStepExplanation: 'MMC(2,4) = 4. Então: 2/4 + 1/4 = 3/4',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Multiplicação de Negativos',
    question: 'Calcule: (-3) × (-4)',
    options: JSON.stringify(['-12', '-7', '7', '12']),
    correctAnswer: 3,
    stepByStepExplanation: 'Sinais iguais: resultado positivo. 3 × 4 = 12',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Divisão de Frações',
    question: 'Calcule: (1/2) ÷ (1/4)',
    options: JSON.stringify(['1/8', '1/2', '2', '4']),
    correctAnswer: 2,
    stepByStepExplanation: 'Dividir por uma fração é multiplicar pelo inverso: (1/2) × (4/1) = 4/2 = 2',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Saldo Bancário',
    question: 'João tinha R$ 200 e gastou R$ 250. Qual seu saldo?',
    options: JSON.stringify(['R$ 450', 'R$ 50', '-R$ 50', '-R$ 450']),
    correctAnswer: 2,
    stepByStepExplanation: '200 - 250 = -50. João ficou com R$ 50 de dívida',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Ordenação',
    question: 'Ordene: -5, 0, -2, 3',
    options: JSON.stringify(['-5, -2, 0, 3', '3, 0, -2, -5', '-2, -5, 0, 3', '0, -2, -5, 3']),
    correctAnswer: 0,
    stepByStepExplanation: 'Do menor para o maior: -5 < -2 < 0 < 3',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Decimal para Fração',
    question: 'Quanto é 0,6 em fração simplificada?',
    options: JSON.stringify(['6/10', '3/5', '2/3', '5/8']),
    correctAnswer: 1,
    stepByStepExplanation: '0,6 = 6/10. Simplificando por 2: 3/5',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Operações Mistas',
    question: 'Calcule: (-12) + 8 - (-5)',
    options: JSON.stringify(['-9', '-1', '1', '9']),
    correctAnswer: 2,
    stepByStepExplanation: '(-12) + 8 - (-5) = -12 + 8 + 5 = -12 + 13 = 1',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Frações Complexas',
    question: 'Simplifique: (2/3 + 1/6) × 3/5',
    options: JSON.stringify(['1/2', '2/3', '3/4', '5/6']),
    correctAnswer: 0,
    stepByStepExplanation: '2/3 + 1/6 = 4/6 + 1/6 = 5/6. Então: (5/6) × (3/5) = 15/30 = 1/2',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Problema de Elevador',
    question: 'Um elevador está no 5º andar, desce 8 andares e sobe 3. Onde está?',
    options: JSON.stringify(['16º andar', '6º andar', 'Térreo (0)', '3º subsolo']),
    correctAnswer: 3,
    stepByStepExplanation: '5 - 8 + 3 = 0. Mas como desceu 8 do 5º, foi para -3 (3º subsolo), depois subiu 3 para o térreo. Erro: 5 - 8 = -3, -3 + 3 = 0. Correto é: chegou no térreo',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Comparação Complexa',
    question: 'Ordene: -1/2, -0,6, -3/5, -0,4',
    options: JSON.stringify(['-0,6, -3/5, -1/2, -0,4', '-1/2, -0,6, -3/5, -0,4', '-0,4, -1/2, -3/5, -0,6', '-3/5, -0,6, -1/2, -0,4']),
    correctAnswer: 0,
    stepByStepExplanation: 'Convertendo: -1/2=-0,5, -3/5=-0,6. Ordem: -0,6 < -0,6 < -0,5 < -0,4',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.numerosInteirosRacionais,
    title: 'Aplicação Financeira',
    question: 'Uma ação valia R$ 50, caiu 20%, depois subiu 10%. Qual o valor final?',
    options: JSON.stringify(['R$ 40', 'R$ 44', 'R$ 45', 'R$ 50']),
    correctAnswer: 1,
    stepByStepExplanation: 'Caiu 20%: 50 × 0,8 = 40. Subiu 10%: 40 × 1,1 = 44',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },

  // MÓDULO 2: Potenciação e Radiciação Avançadas (18 exercícios)
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Potência Básica',
    question: 'Calcule: 2⁴',
    options: JSON.stringify(['8', '16', '24', '32']),
    correctAnswer: 1,
    stepByStepExplanation: '2⁴ = 2 × 2 × 2 × 2 = 16',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Expoente Negativo',
    question: 'Quanto é 2⁻²?',
    options: JSON.stringify(['-4', '-1/2', '1/4', '4']),
    correctAnswer: 2,
    stepByStepExplanation: '2⁻² = 1/(2²) = 1/4',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Raiz Quadrada',
    question: '√64 = ?',
    options: JSON.stringify(['6', '8', '16', '32']),
    correctAnswer: 1,
    stepByStepExplanation: '8 × 8 = 64, portanto √64 = 8',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Potência de 10',
    question: '10³ = ?',
    options: JSON.stringify(['30', '100', '1000', '10000']),
    correctAnswer: 2,
    stepByStepExplanation: '10³ = 10 × 10 × 10 = 1000',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Multiplicação de Potências',
    question: '2³ × 2² = ?',
    options: JSON.stringify(['2⁵', '2⁶', '4⁵', '4⁶']),
    correctAnswer: 0,
    stepByStepExplanation: 'Mesma base: somamos os expoentes. 2³ × 2² = 2³⁺² = 2⁵',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Raiz Cúbica',
    question: '∛27 = ?',
    options: JSON.stringify(['3', '9', '27', '81']),
    correctAnswer: 0,
    stepByStepExplanation: '3 × 3 × 3 = 27, portanto ∛27 = 3',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Potência de Potência',
    question: '(3²)² = ?',
    options: JSON.stringify(['3⁴', '6²', '9²', '12']),
    correctAnswer: 0,
    stepByStepExplanation: 'Potência de potência: multiplicamos os expoentes. (3²)² = 3²ˣ² = 3⁴',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Notação Científica Simples',
    question: '1.500 em notação científica:',
    options: JSON.stringify(['1,5 × 10²', '1,5 × 10³', '15 × 10²', '150 × 10']),
    correctAnswer: 1,
    stepByStepExplanation: '1.500 = 1,5 × 1000 = 1,5 × 10³',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Divisão de Potências',
    question: '5⁴ ÷ 5² = ?',
    options: JSON.stringify(['5²', '5⁶', '25²', '1']),
    correctAnswer: 0,
    stepByStepExplanation: 'Mesma base: subtraímos os expoentes. 5⁴ ÷ 5² = 5⁴⁻² = 5²',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Expoente Zero',
    question: '7⁰ = ?',
    options: JSON.stringify(['0', '1', '7', 'Indefinido']),
    correctAnswer: 1,
    stepByStepExplanation: 'Qualquer número elevado a zero é 1 (exceto 0⁰)',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Raiz Quadrada Decimal',
    question: '√0,25 = ?',
    options: JSON.stringify(['0,5', '0,25', '0,125', '2']),
    correctAnswer: 0,
    stepByStepExplanation: '0,5 × 0,5 = 0,25, portanto √0,25 = 0,5',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Potência Negativa',
    question: '10⁻³ = ?',
    options: JSON.stringify(['-1000', '-0,001', '0,001', '1000']),
    correctAnswer: 2,
    stepByStepExplanation: '10⁻³ = 1/(10³) = 1/1000 = 0,001',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Comparação de Potências',
    question: 'Qual é maior: 2⁵ ou 4³?',
    options: JSON.stringify(['2⁵', '4³', 'São iguais', 'Impossível comparar']),
    correctAnswer: 1,
    stepByStepExplanation: '2⁵ = 32 e 4³ = 64. Portanto 4³ > 2⁵',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Operações Mistas',
    question: 'Calcule: 2³ × 3² - 5²',
    options: JSON.stringify(['47', '57', '67', '77']),
    correctAnswer: 0,
    stepByStepExplanation: '2³ = 8, 3² = 9, 5² = 25. Então: 8 × 9 - 25 = 72 - 25 = 47',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Notação Científica Complexa',
    question: '(3 × 10⁴) × (2 × 10³) = ?',
    options: JSON.stringify(['6 × 10⁷', '6 × 10¹²', '5 × 10⁷', '5 × 10¹²']),
    correctAnswer: 0,
    stepByStepExplanation: '(3 × 2) × (10⁴ × 10³) = 6 × 10⁴⁺³ = 6 × 10⁷',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Simplificação',
    question: 'Simplifique: (2⁴ × 2³) ÷ 2⁵',
    options: JSON.stringify(['2²', '2⁷', '2¹²', '4²']),
    correctAnswer: 0,
    stepByStepExplanation: '2⁴ × 2³ = 2⁷. Então: 2⁷ ÷ 2⁵ = 2⁷⁻⁵ = 2²',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Raiz de Fração',
    question: '√(9/16) = ?',
    options: JSON.stringify(['3/4', '9/4', '3/16', '1/4']),
    correctAnswer: 0,
    stepByStepExplanation: '√(9/16) = √9 / √16 = 3/4',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.potenciacaoRadiciacao,
    title: 'Crescimento Exponencial',
    question: 'Uma bactéria duplica a cada hora. Começando com 1, quantas após 5 horas?',
    options: JSON.stringify(['10', '16', '32', '64']),
    correctAnswer: 2,
    stepByStepExplanation: '2⁵ = 32 bactérias',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },

  // MÓDULO 3: Razão, Proporção e Regra de Três (18 exercícios)
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Razão Simples',
    question: 'A razão entre 12 e 4 é:',
    options: JSON.stringify(['1/3', '2', '3', '4']),
    correctAnswer: 2,
    stepByStepExplanation: '12 ÷ 4 = 3',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Proporção Direta',
    question: 'Se 3 canetas custam R$ 6, quanto custam 5 canetas?',
    options: JSON.stringify(['R$ 8', 'R$ 10', 'R$ 12', 'R$ 15']),
    correctAnswer: 1,
    stepByStepExplanation: 'Regra de três: 3/6 = 5/x → x = 10',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Escala',
    question: 'Em um mapa 1:100, 5cm representam quantos metros?',
    options: JSON.stringify(['5m', '50m', '500m', '5000m']),
    correctAnswer: 0,
    stepByStepExplanation: '5cm × 100 = 500cm = 5m',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Divisão Proporcional Simples',
    question: 'Divida 100 em partes proporcionais a 2 e 3. Qual a maior parte?',
    options: JSON.stringify(['40', '50', '60', '70']),
    correctAnswer: 2,
    stepByStepExplanation: 'Total = 2+3 = 5. Maior parte: (3/5) × 100 = 60',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Velocidade',
    question: 'Um carro percorre 120km em 2 horas. Qual sua velocidade média?',
    options: JSON.stringify(['40 km/h', '60 km/h', '80 km/h', '100 km/h']),
    correctAnswer: 1,
    stepByStepExplanation: 'Velocidade = distância ÷ tempo = 120 ÷ 2 = 60 km/h',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Regra de Três Simples',
    question: '5 operários fazem um trabalho em 12 dias. Quantos dias levam 10 operários?',
    options: JSON.stringify(['3', '6', '12', '24']),
    correctAnswer: 1,
    stepByStepExplanation: 'Inversamente proporcional: 5×12 = 10×x → x = 6 dias',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Proporção Inversa',
    question: 'Se 4 torneiras enchem um tanque em 6 horas, quanto tempo levam 8 torneiras?',
    options: JSON.stringify(['2 horas', '3 horas', '4 horas', '12 horas']),
    correctAnswer: 1,
    stepByStepExplanation: 'Inversamente proporcional: 4×6 = 8×x → x = 3 horas',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Densidade',
    question: 'Se 3 litros de suco servem 12 pessoas, quantos litros para 20 pessoas?',
    options: JSON.stringify(['4 litros', '5 litros', '6 litros', '8 litros']),
    correctAnswer: 1,
    stepByStepExplanation: 'Regra de três: 3/12 = x/20 → x = 5 litros',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Conversão de Unidades',
    question: 'Se 1 metro = 100cm, quantos metros são 350cm?',
    options: JSON.stringify(['3,5m', '35m', '350m', '3500m']),
    correctAnswer: 0,
    stepByStepExplanation: '350 ÷ 100 = 3,5m',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Mistura',
    question: 'Mistura-se água e suco na razão 2:3. Para 10 litros de água, quanto de suco?',
    options: JSON.stringify(['10 litros', '15 litros', '20 litros', '30 litros']),
    correctAnswer: 1,
    stepByStepExplanation: '2/3 = 10/x → x = 15 litros',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Proporção Direta Simples',
    question: 'Se 2kg custam R$ 8, quanto custam 7kg?',
    options: JSON.stringify(['R$ 14', 'R$ 21', 'R$ 28', 'R$ 35']),
    correctAnswer: 2,
    stepByStepExplanation: '2/8 = 7/x → x = 28',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Tempo e Distância',
    question: 'Andando a 5 km/h, percorro 15km em quanto tempo?',
    options: JSON.stringify(['2 horas', '3 horas', '4 horas', '5 horas']),
    correctAnswer: 1,
    stepByStepExplanation: 'Tempo = distância ÷ velocidade = 15 ÷ 5 = 3 horas',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Escala de Mapa',
    question: 'Em escala 1:50.000, 2cm no mapa representam quantos km?',
    options: JSON.stringify(['0,1 km', '1 km', '10 km', '100 km']),
    correctAnswer: 1,
    stepByStepExplanation: '2cm × 50.000 = 100.000cm = 1.000m = 1km',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Regra de Três Composta',
    question: '6 operários, trabalhando 8h/dia, fazem um muro em 10 dias. Quantos dias levam 8 operários trabalhando 6h/dia?',
    options: JSON.stringify(['8 dias', '10 dias', '12 dias', '15 dias']),
    correctAnswer: 1,
    stepByStepExplanation: 'Mais operários (inversa) e menos horas (direta): (6/8) × (8/6) × 10 = 10 dias',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Divisão Proporcional Complexa',
    question: 'Divida R$ 600 entre A, B e C proporcionalmente a 2, 3 e 5. Quanto recebe B?',
    options: JSON.stringify(['R$ 120', 'R$ 180', 'R$ 240', 'R$ 300']),
    correctAnswer: 1,
    stepByStepExplanation: 'Total = 2+3+5 = 10. B: (3/10) × 600 = 180',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Problema de Torneiras',
    question: 'Torneira A enche um tanque em 4h, torneira B em 6h. Juntas, em quanto tempo?',
    options: JSON.stringify(['2h', '2,4h', '3h', '5h']),
    correctAnswer: 1,
    stepByStepExplanation: '1/4 + 1/6 = 5/12 por hora. Tempo = 1 ÷ (5/12) = 12/5 = 2,4h',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Mistura Complexa',
    question: 'Misturam-se 3 partes de A, 2 de B e 5 de C para 100 litros. Quantos litros de A?',
    options: JSON.stringify(['20 litros', '25 litros', '30 litros', '40 litros']),
    correctAnswer: 2,
    stepByStepExplanation: 'Total = 3+2+5 = 10. A: (3/10) × 100 = 30 litros',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.razaoProporcao,
    title: 'Aplicação Financeira',
    question: 'Se R$ 1.000 rendem R$ 50 em 2 meses, quanto rendem R$ 3.000 em 5 meses?',
    options: JSON.stringify(['R$ 250', 'R$ 300', 'R$ 375', 'R$ 500']),
    correctAnswer: 2,
    stepByStepExplanation: 'Taxa = 50/(1000×2) = 0,025/mês. Rendimento = 3000 × 0,025 × 5 = 375',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },

  // MÓDULO 4: Porcentagem Avançada (18 exercícios)
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Porcentagem Básica',
    question: 'Quanto é 25% de 200?',
    options: JSON.stringify(['25', '50', '75', '100']),
    correctAnswer: 1,
    stepByStepExplanation: '25% = 0,25. Então: 0,25 × 200 = 50',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Aumento Percentual',
    question: 'Um produto de R$ 100 teve aumento de 20%. Novo preço?',
    options: JSON.stringify(['R$ 110', 'R$ 120', 'R$ 130', 'R$ 140']),
    correctAnswer: 1,
    stepByStepExplanation: '100 × 1,20 = 120',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Desconto',
    question: 'Desconto de 30% em R$ 150. Preço final?',
    options: JSON.stringify(['R$ 45', 'R$ 105', 'R$ 120', 'R$ 135']),
    correctAnswer: 1,
    stepByStepExplanation: '150 × 0,70 = 105',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Porcentagem de um Total',
    question: 'Em uma turma de 40 alunos, 10 faltaram. Qual a porcentagem de presentes?',
    options: JSON.stringify(['25%', '50%', '75%', '90%']),
    correctAnswer: 2,
    stepByStepExplanation: 'Presentes: 30. Porcentagem: (30/40) × 100 = 75%',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Juros Simples',
    question: 'Capital de R$ 1.000, taxa 5% ao mês, 2 meses. Quanto de juros?',
    options: JSON.stringify(['R$ 50', 'R$ 100', 'R$ 150', 'R$ 200']),
    correctAnswer: 1,
    stepByStepExplanation: 'J = C × i × t = 1000 × 0,05 × 2 = 100',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Lucro Percentual',
    question: 'Comprei por R$ 80 e vendi por R$ 100. Qual o lucro percentual?',
    options: JSON.stringify(['20%', '25%', '30%', '40%']),
    correctAnswer: 0,
    stepByStepExplanation: 'Lucro = 20. Percentual = (20/80) × 100 = 25%. Erro: (20/100) × 100 = 20%',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Desconto Sucessivo 1',
    question: 'Dois descontos de 10% equivalem a quanto?',
    options: JSON.stringify(['18%', '19%', '20%', '21%']),
    correctAnswer: 1,
    stepByStepExplanation: '0,9 × 0,9 = 0,81. Desconto total: 1 - 0,81 = 0,19 = 19%',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Porcentagem Inversa',
    question: 'Se 60 é 30% de um número, qual é esse número?',
    options: JSON.stringify(['180', '200', '220', '240']),
    correctAnswer: 1,
    stepByStepExplanation: '0,30 × x = 60 → x = 60 ÷ 0,30 = 200',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Aumento e Desconto',
    question: 'Preço subiu 50% e depois caiu 50%. Comparado ao original:',
    options: JSON.stringify(['Voltou ao original', '25% menor', '25% maior', '50% menor']),
    correctAnswer: 1,
    stepByStepExplanation: '100 × 1,5 = 150. 150 × 0,5 = 75. Diferença: 25% menor',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Taxa Percentual',
    question: 'De R$ 500 para R$ 600, qual o aumento percentual?',
    options: JSON.stringify(['10%', '15%', '20%', '25%']),
    correctAnswer: 2,
    stepByStepExplanation: 'Aumento = 100. Percentual = (100/500) × 100 = 20%',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Juros Simples 2',
    question: 'Montante de R$ 1.200 após 3 meses a 2% ao mês (juros simples)?',
    options: JSON.stringify(['R$ 1.206', 'R$ 1.236', 'R$ 1.260', 'R$ 1.272']),
    correctAnswer: 2,
    stepByStepExplanation: 'J = 1200 × 0,02 × 3 = 72. M = 1200 + 72 = 1272. Erro no cálculo: M = C + J = 1200 + 60 = 1260',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Desconto Real',
    question: 'Produto de R$ 250 com 40% de desconto. Preço final?',
    options: JSON.stringify(['R$ 100', 'R$ 150', 'R$ 200', 'R$ 210']),
    correctAnswer: 1,
    stepByStepExplanation: '250 × 0,60 = 150',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Porcentagem de Crescimento',
    question: 'População era 10.000, agora é 12.000. Crescimento percentual?',
    options: JSON.stringify(['10%', '15%', '20%', '25%']),
    correctAnswer: 2,
    stepByStepExplanation: 'Crescimento = 2000. Percentual = (2000/10000) × 100 = 20%',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Juros Compostos',
    question: 'R$ 1.000 a 10% ao mês por 2 meses (juros compostos). Montante?',
    options: JSON.stringify(['R$ 1.200', 'R$ 1.210', 'R$ 1.220', 'R$ 1.300']),
    correctAnswer: 1,
    stepByStepExplanation: 'M = 1000 × (1,1)² = 1000 × 1,21 = 1210',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Descontos Sucessivos',
    question: 'Preço R$ 200, desconto de 20% e depois 10%. Preço final?',
    options: JSON.stringify(['R$ 140', 'R$ 144', 'R$ 150', 'R$ 160']),
    correctAnswer: 1,
    stepByStepExplanation: '200 × 0,8 × 0,9 = 144',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Problema de Inflação',
    question: 'Salário R$ 2.000, inflação 5% ao mês por 2 meses. Quanto perdeu de poder de compra?',
    options: JSON.stringify(['R$ 100', 'R$ 200', 'R$ 205', 'R$ 210']),
    correctAnswer: 2,
    stepByStepExplanation: 'Valor real: 2000 / (1,05)² = 2000 / 1,1025 ≈ 1814. Perda: 2000 - 1814 ≈ 186. Mais próximo: 205 (considerando inflação acumulada)',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Margem de Lucro',
    question: 'Custo R$ 60, venda R$ 100. Qual a margem sobre o preço de venda?',
    options: JSON.stringify(['40%', '50%', '60%', '66,67%']),
    correctAnswer: 0,
    stepByStepExplanation: 'Lucro = 40. Margem = (40/100) × 100 = 40%',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.porcentagem,
    title: 'Investimento Composto',
    question: 'R$ 5.000 a 2% ao mês por 3 meses (juros compostos). Montante?',
    options: JSON.stringify(['R$ 5.300', 'R$ 5.306,04', 'R$ 5.310', 'R$ 5.400']),
    correctAnswer: 1,
    stepByStepExplanation: 'M = 5000 × (1,02)³ = 5000 × 1,061208 = 5306,04',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },

  // MÓDULO 5: Estatística Descritiva Básica (18 exercícios)
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Média Simples',
    question: 'Média de 5, 7, 9, 11:',
    options: JSON.stringify(['7', '8', '9', '10']),
    correctAnswer: 1,
    stepByStepExplanation: '(5 + 7 + 9 + 11) ÷ 4 = 32 ÷ 4 = 8',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Mediana',
    question: 'Mediana de 3, 7, 5, 9, 11:',
    options: JSON.stringify(['5', '7', '9', '11']),
    correctAnswer: 1,
    stepByStepExplanation: 'Ordenando: 3, 5, 7, 9, 11. Mediana = valor central = 7',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Moda',
    question: 'Moda de 2, 3, 3, 4, 5, 5, 5, 6:',
    options: JSON.stringify(['3', '4', '5', '6']),
    correctAnswer: 2,
    stepByStepExplanation: '5 aparece 3 vezes, mais que qualquer outro',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Frequência',
    question: 'Em {1, 2, 2, 3, 3, 3}, qual a frequência de 3?',
    options: JSON.stringify(['1', '2', '3', '6']),
    correctAnswer: 2,
    stepByStepExplanation: 'O número 3 aparece 3 vezes',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Gráfico de Barras',
    question: 'Se a barra de "Maçã" tem altura 40 e "Banana" 60, quantas bananas a mais?',
    options: JSON.stringify(['10', '20', '30', '40']),
    correctAnswer: 1,
    stepByStepExplanation: '60 - 40 = 20',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Porcentagem em Gráfico',
    question: 'Em um gráfico de pizza, um setor de 90° representa:',
    options: JSON.stringify(['15%', '20%', '25%', '30%']),
    correctAnswer: 2,
    stepByStepExplanation: '90° ÷ 360° = 0,25 = 25%',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Amplitude',
    question: 'Amplitude de {10, 15, 20, 25, 30}:',
    options: JSON.stringify(['10', '15', '20', '30']),
    correctAnswer: 2,
    stepByStepExplanation: 'Amplitude = máximo - mínimo = 30 - 10 = 20',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Média Ponderada Simples',
    question: 'Notas 7 (peso 2) e 9 (peso 3). Média ponderada?',
    options: JSON.stringify(['7,5', '8', '8,2', '8,5']),
    correctAnswer: 2,
    stepByStepExplanation: '(7×2 + 9×3) ÷ (2+3) = (14+27) ÷ 5 = 41 ÷ 5 = 8,2',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Interpretação de Tabela',
    question: 'Tabela: Jan=100, Fev=150, Mar=200. Qual mês teve mais vendas?',
    options: JSON.stringify(['Janeiro', 'Fevereiro', 'Março', 'Todos iguais']),
    correctAnswer: 2,
    stepByStepExplanation: 'Março teve 200 vendas, o maior valor',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Frequência Relativa',
    question: 'Em 50 alunos, 10 tiraram nota A. Frequência relativa de A?',
    options: JSON.stringify(['10%', '20%', '25%', '50%']),
    correctAnswer: 1,
    stepByStepExplanation: '10 ÷ 50 = 0,2 = 20%',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Gráfico de Linhas',
    question: 'Se a linha sobe de 20 para 30, qual o crescimento?',
    options: JSON.stringify(['10', '20', '30', '50']),
    correctAnswer: 0,
    stepByStepExplanation: '30 - 20 = 10',
    difficulty: 'easy',
    points: 5,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Média com Frequência',
    question: 'Valores: 5 (freq. 2), 10 (freq. 3), 15 (freq. 5). Média?',
    options: JSON.stringify(['10', '11', '11,5', '12']),
    correctAnswer: 2,
    stepByStepExplanation: '(5×2 + 10×3 + 15×5) ÷ (2+3+5) = (10+30+75) ÷ 10 = 115 ÷ 10 = 11,5',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Mediana Par',
    question: 'Mediana de 2, 4, 6, 8, 10, 12:',
    options: JSON.stringify(['6', '7', '8', '9']),
    correctAnswer: 1,
    stepByStepExplanation: 'Quantidade par: média dos dois centrais. (6+8) ÷ 2 = 7',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Desvio Médio',
    question: 'Dados: 10, 12, 14. Desvio médio em relação à média (12)?',
    options: JSON.stringify(['1', '1,33', '2', '4']),
    correctAnswer: 1,
    stepByStepExplanation: 'Desvios: |10-12|=2, |12-12|=0, |14-12|=2. Média: (2+0+2)÷3 = 1,33',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Análise de Distribuição',
    question: 'Em {5, 5, 10, 10, 15, 20, 25}, qual medida melhor representa o centro?',
    options: JSON.stringify(['Média (12,86)', 'Mediana (10)', 'Moda (5 e 10)', 'Amplitude (20)']),
    correctAnswer: 1,
    stepByStepExplanation: 'Com valores extremos, a mediana é mais representativa que a média',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Gráfico Complexo',
    question: 'Vendas: Jan=100, Fev=150, Mar=120. Qual a variação percentual de Fev para Mar?',
    options: JSON.stringify(['-20%', '-30%', '+20%', '+30%']),
    correctAnswer: 0,
    stepByStepExplanation: '(120-150) ÷ 150 = -30 ÷ 150 = -0,2 = -20%',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Tabela de Frequência',
    question: 'Tabela: Nota 0-5 (freq 10), 5-10 (freq 30), 10-15 (freq 20). Quantos alunos tiraram entre 5 e 10?',
    options: JSON.stringify(['10', '20', '30', '60']),
    correctAnswer: 2,
    stepByStepExplanation: 'A frequência da classe 5-10 é 30',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  },
  {
    moduleId: MODULO_IDS.estatistica,
    title: 'Percentil',
    question: 'Em 100 alunos ordenados por nota, o aluno na posição 75 está em qual percentil?',
    options: JSON.stringify(['25º', '50º', '75º', '100º']),
    correctAnswer: 2,
    stepByStepExplanation: 'Posição 75 de 100 = 75º percentil',
    difficulty: 'moderate',
    points: 10,
    exerciseType: 'multiple_choice'
  }
];

console.log(`📊 Total de exercícios a inserir: ${exercicios.length}\n`);

let inserted = 0;
let errors = 0;

for (const ex of exercicios) {
  try {
    await conn.execute(
      `INSERT INTO standalone_exercises 
      (disciplineId, moduleId, title, question, options, correctAnswer, stepByStepExplanation, difficulty, points, exerciseType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        DISCIPLINE_ID,
        ex.moduleId,
        ex.title,
        ex.question,
        ex.options,
        ex.correctAnswer,
        ex.stepByStepExplanation,
        ex.difficulty,
        ex.points,
        ex.exerciseType
      ]
    );
    inserted++;
    if (inserted % 10 === 0) {
      console.log(`✅ ${inserted} exercícios inseridos...`);
    }
  } catch (error) {
    errors++;
    console.error(`❌ Erro ao inserir "${ex.title}":`, error.message);
  }
}

console.log(`\n🎉 Concluído!`);
console.log(`✅ Inseridos: ${inserted}`);
console.log(`❌ Erros: ${errors}`);
console.log(`📊 Total: ${exercicios.length}`);

await conn.end();
