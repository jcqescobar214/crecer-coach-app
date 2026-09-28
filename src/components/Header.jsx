import React from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-transparent">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-teal-400 leading-none tracking-tight">crecer</h1>
        <span className="text-[11px] text-slate-500 font-medium mt-1">tu coach de crianza</span>
      </div>
      <button className="text-slate-700 hover:text-slate-900 transition-colors">
        <Menu size={28} strokeWidth={2.5} />
      </button>
    </header>
  );
};

export default Header;
