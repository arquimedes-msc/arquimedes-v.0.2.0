import { useState, useMemo } from "react";

type CombType = "permutation" | "arrangement" | "combination";

export function CombinatoricsVisualizer() {
  const [type, setType] = useState<CombType>("permutation");
  const [n, setN] = useState(4);
  const [k, setK] = useState(2);

  const items = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🍒", "🍌"];

  // Calcular fatorial
  const factorial = (num: number): number => {
    if (num <= 1) return 1;
    return num * factorial(num - 1);
  };

  // Calcular resultado
  const calculate = () => {
    switch (type) {
      case "permutation":
        return factorial(n);
      case "arrangement":
        return factorial(n) / factorial(n - k);
      case "combination":
        return factorial(n) / (factorial(k) * factorial(n - k));
    }
  };

  // Gerar permutações
  const generatePermutations = (arr: string[]): string[][] => {
    if (arr.length <= 1) return [arr];
    const result: string[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const perms = generatePermutations(rest);
      for (const perm of perms) {
        result.push([arr[i], ...perm]);
      }
    }
    return result;
  };

  // Gerar arranjos
  const generateArrangements = (arr: string[], size: number): string[][] => {
    if (size === 0) return [[]];
    const result: string[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const subArrs = generateArrangements(rest, size - 1);
      for (const sub of subArrs) {
        result.push([arr[i], ...sub]);
      }
    }
    return result;
  };

  // Gerar combinações
  const generateCombinations = (arr: string[], size: number, start = 0): string[][] => {
    if (size === 0) return [[]];
    const result: string[][] = [];
    for (let i = start; i <= arr.length - size; i++) {
      const subCombs = generateCombinations(arr, size - 1, i + 1);
      for (const sub of subCombs) {
        result.push([arr[i], ...sub]);
      }
    }
    return result;
  };

  // Obter resultados visuais (limitado para performance)
  const visualResults = useMemo(() => {
    const selectedItems = items.slice(0, n);
    let results: string[][] = [];
    
    switch (type) {
      case "permutation":
        if (n <= 4) results = generatePermutations(selectedItems);
        break;
      case "arrangement":
        if (n <= 5 && k <= 3) results = generateArrangements(selectedItems, k);
        break;
      case "combination":
        if (n <= 6 && k <= 4) results = generateCombinations(selectedItems, k);
        break;
    }
    
    return results.slice(0, 24); // Limitar para visualização
  }, [type, n, k]);

  const result = calculate();
  const showAll = visualResults.length === result;

  return (
    <div className="space-y-6">
      {/* Seletor de tipo */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setType("permutation")}
          className={`py-3 px-2 rounded-xl font-bold text-sm transition-all ${
            type === "permutation"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          🔄 Permutação
        </button>
        <button
          onClick={() => setType("arrangement")}
          className={`py-3 px-2 rounded-xl font-bold text-sm transition-all ${
            type === "arrangement"
              ? "bg-purple-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          📋 Arranjo
        </button>
        <button
          onClick={() => setType("combination")}
          className={`py-3 px-2 rounded-xl font-bold text-sm transition-all ${
            type === "combination"
              ? "bg-green-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          🎯 Combinação
        </button>
      </div>

      {/* Descrição do tipo */}
      <div className={`rounded-xl p-4 ${
        type === "permutation" ? "bg-blue-50 border border-blue-200" :
        type === "arrangement" ? "bg-purple-50 border border-purple-200" :
        "bg-green-50 border border-green-200"
      }`}>
        <div className="text-sm">
          {type === "permutation" && (
            <>
              <strong>Permutação:</strong> Ordenar TODOS os {n} elementos.
              <br />A ordem importa. Usamos todos os elementos.
            </>
          )}
          {type === "arrangement" && (
            <>
              <strong>Arranjo:</strong> Escolher e ordenar {k} elementos de {n}.
              <br />A ordem importa. Usamos parte dos elementos.
            </>
          )}
          {type === "combination" && (
            <>
              <strong>Combinação:</strong> Escolher {k} elementos de {n}.
              <br />A ordem NÃO importa. Apenas selecionamos.
            </>
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Total de elementos (n)
          </label>
          <input
            type="range"
            min="2"
            max={type === "permutation" ? 6 : 8}
            value={n}
            onChange={(e) => {
              const newN = Number(e.target.value);
              setN(newN);
              if (k > newN) setK(newN);
            }}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-center gap-2 mt-2">
            {items.slice(0, n).map((item, i) => (
              <span key={i} className="text-2xl">{item}</span>
            ))}
          </div>
        </div>

        {type !== "permutation" && (
          <div className="bg-slate-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Elementos a escolher (k)
            </label>
            <input
              type="range"
              min="1"
              max={n}
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="text-center text-xl font-bold text-purple-600 mt-2">{k}</div>
          </div>
        )}
      </div>

      {/* Fórmula e Resultado */}
      <div className={`rounded-xl p-6 text-center ${
        type === "permutation" ? "bg-blue-100" :
        type === "arrangement" ? "bg-purple-100" :
        "bg-green-100"
      }`}>
        <div className="text-lg font-mono mb-2">
          {type === "permutation" && (
            <>P<sub>{n}</sub> = {n}! = {Array.from({length: n}, (_, i) => n - i).join(" × ")}</>
          )}
          {type === "arrangement" && (
            <>A<sub>{n},{k}</sub> = {n}! / ({n}-{k})! = {n}! / {n-k}!</>
          )}
          {type === "combination" && (
            <>C<sub>{n},{k}</sub> = {n}! / ({k}! × {n-k}!)</>
          )}
        </div>
        <div className="text-4xl font-bold">
          = {result.toLocaleString()}
        </div>
        <div className="text-sm text-slate-600 mt-2">
          {type === "permutation" && "maneiras de ordenar"}
          {type === "arrangement" && "arranjos possíveis"}
          {type === "combination" && "combinações possíveis"}
        </div>
      </div>

      {/* Visualização dos resultados */}
      {visualResults.length > 0 && (
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="text-sm font-medium text-slate-700 mb-3">
            {showAll ? "📋 Todos os resultados:" : `📋 Primeiros ${visualResults.length} de ${result}:`}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {visualResults.map((combo, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-center ${
                  type === "permutation" ? "bg-blue-50" :
                  type === "arrangement" ? "bg-purple-50" :
                  "bg-green-50"
                }`}
              >
                <span className="text-xl">{combo.join("")}</span>
              </div>
            ))}
          </div>
          {!showAll && (
            <div className="text-center text-sm text-slate-500 mt-2">
              ... e mais {result - visualResults.length} resultados
            </div>
          )}
        </div>
      )}

      {/* Comparação */}
      <div className="bg-slate-100 rounded-xl p-4">
        <div className="text-sm font-medium text-slate-700 mb-3">
          📊 Comparação (com n={n}, k={k})
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`p-3 rounded-lg ${type === "permutation" ? "bg-blue-200" : "bg-white"}`}>
            <div className="text-xs text-slate-600">Permutação</div>
            <div className="font-bold">{factorial(n).toLocaleString()}</div>
          </div>
          <div className={`p-3 rounded-lg ${type === "arrangement" ? "bg-purple-200" : "bg-white"}`}>
            <div className="text-xs text-slate-600">Arranjo</div>
            <div className="font-bold">{(factorial(n) / factorial(n - k)).toLocaleString()}</div>
          </div>
          <div className={`p-3 rounded-lg ${type === "combination" ? "bg-green-200" : "bg-white"}`}>
            <div className="text-xs text-slate-600">Combinação</div>
            <div className="font-bold">{(factorial(n) / (factorial(k) * factorial(n - k))).toLocaleString()}</div>
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-2 text-center">
          Permutação ≥ Arranjo ≥ Combinação (para mesmos n e k)
        </div>
      </div>
    </div>
  );
}
