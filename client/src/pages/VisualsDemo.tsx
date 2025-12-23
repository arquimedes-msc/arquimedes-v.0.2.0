import { InteractiveNumberLine, NumberLine } from "@/components/NumberLine";
import {
  InteractiveMultiplicationMatrix,
  MultiplicationMatrix,
  MultiplicationTable,
} from "@/components/MultiplicationMatrix";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function VisualsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Visualizações Interativas
              </h1>
              <p className="text-sm text-gray-600">
                Componentes visuais para ensino de matemática
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="numberline" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-auto p-2">
            <TabsTrigger value="numberline" className="py-3">
              📏 Reta Numérica
            </TabsTrigger>
            <TabsTrigger value="matrix" className="py-3">
              🔢 Matrizes
            </TabsTrigger>
            <TabsTrigger value="table" className="py-3">
              📊 Tabuada
            </TabsTrigger>
          </TabsList>

          {/* Reta Numérica */}
          <TabsContent value="numberline" className="space-y-8">
            <Card className="border-2 border-blue-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-3xl">Reta Numérica Interativa</CardTitle>
                <CardDescription className="text-base">
                  Visualize adições movendo-se pela reta numérica
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <InteractiveNumberLine />
              </CardContent>
            </Card>

            {/* Exemplos estáticos */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exemplo: 2 + 3</CardTitle>
                </CardHeader>
                <CardContent>
                  <NumberLine start={2} end={10} addition={3} showAnimation={false} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exemplo: 5 + 4</CardTitle>
                </CardHeader>
                <CardContent>
                  <NumberLine start={5} end={12} addition={4} showAnimation={false} />
                </CardContent>
              </Card>
            </div>

            {/* Explicação */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💡 Como Funciona
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-blue max-w-none">
                <p>
                  A <strong>reta numérica</strong> é uma ferramenta visual poderosa para entender
                  adição. Quando adicionamos números:
                </p>
                <ul>
                  <li>
                    <strong>Começamos</strong> no primeiro número (marcado em verde)
                  </li>
                  <li>
                    <strong>Movemos para a direita</strong> o número de posições que queremos
                    adicionar
                  </li>
                  <li>
                    <strong>Chegamos</strong> no resultado (marcado em vermelho)
                  </li>
                </ul>
                <p>
                  Cada "salto" representa uma unidade. Quanto maior o número que adicionamos, mais
                  saltos damos para a direita!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matrizes de Multiplicação */}
          <TabsContent value="matrix" className="space-y-8">
            <Card className="border-2 border-purple-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-3xl">Matriz de Multiplicação</CardTitle>
                <CardDescription className="text-base">
                  Visualize multiplicações como arranjos de objetos
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <InteractiveMultiplicationMatrix />
              </CardContent>
            </Card>

            {/* Exemplos estáticos */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exemplo: 3 × 4</CardTitle>
                </CardHeader>
                <CardContent>
                  <MultiplicationMatrix rows={3} cols={4} showAnimation={false} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exemplo: 5 × 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <MultiplicationMatrix rows={5} cols={2} showAnimation={false} />
                </CardContent>
              </Card>
            </div>

            {/* Explicação */}
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💡 Como Funciona
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-purple max-w-none">
                <p>
                  A <strong>matriz visual</strong> mostra que multiplicar é criar grupos
                  organizados:
                </p>
                <ul>
                  <li>
                    <strong>Linhas</strong> representam quantos grupos temos
                  </li>
                  <li>
                    <strong>Colunas</strong> representam quantos itens em cada grupo
                  </li>
                  <li>
                    <strong>Total de quadrados</strong> é o resultado da multiplicação
                  </li>
                </ul>
                <p>
                  Por exemplo, <strong>3 × 4</strong> significa "3 grupos de 4 itens", que
                  visualmente forma uma matriz de 3 linhas e 4 colunas, totalizando 12 itens.
                </p>
                <p className="text-sm text-purple-700 font-semibold">
                  🔄 Propriedade Comutativa: 3 × 4 = 4 × 3. Você pode inverter a matriz e o total
                  permanece o mesmo!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tabuada */}
          <TabsContent value="table" className="space-y-8">
            <Card className="border-2 border-indigo-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
                <CardTitle className="text-3xl">Tabuadas Visuais</CardTitle>
                <CardDescription className="text-base">
                  Explore as tabuadas de forma organizada
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[2, 3, 4, 5, 6, 7].map((num) => (
                    <MultiplicationTable key={num} number={num} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dicas */}
            <Card className="bg-indigo-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💡 Dicas para Memorizar
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-indigo max-w-none">
                <ul>
                  <li>
                    <strong>Tabuada do 2:</strong> É sempre o dobro (somar o número com ele mesmo)
                  </li>
                  <li>
                    <strong>Tabuada do 5:</strong> Termina sempre em 0 ou 5
                  </li>
                  <li>
                    <strong>Tabuada do 9:</strong> A soma dos dígitos sempre dá 9 (ex: 18 → 1+8=9)
                  </li>
                  <li>
                    <strong>Propriedade Comutativa:</strong> Se você sabe 3×4, automaticamente sabe
                    4×3!
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none shadow-2xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para Aprender?</h2>
            <p className="text-lg mb-6 text-blue-50">
              Estes componentes visuais estão integrados em todas as nossas aulas para tornar o
              aprendizado mais intuitivo e divertido!
            </p>
            <Link href="/">
              <Button size="lg" variant="secondary" className="font-semibold">
                Começar Agora →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Arquimedes - MSC Consultorias</p>
          <p className="text-sm mt-2">Educação de qualidade em matemática para adultos</p>
        </div>
      </footer>
    </div>
  );
}
