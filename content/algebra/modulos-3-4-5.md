# Módulos 3, 4 e 5 de Álgebra

---

## MÓDULO 3: SISTEMAS DE EQUAÇÕES DO 1º GRAU

### Aula 1: Introdução aos Sistemas

**Tempo estimado:** 40 minutos

#### 🎯 Introdução

Até agora, trabalhamos com uma equação e uma variável. Mas e quando temos duas incógnitas? Por exemplo: "A soma de dois números é 10 e a diferença é 2. Quais são esses números?" Para resolver isso, precisamos de um **sistema de equações** - duas equações trabalhando juntas!

#### 📐 O que é um Sistema de Equações?

> **Definição:** Um sistema de equações é um conjunto de duas ou mais equações que devem ser satisfeitas simultaneamente pelas mesmas variáveis.

**Exemplo de sistema:**
```
{ x + y = 10
{ x - y = 2
```

Lê-se: "x mais y é igual a 10 E x menos y é igual a 2"

#### 🎨 Interpretação Gráfica

Cada equação do 1º grau representa uma **reta** no plano cartesiano. A solução do sistema é o **ponto de interseção** das duas retas.

**Exemplo:** Sistema { x + y = 5, x - y = 1 }

- Equação 1 (x + y = 5) é uma reta
- Equação 2 (x - y = 1) é outra reta
- Solução: ponto onde as retas se cruzam (3, 2)

#### 📊 Tipos de Soluções

| Tipo | Descrição | Gráfico | Exemplo |
|------|-----------|---------|---------|
| **Solução única** | Retas se cruzam em 1 ponto | Retas não paralelas | x + y = 5, x - y = 1 |
| **Infinitas soluções** | Retas coincidentes | Mesma reta | 2x + 2y = 10, x + y = 5 |
| **Sem solução** | Retas paralelas | Nunca se cruzam | x + y = 5, x + y = 3 |

#### ✅ Verificação de Soluções

Para verificar se um par (x, y) é solução de um sistema, substitua os valores nas DUAS equações.

**Exemplo:** Verifique se (3, 2) é solução de { x + y = 5, x - y = 1 }

**Equação 1:** 3 + 2 = 5 → 5 = 5 ✅  
**Equação 2:** 3 - 2 = 1 → 1 = 1 ✅

**Conclusão:** Sim, (3, 2) é a solução.

#### ✏️ Exercício 1: Verificando Soluções

**Pergunta:** Verifique se o par dado é solução:

a) (2, 3) para { x + y = 5, 2x - y = 1 }  
b) (4, 1) para { x + y = 5, x - y = 3 }

**Respostas:**
a) Eq1: 2 + 3 = 5 ✅ | Eq2: 2(2) - 3 = 1 ✅ → Sim  
b) Eq1: 4 + 1 = 5 ✅ | Eq2: 4 - 1 = 3 ✅ → Sim

#### 🌍 Exemplos Práticos

**Exemplo 1:** Ana e Bruno juntos têm R$ 50,00. Ana tem R$ 10,00 a mais que Bruno. Quanto cada um tem?

Sistema:
```
{ a + b = 50  (soma)
{ a = b + 10  (Ana tem 10 a mais)
```

Solução: Ana tem R$ 30,00, Bruno tem R$ 20,00

#### 💡 Resumo

- Sistema = duas equações com duas variáveis
- Solução = par (x, y) que satisfaz ambas
- Graficamente = ponto de interseção de retas

---

### Aula 2: Método da Substituição

**Tempo estimado:** 45 minutos

#### 🎯 Introdução

O **método da substituição** é uma técnica para resolver sistemas de equações. A ideia é isolar uma variável em uma equação e substituir na outra. É como resolver um quebra-cabeça: encontramos uma peça primeiro, depois usamos ela para encontrar a outra!

#### 📝 Passo a Passo do Método

**Passo 1:** Isole uma variável em uma das equações  
**Passo 2:** Substitua essa expressão na outra equação  
**Passo 3:** Resolva a equação resultante (agora com apenas uma variável)  
**Passo 4:** Substitua o valor encontrado de volta para achar a outra variável  
**Passo 5:** Verifique a solução

#### 🔢 Exemplo 1: Sistema Simples

Resolva:
```
{ y = 2x + 1  ... (equação 1)
{ x + y = 7   ... (equação 2)
```

**Passo 1:** y já está isolado na equação 1

**Passo 2:** Substitua y na equação 2  
x + (2x + 1) = 7

**Passo 3:** Resolva para x  
3x + 1 = 7  
3x = 6  
x = 2

**Passo 4:** Substitua x = 2 na equação 1  
y = 2(2) + 1 = 5

**Passo 5:** Verifique  
Eq1: 5 = 2(2) + 1 → 5 = 5 ✅  
Eq2: 2 + 5 = 7 → 7 = 7 ✅

**Resposta:** x = 2, y = 5 ou (2, 5)

#### 🔢 Exemplo 2: Isolando Primeiro

Resolva:
```
{ x + y = 10  ... (equação 1)
{ x - y = 2   ... (equação 2)
```

**Passo 1:** Isole x na equação 1  
x = 10 - y

**Passo 2:** Substitua na equação 2  
(10 - y) - y = 2

**Passo 3:** Resolva para y  
10 - 2y = 2  
-2y = -8  
y = 4

**Passo 4:** Substitua y = 4 na expressão de x  
x = 10 - 4 = 6

**Resposta:** x = 6, y = 4 ou (6, 4)

#### ✏️ Exercício 1: Método da Substituição

**Pergunta:** Resolva pelo método da substituição:

a) { y = x + 3, x + y = 9 }  
b) { x = 2y, x + y = 12 }

**Respostas:**
a) x + (x + 3) = 9 → 2x = 6 → x = 3, y = 6  
b) 2y + y = 12 → 3y = 12 → y = 4, x = 8

#### 🌍 Problema Prático

**Problema:** Um cinema vendeu 100 ingressos, sendo adultos (R$ 20) e crianças (R$ 10). A arrecadação foi R$ 1.500. Quantos ingressos de cada tipo foram vendidos?

Sistema:
```
{ a + c = 100     (total de ingressos)
{ 20a + 10c = 1500 (arrecadação)
```

**Passo 1:** Isole a na equação 1  
a = 100 - c

**Passo 2:** Substitua na equação 2  
20(100 - c) + 10c = 1500  
2000 - 20c + 10c = 1500  
-10c = -500  
c = 50

**Passo 3:** Encontre a  
a = 100 - 50 = 50

**Resposta:** 50 ingressos de adulto e 50 de criança

#### 💡 Resumo

- Isole uma variável
- Substitua na outra equação
- Resolva e volte para encontrar a segunda variável

---

### Aula 3: Método da Adição

**Tempo estimado:** 45 minutos

#### 🎯 Introdução

O **método da adição** (ou eliminação) é outra técnica poderosa. A ideia é somar (ou subtrair) as duas equações para eliminar uma das variáveis. É como fazer mágica: uma variável desaparece!

#### 📝 Passo a Passo do Método

**Passo 1:** Organize as equações uma embaixo da outra  
**Passo 2:** Multiplique uma ou ambas para igualar coeficientes  
**Passo 3:** Some ou subtraia as equações para eliminar uma variável  
**Passo 4:** Resolva para a variável restante  
**Passo 5:** Substitua para encontrar a outra variável

#### 🔢 Exemplo 1: Eliminação Direta

Resolva:
```
{ x + y = 10
{ x - y = 2
```

**Passo 1:** Organize  
```
  x + y = 10
+ x - y = 2
─────────────
  2x    = 12
```

**Passo 2:** Resolva  
x = 6

**Passo 3:** Substitua em qualquer equação  
6 + y = 10 → y = 4

**Resposta:** (6, 4)

#### 🔢 Exemplo 2: Multiplicando Primeiro

Resolva:
```
{ 2x + y = 11
{ x + y = 7
```

**Passo 1:** Subtraia as equações  
```
  2x + y = 11
- (x + y = 7)
─────────────
  x      = 4
```

**Passo 2:** Substitua  
4 + y = 7 → y = 3

**Resposta:** (4, 3)

#### 🔢 Exemplo 3: Multiplicando Ambas

Resolva:
```
{ 2x + 3y = 13
{ 3x + 2y = 12
```

**Passo 1:** Multiplique para igualar coeficientes de x  
Multiplique equação 1 por 3: 6x + 9y = 39  
Multiplique equação 2 por 2: 6x + 4y = 24

**Passo 2:** Subtraia  
```
  6x + 9y = 39
- 6x + 4y = 24
─────────────
       5y = 15
```

**Passo 3:** Resolva  
y = 3

**Passo 4:** Substitua  
2x + 3(3) = 13 → 2x = 4 → x = 2

**Resposta:** (2, 3)

#### ✏️ Exercício 1: Método da Adição

**Pergunta:** Resolva:

a) { x + y = 8, x - y = 2 }  
b) { 2x + y = 10, x + y = 6 }

**Respostas:**
a) Some: 2x = 10 → x = 5, y = 3  
b) Subtraia: x = 4, y = 2

#### 📊 Quando Usar Cada Método?

| Situação | Método Recomendado |
|----------|-------------------|
| Uma variável já isolada | Substituição |
| Coeficientes opostos | Adição (direta) |
| Coeficientes iguais | Adição (subtrair) |
| Coeficientes diferentes | Adição (multiplicar primeiro) |

#### 💡 Resumo

- Método da adição elimina uma variável
- Multiplique para igualar coeficientes se necessário
- Escolha o método mais conveniente para cada problema

---

## MÓDULO 4: EQUAÇÕES DO 2º GRAU

### Aula 1: O que é uma Equação do 2º Grau?

**Tempo estimado:** 40 minutos

#### 🎯 Introdução

Você já resolveu equações como 2x + 5 = 11. Mas e se a equação for x² + 5x + 6 = 0? Essa é uma **equação do 2º grau** - um novo tipo de equação que aparece em muitos problemas práticos, desde calcular áreas até prever trajetórias de objetos!

#### 📐 Forma Geral

> **Definição:** Uma equação do 2º grau (ou equação quadrática) tem a forma:
>
> **ax² + bx + c = 0**
>
> onde a, b, c são números reais e a ≠ 0.

**Partes da equação:**
- **a** = coeficiente de x² (não pode ser zero!)
- **b** = coeficiente de x
- **c** = termo independente (constante)

#### 🔢 Identificando Coeficientes

**Exemplo 1:** x² + 5x + 6 = 0  
a = 1, b = 5, c = 6

**Exemplo 2:** 2x² - 3x + 1 = 0  
a = 2, b = -3, c = 1

**Exemplo 3:** -x² + 4x - 4 = 0  
a = -1, b = 4, c = -4

#### ✏️ Exercício 1: Identificando Coeficientes

**Pergunta:** Identifique a, b, c:

a) x² + 7x + 10 = 0  
b) 3x² - 2x + 5 = 0  
c) -2x² + x - 3 = 0

**Respostas:**
a) a=1, b=7, c=10  
b) a=3, b=-2, c=5  
c) a=-2, b=1, c=-3

#### 📊 Diferença Entre 1º e 2º Grau

| Característica | 1º Grau | 2º Grau |
|----------------|---------|---------|
| Forma | ax + b = 0 | ax² + bx + c = 0 |
| Maior expoente | 1 | 2 |
| Número de soluções | 1 | 0, 1 ou 2 |
| Gráfico | Reta | Parábola |

#### 🎨 Interpretação Gráfica

Uma equação do 2º grau representa uma **parábola** no plano cartesiano.

- Se a > 0: parábola "abre para cima" (U)
- Se a < 0: parábola "abre para baixo" (∩)

**Raízes** da equação = pontos onde a parábola cruza o eixo x

#### 🌍 Exemplos Práticos

**Exemplo 1: Área**  
Um terreno retangular tem comprimento 5 metros maior que a largura. Se a área é 50 m², qual a largura?

Equação: x(x + 5) = 50 → x² + 5x - 50 = 0

**Exemplo 2: Movimento**  
A altura de um objeto lançado é dada por h = -5t² + 20t. Quando ele atinge o chão (h = 0)?

Equação: -5t² + 20t = 0

#### 💡 Resumo

- Equação do 2º grau: ax² + bx + c = 0
- Tem 0, 1 ou 2 soluções (raízes)
- Gráfico é uma parábola

---

### Aula 2: Equações Incompletas

**Tempo estimado:** 45 minutos

#### 🎯 Introdução

Nem toda equação do 2º grau tem todos os termos. Quando b = 0 ou c = 0, temos uma **equação incompleta**, que é mais fácil de resolver!

#### 📝 Tipo 1: ax² + c = 0 (sem termo bx)

**Exemplo 1:** x² - 9 = 0

**Passo 1:** Isole x²  
x² = 9

**Passo 2:** Tire a raiz quadrada  
x = ±3

**Resposta:** x = 3 ou x = -3

**Exemplo 2:** 2x² - 18 = 0  
2x² = 18  
x² = 9  
x = ±3

#### 📝 Tipo 2: ax² + bx = 0 (sem termo c)

**Exemplo 3:** x² + 5x = 0

**Passo 1:** Coloque x em evidência  
x(x + 5) = 0

**Passo 2:** Aplique a propriedade do produto nulo  
x = 0 ou x + 5 = 0

**Resposta:** x = 0 ou x = -5

**Exemplo 4:** 3x² - 6x = 0  
3x(x - 2) = 0  
x = 0 ou x = 2

#### ✏️ Exercício 1: Equações Incompletas

**Pergunta:** Resolva:

a) x² - 16 = 0  
b) x² + 3x = 0  
c) 2x² - 8 = 0  
d) x² - 7x = 0

**Respostas:**
a) x = ±4  
b) x = 0 ou x = -3  
c) x = ±2  
d) x = 0 ou x = 7

#### 💡 Resumo

- Tipo 1 (ax² + c = 0): Isole x² e tire raiz
- Tipo 2 (ax² + bx = 0): Coloque x em evidência

---

### Aula 3: Fórmula de Bhaskara

**Tempo estimado:** 50 minutos

#### 🎯 Introdução

Para equações completas (ax² + bx + c = 0), usamos a **Fórmula de Bhaskara** - uma fórmula poderosa que resolve qualquer equação do 2º grau!

#### 📐 O Discriminante (Δ)

Antes de aplicar a fórmula, calculamos o **discriminante**:

> **Δ = b² - 4ac**

O discriminante nos diz quantas raízes a equação tem:

| Δ | Número de Raízes | Tipo |
|---|------------------|------|
| Δ > 0 | 2 raízes reais distintas | Parábola cruza eixo x em 2 pontos |
| Δ = 0 | 1 raiz real (dupla) | Parábola toca eixo x em 1 ponto |
| Δ < 0 | 0 raízes reais | Parábola não cruza eixo x |

#### 📝 Fórmula de Bhaskara

> **x = (-b ± √Δ) / 2a**

Onde:
- x₁ = (-b + √Δ) / 2a
- x₂ = (-b - √Δ) / 2a

#### 🔢 Exemplo 1: Δ > 0 (2 raízes)

Resolva: x² - 5x + 6 = 0

**Passo 1:** Identifique a, b, c  
a = 1, b = -5, c = 6

**Passo 2:** Calcule Δ  
Δ = (-5)² - 4(1)(6) = 25 - 24 = 1

**Passo 3:** Aplique Bhaskara  
x = (5 ± √1) / 2  
x = (5 ± 1) / 2

x₁ = 6/2 = 3  
x₂ = 4/2 = 2

**Resposta:** x = 3 ou x = 2

#### 🔢 Exemplo 2: Δ = 0 (1 raiz)

Resolva: x² - 6x + 9 = 0

Δ = 36 - 36 = 0  
x = 6/2 = 3

**Resposta:** x = 3 (raiz dupla)

#### 🔢 Exemplo 3: Δ < 0 (sem raízes reais)

Resolva: x² + 2x + 5 = 0

Δ = 4 - 20 = -16 < 0

**Resposta:** Não há raízes reais

#### ✏️ Exercício 1: Bhaskara

**Pergunta:** Resolva:

a) x² - 7x + 10 = 0  
b) x² - 4x + 4 = 0  
c) x² + x + 1 = 0

**Respostas:**
a) Δ=9, x=5 ou x=2  
b) Δ=0, x=2  
c) Δ=-3, sem raízes reais

#### 💡 Resumo

- Calcule Δ = b² - 4ac primeiro
- Use x = (-b ± √Δ) / 2a
- Δ determina quantas raízes existem

---

### Aula 4: Problemas Práticos

**Tempo estimado:** 35 minutos

#### 🌍 Problema 1: Área

Um terreno retangular tem comprimento 3 metros maior que a largura. Se a área é 40 m², quais são as dimensões?

Seja x = largura  
Comprimento = x + 3  
Área: x(x + 3) = 40  
x² + 3x - 40 = 0

Δ = 9 + 160 = 169  
x = (-3 ± 13) / 2  
x = 5 (descartamos x = -8)

**Resposta:** Largura 5m, comprimento 8m

#### 🌍 Problema 2: Números

A soma de dois números é 10 e o produto é 21. Quais são esses números?

x + y = 10 → y = 10 - x  
xy = 21 → x(10 - x) = 21  
10x - x² = 21  
x² - 10x + 21 = 0

Δ = 100 - 84 = 16  
x = (10 ± 4) / 2  
x = 7 ou x = 3

**Resposta:** Os números são 7 e 3

#### 💡 Resumo

- Traduza o problema para equação
- Resolva usando Bhaskara
- Interprete a solução no contexto

---

## MÓDULO 5: PRODUTOS NOTÁVEIS E FATORAÇÃO

### Aula 1: Quadrado da Soma e Diferença

**Tempo estimado:** 45 minutos

#### 🎯 Introdução

Produtos notáveis são multiplicações especiais que aparecem com frequência. Memorizar suas formas nos ajuda a calcular mais rápido e simplificar expressões!

#### 📐 Quadrado da Soma

> **(a + b)² = a² + 2ab + b²**

**Exemplo 1:** (x + 3)²  
= x² + 2(x)(3) + 3²  
= x² + 6x + 9

**Exemplo 2:** (2x + 5)²  
= (2x)² + 2(2x)(5) + 5²  
= 4x² + 20x + 25

#### 📐 Quadrado da Diferença

> **(a - b)² = a² - 2ab + b²**

**Exemplo 3:** (x - 4)²  
= x² - 2(x)(4) + 4²  
= x² - 8x + 16

#### ✏️ Exercício 1

**Pergunta:** Expanda:

a) (x + 5)²  
b) (x - 2)²  
c) (3x + 1)²

**Respostas:**
a) x² + 10x + 25  
b) x² - 4x + 4  
c) 9x² + 6x + 1

#### 🚫 Erro Comum

❌ (a + b)² ≠ a² + b²  
✅ (a + b)² = a² + 2ab + b²

#### 💡 Resumo

- (a + b)² = a² + 2ab + b²
- (a - b)² = a² - 2ab + b²
- Não esqueça o termo do meio (2ab)!

---

### Aula 2: Produto da Soma pela Diferença

**Tempo estimado:** 45 minutos

#### 📐 Fórmula

> **(a + b)(a - b) = a² - b²**

**Exemplo 1:** (x + 5)(x - 5)  
= x² - 25

**Exemplo 2:** (3x + 2)(3x - 2)  
= 9x² - 4

#### ✏️ Exercício 1

**Pergunta:** Calcule:

a) (x + 7)(x - 7)  
b) (2x + 3)(2x - 3)

**Respostas:**
a) x² - 49  
b) 4x² - 9

#### 💡 Resumo

- (a + b)(a - b) = a² - b²
- Resultado sempre é diferença de quadrados

---

### Aula 3: Fatoração Básica

**Tempo estimado:** 40 minutos

#### 📐 Fator Comum

**Exemplo 1:** 6x + 9  
= 3(2x + 3)

**Exemplo 2:** x² + 5x  
= x(x + 5)

#### 📐 Diferença de Quadrados

**Exemplo 3:** x² - 16  
= (x + 4)(x - 4)

#### 📐 Trinômio Quadrado Perfeito

**Exemplo 4:** x² + 6x + 9  
= (x + 3)²

#### ✏️ Exercício 1

**Pergunta:** Fatore:

a) 4x + 12  
b) x² - 25  
c) x² + 8x + 16

**Respostas:**
a) 4(x + 3)  
b) (x + 5)(x - 5)  
c) (x + 4)²

#### 💡 Resumo

- Fator comum: coloque em evidência
- a² - b²: produto da soma pela diferença
- a² + 2ab + b²: quadrado da soma

---

**Fim dos Módulos 3, 4 e 5**
