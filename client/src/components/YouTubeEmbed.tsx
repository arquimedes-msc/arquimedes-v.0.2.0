import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

/**
 * Componente reutilizável para embed de vídeos do YouTube
 * 
 * @param videoId - ID do vídeo do YouTube (ex: "dQw4w9WgXcQ")
 * @param title - Título do vídeo (opcional, para acessibilidade)
 * @param autoplay - Se deve iniciar automaticamente (padrão: false)
 * @param loop - Se deve repetir em loop (padrão: false)
 * @param className - Classes CSS adicionais
 * 
 * @example
 * <YouTubeEmbed videoId="dQw4w9WgXcQ" title="Aula de Adição" />
 */
export function YouTubeEmbed({
  videoId,
  title = "Vídeo educacional",
  autoplay = false,
  loop = false,
  className = "",
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Construir URL do embed com parâmetros
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    loop: loop ? "1" : "0",
    playlist: loop ? videoId : "", // Necessário para loop funcionar
    rel: "0", // Não mostrar vídeos relacionados
    modestbranding: "1", // Logo menor do YouTube
  }).toString()}`;

  // URL da thumbnail do vídeo
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Container responsivo 16:9 */}
      <div className="relative w-full pb-[56.25%] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        {!isLoaded && (
          <>
            {/* Thumbnail de preview */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay com botão de play */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors">
              <button
                onClick={() => setIsLoaded(true)}
                className="group flex items-center justify-center w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full shadow-xl transition-all hover:scale-110"
                aria-label="Reproduzir vídeo"
              >
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
              </button>
            </div>

            {/* Badge "Vídeo Educacional" */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg">
              📺 Vídeo Educacional
            </div>
          </>
        )}

        {/* iFrame do YouTube (carregado apenas quando usuário clicar) */}
        {isLoaded && (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>

      {/* Título do vídeo (opcional) */}
      {title && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {title}
        </p>
      )}
    </div>
  );
}

/**
 * Placeholder para vídeo que ainda não foi adicionado
 * Usado durante desenvolvimento para indicar onde o vídeo será inserido
 */
export function YouTubePlaceholder({ title }: { title: string }) {
  return (
    <div className="relative w-full">
      <div className="relative w-full pb-[56.25%] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg border-2 border-dashed border-gray-600">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <Play className="w-16 h-16 text-gray-500 mb-4" />
          <p className="text-white font-semibold text-lg mb-2">
            Vídeo em Breve
          </p>
          <p className="text-gray-400 text-sm max-w-md">
            {title}
          </p>
          <div className="mt-4 px-4 py-2 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
            📹 Conteúdo em Produção
          </div>
        </div>
      </div>
    </div>
  );
}
