/**
 * Script para inserir as 21 aulas de Aritmética Avançada
 * Os módulos já existem (IDs: 240001-240005)
 */

import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('📝 Inserindo aulas de Aritmética Avançada...\n');

// Módulos existentes:
// 240001 - Sistemas de Numeração
// 240002 - Divisibilidade e Números Primos
// 240003 - Progressões Aritméticas e Geométricas
// 240004 - Análise Combinatória Básica
// 240005 - Raciocínio Lógico Quantitativo

const pagesData = [
  // Módulo 240001: Sistemas de Numeração (4 aulas)
  {
    moduleId: 240001,
    title: 'Sistema Decimal e Posicional',
    slug: 'sistema-decimal-posicional',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Sistema Decimal e Posicional

## 🎯 Objetivos da Aula

Nesta aula, você vai entender profundamente como funciona o sistema de numeração que usamos todos os dias. Parece simples escrever "2024", mas por trás desses quatro dígitos existe uma lógica matemática elegante.

## 📚 O que é um Sistema de Numeração?

Um **sistema de numeração** é um conjunto de regras e símbolos que usamos para representar quantidades. O sistema que usamos hoje é chamado de **sistema decimal** ou **sistema indo-arábico**, porque foi desenvolvido na Índia e chegou à Europa através dos árabes. Ele usa apenas 10 símbolos: 0, 1, 2, 3, 4, 5, 6, 7, 8 e 9.

> **Definição:** O sistema decimal é um sistema de numeração posicional de base 10, onde cada dígito tem um valor que depende da sua posição no número.

## 🔢 O Conceito de Base

A **base** de um sistema de numeração indica quantos símbolos diferentes ele utiliza. No sistema decimal, a base é 10 porque temos 10 dígitos (0 a 9). Quando chegamos ao 9 e precisamos representar a próxima quantidade, "reiniciamos" para 0 e adicionamos 1 na posição à esquerda, formando o 10.

## 📍 O Sistema Posicional

O grande diferencial do nosso sistema é ser **posicional**. Isso significa que o valor de cada dígito depende da sua posição no número.

**Exemplo:** No número 555, todos os dígitos são iguais (5), mas cada um representa um valor diferente:
- O 5 da direita vale 5 unidades
- O 5 do meio vale 5 dezenas (50)
- O 5 da esquerda vale 5 centenas (500)

Portanto: 555 = 500 + 50 + 5

## 🏗️ Decomposição de Números

Podemos decompor qualquer número mostrando o valor de cada posição:

**Exemplo:** 2.847
- 2 milhares = 2 × 1.000 = 2.000
- 8 centenas = 8 × 100 = 800
- 4 dezenas = 4 × 10 = 40
- 7 unidades = 7 × 1 = 7
- Total: 2.000 + 800 + 40 + 7 = 2.847

## 📊 Tabela de Valores Posicionais

| Posição | Nome | Valor | Potência de 10 |
|---------|------|-------|----------------|
| 1ª (direita) | Unidade | 1 | 10⁰ |
| 2ª | Dezena | 10 | 10¹ |
| 3ª | Centena | 100 | 10² |
| 4ª | Milhar | 1.000 | 10³ |
| 5ª | Dezena de milhar | 10.000 | 10⁴ |
| 6ª | Centena de milhar | 100.000 | 10⁵ |
| 7ª | Milhão | 1.000.000 | 10⁶ |

## 💡 O Papel do Zero

O zero é fundamental no sistema posicional. Ele serve como "marcador de posição", indicando que não há nenhuma quantidade naquela posição.

**Exemplo:** No número 305:
- 3 centenas = 300
- 0 dezenas = 0
- 5 unidades = 5

Sem o zero, não conseguiríamos distinguir 35 de 305 ou de 350.

## 🎯 Resumo da Aula

- O sistema decimal usa base 10 (10 símbolos: 0-9)
- É um sistema posicional: o valor do dígito depende da posição
- Cada posição vale 10 vezes mais que a anterior
- O zero é essencial como marcador de posição
- Podemos decompor números usando potências de 10`,
    conceptSummary: 'O sistema decimal é posicional de base 10. Cada posição vale 10× mais que a anterior. O zero marca posições vazias.'
  },
  {
    moduleId: 240001,
    title: 'Sistema Binário',
    slug: 'sistema-binario',
    order: 2,
    estimatedMinutes: 50,
    mainText: `# Sistema Binário

## 🎯 Objetivos da Aula

Nesta aula, você vai descobrir o sistema de numeração que está por trás de toda a tecnologia moderna: o **sistema binário**. Computadores, smartphones e tablets "pensam" em binário.

## 💻 Por que os Computadores Usam Binário?

Os computadores são máquinas eletrônicas que funcionam com circuitos que podem estar em dois estados: **ligado** ou **desligado**. Por isso, o sistema binário é perfeito:
- **1** = ligado (presença de corrente elétrica)
- **0** = desligado (ausência de corrente elétrica)

> **Definição:** O sistema binário é um sistema de numeração posicional de base 2, que usa apenas dois símbolos: 0 e 1.

## 🔢 Como Contar em Binário

| Decimal | Binário | Explicação |
|---------|---------|------------|
| 0 | 0 | Zero |
| 1 | 1 | Um |
| 2 | 10 | "Dois" em binário |
| 3 | 11 | Um grupo de 2 + 1 unidade |
| 4 | 100 | Um grupo de 4 |
| 5 | 101 | Um grupo de 4 + 1 unidade |
| 6 | 110 | Um grupo de 4 + 1 grupo de 2 |
| 7 | 111 | 4 + 2 + 1 |
| 8 | 1000 | Um grupo de 8 |

## 📊 Valores Posicionais em Binário

| Posição | Valor em Decimal | Potência de 2 |
|---------|------------------|---------------|
| 1ª (direita) | 1 | 2⁰ |
| 2ª | 2 | 2¹ |
| 3ª | 4 | 2² |
| 4ª | 8 | 2³ |
| 5ª | 16 | 2⁴ |
| 6ª | 32 | 2⁵ |
| 7ª | 64 | 2⁶ |
| 8ª | 128 | 2⁷ |

## 🔄 Convertendo Binário para Decimal

Para converter um número binário para decimal, multiplique cada dígito pelo valor da sua posição e some tudo.

**Exemplo:** Converter 1011₂ para decimal

1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰
      = 1×8 + 0×4 + 1×2 + 1×1
      = 8 + 0 + 2 + 1
      = **11** em decimal

## 🔄 Convertendo Decimal para Binário

Para converter decimal para binário, usamos o **método das divisões sucessivas por 2**:

**Exemplo:** Converter 13 para binário

1. 13 ÷ 2 = 6, resto **1**
2. 6 ÷ 2 = 3, resto **0**
3. 3 ÷ 2 = 1, resto **1**
4. 1 ÷ 2 = 0, resto **1**

Lendo os restos de baixo para cima: **1101₂**

## 💾 Bits e Bytes

- **Bit** (binary digit): É um único dígito binário (0 ou 1). É a menor unidade de informação.
- **Byte**: É um grupo de 8 bits. Com 8 bits, podemos representar 2⁸ = 256 valores diferentes.

## 🎯 Resumo da Aula

- O sistema binário usa base 2 (apenas 0 e 1)
- É ideal para computadores por causa dos circuitos eletrônicos
- Cada posição vale 2 vezes mais que a anterior (1, 2, 4, 8, 16...)
- Para converter binário→decimal: some os valores das posições com 1
- Para converter decimal→binário: divida por 2 e leia os restos de baixo para cima`,
    conceptSummary: 'O sistema binário usa base 2 (0 e 1). Cada posição vale 2× mais que a anterior. Computadores usam binário.'
  },
  {
    moduleId: 240001,
    title: 'Sistema Hexadecimal',
    slug: 'sistema-hexadecimal',
    order: 3,
    estimatedMinutes: 50,
    mainText: `# Sistema Hexadecimal

## 🎯 Objetivos da Aula

Nesta aula, você vai conhecer o **sistema hexadecimal**, muito usado em programação e design. Se você já viu códigos de cores como #FF5733, você já encontrou números hexadecimais!

## 🔢 O que é o Sistema Hexadecimal?

O sistema hexadecimal é um sistema de base 16. Como precisamos de 16 símbolos diferentes e só temos 10 dígitos (0-9), usamos também as letras A, B, C, D, E e F:

| Hexadecimal | Decimal | Binário |
|-------------|---------|---------|
| 0 | 0 | 0000 |
| 1 | 1 | 0001 |
| 2 | 2 | 0010 |
| 3 | 3 | 0011 |
| 4 | 4 | 0100 |
| 5 | 5 | 0101 |
| 6 | 6 | 0110 |
| 7 | 7 | 0111 |
| 8 | 8 | 1000 |
| 9 | 9 | 1001 |
| A | 10 | 1010 |
| B | 11 | 1011 |
| C | 12 | 1100 |
| D | 13 | 1101 |
| E | 14 | 1110 |
| F | 15 | 1111 |

## 💡 Por que Usar Hexadecimal?

O hexadecimal é uma forma compacta de representar números binários. Cada dígito hexadecimal corresponde exatamente a 4 bits:

- 1 dígito hex = 4 bits
- 2 dígitos hex = 8 bits = 1 byte

**Exemplo:** O número binário 11111111₂ (8 bits) pode ser escrito como FF₁₆ (apenas 2 caracteres).

## 🎨 Cores em Hexadecimal

Uma das aplicações mais comuns do hexadecimal é na representação de cores em web design:

O formato é **#RRGGBB**, onde:
- RR = quantidade de vermelho (Red)
- GG = quantidade de verde (Green)
- BB = quantidade de azul (Blue)

Cada componente vai de 00 (nenhum) a FF (máximo = 255).

| Cor | Código Hex | RGB |
|-----|------------|-----|
| Preto | #000000 | (0, 0, 0) |
| Branco | #FFFFFF | (255, 255, 255) |
| Vermelho | #FF0000 | (255, 0, 0) |
| Verde | #00FF00 | (0, 255, 0) |
| Azul | #0000FF | (0, 0, 255) |
| Amarelo | #FFFF00 | (255, 255, 0) |

## 🔄 Conversões

**Hexadecimal → Decimal:**
2A₁₆ = 2×16 + 10×1 = 32 + 10 = **42**

**Binário → Hexadecimal:**
11010110₂ = 1101 0110 = D6₁₆

## 🎯 Resumo da Aula

- O sistema hexadecimal usa base 16 (0-9 e A-F)
- Cada dígito hex representa exatamente 4 bits
- É muito usado em programação, cores e endereços de memória
- Cores web usam formato #RRGGBB`,
    conceptSummary: 'O sistema hexadecimal usa base 16 (0-9 e A-F). Cada dígito hex = 4 bits. Usado em cores (#RRGGBB) e programação.'
  },
  {
    moduleId: 240001,
    title: 'Conversão entre Sistemas',
    slug: 'conversao-sistemas',
    order: 4,
    estimatedMinutes: 55,
    mainText: `# Conversão entre Sistemas

## 🎯 Objetivos da Aula

Nesta aula final do módulo, você vai dominar as técnicas de conversão entre os três sistemas de numeração: decimal, binário e hexadecimal.

## 🔄 Mapa de Conversões

Existem 6 conversões possíveis:
1. Decimal → Binário (divisões por 2)
2. Binário → Decimal (soma de potências)
3. Decimal → Hexadecimal (divisões por 16)
4. Hexadecimal → Decimal (soma de potências)
5. Binário → Hexadecimal (agrupamento de 4 bits)
6. Hexadecimal → Binário (expansão para 4 bits)

## 📝 Método 1: Decimal → Binário

**Exemplo:** Converter 75 para binário

| Divisão | Quociente | Resto |
|---------|-----------|-------|
| 75 ÷ 2 | 37 | 1 |
| 37 ÷ 2 | 18 | 1 |
| 18 ÷ 2 | 9 | 0 |
| 9 ÷ 2 | 4 | 1 |
| 4 ÷ 2 | 2 | 0 |
| 2 ÷ 2 | 1 | 0 |
| 1 ÷ 2 | 0 | 1 |

Resultado: **1001011₂**

## 📝 Método 2: Binário → Decimal

**Exemplo:** Converter 1001011₂ para decimal

| Dígito | 1 | 0 | 0 | 1 | 0 | 1 | 1 |
|--------|---|---|---|---|---|---|---|
| Potência | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰ |
| Valor | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| Resultado | 64 | 0 | 0 | 8 | 0 | 2 | 1 |

Soma: 64 + 8 + 2 + 1 = **75**

## 📝 Método 5: Binário → Hexadecimal

Agrupe os bits de 4 em 4, da direita para a esquerda:

**Exemplo:** 11010110₂ para hexadecimal

11010110₂ = 1101 | 0110
          = D    | 6
          = **D6₁₆**

## 📊 Tabela de Referência Rápida

| Decimal | Binário | Hexadecimal |
|---------|---------|-------------|
| 0 | 0000 | 0 |
| 1 | 0001 | 1 |
| 2 | 0010 | 2 |
| 3 | 0011 | 3 |
| 4 | 0100 | 4 |
| 5 | 0101 | 5 |
| 6 | 0110 | 6 |
| 7 | 0111 | 7 |
| 8 | 1000 | 8 |
| 9 | 1001 | 9 |
| 10 | 1010 | A |
| 11 | 1011 | B |
| 12 | 1100 | C |
| 13 | 1101 | D |
| 14 | 1110 | E |
| 15 | 1111 | F |

## 🎯 Resumo do Módulo

Neste módulo, você aprendeu:

1. **Sistema Decimal (Base 10):** Nosso sistema cotidiano, posicional, com 10 símbolos
2. **Sistema Binário (Base 2):** Usado por computadores, apenas 0 e 1
3. **Sistema Hexadecimal (Base 16):** Forma compacta de representar binário
4. **Conversões:** Técnicas para converter entre qualquer par de sistemas`,
    conceptSummary: 'Decimal↔Binário: divisões/somas por 2. Binário↔Hex: agrupe 4 bits. Decimal↔Hex: divisões/somas por 16.'
  },

  // Módulo 240002: Divisibilidade e Números Primos (5 aulas)
  {
    moduleId: 240002,
    title: 'Critérios de Divisibilidade',
    slug: 'criterios-divisibilidade',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Critérios de Divisibilidade

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender os **critérios de divisibilidade**, que são regras práticas para descobrir se um número é divisível por outro sem precisar fazer a divisão completa.

## 📚 O que é Divisibilidade?

Dizemos que um número **a** é divisível por **b** quando a divisão de a por b resulta em um número inteiro, sem resto.

> **Definição:** Um número a é divisível por b se existe um número inteiro k tal que a = b × k.

## 🔢 Critérios de Divisibilidade

### Por 2
Um número é divisível por 2 se termina em 0, 2, 4, 6 ou 8 (números pares).

### Por 3
Um número é divisível por 3 se a soma de seus algarismos é divisível por 3.

**Exemplo:** 123 → 1+2+3 = 6, e 6 é divisível por 3 ✓

### Por 4
Um número é divisível por 4 se os dois últimos algarismos formam um número divisível por 4.

### Por 5
Um número é divisível por 5 se termina em 0 ou 5.

### Por 6
Um número é divisível por 6 se é divisível por 2 E por 3 simultaneamente.

### Por 9
Um número é divisível por 9 se a soma de seus algarismos é divisível por 9.

### Por 10
Um número é divisível por 10 se termina em 0.

## 📊 Tabela Resumo

| Divisor | Critério |
|---------|----------|
| 2 | Termina em 0, 2, 4, 6 ou 8 |
| 3 | Soma dos algarismos divisível por 3 |
| 4 | Últimos 2 algarismos divisíveis por 4 |
| 5 | Termina em 0 ou 5 |
| 6 | Divisível por 2 E por 3 |
| 9 | Soma dos algarismos divisível por 9 |
| 10 | Termina em 0 |

## 🎯 Resumo da Aula

- Critérios de divisibilidade permitem verificar divisões sem calcular
- Por 2: último dígito par
- Por 3 e 9: soma dos dígitos
- Por 5 e 10: último dígito`,
    conceptSummary: 'Critérios de divisibilidade: por 2 (par), por 3/9 (soma dos dígitos), por 5/10 (termina em 0 ou 5).'
  },
  {
    moduleId: 240002,
    title: 'Números Primos e Compostos',
    slug: 'numeros-primos-compostos',
    order: 2,
    estimatedMinutes: 50,
    mainText: `# Números Primos e Compostos

## 🎯 Objetivos da Aula

Nesta aula, você vai conhecer os **números primos**, considerados os "átomos" da matemática.

## 📚 Definições Fundamentais

> **Número Primo:** É um número natural maior que 1 que possui exatamente dois divisores: 1 e ele mesmo.

> **Número Composto:** É um número natural maior que 1 que possui mais de dois divisores.

**Exemplos de números primos:** 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31...

**Observações importantes:**
- O número 1 não é primo nem composto
- O número 2 é o único primo par
- Todos os outros primos são ímpares

## 🔍 Como Identificar um Número Primo

Para verificar se um número n é primo, basta testar se ele é divisível por algum primo menor ou igual a √n.

**Exemplo:** 97 é primo?
- √97 ≈ 9,85
- Primos até 9: 2, 3, 5, 7
- 97 não é divisível por nenhum deles
- **97 é primo!**

## 📊 Lista dos Primeiros Primos

Primos até 100: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97

Total de primos até 100: **25 números**

## 🏛️ O Crivo de Eratóstenes

O **Crivo de Eratóstenes** é um algoritmo antigo para encontrar todos os números primos até um limite n.

**Algoritmo:**
1. Escreva todos os números de 2 até n
2. Circule o 2 (primeiro primo) e risque todos os múltiplos de 2
3. O próximo número não riscado é primo. Circule-o e risque seus múltiplos
4. Repita até √n

## 🎯 Resumo da Aula

- Primos têm exatamente 2 divisores (1 e ele mesmo)
- O 2 é o único primo par
- Para testar primalidade, verifique divisores até √n
- O Crivo de Eratóstenes encontra todos os primos até n`,
    conceptSummary: 'Primos: divisíveis apenas por 1 e por si mesmos. O 2 é o único primo par. Teste divisores até √n.'
  },
  {
    moduleId: 240002,
    title: 'Fatoração em Primos',
    slug: 'fatoracao-primos',
    order: 3,
    estimatedMinutes: 50,
    mainText: `# Fatoração em Números Primos

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender a **decompor qualquer número em fatores primos**.

## 📚 O que é Fatoração?

**Fatorar** um número significa escrevê-lo como produto de números menores.

> **Teorema Fundamental da Aritmética:** Todo número inteiro maior que 1 pode ser escrito de forma única como produto de números primos.

## 🔧 Método da Fatoração

**Passo a passo:**
1. Divida o número pelo menor primo possível
2. Divida o quociente pelo menor primo possível
3. Repita até chegar a 1
4. O número original é o produto de todos os divisores usados

**Exemplo:** Fatorar 60

60 | 2
30 | 2
15 | 3
 5 | 5
 1

60 = 2 × 2 × 3 × 5 = **2² × 3 × 5**

## 📊 Notação com Expoentes

| Número | Fatoração | Forma com Expoentes |
|--------|-----------|---------------------|
| 12 | 2 × 2 × 3 | 2² × 3 |
| 72 | 2 × 2 × 2 × 3 × 3 | 2³ × 3² |
| 100 | 2 × 2 × 5 × 5 | 2² × 5² |

## 📐 Fórmula para Quantidade de Divisores

Se n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ, então:

**Quantidade de divisores = (a₁ + 1) × (a₂ + 1) × ... × (aₖ + 1)**

**Exemplo:** 360 = 2³ × 3² × 5¹
Divisores = (3+1) × (2+1) × (1+1) = 4 × 3 × 2 = **24 divisores**

## 🎯 Resumo da Aula

- Fatoração é decompor um número em produto de primos
- Use divisões sucessivas pelo menor primo possível
- Expoentes indicam quantas vezes cada primo aparece
- A quantidade de divisores depende dos expoentes`,
    conceptSummary: 'Fatoração: dividir sucessivamente pelo menor primo. Quantidade de divisores = produto de (expoente+1).'
  },
  {
    moduleId: 240002,
    title: 'MDC e MMC Avançados',
    slug: 'mdc-mmc-avancados',
    order: 4,
    estimatedMinutes: 50,
    mainText: `# MDC e MMC Avançados

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender métodos avançados para calcular o **Máximo Divisor Comum (MDC)** e o **Mínimo Múltiplo Comum (MMC)**.

## 📚 Revisão

> **MDC:** O maior número que divide dois ou mais números simultaneamente.

> **MMC:** O menor número que é múltiplo de dois ou mais números simultaneamente.

## 🔧 Método da Fatoração

**Para MDC:** Primos comuns com **menores** expoentes
**Para MMC:** Todos os primos com **maiores** expoentes

**Exemplo:** MDC e MMC de 60 e 84

60 = 2² × 3 × 5
84 = 2² × 3 × 7

**MDC** = 2² × 3 = 12
**MMC** = 2² × 3 × 5 × 7 = 420

## 📐 Relação entre MDC e MMC

Para quaisquer dois números a e b:

**a × b = MDC(a, b) × MMC(a, b)**

**Verificação:** 60 × 84 = 5.040
MDC × MMC = 12 × 420 = 5.040 ✓

## 🔄 Algoritmo de Euclides para MDC

**Princípio:** MDC(a, b) = MDC(b, a mod b)

**Exemplo:** MDC(252, 105)

252 = 105 × 2 + 42 → MDC(252, 105) = MDC(105, 42)
105 = 42 × 2 + 21  → MDC(105, 42) = MDC(42, 21)
42 = 21 × 2 + 0    → MDC(42, 21) = 21

**MDC(252, 105) = 21**

## 🎯 Resumo da Aula

- MDC: primos comuns com menores expoentes
- MMC: todos os primos com maiores expoentes
- a × b = MDC × MMC
- Algoritmo de Euclides: divisões sucessivas até resto zero`,
    conceptSummary: 'MDC: primos comuns, menores expoentes. MMC: todos os primos, maiores expoentes. a×b = MDC×MMC.'
  },
  {
    moduleId: 240002,
    title: 'Aplicações Práticas de Divisibilidade',
    slug: 'aplicacoes-divisibilidade',
    order: 5,
    estimatedMinutes: 50,
    mainText: `# Aplicações Práticas de Divisibilidade

## 🎯 Objetivos da Aula

Nesta aula final do módulo, você vai aplicar todos os conceitos de divisibilidade em problemas práticos.

## 💼 Problema 1: Distribuição Igualitária

**Situação:** Uma escola recebeu 144 cadernos e 180 canetas para distribuir igualmente entre as salas. Qual o maior número de salas?

**Solução:** MDC(144, 180)

144 = 2⁴ × 3²
180 = 2² × 3² × 5

MDC = 2² × 3² = 4 × 9 = **36 salas**

Cada sala recebe: 4 cadernos e 5 canetas

## 🚌 Problema 2: Sincronização de Ônibus

**Situação:** Três linhas de ônibus partem às 6h. A linha A passa a cada 12 min, B a cada 15 min, C a cada 20 min. Quando estarão juntas?

**Solução:** MMC(12, 15, 20)

12 = 2² × 3
15 = 3 × 5
20 = 2² × 5

MMC = 2² × 3 × 5 = **60 minutos**

As três linhas estarão juntas às **7h**.

## 🎂 Problema 3: Divisão de Bolo

**Situação:** Um bolo de 24 cm × 36 cm será cortado em quadrados iguais, os maiores possíveis. Qual o lado de cada quadrado?

**Solução:** MDC(24, 36) = **12 cm**

Quantidade: (24÷12) × (36÷12) = 2 × 3 = **6 quadrados**

## 🎯 Resumo do Módulo

Neste módulo, você aprendeu:

1. **Critérios de Divisibilidade:** Regras rápidas para verificar divisões
2. **Números Primos:** Os blocos fundamentais dos números inteiros
3. **Fatoração:** Decompor números em produtos de primos
4. **MDC e MMC:** Calcular usando fatoração ou algoritmo de Euclides
5. **Aplicações:** Resolver problemas práticos do cotidiano`,
    conceptSummary: 'MDC para distribuição igualitária. MMC para sincronização. Aplicações em problemas do cotidiano.'
  },

  // Módulo 240003: Progressões (4 aulas)
  {
    moduleId: 240003,
    title: 'Progressão Aritmética (PA)',
    slug: 'progressao-aritmetica',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Progressão Aritmética (PA)

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender o que é uma **Progressão Aritmética (PA)** e como encontrar qualquer termo usando a fórmula do termo geral.

## 📚 O que é uma Progressão Aritmética?

> **Definição:** Uma Progressão Aritmética (PA) é uma sequência de números onde a diferença entre cada termo e seu antecessor é sempre constante.

Essa diferença constante é chamada de **razão** e representada pela letra **r**.

**Exemplos de PA:**
- (2, 5, 8, 11, 14, ...) → razão r = 3
- (20, 17, 14, 11, 8, ...) → razão r = -3
- (1, 1, 1, 1, 1, ...) → razão r = 0

## 📐 Fórmula do Termo Geral

Para encontrar qualquer termo de uma PA:

> **aₙ = a₁ + (n - 1) · r**

Onde:
- aₙ = termo que queremos encontrar
- a₁ = primeiro termo
- n = posição do termo
- r = razão

**Exemplo:** Na PA (3, 7, 11, 15, ...), qual é o 10º termo?

a₁ = 3, r = 4, n = 10

a₁₀ = 3 + (10 - 1) × 4
a₁₀ = 3 + 9 × 4
a₁₀ = 3 + 36
a₁₀ = **39**

## 🔍 Classificação das PAs

- **PA Crescente (r > 0):** Os termos aumentam
- **PA Decrescente (r < 0):** Os termos diminuem
- **PA Constante (r = 0):** Todos os termos são iguais

## 🎯 Resumo da Aula

- PA é uma sequência com diferença constante entre termos
- Razão (r) = diferença entre termos consecutivos
- Fórmula do termo geral: aₙ = a₁ + (n - 1) · r`,
    conceptSummary: 'PA: diferença constante (razão r). Termo geral: aₙ = a₁ + (n-1)·r. Crescente se r>0, decrescente se r<0.'
  },
  {
    moduleId: 240003,
    title: 'Soma de uma PA',
    slug: 'soma-pa',
    order: 2,
    estimatedMinutes: 50,
    mainText: `# Soma de uma PA

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender a calcular a **soma de todos os termos** de uma Progressão Aritmética.

## 📖 A História de Gauss

O professor de Gauss pediu que somassem todos os números de 1 a 100. Gauss percebeu:

1 + 100 = 101
2 + 99 = 101
3 + 98 = 101
...
50 + 51 = 101

São 50 pares, cada um somando 101. Total: 50 × 101 = **5.050**

## 📐 Fórmula da Soma de uma PA

> **Sₙ = (a₁ + aₙ) × n / 2**

Ou:

> **Sₙ = n × [2a₁ + (n - 1) × r] / 2**

**Exemplo:** Soma dos 10 primeiros termos da PA (2, 5, 8, 11, ...)

a₁ = 2, r = 3, n = 10
a₁₀ = 2 + 9 × 3 = 29
S₁₀ = (2 + 29) × 10 / 2 = 31 × 5 = **155**

## 📊 Propriedade Interessante

A soma dos n primeiros números ímpares é sempre n²:

| n | Ímpares | Soma |
|---|---------|------|
| 1 | 1 | 1 = 1² |
| 2 | 1 + 3 | 4 = 2² |
| 3 | 1 + 3 + 5 | 9 = 3² |
| 4 | 1 + 3 + 5 + 7 | 16 = 4² |

## 🎯 Resumo da Aula

- Soma de PA: Sₙ = (a₁ + aₙ) × n / 2
- Fórmula alternativa: Sₙ = n × [2a₁ + (n-1)×r] / 2
- A soma dos n primeiros ímpares é n²`,
    conceptSummary: 'Soma de PA: Sₙ = (a₁ + aₙ) × n / 2. Soma dos n primeiros ímpares = n².'
  },
  {
    moduleId: 240003,
    title: 'Progressão Geométrica (PG)',
    slug: 'progressao-geometrica',
    order: 3,
    estimatedMinutes: 50,
    mainText: `# Progressão Geométrica (PG)

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender o que é uma **Progressão Geométrica (PG)** e como encontrar qualquer termo.

## 📚 O que é uma Progressão Geométrica?

> **Definição:** Uma Progressão Geométrica (PG) é uma sequência de números onde a razão entre cada termo e seu antecessor é sempre constante.

Essa razão constante é chamada de **razão** e representada pela letra **q**.

**Exemplos de PG:**
- (2, 6, 18, 54, ...) → razão q = 3
- (100, 50, 25, 12.5, ...) → razão q = 0,5
- (3, -6, 12, -24, ...) → razão q = -2

## 📐 Fórmula do Termo Geral

> **aₙ = a₁ × q^(n-1)**

**Exemplo:** Na PG (2, 6, 18, ...), qual é o 8º termo?

a₁ = 2, q = 3, n = 8

a₈ = 2 × 3^(8-1)
a₈ = 2 × 3⁷
a₈ = 2 × 2187
a₈ = **4.374**

## 🌍 Aplicações no Cotidiano

**Juros Compostos:**
Se você investe R$ 1.000 a 10% ao ano:
- Ano 0: R$ 1.000
- Ano 1: R$ 1.100
- Ano 10: 1000 × 1,1¹⁰ ≈ R$ 2.593,74

**Crescimento Populacional:**
Uma população de bactérias dobra a cada hora:
- Hora 0: 100
- Hora 10: 100 × 2¹⁰ = 102.400 bactérias

## 🎯 Resumo da Aula

- PG é uma sequência com razão constante entre termos
- Razão (q) = quociente entre termos consecutivos
- Fórmula do termo geral: aₙ = a₁ × q^(n-1)`,
    conceptSummary: 'PG: razão constante (q). Termo geral: aₙ = a₁ × q^(n-1). Modela crescimento exponencial.'
  },
  {
    moduleId: 240003,
    title: 'Soma de uma PG',
    slug: 'soma-pg',
    order: 4,
    estimatedMinutes: 50,
    mainText: `# Soma de uma PG

## 🎯 Objetivos da Aula

Nesta aula final do módulo, você vai aprender a calcular a **soma de uma PG finita** e o conceito de **soma de uma PG infinita**.

## 📐 Fórmula da Soma de uma PG Finita

> **Sₙ = a₁ × (qⁿ - 1) / (q - 1)** (para q ≠ 1)

**Exemplo:** Soma dos 6 primeiros termos da PG (2, 6, 18, 54, ...)

a₁ = 2, q = 3, n = 6

S₆ = 2 × (3⁶ - 1) / (3 - 1)
S₆ = 2 × (729 - 1) / 2
S₆ = **728**

## 📊 Soma de uma PG Infinita

Quando |q| < 1, os termos vão diminuindo e a soma converge:

> **S∞ = a₁ / (1 - q)** (válido para |q| < 1)

**Exemplo:** PG infinita (1, 1/2, 1/4, 1/8, ...)

a₁ = 1, q = 1/2

S∞ = 1 / (1 - 1/2) = 1 / (1/2) = **2**

## 📊 Comparação: PA vs PG

| Característica | PA | PG |
|----------------|----|----|
| Relação | Diferença constante | Razão constante |
| Termo geral | aₙ = a₁ + (n-1)r | aₙ = a₁ × q^(n-1) |
| Crescimento | Linear | Exponencial |
| Soma finita | Sₙ = (a₁+aₙ)×n/2 | Sₙ = a₁×(qⁿ-1)/(q-1) |

## 🎯 Resumo do Módulo

1. **PA:** Diferença constante, termo geral aₙ = a₁ + (n-1)r
2. **PG:** Razão constante, termo geral aₙ = a₁ × q^(n-1)
3. **Somas:** Fórmulas específicas para cada tipo`,
    conceptSummary: 'Soma PG finita: Sₙ = a₁×(qⁿ-1)/(q-1). Soma PG infinita (|q|<1): S∞ = a₁/(1-q).'
  },

  // Módulo 240004: Análise Combinatória (4 aulas)
  {
    moduleId: 240004,
    title: 'Princípio Fundamental da Contagem',
    slug: 'principio-fundamental-contagem',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Princípio Fundamental da Contagem

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender o **Princípio Fundamental da Contagem (PFC)**, o conceito base de toda a Análise Combinatória.

## 📚 O que é o PFC?

> **Definição:** Se uma decisão pode ser tomada de **m** maneiras e outra de **n** maneiras, então o total de maneiras de tomar as duas decisões é **m × n**.

Este princípio se estende para qualquer número de decisões:

> Total = n₁ × n₂ × ... × nₖ

## 🍕 Exemplo: Cardápio

Um restaurante oferece:
- 3 entradas
- 4 pratos principais
- 2 sobremesas

Quantas refeições diferentes são possíveis?

**Solução:** 3 × 4 × 2 = **24 refeições**

## 🔢 Exemplo: Placas de Carro

Placas ABC-1234 (3 letras + 4 números):

Total = 26 × 26 × 26 × 10 × 10 × 10 × 10
Total = 26³ × 10⁴
Total = **175.760.000 placas**

## 🔐 Exemplo: Senhas

Senha de 4 dígitos (0-9):

**Com repetição:** 10⁴ = **10.000 senhas**
**Sem repetição:** 10 × 9 × 8 × 7 = **5.040 senhas**

## 🎯 Resumo da Aula

- PFC: m opções × n opções = m × n combinações
- Estende-se para qualquer número de decisões
- Atenção: verificar se há repetição permitida ou não`,
    conceptSummary: 'PFC: total = n₁ × n₂ × ... × nₖ. Verificar se repetição é permitida.'
  },
  {
    moduleId: 240004,
    title: 'Permutações',
    slug: 'permutacoes',
    order: 2,
    estimatedMinutes: 50,
    mainText: `# Permutações

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender sobre **permutações**, que são arranjos ordenados de todos os elementos de um conjunto.

## 📚 O que é uma Permutação?

> **Definição:** Uma permutação de n elementos é uma ordenação de todos esses n elementos.

## 📐 Fórmula da Permutação Simples

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

**Exemplo:** De quantas maneiras 5 pessoas podem formar uma fila?

P₅ = 5! = 5 × 4 × 3 × 2 × 1 = **120 maneiras**

## 🔄 Permutação com Repetição

Quando há elementos repetidos:

> **Pₙ^(a,b,c,...) = n! / (a! × b! × c! × ...)**

**Exemplo:** Anagramas de BANANA

- Total: 6 letras
- A: 3 vezes, N: 2 vezes, B: 1 vez

P₆^(3,2,1) = 6! / (3! × 2! × 1!) = 720 / 12 = **60 anagramas**

## 🔵 Permutação Circular

> **PCₙ = (n-1)!**

**Exemplo:** 6 pessoas em mesa redonda

PC₆ = 5! = **120 maneiras**

## 🎯 Resumo da Aula

- Permutação simples: Pₙ = n!
- Permutação com repetição: Pₙ^(a,b,...) = n! / (a! × b! × ...)
- Permutação circular: PCₙ = (n-1)!`,
    conceptSummary: 'Permutação: Pₙ = n!. Com repetição: dividir pelos fatoriais das repetições. Circular: (n-1)!.'
  },
  {
    moduleId: 240004,
    title: 'Arranjos',
    slug: 'arranjos',
    order: 3,
    estimatedMinutes: 50,
    mainText: `# Arranjos

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender sobre **arranjos**, que são seleções ordenadas de parte dos elementos de um conjunto.

## 📚 O que é um Arranjo?

> **Definição:** Um arranjo de n elementos tomados k a k é uma seleção ordenada de k elementos dentre n disponíveis.

**Diferença entre Permutação e Arranjo:**
- Permutação: ordena TODOS os elementos
- Arranjo: ordena PARTE dos elementos

## 📐 Fórmula do Arranjo

> **Aₙ,ₖ = n! / (n-k)!**

Ou: **Aₙ,ₖ = n × (n-1) × ... × (n-k+1)** (k fatores)

**Exemplo:** A₅,₃

A₅,₃ = 5! / 2! = 120 / 2 = **60**
Ou: 5 × 4 × 3 = **60**

## 🏆 Exemplo: Pódio

Em uma corrida com 8 atletas, de quantas maneiras o pódio (1º, 2º, 3º) pode ser formado?

A₈,₃ = 8 × 7 × 6 = **336 maneiras**

## 📊 Comparação

| | Permutação | Arranjo |
|---|------------|---------|
| Elementos | Todos (n) | Parte (k de n) |
| Fórmula | Pₙ = n! | Aₙ,ₖ = n!/(n-k)! |

## 🎯 Resumo da Aula

- Arranjo: seleção ordenada de k elementos de n disponíveis
- Fórmula: Aₙ,ₖ = n!/(n-k)!
- Quando k = n, arranjo = permutação`,
    conceptSummary: 'Arranjo: seleção ordenada de k de n. Aₙ,ₖ = n!/(n-k)! = n × (n-1) × ... × (n-k+1).'
  },
  {
    moduleId: 240004,
    title: 'Combinações',
    slug: 'combinacoes',
    order: 4,
    estimatedMinutes: 50,
    mainText: `# Combinações

## 🎯 Objetivos da Aula

Nesta aula final do módulo, você vai aprender sobre **combinações**, que são seleções NÃO ordenadas de parte dos elementos.

## 📚 O que é uma Combinação?

> **Definição:** Uma combinação de n elementos tomados k a k é uma seleção de k elementos onde a ordem NÃO importa.

**Diferença entre Arranjo e Combinação:**
- Arranjo: a ordem IMPORTA (ABC ≠ BAC)
- Combinação: a ordem NÃO importa (ABC = BAC)

## 📐 Fórmula da Combinação

> **Cₙ,ₖ = n! / [k! × (n-k)!]**

Ou: **Cₙ,ₖ = Aₙ,ₖ / k!**

**Exemplo:** C₅,₃

C₅,₃ = 5! / (3! × 2!) = 120 / 12 = **10**

## 🎲 Exemplo: Loteria

Na Mega-Sena, você escolhe 6 números de 1 a 60:

C₆₀,₆ = 60! / (6! × 54!)
     = **50.063.860 apostas**

## 📊 Comparação Final

| | Permutação | Arranjo | Combinação |
|---|------------|---------|------------|
| Elementos | Todos (n) | Parte (k) | Parte (k) |
| Ordem | Importa | Importa | Não importa |
| Fórmula | n! | n!/(n-k)! | n!/[k!(n-k)!] |

## 🎯 Resumo do Módulo

1. **PFC:** n₁ × n₂ × ... × nₖ
2. **Permutação:** Ordenar todos → Pₙ = n!
3. **Arranjo:** Ordenar k de n → Aₙ,ₖ = n!/(n-k)!
4. **Combinação:** Escolher k de n (sem ordem) → Cₙ,ₖ = n!/[k!(n-k)!]`,
    conceptSummary: 'Combinação: seleção sem ordem. Cₙ,ₖ = n!/[k!(n-k)!]. Ordem importa → arranjo. Ordem não importa → combinação.'
  },

  // Módulo 240005: Raciocínio Lógico (4 aulas)
  {
    moduleId: 240005,
    title: 'Sequências Numéricas',
    slug: 'sequencias-numericas',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Sequências Numéricas

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender a identificar padrões em **sequências numéricas** e descobrir os próximos termos.

## 📚 Tipos de Sequências

### Tipo 1: Diferença Constante (PA)
2, 5, 8, 11, 14, ? → Diferença: +3 → Próximo: **17**

### Tipo 2: Razão Constante (PG)
3, 6, 12, 24, 48, ? → Razão: ×2 → Próximo: **96**

### Tipo 3: Diferença de Segunda Ordem
1, 4, 9, 16, 25, ? → São quadrados (1², 2², 3², 4², 5²) → Próximo: **36**

### Tipo 4: Fibonacci
1, 1, 2, 3, 5, 8, 13, 21, ? → Soma dos dois anteriores → Próximo: **34**

### Tipo 5: Sequências Alternadas
1, 10, 2, 20, 3, 30, 4, ? → Dois padrões → Próximo: **40**

## 📊 Estratégias para Resolver

1. Calcule as diferenças entre termos
2. Calcule as razões entre termos
3. Procure padrões conhecidos (quadrados, cubos, primos)
4. Verifique alternância
5. Tente fatorar os termos

## 🎯 Resumo da Aula

- Sequências aritméticas: diferença constante
- Sequências geométricas: razão constante
- Fibonacci: soma dos dois anteriores
- Alternadas: dois padrões intercalados`,
    conceptSummary: 'Sequências: calcule diferenças e razões. Procure padrões conhecidos (PA, PG, quadrados, Fibonacci).'
  },
  {
    moduleId: 240005,
    title: 'Problemas de Lógica',
    slug: 'problemas-logica',
    order: 2,
    estimatedMinutes: 50,
    mainText: `# Problemas de Lógica

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender a resolver **problemas de lógica** que envolvem raciocínio dedutivo e análise de proposições.

## 📚 Proposições Lógicas

> **Definição:** Uma proposição é uma sentença que pode ser verdadeira (V) ou falsa (F).

## 🔗 Conectivos Lógicos

| Conectivo | Símbolo | Significado |
|-----------|---------|-------------|
| Negação | ~p | "não p" |
| Conjunção | p ∧ q | "p e q" |
| Disjunção | p ∨ q | "p ou q" |
| Condicional | p → q | "se p, então q" |
| Bicondicional | p ↔ q | "p se e somente se q" |

## 📊 Tabela-Verdade do Condicional

| p | q | p → q |
|---|---|-------|
| V | V | V |
| V | F | F |
| F | V | V |
| F | F | V |

**Importante:** O condicional só é falso quando p é V e q é F.

## 🔍 Negação de Proposições

- Negação de "p e q": ~p ou ~q
- Negação de "p ou q": ~p e ~q
- Negação de "se p, então q": p e ~q

## 🎯 Resumo da Aula

- Proposições são sentenças V ou F
- Conectivos: negação, conjunção, disjunção, condicional
- Negação de "se p então q" é "p e não q"`,
    conceptSummary: 'Proposições: V ou F. Condicional (p→q) é falso só quando p=V e q=F. Negação de "se p então q" = "p e não q".'
  },
  {
    moduleId: 240005,
    title: 'Raciocínio Proporcional',
    slug: 'raciocinio-proporcional',
    order: 3,
    estimatedMinutes: 50,
    mainText: `# Raciocínio Proporcional

## 🎯 Objetivos da Aula

Nesta aula, você vai aprender a resolver problemas que envolvem **proporções** e **regra de três**.

## 📚 Grandezas Proporcionais

> **Diretamente Proporcionais:** Quando uma aumenta, a outra também aumenta.

> **Inversamente Proporcionais:** Quando uma aumenta, a outra diminui.

## 📐 Regra de Três Simples

**Diretamente proporcional:**
Se 5 kg custam R$ 25, quanto custam 8 kg?

x/25 = 8/5 → x = **R$ 40**

**Inversamente proporcional:**
Se 4 pedreiros fazem em 6 dias, 8 pedreiros fazem em quantos dias?

4 × 6 = 8 × x → x = **3 dias**

## 📐 Regra de Três Composta

**Exemplo:** 5 máquinas produzem 100 peças em 4 horas. Quantas peças 8 máquinas produzem em 6 horas?

x/100 = (8/5) × (6/4) = **240 peças**

## 🔢 Divisão Proporcional

Dividir R$ 1.000 na proporção 2:3:5:

Soma: 2+3+5 = 10
Parte: 1000/10 = R$ 100

- A: 2 × 100 = R$ 200
- B: 3 × 100 = R$ 300
- C: 5 × 100 = R$ 500

## 🎯 Resumo da Aula

- Diretamente proporcionais: aumentam/diminuem juntas
- Inversamente proporcionais: uma aumenta, outra diminui
- Divisão proporcional: dividir pela soma das partes`,
    conceptSummary: 'Regra de três: direta (mesma proporção) ou inversa (produto constante). Divisão proporcional: soma das partes.'
  },
  {
    moduleId: 240005,
    title: 'Problemas de Concursos',
    slug: 'problemas-concursos',
    order: 4,
    estimatedMinutes: 55,
    mainText: `# Problemas de Concursos

## 🎯 Objetivos da Aula

Nesta aula final, você vai praticar com **problemas típicos de concursos públicos**.

## 📝 Problema 1: Idade

A idade de Maria é o triplo da idade de sua filha. Daqui a 10 anos, será o dobro. Qual a idade de Maria?

**Solução:**
Filha: x, Maria: 3x
3x + 10 = 2(x + 10)
3x + 10 = 2x + 20
x = 10

Maria: 3 × 10 = **30 anos**

## 📝 Problema 2: Trabalho Conjunto

João pinta uma casa em 12 dias. Pedro em 8 dias. Juntos, em quantos dias?

**Solução:**
João: 1/12 por dia
Pedro: 1/8 por dia
Juntos: 1/12 + 1/8 = 5/24 por dia
Tempo: 24/5 = **4,8 dias**

## 📝 Problema 3: Porcentagem

Aumento de 20% seguido de desconto de 20%. Preço final?

100 × 1,20 × 0,80 = **96** (menor que 100!)

## 📝 Problema 4: Velocidade Média

100 km a 50 km/h (ida) e 100 km a 100 km/h (volta). Velocidade média?

Tempo ida: 2h, volta: 1h, total: 3h
Distância: 200 km
Velocidade média: 200/3 ≈ **66,67 km/h**

## 📊 Dicas para Concursos

1. Leia o problema duas vezes
2. Identifique o que é pedido
3. Organize os dados
4. Verifique a resposta
5. Gerencie o tempo

## 🎯 Resumo do Módulo

1. **Sequências:** Identificar padrões
2. **Lógica:** Proposições e conectivos
3. **Proporções:** Regra de três
4. **Problemas:** Idade, trabalho, porcentagem`,
    conceptSummary: 'Problemas de concursos: idade (equações), trabalho (somar taxas), porcentagem (multiplicar fatores), velocidade média (distância/tempo total).'
  }
];

// Inserir páginas
console.log('📚 Inserindo 21 aulas...\n');

for (const page of pagesData) {
  await conn.execute(
    `INSERT INTO pages (moduleId, title, slug, \`order\`, mainText, conceptSummary, estimatedMinutes)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [page.moduleId, page.title, page.slug, page.order, page.mainText, page.conceptSummary, page.estimatedMinutes]
  );
  console.log(`✅ ${page.title}`);
}

console.log(`\n🎉 21 aulas de Aritmética Avançada inseridas com sucesso!`);

await conn.end();
