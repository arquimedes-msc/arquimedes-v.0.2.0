# Análise Completa do Banco de Dados - Aritmética vs Álgebra

**Data:** 24 de dezembro de 2025  
**Objetivo:** Entender a estrutura atual antes de fazer qualquer correção

---

## 📊 1. DISCIPLINAS (4 total)

| ID | Nome | Slug | Order |
|----|------|------|-------|
| 1 | Aritmética | aritmetica | 0 |
| 30001 | Álgebra | algebra | 0 |
| 30002 | Geometria | geometria | 0 |
| 30003 | Cálculo | calculo | 0 |

✅ **Aritmética e Álgebra são TOTALMENTE SEPARADAS** (IDs diferentes: 1 vs 30001)

---

## 🔢 2. MÓDULOS DE ARITMÉTICA (Disciplina ID: 1)

**Total:** 10 módulos com conteúdo completo

| ID | Order | Nome | Aulas |
|----|-------|------|-------|
| (IDs variados) | 0-9 | Adição, Subtração, Multiplicação, etc. | 10 módulos com múltiplas aulas cada |

✅ **ARITMÉTICA ESTÁ INTACTA E FUNCIONANDO**
- 10 módulos bem estruturados
- Cada módulo tem múltiplas aulas
- Progresso de usuários existente

---

## 📐 3. MÓDULOS DE ÁLGEBRA (Disciplina ID: 30001)

### **PROBLEMA IDENTIFICADO:**

**Módulos 1-5 (Antigos - "Cascas Vazias"):**

| ID | Order | Nome | Aulas | Exercícios |
|----|-------|------|-------|------------|
| 30002 | 0 | Introdução às Variáveis e Expressões | 1 | 0 |
| 30003 | 1 | Equações do 1º Grau | 1 | 0 |
| 30004 | 2 | Sistemas de Equações do 1º Grau | 1 | 0 |
| 30005 | 3 | Equações do 2º Grau (Introdução) | 1 | 0 |
| 30006 | 4 | Produtos Notáveis e Fatoração Básica | 1 | 0 |

**Módulos 6-10 (Novos - Conteúdo Completo):**

| ID | Order | Nome | Aulas | Exercícios |
|----|-------|------|-------|------------|
| 180001 | 10 | Álgebra - Introdução às Variáveis e Expressões | 3 | 2 |
| 180002 | 11 | Álgebra - Equações do 1º Grau | 4 | 2 |
| 180003 | 12 | Álgebra - Sistemas de Equações do 1º Grau | 3 | 0 |
| 180004 | 13 | Álgebra - Equações do 2º Grau | 4 | 0 |
| 180005 | 14 | Álgebra - Produtos Notáveis e Fatoração Básica | 3 | 0 |

---

## ⚠️ 4. ANÁLISE DO PROBLEMA

### **Situação Atual:**
- Álgebra tem **10 módulos** (deveria ter 5 para Álgebra Básica)
- Módulos 1-5 têm apenas 1 aula "Introdução" cada (cascas vazias)
- Módulos 6-10 têm o conteúdo completo (3-4 aulas cada)
- Módulos 6-10 estão com `order` 10-14 (deveriam ser 0-4)

### **Estrutura Desejada:**
```
Álgebra Básica (Módulos 1-5, order 0-4):
1. Introdução às Variáveis e Expressões (3 aulas)
2. Equações do 1º Grau (4 aulas)
3. Sistemas de Equações (3 aulas)
4. Equações do 2º Grau (4 aulas)
5. Produtos Notáveis (3 aulas)

Álgebra Intermediária (Módulos 6-10, order 5-9): [FUTURO]
Álgebra Avançada (Módulos 11-15, order 10-14): [FUTURO]
```

---

## ✅ 5. VERIFICAÇÕES DE SEGURANÇA

### **Progresso de Usuários:**
- ✅ **Nenhum usuário** tem progresso nos módulos de Álgebra (nem antigos nem novos)
- ✅ Seguro deletar módulos 1-5 antigos sem perder dados de usuários

### **Exercícios:**
- ✅ Apenas **4 exercícios** vinculados aos módulos novos (180001 e 180002)
- ✅ Nenhum exercício vinculado aos módulos antigos (30002-30006)

### **Dependências:**
- ✅ **Aritmética (disciplineId=1) é TOTALMENTE INDEPENDENTE**
- ✅ Nenhuma tabela cruza dados entre Aritmética e Álgebra
- ✅ Seguro fazer alterações em Álgebra sem afetar Aritmética

---

## 🔧 6. PLANO DE CORREÇÃO SEGURO

### **Opção Recomendada: Limpar e Reorganizar**

**Passo 1:** Deletar módulos antigos (IDs: 30002, 30003, 30004, 30005, 30006)
- ✅ Seguro: Nenhum usuário tem progresso
- ✅ Seguro: Nenhum exercício vinculado
- ✅ Seguro: Apenas 1 aula "Introdução" em cada (sem conteúdo real)

**Passo 2:** Atualizar `order` dos módulos novos
- 180001: order 10 → 0
- 180002: order 11 → 1
- 180003: order 12 → 2
- 180004: order 13 → 3
- 180005: order 14 → 4

**Passo 3:** Atualizar nomes (remover prefixo "Álgebra -")
- "Álgebra - Introdução às Variáveis e Expressões" → "Introdução às Variáveis e Expressões"
- "Álgebra - Equações do 1º Grau" → "Equações do 1º Grau"
- etc.

---

## 📋 7. QUERIES DE CORREÇÃO (PRONTAS PARA EXECUTAR)

```sql
-- Passo 1: Deletar aulas dos módulos antigos
DELETE FROM pages WHERE moduleId IN (30002, 30003, 30004, 30005, 30006);

-- Passo 2: Deletar módulos antigos
DELETE FROM modules WHERE id IN (30002, 30003, 30004, 30005, 30006);

-- Passo 3: Atualizar order dos módulos novos
UPDATE modules SET `order` = 0 WHERE id = 180001;
UPDATE modules SET `order` = 1 WHERE id = 180002;
UPDATE modules SET `order` = 2 WHERE id = 180003;
UPDATE modules SET `order` = 3 WHERE id = 180004;
UPDATE modules SET `order` = 4 WHERE id = 180005;

-- Passo 4: Atualizar nomes (remover prefixo "Álgebra -")
UPDATE modules SET name = 'Introdução às Variáveis e Expressões' WHERE id = 180001;
UPDATE modules SET name = 'Equações do 1º Grau' WHERE id = 180002;
UPDATE modules SET name = 'Sistemas de Equações do 1º Grau' WHERE id = 180003;
UPDATE modules SET name = 'Equações do 2º Grau' WHERE id = 180004;
UPDATE modules SET name = 'Produtos Notáveis e Fatoração Básica' WHERE id = 180005;
```

---

## ✅ 8. IMPACTO ZERO EM ARITMÉTICA

### **Garantias:**
1. ✅ Aritmética usa `disciplineId = 1`
2. ✅ Álgebra usa `disciplineId = 30001`
3. ✅ Nenhuma query toca em `disciplineId = 1`
4. ✅ Nenhuma foreign key cruza disciplinas
5. ✅ **ARITMÉTICA PERMANECERÁ 100% INTACTA**

---

## 🎯 9. RESULTADO ESPERADO

**Após a correção:**

```
Disciplina: Álgebra (ID: 30001)

Módulo 1 (ID: 180001, order: 0)
├─ Introdução às Variáveis e Expressões
├─ 3 aulas
└─ 2 exercícios

Módulo 2 (ID: 180002, order: 1)
├─ Equações do 1º Grau
├─ 4 aulas
└─ 2 exercícios

Módulo 3 (ID: 180003, order: 2)
├─ Sistemas de Equações do 1º Grau
└─ 3 aulas

Módulo 4 (ID: 180004, order: 3)
├─ Equações do 2º Grau
└─ 4 aulas

Módulo 5 (ID: 180005, order: 4)
├─ Produtos Notáveis e Fatoração Básica
└─ 3 aulas
```

**Total:** 5 módulos, 17 aulas, 4 exercícios (+ 96 exercícios a adicionar no futuro)

---

## ✅ 10. CONCLUSÃO

**É SEGURO PROCEDER COM A CORREÇÃO:**
- ✅ Aritmética não será afetada (disciplineId diferente)
- ✅ Nenhum usuário perderá progresso (não há progresso em Álgebra ainda)
- ✅ Apenas módulos "vazios" serão deletados
- ✅ Conteúdo real (17 aulas) será preservado e reorganizado

**RECOMENDAÇÃO:** Executar as queries de correção em sequência.
