# Módulo 13: Progressões Aritméticas e Geométricas

## Aula 1: Progressão Aritmética (PA) (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai aprender o que é uma **Progressão Aritmética (PA)**, como identificá-la, e como encontrar qualquer termo de uma PA usando a fórmula do termo geral. As PAs estão presentes em muitas situações do cotidiano, desde salários com aumentos fixos até escadas com degraus uniformes.

### 📚 O que é uma Progressão Aritmética?

> **Definição:** Uma Progressão Aritmética (PA) é uma sequência de números onde a diferença entre cada termo e seu antecessor é sempre constante.

Essa diferença constante é chamada de **razão** e representada pela letra **r**.

**Exemplos de PA:**
- (2, 5, 8, 11, 14, ...) → razão r = 3
- (20, 17, 14, 11, 8, ...) → razão r = -3
- (1, 1, 1, 1, 1, ...) → razão r = 0
- (3, 7, 11, 15, 19, ...) → razão r = 4

### 🔢 Elementos de uma PA

- **a₁** = primeiro termo
- **aₙ** = termo de ordem n (enésimo termo)
- **r** = razão (diferença entre termos consecutivos)
- **n** = número de termos

**Para encontrar a razão:**
r = a₂ - a₁ = a₃ - a₂ = a₄ - a₃ = ...

**Exemplo:** Na PA (5, 9, 13, 17, ...)
- a₁ = 5
- r = 9 - 5 = 4

### 📐 Fórmula do Termo Geral

Para encontrar qualquer termo de uma PA, usamos a **fórmula do termo geral**:

> **aₙ = a₁ + (n - 1) · r**

Onde:
- aₙ = termo que queremos encontrar
- a₁ = primeiro termo
- n = posição do termo
- r = razão

**Exemplo 1:** Na PA (3, 7, 11, 15, ...), qual é o 10º termo?

a₁ = 3, r = 4, n = 10

a₁₀ = 3 + (10 - 1) · 4
a₁₀ = 3 + 9 · 4
a₁₀ = 3 + 36
a₁₀ = **39**

**Exemplo 2:** Na PA (100, 95, 90, 85, ...), qual é o 15º termo?

a₁ = 100, r = -5, n = 15

a₁₅ = 100 + (15 - 1) · (-5)
a₁₅ = 100 + 14 · (-5)
a₁₅ = 100 - 70
a₁₅ = **30**

### 🔍 Classificação das PAs

**1. PA Crescente (r > 0):**
Os termos aumentam. Ex: (2, 5, 8, 11, ...)

**2. PA Decrescente (r < 0):**
Os termos diminuem. Ex: (20, 17, 14, 11, ...)

**3. PA Constante (r = 0):**
Todos os termos são iguais. Ex: (5, 5, 5, 5, ...)

### 📊 Propriedades das PAs

**1. Termo Médio:**
Em três termos consecutivos de uma PA, o termo do meio é a média aritmética dos outros dois:

aₙ = (aₙ₋₁ + aₙ₊₁) / 2

**Exemplo:** Na PA (4, 7, 10), temos: 7 = (4 + 10) / 2 = 14 / 2 = 7 ✓

**2. Soma de Termos Equidistantes:**
A soma de dois termos equidistantes dos extremos é constante:

a₁ + aₙ = a₂ + aₙ₋₁ = a₃ + aₙ₋₂ = ...

### 🌍 Aplicações no Cotidiano

**1. Salário com aumento fixo:**
Se você ganha R$ 2.000 e recebe aumento de R$ 200 por ano:
- Ano 1: R$ 2.000
- Ano 2: R$ 2.200
- Ano 3: R$ 2.400
- Ano 10: a₁₀ = 2000 + 9 × 200 = R$ 3.800

**2. Escada:**
Uma escada tem degraus de 18 cm cada. Se o primeiro degrau está a 18 cm do chão:
- Degrau 1: 18 cm
- Degrau 2: 36 cm
- Degrau 10: 10 × 18 = 180 cm

**3. Economia mensal:**
Se você economiza R$ 100 no primeiro mês e aumenta R$ 50 por mês:
- Mês 1: R$ 100
- Mês 2: R$ 150
- Mês 12: a₁₂ = 100 + 11 × 50 = R$ 650

### ✏️ Exercícios Práticos

**Exercício 1:** Determine o 20º termo da PA (7, 12, 17, 22, ...).

<details>
<summary>Ver resposta</summary>

a₁ = 7, r = 5, n = 20

a₂₀ = 7 + (20 - 1) × 5
a₂₀ = 7 + 19 × 5
a₂₀ = 7 + 95
a₂₀ = **102**

</details>

**Exercício 2:** O 5º termo de uma PA é 23 e a razão é 4. Qual é o primeiro termo?

<details>
<summary>Ver resposta</summary>

a₅ = a₁ + (5 - 1) × r
23 = a₁ + 4 × 4
23 = a₁ + 16
a₁ = 23 - 16
a₁ = **7**

</details>

**Exercício 3:** Quantos termos tem a PA (5, 8, 11, ..., 62)?

<details>
<summary>Ver resposta</summary>

a₁ = 5, r = 3, aₙ = 62

62 = 5 + (n - 1) × 3
57 = (n - 1) × 3
n - 1 = 19
n = **20 termos**

</details>

### 🎯 Resumo da Aula

- PA é uma sequência com diferença constante entre termos consecutivos
- Razão (r) = diferença entre termos consecutivos
- Fórmula do termo geral: aₙ = a₁ + (n - 1) · r
- PA crescente: r > 0 | PA decrescente: r < 0 | PA constante: r = 0

---

## Aula 2: Soma de uma PA (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai aprender a calcular a **soma de todos os termos** de uma Progressão Aritmética. Essa fórmula, descoberta pelo matemático Gauss quando tinha apenas 10 anos, é uma das mais elegantes da matemática.

### 📖 A História de Gauss

Conta a lenda que o professor de Gauss, querendo manter a turma ocupada, pediu que somassem todos os números de 1 a 100. Enquanto os colegas começaram a somar um por um, Gauss percebeu um padrão:

```
1 + 100 = 101
2 + 99 = 101
3 + 98 = 101
...
50 + 51 = 101
```

São 50 pares, cada um somando 101. Total: 50 × 101 = **5.050**

### 📐 Fórmula da Soma de uma PA

A soma dos n primeiros termos de uma PA é:

> **Sₙ = (a₁ + aₙ) × n / 2**

Ou, usando apenas o primeiro termo e a razão:

> **Sₙ = n × [2a₁ + (n - 1) × r] / 2**

### 🔢 Exemplos de Aplicação

**Exemplo 1:** Calcule a soma dos 10 primeiros termos da PA (2, 5, 8, 11, ...).

**Método 1:** Encontrar a₁₀ primeiro
- a₁ = 2, r = 3, n = 10
- a₁₀ = 2 + 9 × 3 = 2 + 27 = 29
- S₁₀ = (2 + 29) × 10 / 2 = 31 × 5 = **155**

**Método 2:** Usando a fórmula alternativa
- S₁₀ = 10 × [2×2 + 9×3] / 2
- S₁₀ = 10 × [4 + 27] / 2
- S₁₀ = 10 × 31 / 2 = **155**

**Exemplo 2:** Calcule a soma de todos os números pares de 2 a 100.

PA: (2, 4, 6, 8, ..., 100)
- a₁ = 2, aₙ = 100, r = 2
- n = (100 - 2) / 2 + 1 = 50 termos
- S₅₀ = (2 + 100) × 50 / 2 = 102 × 25 = **2.550**

**Exemplo 3:** Calcule a soma dos números ímpares de 1 a 99.

PA: (1, 3, 5, 7, ..., 99)
- a₁ = 1, aₙ = 99, r = 2
- n = (99 - 1) / 2 + 1 = 50 termos
- S₅₀ = (1 + 99) × 50 / 2 = 100 × 25 = **2.500**

### 📊 Propriedade Interessante

A soma dos n primeiros números ímpares é sempre n²:

| n | Ímpares | Soma |
|---|---------|------|
| 1 | 1 | 1 = 1² |
| 2 | 1 + 3 | 4 = 2² |
| 3 | 1 + 3 + 5 | 9 = 3² |
| 4 | 1 + 3 + 5 + 7 | 16 = 4² |
| 5 | 1 + 3 + 5 + 7 + 9 | 25 = 5² |

### 🌍 Aplicações Práticas

**1. Economia progressiva:**
Se você economiza R$ 100 no mês 1, R$ 150 no mês 2, R$ 200 no mês 3 (aumentando R$ 50/mês), quanto terá ao final de 12 meses?

PA: (100, 150, 200, ...) com r = 50
- a₁₂ = 100 + 11 × 50 = 650
- S₁₂ = (100 + 650) × 12 / 2 = 750 × 6 = **R$ 4.500**

**2. Assentos em teatro:**
Um teatro tem 20 fileiras. A primeira tem 15 assentos, e cada fileira seguinte tem 2 assentos a mais. Quantos assentos tem o teatro?

PA: (15, 17, 19, ...) com n = 20, r = 2
- a₂₀ = 15 + 19 × 2 = 15 + 38 = 53
- S₂₀ = (15 + 53) × 20 / 2 = 68 × 10 = **680 assentos**

**3. Queda livre (aproximação):**
Um objeto em queda livre percorre aproximadamente 5m no 1º segundo, 15m no 2º, 25m no 3º... Qual a distância total em 10 segundos?

PA: (5, 15, 25, 35, ...) com r = 10
- a₁₀ = 5 + 9 × 10 = 95
- S₁₀ = (5 + 95) × 10 / 2 = 100 × 5 = **500 metros**

### ✏️ Exercícios Práticos

**Exercício 1:** Calcule a soma dos 15 primeiros termos da PA (3, 7, 11, 15, ...).

<details>
<summary>Ver resposta</summary>

a₁ = 3, r = 4, n = 15
a₁₅ = 3 + 14 × 4 = 3 + 56 = 59
S₁₅ = (3 + 59) × 15 / 2 = 62 × 7,5 = **465**

</details>

**Exercício 2:** A soma de uma PA de 20 termos é 1.000. Se o primeiro termo é 5, qual é a razão?

<details>
<summary>Ver resposta</summary>

S₂₀ = 20 × [2×5 + 19×r] / 2 = 1000
10 × [10 + 19r] = 1000
10 + 19r = 100
19r = 90
r = **90/19 ≈ 4,74**

</details>

### 🎯 Resumo da Aula

- Soma de PA: Sₙ = (a₁ + aₙ) × n / 2
- Fórmula alternativa: Sₙ = n × [2a₁ + (n-1)×r] / 2
- A soma dos n primeiros ímpares é n²
- Aplicações: economia, construção, física

---

## Aula 3: Progressão Geométrica (PG) (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai aprender o que é uma **Progressão Geométrica (PG)**, como identificá-la, e como encontrar qualquer termo usando a fórmula do termo geral. As PGs modelam crescimento exponencial, presente em juros compostos, crescimento populacional e muito mais.

### 📚 O que é uma Progressão Geométrica?

> **Definição:** Uma Progressão Geométrica (PG) é uma sequência de números onde a razão entre cada termo e seu antecessor é sempre constante.

Essa razão constante é chamada de **razão** e representada pela letra **q**.

**Exemplos de PG:**
- (2, 6, 18, 54, ...) → razão q = 3
- (100, 50, 25, 12.5, ...) → razão q = 0,5
- (3, -6, 12, -24, ...) → razão q = -2
- (5, 5, 5, 5, ...) → razão q = 1

### 🔢 Elementos de uma PG

- **a₁** = primeiro termo
- **aₙ** = termo de ordem n
- **q** = razão (quociente entre termos consecutivos)
- **n** = número de termos

**Para encontrar a razão:**
q = a₂ / a₁ = a₃ / a₂ = a₄ / a₃ = ...

**Exemplo:** Na PG (4, 12, 36, 108, ...)
- a₁ = 4
- q = 12 / 4 = 3

### 📐 Fórmula do Termo Geral

Para encontrar qualquer termo de uma PG, usamos a **fórmula do termo geral**:

> **aₙ = a₁ × q^(n-1)**

Onde:
- aₙ = termo que queremos encontrar
- a₁ = primeiro termo
- q = razão
- n = posição do termo

**Exemplo 1:** Na PG (2, 6, 18, ...), qual é o 8º termo?

a₁ = 2, q = 3, n = 8

a₈ = 2 × 3^(8-1)
a₈ = 2 × 3⁷
a₈ = 2 × 2187
a₈ = **4.374**

**Exemplo 2:** Na PG (1000, 500, 250, ...), qual é o 6º termo?

a₁ = 1000, q = 0,5, n = 6

a₆ = 1000 × 0,5^(6-1)
a₆ = 1000 × 0,5⁵
a₆ = 1000 × 0,03125
a₆ = **31,25**

### 🔍 Classificação das PGs

**1. PG Crescente:**
- q > 1 e a₁ > 0, ou
- 0 < q < 1 e a₁ < 0

**2. PG Decrescente:**
- 0 < q < 1 e a₁ > 0, ou
- q > 1 e a₁ < 0

**3. PG Constante (q = 1):**
Todos os termos são iguais.

**4. PG Alternante (q < 0):**
Os termos alternam entre positivo e negativo.

### 📊 Propriedades das PGs

**1. Termo Médio Geométrico:**
Em três termos consecutivos de uma PG, o termo do meio é a média geométrica dos outros dois:

aₙ² = aₙ₋₁ × aₙ₊₁

**Exemplo:** Na PG (4, 12, 36), temos: 12² = 4 × 36 → 144 = 144 ✓

**2. Produto de Termos Equidistantes:**
O produto de dois termos equidistantes dos extremos é constante:

a₁ × aₙ = a₂ × aₙ₋₁ = a₃ × aₙ₋₂ = ...

### 🌍 Aplicações no Cotidiano

**1. Juros Compostos:**
Se você investe R$ 1.000 a 10% ao ano (juros compostos):
- Ano 0: R$ 1.000
- Ano 1: R$ 1.100
- Ano 2: R$ 1.210
- Ano 10: a₁₁ = 1000 × 1,1¹⁰ ≈ R$ 2.593,74

**2. Crescimento Populacional:**
Uma população de bactérias dobra a cada hora:
- Hora 0: 100
- Hora 1: 200
- Hora 2: 400
- Hora 10: a₁₁ = 100 × 2¹⁰ = 102.400 bactérias

**3. Depreciação:**
Um carro perde 15% do valor por ano:
- Ano 0: R$ 50.000
- Ano 1: R$ 42.500 (× 0,85)
- Ano 5: a₆ = 50000 × 0,85⁵ ≈ R$ 22.185

### ✏️ Exercícios Práticos

**Exercício 1:** Determine o 7º termo da PG (3, 9, 27, ...).

<details>
<summary>Ver resposta</summary>

a₁ = 3, q = 3, n = 7

a₇ = 3 × 3^(7-1)
a₇ = 3 × 3⁶
a₇ = 3 × 729
a₇ = **2.187**

</details>

**Exercício 2:** O 3º termo de uma PG é 20 e o 6º termo é 160. Qual é a razão?

<details>
<summary>Ver resposta</summary>

a₃ = a₁ × q² = 20
a₆ = a₁ × q⁵ = 160

Dividindo: a₆/a₃ = q³ = 160/20 = 8
q³ = 8
q = **2**

</details>

### 🎯 Resumo da Aula

- PG é uma sequência com razão constante entre termos consecutivos
- Razão (q) = quociente entre termos consecutivos
- Fórmula do termo geral: aₙ = a₁ × q^(n-1)
- Aplicações: juros compostos, crescimento exponencial, depreciação

---

## Aula 4: Soma de uma PG (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula final do módulo, você vai aprender a calcular a **soma de uma PG finita** e entender o conceito de **soma de uma PG infinita** (quando |q| < 1). Esses conceitos são fundamentais em matemática financeira e análise.

### 📐 Fórmula da Soma de uma PG Finita

A soma dos n primeiros termos de uma PG (com q ≠ 1) é:

> **Sₙ = a₁ × (qⁿ - 1) / (q - 1)**

Ou, equivalentemente:

> **Sₙ = a₁ × (1 - qⁿ) / (1 - q)**

**Caso especial (q = 1):** Sₙ = n × a₁

### 🔢 Exemplos de Aplicação

**Exemplo 1:** Calcule a soma dos 6 primeiros termos da PG (2, 6, 18, 54, ...).

a₁ = 2, q = 3, n = 6

S₆ = 2 × (3⁶ - 1) / (3 - 1)
S₆ = 2 × (729 - 1) / 2
S₆ = 2 × 728 / 2
S₆ = **728**

**Verificação:** 2 + 6 + 18 + 54 + 162 + 486 = 728 ✓

**Exemplo 2:** Calcule a soma dos 8 primeiros termos da PG (1, 2, 4, 8, ...).

a₁ = 1, q = 2, n = 8

S₈ = 1 × (2⁸ - 1) / (2 - 1)
S₈ = (256 - 1) / 1
S₈ = **255**

### 📊 Soma de uma PG Infinita

Quando |q| < 1 (ou seja, -1 < q < 1), os termos da PG vão diminuindo e se aproximando de zero. Nesse caso, a soma de infinitos termos converge para um valor finito:

> **S∞ = a₁ / (1 - q)** (válido apenas para |q| < 1)

**Exemplo 1:** Calcule a soma da PG infinita (1, 1/2, 1/4, 1/8, ...).

a₁ = 1, q = 1/2

S∞ = 1 / (1 - 1/2)
S∞ = 1 / (1/2)
S∞ = **2**

**Exemplo 2:** Calcule a soma da PG infinita (9, 3, 1, 1/3, ...).

a₁ = 9, q = 1/3

S∞ = 9 / (1 - 1/3)
S∞ = 9 / (2/3)
S∞ = 9 × 3/2
S∞ = **13,5**

### 🌍 Aplicações Práticas

**1. Valor Presente de Anuidade Perpétua:**
Se você recebe R$ 100 por mês para sempre, com taxa de juros de 1% ao mês, o valor presente é:

VP = 100 / 0,01 = R$ 10.000

**2. Bola Quicando:**
Uma bola é solta de 10m e cada quique atinge 80% da altura anterior. Qual a distância total percorrida?

Descida: 10 + 8 + 6,4 + ... = 10 / (1 - 0,8) = 50m
Subida: 8 + 6,4 + ... = 8 / (1 - 0,8) = 40m
Total: 50 + 40 = **90 metros**

**3. Dízima Periódica:**
0,333... = 3/10 + 3/100 + 3/1000 + ...
= (3/10) / (1 - 1/10) = (3/10) / (9/10) = 3/9 = **1/3**

### 📐 Comparação: PA vs PG

| Característica | PA | PG |
|----------------|----|----|
| Relação entre termos | Diferença constante | Razão constante |
| Fórmula do termo geral | aₙ = a₁ + (n-1)r | aₙ = a₁ × q^(n-1) |
| Crescimento | Linear | Exponencial |
| Soma finita | Sₙ = (a₁+aₙ)×n/2 | Sₙ = a₁×(qⁿ-1)/(q-1) |
| Soma infinita | Não existe | S∞ = a₁/(1-q) se \|q\|<1 |

### ✏️ Exercícios Práticos

**Exercício 1:** Calcule a soma dos 5 primeiros termos da PG (4, 12, 36, ...).

<details>
<summary>Ver resposta</summary>

a₁ = 4, q = 3, n = 5

S₅ = 4 × (3⁵ - 1) / (3 - 1)
S₅ = 4 × (243 - 1) / 2
S₅ = 4 × 242 / 2
S₅ = 4 × 121
S₅ = **484**

</details>

**Exercício 2:** Calcule a soma da PG infinita (16, 8, 4, 2, 1, ...).

<details>
<summary>Ver resposta</summary>

a₁ = 16, q = 1/2

S∞ = 16 / (1 - 1/2)
S∞ = 16 / (1/2)
S∞ = **32**

</details>

**Exercício 3:** Um investimento rende 5% ao mês. Se você deposita R$ 1.000 no início de cada mês durante 12 meses, quanto terá ao final?

<details>
<summary>Ver resposta</summary>

Cada depósito rende por tempos diferentes:
- 1º depósito: 1000 × 1,05¹²
- 2º depósito: 1000 × 1,05¹¹
- ...
- 12º depósito: 1000 × 1,05¹

Soma = 1000 × 1,05 × (1,05¹² - 1) / (1,05 - 1)
Soma = 1050 × (1,7959 - 1) / 0,05
Soma = 1050 × 15,917
Soma ≈ **R$ 16.713**

</details>

### 🎯 Resumo do Módulo

Neste módulo, você aprendeu:

1. **PA:** Sequência com diferença constante
   - Termo geral: aₙ = a₁ + (n-1)r
   - Soma: Sₙ = (a₁+aₙ)×n/2

2. **PG:** Sequência com razão constante
   - Termo geral: aₙ = a₁ × q^(n-1)
   - Soma finita: Sₙ = a₁×(qⁿ-1)/(q-1)
   - Soma infinita: S∞ = a₁/(1-q) se |q| < 1

3. **Aplicações:** Salários, economia, juros compostos, crescimento populacional, física
