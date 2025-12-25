import { useState } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";

export function DivisionRemainder() {
  const [pizzas, setPizzas] = useState(7);
  const [people, setPeople] = useState(3);
  const [showAnimation, setShowAnimation] = useState(false);

  const slicesPerPerson = Math.floor(pizzas / people);
  const remainder = pizzas % people;

  const animate = () => {
    setShowAnimation(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setShowAnimation(false), 500);
      },
    });

    tl.fromTo(
      ".person-box",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out",
      }
    ).fromTo(
      ".remainder-box",
      { scale: 0, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out",
      },
      "-=0.2"
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Pizzas: <span className="text-blue-600">{pizzas}</span> 🍕
            </label>
            <input
              type="range"
              min="1"
              max="15"
              value={pizzas}
              onChange={(e) => setPizzas(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Pessoas: <span className="text-green-600">{people}</span> 👤
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
        </div>

        <div className="text-center py-3 bg-white rounded-lg border-2 border-slate-200">
          <div className="text-2xl font-bold text-slate-800">
            <span className="text-blue-600">{pizzas}</span>
            {" ÷ "}
            <span className="text-green-600">{people}</span>
            {" = "}
            <span className="text-purple-600">{slicesPerPerson}</span>
            {remainder > 0 && (
              <span className="text-orange-600 text-lg"> (resto {remainder})</span>
            )}
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Cada pessoa recebe {slicesPerPerson} pizza{slicesPerPerson !== 1 ? "s" : ""}
            {remainder > 0 && ` e sobra${remainder !== 1 ? "m" : ""} ${remainder}`}
          </p>
        </div>

        <button
          onClick={animate}
          disabled={showAnimation}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
        >
          <Play className="w-5 h-5" />
          Distribuir Pizzas
        </button>
      </div>

      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {Array.from({ length: people }, (_, personIndex) => (
            <div
              key={personIndex}
              className="person-box bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4 text-center"
            >
              <div className="text-3xl mb-2">👤</div>
              <div className="text-xs font-bold text-green-700 mb-2">
                Pessoa {personIndex + 1}
              </div>
              <div className="flex gap-1 justify-center flex-wrap">
                {Array.from({ length: slicesPerPerson }, (_, sliceIndex) => (
                  <div key={sliceIndex} className="text-2xl">
                    🍕
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {remainder > 0 && (
          <div className="remainder-box bg-orange-50 border-2 border-orange-300 rounded-xl p-4">
            <div className="text-center">
              <p className="text-sm font-bold text-orange-700 mb-2">
                Sobrou (Resto) - Não dá para dividir igualmente
              </p>
              <div className="flex gap-2 justify-center">
                {Array.from({ length: remainder }, (_, i) => (
                  <div key={i} className="text-3xl">
                    🍕
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-sm text-slate-700">
          <strong>💡 Como funciona:</strong> Quando dividimos e sobra algo, chamamos isso de "resto".
          Por exemplo, 7 pizzas ÷ 3 pessoas = 2 pizzas por pessoa, com 1 pizza sobrando (resto).
        </p>
      </div>
    </div>
  );
}
