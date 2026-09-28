import React, { useState } from 'react';
import HelpHeader from './HelpHeader';

const intensityData = [
  { 
    level: 1, 
    label: 'Molestia leve', 
    emoji: '🌱', 
    color: 'from-emerald-400 to-emerald-500', 
    textColor: 'text-emerald-700', 
    bgColor: 'bg-emerald-50 border-emerald-300', 
    summary: 'Incomodidad o desacuerdo pequeño' 
  },
  { 
    level: 2, 
    label: 'Oposición moderada', 
    emoji: '😐', 
    color: 'from-teal-400 to-teal-500', 
    textColor: 'text-teal-700', 
    bgColor: 'bg-teal-50 border-teal-300', 
    summary: 'Dice "no", pero aún se puede hablar' 
  },
  { 
    level: 3, 
    label: 'Conflicto creciente', 
    emoji: '😟', 
    color: 'from-amber-400 to-amber-500', 
    textColor: 'text-amber-700', 
    bgColor: 'bg-amber-50 border-amber-300', 
    summary: 'Está aumentando la frustración o llanto' 
  },
  { 
    level: 4, 
    label: 'Gritos o alta tensión', 
    emoji: '😤', 
    color: 'from-orange-500 to-orange-600', 
    textColor: 'text-orange-700', 
    bgColor: 'bg-orange-50 border-orange-300', 
    summary: 'Gritos fuertes o llanto desbordado' 
  },
  { 
    level: 5, 
    label: 'Pérdida de control', 
    emoji: '🌋', 
    color: 'from-rose-500 to-red-600', 
    textColor: 'text-rose-700', 
    bgColor: 'bg-rose-50 border-rose-300', 
    summary: 'Pataleta física, desborde o peligro' 
  },
];

const IntensityScreen = ({ situation, onBack, onSelectIntensity }) => {
  const [selectedLevel, setSelectedLevel] = useState(3);

  const activeItem = intensityData.find(item => item.level === selectedLevel) || intensityData[2];

  return (
    <div className="flex flex-col bg-slate-50 w-full relative">
      <HelpHeader onBack={onBack} title="¿Qué tan intensa es?" />

      <div className="p-4 flex flex-col gap-4">
        {/* Resumen compacto de la situación elegida */}
        {situation && (
          <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Situación</span>
            <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100">
              <span className="text-base leading-none">{situation.icon}</span>
              <span className="text-xs font-bold text-slate-700">{situation.label}</span>
            </div>
          </div>
        )}

        {/* TERMÓMETRO VISUAL PRINCIPAL */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col items-center text-center gap-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Termómetro de Intensidad
          </span>

          {/* Emoji Gigante Animado con círculo de gradiente */}
          <div className="relative flex items-center justify-center my-1">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-b ${activeItem.color} flex items-center justify-center text-5xl shadow-md transition-all duration-300 transform scale-105`}>
              {activeItem.emoji}
            </div>
          </div>

          {/* Nivel y Etiqueta */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-slate-800">Nivel {activeItem.level}</span>
              <span className="text-xs font-bold text-slate-400">/ 5</span>
            </div>
            <span className={`text-sm font-extrabold ${activeItem.textColor} mt-0.5`}>
              {activeItem.label}
            </span>
            <span className="text-xs font-medium text-slate-500 mt-1 max-w-[230px]">
              {activeItem.summary}
            </span>
          </div>

          {/* Barra de progreso visual por segmentos */}
          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 flex gap-1 border border-slate-200/60">
            {intensityData.map((item) => (
              <div 
                key={item.level} 
                className={`flex-1 h-full rounded-full transition-all duration-300 ${
                  item.level <= selectedLevel 
                    ? `bg-gradient-to-r ${item.color}` 
                    : 'bg-slate-200/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* SELECTOR GRÁFICO DE 5 BOTONES DE NIVEL */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-700">Toca un nivel para cambiar:</span>
          
          <div className="grid grid-cols-5 gap-2">
            {intensityData.map((item) => {
              const isSelected = selectedLevel === item.level;
              return (
                <button
                  key={item.level}
                  onClick={() => setSelectedLevel(item.level)}
                  className={`py-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer border ${
                    isSelected 
                      ? `${item.bgColor} shadow-sm scale-105 ring-2 ring-offset-1 ring-slate-300 font-bold`
                      : 'bg-slate-50 border-slate-200/70 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl leading-none">{item.emoji}</span>
                  <span className="text-xs font-black">{item.level}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* BOTÓN DE CONFIRMACIÓN */}
        <button
          onClick={() => onSelectIntensity(selectedLevel)}
          className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer bg-gradient-to-r ${activeItem.color} hover:brightness-95 active:scale-[0.99]`}
        >
          <span>Continuar con Nivel {selectedLevel}</span>
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  );
};

export default IntensityScreen;
