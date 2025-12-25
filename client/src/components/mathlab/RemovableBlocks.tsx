import { useState, useRef } from "react";
import { Play, RotateCcw, X } from "lucide-react";
import gsap from "gsap";

export function RemovableBlocks() {
  const [startNum, setStartNum] = useState(8);
  const [removeNum, setRemoveNum] = useState(3);
  const [removedBlocks, setRemovedBlocks] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const result = startNum - removeNum;

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-cyan-500",
    "bg-teal-500",
  ];

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Selecionar blocos para remover (últimos N blocos)
    const blocksToRemove = Array.from(
      { length: removeNum },
      (_, i) => startNum - 1 - i
    );

    // Animar remoção um por um
    const tl = gsap.timeline({
      onComplete: () => {
        setRemovedBlocks(blocksToRemove);
        setIsAnimating(false);
      },
    });

    blocksToRemove.forEach((blockIndex, i) => {
      tl.to(
        `[data-block="${blockIndex}"]`,
        {
          scale: 0.8,
          opacity: 0,
          y: -50,
          duration: 0.4,
          ease: "back.in",
        },
        i * 0.2
      );
    });
  };

  const reset = () => {
    setRemovedBlocks([]);
    setIsAnimating(false);

    // Reset visual
    gsap.set("[data-block]", { scale: 1, opacity: 1, y: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="bg-slate-50 rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Número inicial */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Quantidade Inicial: <span className="text-blue-600">{startNum}</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={startNum}
              onChange={(e) => {
                setStartNum(Number(e.target.value));
                reset();
              }}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              disabled={isAnimating}
            />
          </div>

          {/* Número a remover */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Remover: <span className="text-red-600">{removeNum}</span>
            </label>
            <input
              type="range"
              min="0"
              max={startNum}
              value={removeNum}
              onChange={(e) => {
                setRemoveNum(Number(e.target.value));
                reset();
              }}
              className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              disabled={isAnimating}
            />
          </div>
        </div>

        {/* Equação */}
        <div className="text-center py-3 bg-white rounded-lg border-2 border-slate-200">
          <div className="text-2xl font-bold text-slate-800">
            <span className="text-blue-600">{startNum}</span>
            {" - "}
            <span className="text-red-600">{removeNum}</span>
            {" = "}
            <span className="text-purple-600">{result}</span>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-2">
          <button
            onClick={animate}
            disabled={isAnimating || removeNum === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            Remover Blocos
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

      {/* Área de Blocos */}
      <div
        ref={containerRef}
        className="bg-white rounded-xl border-2 border-slate-200 p-6 min-h-[300px]"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {Array.from({ length: startNum }, (_, i) => {
            const isRemoved = removedBlocks.includes(i);
            const willBeRemoved = i >= startNum - removeNum;

            return (
              <div
                key={i}
                data-block={i}
                className={`relative w-16 h-16 rounded-lg ${
                  colors[i % colors.length]
                } shadow-md flex items-center justify-center text-white font-bold text-xl transition-all ${
                  willBeRemoved && !isRemoved && !isAnimating
                    ? "ring-2 ring-red-500 ring-offset-2"
                    : ""
                }`}
                style={{
                  opacity: isRemoved ? 0 : 1,
                  display: isRemoved ? "none" : "flex",
                }}
              >
                {i + 1}
                {willBeRemoved && !isRemoved && !isAnimating && (
                  <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1">
                    <X className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {removedBlocks.length > 0 && (
          <div className="mt-6 text-center text-slate-600">
            <p className="font-semibold">
              ✅ Restaram <span className="text-purple-600 text-xl">{result}</span> blocos
            </p>
          </div>
        )}
      </div>

      {/* Instruções */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
        <p className="text-sm text-slate-700">
          <strong>💡 Como funciona:</strong> Ajuste a quantidade inicial e quantos blocos quer remover.
          Clique em "Remover Blocos" para ver a subtração acontecer. Os blocos marcados com ❌ desaparecerão
          um por um, mostrando visualmente o resultado da subtração.
        </p>
      </div>
    </div>
  );
}
