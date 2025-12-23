import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { pages } from "./drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

// Conteúdo expandido para as primeiras páginas
const expandedContent = {
  "adicao-o-que-e-adicionar": {
    mainText: `# O que é Adicionar (Combinar)?

## Introdução ao Conceito

**Adicionar** é uma das operações matemáticas mais fundamentais e intuitivas. No seu núcleo, adicionar significa **combinar** ou **juntar** quantidades para formar um total maior. É uma operação que usamos naturalmente no dia a dia, muitas vezes sem perceber.

## O Conceito de Combinar

Quando você adiciona, está essencialmente **reunindo grupos** de objetos ou valores. Imagine que você tem:

- 3 maçãs em uma cesta
- 5 maçãs em outra cesta

Quando você **combina** essas cestas, quantas maçãs você tem no total? A resposta é **8 maçãs**.

Matematicamente, escrevemos: $$3 + 5 = 8$$

### Vocabulário Importante

- **Parcelas**: Os números que estamos somando (3 e 5)
- **Soma** ou **Total**: O resultado da adição (8)
- **Sinal de mais (+)**: Indica que estamos combinando quantidades

## Exemplos do Cotidiano

### Exemplo 1: Dinheiro

Você tem R$ 20 na carteira e ganha mais R$ 15. Quanto você tem agora?

$$20 + 15 = 35$$

Você tem **R$ 35** no total.

### Exemplo 2: Tempo

Você estuda 30 minutos de manhã e 45 minutos à tarde. Quanto tempo você estudou no total?

$$30 + 45 = 75$$

Você estudou **75 minutos** (ou 1 hora e 15 minutos).

### Exemplo 3: Compras

No supermercado, você compra:
- 2 kg de arroz
- 3 kg de feijão  
- 1 kg de açúcar

Quantos quilos você comprou no total?

$$2 + 3 + 1 = 6$$

Você comprou **6 kg** de produtos.

## Propriedades da Adição

### 1. Propriedade Comutativa

A ordem das parcelas **não altera** a soma:

$$3 + 5 = 5 + 3 = 8$$

Não importa se você soma 3 + 5 ou 5 + 3, o resultado é sempre 8.

### 2. Elemento Neutro (Zero)

Quando você adiciona **zero** a qualquer número, o resultado é o próprio número:

$$7 + 0 = 7$$
$$0 + 15 = 15$$

O zero não muda o valor original.

### 3. Propriedade Associativa

Quando somamos três ou mais números, podemos agrupar de diferentes formas:

$$(2 + 3) + 4 = 2 + (3 + 4) = 9$$

Ambas as formas resultam em 9.

## Visualização Concreta

Imagine que você tem blocos:

- Grupo A: ■ ■ ■ (3 blocos)
- Grupo B: ■ ■ ■ ■ ■ (5 blocos)

Quando você **junta** os grupos:

■ ■ ■ ■ ■ ■ ■ ■ (8 blocos no total)

## Adição com Números Maiores

O conceito permanece o mesmo, independente do tamanho dos números:

$$125 + 237 = 362$$

Você está combinando 125 unidades com 237 unidades para obter 362 unidades.

## Resumo dos Conceitos

- Adicionar = **Combinar** quantidades
- Usamos o símbolo **+** para indicar adição
- O resultado é chamado de **soma** ou **total**
- A ordem não importa: $a + b = b + a$
- Adicionar zero não muda o valor
- Aplicamos adição constantemente no dia a dia

## Reflexão

Pense em situações da sua vida onde você usa adição:
- Calcular o total de uma compra
- Somar horas trabalhadas
- Contar dinheiro
- Medir ingredientes em receitas
- Planejar orçamentos

A adição está em toda parte!`,
    estimatedMinutes: 45
  },
  
  "adicao-reta-numerica": {
    mainText: `# A Reta Numérica

## O que é uma Reta Numérica?

A **reta numérica** é uma representação visual dos números dispostos em uma linha reta. É uma ferramenta poderosa para entender operações matemáticas, especialmente a adição.

## Estrutura da Reta Numérica

\`\`\`
... ←─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────→ ...
        0     1     2     3     4     5     6     7
\`\`\`

### Características

- **Zero** está no centro (ponto de referência)
- Números **positivos** à direita do zero
- Números **negativos** à esquerda do zero (veremos mais tarde)
- A distância entre números consecutivos é sempre a mesma

## Adição na Reta Numérica

Adicionar na reta numérica significa **mover para a direita**.

### Exemplo 1: $3 + 2 = ?$

1. Comece no número **3**
2. Mova **2 posições para a direita**
3. Você chega no número **5**

\`\`\`
Início: 3
        ↓
... ─────┼─────┼─────┼─────┼─────┼─────┼─────→
        0     1     2     3     4     5     6
                          └─→─→─┘
                          +2 = 5
\`\`\`

### Exemplo 2: $4 + 3 = ?$

1. Comece no **4**
2. Mova **3 posições para a direita**
3. Resultado: **7**

\`\`\`
        ↓ início
... ─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────→
        0     1     2     3     4     5     6     7
                                └─→─→─→─┘
                                  +3 = 7
\`\`\`

## Adição com Zero

Quando adicionamos zero, **não nos movemos**:

$$5 + 0 = 5$$

\`\`\`
        ↓ início e fim
... ─────┼─────┼─────┼─────┼─────┼─────→
        0     1     2     3     4     5
                                ○ (fica no mesmo lugar)
\`\`\`

## Adições Sucessivas

Podemos fazer várias adições seguidas:

$$2 + 3 + 1 = ?$$

1. Comece no **2**
2. Mova **3 para a direita** → chega em **5**
3. Mova **1 para a direita** → chega em **6**

\`\`\`
  ↓ início
──┼─────┼─────┼─────┼─────┼─────┼─────→
  0     1     2     3     4     5     6
              └─→─→─→─┘     
                +3=5
                      └─→─┘
                       +1=6
\`\`\`

## Comparando Quantidades

A reta numérica também ajuda a **comparar** números:

- Números à **direita** são **maiores**
- Números à **esquerda** são **menores**

Exemplo: $5 > 3$ porque 5 está à direita de 3.

## Exercício Mental

Visualize a reta numérica mentalmente:

1. **$6 + 2 = ?$**
   - Comece em 6, mova 2 para direita → **8**

2. **$1 + 4 = ?$**
   - Comece em 1, mova 4 para direita → **5**

3. **$7 + 3 = ?$**
   - Comece em 7, mova 3 para direita → **10**

## Aplicação Prática

### Exemplo: Planejamento de Tempo

Você tem uma reunião às **14h** que dura **2 horas**. Que horas termina?

\`\`\`
Horários: ... ─────┼─────┼─────┼─────┼─────→
                   12    13    14    15    16
                               └─→─→─┘
                                +2 = 16h
\`\`\`

A reunião termina às **16h**.

## Resumo dos Conceitos

- Reta numérica = representação visual dos números
- Adicionar = mover para a **direita**
- Cada "salto" representa uma unidade adicionada
- Zero = ponto de referência (não se move)
- Ferramenta útil para visualizar operações

## Dica Importante

Sempre que tiver dúvida em uma adição, **desenhe uma reta numérica** simples e visualize o movimento. Isso torna o conceito muito mais claro!`,
    estimatedMinutes: 50
  }
};

async function expandContent() {
  console.log("🚀 Iniciando expansão de conteúdo...\n");
  
  for (const [slug, content] of Object.entries(expandedContent)) {
    try {
      const result = await db.update(pages)
        .set({
          mainText: content.mainText,
          estimatedMinutes: content.estimatedMinutes
        })
        .where(eq(pages.slug, slug));
      
      console.log(`✅ Página "${slug}" expandida com sucesso`);
    } catch (error) {
      console.error(`❌ Erro ao expandir "${slug}":`, error.message);
    }
  }
  
  console.log("\n✨ Expansão de conteúdo concluída!");
  process.exit(0);
}

expandContent();
