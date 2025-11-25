import React, { useState } from 'react';
import { CalculatedStats, DietPlan, WorkoutDay, ShoppingItem, Language, ResultTab } from '../types';
import { AnimatedNumber, Button, Card } from './UI';
import { getIcon, ADS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TRANSLATIONS } from '../utils/translations';
import { RESULTS_CONTENT } from '../utils/resultsContent';
import { AdSense } from './AdSense';

interface ResultsProps {
  stats: CalculatedStats;
  dietPlan: DietPlan[];
  trainingPlan: WorkoutDay[];
  shoppingList: ShoppingItem[];
  onRestart: () => void;
  lang: Language;
  activeTab: ResultTab;
  setActiveTab: (tab: ResultTab) => void;
}

// --- NEW COMPONENT FOR DEEP DIVE TEXT ---
const DeepDiveSection: React.FC<{ type: ResultTab; lang: Language }> = ({ type, lang }) => {
  // Fallback to EN if language not explicitly handled in full depth yet
  const content = RESULTS_CONTENT[lang]?.[type] || RESULTS_CONTENT['en'][type];

  if (!content) return null;

  return (
    <div className="mt-8 mb-8 animate-slide-up">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px bg-slate-800 flex-1"></div>
        <span className="text-rose-500 font-black tracking-widest uppercase text-xs">Deep Dive Analysis</span>
        <div className="h-px bg-slate-800 flex-1"></div>
      </div>

      <div className="space-y-12">
        {content.map((section, idx) => (
          <div key={idx} className="prose prose-invert max-w-none">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">
              {section.title}
            </h3>
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg font-light tracking-wide">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="border-l-2 border-slate-800 pl-4 hover:border-rose-500/50 transition-colors duration-500">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative End Element */}
      <div className="mt-12 flex justify-center opacity-30">
        <div className="w-2 h-2 rounded-full bg-rose-500 mx-1"></div>
        <div className="w-2 h-2 rounded-full bg-rose-500 mx-1"></div>
        <div className="w-2 h-2 rounded-full bg-rose-500 mx-1"></div>
      </div>
    </div>
  );
};

// --- HORIZONTAL AD COMPONENT (Reusable) ---
// Ensures ads are horizontal and not tall, refreshing on key change
const HorizontalAd = ({ id }: { id: string }) => (
  <div className="w-full my-8 animate-slide-up flex justify-center">
     <div className="w-full flex justify-center bg-slate-900/20 rounded-xl overflow-hidden">
       <AdSense 
          key={id} 
          slot="88888888" // Replace with real slot
          format="horizontal" 
          label="Sponsored" 
          style={{ minHeight: '120px', width: '100%', maxHeight: '280px' }}
       />
     </div>
  </div>
);

export const Results: React.FC<ResultsProps> = ({ 
  stats, 
  dietPlan, 
  trainingPlan, 
  shoppingList, 
  onRestart, 
  lang,
  activeTab,
  setActiveTab
}) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [openDay, setOpenDay] = useState<string | null>(trainingPlan[0]?.day || null);
  const [activeMealDayIndex, setActiveMealDayIndex] = useState(0);

  const t = TRANSLATIONS[lang].ui;

  const toggleItem = (name: string) => {
    const next = new Set(checkedItems);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setCheckedItems(next);
  };

  const macroData = [
    { name: t.protein, value: stats.macros.protein, color: '#f43f5e' },
    { name: t.fat, value: stats.macros.fat, color: '#fbbf24' },
    { name: t.carbs, value: stats.macros.carbs, color: '#6366f1' },
  ];

  // Determine Body Fat Color
  let bfColor = 'text-green-500';
  if (stats.bodyFat > 25) bfColor = 'text-yellow-500';
  if (stats.bodyFat > 32) bfColor = 'text-red-500';

  const renderDashboard = () => (
    <div className="space-y-6 animate-slide-up pb-20">
       {/* TOP AD SLOT */}
       <HorizontalAd id={`dash-top-${activeTab}`} />

      {/* Body Composition Card */}
      <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-900/50 border border-slate-700">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-slate-400 text-sm uppercase tracking-wider font-bold">{t.bodyFat}</h3>
            <div className={`text-5xl font-black mt-2 ${bfColor} drop-shadow-md`}>
              <AnimatedNumber value={stats.bodyFat} suffix="%" />
            </div>
          </div>
          <div className="bg-slate-800 p-3 rounded-xl text-rose-500 shadow-inner shadow-black/20">
            {getIcon('activity', 32)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Athlete</span>
            <span>Average</span>
            <span>High</span>
          </div>
          <div className="h-2 bg-slate-950 rounded-full overflow-hidden relative border border-slate-700">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 opacity-50"></div>
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white] transition-all duration-1000"
              style={{ left: `${Math.min(100, (stats.bodyFat / 40) * 100)}%` }}
            ></div>
          </div>
        </div>
      </Card>

      {/* Daily Calories */}
      <div className="grid grid-cols-2 gap-4">
         <Card className="p-4 flex flex-col items-center justify-center bg-orange-900/10 border-orange-900/30">
            <span className="text-orange-500 mb-2">{getIcon('scale', 24)}</span>
            <span className="text-3xl font-black text-white"><AnimatedNumber value={stats.tdee} /></span>
            <span className="text-xs font-bold text-slate-400 uppercase">{t.dailyCalories}</span>
         </Card>
         <Card className="p-4 flex flex-col items-center justify-center bg-blue-900/10 border-blue-900/30">
            <span className="text-blue-500 mb-2">{getIcon('droplets', 24)}</span>
            <span className="text-3xl font-black text-white">2.5L</span>
            <span className="text-xs font-bold text-slate-400 uppercase">{t.waterTarget}</span>
         </Card>
      </div>

      {/* Macros Chart */}
      <Card className="p-6 border-slate-800">
        <h3 className="font-bold text-lg mb-4 text-white">{t.macros}</h3>
        {/* Fixed height container to prevent Recharts width(-1) error */}
        <div className="h-[200px] w-full flex items-center relative">
          <div className="w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 space-y-3 pl-4">
             {macroData.map((m) => (
               <div key={m.name} className="flex items-center justify-between text-sm">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: m.color, color: m.color }}></div>
                   <span className="text-slate-400">{m.name}</span>
                 </div>
                 <span className="font-bold text-white">{m.value}g</span>
               </div>
             ))}
          </div>
        </div>
      </Card>

      {/* BOTTOM AD SLOT - MOVED UP ABOVE DEEP DIVE */}
      <HorizontalAd id={`dash-bot-${activeTab}`} />

      {/* INJECT DEEP DIVE CONTENT */}
      <DeepDiveSection type="dashboard" lang={lang} />
    </div>
  );

  const renderMeals = () => {
    const activePlan = dietPlan[activeMealDayIndex] || dietPlan[0];

    // Helper to translate day names
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    // const activeDayName = days[activeMealDayIndex];

    return (
      <div className="space-y-6 animate-slide-up pb-20">
        {/* TOP AD SLOT */}
        <HorizontalAd id={`meals-top-${activeTab}`} />

        {/* Day Selector */}
        <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
           {dietPlan.map((day, idx) => (
             <button
               key={day.name}
               onClick={() => setActiveMealDayIndex(idx)}
               className={`
                 whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all border
                 ${activeMealDayIndex === idx 
                   ? 'bg-rose-500 text-white border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
                   : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-rose-500/50 hover:text-white'}
               `}
             >
               {/* Simple Logic for Day Initials as a fallback translation */}
               {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]} - {idx + 1}
             </button>
           ))}
        </div>

        <div className="space-y-6">
          {activePlan.meals.map((meal, idx) => (
            <Card key={idx} className="p-0 overflow-hidden border-slate-800 bg-slate-900">
              <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
                  <span className="font-bold text-rose-500 uppercase text-sm">{meal.type}</span>
                  <span className="font-bold text-white">{meal.calories} kcal</span>
              </div>
              <div className="p-6">
                <div className="flex gap-4 mb-4">
                  <div className="bg-slate-950 p-3 rounded-xl h-fit border border-slate-800 text-rose-500">
                    {getIcon('utensils', 24)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white leading-tight mb-1">{meal.name}</h4>
                    <p className="text-xs text-slate-500">High Protein • {meal.protein}g {t.protein}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {meal.ingredients.map(ing => (
                    <span key={ing} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-700">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* BOTTOM AD SLOT - MOVED UP ABOVE DEEP DIVE */}
        <HorizontalAd id={`meals-bot-${activeTab}`} />

        {/* INJECT DEEP DIVE CONTENT */}
        <DeepDiveSection type="meals" lang={lang} />
      </div>
    );
  };

  const renderTraining = () => (
    <div className="space-y-4 animate-slide-up pb-20">
      {/* TOP AD SLOT */}
      <HorizontalAd id={`train-top-${activeTab}`} />

      {trainingPlan.map((day) => (
        <Card key={day.day} className={`overflow-hidden transition-all duration-300 ${openDay === day.day ? 'border-rose-500/50 bg-slate-800' : 'border-slate-800 bg-slate-900'}`}>
           <div 
             onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
             className="p-4 flex items-center justify-between cursor-pointer"
           >
             <div className="flex items-center gap-4">
               <div className={`p-2 rounded-lg ${openDay === day.day ? 'bg-rose-500 text-white' : 'bg-slate-950 text-slate-400'}`}>
                 {getIcon('dumbbell', 20)}
               </div>
               <div>
                 <h4 className="font-bold text-white">{day.day}</h4>
                 <p className="text-xs text-slate-400">{day.focus}</p>
               </div>
             </div>
             <div className={`transition-transform duration-300 ${openDay === day.day ? 'rotate-90' : ''} text-slate-500`}>
               {getIcon('arrow-right', 16)}
             </div>
           </div>
           
           {openDay === day.day && (
             <div className="px-4 pb-4 pt-0 animate-slide-up">
               <div className="h-px w-full bg-slate-700 my-2"></div>
               <div className="space-y-3 mt-3">
                 {day.exercises.map((ex, i) => (
                   <div key={i} className="flex justify-between items-center text-sm">
                      <span className="text-slate-200 font-medium">{ex.name}</span>
                      <div className="text-slate-400 flex gap-2 text-xs">
                        <span className="bg-slate-950 px-2 py-1 rounded border border-slate-700">{ex.sets} Sets</span>
                        <span className="bg-slate-950 px-2 py-1 rounded border border-slate-700">{ex.reps}</span>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
           )}
        </Card>
      ))}

      {/* BOTTOM AD SLOT - MOVED UP ABOVE DEEP DIVE */}
      <HorizontalAd id={`train-bot-${activeTab}`} />

      {/* INJECT DEEP DIVE CONTENT */}
      <DeepDiveSection type="training" lang={lang} />
    </div>
  );

  const renderShopping = () => {
    const categories = Array.from(new Set(shoppingList.map(i => i.category))).sort();
    
    return (
      <div className="space-y-6 animate-slide-up pb-20">
        {/* TOP AD SLOT */}
        <HorizontalAd id={`shop-top-${activeTab}`} />

        <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/30 text-rose-200 text-sm mb-4">
          <p className="font-bold flex items-center gap-2">
            {getIcon('shopping', 16)}
            {t.fullWeekList}
          </p>
        </div>

        {categories.map(cat => (
          <div key={cat}>
             <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">{cat}</h3>
             <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                {shoppingList.filter(i => i.category === cat).map(item => (
                  <div 
                    key={item.name} 
                    onClick={() => toggleItem(item.name)}
                    className="flex items-center p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800 cursor-pointer group transition-colors"
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${checkedItems.has(item.name) ? 'bg-rose-500 border-rose-500' : 'border-slate-600 group-hover:border-rose-400'}`}>
                       {checkedItems.has(item.name) && getIcon('check', 14, 'text-white')}
                    </div>
                    <span className={`text-sm font-medium transition-all ${checkedItems.has(item.name) ? 'text-slate-500 line-through' : 'text-white'}`}>
                      {item.name}
                    </span>
                  </div>
                ))}
             </div>
          </div>
        ))}

        {/* BOTTOM AD SLOT - MOVED UP ABOVE DEEP DIVE */}
        <HorizontalAd id={`shop-bot-${activeTab}`} />

        {/* INJECT DEEP DIVE CONTENT */}
        <DeepDiveSection type="shopping" lang={lang} />
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 relative bg-slate-950">
      {/* Sticky Tab Navigation */}
      <div className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 mb-6 shadow-md">
        <div className="flex justify-around items-center p-2 max-w-md mx-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === 'dashboard' ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {getIcon('dashboard', 20)}
            <span className="text-[10px] font-bold mt-1">{t.overview}</span>
          </button>
          <button 
            onClick={() => setActiveTab('meals')}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === 'meals' ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {getIcon('utensils', 20)}
            <span className="text-[10px] font-bold mt-1">{t.meals}</span>
          </button>
          <button 
            onClick={() => setActiveTab('training')}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === 'training' ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {getIcon('dumbbell', 20)}
            <span className="text-[10px] font-bold mt-1">{t.workout}</span>
          </button>
          <button 
            onClick={() => setActiveTab('shopping')}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === 'shopping' ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {getIcon('shopping', 20)}
            <span className="text-[10px] font-bold mt-1">{t.list}</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid with Sidebars */}
      <div className="flex justify-center items-start gap-6 px-4 w-full max-w-[1600px] mx-auto">
        
        {/* Left Sidebar - Desktop Only (300x250 Ads) - Changed from xl:flex to lg:flex for broader visibility */}
        <div className="hidden lg:flex flex-col gap-4 sticky top-24 shrink-0 w-[300px]">
           <div className="text-center text-xs text-slate-600 font-bold uppercase tracking-widest mb-2">Advertisement</div>
           <div className="rounded-xl overflow-hidden border border-slate-800/50 shadow-xl bg-slate-900">
             <AdSense 
               slot="LEFT_SIDE_1" 
               format="rectangle" 
               responsive={false} 
               style={{width:'300px', height:'250px'}} 
             />
           </div>
           
           <div className="rounded-xl overflow-hidden border border-slate-800/50 shadow-xl bg-slate-900 mt-4">
             <AdSense 
               slot="LEFT_SIDE_2" 
               format="rectangle" 
               responsive={false} 
               style={{width:'300px', height:'250px'}} 
             />
           </div>
        </div>

        {/* Center Content Area - Constrained Width */}
        <div className="flex-1 w-full max-w-xl min-w-0">
            <div className="mb-6 text-center lg:text-left">
              <h1 className="text-3xl font-black text-white capitalize tracking-tight">{t[activeTab]}</h1>
              <p className="text-slate-400 text-sm">Your personalized blueprint</p>
            </div>
            
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'meals' && renderMeals()}
            {activeTab === 'training' && renderTraining()}
            {activeTab === 'shopping' && renderShopping()}
        </div>

        {/* Right Sidebar - Desktop Only (300x250 Ads) - Changed from xl:flex to lg:flex */}
        <div className="hidden lg:flex flex-col gap-4 sticky top-24 shrink-0 w-[300px]">
           <div className="text-center text-xs text-slate-600 font-bold uppercase tracking-widest mb-2">Advertisement</div>
           <div className="rounded-xl overflow-hidden border border-slate-800/50 shadow-xl bg-slate-900">
             <AdSense 
               slot="RIGHT_SIDE_1" 
               format="rectangle" 
               responsive={false} 
               style={{width:'300px', height:'250px'}} 
             />
           </div>

           <div className="rounded-xl overflow-hidden border border-slate-800/50 shadow-xl bg-slate-900 mt-4">
             <AdSense 
               slot="RIGHT_SIDE_2" 
               format="rectangle" 
               responsive={false} 
               style={{width:'300px', height:'250px'}} 
             />
           </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 z-50">
        <div className="max-w-md mx-auto flex gap-4">
           <Button variant="outline" className="flex-1" onClick={onRestart}>{t.reset}</Button>
           <Button className="flex-[2]">{t.savePdf}</Button>
        </div>
      </div>
    </div>
  );
};