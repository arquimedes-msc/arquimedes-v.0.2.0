import { useState, useEffect, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Camera, Save, Globe, Palette, Moon, Sun, Trophy, Upload, Check } from "lucide-react";
import { AchievementIcon } from "@/lib/achievementIcons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const THEME_COLORS = [
  { value: "blue", label: "Azul", color: "bg-blue-500" },
  { value: "red", label: "Vermelho", color: "bg-red-500" },
  { value: "green", label: "Verde", color: "bg-green-500" },
  { value: "purple", label: "Roxo", color: "bg-purple-500" },
  { value: "orange", label: "Laranja", color: "bg-orange-500" },
  { value: "pink", label: "Rosa", color: "bg-pink-500" },
  { value: "teal", label: "Azul Turquesa", color: "bg-teal-500" },
  { value: "indigo", label: "Índigo", color: "bg-indigo-500" },
];

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: isLoadingAuth } = trpc.auth.me.useQuery();
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("pt");
  const [themeColor, setThemeColor] = useState("blue");
  const [darkMode, setDarkMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedAchievements, setSelectedAchievements] = useState<number[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const isAuthenticated = !!user;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, isLoadingAuth, setLocation]);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLanguage(user.language || "pt");
      setThemeColor(user.themeColor || "blue");
      setDarkMode(user.darkMode || false);
      setAvatarPreview(user.avatar || null);
      setSelectedAchievements((user.favoriteAchievements as number[]) || []);
    }
  }, [user]);

  // Apply dark mode instantly
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Check if there are unsaved changes
  useEffect(() => {
    if (!user) return;
    const changed = 
      name !== (user.name || "") ||
      language !== (user.language || "pt") ||
      themeColor !== (user.themeColor || "blue") ||
      darkMode !== (user.darkMode || false) ||
      JSON.stringify(selectedAchievements) !== JSON.stringify((user.favoriteAchievements as number[]) || []);
    setHasChanges(changed);
  }, [name, language, themeColor, darkMode, selectedAchievements, user]);

  const { data: userAchievements = [] } = trpc.achievements.getUserAchievements.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const updateNameMutation = trpc.user.updateName.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      toast.success("Nome atualizado com sucesso!");
    },
  });

  const updateAvatarMutation = trpc.user.updateAvatar.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      toast.success("Avatar atualizado com sucesso!");
    },
  });

  const updatePreferencesMutation = trpc.user.updatePreferences.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      toast.success("Preferências salvas com sucesso!");
    },
  });

  const updateFavoriteAchievementsMutation = trpc.user.updateFavoriteAchievements.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      toast.success("Badges favoritas atualizadas!");
    },
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Imagem muito grande! Máximo 2MB.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Arquivo inválido! Envie uma imagem.");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setAvatarPreview(base64);
        
        // Upload to S3
        await updateAvatarMutation.mutateAsync({ avatarBase64: base64 });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      toast.error("Erro ao enviar avatar. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      // Update name if changed
      if (name.trim() && name !== user?.name) {
        await updateNameMutation.mutateAsync({ name: name.trim() });
      }

      // Update preferences if changed
      const prefChanges: any = {};
      if (language !== user?.language) prefChanges.language = language;
      if (themeColor !== user?.themeColor) prefChanges.themeColor = themeColor;
      if (darkMode !== user?.darkMode) prefChanges.darkMode = darkMode;

      if (Object.keys(prefChanges).length > 0) {
        await updatePreferencesMutation.mutateAsync(prefChanges);
      }

      // Update favorite achievements if changed
      if (JSON.stringify(selectedAchievements) !== JSON.stringify((user?.favoriteAchievements as number[]) || [])) {
        await updateFavoriteAchievementsMutation.mutateAsync({ achievementIds: selectedAchievements });
      }

      setHasChanges(false);
      toast.success("Todas as alterações foram salvas!");
    } catch (error) {
      toast.error("Erro ao salvar alterações. Tente novamente.");
    }
  };

  const toggleAchievement = (achievementId: number) => {
    if (selectedAchievements.includes(achievementId)) {
      setSelectedAchievements(prev => prev.filter(id => id !== achievementId));
    } else {
      if (selectedAchievements.length >= 3) {
        toast.info("Você pode selecionar no máximo 3 badges favoritas!");
        return;
      }
      setSelectedAchievements(prev => [...prev, achievementId]);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <MobileNav />
      <Sidebar />
      <div className="lg:ml-72 min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white">
        {/* Header */}
        <div className="border-b bg-white/80 backdrop-blur-sm sticky top-16 lg:top-0 z-10">
          <div className="container py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Meu Perfil</h2>
              <p className="text-sm text-muted-foreground">Personalize sua experiência de aprendizado</p>
            </div>
            {hasChanges && (
              <Button onClick={handleSaveAll} size="lg" className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Todas as Alterações
              </Button>
            )}
          </div>
        </div>

        <div className="container py-8 space-y-6">
          {/* Profile Header with Avatar */}
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-4xl overflow-hidden ring-4 ring-white shadow-xl">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt={user.name || "User"} className="w-full h-full object-cover" />
                    ) : (
                      user.name?.[0]?.toUpperCase() || "U"
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 p-3 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-all shadow-lg hover:scale-110 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{user.name || "Usuário"}</h3>
                  <p className="text-muted-foreground mb-4">{user.email || "Não informado"}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="h-3 w-3" />
                      {userAchievements.length} Conquistas
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>Atualize seu nome e idioma preferido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">🇧🇷 Português</SelectItem>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Aparência
                </CardTitle>
                <CardDescription>Personalize cores e tema da plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Cor do Tema</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {THEME_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setThemeColor(color.value)}
                        className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                          themeColor === color.value
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-full h-8 rounded ${color.color}`} />
                        {themeColor === color.value && (
                          <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                        <p className="text-xs mt-1 text-center">{color.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                    <div>
                      <Label className="text-base font-medium">Modo Escuro</Label>
                      <p className="text-sm text-muted-foreground">Ativar tema escuro</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Favorite Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Badges Favoritas
              </CardTitle>
              <CardDescription>
                Selecione até 3 conquistas para exibir no seu perfil ({selectedAchievements.length}/3)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userAchievements.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Você ainda não desbloqueou nenhuma conquista.</p>
                  <p className="text-sm">Complete exercícios e desafios para ganhar badges!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userAchievements.filter(a => a.unlocked).map((achievement) => {
                    const isSelected = selectedAchievements.includes(achievement.id);
                    return (
                      <button
                        key={achievement.id}
                        onClick={() => toggleAchievement(achievement.id)}
                        className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <AchievementIcon icon={achievement.icon} title={achievement.title} size="md" />
                        <p className="text-sm font-medium text-center">{achievement.title}</p>
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button (Mobile) */}
          {hasChanges && (
            <div className="lg:hidden">
              <Button onClick={handleSaveAll} size="lg" className="w-full gap-2">
                <Save className="h-4 w-4" />
                Salvar Todas as Alterações
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
