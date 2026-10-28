import React from 'react';
import { AlertTriangle } from 'lucide-react';

const EmergencyButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Botón de emergencia"
      title="Botón de emergencia - Ayuda inmediata en crisis"
      className="absolute bottom-24 right-5 z-40 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 active:scale-95 text-white shadow-lg shadow-red-600/40 border-2 border-white transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-red-300 cursor-pointer"
    >
      {/* Halo de pulsación visual para indicar emergencia */}
      <span className="absolute -inset-1 rounded-full bg-red-500/30 animate-ping pointer-events-none" />

      {/* Tooltip flotante en hover para escritorio */}
      <span className="absolute bottom-full mb-2 right-0 hidden group-hover:flex items-center px-2 py-1 rounded bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap shadow-md pointer-events-none z-50">
        Emergencia / Crisis
      </span>

      {/* Icono de Alerta de Emergencia */}
      <AlertTriangle className="w-5 h-5 text-white transition-transform group-hover:scale-110 relative z-10" strokeWidth={2.4} />

      {/* Etiqueta SOS */}
      <span className="text-[9px] font-black uppercase tracking-wider text-white mt-0.5 leading-none relative z-10">
        SOS
      </span>
    </button>
  );
};

export default EmergencyButton;
