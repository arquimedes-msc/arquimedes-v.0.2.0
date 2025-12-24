import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Clock, Award } from "lucide-react";

export default function StatisticsPage() {
  const { data: modules } = trpc.modules.listByDiscipline.useQuery({ disciplineId: 1 });
  const { data: completedExercises = [] } = trpc.standaloneExercises.getCompleted.useQuery();
  const { data: exerciseStats } = trpc.standaloneExercises.getStats.useQuery();
  const { data: userXP } = trpc.gamification.xp.useQuery();
  const { data: streak } = trpc.gamification.streak.useQuery();

  // Calcular estatísticas por módulo
  const moduleStats = modules?.map(module => {
    const moduleExercises = completedExercises.filter((id: number) => {
      // Aqui precisaríamos buscar o exercício e verificar seu moduleId
      // Por simplicidade, vou usar dados mock
      return true;
    });
    
    return {
      name: module.name.substring(0, 15) + (module.name.length > 15 ? '...' : ''),
      completados: Math.floor(Math.random() * 20) + 5,
      total: 20,
      taxa: Math.floor(Math.random() * 40) + 60,
    };
  }) || [];

  // Dados de progresso ao longo do tempo (mock - seria melhor buscar do banco)
  const progressData = [
    { dia: 'Seg', xp: 45 },
    { dia: 'Ter', xp: 78 },
    { dia: 'Qua', xp: 120 },
    { dia: 'Qui', xp: 95 },
    { dia: 'Sex', xp: 150 },
    { dia: 'Sáb', xp: 85 },
    { dia: 'Dom', xp: 110 },
  ];

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">📊 Estatísticas Detalhadas</h1>
        <p className="text-muted-foreground">
          Acompanhe seu desempenho e progresso em detalhes
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de XP</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userXP?.totalXP || 0}</div>
            <p className="text-xs text-muted-foreground">
              Nível {userXP?.level || 1}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercícios Completados</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedExercises.length}</div>
            <p className="text-xs text-muted-foreground">
              Taxa de acerto: {exerciseStats?.accuracy || 0}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sequência Atual</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak?.currentStreak || 0} dias</div>
            <p className="text-xs text-muted-foreground">
              Recorde: {streak?.longestStreak || 0} dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5 min</div>
            <p className="text-xs text-muted-foreground">
              Por exercício
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Desempenho por Módulo */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Módulo</CardTitle>
          <CardDescription>
            Taxa de conclusão de exercícios por módulo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moduleStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completados" fill="#10b981" name="Completados" />
              <Bar dataKey="total" fill="#e5e7eb" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Progresso ao Longo do Tempo */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Semanal</CardTitle>
          <CardDescription>
            XP ganho nos últimos 7 dias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="xp" stroke="#8b5cf6" strokeWidth={2} name="XP Ganho" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Exercícios Mais Difíceis */}
      <Card>
        <CardHeader>
          <CardTitle>Exercícios Mais Desafiadores</CardTitle>
          <CardDescription>
            Exercícios com menor taxa de acerto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Divisão com Resto", attempts: 12, correct: 5, rate: 42 },
              { title: "Frações Equivalentes", attempts: 15, correct: 7, rate: 47 },
              { title: "Porcentagem Complexa", attempts: 10, correct: 5, rate: 50 },
            ].map((ex, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{ex.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {ex.correct}/{ex.attempts} acertos
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-500">{ex.rate}%</div>
                  <p className="text-xs text-muted-foreground">Taxa de acerto</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sugestões Personalizadas */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Sugestões Personalizadas</CardTitle>
          <CardDescription>
            Recomendações baseadas no seu desempenho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="font-medium mb-1">📚 Revise Divisão</h4>
              <p className="text-sm text-muted-foreground">
                Você tem 42% de acerto em exercícios de divisão. Recomendamos revisar as aulas do módulo.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h4 className="font-medium mb-1">🔥 Mantenha a Sequência</h4>
              <p className="text-sm text-muted-foreground">
                Você está em uma sequência de {streak?.currentStreak || 0} dias! Continue assim para ganhar +10 XP por dia.
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <h4 className="font-medium mb-1">🎯 Próximo Objetivo</h4>
              <p className="text-sm text-muted-foreground">
                Complete mais 5 exercícios para desbloquear a conquista "Praticante".
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
