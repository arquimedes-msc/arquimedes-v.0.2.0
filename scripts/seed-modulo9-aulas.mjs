import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

console.log('📝 Criando aulas do Módulo 9: Porcentagem Avançada...\n');

const modulo9Aulas = [
  {
    moduleId: 180009,
    slug: 'calculos-percentuais-avancados',
    title: 'Cálculos Percentuais Avançados',
    order: 1,
    estimatedMinutes: 50,
    mainText: `# Cálculos Percentuais Avançados

## 🎯 Objetivo da Aula

Dominar técnicas avançadas de cálculo percentual, incluindo aumentos e descontos sucessivos, fator de multiplicação e problemas encadeados.

---

## 📚 Revisão: Porcentagem Básica

**Porcentagem** significa "por cem" e representa uma fração de denominador 100.

**Notação:** x% = x/100

**Exemplos:**
- 25% = 25/100 = 0,25
- 50% = 50/100 = 0,5
- 100% = 100/100 = 1

---

## 🔢 Fator de Multiplicação

**Fator de multiplicação** é uma forma rápida de calcular aumentos e descontos.

### Aumento:

**Fórmula:** Fator = 1 + (taxa/100)

**Exemplos:**
- Aumento de 10%: Fator = 1 + 0,10 = 1,10
- Aumento de 25%: Fator = 1 + 0,25 = 1,25
- Aumento de 50%: Fator = 1 + 0,50 = 1,50

### Desconto:

**Fórmula:** Fator = 1 − (taxa/100)

**Exemplos:**
- Desconto de 10%: Fator = 1 − 0,10 = 0,90
- Desconto de 25%: Fator = 1 − 0,25 = 0,75
- Desconto de 50%: Fator = 1 − 0,50 = 0,50

---

## 📈 Aumentos Sucessivos

**Erro comum:** Somar as porcentagens!

**Método correto:** Multiplicar os fatores.

### Exemplo 1: Dois Aumentos

Um produto de R$ 100,00 tem aumento de 10% e depois mais 20%. Qual o preço final?

**Método ERRADO:**
- 10% + 20% = 30%
- 100 × 1,30 = R$ 130,00 ❌

**Método CORRETO:**
- Primeiro aumento: 100 × 1,10 = 110
- Segundo aumento: 110 × 1,20 = 132
- **Ou:** 100 × 1,10 × 1,20 = R$ 132,00 ✓

**Aumento real:** 32% (não 30%!)

---

### Exemplo 2: Três Aumentos

Um salário de R$ 2.000,00 tem aumentos sucessivos de 5%, 8% e 10%. Qual o salário final?

**Solução:**
- Fatores: 1,05 × 1,08 × 1,10
- Fator total: 1,2474
- Salário final: 2.000 × 1,2474 = R$ 2.494,80

**Aumento total:** 24,74%

---

## 📉 Descontos Sucessivos

### Exemplo 3: Dois Descontos

Um produto de R$ 200,00 tem desconto de 20% e depois mais 10%. Qual o preço final?

**Método ERRADO:**
- 20% + 10% = 30%
- 200 × 0,70 = R$ 140,00 ❌

**Método CORRETO:**
- Primeiro desconto: 200 × 0,80 = 160
- Segundo desconto: 160 × 0,90 = 144
- **Ou:** 200 × 0,80 × 0,90 = R$ 144,00 ✓

**Desconto real:** 28% (não 30%!)

---

### Exemplo 4: Black Friday

Um produto de R$ 500,00 tem:
1. Desconto de 30% (promoção)
2. Desconto de 10% (cupom)
3. Desconto de 5% (pagamento à vista)

Qual o preço final?

**Solução:**
- Fatores: 0,70 × 0,90 × 0,95
- Fator total: 0,5985
- Preço final: 500 × 0,5985 = R$ 299,25

**Desconto total:** 40,15%

---

## 🔄 Aumento Seguido de Desconto

### Exemplo 5: Inflação e Promoção

Um produto custa R$ 80,00. Teve aumento de 25% (inflação) e depois desconto de 20% (promoção). Qual o preço final?

**Solução:**
- Aumento: 80 × 1,25 = 100
- Desconto: 100 × 0,80 = 80
- **Ou:** 80 × 1,25 × 0,80 = R$ 80,00

**Resultado:** Voltou ao preço original!

**Observação:** 25% de aumento seguido de 20% de desconto NÃO se anulam!

---

## 💡 Técnicas Rápidas

### Técnica 1: Calcular Porcentagem Mentalmente

**10%:** Dividir por 10
- 10% de 250 = 25

**5%:** Metade de 10%
- 5% de 250 = 12,5

**1%:** Dividir por 100
- 1% de 250 = 2,5

**15%:** 10% + 5%
- 15% de 250 = 25 + 12,5 = 37,5

### Técnica 2: Calcular o Valor Original

**Problema:** Após aumento de 20%, um produto custa R$ 120,00. Qual era o preço original?

**Solução:**
- Preço atual = Preço original × 1,20
- 120 = Preço original × 1,20
- Preço original = 120 ÷ 1,20 = R$ 100,00

---

## 🧮 Problemas Encadeados

### Problema 1: Lucro sobre Lucro

Um comerciante compra um produto por R$ 50,00, aplica 40% de lucro e depois mais 20% de lucro. Por quanto vende?

**Solução:**
- Primeiro lucro: 50 × 1,40 = 70
- Segundo lucro: 70 × 1,20 = 84
- Preço de venda: R$ 84,00

**Lucro total:** 84 − 50 = R$ 34,00 (68% sobre o custo)

---

### Problema 2: Desconto Real

Uma loja anuncia "50% + 30% de desconto". Um produto de R$ 400,00 custará quanto?

**Solução:**
- Primeiro desconto: 400 × 0,50 = 200
- Segundo desconto: 200 × 0,70 = 140
- Preço final: R$ 140,00

**Desconto real:** 65% (não 80%!)

---

### Problema 3: Comparação de Ofertas

**Loja A:** Desconto de 40%
**Loja B:** Desconto de 20% + 20%

Qual é melhor para um produto de R$ 100,00?

**Loja A:**
- 100 × 0,60 = R$ 60,00

**Loja B:**
- 100 × 0,80 × 0,80 = R$ 64,00

**Resposta:** Loja A é melhor!

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Um produto de R$ 150,00 tem aumentos sucessivos de 10% e 15%. Qual o preço final?

**Solução:**
- 150 × 1,10 × 1,15 = R$ 189,75

### Exercício 2
Após desconto de 25%, um produto custa R$ 75,00. Qual era o preço original?

**Solução:**
- 75 = Preço × 0,75
- Preço = 75 ÷ 0,75 = R$ 100,00

### Exercício 3
Um produto teve aumento de 30% e depois desconto de 30%. Voltou ao preço original?

**Solução:**
- Fator: 1,30 × 0,70 = 0,91
- **Não!** Ficou 9% mais barato que o original.

---

## 🎓 Resumo da Aula

✅ Fator de multiplicação: aumento (1+taxa), desconto (1−taxa)  
✅ Aumentos sucessivos: multiplicar fatores (não somar %)  
✅ Descontos sucessivos: multiplicar fatores  
✅ Aumento + desconto: ordem importa  
✅ Técnicas rápidas: 10%, 5%, 1%  
✅ Valor original: preço atual ÷ fator  
✅ Sempre calcular o fator total

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180009,
    slug: 'matematica-financeira-basica',
    title: 'Matemática Financeira Básica',
    order: 2,
    estimatedMinutes: 55,
    mainText: `# Matemática Financeira Básica

## 🎯 Objetivo da Aula

Compreender conceitos fundamentais de matemática financeira, incluindo juros simples, montante, capital e taxa de juros.

---

## 📚 Conceitos Fundamentais

### Capital (C)

**Capital** é o valor inicial investido ou emprestado.

**Também chamado:** Principal, Valor Presente (VP)

**Exemplos:**
- Investimento de R$ 1.000,00
- Empréstimo de R$ 5.000,00
- Depósito de R$ 10.000,00

### Juros (J)

**Juros** é o valor pago ou recebido pelo uso do dinheiro no tempo.

**Interpretação:**
- Para quem empresta: remuneração
- Para quem pega emprestado: custo

### Taxa de Juros (i)

**Taxa de juros** é a porcentagem aplicada sobre o capital em um período.

**Notação:** i% ao período (mês, ano, etc.)

**Exemplos:**
- 2% ao mês (a.m.)
- 12% ao ano (a.a.)
- 0,5% ao dia (a.d.)

### Tempo (t)

**Tempo** é o período durante o qual o capital fica aplicado.

**Importante:** Tempo e taxa devem estar na **mesma unidade**.

### Montante (M)

**Montante** é o valor total ao final: capital + juros.

**Fórmula:** M = C + J

---

## 💰 Juros Simples

**Juros simples** são calculados sempre sobre o capital inicial.

**Fórmula:** J = C × i × t

Onde:
- J = juros
- C = capital
- i = taxa (em decimal)
- t = tempo

**Montante:** M = C + J = C × (1 + i × t)

---

## 📝 Exemplos de Juros Simples

### Exemplo 1: Investimento

Você investe R$ 2.000,00 a 5% ao mês por 6 meses. Quanto receberá de juros?

**Dados:**
- C = 2.000
- i = 5% a.m. = 0,05
- t = 6 meses

**Solução:**
- J = C × i × t
- J = 2.000 × 0,05 × 6
- J = R$ 600,00

**Montante:**
- M = C + J = 2.000 + 600 = R$ 2.600,00

---

### Exemplo 2: Empréstimo

João pegou emprestado R$ 5.000,00 a 3% ao mês por 4 meses. Quanto pagará no total?

**Dados:**
- C = 5.000
- i = 3% a.m. = 0,03
- t = 4 meses

**Solução:**
- J = 5.000 × 0,03 × 4 = 600
- M = 5.000 + 600 = R$ 5.600,00

---

### Exemplo 3: Encontrar o Capital

Quanto devo investir a 4% ao mês por 5 meses para ter R$ 300,00 de juros?

**Dados:**
- J = 300
- i = 4% a.m. = 0,04
- t = 5 meses
- C = ?

**Solução:**
- J = C × i × t
- 300 = C × 0,04 × 5
- 300 = C × 0,20
- C = 300 ÷ 0,20 = R$ 1.500,00

---

### Exemplo 4: Encontrar a Taxa

A que taxa mensal R$ 4.000,00 rendem R$ 480,00 em 6 meses?

**Dados:**
- C = 4.000
- J = 480
- t = 6 meses
- i = ?

**Solução:**
- J = C × i × t
- 480 = 4.000 × i × 6
- 480 = 24.000i
- i = 480 ÷ 24.000 = 0,02 = 2% a.m.

---

### Exemplo 5: Encontrar o Tempo

Em quanto tempo R$ 3.000,00 a 2,5% ao mês rendem R$ 450,00?

**Dados:**
- C = 3.000
- i = 2,5% a.m. = 0,025
- J = 450
- t = ?

**Solução:**
- J = C × i × t
- 450 = 3.000 × 0,025 × t
- 450 = 75t
- t = 450 ÷ 75 = 6 meses

---

## 🔄 Conversão de Taxas

### Taxa Anual para Mensal (Juros Simples)

**Método:** Dividir por 12

**Exemplo:** 24% ao ano = 24 ÷ 12 = 2% ao mês

### Taxa Mensal para Anual (Juros Simples)

**Método:** Multiplicar por 12

**Exemplo:** 1,5% ao mês = 1,5 × 12 = 18% ao ano

**Importante:** Isso vale apenas para juros simples!

---

## 💳 Aplicações Práticas

### Aplicação 1: Cheque Especial

Você usa R$ 1.000,00 do cheque especial por 10 dias a 8% ao mês. Quanto pagará de juros?

**Solução:**
- Converter taxa para diária: 8% ÷ 30 = 0,267% ao dia
- J = 1.000 × 0,00267 × 10
- J ≈ R$ 26,70

### Aplicação 2: Poupança

Você deposita R$ 5.000,00 na poupança que rende 0,5% ao mês. Quanto terá em 12 meses (juros simples)?

**Solução:**
- J = 5.000 × 0,005 × 12 = 300
- M = 5.000 + 300 = R$ 5.300,00

### Aplicação 3: Empréstimo entre Amigos

Você empresta R$ 800,00 a um amigo por 3 meses a 2% ao mês. Quanto ele deve devolver?

**Solução:**
- J = 800 × 0,02 × 3 = 48
- M = 800 + 48 = R$ 848,00

---

## 📊 Comparação de Investimentos

### Situação: Onde Investir?

Você tem R$ 10.000,00 e duas opções:

**Opção A:** 1,5% ao mês por 12 meses
**Opção B:** 18% ao ano

Qual rende mais?

**Opção A:**
- J = 10.000 × 0,015 × 12 = 1.800
- M = R$ 11.800,00

**Opção B:**
- J = 10.000 × 0,18 × 1 = 1.800
- M = R$ 11.800,00

**Resposta:** São equivalentes em juros simples!

---

## 🧮 Fórmulas Derivadas

### Calcular Capital:

**C = J / (i × t)**

### Calcular Taxa:

**i = J / (C × t)**

### Calcular Tempo:

**t = J / (C × i)**

### Calcular Montante Direto:

**M = C × (1 + i × t)**

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Quanto rende R$ 2.500,00 a 3% ao mês em 8 meses?

**Solução:**
- J = 2.500 × 0,03 × 8 = R$ 600,00

### Exercício 2
A que taxa anual R$ 6.000,00 se transformam em R$ 7.200,00 em 2 anos?

**Solução:**
- J = 7.200 − 6.000 = 1.200
- 1.200 = 6.000 × i × 2
- i = 1.200 ÷ 12.000 = 0,10 = 10% a.a.

### Exercício 3
Em quanto tempo R$ 4.000,00 a 2% ao mês geram R$ 960,00 de juros?

**Solução:**
- 960 = 4.000 × 0,02 × t
- 960 = 80t
- t = 12 meses

---

## 💡 Dicas Importantes

1. **Sempre converter taxa para decimal:** 5% = 0,05
2. **Taxa e tempo na mesma unidade:** se taxa é mensal, tempo em meses
3. **Juros simples:** linear, sempre sobre o capital inicial
4. **Montante = Capital + Juros**
5. **Verificar:** M sempre maior que C (se i > 0)

---

## 🎓 Resumo da Aula

✅ Capital (C): valor inicial  
✅ Juros (J): remuneração pelo tempo  
✅ Taxa (i): porcentagem por período  
✅ Tempo (t): duração da aplicação  
✅ Montante (M): capital + juros  
✅ Juros simples: J = C × i × t  
✅ Montante: M = C × (1 + i × t)  
✅ Conversão de taxas: dividir/multiplicar

---

**Tempo estimado:** 55 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180009,
    slug: 'juros-compostos-introdutorios',
    title: 'Juros Compostos Introdutórios',
    order: 3,
    estimatedMinutes: 45,
    mainText: `# Juros Compostos Introdutórios

## 🎯 Objetivo da Aula

Compreender o conceito de juros compostos, sua diferença em relação aos juros simples e aplicar a fórmula básica em problemas práticos.

---

## 📚 O que são Juros Compostos?

**Juros compostos** são juros calculados sobre o montante acumulado (capital + juros anteriores).

**Também chamado:** "Juros sobre juros"

**Característica:** Crescimento exponencial

---

## 🔄 Diferença: Simples vs Compostos

### Juros Simples:

- Calculados sempre sobre o **capital inicial**
- Crescimento **linear**
- Menos comum na prática

### Juros Compostos:

- Calculados sobre o **montante acumulado**
- Crescimento **exponencial**
- Mais comum: bancos, investimentos, empréstimos

---

## 📊 Exemplo Comparativo

**Situação:** R$ 1.000,00 a 10% ao mês por 3 meses

### Juros Simples:

| Mês | Capital | Juros | Montante |
|-----|---------|-------|----------|
| 0   | 1.000   | 0     | 1.000    |
| 1   | 1.000   | 100   | 1.100    |
| 2   | 1.000   | 100   | 1.200    |
| 3   | 1.000   | 100   | 1.300    |

**Total de juros:** R$ 300,00

### Juros Compostos:

| Mês | Capital | Juros | Montante |
|-----|---------|-------|----------|
| 0   | 1.000   | 0     | 1.000    |
| 1   | 1.000   | 100   | 1.100    |
| 2   | 1.100   | 110   | 1.210    |
| 3   | 1.210   | 121   | 1.331    |

**Total de juros:** R$ 331,00

**Diferença:** R$ 31,00 a mais com juros compostos!

---

## 🧮 Fórmula dos Juros Compostos

**Montante:** M = C × (1 + i)^t

Onde:
- M = montante final
- C = capital inicial
- i = taxa (em decimal)
- t = tempo (em períodos)

**Juros:** J = M − C

---

## 📝 Exemplos Resolvidos

### Exemplo 1: Investimento Básico

Investir R$ 2.000,00 a 5% ao mês por 4 meses. Qual o montante?

**Dados:**
- C = 2.000
- i = 5% a.m. = 0,05
- t = 4 meses

**Solução:**
- M = C × (1 + i)^t
- M = 2.000 × (1,05)⁴
- M = 2.000 × 1,2155
- M ≈ R$ 2.431,00

**Juros:**
- J = 2.431 − 2.000 = R$ 431,00

---

### Exemplo 2: Comparação com Juros Simples

R$ 5.000,00 a 3% ao mês por 12 meses. Compare simples e compostos.

**Juros Simples:**
- J = 5.000 × 0,03 × 12 = 1.800
- M = R$ 6.800,00

**Juros Compostos:**
- M = 5.000 × (1,03)¹²
- M = 5.000 × 1,4258
- M ≈ R$ 7.129,00

**Diferença:** R$ 329,00 a mais!

---

### Exemplo 3: Encontrar o Capital

Quanto investir a 4% ao mês por 6 meses para ter R$ 6.000,00?

**Dados:**
- M = 6.000
- i = 4% a.m. = 0,04
- t = 6 meses
- C = ?

**Solução:**
- M = C × (1 + i)^t
- 6.000 = C × (1,04)⁶
- 6.000 = C × 1,2653
- C = 6.000 ÷ 1,2653
- C ≈ R$ 4.742,00

---

### Exemplo 4: Encontrar o Tempo

Em quanto tempo R$ 3.000,00 a 5% ao mês se transforma em R$ 4.000,00?

**Dados:**
- C = 3.000
- M = 4.000
- i = 5% a.m. = 0,05
- t = ?

**Solução:**
- 4.000 = 3.000 × (1,05)^t
- 1,3333 = (1,05)^t
- Usando tentativa ou logaritmo: t ≈ 6 meses

---

## 💰 Capitalização

**Capitalização** é a frequência com que os juros são incorporados ao capital.

### Tipos Comuns:

- **Anual:** 1 vez por ano
- **Semestral:** 2 vezes por ano
- **Trimestral:** 4 vezes por ano
- **Mensal:** 12 vezes por ano
- **Diária:** 365 vezes por ano

**Regra:** Quanto maior a frequência, maior o montante final.

---

## 📈 O Poder dos Juros Compostos

### Exemplo 5: Investimento de Longo Prazo

R$ 10.000,00 a 1% ao mês por 10 anos (120 meses).

**Solução:**
- M = 10.000 × (1,01)¹²⁰
- M = 10.000 × 3,3004
- M ≈ R$ 33.004,00

**Resultado:** Mais que triplicou!

---

### Exemplo 6: Dívida de Cartão de Crédito

Dívida de R$ 1.000,00 a 10% ao mês por 6 meses.

**Solução:**
- M = 1.000 × (1,10)⁶
- M = 1.000 × 1,7716
- M ≈ R$ 1.771,60

**Alerta:** Dívida cresceu 77% em 6 meses!

---

## 🔢 Casos Especiais

### Dobrando o Capital

**Regra prática:** Tempo para dobrar ≈ 72 ÷ taxa

**Exemplo:** A 6% ao ano, quanto tempo para dobrar?
- t ≈ 72 ÷ 6 = 12 anos

### Triplicando o Capital

**Regra prática:** Tempo para triplicar ≈ 110 ÷ taxa

**Exemplo:** A 10% ao ano, quanto tempo para triplicar?
- t ≈ 110 ÷ 10 = 11 anos

---

## 💡 Aplicações Práticas

### Aplicação 1: Poupança Real

R$ 5.000,00 na poupança a 0,5% ao mês por 24 meses.

**Solução:**
- M = 5.000 × (1,005)²⁴
- M = 5.000 × 1,1272
- M ≈ R$ 5.636,00

### Aplicação 2: Financiamento de Carro

Financiar R$ 30.000,00 a 2% ao mês por 12 meses. Quanto pagará?

**Solução:**
- M = 30.000 × (1,02)¹²
- M = 30.000 × 1,2682
- M ≈ R$ 38.046,00

**Juros pagos:** R$ 8.046,00

---

## ✏️ Exercícios Resolvidos

### Exercício 1
R$ 4.000,00 a 3% ao mês por 5 meses. Qual o montante?

**Solução:**
- M = 4.000 × (1,03)⁵
- M = 4.000 × 1,1593
- M ≈ R$ 4.637,00

### Exercício 2
Quanto investir a 2% ao mês por 8 meses para ter R$ 10.000,00?

**Solução:**
- 10.000 = C × (1,02)⁸
- C = 10.000 ÷ 1,1717
- C ≈ R$ 8.535,00

### Exercício 3
Compare R$ 1.000,00 a 10% ao ano por 5 anos (simples vs compostos).

**Simples:**
- M = 1.000 × (1 + 0,10 × 5) = R$ 1.500,00

**Compostos:**
- M = 1.000 × (1,10)⁵ = R$ 1.610,51

**Diferença:** R$ 110,51

---

## 🎓 Resumo da Aula

✅ Juros compostos: juros sobre juros  
✅ Crescimento exponencial  
✅ Fórmula: M = C × (1 + i)^t  
✅ Mais vantajoso para investimentos  
✅ Mais caro para dívidas  
✅ Capitalização: frequência de incorporação  
✅ Regra dos 72: tempo para dobrar  
✅ Sempre maior que juros simples (t > 1)

---

**Tempo estimado:** 45 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
  {
    moduleId: 180009,
    slug: 'porcentagens-em-estatistica',
    title: 'Porcentagens em Estatística',
    order: 4,
    estimatedMinutes: 50,
    mainText: `# Porcentagens em Estatística

## 🎯 Objetivo da Aula

Aplicar porcentagens na análise estatística, incluindo frequência relativa, distribuição percentual e interpretação de pesquisas.

---

## 📚 Frequência Relativa

**Frequência relativa** é a razão entre a frequência de um evento e o total de observações.

**Fórmula:** FR = (Frequência Absoluta / Total) × 100%

---

## 📊 Exemplo 1: Pesquisa de Preferência

Uma pesquisa com 200 pessoas sobre sabor de sorvete:

| Sabor      | Frequência | Freq. Relativa |
|------------|------------|----------------|
| Chocolate  | 80         | 40%            |
| Morango    | 60         | 30%            |
| Baunilha   | 40         | 20%            |
| Outros     | 20         | 10%            |
| **Total**  | **200**    | **100%**       |

**Cálculo:**
- Chocolate: (80/200) × 100 = 40%
- Morango: (60/200) × 100 = 30%
- Baunilha: (40/200) × 100 = 20%
- Outros: (20/200) × 100 = 10%

**Interpretação:** 40% dos entrevistados preferem chocolate.

---

## 📈 Distribuição Percentual

**Distribuição percentual** mostra como um todo é dividido em partes.

### Exemplo 2: Orçamento Familiar

Renda mensal: R$ 5.000,00

| Categoria    | Valor (R$) | Percentual |
|--------------|------------|------------|
| Moradia      | 1.500      | 30%        |
| Alimentação  | 1.250      | 25%        |
| Transporte   | 750        | 15%        |
| Educação     | 500        | 10%        |
| Lazer        | 500        | 10%        |
| Poupança     | 500        | 10%        |
| **Total**    | **5.000**  | **100%**   |

**Cálculo:**
- Moradia: (1.500/5.000) × 100 = 30%

---

## 🗳️ Análise de Pesquisas Eleitorais

### Exemplo 3: Pesquisa de Intenção de Voto

1.000 eleitores entrevistados:

| Candidato | Votos | Percentual | Margem de Erro |
|-----------|-------|------------|----------------|
| A         | 420   | 42%        | ±3%            |
| B         | 350   | 35%        | ±3%            |
| C         | 150   | 15%        | ±3%            |
| Indecisos | 80    | 8%         | ±3%            |

**Interpretação:**
- Candidato A lidera com 42% (pode variar entre 39% e 45%)
- Diferença A-B: 7 pontos percentuais
- Se diferença < margem de erro → empate técnico

---

## 📊 Gráficos de Pizza (Setores)

**Gráfico de pizza** representa distribuição percentual visualmente.

### Exemplo 4: Despesas de uma Empresa

| Categoria    | Percentual | Ângulo (°) |
|--------------|------------|------------|
| Salários     | 50%        | 180°       |
| Aluguel      | 20%        | 72°        |
| Materiais    | 15%        | 54°        |
| Marketing    | 10%        | 36°        |
| Outros       | 5%         | 18°        |

**Cálculo do ângulo:**
- Salários: 50% × 360° = 180°
- Aluguel: 20% × 360° = 72°

---

## 🏥 Aplicações em Saúde

### Exemplo 5: Taxa de Recuperação

Hospital trata 250 pacientes:
- Recuperados: 225
- Não recuperados: 25

**Taxa de recuperação:**
- (225/250) × 100 = 90%

**Taxa de não recuperação:**
- (25/250) × 100 = 10%

---

## 📈 Crescimento Percentual

**Crescimento percentual** mede variação relativa.

**Fórmula:** Crescimento% = [(Valor Final − Valor Inicial) / Valor Inicial] × 100

### Exemplo 6: Crescimento de Vendas

| Mês       | Vendas (R$) |
|-----------|-------------|
| Janeiro   | 10.000      |
| Fevereiro | 12.000      |

**Crescimento:**
- [(12.000 − 10.000) / 10.000] × 100 = 20%

### Exemplo 7: Queda de Preços

| Período | Preço (R$) |
|---------|------------|
| Antes   | 500        |
| Depois  | 400        |

**Variação:**
- [(400 − 500) / 500] × 100 = −20% (queda de 20%)

---

## 🎓 Análise de Aproveitamento Escolar

### Exemplo 8: Desempenho da Turma

Turma de 40 alunos:

| Conceito | Alunos | Percentual |
|----------|--------|------------|
| A        | 8      | 20%        |
| B        | 16     | 40%        |
| C        | 12     | 30%        |
| D        | 4      | 10%        |

**Análise:**
- 60% dos alunos tiraram A ou B (aproveitamento bom)
- 10% precisam de recuperação (conceito D)

---

## 💼 Aplicações no Mercado

### Exemplo 9: Market Share

Mercado de smartphones (1 milhão de unidades):

| Marca | Vendas | Market Share |
|-------|--------|--------------|
| A     | 350k   | 35%          |
| B     | 280k   | 28%          |
| C     | 220k   | 22%          |
| Outras| 150k   | 15%          |

**Interpretação:**
- Marca A é líder com 35% do mercado
- Top 3 concentra 85% do mercado

---

## 📊 Índices Econômicos

### Exemplo 10: Taxa de Desemprego

População economicamente ativa: 100 milhões
Desempregados: 12 milhões

**Taxa de desemprego:**
- (12/100) × 100 = 12%

### Exemplo 11: Inflação Acumulada

| Mês | Inflação |
|-----|----------|
| Jan | 0,5%     |
| Fev | 0,8%     |
| Mar | 0,6%     |

**Inflação acumulada (3 meses):**
- (1,005) × (1,008) × (1,006) − 1 = 0,0192 = 1,92%

---

## ✏️ Exercícios Resolvidos

### Exercício 1
Em uma turma de 50 alunos, 30 são meninas. Qual o percentual de meninas?

**Solução:**
- (30/50) × 100 = 60%

### Exercício 2
Uma cidade tinha 200.000 habitantes e agora tem 250.000. Qual o crescimento percentual?

**Solução:**
- [(250.000 − 200.000) / 200.000] × 100 = 25%

### Exercício 3
Em uma pesquisa com 800 pessoas, 320 preferem produto A. Qual a frequência relativa?

**Solução:**
- (320/800) × 100 = 40%

### Exercício 4
Um produto que custava R$ 80,00 agora custa R$ 64,00. Qual a redução percentual?

**Solução:**
- [(64 − 80) / 80] × 100 = −20% (redução de 20%)

---

## 💡 Dicas de Interpretação

### Cuidado com:

1. **Base de comparação:** 50% de 100 ≠ 50% de 200
2. **Aumento seguido de redução:** não se anulam
3. **Margem de erro:** importante em pesquisas
4. **Amostra vs População:** generalização cuidadosa

### Checklist de Análise:

✅ Qual o total (denominador)?  
✅ Qual a parte (numerador)?  
✅ A soma das partes = 100%?  
✅ Os dados são confiáveis?  
✅ A interpretação faz sentido?

---

## 🎓 Resumo da Aula

✅ Frequência relativa: (parte/todo) × 100%  
✅ Distribuição percentual: divisão em partes  
✅ Crescimento%: [(final − inicial) / inicial] × 100  
✅ Gráfico de pizza: ângulo = % × 360°  
✅ Aplicações: pesquisas, saúde, economia  
✅ Sempre verificar base de comparação  
✅ Margem de erro em pesquisas amostrais

---

**Tempo estimado:** 50 minutos

🎓 Role até o final para concluir automaticamente ou clique no botão abaixo
`,
  },
];

for (const aula of modulo9Aulas) {
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

console.log('\n🎉 Módulo 9 completo: 4 aulas criadas!');
console.log('📊 Progresso: 16/20 aulas (80%)');

await conn.end();
