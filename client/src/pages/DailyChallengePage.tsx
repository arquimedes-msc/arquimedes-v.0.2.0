import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { MobileNav } from "@/components/MobileNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { Trophy, Flame, Target, CheckCircle2, XCircle, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function DailyChallengePage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedExercises, setSubmittedExercises] = useState<Set<number>>(new Set());
  const [results, setResults] = useState<Record<number, { isCorrect: boolean; pointsEarned: number }>>({});

  const { data: challengeData, isLoading } = trpc.dailyChallenge.getToday.useQuery();
  const { data: hasCompleted } = trpc.dailyChallenge.hasCompleted.useQuery();
  const { data: stats } = trpc.dailyChallenge.getStats.useQuery();
  const submitMutation = trpc.dailyChallenge.submit.useMutation();
  const utils = trpc.useUtils();

  const challenge = challengeData?.challenge;
  const exercises = challengeData?.exercises || [];

  const handleSelectAnswer = (exerciseId: number, optionIndex: number) => {
    if (submittedExercises.has(exerciseId)) return;
    setSelectedAnswers((prev) => ({ ...prev, [exerciseId]: optionIndex }));
  };

  const handleSubmit = async (exerciseId: number) => {
    if (!challenge || selectedAnswers[exerciseId] === undefined) {
      toast.error("Selecione uma resposta primeiro!");
      return;
    }

    try {
      const result = await submitMutation.mutateAsync({
        challengeId: challenge.id,
        exerciseId,
        userAnswer: selectedAnswers[exerciseId],
      });

      setResults((prev) => ({ ...prev, [exerciseId]: result }));
      setSubmittedExercises((prev) => new Set([...Array.from(prev), exerciseId]));

      if (result.isCorrect) {
        toast.success(`Correto! +${result.pointsEarned} pontos (DOBRADOS!) 🎉`);
      } else {
        toast.error("Resposta incorreta. Tente novamente amanhã!");
      }

      // Invalidar queries para atualizar estatísticas
      await utils.dailyChallenge.hasCompleted.invalidate();
      await utils.dailyChallenge.getStats.invalidate();
    } catch (error) {
      toast.error("Erro ao submeter resposta");
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Fácil";
      case "moderate":
        return "Moderado";
      case "hard":
        return "Difícil";
      default:
        return difficulty;
    }
  };

  // Helper para fazer parse seguro de options
  const parseOptions = (options: any): string[] => {
    if (Array.isArray(options)) return options;
    if (typeof options === 'string') {
      try {
        const parsed = JSON.parse(options);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  if (isLoading) {
    return (
      <>
        <MobileNav />
        <div className="flex min-h-screen">
          <Sidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MobileNav />
      <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Sidebar />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Desafio do Dia
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Complete 3 exercícios e ganhe <span className="font-bold text-orange-600">PONTOS DOBRADOS!</span>
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-amber-200 dark:bg-gray-800/80 dark:border-amber-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Desafios Completos</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalChallenges || 0}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-green-200 dark:bg-gray-800/80 dark:border-green-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Respostas Corretas</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalCorrect || 0}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-200 dark:bg-gray-800/80 dark:border-purple-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pontos Ganhos</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalPoints || 0}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Challenge Completed Banner */}
          {hasCompleted && (
            <Card className="p-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center border-0 shadow-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Desafio Completo!</h2>
                  <p className="text-lg opacity-90">
                    Você já completou o desafio de hoje. Volte amanhã para um novo desafio!
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Exercises */}
          {!hasCompleted && exercises.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-5 h-5" />
                <p className="text-sm">Disponível apenas hoje! Respostas dobram seus pontos.</p>
              </div>

              {exercises.map((exercise, index) => {
                const isSubmitted = submittedExercises.has(exercise.id);
                const result = results[exercise.id];
                const selectedAnswer = selectedAnswers[exercise.id];
                const options = parseOptions(exercise.options);

                return (
                  <Card
                    key={exercise.id}
                    className="p-6 bg-white/90 backdrop-blur-sm border-2 border-gray-200 dark:bg-gray-800/90 dark:border-gray-700 hover:shadow-xl transition-shadow"
                  >
                    <div className="space-y-4">
                      {/* Exercise Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{exercise.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getDifficultyColor(exercise.difficulty)}>
                                {getDifficultyLabel(exercise.difficulty)}
                              </Badge>
                              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                {exercise.points * 2} pontos (2x)
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Question */}
                      <p className="text-gray-700 dark:text-gray-300 text-lg">{exercise.question}</p>

                      {/* Options */}
                      <div className="space-y-2">
                        {options.map((option, optionIndex) => {
                          const isSelected = selectedAnswer === optionIndex;
                          const isCorrect = isSubmitted && optionIndex === exercise.correctAnswer;
                          const isWrong = isSubmitted && isSelected && !isCorrect;

                          return (
                            <button
                              key={optionIndex}
                              onClick={() => handleSelectAnswer(exercise.id, optionIndex)}
                              disabled={isSubmitted}
                              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                                isSubmitted
                                  ? isCorrect
                                    ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                                    : isWrong
                                    ? "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                                    : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                                  : isSelected
                                  ? "bg-amber-100 border-amber-500 dark:bg-amber-900/30 dark:border-amber-500"
                                  : "bg-white border-gray-200 hover:border-amber-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-amber-600"
                              } ${isSubmitted ? "cursor-not-allowed" : "cursor-pointer"}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-900 dark:text-white">{option}</span>
                                {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                {isSubmitted && isWrong && <XCircle className="w-5 h-5 text-red-600" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Submit Button */}
                      {!isSubmitted && (
                        <Button
                          onClick={() => handleSubmit(exercise.id)}
                          disabled={selectedAnswer === undefined || submitMutation.isPending}
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-6 text-lg"
                        >
                          {submitMutation.isPending ? "Enviando..." : "Confirmar Resposta"}
                        </Button>
                      )}

                      {/* Result Message */}
                      {isSubmitted && result && (
                        <div
                          className={`p-4 rounded-lg ${
                            result.isCorrect
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                          }`}
                        >
                          <p className="font-semibold">
                            {result.isCorrect
                              ? `🎉 Correto! Você ganhou ${result.pointsEarned} pontos (dobrados)!`
                              : "❌ Resposta incorreta. Tente novamente amanhã!"}
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
