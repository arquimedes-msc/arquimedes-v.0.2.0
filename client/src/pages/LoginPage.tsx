import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Mail } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function LoginPage() {
  // Logout automático ao acessar a página de login
  useEffect(() => {
    sessionStorage.clear();
    localStorage.removeItem("user");
  }, []);

  const handleOAuthLogin = () => {
    // Redireciona para o fluxo OAuth do Manus
    // Após login bem-sucedido, o callback redirecionará para /dashboard
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900">
      {/* Efeitos de fundo decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Hero Section Minimalista */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl tracking-tight">
            Arquimedes
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent rounded-full" />
          <p className="text-2xl md:text-3xl text-blue-100 font-light tracking-wide">
            Matemática Descomplicada
          </p>
        </div>

        {/* Card de Login Minimalista */}
        <Card className="w-full max-w-sm p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <div className="space-y-4">
            {/* Botões de Login OAuth */}
            <Button
              type="button"
              onClick={handleOAuthLogin}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base"
            >
              <svg
                className="w-5 h-5 mr-3 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Entrar com Manus
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleOAuthLogin}
              className="w-full h-14 border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all duration-200 font-medium text-base"
            >
              <Mail className="w-5 h-5 mr-3 text-red-600 flex-shrink-0" />
              Entrar com Google
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleOAuthLogin}
              className="w-full h-14 border-2 border-gray-300 hover:border-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium text-base"
            >
              <Github className="w-5 h-5 mr-3 text-gray-800 flex-shrink-0" />
              Entrar com GitHub
            </Button>
          </div>
        </Card>

        {/* Footer minimalista */}
        <div className="mt-12 text-center text-blue-100/80 text-sm">
          <p>© 2025 Arquimedes</p>
        </div>
      </div>

      {/* CSS para animações */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-white\\/\\[0\\.05\\] {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}
