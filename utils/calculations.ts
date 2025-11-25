

import { UserData, Gender, ActivityLevel, CalculatedStats, WorkoutDay, ShoppingItem, DietPlan } from '../types';

const MEAL_DATABASE = {
  breakfast: [
    { name: 'Oatmeal & Berries Power Bowl', type: 'Vegan', ingredients: ['Oats', 'Almond Milk', 'Blueberries', 'Chia Seeds', 'Walnuts'] },
    { name: 'Egg White Omelet with Spinach', type: 'Standard', ingredients: ['Egg Whites', 'Spinach', 'Whole Wheat Toast', 'Avocado'] },
    { name: 'Greek Yogurt Parfait', type: 'Vegetarian', ingredients: ['Greek Yogurt', 'Granola', 'Honey', 'Strawberries'] },
    { name: 'Keto Bacon & Egg Scramble', type: 'Keto', ingredients: ['Eggs', 'Bacon', 'Cheddar Cheese', 'Butter'] },
    { name: 'Protein Pancakes', type: 'Standard', ingredients: ['Protein Powder', 'Banana', 'Oats', 'Egg'] },
    { name: 'Avocado Toast with Seeds', type: 'Vegan', ingredients: ['Sourdough Bread', 'Avocado', 'Pumpkin Seeds', 'Lemon'] },
    { name: 'Smoked Salmon Bagel', type: 'Standard', ingredients: ['Bagel', 'Cream Cheese', 'Smoked Salmon', 'Capers'] }
  ],
  lunch: [
    { name: 'Lean Green Protein Salad', type: 'Standard', ingredients: ['Mixed Greens', 'Grilled Chicken', 'Cucumber', 'Olive Oil'] },
    { name: 'Quinoa & Chickpea Bowl', type: 'Vegan', ingredients: ['Quinoa', 'Chickpeas', 'Kale', 'Tahini Dressing'] },
    { name: 'Turkey Wrap', type: 'Standard', ingredients: ['Whole Wheat Wrap', 'Turkey Breast', 'Lettuce', 'Tomato', 'Hummus'] },
    { name: 'Tuna Niçoise Salad', type: 'Standard', ingredients: ['Tuna', 'Boiled Egg', 'Green Beans', 'Olives', 'Lettuce'] },
    { name: 'Tofu Stir-Fry', type: 'Vegan', ingredients: ['Firm Tofu', 'Broccoli', 'Bell Peppers', 'Soy Sauce', 'Brown Rice'] },
    { name: 'Caesar Salad (No Croutons)', type: 'Keto', ingredients: ['Romaine Lettuce', 'Parmesan', 'Chicken Thighs', 'Caesar Dressing'] },
    { name: 'Burrito Bowl', type: 'Vegetarian', ingredients: ['Black Beans', 'Rice', 'Corn', 'Salsa', 'Guacamole'] }
  ],
  dinner: [
    { name: 'Grilled Salmon & Asparagus', type: 'Standard', ingredients: ['Salmon Fillet', 'Asparagus', 'Lemon', 'Quinoa'] },
    { name: 'Steak with Roasted Veggies', type: 'Standard', ingredients: ['Sirloin Steak', 'Brussels Sprouts', 'Sweet Potato'] },
    { name: 'Lentil Shepherd’s Pie', type: 'Vegan', ingredients: ['Lentils', 'Carrots', 'Peas', 'Mashed Potatoes'] },
    { name: 'Zucchini Noodles with Pesto', type: 'Keto', ingredients: ['Zucchini', 'Pesto Sauce', 'Cherry Tomatoes', 'Pine Nuts', 'Chicken'] },
    { name: 'Chicken Stir-Fry', type: 'Standard', ingredients: ['Chicken Breast', 'Snow Peas', 'Carrots', 'Jasmine Rice'] },
    { name: 'Baked Cod with Greens', type: 'Standard', ingredients: ['Cod Fillet', 'Spinach', 'Garlic', 'Butter', 'Wild Rice'] },
    { name: 'Veggie Burger Supreme', type: 'Vegetarian', ingredients: ['Veggie Patty', 'Whole Wheat Bun', 'Sweet Potato Fries', 'Coleslaw'] }
  ]
};

const getMealForDay = (category: 'breakfast' | 'lunch' | 'dinner', dietPref: string, dayIndex: number) => {
  const options = MEAL_DATABASE[category];
  // Filter based on preference
  let filtered = options;
  if (dietPref === 'Vegan') filtered = options.filter(m => m.type === 'Vegan');
  else if (dietPref === 'Vegetarian') filtered = options.filter(m => m.type === 'Vegan' || m.type === 'Vegetarian');
  else if (dietPref === 'Keto') filtered = options.filter(m => m.type === 'Keto' || m.type === 'Standard'); // Fallback to standard for Keto if needed, usually explicit
  else filtered = options.filter(m => m.type === 'Standard' || m.type === 'Vegetarian'); // Standard eats everything mostly

  // If filter implies empty, fallback to all except strict restrictions
  if (filtered.length === 0) filtered = options;

  // Rotate through options based on day index
  return filtered[dayIndex % filtered.length];
};

// Helper: Estimate BF based on visual selection as a fallback
const getVisualBodyFat = (visual: string, gender: Gender | null): number => {
  const isMale = gender === Gender.Male;
  
  switch(visual) {
    case 'low': return isMale ? 8 : 16;
    case 'athletic': return isMale ? 12 : 20;
    case 'average': return isMale ? 18 : 26;
    case 'high': return isMale ? 25 : 32;
    default: return isMale ? 18 : 26;
  }
};

export const calculateResults = (data: UserData): CalculatedStats => {
  // 1. BMI
  const heightM = data.heightCm / 100;
  const bmi = data.weightKg / (heightM * heightM);

  // 2. Body Fat (Hybrid Strategy)
  // Strategy A: US Navy Method (Metric) - High Accuracy if measures are good
  // Strategy B: BMI-based Estimation (Deurenberg Formula) - Good Baseline
  // Strategy C: Visual Selection Adjustment - Fine Tuning
  let bodyFat = 0;
  let navyBodyFat = 0;
  const log10 = Math.log10;
  const gender = data.gender || Gender.Male; // Default to Male if null

  // --- Strategy A: US Navy Method ---
  try {
    if (gender === Gender.Male) {
       // Valid if waist > neck and height > 0
       if (data.waistCm > data.neckCm && data.heightCm > 0 && data.waistCm > 0) {
          // Metric Formula: 86.010 * log10(abdomen - neck) - 70.041 * log10(height) + 36.76
          const abdomenNeck = data.waistCm - data.neckCm;
          navyBodyFat = 86.010 * log10(abdomenNeck) - 70.041 * log10(data.heightCm) + 36.76;
       }
    } else {
       // Valid if waist + hip > neck
       if ((data.waistCm + data.hipCm) > data.neckCm && data.heightCm > 0 && data.waistCm > 0) {
          // Metric Formula: 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
          const waistHipNeck = data.waistCm + data.hipCm - data.neckCm;
          navyBodyFat = 163.205 * log10(waistHipNeck) - 97.684 * log10(data.heightCm) - 78.387;
       }
    }
  } catch (e) {
    navyBodyFat = 0;
  }

  // --- Strategy B: BMI Method (Deurenberg Formula) ---
  // BF% = (1.20 * BMI) + (0.23 * Age) - (10.8 * sex) - 5.4
  // sex: 1 for men, 0 for women
  const sexFactor = gender === Gender.Male ? 1 : 0;
  const bmiBodyFat = (1.20 * bmi) + (0.23 * data.age) - (10.8 * sexFactor) - 5.4;

  // --- Strategy C: Visual Adjustments ---
  const visualBodyFat = getVisualBodyFat(data.visualBf, gender);
  
  // Calculate adjustment based on definition/mirror check (New Question)
  let definitionModifier = 0;
  if (data.definitionLevel === 'six_pack') definitionModifier = -4;
  else if (data.definitionLevel === 'veins') definitionModifier = -6;
  else if (data.definitionLevel === 'top_abs') definitionModifier = -2;
  else if (data.definitionLevel === 'no_abs') definitionModifier = 2;

  // --- DECISION LOGIC ---
  
  // 1. If Navy result is physiologically plausible (e.g., 3% - 60%), prioritize it as it uses actual measurements.
  if (navyBodyFat > 3 && navyBodyFat < 65) {
    bodyFat = navyBodyFat;
    
    // Slight adjustment if they claim to have veins but Navy says they are 20% (bad measurement likely)
    if (data.definitionLevel === 'veins' && bodyFat > 15) bodyFat -= 3;
  } 
  // 2. If Navy failed (e.g. bad inputs/not provided), use BMI method adjusted by Visuals.
  else if (bmiBodyFat > 0) {
     // Start with BMI
     let estimated = bmiBodyFat;
     
     // Adjust for body type (BMI overestimates for muscle, underestimates for fat)
     if (data.bodyType === 'Mesomorph') estimated -= 3;
     if (data.bodyType === 'Ectomorph') estimated -= 2;
     if (data.bodyType === 'Endomorph') estimated += 2;

     // Adjust for definition
     estimated += definitionModifier;

     // Weighted average: 70% Calculated Estimate, 30% Visual selection
     // This ensures user input feels impactful but math keeps it grounded
     bodyFat = (estimated * 0.7) + (visualBodyFat * 0.3);
  } 
  // 3. Last resort: Visual estimate only
  else {
    bodyFat = visualBodyFat + definitionModifier;
  }

  // CLAMPING: Ensure result is never "2%" or "NaN"
  // Men essential fat is ~2-5%, Women ~10-13%. 
  // We set a safe floor of 4% for men, 10% for women.
  const minFat = gender === Gender.Male ? 4 : 10;
  const maxFat = 70;
  
  bodyFat = Math.max(minFat, Math.min(maxFat, bodyFat));


  // 3. BMR (Mifflin-St Jeor)
  let bmr = (10 * data.weightKg) + (6.25 * data.heightCm) - (5 * data.age);
  if (gender === Gender.Male) {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // 4. TDEE
  let activityMultiplier = 1.2;
  switch (data.workIntensity) {
    case 'Sedentary': activityMultiplier = 1.2; break;
    case 'Light Activity': activityMultiplier = 1.375; break;
    case 'Heavy Activity': activityMultiplier = 1.725; break;
    default: activityMultiplier = 1.55;
  }
  // Bonus for workout frequency
  if (data.trainingFrequency === '3-4') activityMultiplier += 0.05;
  if (data.trainingFrequency === '5-7') activityMultiplier += 0.1;
  
  const tdee = Math.round(bmr * activityMultiplier);

  // 5. Macros
  const proteinGrams = Math.round(data.weightKg * 2); 
  const proteinCals = proteinGrams * 4;
  // Adjust fat based on preference slightly
  const fatPercent = data.dietPreference === 'Keto' ? 0.65 : 0.25;
  
  const fatCals = tdee * fatPercent;
  const fatGrams = Math.round(fatCals / 9);
  
  const carbsCals = tdee - proteinCals - fatCals;
  const carbsGrams = Math.max(20, Math.round(carbsCals / 4)); // Ensure at least some carbs unless 0 logic

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    bodyFat: parseFloat(bodyFat.toFixed(1)),
    bmr: Math.round(bmr),
    tdee,
    macros: {
      protein: proteinGrams,
      fat: fatGrams,
      carbs: carbsGrams
    }
  };
};

export const generateDietPlan = (stats: CalculatedStats, dietPref: string): DietPlan[] => {
  const { tdee } = stats;
  const mealCals = Math.round(tdee / 3);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return days.map((dayName, index) => {
    const breakfast = getMealForDay('breakfast', dietPref, index);
    const lunch = getMealForDay('lunch', dietPref, index);
    const dinner = getMealForDay('dinner', dietPref, index);

    return {
      name: dayName,
      meals: [
        {
          type: 'Breakfast',
          name: breakfast.name,
          calories: Math.round(mealCals * 0.8),
          protein: Math.round(stats.macros.protein * 0.2),
          carbs: Math.round(stats.macros.carbs * 0.4),
          fat: Math.round(stats.macros.fat * 0.3),
          ingredients: breakfast.ingredients
        },
        {
          type: 'Lunch',
          name: lunch.name,
          calories: mealCals,
          protein: Math.round(stats.macros.protein * 0.4),
          carbs: Math.round(stats.macros.carbs * 0.3),
          fat: Math.round(stats.macros.fat * 0.35),
          ingredients: lunch.ingredients
        },
        {
          type: 'Dinner',
          name: dinner.name,
          calories: Math.round(mealCals * 1.2),
          protein: Math.round(stats.macros.protein * 0.4),
          carbs: Math.round(stats.macros.carbs * 0.3),
          fat: Math.round(stats.macros.fat * 0.35),
          ingredients: dinner.ingredients
        }
      ]
    };
  });
};

export const generateTrainingPlan = (data: UserData): WorkoutDay[] => {
  const isBeginner = data.experience === 'Newbie';
  const isAdvanced = data.experience === 'Advanced';
  const days = [];

  if (isBeginner) {
    // Full Body 3x a week
    const fullBody = [
      { name: 'Goblet Squats', sets: 3, reps: '12-15' },
      { name: 'Push Ups', sets: 3, reps: 'AMRAP' },
      { name: 'Dumbbell Rows', sets: 3, reps: '12 each' },
      { name: 'Plank', sets: 3, reps: '30-45 sec' }
    ];

    days.push({ day: 'Monday', focus: 'Full Body Strength', exercises: fullBody });
    days.push({ day: 'Wednesday', focus: 'Full Body & Core', exercises: fullBody });
    days.push({ day: 'Friday', focus: 'Full Body Endurance', exercises: fullBody });
  } else if (isAdvanced) {
    // PPL
    days.push({ day: 'Monday', focus: 'Push (Chest/Shoulders/Triceps)', exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-12' },
      { name: 'Overhead Press', sets: 4, reps: '8-12' },
      { name: 'Lateral Raises', sets: 3, reps: '15-20' },
      { name: 'Tricep Extensions', sets: 3, reps: '12-15' }
    ]});
    days.push({ day: 'Tuesday', focus: 'Pull (Back/Biceps)', exercises: [
      { name: 'Pull Ups', sets: 4, reps: 'AMRAP' },
      { name: 'Barbell Rows', sets: 4, reps: '8-12' },
      { name: 'Face Pulls', sets: 3, reps: '15' },
      { name: 'Bicep Curls', sets: 3, reps: '12-15' }
    ]});
    days.push({ day: 'Wednesday', focus: 'Legs & Abs', exercises: [
      { name: 'Squats', sets: 4, reps: '6-10' },
      { name: 'Romanian Deadlifts', sets: 4, reps: '8-12' },
      { name: 'Lunges', sets: 3, reps: '12 each' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '15' }
    ]});
    days.push({ day: 'Friday', focus: 'Upper Body Hypertrophy', exercises: [
      { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12' },
      { name: 'Lat Pulldowns', sets: 4, reps: '10-12' },
      { name: 'Chest Flys', sets: 3, reps: '15' },
      { name: 'Hammer Curls', sets: 3, reps: '12' }
    ]});
  } else {
    // Upper/Lower Split
    days.push({ day: 'Monday', focus: 'Upper Body', exercises: [
      { name: 'Dumbbell Press', sets: 3, reps: '10-12' },
      { name: 'Seated Rows', sets: 3, reps: '10-12' },
      { name: 'Shoulder Press', sets: 3, reps: '10' }
    ]});
    days.push({ day: 'Tuesday', focus: 'Lower Body', exercises: [
      { name: 'Goblet Squats', sets: 3, reps: '12' },
      { name: 'Lunges', sets: 3, reps: '12 each' },
      { name: 'Plank', sets: 3, reps: '60 sec' }
    ]});
    days.push({ day: 'Thursday', focus: 'Full Body', exercises: [
      { name: 'Deadlifts', sets: 3, reps: '8-10' },
      { name: 'Push Ups', sets: 3, reps: 'AMRAP' },
      { name: 'Dumbbell Rows', sets: 3, reps: '12' }
    ]});
  }

  return days;
};

export const generateShoppingList = (dietPlan: DietPlan[]): ShoppingItem[] => {
  const items: ShoppingItem[] = [];
  const seen = new Set();
  
  // Flatten ingredients from ALL days in the plan
  dietPlan.forEach(dayPlan => {
    dayPlan.meals.forEach(meal => {
      meal.ingredients.forEach(ing => {
        const normalized = ing.trim();
        if (!seen.has(normalized)) {
          seen.add(normalized);
          
          let cat = 'Pantry';
          const lower = normalized.toLowerCase();
          if (lower.includes('chicken') || lower.includes('egg') || lower.includes('beef') || lower.includes('tofu') || lower.includes('salmon') || lower.includes('tempeh') || lower.includes('turkey') || lower.includes('cod') || lower.includes('steak') || lower.includes('tuna')) cat = 'Proteins';
          else if (lower.includes('spinach') || lower.includes('broccoli') || lower.includes('tomato') || lower.includes('avocado') || lower.includes('asparagus') || lower.includes('greens') || lower.includes('kale') || lower.includes('pepper') || lower.includes('carrot') || lower.includes('zucchini')) cat = 'Produce';
          else if (lower.includes('milk') || lower.includes('cheese') || lower.includes('yogurt') || lower.includes('butter') || lower.includes('cream')) cat = 'Dairy';
          else if (lower.includes('rice') || lower.includes('oats') || lower.includes('quinoa') || lower.includes('bread') || lower.includes('wrap') || lower.includes('bagel')) cat = 'Grains';
          
          items.push({ name: normalized, category: cat, checked: false });
        }
      });
    });
  });
  
  // Sort items by category then name
  return items.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });
};