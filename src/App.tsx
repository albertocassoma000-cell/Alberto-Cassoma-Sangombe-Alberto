import React, { useState, useEffect } from "react";
import {
  Search, Award, Sparkles, Scale, Heart, Bot, ShieldCheck, Dumbbell,
  BookOpen, Plus, HeartCrack, ChevronRight, Moon, Sun, User, Bell,
  Trash2, PlusCircle, CheckCircle, Flame, Droplet, Apple, Calendar, Settings,
  AlertCircle, Volume2, VolumeX
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types & Data
import { Food, Recipe, UserProfile, DailyDiary, DiaryMealEntry } from "./types";
import { initialFoods } from "./data/foods";
import { calculateHealthMetrics } from "./utils/health";
import { getFoodImage } from "./utils/foodImages";
import { playTapSound, playSuccessChime, playScanSound, playSwipeSound, playWarningSound, setSoundMuted } from "./utils/audio";

// Components
import FoodDetails from "./components/FoodDetails";
import AIAssistant from "./components/AIAssistant";
import AIScanner from "./components/AIScanner";
import FoodComparator from "./components/FoodComparator";
import HealthCalculators from "./components/HealthCalculators";
import FoodDiary from "./components/FoodDiary";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  // --- STATE ---
  const [foods, setFoods] = useState<Food[]>(() => {
    const saved = localStorage.getItem("vida_saudavel_foods");
    return saved ? JSON.parse(saved) : initialFoods;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("vida_saudavel_profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Alberto Cassoma",
          email: "albertocassoma000@gmail.com",
          age: 28,
          weight: 74,
          height: 178,
          gender: "Masculino",
          activityLevel: "Moderado",
          goal: "Hipertrofia",
        };
  });

  const [diary, setDiary] = useState<DailyDiary>(() => {
    const saved = localStorage.getItem("vida_saudavel_diary");
    const today = new Date().toISOString().split("T")[0];
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) return parsed;
    }
    return {
      date: today,
      breakfast: [],
      lunch: [],
      snack: [],
      dinner: [],
      supper: [],
      waterDrank: 0,
    };
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("vida_saudavel_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("vida_saudavel_searches");
    return saved ? JSON.parse(saved) : ["Funge", "Kizaka", "Banana", "Mufete"];
  });

  const [activeTab, setActiveTab] = useState<
    "inicio" | "scanner" | "diario" | "calculadora" | "comparador" | "assistente" | "admin"
  >("inicio");

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [muted, setMuted] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vida_saudavel_sound_muted");
      return saved ? saved === "true" : false;
    }
    return false;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // Active Broadcast Toast State
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // --- LOCALSTORAGE SYNC EFFECTS ---
  useEffect(() => {
    localStorage.setItem("vida_saudavel_sound_muted", muted.toString());
    setSoundMuted(muted);
  }, [muted]);

  useEffect(() => {
    localStorage.setItem("vida_saudavel_foods", JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem("vida_saudavel_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("vida_saudavel_diary", JSON.stringify(diary));
  }, [diary]);

  useEffect(() => {
    localStorage.setItem("vida_saudavel_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("vida_saudavel_searches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // --- DERIVED METRICS ---
  const healthAnalysis = calculateHealthMetrics(profile);

  // --- NOTIFICATION BROADCASTER ---
  const handleBroadcastNotification = (message: string) => {
    setActiveToast(message);
    playSuccessChime();
    // Auto-dismiss in 6s
    setTimeout(() => {
      setActiveToast(null);
    }, 6000);
  };

  // --- DIARY MUTATIONS ---
  const handleAddMealEntry = (
    mealType: "breakfast" | "lunch" | "snack" | "dinner" | "supper",
    entry: Omit<DiaryMealEntry, "id">
  ) => {
    const newEntry: DiaryMealEntry = {
      ...entry,
      id: `entry_${Date.now()}`,
    };
    setDiary((prev) => ({
      ...prev,
      [mealType]: [...prev[mealType], newEntry],
    }));
    playSuccessChime();
  };

  const handleDeleteMealEntry = (
    mealType: "breakfast" | "lunch" | "snack" | "dinner" | "supper",
    id: string
  ) => {
    setDiary((prev) => ({
      ...prev,
      [mealType]: prev[mealType].filter((x) => x.id !== id),
    }));
    playWarningSound();
  };

  const handleAddWater = (amount: number) => {
    setDiary((prev) => ({
      ...prev,
      waterDrank: prev.waterDrank + amount,
    }));
    playSuccessChime();
  };

  const handleAddScannedToDiary = (food: { name: string; calories: number; protein: number; carbs: number; fat: number }) => {
    // Adds to active meal type based on current hour:
    // 6-11: breakfast, 11-15: lunch, 15-18: snack, 18-22: dinner, 22-6: supper
    const hour = new Date().getHours();
    let mealType: "breakfast" | "lunch" | "snack" | "dinner" | "supper" = "snack";
    if (hour >= 6 && hour < 11) mealType = "breakfast";
    else if (hour >= 11 && hour < 15) mealType = "lunch";
    else if (hour >= 15 && hour < 18) mealType = "snack";
    else if (hour >= 18 && hour < 22) mealType = "dinner";
    else mealType = "supper";

    handleAddMealEntry(mealType, {
      foodName: `${food.name} (Porção Scanner)`,
      amount: 100,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
    });
    // handleAddMealEntry already plays playSuccessChime()
  };

  const handleAddRecipeToDiary = (recipe: Recipe) => {
    handleAddMealEntry("lunch", {
      foodName: `Receita: ${recipe.name}`,
      amount: 250,
      calories: recipe.calories,
      protein: recipe.nutrients.protein,
      carbs: recipe.nutrients.carbs,
      fat: recipe.nutrients.fat,
    });
  };

  // --- CATALOG MUTATIONS (ADMIN) ---
  const handleAddCustomFood = (newFood: Food) => {
    setFoods((prev) => [newFood, ...prev]);
    playSuccessChime();
  };

  const handleDeleteFood = (id: string) => {
    setFoods((prev) => prev.filter((f) => f.id !== id));
    playWarningSound();
  };

  // --- FAVORITE MUTATIONS ---
  const toggleFavorite = (foodId: string) => {
    if (favorites.includes(foodId)) {
      setFavorites(favorites.filter((x) => x !== foodId));
      playWarningSound();
    } else {
      setFavorites([...favorites, foodId]);
      playSuccessChime();
    }
  };

  // --- SEARCH TRIGGERS ---
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTapSound();
    if (!searchQuery.trim()) return;

    // Save search query
    if (!recentSearches.includes(searchQuery)) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)]);
    }
  };

  // --- FILTERS ---
  const filteredFoods = foods.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory
      ? selectedCategory === "Angola"
        ? f.isAngolan || f.category === "Angolano"
        : f.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  const popularFoods = foods.slice(0, 4);
  const angolanFoods = foods.filter((f) => f.isAngolan || f.category === "Angolano");

  const categories = [
    { name: "Fruta", label: "Frutas", icon: "🍎" },
    { name: "Legume", label: "Legumes", icon: "🥔" },
    { name: "Carne", label: "Carnes", icon: "🍗" },
    { name: "Peixe", label: "Peixes", icon: "🐟" },
    { name: "Cereal", label: "Cereais", icon: "🌾" },
    { name: "Bebida", label: "Bebidas", icon: "🥛" },
    { name: "Angola", label: "Especiais Angola", icon: "🇦🇴" },
  ];

  return (
    <div className={`min-h-screen w-full transition-colors duration-200 bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-0 md:py-6 ${theme === "dark" ? "text-white dark" : "text-gray-800"}`}>
      
      {/* Smartphone Device Mockup Frame (Desktop Centered, Mobile Full-Screen) */}
      <div className="w-full md:max-w-[412px] md:h-[844px] h-screen bg-slate-50 dark:bg-slate-950 md:rounded-[44px] md:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35)] md:border-[10px] md:border-slate-900 flex flex-col overflow-hidden relative" id="mobile-app-wrapper">
        
        {/* Mobile Device Simulated Status Bar */}
        <div className="bg-slate-900 dark:bg-black px-6 pt-3.5 pb-2 flex justify-between items-center text-white text-[11px] font-bold select-none shrink-0 z-40">
          <span>09:41</span>
          {/* Virtual Indicators */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] tracking-wider font-extrabold text-blue-400 uppercase">5G</span>
            <svg className="w-3.5 h-3.5 fill-current text-slate-300" viewBox="0 0 24 24" id="signal-icon">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.22 19.58 10.57 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
            </svg>
            <div className="w-5 h-2.5 border border-white/60 rounded-sm p-0.5 flex items-center">
              <div className="bg-blue-400 h-full w-[85%] rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Dynamic Island Cutout for physical aesthetic on Desktop */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-50 hidden md:block animate-pulse" />

        {/* Native Mobile App Header inside viewport */}
        <header className="sticky top-0 z-30 w-full bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800/80 px-4 py-3 shrink-0 flex items-center justify-between shadow-xs">
          {/* Brand Logo & Title */}
          <div onClick={() => setActiveTab("inicio")} className="cursor-pointer flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
              <Heart size={15} className="fill-white stroke-white" />
            </div>
            <div>
              <h1 className="font-black text-slate-950 dark:text-white text-sm leading-none tracking-tight">Vida Saudável</h1>
              <span className="text-[8px] text-blue-600 dark:text-blue-400 font-extrabold tracking-widest uppercase">Portal de Nutrição IA</span>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-1.5">
            {/* Quick compare toggle button */}
            <button
              onClick={() => setActiveTab("comparador")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${activeTab === "comparador" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
              title="Comparar Alimentos"
              id="top-compare-btn"
            >
              <Scale size={16} />
            </button>

            {/* Theme switcher */}
            <button
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
                playTapSound();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Alternar Tema"
              id="theme-toggle-btn"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Sound toggle button */}
            <button
              onClick={() => {
                const nextMuted = !muted;
                setMuted(nextMuted);
                if (!nextMuted) {
                  setTimeout(() => playSuccessChime(), 60);
                } else {
                  playWarningSound();
                }
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
              title={muted ? "Ativar Som" : "Silenciar Som"}
              id="sound-toggle-btn"
            >
              {muted ? <VolumeX size={16} className="text-red-500" /> : <Volume2 size={16} className="text-blue-500" />}
            </button>

            {/* Profile clicker */}
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                playTapSound();
              }}
              id="header-profile-btn"
            >
              {profile.name[0]}
            </button>
          </div>
        </header>

        {/* Broadcast iOS Notification Banner inside Mockup */}
        <AnimatePresence>
          {activeToast && (
            <motion.div
              initial={{ opacity: 0, y: -80, scale: 0.9 }}
              animate={{ opacity: 1, y: 12, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ type: "spring", damping: 18 }}
              className="absolute top-12 left-3 right-3 z-50 bg-slate-900/95 border border-slate-800 text-white p-3.5 rounded-2xl shadow-xl flex gap-3 backdrop-blur-md"
              id="broadcast-toast"
            >
              <div className="p-1.5 bg-blue-600 text-white rounded-xl shrink-0 h-fit">
                <Bell size={15} />
              </div>
              <div className="space-y-0.5 flex-1">
                <p className="font-extrabold text-[10px] text-blue-400 uppercase tracking-widest">Vida Saudável</p>
                <p className="text-[11px] text-slate-100 leading-normal font-medium">{activeToast}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Core Viewport */}
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-6 no-scrollbar pb-24" id="main-mobile-scroll">
          
          {/* PROFILE MOBILE BOTTOM SHEET/SIDE DRAWER */}
          <AnimatePresence>
            {profileOpen && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex flex-col justify-end" onClick={() => setProfileOpen(false)}>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 22, stiffness: 180 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-white dark:bg-slate-900 rounded-t-[32px] p-5 shadow-2xl flex flex-col space-y-5 max-h-[85%] overflow-y-auto border-t border-slate-200/80 dark:border-slate-800"
                  id="profile-drawer"
                >
                  {/* Pull Indicator */}
                  <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto shrink-0 mb-1" />

                  <div className="flex justify-between items-center pb-2">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <User size={16} className="text-blue-600" /> Perfil do Usuário
                    </h3>
                    <button onClick={() => setProfileOpen(false)} className="text-[11px] font-black text-blue-600 hover:underline">Fechar</button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl text-center space-y-1">
                      <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-black mx-auto shadow-md">
                        {profile.name[0]}
                      </div>
                      <p className="font-extrabold text-sm text-slate-900 dark:text-white mt-2">{profile.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{profile.email}</p>
                    </div>

                    {/* Profile Fields */}
                    <div className="space-y-2 text-[11px]">
                      <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Objetivo:</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{profile.goal}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Peso:</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{profile.weight} kg</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Altura:</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{profile.height} cm</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500">Atividade:</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{profile.activityLevel}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100/30 rounded-2xl space-y-3">
                      <p className="font-extrabold text-blue-800 dark:text-blue-400 text-[10px] uppercase tracking-wider">Metas Calculadas:</p>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-blue-100/10">
                          <p className="text-[8px] text-slate-400 font-bold uppercase">Calorias</p>
                          <p className="font-black text-blue-600 dark:text-blue-400 text-xs mt-0.5">{healthAnalysis.dailyCaloricNeed} kcal</p>
                        </div>
                        <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-blue-100/10">
                          <p className="text-[8px] text-slate-400 font-bold uppercase">Água Diária</p>
                          <p className="font-black text-sky-500 dark:text-sky-400 text-xs mt-0.5">{healthAnalysis.waterTarget} ml</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => {
                          setActiveTab("calculadora");
                          setProfileOpen(false);
                        }}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black rounded-xl transition-all text-center cursor-pointer text-xs"
                      >
                        Editar Perfil Completo
                      </button>
                      
                      {/* Access admin panel */}
                      <button
                        onClick={() => {
                          setActiveTab("admin");
                          setProfileOpen(false);
                        }}
                        className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all text-center cursor-pointer text-[10px] uppercase tracking-wider"
                      >
                        ⚙️ Painel Administrador
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* TAB CORE CONTENTS */}

          {/* 1. INICIO (DASHBOARD) */}
          {activeTab === "inicio" && (
            <div className="space-y-6">
              {/* Search & Categories block */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-5 text-white shadow-md border border-blue-500/15 space-y-4">
                <div className="space-y-1.5">
                  <span className="px-2.5 py-0.5 bg-blue-600/30 text-blue-300 rounded-full text-[9px] font-black uppercase tracking-wider border border-blue-500/25">
                    ⚡ Nutrição IA de Ponta
                  </span>
                  <h2 className="text-xl font-black tracking-tight leading-snug">
                    O que vamos nutrir hoje?
                  </h2>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Pesquise um alimento tradicional ou internacional, consulte dados validados por nutricionistas e use nossa IA para guiar sua dieta.
                  </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search size={16} className="absolute left-3.5 top-3 text-blue-500" />
                  <input
                    type="text"
                    placeholder="Pesquise por Alimento, Vitamina, Benefício..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-20 py-2.5 bg-white text-slate-950 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/20 text-xs font-semibold placeholder-slate-400"
                    id="catalog-search-input"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Buscar
                  </button>
                </form>

                {/* Categories Pills */}
                <div className="space-y-2">
                  <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Navegar por categorias</p>
                  <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto no-scrollbar">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                        selectedCategory === null
                          ? "bg-blue-600 text-white border-blue-600 font-black shadow-md shadow-blue-500/10"
                          : "bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      Todos
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                          selectedCategory === cat.name
                            ? "bg-blue-600 text-white border-blue-600 font-black shadow-md shadow-blue-500/10"
                            : "bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300"
                        }`}
                        id={`category-pill-${cat.name}`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Foods Grid */}
            <div className="space-y-3.5">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {selectedCategory ? `${selectedCategory}` : "Recomendados para Você"}
                </h3>
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-[11px] font-bold text-blue-600 hover:underline">Limpar</button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-3 shadow-xs hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/80 transition-all cursor-pointer flex flex-col justify-between group"
                    id={`food-card-${food.id}`}
                  >
                    <div className="space-y-2">
                      {/* Card Image */}
                      <div className="relative h-24 w-full rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                        <img
                          src={getFoodImage(food.id, food.category)}
                          alt={food.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[8px] font-black uppercase rounded tracking-wider">
                          {food.category}
                        </span>
                        {food.isAngolan && (
                          <span className="absolute top-1.5 right-1.5 text-xs" title="Alimento de Angola">
                            🇦🇴
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-black text-slate-900 dark:text-white text-xs leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">{food.name}</h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(food.id);
                            }}
                            className={`p-1 rounded-full transition-colors shrink-0 ${
                              favorites.includes(food.id)
                                ? "bg-red-50 text-red-500"
                                : "text-slate-300 hover:text-red-500"
                            }`}
                          >
                            <Heart size={11} className={favorites.includes(food.id) ? "fill-red-500" : ""} />
                          </button>
                        </div>
                        <p className="text-[9px] text-slate-400 italic line-clamp-1 font-medium">{food.scientificName}</p>
                      </div>

                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {food.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-50 dark:border-slate-800/80 pt-2 mt-3 flex items-center justify-between text-[10px] font-bold">
                      <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-slate-200">{food.nutrients.calories} kcal</span>
                        <span className="text-[8px] text-blue-500 font-extrabold">Prot: {food.nutrients.protein}g</span>
                      </div>
                      <span className="text-[8px] text-blue-600 font-black uppercase flex items-center gap-0.5 shrink-0">
                        Ver <ChevronRight size={10} />
                      </span>
                    </div>
                  </div>
                ))}

                {filteredFoods.length === 0 && (
                  <div className="col-span-full p-8 bg-white dark:bg-slate-900 text-center text-slate-400 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-semibold">
                    Nenhum alimento encontrado.
                  </div>
                )}
              </div>
            </div>

            {/* Angolan Exclusive Section Display */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border border-blue-500/15 p-4 rounded-3xl space-y-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">🇦🇴</span>
                <div>
                  <h3 className="font-extrabold text-white text-xs">Especiais de Angola</h3>
                  <p className="text-[10px] text-slate-400">Explore o valor científico das iguarias nacionais.</p>
                </div>
              </div>

              <div className="flex overflow-x-auto gap-3 pb-1 no-scrollbar snap-x">
                {angolanFoods.map((food) => (
                  <div
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className="min-w-[185px] w-[185px] bg-slate-900 border border-slate-800 p-3 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer space-y-2.5 snap-start flex flex-col justify-between"
                  >
                    <div>
                      <span className="px-1.5 py-0.5 bg-blue-600/20 text-blue-400 border border-blue-500/25 text-[8px] font-black uppercase rounded tracking-wider">
                        Tradição Angolana
                      </span>
                      <h4 className="font-extrabold text-white text-xs mt-1.5 truncate">{food.name}</h4>
                      <p className="text-[9px] text-slate-400 italic leading-none">{food.scientificName}</p>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{food.description}</p>
                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-300 border-t border-slate-800 pt-2">
                      <span>{food.nutrients.calories} kcal</span>
                      <span className="text-blue-400 flex items-center gap-0.5 font-bold">Consultar <ChevronRight size={10} /></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sliding Healthy Advice / News Carousel */}
            <div className="space-y-3 shrink-0">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Dicas de Alimentação Saudável</h3>
              
              <div className="flex overflow-x-auto gap-3 pb-1 no-scrollbar snap-x">
                {[
                  { title: "Beba água ao acordar", desc: "Beba 500ml de água fresca ao acordar para reativar seu metabolismo e limpar toxinas.", icon: Droplet, color: "bg-blue-900/30 text-blue-400 border-blue-500/20" },
                  { title: "Amido Resistente", desc: "O funge de bombo frio ou requentado cria amido resistente excelente para o intestino.", icon: Apple, color: "bg-slate-900 text-slate-300 border-slate-800" },
                  { title: "Reduza óleos refinados", desc: "Substitua óleos por azeite de oliva ou gordura natural saudável.", icon: Award, color: "bg-slate-900 text-slate-300 border-slate-800" }
                ].map((tip, idx) => {
                  const Icon = tip.icon;
                  return (
                    <div key={idx} className={`min-w-[200px] w-[200px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl flex gap-3 snap-start`}>
                      <div className={`p-2 rounded-xl shrink-0 h-fit bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400`}>
                        <Icon size={14} />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-slate-950 dark:text-white text-xs leading-none">{tip.title}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-medium">{tip.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. SCANNER IA */}
        {activeTab === "scanner" && (
          <AIScanner onAddScannedToDiary={handleAddScannedToDiary} />
        )}

        {/* 3. DIARIO ALIMENTAR */}
        {activeTab === "diario" && (
          <FoodDiary
            diary={diary}
            foodsList={foods}
            targetCalories={healthAnalysis.dailyCaloricNeed}
            targetWater={healthAnalysis.waterTarget}
            onAddMealEntry={handleAddMealEntry}
            onDeleteMealEntry={handleDeleteMealEntry}
            onAddWater={handleAddWater}
          />
        )}

        {/* 4. CALCULADORAS */}
        {activeTab === "calculadora" && (
          <HealthCalculators initialProfile={profile} onSaveProfile={setProfile} />
        )}

        {/* 5. COMPARADOR */}
        {activeTab === "comparador" && (
          <FoodComparator foodsList={foods} />
        )}

        {/* 6. ASSISTENTE CHAT IA */}
        {activeTab === "assistente" && (
          <AIAssistant />
        )}

        {/* 7. PAINEL ADMIN */}
        {activeTab === "admin" && (
          <AdminPanel
            foodsList={foods}
            onAddCustomFood={handleAddCustomFood}
            onDeleteFood={handleDeleteFood}
            onBroadcastNotification={handleBroadcastNotification}
          />
        )}
        </main>

        {/* Persistent Native Bottom Navigation Bar */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 border-t border-slate-100 dark:border-slate-800/80 px-2 py-3 shrink-0 z-30 backdrop-blur-md shadow-lg" id="mobile-bottom-nav">
          <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
            {[
              { id: "inicio", label: "Catálogo", icon: Apple },
              { id: "diario", label: "Diário", icon: Calendar },
              { id: "scanner", label: "Scanner", icon: Sparkles },
              { id: "assistente", label: "Chat IA", icon: Bot },
              { id: "calculadora", label: "Saúde", icon: Dumbbell }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    playSwipeSound();
                  }}
                  className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20 font-black scale-102"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  }`}
                  id={`bottom-nav-tab-${tab.id}`}
                >
                  <Icon size={18} className={isActive ? "stroke-[2.5]" : "stroke-[1.8]"} />
                  <span className="text-[9px] mt-1 font-bold tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Food Details Modal */}
      <AnimatePresence>
        {selectedFood && (
          <FoodDetails
            food={selectedFood}
            onClose={() => setSelectedFood(null)}
            onAddRecipeToDiary={handleAddRecipeToDiary}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
