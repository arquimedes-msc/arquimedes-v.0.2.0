import mysql from 'mysql2/promise';
import 'dotenv/config';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// IDs dos módulos de Álgebra
const MODULE_IDS = {
  variaveis: 180001,
  equacoes1grau: 180002,
  sistemas: 180003,
  equacoes2grau: 180004,
  produtosNotaveis: 180005
};

// 90 exercícios de Álgebra Básica
const exercises = [
  // MÓDULO 1: VARIÁVEIS E EXPRESSÕES (18 exercícios)
  // Fáceis (13)
  {
    uniqueId: "EX-ALG-M01-001",
    moduleId: MODULE_IDS.variaveis,
    question: "Qual é o valor de 3x quando x = 4?",
    options: JSON.stringify([
      {id: 1, text: "7"},
      {id: 2, text: "12"},
      {id: 3, text: "34"},
      {id: 4, text: "43"}
    ]),
    correctAnswer: 2,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x por 4: 3 × 4 = 12",
    hint: "Multiplique o coeficiente (3) pelo valor de x (4)."
  },
  {
    uniqueId: "EX-ALG-M01-002",
    moduleId: MODULE_IDS.variaveis,
    question: "Simplifique a expressão: 5x + 3x",
    options: JSON.stringify([
      {id: 1, text: "8x"},
      {id: 2, text: "8x²"},
      {id: 3, text: "15x"},
      {id: 4, text: "5x + 3x (não pode simplificar)"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Termos semelhantes: 5x + 3x = (5 + 3)x = 8x",
    hint: "Some os coeficientes de termos com a mesma variável."
  },
  {
    uniqueId: "EX-ALG-M01-003",
    moduleId: MODULE_IDS.variaveis,
    question: "Qual expressão representa \"o dobro de um número mais 5\"?",
    options: JSON.stringify([
      {id: 1, text: "2x + 5"},
      {id: 2, text: "2(x + 5)"},
      {id: 3, text: "x + 10"},
      {id: 4, text: "2x × 5"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "\"Dobro de x\" = 2x, \"mais 5\" = +5, então 2x + 5",
    hint: "\"Dobro\" significa multiplicar por 2."
  },
  {
    uniqueId: "EX-ALG-M01-004",
    moduleId: MODULE_IDS.variaveis,
    question: "Avalie a expressão x + 7 quando x = 12",
    options: JSON.stringify([
      {id: 1, text: "19"},
      {id: 2, text: "17"},
      {id: 3, text: "712"},
      {id: 4, text: "84"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x por 12: 12 + 7 = 19",
    hint: "Substitua a variável pelo valor dado e calcule."
  },
  {
    uniqueId: "EX-ALG-M01-005",
    moduleId: MODULE_IDS.variaveis,
    question: "Qual é o valor de x - 3 quando x = 10?",
    options: JSON.stringify([
      {id: 1, text: "7"},
      {id: 2, text: "13"},
      {id: 3, text: "30"},
      {id: 4, text: "-7"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x por 10: 10 - 3 = 7",
    hint: "Substitua o valor de x e calcule a subtração."
  },
  {
    uniqueId: "EX-ALG-M01-006",
    moduleId: MODULE_IDS.variaveis,
    question: "Simplifique: 7y + 2y",
    options: JSON.stringify([
      {id: 1, text: "9y"},
      {id: 2, text: "9y²"},
      {id: 3, text: "14y"},
      {id: 4, text: "7y + 2y"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Termos semelhantes: 7y + 2y = (7 + 2)y = 9y",
    hint: "Some os coeficientes."
  },
  {
    uniqueId: "EX-ALG-M01-007",
    moduleId: MODULE_IDS.variaveis,
    question: "Qual é o coeficiente de x na expressão 8x?",
    options: JSON.stringify([
      {id: 1, text: "8"},
      {id: 2, text: "x"},
      {id: 3, text: "1"},
      {id: 4, text: "0"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "O coeficiente é o número que multiplica a variável, neste caso 8.",
    hint: "O coeficiente é o número na frente da variável."
  },
  {
    uniqueId: "EX-ALG-M01-008",
    moduleId: MODULE_IDS.variaveis,
    question: "Qual é o valor de 2x quando x = 6?",
    options: JSON.stringify([
      {id: 1, text: "12"},
      {id: 2, text: "8"},
      {id: 3, text: "26"},
      {id: 4, text: "4"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x por 6: 2 × 6 = 12",
    hint: "Multiplique 2 pelo valor de x."
  },
  {
    uniqueId: "EX-ALG-M01-009",
    moduleId: MODULE_IDS.variaveis,
    question: "Simplifique: 10a - 3a",
    options: JSON.stringify([
      {id: 1, text: "7a"},
      {id: 2, text: "13a"},
      {id: 3, text: "7"},
      {id: 4, text: "10a - 3a"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Termos semelhantes: 10a - 3a = (10 - 3)a = 7a",
    hint: "Subtraia os coeficientes."
  },
  {
    uniqueId: "EX-ALG-M01-010",
    moduleId: MODULE_IDS.variaveis,
    question: "Qual expressão representa \"um número menos 8\"?",
    options: JSON.stringify([
      {id: 1, text: "x - 8"},
      {id: 2, text: "8 - x"},
      {id: 3, text: "x + 8"},
      {id: 4, text: "8x"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "\"Um número\" = x, \"menos 8\" = -8, então x - 8",
    hint: "A ordem importa na subtração."
  },
  {
    uniqueId: "EX-ALG-M01-011",
    moduleId: MODULE_IDS.variaveis,
    question: "Avalie 4x quando x = 5",
    options: JSON.stringify([
      {id: 1, text: "20"},
      {id: 2, text: "9"},
      {id: 3, text: "45"},
      {id: 4, text: "1"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x por 5: 4 × 5 = 20",
    hint: "Multiplique o coeficiente pelo valor."
  },
  {
    uniqueId: "EX-ALG-M01-012",
    moduleId: MODULE_IDS.variaveis,
    question: "Simplifique: 6b + 4b",
    options: JSON.stringify([
      {id: 1, text: "10b"},
      {id: 2, text: "10b²"},
      {id: 3, text: "24b"},
      {id: 4, text: "6b + 4b"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Termos semelhantes: 6b + 4b = (6 + 4)b = 10b",
    hint: "Some os coeficientes."
  },
  {
    uniqueId: "EX-ALG-M01-013",
    moduleId: MODULE_IDS.variaveis,
    question: "Qual é o valor de x + 5 quando x = 8?",
    options: JSON.stringify([
      {id: 1, text: "13"},
      {id: 2, text: "3"},
      {id: 3, text: "40"},
      {id: 4, text: "85"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x por 8: 8 + 5 = 13",
    hint: "Some os valores."
  },
  // Médios (5)
  {
    uniqueId: "EX-ALG-M01-014",
    moduleId: MODULE_IDS.variaveis,
    question: "Simplifique: 4x + 2y + 3x - y",
    options: JSON.stringify([
      {id: 1, text: "7x + y"},
      {id: 2, text: "7x + 3y"},
      {id: 3, text: "9xy"},
      {id: 4, text: "7x - y"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Combine termos semelhantes: (4x + 3x) + (2y - y) = 7x + y",
    hint: "Agrupe termos com x e termos com y separadamente."
  },
  {
    uniqueId: "EX-ALG-M01-015",
    moduleId: MODULE_IDS.variaveis,
    question: "Qual é o valor de 2x² quando x = 3?",
    options: JSON.stringify([
      {id: 1, text: "18"},
      {id: 2, text: "12"},
      {id: 3, text: "36"},
      {id: 4, text: "6"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Substitua x por 3: 2 × 3² = 2 × 9 = 18",
    hint: "Calcule o expoente primeiro (3² = 9), depois multiplique por 2."
  },
  {
    uniqueId: "EX-ALG-M01-016",
    moduleId: MODULE_IDS.variaveis,
    question: "Simplifique: 3(x + 2)",
    options: JSON.stringify([
      {id: 1, text: "3x + 6"},
      {id: 2, text: "3x + 2"},
      {id: 3, text: "3x + 5"},
      {id: 4, text: "4x + 2"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Propriedade distributiva: 3 × x + 3 × 2 = 3x + 6",
    hint: "Multiplique 3 por cada termo dentro dos parênteses."
  },
  {
    uniqueId: "EX-ALG-M01-017",
    moduleId: MODULE_IDS.variaveis,
    question: "Avalie 3a - 2b quando a = 5 e b = 4",
    options: JSON.stringify([
      {id: 1, text: "7"},
      {id: 2, text: "23"},
      {id: 3, text: "1"},
      {id: 4, text: "-7"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Substitua: 3(5) - 2(4) = 15 - 8 = 7",
    hint: "Substitua cada variável e calcule."
  },
  {
    uniqueId: "EX-ALG-M01-018",
    moduleId: MODULE_IDS.variaveis,
    question: "Simplifique: 5(2x - 1)",
    options: JSON.stringify([
      {id: 1, text: "10x - 5"},
      {id: 2, text: "10x - 1"},
      {id: 3, text: "7x - 1"},
      {id: 4, text: "10x + 5"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Propriedade distributiva: 5 × 2x - 5 × 1 = 10x - 5",
    hint: "Multiplique 5 por cada termo."
  },

  // MÓDULO 2: EQUAÇÕES DO 1º GRAU (18 exercícios)
  // Fáceis (13)
  {
    uniqueId: "EX-ALG-M02-001",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: x + 5 = 12",
    options: JSON.stringify([
      {id: 1, text: "x = 7"},
      {id: 2, text: "x = 17"},
      {id: 3, text: "x = 60"},
      {id: 4, text: "x = -7"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Subtraia 5 de ambos os lados: x = 12 - 5 = 7",
    hint: "Isole x subtraindo 5."
  },
  {
    uniqueId: "EX-ALG-M02-002",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: x - 3 = 10",
    options: JSON.stringify([
      {id: 1, text: "x = 13"},
      {id: 2, text: "x = 7"},
      {id: 3, text: "x = 30"},
      {id: 4, text: "x = -7"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Some 3 a ambos os lados: x = 10 + 3 = 13",
    hint: "Isole x somando 3."
  },
  {
    uniqueId: "EX-ALG-M02-003",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 2x = 14",
    options: JSON.stringify([
      {id: 1, text: "x = 7"},
      {id: 2, text: "x = 28"},
      {id: 3, text: "x = 12"},
      {id: 4, text: "x = 16"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Divida ambos os lados por 2: x = 14 ÷ 2 = 7",
    hint: "Divida por 2 para isolar x."
  },
  {
    uniqueId: "EX-ALG-M02-004",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 3x = 21",
    options: JSON.stringify([
      {id: 1, text: "x = 7"},
      {id: 2, text: "x = 63"},
      {id: 3, text: "x = 18"},
      {id: 4, text: "x = 24"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Divida ambos os lados por 3: x = 21 ÷ 3 = 7",
    hint: "Divida por 3."
  },
  {
    uniqueId: "EX-ALG-M02-005",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: x + 8 = 15",
    options: JSON.stringify([
      {id: 1, text: "x = 7"},
      {id: 2, text: "x = 23"},
      {id: 3, text: "x = 120"},
      {id: 4, text: "x = -7"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Subtraia 8 de ambos os lados: x = 15 - 8 = 7",
    hint: "Subtraia 8."
  },
  {
    uniqueId: "EX-ALG-M02-006",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 4x = 20",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 80"},
      {id: 3, text: "x = 16"},
      {id: 4, text: "x = 24"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Divida ambos os lados por 4: x = 20 ÷ 4 = 5",
    hint: "Divida por 4."
  },
  {
    uniqueId: "EX-ALG-M02-007",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: x - 6 = 9",
    options: JSON.stringify([
      {id: 1, text: "x = 15"},
      {id: 2, text: "x = 3"},
      {id: 3, text: "x = 54"},
      {id: 4, text: "x = -3"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Some 6 a ambos os lados: x = 9 + 6 = 15",
    hint: "Some 6."
  },
  {
    uniqueId: "EX-ALG-M02-008",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 5x = 35",
    options: JSON.stringify([
      {id: 1, text: "x = 7"},
      {id: 2, text: "x = 175"},
      {id: 3, text: "x = 30"},
      {id: 4, text: "x = 40"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Divida ambos os lados por 5: x = 35 ÷ 5 = 7",
    hint: "Divida por 5."
  },
  {
    uniqueId: "EX-ALG-M02-009",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: x + 10 = 18",
    options: JSON.stringify([
      {id: 1, text: "x = 8"},
      {id: 2, text: "x = 28"},
      {id: 3, text: "x = 180"},
      {id: 4, text: "x = -8"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Subtraia 10 de ambos os lados: x = 18 - 10 = 8",
    hint: "Subtraia 10."
  },
  {
    uniqueId: "EX-ALG-M02-010",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 6x = 42",
    options: JSON.stringify([
      {id: 1, text: "x = 7"},
      {id: 2, text: "x = 252"},
      {id: 3, text: "x = 36"},
      {id: 4, text: "x = 48"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Divida ambos os lados por 6: x = 42 ÷ 6 = 7",
    hint: "Divida por 6."
  },
  {
    uniqueId: "EX-ALG-M02-011",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: x - 4 = 11",
    options: JSON.stringify([
      {id: 1, text: "x = 15"},
      {id: 2, text: "x = 7"},
      {id: 3, text: "x = 44"},
      {id: 4, text: "x = -7"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Some 4 a ambos os lados: x = 11 + 4 = 15",
    hint: "Some 4."
  },
  {
    uniqueId: "EX-ALG-M02-012",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 7x = 49",
    options: JSON.stringify([
      {id: 1, text: "x = 7"},
      {id: 2, text: "x = 343"},
      {id: 3, text: "x = 42"},
      {id: 4, text: "x = 56"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Divida ambos os lados por 7: x = 49 ÷ 7 = 7",
    hint: "Divida por 7."
  },
  {
    uniqueId: "EX-ALG-M02-013",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: x + 12 = 20",
    options: JSON.stringify([
      {id: 1, text: "x = 8"},
      {id: 2, text: "x = 32"},
      {id: 3, text: "x = 240"},
      {id: 4, text: "x = -8"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Subtraia 12 de ambos os lados: x = 20 - 12 = 8",
    hint: "Subtraia 12."
  },
  // Médios (5)
  {
    uniqueId: "EX-ALG-M02-014",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 2x + 5 = 17",
    options: JSON.stringify([
      {id: 1, text: "x = 6"},
      {id: 2, text: "x = 11"},
      {id: 3, text: "x = 22"},
      {id: 4, text: "x = 12"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Subtraia 5: 2x = 12, depois divida por 2: x = 6",
    hint: "Primeiro subtraia 5, depois divida por 2."
  },
  {
    uniqueId: "EX-ALG-M02-015",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 3x - 4 = 11",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 7"},
      {id: 3, text: "x = 15"},
      {id: 4, text: "x = 3"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Some 4: 3x = 15, depois divida por 3: x = 5",
    hint: "Primeiro some 4, depois divida por 3."
  },
  {
    uniqueId: "EX-ALG-M02-016",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 4x + 3 = 23",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 26"},
      {id: 3, text: "x = 20"},
      {id: 4, text: "x = 6"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Subtraia 3: 4x = 20, depois divida por 4: x = 5",
    hint: "Primeiro subtraia 3, depois divida por 4."
  },
  {
    uniqueId: "EX-ALG-M02-017",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 5x - 7 = 18",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 11"},
      {id: 3, text: "x = 25"},
      {id: 4, text: "x = 3"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Some 7: 5x = 25, depois divida por 5: x = 5",
    hint: "Primeiro some 7, depois divida por 5."
  },
  {
    uniqueId: "EX-ALG-M02-018",
    moduleId: MODULE_IDS.equacoes1grau,
    question: "Resolva: 2(x + 3) = 16",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 8"},
      {id: 3, text: "x = 10"},
      {id: 4, text: "x = 13"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Divida por 2: x + 3 = 8, depois subtraia 3: x = 5",
    hint: "Divida ambos os lados por 2 primeiro."
  },

  // MÓDULO 3: SISTEMAS DE EQUAÇÕES (18 exercícios)
  // Fáceis (13)
  {
    uniqueId: "EX-ALG-M03-001",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 10, x = 6}, qual é o valor de y?",
    options: JSON.stringify([
      {id: 1, text: "y = 4"},
      {id: 2, text: "y = 16"},
      {id: 3, text: "y = 6"},
      {id: 4, text: "y = 10"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x = 6 na primeira equação: 6 + y = 10, então y = 4",
    hint: "Substitua o valor conhecido de x."
  },
  {
    uniqueId: "EX-ALG-M03-002",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 8, y = 3}, qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 11"},
      {id: 3, text: "x = 3"},
      {id: 4, text: "x = 8"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua y = 3 na primeira equação: x + 3 = 8, então x = 5",
    hint: "Substitua o valor conhecido de y."
  },
  {
    uniqueId: "EX-ALG-M03-003",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 12, x = 7}, qual é o valor de y?",
    options: JSON.stringify([
      {id: 1, text: "y = 5"},
      {id: 2, text: "y = 19"},
      {id: 3, text: "y = 7"},
      {id: 4, text: "y = 12"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x = 7: 7 + y = 12, então y = 5",
    hint: "Substitua x e resolva para y."
  },
  {
    uniqueId: "EX-ALG-M03-004",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {2x = 10, x + y = 8}, qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 20"},
      {id: 3, text: "x = 8"},
      {id: 4, text: "x = 3"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Da primeira equação: 2x = 10, então x = 5",
    hint: "Resolva a primeira equação."
  },
  {
    uniqueId: "EX-ALG-M03-005",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 15, y = 8}, qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 7"},
      {id: 2, text: "x = 23"},
      {id: 3, text: "x = 8"},
      {id: 4, text: "x = 15"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua y = 8: x + 8 = 15, então x = 7",
    hint: "Substitua y e resolva."
  },
  {
    uniqueId: "EX-ALG-M03-006",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 20, x = 12}, qual é o valor de y?",
    options: JSON.stringify([
      {id: 1, text: "y = 8"},
      {id: 2, text: "y = 32"},
      {id: 3, text: "y = 12"},
      {id: 4, text: "y = 20"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x = 12: 12 + y = 20, então y = 8",
    hint: "Substitua x."
  },
  {
    uniqueId: "EX-ALG-M03-007",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 9, y = 4}, qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 13"},
      {id: 3, text: "x = 4"},
      {id: 4, text: "x = 9"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua y = 4: x + 4 = 9, então x = 5",
    hint: "Substitua y."
  },
  {
    uniqueId: "EX-ALG-M03-008",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {3y = 15, x + y = 10}, qual é o valor de y?",
    options: JSON.stringify([
      {id: 1, text: "y = 5"},
      {id: 2, text: "y = 45"},
      {id: 3, text: "y = 10"},
      {id: 4, text: "y = 15"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Da primeira equação: 3y = 15, então y = 5",
    hint: "Resolva a primeira equação."
  },
  {
    uniqueId: "EX-ALG-M03-009",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 14, x = 9}, qual é o valor de y?",
    options: JSON.stringify([
      {id: 1, text: "y = 5"},
      {id: 2, text: "y = 23"},
      {id: 3, text: "y = 9"},
      {id: 4, text: "y = 14"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x = 9: 9 + y = 14, então y = 5",
    hint: "Substitua x."
  },
  {
    uniqueId: "EX-ALG-M03-010",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 11, y = 6}, qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 17"},
      {id: 3, text: "x = 6"},
      {id: 4, text: "x = 11"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua y = 6: x + 6 = 11, então x = 5",
    hint: "Substitua y."
  },
  {
    uniqueId: "EX-ALG-M03-011",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 16, x = 10}, qual é o valor de y?",
    options: JSON.stringify([
      {id: 1, text: "y = 6"},
      {id: 2, text: "y = 26"},
      {id: 3, text: "y = 10"},
      {id: 4, text: "y = 16"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua x = 10: 10 + y = 16, então y = 6",
    hint: "Substitua x."
  },
  {
    uniqueId: "EX-ALG-M03-012",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {x + y = 13, y = 7}, qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 6"},
      {id: 2, text: "x = 20"},
      {id: 3, text: "x = 7"},
      {id: 4, text: "x = 13"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Substitua y = 7: x + 7 = 13, então x = 6",
    hint: "Substitua y."
  },
  {
    uniqueId: "EX-ALG-M03-013",
    moduleId: MODULE_IDS.sistemas,
    question: "No sistema {4x = 20, x + y = 12}, qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 5"},
      {id: 2, text: "x = 80"},
      {id: 3, text: "x = 12"},
      {id: 4, text: "x = 7"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "Da primeira equação: 4x = 20, então x = 5",
    hint: "Resolva a primeira equação."
  },
  // Médios (5)
  {
    uniqueId: "EX-ALG-M03-014",
    moduleId: MODULE_IDS.sistemas,
    question: "Resolva o sistema {x + y = 10, x - y = 2}. Qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 6"},
      {id: 2, text: "x = 4"},
      {id: 3, text: "x = 8"},
      {id: 4, text: "x = 5"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Some as equações: 2x = 12, então x = 6",
    hint: "Some as duas equações para eliminar y."
  },
  {
    uniqueId: "EX-ALG-M03-015",
    moduleId: MODULE_IDS.sistemas,
    question: "Resolva o sistema {x + y = 12, x - y = 4}. Qual é o valor de y?",
    options: JSON.stringify([
      {id: 1, text: "y = 4"},
      {id: 2, text: "y = 8"},
      {id: 3, text: "y = 6"},
      {id: 4, text: "y = 2"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Some as equações: 2x = 16, x = 8. Substitua: 8 + y = 12, y = 4",
    hint: "Encontre x primeiro, depois substitua."
  },
  {
    uniqueId: "EX-ALG-M03-016",
    moduleId: MODULE_IDS.sistemas,
    question: "Resolva o sistema {2x + y = 11, x = 3}. Qual é o valor de y?",
    options: JSON.stringify([
      {id: 1, text: "y = 5"},
      {id: 2, text: "y = 8"},
      {id: 3, text: "y = 14"},
      {id: 4, text: "y = 3"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Substitua x = 3: 2(3) + y = 11, 6 + y = 11, y = 5",
    hint: "Substitua x = 3 na primeira equação."
  },
  {
    uniqueId: "EX-ALG-M03-017",
    moduleId: MODULE_IDS.sistemas,
    question: "Resolva o sistema {x + 2y = 14, y = 4}. Qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 6"},
      {id: 2, text: "x = 10"},
      {id: 3, text: "x = 14"},
      {id: 4, text: "x = 4"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Substitua y = 4: x + 2(4) = 14, x + 8 = 14, x = 6",
    hint: "Substitua y = 4 na primeira equação."
  },
  {
    uniqueId: "EX-ALG-M03-018",
    moduleId: MODULE_IDS.sistemas,
    question: "Resolva o sistema {x + y = 15, x - y = 5}. Qual é o valor de x?",
    options: JSON.stringify([
      {id: 1, text: "x = 10"},
      {id: 2, text: "x = 5"},
      {id: 3, text: "x = 15"},
      {id: 4, text: "x = 20"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Some as equações: 2x = 20, então x = 10",
    hint: "Some as duas equações."
  },

  // MÓDULO 4: EQUAÇÕES DO 2º GRAU (18 exercícios)
  // Fáceis (13)
  {
    uniqueId: "EX-ALG-M04-001",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Qual é a forma padrão de uma equação do 2º grau?",
    options: JSON.stringify([
      {id: 1, text: "ax² + bx + c = 0"},
      {id: 2, text: "ax + b = 0"},
      {id: 3, text: "ax³ + bx² + cx + d = 0"},
      {id: 4, text: "a/x + b = 0"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "A forma padrão é ax² + bx + c = 0, onde a ≠ 0",
    hint: "Equação do 2º grau tem x²."
  },
  {
    uniqueId: "EX-ALG-M04-002",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Na equação x² = 16, quais são as raízes?",
    options: JSON.stringify([
      {id: 1, text: "x = 4 ou x = -4"},
      {id: 2, text: "x = 16"},
      {id: 3, text: "x = 4"},
      {id: 4, text: "x = 8"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "√16 = 4, então x = ±4",
    hint: "Raiz quadrada tem dois valores (+ e -)."
  },
  {
    uniqueId: "EX-ALG-M04-003",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: x² = 25",
    options: JSON.stringify([
      {id: 1, text: "x = 5 ou x = -5"},
      {id: 2, text: "x = 25"},
      {id: 3, text: "x = 5"},
      {id: 4, text: "x = 12,5"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "√25 = 5, então x = ±5",
    hint: "Tire a raiz quadrada."
  },
  {
    uniqueId: "EX-ALG-M04-004",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Na equação x² - 9 = 0, quais são as raízes?",
    options: JSON.stringify([
      {id: 1, text: "x = 3 ou x = -3"},
      {id: 2, text: "x = 9"},
      {id: 3, text: "x = 3"},
      {id: 4, text: "x = 81"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "x² = 9, então x = ±3",
    hint: "Isole x² primeiro."
  },
  {
    uniqueId: "EX-ALG-M04-005",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: x² = 36",
    options: JSON.stringify([
      {id: 1, text: "x = 6 ou x = -6"},
      {id: 2, text: "x = 36"},
      {id: 3, text: "x = 6"},
      {id: 4, text: "x = 18"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "√36 = 6, então x = ±6",
    hint: "Raiz quadrada de 36."
  },
  {
    uniqueId: "EX-ALG-M04-006",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Na equação x² - 4 = 0, quais são as raízes?",
    options: JSON.stringify([
      {id: 1, text: "x = 2 ou x = -2"},
      {id: 2, text: "x = 4"},
      {id: 3, text: "x = 2"},
      {id: 4, text: "x = 16"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "x² = 4, então x = ±2",
    hint: "Isole x²."
  },
  {
    uniqueId: "EX-ALG-M04-007",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: x² = 49",
    options: JSON.stringify([
      {id: 1, text: "x = 7 ou x = -7"},
      {id: 2, text: "x = 49"},
      {id: 3, text: "x = 7"},
      {id: 4, text: "x = 24,5"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "√49 = 7, então x = ±7",
    hint: "Raiz quadrada."
  },
  {
    uniqueId: "EX-ALG-M04-008",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Na equação x² - 1 = 0, quais são as raízes?",
    options: JSON.stringify([
      {id: 1, text: "x = 1 ou x = -1"},
      {id: 2, text: "x = 1"},
      {id: 3, text: "x = 0"},
      {id: 4, text: "x = 2"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "x² = 1, então x = ±1",
    hint: "Isole x²."
  },
  {
    uniqueId: "EX-ALG-M04-009",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: x² = 64",
    options: JSON.stringify([
      {id: 1, text: "x = 8 ou x = -8"},
      {id: 2, text: "x = 64"},
      {id: 3, text: "x = 8"},
      {id: 4, text: "x = 32"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "√64 = 8, então x = ±8",
    hint: "Raiz quadrada."
  },
  {
    uniqueId: "EX-ALG-M04-010",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Na equação x² - 16 = 0, quais são as raízes?",
    options: JSON.stringify([
      {id: 1, text: "x = 4 ou x = -4"},
      {id: 2, text: "x = 16"},
      {id: 3, text: "x = 4"},
      {id: 4, text: "x = 8"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "x² = 16, então x = ±4",
    hint: "Isole x²."
  },
  {
    uniqueId: "EX-ALG-M04-011",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: x² = 100",
    options: JSON.stringify([
      {id: 1, text: "x = 10 ou x = -10"},
      {id: 2, text: "x = 100"},
      {id: 3, text: "x = 10"},
      {id: 4, text: "x = 50"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "√100 = 10, então x = ±10",
    hint: "Raiz quadrada."
  },
  {
    uniqueId: "EX-ALG-M04-012",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Na equação x² - 25 = 0, quais são as raízes?",
    options: JSON.stringify([
      {id: 1, text: "x = 5 ou x = -5"},
      {id: 2, text: "x = 25"},
      {id: 3, text: "x = 5"},
      {id: 4, text: "x = 12,5"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "x² = 25, então x = ±5",
    hint: "Isole x²."
  },
  {
    uniqueId: "EX-ALG-M04-013",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: x² = 81",
    options: JSON.stringify([
      {id: 1, text: "x = 9 ou x = -9"},
      {id: 2, text: "x = 81"},
      {id: 3, text: "x = 9"},
      {id: 4, text: "x = 40,5"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "√81 = 9, então x = ±9",
    hint: "Raiz quadrada."
  },
  // Médios (5)
  {
    uniqueId: "EX-ALG-M04-014",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: x² + 5x = 0",
    options: JSON.stringify([
      {id: 1, text: "x = 0 ou x = -5"},
      {id: 2, text: "x = 5"},
      {id: 3, text: "x = 0"},
      {id: 4, text: "x = -5"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Fatore: x(x + 5) = 0, então x = 0 ou x = -5",
    hint: "Coloque x em evidência."
  },
  {
    uniqueId: "EX-ALG-M04-015",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: x² - 3x = 0",
    options: JSON.stringify([
      {id: 1, text: "x = 0 ou x = 3"},
      {id: 2, text: "x = 3"},
      {id: 3, text: "x = 0"},
      {id: 4, text: "x = -3"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Fatore: x(x - 3) = 0, então x = 0 ou x = 3",
    hint: "Coloque x em evidência."
  },
  {
    uniqueId: "EX-ALG-M04-016",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: 2x² = 8",
    options: JSON.stringify([
      {id: 1, text: "x = 2 ou x = -2"},
      {id: 2, text: "x = 4"},
      {id: 3, text: "x = 2"},
      {id: 4, text: "x = 16"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Divida por 2: x² = 4, então x = ±2",
    hint: "Simplifique primeiro."
  },
  {
    uniqueId: "EX-ALG-M04-017",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: x² + 4x = 0",
    options: JSON.stringify([
      {id: 1, text: "x = 0 ou x = -4"},
      {id: 2, text: "x = 4"},
      {id: 3, text: "x = 0"},
      {id: 4, text: "x = -4"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Fatore: x(x + 4) = 0, então x = 0 ou x = -4",
    hint: "Coloque x em evidência."
  },
  {
    uniqueId: "EX-ALG-M04-018",
    moduleId: MODULE_IDS.equacoes2grau,
    question: "Resolva: 3x² = 27",
    options: JSON.stringify([
      {id: 1, text: "x = 3 ou x = -3"},
      {id: 2, text: "x = 9"},
      {id: 3, text: "x = 3"},
      {id: 4, text: "x = 81"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Divida por 3: x² = 9, então x = ±3",
    hint: "Simplifique primeiro."
  },

  // MÓDULO 5: PRODUTOS NOTÁVEIS (18 exercícios)
  // Fáceis (11)
  {
    uniqueId: "EX-ALG-M05-001",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x + 2)²",
    options: JSON.stringify([
      {id: 1, text: "x² + 4x + 4"},
      {id: 2, text: "x² + 4"},
      {id: 3, text: "x² + 2x + 4"},
      {id: 4, text: "x² + 2"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x + 2)² = x² + 2(x)(2) + 2² = x² + 4x + 4",
    hint: "Use (a + b)² = a² + 2ab + b²."
  },
  {
    uniqueId: "EX-ALG-M05-002",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x - 3)²",
    options: JSON.stringify([
      {id: 1, text: "x² - 6x + 9"},
      {id: 2, text: "x² + 9"},
      {id: 3, text: "x² - 3x + 9"},
      {id: 4, text: "x² - 9"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x - 3)² = x² - 2(x)(3) + 3² = x² - 6x + 9",
    hint: "Use (a - b)² = a² - 2ab + b²."
  },
  {
    uniqueId: "EX-ALG-M05-003",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x + 1)²",
    options: JSON.stringify([
      {id: 1, text: "x² + 2x + 1"},
      {id: 2, text: "x² + 1"},
      {id: 3, text: "x² + x + 1"},
      {id: 4, text: "x² + 2"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x + 1)² = x² + 2(x)(1) + 1² = x² + 2x + 1",
    hint: "Quadrado da soma."
  },
  {
    uniqueId: "EX-ALG-M05-004",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x - 1)²",
    options: JSON.stringify([
      {id: 1, text: "x² - 2x + 1"},
      {id: 2, text: "x² + 1"},
      {id: 3, text: "x² - x + 1"},
      {id: 4, text: "x² - 1"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x - 1)² = x² - 2(x)(1) + 1² = x² - 2x + 1",
    hint: "Quadrado da diferença."
  },
  {
    uniqueId: "EX-ALG-M05-005",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x + 5)(x - 5)",
    options: JSON.stringify([
      {id: 1, text: "x² - 25"},
      {id: 2, text: "x² + 25"},
      {id: 3, text: "x² - 10x - 25"},
      {id: 4, text: "x² + 10x - 25"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x + 5)(x - 5) = x² - 5² = x² - 25",
    hint: "Produto da soma pela diferença: (a + b)(a - b) = a² - b²."
  },
  {
    uniqueId: "EX-ALG-M05-006",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x + 3)²",
    options: JSON.stringify([
      {id: 1, text: "x² + 6x + 9"},
      {id: 2, text: "x² + 9"},
      {id: 3, text: "x² + 3x + 9"},
      {id: 4, text: "x² + 3"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x + 3)² = x² + 2(x)(3) + 3² = x² + 6x + 9",
    hint: "Quadrado da soma."
  },
  {
    uniqueId: "EX-ALG-M05-007",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x - 2)²",
    options: JSON.stringify([
      {id: 1, text: "x² - 4x + 4"},
      {id: 2, text: "x² + 4"},
      {id: 3, text: "x² - 2x + 4"},
      {id: 4, text: "x² - 4"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x - 2)² = x² - 2(x)(2) + 2² = x² - 4x + 4",
    hint: "Quadrado da diferença."
  },
  {
    uniqueId: "EX-ALG-M05-008",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x + 4)(x - 4)",
    options: JSON.stringify([
      {id: 1, text: "x² - 16"},
      {id: 2, text: "x² + 16"},
      {id: 3, text: "x² - 8x - 16"},
      {id: 4, text: "x² + 8x - 16"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x + 4)(x - 4) = x² - 4² = x² - 16",
    hint: "Produto da soma pela diferença."
  },
  {
    uniqueId: "EX-ALG-M05-009",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x + 6)²",
    options: JSON.stringify([
      {id: 1, text: "x² + 12x + 36"},
      {id: 2, text: "x² + 36"},
      {id: 3, text: "x² + 6x + 36"},
      {id: 4, text: "x² + 6"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x + 6)² = x² + 2(x)(6) + 6² = x² + 12x + 36",
    hint: "Quadrado da soma."
  },
  {
    uniqueId: "EX-ALG-M05-010",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x - 4)²",
    options: JSON.stringify([
      {id: 1, text: "x² - 8x + 16"},
      {id: 2, text: "x² + 16"},
      {id: 3, text: "x² - 4x + 16"},
      {id: 4, text: "x² - 16"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x - 4)² = x² - 2(x)(4) + 4² = x² - 8x + 16",
    hint: "Quadrado da diferença."
  },
  {
    uniqueId: "EX-ALG-M05-011",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (x + 2)(x - 2)",
    options: JSON.stringify([
      {id: 1, text: "x² - 4"},
      {id: 2, text: "x² + 4"},
      {id: 3, text: "x² - 4x - 4"},
      {id: 4, text: "x² + 4x - 4"}
    ]),
    correctAnswer: 1,
    difficulty: "easy",
    points: 5,
    stepByStepExplanation: "(x + 2)(x - 2) = x² - 2² = x² - 4",
    hint: "Produto da soma pela diferença."
  },
  // Médios (7)
  {
    uniqueId: "EX-ALG-M05-012",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Fatore: x² + 8x + 16",
    options: JSON.stringify([
      {id: 1, text: "(x + 4)²"},
      {id: 2, text: "(x + 8)²"},
      {id: 3, text: "(x + 4)(x + 4)"},
      {id: 4, text: "x(x + 8) + 16"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Trinômio quadrado perfeito: x² + 8x + 16 = (x + 4)²",
    hint: "Reconheça o padrão a² + 2ab + b²."
  },
  {
    uniqueId: "EX-ALG-M05-013",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Fatore: x² - 10x + 25",
    options: JSON.stringify([
      {id: 1, text: "(x - 5)²"},
      {id: 2, text: "(x - 10)²"},
      {id: 3, text: "(x - 5)(x - 5)"},
      {id: 4, text: "x(x - 10) + 25"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Trinômio quadrado perfeito: x² - 10x + 25 = (x - 5)²",
    hint: "Reconheça o padrão a² - 2ab + b²."
  },
  {
    uniqueId: "EX-ALG-M05-014",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Fatore: x² - 9",
    options: JSON.stringify([
      {id: 1, text: "(x + 3)(x - 3)"},
      {id: 2, text: "(x - 9)(x + 1)"},
      {id: 3, text: "x(x - 9)"},
      {id: 4, text: "(x - 3)²"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Diferença de quadrados: x² - 9 = x² - 3² = (x + 3)(x - 3)",
    hint: "Use a² - b² = (a + b)(a - b)."
  },
  {
    uniqueId: "EX-ALG-M05-015",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (2x + 3)²",
    options: JSON.stringify([
      {id: 1, text: "4x² + 12x + 9"},
      {id: 2, text: "4x² + 9"},
      {id: 3, text: "2x² + 6x + 9"},
      {id: 4, text: "4x² + 6x + 9"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "(2x + 3)² = (2x)² + 2(2x)(3) + 3² = 4x² + 12x + 9",
    hint: "Use (a + b)² = a² + 2ab + b²."
  },
  {
    uniqueId: "EX-ALG-M05-016",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Fatore: x² + 6x + 9",
    options: JSON.stringify([
      {id: 1, text: "(x + 3)²"},
      {id: 2, text: "(x + 6)²"},
      {id: 3, text: "(x + 3)(x + 3)"},
      {id: 4, text: "x(x + 6) + 9"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Trinômio quadrado perfeito: x² + 6x + 9 = (x + 3)²",
    hint: "Reconheça o padrão."
  },
  {
    uniqueId: "EX-ALG-M05-017",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Fatore: x² - 16",
    options: JSON.stringify([
      {id: 1, text: "(x + 4)(x - 4)"},
      {id: 2, text: "(x - 16)(x + 1)"},
      {id: 3, text: "x(x - 16)"},
      {id: 4, text: "(x - 4)²"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "Diferença de quadrados: x² - 16 = (x + 4)(x - 4)",
    hint: "Use a² - b²."
  },
  {
    uniqueId: "EX-ALG-M05-018",
    moduleId: MODULE_IDS.produtosNotaveis,
    question: "Desenvolva: (3x - 2)²",
    options: JSON.stringify([
      {id: 1, text: "9x² - 12x + 4"},
      {id: 2, text: "9x² + 4"},
      {id: 3, text: "3x² - 6x + 4"},
      {id: 4, text: "9x² - 6x + 4"}
    ]),
    correctAnswer: 1,
    difficulty: "moderate",
    points: 10,
    stepByStepExplanation: "(3x - 2)² = (3x)² - 2(3x)(2) + 2² = 9x² - 12x + 4",
    hint: "Use (a - b)² = a² - 2ab + b²."
  }
];

console.log(`Inserindo ${exercises.length} exercícios de Álgebra Básica...`);

for (const exercise of exercises) {
  try {
    const [result] = await connection.execute(
      `INSERT INTO standalone_exercises 
       (uniqueId, title, moduleId, question, options, correctAnswer, difficulty, points, stepByStepExplanation, hint, exerciseType) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        exercise.uniqueId,
        exercise.uniqueId,
        exercise.moduleId,
        exercise.question,
        exercise.options,
        String(exercise.correctAnswer),
        exercise.difficulty,
        exercise.points,
        exercise.stepByStepExplanation,
        exercise.hint,
        'multiple_choice'
      ]
    );
    console.log(`✅ ${exercise.uniqueId} inserido`);
  } catch (error) {
    console.error(`❌ Erro ao inserir ${exercise.uniqueId}:`, error.message);
  }
}

console.log('\n✅ Seed completo! 90 exercícios de Álgebra Básica inseridos.');
console.log('\nResumo:');
console.log('- Módulo 1 (Variáveis): 18 exercícios (13 fáceis + 5 médios)');
console.log('- Módulo 2 (Equações 1º Grau): 18 exercícios (13 fáceis + 5 médios)');
console.log('- Módulo 3 (Sistemas): 18 exercícios (13 fáceis + 5 médios)');
console.log('- Módulo 4 (Equações 2º Grau): 18 exercícios (13 fáceis + 5 médios)');
console.log('- Módulo 5 (Produtos Notáveis): 18 exercícios (11 fáceis + 7 médios)');
console.log('\nTotal: 90 exercícios (63 fáceis + 27 médios) = 585 pontos');

await connection.end();
