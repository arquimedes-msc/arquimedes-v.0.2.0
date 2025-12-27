# Arquimedes - Lista de Tarefas

**Última atualização:** 25/12/2024  
**Versão:** v2.46.0  
**Progresso:** 95%

> Para histórico completo de tarefas concluídas, consulte `TODO_ARCHIVE.md`

---

## ✅ Concluídas Recentemente

### Limpeza de Código (25/12/2024)
- [x] Remover 50+ arquivos duplicados e desatualizados
- [x] Corrigir erros TypeScript (FunctionGraph, UnifiedExerciseRoomPage, db.ts)
- [x] Sincronizar com GitHub
- [x] Arquivar tarefas antigas do todo.md (criado TODO_ARCHIVE.md)

### Melhorias UX/UI (25/12/2024)
- [x] Simplificar sidebar (9 → 4 itens)
- [x] Estilizar H1, botões e CTAs com efeitos visuais
- [x] Implementar sistema de inscrição em cursos

### Expansão de Exercícios (25/12/2024)
- [x] Aritmética: 157+ exercícios (Adição, Subtração, Multiplicação, Divisão, Porcentagem)
- [x] Álgebra: 50 exercícios (4 módulos)
- [x] Total: 207+ exercícios validados

---

## 🔄 Em Andamento

### Manutenção
- [x] Mover scripts de seed para scripts/archive/

### Nomenclatura de Módulos (25/12/2024)
- [x] Identificar módulos com nomes genéricos (Módulo 120001-120005)
- [x] Criar módulos faltantes no banco de dados com nomes descritivos
- [x] Atualizar: Frações, Números Decimais, Razão e Proporção, Potenciação e Radiciação, Números Inteiros

### Página de Download do App (25/12/2024)
- [x] Criar página dedicada para download do app (/baixar-app)
- [x] Adicionar informações sobre recursos do app
- [x] Adicionar botões de download para Android e iOS
- [x] Adicionar requisitos do sistema
- [x] Criar mockup visual do app

### Melhorias nos Filtros da Página de Disciplinas (25/12/2024)
- [x] Adicionar indicador visual de scroll (fade com seta)
- [x] Criar filtro de busca por texto para cursos
- [x] Salvar preferências de filtro no localStorage

---

## 📅 Próximas Tarefas

### Melhorias de Conteúdo
- [ ] Reduzir textos longos nas páginas
- [ ] Adicionar mais vídeos educativos em português
- [ ] Criar exercícios de revisão por módulo

### Funcionalidades Futuras
- [ ] Implementar modo offline (PWA)
- [ ] Adicionar sistema de comentários nas aulas
- [ ] Criar relatórios de progresso para professores
- [ ] Implementar gamificação social (rankings)

---

## 🐛 Bugs Conhecidos

*Nenhum bug crítico no momento*

---

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| Disciplinas | 4 |
| Módulos | 20+ |
| Exercícios | 207+ |
| Páginas de conteúdo | 30+ |
| Vídeos integrados | 15+ |
| Testes unitários | 50+ |
| Erros TypeScript | 0 |


## Qualidade de Código - Recomendações Jules (25/12/2024)

- [x] Remover arquivos Demo (ComponentsDemo, VisualsDemo, InteractiveDemo)
- [x] Modularizar server/db.ts (estrutura criada em server/db/)
- [x] Corrigir tipagens fracas no código próprio (MathContent.tsx, StructuredData.tsx)
- [x] Sincronizar com GitHub

## Modularização do db.ts (Concluída - 25/12/2024)

- [x] Analisar estrutura atual do db.ts
- [x] Criar estrutura modular em server/db/
- [x] Atualizar index.ts com re-exports organizados
- [x] TypeScript compila sem erros
- [ ] Sincronizar com GitHub

## Correções SEO - Página Inicial (Concluída - 25/12/2024)

- [x] Adicionar título H1 na página inicial (já existia: "Arquimedes")
- [x] Adicionar títulos H2 nas seções (já existia: "Matemática Descomplicada para Adultos" e "Entrar")
- [x] Ajustar document.title para 30-60 caracteres (49 chars: "Arquimedes - Matemática Descomplicada para Adultos")


## Correções Dashboard (Concluída - 25/12/2024)

- [x] Remover aba "Continuar Aprendendo" do Dashboard
- [x] Corrigir sistema de sequências (streaks) - agora atualiza no login diário
- [x] Analisar cursos disponíveis - ver relatório abaixo

## Análise e Exercícios (Em Progresso - 25/12/2024)

- [x] Analisar por que Aritmética tem 10 módulos (eram 5) - ver docs/analise-modulos-aritmetica.md
- [x] Adicionar exercícios à Aritmética Intermediária (35 exercícios adicionados)
- [x] Adicionar exercícios à Aritmética Avançada (30 exercícios adicionados)


## Geometria Completa (25/12/2024)

- [x] Criar disciplinas Geometria Básica, Intermediária e Avançada
- [x] Criar 5 módulos para Geometria Básica com aulas completas
- [x] Criar 5 módulos para Geometria Intermediária com aulas completas
- [x] Criar 5 módulos para Geometria Avançada com aulas completas
- [x] Adicionar exercícios para todos os 15 módulos de Geometria (190 exercícios)

## Álgebra Intermediária e Avançada (25/12/2024)

- [x] Verificar estado atual da Álgebra Básica (existe com 5 módulos, 17 aulas, 0 exercícios)
- [x] Criar disciplinas Álgebra Intermediária e Avançada
- [x] Criar 5 módulos para Álgebra Intermediária com aulas completas (22 aulas)
- [x] Criar 5 módulos para Álgebra Avançada com aulas completas (21 aulas)
- [x] Adicionar exercícios para todos os 10 módulos de Álgebra (93 exercícios)

## Álgebra Básica - Exercícios (25/12/2024)

- [x] Adicionar exercícios ao módulo "Introdução às Variáveis e Expressões" (10 exercícios)
- [x] Adicionar exercícios ao módulo "Equações do 1º Grau" (10 exercícios)
- [x] Adicionar exercícios ao módulo "Sistemas de Equações do 1º Grau" (10 exercícios)
- [x] Adicionar exercícios ao módulo "Equações do 2º Grau" (10 exercícios)
- [x] Adicionar exercícios ao módulo "Produtos Notáveis e Fatoração Básica" (10 exercícios)

## Barra de Progresso de Exercícios (25/12/2024)

- [x] Criar componente ExerciseProgressBar
- [x] Adicionar endpoint para buscar progresso de exercícios por módulo (já existia)
- [x] Integrar barra na página de módulos (ModulePage)
- [x] Integrar barra na Sala de Exercícios
- [x] Testar funcionalidade

## Cálculo - Cursos Completos (25/12/2024)

### Cálculo Básico (5 módulos, 21 aulas)
- [x] Criar disciplina "Cálculo Básico" (ID 300004)
- [x] Módulo 1: Funções e Limites (5 aulas)
- [x] Módulo 2: Continuidade de Funções (4 aulas)
- [x] Módulo 3: Derivadas - Conceito e Regras Básicas (5 aulas)
- [x] Módulo 4: Derivadas de Funções Trigonométricas (4 aulas)
- [x] Módulo 5: Análise de Funções com Derivadas (3 aulas)
- [x] Exercícios para Cálculo Básico (100 exercícios - 10 por módulo)

### Cálculo Intermediário (5 módulos, 23 aulas)
- [x] Criar disciplina "Cálculo Intermediário" (ID 300005)
- [x] Módulo 6: Aplicações de Derivadas - Otimização (5 aulas)
- [x] Módulo 7: Derivadas de Ordem Superior e Concavidade (4 aulas)
- [x] Módulo 8: Introdução às Integrais (5 aulas)
- [x] Módulo 9: Técnicas de Integração Básicas (5 aulas)
- [x] Módulo 10: Aplicações de Integrais - Volume e Comprimento (4 aulas)
- [x] Exercícios para Cálculo Intermediário (50 exercícios - 10 por módulo)

### Cálculo Avançado (5 módulos, 22 aulas)
- [x] Criar disciplina "Cálculo Avançado" (ID 300006)
- [x] Módulo 11: Técnicas Avançadas de Integração (5 aulas)
- [x] Módulo 12: Sequências e Séries (5 aulas)
- [x] Módulo 13: Equações Diferenciais Ordinárias (4 aulas)
- [x] Módulo 14: Cálculo de Várias Variáveis (4 aulas)
- [x] Módulo 15: Tópicos Avançados e Revisão para Concursos (4 aulas)
- [x] Exercícios para Cálculo Avançado (50 exercícios - 10 por módulo)


## Página de Disciplinas - Reorganização (25/12/2024)

- [x] Liberar todos os 12 cursos para inscrição
- [x] Organizar por área: Aritmética, Álgebra, Geometria, Cálculo
- [x] Cada área com 3 níveis: Básico, Intermediário, Avançado
- [x] Atualizar visual da página DisciplinesPage


## Sistema de Filtros - Página de Disciplinas (25/12/2024)

- [x] Implementar filtro por área de conhecimento (Aritmética, Álgebra, Geometria, Cálculo)
- [x] Implementar filtro por nível (Básico, Intermediário, Avançado)
- [x] Adicionar opção de visualização (por área ou por nível)
- [x] Manter estado dos filtros durante navegação


## Ícones Visuais por Área - Página de Disciplinas (25/12/2024)

- [x] Adicionar ícone visual para Aritmética (Hash + símbolo "123")
- [x] Adicionar ícone visual para Álgebra (Variable + símbolo "x²")
- [x] Adicionar ícone visual para Geometria (Hexagon + símbolo "△")
- [x] Adicionar ícone visual para Cálculo (Sigma + símbolo "∫")


## Melhorias de Conteúdo e UX (25/12/2024)

### Redução de Textos Longos
- [x] Identificar páginas com textos longos
- [x] Resumir descrições de cursos (8 disciplinas atualizadas)
- [ ] Simplificar textos explicativos

### Sala de Vídeos - Organização por Área e Módulo
- [x] Analisar estrutura atual da Sala de Vídeos
- [x] Adicionar filtro por Área de Conhecimento (Aritmética, Álgebra, Geometria, Cálculo)
- [x] Reorganizar estrutura: área → nível → módulo
- [x] Simplificar layout dos cards (remover duplicação de thumbnail)
- [ ] Adicionar mais vídeos educativos em português

### Exercícios de Revisão por Módulo
- [x] Criar tabela de exercícios de revisão no schema
- [x] Criar procedimentos tRPC para exercícios de revisão
- [x] Criar página de revisão por módulo
- [x] Popular exercícios de revisão para módulos existentes (5 módulos, 25 exercícios)
- [x] Corrigir bug do insertId na função startModuleReview
- [x] Implementar revisão ao final de cada módulo
- [x] Adicionar feedback de desempenho na revisão (explicação após cada resposta)


## Laboratório de Matemática - Explicações Visuais com Manim (25/12/2024)

### Análise e Reorganização
- [x] Analisar estrutura atual do Laboratório de Matemática (19 componentes, 3 níveis)
- [x] Identificar componentes que precisam de reorganização
- [x] Simplificar layout para Mobile First (drawer de navegação, header compacto)
- [x] Remover elementos visuais poluídos/confusos (accordion simplificado)

### Explicações Visuais - Aritmética
- [x] Criar visualização animada para Adição (propriedades, reagrupamento) - ManimAddition
- [ ] Criar visualização animada para Subtração (empréstimo, diferença)
- [x] Criar visualização animada para Multiplicação (área, grupos) - ManimMultiplication
- [ ] Criar visualização animada para Divisão (partição, quociente)ritmo visual, resto)
- [ ] Criar visualização animada para Frações (representação visual, operações### Explicações Visuais - Álgebra
- [x] Criar visualização animada para Variáveis (conceito visual) - ManimVariables
- [x] Criar visualização animada para Equações de 1º grau (balança) - ManimEquations
- [x] Criar visualização animada para Expressões algébricas (incluído em ManimVariables)u (parábola)
- [ ] Criar visualização animada para Sistemas de Equações (interseção de retas)
- [ ] Criar visualização animada para Produtos Notáveis (área geométrica)

###### PWA Mobile First
- [x] Criar manifest.json com configurações do app
- [x] Criar service worker para funcionamento offline
- [x] Gerar ícones em múltiplos tamanhos (72, 96, 128, 144, 152, 192, 384, 512)
- [x] Criar página offline.html para quando não houver conexão
- [x] Registrar service worker no main.tsx
- [ ] Testar instalação em dispositivos móveisveis
- [ ] Otimizar CSS para breakpoints mobile (320px, 375px, 414px)
- [ ] Implementar gestos touch-friendly nos componentes interativos


## Screenshots e QR Codes - Página de Download (25/12/2024)

- [x] Capturar screenshots reais do app (Dashboard, Aulas, Exercícios)
- [x] Gerar QR codes para download do app (Android e iOS)
- [x] Atualizar página de download com screenshots reais
- [x] Adicionar QR codes na página de download
- [x] Testar página completa


## Banner de Download na Sidebar (25/12/2024)

- [x] Adicionar banner/card de download do app na sidebar
- [x] Incluir QR code ou link direto para página de download
- [x] Testar visual em diferentes tamanhos de tela


## Melhorias App Download e PWA (25/12/2024)

- [x] Adicionar badge "Novo" no banner de download da sidebar
- [x] Implementar sistema de notificação push para usuários
- [x] Criar página de instalação PWA com instruções
- [x] Testar todas as funcionalidades

## PWA Completo e Service Worker (25/12/2024)

- [x] Criar ícones PWA em múltiplos tamanhos (72, 96, 128, 144, 152, 192, 384, 512)
- [x] Configurar manifest.json completo com todas as propriedades
- [x] Implementar Service Worker com estratégia de cache
- [x] Configurar cache de assets estáticos
- [x] Configurar cache de páginas para offline
- [x] Testar instalação PWA em dispositivos
- [x] Testar funcionalidade offline


## Download Real do App PWA (25/12/2024)

- [x] Implementar botão de instalação real do PWA (beforeinstallprompt)
- [x] Adicionar detecção de plataforma (Android, iOS, Desktop)
- [x] Criar instruções específicas por plataforma
- [x] Testar instalação em dispositivo real


## Gerar APK para Android (25/12/2024)

- [x] Pesquisar ferramentas para gerar APK de PWA (PWABuilder, Bubblewrap)
- [x] Configurar projeto para geração de APK (twa-manifest.json, keystore)
- [x] Gerar arquivo APK (arquimedes-v1.0.0.apk - 1MB)
- [x] Disponibilizar APK para download na página /baixar-app
- [ ] Testar instalação do APK em dispositivo Android


## Digital Asset Links e Google Play Store (25/12/2024)

- [x] Configurar arquivo assetlinks.json para verificação do domínio
- [x] Gerar App Bundle (.aab) para Google Play Store
- [x] Criar documentação de publicação na Play Store
