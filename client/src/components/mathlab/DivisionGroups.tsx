import { useState } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";

export function DivisionGroups() {
  const [total, setTotal] = useState(12);
  const [groups, setGroups] = useState(3);
  const [showAnimation, setShowAnimation] = useState(false);

  const itemsPerGroup = Math.floor(total / groups);
  const remainder = total % groups;

  const animate = () => {
    setShowAnimation(true);

    gsap.fromTo(
      ".division-group",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Total de Itens: <span className="text-blue-600">{total}</span>
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Dividir em: <span className="text-green-600">{groups}</span> grupos
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={groups}
              onChange={(e) => setGroups(Number(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
        </div>

        <div className="text-center py-3 bg-white rounded-lg border-2 border-slate-200">
          <div className="text-2xl font-bold text-slate-800">
            <span className="text-blue-600">{total}</span>
            {" ÷ "}
            <span className="text-green-600">{groups}</span>
            {" = "}
            <span className="text-purple-600">{itemsPerGroup}</span>
            {remainder > 0 && (
              <span className="text-orange-600 text-lg"> (resto {remainder})</span>
            )}
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Cada grupo recebe {itemsPerGroup} item{itemsPerGroup !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={animate}
          disabled={showAnimation}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
        >
          <Play className="w-5 h-5" />
          Distribuir em Grupos
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {Array.from({ length: groups }, (_, groupIndex) => (
            <div
              key={groupIndex}
              className="division-group bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-4"
            >
              <div className="text-center mb-2">
                <span className="text-xs font-bold text-blue-700">Grupo {groupIndex + 1}</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: itemsPerGroup }, (_, itemIndex) => (
                  <div key={itemIndex} className="text-2xl">
                    📦
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {remainder > 0 && (
          <div className="mt-6 bg-orange-50 border-2 border-orange-300 rounded-xl p-4">
            <div className="text-center">
              <p className="text-sm font-bold text-orange-700 mb-2">Sobrou (Resto)</p>
              <div className="flex gap-2 justify-center">
                {Array.from({ length: remainder }, (_, i) => (
                  <div key={i} className="text-2xl">
                    📦
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-sm text-slate-700">
          <strong>💡 Como funciona:</strong> A divisão distribui itens igualmente entre grupos.
          Por exemplo, 12 ÷ 3 significa "distribuir 12 caixas em 3 grupos", resultando em 4 caixas por grupo.
        </p>
      </div>
    </div>
  );
}
