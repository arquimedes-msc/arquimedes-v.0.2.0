import { useState } from "react";
import { motion } from "framer-motion";

interface Weight {
  id: string;
  value: number;
  label: string;
  side: "left" | "right";
}

export function BalancaEquacoes() {
  const [weights, setWeights] = useState<Weight[]>([
    { id: "1", value: 2, label: "2x", side: "left" },
    { id: "2", value: 3, label: "3", side: "left" },
    { id: "3", value: 11, label: "11", side: "right" },
  ]);

  const leftTotal = weights
    .filter((w) => w.side === "left")
    .reduce((sum, w) => sum + w.value, 0);
  const rightTotal = weights
    .filter((w) => w.side === "right")
    .reduce((sum, w) => sum + w.value, 0);

  const difference = leftTotal - rightTotal;
  const rotation = Math.max(-15, Math.min(15, difference * 3));

  const addWeight = (side: "left" | "right", value: number, label: string) => {
    const newWeight: Weight = {
      id: Date.now().toString(),
      value,
      label,
      side,
    };
    setWeights([...weights, newWeight]);
  };

  const removeWeight = (id: string) => {
    setWeights(weights.filter((w) => w.id !== id));
  };

  const reset = () => {
    setWeights([
      { id: "1", value: 2, label: "2x", side: "left" },
      { id: "2", value: 3, label: "3", side: "left" },
      { id: "3", value: 11, label: "11", side: "right" },
    ]);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          ⚖️ Balança de Equações
        </h3>
        <p className="text-sm text-gray-600">
          Adicione ou remova pesos para equilibrar a balança
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Equação atual: 2x + 3 = 11
        </p>
      </div>

      {/* Balança */}
      <div className="relative w-full max-w-2xl">
        {/* Suporte central */}
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-4 h-32 bg-gray-700 rounded-full" />
        <div className="absolute left-1/2 top-16 -translate-x-1/2 w-8 h-8 bg-gray-800 rounded-full" />

        {/* Barra da balança */}
        <motion.div
          className="relative w-full h-4 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 rounded-full shadow-lg"
          style={{ transformOrigin: "center" }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* Prato esquerdo */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-16 bg-gray-600 rounded-full" />
          <motion.div
            className="absolute -left-32 top-16 w-64 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg shadow-xl border-4 border-amber-700 flex flex-col items-center justify-center gap-2 p-4"
            animate={{ y: rotation * 2 }}
          >
            <div className="text-xs font-semibold text-amber-900 mb-1">
              Lado Esquerdo
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {weights
                .filter((w) => w.side === "left")
                .map((weight) => (
                  <motion.button
                    key={weight.id}
                    className="px-3 py-2 bg-white rounded-lg shadow-md text-sm font-bold text-gray-800 hover:bg-red-100 transition-colors"
                    onClick={() => removeWeight(weight.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {weight.label}
                  </motion.button>
                ))}
            </div>
            <div className="text-lg font-bold text-amber-900 mt-2">
              Total: {leftTotal}
            </div>
          </motion.div>

          {/* Prato direito */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-16 bg-gray-600 rounded-full" />
          <motion.div
            className="absolute -right-32 top-16 w-64 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg shadow-xl border-4 border-emerald-700 flex flex-col items-center justify-center gap-2 p-4"
            animate={{ y: -rotation * 2 }}
          >
            <div className="text-xs font-semibold text-emerald-900 mb-1">
              Lado Direito
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {weights
                .filter((w) => w.side === "right")
                .map((weight) => (
                  <motion.button
                    key={weight.id}
                    className="px-3 py-2 bg-white rounded-lg shadow-md text-sm font-bold text-gray-800 hover:bg-red-100 transition-colors"
                    onClick={() => removeWeight(weight.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {weight.label}
                  </motion.button>
                ))}
            </div>
            <div className="text-lg font-bold text-emerald-900 mt-2">
              Total: {rightTotal}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Status */}
      <div className="text-center mt-48">
        {difference === 0 ? (
          <div className="text-green-600 font-bold text-lg flex items-center gap-2 justify-center">
            <span className="text-2xl">✅</span>
            Balança equilibrada! A equação está resolvida.
          </div>
        ) : (
          <div className="text-orange-600 font-semibold flex items-center gap-2 justify-center">
            <span className="text-xl">⚠️</span>
            Balança desequilibrada. Diferença: {Math.abs(difference)}
          </div>
        )}
      </div>

      {/* Controles */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold text-gray-700 text-center">
            Adicionar à Esquerda
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => addWeight("left", 1, "x")}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
            >
              + x
            </button>
            <button
              onClick={() => addWeight("left", 1, "1")}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
            >
              + 1
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold text-gray-700 text-center">
            Adicionar à Direita
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => addWeight("right", 1, "x")}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
            >
              + x
            </button>
            <button
              onClick={() => addWeight("right", 1, "1")}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
            >
              + 1
            </button>
          </div>
        </div>

        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-semibold self-end"
        >
          🔄 Resetar
        </button>
      </div>

      {/* Dica */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 max-w-md">
        <div className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <div className="text-sm text-gray-700">
            <strong>Dica:</strong> Para resolver 2x + 3 = 11, remova 3 de ambos
            os lados. Depois, divida ambos os lados por 2 para encontrar x = 4.
          </div>
        </div>
      </div>
    </div>
  );
}
