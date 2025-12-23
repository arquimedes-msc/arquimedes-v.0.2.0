import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { BookOpen, Target, TrendingUp, Award, ArrowRight, LogOut, Sparkles } from "lucide-react";
import { getModuleIcon, getModuleColor } from "@/components/MathIcons";
import { MobileNav } from "@/components/MobileNav";
import { Link } from "wouter";
import StreakDisplay from "@/components/StreakDisplay";
import XPDisplay from "@/components/XPDisplay";
import AchievementsDisplay from "@/components/AchievementsDisplay";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  const { data: disciplines = [] } = trpc.disciplines.list.useQuery();
  const { data: dashboard } = trpc.dashboard.summary.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: recommendation } = trpc.dashboard.recommendations.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      logout();
      window.location.reload();
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <MobileNav />
      {/* Hero Section */}
      <div className="gradient-primary text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container py-8 sm:py-12 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight">
              Arquimedes: Matemática Descomplicada
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/95 drop-shadow-md leading-relaxed">
              Aprenda matemática básica de forma clara, prática e sem infantilização. 
              Educação de qualidade para adultos.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {!isAuthenticated ? (
                <Button size="lg" variant="secondary" asChild>
                  <a href={getLoginUrl()}>
                    Começar Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <p className="text-base sm:text-lg truncate max-w-[200px] sm:max-w-none">Bem-vindo, {user?.name || user?.email}!</p>
                <Button variant="secondary" size="sm" onClick={() => logoutMutation.mutate()} className="w-full sm:w-auto">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
              )}
              <Link href="/visuals">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30">
                  🎨 Visualizações Interativas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 sm:py-8 md:py-12 space-y-6 sm:space-y-8 md:space-y-12">
        {/* Dashboard for authenticated users */}
        {isAuthenticated && dashboard && (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <Card className="shadow-lg border-none hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                <CardTitle className="text-sm font-medium">Aulas Concluídas</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard.completedPages}</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-none hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                <CardTitle className="text-sm font-medium">Pontuação Média</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard.averageScore}%</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-none hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
                <Award className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboard.totalAchievements}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gamification Section */}
        {isAuthenticated && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              Seu Progresso
            </h2>
            
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
              <StreakDisplay />
              <XPDisplay />
            </div>
            
            <AchievementsDisplay />
          </div>
        )}

        {/* Next Recommended Lesson */}
        {isAuthenticated && recommendation && (
          <Card className="shadow-lg border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Próxima Aula Recomendada
              </CardTitle>
              <CardDescription>Continue de onde parou</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{recommendation.discipline.name}</p>
                <h3 className="text-lg sm:text-xl font-semibold">{recommendation.module.name}</h3>
                <p className="text-lg">{recommendation.page.title}</p>
                <Button asChild className="mt-4">
                  <Link
                    href={`/disciplina/${recommendation.discipline.slug}/modulo/${recommendation.module.slug}/aula/${recommendation.page.slug}`}
                  >
                    Continuar Aprendendo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disciplines Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Disciplinas Disponíveis</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Escolha uma disciplina para começar sua jornada de aprendizado
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {disciplines.map((discipline) => (
              <DisciplineCard key={discipline.id} discipline={discipline} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-8 sm:pt-12">
          <div className="text-center space-y-2 px-4 sm:px-0">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">Conteúdo Estruturado</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Aulas organizadas em módulos progressivos, do básico ao avançado
            </p>
          </div>

          <div className="text-center space-y-2 px-4 sm:px-0">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">Exercícios Práticos</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Pratique com exercícios contextualizados e receba feedback imediato
            </p>
          </div>

          <div className="text-center space-y-2 px-4 sm:px-0">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">Acompanhe seu Progresso</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Veja seu desenvolvimento e conquiste marcos de aprendizado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisciplineCard({ discipline }: { discipline: { id: number; name: string; slug: string; description: string | null } }) {
  const { data: modules = [] } = trpc.modules.listByDiscipline.useQuery({
    disciplineId: discipline.id,
  });

  return (
    <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">{discipline.name}</CardTitle>
        {discipline.description && (
          <CardDescription className="text-base">{discipline.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {modules.length} módulos disponíveis
          </p>
          {modules.slice(0, 3).map((module) => (
            <div key={module.id} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={getModuleColor(module.name)}>
                {getModuleIcon(module.name, { size: 20 })}
              </div>
              <span className="font-medium">{module.name}</span>
            </div>
          ))}
        </div>
        <Button asChild className="w-full">
          <Link href={`/disciplina/${discipline.slug}`}>
            Explorar Disciplina
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
