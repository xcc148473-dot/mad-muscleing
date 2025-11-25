

export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export enum Goal {
  LoseWeight = 'Lose Weight',
  GainMuscle = 'Gain Muscle',
  MaintainHealth = 'Maintain Health'
}

export enum ActivityLevel {
  Sedentary = 'Sedentary', // 1.2
  LightlyActive = 'Lightly Active', // 1.375
  ModeratelyActive = 'Moderately Active', // 1.55
  VeryActive = 'Very Active' // 1.725
}

export type Language = 'en' | 'zh' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt';
export type Theme = 'slate' | 'zinc' | 'neutral' | 'stone' | 'rose' | 'blue' | 'green' | 'violet';
export type ResultTab = 'dashboard' | 'meals' | 'training' | 'shopping';

export interface UserData {
  gender: Gender | null;
  age: number;
  heightCm: number;
  weightKg: number;
  goal: Goal | null;
  experience: string;
  waterIntake: string;
  sleepHours: string;
  workIntensity: string;
  dietPreference: string;
  excludedFoods: string[];
  healthConditions: string[];
  trainingFrequency: string;
  willingToFollowDiet: boolean | null;
  // Body Fat specifics
  visualBf: string; // rough estimate
  definitionLevel: string; // new: specific mirror check
  bodyType: string;
  waistCm: number;
  neckCm: number;
  hipCm: number; // Only for female
  // Allow dynamic fields for the extended questionnaire
  [key: string]: any;
}

export interface QuestionStep {
  id: string;
  type: 'select' | 'multi-select' | 'number' | 'measurements' | 'info';
  title: string;
  subtitle?: string;
  options?: { label: string; value: any; icon?: string; image?: string }[];
  field?: keyof UserData;
  validation?: (data: UserData) => boolean;
  explanation?: string;
}

export interface DietPlan {
  name: string;
  meals: {
    type: 'Breakfast' | 'Lunch' | 'Dinner';
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
  }[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface ShoppingItem {
  name: string;
  category: string;
  checked: boolean;
}

export interface CalculatedStats {
  bmi: number;
  bodyFat: number;
  bmr: number;
  tdee: number;
  macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
}