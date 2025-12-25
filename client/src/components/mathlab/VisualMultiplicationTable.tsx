import { useState } from "react";

export function VisualMultiplicationTable() {
  const [selectedNumber, setSelectedNumber] = useState(7);
  const [showPattern, setShowPattern] = useState(false);
  const [highlightedCell, setHighlightedCell] = useState<[number, number] | null>(null);

  // Cores para cada número
  const colors: Record<number, string> = {
    1: "#ef4444",
    2: "#f97316",
    3: "#eab308",
    4: "#22c55e",
    5: "#14b8a6",
    6: "#06b6d4",
    7: "#3b82f6",
    8: "#8b5cf6",
    9: "#ec4899",
    10: "#f43f5e",
  };

  // Gerar tabuada
  const generateTable = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      multiplier: i + 1,
      result: selectedNumber * (i + 1),
    }));
  };

  const table = generateTable();

  // Padrão dos últimos dígitos
  const getLastDigitPattern = () => {
    const pattern = [];
    for (let i = 1; i <= 10; i++) {
      pattern.push((selectedNumber * i) % 10);
    }
    return pattern;
  };

  const lastDigitPattern = getLastDigitPattern();

  return (
    <div className="space-y-6">
      {/* Seletor de número */}
      <div className="bg-slate-50 rounded-xl p-4">
        <label className="block text-sm font-medium text-slate-700 mb-3 text-center">
          Escolha um número para ver a tabuada
        </label>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setSelectedNumber(num)}
              className={`w-12 h-12 rounded-xl font-bold text-lg transition-all ${
                selectedNumber === num
                  ? "text-white shadow-lg scale-110"
                  : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              }`}
              style={{
                backgroundColor: selectedNumber === num ? colors[num] : undefined,
              }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Tabuada visual */}
      <div
        className="rounded-xl p-6 border-2"
        style={{
          backgroundColor: `${colors[selectedNumber]}10`,
          borderColor: colors[selectedNumber],
        }}
      >
        <div className="text-center mb-6">
          <span className="text-4xl font-bold" style={{ color: colors[selectedNumber] }}>
            Tabuada do {selectedNumber}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {table.map(({ multiplier, result }) => (
            <div
              key={multiplier}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onMouseEnter={() => setHighlightedCell([selectedNumber, multiplier])}
              onMouseLeave={() => setHighlightedCell(null)}
            >
              <div className="text-center">
                <div className="text-lg font-mono">
                  <span style={{ color: colors[selectedNumber] }}>{selectedNumber}</span>
                  <span className="text-slate-400"> × </span>
                  <span className="text-slate-700">{multiplier}</span>
                </div>
                <div className="text-2xl font-bold mt-1" style={{ color: colors[selectedNumber] }}>
                  = {result}
                </div>
              </div>
              
              {/* Visualização com pontos */}
              <div className="mt-3 flex flex-wrap justify-center gap-0.5">
                {Array.from({ length: Math.min(result, 30) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors[selectedNumber] }}
                  />
                ))}
                {result > 30 && (
                  <span className="text-xs text-slate-400">+{result - 30}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Padrão dos últimos dígitos */}
      <button
        onClick={() => setShowPattern(!showPattern)}
        className="w-full py-2 px-4 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition-colors"
      >
        {showPattern ? "🔼 Ocultar" : "🔽 Mostrar"} Padrão dos Últimos Dígitos
      </button>

      {showPattern && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="text-sm font-medium text-purple-700 mb-3">
            🔮 Padrão dos últimos dígitos da tabuada do {selectedNumber}:
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {lastDigitPattern.map((digit, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: colors[selectedNumber] }}
              >
                {digit}
              </div>
            ))}
          </div>
          <div className="text-sm text-slate-600 mt-3 text-center">
            {selectedNumber === 5 && "Sempre termina em 0 ou 5!"}
            {selectedNumber === 2 && "Sempre termina em número par!"}
            {selectedNumber === 10 && "Sempre termina em 0!"}
            {selectedNumber === 9 && "A soma dos dígitos é sempre 9!"}
            {[1, 3, 7].includes(selectedNumber) && "O padrão se repete a cada 10 multiplicações."}
          </div>
        </div>
      )}

      {/* Tabela completa de multiplicação */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 overflow-x-auto">
        <div className="text-sm font-medium text-slate-700 mb-3">
          📊 Tabela de Multiplicação Completa
        </div>
        <table className="w-full text-center text-sm">
          <thead>
            <tr>
              <th className="p-2 bg-slate-100">×</th>
              {Array.from({ length: 10 }, (_, i) => (
                <th
                  key={i}
                  className={`p-2 ${i + 1 === selectedNumber ? "bg-blue-100" : "bg-slate-100"}`}
                >
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, row) => (
              <tr key={row}>
                <td
                  className={`p-2 font-bold ${row + 1 === selectedNumber ? "bg-blue-100" : "bg-slate-100"}`}
                >
                  {row + 1}
                </td>
                {Array.from({ length: 10 }, (_, col) => {
                  const result = (row + 1) * (col + 1);
                  const isHighlighted =
                    row + 1 === selectedNumber ||
                    col + 1 === selectedNumber ||
                    (highlightedCell &&
                      highlightedCell[0] === col + 1 &&
                      highlightedCell[1] === row + 1);

                  return (
                    <td
                      key={col}
                      className={`p-2 transition-colors ${
                        isHighlighted ? "bg-blue-50 font-bold" : ""
                      }`}
                      style={{
                        color: isHighlighted ? colors[selectedNumber] : undefined,
                      }}
                    >
                      {result}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dicas */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <div className="text-sm font-medium text-amber-700 mb-2">
          💡 Dicas para Memorizar
        </div>
        <ul className="text-sm text-slate-600 space-y-1">
          {selectedNumber === 9 && (
            <>
              <li>• Use os dedos: abaixe o dedo correspondente ao multiplicador</li>
              <li>• Os dígitos somam 9: 9×2=18 (1+8=9), 9×3=27 (2+7=9)</li>
            </>
          )}
          {selectedNumber === 5 && (
            <li>• Multiplique por 10 e divida por 2</li>
          )}
          {selectedNumber === 4 && (
            <li>• Dobre o número duas vezes: 4×6 = 6×2×2 = 12×2 = 24</li>
          )}
          {selectedNumber === 11 && (
            <li>• Para números de 1 a 9, repita o dígito: 11×7 = 77</li>
          )}
          <li>• Pratique todos os dias por alguns minutos</li>
          <li>• Use a propriedade comutativa: 7×8 = 8×7</li>
        </ul>
      </div>
    </div>
  );
}
