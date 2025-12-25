import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('📝 Criando aulas do Módulo 7: Potenciação e Radiciação Avançadas...\n');

const modulo7Aulas = [
  {
    moduleId: 180007,
    slug: 'propriedades-das-potencias',
    title: 'Propriedades das Potências',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Propriedades das Potências

## 🎯 Objetivo da Aula

Dominar as propriedades fundamentais da potenciação e aplicá-las na simplificação de expressões matemáticas e resolução de problemas.

---

## 📚 Revisão: O que é Potenciação?

**Potenciação** é uma multiplicação repetida:

**a^n = a × a × a × ... × a** (n vezes)

Onde:
- **a** = base
- **n** = expoente
- **a^n** = potência

**Exemplos:**
- 2³ = 2 × 2 × 2 = 8
- 5² = 5 × 5 = 25
- 10⁴ = 10 × 10 × 10 × 10 = 10.000

---

## 🔢 Propriedade 1: Produto de Potências de Mesma Base

**Regra:** Conserve a base e **some** os expoentes.

**a^m × a^n = a^(m+n)**

### Exemplos:

**1) 2³ × 2⁴ = ?**
- 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128

**2) 5² × 5³ × 5¹ = ?**
- 5² × 5³ × 5¹ = 5^(2+3+1) = 5⁶ = 15.625

**3) x⁴ × x² = ?**
- x⁴ × x² = x^(4+2) = x⁶

---

## 🔢 Propriedade 2: Quociente de Potências de Mesma Base

**Regra:** Conserve a base e **subtraia** os expoentes.

**a^m ÷ a^n = a^(m−n)**

### Exemplos:

**1) 3⁵ ÷ 3² = ?**
- 3⁵ ÷ 3² = 3^(5−2) = 3³ = 27

**2) 10⁶ ÷ 10³ = ?**
- 10⁶ ÷ 10³ = 10^(6−3) = 10³ = 1.000

**3) y⁸ ÷ y⁵ = ?**
- y⁸ ÷ y⁵ = y^(8−5) = y³

---

## 🔢 Propriedade 3: Potência de Potência

**Regra:** Conserve a base e **multiplique** os expoentes.

**(a^m)^n = a^(m×n)**

### Exemplos:

**1) (2³)² = ?**
- (2³)² = 2^(3×2) = 2⁶ = 64

**2) (5²)⁴ = ?**
- (5²)⁴ = 5^(2×4) = 5⁸ = 390.625

**3) (x⁴)³ = ?**
- (x⁴)³ = x^(4×3) = x¹²

---

## 🔢 Propriedade 4: Potência de um Produto

**Regra:** Distribua o expoente para cada fator.

**(a × b)^n = a^n × b^n**

### Exemplos:

**1) (2 × 3)² = ?**
- (2 × 3)² = 2² × 3² = 4 × 9 = 36

**2) (5 × 2)³ = ?**
- (5 × 2)³ = 5³ × 2³ = 125 × 8 = 1.000

**3) (xy)⁴ = ?**
- (xy)⁴ = x⁴ × y⁴

---

## 🔢 Propriedade 5: Potência de um Quociente

**Regra:** Distribua o expoente para numerador e denominador.

**(a/b)^n = a^n / b^n**

### Exemplos:

**1) (3/2)² = ?**
- (3/2)² = 3² / 2² = 9/4 = 2,25

**2) (10/5)³ = ?**
- (10/5)³ = 10³ / 5³ = 1.000/125 = 8

**3) (x/y)⁵ = ?**
- (x/y)⁵ = x⁵ / y⁵

---

## 🔢 Casos Especiais

### Expoente Zero

**Regra:** Qualquer número (exceto zero) elevado a zero é igual a 1.

**a⁰ = 1** (a ≠ 0)

**Exemplos:**
- 5⁰ = 1
- 1000⁰ = 1
- (−3)⁰ = 1

### Expoente Um

**Regra:** Qualquer número elevado a 1 é ele mesmo.

**a¹ = a**

**Exemplos:**
- 7¹ = 7
- 100¹ = 100
- x¹ = x

### Expoente Negativo

**Regra:** Inverta a base e torne o expoente positivo.

**a^(−n) = 1/a^n**

**Exemplos:**
- 2^(−3) = 1/2³ = 1/8 = 0,125
- 10^(−2) = 1/10² = 1/100 = 0,01
- 5^(−1) = 1/5 = 0,2

---

## 🧮 Notação Científica

**Notação científica** expressa números muito grandes ou muito pequenos na forma:

**a × 10^n**

Onde:
- 1 ≤ a < 10
- n é inteiro

### Exemplos de Números Grandes:

**1) 5.000.000 = ?**
- 5.000.000 = 5 × 10⁶

**2) 300.000.000 = ?**
- 300.000.000 = 3 × 10⁸

### Exemplos de Números Pequenos:

**1) 0,0005 = ?**
- 0,0005 = 5 × 10^(−4)

**2) 0,00000012 = ?**
- 0,00000012 = 1,2 × 10^(−7)

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Simplifique: 2⁵ × 2³ ÷ 2⁴

**Solução:**
- 2⁵ × 2³ = 2^(5+3) = 2⁸
- 2⁸ ÷ 2⁴ = 2^(8−4) = 2⁴ = 16

### Exercício 2
Calcule: (3²)³

**Solução:**
- (3²)³ = 3^(2×3) = 3⁶ = 729

### Exercício 3
Expresse em notação científica: 0,00045

**Solução:**
- 0,00045 = 4,5 × 10^(−4)

### Exercício 4
Simplifique: (2x³)⁴

**Solução:**
- (2x³)⁴ = 2⁴ × (x³)⁴
- = 16 × x¹²
- = 16x¹²

---

## 💡 Dicas para Não Errar

1. **Produto:** SOMA os expoentes
2. **Quociente:** SUBTRAI os expoentes
3. **Potência de potência:** MULTIPLICA os expoentes
4. **Expoente zero:** Resultado é sempre 1
5. **Expoente negativo:** Inverte a base

---

## 🎓 Resumo da Aula

✅ Produto de potências: a^m × a^n = a^(m+n)  
✅ Quociente: a^m ÷ a^n = a^(m−n)  
✅ Potência de potência: (a^m)^n = a^(m×n)  
✅ Potência de produto: (ab)^n = a^n × b^n  
✅ Expoente zero: a⁰ = 1  
✅ Expoente negativo: a^(−n) = 1/a^n  
✅ Notação científica: a × 10^n

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180007,
    slug: 'raizes-e-suas-propriedades',
    title: 'Raízes e suas Propriedades',
    order: 2,
    estimatedMinutes: 55,
    mainText: `# Raízes e suas Propriedades

## 🎯 Objetivo da Aula

Compreender o conceito de raiz, dominar operações com radicais e aplicar técnicas de simplificação e racionalização.

---

## 📚 O que é uma Raiz?

**Raiz** é a operação inversa da potenciação.

**Se a^n = b, então ⁿ√b = a**

Onde:
- **n** = índice da raiz
- **b** = radicando
- **a** = raiz

### Tipos Principais:

**Raiz Quadrada (n=2):**
- √9 = 3 (pois 3² = 9)
- √16 = 4 (pois 4² = 16)
- √25 = 5 (pois 5² = 25)

**Raiz Cúbica (n=3):**
- ³√8 = 2 (pois 2³ = 8)
- ³√27 = 3 (pois 3³ = 27)
- ³√64 = 4 (pois 4³ = 64)

---

## 🔢 Propriedade 1: Raiz de um Produto

**Regra:** A raiz de um produto é o produto das raízes.

**ⁿ√(a × b) = ⁿ√a × ⁿ√b**

### Exemplos:

**1) √(4 × 9) = ?**
- √(4 × 9) = √4 × √9 = 2 × 3 = 6

**2) √(16 × 25) = ?**
- √(16 × 25) = √16 × √25 = 4 × 5 = 20

**3) ³√(8 × 27) = ?**
- ³√(8 × 27) = ³√8 × ³√27 = 2 × 3 = 6

---

## 🔢 Propriedade 2: Raiz de um Quociente

**Regra:** A raiz de um quociente é o quociente das raízes.

**ⁿ√(a/b) = ⁿ√a / ⁿ√b**

### Exemplos:

**1) √(25/4) = ?**
- √(25/4) = √25 / √4 = 5/2 = 2,5

**2) √(100/9) = ?**
- √(100/9) = √100 / √9 = 10/3 ≈ 3,33

**3) ³√(64/8) = ?**
- ³√(64/8) = ³√64 / ³√8 = 4/2 = 2

---

## 🔢 Propriedade 3: Raiz de Raiz

**Regra:** Multiplique os índices.

**ⁿ√(ᵐ√a) = ⁿᵐ√a**

### Exemplos:

**1) √(√16) = ?**
- √(√16) = ⁴√16 = 2

**2) ³√(√64) = ?**
- ³√(√64) = ⁶√64 = 2

---

## 🔧 Simplificação de Radicais

**Objetivo:** Retirar fatores do radical.

**Método:**
1. Fatorar o radicando
2. Agrupar fatores iguais
3. Extrair grupos completos

### Exemplos:

**1) Simplifique √50**

**Passo 1:** Fatorar
- 50 = 2 × 25 = 2 × 5²

**Passo 2:** Aplicar propriedade
- √50 = √(2 × 5²) = √2 × √(5²) = 5√2

**2) Simplifique √72**

**Passo 1:** Fatorar
- 72 = 8 × 9 = 2³ × 3²

**Passo 2:** Extrair
- √72 = √(2² × 2 × 3²) = 2 × 3 × √2 = 6√2

**3) Simplifique ³√54**

**Passo 1:** Fatorar
- 54 = 27 × 2 = 3³ × 2

**Passo 2:** Extrair
- ³√54 = ³√(3³ × 2) = 3 × ³√2 = 3³√2

---

## 🔧 Racionalização de Denominadores

**Objetivo:** Eliminar raízes do denominador.

### Caso 1: Raiz Quadrada Simples

**Método:** Multiplicar numerador e denominador pela raiz.

**Exemplo:** Racionalize 1/√2

**Solução:**
- 1/√2 × √2/√2 = √2/2

### Caso 2: Raiz Cúbica

**Método:** Multiplicar por potência que complete o índice.

**Exemplo:** Racionalize 1/³√2

**Solução:**
- Precisamos de 2³ no denominador
- 1/³√2 × ³√4/³√4 = ³√4/2

### Caso 3: Binômio com Raiz

**Método:** Multiplicar pelo conjugado.

**Exemplo:** Racionalize 1/(2 + √3)

**Solução:**
- Conjugado: (2 − √3)
- 1/(2 + √3) × (2 − √3)/(2 − √3)
- = (2 − √3)/(4 − 3)
- = 2 − √3

---

## 🧮 Operações com Radicais

### Adição e Subtração

**Regra:** Só podemos somar/subtrair radicais **semelhantes**.

**Exemplos:**
- 3√2 + 5√2 = 8√2
- 7√5 − 2√5 = 5√5
- √3 + √2 = não pode simplificar (radicais diferentes)

### Multiplicação

**Regra:** Multiplicar radicandos e índices iguais.

**Exemplos:**
- √2 × √3 = √6
- √5 × √5 = √25 = 5
- 2√3 × 3√2 = 6√6

### Divisão

**Regra:** Dividir radicandos.

**Exemplos:**
- √8 ÷ √2 = √(8/2) = √4 = 2
- √50 ÷ √2 = √(50/2) = √25 = 5

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Simplifique: √98

**Solução:**
- 98 = 2 × 49 = 2 × 7²
- √98 = √(2 × 7²) = 7√2

### Exercício 2
Racionalize: 3/√5

**Solução:**
- 3/√5 × √5/√5 = 3√5/5

### Exercício 3
Calcule: √12 + √27

**Solução:**
- √12 = √(4 × 3) = 2√3
- √27 = √(9 × 3) = 3√3
- 2√3 + 3√3 = 5√3

### Exercício 4
Racionalize: 2/(3 − √2)

**Solução:**
- Conjugado: (3 + √2)
- 2/(3 − √2) × (3 + √2)/(3 + √2)
- = 2(3 + √2)/(9 − 2)
- = 2(3 + √2)/7
- = (6 + 2√2)/7

---

## 💡 Raízes de Números Negativos

**Raiz quadrada de negativo:** Não existe no conjunto dos reais.
- √(−4) não existe em ℝ

**Raiz cúbica de negativo:** Existe!
- ³√(−8) = −2 (pois (−2)³ = −8)

**Regra geral:**
- Índice par + radicando negativo = não existe em ℝ
- Índice ímpar + radicando negativo = existe

---

## 🎓 Resumo da Aula

✅ Raiz é a operação inversa da potenciação  
✅ ⁿ√(a × b) = ⁿ√a × ⁿ√b  
✅ ⁿ√(a/b) = ⁿ√a / ⁿ√b  
✅ Simplificação: fatorar e extrair grupos  
✅ Racionalização: eliminar raízes do denominador  
✅ Somar/subtrair apenas radicais semelhantes  
✅ Raiz par de negativo não existe em ℝ

---

**Tempo estimado:** 55 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180007,
    slug: 'notacao-cientifica',
    title: 'Notação Científica',
    order: 3,
    estimatedMinutes: 45,
    mainText: `# Notação Científica

## 🎯 Objetivo da Aula

Dominar a notação científica para representar números muito grandes ou muito pequenos e realizar operações com eles de forma eficiente.

---

## 📚 O que é Notação Científica?

**Notação científica** é uma forma compacta de escrever números usando potências de 10.

**Formato:** a × 10^n

Onde:
- **1 ≤ a < 10** (um algarismo antes da vírgula)
- **n** é um número inteiro (positivo ou negativo)

---

## 🔢 Por que Usar Notação Científica?

### Números Muito Grandes:

**Sem notação científica:**
- Distância Terra-Sol: 149.600.000.000 metros
- Velocidade da luz: 300.000.000 m/s
- População mundial: 8.000.000.000 pessoas

**Com notação científica:**
- Distância Terra-Sol: 1,496 × 10¹¹ m
- Velocidade da luz: 3 × 10⁸ m/s
- População mundial: 8 × 10⁹ pessoas

### Números Muito Pequenos:

**Sem notação científica:**
- Massa de um elétron: 0,00000000000000000000000000000091 kg
- Tamanho de um átomo: 0,0000000001 m
- Carga de um elétron: 0,00000000000000000016 C

**Com notação científica:**
- Massa de um elétron: 9,1 × 10^(−31) kg
- Tamanho de um átomo: 1 × 10^(−10) m
- Carga de um elétron: 1,6 × 10^(−19) C

---

## 🔄 Convertendo para Notação Científica

### Números Maiores que 1:

**Regra:** Mova a vírgula para a esquerda até ter apenas 1 algarismo antes dela. O expoente é **positivo** e igual ao número de casas movidas.

**Exemplos:**

**1) 5.000 = ?**
- Mover 3 casas para esquerda
- 5.000 = 5 × 10³

**2) 123.000.000 = ?**
- Mover 8 casas
- 123.000.000 = 1,23 × 10⁸

**3) 45.600 = ?**
- Mover 4 casas
- 45.600 = 4,56 × 10⁴

### Números Menores que 1:

**Regra:** Mova a vírgula para a direita até ter apenas 1 algarismo diferente de zero antes dela. O expoente é **negativo** e igual ao número de casas movidas.

**Exemplos:**

**1) 0,005 = ?**
- Mover 3 casas para direita
- 0,005 = 5 × 10^(−3)

**2) 0,00000078 = ?**
- Mover 7 casas
- 0,00000078 = 7,8 × 10^(−7)

**3) 0,0456 = ?**
- Mover 2 casas
- 0,0456 = 4,56 × 10^(−2)

---

## 🔄 Convertendo de Notação Científica

### Expoente Positivo:

**Regra:** Mova a vírgula para a **direita**.

**Exemplos:**

**1) 3,5 × 10⁴ = ?**
- Mover 4 casas para direita
- 3,5 × 10⁴ = 35.000

**2) 1,2 × 10⁶ = ?**
- Mover 6 casas
- 1,2 × 10⁶ = 1.200.000

### Expoente Negativo:

**Regra:** Mova a vírgula para a **esquerda**.

**Exemplos:**

**1) 4 × 10^(−3) = ?**
- Mover 3 casas para esquerda
- 4 × 10^(−3) = 0,004

**2) 6,7 × 10^(−5) = ?**
- Mover 5 casas
- 6,7 × 10^(−5) = 0,000067

---

## 🧮 Operações em Notação Científica

### Multiplicação

**Regra:**
1. Multiplique os coeficientes
2. Some os expoentes

**(a × 10^m) × (b × 10^n) = (a × b) × 10^(m+n)**

**Exemplos:**

**1) (2 × 10³) × (3 × 10⁴) = ?**
- Coeficientes: 2 × 3 = 6
- Expoentes: 3 + 4 = 7
- Resultado: 6 × 10⁷

**2) (1,5 × 10⁵) × (4 × 10²) = ?**
- Coeficientes: 1,5 × 4 = 6
- Expoentes: 5 + 2 = 7
- Resultado: 6 × 10⁷

### Divisão

**Regra:**
1. Divida os coeficientes
2. Subtraia os expoentes

**(a × 10^m) ÷ (b × 10^n) = (a ÷ b) × 10^(m−n)**

**Exemplos:**

**1) (8 × 10⁶) ÷ (2 × 10³) = ?**
- Coeficientes: 8 ÷ 2 = 4
- Expoentes: 6 − 3 = 3
- Resultado: 4 × 10³

**2) (9 × 10⁸) ÷ (3 × 10⁵) = ?**
- Coeficientes: 9 ÷ 3 = 3
- Expoentes: 8 − 5 = 3
- Resultado: 3 × 10³

### Adição e Subtração

**Regra:** Igualar os expoentes primeiro.

**Exemplo:** (3 × 10⁴) + (5 × 10³)

**Passo 1:** Igualar expoentes
- 5 × 10³ = 0,5 × 10⁴

**Passo 2:** Somar coeficientes
- 3 × 10⁴ + 0,5 × 10⁴ = 3,5 × 10⁴

---

## 🌍 Aplicações Práticas

### Exemplo 1: Astronomia
A distância da Terra à Lua é 3,84 × 10⁸ metros. Um foguete viaja a 1,2 × 10⁴ m/s. Quanto tempo leva?

**Solução:**
- Tempo = Distância ÷ Velocidade
- Tempo = (3,84 × 10⁸) ÷ (1,2 × 10⁴)
- Tempo = 3,2 × 10⁴ segundos
- Tempo ≈ 8,9 horas

### Exemplo 2: Biologia
Uma bactéria tem massa de 1 × 10^(−12) kg. Quantas bactérias pesam 1 grama?

**Solução:**
- 1 grama = 1 × 10^(−3) kg
- Número = (1 × 10^(−3)) ÷ (1 × 10^(−12))
- Número = 1 × 10⁹ bactérias (1 bilhão)

### Exemplo 3: Física
A velocidade da luz é 3 × 10⁸ m/s. Em 1 ano (3,15 × 10⁷ s), qual a distância percorrida?

**Solução:**
- Distância = Velocidade × Tempo
- Distância = (3 × 10⁸) × (3,15 × 10⁷)
- Distância = 9,45 × 10¹⁵ metros (1 ano-luz)

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Expresse em notação científica: 0,00456

**Solução:**
- Mover 3 casas para direita
- 0,00456 = 4,56 × 10^(−3)

### Exercício 2
Calcule: (2 × 10⁵) × (3 × 10³)

**Solução:**
- Coeficientes: 2 × 3 = 6
- Expoentes: 5 + 3 = 8
- Resultado: 6 × 10⁸

### Exercício 3
Converta para decimal: 5,2 × 10^(−4)

**Solução:**
- Mover 4 casas para esquerda
- 5,2 × 10^(−4) = 0,00052

---

## 🎓 Resumo da Aula

✅ Notação científica: a × 10^n (1 ≤ a < 10)  
✅ Expoente positivo: número grande  
✅ Expoente negativo: número pequeno  
✅ Multiplicação: multiplica coeficientes, soma expoentes  
✅ Divisão: divide coeficientes, subtrai expoentes  
✅ Aplicações em astronomia, física e biologia

---

**Tempo estimado:** 45 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180007,
    slug: 'problemas-avancados',
    title: 'Problemas Avançados',
    order: 4,
    estimatedMinutes: 50,
    mainText: `# Problemas Avançados

## 🎯 Objetivo da Aula

Aplicar conhecimentos de potenciação, radiciação e notação científica na resolução de problemas complexos e situações reais.

---

## 📈 Crescimento Exponencial

**Crescimento exponencial** ocorre quando uma quantidade aumenta por um **fator constante** em intervalos regulares.

**Fórmula:** P(t) = P₀ × (1 + r)^t

Onde:
- P(t) = população no tempo t
- P₀ = população inicial
- r = taxa de crescimento
- t = tempo

### Exemplo 1: População de Bactérias

Uma colônia tem 1.000 bactérias e dobra a cada hora. Quantas bactérias após 5 horas?

**Solução:**
- P₀ = 1.000
- r = 100% = 1 (dobra)
- t = 5 horas
- P(5) = 1.000 × 2⁵
- P(5) = 1.000 × 32 = 32.000 bactérias

### Exemplo 2: Crescimento Populacional

Uma cidade tem 50.000 habitantes e cresce 3% ao ano. Qual a população em 10 anos?

**Solução:**
- P₀ = 50.000
- r = 3% = 0,03
- t = 10 anos
- P(10) = 50.000 × (1,03)¹⁰
- P(10) = 50.000 × 1,344
- P(10) ≈ 67.200 habitantes

---

## 💰 Juros Compostos Básicos

**Juros compostos** são calculados sobre o montante acumulado.

**Fórmula:** M = C × (1 + i)^t

Onde:
- M = montante final
- C = capital inicial
- i = taxa de juros (decimal)
- t = tempo

### Exemplo 3: Investimento

Você investe R$ 5.000,00 a 8% ao ano. Quanto terá em 3 anos?

**Solução:**
- C = 5.000
- i = 8% = 0,08
- t = 3 anos
- M = 5.000 × (1,08)³
- M = 5.000 × 1,2597
- M ≈ R$ 6.298,50

### Exemplo 4: Comparação com Juros Simples

Compare R$ 10.000,00 a 10% ao ano por 5 anos:

**Juros Simples:**
- J = C × i × t = 10.000 × 0,1 × 5 = 5.000
- M = 10.000 + 5.000 = R$ 15.000,00

**Juros Compostos:**
- M = 10.000 × (1,1)⁵
- M = 10.000 × 1,6105
- M ≈ R$ 16.105,00

**Diferença:** R$ 1.105,00 a mais com juros compostos!

---

## 🧬 Decaimento Exponencial

**Decaimento exponencial** ocorre quando uma quantidade diminui por um fator constante.

**Fórmula:** N(t) = N₀ × (1 − r)^t

### Exemplo 5: Meia-Vida Radioativa

Uma substância radioativa tem meia-vida de 10 anos. Se começamos com 800g, quanto resta após 30 anos?

**Solução:**
- N₀ = 800g
- Após cada 10 anos, metade decai
- t = 30 anos = 3 períodos de meia-vida
- N(30) = 800 × (1/2)³
- N(30) = 800 × 1/8 = 100g

### Exemplo 6: Desvalorização de Carro

Um carro de R$ 60.000,00 desvaloriza 15% ao ano. Qual seu valor após 4 anos?

**Solução:**
- V₀ = 60.000
- r = 15% = 0,15
- t = 4 anos
- V(4) = 60.000 × (0,85)⁴
- V(4) = 60.000 × 0,5220
- V(4) ≈ R$ 31.320,00

---

## 🔬 Problemas de Física

### Exemplo 7: Queda Livre

A distância percorrida em queda livre é d = 5t². Após quanto tempo um objeto cai 80 metros?

**Solução:**
- 80 = 5t²
- t² = 16
- t = √16 = 4 segundos

### Exemplo 8: Velocidade da Luz

A luz viaja a 3 × 10⁸ m/s. Quanto tempo leva para percorrer 1,5 × 10¹¹ metros (distância Terra-Sol)?

**Solução:**
- Tempo = Distância ÷ Velocidade
- t = (1,5 × 10¹¹) ÷ (3 × 10⁸)
- t = 0,5 × 10³ = 500 segundos
- t ≈ 8,3 minutos

---

## 🏗️ Problemas de Engenharia

### Exemplo 9: Área de Terreno

Um terreno quadrado tem área de 625 m². Qual o comprimento do lado?

**Solução:**
- Área = lado²
- 625 = lado²
- lado = √625 = 25 metros

### Exemplo 10: Volume de Cubo

Um cubo tem volume de 1.728 cm³. Qual a aresta?

**Solução:**
- Volume = aresta³
- 1.728 = aresta³
- aresta = ³√1.728 = 12 cm

---

## 🧮 Problemas de Concursos

### Exercício 1
Simplifique: (2³ × 2⁵) ÷ (2⁴)²

**Solução:**
- Numerador: 2³ × 2⁵ = 2⁸
- Denominador: (2⁴)² = 2⁸
- Resultado: 2⁸ ÷ 2⁸ = 2⁰ = 1

### Exercício 2
Uma população de 10.000 habitantes cresce 5% ao ano. Em quantos anos dobrará?

**Solução:**
- 20.000 = 10.000 × (1,05)^t
- 2 = (1,05)^t
- Usando logaritmo ou tentativa:
- t ≈ 14,2 anos

### Exercício 3
Calcule: √(2 + √3) × √(2 − √3)

**Solução:**
- Produto notável: (a + b)(a − b) = a² − b²
- √[(2 + √3)(2 − √3)]
- = √(4 − 3)
- = √1 = 1

### Exercício 4
Em notação científica, calcule: (4 × 10⁶) × (2 × 10^(−3))

**Solução:**
- Coeficientes: 4 × 2 = 8
- Expoentes: 6 + (−3) = 3
- Resultado: 8 × 10³ = 8.000

---

## 💡 Estratégias de Resolução

1. **Identifique o tipo de problema:** crescimento, decaimento, área, volume?
2. **Escolha a fórmula adequada**
3. **Substitua os valores conhecidos**
4. **Simplifique usando propriedades**
5. **Verifique se a resposta faz sentido**

---

## 🎓 Resumo da Aula

✅ Crescimento exponencial: P(t) = P₀ × (1 + r)^t  
✅ Juros compostos: M = C × (1 + i)^t  
✅ Decaimento: N(t) = N₀ × (1 − r)^t  
✅ Aplicações em física, biologia e finanças  
✅ Notação científica facilita cálculos grandes  
✅ Propriedades de potências simplificam expressões

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
];

for (const aula of modulo7Aulas) {
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

console.log('\n🎉 Módulo 7 completo: 4 aulas criadas!');
console.log('📊 Progresso: 8/20 aulas (40%)');

await conn.end();
