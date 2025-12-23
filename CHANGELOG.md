# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [2.3.0] - 2025-12-23

### 🐛 Corrigido
- **Tipografia do símbolo R$**: Símbolo monetário brasileiro agora é protegido contra interpretação LaTeX, evitando renderização quebrada como itálico
- **Layout mobile dos botões de navegação**: Botões "Anterior" e "Próximo" agora são empilhados verticalmente em mobile e têm largura máxima de 100% da tela, eliminando scroll horizontal
- **Testes unitários**: Corrigidos 9 testes que falhavam após renomeação de "matematica-basica" para "aritmetica"

### ✨ Adicionado
- **Reestruturação em 4 áreas de conhecimento**:
  - Aritmética (15 módulos estruturados)
  - Álgebra (estrutura planejada)
  - Geometria (estrutura planejada)
  - Cálculo (estrutura planejada)
- **12 novos módulos de Aritmética** (placeholders para expansão futura):
  - Frações
  - Decimais
  - Porcentagem
  - Razão e Proporção
  - Potenciação
  - Radiciação
  - Números Inteiros
  - Múltiplos e Divisores
  - Números Primos
  - Expressões Numéricas
  - Sistemas de Medidas
  - Matemática Financeira Básica
- **Documentação de projeto**:
  - `PROJECT_STATUS.md` com análise detalhada de progresso (65% concluído)
  - Roadmap de 5 fases de desenvolvimento
  - Métricas atualizadas do projeto

### 🔄 Alterado
- **Disciplina "Matemática Básica" renomeada para "Aritmética"**: Reflete melhor a estrutura acadêmica tradicional
- **README.md atualizado**: Agora inclui badge de progresso, métricas atualizadas e link para status do projeto
- **Botões de navegação**: Altura mínima de 48px para melhor acessibilidade mobile
- **Ícones nos botões**: `flex-shrink-0` aplicado para evitar compressão em textos longos

### 📊 Métricas Atuais
- 4 disciplinas (Aritmética, Álgebra, Geometria, Cálculo)
- 15 módulos de Aritmética
- 12 páginas de conteúdo educacional
- 265 exercícios interativos
- 19.736 palavras de conteúdo
- 19/19 testes unitários passando (100%)
- Progresso geral: 65% (232/355 tarefas concluídas)

---

## [0.4.1] - 2024-12-23

### Adicionado
- Indicadores de progresso em porcentagem ao lado de cada módulo no menu hambúrguer
- Endpoints tRPC `moduleProgress.byModule` e `moduleProgress.allModules`
- Helpers de banco de dados `getModuleProgress` e `getAllModulesProgress`
- Badges visuais coloridos para progresso (vermelho 0-30%, amarelo 31-70%, verde 71-100%)
- Sistema de cálculo automático de progresso por módulo

### Corrigido
- Referências de `trpc.progress` para `trpc.moduleProgress` em componentes
- Testes unitários atualizados para nova estrutura de routers

## [0.4.0] - 2024-12-23

### Adicionado
- Menu hambúrguer mobile com navegação lateral deslizante
- Botão fixo no canto superior esquerdo para acesso rápido
- Accordion expansível para disciplinas e módulos
- Quick links (Início/Perfil) no menu
- Autenticação integrada no menu (Entrar/Sair)
- Overlay escuro automático ao abrir menu
- ScrollArea para conteúdo longo
- Ícones coloridos por módulo no menu

### Melhorado
- Experiência de navegação em dispositivos móveis
- Acessibilidade com fechamento via ESC ou clique fora

## [0.3.1] - 2024-12-23

### Adicionado
- Otimização completa Mobile First
- Hero section compacto (padding reduzido 67%)
- Títulos e textos responsivos em 3 breakpoints
- Botões e inputs empilhados verticalmente em mobile
- Áreas de toque mínimas de 48x48px
- Breadcrumb com scroll horizontal
- Grids adaptativos (1→2→3 colunas)
- Viewport tag otimizada

### Melhorado
- Experiência em iPhone SE (375px) e iPhone 12/13/14 (390px)
- Legibilidade em telas pequenas
- Performance de scroll

## [0.3.0] - 2024-12-23

### Adicionado
- Sistema de design completo com paleta de cores expandida
- 9 ícones SVG customizados para operações matemáticas
- Hero section com gradiente azul e decorações
- Cards com sombras elevadas e hover effects
- Animações suaves e transições
- Responsividade mobile-first
- Cores específicas por módulo (verde, laranja, roxo, cyan)

### Melhorado
- Design visual profissional e moderno
- Contraste e legibilidade
- Feedback visual em interações

## [0.2.3] - 2024-12-23

### Adicionado
- Meta tags de SEO completas
- Meta description (155 caracteres)
- Meta keywords relevantes
- Open Graph tags para redes sociais
- Twitter Cards
- Canonical URLs
- Componente SEO reutilizável para páginas dinâmicas
- Idioma atualizado para pt-BR

### Melhorado
- Indexação por motores de busca
- Compartilhamento social

## [0.2.2] - 2024-12-23

### Adicionado
- Arquitetura dual de banco de dados (Manus MySQL + Supabase PostgreSQL)
- Adaptador que alterna via variável `DB_MODE`
- Schema PostgreSQL compatível
- Cliente Supabase configurado
- Documentação completa de integração

### Melhorado
- Flexibilidade entre desenvolvimento e produção
- Preparação para deploy com banco permanente

## [0.2.1] - 2024-12-23

### Adicionado
- Componentes visuais interativos (NumberLine, MultiplicationMatrix)
- Página `/visuals` com demonstrações completas
- Animações para ensino de matemática
- Reta numérica animada
- Matriz visual para multiplicação
- Tabuada organizada

### Melhorado
- Conteúdo da primeira aula de adição expandido para 2000+ palavras
- Exemplos práticos do cotidiano

## [0.2.0] - 2024-12-22

### Adicionado
- Sistema de navegação hierárquica (Disciplina → Módulo → Página)
- Breadcrumb intuitivo
- Renderização de equações LaTeX (KaTeX)
- Sistema de exercícios interativos com validação automática
- Feedback imediato ao aluno
- Histórico de tentativas
- Gestão de progresso do usuário
- Dashboard do aluno com métricas
- Sistema de recomendações de próximas aulas
- Integração LLM para geração de exercícios personalizados
- Sistema de notificações (proprietário e alunos)
- Módulo 1 completo com 3 submódulos (9 páginas)
  - Adição e Subtração (3 páginas)
  - Multiplicação (3 páginas)
  - Divisão (3 páginas)
- Autenticação Manus OAuth
- Perfil de usuário com histórico

### Técnico
- Stack: React 19 + TypeScript + tRPC + Drizzle ORM
- Banco de dados: MySQL/TiDB
- UI: Tailwind CSS 4 + shadcn/ui
- Testes: Vitest (14 testes passando)

---

## Próximas Versões Planejadas

### [0.5.0] - Planejado
- Ícone de check verde para módulos 100% completos
- Sistema de busca rápida no menu
- Modo offline (PWA) com Service Worker
- Expansão de conteúdo das aulas restantes
- Suporte a vídeos do YouTube
- Diagramas interativos SVG

### [1.0.0] - Planejado
- Módulos completos de Física (5 módulos)
- Sistema de conquistas gamificado
- Certificados de conclusão
- Modo professor/administrador
- Analytics avançado

---

## Convenções de Versionamento

- **MAJOR** (X.0.0): Mudanças incompatíveis na API
- **MINOR** (0.X.0): Novas funcionalidades compatíveis
- **PATCH** (0.0.X): Correções de bugs

---

**Desenvolvido com ❤️ pela MSC Consultorias**
