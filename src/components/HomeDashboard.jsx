import React from 'react';
import ProgressList from './ProgressList';
import ActionCards from './ActionCards';

const HomeDashboard = ({ onActionClick }) => {
  return (
    <div className="flex flex-col w-full h-full pb-6 px-1">
      
      {/* Saludo del Coach y Mascota 3D */}
      <div className="flex items-center justify-between mb-6 mt-2 relative">
        
        {/* Globo de diálogo */}
        <div className="bg-[#EEF2FF] rounded-3xl p-5 shadow-sm relative w-[58%] z-10 border border-white/80">
          <p className="text-[#2D3748] font-bold leading-snug text-[16px]">
            ¡Hola, soy <br/> tu coach!
          </p>
          <p className="text-[#2D3748] font-bold leading-snug text-[16px] mt-3">
            ¿Qué necesitas <br/> hoy?
          </p>
          {/* Piquito del globo de diálogo */}
          <div className="absolute -right-2 top-8 w-5 h-5 bg-[#EEF2FF] rotate-45 transform border-t border-r border-white/80"></div>
        </div>
        
        {/* Personaje 3D de la mascota */}
        <div className="w-[42%] flex justify-end items-end relative -ml-2">
          <img 
            src="/coach_mascot.png" 
            alt="Mascota Crecer Coach" 
            className="w-[145px] h-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Tarjetas de Acción Rápida con callback de clicks */}
      <ActionCards onActionClick={onActionClick} />

      {/* Sección de Progreso / Seguimiento */}
      <div className="mt-6">
        <ProgressList />
      </div>

    </div>
  );
};

export default HomeDashboard;
