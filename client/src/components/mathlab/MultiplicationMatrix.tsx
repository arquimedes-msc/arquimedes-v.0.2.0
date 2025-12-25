import { useState } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";

export function MultiplicationMatrix() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [showAnimation, setShowAnimation] = useState(false);

  const total = rows * cols;

  const animate = () => {
    setShowAnimation(true);

    // Animar células uma por uma
    gsap.fromTo(
      ".matrix-cell",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: {
          amount: 1.5,
          from: "start",
          grid: [rows, cols],
        },
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
              Linhas: <span className="text-blue-600">{rows}</span>
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Colunas: <span className="text-green-600">{cols}</span>
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
        </div>

        <div className="text-center py-3 bg-white rounded-lg border-2 border-slate-200">
          <div className="text-2xl font-bold text-slate-800">
            <span className="text-blue-600">{rows}</span>
            {" × "}
            <span className="text-green-600">{cols}</span>
            {" = "}
            <span className="text-purple-600">{total}</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {rows} linha{rows !== 1 ? "s" : ""} de {cols} célula{cols !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={animate}
          disabled={showAnimation}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
        >
          <Play className="w-5 h-5" />
          Animar Matriz
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <div
          className="grid gap-2 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            maxWidth: cols * 60 + (cols - 1) * 8,
          }}
        >
          {Array.from({ length: rows * cols }, (_, i) => (
            <div
              key={i}
              className="matrix-cell aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-md flex items-center justify-center text-white font-bold"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
        <p className="text-sm text-slate-700">
          <strong>💡 Como funciona:</strong> A multiplicação pode ser vista como uma grade (matriz).
          Por exemplo, 3 × 4 significa "3 linhas de 4 objetos cada", totalizando 12 objetos.
        </p>
      </div>
    </div>
  );
}
