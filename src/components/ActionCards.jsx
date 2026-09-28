import React from 'react';
import { Flame, Lightbulb, ClipboardCheck } from 'lucide-react';

const ActionCards = ({ onActionClick }) => {
  const actions = [
    {
      id: 'help',
      iconImg: '/icon_help.png',
      fallbackIcon: Flame,
      title: 'Ayúdame ahora',
      description: 'Tengo una situación difícil y necesito orientación',
      colorClass: 'text-[#E55353]',
      bgClass: 'bg-red-50',
      borderClass: 'border-b border-slate-100'
    },
    {
      id: 'learn',
      iconImg: '/icon_learn.png',
      fallbackIcon: Lightbulb,
      title: 'Quiero aprender',
      description: 'Quiero aprender o fortalecer una habilidad de crianza',
      colorClass: 'text-[#D97706]',
      bgClass: 'bg-amber-50',
      borderClass: 'border-b border-slate-100'
    },
    {
      id: 'plan',
      iconImg: '/icon_plan.png',
      fallbackIcon: ClipboardCheck,
      title: 'Mi plan de hoy',
      description: 'Quiero revisar qué debo practicar',
      colorClass: 'text-[#36B39C]',
      bgClass: 'bg-teal-50',
      borderClass: ''
    }
  ];

  return (
    <div className="bg-white rounded-[24px] shadow-sm p-1 border border-slate-100/80">
      <div className="flex flex-col">
        {actions.map((action, index) => {
          const FallbackIcon = action.fallbackIcon;
          return (
            <button 
              key={action.id} 
              onClick={() => onActionClick?.(action.id)}
              className={`flex items-center gap-4 p-4 text-left hover:bg-slate-50 transition-colors cursor-pointer ${action.borderClass} ${index === 0 ? 'rounded-t-[20px]' : ''} ${index === actions.length - 1 ? 'rounded-b-[20px]' : ''}`}
            >
              <div className="w-[56px] h-[56px] flex-shrink-0 flex items-center justify-center relative">
                <img 
                  src={action.iconImg} 
                  alt={action.title} 
                  className="w-[52px] h-[52px] object-contain drop-shadow-sm" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className={`w-[52px] h-[52px] rounded-full hidden items-center justify-center ${action.bgClass}`}>
                  <FallbackIcon className={`w-7 h-7 ${action.colorClass}`} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className={`text-[16px] font-bold mb-0.5 ${action.colorClass}`}>{action.title}</span>
                <span className="text-[14px] text-slate-600 leading-tight">{action.description}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActionCards;
