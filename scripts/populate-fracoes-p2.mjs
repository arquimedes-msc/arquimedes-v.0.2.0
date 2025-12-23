import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

const moduleId = 4;

const page2Content = `# Operações com Frações

## Introdução

Agora que você já sabe o que são frações, vamos aprender a realizar as quatro operações matemáticas básicas com elas: **adição, subtração, multiplicação e divisão**. Cada operação tem suas regras específicas, mas com prática você dominará todas!

## Adição de Frações

### Frações com o Mesmo Denominador

Quando as frações têm o **mesmo denominador**, a adição é simples: **somamos apenas os numeradores** e mantemos o denominador.

**Fórmula:**
\`\`\`
a/c + b/c = (a + b)/c
\`\`\`

**Exemplos:**
- 2/5 + 1/5 = (2 + 1)/5 = **3/5**
- 3/8 + 4/8 = (3 + 4)/8 = **7/8**
- 1/4 + 2/4 = (1 + 2)/4 = **3/4**

### Frações com Denominadores Diferentes

Quando os denominadores são diferentes, precisamos **encontrar um denominador comum** (geralmente o MMC - Mínimo Múltiplo Comum).

**Passo a passo:**
1. Encontre o MMC dos denominadores
2. Transforme as frações para o novo denominador
3. Some os numeradores
4. Simplifique se possível

**Exemplo:**
\`\`\`
1/3 + 1/4 = ?

1. MMC(3, 4) = 12
2. 1/3 = 4/12  (multiplica numerador e denominador por 4)
   1/4 = 3/12  (multiplica numerador e denominador por 3)
3. 4/12 + 3/12 = 7/12
\`\`\`

**Mais exemplos:**
- 1/2 + 1/3 = 3/6 + 2/6 = **5/6**
- 2/5 + 1/10 = 4/10 + 1/10 = **5/10 = 1/2**

## Subtração de Frações

A subtração segue as **mesmas regras da adição**, mas subtraímos os numeradores.

### Mesmo Denominador

**Fórmula:**
\`\`\`
a/c - b/c = (a - b)/c
\`\`\`

**Exemplos:**
- 5/7 - 2/7 = (5 - 2)/7 = **3/7**
- 7/9 - 4/9 = (7 - 4)/9 = **3/9 = 1/3**

### Denominadores Diferentes

**Exemplo:**
\`\`\`
3/4 - 1/6 = ?

1. MMC(4, 6) = 12
2. 3/4 = 9/12
   1/6 = 2/12
3. 9/12 - 2/12 = 7/12
\`\`\`

## Multiplicação de Frações

A multiplicação é a operação **mais simples** com frações!

**Regra:** Multiplicamos numerador com numerador e denominador com denominador.

**Fórmula:**
\`\`\`
a/b × c/d = (a × c)/(b × d)
\`\`\`

**Exemplos:**
- 2/3 × 3/4 = (2 × 3)/(3 × 4) = 6/12 = **1/2**
- 1/2 × 4/5 = (1 × 4)/(2 × 5) = 4/10 = **2/5**
- 3/7 × 2/3 = (3 × 2)/(7 × 3) = 6/21 = **2/7**

### Dica Importante
Você pode **simplificar antes de multiplicar** para facilitar os cálculos!

**Exemplo:**
\`\`\`
4/9 × 3/8 = ?

Simplificando antes:
4 e 8 têm fator comum 4 → 4/8 = 1/2
3 e 9 têm fator comum 3 → 3/9 = 1/3

Resultado: 1/2 × 1/3 = 1/6
\`\`\`

## Divisão de Frações

Para dividir frações, usamos uma técnica especial: **multiplicamos pela fração inversa** (invertemos o numerador e denominador da segunda fração).

**Regra:** "Conserva a primeira, inverte a segunda e multiplica"

**Fórmula:**
\`\`\`
a/b ÷ c/d = a/b × d/c = (a × d)/(b × c)
\`\`\`

**Exemplos:**
- 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = **2**
- 3/5 ÷ 2/3 = 3/5 × 3/2 = 9/10
- 4/7 ÷ 2/5 = 4/7 × 5/2 = 20/14 = **10/7**

### Por que invertemos?
Dividir por uma fração é o mesmo que multiplicar pelo seu inverso. Por exemplo:
- Dividir por 1/2 é o mesmo que multiplicar por 2
- Dividir por 1/4 é o mesmo que multiplicar por 4

## Operações Mistas

Em expressões com várias operações, seguimos a **ordem de precedência**:
1. Parênteses
2. Multiplicação e Divisão (da esquerda para direita)
3. Adição e Subtração (da esquerda para direita)

**Exemplo:**
\`\`\`
1/2 + 1/3 × 2/5 = ?

1. Primeiro a multiplicação: 1/3 × 2/5 = 2/15
2. Depois a adição: 1/2 + 2/15 = 15/30 + 4/30 = 19/30
\`\`\`

## Dicas Práticas

✅ **Adição/Subtração:** Precisa de denominador comum
✅ **Multiplicação:** Multiplica direto (numerador × numerador, denominador × denominador)
✅ **Divisão:** Inverte a segunda fração e multiplica
✅ **Sempre simplifique o resultado final!**

## Aplicações no Cotidiano

1. **Culinária:** "Se a receita pede 1/2 xícara de farinha e você quer fazer 1/3 da receita, quanto usar?" → 1/2 × 1/3 = 1/6 xícara

2. **Divisão de recursos:** "Tenho 3/4 de pizza e quero dividir igualmente entre 2 pessoas" → 3/4 ÷ 2 = 3/8 para cada

3. **Tempo:** "Fiz 2/5 do trabalho pela manhã e 1/4 à tarde. Quanto fiz no total?" → 2/5 + 1/4 = 8/20 + 5/20 = 13/20

## Resumo

| Operação | Regra | Exemplo |
|----------|-------|---------|
| **Adição** | Mesmo denominador: soma numeradores | 2/5 + 1/5 = 3/5 |
| **Subtração** | Mesmo denominador: subtrai numeradores | 4/7 - 1/7 = 3/7 |
| **Multiplicação** | Multiplica numeradores e denominadores | 2/3 × 3/4 = 6/12 = 1/2 |
| **Divisão** | Inverte a segunda e multiplica | 1/2 ÷ 1/4 = 1/2 × 4/1 = 2 |

---

**Pratique muito!** As operações com frações ficam mais fáceis com a prática constante.
`;

const page2 = {
  moduleId,
  title: 'Operações com Frações',
  slug: 'operacoes-com-fracoes',
  content: page2Content,
  order: 2,
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  estimatedMinutes: 20
};

await db.insert(schema.pages).values(page2);

console.log('✅ Página 2 do Módulo Frações criada com sucesso!');

await connection.end();
