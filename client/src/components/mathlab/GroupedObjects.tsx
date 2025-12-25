import { useState } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";

export function GroupedObjects() {
  const [groups, setGroups] = useState(3);
  const [itemsPerGroup, setItemsPerGroup] = useState(4);
  const [showAnimation, setShowAnimation] = useState(false);

  const total = groups * itemsPerGroup;

  const animate = () => {
    setShowAnimation(true);

    gsap.fromTo(
      ".group-container",
      { scale: 0, opacity: 0, y: 50 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
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
              Número de Grupos: <span className="text-blue-600">{groups}</span>
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={groups}
              onChange={(e) => setGroups(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Itens por Grupo: <span className="text-green-600">{itemsPerGroup}</span>
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={itemsPerGroup}
              onChange={(e) => setItemsPerGroup(Number(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
        </div>

        <div className="text-center py-3 bg-white rounded-lg border-2 border-slate-200">
          <div className="text-2xl font-bold text-slate-800">
            <span className="text-blue-600">{groups}</span>
            {" × "}
            <span className="text-green-600">{itemsPerGroup}</span>
            {" = "}
            <span className="text-purple-600">{total}</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {groups} grupo{groups !== 1 ? "s" : ""} com {itemsPerGroup} maçã{itemsPerGroup !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={animate}
          disabled={showAnimation}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
        >
          <Play className="w-5 h-5" />
          Animar Grupos
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {Array.from({ length: groups }, (_, groupIndex) => (
            <div
              key={groupIndex}
              className="group-container bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4"
            >
              <div className="text-center mb-2">
                <span className="text-xs font-bold text-green-700">Grupo {groupIndex + 1}</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: itemsPerGroup }, (_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="text-3xl"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    }}
                  >
                    🍎
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-600 font-semibold">
            Total: <span className="text-purple-600 text-xl">{total}</span> maçãs
          </p>
        </div>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
        <p className="text-sm text-slate-700">
          <strong>💡 Como funciona:</strong> A multiplicação é como ter vários grupos iguais.
          Por exemplo, 3 × 4 significa "3 grupos de 4 maçãs", totalizando 12 maçãs.
        </p>
      </div>
    </div>
  );
}
