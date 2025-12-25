import { useState, useEffect } from "react";

interface FactorStep {
  number: number;
  divisor: number;
  result: number;
}

export function PrimeFactorization() {
  const [inputNumber, setInputNumber] = useState(60);
  const [steps, setSteps] = useState<FactorStep[]>([]);
  const [animatedSteps, setAnimatedSteps] = useState<number[]>([]);
  const [showTree, setShowTree] = useState(false);

  // Verificar se é primo
  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  // Encontrar menor divisor primo
  const smallestPrimeDivisor = (n: number): number => {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return i;
    }
    return n;
  };

  // Calcular fatoração
  useEffect(() => {
    const newSteps: FactorStep[] = [];
    let num = inputNumber;
    
    while (num > 1) {
      const divisor = smallestPrimeDivisor(num);
      const result = num / divisor;
      newSteps.push({ number: num, divisor, result });
      num = result;
    }
    
    setSteps(newSteps);
    
    // Animar passos
    setAnimatedSteps([]);
    newSteps.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSteps(prev => [...prev, index]);
      }, index * 400);
    });
  }, [inputNumber]);

  // Obter fatores primos com expoentes
  const getFactorsWithExponents = () => {
    const factors: Record<number, number> = {};
    steps.forEach(step => {
      factors[step.divisor] = (factors[step.divisor] || 0) + 1;
    });
    return factors;
  };

  // Calcular quantidade de divisores
  const getDivisorCount = () => {
    const factors = getFactorsWithExponents();
    return Object.values(factors).reduce((acc, exp) => acc * (exp + 1), 1);
  };

  // Listar todos os divisores
  const getAllDivisors = () => {
    const divisors: number[] = [];
    for (let i = 1; i <= inputNumber; i++) {
      if (inputNumber % i === 0) divisors.push(i);
    }
    return divisors;
  };

  const factors = getFactorsWithExponents();
  const primes = Object.keys(factors).map(Number);

  return (
    <div className="space-y-6">
      {/* Controle de entrada */}
      <div className="bg-slate-50 rounded-xl p-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Número para Fatorar (2-500)
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="range"
            min="2"
            max="500"
            value={inputNumber}
            onChange={(e) => setInputNumber(Number(e.target.value))}
            className="flex-1 h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <input
            type="number"
            min="2"
            max="500"
            value={inputNumber}
            onChange={(e) => setInputNumber(Math.min(500, Math.max(2, Number(e.target.value))))}
            className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-center font-bold text-lg"
          />
        </div>
        {isPrime(inputNumber) && (
          <div className="mt-2 text-sm text-green-600 font-medium">
            ⭐ {inputNumber} é um número primo!
          </div>
        )}
      </div>

      {/* Processo de fatoração */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
        <div className="text-sm font-medium text-orange-700 mb-4">
          📝 Processo de Fatoração (Divisões Sucessivas)
        </div>
        
        <div className="flex flex-col items-center gap-2">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-500 ${
                animatedSteps.includes(i) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <div className="w-16 text-right font-mono text-lg">{step.number}</div>
              <div className="w-8 text-center text-slate-400">|</div>
              <div className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-lg font-bold">
                {step.divisor}
              </div>
            </div>
          ))}
          {animatedSteps.length === steps.length && (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="w-16 text-right font-mono text-lg text-green-600">1</div>
              <div className="w-8 text-center text-slate-400">✓</div>
              <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-lg font-bold">
                ✓
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resultado da fatoração */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <div className="text-sm font-medium text-green-700 mb-4">
          🎯 Fatoração Completa
        </div>
        
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-2xl font-bold text-slate-700">{inputNumber} =</span>
          {primes.map((prime, i) => (
            <span key={prime} className="flex items-center gap-1">
              {i > 0 && <span className="text-slate-400 mx-1">×</span>}
              <span className="text-2xl font-bold text-green-600">{prime}</span>
              {factors[prime] > 1 && (
                <sup className="text-lg font-bold text-green-800">{factors[prime]}</sup>
              )}
            </span>
          ))}
        </div>

        {/* Visualização com blocos */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          {primes.map(prime => (
            <div key={prime} className="flex flex-col items-center">
              <div className="flex gap-1">
                {Array.from({ length: factors[prime] }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-lg font-bold text-lg"
                  >
                    {prime}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                {prime}<sup>{factors[prime]}</sup> = {Math.pow(prime, factors[prime])}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Informações sobre divisores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="text-sm font-medium text-blue-700 mb-2">
            📊 Quantidade de Divisores
          </div>
          <div className="font-mono text-sm mb-2">
            {Object.entries(factors).map(([p, e], i) => (
              <span key={p}>
                {i > 0 && " × "}({e}+1)
              </span>
            ))}
            {" = "}
            <span className="text-xl font-bold text-blue-600">{getDivisorCount()}</span>
          </div>
          <div className="text-xs text-slate-600">
            Fórmula: (e₁+1) × (e₂+1) × ... × (eₖ+1)
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="text-sm font-medium text-purple-700 mb-2">
            📋 Lista de Divisores
          </div>
          <div className="flex flex-wrap gap-1">
            {getAllDivisors().map(d => (
              <span
                key={d}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  isPrime(d) && d > 1
                    ? "bg-purple-200 text-purple-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Botão para árvore de fatoração */}
      <button
        onClick={() => setShowTree(!showTree)}
        className="w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg font-medium transition-colors"
      >
        {showTree ? '🔼 Ocultar' : '🔽 Mostrar'} Árvore de Fatoração
      </button>

      {showTree && (
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
          <div className="text-sm font-medium text-amber-700 mb-4 text-center">
            🌳 Árvore de Fatoração
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-amber-500 text-white rounded-full font-bold text-xl">
              {inputNumber}
            </div>
            <div className="w-0.5 h-6 bg-amber-300" />
            <div className="flex gap-8">
              {steps.length > 0 && (
                <>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full font-bold">
                      {steps[0].divisor}
                    </div>
                    <div className="text-xs text-green-600 mt-1">primo</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-amber-400 text-white rounded-full font-bold">
                      {steps[0].result}
                    </div>
                    {steps[0].result > 1 && (
                      <div className="text-xs text-amber-600 mt-1">continua...</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
