
import React from 'react';
import { Button, Card } from './UI';
import { getIcon, ADS } from '../constants';
import { Language } from '../types';
import { LANDING_CONTENT } from '../utils/landingContent';
import { AdSense } from './AdSense';

interface LandingProps {
  onStart: () => void;
  t?: any; // Translation object
  lang: Language;
}

const SEO_KEYWORDS = [
  // Core Identity
  "Mad Muscleing", "AI Fitness Coach", "Personalized Fitness Plan", "Custom Workout Plan", 
  "Custom Diet Plan", "Body Transformation Program", "Fitness Quiz", "Workout Routine Generator",
  
  // High Volume / General
  "Weight Loss Plan", "Muscle Building Program", "Fat Loss Program", "Home Workout Program",
  "Gym Workout Program", "Calorie Calculator", "Macros Calculator", "Body Fat Calculator",
  "Meal Plan Generator", "Diet Plan Generator", "Online Personal Trainer", "Fitness Assessment",
  
  // Specific Workouts
  "Push Pull Legs Workout", "Full Body Workout Plan", "30 Day Workout Plan", "HIIT Workout Plan",
  "Bodyweight Exercises", "Home Workout No Equipment", "Dumbbell Workout at Home", "Beginner Chest Workout",
  "Home Abs Workout", "Leg Workout for Mass", "Glute Workout at Home", "Shoulder Workout Routine",
  
  // Nutrition & Diet
  "Calorie Deficit Plan", "Macro Meal Planner", "High Protein Meal Plan", "Keto Diet Menu",
  "Intermittent Fasting Guide", "Clean Eating Meal Plan", "Meal Prep Ideas", "Healthy Recipes for Weight Loss",
  "Protein Intake for Muscle Gain", "Carb Cycling for Fat Loss", "Bulking Meal Plan", "Cutting Meal Plan",
  
  // Specific Goals
  "How to Lose Belly Fat", "Get Shredded Fast", "Body Recomposition Plan", "Skinny Fat Workout Plan",
  "Post Pregnancy Weight Loss", "Fitness for Busy Professionals", "Lose 10 Pounds in a Month",
  "Build Muscle at Home", "Strength Training for Beginners", "Hypertrophy Training Program",
  
  // Tools & Analysis
  "Daily Protein Calculator", "TDEE Calculator", "BMI Calculator", "Body Type Quiz",
  "Metabolic Age Calculator", "Ideal Weight Calculator", "Water Intake Calculator", "Sleep Quality Tracker",
  
  // Comparisons & Alternatives
  "Mad Muscles Alternative", "BetterMe Alternative", "Fitbod Alternative", "Free Workout App",
  "Best Fitness App 2025", "AI Nutrition Coach", "Free Meal Planner", "Workout Planner App",
  
  // Niche & Long Tail
  "Endomorph Diet Plan", "Mesomorph Workout Plan", "Ectomorph Bulking Guide", "Low Impact Cardio",
  "Quiet Home Workout", "Apartment Friendly Workout", "Knee Friendly Exercises", "Back Pain Exercises",
  "Posture Correction Exercises", "Mobility Routine for Lifters", "Stretching Routine for Beginners",
  
  // Lifestyle & Habits
  "Fitness Motivation", "Workout Consistency Tips", "Healthy Grocery List", "Budget Meal Prep",
  "Student Meal Plan", "Office Worker Diet", "Travel Workout Routine", "Hotel Room Workout",
  
  // Questions
  "How much protein do I need", "How many calories to lose weight", "Best time to workout",
  "Pre workout meal ideas", "Post workout recovery", "Supplements for weight loss",
  "Creatine benefits", "Whey protein vs plant protein", "Is cardio necessary for fat loss",

  // --- NEW EXPANDED KEYWORDS ---
  
  // Muscle Specific Isolation
  "Lower Chest Workout", "Upper Chest Exercises", "V-Taper Workout", "Wide Back Exercises",
  "Tricep Isolation Exercises", "Bicep Peak Workout", "Forearm Strength Training", "Calf Growth Secrets",
  "Hamstring Curls at Home", "Quad Sweep Exercises", "Rear Delt Flys", "Trap Workout",
  "Inner Chest Workout", "Side Booty Exercises", "Lower Abs Workout", "Oblique Exercises",

  // Equipment Specific
  "Kettlebell Swing Benefits", "Resistance Band Full Body", "TRX Suspension Training", "Smith Machine Squats",
  "Cable Machine Workouts", "Medicine Ball Exercises", "Sandbag Training", "Jump Rope Cardio",
  "Pull Up Bar Exercises", "Dip Station Workout", "Landmine Press", "Battle Ropes Circuit",

  // Advanced Training Concepts
  "Time Under Tension", "Mind Muscle Connection", "Drop Sets vs Super Sets", "Rest Pause Training",
  "German Volume Training", "5x5 Workout Program", "Wendler 5/3/1 Calculator", "Linear Periodization",
  "Undulating Periodization", "Deload Week Strategy", "RPE Scale Explained", "One Rep Max Calculator",
  "Eccentric Training", "Isometric Holds", "Plyometric Training", "Explosive Power Training",

  // Supplements & Biohacking
  "Casein Protein before Bed", "BCAA vs EAA", "Beta Alanine Tingles", "Citrulline Malate Dosage",
  "Fish Oil for Joints", "Multivitamin for Bodybuilders", "ZMA for Sleep", "Turmeric for Inflammation",
  "Ashwagandha for Cortisol", "Digestive Enzymes for Bloating", "Glutamine for Recovery", "L-Carnitine Fat Loss",
  "Pre Workout Side Effects", "Non Stim Pre Workout", "Electrolytes for Fasting",

  // Special Populations & Conditions
  "Fitness over 40", "Fitness over 50", "Bodybuilding for Teens", "Female Strength Training",
  "Prenatal Yoga", "Postpartum Core Rehab", "Diabetic Meal Plan", "PCOS Weight Loss",
  "Thyroid Health Diet", "Low Testosterone Symptoms", "Menopause Weight Gain", "Arthritis Friendly Workout",
  "Scoliosis Exercises", "Lower Back Pain Relief", "Sciatica Stretches",

  // Mental & Wellness
  "Gym Anxiety Tips", "Morning Routine for Energy", "Cold Plunge Benefits", "Sauna after Workout",
  "Meditation for Athletes", "Visualizing Muscle Growth", "Habit Stacking Fitness",
  "Alcohol and Muscle Growth", "Cheat Meal Strategy", "Social Eating Tips",
  "Deep Sleep for Muscle", "Circadian Rhythm Fasting", "Dopamine Detox", "Stress Management",

  // Scientific Terms
  "Anabolic Window Myth", "Protein Synthesis Duration", "Glycogen Depletion", "Insulin Sensitivity",
  "Cortisol Management", "Adrenal Fatigue", "Mitochondrial Health", "Nitric Oxide Boosting",
  "Leptin Resistance", "Ghrelin Control", "Visceral Fat Reduction", "Subcutaneous Fat",
  "Fast Twitch Muscle Fibers", "Slow Twitch Muscle Fibers", "ATP Energy System"
];

export const Landing: React.FC<LandingProps> = ({ onStart, t, lang }) => {
  // Fallback defaults if T is missing
  const btnText = "INITIALIZE YOUR PROTOCOL →";
  
  // Retrieve the massive content block for the current language
  const contentSections = LANDING_CONTENT[lang] || LANDING_CONTENT.en;

  return (
    <div className="min-h-screen bg-inherit text-white flex flex-col items-center">
      
      {/* Main Layout Container with Sidebars */}
      <div className="flex justify-center items-start gap-6 px-4 w-full max-w-[1600px] mx-auto pt-4 relative">
        
        {/* --- LEFT SIDEBAR (Desktop Only) --- */}
        <div className="hidden lg:flex flex-col gap-4 sticky top-6 shrink-0 w-[300px]">
           <div className="text-center text-xs text-slate-600 font-bold uppercase tracking-widest mb-2">Advertisement</div>
           <div className="rounded-xl overflow-hidden border border-slate-800/50 shadow-xl bg-slate-900">
             <AdSense 
               slot="LANDING_LEFT_1" 
               format="rectangle" 
               responsive={false} 
               style={{width:'300px', height:'250px'}} 
             />
           </div>
           
           <div className="rounded-xl overflow-hidden border border-slate-800/50 shadow-xl bg-slate-900 mt-4">
             <AdSense 
               slot="LANDING_LEFT_2" 
               format="rectangle" 
               responsive={false} 
               style={{width:'300px', height:'250px'}} 
             />
           </div>
        </div>

        {/* --- CENTER CONTENT --- */}
        <div className="flex-1 max-w-2xl w-full pb-48 flex flex-col items-stretch">
            
            {/* === AD POS 1: TOP (Inside center col for flow) === */}
            <div className="w-full mb-6 z-20">
               {ADS.placeholder('Top Ad', 'h-24 md:h-32', 'my-0')}
            </div>

            {/* Hero Section - Centered */}
            <header className="relative overflow-hidden bg-slate-950 rounded-3xl shadow-2xl shadow-black pb-12 pt-8 px-8 text-center border border-slate-800 mb-8 ring-1 ring-white/5">
                {/* Background FX */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-600/10 blur-[100px] rounded-full"></div>
                </div>

                <div className="relative z-10 flex justify-center items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-2xl italic shadow-inner border border-slate-800">
                      M
                  </div>
                  <span className="font-bold text-xl tracking-widest text-slate-300 uppercase">Mad Muscleing</span>
                </div>

                <div className="relative z-10 animate-slide-up">
                  <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
                      PRECISION-ENGINEERED<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400">
                      METABOLIC PROTOCOLS
                      </span><br/>
                      FOR ELITE PHYSICAL TRANSFORMATION
                  </h1>
                  
                  <p className="text-slate-400 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed font-light">
                      Mad Muscleing bridges the gap between clinical sports science and daily application. We process <strong className="text-white">69 physiological data points</strong> to engineer a hyper-personalized blueprint for your body composition goals, eliminating the guesswork of generic fitness apps.
                  </p>

                  {/* Bullet Points */}
                  <div className="text-left max-w-lg mx-auto mb-10 space-y-3 bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50">
                     {[
                        { icon: 'activity', title: "Metabolic Rate Analysis", desc: "Clinical-grade caloric precision" },
                        { icon: 'utensils', title: "Macro-Nutrient Partitioning", desc: "Optimized protein synthesis ratios" },
                        { icon: 'shopping', title: "DNA-Tailored Diet Plans", desc: "Nutrition optimized for your biochemistry" },
                        { icon: 'dumbbell', title: "Neurological Training Cycles", desc: "Hypertrophy based on adaptation" },
                        { icon: 'smartphone', title: "Real-Time Analytics", desc: "Data-driven feedback loops" }
                     ].map((item, i) => (
                       <div key={i} className="flex items-start gap-3">
                          <div className="mt-1 text-rose-500 shrink-0">{getIcon(item.icon, 16)}</div>
                          <div>
                            <span className="text-slate-200 font-bold text-sm tracking-wide uppercase">{item.title}</span>
                            <span className="text-slate-500 text-xs block">{item.desc}</span>
                          </div>
                       </div>
                     ))}
                  </div>

                  {/* PRIMARY CTA BUTTON */}
                  <div className="mt-8 mb-4 flex justify-center">
                    <Button onClick={onStart} className="text-lg px-12 py-5 shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:shadow-[0_0_50px_rgba(244,63,94,0.5)] bg-gradient-to-r from-rose-600 to-indigo-600 border border-white/10 uppercase tracking-widest font-black">
                        {btnText}
                    </Button>
                  </div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">100% Free Analysis • No Credit Card Required</p>
                </div>
            </header>
            
            {/* Features Grid (Secondary Info) */}
            <div className="space-y-4 mb-12">
                <div className="flex justify-between items-center text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2 px-2">
                  <span>System Capabilities</span>
                  <span>v3.0.1 Stable</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-5 flex items-start gap-4 bg-slate-900/80 border-slate-800 hover:border-rose-500/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-900">
                      {getIcon('activity', 20)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wide">TDEE Algorithm</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">Advanced energy expenditure calculation distinguishing NEAT vs EAT.</p>
                    </div>
                  </Card>

                  <Card className="p-5 flex items-start gap-4 bg-slate-900/80 border-slate-800 hover:border-rose-500/30 transition-all">
                     <div className="w-10 h-10 rounded-lg bg-rose-950 text-rose-400 flex items-center justify-center shrink-0 border border-rose-900">
                      {getIcon('ruler', 20)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wide">US Navy Method</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">Military-grade body composition tracking without expensive equipment.</p>
                    </div>
                  </Card>
                </div>
            </div>

             {/* --- LONG FORM CONTENT SECTION --- */}
             <div className="space-y-16 relative">
                {/* Decorative Divider */}
                <div className="flex items-center justify-center gap-4 mb-12 opacity-50">
                   <div className="h-px bg-slate-800 w-full"></div>
                   <span className="text-slate-600 uppercase text-[10px] font-black tracking-[0.3em] shrink-0">The Methodology</span>
                   <div className="h-px bg-slate-800 w-full"></div>
                </div>

                {contentSections.map((section, idx) => (
                  <React.Fragment key={idx}>
                    
                    {/* Render Section Content */}
                    <div className="prose prose-invert max-w-none animate-slide-up">
                      <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 mb-6 uppercase tracking-tight">
                        {section.title}
                      </h2>
                      <div className="space-y-6 text-slate-400 leading-loose text-base font-light text-justify">
                         {section.content.map((para, pIdx) => (
                           <p key={pIdx}>{para}</p>
                         ))}
                      </div>
                    </div>

                    {/* === AD POS: MIDDLE (50% Position) === */}
                    {idx === 3 && (
                      <div className="w-full my-8">
                        {ADS.placeholder('Content Ad (Middle)', 'h-32')}
                      </div>
                    )}

                  </React.Fragment>
                ))}

                {/* Final Call to Action at bottom of text */}
                <div className="mt-12 p-10 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Ready to decode your biology?</h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">Join thousands of others who have optimized their physiology.</p>
                    <Button onClick={onStart} className="mx-auto uppercase tracking-widest text-sm font-bold">
                       {btnText}
                    </Button>
                </div>
             </div>

             {/* === AD POS 5: BOTTOM === */}
             <div className="w-full mt-8 mb-8 z-20">
                {ADS.placeholder('Bottom Ad', 'h-32', 'my-0')}
             </div>

             {/* === SEO KEYWORDS SECTION === */}
             <div className="w-full mt-8 mb-24 pt-12 border-t border-slate-800/50">
                <h4 className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-6">Trending Topics</h4>
                <div className="flex flex-wrap justify-center gap-2">
                   {SEO_KEYWORDS.map((kw, i) => (
                     <span key={i} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-600 hover:text-slate-400 hover:border-slate-700 transition-colors cursor-default">
                       {kw}
                     </span>
                   ))}
                </div>

                {/* --- FOOTER LINKS --- */}
                <div className="flex justify-center gap-6 mt-12 text-xs text-slate-600 uppercase tracking-wider font-medium">
                    <a href="/privacy-policy" className="hover:text-rose-500 transition-colors">Privacy</a>
                    <span className="text-slate-800">/</span>
                    <a href="#" className="hover:text-rose-500 transition-colors">Terms</a>
                    <span className="text-slate-800">/</span>
                    <a href="#" className="hover:text-rose-500 transition-colors">Contact</a>
                </div>
                <div className="text-center mt-4 text-[10px] text-slate-800 font-mono">
                    &copy; {new Date().getFullYear()} MAD MUSCLEING PROTOCOL. ALL RIGHTS RESERVED.
                </div>
             </div>

        </div>

        {/* --- RIGHT SIDEBAR (Desktop Only) --- */}
        <div className="hidden lg:flex flex-col gap-4 sticky top-6 shrink-0 w-[300px]">
           <div className="text-center text-xs text-slate-600 font-bold uppercase tracking-widest mb-2">Advertisement</div>
           <div className="rounded-xl overflow-hidden border border-slate-800/50 shadow-xl bg-slate-900">
             <AdSense 
               slot="LANDING_RIGHT_1" 
               format="rectangle" 
               responsive={false} 
               style={{width:'300px', height:'250px'}} 
             />
           </div>

           <div className="rounded-xl overflow-hidden border border-slate-800/50 shadow-xl bg-slate-900 mt-4">
             <AdSense 
               slot="LANDING_RIGHT_2" 
               format="rectangle" 
               responsive={false} 
               style={{width:'300px', height:'250px'}} 
             />
           </div>
        </div>

      </div>
      
      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 z-50">
        <div className="max-w-md mx-auto">
           <Button fullWidth onClick={onStart} className="text-lg py-4 shadow-[0_4px_20px_rgba(244,63,94,0.4)] hover:shadow-[0_6px_30px_rgba(244,63,94,0.6)] uppercase font-black tracking-widest">
             {btnText}
           </Button>
        </div>
      </div>
    </div>
  );
}
