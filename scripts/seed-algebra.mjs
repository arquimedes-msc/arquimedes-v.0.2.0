#!/usr/bin/env node
/**
 * Script de Seed - Módulo de Álgebra (Versão Pragmática)
 * 
 * Popula o banco de dados com:
 * - 5 módulos de Álgebra
 * - 17 aulas (pages) com conteúdo real
 * - 20 exercícios de exemplo (5 por tipo: easy, moderate, difficult, interactive)
 * 
 * Uso: node scripts/seed-algebra.mjs
 */

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { disciplines, modules, pages, standaloneExercises } from '../drizzle/schema.ts';
import { eq, and } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log('🚀 Iniciando seed do módulo de Álgebra...\n');

// ============================================================================
// PASSO 1: Buscar disciplina de Matemática
// ============================================================================

console.log('📚 Passo 1: Buscando disciplina de Álgebra...');
const allDisciplines = await db.select().from(disciplines).limit(10);
console.log('Disciplinas encontradas:', allDisciplines.map(d => d.name));

const algebraDiscipline = allDisciplines.find(d => d.name === 'Álgebra');

if (!algebraDiscipline) {
  console.error('❌ Disciplina de Álgebra não encontrada!');
  console.log('Disciplinas disponíveis:', allDisciplines.map(d => `${d.id}: ${d.name}`));
  process.exit(1);
}

console.log(`✅ Disciplina encontrada: ${algebraDiscipline.name} (ID: ${algebraDiscipline.id})\n`);

// ============================================================================
// PASSO 2: Criar 5 módulos de Álgebra
// ============================================================================

console.log('📐 Passo 2: Criando módulos de Álgebra...');

const algebraModulesData = [
  {
    name: 'Álgebra - Introdução às Variáveis e Expressões',
    slug: 'algebra-variaveis-expressoes',
    description: 'Aprenda o que são variáveis, como criar expressões algébricas e simplificar termos semelhantes.',
    order: 10,
  },
  {
    name: 'Álgebra - Equações do 1º Grau',
    slug: 'algebra-equacoes-1grau',
    description: 'Domine a resolução de equações do primeiro grau e problemas práticos do cotidiano.',
    order: 11,
  },
  {
    name: 'Álgebra - Sistemas de Equações do 1º Grau',
    slug: 'algebra-sistemas-equacoes',
    description: 'Resolva sistemas de equações usando os métodos da substituição e da adição.',
    order: 12,
  },
  {
    name: 'Álgebra - Equações do 2º Grau',
    slug: 'algebra-equacoes-2grau',
    description: 'Entenda equações quadráticas, fórmula de Bhaskara e aplicações práticas.',
    order: 13,
  },
  {
    name: 'Álgebra - Produtos Notáveis e Fatoração Básica',
    slug: 'algebra-produtos-notaveis',
    description: 'Aprenda produtos notáveis, fatoração e simplifique expressões algébricas complexas.',
    order: 14,
  },
];

const createdModules = [];

for (const moduleData of algebraModulesData) {
  // Verificar se módulo já existe
  const existing = await db.select().from(modules).where(
    and(
      eq(modules.disciplineId, algebraDiscipline.id),
      eq(modules.slug, moduleData.slug)
    )
  ).limit(1);

  if (existing.length > 0) {
    console.log(`⏭️  Módulo "${moduleData.name}" já existe (ID: ${existing[0].id})`);
    createdModules.push(existing[0]);
  } else {
    const [result] = await db.insert(modules).values({
      disciplineId: algebraDiscipline.id,
      ...moduleData,
    });
    const moduleId = result.insertId;
    console.log(`✅ Módulo "${moduleData.name}" criado (ID: ${moduleId})`);
    createdModules.push({ id: moduleId, ...moduleData });
  }
}

console.log(`\n✅ ${createdModules.length} módulos de Álgebra prontos!\n`);

// ============================================================================
// PASSO 3: Popular 17 aulas (pages)
// ============================================================================

console.log('📝 Passo 3: Populando 17 aulas...');

const lessonsData = [
  // Módulo 1: 3 aulas
  { 
    moduleId: createdModules[0].id, 
    order: 1, 
    title: 'O que são Variáveis?', 
    estimatedMinutes: 45,
    mainText: `# O que são Variáveis?

## 🎯 Objetivo da Aula

Nesta aula, você vai aprender o conceito fundamental de **variável** na álgebra. Variáveis são como "caixas" que guardam valores que podem mudar. Elas são representadas por letras (x, y, z, a, b, etc.) e são a base de toda a álgebra.

## 📚 Conceito de Variável

Uma **variável** é um símbolo (geralmente uma letra) que representa um valor desconhecido ou que pode variar.

**Exemplo prático:**
- Se você tem x maçãs e ganha mais 3 maçãs, você terá **x + 3** maçãs.
- Se um produto custa R$ y e você compra 2 unidades, você gastará **2y** reais.

## 🔢 Notação Algébrica

Na álgebra, usamos notações especiais:

| Notação | Significado | Exemplo |
|---------|-------------|---------|
| 2x | 2 vezes x | Se x = 5, então 2x = 10 |
| xy | x vezes y | Se x = 3 e y = 4, então xy = 12 |
| x² | x ao quadrado | Se x = 5, então x² = 25 |

## ✏️ Exercício 1

Se x = 7, qual é o valor de 3x?

**Solução:** 3 × 7 = 21

## 💡 Dica Importante

Quando não há sinal entre um número e uma letra, significa **multiplicação**. Então 5x significa "5 vezes x".

---

**Tempo estimado:** 45 minutos  
**Próxima aula:** Expressões Algébricas`
  },
  { 
    moduleId: createdModules[0].id, 
    order: 2, 
    title: 'Expressões Algébricas', 
    estimatedMinutes: 50,
    mainText: `# Expressões Algébricas

## 🎯 Objetivo da Aula

Aprender a criar e interpretar expressões algébricas, identificando seus componentes (termos, coeficientes, constantes).

## 📚 O que é uma Expressão Algébrica?

Uma **expressão algébrica** é uma combinação de números, variáveis e operações matemáticas (+, -, ×, ÷).

**Exemplos:**
- 3x + 5
- 2y - 7
- x² + 4x + 3

## 🔍 Partes de uma Expressão

| Parte | Definição | Exemplo em "3x + 5" |
|-------|-----------|---------------------|
| Termo | Cada parte separada por + ou - | 3x e 5 |
| Coeficiente | Número que multiplica a variável | 3 |
| Constante | Número sem variável | 5 |

## ✏️ Exercício 2

Identifique os termos, coeficientes e constantes em: **5x + 2y - 8**

**Solução:**
- Termos: 5x, 2y, -8
- Coeficientes: 5 (de x), 2 (de y)
- Constante: -8

---

**Tempo estimado:** 50 minutos`
  },
  { 
    moduleId: createdModules[0].id, 
    order: 3, 
    title: 'Termos Semelhantes e Simplificação', 
    estimatedMinutes: 40,
    mainText: `# Termos Semelhantes e Simplificação

## 🎯 Objetivo da Aula

Aprender a identificar termos semelhantes e simplificar expressões algébricas.

## 📚 Termos Semelhantes

**Termos semelhantes** são termos que têm as mesmas variáveis elevadas aos mesmos expoentes.

**Exemplos:**
- 3x e 5x são semelhantes (ambos têm x)
- 2y² e 7y² são semelhantes (ambos têm y²)
- 3x e 5y **NÃO** são semelhantes (variáveis diferentes)

## 🔧 Como Simplificar

Para simplificar, **some ou subtraia os coeficientes** de termos semelhantes.

**Exemplo:**
5x + 3x = (5 + 3)x = 8x

## ✏️ Exercício 3

Simplifique: 4x + 2y + 3x - y

**Solução:**
- Termos com x: 4x + 3x = 7x
- Termos com y: 2y - y = y
- Resultado: **7x + y**

---

**Tempo estimado:** 40 minutos`
  },
  
  // Módulo 2: 4 aulas
  { 
    moduleId: createdModules[1].id, 
    order: 1, 
    title: 'O que é uma Equação?', 
    estimatedMinutes: 40,
    mainText: `# O que é uma Equação?

## 🎯 Objetivo da Aula

Entender o conceito de equação como uma balança equilibrada e aprender a verificar soluções.

## 📚 Conceito de Equação

Uma **equação** é uma igualdade matemática que contém uma ou mais variáveis. O objetivo é encontrar o valor da variável que torna a igualdade verdadeira.

**Exemplo:** x + 5 = 12

Isso significa: "Qual número somado a 5 resulta em 12?"

## ⚖️ Equação como Balança

Pense na equação como uma balança equilibrada:
- O lado esquerdo (x + 5) deve ter o mesmo "peso" que o lado direito (12)
- Para manter o equilíbrio, o que você faz de um lado, deve fazer do outro

## ✏️ Exercício 4

Verifique se x = 7 é solução de x + 5 = 12

**Solução:**
- Substitua x por 7: 7 + 5 = 12
- 12 = 12 ✅ Verdadeiro!
- Portanto, x = 7 é a solução.

---

**Tempo estimado:** 40 minutos`
  },
  { 
    moduleId: createdModules[1].id, 
    order: 2, 
    title: 'Resolver Equações Simples', 
    estimatedMinutes: 45,
    mainText: `# Resolver Equações Simples

## 🎯 Objetivo da Aula

Aprender a resolver equações do 1º grau usando operações inversas.

## 🔧 Operações Inversas

Para isolar a variável, use a operação inversa:

| Operação | Inversa |
|----------|---------|
| + (adição) | - (subtração) |
| - (subtração) | + (adição) |
| × (multiplicação) | ÷ (divisão) |
| ÷ (divisão) | × (multiplicação) |

## 📝 Exemplos Resolvidos

**Exemplo 1:** x + 5 = 12
- Subtraia 5 de ambos os lados: x = 12 - 5
- x = 7 ✅

**Exemplo 2:** 3x = 21
- Divida ambos os lados por 3: x = 21 ÷ 3
- x = 7 ✅

## ✏️ Exercício 5

Resolva: 2x + 3 = 11

**Solução:**
- Subtraia 3: 2x = 8
- Divida por 2: x = 4 ✅

---

**Tempo estimado:** 45 minutos`
  },
  { 
    moduleId: createdModules[1].id, 
    order: 3, 
    title: 'Equações com Parênteses', 
    estimatedMinutes: 45,
    mainText: `# Equações com Parênteses

## 🎯 Objetivo da Aula

Aprender a resolver equações que contêm parênteses usando a propriedade distributiva.

## 📚 Propriedade Distributiva

Para eliminar parênteses, multiplique o número de fora por cada termo dentro:

**a(b + c) = ab + ac**

**Exemplo:** 3(x + 2) = 3x + 6

## 📝 Exemplo Resolvido

Resolva: 2(x + 3) = 14

**Passo 1:** Elimine os parênteses
- 2x + 6 = 14

**Passo 2:** Subtraia 6
- 2x = 8

**Passo 3:** Divida por 2
- x = 4 ✅

## ✏️ Exercício 6

Resolva: 3(x - 2) + 5 = 20

**Solução:**
- 3x - 6 + 5 = 20
- 3x - 1 = 20
- 3x = 21
- x = 7 ✅

---

**Tempo estimado:** 45 minutos`
  },
  { 
    moduleId: createdModules[1].id, 
    order: 4, 
    title: 'Problemas Práticos com Equações', 
    estimatedMinutes: 40,
    mainText: `# Problemas Práticos com Equações

## 🎯 Objetivo da Aula

Aplicar equações do 1º grau para resolver problemas do cotidiano.

## 📝 Estratégia de Resolução

1. **Leia** o problema com atenção
2. **Identifique** o que é desconhecido (variável)
3. **Monte** a equação
4. **Resolva** a equação
5. **Verifique** se a resposta faz sentido

## 💼 Exemplo Prático

**Problema:** Maria tem 5 anos a mais que João. Se a soma das idades é 35, quantos anos João tem?

**Solução:**
- Seja x = idade de João
- Maria = x + 5
- Equação: x + (x + 5) = 35
- 2x + 5 = 35
- 2x = 30
- x = 15 anos ✅

## ✏️ Exercício 7

Um táxi cobra R$ 5 de bandeirada mais R$ 2 por km. Se a corrida custou R$ 25, quantos km foram percorridos?

**Solução:**
- Equação: 5 + 2x = 25
- 2x = 20
- x = 10 km ✅

---

**Tempo estimado:** 40 minutos`
  },
  
  // Módulo 3: 3 aulas
  { 
    moduleId: createdModules[2].id, 
    order: 1, 
    title: 'Introdução aos Sistemas de Equações', 
    estimatedMinutes: 40,
    mainText: `# Introdução aos Sistemas de Equações

## 🎯 Objetivo da Aula

Entender o que é um sistema de equações e quando usá-lo.

## 📚 O que é um Sistema?

Um **sistema de equações** é um conjunto de duas ou mais equações com as mesmas variáveis.

**Exemplo:**
\`\`\`
x + y = 10
x - y = 2
\`\`\`

A solução é o par (x, y) que satisfaz **ambas** as equações.

## 🎯 Quando Usar Sistemas?

Use sistemas quando você tem:
- Duas ou mais incógnitas
- Duas ou mais informações relacionadas

**Exemplo prático:** Ana e Bruno juntos têm R$ 100. Ana tem R$ 20 a mais que Bruno. Quanto cada um tem?

---

**Tempo estimado:** 40 minutos`
  },
  { 
    moduleId: createdModules[2].id, 
    order: 2, 
    title: 'Método da Substituição', 
    estimatedMinutes: 45,
    mainText: `# Método da Substituição

## 🎯 Objetivo da Aula

Aprender a resolver sistemas de equações pelo método da substituição.

## 🔧 Como Funciona?

1. **Isole** uma variável em uma das equações
2. **Substitua** na outra equação
3. **Resolva** a equação resultante
4. **Volte** para encontrar a outra variável

## 📝 Exemplo Resolvido

Sistema:
\`\`\`
y = x + 2
x + y = 8
\`\`\`

**Passo 1:** y já está isolado na primeira equação

**Passo 2:** Substitua na segunda
- x + (x + 2) = 8
- 2x + 2 = 8
- 2x = 6
- x = 3 ✅

**Passo 3:** Volte para encontrar y
- y = 3 + 2 = 5 ✅

**Solução:** (3, 5)

---

**Tempo estimado:** 45 minutos`
  },
  { 
    moduleId: createdModules[2].id, 
    order: 3, 
    title: 'Método da Adição', 
    estimatedMinutes: 45,
    mainText: `# Método da Adição

## 🎯 Objetivo da Aula

Aprender a resolver sistemas de equações pelo método da adição (ou eliminação).

## 🔧 Como Funciona?

1. **Some** ou **subtraia** as equações para eliminar uma variável
2. **Resolva** a equação resultante
3. **Substitua** para encontrar a outra variável

## 📝 Exemplo Resolvido

Sistema:
\`\`\`
x + y = 10
x - y = 2
\`\`\`

**Passo 1:** Some as equações
- (x + y) + (x - y) = 10 + 2
- 2x = 12
- x = 6 ✅

**Passo 2:** Substitua em qualquer equação
- 6 + y = 10
- y = 4 ✅

**Solução:** (6, 4)

---

**Tempo estimado:** 45 minutos`
  },
  
  // Módulo 4: 4 aulas
  { 
    moduleId: createdModules[3].id, 
    order: 1, 
    title: 'O que é uma Equação do 2º Grau?', 
    estimatedMinutes: 40,
    mainText: `# O que é uma Equação do 2º Grau?

## 🎯 Objetivo da Aula

Entender o conceito de equação do 2º grau e identificar seus coeficientes.

## 📚 Definição

Uma **equação do 2º grau** é uma equação da forma:

**ax² + bx + c = 0**

Onde:
- a, b, c são números (coeficientes)
- a ≠ 0 (se a = 0, vira equação do 1º grau)
- x é a variável

## 📝 Exemplos

| Equação | a | b | c |
|---------|---|---|---|
| x² + 5x + 6 = 0 | 1 | 5 | 6 |
| 2x² - 3x + 1 = 0 | 2 | -3 | 1 |
| x² - 9 = 0 | 1 | 0 | -9 |

---

**Tempo estimado:** 40 minutos`
  },
  { 
    moduleId: createdModules[3].id, 
    order: 2, 
    title: 'Equações Incompletas', 
    estimatedMinutes: 45,
    mainText: `# Equações Incompletas

## 🎯 Objetivo da Aula

Aprender a resolver equações do 2º grau incompletas (quando b = 0 ou c = 0).

## 📚 Tipos de Equações Incompletas

**Tipo 1: ax² + c = 0** (falta o termo bx)

Exemplo: x² - 9 = 0
- x² = 9
- x = ±3 ✅

**Tipo 2: ax² + bx = 0** (falta o termo c)

Exemplo: x² + 5x = 0
- x(x + 5) = 0
- x = 0 ou x = -5 ✅

---

**Tempo estimado:** 45 minutos`
  },
  { 
    moduleId: createdModules[3].id, 
    order: 3, 
    title: 'Fórmula de Bhaskara', 
    estimatedMinutes: 50,
    mainText: `# Fórmula de Bhaskara

## 🎯 Objetivo da Aula

Aprender a resolver equações do 2º grau completas usando a fórmula de Bhaskara.

## 📚 A Fórmula

Para resolver **ax² + bx + c = 0**, use:

**Δ = b² - 4ac** (discriminante)

**x = (-b ± √Δ) / 2a**

## 🔍 Interpretação do Discriminante

| Δ | Significado |
|---|-------------|
| Δ > 0 | 2 raízes reais distintas |
| Δ = 0 | 1 raiz real (dupla) |
| Δ < 0 | Sem raízes reais |

## 📝 Exemplo Resolvido

Resolva: x² - 5x + 6 = 0

**Passo 1:** Identifique a, b, c
- a = 1, b = -5, c = 6

**Passo 2:** Calcule Δ
- Δ = (-5)² - 4(1)(6) = 25 - 24 = 1

**Passo 3:** Aplique a fórmula
- x = (5 ± 1) / 2
- x₁ = 3, x₂ = 2 ✅

---

**Tempo estimado:** 50 minutos`
  },
  { 
    moduleId: createdModules[3].id, 
    order: 4, 
    title: 'Problemas Práticos com Equações do 2º Grau', 
    estimatedMinutes: 35,
    mainText: `# Problemas Práticos

## 🎯 Objetivo da Aula

Aplicar equações do 2º grau em problemas do cotidiano.

## 📝 Exemplo Prático

**Problema:** Um terreno retangular tem comprimento 3 m maior que a largura. Se a área é 40 m², qual a largura?

**Solução:**
- Seja x = largura
- Comprimento = x + 3
- Área: x(x + 3) = 40
- x² + 3x - 40 = 0
- Δ = 9 + 160 = 169
- x = (-3 + 13) / 2 = 5 m ✅

---

**Tempo estimado:** 35 minutos`
  },
  
  // Módulo 5: 3 aulas
  { 
    moduleId: createdModules[4].id, 
    order: 1, 
    title: 'Quadrado da Soma e Diferença', 
    estimatedMinutes: 45,
    mainText: `# Quadrado da Soma e Diferença

## 🎯 Objetivo da Aula

Aprender os produtos notáveis (a + b)² e (a - b)².

## 📚 Fórmulas

**(a + b)² = a² + 2ab + b²**

**(a - b)² = a² - 2ab + b²**

## 📝 Exemplos

**(x + 3)² = x² + 6x + 9**

**(x - 2)² = x² - 4x + 4**

---

**Tempo estimado:** 45 minutos`
  },
  { 
    moduleId: createdModules[4].id, 
    order: 2, 
    title: 'Produto da Soma pela Diferença', 
    estimatedMinutes: 45,
    mainText: `# Produto da Soma pela Diferença

## 🎯 Objetivo da Aula

Aprender o produto notável (a + b)(a - b).

## 📚 Fórmula

**(a + b)(a - b) = a² - b²**

## 📝 Exemplo

**(x + 5)(x - 5) = x² - 25**

---

**Tempo estimado:** 45 minutos`
  },
  { 
    moduleId: createdModules[4].id, 
    order: 3, 
    title: 'Fatoração Básica', 
    estimatedMinutes: 40,
    mainText: `# Fatoração Básica

## 🎯 Objetivo da Aula

Aprender a fatorar expressões algébricas.

## 📚 Tipos de Fatoração

**1. Fator Comum:**
6x + 9 = 3(2x + 3)

**2. Diferença de Quadrados:**
x² - 16 = (x + 4)(x - 4)

**3. Trinômio Quadrado Perfeito:**
x² + 6x + 9 = (x + 3)²

---

**Tempo estimado:** 40 minutos`
  },
];

let lessonsCreated = 0;

for (const lessonData of lessonsData) {
  const slug = lessonData.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Verificar se aula já existe
  const existing = await db.select().from(pages).where(
    and(
      eq(pages.moduleId, lessonData.moduleId),
      eq(pages.slug, slug)
    )
  ).limit(1);
  
  if (existing.length === 0) {
    await db.insert(pages).values({
      moduleId: lessonData.moduleId,
      title: lessonData.title,
      slug,
      order: lessonData.order,
      mainText: lessonData.mainText,
      estimatedMinutes: lessonData.estimatedMinutes,
    });
    lessonsCreated++;
    console.log(`✅ Aula "${lessonData.title}" criada`);
  } else {
    console.log(`⏭️  Aula "${lessonData.title}" já existe`);
  }
}

console.log(`\n✅ ${lessonsCreated} aulas criadas!\n`);

// ============================================================================
// PASSO 4: Popular exercícios de exemplo
// ============================================================================

console.log('📝 Passo 4: Populando exercícios de exemplo...');

const exercisesData = [
  // Exercícios Módulo 1
  {
    uniqueId: 'EX-ALG-M01-001',
    title: 'Valor de 3x quando x = 4',
    question: 'Qual é o valor de 3x quando x = 4?',
    exerciseType: 'multiple_choice',
    options: JSON.stringify(['7', '12', '34', '43']),
    correctAnswer: '1',
    stepByStepExplanation: 'Substitua x por 4: 3 × 4 = 12',
    hint: 'Multiplique o coeficiente (3) pelo valor de x (4).',
    difficulty: 'easy',
    points: 5,
    moduleId: createdModules[0].id,
  },
  {
    uniqueId: 'EX-ALG-M01-002',
    title: 'Simplificar 5x + 3x',
    question: 'Simplifique a expressão: 5x + 3x',
    exerciseType: 'multiple_choice',
    options: JSON.stringify(['8x', '8x²', '15x', '5x + 3x (não pode simplificar)']),
    correctAnswer: '0',
    stepByStepExplanation: 'Termos semelhantes: 5x + 3x = (5 + 3)x = 8x',
    hint: 'Some os coeficientes de termos com a mesma variável.',
    difficulty: 'easy',
    points: 5,
    moduleId: createdModules[0].id,
  },
  
  // Exercícios Módulo 2
  {
    uniqueId: 'EX-ALG-M02-001',
    title: 'Resolver x + 5 = 12',
    question: 'Resolva: x + 5 = 12',
    exerciseType: 'multiple_choice',
    options: JSON.stringify(['7', '17', '60', '2.4']),
    correctAnswer: '0',
    stepByStepExplanation: 'x = 12 - 5 = 7',
    hint: 'Subtraia 5 de ambos os lados.',
    difficulty: 'easy',
    points: 5,
    moduleId: createdModules[1].id,
  },
  {
    uniqueId: 'EX-ALG-M02-002',
    title: 'Resolver 4x = 20',
    question: 'Resolva: 4x = 20',
    exerciseType: 'multiple_choice',
    options: JSON.stringify(['5', '16', '24', '80']),
    correctAnswer: '0',
    stepByStepExplanation: 'x = 20 ÷ 4 = 5',
    hint: 'Divida ambos os lados por 4.',
    difficulty: 'easy',
    points: 5,
    moduleId: createdModules[1].id,
  },
  
  // Exercícios Interativos - FillInBlanks
  {
    uniqueId: 'INT-ALG-FB-001',
    title: 'Simplificar 4x + 3x',
    question: 'Simplifique a expressão: 4x + 3x = {blank1}x',
    exerciseType: 'fill_blanks',
    correctAnswer: JSON.stringify({ blank1: '7' }),
    stepByStepExplanation: 'Some os coeficientes: 4 + 3 = 7',
    hint: 'Some os coeficientes de termos com x.',
    difficulty: 'easy',
    points: 5,
    moduleId: createdModules[0].id,
  },
  {
    uniqueId: 'INT-ALG-FB-002',
    title: 'Resolver x + 8 = 15',
    question: 'Resolva: x + 8 = 15. Resposta: x = {blank1}',
    exerciseType: 'fill_blanks',
    correctAnswer: JSON.stringify({ blank1: '7' }),
    stepByStepExplanation: 'x = 15 - 8 = 7',
    hint: 'Subtraia 8 de ambos os lados.',
    difficulty: 'easy',
    points: 5,
    moduleId: createdModules[1].id,
  },
  
  // Exercícios Interativos - Slider
  {
    uniqueId: 'INT-ALG-SL-001',
    title: 'Estimar valor de x em 2x = 14',
    question: 'Estime o valor de x se 2x = 14',
    exerciseType: 'slider',
    correctAnswer: JSON.stringify({ value: 7, tolerance: 1, min: 0, max: 20 }),
    stepByStepExplanation: 'x = 14 ÷ 2 = 7',
    hint: 'Pense: 2 vezes qual número dá 14?',
    difficulty: 'easy',
    points: 5,
    moduleId: createdModules[0].id,
  },
  {
    uniqueId: 'INT-ALG-SL-002',
    title: 'Estimar valor de x em x + 12 = 25',
    question: 'Estime o valor de x na equação: x + 12 = 25',
    exerciseType: 'slider',
    correctAnswer: JSON.stringify({ value: 13, tolerance: 1, min: 0, max: 30 }),
    stepByStepExplanation: 'x = 25 - 12 = 13',
    hint: 'Quanto falta para 12 chegar a 25?',
    difficulty: 'easy',
    points: 5,
    moduleId: createdModules[1].id,
  },
  
  // Exercícios Interativos - Matching
  {
    uniqueId: 'INT-ALG-MG-001',
    title: 'Conectar expressões e valores',
    question: 'Conecte cada expressão ao seu valor quando x = 3',
    exerciseType: 'matching',
    correctAnswer: JSON.stringify({
      pairs: [
        { left: '2x', right: '6' },
        { left: 'x + 5', right: '8' },
        { left: '3x', right: '9' },
        { left: 'x - 1', right: '2' }
      ]
    }),
    stepByStepExplanation: 'Substitua x por 3 em cada expressão: 2(3)=6, 3+5=8, 3(3)=9, 3-1=2',
    hint: 'Substitua x por 3 em cada expressão.',
    difficulty: 'easy',
    points: 5,
    moduleId: createdModules[0].id,
  },
  {
    uniqueId: 'INT-ALG-MG-002',
    title: 'Conectar equações e soluções',
    question: 'Conecte cada equação à sua solução',
    exerciseType: 'matching',
    correctAnswer: JSON.stringify({
      pairs: [
        { left: 'x + 5 = 12', right: 'x = 7' },
        { left: '2x = 14', right: 'x = 7' },
        { left: 'x - 3 = 10', right: 'x = 13' },
        { left: '3x = 9', right: 'x = 3' }
      ]
    }),
    stepByStepExplanation: 'Resolva cada equação isolando x: x+5=12 → x=7, 2x=14 → x=7, x-3=10 → x=13, 3x=9 → x=3',
    hint: 'Resolva cada equação isolando x.',
    difficulty: 'moderate',
    points: 10,
    moduleId: createdModules[1].id,
  },
];

let exercisesCreated = 0;

for (const exercise of exercisesData) {
  // Verificar se exercício já existe
  const existing = await db.select().from(standaloneExercises).where(
    eq(standaloneExercises.uniqueId, exercise.uniqueId)
  ).limit(1);
  
  if (existing.length === 0) {
    await db.insert(standaloneExercises).values(exercise);
    exercisesCreated++;
    console.log(`✅ Exercício ${exercise.uniqueId} criado`);
  } else {
    console.log(`⏭️  Exercício ${exercise.uniqueId} já existe`);
  }
}

console.log(`\n✅ ${exercisesCreated} exercícios criados!\n`);

// ============================================================================
// FINALIZAÇÃO
// ============================================================================

await connection.end();

console.log('🎉 Seed do módulo de Álgebra concluído com sucesso!');
console.log('\n📊 Resumo:');
console.log(`- Módulos: ${createdModules.length}`);
console.log(`- Aulas: ${lessonsCreated}`);
console.log(`- Exercícios: ${exercisesCreated}`);
console.log('\n✅ Banco de dados populado!');
console.log('\n💡 Próximos passos:');
console.log('- Acesse a plataforma e navegue pelos módulos de Álgebra');
console.log('- Teste as aulas e exercícios');
console.log('- Expanda com mais exercícios conforme necessário');
