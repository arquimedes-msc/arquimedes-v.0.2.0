# 📊 Fontes de XP no Arquimedes

Última atualização: 24/12/2024

## ✅ Fontes Implementadas

### 1. Completar Aula
- **XP Ganho:** Variável (baseado no score)
- **Localização:** `LessonPage.tsx` → `handleMarkComplete()`
- **Trigger:** Usuário rola até o final da página ou clica em "Marcar como Concluída"
- **Implementação:** `updateProgressMutation` chama backend que credita XP

### 2. Completar Exercício (NOVO! ✨)
- **XP Ganho:** +5 XP por exercício correto
- **Localização:** `UnifiedExerciseRoomPage.tsx` → `handleAnswer()`
- **Trigger:** Usuário acerta um exercício
- **Implementação:** `awardXPMutation` credita 5 XP + pontos do exercício

### 3. Login Diário
- **XP Ganho:** +10 XP (primeira vez no dia)
- **Localização:** `Dashboard.tsx` → `checkDailyLoginMutation`
- **Trigger:** Usuário acessa o Dashboard
- **Implementação:** `points.checkDailyLogin` verifica e credita

## 🚧 Fontes Planejadas (Não Implementadas)

### 4. Sequência de Dias (Streak)
- **XP Ganho:** +10 XP por dia consecutivo
- **Trigger:** Ao manter streak ativo
- **Status:** ⏳ Pendente

### 5. Completar Módulo Inteiro
- **XP Ganho:** +50 XP bônus
- **Trigger:** Ao completar todas as aulas de um módulo
- **Status:** ⏳ Pendente

### 6. Primeira Conquista do Dia
- **XP Ganho:** +5 XP
- **Trigger:** Ao desbloquear primeira conquista do dia
- **Status:** ⏳ Pendente

### 7. Desafio Diário
- **XP Ganho:** +15 XP por desafio completado
- **Trigger:** Ao completar o desafio do dia
- **Status:** ⏳ Pendente

### 8. Assistir Vídeo Completo
- **XP Ganho:** +3 XP por vídeo
- **Trigger:** Ao assistir vídeo até o final
- **Status:** ⏳ Pendente

## 📈 Progressão de Níveis

A progressão de níveis é calculada pela função `getXPForLevel(level)` no `server/db.ts`:

```typescript
function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}
```

**Exemplos:**
- Nível 1 → 2: 100 XP
- Nível 2 → 3: 150 XP
- Nível 3 → 4: 225 XP
- Nível 4 → 5: 337 XP
- Nível 5 → 6: 506 XP

## 🎯 Recomendações para Melhorar Engajamento

1. **Adicionar XP por tempo de estudo** - +1 XP a cada 5 minutos ativos
2. **Multiplicador de streak** - 2x XP se streak > 7 dias
3. **Bônus de perfeição** - +20 XP ao acertar 10 exercícios seguidos
4. **XP por ajudar outros** - Sistema de comentários/dúvidas (futuro)
5. **Eventos especiais** - Fins de semana com XP dobrado

## 📝 Como Adicionar Nova Fonte de XP

1. Identificar o evento/ação
2. Chamar `awardXP(userId, amount, reason, relatedId?)` no backend
3. Ou usar `trpc.gamification.awardXP.useMutation()` no frontend
4. Adicionar toast de feedback para o usuário
5. Atualizar este documento

---

**Nota:** Todas as transações de XP são registradas na tabela `xp_transactions` para auditoria e análise.
