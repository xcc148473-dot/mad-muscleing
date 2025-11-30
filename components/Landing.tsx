
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
  const btnText = t?.start || "Start My Plan";
  
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
            <header className="relative overflow-hidden bg-slate-900/50 rounded-3xl shadow-2xl shadow-black pb-12 pt-6 px-6 text-center border border-white/10 mb-8">
                {/* Background FX */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-rose-600/20 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[100px] rounded-full"></div>
                </div>

                <div className="relative z-10 flex justify-center items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl flex items-center justify-center text-white font-black text-xl italic shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                    M
                </div>
                <span className="font-black text-2xl tracking-tight text-white">Mad Muscleing</span>
                </div>

                <div className="relative z-10 animate-slide-up">
                  <div className="inline-block px-4 py-1 bg-slate-800 text-rose-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-slate-700 shadow-lg">
                      AI-Powered Analysis
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-xl">
                      Get Your Dream Body <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                      In 30 Days
                      </span>
                  </h1>
                  <p className="text-slate-400 text-lg mb-6 max-w-md mx-auto leading-relaxed">
                      Discover your metabolic age, body fat percentage, and get a meal plan tailored to your DNA.
                  </p>

                  {/* PRIMARY CTA BUTTON - MOVED DOWN WITH MT-8 */}
                  <div className="mt-8 mb-12 flex justify-center">
                    <Button onClick={onStart} className="text-lg px-10 py-4 shadow-xl shadow-rose-500/30 animate-bounce-short hover:scale-105">
                        {btnText}
                    </Button>
                  </div>

                  {/* Abstract Hero Visual */}
                  <div className="relative w-64 h-64 mx-auto mb-8">
                      <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-indigo-500 rounded-full opacity-20 animate-pulse-slow blur-xl"></div>
                      <div className="absolute inset-4 bg-slate-900 rounded-[2rem] shadow-2xl flex items-center justify-center border-2 border-slate-700 z-10 relative overflow-hidden">
                      <img 
                          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                          alt="Fitness" 
                          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent p-4">
                          <div className="flex items-center gap-2 text-white">
                          {getIcon('zap', 16, 'text-yellow-400 fill-yellow-400')}
                          <span className="font-bold text-sm text-shadow">Personalized Plan</span>
                          </div>
                      </div>
                      </div>
                  </div>
                </div>
            </header>
            
            {/* Features Grid */}
            <div className="space-y-4 mb-12">
                <div className="flex justify-between items-center text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
                  <span>What you get</span>
                  <span>v2.4 Updated</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Card className="p-6 flex items-start gap-4 bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-rose-500/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-indigo-900/30 text-indigo-400 flex items-center justify-center shrink-0">
                      {getIcon('activity', 24)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Metabolic Analysis</h3>
                      <p className="text-sm text-slate-400">Complete breakdown of your BMR, TDEE, and metabolic age.</p>
                    </div>
                  </Card>

                  <Card className="p-6 flex items-start gap-4 bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-rose-500/30 transition-colors">
                     <div className="w-12 h-12 rounded-full bg-rose-900/30 text-rose-400 flex items-center justify-center shrink-0">
                      {getIcon('ruler', 24)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Navy Body Fat Calc</h3>
                      <p className="text-sm text-slate-400">Military-grade accuracy for body composition without equipment.</p>
                    </div>
                  </Card>
                </div>
            </div>

             {/* --- LONG FORM CONTENT SECTION --- */}
             <div className="space-y-16 relative">
                {/* Decorative Divider */}
                <div className="flex items-center justify-center gap-4 mb-12 opacity-50">
                   <div className="h-px bg-slate-700 w-full"></div>
                   <span className="text-slate-500 uppercase text-xs font-bold tracking-[0.2em] shrink-0">The Science</span>
                   <div className="h-px bg-slate-700 w-full"></div>
                </div>

                {contentSections.map((section, idx) => (
                  <React.Fragment key={idx}>
                    
                    {/* Render Section Content */}
                    <div className="prose prose-invert max-w-none animate-slide-up">
                      <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6">
                        {section.title}
                      </h2>
                      <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-light">
                         {section.content.map((para, pIdx) => (
                           <p key={pIdx}>{para}</p>
                         ))}
                      </div>
                    </div>

                    {/* === AD POS: MIDDLE (50% Position) === */}
                    {/* Desktop & Mobile */}
                    {idx === 3 && (
                      <div className="w-full my-8">
                        {ADS.placeholder('Content Ad (Middle)', 'h-32')}
                      </div>
                    )}

                  </React.Fragment>
                ))}

                {/* Final Call to Action at bottom of text */}
                <div className="mt-12 p-8 bg-rose-900/10 border border-rose-500/20 rounded-3xl text-center">
                    <h3 className="text-xl font-bold text-rose-400 mb-4">Ready to decode your biology?</h3>
                    <Button onClick={onStart} className="mx-auto">
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
                <h4 className="text-center text-xs font-bold uppercase tracking-widest text-slate-600 mb-6">Popular Topics & Resources</h4>
                <div className="flex flex-wrap justify-center gap-2">
                   {SEO_KEYWORDS.map((kw, i) => (
                     <span key={i} className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors cursor-default">
                       {kw}
                     </span>
                   ))}
                </div>

                {/* --- FOOTER LINKS --- */}
                <div className="flex justify-center gap-6 mt-12 text-sm text-slate-500">
                    <a href="/privacy-policy" className="hover:text-rose-500 transition-colors">Privacy Policy</a>
                    <span className="text-slate-700">|</span>
                    <a href="#" className="hover:text-rose-500 transition-colors">Terms of Service</a>
                    <span className="text-slate-700">|</span>
                    <a href="#" className="hover:text-rose-500 transition-colors">Contact</a>
                </div>
                <div className="text-center mt-4 text-xs text-slate-700">
                    &copy; {new Date().getFullYear()} Mad Muscleing. All rights reserved.
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
           <Button fullWidth onClick={onStart} className="text-xl py-5 shadow-[0_4px_20px_rgba(244,63,94,0.4)] hover:shadow-[0_6px_30px_rgba(244,63,94,0.6)]">
             {btnText}
             {getIcon('arrow-right', 24)}
           </Button>
           <p className="text-center text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-wider">No credit card required</p>
        </div>
      </div>
    </div>
  );
}
