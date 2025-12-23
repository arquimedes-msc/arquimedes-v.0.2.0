import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Camera, Save, Globe, Palette, Moon, Sun } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";


export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { data: user, isLoading: isLoadingAuth } = trpc.auth.me.useQuery();
  const utils = trpc.useUtils();
  
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("pt");
  const [themeColor, setThemeColor] = useState("blue");
  const [darkMode, setDarkMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
    }
  }, [user]);

  const { data: activityHistory = [] } = trpc.user.getActivityHistory.useQuery(
    { limit: 10 },
    { enabled: isAuthenticated }
  );

  const { data: weeklyProgress = [] } = trpc.user.getWeeklyProgress.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const updateNameMutation = trpc.user.updateName.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
    },
  });

  const updateAvatarMutation = trpc.user.updateAvatar.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
    },
  });

  const updatePreferencesMutation = trpc.user.updatePreferences.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
    },
  });

  const handleSaveName = async () => {
    if (name.trim() && name !== user?.name) {
      await updateNameMutation.mutateAsync({ name: name.trim() });
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        // Update user avatar (will be uploaded to S3 by backend)
        await updateAvatarMutation.mutateAsync({ avatarUrl: base64 });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSavePreferences = async () => {
    const changes: any = {};
    if (language !== user?.language) changes.language = language;
    if (themeColor !== user?.themeColor) changes.themeColor = themeColor;
    if (darkMode !== user?.darkMode) changes.darkMode = darkMode;

    if (Object.keys(changes).length > 0) {
      await updatePreferencesMutation.mutateAsync(changes);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Sidebar />
      <div className="lg:ml-72 min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <div className="border-b bg-white/80 backdrop-blur-sm sticky top-16 lg:top-0 z-10">
          <div className="container py-4">
            <h2 className="text-2xl font-bold text-gray-900">Meu Perfil</h2>
            <p className="text-sm text-muted-foreground">Personalize sua experiência</p>
          </div>
        </div>

        <div className="container py-8 space-y-8">
          {/* Profile Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name || "User"} className="w-full h-full object-cover" />
                    ) : (
                      user.name?.[0]?.toUpperCase() || "U"
                    )}
                  </div>
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="h-4 w-4" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isUploading ? "Enviando..." : "Clique no ícone para alterar sua foto"}
                  </p>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <div className="flex gap-2">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                  />
                  <Button onClick={handleSaveName} disabled={!name.trim() || name === user.name}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>

              {/* Email (read-only) */}
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user.email || "Não informado"} disabled />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Idioma
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Theme Color */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Cor do Tema
                </Label>
                <Select value={themeColor} onValueChange={setThemeColor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Azul</SelectItem>
                    <SelectItem value="red">Vermelho</SelectItem>
                    <SelectItem value="green">Verde</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  Modo Escuro
                </Label>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <Button onClick={handleSavePreferences} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>

          {/* Activity History */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {activityHistory.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhuma atividade registrada ainda
                </p>
              ) : (
                <div className="space-y-4">
                  {activityHistory.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-semibold">{activity.pageTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.disciplineName} • {activity.moduleName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {activity.completed ? "✓ Concluída" : "Em andamento"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Progress Chart */}
          {weeklyProgress.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Progresso Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{new Date(day.date).toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" })}</span>
                        <span className="font-semibold">{day.completedPages} aulas • {day.totalXP} XP</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                          style={{ width: `${Math.min((day.completedPages / 5) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
