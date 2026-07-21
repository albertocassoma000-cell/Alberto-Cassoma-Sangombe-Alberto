import { UserProfile } from "../types";

export interface HealthAnalysis {
  bmi: number;
  bmiCategory: string;
  bmiColor: string;
  idealWeightMin: number;
  idealWeightMax: number;
  waterTarget: number; // ml
  tmb: number; // Basal Metabolic Rate
  dailyCaloricNeed: number; // with activity and goal adjustments
  macros: {
    carbs: number; // grams
    protein: number; // grams
    fat: number; // grams
    carbsPct: number;
    proteinPct: number;
    fatPct: number;
  };
}

export function calculateHealthMetrics(profile: UserProfile, age: number = 30): HealthAnalysis {
  const heightM = profile.height / 100;
  
  // BMI (IMC)
  const bmi = profile.weight / (heightM * heightM);
  let bmiCategory = "Peso Normal";
  let bmiColor = "text-emerald-600 bg-emerald-50";
  
  if (bmi < 18.5) {
    bmiCategory = "Abaixo do Peso";
    bmiColor = "text-sky-600 bg-sky-50";
  } else if (bmi < 25) {
    bmiCategory = "Peso Normal";
    bmiColor = "text-emerald-600 bg-emerald-50";
  } else if (bmi < 30) {
    bmiCategory = "Sobrepeso";
    bmiColor = "text-amber-600 bg-amber-50";
  } else {
    bmiCategory = "Obesidade";
    bmiColor = "text-red-600 bg-red-50";
  }

  // Ideal weight range based on BMI 18.5 to 24.9
  const idealWeightMin = 18.5 * (heightM * heightM);
  const idealWeightMax = 24.9 * (heightM * heightM);

  // Water recommendation: 35ml per kg of weight
  const waterTarget = profile.weight * 35;

  // Harris-Benedict TMB equation
  let tmb = 0;
  if (profile.gender === "Masculino") {
    tmb = 88.36 + (13.4 * profile.weight) + (4.8 * profile.height) - (5.7 * age);
  } else {
    tmb = 447.59 + (9.2 * profile.weight) + (3.1 * profile.height) - (4.3 * age);
  }

  // Activity multipliers
  let activityMultiplier = 1.2;
  switch (profile.activityLevel) {
    case "Sedentário":
      activityMultiplier = 1.2;
      break;
    case "Moderado":
      activityMultiplier = 1.45;
      break;
    case "Ativo":
      activityMultiplier = 1.65;
      break;
    case "Muito Ativo":
      activityMultiplier = 1.85;
      break;
  }

  const maintenanceCalories = tmb * activityMultiplier;

  // Adjust for user's goals
  let dailyCaloricNeed = maintenanceCalories;
  if (profile.goal === "Emagrecer") {
    dailyCaloricNeed = maintenanceCalories - 450;
  } else if (profile.goal === "Hipertrofia") {
    dailyCaloricNeed = maintenanceCalories + 450;
  }

  // Round values
  dailyCaloricNeed = Math.round(dailyCaloricNeed);

  // Macro distributions based on goals
  // Carbohydrates: 4 kcal/g, Protein: 4 kcal/g, Fat: 9 kcal/g
  let carbsPct = 45;
  let proteinPct = 25;
  let fatPct = 30;

  if (profile.goal === "Emagrecer") {
    carbsPct = 35;
    proteinPct = 35;
    fatPct = 30;
  } else if (profile.goal === "Hipertrofia") {
    carbsPct = 50;
    proteinPct = 25;
    fatPct = 25;
  }

  const carbsG = (dailyCaloricNeed * (carbsPct / 100)) / 4;
  const proteinG = (dailyCaloricNeed * (proteinPct / 100)) / 4;
  const fatG = (dailyCaloricNeed * (fatPct / 100)) / 9;

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    bmiColor,
    idealWeightMin: Math.round(idealWeightMin * 10) / 10,
    idealWeightMax: Math.round(idealWeightMax * 10) / 10,
    waterTarget: Math.round(waterTarget),
    tmb: Math.round(tmb),
    dailyCaloricNeed,
    macros: {
      carbs: Math.round(carbsG),
      protein: Math.round(proteinG),
      fat: Math.round(fatG),
      carbsPct,
      proteinPct,
      fatPct
    }
  };
}
