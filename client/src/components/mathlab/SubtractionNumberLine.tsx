import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";
import gsap from "gsap";

export function SubtractionNumberLine() {
  const [num1, setNum1] = useState(8);
  const [num2, setNum2] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const markerRef = useRef<SVGCircleElement>(null);
  const arcRef = useRef<SVGPathElement>(null);

  const result = num1 - num2;
  const min = 0;
  const max = 15;

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

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    const startX = numToX(num1);
    const endX = numToX(result);
    const midY = 40;

    gsap.set(marker, { cx: startX, cy: 60 });

    const arcPath = `M ${startX} 60 Q ${(startX + endX) / 2} ${midY} ${endX} 60`;
    gsap.set(arc, { attr: { d: arcPath }, opacity: 0 });

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
      <div className="bg-slate-50 rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Número Inicial: <span className="text-blue-600">{num1}</span>
            </label>
            <input
              type="range"
              min="1"
              max="15"
              value={num1}
              onChange={(e) => setNum1(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              disabled={isAnimating}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Subtrair: <span className="text-red-600">{num2}</span>
            </label>
            <input
              type="range"
              min="0"
              max={num1}
              value={num2}
              onChange={(e) => setNum2(Number(e.target.value))}
              className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              disabled={isAnimating}
            />
          </div>
        </div>

        <div className="text-center py-3 bg-white rounded-lg border-2 border-slate-200">
          <div className="text-2xl font-bold text-slate-800">
            <span className="text-blue-600">{num1}</span>
            {" - "}
            <span className="text-red-600">{num2}</span>
            {" = "}
            <span className="text-purple-600">{result}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={animate}
            disabled={isAnimating}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            Animar Subtração
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

      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <svg viewBox="0 0 600 100" className="w-full" style={{ maxHeight: "150px" }}>
          <line x1="40" y1="60" x2="560" y2="60" stroke="#94a3b8" strokeWidth="3" />

          {Array.from({ length: max + 1 }, (_, i) => {
            const x = numToX(i);
            const isStart = i === num1;
            const isEnd = i === result;

            return (
              <g key={i}>
                <line
                  x1={x}
                  y1="55"
                  x2={x}
                  y2="65"
                  stroke={isStart ? "#3b82f6" : isEnd ? "#9333ea" : "#94a3b8"}
                  strokeWidth={isStart || isEnd ? "3" : "2"}
                />
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

          <path
            ref={arcRef}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeDasharray="5,5"
            opacity="0"
          />

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

      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
        <p className="text-sm text-slate-700">
          <strong>💡 Como funciona:</strong> O marcador começa no número inicial e "salta para a esquerda"
          ao subtrair, mostrando a subtração como movimento negativo na reta numérica.
        </p>
      </div>
    </div>
  );
}
