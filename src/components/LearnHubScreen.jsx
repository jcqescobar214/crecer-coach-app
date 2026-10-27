import React, { useState, useEffect } from 'react';
import { learnSkills } from '../data/learnBank';
import { isHabitInPlan } from '../data/planStorage';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  ChevronLeft 
} from 'lucide-react';

const LearnHubScreen = ({ onSelectSkill, onBack }) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'communication' | 'limits'
  const [habitsInPlan, setHabitsInPlan] = useState({});

  useEffect(() => {
    // Verificar cuáles habilidades ya están en Mi Plan
    const statusMap = {};
    learnSkills.forEach(skill => {
      statusMap[skill.id] = isHabitInPlan(skill.pruebaloHoy.habitKey);
    });
    setHabitsInPlan(statusMap);
  }, []);

  const filteredSkills = learnSkills.filter(skill => {
    if (filter === 'communication') {
      return ['habla_claro', 'elogia', 'da_ejemplo', 'ensena_que_hacer'].includes(skill.id);
    }
    if (filter === 'limits') {
      return ['anticipate', 'pon_limites', 'se_constante', 'motiva', 'practiquen_juntos'].includes(skill.id);
    }
    return true;
  });

  return (
    <div className="flex flex-col bg-slate-50 w-full relative pb-24">
      {/* Cabecera Principal */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-xs">
        {onBack ? (
          <button 
            onClick={onBack}
            className="p-1.5 -ml-1 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer text-xs font-semibold"
            aria-label="Volver"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            <span>Atrás</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
              💡
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Entrenamiento Kazdin
            </span>
          </div>
        )}

        <h1 className="text-base font-extrabold text-slate-800 tracking-tight">
          Quiero aprender
        </h1>

        <div className="w-8" /> {/* Placeholder para centrar */}
      </header>

      <div className="p-4 flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Banner Motivacional del Coach (Ajustado para Mobile) */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 border border-amber-200/80 rounded-3xl p-4 shadow-xs flex items-center justify-between relative overflow-hidden">
          <div className="flex flex-col flex-1 pr-3 z-10">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-white/90 self-start px-2.5 py-0.5 rounded-full border border-amber-200 shadow-xs mb-1.5">
              Método Kazdin • 2 min
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
              Aprende con microprácticas, no con teoría.
            </h2>
            <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
              "Elige una habilidad hoy y pruébala en tu próxima rutina."
            </p>
          </div>

          {/* Personaje 3D del Coach perfectamente escalado */}
          <div className="w-24 h-28 flex-shrink-0 flex items-end justify-center relative -mr-1">
            <img 
              src="/coach_mascot.png" 
              alt="Coach Crecer" 
              className="w-full h-full object-contain object-bottom drop-shadow-md hover:scale-105 transition-transform" 
            />
          </div>
        </div>

        {/* Filtros Rápidos (Bajo Esfuerzo Cognitivo) */}
        <div className="flex gap-1.5 p-1 bg-slate-200/60 rounded-2xl">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Todas (9)
          </button>
          <button
            onClick={() => setFilter('communication')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'communication'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Comunicación
          </button>
          <button
            onClick={() => setFilter('limits')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'limits'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Límites y Rutinas
          </button>
        </div>

        {/* Lista de Habilidades */}
        <div className="flex flex-col gap-3">
          {filteredSkills.map((skill) => {
            const inPlan = habitsInPlan[skill.id];

            return (
              <button
                key={skill.id}
                onClick={() => onSelectSkill(skill)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs hover:border-amber-300 transition-all text-left flex items-start gap-3.5 group cursor-pointer active:scale-[0.99]"
              >
                {/* Emoji / Icono con Número */}
                <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs relative">
                  <span>{skill.emoji}</span>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs">
                    {skill.number}
                  </span>
                </div>

                {/* Contenido */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h2 className="text-sm font-extrabold text-slate-800 group-hover:text-amber-700 transition-colors truncate">
                      {skill.title}
                    </h2>

                    {inPlan ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>En Mi Plan</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>2 min</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">
                    {skill.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100/80">
                    <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider">
                      Práctica interactiva Kazdin
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      <span>Empezar</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearnHubScreen;
