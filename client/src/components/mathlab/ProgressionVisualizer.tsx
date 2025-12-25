import { useState, useEffect } from "react";

type ProgressionType = "PA" | "PG";

export function ProgressionVisualizer() {
  const [type, setType] = useState<ProgressionType>("PA");
  const [a1, setA1] = useState(2);
  const [ratio, setRatio] = useState(3);
  const [numTerms, setNumTerms] = useState(8);
  const [animatedTerms, setAnimatedTerms] = useState<number[]>([]);

  // Calcular termos da progressão
  const calculateTerms = () => {
    const terms: number[] = [];
    for (let i = 0; i < numTerms; i++) {
      if (type === "PA") {
        terms.push(a1 + i * ratio);
      } else {
        terms.push(a1 * Math.pow(ratio, i));
      }
    }
    return terms;
  };

  const terms = calculateTerms();
  const maxTerm = Math.max(...terms);
  const sum = terms.reduce((acc, t) => acc + t, 0);

  // Animar termos
  useEffect(() => {
    setAnimatedTerms([]);
    terms.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedTerms(prev => [...prev, index]);
      }, index * 150);
    });
  }, [type, a1, ratio, numTerms]);

  // Calcular n-ésimo termo
  const getNthTerm = (n: number) => {
    if (type === "PA") {
      return a1 + (n - 1) * ratio;
    } else {
      return a1 * Math.pow(ratio, n - 1);
    }
  };

  // Calcular soma
  const getSum = () => {
    if (type === "PA") {
      const an = getNthTerm(numTerms);
      return ((a1 + an) * numTerms) / 2;
    } else {
      if (ratio === 1) return a1 * numTerms;
      return (a1 * (Math.pow(ratio, numTerms) - 1)) / (ratio - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Seletor de tipo */}
      <div className="flex gap-2">
        <button
          onClick={() => setType("PA")}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
            type === "PA"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          📈 Progressão Aritmética (PA)
        </button>
        <button
          onClick={() => {
            setType("PG");
            if (ratio > 3) setRatio(2);
          }}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
            type === "PG"
              ? "bg-purple-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          📊 Progressão Geométrica (PG)
        </button>
      </div>

      {/* Controles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Primeiro termo (a₁)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={a1}
            onChange={(e) => setA1(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-center text-xl font-bold text-blue-600 mt-1">{a1}</div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {type === "PA" ? "Razão (r)" : "Razão (q)"}
          </label>
          <input
            type="range"
            min={type === "PA" ? -5 : 1}
            max={type === "PA" ? 10 : 3}
            step={type === "PG" ? 0.5 : 1}
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value))}
            className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${
              type === "PA" ? "accent-blue-500" : "accent-purple-500"
            }`}
          />
          <div className={`text-center text-xl font-bold mt-1 ${
            type === "PA" ? "text-blue-600" : "text-purple-600"
          }`}>
            {ratio}
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Número de termos (n)
          </label>
          <input
            type="range"
            min="3"
            max="12"
            value={numTerms}
            onChange={(e) => setNumTerms(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="text-center text-xl font-bold text-green-600 mt-1">{numTerms}</div>
        </div>
      </div>

      {/* Visualização da sequência */}
      <div className={`rounded-xl p-6 ${
        type === "PA" ? "bg-blue-50 border border-blue-200" : "bg-purple-50 border border-purple-200"
      }`}>
        <div className="text-sm font-medium text-slate-700 mb-4">
          Sequência: ({terms.slice(0, 5).join(", ")}{terms.length > 5 ? ", ..." : ""})
        </div>
        
        {/* Barras de visualização */}
        <div className="flex items-end gap-2 h-48 mb-4">
          {terms.map((term, i) => {
            const height = Math.max(10, (term / maxTerm) * 100);
            const isAnimated = animatedTerms.includes(i);
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    type === "PA" ? "bg-blue-500" : "bg-purple-500"
                  } ${isAnimated ? "opacity-100" : "opacity-0"}`}
                  style={{ height: `${height}%` }}
                />
                <div className="text-xs font-mono mt-1 text-slate-600">
                  a<sub>{i + 1}</sub>
                </div>
                <div className={`text-sm font-bold ${
                  type === "PA" ? "text-blue-600" : "text-purple-600"
                }`}>
                  {term > 1000 ? term.toExponential(1) : term}
                </div>
              </div>
            );
          })}
        </div>

        {/* Diferenças/Razões entre termos */}
        <div className="flex gap-2 justify-center mb-4">
          {terms.slice(0, -1).map((term, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-slate-400 text-sm">{terms[i]}</span>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                type === "PA" 
                  ? "bg-blue-200 text-blue-700" 
                  : "bg-purple-200 text-purple-700"
              }`}>
                {type === "PA" ? `+${ratio}` : `×${ratio}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fórmulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`rounded-xl p-4 ${
          type === "PA" ? "bg-blue-100" : "bg-purple-100"
        }`}>
          <div className="text-sm font-medium text-slate-700 mb-2">
            📐 Fórmula do Termo Geral
          </div>
          <div className="font-mono text-lg">
            {type === "PA" ? (
              <>a<sub>n</sub> = {a1} + (n-1) × {ratio}</>
            ) : (
              <>a<sub>n</sub> = {a1} × {ratio}<sup>n-1</sup></>
            )}
          </div>
          <div className="text-sm text-slate-600 mt-2">
            a<sub>{numTerms}</sub> = {getNthTerm(numTerms)}
          </div>
        </div>

        <div className={`rounded-xl p-4 ${
          type === "PA" ? "bg-green-100" : "bg-pink-100"
        }`}>
          <div className="text-sm font-medium text-slate-700 mb-2">
            📊 Soma dos {numTerms} primeiros termos
          </div>
          <div className="font-mono text-lg">
            {type === "PA" ? (
              <>S<sub>n</sub> = (a₁ + a<sub>n</sub>) × n / 2</>
            ) : (
              <>S<sub>n</sub> = a₁ × (q<sup>n</sup> - 1) / (q - 1)</>
            )}
          </div>
          <div className="text-sm text-slate-600 mt-2">
            S<sub>{numTerms}</sub> = {getSum().toFixed(0)}
          </div>
        </div>
      </div>

      {/* Classificação */}
      <div className="bg-slate-100 rounded-xl p-4">
        <div className="text-sm font-medium text-slate-700 mb-2">
          🏷️ Classificação
        </div>
        <div className="flex flex-wrap gap-2">
          {type === "PA" && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              ratio > 0 
                ? "bg-green-200 text-green-700" 
                : ratio < 0 
                  ? "bg-red-200 text-red-700"
                  : "bg-slate-200 text-slate-700"
            }`}>
              {ratio > 0 ? "📈 PA Crescente" : ratio < 0 ? "📉 PA Decrescente" : "➡️ PA Constante"}
            </span>
          )}
          {type === "PG" && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              ratio > 1 
                ? "bg-green-200 text-green-700" 
                : ratio < 1 
                  ? "bg-orange-200 text-orange-700"
                  : "bg-slate-200 text-slate-700"
            }`}>
              {ratio > 1 ? "📈 PG Crescente" : ratio < 1 ? "📉 PG Decrescente" : "➡️ PG Constante"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
