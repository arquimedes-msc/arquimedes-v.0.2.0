# Módulo 12: Divisibilidade e Números Primos

## Aula 1: Critérios de Divisibilidade (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai aprender os **critérios de divisibilidade**, que são regras práticas para descobrir se um número é divisível por outro sem precisar fazer a divisão completa. Essas técnicas são extremamente úteis para simplificar frações, encontrar fatores e resolver problemas de matemática.

### 📚 O que é Divisibilidade?

Dizemos que um número **a** é divisível por **b** quando a divisão de a por b resulta em um número inteiro, sem resto.

> **Definição:** Um número a é divisível por b se existe um número inteiro k tal que a = b × k.

**Exemplos:**
- 12 é divisível por 3 porque 12 = 3 × 4 (resto zero)
- 15 é divisível por 5 porque 15 = 5 × 3 (resto zero)
- 17 não é divisível por 3 porque 17 = 3 × 5 + 2 (resto 2)

### 🔢 Critério de Divisibilidade por 2

> **Regra:** Um número é divisível por 2 se termina em 0, 2, 4, 6 ou 8 (números pares).

**Exemplos:**
- 246 é divisível por 2 (termina em 6) ✓
- 1.357 não é divisível por 2 (termina em 7) ✗
- 10.000 é divisível por 2 (termina em 0) ✓

**Por que funciona?** Qualquer número pode ser escrito como (dezenas × 10) + unidades. Como 10 é divisível por 2, basta verificar se as unidades são divisíveis por 2.

### 🔢 Critério de Divisibilidade por 3

> **Regra:** Um número é divisível por 3 se a soma de seus algarismos é divisível por 3.

**Exemplos:**
- 123: soma = 1 + 2 + 3 = 6, e 6 é divisível por 3 ✓
- 456: soma = 4 + 5 + 6 = 15, e 15 é divisível por 3 ✓
- 247: soma = 2 + 4 + 7 = 13, e 13 não é divisível por 3 ✗

**Exemplo com número grande:** 12.345.678
Soma: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36
36 é divisível por 3, então 12.345.678 também é! ✓

### 🔢 Critério de Divisibilidade por 4

> **Regra:** Um número é divisível por 4 se os dois últimos algarismos formam um número divisível por 4.

**Exemplos:**
- 316: os dois últimos são 16, e 16 ÷ 4 = 4 ✓
- 1.524: os dois últimos são 24, e 24 ÷ 4 = 6 ✓
- 2.345: os dois últimos são 45, e 45 ÷ 4 = 11,25 ✗

**Dica:** Memorize os múltiplos de 4 até 100: 04, 08, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 00.

### 🔢 Critério de Divisibilidade por 5

> **Regra:** Um número é divisível por 5 se termina em 0 ou 5.

**Exemplos:**
- 125 é divisível por 5 (termina em 5) ✓
- 340 é divisível por 5 (termina em 0) ✓
- 127 não é divisível por 5 (termina em 7) ✗

### 🔢 Critério de Divisibilidade por 6

> **Regra:** Um número é divisível por 6 se é divisível por 2 E por 3 simultaneamente.

**Exemplos:**
- 126: termina em 6 (divisível por 2) ✓ e soma = 9 (divisível por 3) ✓ → divisível por 6 ✓
- 124: termina em 4 (divisível por 2) ✓ mas soma = 7 (não divisível por 3) ✗ → não divisível por 6
- 123: soma = 6 (divisível por 3) ✓ mas termina em 3 (não divisível por 2) ✗ → não divisível por 6

### 🔢 Critério de Divisibilidade por 7

> **Regra:** Dobre o último algarismo e subtraia do número formado pelos demais. Se o resultado for divisível por 7, o número original também é.

**Exemplo:** 343 é divisível por 7?
1. Último algarismo: 3
2. Dobro: 3 × 2 = 6
3. Número restante: 34
4. Subtração: 34 - 6 = 28
5. 28 é divisível por 7? Sim (28 = 7 × 4) ✓

**Exemplo:** 532 é divisível por 7?
1. Último algarismo: 2
2. Dobro: 2 × 2 = 4
3. Número restante: 53
4. Subtração: 53 - 4 = 49
5. 49 é divisível por 7? Sim (49 = 7 × 7) ✓

### 🔢 Critério de Divisibilidade por 8

> **Regra:** Um número é divisível por 8 se os três últimos algarismos formam um número divisível por 8.

**Exemplos:**
- 1.024: os três últimos são 024 = 24, e 24 ÷ 8 = 3 ✓
- 5.000: os três últimos são 000 = 0, e 0 ÷ 8 = 0 ✓
- 1.234: os três últimos são 234, e 234 ÷ 8 = 29,25 ✗

### 🔢 Critério de Divisibilidade por 9

> **Regra:** Um número é divisível por 9 se a soma de seus algarismos é divisível por 9.

**Exemplos:**
- 729: soma = 7 + 2 + 9 = 18, e 18 é divisível por 9 ✓
- 12.345: soma = 1 + 2 + 3 + 4 + 5 = 15, e 15 não é divisível por 9 ✗
- 999: soma = 9 + 9 + 9 = 27, e 27 é divisível por 9 ✓

### 🔢 Critério de Divisibilidade por 10

> **Regra:** Um número é divisível por 10 se termina em 0.

**Exemplos:**
- 1.230 é divisível por 10 ✓
- 1.235 não é divisível por 10 ✗

### 🔢 Critério de Divisibilidade por 11

> **Regra:** Um número é divisível por 11 se a diferença entre a soma dos algarismos de posição ímpar e a soma dos algarismos de posição par é divisível por 11 (incluindo zero).

**Exemplo:** 918.082 é divisível por 11?
- Posições ímpares (da direita): 2 + 0 + 1 = 3
- Posições pares: 8 + 8 + 9 = 25
- Diferença: |3 - 25| = 22
- 22 é divisível por 11? Sim ✓

### 📊 Tabela Resumo dos Critérios

| Divisor | Critério |
|---------|----------|
| 2 | Termina em 0, 2, 4, 6 ou 8 |
| 3 | Soma dos algarismos divisível por 3 |
| 4 | Últimos 2 algarismos divisíveis por 4 |
| 5 | Termina em 0 ou 5 |
| 6 | Divisível por 2 E por 3 |
| 7 | Dobrar último, subtrair do resto |
| 8 | Últimos 3 algarismos divisíveis por 8 |
| 9 | Soma dos algarismos divisível por 9 |
| 10 | Termina em 0 |
| 11 | Diferença das somas alternadas divisível por 11 |

### ✏️ Exercícios Práticos

**Exercício 1:** O número 2.340 é divisível por quais números de 2 a 10?

<details>
<summary>Ver resposta</summary>

- Por 2: Sim (termina em 0) ✓
- Por 3: Soma = 2+3+4+0 = 9, divisível por 3 ✓
- Por 4: Últimos dois = 40, 40÷4 = 10 ✓
- Por 5: Termina em 0 ✓
- Por 6: Divisível por 2 e 3 ✓
- Por 7: 234 - 0 = 234, 23 - 8 = 15, não divisível ✗
- Por 8: 340÷8 = 42,5 ✗
- Por 9: Soma = 9, divisível por 9 ✓
- Por 10: Termina em 0 ✓

**Resposta:** 2, 3, 4, 5, 6, 9 e 10

</details>

### 🎯 Resumo da Aula

- Critérios de divisibilidade permitem verificar divisões sem calcular
- Por 2: último dígito par
- Por 3 e 9: soma dos dígitos
- Por 4 e 8: últimos 2 ou 3 dígitos
- Por 5 e 10: último dígito
- Por 6: combinar critérios de 2 e 3

---

## Aula 2: Números Primos e Compostos (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai conhecer os **números primos**, considerados os "átomos" da matemática. Eles são os blocos fundamentais a partir dos quais todos os outros números inteiros são construídos.

### 📚 Definições Fundamentais

> **Número Primo:** É um número natural maior que 1 que possui exatamente dois divisores: 1 e ele mesmo.

> **Número Composto:** É um número natural maior que 1 que possui mais de dois divisores.

**Exemplos de números primos:** 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31...

**Exemplos de números compostos:** 4, 6, 8, 9, 10, 12, 14, 15, 16...

**Observações importantes:**
- O número 1 não é primo nem composto (tem apenas um divisor)
- O número 2 é o único primo par
- Todos os outros primos são ímpares

### 🔍 Como Identificar um Número Primo

Para verificar se um número n é primo, basta testar se ele é divisível por algum primo menor ou igual a √n.

**Exemplo:** 97 é primo?
- √97 ≈ 9,85
- Primos até 9: 2, 3, 5, 7
- 97 ÷ 2 = 48,5 (não inteiro)
- 97 ÷ 3 = 32,33... (não inteiro)
- 97 ÷ 5 = 19,4 (não inteiro)
- 97 ÷ 7 = 13,86... (não inteiro)
- **97 é primo!**

**Exemplo:** 91 é primo?
- √91 ≈ 9,54
- 91 ÷ 7 = 13 (inteiro!)
- **91 = 7 × 13, não é primo**

### 📊 Lista dos Primeiros 100 Primos

| Faixa | Primos |
|-------|--------|
| 1-25 | 2, 3, 5, 7, 11, 13, 17, 19, 23 |
| 26-50 | 29, 31, 37, 41, 43, 47 |
| 51-75 | 53, 59, 61, 67, 71, 73 |
| 76-100 | 79, 83, 89, 97 |

Total de primos até 100: **25 números**

### 🏛️ O Crivo de Eratóstenes

O **Crivo de Eratóstenes** é um algoritmo antigo (criado por volta de 240 a.C.) para encontrar todos os números primos até um limite n.

**Algoritmo:**
1. Escreva todos os números de 2 até n
2. Circule o 2 (primeiro primo) e risque todos os múltiplos de 2
3. O próximo número não riscado é primo (3). Circule-o e risque seus múltiplos
4. Repita até √n
5. Os números circulados e não riscados são primos

**Exemplo para n = 30:**

```
2  3  4  5  6  7  8  9  10
11 12 13 14 15 16 17 18 19 20
21 22 23 24 25 26 27 28 29 30
```

Após o crivo: **2, 3, 5, 7, 11, 13, 17, 19, 23, 29**

### 🔢 Propriedades dos Números Primos

**1. Teorema Fundamental da Aritmética:**
Todo número inteiro maior que 1 pode ser escrito de forma única como produto de números primos.

**Exemplo:** 60 = 2² × 3 × 5

**2. Infinitude dos Primos:**
Existem infinitos números primos (provado por Euclides há mais de 2.000 anos).

**3. Primos Gêmeos:**
São pares de primos que diferem por 2: (3,5), (5,7), (11,13), (17,19), (29,31)...

**4. Conjectura de Goldbach:**
Todo número par maior que 2 pode ser escrito como soma de dois primos.
- 4 = 2 + 2
- 10 = 5 + 5 = 3 + 7
- 100 = 47 + 53

### 🌍 Aplicações dos Números Primos

**1. Criptografia RSA:**
A segurança de transações bancárias e comunicações na internet depende da dificuldade de fatorar números muito grandes em primos.

**2. Códigos de barras e verificação:**
Números primos são usados em algoritmos de verificação de erros.

**3. Cicadas:**
Algumas espécies de cigarras têm ciclos de vida de 13 ou 17 anos (números primos), o que dificulta a sincronização com predadores.

### ✏️ Exercícios Práticos

**Exercício 1:** Classifique os números como primos ou compostos: 51, 53, 57, 59.

<details>
<summary>Ver resposta</summary>

- 51 = 3 × 17 → **Composto**
- 53 → não divisível por 2, 3, 5, 7 → **Primo**
- 57 = 3 × 19 → **Composto**
- 59 → não divisível por 2, 3, 5, 7 → **Primo**

</details>

**Exercício 2:** Encontre todos os primos entre 40 e 60.

<details>
<summary>Ver resposta</summary>

41, 43, 47, 53, 59

(Verificação: 42=2×21, 44=4×11, 45=5×9, 46=2×23, 48=6×8, 49=7², 50=2×25, 51=3×17, 52=4×13, 54=6×9, 55=5×11, 56=7×8, 57=3×19, 58=2×29, 60=6×10)

</details>

### 🎯 Resumo da Aula

- Primos têm exatamente 2 divisores (1 e ele mesmo)
- O 2 é o único primo par
- Para testar primalidade, verifique divisores até √n
- O Crivo de Eratóstenes encontra todos os primos até n
- Primos são fundamentais para criptografia moderna

---

## Aula 3: Fatoração em Números Primos (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai aprender a **decompor qualquer número em fatores primos**. Essa técnica é essencial para simplificar frações, calcular MDC e MMC, e resolver diversos problemas matemáticos.

### 📚 O que é Fatoração?

**Fatorar** um número significa escrevê-lo como produto de números menores. A **fatoração em primos** (ou decomposição em fatores primos) é escrever o número como produto apenas de números primos.

> **Teorema Fundamental da Aritmética:** Todo número inteiro maior que 1 pode ser escrito de forma única como produto de números primos (a menos da ordem dos fatores).

### 🔧 Método da Fatoração

**Passo a passo:**
1. Divida o número pelo menor primo possível
2. Divida o quociente pelo menor primo possível
3. Repita até chegar a 1
4. O número original é o produto de todos os divisores usados

**Exemplo 1:** Fatorar 60

```
60 | 2
30 | 2
15 | 3
 5 | 5
 1
```

60 = 2 × 2 × 3 × 5 = **2² × 3 × 5**

**Exemplo 2:** Fatorar 360

```
360 | 2
180 | 2
 90 | 2
 45 | 3
 15 | 3
  5 | 5
  1
```

360 = 2 × 2 × 2 × 3 × 3 × 5 = **2³ × 3² × 5**

**Exemplo 3:** Fatorar 1.000

```
1000 | 2
 500 | 2
 250 | 2
 125 | 5
  25 | 5
   5 | 5
   1
```

1.000 = 2³ × 5³ = **8 × 125**

### 📊 Notação com Expoentes

Quando um primo aparece várias vezes, usamos expoentes:

| Número | Fatoração | Forma com Expoentes |
|--------|-----------|---------------------|
| 12 | 2 × 2 × 3 | 2² × 3 |
| 72 | 2 × 2 × 2 × 3 × 3 | 2³ × 3² |
| 100 | 2 × 2 × 5 × 5 | 2² × 5² |
| 144 | 2 × 2 × 2 × 2 × 3 × 3 | 2⁴ × 3² |
| 500 | 2 × 2 × 5 × 5 × 5 | 2² × 5³ |

### 🔍 Encontrando Divisores a partir da Fatoração

Se conhecemos a fatoração de um número, podemos encontrar todos os seus divisores.

**Exemplo:** Divisores de 12 = 2² × 3

Os divisores são todas as combinações de potências dos primos:
- 2⁰ × 3⁰ = 1
- 2¹ × 3⁰ = 2
- 2² × 3⁰ = 4
- 2⁰ × 3¹ = 3
- 2¹ × 3¹ = 6
- 2² × 3¹ = 12

**Divisores de 12:** 1, 2, 3, 4, 6, 12 (6 divisores)

### 📐 Fórmula para Quantidade de Divisores

Se n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ, então:

**Quantidade de divisores = (a₁ + 1) × (a₂ + 1) × ... × (aₖ + 1)**

**Exemplo:** 360 = 2³ × 3² × 5¹
Quantidade de divisores = (3+1) × (2+1) × (1+1) = 4 × 3 × 2 = **24 divisores**

### 🌍 Aplicações da Fatoração

**1. Simplificação de frações:**
Para simplificar 60/84:
- 60 = 2² × 3 × 5
- 84 = 2² × 3 × 7
- MDC = 2² × 3 = 12
- 60/84 = 5/7

**2. Raízes quadradas:**
√72 = √(2³ × 3²) = √(2² × 2 × 3²) = 2 × 3 × √2 = 6√2

**3. Cálculo de MMC e MDC** (próxima aula)

### ✏️ Exercícios Práticos

**Exercício 1:** Fatore 180 em primos.

<details>
<summary>Ver resposta</summary>

```
180 | 2
 90 | 2
 45 | 3
 15 | 3
  5 | 5
  1
```

180 = **2² × 3² × 5**

</details>

**Exercício 2:** Quantos divisores tem o número 120?

<details>
<summary>Ver resposta</summary>

120 = 2³ × 3 × 5
Divisores = (3+1) × (1+1) × (1+1) = 4 × 2 × 2 = **16 divisores**

</details>

### 🎯 Resumo da Aula

- Fatoração é decompor um número em produto de primos
- Use divisões sucessivas pelo menor primo possível
- Expoentes indicam quantas vezes cada primo aparece
- A quantidade de divisores depende dos expoentes na fatoração

---

## Aula 4: MDC e MMC Avançados (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai aprender métodos avançados para calcular o **Máximo Divisor Comum (MDC)** e o **Mínimo Múltiplo Comum (MMC)**, usando fatoração em primos e o algoritmo de Euclides.

### 📚 Revisão: MDC e MMC

> **MDC (Máximo Divisor Comum):** O maior número que divide dois ou mais números simultaneamente.

> **MMC (Mínimo Múltiplo Comum):** O menor número que é múltiplo de dois ou mais números simultaneamente.

### 🔧 Método da Fatoração

**Para calcular MDC:**
1. Fatore todos os números em primos
2. Identifique os primos comuns
3. Para cada primo comum, pegue o **menor expoente**
4. Multiplique os resultados

**Para calcular MMC:**
1. Fatore todos os números em primos
2. Identifique todos os primos que aparecem
3. Para cada primo, pegue o **maior expoente**
4. Multiplique os resultados

**Exemplo:** MDC e MMC de 60 e 84

60 = 2² × 3 × 5
84 = 2² × 3 × 7

**MDC:** Primos comuns com menores expoentes
- 2: min(2, 2) = 2²
- 3: min(1, 1) = 3¹
- MDC = 2² × 3 = 4 × 3 = **12**

**MMC:** Todos os primos com maiores expoentes
- 2: max(2, 2) = 2²
- 3: max(1, 1) = 3¹
- 5: max(1, 0) = 5¹
- 7: max(0, 1) = 7¹
- MMC = 2² × 3 × 5 × 7 = 4 × 3 × 5 × 7 = **420**

### 📐 Relação entre MDC e MMC

Para quaisquer dois números a e b:

**a × b = MDC(a, b) × MMC(a, b)**

**Verificação:** 60 × 84 = 5.040
MDC × MMC = 12 × 420 = 5.040 ✓

Essa relação permite calcular um a partir do outro:
- MMC = (a × b) / MDC
- MDC = (a × b) / MMC

### 🔄 Algoritmo de Euclides para MDC

O **Algoritmo de Euclides** é um método eficiente para calcular o MDC sem precisar fatorar.

**Princípio:** MDC(a, b) = MDC(b, a mod b)

**Exemplo:** MDC(252, 105)

```
252 = 105 × 2 + 42    → MDC(252, 105) = MDC(105, 42)
105 = 42 × 2 + 21     → MDC(105, 42) = MDC(42, 21)
42 = 21 × 2 + 0       → MDC(42, 21) = 21
```

**MDC(252, 105) = 21**

**Exemplo 2:** MDC(1071, 462)

```
1071 = 462 × 2 + 147  → MDC(1071, 462) = MDC(462, 147)
462 = 147 × 3 + 21    → MDC(462, 147) = MDC(147, 21)
147 = 21 × 7 + 0      → MDC(147, 21) = 21
```

**MDC(1071, 462) = 21**

### 📊 MDC e MMC de Três ou Mais Números

**Método:** Calcule aos pares

**Exemplo:** MDC(12, 18, 24)

MDC(12, 18) = 6
MDC(6, 24) = 6

**MDC(12, 18, 24) = 6**

**Exemplo:** MMC(4, 6, 9)

MMC(4, 6) = 12
MMC(12, 9) = 36

**MMC(4, 6, 9) = 36**

### 🌍 Aplicações Práticas

**1. Sincronização de eventos:**
Dois semáforos piscam a cada 4 e 6 segundos. Quando piscam juntos novamente?
MMC(4, 6) = 12 segundos

**2. Divisão de quantidades:**
Dividir 60 laranjas e 84 maçãs em cestas iguais, com o máximo de frutas por cesta.
MDC(60, 84) = 12 frutas por cesta

**3. Frações:**
Para somar 1/12 + 1/18, precisamos do MMC(12, 18) = 36 como denominador comum.

### ✏️ Exercícios Práticos

**Exercício 1:** Calcule MDC(48, 180) usando fatoração.

<details>
<summary>Ver resposta</summary>

48 = 2⁴ × 3
180 = 2² × 3² × 5

MDC = 2² × 3 = 4 × 3 = **12**

</details>

**Exercício 2:** Calcule MDC(323, 187) usando o algoritmo de Euclides.

<details>
<summary>Ver resposta</summary>

323 = 187 × 1 + 136
187 = 136 × 1 + 51
136 = 51 × 2 + 34
51 = 34 × 1 + 17
34 = 17 × 2 + 0

**MDC = 17**

</details>

### 🎯 Resumo da Aula

- MDC: primos comuns com menores expoentes
- MMC: todos os primos com maiores expoentes
- a × b = MDC × MMC
- Algoritmo de Euclides: divisões sucessivas até resto zero

---

## Aula 5: Aplicações Práticas de Divisibilidade (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula final do módulo, você vai aplicar todos os conceitos de divisibilidade, números primos, fatoração, MDC e MMC em problemas práticos do cotidiano e de concursos.

### 💼 Problema 1: Distribuição Igualitária

**Situação:** Uma escola recebeu 144 cadernos e 180 canetas para distribuir igualmente entre as salas. Qual o maior número de salas que podem receber a mesma quantidade de cada item?

**Solução:**
Precisamos do MDC(144, 180)

144 = 2⁴ × 3²
180 = 2² × 3² × 5

MDC = 2² × 3² = 4 × 9 = **36 salas**

Cada sala recebe:
- 144 ÷ 36 = 4 cadernos
- 180 ÷ 36 = 5 canetas

### 🚌 Problema 2: Sincronização de Ônibus

**Situação:** Três linhas de ônibus partem do terminal às 6h. A linha A passa a cada 12 minutos, a B a cada 15 minutos e a C a cada 20 minutos. Quando as três linhas estarão juntas novamente?

**Solução:**
Precisamos do MMC(12, 15, 20)

12 = 2² × 3
15 = 3 × 5
20 = 2² × 5

MMC = 2² × 3 × 5 = 4 × 3 × 5 = **60 minutos**

As três linhas estarão juntas às **7h** (6h + 60 min).

### 🔢 Problema 3: Verificação de Divisibilidade

**Situação:** Sem fazer a divisão, determine se 123.456.789 é divisível por 9.

**Solução:**
Soma dos algarismos: 1+2+3+4+5+6+7+8+9 = 45
45 é divisível por 9? Sim (45 = 9 × 5)

**123.456.789 é divisível por 9** ✓

### 🎂 Problema 4: Divisão de Bolo

**Situação:** Um bolo retangular de 24 cm × 36 cm será cortado em quadrados iguais, os maiores possíveis. Qual o lado de cada quadrado e quantos quadrados serão?

**Solução:**
O lado do quadrado é o MDC(24, 36)

24 = 2³ × 3
36 = 2² × 3²

MDC = 2² × 3 = **12 cm**

Quantidade de quadrados:
- Na largura: 24 ÷ 12 = 2
- No comprimento: 36 ÷ 12 = 3
- Total: 2 × 3 = **6 quadrados**

### 🔐 Problema 5: Código de Segurança

**Situação:** Um cofre tem um código de 4 dígitos. Sabe-se que:
- É divisível por 4
- É divisível por 9
- Está entre 1000 e 2000
- A soma dos dígitos é 18

**Solução:**
Se é divisível por 4 e 9, é divisível por 36.
Múltiplos de 36 entre 1000 e 2000: 1008, 1044, 1080, 1116, 1152, 1188, 1224, 1260, 1296, 1332, 1368, 1404, 1440, 1476, 1512, 1548, 1584, 1620, 1656, 1692, 1728, 1764, 1800, 1836, 1872, 1908, 1944, 1980

Verificando soma = 18:
- 1260: 1+2+6+0 = 9 ✗
- 1440: 1+4+4+0 = 9 ✗
- 1620: 1+6+2+0 = 9 ✗
- 1800: 1+8+0+0 = 9 ✗
- 1980: 1+9+8+0 = 18 ✓

**Código: 1980**

### 📊 Problema 6: Análise de Dados

**Situação:** Em uma pesquisa, 840 pessoas responderam. Queremos dividir em grupos de mesmo tamanho para análise. Quais são as opções de divisão com mais de 10 e menos de 100 pessoas por grupo?

**Solução:**
Precisamos dos divisores de 840 entre 10 e 100.

840 = 2³ × 3 × 5 × 7

Divisores de 840: 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 15, 20, 21, 24, 28, 30, 35, 40, 42, 56, 60, 70, 84, 105, 120, 140, 168, 210, 280, 420, 840

Entre 10 e 100: **12, 14, 15, 20, 21, 24, 28, 30, 35, 40, 42, 56, 60, 70, 84**

### ✏️ Exercícios Finais

**Exercício 1:** Três amigos se encontram hoje. Um viaja a cada 6 dias, outro a cada 8 dias e outro a cada 12 dias. Daqui a quantos dias se encontrarão novamente?

<details>
<summary>Ver resposta</summary>

MMC(6, 8, 12)
6 = 2 × 3
8 = 2³
12 = 2² × 3

MMC = 2³ × 3 = 8 × 3 = **24 dias**

</details>

**Exercício 2:** Quantos números entre 1 e 100 são divisíveis por 6 mas não por 9?

<details>
<summary>Ver resposta</summary>

Divisíveis por 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96 (16 números)

Divisíveis por 6 e 9 (ou seja, por 18): 18, 36, 54, 72, 90 (5 números)

Resposta: 16 - 5 = **11 números**

</details>

### 🎯 Resumo do Módulo

Neste módulo, você aprendeu:

1. **Critérios de Divisibilidade:** Regras rápidas para verificar divisões
2. **Números Primos:** Os blocos fundamentais dos números inteiros
3. **Fatoração:** Decompor números em produtos de primos
4. **MDC e MMC:** Calcular usando fatoração ou algoritmo de Euclides
5. **Aplicações:** Resolver problemas práticos do cotidiano

Esses conceitos são fundamentais para matemática avançada e muito cobrados em concursos públicos e vestibulares.
