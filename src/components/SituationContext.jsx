import React from 'react';

const SituationContext = ({ situationTitle = "Está haciendo una rabieta", childInfo = "Niño de 3 a 6 años", icon = "😫" }) => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5 w-full">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-xs">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
          Situación seleccionada
        </span>
        <h3 className="text-sm font-bold text-slate-800 leading-snug">
          {situationTitle}
        </h3>
        <span className="text-xs font-semibold text-teal-600 mt-0.5">
          {childInfo}
        </span>
      </div>
    </div>
  );
};

export default SituationContext;
