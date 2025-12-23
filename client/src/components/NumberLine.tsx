import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NumberLineProps {
  start?: number;
  end?: number;
  addition?: number;
  showAnimation?: boolean;
  className?: string;
}

export function NumberLine({
  start = 0,
  end = 10,
  addition,
  showAnimation = true,
  className = "",
}: NumberLineProps) {
  const [currentPosition, setCurrentPosition] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const numbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const spacing = 80; // Espaçamento entre números
  const lineWidth = numbers.length * spacing;

  useEffect(() => {
    if (addition && showAnimation) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrentPosition(start + addition);
        setIsAnimating(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [addition, start, showAnimation]);

  return (
    <div className={`overflow-x-auto py-12 ${className}`}>
      <svg
        width={lineWidth + 100}
        height="200"
        className="mx-auto"
        style={{ minWidth: "100%" }}
      >
        {/* Linha principal */}
        <line
          x1="50"
          y1="100"
          x2={lineWidth + 50}
          y2="100"
          stroke="currentColor"
          strokeWidth="3"
          className="text-blue-600"
        />

        {/* Seta na ponta */}
        <polygon
          points={`${lineWidth + 50},100 ${lineWidth + 40},95 ${lineWidth + 40},105`}
          fill="currentColor"
          className="text-blue-600"
        />

        {/* Números e marcadores */}
        {numbers.map((num, index) => {
          const x = 50 + index * spacing;
          const isStart = num === start;
          const isEnd = addition && num === start + addition;
          const isInPath = addition && num > start && num <= start + addition;

          return (
            <g key={num}>
              {/* Marcador vertical */}
              <line
                x1={x}
                y1="90"
                x2={x}
                y2="110"
                stroke="currentColor"
                strokeWidth="2"
                className={
                  isStart || isEnd
                    ? "text-blue-600"
                    : isInPath
                    ? "text-blue-400"
                    : "text-gray-400"
                }
              />

              {/* Número */}
              <text
                x={x}
                y="140"
                textAnchor="middle"
                className={`text-lg font-semibold ${
                  isStart || isEnd
                    ? "fill-blue-600"
                    : isInPath
                    ? "fill-blue-500"
                    : "fill-gray-600"
                }`}
              >
                {num}
              </text>

              {/* Destaque visual para início */}
              {isStart && (
                <>
                  <circle
                    cx={x}
                    cy="100"
                    r="8"
                    fill="currentColor"
                    className="text-green-500"
                  />
                  <text
                    x={x}
                    y="70"
                    textAnchor="middle"
                    className="text-sm font-medium fill-green-600"
                  >
                    Início
                  </text>
                </>
              )}

              {/* Destaque visual para fim */}
              {isEnd && (
                <>
                  <circle
                    cx={x}
                    cy="100"
                    r="8"
                    fill="currentColor"
                    className="text-red-500"
                  />
                  <text
                    x={x}
                    y="70"
                    textAnchor="middle"
                    className="text-sm font-medium fill-red-600"
                  >
                    Resultado
                  </text>
                </>
              )}

              {/* Setas de movimento */}
              {addition && isInPath && index > 0 && (
                <g>
                  {/* Arco de movimento */}
                  <path
                    d={`M ${x - spacing + 10} 100 Q ${x - spacing / 2} 70 ${x - 10} 100`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-500"
                    strokeDasharray="4 4"
                  />
                  {/* Seta */}
                  <polygon
                    points={`${x - 10},100 ${x - 15},95 ${x - 15},105`}
                    fill="currentColor"
                    className="text-blue-500"
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* Marcador animado */}
        {addition && showAnimation && (
          <motion.g
            initial={{ x: 50 }}
            animate={{
              x: 50 + (currentPosition - start) * spacing,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <circle
              cy="100"
              r="12"
              fill="currentColor"
              className="text-yellow-400"
              opacity="0.8"
            />
            <circle
              cy="100"
              r="6"
              fill="currentColor"
              className="text-yellow-600"
            />
          </motion.g>
        )}

        {/* Legenda da operação */}
        {addition && (
          <text
            x={lineWidth / 2 + 50}
            y="30"
            textAnchor="middle"
            className="text-2xl font-bold fill-blue-600"
          >
            {start} + {addition} = {start + addition}
          </text>
        )}
      </svg>

      {/* Controles interativos (opcional) */}
      {addition && (
        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-700 font-medium">
            Começamos no <span className="text-green-600 font-bold">{start}</span>,
            movemos <span className="text-blue-600 font-bold">{addition}</span> posições
            para a direita, e chegamos em{" "}
            <span className="text-red-600 font-bold">{start + addition}</span>
          </p>
        </div>
      )}
    </div>
  );
}

// Componente de exemplo interativo
export function InteractiveNumberLine() {
  const [startNum, setStartNum] = useState(2);
  const [addNum, setAddNum] = useState(3);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
      <h3 className="text-2xl font-bold text-center text-blue-900">
        Reta Numérica Interativa
      </h3>

      <NumberLine
        start={0}
        end={Math.max(10, startNum + addNum + 2)}
        addition={addNum}
        showAnimation={true}
      />

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número inicial
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={startNum}
            onChange={(e) => setStartNum(Number(e.target.value))}
            className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quanto adicionar
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={addNum}
            onChange={(e) => setAddNum(Number(e.target.value))}
            className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            setStartNum(Math.floor(Math.random() * 10));
            setAddNum(Math.floor(Math.random() * 5) + 1);
          }}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          🎲 Gerar Exemplo Aleatório
        </button>
      </div>
    </div>
  );
}
