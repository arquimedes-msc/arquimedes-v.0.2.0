import { useState } from "react";
import { useAuth } from "../_core/hooks/useAuth";
import { trpc } from "../lib/trpc";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertTriangle, RefreshCcw, CheckCircle2 } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { MobileNav } from "../components/MobileNav";
import { toast as showToast } from "sonner";

export default function AdminPage() {
  const { isAuthenticated } = useAuth();

  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // @ts-ignore - Endpoint exists but TypeScript hasn't regenerated types yet
  const resetMutation = trpc.admin.resetUserProgress.useMutation({
    onSuccess: () => {
      setResetSuccess(true);
      setIsResetting(false);
      showToast.success("Progresso Resetado", {
        description: "Todos os dados foram limpos. Recarregue a página para ver o onboarding novamente.",
      });
    },
    onError: (error: any) => {
      setIsResetting(false);
      showToast.error("Erro ao Resetar", {
        description: error.message,
      });
    },
  });

  const handleReset = () => {
    if (confirm("⚠️ ATENÇÃO: Isso vai apagar TODOS os seus dados de progresso (XP, pontos, conquistas, aulas concluídas, exercícios). Esta ação não pode ser desfeita. Deseja continuar?")) {
      setIsResetting(true);
      setResetSuccess(false);
      resetMutation.mutate({});
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <MobileNav />
        <Sidebar />
        <div className="lg:ml-72 min-h-screen bg-muted/30 flex items-center justify-center">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle>Acesso Restrito</CardTitle>
              <CardDescription>Faça login para acessar esta página</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileNav />
      <Sidebar />
      <div className="lg:ml-72 min-h-screen bg-muted/30">
        <div className="container max-w-4xl py-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Admin - Ferramentas de Teste</h1>
            <p className="text-muted-foreground mt-2">
              Ferramentas para resetar dados e testar fluxos completos
            </p>
          </div>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCcw className="h-5 w-5" />
                Resetar Meu Progresso
              </CardTitle>
              <CardDescription>
                Apaga todos os seus dados de progresso para testar o fluxo completo desde o início
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>ATENÇÃO:</strong> Esta ação vai apagar permanentemente:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Todos os seus pontos (XP)</li>
                    <li>Seu nível atual</li>
                    <li>Todas as conquistas desbloqueadas</li>
                    <li>Progresso de aulas e exercícios</li>
                    <li>Sequência de dias estudando</li>
                    <li>Inscrições em disciplinas</li>
                    <li>Status do onboarding</li>
                  </ul>
                </AlertDescription>
              </Alert>

              {resetSuccess && (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    <strong>Sucesso!</strong> Seu progresso foi resetado. Recarregue a página (F5) para ver o onboarding novamente.
                  </AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleReset}
                disabled={isResetting}
                variant="destructive"
                className="w-full"
              >
                {isResetting ? (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                    Resetando...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Resetar Meu Progresso
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Use esta ferramenta para testar o fluxo completo de novos usuários
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Dados que são mantidos:</strong> Disciplinas, Módulos, Páginas de Aulas, Exercícios, Conquistas Disponíveis
              </p>
              <p>
                <strong>Dados que são apagados:</strong> Seu progresso pessoal, pontos, níveis, conquistas desbloqueadas
              </p>
              <p className="text-muted-foreground">
                Esta página é útil para testar o MVP com usuários reais e validar o fluxo completo de onboarding → aulas → exercícios → conquistas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
