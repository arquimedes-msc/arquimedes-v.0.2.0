import { motion } from "framer-motion";
import { useState } from "react";

interface MultiplicationMatrixProps {
  rows: number;
  cols: number;
  showAnimation?: boolean;
  className?: string;
}

export function MultiplicationMatrix({
  rows,
  cols,
  showAnimation = true,
  className = "",
}: MultiplicationMatrixProps) {
  const total = rows * cols;
  const cellSize = 40;

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {/* Título da operação */}
      <div className="text-center">
        <p className="text-3xl font-bold text-blue-900 mb-2">
          {rows} × {cols} = {total}
        </p>
        <p className="text-gray-600">
          {rows} {rows === 1 ? "linha" : "linhas"} de {cols}{" "}
          {cols === 1 ? "quadrado" : "quadrados"}
        </p>
      </div>

      {/* Matriz visual */}
      <div
        className="inline-grid gap-2 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: total }, (_, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;

          return (
            <motion.div
              key={index}
              initial={showAnimation ? { scale: 0, opacity: 0 } : {}}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: showAnimation ? index * 0.05 : 0,
                duration: 0.3,
              }}
              className="relative"
              style={{
                width: cellSize,
                height: cellSize,
              }}
            >
              {/* Quadrado */}
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md border-2 border-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {index + 1}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legenda de linhas e colunas */}
      <div className="flex gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-8 bg-gradient-to-b from-purple-400 to-purple-600 rounded"></div>
          <span className="font-medium text-gray-700">
            {rows} {rows === 1 ? "linha" : "linhas"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-gradient-to-r from-pink-400 to-pink-600 rounded"></div>
          <span className="font-medium text-gray-700">
            {cols} {cols === 1 ? "coluna" : "colunas"}
          </span>
        </div>
      </div>

      {/* Explicação */}
      <div className="max-w-md text-center">
        <p className="text-gray-700">
          Multiplicar <span className="font-bold text-purple-600">{rows}</span> ×{" "}
          <span className="font-bold text-pink-600">{cols}</span> é o mesmo que ter{" "}
          <span className="font-bold text-purple-600">{rows}</span>{" "}
          {rows === 1 ? "grupo" : "grupos"} com{" "}
          <span className="font-bold text-pink-600">{cols}</span>{" "}
          {cols === 1 ? "item" : "itens"} cada, totalizando{" "}
          <span className="font-bold text-blue-600">{total}</span>{" "}
          {total === 1 ? "item" : "itens"}.
        </p>
      </div>
    </div>
  );
}

// Componente interativo
export function InteractiveMultiplicationMatrix() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [key, setKey] = useState(0);

  const handleUpdate = () => {
    setKey((prev) => prev + 1); // Força re-renderização com animação
  };

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl border-2 border-purple-200 shadow-xl">
      <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Matriz de Multiplicação Interativa
      </h3>

      <MultiplicationMatrix
        key={key}
        rows={rows}
        cols={cols}
        showAnimation={true}
      />

      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Número de linhas
          </label>
          <input
            type="range"
            min="1"
            max="8"
            value={rows}
            onChange={(e) => {
              setRows(Number(e.target.value));
              handleUpdate();
            }}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <p className="text-center mt-2 text-2xl font-bold text-purple-600">
            {rows}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Número de colunas
          </label>
          <input
            type="range"
            min="1"
            max="8"
            value={cols}
            onChange={(e) => {
              setCols(Number(e.target.value));
              handleUpdate();
            }}
            className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
          />
          <p className="text-center mt-2 text-2xl font-bold text-pink-600">
            {cols}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setRows(Math.floor(Math.random() * 6) + 2);
            setCols(Math.floor(Math.random() * 6) + 2);
            handleUpdate();
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🎲 Gerar Aleatório
        </button>

        <button
          onClick={() => {
            const temp = rows;
            setRows(cols);
            setCols(temp);
            handleUpdate();
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🔄 Inverter
        </button>
      </div>

      {/* Propriedade comutativa */}
      <div className="mt-6 p-4 bg-white/80 backdrop-blur rounded-lg border border-purple-200">
        <p className="text-center text-gray-700">
          <span className="font-bold text-purple-600">Propriedade Comutativa:</span>{" "}
          {rows} × {cols} = {cols} × {rows} = {rows * cols}
        </p>
      </div>
    </div>
  );
}

// Componente de tabuada visual
export function MultiplicationTable({ number }: { number: number }) {
  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
      <h4 className="text-2xl font-bold text-center text-indigo-900">
        Tabuada do {number}
      </h4>

      <div className="grid gap-3">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((multiplier) => {
          const result = number * multiplier;

          return (
            <motion.div
              key={multiplier}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: multiplier * 0.05 }}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-indigo-100"
            >
              <span className="text-lg font-semibold text-gray-700">
                {number} × {multiplier}
              </span>
              <span className="text-2xl font-bold text-indigo-600">
                = {result}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
