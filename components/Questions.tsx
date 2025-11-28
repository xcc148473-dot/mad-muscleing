

import React, { useState } from 'react';
import { QuestionStep, UserData } from '../types';
import { Card, Button } from './UI';
import { getIcon } from '../constants';
import { AdSense } from './AdSense';

interface QuestionProps {
  stepData: QuestionStep;
  onAnswer: (val: any) => void;
  userData: UserData;
  onNext: () => void;
  showFeedback?: boolean;
  t?: any;
}

// --- SEO CONTENT CONTAINER (Always Expanded) ---
const SeoContent: React.FC<{ content?: string }> = ({ content }) => {
  if (!content) return null;

  return (
    <div className="w-full mt-12 border-t border-slate-800 pt-8 animate-slide-up">
       <div className="w-full flex items-center gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-700 mb-6">
          <span className="text-2xl">📚</span>
          <div className="text-left">
            <h3 className="font-bold text-white">Deep Dive Analysis</h3>
            <p className="text-xs text-slate-500">Comprehensive scientific breakdown</p>
          </div>
       </div>
       
       {/* Content is now always visible without toggle */}
       <div className="px-2 prose prose-invert max-w-none">
         <div dangerouslySetInnerHTML={{ __html: content }} />
       </div>
    </div>
  );
};

// --- STANDARD PAGE LAYOUT WRAPPER ---
// Implements the strict structure: Title -> Intro -> Ad 1 -> Content -> Ad 2 -> SEO
const PageLayout: React.FC<{ 
  title: string; 
  subtitle?: string; 
  id: string; 
  seoContent?: string; 
  children: React.ReactNode 
}> = ({ title, subtitle, id, seoContent, children }) => {
  return (
    <article className="flex flex-col w-full">
      {/* 1. Page Title */}
      <h1 className="text-3xl sm:text-4xl font-black text-white text-center mb-3 leading-tight">
        {title}
      </h1>
      
      {/* 2. Intro Text (1-2 lines) - Required for Policy compliance before Ad 1 */}
      {subtitle && (
        <p className="text-slate-400 text-center mb-4 max-w-lg mx-auto text-sm sm:text-base px-4">
          {subtitle}
        </p>
      )}

      {/* 3. Ad Slot 1 (Responsive) - High Viewability */}
      <div className="w-full mb-8 flex justify-center min-h-[120px] sm:min-h-[280px]">
        <AdSense 
          key={`ad-top-${id}`} 
          slot="AD_SLOT_TOP_123" 
          label="Sponsored"
          format="auto"
          responsive={true}
          style={{ width: '100%', maxWidth: '728px', minHeight: '280px' }} // Explicit min height for stability
          layoutKey={id} // Force refresh
        />
      </div>

      {/* 4. Main Question Content */}
      <div className="w-full mb-8">
        {children}
      </div>

      {/* 5. Ad Slot 2 (Medium Rectangle) - After content */}
      <div className="w-full mb-12 flex justify-center">
         <AdSense 
           key={`ad-mid-${id}`} 
           slot="AD_SLOT_MID_456" 
           label="Advertisement"
           format="rectangle"
           style={{ width: '300px', height: '250px' }} // Fixed size for stability
           layoutKey={id}
         />
      </div>

      {/* 6. Massive SEO Content (Always Visible) */}
      <SeoContent content={seoContent} />
    </article>
  );
};

export const SelectionQuestion: React.FC<QuestionProps> = ({ stepData, onAnswer, userData, onNext }) => {
  const currentVal = userData[stepData.field as keyof UserData];

  return (
    <PageLayout 
      title={stepData.title} 
      subtitle={stepData.subtitle} 
      id={stepData.id} 
      seoContent={stepData.explanation}
    >
      <div className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">
        {stepData.options?.map((opt) => (
          <Card 
            key={opt.value}
            isSelected={currentVal === opt.value}
            onClick={() => {
              onAnswer(opt.value);
              setTimeout(onNext, 200); 
            }}
            className="flex items-center p-4 group hover:border-rose-500/50 cursor-pointer"
          >
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 transition-colors
              ${currentVal === opt.value ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}
            `}>
              {getIcon(opt.icon || 'circle', 20)}
            </div>
            <span className="font-bold text-lg text-white">{opt.label}</span>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export const MultiSelectQuestion: React.FC<QuestionProps> = ({ stepData, onAnswer, userData, onNext, t }) => {
  const currentVal = (userData[stepData.field as keyof UserData] as string[]) || [];
  
  const toggle = (val: string) => {
    if (currentVal.includes(val)) onAnswer(currentVal.filter(i => i !== val));
    else onAnswer([...currentVal, val]);
  };

  return (
    <PageLayout title={stepData.title} subtitle={stepData.subtitle} id={stepData.id} seoContent={stepData.explanation}>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto mb-8">
        {stepData.options?.map((opt) => (
          <Card 
            key={opt.value}
            isSelected={currentVal.includes(opt.value)}
            onClick={() => toggle(opt.value)}
            className="flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-rose-500/50"
          >
            <div className={`mb-3 ${currentVal.includes(opt.value) ? 'text-rose-500' : 'text-slate-500'}`}>
              {getIcon(opt.icon || 'check', 32)}
            </div>
            <span className={`font-bold leading-tight ${currentVal.includes(opt.value) ? 'text-white' : 'text-slate-400'}`}>
              {opt.label}
            </span>
          </Card>
        ))}
      </div>
      <div className="max-w-md mx-auto">
        <Button fullWidth onClick={onNext} disabled={currentVal.length === 0}>
          {t?.continue || "Continue"}
        </Button>
      </div>
    </PageLayout>
  );
};

export const InputQuestion: React.FC<QuestionProps> = ({ stepData, onAnswer, userData, onNext, t }) => {
  const [val, setVal] = useState<string | number>(() => {
    const raw = userData[stepData.field as keyof UserData];
    return (typeof raw === 'string' || typeof raw === 'number') ? raw : '';
  });

  return (
    <PageLayout title={stepData.title} subtitle={stepData.subtitle} id={stepData.id} seoContent={stepData.explanation}>
      <div className="max-w-md mx-auto w-full bg-slate-900 p-8 rounded-[2rem] border-2 border-slate-800 flex flex-col items-center mb-8">
        <div className="flex items-baseline gap-2">
           <input 
            type="number" 
            className="text-6xl font-black text-center w-48 bg-transparent text-white border-b-4 border-slate-700 focus:border-rose-500 outline-none transition-colors"
            placeholder="0"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              const num = parseFloat(e.target.value);
              onAnswer(isNaN(num) ? 0 : num);
            }}
            autoFocus
           />
        </div>
      </div>
      <div className="max-w-md mx-auto">
        <Button fullWidth onClick={onNext} disabled={!val}>{t?.next || "Next"}</Button>
      </div>
    </PageLayout>
  );
};

export const MeasurementsQuestion: React.FC<QuestionProps> = ({ stepData, onAnswer, userData, onNext, t }) => {
  const [waist, setWaist] = useState(userData.waistCm || '');
  const [neck, setNeck] = useState(userData.neckCm || '');
  
  const handleNext = () => {
    onAnswer({ waistCm: Number(waist), neckCm: Number(neck) });
    onNext();
  };

  return (
    <PageLayout title={stepData.title} subtitle="US Navy Method accuracy" id={stepData.id} seoContent={stepData.explanation}>
      <div className="space-y-4 max-w-md mx-auto w-full mb-8">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <label className="block text-sm font-bold text-slate-500 mb-1">Waist (cm)</label>
          <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full text-2xl font-bold bg-transparent text-white outline-none" />
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <label className="block text-sm font-bold text-slate-500 mb-1">Neck (cm)</label>
          <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full text-2xl font-bold bg-transparent text-white outline-none" />
        </div>
      </div>
      <div className="max-w-md mx-auto">
        <Button fullWidth onClick={handleNext} disabled={!waist || !neck}>{t?.calculate || "Calculate"}</Button>
      </div>
    </PageLayout>
  );
};

export const WaterQuestion: React.FC<QuestionProps> = ({ stepData, onAnswer, onNext, t }) => {
  return (
    <PageLayout title={stepData.title} subtitle={stepData.subtitle} id={stepData.id} seoContent={stepData.explanation}>
      <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
        {stepData.options?.map((opt) => (
          <Card 
            key={opt.value}
            isSelected={false}
            onClick={() => { onAnswer(opt.value); onNext(); }}
            className="p-6 flex items-center justify-between hover:border-indigo-500/50 cursor-pointer"
          >
            <span className="font-bold text-lg text-white">{opt.label}</span>
            <span className="text-2xl">💧</span>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};
