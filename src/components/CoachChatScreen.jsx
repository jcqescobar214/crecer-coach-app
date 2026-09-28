import React from 'react';
import ChatHeader from './ChatHeader';

const CoachChatScreen = ({ onBack }) => {
  return (
    <div className="flex flex-col bg-slate-50 w-full relative">
      {/* Cabecera Específica del Chat */}
      <ChatHeader onBack={onBack} />

      {/* Área central del chat en flujo único */}
      <div className="p-4 flex flex-col gap-4">
        <div className="text-center text-[11px] font-semibold text-slate-400 my-2 uppercase tracking-wider">
          Hoy
        </div>
        
        {/* Mensaje inicial del Coach */}
        <div className="flex items-start gap-3 max-w-[88%]">
          <div className="w-9 h-9 rounded-full bg-teal-100/80 p-0.5 flex-shrink-0 border border-teal-200 shadow-xs flex items-center justify-center overflow-hidden">
            <img 
              src="/coach_mascot.png" 
              alt="Coach" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs text-[14px] text-slate-700 leading-relaxed border border-slate-100">
            ¡Hola! Estoy aquí para acompañarte en tu crianza. ¿Hay alguna situación en particular sobre la que quieras hablar hoy o necesitas orientación inmediata?
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachChatScreen;
