# Módulo 14: Análise Combinatória Básica

## Aula 1: Princípio Fundamental da Contagem (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai aprender o **Princípio Fundamental da Contagem (PFC)**, também conhecido como Princípio Multiplicativo. Este é o conceito base de toda a Análise Combinatória e permite resolver problemas de contagem de forma sistemática.

### 📚 O que é o Princípio Fundamental da Contagem?

> **Definição:** Se uma decisão pode ser tomada de **m** maneiras diferentes, e outra decisão pode ser tomada de **n** maneiras diferentes, então o número total de maneiras de tomar as duas decisões é **m × n**.

Este princípio pode ser estendido para qualquer número de decisões:

> Se temos k decisões a tomar, com n₁, n₂, ..., nₖ opções respectivamente, o total de possibilidades é **n₁ × n₂ × ... × nₖ**.

### 🍕 Exemplo Clássico: Cardápio

Um restaurante oferece:
- 3 opções de entrada (salada, sopa, bruschetta)
- 4 opções de prato principal (frango, peixe, carne, massa)
- 2 opções de sobremesa (pudim, sorvete)

Quantas refeições diferentes são possíveis?

**Solução:**
3 × 4 × 2 = **24 refeições diferentes**

### 👔 Exemplo: Combinações de Roupa

João tem:
- 5 camisas
- 4 calças
- 3 pares de sapatos

De quantas maneiras ele pode se vestir?

**Solução:**
5 × 4 × 3 = **60 maneiras**

### 🔢 Exemplo: Placas de Carro

As placas de carro no Brasil têm o formato ABC-1234 (3 letras + 4 números). Quantas placas diferentes são possíveis?

**Solução:**
- Letras: 26 opções cada (A-Z)
- Números: 10 opções cada (0-9)

Total = 26 × 26 × 26 × 10 × 10 × 10 × 10
Total = 26³ × 10⁴
Total = 17.576 × 10.000
Total = **175.760.000 placas**

### 🔐 Exemplo: Senhas

Uma senha tem 4 dígitos (0-9). Quantas senhas são possíveis?

**Caso 1:** Dígitos podem se repetir
10 × 10 × 10 × 10 = 10⁴ = **10.000 senhas**

**Caso 2:** Dígitos não podem se repetir
10 × 9 × 8 × 7 = **5.040 senhas**

### 📊 Diagrama de Árvore

O diagrama de árvore é uma forma visual de representar todas as possibilidades:

**Exemplo:** Lançar uma moeda 3 vezes

```
         Cara ─── Cara ─── Cara (CCC)
        /    \─── Coroa (CCK)
       /      
Início ─ Cara ─── Coroa ─── Cara (CKC)
       \    \─── Coroa (CKK)
        \
         Coroa ─── Cara ─── Cara (KCC)
              \─── Coroa (KCK)
               \
                Coroa ─── Cara (KKC)
                     \─── Coroa (KKK)
```

Total: 2 × 2 × 2 = **8 resultados**

### 🎲 Exemplo: Dados

Ao lançar dois dados, quantos resultados diferentes são possíveis?

**Solução:**
6 × 6 = **36 resultados**

Se quisermos que a soma seja 7:
(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = **6 resultados**

Probabilidade de soma 7: 6/36 = 1/6 ≈ 16,67%

### 🌍 Aplicações Práticas

**1. Códigos de Produto:**
Um código de barras com 12 dígitos pode representar 10¹² = 1 trilhão de produtos diferentes.

**2. Endereços IP (IPv4):**
Um endereço IP tem 4 números de 0 a 255:
256⁴ = 4.294.967.296 endereços possíveis

**3. Números de Telefone:**
Celulares no Brasil: (DDD) 9XXXX-XXXX
- DDD: ~67 opções
- 9 fixo
- 8 dígitos variáveis: 10⁸ opções
Total por DDD: 100.000.000 números

### ✏️ Exercícios Práticos

**Exercício 1:** Uma lanchonete oferece 4 tipos de pão, 5 recheios e 3 bebidas. Quantos lanches diferentes (pão + recheio + bebida) são possíveis?

<details>
<summary>Ver resposta</summary>

4 × 5 × 3 = **60 lanches**

</details>

**Exercício 2:** Quantos números de 3 algarismos distintos podem ser formados com os dígitos 1, 2, 3, 4, 5?

<details>
<summary>Ver resposta</summary>

- 1º algarismo: 5 opções
- 2º algarismo: 4 opções (não pode repetir)
- 3º algarismo: 3 opções

5 × 4 × 3 = **60 números**

</details>

**Exercício 3:** Uma prova tem 10 questões de verdadeiro ou falso. De quantas maneiras diferentes ela pode ser respondida?

<details>
<summary>Ver resposta</summary>

2¹⁰ = **1.024 maneiras**

</details>

### 🎯 Resumo da Aula

- PFC: Se há m opções para uma decisão e n para outra, há m × n combinações
- Estende-se para qualquer número de decisões: n₁ × n₂ × ... × nₖ
- Diagrama de árvore ajuda a visualizar todas as possibilidades
- Atenção: verificar se há repetição permitida ou não

---

## Aula 2: Permutações (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai aprender sobre **permutações**, que são arranjos ordenados de todos os elementos de um conjunto. Permutações respondem à pergunta: "De quantas maneiras posso ordenar n objetos?"

### 📚 O que é uma Permutação?

> **Definição:** Uma permutação de n elementos é uma ordenação (arranjo) de todos esses n elementos.

**Exemplo:** As permutações das letras A, B, C são:
ABC, ACB, BAC, BCA, CAB, CBA = **6 permutações**

### 📐 Fórmula da Permutação Simples

O número de permutações de n elementos distintos é:

> **Pₙ = n!** (n fatorial)

Onde n! = n × (n-1) × (n-2) × ... × 2 × 1

**Valores de fatorial:**
| n | n! |
|---|-----|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 6 |
| 4 | 24 |
| 5 | 120 |
| 6 | 720 |
| 7 | 5.040 |
| 8 | 40.320 |
| 9 | 362.880 |
| 10 | 3.628.800 |

### 🔢 Por que n!?

Pensando no PFC:
- 1ª posição: n opções
- 2ª posição: n-1 opções (uma já foi usada)
- 3ª posição: n-2 opções
- ...
- Última posição: 1 opção

Total: n × (n-1) × (n-2) × ... × 1 = n!

### 👥 Exemplo: Fila de Pessoas

De quantas maneiras 5 pessoas podem formar uma fila?

**Solução:**
P₅ = 5! = 5 × 4 × 3 × 2 × 1 = **120 maneiras**

### 📚 Exemplo: Livros na Estante

De quantas maneiras 8 livros diferentes podem ser organizados em uma estante?

**Solução:**
P₈ = 8! = 40.320 maneiras

### 🔄 Permutação com Repetição

Quando há elementos repetidos, usamos a fórmula:

> **Pₙ^(a,b,c,...) = n! / (a! × b! × c! × ...)**

Onde a, b, c, ... são as quantidades de cada elemento repetido.

**Exemplo:** Quantos anagramas tem a palavra BANANA?

- Total de letras: 6
- A aparece 3 vezes
- N aparece 2 vezes
- B aparece 1 vez

P₆^(3,2,1) = 6! / (3! × 2! × 1!)
= 720 / (6 × 2 × 1)
= 720 / 12
= **60 anagramas**

**Exemplo 2:** Quantos anagramas tem a palavra MISSISSIPPI?

- Total: 11 letras
- I: 4 vezes
- S: 4 vezes
- P: 2 vezes
- M: 1 vez

P₁₁^(4,4,2,1) = 11! / (4! × 4! × 2! × 1!)
= 39.916.800 / (24 × 24 × 2 × 1)
= 39.916.800 / 1.152
= **34.650 anagramas**

### 🔵 Permutação Circular

Quando os elementos são dispostos em círculo, uma rotação não gera uma nova permutação:

> **PCₙ = (n-1)!**

**Exemplo:** De quantas maneiras 6 pessoas podem sentar em uma mesa redonda?

PC₆ = (6-1)! = 5! = **120 maneiras**

### 🌍 Aplicações Práticas

**1. Senhas sem repetição:**
Senha de 4 dígitos distintos: 10 × 9 × 8 × 7 = 5.040

**2. Escalação de time:**
Ordenar 11 jogadores em posições específicas: 11! = 39.916.800

**3. Código genético:**
Sequências de DNA com 4 bases (A, T, C, G)

### ✏️ Exercícios Práticos

**Exercício 1:** Quantos anagramas tem a palavra ESCOLA?

<details>
<summary>Ver resposta</summary>

6 letras distintas:
P₆ = 6! = **720 anagramas**

</details>

**Exercício 2:** Quantos anagramas tem a palavra ARARA?

<details>
<summary>Ver resposta</summary>

5 letras: A (3 vezes), R (2 vezes)

P₅^(3,2) = 5! / (3! × 2!)
= 120 / (6 × 2)
= 120 / 12
= **10 anagramas**

</details>

**Exercício 3:** De quantas maneiras 8 pessoas podem sentar em uma mesa circular?

<details>
<summary>Ver resposta</summary>

PC₈ = (8-1)! = 7! = **5.040 maneiras**

</details>

### 🎯 Resumo da Aula

- Permutação simples: Pₙ = n!
- Permutação com repetição: Pₙ^(a,b,...) = n! / (a! × b! × ...)
- Permutação circular: PCₙ = (n-1)!
- Fatorial cresce muito rápido!

---

## Aula 3: Arranjos (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula, você vai aprender sobre **arranjos**, que são seleções ordenadas de parte dos elementos de um conjunto. Arranjos respondem à pergunta: "De quantas maneiras posso escolher e ordenar k elementos de um conjunto de n elementos?"

### 📚 O que é um Arranjo?

> **Definição:** Um arranjo de n elementos tomados k a k (k ≤ n) é uma seleção ordenada de k elementos dentre n disponíveis.

**Diferença entre Permutação e Arranjo:**
- Permutação: ordena TODOS os elementos
- Arranjo: ordena PARTE dos elementos

### 📐 Fórmula do Arranjo

> **Aₙ,ₖ = n! / (n-k)!**

Ou, equivalentemente:

> **Aₙ,ₖ = n × (n-1) × (n-2) × ... × (n-k+1)** (k fatores)

### 🔢 Exemplos de Cálculo

**Exemplo 1:** A₅,₃ (arranjo de 5 elementos tomados 3 a 3)

A₅,₃ = 5! / (5-3)!
= 5! / 2!
= 120 / 2
= **60**

Ou: 5 × 4 × 3 = **60**

**Exemplo 2:** A₁₀,₂ (arranjo de 10 elementos tomados 2 a 2)

A₁₀,₂ = 10! / 8!
= 10 × 9
= **90**

### 🏆 Exemplo: Pódio

Em uma corrida com 8 atletas, de quantas maneiras o pódio (1º, 2º, 3º) pode ser formado?

**Solução:**
A₈,₃ = 8 × 7 × 6 = **336 maneiras**

### 🔢 Exemplo: Números de Telefone

Quantos números de 4 algarismos distintos podem ser formados com os dígitos 1, 2, 3, 4, 5, 6, 7?

**Solução:**
A₇,₄ = 7 × 6 × 5 × 4 = **840 números**

### 🎰 Exemplo: Código de Cofre

Um cofre tem um código de 3 dígitos distintos (0-9). Quantos códigos são possíveis?

**Solução:**
A₁₀,₃ = 10 × 9 × 8 = **720 códigos**

### 📊 Comparação: Permutação vs Arranjo

| | Permutação | Arranjo |
|---|------------|---------|
| Elementos | Todos (n) | Parte (k de n) |
| Fórmula | Pₙ = n! | Aₙ,ₖ = n!/(n-k)! |
| Exemplo | Ordenar 5 livros | Escolher e ordenar 3 de 5 livros |
| Resultado | P₅ = 120 | A₅,₃ = 60 |

**Observação:** Quando k = n, o arranjo é igual à permutação:
Aₙ,ₙ = n! / (n-n)! = n! / 0! = n! / 1 = n! = Pₙ

### 🌍 Aplicações Práticas

**1. Eleições:**
Escolher presidente, vice e secretário de um grupo de 10 pessoas:
A₁₀,₃ = 10 × 9 × 8 = 720 maneiras

**2. Senhas:**
Senha de 4 letras distintas (26 letras):
A₂₆,₄ = 26 × 25 × 24 × 23 = 358.800 senhas

**3. Corridas:**
Prever os 3 primeiros colocados em uma corrida de 12 cavalos:
A₁₂,₃ = 12 × 11 × 10 = 1.320 possibilidades

### ✏️ Exercícios Práticos

**Exercício 1:** Calcule A₆,₂.

<details>
<summary>Ver resposta</summary>

A₆,₂ = 6 × 5 = **30**

</details>

**Exercício 2:** De quantas maneiras 3 prêmios diferentes podem ser distribuídos entre 8 pessoas (uma pessoa pode ganhar no máximo um prêmio)?

<details>
<summary>Ver resposta</summary>

A₈,₃ = 8 × 7 × 6 = **336 maneiras**

</details>

**Exercício 3:** Quantos números de 5 algarismos distintos podem ser formados com 0, 1, 2, 3, 4, 5, 6, 7, 8, 9?

<details>
<summary>Ver resposta</summary>

O primeiro algarismo não pode ser 0 (senão não seria de 5 algarismos).

- 1º algarismo: 9 opções (1-9)
- Demais: arranjo dos 9 restantes tomados 4 a 4

9 × A₉,₄ = 9 × 9 × 8 × 7 × 6 = 9 × 3024 = **27.216 números**

</details>

### 🎯 Resumo da Aula

- Arranjo: seleção ordenada de k elementos de n disponíveis
- Fórmula: Aₙ,ₖ = n!/(n-k)! = n × (n-1) × ... × (n-k+1)
- Quando k = n, arranjo = permutação
- A ordem importa nos arranjos!

---

## Aula 4: Combinações (~50 min, ~3.500 palavras)

### 🎯 Objetivos da Aula

Nesta aula final do módulo, você vai aprender sobre **combinações**, que são seleções NÃO ordenadas de parte dos elementos de um conjunto. Combinações respondem à pergunta: "De quantas maneiras posso escolher k elementos de um conjunto de n elementos, sem importar a ordem?"

### 📚 O que é uma Combinação?

> **Definição:** Uma combinação de n elementos tomados k a k é uma seleção de k elementos dentre n disponíveis, onde a ordem NÃO importa.

**Diferença entre Arranjo e Combinação:**
- Arranjo: a ordem IMPORTA (ABC ≠ BAC)
- Combinação: a ordem NÃO importa (ABC = BAC = CAB = ...)

### 📐 Fórmula da Combinação

> **Cₙ,ₖ = n! / [k! × (n-k)!]**

Também escrita como:

> **Cₙ,ₖ = Aₙ,ₖ / k!**

Ou usando a notação de binomial:

> **(n k) = n! / [k! × (n-k)!]**

### 🔢 Relação entre Arranjo e Combinação

Como a combinação não considera a ordem, dividimos o arranjo pelo número de ordenações possíveis (k!):

Cₙ,ₖ = Aₙ,ₖ / k!

**Exemplo:** Escolher 3 pessoas de um grupo de 5

Arranjo (com ordem): A₅,₃ = 60
Cada grupo de 3 pessoas aparece 3! = 6 vezes (todas as ordenações)
Combinação: C₅,₃ = 60 / 6 = **10 grupos**

### 🔢 Exemplos de Cálculo

**Exemplo 1:** C₅,₃

C₅,₃ = 5! / (3! × 2!)
= 120 / (6 × 2)
= 120 / 12
= **10**

**Exemplo 2:** C₁₀,₄

C₁₀,₄ = 10! / (4! × 6!)
= 10 × 9 × 8 × 7 / (4 × 3 × 2 × 1)
= 5040 / 24
= **210**

### 🎲 Exemplo: Loteria

Na Mega-Sena, você escolhe 6 números de 1 a 60. Quantas apostas diferentes são possíveis?

**Solução:**
C₆₀,₆ = 60! / (6! × 54!)
= 60 × 59 × 58 × 57 × 56 × 55 / (6 × 5 × 4 × 3 × 2 × 1)
= 36.045.979.200 / 720
= **50.063.860 apostas**

### 👥 Exemplo: Comissão

De quantas maneiras podemos formar uma comissão de 4 pessoas a partir de um grupo de 10?

**Solução:**
C₁₀,₄ = 10! / (4! × 6!)
= **210 maneiras**

### 🃏 Exemplo: Cartas de Baralho

De quantas maneiras podemos escolher 5 cartas de um baralho de 52?

**Solução:**
C₅₂,₅ = 52! / (5! × 47!)
= 52 × 51 × 50 × 49 × 48 / 120
= **2.598.960 mãos**

### 📊 Propriedades das Combinações

**1. Simetria:**
Cₙ,ₖ = Cₙ,ₙ₋ₖ

Exemplo: C₁₀,₃ = C₁₀,₇ = 120

**2. Casos extremos:**
- Cₙ,₀ = 1 (escolher nenhum: só uma maneira)
- Cₙ,ₙ = 1 (escolher todos: só uma maneira)
- Cₙ,₁ = n (escolher um: n maneiras)

**3. Triângulo de Pascal:**
```
        1
       1 1
      1 2 1
     1 3 3 1
    1 4 6 4 1
   1 5 10 10 5 1
```

Cada número é a soma dos dois acima dele.

### 📊 Comparação: Permutação vs Arranjo vs Combinação

| | Permutação | Arranjo | Combinação |
|---|------------|---------|------------|
| Elementos | Todos (n) | Parte (k) | Parte (k) |
| Ordem | Importa | Importa | Não importa |
| Fórmula | n! | n!/(n-k)! | n!/[k!(n-k)!] |
| Exemplo | Ordenar 5 livros | Pódio de 3 em corrida de 8 | Comissão de 3 de 8 pessoas |

### 🌍 Aplicações Práticas

**1. Loteria:**
Mega-Sena: C₆₀,₆ ≈ 50 milhões de combinações

**2. Genética:**
Combinações de genes em herança genética

**3. Estatística:**
Amostragem de populações

**4. Informática:**
Subconjuntos de dados

### ✏️ Exercícios Práticos

**Exercício 1:** Calcule C₈,₃.

<details>
<summary>Ver resposta</summary>

C₈,₃ = 8! / (3! × 5!)
= 8 × 7 × 6 / (3 × 2 × 1)
= 336 / 6
= **56**

</details>

**Exercício 2:** De quantas maneiras podemos formar um time de vôlei (6 jogadores) a partir de 10 atletas?

<details>
<summary>Ver resposta</summary>

C₁₀,₆ = 10! / (6! × 4!)
= 10 × 9 × 8 × 7 / (4 × 3 × 2 × 1)
= 5040 / 24
= **210 times**

</details>

**Exercício 3:** Uma prova tem 10 questões e o aluno deve resolver 7. De quantas maneiras ele pode escolher as questões?

<details>
<summary>Ver resposta</summary>

C₁₀,₇ = C₁₀,₃ (pela simetria)
= 10 × 9 × 8 / (3 × 2 × 1)
= 720 / 6
= **120 maneiras**

</details>

### 🎯 Resumo do Módulo

Neste módulo, você aprendeu:

1. **PFC:** n₁ × n₂ × ... × nₖ possibilidades
2. **Permutação:** Ordenar todos os n elementos → Pₙ = n!
3. **Arranjo:** Ordenar k de n elementos → Aₙ,ₖ = n!/(n-k)!
4. **Combinação:** Escolher k de n (sem ordem) → Cₙ,ₖ = n!/[k!(n-k)!]

**Quando usar cada um:**
- Ordem importa + todos os elementos → Permutação
- Ordem importa + parte dos elementos → Arranjo
- Ordem não importa → Combinação
