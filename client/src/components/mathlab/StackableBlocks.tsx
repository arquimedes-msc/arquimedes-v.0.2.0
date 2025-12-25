import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Plus, RotateCcw } from "lucide-react";

interface Block {
  id: number;
  value: number;
  color: string;
  isStacked: boolean;
  stackIndex: number;
}

const BLOCK_COLORS = [
  { value: 1, color: "#3B82F6", label: "1 Bloco Azul" },
  { value: 2, color: "#10B981", label: "2 Blocos Verdes" },
  { value: 3, color: "#F59E0B", label: "3 Blocos Laranjas" },
];

export function StackableBlocks() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [total, setTotal] = useState(0);
  const [nextId, setNextId] = useState(1);
  const stackAreaRef = useRef<HTMLDivElement>(null);

  const addBlock = (value: number, color: string) => {
    const newBlock: Block = {
      id: nextId,
      value,
      color,
      isStacked: false,
      stackIndex: -1,
    };

    setBlocks((prev) => [...prev, newBlock]);
    setNextId((prev) => prev + 1);

    // Animar entrada do bloco
    setTimeout(() => {
      const blockEl = document.getElementById(`block-${nextId}`);
      if (blockEl) {
        gsap.from(blockEl, {
          scale: 0,
          rotation: 360,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
    }, 50);
  };

  const stackBlock = (blockId: number) => {
    setBlocks((prev) => {
      const block = prev.find((b) => b.id === blockId);
      if (!block || block.isStacked) return prev;

      const stackedCount = prev.filter((b) => b.isStacked).length;
      const updatedBlocks = prev.map((b) =>
        b.id === blockId ? { ...b, isStacked: true, stackIndex: stackedCount } : b
      );

      // Animar empilhamento
      setTimeout(() => {
        const blockEl = document.getElementById(`block-${blockId}`);
        const stackEl = stackAreaRef.current;
        if (blockEl && stackEl) {
          const stackRect = stackEl.getBoundingClientRect();
          const blockRect = blockEl.getBoundingClientRect();

          gsap.to(blockEl, {
            x: stackRect.left + stackRect.width / 2 - blockRect.left - blockRect.width / 2,
            y: stackRect.bottom - 60 * (stackedCount + 1) - blockRect.top,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              setTotal((prev) => prev + block.value);
            },
          });
        }
      }, 50);

      return updatedBlocks;
    });
  };

  const reset = () => {
    // Animar saída dos blocos
    blocks.forEach((block) => {
      const blockEl = document.getElementById(`block-${block.id}`);
      if (blockEl) {
        gsap.to(blockEl, {
          scale: 0,
          rotation: -360,
          duration: 0.4,
          ease: "back.in(1.7)",
        });
      }
    });

    setTimeout(() => {
      setBlocks([]);
      setTotal(0);
      setNextId(1);
    }, 400);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Área de Seleção de Blocos */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-slate-700">Escolha blocos para adicionar:</h3>
        <div className="flex gap-3 flex-wrap">
          {BLOCK_COLORS.map(({ value, color, label }) => (
            <button
              key={value}
              onClick={() => addBlock(value, color)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:shadow-md transition-all"
              style={{ borderColor: color }}
            >
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: color }}
              />
              <span className="font-medium text-slate-700">{label}</span>
              <Plus className="w-5 h-5 text-slate-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Área Principal */}
      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* Área de Blocos Disponíveis */}
        <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 p-6">
          <h3 className="text-sm font-semibold mb-3 text-slate-600">Blocos Disponíveis</h3>
          <div className="flex flex-wrap gap-3">
            {blocks
              .filter((b) => !b.isStacked)
              .map((block) => (
                <button
                  key={block.id}
                  id={`block-${block.id}`}
                  onClick={() => stackBlock(block.id)}
                  className="relative group cursor-pointer"
                  style={{ width: "80px" }}
                >
                  <div
                    className="w-20 h-16 rounded-lg shadow-md group-hover:shadow-xl transition-shadow flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: block.color }}
                  >
                    {block.value}
                  </div>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 rounded-lg transition-colors" />
                </button>
              ))}
          </div>
          {blocks.filter((b) => !b.isStacked).length === 0 && (
            <p className="text-slate-400 text-sm mt-4">Clique nos botões acima para adicionar blocos</p>
          )}
        </div>

        {/* Área de Empilhamento */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-300 p-6 relative">
          <h3 className="text-sm font-semibold mb-3 text-blue-900">Área de Empilhamento</h3>
          <div
            ref={stackAreaRef}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-400 rounded-full"
          />
          <div className="flex flex-col-reverse items-center absolute bottom-10 left-1/2 -translate-x-1/2">
            {blocks
              .filter((b) => b.isStacked)
              .sort((a, b) => a.stackIndex - b.stackIndex)
              .map((block, index) => (
                <div
                  key={block.id}
                  className="w-20 h-16 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-2xl mb-1"
                  style={{
                    backgroundColor: block.color,
                    transform: `translateY(${index * 2}px)`,
                  }}
                >
                  {block.value}
                </div>
              ))}
          </div>

          {/* Total */}
          {total > 0 && (
            <div className="absolute top-6 right-6 bg-white rounded-xl shadow-lg px-6 py-4 border-2 border-blue-300">
              <div className="text-sm text-slate-600 mb-1">Total:</div>
              <div className="text-4xl font-bold text-blue-600">{total}</div>
            </div>
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={reset}
          disabled={blocks.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-5 h-5" />
          Reiniciar
        </button>
      </div>

      {/* Instruções */}
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <h4 className="font-semibold text-yellow-900 mb-2">💡 Como usar:</h4>
        <ol className="text-sm text-yellow-800 space-y-1">
          <li>1. Clique nos botões coloridos acima para adicionar blocos</li>
          <li>2. Clique nos blocos disponíveis (esquerda) para empilhá-los (direita)</li>
          <li>3. Observe o total sendo calculado automaticamente!</li>
          <li>4. Clique em "Reiniciar" para começar de novo</li>
        </ol>
      </div>
    </div>
  );
}
