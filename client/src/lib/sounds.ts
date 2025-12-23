/**
 * Sistema de Sons para Feedback Interativo
 * Usa Web Audio API para reproduzir sons de forma eficiente
 */

type SoundType = "success" | "error" | "levelup" | "achievement" | "click" | "whoosh";

class SoundManager {
  private context: AudioContext | null = null;
  private buffers: Map<SoundType, AudioBuffer> = new Map();
  private isMuted: boolean = false;
  private volume: number = 0.5; // Volume padrão (0.0 a 1.0)

  constructor() {
    // Inicializar AudioContext apenas quando necessário (para evitar avisos do browser)
    if (typeof window !== "undefined") {
      // Criar contexto após interação do usuário
      document.addEventListener("click", () => this.initContext(), { once: true });
    }
  }

  private initContext() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.loadSounds();
    }
  }

  /**
   * Carrega todos os sons (usando Data URLs para evitar requisições HTTP)
   * Em produção, você pode substituir por arquivos .mp3 reais
   */
  private async loadSounds() {
    if (!this.context) return;

    // Sons gerados sinteticamente (para não depender de arquivos externos)
    // Em produção, substitua por: await fetch('/sounds/success.mp3')
    
    try {
      // Som de sucesso (tom ascendente)
      this.buffers.set("success", await this.createSuccessSound());
      
      // Som de erro (tom descendente)
      this.buffers.set("error", await this.createErrorSound());
      
      // Som de level-up (fanfarra)
      this.buffers.set("levelup", await this.createLevelUpSound());
      
      // Som de conquista (brilho)
      this.buffers.set("achievement", await this.createAchievementSound());
      
      // Som de click (curto)
      this.buffers.set("click", await this.createClickSound());
      
      // Som de whoosh (transição)
      this.buffers.set("whoosh", await this.createWhooshSound());
    } catch (error) {
      console.warn("Erro ao carregar sons:", error);
    }
  }

  /**
   * Cria som de sucesso (tom ascendente)
   */
  private async createSuccessSound(): Promise<AudioBuffer> {
    if (!this.context) throw new Error("AudioContext não inicializado");
    
    const sampleRate = this.context.sampleRate;
    const duration = 0.3;
    const buffer = this.context.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const freq = 440 + (t * 200); // 440Hz subindo para 640Hz
      const envelope = Math.exp(-t * 8); // Decay exponencial
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
    }

    return buffer;
  }

  /**
   * Cria som de erro (tom descendente)
   */
  private async createErrorSound(): Promise<AudioBuffer> {
    if (!this.context) throw new Error("AudioContext não inicializado");
    
    const sampleRate = this.context.sampleRate;
    const duration = 0.3;
    const buffer = this.context.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const freq = 440 - (t * 200); // 440Hz descendo para 240Hz
      const envelope = Math.exp(-t * 6);
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
    }

    return buffer;
  }

  /**
   * Cria som de level-up (fanfarra)
   */
  private async createLevelUpSound(): Promise<AudioBuffer> {
    if (!this.context) throw new Error("AudioContext não inicializado");
    
    const sampleRate = this.context.sampleRate;
    const duration = 0.6;
    const buffer = this.context.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    const notes = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C (uma oitava acima)
    const noteDuration = duration / notes.length;

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const noteIndex = Math.floor(t / noteDuration);
      const freq = notes[noteIndex] || notes[notes.length - 1];
      const envelope = Math.exp(-(t % noteDuration) * 10);
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.2;
    }

    return buffer;
  }

  /**
   * Cria som de conquista (brilho)
   */
  private async createAchievementSound(): Promise<AudioBuffer> {
    if (!this.context) throw new Error("AudioContext não inicializado");
    
    const sampleRate = this.context.sampleRate;
    const duration = 0.5;
    const buffer = this.context.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const freq1 = 523.25; // C5
      const freq2 = 659.25; // E5
      const freq3 = 783.99; // G5
      const envelope = Math.exp(-t * 4);
      data[i] = (
        Math.sin(2 * Math.PI * freq1 * t) +
        Math.sin(2 * Math.PI * freq2 * t) +
        Math.sin(2 * Math.PI * freq3 * t)
      ) * envelope * 0.15;
    }

    return buffer;
  }

  /**
   * Cria som de click (curto)
   */
  private async createClickSound(): Promise<AudioBuffer> {
    if (!this.context) throw new Error("AudioContext não inicializado");
    
    const sampleRate = this.context.sampleRate;
    const duration = 0.05;
    const buffer = this.context.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 100);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.2;
    }

    return buffer;
  }

  /**
   * Cria som de whoosh (transição)
   */
  private async createWhooshSound(): Promise<AudioBuffer> {
    if (!this.context) throw new Error("AudioContext não inicializado");
    
    const sampleRate = this.context.sampleRate;
    const duration = 0.4;
    const buffer = this.context.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const freq = 200 + (t * 1000); // Sweep de 200Hz a 1200Hz
      const envelope = Math.exp(-t * 5);
      data[i] = (Math.random() * 2 - 1) * Math.sin(2 * Math.PI * freq * t) * envelope * 0.1;
    }

    return buffer;
  }

  /**
   * Reproduz um som
   */
  play(type: SoundType) {
    if (this.isMuted || !this.context) return;

    this.initContext(); // Garantir que o contexto está inicializado

    const buffer = this.buffers.get(type);
    if (!buffer || !this.context) return;

    try {
      const source = this.context.createBufferSource();
      const gainNode = this.context.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = this.volume;
      
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      source.start(0);
    } catch (error) {
      console.warn(`Erro ao reproduzir som ${type}:`, error);
    }
  }

  /**
   * Ativa/desativa o mute
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Define o volume (0.0 a 1.0)
   */
  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Retorna se está mutado
   */
  getMuted() {
    return this.isMuted;
  }
}

// Instância singleton
export const soundManager = new SoundManager();

/**
 * Hook React para usar sons nos componentes
 */
export function useSounds() {
  const playSuccess = () => soundManager.play("success");
  const playError = () => soundManager.play("error");
  const playLevelUp = () => soundManager.play("levelup");
  const playAchievement = () => soundManager.play("achievement");
  const playClick = () => soundManager.play("click");
  const playWhoosh = () => soundManager.play("whoosh");

  return {
    playSuccess,
    playError,
    playLevelUp,
    playAchievement,
    playClick,
    playWhoosh,
    toggleMute: () => soundManager.toggleMute(),
    setVolume: (volume: number) => soundManager.setVolume(volume),
    isMuted: soundManager.getMuted(),
  };
}
