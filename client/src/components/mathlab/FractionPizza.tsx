import { useState } from "react";

export function FractionPizza() {
  const [numerator, setNumerator] = useState(3);
  const [denominator, setDenominator] = useState(8);

  // Calcular MDC para simplificação
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const divisor = gcd(numerator, denominator);
  const simplifiedNum = numerator / divisor;
  const simplifiedDen = denominator / divisor;
  const isSimplified = divisor === 1;

  // Calcular porcentagem
  const percentage = ((numerator / denominator) * 100).toFixed(1);

  // Calcular decimal
  const decimal = (numerator / denominator).toFixed(3);

  // Gerar fatias da pizza
  const generateSlices = () => {
    const slices = [];
    const anglePerSlice = 360 / denominator;
    
    for (let i = 0; i < denominator; i++) {
      const startAngle = i * anglePerSlice - 90;
      const endAngle = (i + 1) * anglePerSlice - 90;
      const isFilled = i < numerator;
      
      // Converter para coordenadas
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = 100 + 80 * Math.cos(startRad);
      const y1 = 100 + 80 * Math.sin(startRad);
      const x2 = 100 + 80 * Math.cos(endRad);
      const y2 = 100 + 80 * Math.sin(endRad);
      
      const largeArc = anglePerSlice > 180 ? 1 : 0;
      
      slices.push({
        path: `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`,
        isFilled,
        index: i
      });
    }
    
    return slices;
  };

  const slices = generateSlices();

  // Cores para as fatias
  const getSliceColor = (index: number, isFilled: boolean) => {
    if (!isFilled) return "#f1f5f9"; // slate-100
    const colors = [
      "#ef4444", "#f97316", "#eab308", "#22c55e", 
      "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
          <label className="block text-sm font-medium text-orange-700 mb-2">
            Numerador (fatias coloridas)
          </label>
          <input
            type="range"
            min="0"
            max={denominator}
            value={numerator}
            onChange={(e) => setNumerator(Number(e.target.value))}
            className="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="text-center text-3xl font-bold text-orange-600 mt-2">{numerator}</div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Denominador (total de fatias)
          </label>
          <input
            type="range"
            min="2"
            max="12"
            value={denominator}
            onChange={(e) => {
              const newDen = Number(e.target.value);
              setDenominator(newDen);
              if (numerator > newDen) setNumerator(newDen);
            }}
            className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-center text-3xl font-bold text-blue-600 mt-2">{denominator}</div>
        </div>
      </div>

      {/* Pizza */}
      <div className="flex justify-center">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Borda da pizza */}
            <circle cx="100" cy="100" r="85" fill="#d97706" />
            <circle cx="100" cy="100" r="80" fill="#fef3c7" />
            
            {/* Fatias */}
            {slices.map((slice, i) => (
              <path
                key={i}
                d={slice.path}
                fill={getSliceColor(i, slice.isFilled)}
                stroke="#92400e"
                strokeWidth="2"
                className="transition-all duration-300"
                style={{
                  opacity: slice.isFilled ? 1 : 0.5
                }}
              />
            ))}
            
            {/* Centro */}
            <circle cx="100" cy="100" r="10" fill="#92400e" />
          </svg>
          
          {/* Legenda */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border border-slate-200">
            <span className="text-lg font-bold">
              <span className="text-orange-600">{numerator}</span>
              <span className="text-slate-400">/</span>
              <span className="text-blue-600">{denominator}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Representação da fração */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
        <div className="flex items-center justify-center gap-8">
          {/* Fração original */}
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-2">Fração</div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-orange-600">{numerator}</span>
              <div className="w-12 h-1 bg-slate-400 my-1" />
              <span className="text-4xl font-bold text-blue-600">{denominator}</span>
            </div>
          </div>

          {/* Seta de simplificação */}
          {!isSimplified && (
            <>
              <div className="text-2xl text-slate-400">→</div>
              
              {/* Fração simplificada */}
              <div className="text-center">
                <div className="text-sm text-green-600 mb-2">Simplificada (÷{divisor})</div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-green-600">{simplifiedNum}</span>
                  <div className="w-12 h-1 bg-green-400 my-1" />
                  <span className="text-4xl font-bold text-green-600">{simplifiedDen}</span>
                </div>
              </div>
            </>
          )}

          {/* Igualdades */}
          <div className="text-2xl text-slate-400">=</div>
          
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-2">Decimal</div>
            <div className="text-3xl font-bold text-purple-600">{decimal}</div>
          </div>

          <div className="text-2xl text-slate-400">=</div>
          
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-2">Porcentagem</div>
            <div className="text-3xl font-bold text-pink-600">{percentage}%</div>
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="bg-slate-100 rounded-xl p-4">
        <div className="text-sm font-medium text-slate-700 mb-2">
          📊 Representação em Barra
        </div>
        <div className="h-8 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500 rounded-full"
            style={{ width: `${(numerator / denominator) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0</span>
          <span>{percentage}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Informações extras */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="text-sm font-medium text-green-700 mb-2">
            📖 Leitura
          </div>
          <div className="text-lg">
            "{numerator} {denominator === 2 ? 'meio' : denominator === 3 ? 'terço' : denominator === 4 ? 'quarto' : `${denominator}-avos`}{numerator !== 1 ? 's' : ''}"
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="text-sm font-medium text-blue-700 mb-2">
            🏷️ Tipo de Fração
          </div>
          <div className="text-lg">
            {numerator < denominator && "Fração Própria (< 1)"}
            {numerator === denominator && "Fração Unitária (= 1)"}
            {numerator > denominator && "Fração Imprópria (> 1)"}
          </div>
        </div>
      </div>
    </div>
  );
}
