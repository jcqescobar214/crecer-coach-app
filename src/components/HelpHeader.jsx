import React from 'react';
import { ChevronLeft, MoreVertical } from 'lucide-react';

const HelpHeader = ({ onBack, title = "¿Qué está pasando?" }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 px-4 py-3.5 flex items-center justify-between shadow-xs">
      {/* Botón de regreso */}
      <button 
        onClick={onBack}
        className="p-1 text-slate-700 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
        aria-label="Volver"
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
      </button>

      {/* Título dinámico o por defecto */}
      <h2 className="text-base font-bold text-slate-800 tracking-tight text-center px-2">
        {title}
      </h2>

      {/* Opciones */}
      <button 
        className="p-1 text-slate-700 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
        aria-label="Opciones"
      >
        <MoreVertical className="w-5 h-5" strokeWidth={2} />
      </button>
    </header>
  );
};

export default HelpHeader;
