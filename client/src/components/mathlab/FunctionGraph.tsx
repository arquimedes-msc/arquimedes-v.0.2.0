import { useState, useMemo } from "react";

type FunctionType = "linear" | "quadratic" | "absolute";

export function FunctionGraph() {
  const [functionType, setFunctionType] = useState<FunctionType>("linear");
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [showTable, setShowTable] = useState(false);

  // Calcular valor da função
  const f = (x: number): number => {
    switch (functionType) {
      case "linear":
        return a * x + b;
      case "quadratic":
        return a * x * x + b * x + c;
      case "absolute":
        return a * Math.abs(x - b) + c;
    }
  };

  // Gerar pontos para o gráfico
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let x = -10; x <= 10; x += 0.1) {
      pts.push({ x, y: f(x) });
    }
    return pts;
  }, [functionType, a, b, c]);

  // Escala do gráfico
  const scale = 20;
  const width = 400;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;

  // Converter coordenadas matemáticas para SVG
  const toSvgX = (x: number) => centerX + x * scale;
  const toSvgY = (y: number) => centerY - y * scale;

  // Gerar path do gráfico
  const pathD = useMemo(() => {
    const validPoints = points.filter(p => Math.abs(p.y) < 15);
    if (validPoints.length === 0) return "";
    
    return validPoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${toSvgX(p.x)} ${toSvgY(p.y)}`)
      .join(" ");
  }, [points]);

  // Calcular propriedades da função
  const getProperties = () => {
    switch (functionType) {
      case "linear":
        return {
          formula: `f(x) = ${a}x ${b >= 0 ? "+" : ""} ${b}`,
          type: a > 0 ? "Crescente" : a < 0 ? "Decrescente" : "Constante",
          root: a !== 0 ? -b / a : null,
          yIntercept: b,
        };
      case "quadratic":
        const delta = b * b - 4 * a * c;
        const vertex = { x: -b / (2 * a), y: f(-b / (2 * a)) };
        return {
          formula: `f(x) = ${a}x² ${b >= 0 ? "+" : ""} ${b}x ${c >= 0 ? "+" : ""} ${c}`,
          type: a > 0 ? "Parábola (concavidade para cima)" : "Parábola (concavidade para baixo)",
          vertex,
          delta,
          roots: delta >= 0 && a !== 0 
            ? [(-b + Math.sqrt(delta)) / (2 * a), (-b - Math.sqrt(delta)) / (2 * a)]
            : null,
        };
      case "absolute":
        return {
          formula: `f(x) = ${a}|x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}| ${c >= 0 ? "+" : ""} ${c}`,
          type: "Função Modular",
          vertex: { x: b, y: c },
        };
    }
  };

  const properties = getProperties();

  // Tabela de valores
  const tableValues = [-3, -2, -1, 0, 1, 2, 3].map(x => ({ x, y: f(x) }));

  return (
    <div className="space-y-6">
      {/* Seletor de tipo de função */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => { setFunctionType("linear"); setA(1); setB(0); setC(0); }}
          className={`py-3 px-2 rounded-xl font-bold text-sm transition-all ${
            functionType === "linear"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          📈 Linear
        </button>
        <button
          onClick={() => { setFunctionType("quadratic"); setA(1); setB(0); setC(0); }}
          className={`py-3 px-2 rounded-xl font-bold text-sm transition-all ${
            functionType === "quadratic"
              ? "bg-purple-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          📊 Quadrática
        </button>
        <button
          onClick={() => { setFunctionType("absolute"); setA(1); setB(0); setC(0); }}
          className={`py-3 px-2 rounded-xl font-bold text-sm transition-all ${
            functionType === "absolute"
              ? "bg-green-500 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          📐 Modular
        </button>
      </div>

      {/* Controles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            a = {a}
          </label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.5"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            b = {b}
          </label>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.5"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>

        {(functionType === "quadratic" || functionType === "absolute") && (
          <div className="bg-slate-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              c = {c}
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={c}
              onChange={(e) => setC(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        )}
      </div>

      {/* Gráfico */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 flex justify-center">
        <svg width={width} height={height} className="bg-slate-50 rounded-lg">
          {/* Grid */}
          {Array.from({ length: 21 }, (_, i) => i - 10).map(i => (
            <g key={i}>
              <line
                x1={toSvgX(i)}
                y1={0}
                x2={toSvgX(i)}
                y2={height}
                stroke="#e2e8f0"
                strokeWidth={i === 0 ? 2 : 1}
              />
              <line
                x1={0}
                y1={toSvgY(i)}
                x2={width}
                y2={toSvgY(i)}
                stroke="#e2e8f0"
                strokeWidth={i === 0 ? 2 : 1}
              />
            </g>
          ))}

          {/* Eixos */}
          <line x1={0} y1={centerY} x2={width} y2={centerY} stroke="#64748b" strokeWidth={2} />
          <line x1={centerX} y1={0} x2={centerX} y2={height} stroke="#64748b" strokeWidth={2} />

          {/* Labels dos eixos */}
          <text x={width - 15} y={centerY - 10} fill="#64748b" fontSize="14" fontWeight="bold">x</text>
          <text x={centerX + 10} y={15} fill="#64748b" fontSize="14" fontWeight="bold">y</text>

          {/* Números nos eixos */}
          {[-5, -2, 2, 5].map(n => (
            <g key={n}>
              <text x={toSvgX(n)} y={centerY + 15} fill="#94a3b8" fontSize="10" textAnchor="middle">{n}</text>
              <text x={centerX - 15} y={toSvgY(n) + 4} fill="#94a3b8" fontSize="10" textAnchor="middle">{n}</text>
            </g>
          ))}

          {/* Gráfico da função */}
          <path
            d={pathD}
            fill="none"
            stroke={functionType === "linear" ? "#3b82f6" : functionType === "quadratic" ? "#8b5cf6" : "#22c55e"}
            strokeWidth={3}
          />

          {/* Vértice (para quadrática e modular) */}
          {(functionType === "quadratic" || functionType === "absolute") && properties.vertex && (
            <circle
              cx={toSvgX(properties.vertex.x)}
              cy={toSvgY(properties.vertex.y)}
              r={6}
              fill="#ef4444"
            />
          )}

          {/* Raízes (para quadrática) */}
          {functionType === "quadratic" && properties.roots && properties.roots.map((root, i) => (
            <circle
              key={i}
              cx={toSvgX(root)}
              cy={centerY}
              r={5}
              fill="#22c55e"
            />
          ))}
        </svg>
      </div>

      {/* Fórmula e propriedades */}
      <div className={`rounded-xl p-6 ${
        functionType === "linear" ? "bg-blue-50 border border-blue-200" :
        functionType === "quadratic" ? "bg-purple-50 border border-purple-200" :
        "bg-green-50 border border-green-200"
      }`}>
        <div className="text-center mb-4">
          <span className="text-2xl font-mono font-bold">{properties.formula}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600">Tipo:</span>
            <span className="ml-2 font-medium">{properties.type}</span>
          </div>
          
          {functionType === "linear" && (
            <>
              <div>
                <span className="text-slate-600">Raiz:</span>
                <span className="ml-2 font-medium">
                  {properties.root !== null ? `x = ${properties.root.toFixed(2)}` : "Não existe"}
                </span>
              </div>
              <div>
                <span className="text-slate-600">Intercepto Y:</span>
                <span className="ml-2 font-medium">{properties.yIntercept}</span>
              </div>
            </>
          )}
          
          {functionType === "quadratic" && (
            <>
              <div>
                <span className="text-slate-600">Vértice:</span>
                <span className="ml-2 font-medium">
                  ({properties.vertex?.x.toFixed(2)}, {properties.vertex?.y.toFixed(2)})
                </span>
              </div>
              <div>
                <span className="text-slate-600">Δ (Delta):</span>
                <span className="ml-2 font-medium">{properties.delta?.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-600">Raízes:</span>
                <span className="ml-2 font-medium">
                  {properties.roots 
                    ? `x = ${properties.roots[0].toFixed(2)} e x = ${properties.roots[1].toFixed(2)}`
                    : "Não existem (Δ < 0)"}
                </span>
              </div>
            </>
          )}
          
          {functionType === "absolute" && (
            <div>
              <span className="text-slate-600">Vértice:</span>
              <span className="ml-2 font-medium">
                ({properties.vertex?.x}, {properties.vertex?.y})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tabela de valores */}
      <button
        onClick={() => setShowTable(!showTable)}
        className="w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg font-medium transition-colors"
      >
        {showTable ? "🔼 Ocultar" : "🔽 Mostrar"} Tabela de Valores
      </button>

      {showTable && (
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="p-2 bg-amber-100">x</th>
                {tableValues.map(v => (
                  <th key={v.x} className="p-2 bg-amber-100">{v.x}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 font-bold">f(x)</td>
                {tableValues.map(v => (
                  <td key={v.x} className="p-2">{v.y.toFixed(1)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
