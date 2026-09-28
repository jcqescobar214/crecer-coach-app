import React from 'react';

const CoachContextMessage = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5 w-full mt-1">
      <div className="w-11 h-11 rounded-full bg-teal-100/80 p-0.5 flex-shrink-0 border border-teal-200 shadow-xs flex items-center justify-center overflow-hidden">
        <img 
          src="/coach_mascot.png" 
          alt="Coach Avatar" 
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-[12px] font-medium text-slate-600 leading-relaxed">
        Luego te haré algunas preguntas para entender mejor y ayudarte con una orientación personalizada
      </p>
    </div>
  );
};

export default CoachContextMessage;
