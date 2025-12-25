import { useState, useEffect } from "react";

export function BaseConverter() {
  const [decimalValue, setDecimalValue] = useState(42);
  const [animatedBits, setAnimatedBits] = useState<boolean[]>([]);
  const [showSteps, setShowSteps] = useState(false);

  // Converter decimal para binário com animação
  useEffect(() => {
    const binary = decimalValue.toString(2).padStart(8, '0');
    const bits = binary.split('').map(b => b === '1');
    
    // Animar bit por bit
    setAnimatedBits([]);
    bits.forEach((bit, index) => {
      setTimeout(() => {
        setAnimatedBits(prev => [...prev, bit]);
      }, index * 100);
    });
  }, [decimalValue]);

  const getBinary = () => decimalValue.toString(2).padStart(8, '0');
  const getHex = () => decimalValue.toString(16).toUpperCase().padStart(2, '0');
  const getOctal = () => decimalValue.toString(8);

  // Calcular passos da conversão
  const getConversionSteps = () => {
    const steps = [];
    let num = decimalValue;
    while (num > 0) {
      steps.push({
        dividend: num,
        quotient: Math.floor(num / 2),
        remainder: num % 2
      });
      num = Math.floor(num / 2);
    }
    return steps;
  };

  const powerOf2 = [128, 64, 32, 16, 8, 4, 2, 1];

  return (
    <div className="space-y-6">
      {/* Controle de entrada */}
      <div className="bg-slate-50 rounded-xl p-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Número Decimal (0-255)
        </label>
        <input
          type="range"
          min="0"
          max="255"
          value={decimalValue}
          onChange={(e) => setDecimalValue(Number(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-sm text-slate-500 mt-1">
          <span>0</span>
          <span className="text-2xl font-bold text-blue-600">{decimalValue}</span>
          <span>255</span>
        </div>
      </div>

      {/* Visualização das bases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Binário */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="text-sm font-medium text-green-700 mb-2">Base 2 (Binário)</div>
          <div className="flex gap-1 justify-center">
            {getBinary().split('').map((bit, i) => (
              <div
                key={i}
                className={`w-8 h-10 flex items-center justify-center rounded-lg font-mono text-lg font-bold transition-all duration-300 ${
                  animatedBits[i] !== undefined
                    ? bit === '1'
                      ? 'bg-green-500 text-white scale-110'
                      : 'bg-green-100 text-green-400'
                    : 'bg-slate-100 text-slate-300'
                }`}
              >
                {animatedBits[i] !== undefined ? bit : '?'}
              </div>
            ))}
          </div>
          <div className="flex gap-1 justify-center mt-1">
            {powerOf2.map((p, i) => (
              <div key={i} className="w-8 text-center text-xs text-green-600">
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Hexadecimal */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
          <div className="text-sm font-medium text-purple-700 mb-2">Base 16 (Hexadecimal)</div>
          <div className="flex gap-2 justify-center items-center">
            <span className="text-purple-400 text-lg">#</span>
            {getHex().split('').map((digit, i) => (
              <div
                key={i}
                className="w-12 h-12 flex items-center justify-center bg-purple-500 text-white rounded-lg font-mono text-2xl font-bold"
              >
                {digit}
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-sm text-purple-600">
            = {parseInt(getHex()[0], 16)}×16 + {parseInt(getHex()[1], 16)}×1
          </div>
        </div>

        {/* Octal */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
          <div className="text-sm font-medium text-orange-700 mb-2">Base 8 (Octal)</div>
          <div className="flex gap-1 justify-center">
            {getOctal().padStart(3, '0').split('').map((digit, i) => (
              <div
                key={i}
                className="w-10 h-12 flex items-center justify-center bg-orange-500 text-white rounded-lg font-mono text-xl font-bold"
              >
                {digit}
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-sm text-orange-600">
            Dígitos: 0-7
          </div>
        </div>
      </div>

      {/* Visualização de bits como lâmpadas */}
      <div className="bg-slate-800 rounded-xl p-6">
        <div className="text-white text-sm font-medium mb-4 text-center">
          💡 Representação em Circuito (1 = ligado, 0 = desligado)
        </div>
        <div className="flex gap-3 justify-center">
          {getBinary().split('').map((bit, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full transition-all duration-300 ${
                  bit === '1'
                    ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50'
                    : 'bg-slate-600'
                }`}
              />
              <span className="text-slate-400 text-xs mt-1">{powerOf2[i]}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4 text-slate-400 text-sm">
          Soma dos valores ligados: {getBinary().split('').reduce((sum, bit, i) => 
            sum + (bit === '1' ? powerOf2[i] : 0), 0
          )}
        </div>
      </div>

      {/* Passos da conversão */}
      <button
        onClick={() => setShowSteps(!showSteps)}
        className="w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors"
      >
        {showSteps ? '🔼 Ocultar' : '🔽 Mostrar'} Passos da Conversão
      </button>

      {showSteps && decimalValue > 0 && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="text-sm font-medium text-blue-700 mb-3">
            Conversão de {decimalValue} para Binário (divisões por 2):
          </div>
          <div className="space-y-2 font-mono text-sm">
            {getConversionSteps().map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-slate-600">{step.dividend}</span>
                <span className="text-slate-400">÷ 2 =</span>
                <span className="text-slate-600">{step.quotient}</span>
                <span className="text-slate-400">resto</span>
                <span className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded font-bold">
                  {step.remainder}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200 text-sm text-blue-700">
            Lendo os restos de baixo para cima: <span className="font-bold">{getBinary()}</span>
          </div>
        </div>
      )}

      {/* Cor Hexadecimal */}
      {decimalValue <= 255 && (
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="text-sm font-medium text-slate-700 mb-2">
            🎨 Exemplo de Cor (Escala de Cinza)
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-lg border border-slate-300"
              style={{ backgroundColor: `rgb(${decimalValue}, ${decimalValue}, ${decimalValue})` }}
            />
            <div className="text-sm">
              <div className="font-mono text-slate-600">
                RGB({decimalValue}, {decimalValue}, {decimalValue})
              </div>
              <div className="font-mono text-slate-600">
                HEX: #{getHex()}{getHex()}{getHex()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
