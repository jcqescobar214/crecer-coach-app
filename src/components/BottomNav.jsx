import React from 'react';
import { Home, MessageCircle, ClipboardList, BookOpen, LineChart } from 'lucide-react';

const BottomNav = ({ activeTab = 'inicio', onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 flex justify-between items-center px-6 h-20 pb-2 z-50 rounded-t-3xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
      <NavItem icon={<Home className="w-6 h-6" />} label="Inicio" isActive={activeTab === 'inicio'} onClick={() => onTabChange?.('inicio')} />
      <NavItem icon={<MessageCircle className="w-6 h-6" />} label="Mi Coach" isActive={activeTab === 'coach'} onClick={() => onTabChange?.('coach')} />
      <NavItem icon={<ClipboardList className="w-6 h-6" />} label="Mi Plan" isActive={activeTab === 'plan'} onClick={() => onTabChange?.('plan')} />
      <NavItem icon={<BookOpen className="w-6 h-6" />} label="Aprender" isActive={activeTab === 'aprender'} onClick={() => onTabChange?.('aprender')} />
      <NavItem icon={<LineChart className="w-6 h-6" />} label="Progreso" isActive={activeTab === 'progreso'} onClick={() => onTabChange?.('progreso')} />
    </nav>
  );
};

const NavItem = ({ icon, label, isActive = false, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1.5 pt-2 ${isActive ? 'text-[#A9A0EC]' : 'text-slate-400 hover:text-slate-500 transition-colors'}`}
    >
      {icon}
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </button>
  );
};

export default BottomNav;
