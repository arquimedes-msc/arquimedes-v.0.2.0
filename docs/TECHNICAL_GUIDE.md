# Guia Técnico para Desenvolvedores
**Projeto:** Arquimedes  
**Última Atualização:** 23 de Dezembro de 2025

---

## Arquitetura da Aplicação

O Arquimedes segue uma arquitetura **monorepo fullstack** com frontend e backend no mesmo repositório, comunicando-se via **tRPC** para garantir type-safety end-to-end.

### Estrutura de Diretórios

```
arquimedes/
├── client/                 # Frontend React
│   ├── public/            # Assets estáticos
│   └── src/
│       ├── pages/         # Páginas principais (rotas)
│       ├── components/    # Componentes reutilizáveis
│       ├── lib/           # Utilitários (trpc, utils)
│       └── App.tsx        # Configuração de rotas
├── server/                # Backend Express + tRPC
│   ├── routers.ts         # Procedures tRPC (API)
│   ├── db.ts              # Query helpers
│   ├── storage.ts         # Upload S3
│   └── _core/             # Framework (não mexer)
├── drizzle/               # ORM e migrações
│   └── schema.ts          # Definição de tabelas
├── docs/                  # Documentação
└── tests/                 # Testes automatizados
```

### Fluxo de Dados

```
┌─────────────┐
│   Browser   │
│   (React)   │
└──────┬──────┘
       │ trpc.*.useQuery/useMutation
       ↓
┌─────────────┐
│    tRPC     │
│   Client    │
└──────┬──────┘
       │ HTTP POST /api/trpc
       ↓
┌─────────────┐
│    tRPC     │
│   Server    │
└──────┬──────┘
       │ procedure call
       ↓
┌─────────────┐
│  routers.ts │
│ (procedures)│
└──────┬──────┘
       │ db.* helper
       ↓
┌─────────────┐
│    db.ts    │
│  (queries)  │
└──────┬──────┘
       │ Drizzle ORM
       ↓
┌─────────────┐
│   MySQL/    │
│    TiDB     │
└─────────────┘
```

---

## Padrões de Desenvolvimento

### 1. **Criando uma Nova Página**

**Passo 1:** Criar arquivo em `client/src/pages/`
```tsx
// client/src/pages/MinhasPagina.tsx
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";

export default function MinhasPagina() {
  const { data, isLoading } = trpc.minhaQuery.useQuery();

  return (
    <>
      <Sidebar />
      <div className="lg:ml-72 min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Conteúdo */}
      </div>
    </>
  );
}
```

**Passo 2:** Adicionar rota em `client/src/App.tsx`
```tsx
import MinhasPagina from "./pages/MinhasPagina";

// Dentro de <Switch>
<Route path="/minhas" component={MinhasPagina} />
```

**Passo 3:** Adicionar link na Sidebar (se necessário)
```tsx
// client/src/components/Sidebar.tsx
const navigation = [
  { name: "Minhas", href: "/minhas", icon: BookOpen },
];
```

### 2. **Criando uma Nova Procedure tRPC**

**Passo 1:** Adicionar helper em `server/db.ts`
```typescript
export async function getMeusDados(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(minhaTabela)
    .where(eq(minhaTabela.userId, userId));
}
```

**Passo 2:** Criar procedure em `server/routers.ts`
```typescript
meuRouter: router({
  getMeusDados: protectedProcedure.query(async ({ ctx }) => {
    return await db.getMeusDados(ctx.user.id);
  }),
  
  criarDado: protectedProcedure
    .input(z.object({ nome: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Lógica de criação
      return { success: true };
    }),
}),
```

**Passo 3:** Usar no frontend
```tsx
const { data } = trpc.meuRouter.getMeusDados.useQuery();
const criarMutation = trpc.meuRouter.criarDado.useMutation({
  onSuccess: () => {
    utils.meuRouter.getMeusDados.invalidate();
  },
});
```

### 3. **Adicionando uma Nova Tabela**

**Passo 1:** Definir schema em `drizzle/schema.ts`
```typescript
export const minhaTabela = mysqlTable("minhaTabela", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  nome: varchar("nome", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MinhaTabela = typeof minhaTabela.$inferSelect;
export type InsertMinhaTabela = typeof minhaTabela.$inferInsert;
```

**Passo 2:** Aplicar migração
```bash
pnpm db:push
```

**Passo 3:** Importar em `server/db.ts`
```typescript
import { minhaTabela } from "../drizzle/schema";
```

### 4. **Criando um Teste**

**Passo 1:** Criar arquivo `server/meu-feature.test.ts`
```typescript
import { describe, it, expect, beforeAll } from "vitest";
import { createCaller } from "./routers";

describe("Minha Feature", () => {
  let caller: ReturnType<typeof createCaller>;
  let testUserId: number;

  beforeAll(async () => {
    // Setup
    caller = createCaller({ user: { id: 1, role: "user" } });
  });

  it("deve retornar dados corretos", async () => {
    const result = await caller.meuRouter.getMeusDados();
    expect(result).toBeDefined();
  });
});
```

**Passo 2:** Rodar testes
```bash
pnpm test
```

---

## Convenções de Código

### **Nomenclatura**

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componentes React | PascalCase | `DashboardPage.tsx` |
| Funções/Variáveis | camelCase | `getUserStats()` |
| Procedures tRPC | camelCase | `getActivityHistory` |
| Routers tRPC | camelCase | `user`, `dashboard` |
| Tabelas SQL | camelCase | `userXP`, `pageProgress` |
| Tipos TypeScript | PascalCase | `User`, `PageProgress` |
| Constantes | UPPER_SNAKE_CASE | `MAX_UPLOAD_SIZE` |

### **Estrutura de Componentes**

```tsx
// 1. Imports
import { useState } from "react";
import { trpc } from "@/lib/trpc";

// 2. Types (se necessário)
interface Props {
  userId: number;
}

// 3. Componente
export default function MeuComponente({ userId }: Props) {
  // 3.1 Hooks de estado
  const [isOpen, setIsOpen] = useState(false);
  
  // 3.2 Queries tRPC
  const { data } = trpc.user.getData.useQuery({ userId });
  
  // 3.3 Mutations tRPC
  const updateMutation = trpc.user.update.useMutation();
  
  // 3.4 Handlers
  const handleClick = () => {
    updateMutation.mutate({ userId, data: "novo" });
  };
  
  // 3.5 Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### **Tratamento de Erros**

**Frontend:**
```tsx
const { data, error, isLoading } = trpc.user.getData.useQuery();

if (isLoading) return <Spinner />;
if (error) return <ErrorMessage message={error.message} />;
if (!data) return <EmptyState />;

return <Content data={data} />;
```

**Backend:**
```typescript
import { TRPCError } from "@trpc/server";

myProcedure: protectedProcedure.mutation(async ({ ctx }) => {
  const result = await db.doSomething();
  
  if (!result) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Recurso não encontrado",
    });
  }
  
  return result;
}),
```

### **Otimização de Queries**

**Usar `enabled` para queries condicionais:**
```tsx
const { data } = trpc.user.getData.useQuery(
  { userId },
  { enabled: !!userId } // Só executa se userId existir
);
```

**Invalidar cache após mutations:**
```tsx
const utils = trpc.useUtils();

const createMutation = trpc.user.create.useMutation({
  onSuccess: () => {
    utils.user.getAll.invalidate(); // Recarrega lista
  },
});
```

**Optimistic updates para UX instantânea:**
```tsx
const utils = trpc.useUtils();

const toggleMutation = trpc.user.toggle.useMutation({
  onMutate: async (newData) => {
    await utils.user.getData.cancel();
    const previousData = utils.user.getData.getData();
    utils.user.getData.setData(undefined, newData);
    return { previousData };
  },
  onError: (err, newData, context) => {
    utils.user.getData.setData(undefined, context?.previousData);
  },
});
```

---

## Debugging

### **Frontend**

**React DevTools:**
```bash
# Instalar extensão no Chrome
https://chrome.google.com/webstore/detail/react-developer-tools
```

**Console Logs:**
```tsx
console.log("Data:", data);
console.error("Error:", error);
```

**tRPC DevTools:**
```tsx
// Ver todas as queries/mutations no console
localStorage.setItem("trpc-debug", "true");
```

### **Backend**

**Logs de Procedures:**
```typescript
myProcedure: protectedProcedure.query(async ({ ctx }) => {
  console.log("User:", ctx.user);
  const result = await db.getData();
  console.log("Result:", result);
  return result;
}),
```

**Logs de SQL:**
```typescript
// drizzle.config.ts
export default {
  verbose: true, // Mostra queries SQL no console
};
```

### **Banco de Dados**

**Acessar banco via UI:**
- Ir para Management UI → Database
- Ver todas as tabelas e dados

**Executar SQL manualmente:**
```typescript
// No código
const db = await getDb();
const result = await db.execute(sql`SELECT * FROM users WHERE id = 1`);
```

---

## Performance

### **Frontend**

**Lazy Loading de Páginas:**
```tsx
import { lazy, Suspense } from "react";

const MinhasPagina = lazy(() => import("./pages/MinhasPagina"));

<Suspense fallback={<Spinner />}>
  <Route path="/minhas" component={MinhasPagina} />
</Suspense>
```

**Memoização de Componentes:**
```tsx
import { memo } from "react";

const MeuComponente = memo(({ data }) => {
  return <div>{data}</div>;
});
```

**Debounce de Inputs:**
```tsx
import { useDebouncedValue } from "@/hooks/useDebounce";

const [search, setSearch] = useState("");
const debouncedSearch = useDebouncedValue(search, 500);

const { data } = trpc.search.useQuery({ query: debouncedSearch });
```

### **Backend**

**Indexes no Banco:**
```typescript
// drizzle/schema.ts
export const users = mysqlTable("users", {
  email: varchar("email", { length: 320 }).unique(), // Index automático
}, (table) => ({
  emailIdx: index("email_idx").on(table.email), // Index manual
}));
```

**Limitar Resultados:**
```typescript
const results = await db
  .select()
  .from(pages)
  .limit(20); // Máximo 20 resultados
```

**Evitar N+1 Queries:**
```typescript
// ❌ Ruim: N+1 queries
const users = await db.select().from(users);
for (const user of users) {
  const posts = await db.select().from(posts).where(eq(posts.userId, user.id));
}

// ✅ Bom: 1 query com join
const usersWithPosts = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.userId));
```

---

## Segurança

### **Autenticação**

**Sempre usar `protectedProcedure` para rotas privadas:**
```typescript
// ✅ Correto
myProcedure: protectedProcedure.query(async ({ ctx }) => {
  // ctx.user está garantido
  return await db.getUserData(ctx.user.id);
}),

// ❌ Errado
myProcedure: publicProcedure.query(async ({ ctx }) => {
  // ctx.user pode ser undefined
  return await db.getUserData(ctx.user?.id); // Erro!
}),
```

### **Validação de Inputs**

**Sempre validar com Zod:**
```typescript
createUser: protectedProcedure
  .input(z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    age: z.number().int().min(0).max(150),
  }))
  .mutation(async ({ input }) => {
    // input está validado e tipado
  }),
```

### **Upload de Arquivos**

**Validar tamanho e tipo:**
```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

if (file.size > MAX_FILE_SIZE) {
  throw new TRPCError({ code: "BAD_REQUEST", message: "Arquivo muito grande" });
}

if (!ALLOWED_TYPES.includes(file.type)) {
  throw new TRPCError({ code: "BAD_REQUEST", message: "Tipo de arquivo inválido" });
}
```

### **SQL Injection**

**Sempre usar Drizzle ORM (nunca SQL raw):**
```typescript
// ✅ Seguro: Drizzle escapa automaticamente
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, userInput));

// ❌ Perigoso: SQL injection
const user = await db.execute(
  sql`SELECT * FROM users WHERE email = '${userInput}'`
);
```

---

## Deploy

### **Ambiente de Desenvolvimento**

```bash
pnpm dev
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3000/api`
- Hot reload ativado

### **Ambiente de Produção**

**Build:**
```bash
pnpm build
```

**Preview:**
```bash
pnpm preview
```

**Deploy Automático:**
- Push para `main` → Deploy automático via Manus
- URL: `https://3000-izawxsbz194xne7hs1lhx-bbd42229.us2.manus.computer`

### **Variáveis de Ambiente**

**Não editar diretamente:**
- `DATABASE_URL`
- `JWT_SECRET`
- `OAUTH_SERVER_URL`
- `BUILT_IN_FORGE_API_KEY`

**Adicionar novas via Management UI:**
- Settings → Secrets → Add Secret

---

## Troubleshooting

### **Problema: "Cannot find module '@/...'"**

**Solução:** Verificar `tsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./client/src/*"]
    }
  }
}
```

### **Problema: "Property does not exist on type"**

**Solução:** Regenerar tipos tRPC
```bash
# Reiniciar servidor
pnpm dev
```

### **Problema: "Failed to fetch"**

**Solução:** Verificar se backend está rodando
```bash
# Ver logs do servidor
pnpm dev
```

### **Problema: "Migration failed"**

**Solução:** Resetar banco (cuidado: apaga dados)
```bash
pnpm db:push --force
```

### **Problema: Testes falhando**

**Solução:** Limpar cache de testes
```bash
pnpm test --clearCache
pnpm test
```

---

## Recursos Úteis

**Documentação:**
- [React 19](https://react.dev)
- [tRPC](https://trpc.io)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Zod](https://zod.dev)

**Ferramentas:**
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

**Comunidade:**
- [Discord do Manus](https://discord.gg/manus)
- [GitHub Discussions](https://github.com/MSC-Consultoria/arquimedes0.0.1/discussions)

---

**Última Atualização:** 23 de Dezembro de 2025  
**Versão:** v2.11.0
