import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, isSelected }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-slate-900 rounded-[2rem] shadow-xl shadow-black/50
        transition-all duration-300 ease-out
        border-2
        ${isSelected 
          ? 'border-rose-500 scale-[1.02] ring-4 ring-rose-500/20 bg-slate-800' 
          : 'border-slate-800 hover:border-rose-500/50 hover:scale-[1.01] hover:bg-slate-800'}
        ${onClick ? 'cursor-pointer active:scale-95' : ''}
        ${className}
      `}
    >
      {children}
      {isSelected && (
        <div className="absolute top-4 right-4 text-rose-500 animate-in fade-in zoom-in duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', fullWidth = false, className = '', ...props }) => {
  const baseStyles = "py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-1",
    secondary: "bg-slate-800 text-white border border-slate-700 shadow-sm hover:bg-slate-700",
    outline: "border-2 border-rose-500 text-rose-500 hover:bg-rose-500/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ProgressBar: React.FC<{ current: number; total: number; className?: string }> = ({ current, total, className = 'mb-8' }) => {
  const percentage = Math.min(100, (current / total) * 100);
  
  return (
    <div className={`w-full h-2 bg-slate-800 rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(244,63,94,0.5)]"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}{suffix}</span>;
};

export const LoadingOverlay: React.FC<{ message: string }> = ({ message }) => (
  <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center p-6">
    <div className="relative w-24 h-24 mb-8">
      <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-rose-500 rounded-full border-t-transparent animate-spin shadow-[0_0_20px_rgba(244,63,94,0.3)]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    </div>
    <h2 className="text-2xl font-bold text-white mb-2 text-center animate-pulse">{message}</h2>
    <p className="text-slate-400 text-center">Analyzing your unique profile...</p>
    
    {/* Ad in loading screen */}
    <div className="mt-12 w-full max-w-xs">
      <div className="w-full h-64 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center">
        <span className="text-slate-600 font-bold">PARTNER AD</span>
      </div>
    </div>
  </div>
);