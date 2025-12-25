import { useState } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";

export function PercentagePie() {
  const [percentage, setPercentage] = useState(25);
  const [showAnimation, setShowAnimation] = useState(false);

  const slices = 8; // Pizza dividida em 8 fatias
  const filledSlices = Math.round((percentage / 100) * slices);

  const animate = () => {
    setShowAnimation(true);

    gsap.fromTo(
      ".pizza-slice",
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out",
        onComplete: () => {
          setTimeout(() => setShowAnimation(false), 500);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-xl p-4 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Porcentagem: <span className="text-yellow-600 text-2xl">{percentage}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="12.5"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="w-full h-3 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
            disabled={showAnimation}
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="text-center py-3 bg-white rounded-lg border-2 border-slate-200">
          <div className="text-2xl font-bold text-slate-800">
            <span className="text-yellow-600">{filledSlices}</span>
            {" de "}
            <span className="text-orange-600">{slices}</span>
            {" fatias"}
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {percentage}% da pizza
          </p>
        </div>

        <button
          onClick={animate}
          disabled={showAnimation}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all disabled:opacity-50"
        >
          <Play className="w-5 h-5" />
          Animar Pizza
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <div className="relative w-64 h-64 mx-auto">
          {/* Pizza base (círculo) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-orange-300" />

          {/* Fatias */}
          <div className="absolute inset-0">
            {Array.from({ length: slices }, (_, i) => {
              const isFilled = i < filledSlices;
              const angle = (360 / slices) * i;

              return (
                <div
                  key={i}
                  className="pizza-slice absolute inset-0 origin-center"
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div
                    className={`absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left transition-all ${
                      isFilled
                        ? "bg-gradient-to-br from-yellow-400 to-orange-400"
                        : "bg-slate-200 opacity-50"
                    }`}
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 0 100%)",
                      transform: `rotate(${360 / slices}deg)`,
                    }}
                  />
                  {/* Borda da fatia */}
                  <div
                    className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left border-l-2 border-orange-300"
                    style={{
                      transform: `rotate(${360 / slices}deg)`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Centro da pizza */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-orange-300 shadow-lg">
              <span className="text-2xl font-bold text-orange-600">{percentage}%</span>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-600 text-sm mt-6">
          🍕 Pizza dividida em {slices} fatias iguais
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
        <p className="text-sm text-slate-700">
          <strong>💡 Como funciona:</strong> A pizza representa 100% (o todo).
          Cada fatia representa uma fração do total. Por exemplo, 4 de 8 fatias = 50% da pizza.
        </p>
      </div>
    </div>
  );
}
