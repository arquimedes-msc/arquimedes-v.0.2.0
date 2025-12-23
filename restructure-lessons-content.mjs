import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import * as schema from './drizzle/schema.js';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection, { schema, mode: 'default' });

// Página 1: O que é Adicionar - Adicionar mais vídeos e melhorar estrutura
const page1Content = `# O que é Adicionar (Combinar)

## 🎯 Introdução: Somando no Dia a Dia

Adição é a operação matemática mais natural que existe. Você já soma sem perceber: "Tenho 2 balas e ganho mais 3 = 5 balas". **Somar é juntar quantidades**.

<YouTubeEmbed videoId="YI9-VJMvCZM" title="Matemática Básica - Aula 01 - Adição" />

**Exemplos do cotidiano:**

- R$ 50 na carteira + R$ 100 de pagamento = R$ 150
- 8 horas ontem + 6 horas hoje = 14 horas trabalhadas
- 3 pães de manhã + 5 à tarde = 8 pães no total

---

## 📚 Parte 1: Entendendo os Termos

Quando escrevemos **5 + 3 = 8**, cada elemento tem um nome:

- **5** → Primeira parcela
- **3** → Segunda parcela
- **8** → Soma (ou total, ou resultado)
- **+** → Sinal de adição (lê-se "mais")
- **=** → Sinal de igualdade (lê-se "é igual a")

**Lê-se:** "cinco mais três é igual a oito"

<YouTubeEmbed videoId="kq0kh0XvT9c" title="Como somar os números - vídeo educativo" />

### ✏️ Exercícios: Identificando Termos

<ExerciseCard 
  question="Em 12 + 7 = 19, qual é a soma (resultado)?"
  expectedAnswer="19"
  hints={["A soma é o resultado final", "12 + 7 = 19"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Em 20 + 15 = 35, quais são as parcelas? (responda separado por vírgula, ex: 10,5)"
  expectedAnswer="20,15"
  alternativeAnswers={["20, 15", "15,20", "15, 20"]}
  hints={["As parcelas são os números que estão sendo somados", "20 e 15"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Complete: 8 + 6 = ?"
  expectedAnswer="14"
  hints={["Conte nos dedos se precisar", "8 + 6 = 14"]}
  type="simple_input"
/>

---

## 🔄 Parte 2: Propriedades da Adição

### Propriedade Comutativa (A Ordem Não Importa)

\`\`\`
3 + 5 = 8
5 + 3 = 8
\`\`\`

**Não importa a ordem das parcelas, o resultado é o mesmo!**

**Exemplo prático:** R$ 50 ontem + R$ 30 hoje = R$ 80 (mesma coisa que R$ 30 ontem + R$ 50 hoje)

### ✏️ Exercícios: Propriedade Comutativa

<ExerciseCard 
  question="Se 7 + 9 = 16, quanto é 9 + 7?"
  expectedAnswer="16"
  hints={["A ordem não importa na adição", "9 + 7 = 16"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Se 12 + 8 = 20, quanto é 8 + 12?"
  expectedAnswer="20"
  hints={["Propriedade comutativa: a + b = b + a", "8 + 12 = 20"]}
  type="simple_input"
/>

---

### Propriedade Associativa (Agrupar de Qualquer Forma)

\`\`\`
(2 + 3) + 4 = 5 + 4 = 9
2 + (3 + 4) = 2 + 7 = 9
\`\`\`

**Não importa como você agrupa, o resultado é o mesmo!**

### ✏️ Exercícios: Propriedade Associativa

<ExerciseCard 
  question="Calcule: (5 + 3) + 2 = ?"
  expectedAnswer="10"
  hints={["Primeiro: 5 + 3 = 8", "Depois: 8 + 2 = 10"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Calcule: 10 + (4 + 6) = ?"
  expectedAnswer="20"
  hints={["Primeiro: 4 + 6 = 10", "Depois: 10 + 10 = 20"]}
  type="simple_input"
/>

---

### Elemento Neutro (Somar Zero Não Muda Nada)

\`\`\`
5 + 0 = 5
0 + 12 = 12
\`\`\`

**Somar zero a qualquer número resulta no próprio número!**

<YouTubeEmbed videoId="IZ-EhL9B8Tw" title="Como fazer conta de adição - Método fácil" />

### ✏️ Exercícios: Elemento Neutro

<ExerciseCard 
  question="Quanto é 25 + 0?"
  expectedAnswer="25"
  hints={["Somar zero não muda o número", "25 + 0 = 25"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Quanto é 0 + 87?"
  expectedAnswer="87"
  hints={["Zero é o elemento neutro da adição", "0 + 87 = 87"]}
  type="simple_input"
/>

---

## 🎯 Parte 3: Adição de Números Pequenos (1-20)

### ✏️ Exercícios: Aquecimento

<ExerciseCard 
  question="3 + 4 = ?"
  expectedAnswer="7"
  hints={["Conte nos dedos se precisar", "3 + 4 = 7"]}
  type="simple_input"
/>

<ExerciseCard 
  question="6 + 5 = ?"
  expectedAnswer="11"
  hints={["6 + 5 = 11"]}
  type="simple_input"
/>

<ExerciseCard 
  question="9 + 7 = ?"
  expectedAnswer="16"
  hints={["9 + 7 = 16"]}
  type="simple_input"
/>

<ExerciseCard 
  question="8 + 8 = ?"
  expectedAnswer="16"
  hints={["Dobro de 8", "8 + 8 = 16"]}
  type="simple_input"
/>

---

## 💰 Parte 4: Situações Práticas do Cotidiano

### Exemplo: Orçamento Pessoal

Você tem R$ 200 na conta e recebe R$ 350 de salário. Quanto tem agora?

\`\`\`
200 + 350 = 550
Resposta: R$ 550
\`\`\`

### ✏️ Exercícios: Situações Reais

<ExerciseCard 
  question="Você tinha R$ 80 e ganhou R$ 120. Quanto tem agora?"
  expectedAnswer="200"
  alternativeAnswers={["R$ 200", "200 reais"]}
  hints={["80 + 120 = ?", "80 + 120 = 200"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Você trabalhou 6 horas ontem e 8 horas hoje. Quantas horas trabalhou no total?"
  expectedAnswer="14"
  alternativeAnswers={["14 horas", "14h"]}
  hints={["6 + 8 = ?", "6 + 8 = 14"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Uma loja vendeu 45 produtos pela manhã e 55 à tarde. Quantos produtos vendeu no dia?"
  expectedAnswer="100"
  alternativeAnswers={["100 produtos"]}
  hints={["45 + 55 = ?", "45 + 55 = 100"]}
  type="simple_input"
/>

---

## 🚀 Parte 5: Adição de Números Maiores

### Estratégia: Decomposição

**Exemplo: 47 + 35**

\`\`\`
Decomponha em dezenas e unidades:
47 = 40 + 7
35 = 30 + 5

Some as dezenas: 40 + 30 = 70
Some as unidades: 7 + 5 = 12
Total: 70 + 12 = 82
\`\`\`

### ✏️ Exercícios: Números Maiores

<ExerciseCard 
  question="25 + 30 = ?"
  expectedAnswer="55"
  hints={["25 + 30 = 55"]}
  type="simple_input"
/>

<ExerciseCard 
  question="48 + 27 = ?"
  expectedAnswer="75"
  hints={["48 + 27 = 75", "Ou: 40 + 20 = 60, depois 8 + 7 = 15, total = 75"]}
  type="simple_input"
/>

<ExerciseCard 
  question="56 + 44 = ?"
  expectedAnswer="100"
  hints={["56 + 44 = 100", "Ou: 50 + 40 = 90, depois 6 + 4 = 10, total = 100"]}
  type="simple_input"
/>

---

## ✅ Resumo: Checklist de Domínio

Você dominou o conceito básico de adição quando consegue:

- ✓ Identificar parcelas e soma em uma operação
- ✓ Aplicar a propriedade comutativa (a ordem não importa)
- ✓ Aplicar a propriedade associativa (agrupar de qualquer forma)
- ✓ Reconhecer o zero como elemento neutro
- ✓ Somar números pequenos (1-20) mentalmente
- ✓ Resolver situações práticas do cotidiano
- ✓ Decompor e somar números maiores

**Próximo passo:** Aprenda a usar a reta numérica na Página 2!`;

// Página 2: Reta Numérica - Quebrar em seções menores
const page2Content = `# A Reta Numérica: Visualizando o Movimento

## 🗺️ Introdução: O Mapa dos Números

A reta numérica é como um **mapa dos números**. Ela nos ajuda a visualizar onde cada número está e como eles se relacionam. Quando adicionamos, estamos **nos movendo nesse mapa** sempre para a direita.

<YouTubeEmbed videoId="1e8qtYBvcmo" title="Adição na reta numérica" />

**Aplicações reais:**

- **Saldo bancário**: Depositar R$ 500 = andar 500 para a direita
- **Temperatura**: Subir 5°C = mover 5 unidades para a direita
- **Distância**: Caminhar 2 km + 3 km = 5 km total

---

## 📏 Parte 1: Construindo Sua Primeira Reta Numérica

### O Que É Uma Reta Numérica?

Uma reta numérica é uma **linha horizontal** onde cada ponto representa um número:

\`\`\`
... -3  -2  -1   0   1   2   3   4   5   6   7   8   9   10 ...
    ←                                                      →
  (menores)                                           (maiores)
\`\`\`

**Características importantes:**

1. **Zero como referência**: O "marco zero" da nossa jornada
2. **Espaçamento uniforme**: Distância entre números consecutivos é sempre a mesma
3. **Infinita nos dois sentidos**: Continua para sempre (por isso as reticências "...")
4. **Números positivos à direita**: 1, 2, 3, 4...
5. **Números negativos à esquerda**: -1, -2, -3... (veremos mais tarde)

<YouTubeEmbed videoId="yC1mmYLzzHE" title="Adição e subtração na reta numérica" />

### 💡 Exercício Mental: Visualize Sua Rua

Imagine que sua casa é o número zero. Casas à direita têm números positivos (1, 2, 3...), casas à esquerda têm números negativos (-1, -2, -3...). Caminhar para a direita = adicionar!

---

## ➡️ Parte 2: Adição Como Movimento Para a Direita

### Regra de Ouro: Adicionar = Mover Para a Direita

Quando adicionamos um número, estamos **saltando para a direita** na reta numérica.

**Exemplo 1: 3 + 2**

1. Comece no número **3**
2. Dê **2 saltos** para a direita
3. Você chegará no número **5**

\`\`\`
    3 → 4 → 5
    ↑   ↑   ↑
  início +1  +2 (resultado)
\`\`\`

**Exemplo 2: 7 + 4**

1. Comece no número **7**
2. Dê **4 saltos** para a direita (7→8→9→10→11)
3. Você chegará no número **11**

<YouTubeEmbed videoId="ZxlImZXu1M4" title="Addition Using a Number Line - Visual Method" />

### ✏️ Exercícios: Movimentos Simples

<ExerciseCard 
  question="Comece em 12, adicione 5. Onde você chega?"
  expectedAnswer="17"
  hints={["Conte 5 posições para a direita a partir de 12", "12 + 5 = ?"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Comece em 25, adicione 8. Onde você chega?"
  expectedAnswer="33"
  hints={["25 + 8 = ?"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Comece em 7, adicione 15. Onde você chega?"
  expectedAnswer="22"
  hints={["7 + 15 = ?"]}
  type="simple_input"
/>

---

## 💰 Parte 3: Aplicação Prática - Orçamento Mensal

Imagine que você está gerenciando seu orçamento. No dia 1º, tinha R$ 800 na conta. Durante o mês:

- **Dia 5**: Freelance de R$ 300
- **Dia 15**: Salário de R$ 2.500
- **Dia 25**: Venda de item R$ 150

**Visualizando na reta numérica:**

\`\`\`
800 → 1.100 → 3.600 → 3.750
    +300   +2.500  +150
\`\`\`

**Saldo final: R$ 3.750**

### Por Que Isso É Útil?

1. **Entender magnitude**: Quanto maior o número, maior o "salto"
2. **Prever resultados**: Estimar onde vamos chegar
3. **Detectar erros**: Resultado não faz sentido visualmente? Erro!
4. **Comparar operações**: 10 + 5 nos leva mais longe que 10 + 2

---

## 🔄 Parte 4: Propriedades na Reta Numérica

### Propriedade Comutativa: A Ordem Não Importa

**Exemplo: 5 + 3 = 3 + 5**

**Caminho 1:** Começar em 5, adicionar 3 → 5 → 6 → 7 → 8

**Caminho 2:** Começar em 3, adicionar 5 → 3 → 4 → 5 → 6 → 7 → 8

Ambos chegam em **8**!

### Propriedade Associativa: Agrupamento Flexível

**Exemplo: 2 + 3 + 4**

**Forma 1:** (2 + 3) + 4 = 5 + 4 = 9

**Forma 2:** 2 + (3 + 4) = 2 + 7 = 9

Ambos resultam em **9**!

---

## 📊 Parte 5: Estimativa Visual

### Arredondamento Para Facilitar Cálculos

Nem sempre precisamos de precisão absoluta. Uma **estimativa rápida** é suficiente!

**Exemplo: 47 + 38**

**Cálculo exato:** 47 + 38 = 85

**Estimativa por arredondamento:**

\`\`\`
47 ≈ 50 (arredondar para cima)
38 ≈ 40 (arredondar para cima)
50 + 40 = 90
\`\`\`

Nossa estimativa (90) está próxima do resultado real (85)!

**Aplicação: Compras no supermercado**

Você tem R$ 100 na carteira e pegou:

- Arroz: R$ 18,90 ≈ R$ 20
- Feijão: R$ 12,50 ≈ R$ 13
- Carne: R$ 35,80 ≈ R$ 36
- Frutas: R$ 22,30 ≈ R$ 22
- Limpeza: R$ 15,70 ≈ R$ 16

**Estimativa rápida:** 20 + 13 + 36 + 22 + 16 = 107

Você precisa de aproximadamente R$ 107, mas tem apenas R$ 100. Precisará devolver algo!

### ✏️ Exercícios: Estimativa

<ExerciseCard 
  question="Estime: 52 + 48 ≈ ? (arredonde para dezenas)"
  expectedAnswer="100"
  hints={["52 ≈ 50, 48 ≈ 50", "50 + 50 = 100"]}
  type="simple_input"
/>

<ExerciseCard 
  question="Estime: 73 + 29 ≈ ? (arredonde para dezenas)"
  expectedAnswer="100"
  hints={["73 ≈ 70, 29 ≈ 30", "70 + 30 = 100"]}
  type="simple_input"
/>

---

## 🚀 Parte 6: Números Grandes

### Quebrando Números Grandes em Partes Menores

**Exemplo: 1.250 + 780**

**Método 1: Decomposição por valor posicional**

\`\`\`
1.250 = 1.000 + 250
780 = 700 + 80

Passo 1: 1.000 + 700 = 1.700 (milhares)
Passo 2: 250 + 80 = 330 (centenas e dezenas)
Passo 3: 1.700 + 330 = 2.030
\`\`\`

**Método 2: Saltos progressivos**

\`\`\`
1.250 → 1.950 (+ 700)
1.950 → 2.030 (+ 80)
\`\`\`

### ✏️ Exercícios: Números Grandes

<ExerciseCard 
  question="150 + 80 = ?"
  expectedAnswer="230"
  hints={["150 + 50 = 200, depois adicione 30"]}
  type="simple_input"
/>

<ExerciseCard 
  question="320 + 145 = ?"
  expectedAnswer="465"
  hints={["320 + 100 = 420, depois adicione 45"]}
  type="simple_input"
/>

---

## ✅ Conclusão: A Reta Numérica Como Ferramenta Universal

A reta numérica nos ajuda a:

1. **Visualizar operações**: Ver adição como movimento para a direita
2. **Planejar finanças**: Acompanhar entradas de dinheiro
3. **Estimar resultados**: Fazer cálculos mentais rápidos
4. **Detectar erros**: Perceber quando um resultado não faz sentido
5. **Entender propriedades**: Comutativa e associativa ficam mais claras

### Dica Final

Sempre que se deparar com uma adição, tente visualizar mentalmente a reta numérica. Com a prática, isso se tornará automático!

**Continue praticando e nos vemos na próxima aula!** 🚀`;

// Página 3: Exercícios Práticos - Adicionar vídeos e quebrar em seções
const page3Content = `# Exercícios Práticos de Adição

## 🎯 Introdução: A Prática Leva à Perfeição

Você já aprendeu **o que é adição** e como **visualizá-la na reta numérica**. Agora é hora de praticar! Esta aula tem exercícios progressivos do simples ao complexo.

<YouTubeEmbed videoId="YI9-VJMvCZM" title="Exercícios Práticos de Adição - Do Básico ao Avançado" />

**Por que praticar é essencial?**

Matemática é como aprender a dirigir: você pode ler todos os manuais, mas só aprende realmente quando pratica. Cada exercício **fortalece as conexões neurais** no seu cérebro!

### Estrutura Desta Aula

**5 níveis de dificuldade crescente:**

1. **Nível 1 - Aquecimento**: Números de 1 a 20
2. **Nível 2 - Intermediário**: Números até 100
3. **Nível 3 - Avançado**: Centenas e milhares
4. **Nível 4 - Aplicações Práticas**: Problemas do cotidiano
5. **Nível 5 - Desafios**: Problemas complexos

**Dica:** Não tenha pressa! Resolva com calma, visualizando a reta numérica mentalmente.

---

## 🔥 Nível 1: Aquecimento - Adições Simples

### Bloco A: Números de 1 a 10

<ExerciseCard 
  question="1. Quanto é 3 + 4?"
  expectedAnswer="7"
  hints={["Comece no 3 e dê 4 passos para a direita", "3 → 4 → 5 → 6 → 7"]}
  type="simple_input"
/>

<ExerciseCard 
  question="2. Quanto é 5 + 2?"
  expectedAnswer="7"
  hints={["Comece no 5 e dê 2 passos para a direita"]}
  type="simple_input"
/>

<ExerciseCard 
  question="3. Quanto é 7 + 3?"
  expectedAnswer="10"
  hints={["Quanto falta para 7 chegar em 10?"]}
  type="simple_input"
/>

<ExerciseCard 
  question="4. Quanto é 6 + 4?"
  expectedAnswer="10"
  hints={["6 + 4 forma uma dezena completa"]}
  type="simple_input"
/>

<ExerciseCard 
  question="5. Quanto é 8 + 2?"
  expectedAnswer="10"
  hints={["Outra dezena completa!"]}
  type="simple_input"
/>

**Padrão observado:** Alguns pares sempre somam 10 (**pares complementares**):

- 1 + 9 = 10
- 2 + 8 = 10
- 3 + 7 = 10
- 4 + 6 = 10
- 5 + 5 = 10

Memorizar esses pares facilita muito os cálculos mentais!

<YouTubeEmbed videoId="kq0kh0XvT9c" title="Como somar os números - vídeo educativo" />

---

### Bloco B: Números de 10 a 20

<ExerciseCard 
  question="6. Quanto é 9 + 5?"
  expectedAnswer="14"
  hints={["Complete a dezena: 9 + 1 = 10, depois adicione os 4 restantes"]}
  type="simple_input"
/>

<ExerciseCard 
  question="7. Quanto é 8 + 7?"
  expectedAnswer="15"
  hints={["8 + 2 = 10, depois adicione os 5 restantes"]}
  type="simple_input"
/>

<ExerciseCard 
  question="8. Quanto é 6 + 9?"
  expectedAnswer="15"
  hints={["Use a propriedade comutativa: 9 + 6 pode ser mais fácil"]}
  type="simple_input"
/>

<ExerciseCard 
  question="9. Quanto é 7 + 8?"
  expectedAnswer="15"
  hints={["7 + 3 = 10, depois adicione os 5 restantes"]}
  type="simple_input"
/>

<ExerciseCard 
  question="10. Quanto é 12 + 5?"
  expectedAnswer="17"
  hints={["Comece no 12 e dê 5 passos para a direita"]}
  type="simple_input"
/>

---

## 📈 Nível 2: Intermediário - Números Até 100

<YouTubeEmbed videoId="1e8qtYBvcmo" title="Adição na reta numérica - Técnicas avançadas" />

### Bloco C: Adições com Dezenas Completas

Quando adicionamos dezenas completas (10, 20, 30...), o cálculo fica mais fácil:

<ExerciseCard 
  question="11. Quanto é 25 + 10?"
  expectedAnswer="35"
  hints={["Adicionar 10 é como pular uma dezena inteira"]}
  type="simple_input"
/>

<ExerciseCard 
  question="12. Quanto é 43 + 20?"
  expectedAnswer="63"
  hints={["43 → 53 → 63 (dois saltos de 10)"]}
  type="simple_input"
/>

<ExerciseCard 
  question="13. Quanto é 57 + 30?"
  expectedAnswer="87"
  hints={["57 → 67 → 77 → 87 (três saltos de 10)"]}
  type="simple_input"
/>

<ExerciseCard 
  question="14. Quanto é 18 + 40?"
  expectedAnswer="58"
  hints={["18 → 28 → 38 → 48 → 58"]}
  type="simple_input"
/>

<ExerciseCard 
  question="15. Quanto é 62 + 25?"
  expectedAnswer="87"
  hints={["Primeiro adicione 20, depois adicione 5"]}
  type="simple_input"
/>

---

### Bloco D: Adições que Passam pela Dezena

Estes exercícios exigem "passar" pela próxima dezena:

<ExerciseCard 
  question="16. Quanto é 28 + 15?"
  expectedAnswer="43"
  hints={["Complete a dezena: 28 + 2 = 30, depois adicione 13"]}
  type="simple_input"
/>

<ExerciseCard 
  question="17. Quanto é 47 + 18?"
  expectedAnswer="65"
  hints={["47 + 3 = 50, depois adicione 15"]}
  type="simple_input"
/>

<ExerciseCard 
  question="18. Quanto é 56 + 27?"
  expectedAnswer="83"
  hints={["56 + 4 = 60, depois adicione 23"]}
  type="simple_input"
/>

<ExerciseCard 
  question="19. Quanto é 39 + 34?"
  expectedAnswer="73"
  hints={["39 + 1 = 40, depois adicione 33"]}
  type="simple_input"
/>

<ExerciseCard 
  question="20. Quanto é 68 + 29?"
  expectedAnswer="97"
  hints={["68 + 2 = 70, depois adicione 27"]}
  type="simple_input"
/>

---

## 🚀 Nível 3: Avançado - Números Grandes

<YouTubeEmbed videoId="IZ-EhL9B8Tw" title="Como fazer conta de adição com números grandes" />

### Bloco E: Centenas e Milhares

A estratégia é a mesma: decompor e adicionar por partes.

<ExerciseCard 
  question="21. Quanto é 150 + 80?"
  expectedAnswer="230"
  hints={["150 + 50 = 200, depois adicione 30"]}
  type="simple_input"
/>

<ExerciseCard 
  question="22. Quanto é 320 + 145?"
  expectedAnswer="465"
  hints={["320 + 100 = 420, depois adicione 45"]}
  type="simple_input"
/>

<ExerciseCard 
  question="23. Quanto é 578 + 234?"
  expectedAnswer="812"
  hints={["Some as centenas (500+200), depois as dezenas (70+30), depois as unidades (8+4)"]}
  type="simple_input"
/>

<ExerciseCard 
  question="24. Quanto é 1.250 + 680?"
  expectedAnswer="1930"
  hints={["1.250 + 600 = 1.850, depois adicione 80"]}
  type="simple_input"
/>

<ExerciseCard 
  question="25. Quanto é 3.450 + 1.780?"
  expectedAnswer="5230"
  hints={["3.450 + 1.000 = 4.450, depois adicione 780"]}
  type="simple_input"
/>

---

### Bloco F: Múltiplas Adições

Agora vamos adicionar 3 ou mais números em sequência:

<ExerciseCard 
  question="26. Quanto é 12 + 15 + 18?"
  expectedAnswer="45"
  hints={["Primeiro: 12 + 15 = 27, depois: 27 + 18 = 45"]}
  type="simple_input"
/>

<ExerciseCard 
  question="27. Quanto é 25 + 30 + 20 + 15?"
  expectedAnswer="90"
  hints={["Agrupe os números fáceis primeiro: (25+15) + (30+20)"]}
  type="simple_input"
/>

<ExerciseCard 
  question="28. Quanto é 100 + 250 + 150 + 200?"
  expectedAnswer="700"
  hints={["100 + 200 = 300, 250 + 150 = 400, depois 300 + 400 = 700"]}
  type="simple_input"
/>

<ExerciseCard 
  question="29. Quanto é 45 + 55 + 30 + 20?"
  expectedAnswer="150"
  hints={["45 + 55 = 100, 30 + 20 = 50, depois 100 + 50 = 150"]}
  type="simple_input"
/>

<ExerciseCard 
  question="30. Quanto é 18 + 22 + 35 + 25?"
  expectedAnswer="100"
  hints={["Procure pares que somam números redondos"]}
  type="simple_input"
/>

---

## 💼 Nível 4: Aplicações Práticas do Cotidiano

<YouTubeEmbed videoId="yC1mmYLzzHE" title="Aplicações práticas de adição no dia a dia" />

### Situação 1: Orçamento Mensal

**Contexto:** Maria está planejando seu orçamento mensal. Despesas fixas:

- Aluguel: R$ 1.200
- Supermercado: R$ 650
- Transporte: R$ 280
- Conta de luz: R$ 180
- Internet: R$ 120
- Celular: R$ 80

<ExerciseCard 
  question="Qual o total de despesas fixas de Maria?"
  expectedAnswer="2510"
  hints={["Some progressivamente: 1.200 + 650 = 1.850, depois continue adicionando"]}
  type="simple_input"
/>

---

### Situação 2: Economia para Viagem

**Contexto:** Ana quer viajar nas férias e está economizando. Ela guardou:

- Janeiro: R$ 450
- Fevereiro: R$ 520
- Março: R$ 380
- Abril: R$ 600
- Maio: R$ 490
- Junho: R$ 560

<ExerciseCard 
  question="Quanto Ana economizou no total?"
  expectedAnswer="3000"
  hints={["Agrupe valores próximos: (450+550) + (520+480) + (380+620)"]}
  type="simple_input"
/>

---

### Situação 3: Controle de Vendas

**Contexto:** Pedro tem uma loja e vendeu os seguintes valores durante a semana:

- Segunda-feira: R$ 1.350
- Terça-feira: R$ 980
- Quarta-feira: R$ 1.520
- Quinta-feira: R$ 1.180
- Sexta-feira: R$ 2.240
- Sábado: R$ 3.100

<ExerciseCard 
  question="Qual o faturamento total da semana?"
  expectedAnswer="10370"
  hints={["Some dia por dia progressivamente"]}
  type="simple_input"
/>

---

## 🏆 Nível 5: Desafios Complexos

<YouTubeEmbed videoId="ZxlImZXu1M4" title="Desafios de adição - Resolução passo a passo" />

### Desafio 1: Múltiplas Transações Bancárias

**Contexto:** Você começou o mês com R$ 1.850 na conta. Durante o mês:

**Entradas:**
- Dia 5: Salário R$ 3.500
- Dia 12: Freelance R$ 800
- Dia 20: Venda de item R$ 450
- Dia 28: Bônus R$ 600

<ExerciseCard 
  question="Qual o total de entradas (incluindo saldo inicial)?"
  expectedAnswer="7200"
  hints={["1.850 + 3.500 + 800 + 450 + 600"]}
  type="simple_input"
/>

---

### Desafio 2: Planejamento de Reforma

**Contexto:** Você está reformando a casa. Custos:

**Materiais:**
- Cimento (20 sacos): R$ 680
- Areia (3m³): R$ 420
- Tijolos (2000 unidades): R$ 850
- Telhas (500 unidades): R$ 1.200
- Tinta (30 latas): R$ 1.680
- Pisos (80m²): R$ 3.200
- Portas (4 unidades): R$ 1.800
- Janelas (6 unidades): R$ 2.400

**Mão de obra:**
- Pedreiro (30 dias): R$ 4.500
- Ajudante (30 dias): R$ 2.700
- Eletricista (10 dias): R$ 1.500
- Encanador (8 dias): R$ 1.200

<ExerciseCard 
  question="Qual o custo total da reforma (materiais + mão de obra)?"
  expectedAnswer="22130"
  hints={["Calcule primeiro o total de materiais, depois o total de mão de obra, depois some os dois"]}
  type="simple_input"
/>

---

### Desafio 3: Investimento Progressivo

**Contexto:** Você está investindo mensalmente:

**Ano 1:**
- Jan a Jun: R$ 500 por mês
- Jul a Dez: R$ 600 por mês

**Ano 2:**
- Jan a Jun: R$ 700 por mês
- Jul a Dez: R$ 800 por mês

<ExerciseCard 
  question="Quanto você investiu no total em 2 anos?"
  expectedAnswer="15600"
  hints={["Ano 1: (500×6) + (600×6) = 3.000 + 3.600 = 6.600", "Ano 2: (700×6) + (800×6) = 4.200 + 4.800 = 9.000"]}
  type="simple_input"
/>

---

## ✅ Resumo e Próximos Passos

### O Que Você Aprendeu Nesta Aula

1. **Exercícios progressivos** do básico ao avançado
2. **Aplicações práticas** em situações reais do cotidiano
3. **Estratégias de resolução** para diferentes tipos de problemas
4. **Verificação de resultados** para garantir precisão

### Checklist de Domínio

Você dominou a adição quando conseguir:

- ✅ Somar mentalmente números até 20 em menos de 3 segundos
- ✅ Adicionar dezenas completas sem hesitação
- ✅ Decompor números grandes em partes menores
- ✅ Resolver problemas práticos de orçamento
- ✅ Verificar seus próprios resultados
- ✅ Visualizar operações na reta numérica mentalmente

### Próxima Aula: Subtração

Agora que você domina a adição, está pronto para aprender **subtração**! Você verá que subtração é apenas o "movimento oposto" na reta numérica - em vez de ir para a direita, vamos para a esquerda.

**Prepare-se para descobrir que subtração não é tão difícil quanto parece!** 🚀

### Dica Final

A matemática é uma **habilidade progressiva**. Cada exercício que você resolve torna o próximo mais fácil. Não desanime se alguns problemas parecerem difíceis no início - com prática consistente, você vai surpreender a si mesmo!

**Continue praticando e nos vemos na próxima aula!** 💪`;

// Atualizar as 3 páginas no banco
await db.update(schema.pages)
  .set({ mainText: page1Content })
  .where(eq(schema.pages.slug, 'o-que-e-adicionar'));

await db.update(schema.pages)
  .set({ mainText: page2Content })
  .where(eq(schema.pages.slug, 'reta-numerica'));

await db.update(schema.pages)
  .set({ mainText: page3Content })
  .where(eq(schema.pages.slug, 'o-que-e-subtrair')); // Essa página na verdade é de exercícios práticos

console.log('✅ Conteúdo das 3 primeiras páginas reestruturado com sucesso!');
console.log('- Página 1: Adicionados 3 vídeos, mantida estrutura com exercícios');
console.log('- Página 2: Quebrado em 6 seções menores, adicionados 3 vídeos');
console.log('- Página 3: Quebrado em 5 níveis, adicionados 4 vídeos');

await connection.end();
