import { useState, useEffect } from "react";

export function PythagorasTheorem() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [showProof, setShowProof] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const c = Math.sqrt(a * a + b * b);
  const areaA = a * a;
  const areaB = b * b;
  const areaC = c * c;

  // Verificar se é triângulo pitagórico
  const isPythagorean = Number.isInteger(c);

  // Triângulos pitagóricos famosos
  const pythagoreanTriples = [
    { a: 3, b: 4, c: 5 },
    { a: 5, b: 12, c: 13 },
    { a: 8, b: 15, c: 17 },
    { a: 7, b: 24, c: 25 },
  ];

  // Animação da prova
  useEffect(() => {
    if (showProof) {
      const interval = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showProof]);

  // Escala para visualização
  const scale = 20;
  const maxSize = Math.max(a, b) * scale + 50;

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Cateto a
          </label>
          <input
            type="range"
            min="1"
            max="12"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-center text-2xl font-bold text-blue-600 mt-1">{a}</div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <label className="block text-sm font-medium text-green-700 mb-2">
            Cateto b
          </label>
          <input
            type="range"
            min="1"
            max="12"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="text-center text-2xl font-bold text-green-600 mt-1">{b}</div>
        </div>
      </div>

      {/* Triângulos pitagóricos */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pythagoreanTriples.map((triple, i) => (
          <button
            key={i}
            onClick={() => { setA(triple.a); setB(triple.b); }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              a === triple.a && b === triple.b
                ? "bg-purple-500 text-white"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            ({triple.a}, {triple.b}, {triple.c})
          </button>
        ))}
      </div>

      {/* Visualização do triângulo */}
      <div className="bg-slate-50 rounded-xl p-6 flex justify-center">
        <svg width={maxSize + 150} height={maxSize + 50} viewBox={`0 0 ${maxSize + 150} ${maxSize + 50}`}>
          {/* Quadrado sobre cateto a (azul) */}
          <rect
            x={10}
            y={10}
            width={a * scale}
            height={a * scale}
            fill="#3b82f6"
            opacity={0.3}
            stroke="#3b82f6"
            strokeWidth={2}
          />
          <text x={10 + (a * scale) / 2} y={10 + (a * scale) / 2} textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="bold">
            a² = {areaA}
          </text>

          {/* Quadrado sobre cateto b (verde) */}
          <rect
            x={10 + a * scale + 10}
            y={10}
            width={b * scale}
            height={b * scale}
            fill="#22c55e"
            opacity={0.3}
            stroke="#22c55e"
            strokeWidth={2}
          />
          <text x={10 + a * scale + 10 + (b * scale) / 2} y={10 + (b * scale) / 2} textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">
            b² = {areaB}
          </text>

          {/* Triângulo */}
          <polygon
            points={`${10},${maxSize} ${10 + a * scale},${maxSize} ${10},${maxSize - b * scale}`}
            fill="#f59e0b"
            opacity={0.5}
            stroke="#d97706"
            strokeWidth={2}
          />

          {/* Ângulo reto */}
          <rect
            x={10}
            y={maxSize - 15}
            width={15}
            height={15}
            fill="none"
            stroke="#d97706"
            strokeWidth={1}
          />

          {/* Labels dos lados */}
          <text x={10 + (a * scale) / 2} y={maxSize + 20} textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="bold">
            a = {a}
          </text>
          <text x={-5} y={maxSize - (b * scale) / 2} textAnchor="middle" fill="#22c55e" fontSize="16" fontWeight="bold">
            b = {b}
          </text>
          <text x={10 + (a * scale) / 2 + 20} y={maxSize - (b * scale) / 2 - 10} textAnchor="middle" fill="#dc2626" fontSize="16" fontWeight="bold">
            c = {c.toFixed(2)}
          </text>
        </svg>
      </div>

      {/* Fórmula e cálculo */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="text-center">
          <div className="text-lg font-medium text-slate-700 mb-4">
            Teorema de Pitágoras
          </div>
          
          <div className="flex items-center justify-center gap-4 flex-wrap text-2xl font-mono">
            <span className="text-blue-600">a²</span>
            <span className="text-slate-400">+</span>
            <span className="text-green-600">b²</span>
            <span className="text-slate-400">=</span>
            <span className="text-red-600">c²</span>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap text-xl font-mono mt-4">
            <span className="text-blue-600">{a}²</span>
            <span className="text-slate-400">+</span>
            <span className="text-green-600">{b}²</span>
            <span className="text-slate-400">=</span>
            <span className="text-red-600">{c.toFixed(2)}²</span>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap text-xl font-mono mt-2">
            <span className="text-blue-600">{areaA}</span>
            <span className="text-slate-400">+</span>
            <span className="text-green-600">{areaB}</span>
            <span className="text-slate-400">=</span>
            <span className="text-red-600">{areaC.toFixed(2)}</span>
          </div>

          <div className="mt-4 text-lg">
            c = √({areaA} + {areaB}) = √{areaA + areaB} = <span className="font-bold text-red-600">{c.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {/* Indicador de triângulo pitagórico */}
      {isPythagorean && (
        <div className="bg-green-100 rounded-xl p-4 border border-green-300 text-center">
          <span className="text-2xl">⭐</span>
          <span className="text-green-700 font-bold ml-2">
            Triângulo Pitagórico! ({a}, {b}, {c})
          </span>
          <p className="text-sm text-green-600 mt-1">
            Todos os lados são números inteiros
          </p>
        </div>
      )}

      {/* Botão de prova visual */}
      <button
        onClick={() => setShowProof(!showProof)}
        className="w-full py-3 px-4 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition-colors"
      >
        {showProof ? '🔼 Ocultar' : '🔽 Mostrar'} Prova Visual
      </button>

      {showProof && (
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="text-sm font-medium text-purple-700 mb-4 text-center">
            🎨 Prova Visual do Teorema
          </div>
          <div className="text-center text-slate-600">
            <p className="mb-4">
              A área do quadrado sobre a hipotenusa (c²) é igual à soma das áreas dos quadrados sobre os catetos (a² + b²).
            </p>
            <div className="flex justify-center gap-4 items-center">
              <div className="w-16 h-16 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
                {areaA}
              </div>
              <span className="text-2xl">+</span>
              <div className="w-20 h-20 bg-green-500 rounded flex items-center justify-center text-white font-bold">
                {areaB}
              </div>
              <span className="text-2xl">=</span>
              <div className="w-24 h-24 bg-red-500 rounded flex items-center justify-center text-white font-bold">
                {areaC.toFixed(0)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aplicações */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <div className="text-sm font-medium text-amber-700 mb-2">
          💡 Aplicações Práticas
        </div>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• Calcular a diagonal de uma TV ou monitor</li>
          <li>• Determinar a distância entre dois pontos</li>
          <li>• Verificar se um ângulo é reto (90°)</li>
          <li>• Construção civil e arquitetura</li>
        </ul>
      </div>
    </div>
  );
}
