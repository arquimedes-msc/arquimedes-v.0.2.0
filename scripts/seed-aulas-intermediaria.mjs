import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('📝 Criando aulas de Aritmética Intermediária...\n');

const disciplineId = 30004;
const disciplineSlug = 'aritmetica-intermediaria';

// Módulo 6: Números Inteiros e Racionais (ID: 180006)
const modulo6Aulas = [
  {
    moduleId: 180006,
    moduleSlug: 'numeros-inteiros-racionais',
    slug: 'numeros-inteiros-negativos',
    title: 'Números Inteiros Negativos',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Números Inteiros Negativos

## 🎯 Objetivo da Aula

Compreender o conceito de números negativos, sua representação na reta numérica e como realizar operações básicas com eles.

---

## 📚 O que são Números Negativos?

Números negativos são aqueles menores que zero, representados com o sinal **−** (menos). Eles aparecem em diversas situações do cotidiano:

- **Temperatura:** −5°C (cinco graus abaixo de zero)
- **Saldo bancário:** −R$ 200,00 (duzentos reais de dívida)
- **Altitude:** −50m (cinquenta metros abaixo do nível do mar)
- **Andar de prédio:** −2 (segundo subsolo)

---

## 📏 A Reta Numérica Completa

A reta numérica se estende infinitamente para ambos os lados:

\`\`\`
... −5 −4 −3 −2 −1  0  +1 +2 +3 +4 +5 ...
    ←─────────────┼─────────────→
    Negativos     Zero    Positivos
\`\`\`

**Características importantes:**
- Zero é neutro (não é positivo nem negativo)
- Quanto mais à esquerda, menor o número
- Quanto mais à direita, maior o número

---

## 🔢 Comparação de Números Inteiros

### Regra Geral:
- **Positivo > Zero > Negativo**
- Entre dois negativos, o de **menor módulo** é maior

### Exemplos:

| Comparação | Resultado | Explicação |
|------------|-----------|------------|
| 5 vs 3 | 5 > 3 | Ambos positivos, 5 está mais à direita |
| 0 vs −2 | 0 > −2 | Zero é maior que qualquer negativo |
| −2 vs −5 | −2 > −5 | −2 está mais à direita na reta |
| −10 vs 1 | 1 > −10 | Positivo sempre maior que negativo |

---

## 🧮 Módulo ou Valor Absoluto

O **módulo** de um número é sua distância até o zero, sempre positiva.

**Notação:** |x|

**Exemplos:**
- |5| = 5
- |−5| = 5
- |0| = 0
- |−12| = 12

---

## ➕ Adição com Números Negativos

### Regra 1: Sinais Iguais
**Some os módulos e mantenha o sinal.**

**Exemplos:**
- (+3) + (+5) = +8
- (−3) + (−5) = −8

### Regra 2: Sinais Diferentes
**Subtraia o menor módulo do maior e use o sinal do maior.**

**Exemplos:**
- (+7) + (−3) = +4 (7 − 3 = 4, sinal de 7)
- (−8) + (+5) = −3 (8 − 5 = 3, sinal de 8)
- (+10) + (−10) = 0 (números opostos se anulam)

---

## ➖ Subtração com Números Negativos

**Regra fundamental:** Subtrair é o mesmo que somar o oposto.

**a − b = a + (−b)**

**Exemplos:**
- 5 − 3 = 5 + (−3) = 2
- 5 − (−3) = 5 + (+3) = 8
- −5 − 3 = −5 + (−3) = −8
- −5 − (−3) = −5 + (+3) = −2

---

## ✏️ Exercícios Resolvidos

### Exercício 1: Temperatura
A temperatura em uma cidade era de 8°C. Durante a noite, caiu 12°C. Qual a temperatura final?

**Solução:**
- Temperatura inicial: +8°C
- Variação: −12°C
- Cálculo: 8 + (−12) = 8 − 12 = −4°C

**Resposta:** −4°C

---

### Exercício 2: Saldo Bancário
João tinha R$ 150,00 no banco. Fez compras de R$ 200,00 no cartão. Qual seu saldo?

**Solução:**
- Saldo inicial: +150
- Compra: −200
- Cálculo: 150 + (−200) = 150 − 200 = −50

**Resposta:** −R$ 50,00 (cinquenta reais de dívida)

---

### Exercício 3: Elevador
Um elevador está no 3º andar. Desce 5 andares. Em que andar ele para?

**Solução:**
- Andar inicial: +3
- Movimento: −5
- Cálculo: 3 + (−5) = 3 − 5 = −2

**Resposta:** 2º subsolo (andar −2)

---

## 🎓 Resumo da Aula

✅ Números negativos representam valores abaixo de zero  
✅ Na reta numérica, negativos ficam à esquerda do zero  
✅ Módulo é a distância até o zero (sempre positivo)  
✅ Adição: sinais iguais → soma; sinais diferentes → subtração  
✅ Subtração = adição do oposto  
✅ Aplicações práticas: temperatura, finanças, altitude

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180006,
    moduleSlug: 'numeros-inteiros-racionais',
    slug: 'comparacao-e-ordenacao',
    title: 'Comparação e Ordenação',
    order: 2,
    estimatedMinutes: 45,
    mainText: `# Comparação e Ordenação

## 🎯 Objetivo da Aula

Dominar técnicas de comparação entre números inteiros e racionais, compreender símbolos de desigualdade e resolver problemas práticos de ordenação.

---

## 📊 Símbolos de Desigualdade

| Símbolo | Significado | Exemplo | Leitura |
|---------|-------------|---------|---------|
| > | Maior que | 5 > 3 | 5 é maior que 3 |
| < | Menor que | 2 < 7 | 2 é menor que 7 |
| ≥ | Maior ou igual | x ≥ 10 | x é maior ou igual a 10 |
| ≤ | Menor ou igual | y ≤ 5 | y é menor ou igual a 5 |
| ≠ | Diferente de | a ≠ b | a é diferente de b |

---

## 🔢 Comparando Números Inteiros

### Regras Fundamentais:

1. **Todo positivo > zero > todo negativo**
   - Exemplo: 1 > 0 > −1

2. **Entre positivos, o maior módulo vence**
   - Exemplo: 10 > 5

3. **Entre negativos, o menor módulo vence**
   - Exemplo: −2 > −5 (pois −2 está mais próximo de zero)

4. **Na reta numérica, maior = mais à direita**

---

## 📏 Comparando Números Racionais

### Método 1: Converter para Decimais

**Exemplo:** Compare 3/4 e 2/3

- 3/4 = 0,75
- 2/3 = 0,666...
- **Resultado:** 3/4 > 2/3

### Método 2: Igualar Denominadores

**Exemplo:** Compare 2/5 e 3/7

- MMC(5, 7) = 35
- 2/5 = 14/35
- 3/7 = 15/35
- **Resultado:** 3/7 > 2/5 (pois 15 > 14)

### Método 3: Multiplicação Cruzada

**Exemplo:** Compare a/b e c/d

- Se a × d > b × c, então a/b > c/d
- Compare 4/5 e 7/9:
  - 4 × 9 = 36
  - 5 × 7 = 35
  - **Resultado:** 4/5 > 7/9

---

## 📐 Intervalos Numéricos

Intervalos representam conjuntos de números entre dois valores.

### Tipos de Intervalos:

| Notação | Significado | Exemplo |
|---------|-------------|---------|
| [a, b] | Fechado (inclui extremos) | [2, 5] = {2, 3, 4, 5} |
| (a, b) | Aberto (exclui extremos) | (2, 5) = {3, 4} |
| [a, b) | Semi-aberto à direita | [2, 5) = {2, 3, 4} |
| (a, b] | Semi-aberto à esquerda | (2, 5] = {3, 4, 5} |

---

## 💰 Aplicações em Finanças

### Exemplo 1: Comparando Dívidas

Maria deve R$ 500,00 e João deve R$ 300,00. Quem está em pior situação?

**Solução:**
- Maria: −500
- João: −300
- Como −500 < −300, Maria está em pior situação

### Exemplo 2: Investimentos

Ana tem R$ 1.200,00 e Bruno tem R$ 980,00. Quem pode comprar um produto de R$ 1.000,00?

**Solução:**
- Ana: 1.200 > 1.000 ✅ Pode comprar
- Bruno: 980 < 1.000 ❌ Não pode

---

## 🌡️ Aplicações em Temperatura

### Exemplo: Ordenar Temperaturas

Ordene as temperaturas de forma crescente:
- Cidade A: 15°C
- Cidade B: −5°C
- Cidade C: 0°C
- Cidade D: −10°C
- Cidade E: 8°C

**Solução:**
1. Identificar negativos: −10°C, −5°C
2. Zero: 0°C
3. Positivos: 8°C, 15°C

**Ordem crescente:** −10°C < −5°C < 0°C < 8°C < 15°C

---

## ✏️ Exercícios Resolvidos

### Exercício 1: Ordenação
Ordene de forma decrescente: 7, −3, 0, −8, 2, −1

**Solução:**
- Maior: 7
- Depois: 2
- Depois: 0
- Depois: −1
- Depois: −3
- Menor: −8

**Resposta:** 7 > 2 > 0 > −1 > −3 > −8

---

### Exercício 2: Frações
Qual é maior: 5/6 ou 7/8?

**Solução (Método 1 - Decimais):**
- 5/6 = 0,8333...
- 7/8 = 0,875
- **Resposta:** 7/8 > 5/6

---

### Exercício 3: Intervalo
Quantos números inteiros existem no intervalo [−3, 5)?

**Solução:**
- Inclui −3 (colchete fechado)
- Exclui 5 (parêntese aberto)
- Números: −3, −2, −1, 0, 1, 2, 3, 4

**Resposta:** 8 números inteiros

---

## 🎓 Resumo da Aula

✅ Símbolos: >, <, ≥, ≤, ≠  
✅ Positivo > Zero > Negativo  
✅ Entre negativos, menor módulo é maior  
✅ Comparar frações: decimais, MMC ou multiplicação cruzada  
✅ Intervalos: abertos ( ), fechados [ ]  
✅ Aplicações em finanças e temperatura

---

**Tempo estimado:** 45 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180006,
    moduleSlug: 'numeros-inteiros-racionais',
    slug: 'numeros-racionais',
    title: 'Números Racionais',
    order: 3,
    estimatedMinutes: 55,
    mainText: `# Números Racionais

## 🎯 Objetivo da Aula

Compreender o conceito de números racionais, suas representações (fração, decimal, porcentagem) e realizar conversões entre elas.

---

## 📚 O que são Números Racionais?

**Números racionais** são aqueles que podem ser expressos como uma **fração** a/b, onde:
- a e b são números inteiros
- b ≠ 0 (denominador não pode ser zero)

**Exemplos:**
- 1/2 (um meio)
- 3/4 (três quartos)
- −5/3 (menos cinco terços)
- 7 = 7/1 (todo inteiro é racional)
- 0,5 = 1/2
- 25% = 1/4

---

## 🔄 Três Representações do Mesmo Número

| Fração | Decimal | Porcentagem |
|--------|---------|-------------|
| 1/2 | 0,5 | 50% |
| 1/4 | 0,25 | 25% |
| 3/4 | 0,75 | 75% |
| 1/5 | 0,2 | 20% |
| 2/5 | 0,4 | 40% |
| 1/10 | 0,1 | 10% |

---

## 🔢 Conversão: Fração → Decimal

**Método:** Dividir o numerador pelo denominador.

### Exemplos:

**1) 3/4 = ?**
- 3 ÷ 4 = 0,75

**2) 5/8 = ?**
- 5 ÷ 8 = 0,625

**3) 7/20 = ?**
- 7 ÷ 20 = 0,35

---

## 🔢 Conversão: Decimal → Fração

**Método:**
1. Contar casas decimais
2. Colocar sobre potência de 10
3. Simplificar

### Exemplos:

**1) 0,6 = ?**
- 1 casa decimal → 6/10
- Simplificar: 6/10 = 3/5

**2) 0,75 = ?**
- 2 casas decimais → 75/100
- Simplificar: 75/100 = 3/4

**3) 0,125 = ?**
- 3 casas decimais → 125/1000
- Simplificar: 125/1000 = 1/8

---

## 📊 Conversão: Fração → Porcentagem

**Método:** Multiplicar por 100 e adicionar o símbolo %.

### Exemplos:

**1) 1/4 = ?%**
- 1/4 = 0,25
- 0,25 × 100 = 25%

**2) 3/5 = ?%**
- 3/5 = 0,6
- 0,6 × 100 = 60%

**3) 7/8 = ?%**
- 7/8 = 0,875
- 0,875 × 100 = 87,5%

---

## 📊 Conversão: Porcentagem → Fração

**Método:** Dividir por 100 e simplificar.

### Exemplos:

**1) 40% = ?**
- 40/100 = 2/5

**2) 75% = ?**
- 75/100 = 3/4

**3) 12,5% = ?**
- 12,5/100 = 125/1000 = 1/8

---

## 🔁 Dízimas Periódicas

**Dízima periódica** é um decimal com dígitos que se repetem infinitamente.

### Tipos:

**1) Dízima Simples**
- 0,333... = 1/3
- 0,666... = 2/3
- 0,777... = 7/9

**2) Dízima Composta**
- 0,1666... = 1/6
- 0,8333... = 5/6
- 0,4545... = 5/11

---

## 🧮 Operações com Decimais

### Adição e Subtração

**Regra:** Alinhar as vírgulas.

**Exemplo:**
\`\`\`
  12,50
+  3,75
-------
  16,25
\`\`\`

### Multiplicação

**Regra:** Multiplicar normalmente e contar casas decimais.

**Exemplo:** 2,5 × 1,2
- 25 × 12 = 300
- 2 casas decimais → 3,00 = 3

### Divisão

**Exemplo:** 7,5 ÷ 2,5
- Eliminar vírgulas: 75 ÷ 25 = 3

---

## 💰 Aplicações Práticas

### Exemplo 1: Desconto
Uma camisa de R$ 80,00 tem 25% de desconto. Quanto custa?

**Solução:**
- 25% = 1/4
- Desconto: 80 × 1/4 = 20
- Preço final: 80 − 20 = R$ 60,00

### Exemplo 2: Nota Escolar
João acertou 17 de 20 questões. Qual sua nota em porcentagem?

**Solução:**
- Fração: 17/20
- Decimal: 17 ÷ 20 = 0,85
- Porcentagem: 0,85 × 100 = 85%

### Exemplo 3: Receita Culinária
Uma receita pede 3/4 de xícara de açúcar. Quanto é em decimal?

**Solução:**
- 3/4 = 3 ÷ 4 = 0,75 xícaras

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Converta 0,625 para fração.

**Solução:**
- 3 casas decimais → 625/1000
- Simplificar: 625/1000 = 5/8

### Exercício 2
Qual é maior: 0,7 ou 2/3?

**Solução:**
- 2/3 = 0,666...
- 0,7 > 0,666...
- **Resposta:** 0,7 é maior

### Exercício 3
Expresse 3/8 como porcentagem.

**Solução:**
- 3/8 = 0,375
- 0,375 × 100 = 37,5%

---

## 🎓 Resumo da Aula

✅ Racionais = números que podem ser escritos como fração  
✅ Três formas: fração, decimal, porcentagem  
✅ Fração → Decimal: dividir numerador por denominador  
✅ Decimal → Fração: contar casas e simplificar  
✅ Porcentagem = fração sobre 100  
✅ Dízimas periódicas são racionais  
✅ Aplicações em descontos, notas e medidas

---

**Tempo estimado:** 55 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180006,
    moduleSlug: 'numeros-inteiros-racionais',
    slug: 'operacoes-com-racionais',
    title: 'Operações com Racionais',
    order: 4,
    estimatedMinutes: 50,
    mainText: `# Operações com Racionais

## 🎯 Objetivo da Aula

Dominar as quatro operações básicas (adição, subtração, multiplicação e divisão) com números racionais em forma de fração e decimal.

---

## ➕ Adição e Subtração de Frações

### Caso 1: Denominadores Iguais

**Regra:** Mantenha o denominador e some/subtraia os numeradores.

**Exemplos:**
- 2/7 + 3/7 = (2+3)/7 = 5/7
- 5/9 − 2/9 = (5−2)/9 = 3/9 = 1/3

### Caso 2: Denominadores Diferentes

**Método:**
1. Encontrar o MMC dos denominadores
2. Converter as frações para o mesmo denominador
3. Somar/subtrair os numeradores

**Exemplo:** 1/4 + 1/6

**Passo 1:** MMC(4, 6) = 12

**Passo 2:** Converter
- 1/4 = 3/12 (multiplicar por 3)
- 1/6 = 2/12 (multiplicar por 2)

**Passo 3:** Somar
- 3/12 + 2/12 = 5/12

---

## ✏️ Exercícios Resolvidos - Adição/Subtração

### Exercício 1
Calcule: 2/5 + 1/3

**Solução:**
- MMC(5, 3) = 15
- 2/5 = 6/15
- 1/3 = 5/15
- 6/15 + 5/15 = 11/15

### Exercício 2
Calcule: 3/4 − 1/6

**Solução:**
- MMC(4, 6) = 12
- 3/4 = 9/12
- 1/6 = 2/12
- 9/12 − 2/12 = 7/12

---

## ✖️ Multiplicação de Frações

**Regra:** Multiplique numerador com numerador e denominador com denominador.

**Fórmula:** a/b × c/d = (a×c)/(b×d)

**Exemplos:**
- 2/3 × 3/5 = 6/15 = 2/5
- 1/4 × 2/7 = 2/28 = 1/14
- 5/6 × 3/10 = 15/60 = 1/4

### Dica: Simplificar Antes

**Exemplo:** 4/9 × 3/8

**Método 1 (Multiplicar e depois simplificar):**
- 4/9 × 3/8 = 12/72 = 1/6

**Método 2 (Simplificar antes):**
- 4 e 8 têm fator comum 4 → 4/8 = 1/2
- 3 e 9 têm fator comum 3 → 3/9 = 1/3
- 1/3 × 1/2 = 1/6

---

## ➗ Divisão de Frações

**Regra:** Multiplicar pela fração inversa (recíproca).

**Fórmula:** a/b ÷ c/d = a/b × d/c

**Exemplos:**
- 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2
- 3/5 ÷ 2/3 = 3/5 × 3/2 = 9/10
- 2/7 ÷ 4/5 = 2/7 × 5/4 = 10/28 = 5/14

---

## ✏️ Exercícios Resolvidos - Multiplicação/Divisão

### Exercício 3
Calcule: 2/3 × 5/8

**Solução:**
- 2/3 × 5/8 = 10/24
- Simplificar: 10/24 = 5/12

### Exercício 4
Calcule: 3/4 ÷ 2/5

**Solução:**
- 3/4 ÷ 2/5 = 3/4 × 5/2
- 3/4 × 5/2 = 15/8

---

## 🔢 Operações com Decimais

### Adição e Subtração

**Regra:** Alinhar as vírgulas.

**Exemplo:** 12,75 + 3,8
\`\`\`
  12,75
+  3,80
-------
  16,55
\`\`\`

### Multiplicação

**Exemplo:** 2,5 × 1,3
- Ignorar vírgulas: 25 × 13 = 325
- Contar casas decimais: 2 casas
- Resultado: 3,25

### Divisão

**Exemplo:** 7,5 ÷ 2,5
- Eliminar vírgulas: 75 ÷ 25 = 3

---

## 🧮 Expressões Mistas

Expressões com frações e decimais juntos.

### Exemplo 1
Calcule: 1/2 + 0,25

**Solução:**
- Converter para mesma forma
- 1/2 = 0,5
- 0,5 + 0,25 = 0,75

### Exemplo 2
Calcule: 2,5 × 2/5

**Solução:**
- Converter 2,5 para fração: 2,5 = 5/2
- 5/2 × 2/5 = 10/10 = 1

---

## 💰 Problemas Aplicados

### Problema 1: Receita Culinária
Uma receita pede 2/3 de xícara de farinha. Você quer fazer 1,5 vezes a receita. Quanta farinha precisa?

**Solução:**
- 2/3 × 1,5
- 1,5 = 3/2
- 2/3 × 3/2 = 6/6 = 1 xícara

### Problema 2: Divisão de Herança
Uma herança de R$ 45.000,00 será dividida entre 3 irmãos na proporção 2:3:4. Quanto cada um recebe?

**Solução:**
- Total de partes: 2 + 3 + 4 = 9
- Primeiro: 2/9 × 45.000 = 10.000
- Segundo: 3/9 × 45.000 = 15.000
- Terceiro: 4/9 × 45.000 = 20.000

### Problema 3: Desconto Sucessivo
Um produto de R$ 200,00 tem 1/4 de desconto. Depois, mais 10% de desconto. Qual o preço final?

**Solução:**
- Primeiro desconto: 200 × 1/4 = 50
- Preço após 1º desconto: 200 − 50 = 150
- Segundo desconto: 150 × 0,1 = 15
- Preço final: 150 − 15 = R$ 135,00

---

## 🎓 Resumo da Aula

✅ Adição/Subtração de frações: igualar denominadores (MMC)  
✅ Multiplicação de frações: numerador × numerador, denominador × denominador  
✅ Divisão de frações: multiplicar pelo inverso  
✅ Decimais: alinhar vírgulas (adição/subtração)  
✅ Expressões mistas: converter para mesma forma  
✅ Aplicações em receitas, heranças e descontos

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
];

console.log('📝 Inserindo aulas do Módulo 6...\n');

for (const aula of modulo6Aulas) {
  await conn.execute(`
    INSERT INTO pages (moduleId, slug, title, \`order\`, mainText, estimatedMinutes, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      mainText = VALUES(mainText)
  `, [
    aula.moduleId,
    aula.slug,
    aula.title,
    aula.order,
    aula.mainText,
    aula.estimatedMinutes,
  ]);
  
  console.log(`✅ Aula ${aula.order}: ${aula.title}`);
}

console.log('\n🎉 Módulo 6 completo: 4 aulas criadas!');
console.log('📊 Próximo: Módulos 7-10 (16 aulas restantes)');

await conn.end();
