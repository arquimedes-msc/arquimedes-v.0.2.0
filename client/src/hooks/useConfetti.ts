import { useCallback } from 'react';
import confetti from 'canvas-confetti';

/**
 * Hook para gerenciar animações de confete
 * Usa canvas-confetti para criar celebrações visuais
 */
export function useConfetti() {
  /**
   * Dispara confete básico do centro da tela
   */
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  /**
   * Dispara confete explosivo para grandes conquistas
   */
  const fireBigConfetti = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  /**
   * Dispara confete dos lados da tela
   */
  const fireSideConfetti = useCallback(() => {
    const end = Date.now() + 3 * 1000; // 3 segundos
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  /**
   * Dispara confete com emoji personalizado
   */
  const fireEmojiConfetti = useCallback((emoji: string = '🎉') => {
    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: emoji, scalar });

    confetti({
      shapes: [unicorn],
      particleCount: 30,
      spread: 100,
      origin: { y: 0.6 },
      scalar,
    });
  }, []);

  /**
   * Dispara confete dourado para conquistas especiais
   */
  const fireGoldenConfetti = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FFD700', '#FFA500', '#FF8C00'],
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star'],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle'],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, []);

  /**
   * Dispara confete em forma de chuva
   */
  const fireRainConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  return {
    fireConfetti,
    fireBigConfetti,
    fireSideConfetti,
    fireEmojiConfetti,
    fireGoldenConfetti,
    fireRainConfetti,
  };
}
