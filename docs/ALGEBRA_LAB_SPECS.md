# 🧪 Especificações Técnicas - Laboratório de Álgebra

**Versão:** 3.0.0  
**Data:** Dezembro 2024  
**Status:** Especificações Completas

---

## ✅ Demo 1: Balança de Equações (IMPLEMENTADA)

**Arquivo:** `client/src/components/algebra-lab/BalancaEquacoes.tsx`

**Status:** ✅ Implementada e funcional

**Tecnologias:** React, Framer Motion

**Funcionalidades:**
- Balança animada com rotação baseada em desequilíbrio
- Adicionar/remover pesos dos dois lados
- Cálculo automático de totais
- Feedback visual de equilíbrio
- Dica pedagógica

---

## 📝 Demo 2: Visualizador de Variáveis

**Arquivo:** `client/src/components/algebra-lab/VisualizadorVariaveis.tsx`

**Conceito:** Mostrar como variáveis representam valores que mudam

**Interface:**
```tsx
- Slider para x (range: 0 a 10)
- Display de expressões:
  * x (valor atual)
  * 2x (dobro)
  * x + 5 (soma)
  * 3x - 2 (expressão complexa)
- Código de cores para cada expressão
- Animação suave ao mudar x
```

**Tecnologias:** React, Framer Motion, Slider (shadcn/ui)

**Implementação:**
```tsx
const [x, setX] = useState(5);

<Slider value={[x]} onValueChange={([val]) => setX(val)} min={0} max={10} />

<motion.div animate={{ scale: [1, 1.1, 1] }} key={x}>
  <div>x = {x}</div>
  <div>2x = {2 * x}</div>
  <div>x + 5 = {x + 5}</div>
  <div>3x - 2 = {3 * x - 2}</div>
</motion.div>
```

**Cores sugeridas:**
- x: azul (#3B82F6)
- 2x: roxo (#8B5CF6)
- x+5: verde (#10B981)
- 3x-2: laranja (#F59E0B)

---

## 📝 Demo 3: Resolver Equação 1º Grau (Passo a Passo)

**Arquivo:** `client/src/components/algebra-lab/ResolverEquacao1Grau.tsx`

**Conceito:** Animação passo a passo da resolução de equação

**Interface:**
```tsx
- Input para equação (ex: "3x - 7 = 14")
- Botão "Próximo Passo"
- Display da equação atual com highlight
- Explicação textual de cada passo
- Barra de progresso (Passo X de Y)
```

**Passos de resolução (exemplo: 3x - 7 = 14):**
1. Equação inicial: 3x - 7 = 14
2. Adicionar 7 aos dois lados: 3x = 21
3. Dividir ambos os lados por 3: x = 7
4. Solução: x = 7

**Tecnologias:** React, GSAP (animação de highlight), useState para controle de passos

**Implementação:**
```tsx
const steps = [
  { equation: "3x - 7 = 14", explanation: "Equação inicial" },
  { equation: "3x = 21", explanation: "Adicionar 7 aos dois lados" },
  { equation: "x = 7", explanation: "Dividir ambos os lados por 3" },
];

const [currentStep, setCurrentStep] = useState(0);
```

---

## 📝 Demo 4: Gráfico de Equação Linear

**Arquivo:** `client/src/components/algebra-lab/GraficoEquacaoLinear.tsx`

**Conceito:** Visualizar equação do 1º grau como reta no plano cartesiano

**Interface:**
```tsx
- Slider para coeficiente a (range: -5 a 5)
- Slider para coeficiente b (range: -10 a 10)
- Canvas com plano cartesiano
- Reta desenhada dinamicamente
- Display da equação: y = ax + b
- Mostrar interseção com eixos
```

**Tecnologias:** React, Canvas API ou SVG

**Implementação (Canvas):**
```tsx
const [a, setA] = useState(2);
const [b, setB] = useState(3);

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  // Desenhar eixos
  ctx.strokeStyle = '#000';
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
  
  // Desenhar reta y = ax + b
  ctx.strokeStyle = '#3B82F6';
  ctx.beginPath();
  for (let x = -10; x <= 10; x += 0.1) {
    const y = a * x + b;
    const canvasX = (x + 10) * (canvas.width / 20);
    const canvasY = canvas.height / 2 - y * 20;
    if (x === -10) ctx.moveTo(canvasX, canvasY);
    else ctx.lineTo(canvasX, canvasY);
  }
  ctx.stroke();
}, [a, b]);
```

---

## 📝 Demo 5: Sistema 2x2 Gráfico

**Arquivo:** `client/src/components/algebra-lab/Sistema2x2Grafico.tsx`

**Conceito:** Visualizar sistema de equações como interseção de retas

**Interface:**
```tsx
- Sliders para equação 1: y = a₁x + b₁
- Sliders para equação 2: y = a₂x + b₂
- Canvas com plano cartesiano
- Duas retas com cores diferentes
- Ponto de interseção destacado
- Display da solução (x, y)
```

**Tecnologias:** React, Canvas API

**Cores sugeridas:**
- Reta 1: azul (#3B82F6)
- Reta 2: vermelho (#EF4444)
- Ponto de interseção: verde (#10B981)

**Cálculo da interseção:**
```tsx
// Sistema: y = a1*x + b1, y = a2*x + b2
// Interseção: a1*x + b1 = a2*x + b2
const x = (b2 - b1) / (a1 - a2);
const y = a1 * x + b1;
```

---

## 📝 Demo 6: Sistema 2x2 Substituição (Animado)

**Arquivo:** `client/src/components/algebra-lab/Sistema2x2Substituicao.tsx`

**Conceito:** Animação do método da substituição passo a passo

**Interface:**
```tsx
- Input para sistema (ex: "x + y = 5, 2x - y = 1")
- Botão "Próximo Passo"
- Display das equações com highlight
- Animação de substituição
- Explicação textual
```

**Passos (exemplo: {x + y = 5, 2x - y = 1}):**
1. Sistema inicial
2. Isolar y na equação 1: y = 5 - x
3. Substituir na equação 2: 2x - (5 - x) = 1
4. Simplificar: 3x - 5 = 1
5. Resolver: x = 2
6. Voltar: y = 5 - 2 = 3
7. Solução: (2, 3)

**Tecnologias:** React, GSAP (animação de substituição), Framer Motion

---

## 📝 Demo 7: Parábola Interativa

**Arquivo:** `client/src/components/algebra-lab/ParabolaInterativa.tsx`

**Conceito:** Visualizar equação do 2º grau como parábola

**Interface:**
```tsx
- Slider para a (range: -3 a 3, step: 0.1)
- Slider para b (range: -10 a 10)
- Slider para c (range: -10 a 10)
- Canvas com plano cartesiano
- Parábola desenhada dinamicamente
- Mostrar vértice, raízes, eixo de simetria
- Display da equação: y = ax² + bx + c
```

**Tecnologias:** React, Canvas API

**Elementos visuais:**
- Parábola: azul (#3B82F6)
- Vértice: verde (#10B981)
- Raízes: vermelho (#EF4444)
- Eixo de simetria: cinza tracejado

**Cálculos:**
```tsx
// Vértice
const xv = -b / (2 * a);
const yv = a * xv * xv + b * xv + c;

// Raízes (Bhaskara)
const delta = b * b - 4 * a * c;
if (delta >= 0) {
  const x1 = (-b + Math.sqrt(delta)) / (2 * a);
  const x2 = (-b - Math.sqrt(delta)) / (2 * a);
}
```

---

## 📝 Demo 8: Bhaskara Visual

**Arquivo:** `client/src/components/algebra-lab/BhaskaraVisual.tsx`

**Conceito:** Animação do cálculo de Bhaskara com discriminante

**Interface:**
```tsx
- Inputs para a, b, c
- Botão "Calcular"
- Display do cálculo de Δ com animação
- Interpretação do discriminante
- Animação do cálculo das raízes
- Gráfico da parábola com raízes destacadas
```

**Passos de animação:**
1. Mostrar fórmula: Δ = b² - 4ac
2. Substituir valores: Δ = (b)² - 4(a)(c)
3. Calcular: Δ = X
4. Interpretar:
   - Δ > 0: "2 raízes reais distintas"
   - Δ = 0: "1 raiz real (dupla)"
   - Δ < 0: "Sem raízes reais"
5. Se Δ ≥ 0, calcular raízes com animação
6. Mostrar gráfico com raízes

**Tecnologias:** React, GSAP (animação de cálculo), Canvas API

---

## 📝 Demo 9: Produtos Notáveis Visual

**Arquivo:** `client/src/components/algebra-lab/ProdutosNotaveisVisual.tsx`

**Conceito:** Visualização geométrica de (a+b)²

**Interface:**
```tsx
- Slider para a (range: 1 a 5)
- Slider para b (range: 1 a 5)
- SVG com quadrado dividido em 4 partes
- Código de cores para cada parte:
  * a² (azul)
  * ab (verde, 2 partes)
  * b² (roxo)
- Display da expansão: (a+b)² = a² + 2ab + b²
- Animação de expansão
```

**Tecnologias:** React, SVG, GSAP (animação de expansão)

**Implementação SVG:**
```tsx
<svg viewBox="0 0 200 200">
  {/* Quadrado a² */}
  <rect x="0" y="0" width={a*20} height={a*20} fill="#3B82F6" />
  
  {/* Retângulo ab (superior) */}
  <rect x={a*20} y="0" width={b*20} height={a*20} fill="#10B981" />
  
  {/* Retângulo ab (esquerdo) */}
  <rect x="0" y={a*20} width={a*20} height={b*20} fill="#10B981" />
  
  {/* Quadrado b² */}
  <rect x={a*20} y={a*20} width={b*20} height={b*20} fill="#8B5CF6" />
</svg>
```

---

## 📝 Demo 10: Fatoração Interativa

**Arquivo:** `client/src/components/algebra-lab/FatoracaoInterativa.tsx`

**Conceito:** Arrastar termos para fatorar expressões

**Interface:**
```tsx
- Expressão inicial (ex: 6x + 9)
- Área de "Fator Comum" (arrastar para cá)
- Área de "Parênteses" (arrastar termos restantes)
- Validação automática
- Animação de sucesso/erro
- Botão "Nova Expressão"
```

**Exemplos de expressões:**
1. 6x + 9 → 3(2x + 3)
2. x² + 5x → x(x + 5)
3. 4x² - 9 → (2x + 3)(2x - 3)
4. x² + 6x + 9 → (x + 3)²

**Tecnologias:** React, React DnD (drag and drop), Framer Motion

**Implementação (simplificada):**
```tsx
const [expression, setExpression] = useState("6x + 9");
const [factorArea, setFactorArea] = useState<string[]>([]);
const [parenthesesArea, setParenthesesArea] = useState<string[]>([]);

const validate = () => {
  // Verificar se fatoração está correta
  const correct = factorArea.includes("3") && 
                  parenthesesArea.includes("2x") && 
                  parenthesesArea.includes("3");
  return correct;
};
```

---

## 📊 Resumo de Implementação

| Demo | Arquivo | Tecnologias | Complexidade | Status |
|------|---------|-------------|--------------|--------|
| 1. Balança | BalancaEquacoes.tsx | React, Framer Motion | Média | ✅ Implementada |
| 2. Visualizador | VisualizadorVariaveis.tsx | React, Framer Motion, Slider | Baixa | 📝 Especificada |
| 3. Resolver 1º Grau | ResolverEquacao1Grau.tsx | React, GSAP | Média | 📝 Especificada |
| 4. Gráfico Linear | GraficoEquacaoLinear.tsx | React, Canvas API | Média | 📝 Especificada |
| 5. Sistema Gráfico | Sistema2x2Grafico.tsx | React, Canvas API | Alta | 📝 Especificada |
| 6. Sistema Substituição | Sistema2x2Substituicao.tsx | React, GSAP, Framer Motion | Alta | 📝 Especificada |
| 7. Parábola | ParabolaInterativa.tsx | React, Canvas API | Alta | 📝 Especificada |
| 8. Bhaskara | BhaskaraVisual.tsx | React, GSAP, Canvas | Alta | 📝 Especificada |
| 9. Produtos Notáveis | ProdutosNotaveisVisual.tsx | React, SVG, GSAP | Média | 📝 Especificada |
| 10. Fatoração | FatoracaoInterativa.tsx | React, React DnD, Framer Motion | Alta | 📝 Especificada |

---

## 🔧 Dependências Necessárias

Já instaladas:
- ✅ react
- ✅ framer-motion
- ✅ @radix-ui/react-slider (shadcn/ui)

A instalar:
- ⏳ gsap (animações avançadas)
- ⏳ react-dnd (drag and drop)
- ⏳ react-dnd-html5-backend

**Comando de instalação:**
```bash
pnpm add gsap react-dnd react-dnd-html5-backend
```

---

## 🎨 Paleta de Cores Padrão

```css
/* Cores principais */
--algebra-blue: #3B82F6;
--algebra-purple: #8B5CF6;
--algebra-green: #10B981;
--algebra-orange: #F59E0B;
--algebra-red: #EF4444;

/* Fundos */
--bg-demo: linear-gradient(to bottom right, #EFF6FF, #EDE9FE);
--bg-card: #FFFFFF;

/* Bordas */
--border-demo: #DBEAFE;
```

---

## 📱 Responsividade

Todas as demos devem ser responsivas:

**Desktop (≥1024px):**
- Canvas: 800x600px
- Sliders: largura máxima 400px
- Layout: horizontal quando possível

**Tablet (768px - 1023px):**
- Canvas: 600x450px
- Sliders: largura máxima 300px
- Layout: vertical se necessário

**Mobile (<768px):**
- Canvas: 100% width, height proporcional
- Sliders: largura 100%
- Layout: sempre vertical
- Controles maiores (touch-friendly)

---

## ♿ Acessibilidade

**Requisitos:**
- Todos os sliders devem ter `aria-label`
- Botões devem ter texto descritivo
- Canvas deve ter `aria-label` descrevendo o gráfico
- Suporte a navegação por teclado
- Contraste mínimo WCAG AA (4.5:1)

**Exemplo:**
```tsx
<Slider
  aria-label="Coeficiente a da equação"
  value={[a]}
  onValueChange={([val]) => setA(val)}
/>
```

---

## 🧪 Testes Recomendados

Para cada demo:
1. ✅ Renderização inicial sem erros
2. ✅ Interação com sliders/inputs
3. ✅ Cálculos matemáticos corretos
4. ✅ Animações funcionando
5. ✅ Responsividade em mobile
6. ✅ Acessibilidade (navegação por teclado)

---

## 📝 Próximos Passos

1. ✅ Especificações completas (este documento)
2. ⏳ Instalar dependências (gsap, react-dnd)
3. ⏳ Implementar demos 2-10 conforme necessário
4. ⏳ Integrar no MathLabPage.tsx
5. ⏳ Testar em diferentes dispositivos
6. ⏳ Ajustar animações e performance

---

**Última atualização:** Dezembro 2024  
**Próxima revisão:** Após implementação das demos
