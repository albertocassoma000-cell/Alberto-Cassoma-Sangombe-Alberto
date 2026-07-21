export interface NutritionalValues {
  calories: number; // kcal per 100g
  water: number; // g per 100g
  protein: number; // g per 100g
  carbs: number; // g per 100g
  fats: number; // g per 100g
  saturatedFats: number; // g per 100g
  unsaturatedFats: number; // g per 100g
  fiber: number; // g per 100g
  sugars: number; // g per 100g
  cholesterol: number; // mg per 100g
  glycemicIndex: number;
  glycemicLoad: number;
}

export interface Micronutrient {
  name: string;
  amount: number;
  unit: string;
  dailyValuePercentage: number;
}

export interface BioactiveCompound {
  name: string;
  description: string;
}

export interface FoodBenefits {
  heart: string;
  brain: string;
  memory: string;
  vision: string;
  bones: string;
  skin: string;
  hair: string;
  muscles: string;
  digestion: string;
  intestine: string;
  immunity: string;
  nervousSystem: string;
  liver: string;
  kidneys: string;
  blood: string;
  weight?: string;
}

export interface Contraindications {
  general: string;
  whoShouldAvoid: string;
  allergies: string;
  drugInteractions: string;
  maxRecommendedAmount: string;
  possibleRisks: string;
}

export interface RecipeNutrients {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  steps: string[];
  time: number; // minutes
  difficulty: "Fácil" | "Médio" | "Difícil";
  calories: number;
  nutrients: RecipeNutrients;
}

export interface Food {
  id: string;
  name: string;
  scientificName: string;
  category: string; // "Fruta" | "Legume" | "Verdura" | "Carne" | "Peixe" | "Cereal" | "Bebida" | "Angolano" | "Outro"
  family: string;
  origin: string;
  countryOfOrigin: string;
  season: string;
  description: string;
  curiosities: string[];
  nutrients: NutritionalValues;
  vitamins: Micronutrient[];
  minerals: Micronutrient[];
  bioactives: BioactiveCompound[];
  benefits: Partial<FoodBenefits>;
  contraindications: Contraindications;
  recipes: Recipe[];
  isAngolan?: boolean;
  image?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: "Masculino" | "Feminino";
  activityLevel: "Sedentário" | "Moderado" | "Ativo" | "Muito Ativo";
  goal: "Emagrecer" | "Hipertrofia" | "Manter";
}

export interface DiaryMealEntry {
  id: string;
  foodId?: string;
  foodName: string;
  amount: number; // grams
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyDiary {
  date: string; // YYYY-MM-DD
  breakfast: DiaryMealEntry[];
  lunch: DiaryMealEntry[];
  snack: DiaryMealEntry[];
  dinner: DiaryMealEntry[];
  supper: DiaryMealEntry[];
  waterDrank: number; // ml
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}
