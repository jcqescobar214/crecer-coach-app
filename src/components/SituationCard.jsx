import React from 'react';

const SituationCard = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl shadow-xs border border-slate-100/80 p-2.5 aspect-square flex flex-col items-center justify-center gap-2 hover:shadow-md hover:border-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all text-center group cursor-pointer"
    >
      <span className="text-2.5xl sm:text-3xl select-none group-hover:scale-110 transition-transform leading-none">
        {icon}
      </span>
      <span className="text-[11px] font-semibold text-slate-700 leading-tight px-0.5">
        {label}
      </span>
    </button>
  );
};

export default SituationCard;
