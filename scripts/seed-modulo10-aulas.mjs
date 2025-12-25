import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('📝 Criando aulas do Módulo 10: Estatística Descritiva Básica...\n');

const modulo10Aulas = [
  {
    moduleId: 180010,
    slug: 'medidas-de-tendencia-central',
    title: 'Medidas de Tendência Central',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Medidas de Tendência Central

## 🎯 Objetivo da Aula

Compreender e calcular as três principais medidas de tendência central: média aritmética, mediana e moda, e saber quando usar cada uma.

---

## 📚 O que são Medidas de Tendência Central?

**Medidas de tendência central** são valores que representam o "centro" de um conjunto de dados.

**Principais medidas:**
1. Média Aritmética
2. Mediana
3. Moda

---

## 📊 Média Aritmética

**Média** é a soma de todos os valores dividida pela quantidade de valores.

**Fórmula:** Média = Soma dos valores / Quantidade de valores

**Símbolo:** x̄ (lê-se "x barra")

### Exemplo 1: Notas de um Aluno

Notas: 7, 8, 6, 9, 10

**Cálculo:**
- Soma: 7 + 8 + 6 + 9 + 10 = 40
- Quantidade: 5 notas
- Média: 40 ÷ 5 = 8

**Interpretação:** O aluno tem média 8.

---

### Exemplo 2: Salários

Salários (R$): 2.000, 2.500, 3.000, 2.800, 2.200

**Cálculo:**
- Soma: 12.500
- Quantidade: 5
- Média: 12.500 ÷ 5 = R$ 2.500,00

---

### Exemplo 3: Temperaturas

Temperaturas da semana (°C): 25, 27, 26, 24, 28, 29, 26

**Cálculo:**
- Soma: 185
- Quantidade: 7 dias
- Média: 185 ÷ 7 ≈ 26,4°C

---

## 📈 Mediana

**Mediana** é o valor central quando os dados estão ordenados.

**Método:**
1. Ordenar os valores (crescente ou decrescente)
2. Se quantidade ímpar: valor do meio
3. Se quantidade par: média dos dois valores centrais

### Exemplo 4: Quantidade Ímpar

Idades: 15, 12, 18, 14, 16

**Passo 1:** Ordenar
- 12, 14, **15**, 16, 18

**Passo 2:** Valor central
- Mediana = 15 anos

---

### Exemplo 5: Quantidade Par

Salários (R$): 2.000, 3.000, 2.500, 4.000

**Passo 1:** Ordenar
- 2.000, **2.500, 3.000**, 4.000

**Passo 2:** Média dos centrais
- Mediana = (2.500 + 3.000) ÷ 2 = R$ 2.750,00

---

### Exemplo 6: Com Valores Extremos

Salários (R$): 2.000, 2.200, 2.500, 2.300, 20.000

**Média:**
- (2.000 + 2.200 + 2.500 + 2.300 + 20.000) ÷ 5 = R$ 5.800,00

**Mediana:**
- Ordenar: 2.000, 2.200, **2.300**, 2.500, 20.000
- Mediana = R$ 2.300,00

**Observação:** Mediana é mais representativa quando há valores extremos!

---

## 🎯 Moda

**Moda** é o valor que aparece com maior frequência.

**Características:**
- Pode ter uma moda (unimodal)
- Pode ter duas modas (bimodal)
- Pode ter mais de duas modas (multimodal)
- Pode não ter moda (amodal)

### Exemplo 7: Unimodal

Notas: 7, 8, 7, 9, 7, 6, 8

**Frequência:**
- 6: 1 vez
- 7: 3 vezes ← Maior frequência
- 8: 2 vezes
- 9: 1 vez

**Moda:** 7

---

### Exemplo 8: Bimodal

Idades: 20, 25, 20, 30, 25, 35, 20, 25

**Frequência:**
- 20: 3 vezes ← Empate
- 25: 3 vezes ← Empate
- 30: 1 vez
- 35: 1 vez

**Modas:** 20 e 25 (bimodal)

---

### Exemplo 9: Amodal

Valores: 10, 20, 30, 40, 50

**Frequência:** Todos aparecem 1 vez

**Moda:** Não existe (amodal)

---

## 🔍 Quando Usar Cada Medida?

### Use Média quando:

✅ Dados não têm valores extremos  
✅ Distribuição é simétrica  
✅ Precisa considerar todos os valores  
✅ Exemplo: Notas de uma turma homogênea

### Use Mediana quando:

✅ Há valores extremos (outliers)  
✅ Distribuição é assimétrica  
✅ Quer o "valor típico"  
✅ Exemplo: Salários (CEO ganha muito mais)

### Use Moda quando:

✅ Dados são categóricos  
✅ Quer o valor mais comum  
✅ Exemplo: Cor preferida, tamanho de roupa

---

## 📊 Comparação Prática

### Situação: Salários de uma Empresa

Dados (R$): 2.000, 2.200, 2.500, 2.300, 2.400, 2.200, 15.000

**Média:**
- Soma: 28.600
- Média: 28.600 ÷ 7 ≈ R$ 4.085,71

**Mediana:**
- Ordenar: 2.000, 2.200, 2.200, **2.300**, 2.400, 2.500, 15.000
- Mediana: R$ 2.300,00

**Moda:**
- 2.200 aparece 2 vezes
- Moda: R$ 2.200,00

**Análise:**
- Média distorcida pelo salário de R$ 15.000 (CEO)
- Mediana e moda são mais representativas

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Calcule média, mediana e moda: 5, 7, 3, 7, 9, 7, 4

**Média:**
- Soma: 42
- Média: 42 ÷ 7 = 6

**Mediana:**
- Ordenar: 3, 4, 5, **7**, 7, 7, 9
- Mediana: 7

**Moda:**
- 7 aparece 3 vezes
- Moda: 7

---

### Exercício 2
Idades: 18, 20, 22, 24. Calcule média e mediana.

**Média:**
- (18 + 20 + 22 + 24) ÷ 4 = 21 anos

**Mediana:**
- Ordenado: 18, **20, 22**, 24
- Mediana: (20 + 22) ÷ 2 = 21 anos

**Observação:** Neste caso, média = mediana!

---

### Exercício 3
Vendas diárias: 10, 15, 10, 20, 10, 25, 30. Qual a moda?

**Frequência:**
- 10: 3 vezes ← Maior
- 15: 1 vez
- 20: 1 vez
- 25: 1 vez
- 30: 1 vez

**Moda:** 10 unidades

---

## 💡 Propriedades Importantes

### Média:

- Sensível a valores extremos
- Soma das diferenças para a média = 0
- Única para cada conjunto

### Mediana:

- Resistente a valores extremos
- Divide dados em duas metades iguais
- Pode não ser um valor do conjunto

### Moda:

- Pode não existir
- Pode ter múltiplas modas
- Sempre é um valor do conjunto

---

## 🎓 Resumo da Aula

✅ Média: soma ÷ quantidade  
✅ Mediana: valor central (ordenado)  
✅ Moda: valor mais frequente  
✅ Média sensível a extremos  
✅ Mediana resistente a extremos  
✅ Moda para dados categóricos  
✅ Escolher medida adequada ao contexto

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180010,
    slug: 'interpretacao-de-graficos',
    title: 'Interpretação de Gráficos',
    order: 2,
    estimatedMinutes: 55,
    mainText: `# Interpretação de Gráficos

## 🎯 Objetivo da Aula

Desenvolver habilidades de leitura e interpretação dos principais tipos de gráficos: barras, colunas, linhas e pizza.

---

## 📊 Por que Usar Gráficos?

**Gráficos** transformam dados numéricos em representações visuais, facilitando:

✅ Identificação de padrões  
✅ Comparação de valores  
✅ Visualização de tendências  
✅ Comunicação de informações  
✅ Tomada de decisões

---

## 📊 Gráfico de Barras

**Gráfico de barras** usa barras horizontais para representar dados.

**Características:**
- Barras horizontais
- Comprimento proporcional ao valor
- Ideal para comparar categorias

### Exemplo 1: Vendas por Produto

| Produto   | Vendas |
|-----------|--------|
| A         | 150    |
| B         | 200    |
| C         | 100    |
| D         | 250    |

**Representação:**
\`\`\`
Produto D |████████████████████████ 250
Produto B |████████████████████ 200
Produto A |███████████████ 150
Produto C |██████████ 100
          0    50   100  150  200  250
\`\`\`

**Interpretação:**
- Produto D é o mais vendido (250 unidades)
- Produto C é o menos vendido (100 unidades)
- Diferença D-C: 150 unidades

---

## 📊 Gráfico de Colunas

**Gráfico de colunas** usa barras verticais.

**Características:**
- Barras verticais
- Altura proporcional ao valor
- Ideal para mostrar evolução temporal

### Exemplo 2: Vendas Mensais

| Mês | Vendas (R$) |
|-----|-------------|
| Jan | 10.000      |
| Fev | 12.000      |
| Mar | 15.000      |
| Abr | 13.000      |

**Representação:**
\`\`\`
15k |       ███
    |       ███
    |       ███  ███
12k |   ███ ███  ███
    |   ███ ███  ███
10k | ███ ███ ███ ███
    |─────────────────
      Jan Fev Mar Abr
\`\`\`

**Interpretação:**
- Crescimento de Jan a Mar
- Queda em Abr
- Pico em Mar (R$ 15.000)
- Crescimento total: 30% (Jan-Abr)

---

## 📈 Gráfico de Linhas

**Gráfico de linhas** conecta pontos com linhas.

**Características:**
- Pontos conectados por linhas
- Mostra tendências e variações
- Ideal para séries temporais

### Exemplo 3: Temperatura Semanal

| Dia | Temp (°C) |
|-----|-----------|
| Seg | 22        |
| Ter | 24        |
| Qua | 23        |
| Qui | 25        |
| Sex | 27        |
| Sáb | 26        |
| Dom | 24        |

**Representação:**
\`\`\`
27°|           ●
   |          ╱ ╲
25°|        ●   ╲ ●
   |       ╱     ╲ ╲
23°|  ●  ╱       ╲ ╲
   | ╱ ╲╱         ╲ ●
22°|●               
   |─────────────────
    S T Q Q S S D
\`\`\`

**Interpretação:**
- Tendência de aquecimento (Seg-Sex)
- Pico na Sexta (27°C)
- Resfriamento no fim de semana
- Variação total: 5°C

---

## 🥧 Gráfico de Pizza (Setores)

**Gráfico de pizza** divide um círculo em setores proporcionais.

**Características:**
- Círculo dividido em fatias
- Cada fatia = porcentagem do todo
- Ideal para mostrar composição

### Exemplo 4: Orçamento Familiar

| Categoria    | Valor (R$) | % |
|--------------|------------|---|
| Moradia      | 1.500      | 30% |
| Alimentação  | 1.250      | 25% |
| Transporte   | 1.000      | 20% |
| Educação     | 750        | 15% |
| Lazer        | 500        | 10% |

**Interpretação:**
- Moradia é a maior despesa (30%)
- Lazer é a menor (10%)
- Necessidades básicas (moradia + alimentação) = 55%

---

## 📊 Gráfico de Barras Empilhadas

**Barras empilhadas** mostram composição e comparação.

### Exemplo 5: Vendas por Região e Produto

| Região | Produto A | Produto B | Total |
|--------|-----------|-----------|-------|
| Norte  | 100       | 150       | 250   |
| Sul    | 200       | 100       | 300   |
| Leste  | 150       | 200       | 350   |

**Representação:**
\`\`\`
Leste |████████████████ (A:150) ████████████████████ (B:200)
Sul   |████████████████████████ (A:200) ████████████ (B:100)
Norte |████████████ (A:100) ██████████████████ (B:150)
      0        100       200       300       400
\`\`\`

**Interpretação:**
- Leste tem maior venda total (350)
- Sul vende mais Produto A
- Norte vende mais Produto B

---

## 📈 Leitura Crítica de Gráficos

### Cuidado com:

**1. Escala Manipulada**

Gráfico com eixo Y começando em 90 (não em 0) exagera diferenças.

**2. Gráfico 3D Desnecessário**

Pode distorcer proporções e dificultar leitura.

**3. Falta de Fonte**

Sempre verificar origem dos dados.

**4. Período Selecionado**

Escolha do período pode mudar interpretação.

---

## ✏️ Exercícios de Interpretação

### Exercício 1: Gráfico de Colunas

Vendas trimestrais:
- Q1: R$ 50k
- Q2: R$ 60k
- Q3: R$ 55k
- Q4: R$ 70k

**Perguntas:**
a) Qual trimestre teve maior venda?
b) Qual o crescimento de Q1 para Q4?
c) Houve queda em algum trimestre?

**Respostas:**
a) Q4 (R$ 70k)
b) (70 − 50) / 50 × 100 = 40%
c) Sim, Q3 (queda de R$ 5k em relação a Q2)

---

### Exercício 2: Gráfico de Pizza

Despesas mensais:
- Aluguel: 40%
- Alimentação: 30%
- Transporte: 20%
- Outros: 10%

Renda: R$ 3.000,00

**Perguntas:**
a) Quanto gasta com aluguel?
b) Quanto gasta com alimentação e transporte juntos?
c) Qual categoria tem menor gasto?

**Respostas:**
a) 40% de 3.000 = R$ 1.200,00
b) (30% + 20%) de 3.000 = R$ 1.500,00
c) Outros (10%)

---

### Exercício 3: Gráfico de Linhas

Temperatura diária (°C): 18, 20, 22, 21, 19, 17, 16

**Perguntas:**
a) Qual a temperatura máxima?
b) Em que dia começou a cair?
c) Qual a variação total?

**Respostas:**
a) 22°C (dia 3)
b) Dia 4 (de 22°C para 21°C)
c) 18 − 16 = 2°C de queda

---

## 💡 Dicas de Interpretação

### Checklist:

✅ Ler título e legendas  
✅ Verificar unidades (R$, %, kg, etc.)  
✅ Observar escala dos eixos  
✅ Identificar tendências  
✅ Comparar valores  
✅ Verificar fonte dos dados  
✅ Questionar conclusões

### Perguntas-Chave:

1. O que o gráfico está mostrando?
2. Qual o período analisado?
3. Quais são os valores máximo e mínimo?
4. Há tendência de crescimento ou queda?
5. Os dados são confiáveis?

---

## 🎓 Resumo da Aula

✅ Gráfico de barras: comparação horizontal  
✅ Gráfico de colunas: evolução temporal  
✅ Gráfico de linhas: tendências contínuas  
✅ Gráfico de pizza: composição percentual  
✅ Sempre verificar escala e fonte  
✅ Cuidado com manipulações visuais  
✅ Ler criticamente antes de concluir

---

**Tempo estimado:** 55 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180010,
    slug: 'tabelas-e-frequencias',
    title: 'Tabelas e Frequências',
    order: 3,
    estimatedMinutes: 45,
    mainText: `# Tabelas e Frequências

## 🎯 Objetivo da Aula

Aprender a construir e interpretar tabelas de frequência, organizando dados de forma clara e sistemática.

---

## 📚 O que é uma Tabela de Frequência?

**Tabela de frequência** organiza dados mostrando quantas vezes cada valor aparece.

**Componentes:**
- **Valores/Classes:** Categorias ou intervalos
- **Frequência Absoluta (f):** Número de ocorrências
- **Frequência Relativa (fr):** Proporção do total
- **Frequência Percentual (f%):** Porcentagem do total

---

## 📊 Frequência Absoluta

**Frequência absoluta** é a contagem simples de ocorrências.

### Exemplo 1: Notas de uma Turma

Notas: 7, 8, 7, 9, 6, 7, 8, 10, 7, 6

**Tabela de Frequência:**

| Nota | Frequência (f) |
|------|----------------|
| 6    | 2              |
| 7    | 4              |
| 8    | 2              |
| 9    | 1              |
| 10   | 1              |
| **Total** | **10**    |

**Interpretação:**
- Nota 7 é a mais comum (4 alunos)
- Notas 9 e 10 são as menos comuns (1 aluno cada)

---

## 📈 Frequência Relativa

**Frequência relativa** é a proporção de cada valor em relação ao total.

**Fórmula:** fr = f / n

Onde:
- f = frequência absoluta
- n = total de observações

### Exemplo 2: Continuação do Exemplo 1

| Nota | f | fr    |
|------|---|-------|
| 6    | 2 | 0,20  |
| 7    | 4 | 0,40  |
| 8    | 2 | 0,20  |
| 9    | 1 | 0,10  |
| 10   | 1 | 0,10  |
| **Total** | **10** | **1,00** |

**Cálculo:**
- Nota 6: 2/10 = 0,20
- Nota 7: 4/10 = 0,40

**Verificação:** Soma das fr = 1,00 ✓

---

## 📊 Frequência Percentual

**Frequência percentual** é a frequência relativa em porcentagem.

**Fórmula:** f% = (f / n) × 100

### Exemplo 3: Tabela Completa

| Nota | f | fr   | f%   |
|------|---|------|------|
| 6    | 2 | 0,20 | 20%  |
| 7    | 4 | 0,40 | 40%  |
| 8    | 2 | 0,20 | 20%  |
| 9    | 1 | 0,10 | 10%  |
| 10   | 1 | 0,10 | 10%  |
| **Total** | **10** | **1,00** | **100%** |

**Interpretação:**
- 40% da turma tirou nota 7
- 20% tirou nota 6 ou 8

---

## 📋 Frequência Acumulada

**Frequência acumulada** soma as frequências até determinado valor.

### Exemplo 4: Frequência Acumulada

| Nota | f | F (acumulada) |
|------|---|---------------|
| 6    | 2 | 2             |
| 7    | 4 | 6             |
| 8    | 2 | 8             |
| 9    | 1 | 9             |
| 10   | 1 | 10            |

**Interpretação:**
- 6 alunos tiraram nota ≤ 7
- 8 alunos tiraram nota ≤ 8

---

## 📊 Dados Agrupados em Classes

Quando há muitos valores diferentes, agrupamos em **intervalos de classe**.

### Exemplo 5: Alturas de Alunos

Dados (cm): 160, 165, 170, 162, 175, 168, 172, 158, 180, 165, 170, 163, 177, 169, 171

**Tabela com Classes:**

| Altura (cm) | f | fr   | f%   |
|-------------|---|------|------|
| 155 ├ 160   | 1 | 0,07 | 7%   |
| 160 ├ 165   | 3 | 0,20 | 20%  |
| 165 ├ 170   | 4 | 0,27 | 27%  |
| 170 ├ 175   | 4 | 0,27 | 27%  |
| 175 ├ 180   | 2 | 0,13 | 13%  |
| 180 ├ 185   | 1 | 0,07 | 7%   |
| **Total**   | **15** | **1,00** | **100%** |

**Notação:** 155 ├ 160 significa "de 155 (inclusive) até 160 (exclusive)"

**Interpretação:**
- Maioria dos alunos tem entre 165 e 175 cm (54%)
- Distribuição aproximadamente simétrica

---

## 🔢 Ponto Médio da Classe

**Ponto médio** representa o valor central de cada classe.

**Fórmula:** PM = (Limite inferior + Limite superior) / 2

### Exemplo 6: Calculando Pontos Médios

| Classe      | PM    |
|-------------|-------|
| 155 ├ 160   | 157,5 |
| 160 ├ 165   | 162,5 |
| 165 ├ 170   | 167,5 |
| 170 ├ 175   | 172,5 |
| 175 ├ 180   | 177,5 |
| 180 ├ 185   | 182,5 |

**Uso:** Calcular média aproximada de dados agrupados.

---

## 📊 Construindo uma Tabela de Frequência

### Passo a Passo:

**1. Coletar os dados**

Exemplo: Idades de 20 pessoas
18, 22, 25, 18, 30, 22, 25, 28, 22, 30, 18, 25, 22, 28, 30, 25, 22, 28, 30, 25

**2. Ordenar os dados**

18, 18, 18, 22, 22, 22, 22, 22, 25, 25, 25, 25, 25, 28, 28, 28, 30, 30, 30, 30

**3. Contar frequências**

| Idade | Contagem | f |
|-------|----------|---|
| 18    | |||      | 3 |
| 22    | |||||    | 5 |
| 25    | |||||    | 5 |
| 28    | |||      | 3 |
| 30    | ||||     | 4 |

**4. Calcular fr e f%**

| Idade | f | fr   | f%   |
|-------|---|------|------|
| 18    | 3 | 0,15 | 15%  |
| 22    | 5 | 0,25 | 25%  |
| 25    | 5 | 0,25 | 25%  |
| 28    | 3 | 0,15 | 15%  |
| 30    | 4 | 0,20 | 20%  |
| **Total** | **20** | **1,00** | **100%** |

---

## ✏️ Exercícios Resolvidos

### Exercício 1

Número de filhos de 15 famílias: 0, 1, 2, 1, 0, 3, 2, 1, 2, 0, 1, 2, 3, 1, 2

Construa a tabela de frequência.

**Solução:**

| Filhos | f | f%   |
|--------|---|------|
| 0      | 3 | 20%  |
| 1      | 5 | 33%  |
| 2      | 5 | 33%  |
| 3      | 2 | 13%  |
| **Total** | **15** | **100%** |

---

### Exercício 2

Em uma pesquisa, 40% preferem produto A, 35% produto B e 25% produto C. Se 200 pessoas foram entrevistadas, quantas preferem cada produto?

**Solução:**

| Produto | f%  | f (pessoas) |
|---------|-----|-------------|
| A       | 40% | 80          |
| B       | 35% | 70          |
| C       | 25% | 50          |
| **Total** | **100%** | **200** |

**Cálculo:**
- A: 40% de 200 = 80
- B: 35% de 200 = 70
- C: 25% de 200 = 50

---

## 💡 Dicas Práticas

### Ao Construir Tabelas:

✅ Ordenar dados facilita contagem  
✅ Usar marcas de contagem (||||)  
✅ Verificar se soma de f = total  
✅ Verificar se soma de fr = 1,00  
✅ Verificar se soma de f% = 100%  
✅ Escolher número adequado de classes (5-10)  
✅ Classes com mesma amplitude

### Ao Interpretar:

✅ Identificar valor mais frequente (moda)  
✅ Observar distribuição dos dados  
✅ Calcular porcentagens acumuladas  
✅ Comparar frequências relativas

---

## 🎓 Resumo da Aula

✅ Frequência absoluta: contagem simples  
✅ Frequência relativa: proporção (f/n)  
✅ Frequência percentual: (f/n) × 100  
✅ Frequência acumulada: soma até o valor  
✅ Classes: agrupar dados semelhantes  
✅ Ponto médio: (Li + Ls) / 2  
✅ Soma de fr = 1,00 e f% = 100%

---

**Tempo estimado:** 45 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180010,
    slug: 'porcentagens-em-estatistica-aplicada',
    title: 'Análise Estatística Aplicada',
    order: 4,
    estimatedMinutes: 50,
    mainText: `# Análise Estatística Aplicada

## 🎯 Objetivo da Aula

Integrar conhecimentos de estatística descritiva para analisar dados reais de mercado, política, saúde e pesquisas.

---

## 📊 Análise de Pesquisas de Mercado

### Caso 1: Satisfação do Cliente

Uma empresa pesquisou 500 clientes sobre satisfação:

| Avaliação      | Frequência | % |
|----------------|------------|---|
| Muito Satisfeito | 200      | 40% |
| Satisfeito     | 180        | 36% |
| Neutro         | 80         | 16% |
| Insatisfeito   | 30         | 6%  |
| Muito Insatisfeito | 10     | 2%  |
| **Total**      | **500**    | **100%** |

**Análise:**

**Medidas de Tendência:**
- Moda: "Muito Satisfeito" (40%)
- 76% estão satisfeitos ou muito satisfeitos
- Apenas 8% estão insatisfeitos

**Conclusões:**
✅ Alta satisfação geral (76%)  
✅ Baixa insatisfação (8%)  
⚠️ 16% neutros podem ser convertidos

**Recomendações:**
- Manter qualidade atual
- Investigar motivos dos 8% insatisfeitos
- Estratégias para converter os 16% neutros

---

## 🗳️ Análise de Pesquisas Eleitorais

### Caso 2: Intenção de Voto

Pesquisa com 2.000 eleitores (margem de erro: ±2%):

| Candidato | Votos | % | Intervalo |
|-----------|-------|---|-----------|
| A         | 840   | 42% | 40-44% |
| B         | 700   | 35% | 33-37% |
| C         | 300   | 15% | 13-17% |
| Brancos/Nulos | 100 | 5% | 3-7% |
| Indecisos | 60    | 3% | 1-5% |

**Análise:**

**Cenário Atual:**
- Candidato A lidera com 42%
- Diferença A-B: 7 pontos percentuais
- Candidato C distante (15%)

**Considerando Margem de Erro:**
- Pior cenário para A: 40%
- Melhor cenário para B: 37%
- Diferença mínima: 3 pontos
- **Não há empate técnico**

**Cenários Possíveis:**

**Cenário 1 (Provável):**
- A vence no 1º turno (>50% com brancos/nulos)
- Precisa converter indecisos

**Cenário 2 (Possível):**
- 2º turno entre A e B
- C pode definir resultado

---

## 🏥 Análise de Dados de Saúde

### Caso 3: Eficácia de Tratamento

Estudo com 1.000 pacientes:

| Resultado | Grupo Tratamento | Grupo Controle |
|-----------|------------------|----------------|
| Curado    | 450 (90%)        | 300 (60%)      |
| Melhorou  | 40 (8%)          | 150 (30%)      |
| Sem mudança | 10 (2%)        | 50 (10%)       |
| **Total** | **500**          | **500**        |

**Análise Comparativa:**

**Taxa de Cura:**
- Tratamento: 90%
- Controle: 60%
- **Diferença: 30 pontos percentuais**

**Taxa de Melhora (cura + melhora):**
- Tratamento: 98%
- Controle: 90%
- **Diferença: 8 pontos percentuais**

**Conclusões:**
✅ Tratamento é significativamente mais eficaz  
✅ 30% mais chances de cura  
✅ Quase todos melhoram (98%)  
✅ Resultado estatisticamente significativo

---

## 📈 Análise de Crescimento Empresarial

### Caso 4: Vendas Trimestrais

| Trimestre | Vendas (R$) | Crescimento |
|-----------|-------------|-------------|
| Q1/2023   | 100.000     | -           |
| Q2/2023   | 120.000     | +20%        |
| Q3/2023   | 132.000     | +10%        |
| Q4/2023   | 145.200     | +10%        |
| Q1/2024   | 160.720     | +10,7%      |

**Análise:**

**Medidas Descritivas:**
- Média de vendas: R$ 131.584
- Mediana: R$ 132.000
- Crescimento médio: 12,7% por trimestre

**Tendência:**
- Crescimento consistente
- Aceleração no início (Q2: +20%)
- Estabilização posterior (+10% trimestral)

**Projeção Q2/2024:**
- Mantendo +10%: R$ 176.792
- Crescimento anual: 60,7%

**Conclusões:**
✅ Trajetória positiva  
✅ Crescimento sustentável  
✅ Previsão otimista para 2024

---

## 🎓 Análise de Desempenho Escolar

### Caso 5: Notas de uma Turma

40 alunos, notas de 0 a 10:

| Faixa | Alunos | % | Conceito |
|-------|--------|---|----------|
| 9-10  | 8      | 20% | Excelente |
| 7-8,9 | 16     | 40% | Bom |
| 5-6,9 | 12     | 30% | Regular |
| 0-4,9 | 4      | 10% | Insuficiente |

**Medidas Calculadas:**
- Média da turma: 7,2
- Mediana: 7,5
- Moda: 8,0

**Análise:**

**Distribuição:**
- 60% com conceito bom ou excelente
- 30% precisam melhorar
- 10% em recuperação

**Comparação com Meta (média 7,5):**
- Turma está 0,3 pontos abaixo
- Mediana já atingiu a meta
- Média puxada para baixo pelos 10% insuficientes

**Recomendações:**
- Reforço para os 10% insuficientes
- Manter estratégias atuais para maioria
- Desafios extras para os 20% excelentes

---

## 💰 Análise de Distribuição de Renda

### Caso 6: Salários de uma Empresa

100 funcionários:

| Faixa Salarial (R$) | Funcionários | % |
|---------------------|--------------|---|
| 1.500-3.000         | 40           | 40% |
| 3.000-5.000         | 30           | 30% |
| 5.000-8.000         | 20           | 20% |
| 8.000-15.000        | 8            | 8% |
| Acima de 15.000     | 2            | 2% |

**Medidas:**
- Média: R$ 5.200
- Mediana: R$ 3.800
- Moda: Faixa 1.500-3.000

**Análise:**

**Desigualdade:**
- Média > Mediana (distribuição assimétrica)
- 70% ganham até R$ 5.000
- 10% ganham acima de R$ 8.000

**Interpretação:**
- Concentração na base (40% até R$ 3.000)
- Poucos salários muito altos distorcem média
- Mediana mais representativa que média

---

## ✏️ Exercício Integrador

### Situação: Lançamento de Produto

Pesquisa com 800 consumidores:

| Intenção de Compra | Frequência | % |
|--------------------|------------|---|
| Certamente compraria | 240      | 30% |
| Provavelmente compraria | 320   | 40% |
| Talvez comprasse   | 160        | 20% |
| Provavelmente não  | 60         | 7,5% |
| Certamente não     | 20         | 2,5% |

**Perguntas:**

1. Qual a taxa de aceitação (certamente + provavelmente)?
2. Qual a taxa de rejeição?
3. Se o mercado tem 1 milhão de pessoas, quantas comprariam?
4. O produto deve ser lançado?

**Respostas:**

1. Taxa de aceitação: 30% + 40% = 70%
2. Taxa de rejeição: 7,5% + 2,5% = 10%
3. Compradores potenciais: 70% de 1M = 700 mil
4. **Sim!** 70% de aceitação é excelente

---

## 🎓 Resumo da Aula

✅ Integrar frequências, médias e gráficos  
✅ Analisar dados de mercado criticamente  
✅ Considerar margem de erro em pesquisas  
✅ Comparar grupos (tratamento vs controle)  
✅ Identificar tendências e padrões  
✅ Fazer recomendações baseadas em dados  
✅ Comunicar resultados de forma clara

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
];

for (const aula of modulo10Aulas) {
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

console.log('\n🎉 Módulo 10 completo: 4 aulas criadas!');
console.log('📊 Progresso: 20/20 aulas (100%) ✅✅✅✅✅');
console.log('\n🎊 TODAS AS 20 AULAS DE ARITMÉTICA INTERMEDIÁRIA FORAM CRIADAS!');

await conn.end();
