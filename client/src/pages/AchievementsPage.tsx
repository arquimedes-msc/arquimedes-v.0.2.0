import { trpc } from "@/lib/trpc";
import { MobileNav } from "@/components/MobileNav";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  GraduationCap, 
  Flame, 
  Zap, 
  Plus, 
  X, 
  Divide, 
  Video, 
  Target, 
  Trophy,
  Lock,
  Award,
  Medal
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ACHIEVEMENT_ICON_IMAGES } from "@/lib/achievementIcons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  GraduationCap,
  Flame,
  Zap,
  Plus,
  X,
  Divide,
  Video,
  Target,
  Trophy,
  Award,
  Medal,
};

const LEVEL_COLORS = {
  bronze: {
    bg: "bg-gradient-to-br from-amber-700 to-amber-900",
    border: "border-amber-600",
    text: "text-amber-100",
    glow: "shadow-amber-500/50",
    hex: "#CD7F32"
  },
  silver: {
    bg: "bg-gradient-to-br from-gray-300 to-gray-500",
    border: "border-gray-400",
    text: "text-gray-900",
    glow: "shadow-gray-400/50",
    hex: "#C0C0C0"
  },
  gold: {
    bg: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    border: "border-yellow-500",
    text: "text-yellow-900",
    glow: "shadow-yellow-500/50",
    hex: "#FFD700"
  },
  platinum: {
    bg: "bg-gradient-to-br from-slate-200 to-slate-400",
    border: "border-slate-300",
    text: "text-slate-900",
    glow: "shadow-slate-300/50",
    hex: "#E5E4E2"
  }
};

const LEVEL_MULTIPLIERS = {
  bronze: 1,
  silver: 2,
  gold: 5,
  platinum: 10
};

const LEVEL_NAMES = {
  bronze: "Bronze",
  silver: "Prata",
  gold: "Ouro",
  platinum: "Platina"
};

export default function AchievementsPage() {
  const { isAuthenticated } = useAuth();
  const { data: achievements = [], isLoading } = trpc.achievements.getUserAchievements.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (!isAuthenticated) {
    return (
      <>
        <MobileNav />
        <Sidebar />
        <div className="lg:ml-72 min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white flex items-center justify-center">
          <Card className="max-w-md mx-4">
            <CardHeader>
              <CardTitle>Acesso Restrito</CardTitle>
              <CardDescription>
                Faça login para ver suas conquistas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/">Ir para o início</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <MobileNav />
        <Sidebar />
        <div className="lg:ml-72 min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white">
          <div className="container max-w-7xl py-8 space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  // Group by category
  const categories: Record<string, typeof achievements> = {
    learning: achievements.filter((a) => a.category === "learning"),
    streak: achievements.filter((a) => a.category === "streak"),
    mastery: achievements.filter((a) => a.category === "mastery"),
    practice: achievements.filter((a) => a.category === "practice"),
  };

  const categoryTitles = {
    learning: "🎓 Aprendizado",
    streak: "🔥 Consistência",
    mastery: "🏆 Maestria",
    practice: "💪 Prática",
  };

  const categoryDescriptions = {
    learning: "Complete aulas e módulos para desbloquear",
    streak: "Mantenha sua sequência de estudos diária",
    mastery: "Domine todos os conceitos de cada módulo",
    practice: "Resolva exercícios e desafios",
  };

  const getNextLevelRequirement = (achievement: typeof achievements[number]) => {
    if (!achievement.hasLevels) return null;
    
    const currentLevel = achievement.level as keyof typeof LEVEL_MULTIPLIERS;
    const baseReq = achievement.requirement;
    
    const levels: Array<keyof typeof LEVEL_MULTIPLIERS> = ["bronze", "silver", "gold", "platinum"];
    const currentIndex = levels.indexOf(currentLevel);
    
    if (currentIndex === levels.length - 1) return null; // Already platinum
    
    const nextLevel = levels[currentIndex + 1];
    return baseReq * LEVEL_MULTIPLIERS[nextLevel];
  };

  return (
    <>
      <MobileNav />
      <Sidebar />
      <div className="lg:ml-72 min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white">
        {/* Header */}
        <div className="border-b bg-white/80 backdrop-blur-sm sticky top-16 lg:top-0 z-10">
          <div className="container max-w-7xl py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                  <Trophy className="h-10 w-10 text-yellow-500" />
                  Conquistas
                </h1>
                <p className="text-muted-foreground mt-2">
                  Desbloqueie badges progressivos e evolua seus níveis
                </p>
              </div>
            </div>
            
            {/* Progress Overview */}
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progresso Geral</span>
                  <span className="text-sm font-bold text-primary">{unlockedCount} / {totalCount}</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  {progressPercentage}% das conquistas desbloqueadas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="container max-w-7xl py-8 space-y-12">
          {Object.entries(categories).map(([category, categoryAchievements]) => (
            <div key={category}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {categoryTitles[category as keyof typeof categoryTitles]}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {categoryDescriptions[category as keyof typeof categoryDescriptions]}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryAchievements.map((achievement) => {
                  const Icon = iconMap[achievement.icon] || Trophy;
                  const level = (achievement.level || "bronze") as keyof typeof LEVEL_COLORS;
                  const levelColors = LEVEL_COLORS[level];
                  const nextLevelReq = getNextLevelRequirement(achievement);
                  const isMaxLevel = level === "platinum";

                  return (
                    <TooltipProvider key={achievement.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Card 
                            className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                              achievement.unlocked 
                                ? `${levelColors.border} border-2 shadow-lg ${levelColors.glow}` 
                                : "border-2 border-dashed border-gray-300 opacity-60"
                            }`}
                          >
                            <CardHeader className={`${achievement.unlocked ? levelColors.bg : "bg-gray-100"} pb-4`}>
                              <div className="flex items-start justify-between">
                                <div className={`p-3 rounded-full ${achievement.unlocked ? "bg-white/20" : "bg-gray-200"}`}>
                                  {achievement.unlocked ? (
                                    ACHIEVEMENT_ICON_IMAGES[achievement.icon] ? (
                                      <img 
                                        src={ACHIEVEMENT_ICON_IMAGES[achievement.icon]} 
                                        alt={achievement.title}
                                        className="h-12 w-12 object-contain"
                                      />
                                    ) : (
                                      <Icon className={`h-8 w-8 ${levelColors.text}`} />
                                    )
                                  ) : (
                                    <Lock className="h-8 w-8 text-gray-400" />
                                  )}
                                </div>
                                {achievement.unlocked && achievement.hasLevels && (
                                  <Badge 
                                    variant="secondary" 
                                    className={`${levelColors.bg} ${levelColors.text} border-0 font-bold`}
                                  >
                                    {LEVEL_NAMES[level]}
                                  </Badge>
                                )}
                              </div>
                            </CardHeader>

                            <CardContent className="pt-4 space-y-3">
                              <div>
                                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                                  {achievement.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                  {achievement.description}
                                </p>
                              </div>

                              {achievement.unlocked && achievement.hasLevels && !isMaxLevel && nextLevelReq && (
                                <div className="space-y-2 pt-2 border-t">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Próximo nível</span>
                                    <span className="font-medium">
                                      {achievement.requirement * LEVEL_MULTIPLIERS[level]} / {nextLevelReq}
                                    </span>
                                  </div>
                                  <Progress 
                                    value={(achievement.requirement * LEVEL_MULTIPLIERS[level] / nextLevelReq) * 100} 
                                    className="h-2"
                                  />
                                </div>
                              )}

                              {achievement.unlocked && achievement.hasLevels && isMaxLevel && (
                                <div className="pt-2 border-t">
                                  <Badge variant="secondary" className="w-full justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-0">
                                    🏆 Nível Máximo Atingido!
                                  </Badge>
                                </div>
                              )}

                              {!achievement.unlocked && (
                                <div className="pt-2 border-t">
                                  <p className="text-xs text-muted-foreground">
                                    Requisito: {achievement.requirement} {achievement.category === "learning" ? "aulas" : achievement.category === "practice" ? "exercícios" : achievement.category === "streak" ? "dias" : "módulos"}
                                  </p>
                                </div>
                              )}

                              {achievement.unlocked && achievement.unlockedAt && (
                                <p className="text-xs text-muted-foreground pt-2 border-t">
                                  Desbloqueada em {new Date(achievement.unlockedAt).toLocaleDateString("pt-BR")}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                          {achievement.hasLevels && (
                            <div className="mt-2 space-y-1 text-xs">
                              <p className="font-medium">Níveis:</p>
                              <p>🥉 Bronze: {achievement.requirement}</p>
                              <p>🥈 Prata: {achievement.requirement * 2}</p>
                              <p>🥇 Ouro: {achievement.requirement * 5}</p>
                              <p>💎 Platina: {achievement.requirement * 10}</p>
                            </div>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
