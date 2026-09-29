import React, { useState, useEffect } from 'react';
import HelpHeader from './HelpHeader';
import { ArrowRight, Wind, CheckCircle2, ShieldCheck, Volume2, Sparkles } from 'lucide-react';

const PauseScreen = ({ situation, intensity, onBack, onContinue }) => {
  // Modo de vista: 'choice' (decisión de 1 toque) | 'breathing' (respiración guiada exprés)
  const [viewMode, setViewMode] = useState('choice');

  // Animación del ciclo de respiración de 5 segundos
  const [breathPhase, setBreathPhase] = useState('Inhala...');
  const [breathCycle, setBreathCycle] = useState(1);

  useEffect(() => {
    let timer;
    if (viewMode === 'breathing') {
      timer = setInterval(() => {
        setBreathPhase((prev) => {
          if (prev === 'Inhala...') return 'Sostén...';
          if (prev === 'Sostén...') return 'Exhala...';
          setBreathCycle((c) => c + 1);
          return 'Inhala...';
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [viewMode]);

  return (
    <div className="flex flex-col bg-slate-50 w-full relative min-h-screen">
      <HelpHeader 
        onBack={() => {
          if (viewMode === 'breathing') {
            setViewMode('choice');
          } else {
            onBack();
          }
        }} 
        title="Modo PAUSA — Primero tú" 
      />

      <div className="p-4 flex flex-col gap-4">
        {/* Banner de Validación Empática del Coach */}
        <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-teal-100 p-0.5 flex-shrink-0 border border-teal-200 flex items-center justify-center overflow-hidden">
            <img src="/coach_mascot.png" alt="Coach" className="w-full h-full object-contain" />
          </div>
          <p className="text-xs text-emerald-900 font-semibold leading-snug">
            "Para calmar a tu hijo, primero cuidemos tu propia serenidad."
          </p>
        </div>

        {/* --- MODO ELECCIÓN DE 1 TOQUE (Sin cuestionarios en caliente) --- */}
        {viewMode === 'choice' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-2 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Decisión rápida en caliente
              </span>
              <h3 className="text-base font-bold text-slate-800">
                ¿Cómo te sientes tú para intervenir ahora?
              </h3>
            </div>

            {/* Opción 1: Listo para actuar */}
            <button
              onClick={() => onContinue({ adultAlteration: 2, neededBreathing: false })}
              className="p-5 rounded-2xl bg-white border-2 border-emerald-200 hover:border-emerald-400 shadow-sm flex items-start gap-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  Puedo manejarlo, dame el guion
                </span>
                <span className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Me siento en control para sostener el límite con calma y sin gritar.
                </span>
              </div>
            </button>

            {/* Opción 2: Necesito respirar */}
            <button
              onClick={() => setViewMode('breathing')}
              className="p-5 rounded-2xl bg-white border-2 border-rose-200 hover:border-rose-400 shadow-sm flex items-start gap-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Wind className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 group-hover:text-rose-700 transition-colors">
                  Estoy por explotar (Necesito respirar)
                </span>
                <span className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Siento mucha frustración. Dame 5 segundos para bajar la tensión antes de hablar.
                </span>
              </div>
            </button>
          </div>
        )}

        {/* --- MODO RESPIRACIÓN EXPRÉS (5 SEGUNDOS) --- */}
        {viewMode === 'breathing' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center gap-5 animate-fadeIn">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                Pausa de anclaje (5 segundos)
              </span>
              <h3 className="text-base font-bold text-slate-800">
                Baja los hombros y suelta el aire
              </h3>
            </div>

            {/* Círculo Animado de Respiración */}
            <div className="relative w-36 h-36 flex items-center justify-center my-2">
              <div 
                className={`w-32 h-32 rounded-full bg-gradient-to-tr from-rose-100 via-amber-50 to-teal-100 border-4 border-teal-300 flex items-center justify-center text-slate-800 font-black text-sm transition-all duration-1000 transform ${
                  breathPhase === 'Inhala...' ? 'scale-110 shadow-md' : breathPhase === 'Sostén...' ? 'scale-105' : 'scale-95 shadow-xs'
                }`}
              >
                {breathPhase}
              </div>
              <div className="absolute -bottom-2 bg-white px-3 py-0.5 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 shadow-xs">
                Ciclo {breathCycle}
              </div>
            </div>

            {/* Frase clave inmediata */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 italic max-w-[270px] leading-relaxed">
              "No actúes de forma impulsiva. La regla se mantendrá firme, pero enseñaremos en calma."
            </div>

            <button
              onClick={() => onContinue({ adultAlteration: 3, neededBreathing: true })}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Ya respiré. Ver orientación del niño</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PauseScreen;
