import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('📝 Criando aulas do Módulo 8: Razão, Proporção e Regra de Três...\n');

const modulo8Aulas = [
  {
    moduleId: 180008,
    slug: 'razao-e-proporcao',
    title: 'Razão e Proporção',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Razão e Proporção

## 🎯 Objetivo da Aula

Compreender os conceitos de razão e proporção, suas propriedades e aplicações em problemas práticos do cotidiano.

---

## 📚 O que é Razão?

**Razão** é a comparação entre duas grandezas por meio de uma divisão.

**Notação:** a:b ou a/b

**Lê-se:** "a está para b" ou "a para b"

### Exemplos Práticos:

**1) Receita de Suco:**
- 2 laranjas para 1 copo de água
- Razão: 2:1 ou 2/1

**2) Velocidade:**
- 120 km em 2 horas
- Razão: 120:2 = 60 km/h

**3) Densidade Demográfica:**
- 1.000 habitantes em 5 km²
- Razão: 1.000:5 = 200 hab/km²

---

## 🔢 Tipos de Razão

### 1. Razão entre Números

**Exemplo:** Numa sala com 15 meninos e 10 meninas, qual a razão meninos/meninas?

**Solução:**
- Razão = 15:10 = 3:2 (simplificada)
- Para cada 3 meninos, há 2 meninas

### 2. Razão entre Grandezas de Mesma Espécie

**Exemplo:** Uma corda de 8m é dividida em pedaços de 2m e 6m. Qual a razão entre eles?

**Solução:**
- Razão = 2:6 = 1:3
- O menor pedaço é 1/3 do maior

### 3. Razão entre Grandezas de Espécies Diferentes

**Exemplo:** Um carro percorre 300 km com 25 litros. Qual o consumo?

**Solução:**
- Razão = 300:25 = 12 km/litro

---

## 📐 O que é Proporção?

**Proporção** é uma igualdade entre duas razões.

**Notação:** a:b = c:d ou a/b = c/d

**Lê-se:** "a está para b assim como c está para d"

### Propriedade Fundamental da Proporção:

**Em toda proporção, o produto dos extremos é igual ao produto dos meios.**

**a × d = b × c**

**Exemplo:** Verifique se 2:3 = 4:6 é uma proporção.

**Solução:**
- Extremos: 2 e 6
- Meios: 3 e 4
- 2 × 6 = 12
- 3 × 4 = 12
- ✅ É uma proporção!

---

## 🧮 Encontrando o Termo Desconhecido

### Método: Multiplicação Cruzada

**Exemplo 1:** Encontre x: 3:5 = x:15

**Solução:**
- 3 × 15 = 5 × x
- 45 = 5x
- x = 9

**Exemplo 2:** Encontre y: 2:y = 8:12

**Solução:**
- 2 × 12 = y × 8
- 24 = 8y
- y = 3

**Exemplo 3:** Encontre z: 7:3 = 21:z

**Solução:**
- 7 × z = 3 × 21
- 7z = 63
- z = 9

---

## 📊 Grandezas Proporcionais

### Grandezas Diretamente Proporcionais

**Definição:** Quando uma aumenta, a outra aumenta na mesma proporção.

**Exemplos:**
- Velocidade constante: mais tempo → mais distância
- Preço unitário fixo: mais produtos → mais custo
- Receita culinária: dobrar ingredientes → dobrar quantidade

**Exemplo Prático:**
Se 3 kg de arroz custam R$ 12,00, quanto custam 5 kg?

**Solução:**
- 3:5 = 12:x
- 3x = 60
- x = R$ 20,00

### Grandezas Inversamente Proporcionais

**Definição:** Quando uma aumenta, a outra diminui na mesma proporção.

**Exemplos:**
- Velocidade × Tempo (distância fixa)
- Número de trabalhadores × Tempo de obra
- Torneiras × Tempo para encher tanque

**Exemplo Prático:**
4 operários fazem um serviço em 12 dias. Quantos dias levarão 6 operários?

**Solução:**
- Mais operários → menos dias (inversa)
- 4 × 12 = 6 × x
- 48 = 6x
- x = 8 dias

---

## 🗺️ Escala

**Escala** é a razão entre uma medida no desenho e a medida real.

**Fórmula:** Escala = Medida no desenho / Medida real

### Exemplo 1: Mapa

Um mapa tem escala 1:1.000.000. Uma distância de 5 cm no mapa representa quantos km reais?

**Solução:**
- 1 cm no mapa = 1.000.000 cm reais
- 5 cm no mapa = 5 × 1.000.000 = 5.000.000 cm
- Converter para km: 5.000.000 cm = 50 km

### Exemplo 2: Planta de Casa

Uma planta tem escala 1:50. Uma parede de 6 cm na planta tem quantos metros reais?

**Solução:**
- 1 cm na planta = 50 cm reais
- 6 cm na planta = 6 × 50 = 300 cm = 3 metros

---

## 💰 Aplicações Financeiras

### Exemplo 1: Divisão Proporcional Simples

Dividir R$ 600,00 entre Ana e Bruno na razão 2:3.

**Solução:**
- Total de partes: 2 + 3 = 5
- Valor de cada parte: 600 ÷ 5 = 120
- Ana (2 partes): 2 × 120 = R$ 240,00
- Bruno (3 partes): 3 × 120 = R$ 360,00

### Exemplo 2: Sociedade

Três sócios investiram R$ 10.000, R$ 15.000 e R$ 25.000. Lucro de R$ 20.000 será dividido proporcionalmente. Quanto cada um recebe?

**Solução:**
- Total investido: 50.000
- Razão dos investimentos: 10:15:25 = 2:3:5
- Total de partes: 2 + 3 + 5 = 10
- Valor por parte: 20.000 ÷ 10 = 2.000
- Sócio 1: 2 × 2.000 = R$ 4.000
- Sócio 2: 3 × 2.000 = R$ 6.000
- Sócio 3: 5 × 2.000 = R$ 10.000

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Numa escola, a razão entre meninos e meninas é 3:2. Se há 90 meninos, quantas meninas há?

**Solução:**
- 3:2 = 90:x
- 3x = 180
- x = 60 meninas

### Exercício 2
Um carro percorre 240 km em 3 horas. Mantendo a velocidade, quantos km percorre em 5 horas?

**Solução:**
- Grandezas diretamente proporcionais
- 3:5 = 240:x
- 3x = 1.200
- x = 400 km

### Exercício 3
6 torneiras enchem um tanque em 4 horas. Quantas torneiras enchem em 3 horas?

**Solução:**
- Grandezas inversamente proporcionais
- 6 × 4 = x × 3
- 24 = 3x
- x = 8 torneiras

---

## 🎓 Resumo da Aula

✅ Razão = comparação por divisão (a:b)  
✅ Proporção = igualdade de razões (a:b = c:d)  
✅ Propriedade fundamental: a × d = b × c  
✅ Diretamente proporcional: aumenta junto  
✅ Inversamente proporcional: uma aumenta, outra diminui  
✅ Escala = medida desenho / medida real  
✅ Aplicações em finanças, mapas e sociedades

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180008,
    slug: 'regra-de-tres-simples',
    title: 'Regra de Três Simples',
    order: 2,
    estimatedMinutes: 55,
    mainText: `# Regra de Três Simples

## 🎯 Objetivo da Aula

Dominar a técnica da regra de três simples para resolver problemas envolvendo duas grandezas proporcionais.

---

## 📚 O que é Regra de Três Simples?

**Regra de três simples** é um método prático para resolver problemas que envolvem **duas grandezas proporcionais**.

**Estrutura:**
- 2 grandezas
- 3 valores conhecidos
- 1 valor desconhecido (x)

---

## 🔄 Tipos de Proporcionalidade

### 1. Diretamente Proporcional

**Característica:** Quando uma grandeza aumenta, a outra também aumenta na mesma proporção.

**Exemplos:**
- Mais produtos → mais custo
- Mais tempo (velocidade constante) → mais distância
- Mais trabalhadores (mesma produtividade) → mais produção

**Regra:** Multiplica em cruz (×)

### 2. Inversamente Proporcional

**Característica:** Quando uma grandeza aumenta, a outra diminui na mesma proporção.

**Exemplos:**
- Mais velocidade → menos tempo
- Mais trabalhadores → menos tempo
- Mais torneiras → menos tempo

**Regra:** Multiplica em linha (=)

---

## 🔧 Método Passo a Passo

### Passo 1: Identificar as Grandezas

Quais são as duas grandezas envolvidas?

### Passo 2: Montar a Tabela

| Grandeza 1 | Grandeza 2 |
|------------|------------|
| valor 1    | valor 2    |
| valor 3    | x          |

### Passo 3: Determinar o Tipo de Proporcionalidade

**Pergunta-chave:** Se a primeira grandeza aumenta, a segunda aumenta ou diminui?

- **Aumenta:** Diretamente proporcional
- **Diminui:** Inversamente proporcional

### Passo 4: Montar a Proporção

**Direta:** valor1/valor3 = valor2/x

**Inversa:** valor1/valor3 = x/valor2

### Passo 5: Resolver

Multiplicação cruzada e isolar x.

---

## 📝 Exemplos Resolvidos - Direta

### Exemplo 1: Compras no Supermercado

Se 3 kg de carne custam R$ 45,00, quanto custam 7 kg?

**Passo 1:** Grandezas: kg de carne e preço

**Passo 2:** Tabela

| kg | Preço (R$) |
|----|------------|
| 3  | 45         |
| 7  | x          |

**Passo 3:** Mais kg → mais preço (DIRETA)

**Passo 4:** Proporção
- 3/7 = 45/x

**Passo 5:** Resolver
- 3x = 7 × 45
- 3x = 315
- x = R$ 105,00

---

### Exemplo 2: Velocidade Constante

Um carro a 80 km/h percorre 240 km. Quanto percorreria a 100 km/h no mesmo tempo?

**Passo 1:** Grandezas: velocidade e distância

**Passo 2:** Tabela

| Velocidade (km/h) | Distância (km) |
|-------------------|----------------|
| 80                | 240            |
| 100               | x              |

**Passo 3:** Mais velocidade → mais distância (DIRETA)

**Passo 4:** Proporção
- 80/100 = 240/x

**Passo 5:** Resolver
- 80x = 24.000
- x = 300 km

---

### Exemplo 3: Produção

5 máquinas produzem 200 peças por dia. Quantas peças produzem 8 máquinas?

**Solução:**

| Máquinas | Peças |
|----------|-------|
| 5        | 200   |
| 8        | x     |

- Mais máquinas → mais peças (DIRETA)
- 5/8 = 200/x
- 5x = 1.600
- x = 320 peças

---

## 📝 Exemplos Resolvidos - Inversa

### Exemplo 4: Velocidade e Tempo

Um carro a 60 km/h faz um trajeto em 4 horas. Em quanto tempo faria a 80 km/h?

**Passo 1:** Grandezas: velocidade e tempo

**Passo 2:** Tabela

| Velocidade (km/h) | Tempo (h) |
|-------------------|-----------|
| 60                | 4         |
| 80                | x         |

**Passo 3:** Mais velocidade → menos tempo (INVERSA)

**Passo 4:** Proporção (INVERSA!)
- 60/80 = x/4

**Passo 5:** Resolver
- 80x = 240
- x = 3 horas

---

### Exemplo 5: Trabalhadores e Tempo

6 operários constroem um muro em 12 dias. Quantos dias levariam 9 operários?

**Solução:**

| Operários | Dias |
|-----------|------|
| 6         | 12   |
| 9         | x    |

- Mais operários → menos dias (INVERSA)
- 6/9 = x/12
- 9x = 72
- x = 8 dias

---

### Exemplo 6: Torneiras

4 torneiras enchem um tanque em 6 horas. Quantas torneiras enchem em 3 horas?

**Solução:**

| Torneiras | Horas |
|-----------|-------|
| 4         | 6     |
| x         | 3     |

- Mais torneiras → menos tempo (INVERSA)
- 4/x = 3/6
- 3x = 24
- x = 8 torneiras

---

## 💡 Dicas para Não Errar

### Como Identificar o Tipo?

**Método da Seta:**

1. Desenhe setas indicando aumento/diminuição
2. Setas no **mesmo sentido** → DIRETA
3. Setas em **sentidos opostos** → INVERSA

**Exemplo:**
- Mais produtos ↑ → Mais custo ↑ (DIRETA)
- Mais velocidade ↑ → Menos tempo ↓ (INVERSA)

### Checklist:

✅ Identifiquei as duas grandezas?  
✅ Montei a tabela corretamente?  
✅ Determinei se é direta ou inversa?  
✅ Montei a proporção correta?  
✅ Fiz a multiplicação cruzada?  
✅ A resposta faz sentido?

---

## 🏪 Problemas Comerciais

### Problema 1: Desconto

Uma loja oferece 15% de desconto em compras acima de R$ 200,00. Se um produto custa R$ 350,00, quanto pagarei?

**Solução:**
- Desconto: 15% de 350 = 0,15 × 350 = 52,50
- Preço final: 350 − 52,50 = R$ 297,50

### Problema 2: Lucro

Um comerciante compra camisetas por R$ 20,00 e vende por R$ 35,00. Qual o percentual de lucro?

**Solução:**
- Lucro: 35 − 20 = 15
- Percentual: (15/20) × 100 = 75%

---

## ✏️ Exercícios Propostos

### Exercício 1
12 litros de tinta pintam 60 m². Quantos litros pintam 100 m²?

**Solução:**
- Mais área → mais tinta (DIRETA)
- 12/x = 60/100
- 60x = 1.200
- x = 20 litros

### Exercício 2
Um trem a 90 km/h faz um percurso em 5 horas. A 75 km/h, quanto tempo levaria?

**Solução:**
- Menos velocidade → mais tempo (INVERSA)
- 90/75 = x/5
- 75x = 450
- x = 6 horas

### Exercício 3
8 impressoras imprimem 2.400 páginas em 1 hora. Quantas páginas imprimem 5 impressoras?

**Solução:**
- Menos impressoras → menos páginas (DIRETA)
- 8/5 = 2.400/x
- 8x = 12.000
- x = 1.500 páginas

---

## 🎓 Resumo da Aula

✅ Regra de três simples: 2 grandezas, 3 valores, 1 incógnita  
✅ Diretamente proporcional: aumenta junto  
✅ Inversamente proporcional: uma aumenta, outra diminui  
✅ Direta: multiplica em cruz  
✅ Inversa: inverte uma razão antes de multiplicar  
✅ Método das setas ajuda a identificar o tipo  
✅ Sempre verificar se a resposta faz sentido

---

**Tempo estimado:** 55 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180008,
    slug: 'regra-de-tres-composta',
    title: 'Regra de Três Composta',
    order: 3,
    estimatedMinutes: 45,
    mainText: `# Regra de Três Composta

## 🎯 Objetivo da Aula

Resolver problemas complexos envolvendo três ou mais grandezas proporcionais usando a regra de três composta.

---

## 📚 O que é Regra de Três Composta?

**Regra de três composta** é usada quando o problema envolve **três ou mais grandezas** relacionadas.

**Diferença da simples:**
- **Simples:** 2 grandezas
- **Composta:** 3 ou mais grandezas

---

## 🔧 Método Passo a Passo

### Passo 1: Identificar as Grandezas

Liste todas as grandezas envolvidas (geralmente 3).

### Passo 2: Montar a Tabela

| Grandeza 1 | Grandeza 2 | Grandeza 3 |
|------------|------------|------------|
| valor 1    | valor 2    | valor 3    |
| valor 4    | valor 5    | x          |

### Passo 3: Isolar a Grandeza com x

A grandeza que contém x fica de um lado. As outras do outro lado.

### Passo 4: Analisar Cada Grandeza Separadamente

Para cada grandeza (exceto a que tem x):
- Se aumentar, a grandeza com x aumenta? → DIRETA (mantém)
- Se aumentar, a grandeza com x diminui? → INVERSA (inverte)

### Passo 5: Montar a Proporção

Multiplique todas as frações do lado direito.

### Passo 6: Resolver

Multiplicação cruzada e isolar x.

---

## 📝 Exemplo Completo 1: Produção

**Problema:** 5 máquinas trabalhando 8 horas por dia produzem 200 peças. Quantas peças produzem 8 máquinas trabalhando 6 horas por dia?

### Solução Detalhada:

**Passo 1:** Grandezas
- Máquinas
- Horas/dia
- Peças

**Passo 2:** Tabela

| Máquinas | Horas/dia | Peças |
|----------|-----------|-------|
| 5        | 8         | 200   |
| 8        | 6         | x     |

**Passo 3:** Isolar Peças (com x)

Peças fica de um lado, máquinas e horas do outro.

**Passo 4:** Analisar cada grandeza

**Máquinas vs Peças:**
- Mais máquinas → mais peças (DIRETA) ✓ Mantém

**Horas vs Peças:**
- Mais horas → mais peças (DIRETA) ✓ Mantém

**Passo 5:** Montar proporção

200/x = (5/8) × (8/6)

**Passo 6:** Resolver

200/x = 40/48

200/x = 5/6

5x = 1.200

x = 240 peças

---

## 📝 Exemplo Completo 2: Construção

**Problema:** 12 operários trabalhando 8 horas por dia constroem um muro em 15 dias. Quantos dias levarão 9 operários trabalhando 10 horas por dia?

### Solução:

**Passo 1:** Grandezas
- Operários
- Horas/dia
- Dias

**Passo 2:** Tabela

| Operários | Horas/dia | Dias |
|-----------|-----------|------|
| 12        | 8         | 15   |
| 9         | 10        | x    |

**Passo 3:** Isolar Dias (com x)

**Passo 4:** Analisar

**Operários vs Dias:**
- Mais operários → menos dias (INVERSA) ✗ Inverte: 9/12

**Horas vs Dias:**
- Mais horas/dia → menos dias (INVERSA) ✗ Inverte: 10/8

**Passo 5:** Proporção

15/x = (9/12) × (10/8)

**Passo 6:** Resolver

15/x = 90/96

15/x = 15/16

15 × 16 = 15x

x = 16 dias

---

## 📝 Exemplo 3: Impressão

**Problema:** 4 impressoras imprimem 6.000 páginas em 3 horas. Quantas páginas imprimem 6 impressoras em 5 horas?

### Solução:

| Impressoras | Horas | Páginas |
|-------------|-------|---------|
| 4           | 3     | 6.000   |
| 6           | 5     | x       |

**Análise:**
- Mais impressoras → mais páginas (DIRETA) ✓
- Mais horas → mais páginas (DIRETA) ✓

**Proporção:**

6.000/x = (4/6) × (3/5)

6.000/x = 12/30 = 2/5

2x = 30.000

x = 15.000 páginas

---

## 📝 Exemplo 4: Alimentação

**Problema:** 20 cavalos consomem 300 kg de ração em 15 dias. Quantos kg consomem 30 cavalos em 10 dias?

### Solução:

| Cavalos | Dias | Ração (kg) |
|---------|------|------------|
| 20      | 15   | 300        |
| 30      | 10   | x          |

**Análise:**
- Mais cavalos → mais ração (DIRETA) ✓
- Mais dias → mais ração (DIRETA) ✓

**Proporção:**

300/x = (20/30) × (15/10)

300/x = 300/300 = 1

x = 300 kg

---

## 💡 Dicas Importantes

### Como Saber se é Direta ou Inversa?

**Método da Pergunta:**

"Se [grandeza A] aumenta, [grandeza com x] aumenta ou diminui?"

- **Aumenta:** DIRETA (mantém a fração)
- **Diminui:** INVERSA (inverte a fração)

### Checklist:

✅ Identifiquei todas as grandezas?  
✅ Montei a tabela completa?  
✅ Isolei a grandeza com x?  
✅ Analisei cada grandeza separadamente?  
✅ Inverti as frações corretas?  
✅ Multipliquei todas as frações?  
✅ Resolvi corretamente?

---

## ✏️ Exercícios Resolvidos

### Exercício 1

10 máquinas produzem 500 peças em 4 horas. Quantas peças produzem 15 máquinas em 6 horas?

**Solução:**

| Máquinas | Horas | Peças |
|----------|-------|-------|
| 10       | 4     | 500   |
| 15       | 6     | x     |

- Mais máquinas → mais peças (DIRETA) ✓
- Mais horas → mais peças (DIRETA) ✓

500/x = (10/15) × (4/6)

500/x = 40/90 = 4/9

4x = 4.500

x = 1.125 peças

---

### Exercício 2

8 torneiras enchem um tanque em 5 horas abrindo 3 horas por dia. Quantos dias levam 6 torneiras abrindo 4 horas por dia?

**Solução:**

| Torneiras | Horas/dia | Dias |
|-----------|-----------|------|
| 8         | 3         | 5    |
| 6         | 4         | x    |

- Menos torneiras → mais dias (INVERSA) ✗ Inverte: 6/8
- Mais horas/dia → menos dias (INVERSA) ✗ Inverte: 4/3

5/x = (6/8) × (4/3)

5/x = 24/24 = 1

x = 5 dias

---

## 🎓 Resumo da Aula

✅ Regra de três composta: 3+ grandezas  
✅ Isolar a grandeza com x  
✅ Analisar cada grandeza separadamente  
✅ DIRETA: mantém a fração  
✅ INVERSA: inverte a fração  
✅ Multiplicar todas as frações do lado direito  
✅ Resolver por multiplicação cruzada

---

**Tempo estimado:** 45 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180008,
    slug: 'divisao-proporcional',
    title: 'Divisão Proporcional',
    order: 4,
    estimatedMinutes: 50,
    mainText: `# Divisão Proporcional

## 🎯 Objetivo da Aula

Dominar técnicas de divisão proporcional para repartir quantidades de forma justa segundo critérios estabelecidos.

---

## 📚 O que é Divisão Proporcional?

**Divisão proporcional** é dividir uma quantidade em partes que mantêm uma proporção específica entre si.

**Aplicações práticas:**
- Divisão de lucros em sociedades
- Repartição de heranças
- Distribuição de recursos
- Pagamento por produtividade

---

## 🔢 Divisão Diretamente Proporcional

### Conceito:

Dividir um valor em partes **diretamente proporcionais** a números dados.

**Método:**
1. Somar os números da proporção
2. Dividir o total pela soma
3. Multiplicar cada número pelo resultado

### Exemplo 1: Divisão Simples

Dividir R$ 600,00 entre Ana e Bruno na proporção 2:3.

**Passo 1:** Soma das partes
- 2 + 3 = 5 partes

**Passo 2:** Valor de cada parte
- 600 ÷ 5 = 120

**Passo 3:** Calcular cada quantia
- Ana (2 partes): 2 × 120 = R$ 240,00
- Bruno (3 partes): 3 × 120 = R$ 360,00

**Verificação:** 240 + 360 = 600 ✓

---

### Exemplo 2: Três Pessoas

Dividir R$ 1.200,00 entre Carlos, Diana e Eduardo na proporção 3:4:5.

**Solução:**

**Passo 1:** Soma
- 3 + 4 + 5 = 12 partes

**Passo 2:** Valor por parte
- 1.200 ÷ 12 = 100

**Passo 3:** Distribuição
- Carlos: 3 × 100 = R$ 300,00
- Diana: 4 × 100 = R$ 400,00
- Eduardo: 5 × 100 = R$ 500,00

**Verificação:** 300 + 400 + 500 = 1.200 ✓

---

## 💼 Divisão em Sociedades

### Exemplo 3: Lucro por Investimento

Três sócios investiram:
- Sócio A: R$ 10.000,00
- Sócio B: R$ 15.000,00
- Sócio C: R$ 25.000,00

Lucro de R$ 20.000,00 será dividido proporcionalmente. Quanto cada um recebe?

**Solução:**

**Passo 1:** Proporção dos investimentos
- 10.000 : 15.000 : 25.000
- Simplificar: 2 : 3 : 5

**Passo 2:** Soma das partes
- 2 + 3 + 5 = 10 partes

**Passo 3:** Valor por parte
- 20.000 ÷ 10 = 2.000

**Passo 4:** Distribuição
- Sócio A: 2 × 2.000 = R$ 4.000,00
- Sócio B: 3 × 2.000 = R$ 6.000,00
- Sócio C: 5 × 2.000 = R$ 10.000,00

---

## 🔄 Divisão Inversamente Proporcional

### Conceito:

Dividir em partes **inversamente proporcionais**: quanto maior o número, menor a parte.

**Método:**
1. Inverter os números da proporção
2. Aplicar divisão diretamente proporcional aos inversos

### Exemplo 4: Tempo de Trabalho

Dividir R$ 600,00 entre dois trabalhadores que completaram a obra em tempos diferentes:
- Trabalhador A: 3 dias
- Trabalhador B: 6 dias

Quem trabalhou menos dias deve receber mais (inversamente proporcional).

**Solução:**

**Passo 1:** Inverter os números
- 3 → 1/3
- 6 → 1/6

**Passo 2:** Igualar denominadores (MMC = 6)
- 1/3 = 2/6
- 1/6 = 1/6

**Passo 3:** Proporção direta com numeradores
- 2 : 1

**Passo 4:** Soma
- 2 + 1 = 3 partes

**Passo 5:** Valor por parte
- 600 ÷ 3 = 200

**Passo 6:** Distribuição
- Trabalhador A (3 dias): 2 × 200 = R$ 400,00
- Trabalhador B (6 dias): 1 × 200 = R$ 200,00

**Lógica:** Quem trabalhou menos dias (3) recebeu mais!

---

### Exemplo 5: Idades

Dividir R$ 900,00 inversamente proporcional às idades de 3 crianças: 6, 9 e 12 anos.

**Solução:**

**Passo 1:** Inverter
- 6 → 1/6
- 9 → 1/9
- 12 → 1/12

**Passo 2:** MMC(6, 9, 12) = 36
- 1/6 = 6/36
- 1/9 = 4/36
- 1/12 = 3/36

**Passo 3:** Proporção: 6 : 4 : 3

**Passo 4:** Soma: 6 + 4 + 3 = 13

**Passo 5:** Valor por parte: 900 ÷ 13 ≈ 69,23

**Passo 6:** Distribuição
- 6 anos: 6 × 69,23 = R$ 415,38
- 9 anos: 4 × 69,23 = R$ 276,92
- 12 anos: 3 × 69,23 = R$ 207,69

**Lógica:** Criança mais nova recebe mais!

---

## 🎯 Divisão Proporcional Composta

### Conceito:

Dividir considerando **dois critérios simultaneamente**.

### Exemplo 6: Investimento e Tempo

Três sócios investiram valores diferentes por tempos diferentes:

| Sócio | Investimento (R$) | Tempo (meses) |
|-------|-------------------|---------------|
| A     | 10.000            | 6             |
| B     | 15.000            | 4             |
| C     | 20.000            | 3             |

Dividir lucro de R$ 30.000,00 proporcionalmente a investimento × tempo.

**Solução:**

**Passo 1:** Multiplicar investimento × tempo
- A: 10.000 × 6 = 60.000
- B: 15.000 × 4 = 60.000
- C: 20.000 × 3 = 60.000

**Passo 2:** Proporção
- 60.000 : 60.000 : 60.000 = 1 : 1 : 1

**Passo 3:** Divisão igual
- Cada um: 30.000 ÷ 3 = R$ 10.000,00

**Observação:** Neste caso, os produtos foram iguais, resultando em divisão igual!

---

### Exemplo 7: Produtividade e Horas

Dividir R$ 1.500,00 entre 3 funcionários considerando produtividade e horas trabalhadas:

| Funcionário | Produtividade | Horas |
|-------------|---------------|-------|
| João        | 5             | 8     |
| Maria       | 4             | 10    |
| Pedro       | 6             | 6     |

**Solução:**

**Passo 1:** Multiplicar
- João: 5 × 8 = 40
- Maria: 4 × 10 = 40
- Pedro: 6 × 6 = 36

**Passo 2:** Proporção: 40 : 40 : 36 = 10 : 10 : 9

**Passo 3:** Soma: 10 + 10 + 9 = 29

**Passo 4:** Valor por parte: 1.500 ÷ 29 ≈ 51,72

**Passo 5:** Distribuição
- João: 10 × 51,72 = R$ 517,20
- Maria: 10 × 51,72 = R$ 517,20
- Pedro: 9 × 51,72 = R$ 465,48

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Dividir R$ 800,00 na proporção 5:3.

**Solução:**
- Soma: 5 + 3 = 8
- Parte: 800 ÷ 8 = 100
- Primeiro: 5 × 100 = R$ 500,00
- Segundo: 3 × 100 = R$ 300,00

### Exercício 2
Dividir R$ 1.200,00 inversamente proporcional a 2, 3 e 4.

**Solução:**
- Inverter: 1/2, 1/3, 1/4
- MMC(2,3,4) = 12
- Proporção: 6 : 4 : 3
- Soma: 13
- Parte: 1.200 ÷ 13 ≈ 92,31
- Distribuição: 553,86 / 369,24 / 276,93

---

## 🎓 Resumo da Aula

✅ Divisão diretamente proporcional: soma partes → divide → multiplica  
✅ Divisão inversamente proporcional: inverte → aplica direta  
✅ Divisão composta: multiplica critérios → aplica direta  
✅ Aplicações: sociedades, heranças, produtividade  
✅ Sempre verificar se a soma das partes = total  
✅ Inversamente proporcional: menor número → maior parte

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
];

for (const aula of modulo8Aulas) {
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

console.log('\n🎉 Módulo 8 completo: 4 aulas criadas!');
console.log('📊 Progresso: 12/20 aulas (60%)');

await conn.end();
