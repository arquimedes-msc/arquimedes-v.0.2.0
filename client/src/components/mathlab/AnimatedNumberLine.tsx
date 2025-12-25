import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";
import gsap from "gsap";

export function AnimatedNumberLine() {
  const [num1, setNum1] = useState(3);
  const [num2, setNum2] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const markerRef = useRef<SVGCircleElement>(null);
  const arcRef = useRef<SVGPathElement>(null);

  const total = num1 + num2;
  const min = 0;
  const max = 15;

  // Função para converter número em posição X no SVG
  const numToX = (num: number) => {
    const padding = 40;
    const width = 600 - padding * 2;
    return padding + (num / max) * width;
  };

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const marker = markerRef.current;
    const arc = arcRef.current;
    if (!marker || !arc) return;

    // Timeline de animação
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Posições
    const startX = numToX(num1);
    const endX = numToX(total);
    const midY = 40; // Altura do arco

    // 1. Posicionar marcador no início
    gsap.set(marker, { cx: startX, cy: 60 });

    // 2. Criar arco (path)
    const arcPath = `M ${startX} 60 Q ${(startX + endX) / 2} ${midY} ${endX} 60`;
    gsap.set(arc, { attr: { d: arcPath }, opacity: 0 });

    // 3. Animar
    tl.to(arc, {
      opacity: 1,
      duration: 0.3,
    })
      .to(marker, {
        motionPath: {
          path: arcPath,
          align: arcPath,
          alignOrigin: [0.5, 0.5],
        },
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(
        marker,
        {
          scale: 1.3,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        },
        "-=0.3"
      );
  };

  const reset = () => {
    const marker = markerRef.current;
    const arc = arcRef.current;
    if (!marker || !arc) return;

    gsap.set(marker, { cx: numToX(num1), cy: 60, scale: 1 });
    gsap.set(arc, { opacity: 0 });
    setIsAnimating(false);
  };

  useEffect(() => {
    reset();
  }, [num1, num2]);

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="bg-slate-50 rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Número 1 */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Primeiro Número: <span className="text-blue-600">{num1}</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={num1}
              onChange={(e) => setNum1(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              disabled={isAnimating}
            />
          </div>

          {/* Número 2 */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Segundo Número: <span className="text-green-600">{num2}</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={num2}
              onChange={(e) => setNum2(Number(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              disabled={isAnimating}
            />
          </div>
        </div>

        {/* Equação */}
        <div className="text-center py-3 bg-white rounded-lg border-2 border-slate-200">
          <div className="text-2xl font-bold text-slate-800">
            <span className="text-blue-600">{num1}</span>
            {" + "}
            <span className="text-green-600">{num2}</span>
            {" = "}
            <span className="text-purple-600">{total}</span>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          <button
            onClick={animate}
            disabled={isAnimating}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            Animar Adição
          </button>
          <button
            onClick={reset}
            disabled={isAnimating}
            className="px-4 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reta Numérica SVG */}
      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <svg
          viewBox="0 0 600 100"
          className="w-full"
          style={{ maxHeight: "150px" }}
        >
          {/* Linha principal */}
          <line
            x1="40"
            y1="60"
            x2="560"
            y2="60"
            stroke="#94a3b8"
            strokeWidth="3"
          />

          {/* Marcadores de números */}
          {Array.from({ length: max + 1 }, (_, i) => {
            const x = numToX(i);
            const isStart = i === num1;
            const isEnd = i === total;

            return (
              <g key={i}>
                {/* Linha vertical */}
                <line
                  x1={x}
                  y1="55"
                  x2={x}
                  y2="65"
                  stroke={isStart ? "#3b82f6" : isEnd ? "#9333ea" : "#94a3b8"}
                  strokeWidth={isStart || isEnd ? "3" : "2"}
                />
                {/* Número */}
                <text
                  x={x}
                  y="85"
                  textAnchor="middle"
                  className="text-xs font-semibold"
                  fill={isStart ? "#3b82f6" : isEnd ? "#9333ea" : "#64748b"}
                >
                  {i}
                </text>
              </g>
            );
          })}

          {/* Arco de movimento */}
          <path
            ref={arcRef}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeDasharray="5,5"
            opacity="0"
          />

          {/* Marcador animado */}
          <circle
            ref={markerRef}
            cx={numToX(num1)}
            cy="60"
            r="8"
            fill="#3b82f6"
            stroke="#fff"
            strokeWidth="2"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
          />
        </svg>
      </div>

      {/* Instruções */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-sm text-slate-700">
          <strong>💡 Como funciona:</strong> Ajuste os números com os sliders e clique em "Animar Adição".
          O marcador azul começará no primeiro número e "saltará" para a direita, mostrando a adição como
          movimento ao longo da reta numérica.
        </p>
      </div>
    </div>
  );
}
