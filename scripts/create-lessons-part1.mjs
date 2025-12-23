import { drizzle } from "drizzle-orm/mysql2";
import { disciplines, modules, modulePages } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

console.log("📚 Criando aulas para os primeiros 5 módulos de Aritmética...\n");

// Get Aritmética discipline
const aritmetica = await db.select().from(disciplines).where(eq(disciplines.slug, "aritmetica")).limit(1);
if (aritmetica.length === 0) {
  console.log("❌ Disciplina Aritmética não encontrada");
  process.exit(1);
}

const disciplineId = aritmetica[0].id;

// Get modules
const mods = await db.select().from(modules).where(eq(modules.disciplineId, disciplineId));

// Lessons data with real YouTube videos in Portuguese
const lessonsData = [
  // Módulo 1: Adição e Subtração
  {
    moduleSlug: "adicao-e-subtracao",
    lessons: [
      {
        title: "A Reta Numérica: Visualizando o Movimento",
        slug: "a-reta-numerica-visualizando-o-movimento",
        content: `# A Reta Numérica: Visualizando o Movimento

A reta numérica é uma ferramenta fundamental para entender adição e subtração. Imagine uma linha onde cada ponto representa um número.

## O que é a Reta Numérica?

A reta numérica é uma linha reta onde:
- Os números crescem da esquerda para a direita
- O zero fica no centro
- Números positivos ficam à direita
- Números negativos ficam à esquerda

## Adição na Reta Numérica

Quando adicionamos, nos movemos para a **direita**:
- 3 + 2 = começamos no 3 e andamos 2 casas para direita, chegando em 5

## Subtração na Reta Numérica

Quando subtraímos, nos movemos para a **esquerda**:
- 5 - 2 = começamos no 5 e andamos 2 casas para esquerda, chegando em 3

## Exemplos Práticos

1. **7 + 3**: Comece em 7, ande 3 para direita = 10
2. **10 - 4**: Comece em 10, ande 4 para esquerda = 6
3. **2 + 5**: Comece em 2, ande 5 para direita = 7`,
        youtubeVideoId: "8UqHS3Z8jxU", // Reta Numérica - Professor Ferretto
        order: 1,
      },
      {
        title: "Adição: Juntando Quantidades",
        slug: "adicao-juntando-quantidades",
        content: `# Adição: Juntando Quantidades

A adição é a operação matemática que usamos para juntar quantidades.

## O que é Adição?

Adicionar significa **juntar**, **somar**, **unir** quantidades. O resultado da adição chamamos de **soma**.

## Termos da Adição

- **Parcelas**: Os números que estamos somando
- **Soma**: O resultado final

Exemplo: 5 + 3 = 8
- 5 e 3 são as parcelas
- 8 é a soma

## Propriedades da Adição

### 1. Comutativa
A ordem das parcelas não altera a soma:
- 3 + 5 = 5 + 3 = 8

### 2. Associativa
Podemos agrupar as parcelas de diferentes formas:
- (2 + 3) + 4 = 2 + (3 + 4) = 9

### 3. Elemento Neutro
Somar zero não altera o número:
- 7 + 0 = 7

## Exemplos do Dia a Dia

1. Você tem 5 maçãs e ganha mais 3. Quantas maçãs você tem? **5 + 3 = 8 maçãs**
2. Maria tem R$ 20 e recebe R$ 15. Quanto ela tem agora? **20 + 15 = R$ 35**`,
        youtubeVideoId: "QejRkFGzFRo", // Adição - Matemática Rio
        order: 2,
      },
      {
        title: "Subtração: Tirando Quantidades",
        slug: "subtracao-tirando-quantidades",
        content: `# Subtração: Tirando Quantidades

A subtração é a operação que usamos para tirar, remover ou comparar quantidades.

## O que é Subtração?

Subtrair significa **tirar**, **remover**, **diminuir** uma quantidade de outra. O resultado chamamos de **diferença** ou **resto**.

## Termos da Subtração

- **Minuendo**: O número do qual estamos tirando
- **Subtraendo**: O número que estamos tirando
- **Diferença/Resto**: O resultado

Exemplo: 8 - 3 = 5
- 8 é o minuendo
- 3 é o subtraendo
- 5 é a diferença

## Relação entre Adição e Subtração

A subtração é a operação inversa da adição:
- Se 5 + 3 = 8, então 8 - 3 = 5
- Se 8 - 5 = 3, então 3 + 5 = 8

## Subtração com Reagrupamento

Quando o algarismo do minuendo é menor que o do subtraendo, precisamos "emprestar":

Exemplo: 32 - 15
- Unidades: 2 < 5, então emprestamos 1 dezena
- 12 - 5 = 7 (unidades)
- 2 - 1 = 1 (dezenas)
- Resultado: 17

## Exemplos Práticos

1. Você tinha 10 reais e gastou 4. Quanto sobrou? **10 - 4 = 6 reais**
2. Havia 15 alunos, 7 saíram. Quantos ficaram? **15 - 7 = 8 alunos**`,
        youtubeVideoId: "mGAVDOH0gDo", // Subtração - Professor Ferretto
        order: 3,
      },
    ],
  },
  
  // Módulo 2: Multiplicação
  {
    moduleSlug: "multiplicacao",
    lessons: [
      {
        title: "Multiplicação como Adição Repetida",
        slug: "multiplicacao-como-adicao-repetida",
        content: `# Multiplicação como Adição Repetida

A multiplicação é uma forma mais rápida de fazer adições repetidas.

## O que é Multiplicação?

Multiplicar significa somar um número várias vezes:
- 3 × 4 = 3 + 3 + 3 + 3 = 12

## Termos da Multiplicação

- **Fatores**: Os números que estamos multiplicando
- **Produto**: O resultado

Exemplo: 5 × 3 = 15
- 5 e 3 são os fatores
- 15 é o produto

## Leitura da Multiplicação

- 3 × 4 pode ser lido como:
  - "3 vezes 4"
  - "3 multiplicado por 4"
  - "3 grupos de 4"

## Propriedades da Multiplicação

### 1. Comutativa
A ordem dos fatores não altera o produto:
- 3 × 5 = 5 × 3 = 15

### 2. Associativa
Podemos agrupar os fatores de diferentes formas:
- (2 × 3) × 4 = 2 × (3 × 4) = 24

### 3. Elemento Neutro
Multiplicar por 1 não altera o número:
- 7 × 1 = 7

### 4. Elemento Absorvente
Multiplicar por 0 sempre dá 0:
- 5 × 0 = 0

## Exemplos Práticos

1. 4 caixas com 6 ovos cada. Quantos ovos no total? **4 × 6 = 24 ovos**
2. 3 pacotes com 8 balas cada. Quantas balas? **3 × 8 = 24 balas**`,
        youtubeVideoId: "rKGhLbHGEQE", // Multiplicação - Matemática Rio
        order: 1,
      },
      {
        title: "Tabuada: Memorizando Produtos",
        slug: "tabuada-memorizando-produtos",
        content: `# Tabuada: Memorizando Produtos

A tabuada é uma tabela que nos ajuda a memorizar os produtos das multiplicações básicas.

## O que é Tabuada?

A tabuada lista os produtos de multiplicações de 1 a 10. Memorizar a tabuada facilita muito os cálculos!

## Tabuada do 2
2 × 1 = 2
2 × 2 = 4
2 × 3 = 6
2 × 4 = 8
2 × 5 = 10
2 × 6 = 12
2 × 7 = 14
2 × 8 = 16
2 × 9 = 18
2 × 10 = 20

## Tabuada do 5
5 × 1 = 5
5 × 2 = 10
5 × 3 = 15
5 × 4 = 20
5 × 5 = 25
5 × 6 = 30
5 × 7 = 35
5 × 8 = 40
5 × 9 = 45
5 × 10 = 50

## Dicas para Memorizar

1. **Tabuada do 2**: Sempre números pares
2. **Tabuada do 5**: Sempre termina em 0 ou 5
3. **Tabuada do 10**: Sempre termina em 0
4. **Tabuada do 9**: A soma dos algarismos sempre dá 9

## Truque da Tabuada do 9
Para 9 × 7:
- Dedo 7 abaixado
- 6 dedos antes (dezenas) = 60
- 3 dedos depois (unidades) = 3
- Resultado: 63`,
        youtubeVideoId: "5wLNTRQqCXY", // Tabuada - Professor Ferretto
        order: 2,
      },
    ],
  },
  
  // Módulo 3: Divisão
  {
    moduleSlug: "divisao",
    lessons: [
      {
        title: "Divisão: Repartindo Igualmente",
        slug: "divisao-repartindo-igualmente",
        content: `# Divisão: Repartindo Igualmente

A divisão é a operação que usamos para repartir quantidades em partes iguais.

## O que é Divisão?

Dividir significa **repartir**, **distribuir** uma quantidade em partes iguais.

## Termos da Divisão

- **Dividendo**: O número que será dividido
- **Divisor**: O número de partes
- **Quociente**: O resultado
- **Resto**: O que sobra (se houver)

Exemplo: 12 ÷ 3 = 4
- 12 é o dividendo
- 3 é o divisor
- 4 é o quociente
- 0 é o resto (divisão exata)

## Relação com a Multiplicação

A divisão é a operação inversa da multiplicação:
- Se 3 × 4 = 12, então 12 ÷ 3 = 4
- Se 12 ÷ 4 = 3, então 3 × 4 = 12

## Tipos de Divisão

### Divisão Exata
Quando o resto é zero:
- 15 ÷ 3 = 5 (resto 0)

### Divisão Inexata
Quando sobra resto:
- 17 ÷ 5 = 3 (resto 2)

## Exemplos Práticos

1. 20 balas para 4 crianças. Quantas cada uma recebe? **20 ÷ 4 = 5 balas**
2. 18 ovos em caixas de 6. Quantas caixas? **18 ÷ 6 = 3 caixas**`,
        youtubeVideoId: "8pCoNjaVZKU", // Divisão - Matemática Rio
        order: 1,
      },
      {
        title: "Algoritmo da Divisão",
        slug: "algoritmo-da-divisao",
        content: `# Algoritmo da Divisão

O algoritmo da divisão é o método passo a passo para fazer divisões.

## Passo a Passo

Vamos dividir 156 ÷ 12:

1. **Quantas vezes 12 cabe em 15?**
   - 1 vez (1 × 12 = 12)
   - Escreva 1 no quociente

2. **Subtraia**: 15 - 12 = 3

3. **Desça o próximo algarismo**: 36

4. **Quantas vezes 12 cabe em 36?**
   - 3 vezes (3 × 12 = 36)
   - Escreva 3 no quociente

5. **Subtraia**: 36 - 36 = 0

**Resultado**: 156 ÷ 12 = 13

## Verificação

Para verificar se a divisão está correta:
- Quociente × Divisor + Resto = Dividendo
- 13 × 12 + 0 = 156 ✓

## Divisão com Resto

Exemplo: 47 ÷ 5

1. Quantas vezes 5 cabe em 47? 9 vezes
2. 9 × 5 = 45
3. 47 - 45 = 2 (resto)

**Resultado**: 47 ÷ 5 = 9 (resto 2)

## Propriedades da Divisão

1. **Dividir por 1**: O resultado é o próprio número
   - 8 ÷ 1 = 8

2. **Dividir por ele mesmo**: O resultado é sempre 1
   - 5 ÷ 5 = 1

3. **Zero dividido por qualquer número**: Resultado é 0
   - 0 ÷ 7 = 0

4. **Não podemos dividir por zero**: Indefinido!`,
        youtubeVideoId: "Ys5jkPVOcqQ", // Algoritmo da Divisão - Professor Ferretto
        order: 2,
      },
    ],
  },
  
  // Módulo 4: Frações
  {
    moduleSlug: "fracoes",
    lessons: [
      {
        title: "O que são Frações?",
        slug: "o-que-sao-fracoes",
        content: `# O que são Frações?

Frações representam partes de um todo.

## Conceito de Fração

Uma fração indica:
- Quantas partes pegamos (numerador)
- Em quantas partes o todo foi dividido (denominador)

Exemplo: 3/4
- 3 = numerador (partes que pegamos)
- 4 = denominador (total de partes)

## Leitura de Frações

- 1/2 = um meio
- 1/3 = um terço
- 1/4 = um quarto
- 1/5 = um quinto
- 2/3 = dois terços
- 3/4 = três quartos

## Tipos de Frações

### Fração Própria
Numerador menor que denominador:
- 3/4, 2/5, 1/3

### Fração Imprópria
Numerador maior ou igual ao denominador:
- 5/4, 7/3, 4/4

### Número Misto
Parte inteira + fração:
- 1 1/2, 2 3/4

## Frações Equivalentes

Frações diferentes que representam a mesma quantidade:
- 1/2 = 2/4 = 3/6 = 4/8

Para encontrar frações equivalentes, multiplicamos ou dividimos numerador e denominador pelo mesmo número.

## Exemplos Práticos

1. Pizza dividida em 8 fatias, você comeu 3: **3/8 da pizza**
2. Barra de chocolate com 12 quadradinhos, você comeu 6: **6/12 = 1/2**`,
        youtubeVideoId: "qfJdDDJPYqM", // Frações - Matemática Rio
        order: 1,
      },
      {
        title: "Operações com Frações",
        slug: "operacoes-com-fracoes",
        content: `# Operações com Frações

Aprendendo a somar, subtrair, multiplicar e dividir frações.

## Adição e Subtração

### Com Denominadores Iguais
Somamos ou subtraímos apenas os numeradores:
- 2/5 + 1/5 = 3/5
- 4/7 - 2/7 = 2/7

### Com Denominadores Diferentes
Precisamos encontrar o MMC (Mínimo Múltiplo Comum):

Exemplo: 1/2 + 1/3
- MMC(2,3) = 6
- 1/2 = 3/6
- 1/3 = 2/6
- 3/6 + 2/6 = 5/6

## Multiplicação de Frações

Multiplicamos numerador com numerador e denominador com denominador:
- 2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2

## Divisão de Frações

Multiplicamos pela fração inversa:
- 2/3 ÷ 1/2 = 2/3 × 2/1 = 4/3

## Simplificação de Frações

Dividir numerador e denominador pelo mesmo número:
- 6/8 = 3/4 (dividimos por 2)
- 12/16 = 3/4 (dividimos por 4)

## Exemplos Práticos

1. **1/4 + 1/2**: MMC(4,2)=4 → 1/4 + 2/4 = 3/4
2. **2/5 × 3/4**: (2×3)/(5×4) = 6/20 = 3/10
3. **3/4 ÷ 1/2**: 3/4 × 2/1 = 6/4 = 3/2 = 1 1/2`,
        youtubeVideoId: "Zn0Rqm0Bvzw", // Operações com Frações - Professor Ferretto
        order: 2,
      },
    ],
  },
  
  // Módulo 5: Números Decimais
  {
    moduleSlug: "numeros-decimais",
    lessons: [
      {
        title: "Introdução aos Números Decimais",
        slug: "introducao-aos-numeros-decimais",
        content: `# Introdução aos Números Decimais

Números decimais são outra forma de representar frações.

## O que são Números Decimais?

Números decimais usam a vírgula para separar:
- **Parte inteira** (antes da vírgula)
- **Parte decimal** (depois da vírgula)

Exemplo: 3,5
- 3 = parte inteira
- 5 = parte decimal (5 décimos)

## Leitura de Decimais

- 0,5 = cinco décimos
- 0,25 = vinte e cinco centésimos
- 0,125 = cento e vinte e cinco milésimos
- 3,7 = três inteiros e sete décimos

## Relação com Frações

- 0,5 = 5/10 = 1/2
- 0,25 = 25/100 = 1/4
- 0,75 = 75/100 = 3/4

## Ordens Decimais

Depois da vírgula:
1. **Décimos** (1 casa): 0,1 = 1/10
2. **Centésimos** (2 casas): 0,01 = 1/100
3. **Milésimos** (3 casas): 0,001 = 1/1000

## Comparação de Decimais

Para comparar, olhamos da esquerda para direita:
- 3,7 > 3,5 (7 décimos > 5 décimos)
- 0,45 > 0,4 (45 centésimos > 40 centésimos)

## Exemplos Práticos

1. Preço: R$ 12,50 (doze reais e cinquenta centavos)
2. Medida: 1,75 m (um metro e setenta e cinco centímetros)
3. Nota: 8,5 (oito e meio)`,
        youtubeVideoId: "kxWJ8mCq1hE", // Números Decimais - Matemática Rio
        order: 1,
      },
      {
        title: "Operações com Decimais",
        slug: "operacoes-com-decimais",
        content: `# Operações com Decimais

Aprendendo a calcular com números decimais.

## Adição e Subtração

**Regra**: Alinhar as vírgulas!

Exemplo: 12,5 + 3,75
\`\`\`
  12,50
+  3,75
-------
  16,25
\`\`\`

Exemplo: 8,3 - 2,15
\`\`\`
  8,30
- 2,15
------
  6,15
\`\`\`

## Multiplicação

Multiplicamos normalmente e contamos as casas decimais:

Exemplo: 2,5 × 3,2
- 25 × 32 = 800
- 2,5 tem 1 casa + 3,2 tem 1 casa = 2 casas
- Resultado: 8,00 = 8

## Divisão

### Por número inteiro
Mantemos a vírgula na mesma posição:

15,6 ÷ 3 = 5,2

### Por decimal
Transformamos em inteiro multiplicando por 10, 100, etc:

12,5 ÷ 2,5
- Multiplicamos ambos por 10
- 125 ÷ 25 = 5

## Conversão Fração ↔ Decimal

### Fração para Decimal
Dividimos numerador por denominador:
- 3/4 = 3 ÷ 4 = 0,75
- 1/2 = 1 ÷ 2 = 0,5

### Decimal para Fração
Contamos as casas decimais:
- 0,5 = 5/10 = 1/2
- 0,25 = 25/100 = 1/4

## Exemplos Práticos

1. **12,50 + 8,75**: R$ 21,25
2. **3,5 × 2**: 7 metros
3. **10 ÷ 4**: 2,5 litros`,
        youtubeVideoId: "7hVmEWHYqEo", // Operações com Decimais - Professor Ferretto
        order: 2,
      },
    ],
  },
];

// Insert lessons
let totalLessons = 0;

for (const moduleData of lessonsData) {
  const module = mods.find((m) => m.slug === moduleData.moduleSlug);
  
  if (!module) {
    console.log(`⚠️  Módulo ${moduleData.moduleSlug} não encontrado`);
    continue;
  }
  
  console.log(`\n📖 Criando aulas para: ${module.name}`);
  
  for (const lesson of moduleData.lessons) {
    await db.insert(modulePages).values({
      moduleId: module.id,
      title: lesson.title,
      slug: lesson.slug,
      content: lesson.content,
      youtubeVideoId: lesson.youtubeVideoId,
      order: lesson.order,
    });
    
    totalLessons++;
    console.log(`  ✓ ${lesson.title}`);
  }
}

console.log(`\n✅ ${totalLessons} aulas criadas com sucesso!`);
