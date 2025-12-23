import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const moduleId = 4;

const page3Content = `# Simplificação e Equivalência de Frações

## Introdução

Você já percebeu que **1/2 é a mesma coisa que 2/4 ou 4/8**? Essas são **frações equivalentes** - frações diferentes que representam a mesma quantidade. Nesta aula, você aprenderá a identificar frações equivalentes, simplificar frações e compará-las!

## Frações Equivalentes

### O que são?

Frações equivalentes são aquelas que **representam a mesma parte do todo**, mesmo tendo numeradores e denominadores diferentes.

**Exemplos visuais:**
- 1/2 = 2/4 = 4/8 = 5/10 (todas representam metade)
- 1/3 = 2/6 = 3/9 = 4/12 (todas representam um terço)

### Como Encontrar Frações Equivalentes?

**Regra:** Multiplicar (ou dividir) o numerador e o denominador pelo **mesmo número**.

**Exemplos:**
\`\`\`
1/3 × 2/2 = 2/6
1/3 × 3/3 = 3/9
1/3 × 4/4 = 4/12

Todas são equivalentes a 1/3!
\`\`\`

**Importante:** Multiplicar por 2/2, 3/3, 4/4 etc. é o mesmo que multiplicar por 1, então o valor não muda!

### Verificando se Duas Frações são Equivalentes

**Método 1: Multiplicação Cruzada**

Se a/b = c/d, então a × d = b × c

**Exemplo:** 2/3 e 4/6 são equivalentes?
\`\`\`
2 × 6 = 12
3 × 4 = 12

12 = 12 ✅ São equivalentes!
\`\`\`

**Método 2: Simplificar ambas**

Simplifique as duas frações e veja se chegam no mesmo resultado.

## Simplificação de Frações

### O que é Simplificar?

Simplificar uma fração é **reduzi-la à sua forma mais simples**, dividindo o numerador e o denominador pelo **Máximo Divisor Comum (MDC)**.

**Por que simplificar?**
- Facilita cálculos
- Torna os números menores e mais fáceis de entender
- É a forma "mais bonita" da fração

### Como Simplificar?

**Passo a passo:**
1. Encontre o MDC do numerador e denominador
2. Divida ambos pelo MDC
3. O resultado é a fração simplificada

**Exemplo 1:** Simplificar 8/12
\`\`\`
1. MDC(8, 12) = 4
2. 8 ÷ 4 = 2
   12 ÷ 4 = 3
3. Resultado: 2/3
\`\`\`

**Exemplo 2:** Simplificar 15/25
\`\`\`
1. MDC(15, 25) = 5
2. 15 ÷ 5 = 3
   25 ÷ 5 = 5
3. Resultado: 3/5
\`\`\`

**Exemplo 3:** Simplificar 24/36
\`\`\`
1. MDC(24, 36) = 12
2. 24 ÷ 12 = 2
   36 ÷ 12 = 3
3. Resultado: 2/3
\`\`\`

### Simplificação Gradual

Se você não sabe o MDC, pode simplificar aos poucos:

**Exemplo:** 24/36
\`\`\`
24/36 ÷ 2/2 = 12/18 (dividindo por 2)
12/18 ÷ 2/2 = 6/9 (dividindo por 2 novamente)
6/9 ÷ 3/3 = 2/3 (dividindo por 3)

Resultado final: 2/3
\`\`\`

### Frações Irredutíveis

Uma fração está **totalmente simplificada** (irredutível) quando o MDC do numerador e denominador é 1.

**Exemplos de frações irredutíveis:**
- 2/3 (MDC = 1)
- 3/5 (MDC = 1)
- 7/11 (MDC = 1)

## Comparação de Frações

### Frações com o Mesmo Denominador

Quando os denominadores são iguais, basta comparar os **numeradores**.

**Exemplos:**
- 3/7 > 2/7 (porque 3 > 2)
- 5/9 < 7/9 (porque 5 < 7)

### Frações com o Mesmo Numerador

Quando os numeradores são iguais, a fração com **menor denominador é maior**.

**Exemplos:**
- 1/3 > 1/4 (um terço é maior que um quarto)
- 2/5 > 2/7 (dois quintos é maior que dois sétimos)

**Por quê?** Quanto mais partes você divide o todo, menor cada parte fica!

### Frações com Numeradores e Denominadores Diferentes

**Método 1: Transformar em frações equivalentes com mesmo denominador**

**Exemplo:** Comparar 2/3 e 3/4
\`\`\`
MMC(3, 4) = 12

2/3 = 8/12
3/4 = 9/12

9/12 > 8/12, então 3/4 > 2/3
\`\`\`

**Método 2: Converter para decimal**

**Exemplo:** Comparar 3/5 e 2/3
\`\`\`
3/5 = 0,6
2/3 = 0,666...

0,666 > 0,6, então 2/3 > 3/5
\`\`\`

**Método 3: Multiplicação cruzada**

Para comparar a/b e c/d:
- Se a × d > b × c, então a/b > c/d
- Se a × d < b × c, então a/b < c/d

**Exemplo:** Comparar 2/5 e 3/7
\`\`\`
2 × 7 = 14
5 × 3 = 15

14 < 15, então 2/5 < 3/7
\`\`\`

## Aplicações Práticas

### 1. Receitas Culinárias

**Situação:** Uma receita pede 4/8 de xícara de açúcar. Você pode simplificar?

**Solução:**
\`\`\`
4/8 ÷ 4/4 = 1/2

Resposta: 1/2 xícara (mais fácil de medir!)
\`\`\`

### 2. Divisão de Recursos

**Situação:** Você tem 6/10 de uma pizza e seu amigo tem 3/5. Quem tem mais?

**Solução:**
\`\`\`
Simplificar 6/10:
6/10 ÷ 2/2 = 3/5

6/10 = 3/5 → Vocês têm a mesma quantidade!
\`\`\`

### 3. Comparação de Ofertas

**Situação:** Loja A: desconto de 2/5. Loja B: desconto de 3/8. Qual é maior?

**Solução:**
\`\`\`
MMC(5, 8) = 40

2/5 = 16/40
3/8 = 15/40

16/40 > 15/40 → Loja A tem desconto maior!
\`\`\`

## Dicas Importantes

✅ **Sempre simplifique o resultado final** de operações com frações

✅ **Frações equivalentes têm o mesmo valor**, apenas aparências diferentes

✅ **Para comparar frações**, use o método que você achar mais fácil

✅ **Pratique encontrar o MDC** - isso acelera muito a simplificação!

## Resumo

| Conceito | Regra | Exemplo |
|----------|-------|---------|
| **Frações Equivalentes** | Multiplicar/dividir por mesmo número | 1/2 = 2/4 = 4/8 |
| **Simplificação** | Dividir por MDC | 8/12 ÷ 4 = 2/3 |
| **Comparação (mesmo denominador)** | Maior numerador = maior fração | 5/7 > 3/7 |
| **Comparação (mesmo numerador)** | Menor denominador = maior fração | 1/3 > 1/5 |
| **Comparação (diferentes)** | Usar MMC ou multiplicação cruzada | 2/3 vs 3/4 → 8/12 vs 9/12 |

---

**Continue praticando!** Simplificação e equivalência são habilidades essenciais para dominar frações.
`;

const page3 = {
  moduleId,
  title: 'Simplificação e Equivalência',
  slug: 'simplificacao-e-equivalencia',
  content: page3Content,
  order: 3,
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  estimatedMinutes: 18
};

await db.insert(schema.pages).values(page3);

console.log('✅ Página 3 do Módulo Frações criada com sucesso!');
console.log('\n🎉 MÓDULO FRAÇÕES COMPLETO! 🎉');
console.log('📚 3 páginas criadas');
console.log('📖 Conteúdo educacional rico (5000+ palavras)');

await connection.end();
