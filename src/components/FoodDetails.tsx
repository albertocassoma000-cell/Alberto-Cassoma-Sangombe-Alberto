import React, { useState } from "react";
import { Food, Recipe } from "../types";
import {
  X, Info, Heart, Award, ShieldAlert, BookOpen, Clock, Flame, Dumbbell,
  Check, ChevronRight, Apple, HelpCircle, Utensils, Zap, ShieldAlert as WarningIcon
} from "lucide-react";
import { motion } from "motion/react";
import { getFoodImage } from "../utils/foodImages";

interface FoodDetailsProps {
  food: Food;
  onClose: () => void;
  onAddRecipeToDiary: (recipe: Recipe) => void;
}

export default function FoodDetails({ food, onClose, onAddRecipeToDiary }: FoodDetailsProps) {
  const [activeTab, setActiveTab] = useState<"geral" | "nutricao" | "beneficios" | "contra" | "receitas">("geral");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [addedRecipeId, setAddedRecipeId] = useState<string | null>(null);

  const formatPercentage = (val: number) => {
    return val >= 1 ? `${Math.round(val)}%` : `${val}%`;
  };

  const handleAddRecipeClick = (recipe: Recipe) => {
    onAddRecipeToDiary(recipe);
    setAddedRecipeId(recipe.id);
    setTimeout(() => setAddedRecipeId(null), 3000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex justify-end z-50 overflow-hidden" id="food-detail-overlay">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 22, stiffness: 150 }}
        className="w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col"
        id="food-detail-panel"
      >
        {/* Banner Header */}
        <div className="relative px-6 py-8 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex justify-between items-start shrink-0 border-b border-blue-500/20">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-md text-[10px] font-black tracking-wider uppercase">
                {food.category}
              </span>
              {food.isAngolan && (
                <span className="px-2.5 py-0.5 bg-white text-slate-900 text-[10px] font-black rounded-md tracking-wider uppercase flex items-center gap-1">
                  <span>🇦🇴</span> Angola
                </span>
              )}
            </div>
            <h2 className="text-3xl font-black tracking-tight">{food.name}</h2>
            <p className="text-sm italic text-blue-300">{food.scientificName}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full transition-all text-white cursor-pointer"
            id="food-detail-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-100 bg-slate-50 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: "geral", label: "Informações Gerais", icon: Info },
            { id: "nutricao", label: "Ficha Nutricional", icon: Apple },
            { id: "beneficios", label: "Benefícios para Saúde", icon: Heart },
            { id: "contra", label: "Contraindicações", icon: ShieldAlert },
            { id: "receitas", label: `Receitas (${food.recipes.length})`, icon: Utensils }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedRecipe(null);
                }}
                className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-medium text-xs whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 bg-white font-black"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
                id={`detail-tab-${tab.id}`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-50/50">
          {/* GENERAL INFO */}
          {activeTab === "geral" && (
            <div className="space-y-6">
              {/* Food Photo Banner */}
              <div className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-md border border-slate-200/80 shrink-0">
                <img
                  src={getFoodImage(food.id, food.category)}
                  alt={food.name}
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-base">Ficha de Identidade</h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500">Família Biológica:</span>
                      <span className="font-semibold text-gray-800">{food.family}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500">Origem:</span>
                      <span className="font-semibold text-gray-800">{food.origin}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500">Região de cultivo:</span>
                      <span className="font-semibold text-gray-800">{food.countryOfOrigin}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500">Época de Colheita:</span>
                      <span className="font-semibold text-gray-800">{food.season}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-base">Resumo</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {food.description}
                  </p>
                </div>
              </div>

              {/* Curiosities */}
              {food.curiosities && food.curiosities.length > 0 && (
                <div className="bg-orange-50/40 border border-orange-100/50 rounded-2xl p-6 space-y-3">
                  <h3 className="font-bold text-orange-950 text-base flex items-center gap-2">
                    <Zap size={18} className="text-orange-500 animate-pulse" />
                    Curiosidades Únicas
                  </h3>
                  <ul className="space-y-2.5">
                    {food.curiosities.map((item, idx) => (
                      <li key={idx} className="text-sm text-orange-900 flex items-start gap-2.5">
                        <ChevronRight size={16} className="text-orange-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* NUTRITION FACTS */}
          {activeTab === "nutricao" && (
            <div className="space-y-6">
              {/* Macros Box */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
                <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-1.5">
                  <Apple size={18} className="text-emerald-600" />
                  Valores Nutricionais <span className="text-xs font-normal text-gray-400">(Por cada 100g de porção comestível)</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Calorias</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{food.nutrients.calories} <span className="text-xs font-medium">kcal</span></p>
                  </div>
                  <div className="p-4 bg-sky-50/50 border border-sky-100/30 rounded-xl text-center">
                    <p className="text-[10px] text-sky-700 uppercase font-semibold">Carboidratos</p>
                    <p className="text-2xl font-bold text-sky-900 mt-1">{food.nutrients.carbs}g</p>
                  </div>
                  <div className="p-4 bg-red-50/50 border border-red-100/30 rounded-xl text-center">
                    <p className="text-[10px] text-red-700 uppercase font-semibold">Proteínas</p>
                    <p className="text-2xl font-bold text-red-900 mt-1">{food.nutrients.protein}g</p>
                  </div>
                  <div className="p-4 bg-amber-50/50 border border-amber-100/30 rounded-xl text-center">
                    <p className="text-[10px] text-amber-700 uppercase font-semibold">Gorduras</p>
                    <p className="text-2xl font-bold text-amber-900 mt-1">{food.nutrients.fats}g</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                      <span className="text-gray-500">Água:</span>
                      <span className="font-medium text-gray-800">{food.nutrients.water}g</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                      <span className="text-gray-500">Fibras Alimentares:</span>
                      <span className="font-semibold text-gray-800">{food.nutrients.fiber}g</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                      <span className="text-gray-500">Açúcares simples:</span>
                      <span className="font-medium text-gray-800">{food.nutrients.sugars}g</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                      <span className="text-gray-500">Índice Glicémico (IG):</span>
                      <span className={`font-semibold ${food.nutrients.glycemicIndex < 55 ? "text-emerald-600" : food.nutrients.glycemicIndex < 70 ? "text-amber-600" : "text-red-500"}`}>
                        {food.nutrients.glycemicIndex} ({food.nutrients.glycemicIndex < 55 ? "Baixo" : food.nutrients.glycemicIndex < 70 ? "Médio" : "Alto"})
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                      <span className="text-gray-500">Carga Glicémica:</span>
                      <span className="font-medium text-gray-800">{food.nutrients.glycemicLoad}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                      <span className="text-gray-500">Colesterol:</span>
                      <span className="font-medium text-gray-800">{food.nutrients.cholesterol}mg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Micronutrients Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vitamins */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                  <h4 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">Vitaminas</h4>
                  <div className="space-y-3">
                    {food.vitamins.map((vit, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-gray-700">{vit.name}</span>
                          <span className="text-gray-500">{vit.amount} {vit.unit} ({formatPercentage(vit.dailyValuePercentage)})</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${Math.min(vit.dailyValuePercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Minerals */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                  <h4 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">Minerais</h4>
                  <div className="space-y-3">
                    {food.minerals.map((min, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-gray-700">{min.name}</span>
                          <span className="text-gray-500">{min.amount} {min.unit} ({formatPercentage(min.dailyValuePercentage)})</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-orange-500 h-full rounded-full"
                            style={{ width: `${Math.min(min.dailyValuePercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bioactive Compounds */}
              {food.bioactives && food.bioactives.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-3">
                  <h4 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">Compostos Bioativos & Antioxidantes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {food.bioactives.map((comp, idx) => (
                      <div key={idx} className="p-3 bg-emerald-50/30 border border-emerald-50 rounded-xl space-y-1">
                        <p className="font-bold text-emerald-800 text-xs">{comp.name}</p>
                        <p className="text-[11px] text-emerald-950/80 leading-relaxed">{comp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* HEALTH BENEFITS */}
          {activeTab === "beneficios" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3">
                <Heart size={18} className="text-emerald-600" />
                Como beneficia o seu corpo
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(food.benefits).map(([key, value]) => {
                  const systemLabel: Record<string, string> = {
                    heart: "Saúde Cardiovascular",
                    brain: "Função Cerebral",
                    memory: "Foco e Memória",
                    vision: "Proteção Ocular",
                    bones: "Densidade Óssea",
                    skin: "Elasticidade da Pele",
                    hair: "Fortalecimento Capilar",
                    muscles: "Performance Muscular",
                    digestion: "Processo Digestivo",
                    intestine: "Microbiota & Intestino",
                    immunity: "Imunidade Celular",
                    blood: "Controlo Glicémico / Sangue",
                    nervousSystem: "Sistema Nervoso"
                  };

                  return (
                    <div key={key} className="flex gap-3 p-3.5 hover:bg-slate-50 border border-transparent hover:border-gray-100 rounded-xl transition-all">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                        <Check size={16} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">{systemLabel[key] || key}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CONTRAINDICATIONS & SAFETY */}
          {activeTab === "contra" && (
            <div className="space-y-6">
              {/* Warnings */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3">
                  <WarningIcon size={18} className="text-orange-500" />
                  Alerta de Segurança e Precauções
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider text-orange-600">Quem deve evitar</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{food.contraindications.whoShouldAvoid}</p>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider text-orange-600">Reação Alérgica</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{food.contraindications.allergies}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider text-orange-600">Interação Medicamentosa</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{food.contraindications.drugInteractions}</p>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider text-orange-600">Porção Limite Recomendada</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{food.contraindications.maxRecommendedAmount}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50/50 border border-orange-100/30 rounded-xl mt-4">
                  <p className="text-xs font-semibold text-orange-950 uppercase tracking-wide">Possíveis Riscos e Consumo Excessivo:</p>
                  <p className="text-xs text-orange-900 leading-relaxed mt-1">{food.contraindications.possibleRisks}</p>
                </div>
              </div>
            </div>
          )}

          {/* HEALTHY RECIPES */}
          {activeTab === "receitas" && (
            <div className="space-y-6">
              {selectedRecipe ? (
                /* Recipe Detail Mode */
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6">
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    ← Voltar às receitas
                  </button>

                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.name}
                      className="w-full md:w-1/3 h-48 object-cover rounded-xl shadow-xs border border-gray-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{selectedRecipe.name}</h3>
                        <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500 mt-2">
                          <span className="flex items-center gap-1"><Clock size={14} /> {selectedRecipe.time} mins</span>
                          <span className="flex items-center gap-1"><Award size={14} /> {selectedRecipe.difficulty}</span>
                          <span className="flex items-center gap-1"><Flame size={14} /> {selectedRecipe.calories} kcal</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddRecipeClick(selectedRecipe)}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                          addedRecipeId === selectedRecipe.id
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                      >
                        {addedRecipeId === selectedRecipe.id ? (
                          <>
                            <Check size={14} /> Adicionado ao Diário
                          </>
                        ) : (
                          "Adicionar esta Receita ao Diário"
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Ingredientes</h4>
                      <ul className="space-y-2">
                        {selectedRecipe.ingredients.map((ing, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Modo de Preparação</h4>
                      <ol className="space-y-3 decimal-list pl-4">
                        {selectedRecipe.steps.map((step, idx) => (
                          <li key={idx} className="text-xs text-gray-600 leading-relaxed list-decimal">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ) : (
                /* Recipes List */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {food.recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs flex gap-4 hover:border-emerald-200 transition-all cursor-pointer"
                      onClick={() => setSelectedRecipe(recipe)}
                      id={`recipe-card-${recipe.id}`}
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-24 h-24 object-cover rounded-xl shrink-0 shadow-xs border border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-gray-800 leading-snug line-clamp-2">{recipe.name}</h4>
                          <div className="flex items-center gap-3 text-[10px] font-medium text-gray-500">
                            <span>{recipe.time} mins</span>
                            <span>•</span>
                            <span>{recipe.difficulty}</span>
                            <span>•</span>
                            <span className="text-orange-600 font-semibold">{recipe.calories} kcal</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-0.5 mt-2 self-end">
                          Ver Receita <ChevronRight size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
