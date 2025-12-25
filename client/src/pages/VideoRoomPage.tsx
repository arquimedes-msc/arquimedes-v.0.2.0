import { useState, useMemo } from "react";
import type { Module } from "../../../drizzle/schema";
import { trpc } from "@/lib/trpc";
import { MobileNav } from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Play, Clock, BookOpen, Eye, Trophy, GraduationCap, Sparkles, Zap, Heart, Star } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

// Mapeamento de disciplinas de Aritmética
const ARITHMETIC_DISCIPLINES = [
  { id: 1, name: "Aritmética Básica", slug: "aritmetica", icon: BookOpen, color: "from-green-500 to-emerald-600" },
  { id: 30004, name: "Aritmética Intermediária", slug: "aritmetica-intermediaria", icon: GraduationCap, color: "from-blue-500 to-indigo-600" },
  { id: 120001, name: "Aritmética Avançada", slug: "aritmetica-avancada", icon: Sparkles, color: "from-purple-500 to-pink-600" },
];

export default function VideoRoomPage() {
  const { user } = useAuth();
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
  const [selectedLevel, setSelectedLevel] = useState<number>(1); // disciplineId
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Queries
  const { data: allVideos, isLoading: videosLoading } = trpc.standaloneVideos.getAll.useQuery();
  const { data: stats } = trpc.standaloneVideos.getStats.useQuery(undefined, {
    enabled: !!user,
  });
  const { data: modules } = trpc.modules.listAll.useQuery();
  const { data: favoriteIds, refetch: refetchFavorites } = trpc.standaloneVideos.getFavoriteIds.useQuery(undefined, {
    enabled: !!user,
  });
  const { data: favoriteVideos } = trpc.standaloneVideos.getFavorites.useQuery(undefined, {
    enabled: !!user && showFavoritesOnly,
  });

  // Mutations
  const markWatchedMutation = trpc.standaloneVideos.markWatched.useMutation({
    onSuccess: (_, variables) => {
      setWatchedVideos((prev) => new Set([...Array.from(prev), variables.videoId]));
    },
  });

  const toggleFavoriteMutation = trpc.standaloneVideos.toggleFavorite.useMutation({
    onSuccess: () => {
      refetchFavorites();
    },
  });

  // Filtrar vídeos por disciplina selecionada
  const filteredVideos = useMemo(() => {
    if (!allVideos) return [];
    return allVideos.filter((v) => v.disciplineId === selectedLevel);
  }, [allVideos, selectedLevel]);

  // Agrupar vídeos por módulo
  const videosByModule = useMemo(() => {
    if (!modules || !filteredVideos) return [];
    
    // Pegar módulos únicos que têm vídeos
    const moduleIds = Array.from(new Set(filteredVideos.map((v) => v.moduleId)));
    
    return moduleIds.map((moduleId) => {
      const module = modules.find((m: Module) => m.id === moduleId);
      return {
        moduleId,
        moduleName: module?.name || `Módulo ${moduleId}`,
        moduleDescription: module?.description || "",
        videos: filteredVideos.filter((v) => v.moduleId === moduleId),
      };
    }).filter((m) => m.videos.length > 0);
  }, [modules, filteredVideos]);

  const handleMarkWatched = (videoId: number) => {
    if (watchedVideos.has(videoId)) {
      return;
    }
    markWatchedMutation.mutate({ videoId });
  };

  const handleToggleFavorite = (videoId: number) => {
    if (!user) {
      alert("Faça login para favoritar vídeos!");
      return;
    }
    toggleFavoriteMutation.mutate({ videoId });
  };

  const isFavorited = (videoId: number) => {
    return favoriteIds?.includes(videoId) || false;
  };

  const currentDiscipline = ARITHMETIC_DISCIPLINES.find((d) => d.id === selectedLevel);
  const favoriteCount = favoriteIds?.length || 0;

  return (
    <>
      <MobileNav />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Play className="h-10 w-10 text-purple-600" />
              Sala de Vídeos
            </h1>
            <p className="text-lg text-gray-600">
              Aprenda com vídeos educacionais em português organizados por nível e módulo
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Vídeos Assistidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">{stats?.totalWatched || 0}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Pontos Ganhos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">{(stats?.totalWatched || 0) * 3}</p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all ${showFavoritesOnly ? 'ring-2 ring-red-500 bg-red-50' : 'hover:shadow-md'}`}
              onClick={() => user && setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Heart className={`h-4 w-4 ${showFavoritesOnly ? 'fill-red-500 text-red-500' : ''}`} />
                  Meus Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-3xl font-bold ${showFavoritesOnly ? 'text-red-600' : 'text-red-500'}`}>
                  {favoriteCount}
                </p>
                {user && (
                  <p className="text-xs text-gray-500 mt-1">
                    {showFavoritesOnly ? 'Clique para ver todos' : 'Clique para filtrar'}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Total de Vídeos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{allVideos?.length || 0}</p>
              </CardContent>
            </Card>
          </div>

          {/* Favorites Section */}
          {showFavoritesOnly && user && (
            <div className="mb-8">
              <Card className="bg-gradient-to-r from-red-500 to-pink-600 text-white">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Heart className="h-5 w-5 fill-white" />
                    Meus Vídeos Favoritos
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    {favoriteCount} vídeo{favoriteCount !== 1 ? 's' : ''} salvo{favoriteCount !== 1 ? 's' : ''} para acesso rápido
                  </CardDescription>
                </CardHeader>
              </Card>

              {favoriteVideos && favoriteVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {favoriteVideos.map((video) => {
                    const isWatched = watchedVideos.has(video.videoId);

                    return (
                      <Card
                        key={video.videoId}
                        className={`transition-all hover:shadow-lg ${
                          isWatched ? "border-green-500 bg-green-50" : ""
                        }`}
                      >
                        <CardHeader className="p-0">
                          <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                            <img
                              src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                              <Play className="h-12 w-12 text-white" />
                            </div>
                            {/* Favorite Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(video.videoId);
                              }}
                              className="absolute top-2 left-2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-md"
                              disabled={toggleFavoriteMutation.isPending}
                            >
                              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                            </button>
                            {isWatched && (
                              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Assistido
                              </div>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="p-4 space-y-3">
                          <h3 className="font-bold text-gray-900 line-clamp-2">{video.title}</h3>
                          
                          {video.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                          )}

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            {video.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {video.duration}
                              </span>
                            )}
                            {!isWatched && (
                              <span className="text-yellow-600 font-medium flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                +3 pts
                              </span>
                            )}
                          </div>

                          {/* YouTube Player Embed */}
                          <div className="aspect-video bg-black rounded-lg overflow-hidden">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.youtubeId}`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </div>

                          {/* Mark as Watched Button */}
                          {!isWatched && (
                            <Button
                              onClick={() => handleMarkWatched(video.videoId)}
                              disabled={markWatchedMutation.isPending}
                              className="w-full"
                              size="sm"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              {markWatchedMutation.isPending ? "Marcando..." : "Marcar como Assistido"}
                            </Button>
                          )}

                          {isWatched && (
                            <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-green-100 text-green-800 text-sm">
                              <CheckCircle2 className="h-4 w-4" />
                              <span className="font-medium">Assistido! +3 pts</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="mt-4">
                  <CardContent className="py-12 text-center">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Você ainda não tem vídeos favoritos</p>
                    <p className="text-sm text-gray-400">
                      Clique no coração em qualquer vídeo para salvá-lo aqui
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setShowFavoritesOnly(false)}
                    >
                      Ver todos os vídeos
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Level Selector - Hidden when showing favorites */}
          {!showFavoritesOnly && (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecione o Nível</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ARITHMETIC_DISCIPLINES.map((discipline) => {
                    const Icon = discipline.icon;
                    const videoCount = allVideos?.filter((v) => v.disciplineId === discipline.id).length || 0;
                    const isSelected = selectedLevel === discipline.id;

                    return (
                      <button
                        key={discipline.id}
                        onClick={() => setSelectedLevel(discipline.id)}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? "border-purple-500 bg-gradient-to-br " + discipline.color + " text-white shadow-lg scale-[1.02]"
                            : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${isSelected ? "bg-white/20" : "bg-purple-100"}`}>
                            <Icon className={`h-6 w-6 ${isSelected ? "text-white" : "text-purple-600"}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-bold text-lg ${isSelected ? "text-white" : "text-gray-900"}`}>
                              {discipline.name}
                            </h3>
                            <p className={`text-sm mt-1 ${isSelected ? "text-white/80" : "text-gray-500"}`}>
                              {videoCount} vídeo{videoCount !== 1 ? "s" : ""} disponível{videoCount !== 1 ? "is" : ""}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Videos by Module */}
              {videosLoading ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-gray-500">Carregando vídeos...</p>
                  </CardContent>
                </Card>
              ) : videosByModule.length > 0 ? (
                <div className="space-y-8">
                  {videosByModule.map(({ moduleId, moduleName, moduleDescription, videos }) => (
                    <div key={moduleId} className="space-y-4">
                      {/* Module Header */}
                      <Card className={`bg-gradient-to-r ${currentDiscipline?.color || "from-purple-500 to-pink-600"} text-white`}>
                        <CardHeader>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            {moduleName}
                          </CardTitle>
                          {moduleDescription && (
                            <CardDescription className="text-white/80">{moduleDescription}</CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-white/90">
                            {videos.length} vídeo{videos.length !== 1 ? "s" : ""} disponível{videos.length !== 1 ? "is" : ""} em português
                          </p>
                        </CardContent>
                      </Card>

                      {/* Videos Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => {
                          const isWatched = watchedVideos.has(video.id);
                          const videoIsFavorited = isFavorited(video.id);

                          return (
                            <Card
                              key={video.id}
                              className={`transition-all hover:shadow-lg ${
                                isWatched ? "border-green-500 bg-green-50" : ""
                              }`}
                            >
                              <CardHeader className="p-0">
                                <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                                  <img
                                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                                    <Play className="h-12 w-12 text-white" />
                                  </div>
                                  {/* Favorite Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleFavorite(video.id);
                                    }}
                                    className={`absolute top-2 left-2 p-2 rounded-full transition-all shadow-md ${
                                      videoIsFavorited 
                                        ? 'bg-red-500 hover:bg-red-600' 
                                        : 'bg-white/90 hover:bg-white'
                                    }`}
                                    disabled={toggleFavoriteMutation.isPending}
                                    title={videoIsFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                  >
                                    <Heart 
                                      className={`h-5 w-5 transition-all ${
                                        videoIsFavorited 
                                          ? 'fill-white text-white' 
                                          : 'text-red-500 hover:fill-red-500'
                                      }`} 
                                    />
                                  </button>
                                  {isWatched && (
                                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                      <CheckCircle2 className="h-3 w-3" />
                                      Assistido
                                    </div>
                                  )}
                                </div>
                              </CardHeader>

                              <CardContent className="p-4 space-y-3">
                                <h3 className="font-bold text-gray-900 line-clamp-2">{video.title}</h3>
                                
                                {video.description && (
                                  <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                                )}

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                  {video.duration && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {video.duration}
                                    </span>
                                  )}
                                  {!isWatched && (
                                    <span className="text-yellow-600 font-medium flex items-center gap-1">
                                      <Trophy className="h-4 w-4" />
                                      +3 pts
                                    </span>
                                  )}
                                </div>

                                {/* YouTube Player Embed */}
                                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                  />
                                </div>

                                {/* Mark as Watched Button */}
                                {!isWatched && (
                                  <Button
                                    onClick={() => handleMarkWatched(video.id)}
                                    disabled={markWatchedMutation.isPending}
                                    className="w-full"
                                    size="sm"
                                  >
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    {markWatchedMutation.isPending ? "Marcando..." : "Marcar como Assistido"}
                                  </Button>
                                )}

                                {isWatched && (
                                  <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-green-100 text-green-800 text-sm">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span className="font-medium">Assistido! +3 pts</span>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-gray-500">
                      Nenhum vídeo disponível para {currentDiscipline?.name || "este nível"} ainda.
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
