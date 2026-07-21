import React, { useState } from "react";
import { Food } from "../types";
import { Scale, Plus, X, AlertCircle, TrendingUp, Heart } from "lucide-react";
import { motion } from "motion/react";

interface FoodComparatorProps {
  foodsList: Food[];
}

export default function FoodComparator({ foodsList }: FoodComparatorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const handleSelectFood = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((x) => x !== id));
    } else {
      if (selectedIds.length >= 5) {
        alert("Pode comparar no máximo 5 alimentos simultaneamente!");
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeFood = (id: string) => {
    setSelectedIds(selectedIds.filter((x) => x !== id));
  };

  const selectedFoods = foodsList.filter((f) => selectedIds.includes(f.id));

  return (
    <div className="space-y-6">
      {/* Promo banner */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 w-fit mb-3">
            <Scale size={12} /> COMPARADOR DE NUTRIENTES
          </span>
          <h2 className="text-2xl font-bold tracking-tight">Compare Alimentos Lado a Lado</h2>
          <p className="text-orange-50 text-sm mt-1 max-w-xl">
            Escolha até 5 alimentos do nosso catálogo e analise instantaneamente as diferenças em calorias, proteínas, índice glicémico e benefícios gerais para a sua saúde.
          </p>
        </div>
        <button
          onClick={() => setSelectorOpen(true)}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          id="comparator-select-btn"
        >
          <Plus size={18} /> Selecionar Alimentos
        </button>
      </div>

      {/* Selector Modal/Overlay */}
      {selectorOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-2xl w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-1.5">
                <Scale size={18} className="text-emerald-600" />
                Selecione os Alimentos ({selectedIds.length}/5)
              </h3>
              <button
                onClick={() => setSelectorOpen(false)}
                className="p-1.5 hover:bg-gray-200 text-gray-500 hover:text-gray-900 rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-2">
              {foodsList.map((food) => {
                const isSelected = selectedIds.includes(food.id);
                return (
                  <div
                    key={food.id}
                    onClick={() => handleSelectFood(food.id)}
                    className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50/40 text-emerald-900"
                        : "border-gray-100 hover:border-gray-200 hover:bg-slate-50 text-gray-800"
                    }`}
                    id={`selector-item-${food.id}`}
                  >
                    <div className="space-y-0.5">
                      <p className="font-bold text-sm">{food.name}</p>
                      <p className="text-xs text-gray-500 italic">{food.scientificName}</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {food.category}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectorOpen(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Concluir Seleção
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Comparisons Area */}
      {selectedFoods.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500 space-y-4">
          <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-gray-400">
            <Scale size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Nenhum alimento selecionado</h3>
            <p className="text-xs text-gray-400 mt-1">Selecione pelo menos 2 alimentos para começar a comparar os valores de nutrientes.</p>
          </div>
          <button
            onClick={() => setSelectorOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Adicionar Alimentos
          </button>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 shadow-xs rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                <th className="p-4 text-xs uppercase font-bold text-gray-500 w-[200px]">Nutriente (Por 100g)</th>
                {selectedFoods.map((food) => (
                  <th key={food.id} className="p-4 text-xs font-bold text-gray-900 border-l border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-extrabold text-sm">{food.name}</p>
                        <p className="text-[10px] text-gray-400 italic font-medium">{food.scientificName}</p>
                      </div>
                      <button
                        onClick={() => removeFood(food.id)}
                        className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs">
              {/* Categoria */}
              <tr className="border-b border-gray-50 hover:bg-slate-50/40">
                <td className="p-4 font-bold text-gray-500">Categoria</td>
                {selectedFoods.map((food) => (
                  <td key={food.id} className="p-4 font-semibold text-gray-800 border-l border-gray-100">
                    {food.category}
                  </td>
                ))}
              </tr>

              {/* Calorias */}
              <tr className="border-b border-gray-50 hover:bg-slate-50/40 bg-orange-50/10">
                <td className="p-4 font-bold text-gray-500 flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-orange-500" /> Calorias (kcal)
                </td>
                {selectedFoods.map((food) => (
                  <td key={food.id} className="p-4 font-bold text-gray-900 border-l border-gray-100 text-sm">
                    {food.nutrients.calories} kcal
                  </td>
                ))}
              </tr>

              {/* Carboidratos */}
              <tr className="border-b border-gray-50 hover:bg-slate-50/40">
                <td className="p-4 font-bold text-gray-500">Carboidratos (g)</td>
                {selectedFoods.map((food) => (
                  <td key={food.id} className="p-4 font-semibold text-gray-800 border-l border-gray-100">
                    {food.nutrients.carbs}g
                  </td>
                ))}
              </tr>

              {/* Proteinas */}
              <tr className="border-b border-gray-50 hover:bg-slate-50/40">
                <td className="p-4 font-bold text-gray-500">Proteínas (g)</td>
                {selectedFoods.map((food) => (
                  <td key={food.id} className="p-4 font-semibold text-gray-800 border-l border-gray-100">
                    {food.nutrients.protein}g
                  </td>
                ))}
              </tr>

              {/* Gorduras */}
              <tr className="border-b border-gray-50 hover:bg-slate-50/40">
                <td className="p-4 font-bold text-gray-500">Gorduras (g)</td>
                {selectedFoods.map((food) => (
                  <td key={food.id} className="p-4 font-semibold text-gray-800 border-l border-gray-100">
                    {food.nutrients.fats}g
                  </td>
                ))}
              </tr>

              {/* Fibras */}
              <tr className="border-b border-gray-50 hover:bg-slate-50/40">
                <td className="p-4 font-bold text-gray-500">Fibras (g)</td>
                {selectedFoods.map((food) => (
                  <td key={food.id} className="p-4 font-semibold text-gray-800 border-l border-gray-100">
                    {food.nutrients.fiber}g
                  </td>
                ))}
              </tr>

              {/* Indice glicemico */}
              <tr className="border-b border-gray-50 hover:bg-slate-50/40">
                <td className="p-4 font-bold text-gray-500">Índice Glicémico</td>
                {selectedFoods.map((food) => (
                  <td key={food.id} className="p-4 font-bold border-l border-gray-100">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        food.nutrients.glycemicIndex < 55
                          ? "bg-emerald-50 text-emerald-800"
                          : food.nutrients.glycemicIndex < 70
                          ? "bg-amber-50 text-amber-800"
                          : "bg-red-50 text-red-800"
                      }`}
                    >
                      {food.nutrients.glycemicIndex} ({food.nutrients.glycemicIndex < 55 ? "Baixo" : food.nutrients.glycemicIndex < 70 ? "Médio" : "Alto"})
                    </span>
                  </td>
                ))}
              </tr>

              {/* Agua */}
              <tr className="border-b border-gray-50 hover:bg-slate-50/40">
                <td className="p-4 font-bold text-gray-500">Teor de Água (%)</td>
                {selectedFoods.map((food) => (
                  <td key={food.id} className="p-4 font-semibold text-gray-800 border-l border-gray-100">
                    {food.nutrients.water}%
                  </td>
                ))}
              </tr>

              {/* Beneficios */}
              <tr className="border-b border-gray-100 hover:bg-slate-50/40 bg-emerald-50/5 text-emerald-950">
                <td className="p-4 font-bold text-gray-500 flex items-center gap-1.5">
                  <Heart size={14} className="text-emerald-600" /> Benefícios Principais
                </td>
                {selectedFoods.map((food) => {
                  const firstBenefit = Object.values(food.benefits)[0] || "Nutritivo e saboroso";
                  return (
                    <td key={food.id} className="p-4 border-l border-gray-100 text-[11px] leading-relaxed font-medium">
                      {firstBenefit}
                    </td>
                  );
                })}
              </tr>

              {/* Contraindicacoes */}
              <tr className="hover:bg-slate-50/40 bg-orange-50/5">
                <td className="p-4 font-bold text-gray-500 flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-orange-500" /> Contraindicação
                </td>
                {selectedFoods.map((food) => (
                  <td key={food.id} className="p-4 border-l border-gray-100 text-[11px] text-gray-600 leading-relaxed font-medium">
                    {food.contraindications?.whoShouldAvoid || "Seguro para a maioria da população."}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
