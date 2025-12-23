import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/lib/sounds";
import { Button } from "@/components/ui/button";

/**
 * Botão flutuante para controlar o som globalmente
 * Aparece no canto inferior direito da tela
 */
export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const handleToggle = () => {
    const newMutedState = soundManager.toggleMute();
    setIsMuted(newMutedState);
  };

  return (
    <Button
      onClick={handleToggle}
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:scale-110 transition-transform"
      aria-label={isMuted ? "Ativar som" : "Desativar som"}
      title={isMuted ? "Ativar som" : "Desativar som"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      )}
    </Button>
  );
}
