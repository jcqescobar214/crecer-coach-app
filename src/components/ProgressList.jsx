import React from 'react';
import { Mail, Clock, Flame, Trophy, Target } from 'lucide-react';

const ProgressList = () => {
  const items = [
    { 
      icon: Mail, 
      title: 'Habilidad actual', 
      value: 'Dar instrucciones claras',
      colorClass: 'text-emerald-600',
      bgClass: 'bg-emerald-50 border border-emerald-100/60'
    },
    { 
      icon: Clock, 
      title: 'Actividad pendiente', 
      value: 'Practicar una instrucción breve',
      colorClass: 'text-teal-600',
      bgClass: 'bg-teal-50 border border-teal-100/60'
    },
    { 
      icon: Flame, 
      title: 'Racha de práctica', 
      value: '5 días',
      colorClass: 'text-rose-500',
      bgClass: 'bg-rose-50 border border-rose-100/60'
    },
    { 
      icon: Trophy, 
      title: 'Último logro', 
      value: 'Mantuviste la calma en una situación difícil',
      colorClass: 'text-amber-500',
      bgClass: 'bg-amber-50 border border-amber-100/60'
    },
    { 
      icon: Target, 
      title: 'Próximo objetivo', 
      value: 'Reducir discusiones por pantallas',
      colorClass: 'text-cyan-600',
      bgClass: 'bg-cyan-50 border border-cyan-100/60'
    },
  ];

  return (
    <div className="w-full">
      {/* Título de sección idéntico a la imagen de referencia */}
      <h3 className="text-[15px] font-bold text-[#2B3674] mb-3 px-1">
        Continúa tu proceso
      </h3>
      
      {/* Contenedor tipo tarjeta blanca redondeada */}
      <div className="bg-white rounded-[24px] shadow-sm p-4 border border-slate-100/80 flex flex-col gap-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className={`flex items-start gap-3.5 pb-3 ${index < items.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.bgClass}`}>
                <Icon className={`w-5 h-5 ${item.colorClass}`} strokeWidth={2} />
              </div>
              <div className="flex flex-col justify-center pt-0.5">
                <span className={`text-[13px] font-bold ${item.colorClass} leading-tight mb-0.5`}>{item.title}</span>
                <span className="text-[14px] font-medium text-slate-700 leading-snug">{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressList;
