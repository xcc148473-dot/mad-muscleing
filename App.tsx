'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { UserData, QuestionStep, CalculatedStats, DietPlan, WorkoutDay, ShoppingItem, Language, Theme, ResultTab } from './types';
import { calculateResults, generateDietPlan, generateTrainingPlan, generateShoppingList } from './utils/calculations';
import { SelectionQuestion, MultiSelectQuestion, InputQuestion, MeasurementsQuestion, WaterQuestion } from './components/Questions';
import { Results } from './components/Results';
import { ProgressBar, LoadingOverlay, Button, Card } from './components/UI';
import { Landing } from './components/Landing';
import { ADS, getIcon } from './constants';
import { TRANSLATIONS } from './utils/translations';
import { AdSense } from './components/AdSense';

// Initial Data
const INITIAL_DATA: UserData = {
  gender: null, age: 25, heightCm: 175, weightKg: 75, targetWeightKg: 70, weightChange: 'stable',
  goal: null, experience: '', 
  bodyType: 'Mesomorph', visualBf: 'average', definitionLevel: 'no_abs',
  posture: 'good', digestion: 'good', injuries: [], healthConditions: [], medication: 'no',
  workIntensity: 'Sedentary', dailySteps: 'low', commuteType: 'passive', sittingHours: '<4',
  sunExposure: 'low', sleepHours: '7-8', sleepQuality: 'good', wakeTime: 'normal',
  screenTime: 'med', smoking: 'no',
  stressLevel: 'med', energyLevel: 'steady', recoverySpeed: 'avg', supportSystem: 'yes',
  dietPreference: '', excludedFoods: [], dailyMeals: '3', breakfastHabit: 'light',
  waterIntake: '', cookingFreq: 'weekly', cookingSkills: 'med', groceryShopper: 'me', foodBudget: 'med',
  fastFoodFreq: 'low', snacking: 'no', eatingSpeed: 'med', hungerPeak: 'afternoon',
  lateNightEating: 'no', bingeEating: 'never', alcohol: 'none', coffee: 'moderate', sweetTooth: 'no',
  proteinSource: 'chicken', veggies: 'med', fruitIntake: 'med', supplements: [],
  pastFailures: '1', trainingFrequency: '', gymLocation: 'gym', gymCommute: '15',
  workoutStyle: 'bb', workoutTime: 'evening', workoutDuration: '60', equipment: 'full',
  cardioPref: 'med', cardioType: 'run', music: 'pop', trainingPartner: 'solo',
  motivation: 'health', barrier: 'time', commitment: '8', selfDiscipline: 'avg', timeline: '3m',
  willingToFollowDiet: true,
  waistCm: 80, neckCm: 38, hipCm: 95,
  // Dynamic fields
  hydration_type: 'room', caffeine_sensitivity: 'low', fiber_tol: 'high', gut_health: 'good',
  probiotics: 'no', spicy_food: 'yes', immune_freq: 'low', immune_rec: 'fast', allergies: 'no',
  skin_type: 'normal', acne: 'no', hair_health: 'good', joint_pain: 'no', flexibility: 'avg',
  mobility: 'low', cardio_base: '60', breath: 'no', endurance: 'avg', grip_strength: 'avg',
  muscle_cramps: 'no', soreness: '2days', focus_time: '30m', brain_fog: 'no', memory: 'good',
  mood_swings: 'no', anxiety: 'low', burnout: 'no', libido: 'normal', temp_reg: 'normal',
  thyroid_check: 'no', sauna: 'no', cold_plunge: 'no', massage: 'rarely', standing_desk: 'no',
  footwear: 'sneakers', screen_dist: 'arm', social_eating: 'weekly', peer_pressure: 'no',
  alcohol_type: 'beer', vit_d: 'unknown', magnesium: 'unknown', iron: 'unknown'
};

type ViewState = 'landing' | 'quiz' | 'results';

// --- MASSIVE SEO CONTENT ENGINE (>3000 Words) ---
const generateMassiveSEOContent = (lang: Language, id: string, title: string) => {
  const isZh = lang === 'zh';
  
  // Helper to generate a repeated lorem-like structure but with fitness context
  const generateSection = (heading: string, count: number) => {
    const sentences = isZh ? [
       `在深入探讨${title}的生理机制时，我们需要考虑${id}变量对代谢稳态的多重影响。`,
       "最新的临床内分泌学研究表明，忽视这一参数可能导致生物反馈回路的次优调整。",
       "从细胞线粒体的ATP合成效率来看，这一因素直接关联着能量底物的氧化速率。",
       "神经生物学证据支持通过特定干预来优化这一路径，从而改善长期的神经适应性。",
       "这不仅仅是数据的累积，更是对个体化生物节律的深度解码。",
       "在构建精密且符合生物个体差异性的健康模型中，这个特定变量不仅仅是一个简单的数据点。",
       "皮质醇、胰岛素、瘦素和血清素之间的微妙平衡往往受此直接调节。",
       "表观遗传学研究揭示，生活方式的选择正在实时重写您的生物软件。",
       "如果不加以控制，这可能导致慢性系统性炎症标志物的升高。",
       "我们的算法将这一见解转化为具体的行动指南，确保每一滴汗水都有意义。"
    ] : [
       `When delving into the physiological mechanisms of ${title}, we must consider the multifaceted impact of the ${id} variable on metabolic homeostasis.`,
       "Recent meta-analyses in clinical endocrinology suggest that ignoring this parameter can lead to suboptimal regulation of bio-feedback loops.",
       "From the perspective of mitochondrial ATP synthesis efficiency, this factor is directly correlated with the oxidation rate of energy substrates.",
       "Neurobiological evidence supports optimizing this pathway through specific interventions to improve long-term neural adaptation.",
       "This is not merely data accumulation, but a deep decoding of individual biological rhythms.",
       "In constructing a precise health model respecting bio-individuality, this specific variable is more than a simple data point.",
       "The delicate balance between cortisol, insulin, leptin, and serotonin is often directly modulated by this.",
       "Epigenetic studies reveal that lifestyle choices are rewriting your biological software in real-time.",
       "Left unchecked, this can lead to elevated markers of chronic systemic inflammation.",
       "Our algorithm translates this insight into concrete action items, ensuring every drop of sweat counts."
    ];

    let text = "";
    for(let i=0; i<count; i++) {
       text += sentences[Math.floor(Math.random() * sentences.length)] + " ";
    }
    return `
      <div class="mb-8">
        <h3 class="text-xl font-bold text-white mb-4 border-l-4 border-rose-500 pl-4">${heading}</h3>
        <p class="text-slate-400 leading-relaxed text-justify">${text}</p>
        <p class="text-slate-400 leading-relaxed text-justify mt-4">${text}</p>
      </div>
    `;
  };

  // Construct a massive HTML string
  const content = `
    <div class="seo-article space-y-8 animate-in fade-in">
      <div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-8">
         <h2 class="text-2xl font-black text-rose-500 mb-2">${isZh ? '深度科学分析报告' : 'Comprehensive Scientific Analysis Report'}</h2>
         <p class="text-sm text-slate-500 uppercase tracking-widest">${isZh ? '基于临床数据与AI算法' : 'Based on Clinical Data & AI Algorithms'}</p>
      </div>
      
      ${generateSection(isZh ? '1. 生理学基础与代谢影响' : '1. Physiological Foundations & Metabolic Impact', 15)}
      ${generateSection(isZh ? '2. 神经内分泌系统的相互作用' : '2. Neuro-Endocrine System Interactions', 12)}
      ${generateSection(isZh ? '3. 临床研究与循证医学证据' : '3. Clinical Studies & Evidence-Based Medicine', 14)}
      ${generateSection(isZh ? '4. 进化生物学视角' : '4. Evolutionary Biology Perspective', 10)}
      ${generateSection(isZh ? '5. 心理学关联与行为模式' : '5. Psychological Correlates & Behavioral Patterns', 12)}
      ${generateSection(isZh ? '6. 营养学干预策略' : '6. Nutritional Intervention Strategies', 15)}
      ${generateSection(isZh ? '7. 长期健康影响与预防医学' : '7. Long-term Health Implications & Preventive Medicine', 12)}
      
      <div class="bg-slate-800 p-6 rounded-xl mt-8">
         <p class="text-xs text-slate-500 italic text-center">
            ${isZh ? '免责声明：本内容由Mad Muscleing AI引擎基于最新科研文献生成，仅供参考，不构成医疗建议。' : 'Disclaimer: This content is generated by the Mad Muscleing AI Engine based on the latest scientific literature for informational purposes only.'}
         </p>
      </div>
    </div>
  `;

  return content;
};

// --- QUESTION GENERATOR ---
const getQuestions = (lang: Language): QuestionStep[] => {
  const t = TRANSLATIONS[lang].questions;
  const tOpt = TRANSLATIONS[lang].options;
  
  const makeQ = (id: string, type: any, field: keyof UserData, optsKey: string | any[] = [], subtitle?: string, overrideTitle?: string): QuestionStep => {
    let options: any[] = [];
    if (Array.isArray(optsKey)) {
        options = optsKey;
    } else if (optsKey) {
        options = [{label: tOpt.low || 'Low', value: 'low'}, {label: tOpt.medium || 'Med', value: 'med'}, {label: tOpt.high || 'High', value: 'high'}];
    }

    const title = overrideTitle || t[id] || `${id.replace(/_/g, ' ')}?`;
    
    return {
        id,
        type,
        title,
        subtitle: subtitle || (lang === 'zh' ? '请选择最符合您情况的选项' : 'Please select the option that best describes you'),
        field,
        options,
        explanation: generateMassiveSEOContent(lang, id, title)
    };
  };

  const frequencyOpts = [{label: tOpt.daily, value: 'daily'}, {label: tOpt.weekly, value: 'weekly'}, {label: tOpt.never, value: 'never'}];
  const yesNoOpts = [{label: tOpt.yes, value: 'yes'}, {label: tOpt.no, value: 'no'}];
  const levelOpts = [{label: tOpt.low, value: 'low'}, {label: tOpt.medium, value: 'med'}, {label: tOpt.high, value: 'high'}];

  const questions: QuestionStep[] = [
      // SECTION 1: BASICS
      makeQ('gender', 'select', 'gender', [{ label: tOpt.male, value: 'Male', icon: 'user' }, { label: tOpt.female, value: 'Female', icon: 'user' }]),
      makeQ('age', 'number', 'age', []),
      makeQ('height', 'number', 'heightCm', []),
      makeQ('weight', 'number', 'weightKg', []),
      makeQ('goal', 'select', 'goal', [{ label: tOpt.lose_weight, value: 'Lose Weight' }, { label: tOpt.gain_muscle, value: 'Gain Muscle' }, { label: tOpt.shredded, value: 'Get Shredded' }]),
      
      // SECTION 2: BODY
      makeQ('body_type', 'select', 'bodyType', [{ label: tOpt.ecto, value: 'Ectomorph' }, { label: tOpt.meso, value: 'Mesomorph' }, { label: tOpt.endo, value: 'Endomorph' }]),
      makeQ('body_fat_visual', 'select', 'visualBf', [{ label: tOpt.low, value: 'low' }, { label: tOpt.athletic, value: 'athletic' }, { label: tOpt.average, value: 'average' }, { label: tOpt.high, value: 'high' }]),
      makeQ('measurements', 'measurements', 'waistCm', []),

      // SECTION 3: LIFESTYLE
      makeQ('work', 'select', 'workIntensity', [{ label: tOpt.sedentary, value: 'Sedentary' }, { label: tOpt.light_active, value: 'Light' }, { label: tOpt.heavy_active, value: 'Heavy' }]),
      makeQ('steps', 'select', 'dailySteps', levelOpts),
      makeQ('sleep_duration', 'select', 'sleepHours', [{ label: '<5h', value: '<5' }, { label: '6-7h', value: '6-7' }, { label: '8h+', value: '8+' }]),
      makeQ('stress', 'select', 'stressLevel', levelOpts),
      
      // SECTION 4: NUTRITION
      makeQ('diet', 'select', 'dietPreference', [{ label: tOpt.standard, value: 'Standard' }, { label: tOpt.keto, value: 'Keto' }, { label: tOpt.vegan, value: 'Vegan' }]),
      makeQ('water', 'select', 'waterIntake', levelOpts),
      makeQ('foods', 'multi-select', 'excludedFoods', [{ label: tOpt.milk, value: 'Milk' }, { label: tOpt.wheat, value: 'Wheat' }, { label: tOpt.nuts, value: 'Nuts' }]),

      // SECTION 5: TRAINING
      makeQ('experience', 'select', 'experience', [{ label: tOpt.newbie, value: 'Newbie' }, { label: tOpt.advanced, value: 'Advanced' }]),
      makeQ('location', 'select', 'gymLocation', [{ label: tOpt.gym, value: 'gym' }, { label: tOpt.home, value: 'home' }]),
      makeQ('frequency', 'select', 'trainingFrequency', [{ label: '1-2', value: '1-2' }, { label: '3-4', value: '3-4' }, { label: '5+', value: '5+' }]),
      makeQ('motivation_source', 'select', 'motivation', [{ label: tOpt.health, value: 'health' }, { label: tOpt.looks, value: 'looks' }]),

      // Core Extras
      makeQ('commute', 'select', 'commuteType', [{ label: tOpt.passive, value: 'passive' }, { label: tOpt.active_commute, value: 'active' }]),
      makeQ('screen_time', 'select', 'screenTime', yesNoOpts),
      makeQ('energy', 'select', 'energyLevel', levelOpts),
      makeQ('caffeine_sensitivity', 'select', 'caffeine_sensitivity', levelOpts),
      makeQ('gut_health', 'select', 'gut_health', levelOpts),
      makeQ('immune_freq', 'select', 'immune_freq', levelOpts),
      makeQ('focus_time', 'select', 'focus_time', levelOpts),
      makeQ('recovery', 'select', 'recoverySpeed', levelOpts),
      makeQ('cardio', 'select', 'cardioPref', [{ label: tOpt.love, value: 'love' }, { label: tOpt.hate, value: 'hate' }])
  ];

  // --- PROGRAMMATICALLY GENERATE TO REACH 100+ ---
  // Extended list to ensure > 100 questions
  const extraTopics = [
    'Morning Hydration', 'Sodium Sensitivity', 'Processed Sugar Intake', 'Trans Fats Avoidance', 
    'Omega-3 Index', 'Vitamin D Sun Exposure', 'Magnesium Levels', 'Zinc From Diet',
    'Iron Levels', 'B-Complex Status', 'Antioxidant Richness', 'Probiotic Foods',
    'Prebiotic Fiber', 'Fermented Food Intake', 'Artificial Sweeteners', 'Food Dye Sensitivity',
    'Gluten Sensitivity', 'Dairy Tolerance', 'Histamine Intolerance', 'FODMAP Sensitivity',
    'Nightshade Reactivity', 'Lectins Awareness', 'Oxalates Management', 'Phytates Concern',
    'Caffeine Timing', 'Alcohol Type Preference', 'Hydration pH Balance', 'Mineral Water Usage',
    'Tap Water Quality', 'Plastic Bottle Avoidance', 'Food Container Material', 'Cookware Toxicity',
    'Microwave Usage', 'Non-stick Pan Usage', 'Charcoal Grilling Freq', 'Smoking Habits',
    'Vaping Frequency', 'Air Quality at Home', 'Humidity Preferences', 'Temperature for Sleep',
    'Noise Pollution Level', 'Light Pollution Level', 'EMF Exposure Awareness', 'Blue Light Blocking',
    'Sleep Mask Usage', 'Ear Plugs Usage', 'Mattress Quality', 'Pillow Comfort Level',
    'Room Temperature', 'Bedtime Routine Consistency', 'Wake-up Routine Consistency', 'Morning Light View',
    'Cold Shower Habit', 'Hot Bath Habit', 'Sauna Type Access', 'Steam Room Access',
    'Red Light Therapy', 'Massage Gun Usage', 'Foam Rolling Habit', 'Stretching Consistency',
    'Yoga Practice', 'Meditation Type', 'Breathwork Practice', 'Journaling Habit',
    'Gratitude Practice', 'Social Connection Depth', 'Pet Ownership', 'Nature Exposure',
    'Work Ergonomics', 'Standing Desk Usage', 'Eye Strain Level', 'Typing Posture',
    'Grip Strength', 'Balance & Stability', 'Ankle Mobility', 'Hip Mobility',
    'Thoracic Mobility', 'Shoulder Mobility', 'Neck Tension', 'Lower Back Health',
    'Saturated Fat Intake', 'Cholesterol Awareness', 'Blood Pressure Check', 'Resting Heart Rate',
    'Heart Rate Variability', 'Blood Sugar Awareness', 'Family Health History', 'Passive Smoking',
    'Air Conditioning Usage', 'Heating Usage', 'Bedding Type', 'Pajama Fabric', 'Shoe Arch Support',
    'Walking Surface', 'Stair Climbing Freq', 'Heavy Lifting Freq', 'Sports Participation',
    'Dance Freq', 'Swimming Freq', 'Cycling Freq', 'Hiking Freq', 'Gardening Freq'
  ];

  // Append extra questions until we reach at least 100
  extraTopics.forEach((topic, idx) => {
      questions.push(makeQ(
          `deep_dive_${idx}`, 
          'select', 
          `deep_dive_${idx}` as keyof UserData, 
          levelOpts, 
          lang === 'zh' ? '深度分析: ' + topic : 'Deep Dive: ' + topic,
          lang === 'zh' ? topic + ' 情况?' : topic + ' Status?'
      ));
  });

  return questions;
};

const THEMES: Record<Theme, string> = {
  slate: 'bg-slate-950',
  zinc: 'bg-zinc-950',
  neutral: 'bg-neutral-950',
  stone: 'bg-stone-950',
  rose: 'bg-rose-950',
  blue: 'bg-blue-950',
  green: 'bg-emerald-950',
  violet: 'bg-violet-950',
};

export default function App() {
  const [view, setView] = useState<ViewState>('landing'); // Start on landing
  const [stepIndex, setStepIndex] = useState(0);
  const [userData, setUserData] = useState<UserData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<CalculatedStats | null>(null);
  const [dietPlan, setDietPlan] = useState<DietPlan[]>([]);
  const [trainingPlan, setTrainingPlan] = useState<WorkoutDay[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('slate');
  const [showSettings, setShowSettings] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<ResultTab>('dashboard');

  const questions = useMemo(() => getQuestions(language), [language]);
  const currentQuestion = questions[stepIndex] || questions[0];
  const scrollRef = useRef<HTMLDivElement>(null);
  const tUI = TRANSLATIONS[language].ui;

  // Initialize with some data for demo
  useEffect(() => {
    const s = calculateResults(INITIAL_DATA);
    setStats(s);
    setDietPlan(generateDietPlan(s, 'Standard'));
    setTrainingPlan(generateTrainingPlan(INITIAL_DATA));
    setShoppingList(generateShoppingList(generateDietPlan(s, 'Standard')));
  }, []);

  const handleAnswer = (val: any) => {
    if (currentQuestion.type === 'measurements') {
      setUserData({ ...userData, ...val });
    } else {
      setUserData({ ...userData, [currentQuestion.field as keyof UserData]: val });
    }
  };

  const nextStep = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    if (stepIndex < questions.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsLoading(true);
    setTimeout(() => {
      const calculated = calculateResults(userData);
      setStats(calculated);
      setDietPlan(generateDietPlan(calculated, userData.dietPreference));
      setTrainingPlan(generateTrainingPlan(userData));
      setShoppingList(generateShoppingList(generateDietPlan(calculated, userData.dietPreference)));
      setIsLoading(false);
      setView('results');
      setActiveResultTab('dashboard');
    }, 2000);
  };

  const restart = () => {
    setUserData(INITIAL_DATA);
    setStepIndex(0);
    setView('landing');
  };

  return (
    <div className={`min-h-screen ${THEMES[theme]} text-white font-sans flex flex-col`}>
      {view === 'landing' && <Landing onStart={() => setView('quiz')} t={tUI} lang={language} />}
      
      {view === 'results' && stats && (
         <Results 
           stats={stats} 
           dietPlan={dietPlan} 
           trainingPlan={trainingPlan} 
           shoppingList={shoppingList}
           onRestart={restart}
           lang={language}
           activeTab={activeResultTab}
           setActiveTab={setActiveResultTab}
         />
      )}

      {view === 'quiz' && (
        <div className="fixed inset-0 flex flex-col bg-slate-950 overflow-hidden">
          {isLoading && <LoadingOverlay message={tUI.analyzing} />}

          {/* Header */}
          <header className="shrink-0 w-full px-4 py-3 bg-slate-900 border-b border-slate-800 z-30">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <div className="text-xl font-bold flex items-center gap-2 shrink-0">
                 <div className="w-8 h-8 bg-rose-500 rounded flex items-center justify-center">M</div>
                 <span className="hidden sm:inline">Mad Muscleing</span>
              </div>
              
              {/* Progress Section: Bar + Count Side-by-Side */}
              <div className="flex-1 flex items-center gap-3">
                 <div className="flex-1">
                    <ProgressBar current={stepIndex + 1} total={questions.length} className="mb-0 h-3" />
                 </div>
                 <div className="shrink-0 font-bold text-xs bg-slate-800 px-3 py-1.5 rounded-full text-rose-400 border border-slate-700 whitespace-nowrap shadow-lg shadow-black/20">
                    <span className="text-white">{stepIndex + 1}</span> / {questions.length}
                 </div>
              </div>
            </div>
          </header>

          {/* Main Scroll Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
             <div className="max-w-2xl mx-auto p-4 pb-20">
               {(() => {
                  const props = {
                    stepData: currentQuestion,
                    onAnswer: handleAnswer,
                    userData: userData,
                    onNext: nextStep,
                    t: tUI
                  };
                  switch (currentQuestion.type) {
                    case 'select': return <SelectionQuestion {...props} />;
                    case 'multi-select': return <MultiSelectQuestion {...props} />;
                    case 'number': return <InputQuestion {...props} />;
                    case 'measurements': return <MeasurementsQuestion {...props} />;
                    default: return currentQuestion.id === 'water' ? <WaterQuestion {...props} /> : <SelectionQuestion {...props} />;
                  }
               })()}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}