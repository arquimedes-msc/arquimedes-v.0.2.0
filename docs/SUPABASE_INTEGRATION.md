# 🔗 Integração com Supabase

Este documento explica como o projeto Arquimedes está configurado para usar **dois bancos de dados**:

- **Manus (MySQL/TiDB)**: Banco de desenvolvimento (padrão)
- **Supabase (PostgreSQL)**: Banco de produção permanente

---

## 📊 Arquitetura Dual

### Por que dois bancos?

1. **Desenvolvimento rápido**: Manus oferece banco integrado sem configuração
2. **Produção permanente**: Supabase garante persistência de dados
3. **Flexibilidade**: Alternar entre ambientes facilmente

### Como funciona?

O projeto usa um **adaptador de banco de dados** (`server/_core/database.ts`) que detecta automaticamente qual banco usar baseado na variável `DB_MODE`.

---

## ⚙️ Configuração

### Credenciais do Supabase

```env
# URL do projeto
SUPABASE_URL=https://njwaigzkmzhtwvxumpsg.supabase.co

# Chaves de API
SUPABASE_ANON_KEY=sb_publishable_TAy7GsDpxc--jY8s49H03Q_jwOIDeqO
SUPABASE_SERVICE_KEY=sb_secret_AplbxpeLKzk4bEcAqFa5xg_qXA57CWT

# String de conexão PostgreSQL
SUPABASE_DATABASE_URL=postgresql://postgres:Msc@2025@db.njwaigzkmzhtwvxumpsg.supabase.co:5432/postgres

# Modo do banco: 'manus' ou 'supabase'
DB_MODE=manus
```

### Para desenvolvimento (padrão)

```bash
# Usa Manus (MySQL)
DB_MODE=manus pnpm dev
```

### Para produção

```bash
# Usa Supabase (PostgreSQL)
DB_MODE=supabase pnpm start
```

---

## 📁 Arquivos Criados

### Schema PostgreSQL

- **Arquivo**: `drizzle/schema-postgres.ts`
- **Descrição**: Schema compatível com PostgreSQL/Supabase
- **Diferenças do MySQL**:
  - Usa `serial` ao invés de `autoincrement`
  - Usa `pgEnum` para enums
  - Usa `integer` para booleans (0/1)

### Configuração Drizzle

- **Arquivo**: `drizzle.config.postgres.ts`
- **Uso**: Migrations para Supabase

```bash
# Gerar migrations para Supabase
npx drizzle-kit generate --config=drizzle.config.postgres.ts

# Aplicar migrations
npx drizzle-kit push --config=drizzle.config.postgres.ts
```

### Adaptador de Banco

- **Arquivo**: `server/_core/database.ts`
- **Funções**:
  - `getDb()`: Retorna conexão ativa
  - `getDatabaseMode()`: Retorna 'manus' ou 'supabase'
  - `isSupabase()`: Verifica se está usando Supabase
  - `getDatabaseInfo()`: Informações do banco atual

---

## 🚀 Migração de Dados

### Exportar dados do Manus

```bash
# Conectar ao banco Manus via Management UI
# Database → Export → SQL

# Ou via código:
node scripts/export-data.mjs
```

### Importar para Supabase

```bash
# 1. Aplicar schema
DB_MODE=supabase npx drizzle-kit push --config=drizzle.config.postgres.ts

# 2. Popular dados
DB_MODE=supabase node seed-data.mjs
```

---

## 🔒 Segurança (RLS)

O Supabase usa **Row Level Security** para proteger dados. Configure políticas no painel:

### Exemplo: Proteger progresso do usuário

```sql
-- Usuários só veem seu próprio progresso
CREATE POLICY "Users can view own progress"
ON user_progress
FOR SELECT
USING (auth.uid() = user_id);

-- Usuários só podem atualizar seu próprio progresso
CREATE POLICY "Users can update own progress"
ON user_progress
FOR UPDATE
USING (auth.uid() = user_id);
```

---

## 📝 Diferenças de Sintaxe

### MySQL (Manus) vs PostgreSQL (Supabase)

| Recurso | MySQL | PostgreSQL |
|---------|-------|------------|
| Auto-increment | `autoincrement()` | `serial` |
| Enum | `mysqlEnum()` | `pgEnum()` |
| Boolean | `tinyint(1)` | `integer` (0/1) |
| Timestamp | `timestamp()` | `timestamp()` |
| JSON | `json()` | `jsonb()` |

---

## 🧪 Testes

Os testes usam o banco configurado em `DB_MODE`:

```bash
# Testar com Manus (rápido)
DB_MODE=manus pnpm test

# Testar com Supabase (produção)
DB_MODE=supabase pnpm test
```

---

## 🔧 Troubleshooting

### Erro: "Cannot connect to Supabase"

**Causa**: Sandbox pode ter restrições de rede

**Solução**: 
1. Use Manus para desenvolvimento
2. Configure Supabase em produção (fora do sandbox)

### Erro: "Column not found"

**Causa**: Schema desatualizado

**Solução**:
```bash
# MySQL
pnpm db:push

# PostgreSQL
DB_MODE=supabase npx drizzle-kit push --config=drizzle.config.postgres.ts
```

### Erro: "Authentication failed"

**Causa**: Credenciais incorretas

**Solução**: Verifique `.env` e painel do Supabase

---

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Drizzle ORM PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

**Última atualização**: Dezembro 2024  
**Mantido por**: MSC Consultorias
