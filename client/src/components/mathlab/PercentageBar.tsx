import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";

export function PercentageBar() {
  const [percentage, setPercentage] = useState(50);
  const [showAnimation, setShowAnimation] = useState(false);
  const fillRef = useRef<HTMLDivElement>(null);

  const animate = () => {
    if (!fillRef.current) return;
    setShowAnimation(true);

    gsap.fromTo(
      fillRef.current,
      { width: "0%" },
      {
        width: `${percentage}%`,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          setTimeout(() => setShowAnimation(false), 500);
        },
      }
    );
  };

  useEffect(() => {
    if (fillRef.current && !showAnimation) {
      gsap.set(fillRef.current, { width: `${percentage}%` });
    }
  }, [percentage]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-xl p-4 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Porcentagem: <span className="text-purple-600 text-2xl">{percentage}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            disabled={showAnimation}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-white rounded-lg p-3 border-2 border-slate-200">
            <p className="text-xs text-slate-600 mb-1">De 100 unidades</p>
            <p className="text-2xl font-bold text-purple-600">{percentage}</p>
          </div>
          <div className="bg-white rounded-lg p-3 border-2 border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Decimal</p>
            <p className="text-2xl font-bold text-blue-600">{(percentage / 100).toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={animate}
          disabled={showAnimation}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
        >
          <Play className="w-5 h-5" />
          Animar Preenchimento
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>0%</span>
            <span className="font-bold text-purple-600">{percentage}%</span>
            <span>100%</span>
          </div>
          <div className="relative h-16 bg-slate-100 rounded-lg overflow-hidden border-2 border-slate-300">
            <div
              ref={fillRef}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg transition-all"
              style={{ width: `${percentage}%` }}
            >
              {percentage > 10 && `${percentage}%`}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 100 }, (_, i) => {
            const isFilled = i < percentage;
            return (
              <div
                key={i}
                className={`aspect-square rounded transition-all ${
                  isFilled
                    ? "bg-gradient-to-br from-purple-400 to-pink-400"
                    : "bg-slate-200"
                }`}
              />
            );
          })}
        </div>

        <p className="text-center text-slate-600 text-sm mt-4">
          {percentage} quadrados preenchidos de 100 = <strong>{percentage}%</strong>
        </p>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
        <p className="text-sm text-slate-700">
          <strong>💡 Como funciona:</strong> Porcentagem significa "de cada 100".
          Por exemplo, 50% significa 50 de cada 100, ou metade do total.
        </p>
      </div>
    </div>
  );
}
