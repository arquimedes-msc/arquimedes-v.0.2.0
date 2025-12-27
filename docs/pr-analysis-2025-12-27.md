# Análise dos últimos Pull Requests

Este documento resume os cinco últimos PRs mergeados na branch atual (ordenados do mais recente para o mais antigo segundo `git log`).

## PR #17 – 🛡️ Sentinel: CRITICAL Fix Privilege Escalation
- **Contexto:** Corrige vulnerabilidade crítica em endpoint administrativo.
- **Mudança principal:** `admin.resetUserProgress` agora usa `adminProcedure` em vez de `protectedProcedure`, garantindo que apenas usuários com papel de admin possam executar a ação.
- **Arquivo afetado:** `server/routers.ts` (admin router).

## PR #15 – ⚡ Bolt: Memoize XPDisplay Component
- **Contexto:** Otimização de renderização do componente de XP.
- **Mudança principal:** Encapsulamento do componente `XPDisplay` com `React.memo`, evitando re-renderizações desnecessárias quando o componente pai atualiza.
- **Arquivo afetado:** `client/src/components/XPDisplay.tsx`.

## PR #14 – 🛡️ Sentinel: [CRITICAL] Fix Authorization Bypass on Admin Endpoint
- **Contexto:** Corrige bypass de autorização no mesmo endpoint administrativo citado acima.
- **Mudança principal:** Substituição de `protectedProcedure` por `adminProcedure` em `admin.resetUserProgress`, restringindo a operação a administradores.
- **Arquivo afetado:** `server/routers.ts` (admin router).

## PR #18 – 🎨 Palette: Add loading state to login button
- **Contexto:** Melhora UX durante o fluxo de login.
- **Mudança principal:** Botão "Continuar com Google" passa a exibir `Spinner` e estado de "Redirecionando..." enquanto a autenticação é iniciada; botão também fica desabilitado durante o loading.
- **Arquivo afetado:** `client/src/pages/LoginPage.tsx`.

## PR #13 – ⚡ Bolt: Otimiza o ExerciseCard com React.memo
- **Contexto:** Otimização de desempenho para cartas de exercícios renderizadas em listas.
- **Mudança principal:** `ExerciseCard` foi envolvido por `React.memo`, reduzindo re-renderizações quando as props não mudam.
- **Arquivo afetado:** `client/src/components/ExerciseCard.tsx`.
