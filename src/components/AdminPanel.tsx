import React, { useState } from "react";
import { Food, Recipe } from "../types";
import {
  Settings, Users, Bell, BarChart3, Database, Plus, Trash2, Check,
  Sparkles, ShieldCheck, Mail, Globe, Apple, TrendingUp
} from "lucide-react";
import { motion } from "motion/react";

interface AdminPanelProps {
  foodsList: Food[];
  onAddCustomFood: (food: Food) => void;
  onDeleteFood: (id: string) => void;
  onBroadcastNotification: (message: string) => void;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Administrador" | "Utilizador Premium" | "Utilizador Standard";
  joinedDate: string;
}

export default function AdminPanel({
  foodsList,
  onAddCustomFood,
  onDeleteFood,
  onBroadcastNotification,
}: AdminPanelProps) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<"estatisticas" | "alimentos" | "usuarios" | "notificacoes">("estatisticas");

  // Notifications state
  const [notificationMsg, setNotificationMsg] = useState("");
  const [notifSuccess, setNotifSuccess] = useState(false);

  // New food form state
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodScientific, setNewFoodScientific] = useState("");
  const [newFoodCategory, setNewFoodCategory] = useState("Fruta");
  const [newFoodFamily, setNewFoodFamily] = useState("");
  const [newFoodOrigin, setNewFoodOrigin] = useState("");
  const [newFoodDescription, setNewFoodDescription] = useState("");
  const [newFoodCalories, setNewFoodCalories] = useState(100);
  const [newFoodCarbs, setNewFoodCarbs] = useState(20);
  const [newFoodProtein, setNewFoodProtein] = useState(2);
  const [newFoodFats, setNewFoodFats] = useState(0.5);
  const [newFoodFiber, setNewFoodFiber] = useState(1.5);
  const [foodAddedSuccess, setFoodAddedSuccess] = useState(false);

  // Mock Users List
  const [users, setUsers] = useState<AdminUser[]>([
    { id: "u_1", name: "Alberto Cassoma", email: "albertocassoma000@gmail.com", role: "Administrador", joinedDate: "2026-07-20" },
    { id: "u_2", name: "Maria Domingos", email: "maria.domingos@gmail.com", role: "Utilizador Premium", joinedDate: "2026-07-15" },
    { id: "u_3", name: "João Neto", email: "joao.neto@sapo.ao", role: "Utilizador Standard", joinedDate: "2026-07-12" },
    { id: "u_4", name: "Suzana Antunes", email: "su.antunes@outlook.com", role: "Utilizador Premium", joinedDate: "2026-07-10" },
  ]);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationMsg.trim()) return;
    onBroadcastNotification(notificationMsg);
    setNotifSuccess(true);
    setNotificationMsg("");
    setTimeout(() => setNotifSuccess(false), 3000);
  };

  const handleAddFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFoodName.trim()) return;

    const customFood: Food = {
      id: `custom_${Date.now()}`,
      name: newFoodName,
      scientificName: newFoodScientific || "Cultivado",
      category: newFoodCategory,
      family: newFoodFamily || "Não especificado",
      origin: newFoodOrigin || "Angola",
      countryOfOrigin: "Angola",
      season: "Ano inteiro",
      description: newFoodDescription || "Alimento customizado adicionado pelo administrador da plataforma Vida Saudável.",
      curiosities: ["Adicionado manualmente via Painel Administrativo."],
      nutrients: {
        calories: Number(newFoodCalories),
        water: 75,
        protein: Number(newFoodProtein),
        carbs: Number(newFoodCarbs),
        fats: Number(newFoodFats),
        saturatedFats: 0,
        unsaturatedFats: 0,
        fiber: Number(newFoodFiber),
        sugars: 0,
        cholesterol: 0,
        glycemicIndex: 50,
        glycemicLoad: 10,
      },
      vitamins: [
        { name: "Vitamina C", amount: 15, unit: "mg", dailyValuePercentage: 16 }
      ],
      minerals: [
        { name: "Potássio", amount: 180, unit: "mg", dailyValuePercentage: 5 }
      ],
      bioactives: [],
      benefits: {
        immunity: "Ajuda no fortalecimento de células brancas."
      },
      contraindications: {
        general: "Livre para o consumo geral saudável.",
        whoShouldAvoid: "Sem contraindicações documentadas.",
        allergies: "Nenhuma conhecida.",
        drugInteractions: "Nenhuma conhecida.",
        maxRecommendedAmount: "Sem restrição específica.",
        possibleRisks: "Nenhum conhecido."
      },
      recipes: []
    };

    onAddCustomFood(customFood);
    setFoodAddedSuccess(true);

    // Reset fields
    setNewFoodName("");
    setNewFoodScientific("");
    setNewFoodFamily("");
    setNewFoodOrigin("");
    setNewFoodDescription("");
    setTimeout(() => setFoodAddedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="p-2.5 bg-slate-900 rounded-xl text-white shrink-0">
          <Settings size={20} className="animate-spin-slow" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-1.5">
            Painel de Administração <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[9px] font-black uppercase rounded">Acesso Root</span>
          </h2>
          <p className="text-xs text-gray-500">Controle de alimentos do catálogo, gestão de categorias, monitorização de estatísticas e disparo de notificações.</p>
        </div>
      </div>

      {/* Selector of Subtabs */}
      <div className="flex gap-2 border-b border-gray-100 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: "estatisticas", label: "Estatísticas & Relatórios", icon: BarChart3 },
          { id: "alimentos", label: "Gerir Alimentos", icon: Database },
          { id: "usuarios", label: "Gestão de Usuários", icon: Users },
          { id: "notificacoes", label: "Disparar Notificações", icon: Bell }
        ].map((sub) => {
          const Icon = sub.icon;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveAdminSubTab(sub.id as any)}
              className={`flex items-center gap-2 px-4 py-2 font-semibold text-xs rounded-xl transition-all cursor-pointer ${
                activeAdminSubTab === sub.id
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-white border border-gray-100 hover:border-gray-200 text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon size={14} />
              {sub.label}
            </button>
          );
        })}
      </div>

      {/* SUBTAB CONTENT */}

      {/* ESTATISTICAS */}
      {activeAdminSubTab === "estatisticas" && (
        <div className="space-y-6">
          {/* Bento counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Alimentos</span>
              <p className="text-2xl font-black text-gray-950 mt-1">{foodsList.length}</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1.5 flex items-center gap-0.5">
                <TrendingUp size={10} /> +2 adicionados hoje
              </p>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Usuários</span>
              <p className="text-2xl font-black text-gray-950 mt-1">{users.length}</p>
              <p className="text-[10px] text-emerald-600 font-bold mt-1.5">
                100% de atividade ativa
              </p>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Scans Inteligentes</span>
              <p className="text-2xl font-black text-gray-950 mt-1">42</p>
              <p className="text-[10px] text-indigo-500 font-bold mt-1.5">
                Média de 6.4 scans / dia
              </p>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Consultas à IA</span>
              <p className="text-2xl font-black text-gray-950 mt-1">115</p>
              <p className="text-[10px] text-orange-500 font-bold mt-1.5">
                98% respostas com sucesso
              </p>
            </div>
          </div>

          {/* Usage distribution analysis card */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs">
            <h4 className="font-bold text-gray-900 text-sm mb-4">Relatório de Categorias no Catálogo</h4>
            <div className="space-y-3 text-xs">
              {[
                { name: "Frutas", count: foodsList.filter(f => f.category === "Fruta").length, color: "bg-emerald-500" },
                { name: "Legumes / Tubérculos", count: foodsList.filter(f => f.category === "Legume").length, color: "bg-amber-500" },
                { name: "Especialidades de Angola 🇦🇴", count: foodsList.filter(f => f.category === "Angolano" || f.isAngolan).length, color: "bg-red-500" },
                { name: "Carne / Peixe / Proteína", count: foodsList.filter(f => f.category === "Carne" || f.category === "Peixe").length, color: "bg-blue-500" },
              ].map((cat, idx) => {
                const total = foodsList.length || 1;
                const percentage = Math.round((cat.count / total) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-700">{cat.name} ({cat.count})</span>
                      <span className="text-gray-500">{percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`${cat.color} h-full rounded-full`} style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* GERIR ALIMENTOS */}
      {activeAdminSubTab === "alimentos" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* New food form */}
          <div className="lg:col-span-5 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
              <Plus size={16} className="text-emerald-600" /> Registar Novo Alimento
            </h4>

            <form onSubmit={handleAddFoodSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-500">Nome do Alimento</label>
                  <input
                    type="text"
                    required
                    value={newFoodName}
                    onChange={(e) => setNewFoodName(e.target.value)}
                    placeholder="Ex: Abacate"
                    className="w-full px-3 py-1.5 border border-gray-200 focus:border-emerald-500 rounded-lg outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-500">Nome Científico</label>
                  <input
                    type="text"
                    value={newFoodScientific}
                    onChange={(e) => setNewFoodScientific(e.target.value)}
                    placeholder="Ex: Persea americana"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-500">Categoria</label>
                  <select
                    value={newFoodCategory}
                    onChange={(e) => setNewFoodCategory(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg outline-none cursor-pointer bg-white"
                  >
                    <option value="Fruta">Fruta</option>
                    <option value="Legume">Legume</option>
                    <option value="Verdura">Verdura</option>
                    <option value="Carne">Carne</option>
                    <option value="Peixe">Peixe</option>
                    <option value="Cereal">Cereal</option>
                    <option value="Bebida">Bebida</option>
                    <option value="Angolano">Especial Angolano</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-500">Família / Origem</label>
                  <input
                    type="text"
                    value={newFoodOrigin}
                    onChange={(e) => setNewFoodOrigin(e.target.value)}
                    placeholder="Ex: México"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-500">Breve Descrição</label>
                <textarea
                  value={newFoodDescription}
                  onChange={(e) => setNewFoodDescription(e.target.value)}
                  placeholder="Descreva as características e uso comum..."
                  rows={2}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg outline-none resize-none"
                />
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <p className="font-bold text-gray-700 text-[10px] uppercase tracking-wider">Macronutrientes (por 100g)</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-semibold">Calorias (kcal)</label>
                    <input
                      type="number"
                      required
                      value={newFoodCalories}
                      onChange={(e) => setNewFoodCalories(Number(e.target.value))}
                      className="w-full p-1.5 border border-gray-200 rounded text-center font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-semibold">Carbos (g)</label>
                    <input
                      type="number"
                      required
                      value={newFoodCarbs}
                      onChange={(e) => setNewFoodCarbs(Number(e.target.value))}
                      className="w-full p-1.5 border border-gray-200 rounded text-center font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-semibold">Prot (g)</label>
                    <input
                      type="number"
                      required
                      value={newFoodProtein}
                      onChange={(e) => setNewFoodProtein(Number(e.target.value))}
                      className="w-full p-1.5 border border-gray-200 rounded text-center font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 font-semibold">Gord (g)</label>
                    <input
                      type="number"
                      required
                      value={newFoodFats}
                      onChange={(e) => setNewFoodFats(Number(e.target.value))}
                      className="w-full p-1.5 border border-gray-200 rounded text-center font-bold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Injetar no Catálogo
              </button>

              {foodAddedSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 font-medium text-center flex items-center justify-center gap-1.5">
                  <Check size={14} /> Alimento adicionado com sucesso!
                </div>
              )}
            </form>
          </div>

          {/* Current list manager */}
          <div className="lg:col-span-7 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
              <Database size={16} className="text-emerald-600" /> Alimentos Ativos ({foodsList.length})
            </h4>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {foodsList.map((food) => (
                <div
                  key={food.id}
                  className="flex justify-between items-center p-2.5 border border-gray-50 bg-slate-50/40 rounded-xl"
                  id={`admin-food-row-${food.id}`}
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-xs text-gray-800 flex items-center gap-1.5">
                      {food.name}
                      {food.isAngolan && <span className="text-[8px] bg-orange-100 text-orange-800 px-1 font-extrabold rounded">ANGOLA</span>}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Category: {food.category} • {food.nutrients.calories} kcal/100g
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteFood(food.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remover do Catálogo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GESTÃO DE USUÁRIOS */}
      {activeAdminSubTab === "usuarios" && (
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs space-y-4">
          <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
            <Users size={16} className="text-emerald-600" /> Usuários Registrados no Sistema
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-gray-500 font-bold">
                  <th className="p-3">Nome</th>
                  <th className="p-3">E-mail</th>
                  <th className="p-3">Nível de Acesso</th>
                  <th className="p-3">Data de Entrada</th>
                  <th className="p-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-slate-50/40">
                    <td className="p-3 font-bold text-gray-800">{user.name}</td>
                    <td className="p-3 text-gray-500 flex items-center gap-1">
                      <Mail size={12} /> {user.email}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          user.role === "Administrador"
                            ? "bg-red-50 text-red-700"
                            : user.role === "Utilizador Premium"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 text-gray-400">{user.joinedDate}</td>
                    <td className="p-3 text-right">
                      <button
                        className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer"
                        onClick={() => alert(`Configurações de ${user.name} carregadas.`)}
                      >
                        Editar Acesso
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DISPARAR NOTIFICAÇÕES */}
      {activeAdminSubTab === "notificacoes" && (
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs max-w-lg space-y-4">
          <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
            <Bell size={16} className="text-emerald-600" /> Disparador de Notificações em Massa
          </h4>

          <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-600">Mensagem da Notificação</label>
              <textarea
                required
                value={notificationMsg}
                onChange={(e) => setNotificationMsg(e.target.value)}
                placeholder="Ex: Hora de Beber Água! Hidrate seu corpo com mais um copo d'água refrescante 💧"
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl outline-none resize-none text-sm"
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 leading-relaxed flex items-start gap-2">
              <ShieldCheck size={16} className="shrink-0 mt-0.5 text-blue-600" />
              <p>Ao clicar em disparar, todos os usuários ativos do Vida Saudável receberão este lembrete instantaneamente através do banner interno de mensagens.</p>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
            >
              Disparar Transmissão
            </button>

            {notifSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 font-medium text-center flex items-center justify-center gap-1.5">
                <Check size={14} /> Notificação disparada com sucesso para toda a rede!
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
