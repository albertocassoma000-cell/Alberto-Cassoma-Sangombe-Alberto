import React, { useState, useEffect } from "react";
import { UserProfile } from "../types";
import { calculateHealthMetrics, HealthAnalysis } from "../utils/health";
import { Calculator, Save, RefreshCw, Smile, Droplet, Flame, Compass, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface HealthCalculatorsProps {
  initialProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export default function HealthCalculators({ initialProfile, onSaveProfile }: HealthCalculatorsProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [age, setAge] = useState<number>(30);
  const [results, setResults] = useState<HealthAnalysis | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Trigger calculation whenever inputs change
  useEffect(() => {
    const analysis = calculateHealthMetrics(profile, age);
    setResults(analysis);
  }, [profile, age]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === "age" || name === "weight" || name === "height" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    onSaveProfile(profile);
    setSuccessMessage("Perfil e metas salvas com sucesso! As metas de água e calorias foram atualizadas no seu Diário Alimentar.");
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Input Form Column */}
      <div className="lg:col-span-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-5 h-fit">
        <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3">
          <Calculator size={18} className="text-emerald-600" />
          Seus Dados Físicos
        </h3>

        <div className="space-y-4">
          {/* Nome */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500">Seu Nome</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 rounded-xl text-sm text-gray-800 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Gênero */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">Sexo</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 focus:border-emerald-500 rounded-xl text-sm text-gray-800 outline-none cursor-pointer"
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>

            {/* Idade */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">Idade (Anos)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min="1"
                max="120"
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 focus:border-emerald-500 rounded-xl text-sm text-gray-800 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Peso */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">Peso (kg)</label>
              <input
                type="number"
                name="weight"
                value={profile.weight}
                onChange={handleChange}
                min="10"
                max="300"
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 focus:border-emerald-500 rounded-xl text-sm text-gray-800 outline-none"
              />
            </div>

            {/* Altura */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500">Altura (cm)</label>
              <input
                type="number"
                name="height"
                value={profile.height}
                onChange={handleChange}
                min="50"
                max="250"
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 focus:border-emerald-500 rounded-xl text-sm text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* Atividade */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500">Nível de Atividade Física</label>
            <select
              name="activityLevel"
              value={profile.activityLevel}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 focus:border-emerald-500 rounded-xl text-sm text-gray-800 outline-none cursor-pointer"
            >
              <option value="Sedentário">Sedentário (Pouco ou nenhum exercício)</option>
              <option value="Moderado">Moderado (Treino leve 1-3 dias/semana)</option>
              <option value="Ativo">Ativo (Treino intenso 3-5 dias/semana)</option>
              <option value="Muito Ativo">Muito Ativo (Treino pesado todos os dias)</option>
            </select>
          </div>

          {/* Objetivo */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500">Seu Objetivo de Saúde</label>
            <select
              name="goal"
              value={profile.goal}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 focus:border-emerald-500 rounded-xl text-sm text-gray-800 outline-none cursor-pointer"
            >
              <option value="Emagrecer">Emagrecer (Déficit Calórico)</option>
              <option value="Hipertrofia">Ganhar Massa Muscular (Superávit Calórico)</option>
              <option value="Manter">Manter Peso Saudável (Balancete Calórico)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-4"
          id="save-profile-btn"
        >
          <Save size={16} /> Salvar Perfil e Metas
        </button>

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-[11px] leading-relaxed">
            {successMessage}
          </div>
        )}
      </div>

      {/* Results Analysis Column */}
      <div className="lg:col-span-8 space-y-6">
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            id="calculators-results-panel"
          >
            {/* IMC & Peso Ideal */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-5">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                <Smile size={16} className="text-emerald-600" />
                Índice de Massa Corporal (IMC)
              </h4>

              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-slate-50 border border-gray-100 flex flex-col items-center justify-center shrink-0">
                  <span className="text-2xl font-black text-gray-950">{results.bmi}</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase">Pontos</span>
                </div>
                <div className="space-y-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${results.bmiColor}`}>
                    {results.bmiCategory}
                  </span>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Sua faixa ideal de peso recomendada cientificamente está entre <span className="font-bold text-gray-800">{results.idealWeightMin}kg</span> e <span className="font-bold text-gray-800">{results.idealWeightMax}kg</span>.
                  </p>
                </div>
              </div>

              {/* Gauge preview bar */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>ABAIXO ({"<"}18.5)</span>
                  <span>NORMAL (18.5 - 24.9)</span>
                  <span>SOBREPESO ({">"}25)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-sky-400 h-full w-[25%]" />
                  <div className="bg-emerald-500 h-full w-[35%]" />
                  <div className="bg-amber-400 h-full w-[20%]" />
                  <div className="bg-red-500 h-full w-[20%]" />
                </div>
              </div>
            </div>

            {/* Consumo de Agua & Metabolismo */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-5">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                <Droplet size={16} className="text-sky-600" />
                Hidratação Recomendada
              </h4>

              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-sky-50 border border-sky-100 flex flex-col items-center justify-center shrink-0 text-sky-600">
                  <Droplet size={32} className="animate-bounce" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-black text-sky-950">{(results.waterTarget / 1000).toFixed(2)} <span className="text-xs font-bold uppercase text-sky-600">Litros</span></p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Com base no seu peso de {profile.weight}kg, seu corpo precisa de no mínimo <span className="font-bold text-sky-800">{results.waterTarget} ml</span> de água pura diariamente para o metabolismo e rins funcionarem de forma perfeita.
                  </p>
                </div>
              </div>
            </div>

            {/* Necessidade Calorica */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-5 md:col-span-2">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                <Flame size={16} className="text-orange-500" />
                Necessidade Calórica Diária (Metabolismo + Objetivo)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div className="p-4 bg-orange-50/20 border border-orange-100 rounded-xl text-center space-y-1">
                  <p className="text-[10px] text-orange-700 uppercase font-bold tracking-wider">Metabolismo Basal (TMB)</p>
                  <p className="text-2xl font-black text-orange-950">{results.tmb} <span className="text-xs font-normal">kcal</span></p>
                  <p className="text-[10px] text-gray-400 leading-normal">Energia gasta deitado em jejum absoluto</p>
                </div>

                <div className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-xl text-center space-y-1 sm:col-span-2">
                  <p className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider">Sua Meta Diária Recomendada</p>
                  <p className="text-3xl font-black text-emerald-950">{results.dailyCaloricNeed} <span className="text-sm font-normal">kcal / dia</span></p>
                  <p className="text-xs text-emerald-900/80 leading-normal font-medium">
                    Ajustado para atividade física e objetivo de <span className="font-bold underline">{profile.goal.toUpperCase()}</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Calculadora de Macronutrientes */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-5 md:col-span-2">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
                <Compass size={16} className="text-emerald-600" />
                Distribuição Recomendada de Macronutrientes
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Carbs */}
                <div className="p-4 bg-sky-50/20 border border-sky-100/50 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-sky-800">Carboidratos</span>
                    <span className="font-black text-sky-950">{results.macros.carbsPct}%</span>
                  </div>
                  <p className="text-2xl font-black text-sky-900">{results.macros.carbs}g</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">Fornece energia estável rápida para cérebro e treinos.</p>
                </div>

                {/* Protein */}
                <div className="p-4 bg-red-50/20 border border-red-100/50 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-red-800">Proteínas</span>
                    <span className="font-black text-red-950">{results.macros.proteinPct}%</span>
                  </div>
                  <p className="text-2xl font-black text-red-900">{results.macros.protein}g</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">Constrói, repara fibras musculares e garante saciedade.</p>
                </div>

                {/* Fats */}
                <div className="p-4 bg-amber-50/20 border border-amber-100/50 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-amber-800">Gorduras</span>
                    <span className="font-black text-amber-950">{results.macros.fatPct}%</span>
                  </div>
                  <p className="text-2xl font-black text-amber-900">{results.macros.fat}g</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">Produção de hormonas vitais e integridade celular.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
