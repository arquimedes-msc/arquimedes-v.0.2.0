import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { BookOpen, Brain, TrendingUp, Award, LogIn } from 'lucide-react';

export default function Login() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirecionar para dashboard se já estiver autenticado
  useEffect(() => {
    if (user && !loading) {
      setLocation('/dashboard');
    }
  }, [user, loading, setLocation]);

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Logo e Título */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Arquimedes
              </h1>
            </div>
            <p className="text-2xl text-gray-700 font-medium mb-2">
              Matemática Descomplicada para Adultos
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Aprenda matemática básica de forma clara, prática e sem infantilização.
              Educação de qualidade para adultos que querem dominar os fundamentos.
            </p>
          </div>

          {/* Grid de Features + Login Card */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Features */}
            <div className="space-y-6">
              <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-blue-900">
                        Conteúdo Profissional
                      </CardTitle>
                      <CardDescription>
                        Linguagem clara e respeitosa, sem infantilização
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Aprenda com exemplos práticos do dia a dia: orçamento, compras, planejamento
                    financeiro e situações reais do mundo adulto.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-green-900">
                        Aprendizado Progressivo
                      </CardTitle>
                      <CardDescription>
                        Do básico ao avançado, no seu ritmo
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Comece do zero ou retome de onde parou. Exercícios interativos com feedback
                    imediato e hints progressivos para ajudar quando necessário.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-purple-900">
                        Gamificação Motivadora
                      </CardTitle>
                      <CardDescription>
                        Acompanhe seu progresso e conquiste objetivos
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Sistema de XP, níveis e conquistas para manter você motivado. Veja seu
                    crescimento e celebre cada marco alcançado.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Login Card */}
            <div className="lg:sticky lg:top-8">
              <Card className="border-4 border-blue-300 shadow-2xl bg-white">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-3xl text-blue-900 mb-2">
                    Comece Agora
                  </CardTitle>
                  <CardDescription className="text-base">
                    Faça login com sua conta Google para começar a aprender
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Botão de Login com Google */}
                  <Button
                    onClick={handleLogin}
                    size="lg"
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    <LogIn className="w-6 h-6 mr-3" />
                    Entrar com Google
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">
                        O que você vai aprender
                      </span>
                    </div>
                  </div>

                  {/* Lista de Tópicos */}
                  <div className="space-y-3">
                    {[
                      'Adição e Subtração com confiança',
                      'Multiplicação e Divisão práticas',
                      'Frações e Porcentagens do dia a dia',
                      'Geometria aplicada ao cotidiano',
                      'Álgebra básica para resolver problemas',
                    ].map((topic, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold text-sm">✓</span>
                        </div>
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>

                  {/* Nota sobre Cadastro Automático */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900 text-center">
                      <strong>Primeira vez aqui?</strong> Seu cadastro será criado
                      automaticamente no primeiro login. É rápido e seguro!
                    </p>
                  </div>

                  {/* Estatísticas */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">12+</p>
                      <p className="text-xs text-gray-600">Aulas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">100+</p>
                      <p className="text-xs text-gray-600">Exercícios</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">4</p>
                      <p className="text-xs text-gray-600">Módulos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 text-sm">
              Ao fazer login, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2024 Arquimedes - Matemática Descomplicada. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
