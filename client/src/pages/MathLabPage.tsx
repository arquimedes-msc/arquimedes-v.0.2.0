import { useState } from "react";
import { Beaker, ChevronDown, ChevronUp, GraduationCap, BookOpen, Rocket } from "lucide-react";
// Básico - Operações Fundamentais
import { StackableBlocks } from "../components/mathlab/StackableBlocks";
import { AnimatedNumberLine } from "../components/mathlab/AnimatedNumberLine";
import { RemovableBlocks } from "../components/mathlab/RemovableBlocks";
import { SubtractionNumberLine } from "../components/mathlab/SubtractionNumberLine";
import { MultiplicationMatrix } from "../components/mathlab/MultiplicationMatrix";
import { GroupedObjects } from "../components/mathlab/GroupedObjects";
import { DivisionGroups } from "../components/mathlab/DivisionGroups";
import { DivisionRemainder } from "../components/mathlab/DivisionRemainder";
import { PercentageBar } from "../components/mathlab/PercentageBar";
import { PercentagePie } from "../components/mathlab/PercentagePie";
import { FractionPizza } from "../components/mathlab/FractionPizza";
import { VisualMultiplicationTable } from "../components/mathlab/VisualMultiplicationTable";
// Intermediário
import { FunctionGraph } from "../components/mathlab/FunctionGraph";
import { PythagorasTheorem } from "../components/mathlab/PythagorasTheorem";
import { DiceProbability } from "../components/mathlab/DiceProbability";
// Avançado
import { BaseConverter } from "../components/mathlab/BaseConverter";
import { ProgressionVisualizer } from "../components/mathlab/ProgressionVisualizer";
import { PrimeFactorization } from "../components/mathlab/PrimeFactorization";
import { CombinatoricsVisualizer } from "../components/mathlab/CombinatoricsVisualizer";
import { Sidebar } from "../components/Sidebar";
import { MobileNav } from "../components/MobileNav";

// Tipos
type LevelType = "basico" | "intermediario" | "avancado";
type CategoryType = string;

interface Demo {
  id: string;
  title: string;
  description: string;
  icon: string;
  component: React.ReactNode;
}

interface Category {
  id: CategoryType;
  title: string;
  emoji: string;
  color: string;
  demos: Demo[];
}

interface Level {
  id: LevelType;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  categories: Category[];
}

export default function MathLabPage() {
  const [selectedLevel, setSelectedLevel] = useState<LevelType>("basico");
  const [openAccordion, setOpenAccordion] = useState<CategoryType | null>("adicao");
  const [selectedDemo, setSelectedDemo] = useState<string>("blocos-empilhaveis");

  const levels: Level[] = [
    {
      id: "basico",
      title: "Básico",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-green-600",
      bgColor: "bg-green-500",
      categories: [
        {
          id: "adicao",
          title: "Adição",
          emoji: "➕",
          color: "bg-green-50 border-green-200",
          demos: [
            {
              id: "blocos-empilhaveis",
              title: "Blocos Empilháveis",
              description: "Visualize a soma empilhando blocos coloridos",
              icon: "🧱",
              component: <StackableBlocks />,
            },
            {
              id: "reta-numerica-adicao",
              title: "Reta Numérica",
              description: "Veja a adição como movimento para direita",
              icon: "📏",
              component: <AnimatedNumberLine />,
            },
          ],
        },
        {
          id: "subtracao",
          title: "Subtração",
          emoji: "➖",
          color: "bg-orange-50 border-orange-200",
          demos: [
            {
              id: "blocos-removiveis",
              title: "Blocos Removíveis",
              description: "Remova blocos para visualizar a subtração",
              icon: "🧱",
              component: <RemovableBlocks />,
            },
            {
              id: "reta-numerica-subtracao",
              title: "Reta Numérica",
              description: "Veja a subtração como movimento para esquerda",
              icon: "📏",
              component: <SubtractionNumberLine />,
            },
          ],
        },
        {
          id: "multiplicacao",
          title: "Multiplicação",
          emoji: "✖️",
          color: "bg-purple-50 border-purple-200",
          demos: [
            {
              id: "matriz-multiplicacao",
              title: "Matriz de Multiplicação",
              description: "Visualize multiplicação como grade de objetos",
              icon: "⬜",
              component: <MultiplicationMatrix />,
            },
            {
              id: "grupos-objetos",
              title: "Grupos de Objetos",
              description: "Entenda multiplicação como grupos repetidos",
              icon: "🍎",
              component: <GroupedObjects />,
            },
            {
              id: "tabuada-visual",
              title: "Tabuada Visual",
              description: "Explore a tabuada com visualizações interativas",
              icon: "🔢",
              component: <VisualMultiplicationTable />,
            },
          ],
        },
        {
          id: "divisao",
          title: "Divisão",
          emoji: "➗",
          color: "bg-blue-50 border-blue-200",
          demos: [
            {
              id: "distribuicao-grupos",
              title: "Distribuição em Grupos",
              description: "Divida objetos igualmente entre grupos",
              icon: "📦",
              component: <DivisionGroups />,
            },
            {
              id: "divisao-resto",
              title: "Divisão com Resto",
              description: "Visualize divisões que deixam resto",
              icon: "🍕",
              component: <DivisionRemainder />,
            },
          ],
        },
        {
          id: "fracoes",
          title: "Frações",
          emoji: "🍕",
          color: "bg-amber-50 border-amber-200",
          demos: [
            {
              id: "pizza-fracoes",
              title: "Pizza de Frações",
              description: "Entenda frações dividindo uma pizza",
              icon: "🍕",
              component: <FractionPizza />,
            },
          ],
        },
        {
          id: "porcentagem",
          title: "Porcentagem",
          emoji: "💯",
          color: "bg-yellow-50 border-yellow-200",
          demos: [
            {
              id: "barra-porcentagem",
              title: "Barra de Porcentagem",
              description: "Visualize porcentagens em uma barra interativa",
              icon: "📊",
              component: <PercentageBar />,
            },
            {
              id: "pizza-porcentagem",
              title: "Pizza de Porcentagem",
              description: "Veja porcentagens como fatias de pizza",
              icon: "🥧",
              component: <PercentagePie />,
            },
          ],
        },
      ],
    },
    {
      id: "intermediario",
      title: "Intermediário",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-500",
      categories: [
        {
          id: "funcoes",
          title: "Funções",
          emoji: "📈",
          color: "bg-blue-50 border-blue-200",
          demos: [
            {
              id: "grafico-funcoes",
              title: "Gráfico de Funções",
              description: "Explore funções lineares, quadráticas e modulares",
              icon: "📊",
              component: <FunctionGraph />,
            },
          ],
        },
        {
          id: "geometria",
          title: "Geometria",
          emoji: "📐",
          color: "bg-purple-50 border-purple-200",
          demos: [
            {
              id: "pitagoras",
              title: "Teorema de Pitágoras",
              description: "Visualize a² + b² = c² de forma interativa",
              icon: "📐",
              component: <PythagorasTheorem />,
            },
          ],
        },
        {
          id: "probabilidade",
          title: "Probabilidade",
          emoji: "🎲",
          color: "bg-green-50 border-green-200",
          demos: [
            {
              id: "dados-probabilidade",
              title: "Probabilidade com Dados",
              description: "Calcule probabilidades jogando dados virtuais",
              icon: "🎲",
              component: <DiceProbability />,
            },
          ],
        },
      ],
    },
    {
      id: "avancado",
      title: "Avançado",
      icon: <Rocket className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-500",
      categories: [
        {
          id: "sistemas-numeracao",
          title: "Sistemas de Numeração",
          emoji: "🔢",
          color: "bg-green-50 border-green-200",
          demos: [
            {
              id: "conversor-bases",
              title: "Conversor de Bases",
              description: "Converta entre decimal, binário, octal e hexadecimal",
              icon: "💻",
              component: <BaseConverter />,
            },
          ],
        },
        {
          id: "divisibilidade",
          title: "Divisibilidade",
          emoji: "🔍",
          color: "bg-orange-50 border-orange-200",
          demos: [
            {
              id: "fatoracao-primos",
              title: "Fatoração em Primos",
              description: "Decomponha números em fatores primos",
              icon: "🧮",
              component: <PrimeFactorization />,
            },
          ],
        },
        {
          id: "progressoes",
          title: "Progressões",
          emoji: "📊",
          color: "bg-blue-50 border-blue-200",
          demos: [
            {
              id: "visualizador-progressoes",
              title: "PA e PG Interativas",
              description: "Explore progressões aritméticas e geométricas",
              icon: "📈",
              component: <ProgressionVisualizer />,
            },
          ],
        },
        {
          id: "combinatoria",
          title: "Análise Combinatória",
          emoji: "🎯",
          color: "bg-purple-50 border-purple-200",
          demos: [
            {
              id: "combinatoria-visual",
              title: "Permutação, Arranjo e Combinação",
              description: "Visualize os diferentes tipos de agrupamentos",
              icon: "🔄",
              component: <CombinatoricsVisualizer />,
            },
          ],
        },
      ],
    },
  ];

  const currentLevel = levels.find(l => l.id === selectedLevel)!;
  
  const toggleAccordion = (categoryId: CategoryType) => {
    setOpenAccordion(openAccordion === categoryId ? null : categoryId);
  };

  const currentDemo = currentLevel.categories
    .flatMap((cat) => cat.demos)
    .find((demo) => demo.id === selectedDemo);

  // Quando mudar de nível, selecionar a primeira demo
  const handleLevelChange = (levelId: LevelType) => {
    setSelectedLevel(levelId);
    const level = levels.find(l => l.id === levelId)!;
    const firstCategory = level.categories[0];
    const firstDemo = firstCategory.demos[0];
    setOpenAccordion(firstCategory.id);
    setSelectedDemo(firstDemo.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />
      <MobileNav />

      <div className="lg:ml-72">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                <Beaker className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
                Laboratório de Matemática
              </h1>
            </div>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore visualizações interativas inspiradas no 3Blue1Brown
            </p>
          </div>

          {/* Seletor de Nível */}
          <div className="mb-6">
            <div className="flex gap-2 flex-wrap">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleLevelChange(level.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                    selectedLevel === level.id
                      ? `${level.bgColor} text-white shadow-lg`
                      : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                  }`}
                >
                  {level.icon}
                  {level.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar de Categorias */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <h2 className="font-bold text-lg mb-4 text-slate-800">
                  {currentLevel.title} - Tópicos
                </h2>

                <div className="space-y-2">
                  {currentLevel.categories.map((category) => (
                    <div key={category.id} className="border border-slate-200 rounded-lg overflow-hidden">
                      {/* Header do Accordion */}
                      <button
                        onClick={() => toggleAccordion(category.id)}
                        className={`w-full flex items-center justify-between p-3 transition-colors ${
                          openAccordion === category.id
                            ? category.color
                            : "bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{category.emoji}</span>
                          <span className="font-semibold text-slate-800">{category.title}</span>
                        </div>
                        {openAccordion === category.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </button>

                      {/* Conteúdo do Accordion */}
                      {openAccordion === category.id && (
                        <div className="bg-white border-t border-slate-200 p-2 space-y-1">
                          {category.demos.map((demo) => (
                            <button
                              key={demo.id}
                              onClick={() => setSelectedDemo(demo.id)}
                              className={`w-full text-left p-3 rounded-lg transition-all ${
                                selectedDemo === demo.id
                                  ? "bg-blue-50 border-2 border-blue-500"
                                  : "bg-slate-50 hover:bg-slate-100 border-2 border-transparent"
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <span className="text-xl">{demo.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm text-slate-800 mb-1">
                                    {demo.title}
                                  </div>
                                  <div className="text-xs text-slate-600 leading-tight">
                                    {demo.description}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Informativo */}
              <div className={`rounded-2xl border p-4 ${
                selectedLevel === "basico" ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" :
                selectedLevel === "intermediario" ? "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200" :
                "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
              }`}>
                <div className="text-sm text-slate-700">
                  <p className="font-semibold mb-2">
                    {selectedLevel === "basico" && "🌱 Nível Básico"}
                    {selectedLevel === "intermediario" && "📚 Nível Intermediário"}
                    {selectedLevel === "avancado" && "🚀 Nível Avançado"}
                  </p>
                  <p className="text-xs leading-relaxed">
                    {selectedLevel === "basico" && "Operações fundamentais para construir uma base sólida em matemática. Perfeito para iniciantes!"}
                    {selectedLevel === "intermediario" && "Conceitos mais elaborados como funções, geometria e probabilidade. Ideal para aprofundar conhecimentos!"}
                    {selectedLevel === "avancado" && "Tópicos avançados como sistemas de numeração, progressões e análise combinatória. Para quem quer ir além!"}
                  </p>
                </div>
              </div>
            </div>

            {/* Área de Demonstração */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                {currentDemo ? (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{currentDemo.icon}</span>
                        <h2 className="text-2xl font-bold text-slate-800">{currentDemo.title}</h2>
                      </div>
                      <p className="text-slate-600">{currentDemo.description}</p>
                    </div>

                    <div className="min-h-[400px]">{currentDemo.component}</div>
                  </>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    Selecione uma demonstração na barra lateral
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
