import { useState } from "react";

export function DiceProbability() {
  const [numDice, setNumDice] = useState(2);
  const [targetSum, setTargetSum] = useState(7);
  const [rolls, setRolls] = useState<number[][]>([]);
  const [isRolling, setIsRolling] = useState(false);

  // Calcular todas as combinações possíveis
  const getAllCombinations = () => {
    if (numDice === 1) {
      return [[1], [2], [3], [4], [5], [6]];
    }
    
    const combinations: number[][] = [];
    const generate = (current: number[], depth: number) => {
      if (depth === numDice) {
        combinations.push([...current]);
        return;
      }
      for (let i = 1; i <= 6; i++) {
        current.push(i);
        generate(current, depth + 1);
        current.pop();
      }
    };
    generate([], 0);
    return combinations;
  };

  const allCombinations = getAllCombinations();
  const totalOutcomes = Math.pow(6, numDice);

  // Combinações que resultam na soma alvo
  const favorableCombinations = allCombinations.filter(
    combo => combo.reduce((a, b) => a + b, 0) === targetSum
  );
  const favorableCount = favorableCombinations.length;

  // Probabilidade
  const probability = favorableCount / totalOutcomes;
  const probabilityPercent = (probability * 100).toFixed(2);

  // Simplificar fração
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(favorableCount, totalOutcomes);
  const simplifiedNum = favorableCount / divisor;
  const simplifiedDen = totalOutcomes / divisor;

  // Rolar dados
  const rollDice = () => {
    setIsRolling(true);
    const newRoll = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
    
    setTimeout(() => {
      setRolls(prev => [newRoll, ...prev.slice(0, 9)]);
      setIsRolling(false);
    }, 500);
  };

  // Desenhar face do dado
  const DiceFace = ({ value, size = 40 }: { value: number; size?: number }) => {
    const dotPositions: Record<number, [number, number][]> = {
      1: [[50, 50]],
      2: [[25, 25], [75, 75]],
      3: [[25, 25], [50, 50], [75, 75]],
      4: [[25, 25], [75, 25], [25, 75], [75, 75]],
      5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
      6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]],
    };

    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="5" y="5" width="90" height="90" rx="10" fill="white" stroke="#334155" strokeWidth="3" />
        {dotPositions[value]?.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="10" fill="#1e293b" />
        ))}
      </svg>
    );
  };

  // Calcular distribuição de probabilidades
  const getDistribution = () => {
    const dist: Record<number, number> = {};
    for (let sum = numDice; sum <= numDice * 6; sum++) {
      dist[sum] = allCombinations.filter(c => c.reduce((a, b) => a + b, 0) === sum).length;
    }
    return dist;
  };

  const distribution = getDistribution();
  const maxCount = Math.max(...Object.values(distribution));

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Número de Dados
          </label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map(n => (
              <button
                key={n}
                onClick={() => {
                  setNumDice(n);
                  setTargetSum(Math.min(targetSum, n * 6));
                  if (targetSum < n) setTargetSum(n);
                }}
                className={`w-12 h-12 rounded-lg font-bold transition-colors ${
                  numDice === n
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-blue-100 text-blue-600 border border-blue-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <label className="block text-sm font-medium text-green-700 mb-2">
            Soma Alvo: {targetSum}
          </label>
          <input
            type="range"
            min={numDice}
            max={numDice * 6}
            value={targetSum}
            onChange={(e) => setTargetSum(Number(e.target.value))}
            className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="flex justify-between text-xs text-green-600 mt-1">
            <span>{numDice}</span>
            <span>{numDice * 6}</span>
          </div>
        </div>
      </div>

      {/* Visualização dos dados */}
      <div className="bg-slate-100 rounded-xl p-6">
        <div className="flex justify-center gap-4 mb-4">
          {Array.from({ length: numDice }).map((_, i) => (
            <div
              key={i}
              className={`transition-transform duration-500 ${isRolling ? "animate-bounce" : ""}`}
            >
              <DiceFace value={rolls[0]?.[i] || 1} size={60} />
            </div>
          ))}
        </div>
        
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-colors disabled:opacity-50"
        >
          🎲 {isRolling ? "Rolando..." : "Rolar Dados"}
        </button>

        {rolls.length > 0 && (
          <div className="mt-4 text-center">
            <span className="text-lg">
              Soma: <span className={`font-bold ${rolls[0].reduce((a, b) => a + b, 0) === targetSum ? "text-green-600" : "text-slate-600"}`}>
                {rolls[0].reduce((a, b) => a + b, 0)}
              </span>
              {rolls[0].reduce((a, b) => a + b, 0) === targetSum && " ✓"}
            </span>
          </div>
        )}
      </div>

      {/* Probabilidade */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="text-center">
          <div className="text-sm font-medium text-slate-700 mb-2">
            Probabilidade de obter soma = {targetSum}
          </div>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="text-center">
              <div className="text-sm text-slate-500">Fração</div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-purple-600">{favorableCount}</span>
                <div className="w-12 h-0.5 bg-slate-400" />
                <span className="text-2xl font-bold text-purple-600">{totalOutcomes}</span>
              </div>
            </div>

            {divisor > 1 && (
              <>
                <span className="text-xl text-slate-400">=</span>
                <div className="text-center">
                  <div className="text-sm text-slate-500">Simplificada</div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-600">{simplifiedNum}</span>
                    <div className="w-12 h-0.5 bg-slate-400" />
                    <span className="text-2xl font-bold text-green-600">{simplifiedDen}</span>
                  </div>
                </div>
              </>
            )}

            <span className="text-xl text-slate-400">=</span>
            
            <div className="text-center">
              <div className="text-sm text-slate-500">Porcentagem</div>
              <div className="text-3xl font-bold text-pink-600">{probabilityPercent}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Distribuição de probabilidades */}
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <div className="text-sm font-medium text-slate-700 mb-3">
          📊 Distribuição de Probabilidades
        </div>
        <div className="flex items-end gap-1 h-32">
          {Object.entries(distribution).map(([sum, count]) => (
            <div key={sum} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full rounded-t transition-all ${
                  Number(sum) === targetSum ? "bg-green-500" : "bg-blue-400"
                }`}
                style={{ height: `${(count / maxCount) * 100}%` }}
              />
              <div className="text-xs text-slate-600 mt-1">{sum}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Combinações favoráveis */}
      {favorableCombinations.length > 0 && favorableCombinations.length <= 20 && (
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="text-sm font-medium text-green-700 mb-2">
            ✅ Combinações que resultam em {targetSum} ({favorableCount} de {totalOutcomes}):
          </div>
          <div className="flex flex-wrap gap-2">
            {favorableCombinations.map((combo, i) => (
              <div key={i} className="flex gap-1 bg-white px-2 py-1 rounded-lg border border-green-200">
                {combo.map((val, j) => (
                  <DiceFace key={j} value={val} size={24} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Histórico de rolagens */}
      {rolls.length > 1 && (
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="text-sm font-medium text-slate-700 mb-2">
            📜 Histórico (últimas 10 rolagens)
          </div>
          <div className="space-y-1">
            {rolls.slice(1).map((roll, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">#{rolls.length - i - 1}</span>
                <span className="font-mono">[{roll.join(", ")}]</span>
                <span className="text-slate-400">=</span>
                <span className={`font-bold ${roll.reduce((a, b) => a + b, 0) === targetSum ? "text-green-600" : "text-slate-600"}`}>
                  {roll.reduce((a, b) => a + b, 0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
