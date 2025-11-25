
import React from 'react';
import { 
  Dumbbell, 
  Apple, 
  Moon, 
  Briefcase, 
  Droplets, 
  Activity, 
  Utensils, 
  Ban, 
  HeartPulse, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  Scale,
  Ruler,
  User,
  Star,
  Users,
  ShieldCheck,
  Zap,
  Trophy,
  ChefHat,
  LayoutDashboard,
  ShoppingCart,
  ListTodo,
  Repeat,
  Timer,
  Sun,
  Smartphone,
  Wallet,
  Music,
  Flame,
  Battery,
  Smile,
  Frown,
  Settings,
  Globe,
  Palette,
  X
} from 'lucide-react';

export const COLORS = {
  primary: '#f43f5e', // rose-500
  secondary: '#6366f1', // indigo-500
  success: '#10b981',
  warning: '#f59e0b',
  background: '#020617' // slate-950
};

// Helper to render icons dynamically
export const getIcon = (name: string, size = 24, className = "") => {
  const props = { size, className };
  switch (name) {
    case 'dumbbell': return <Dumbbell {...props} />;
    case 'apple': return <Apple {...props} />;
    case 'moon': return <Moon {...props} />;
    case 'briefcase': return <Briefcase {...props} />;
    case 'droplets': return <Droplets {...props} />;
    case 'activity': return <Activity {...props} />;
    case 'utensils': return <Utensils {...props} />;
    case 'ban': return <Ban {...props} />;
    case 'heart': return <HeartPulse {...props} />;
    case 'calendar': return <Calendar {...props} />;
    case 'check': return <CheckCircle2 {...props} />;
    case 'arrow-right': return <ArrowRight {...props} />;
    case 'scale': return <Scale {...props} />;
    case 'ruler': return <Ruler {...props} />;
    case 'user': return <User {...props} />;
    case 'star': return <Star {...props} />;
    case 'users': return <Users {...props} />;
    case 'shield': return <ShieldCheck {...props} />;
    case 'zap': return <Zap {...props} />;
    case 'trophy': return <Trophy {...props} />;
    case 'chef': return <ChefHat {...props} />;
    case 'dashboard': return <LayoutDashboard {...props} />;
    case 'shopping': return <ShoppingCart {...props} />;
    case 'list': return <ListTodo {...props} />;
    case 'repeat': return <Repeat {...props} />;
    case 'timer': return <Timer {...props} />;
    case 'sun': return <Sun {...props} />;
    case 'smartphone': return <Smartphone {...props} />;
    case 'wallet': return <Wallet {...props} />;
    case 'music': return <Music {...props} />;
    case 'flame': return <Flame {...props} />;
    case 'battery': return <Battery {...props} />;
    case 'smile': return <Smile {...props} />;
    case 'frown': return <Frown {...props} />;
    case 'settings': return <Settings {...props} />;
    case 'globe': return <Globe {...props} />;
    case 'palette': return <Palette {...props} />;
    case 'close': return <X {...props} />;
    default: return <Activity {...props} />;
  }
};

export const ADS = {
  placeholder: (label: string, height = 'h-24', className = 'my-4') => (
    <div className={`w-full ${height} ${className} bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center relative overflow-hidden group`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
      <span className="text-slate-600 font-bold tracking-widest text-[10px] sm:text-sm uppercase text-center p-1">{label}</span>
      <div className="absolute top-1 right-1 w-3 h-3 bg-slate-800 text-[8px] flex items-center justify-center text-slate-500 rounded border border-slate-700">AD</div>
    </div>
  )
};
