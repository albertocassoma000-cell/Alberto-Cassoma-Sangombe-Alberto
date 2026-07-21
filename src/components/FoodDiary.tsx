import React, { useState } from "react";
import { DailyDiary, Food, DiaryMealEntry } from "../types";
import { Plus, Trash2, Droplet, Coffee, Soup, Salad, Croissant, Moon, Search, Sparkles, Check, X } from "lucide-react";
import { motion } from "motion/react";

interface FoodDiaryProps {
  diary: DailyDiary;
  foodsList: Food[];
  targetCalories: number;
  targetWater: number;
  onAddMealEntry: (mealType: "breakfast" | "lunch" | "snack" | "dinner" | "supper", entry: Omit<DiaryMealEntry, "id">) => void;
  onDeleteMealEntry: (mealType: "breakfast" | "lunch" | "snack" | "dinner" | "supper", id: string) => void;
  onAddWater: (amount: number) => void;
}

export default function FoodDiary({
  diary,
  foodsList,
  targetCalories,
  targetWater,
  onAddMealEntry,
  onDeleteMealEntry,
  onAddWater,
}: FoodDiaryProps) {
  const [activeMeal, setActiveMeal] = useState<"breakfast" | "lunch" | "snack" | "dinner" | "supper" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [amountGrams, setAmountGrams] = useState(100);

  // Calculate totals
  const getMealTotalCalories = (entries: DiaryMealEntry[]) => entries.reduce((acc, x) => acc + x.calories, 0);
  const getMealTotalProtein = (entries: DiaryMealEntry[]) => entries.reduce((acc, x) => acc + x.protein, 0);
  const getMealTotalCarbs = (entries: DiaryMealEntry[]) => entries.reduce((acc, x) => acc + x.carbs, 0);
  const getMealTotalFat = (entries: DiaryMealEntry[]) => entries.reduce((acc, x) => acc + x.fat, 0);

  const allEntries = [
    ...diary.breakfast,
    ...diary.lunch,
    ...diary.snack,
    ...diary.dinner,
    ...diary.supper,
  ];

  const totalCalories = allEntries.reduce((acc, x) => acc + x.calories, 0);
  const totalProtein = Math.round(allEntries.reduce((acc, x) => acc + x.protein, 0));
  const totalCarbs = Math.round(allEntries.reduce((acc, x) => acc + x.carbs, 0));
  const totalFat = Math.round(allEntries.reduce((acc, x) => acc + x.fat, 0));

  const filteredFoods = foodsList.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFoodSelect = (food: Food) => {
    if (!activeMeal) return;

    // Scale nutrient calculations by amount in grams
    const scale = amountGrams / 100;
    const calories = Math.round(food.nutrients.calories * scale);
    const protein = food.nutrients.protein * scale;
    const carbs = food.nutrients.carbs * scale;
    const fat = food.nutrients.fats * scale;

    onAddMealEntry(activeMeal, {
      foodId: food.id,
      foodName: `${food.name} (${amountGrams}g)`,
      amount: amountGrams,
      calories,
      protein,
      carbs,
      fat,
    });

    setActiveMeal(null);
    setSearchQuery("");
    setAmountGrams(100);
  };

  const caloriePercentage = Math.min((totalCalories / targetCalories) * 100, 100);
  const waterPercentage = Math.min((diary.waterDrank / targetWater) * 100, 100);

  return (
    <div className="space-y-4">
      {/* Top Rings Progress Cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Calories Progress */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/85 p-5 rounded-3xl shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-xs border-b border-slate-100 dark:border-slate-800/80 pb-2 flex justify-between">
            <span>Balanço de Calorias</span>
            <span className="text-[10px] text-slate-400 font-medium">Meta: {targetCalories} kcal</span>
          </h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-2xl font-black text-slate-950 dark:text-white">{totalCalories} <span className="text-[11px] font-medium text-slate-400">kcal</span></p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                {totalCalories > targetCalories ? (
                  <span className="text-red-500 font-black">Meta excedida!</span>
                ) : (
                  <span>Restam <span className="font-extrabold text-blue-600 dark:text-blue-400">{targetCalories - totalCalories} kcal</span> hoje.</span>
                )}
              </p>
            </div>
            {/* Simple progress ring */}
            <div className="w-14 h-14 rounded-full border-4 border-slate-100 dark:border-slate-800 relative flex items-center justify-center shrink-0">
              <div
                className="absolute inset-0 rounded-full border-4 border-blue-600 dark:border-blue-400 transition-all duration-500"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${caloriePercentage >= 25 ? "100% 0%," : ""}${caloriePercentage >= 50 ? "100% 100%," : ""}${caloriePercentage >= 75 ? "0% 100%," : ""}${caloriePercentage >= 100 ? "0% 0%," : ""}50% 0%)`,
                  opacity: totalCalories === 0 ? 0 : 1,
                }}
              />
              <span className="text-[10px] font-black text-slate-900 dark:text-white">{Math.round(caloriePercentage)}%</span>
            </div>
          </div>

          {/* Macros mini bars */}
          <div className="space-y-2 pt-1 text-[11px]">
            {/* Carbs */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                <span>Carboidratos</span>
                <span>{totalCarbs}g</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-sky-400 h-full rounded-full" style={{ width: `${Math.min((totalCarbs / 220) * 100, 100)}%` }} />
              </div>
            </div>
            {/* Protein */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                <span>Proteínas</span>
                <span>{totalProtein}g</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 dark:bg-blue-400 h-full rounded-full" style={{ width: `${Math.min((totalProtein / 130) * 100, 100)}%` }} />
              </div>
            </div>
            {/* Fat */}
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                <span>Gorduras</span>
                <span>{totalFat}g</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${Math.min((totalFat / 70) * 100, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Water Logger Progress */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/85 p-5 rounded-3xl shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-xs border-b border-slate-100 dark:border-slate-800/80 pb-2 flex justify-between">
            <span>Hidratação</span>
            <span className="text-[10px] text-sky-500 font-bold">Meta: {targetWater} ml</span>
          </h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-2xl font-black text-sky-600 dark:text-sky-400">{diary.waterDrank} <span className="text-[11px] font-medium text-slate-400">ml</span></p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                {diary.waterDrank >= targetWater ? (
                  <span className="text-blue-500 font-bold flex items-center gap-1">
                    <Sparkles size={12} className="text-amber-400" /> Hidratação diária concluída!
                  </span>
                ) : (
                  <span>Faltam <span className="font-extrabold text-sky-500">{targetWater - diary.waterDrank} ml</span> hoje.</span>
                )}
              </p>
            </div>
            {/* Water drop shape loading */}
            <div className="w-14 h-14 rounded-full bg-sky-50 dark:bg-sky-950/20 border border-sky-100/50 dark:border-sky-900/40 flex items-center justify-center text-sky-500 shrink-0 relative overflow-hidden">
              <Droplet size={24} className="z-10 text-sky-600 dark:text-sky-400" />
              <div
                className="absolute bottom-0 left-0 right-0 bg-sky-200 dark:bg-sky-800/60 transition-all duration-500"
                style={{ height: `${waterPercentage}%` }}
              />
            </div>
          </div>

          {/* Quick logger buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => onAddWater(250)}
              className="px-2 py-2 bg-sky-50/50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-900/30 text-sky-900 dark:text-sky-300 text-[10px] font-bold rounded-xl border border-sky-100/50 dark:border-sky-800/40 transition-all cursor-pointer flex flex-col items-center gap-0.5"
            >
              <span>+250ml</span>
              <span className="text-[8px] font-normal text-sky-500/80">Copo</span>
            </button>
            <button
              onClick={() => onAddWater(500)}
              className="px-2 py-2 bg-sky-50/50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-900/30 text-sky-900 dark:text-sky-300 text-[10px] font-bold rounded-xl border border-sky-100/50 dark:border-sky-800/40 transition-all cursor-pointer flex flex-col items-center gap-0.5"
            >
              <span>+500ml</span>
              <span className="text-[8px] font-normal text-sky-500/80">Garrafa</span>
            </button>
            <button
              onClick={() => onAddWater(1000)}
              className="px-2 py-2 bg-sky-50/50 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-900/30 text-sky-900 dark:text-sky-300 text-[10px] font-bold rounded-xl border border-sky-100/50 dark:border-sky-800/40 transition-all cursor-pointer flex flex-col items-center gap-0.5"
            >
              <span>+1L</span>
              <span className="text-[8px] font-normal text-sky-500/80">Litro</span>
            </button>
          </div>
        </div>
      </div>

      {/* Meals Diary Lists */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/85 rounded-3xl p-5 shadow-xs space-y-5">
        <h3 className="font-extrabold text-slate-900 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
          Registo de Refeições
        </h3>

        {[
          { key: "breakfast", label: "Café da Manhã", icon: Coffee, bg: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100/40 dark:border-blue-900/40" },
          { key: "lunch", label: "Almoço", icon: Soup, bg: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50" },
          { key: "snack", label: "Lanche", icon: Croissant, bg: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-100/40 dark:border-blue-900/40" },
          { key: "dinner", label: "Jantar", icon: Salad, bg: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50" },
          { key: "supper", label: "Ceia", icon: Moon, bg: "bg-slate-900 text-slate-300 border-slate-800 dark:border-slate-800" },
        ].map((meal) => {
          const entries = diary[meal.key as keyof Omit<DailyDiary, "date" | "waterDrank">] as DiaryMealEntry[];
          const Icon = meal.icon;

          return (
            <div key={meal.key} className="border-b border-slate-50 dark:border-slate-800/60 pb-4 last:border-none last:pb-0" id={`meal-section-${meal.key}`}>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl border ${meal.bg}`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-xs leading-none">{meal.label}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{getMealTotalCalories(entries)} kcal</span> • C: {getMealTotalCarbs(entries)}g • P: {getMealTotalProtein(entries)}g
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveMeal(meal.key as any)}
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    id={`add-food-btn-${meal.key}`}
                  >
                    <Plus size={11} /> Registar
                  </button>
                </div>
              </div>

              {/* Items List inside this meal */}
              {entries.length > 0 ? (
                <div className="mt-2.5 space-y-1.5 pl-1">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex justify-between items-center p-2 bg-slate-50/60 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-xl"
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">{entry.foodName}</p>
                        <p className="text-[9px] text-slate-400">
                          {entry.calories} kcal • P: {entry.protein}g • C: {entry.carbs}g • G: {entry.fat}g
                        </p>
                      </div>

                      <button
                        onClick={() => onDeleteMealEntry(meal.key as any, entry.id)}
                        className="p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                        title="Remover registo"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-slate-400 italic mt-1.5 pl-1">Vazio.</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Select Food Modal overlay */}
      {activeMeal && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-sm max-h-[85%] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/80 flex justify-between items-center shrink-0">
              <h3 className="font-extrabold text-slate-950 dark:text-white text-xs">
                Registar no {activeMeal === "breakfast" ? "Café da Manhã" : activeMeal === "lunch" ? "Almoço" : activeMeal === "snack" ? "Lanche" : activeMeal === "dinner" ? "Jantar" : "Ceia"}
              </h3>
              <button
                onClick={() => {
                  setActiveMeal(null);
                  setSearchQuery("");
                }}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 rounded-full transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4 no-scrollbar">
              {/* Search food input */}
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar alimento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-xl text-xs outline-none text-slate-900 dark:text-white font-bold"
                />
              </div>

              {/* Quantity setting */}
              <div className="flex items-center justify-between bg-blue-50/10 border border-blue-500/10 p-2.5 rounded-xl text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Quantidade:</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    value={amountGrams}
                    onChange={(e) => setAmountGrams(Math.max(1, Number(e.target.value)))}
                    className="w-14 px-1.5 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center rounded-lg text-xs font-black text-slate-900 dark:text-white"
                  />
                  <span className="font-bold text-slate-400">g</span>
                </div>
              </div>

              {/* Foods List */}
              <div className="space-y-1.5 mt-2">
                <p className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Selecione o Alimento</p>
                <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
                  {filteredFoods.map((food) => (
                    <div
                      key={food.id}
                      onClick={() => handleAddFoodSelect(food)}
                      className="flex justify-between items-center p-2.5 border border-slate-100 dark:border-slate-800/80 hover:border-blue-500 dark:hover:border-blue-500/50 hover:bg-blue-50/5 dark:hover:bg-blue-950/20 rounded-xl cursor-pointer transition-all"
                    >
                      <div className="space-y-0.5">
                        <p className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight">{food.name}</p>
                        <p className="text-[9px] text-slate-400 font-medium">
                          {food.nutrients.calories} kcal • P: {food.nutrients.protein}g • C: {food.nutrients.carbs}g
                        </p>
                      </div>
                      <span className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-black uppercase">
                        {food.category}
                      </span>
                    </div>
                  ))}

                  {filteredFoods.length === 0 && (
                    <p className="text-center text-[11px] text-slate-400 italic">Nenhum correspondente.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
