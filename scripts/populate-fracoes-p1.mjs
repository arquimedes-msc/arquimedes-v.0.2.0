import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const moduleId = 4; // Frações

const page1Content = `# O que são Frações?

## Introdução

As **frações** são uma forma de representar partes de um todo. Quando dividimos algo em partes iguais e pegamos algumas dessas partes, estamos trabalhando com frações. Elas estão presentes no nosso dia a dia: ao dividir uma pizza, medir ingredientes em uma receita, ou calcular descontos em compras.

## Componentes de uma Fração

Uma fração é composta por dois números separados por uma linha horizontal:

**Numerador / Denominador**

- **Numerador**: O número acima da linha, que indica quantas partes estamos considerando
- **Denominador**: O número abaixo da linha, que indica em quantas partes iguais o todo foi dividido

### Exemplo Prático

Imagine uma pizza dividida em 8 fatias iguais. Se você comeu 3 fatias, podemos representar isso como:

**3/8** (três oitavos)

- Numerador = 3 (fatias que você comeu)
- Denominador = 8 (total de fatias da pizza)

## Representação Visual

As frações podem ser representadas de várias formas visuais:

### 1. Círculos (Pizzas)
Uma pizza dividida em 4 partes, com 1 parte pintada, representa **1/4**.

### 2. Barras Retangulares
Um retângulo dividido em 5 partes iguais, com 3 partes coloridas, representa **3/5**.

### 3. Conjuntos de Objetos
Se você tem 10 bolas e 6 são vermelhas, a fração de bolas vermelhas é **6/10**.

## Tipos de Frações

### Frações Próprias
São frações onde o **numerador é menor que o denominador**. Elas representam uma quantidade menor que 1 (um inteiro).

**Exemplos:**
- 1/2 (um meio)
- 3/4 (três quartos)
- 5/8 (cinco oitavos)

### Frações Impróprias
São frações onde o **numerador é maior ou igual ao denominador**. Elas representam uma quantidade maior ou igual a 1.

**Exemplos:**
- 5/4 (cinco quartos = 1 inteiro e 1/4)
- 7/3 (sete terços = 2 inteiros e 1/3)
- 8/8 (oito oitavos = 1 inteiro)

### Frações Aparentes
São frações impróprias onde o **numerador é múltiplo do denominador**, resultando em um número inteiro.

**Exemplos:**
- 8/4 = 2
- 12/3 = 4
- 15/5 = 3

## Leitura de Frações

A leitura das frações segue um padrão:

- **1/2**: um meio
- **1/3**: um terço
- **1/4**: um quarto
- **1/5**: um quinto
- **2/5**: dois quintos
- **3/8**: três oitavos

Para denominadores maiores que 10, usamos a palavra "avos":
- **7/11**: sete onze avos
- **9/20**: nove vinte avos

## Frações no Cotidiano

As frações aparecem constantemente no nosso dia a dia:

1. **Culinária**: "Adicione 1/2 xícara de açúcar"
2. **Tempo**: "Faltam 3/4 de hora para o filme começar"
3. **Dinheiro**: "Gastei 2/5 do meu salário"
4. **Medidas**: "Percorri 3/4 do caminho"
5. **Descontos**: "Desconto de 1/3 do preço original"

## Dicas Importantes

✅ **O denominador nunca pode ser zero!** Não existe divisão por zero.

✅ **Quanto maior o denominador, menor cada parte.** 1/8 é menor que 1/4.

✅ **Frações podem representar a mesma quantidade de formas diferentes.** Por exemplo: 1/2 = 2/4 = 4/8 (frações equivalentes).

## Resumo

- Frações representam **partes de um todo**
- São compostas por **numerador** (partes consideradas) e **denominador** (total de partes)
- Podem ser **próprias** (< 1), **impróprias** (≥ 1) ou **aparentes** (= número inteiro)
- Estão presentes em situações cotidianas como culinária, tempo e medidas

---

**Pratique bastante!** A melhor forma de dominar frações é resolvendo exercícios e identificando-as no dia a dia.
`;

const page1 = {
  moduleId,
  title: 'O que são Frações?',
  slug: 'o-que-sao-fracoes',
  content: page1Content,
  order: 1,
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  estimatedMinutes: 15
};

await db.insert(schema.pages).values(page1);

console.log('✅ Página 1 do Módulo Frações criada com sucesso!');

await connection.end();
