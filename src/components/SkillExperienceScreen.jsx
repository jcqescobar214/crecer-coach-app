import React, { useState } from 'react';
import { savePlanHabit } from '../data/planStorage';
import { 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  AlertTriangle, 
  Target, 
  PlusCircle, 
  RotateCcw, 
  HelpCircle,
  Check,
  Award
} from 'lucide-react';

const STEP_NAMES = [
  '1. Mira qué pasa',
  '2. Elige la mejor opción',
  '3. Practica la fórmula',
  '4. Puedes decir',
  '5. Evita',
  '6. Pruébalo hoy',
  '7. Cierre y Mi Plan'
];

const SkillExperienceScreen = ({ skill, onBack, onComplete, onExploreOther }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Estado para la fase 2: Elige
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Estado para la fase 3: Practica
  const [selectedPracticeTemplate, setSelectedPracticeTemplate] = useState(0);
  
  // Estado para el modo voz de "Puedes decir" (fase 4)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // Estado para la fase 7: Añadir a Mi Plan
  const [addedToPlan, setAddedToPlan] = useState(false);

  // Navegación hacia atrás
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  // Navegación hacia adelante
  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  // Síntesis de voz para las frases modelo de la fase 4
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = skill.puedesDecir.join('. Pausa. ')
        .replace(/[“”"']/g, '');

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85;
      utterance.pitch = 0.95;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 4500);
    }
  };

  // Guardar en Mi Plan
  const handleAddToPlan = () => {
    savePlanHabit({
      id: skill.pruebaloHoy.habitKey,
      habitKey: skill.pruebaloHoy.habitKey,
      skillId: skill.id,
      title: skill.pruebaloHoy.title,
      description: skill.pruebaloHoy.description,
      skillTitle: skill.title,
      emoji: skill.emoji
    });
    setAddedToPlan(true);
  };

  return (
    <div className="flex flex-col bg-slate-50 w-full relative pb-28 min-h-[calc(100vh-80px)]">
      {/* Cabecera del Wizard */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 py-2.5 flex flex-col gap-2 shadow-xs">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer text-xs font-semibold"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            <span>{currentStep === 1 ? 'Catálogo' : 'Anterior'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-base">{skill.emoji}</span>
            <span className="text-xs font-black text-slate-800">
              {skill.title}
            </span>
          </div>

          <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            {currentStep}/7
          </span>
        </div>

        {/* Barra de Progreso de 7 Segmentos */}
        <div className="flex gap-1 w-full">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= currentStep 
                  ? 'bg-amber-500 shadow-xs' 
                  : 'bg-slate-200/80'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Contenido Dinámico según el Paso Actual */}
      <div className="p-4 flex flex-col gap-4 max-w-md mx-auto w-full">
        
        {/* Etiqueta del Paso */}
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400">
          <span>{STEP_NAMES[currentStep - 1]}</span>
          <span className="text-amber-600 font-bold">Micropráctica</span>
        </div>

        {/* ============================================================== */}
        {/* PASO 1: 👀 MIRA QUÉ PASA                                       */}
        {/* ============================================================== */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Tarjeta de Situación Cotidiana */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <span>Lo que suele ocurrir:</span>
              </span>

              <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100">
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {skill.miraQuePasa.dialogue}
                </p>
                <p className="text-xs text-rose-800 mt-2 font-medium italic">
                  → {skill.miraQuePasa.childReaction}
                </p>
              </div>
            </div>

            {/* Insight Empático del Coach */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 rounded-3xl p-4 shadow-xs flex items-center justify-between gap-3 overflow-hidden">
              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-white/80 self-start px-2.5 py-0.5 rounded-full border border-amber-200 mb-1.5 shadow-xs">
                  ¿Por qué ocurre esto?
                </span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {skill.miraQuePasa.coachInsight}
                </p>
              </div>

              <div className="w-20 h-24 flex-shrink-0 flex items-end justify-center -mr-1">
                <img 
                  src="/coach_mascot.png" 
                  alt="Coach" 
                  className="w-full h-full object-contain object-bottom drop-shadow-md" 
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 2: 🎮 ELIGE LA MEJOR OPCIÓN                                */}
        {/* ============================================================== */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-3.5 animate-fadeIn">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
              <p className="text-xs font-black text-slate-800 leading-snug">
                {skill.elige.prompt}
              </p>
            </div>

            {/* Opciones A, B, C */}
            <div className="flex flex-col gap-2.5">
              {skill.elige.options.map((opt) => {
                const isSelected = selectedOption?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt)}
                    className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                          : 'bg-amber-50 border-amber-300 shadow-sm'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {opt.text}
                      </span>
                      {isSelected && (
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                          opt.isCorrect ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                        }`}>
                          {opt.isCorrect ? '✓' : '!'}
                        </span>
                      )}
                    </div>

                    {/* Feedback Pedagógico Inmediato */}
                    {isSelected && (
                      <p className={`text-[11px] font-medium leading-relaxed pt-1.5 border-t ${
                        opt.isCorrect 
                          ? 'text-emerald-800 border-emerald-200' 
                          : 'text-amber-800 border-amber-200'
                      }`}>
                        {opt.feedback}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 3: ✋ PRACTICA LA FÓRMULA                                 */}
        {/* ============================================================== */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-3.5 animate-fadeIn">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                Entrenamiento Práctico
              </span>
              <p className="text-xs font-black text-slate-800 leading-snug">
                {skill.practica.prompt}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                💡 {skill.practica.helper}
              </p>
            </div>

            {/* Selector de Opciones de Práctica */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Selecciona una fórmula para probar hoy:
              </span>

              {skill.practica.options.map((item, idx) => {
                const isSelected = selectedPracticeTemplate === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPracticeTemplate(idx)}
                    className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 shadow-sm'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex flex-col text-xs">
                      <span className="font-black text-amber-800">{item.verb}</span>
                      <span className="font-semibold text-slate-700 mt-0.5">{item.action}</span>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 4: 💬 PUEDES DECIR (GUIONES LISTOS)                       */}
        {/* ============================================================== */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-3.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Guiones verbales listos para usar
              </span>

              <button
                onClick={handleToggleAudio}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                  isPlayingAudio
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce text-white' : 'text-amber-600'}`} />
                <span className="text-[11px]">{isPlayingAudio ? 'Escuchando...' : 'Modo Voz'}</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {skill.puedesDecir.map((phrase, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-indigo-100/90 shadow-xs flex items-start gap-3"
                >
                  <span className="text-indigo-400 font-serif text-2xl leading-none">“</span>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug tracking-tight">
                    {phrase.replace(/[“”]/g, '')}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 font-medium text-center mt-1">
              💡 Repítelas con tono firme, voz baja y contacto visual a su altura.
            </p>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 5: 🚫 EVITA (ANTI-PATRONES)                                */}
        {/* ============================================================== */}
        {currentStep === 5 && (
          <div className="flex flex-col gap-3.5 animate-fadeIn">
            <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 flex items-center gap-2 text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span className="text-xs font-black">
                Trampas frecuentes que debilitan esta habilidad:
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {skill.evita.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    ✕
                  </span>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 6: 🎯 PRUÉBALO HOY (MISIÓN DEL DÍA)                       */}
        {/* ============================================================== */}
        {currentStep === 6 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-md flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-xs">
                🎯
              </div>

              <span className="text-[11px] font-black uppercase tracking-widest text-amber-100">
                {skill.pruebaloHoy.badge}
              </span>

              <h2 className="text-lg font-black tracking-tight leading-snug">
                {skill.pruebaloHoy.title}
              </h2>

              <p className="text-xs font-medium text-amber-50 leading-relaxed max-w-xs">
                {skill.pruebaloHoy.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-slate-600 font-medium leading-snug">
                Al cumplir esta misión hoy, tu hijo experimentará mayor claridad y seguridad en la rutina diaria.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 7: ➕ CIERRE Y TRANSFERENCIA A MI PLAN                     */}
        {/* ============================================================== */}
        {currentStep === 7 && (
          <div className="flex flex-col items-center text-center gap-4 animate-fadeIn pt-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-xs">
              🎉
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-black text-slate-800">
                ¡Práctica terminada!
              </h2>
              <p className="text-xs text-slate-600 font-medium max-w-xs leading-relaxed">
                Hoy aprendiste una estrategia concreta de <strong>{skill.title}</strong>. Ahora llévala a una situación real.
              </p>
            </div>

            {/* Tarjeta de la Misión para Mi Plan */}
            <div className="w-full bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-2 text-left mt-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                Misión a incorporar en tu rutina:
              </span>
              <p className="text-xs font-black text-slate-800">
                {skill.pruebaloHoy.title}
              </p>
              <p className="text-[11px] text-slate-500">
                {skill.pruebaloHoy.description}
              </p>
            </div>

            {/* Botón Principal: Añadir a Mi Plan */}
            <button
              onClick={handleAddToPlan}
              disabled={addedToPlan}
              className={`w-full py-4 px-6 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                addedToPlan
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20 active:scale-[0.99]'
              }`}
            >
              {addedToPlan ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>¡Misión añadida con éxito a Mi Plan!</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                  <span>Añadir a Mi Plan de Hoy</span>
                </>
              )}
            </button>

            {/* Acciones Secundarias */}
            <div className="grid grid-cols-2 gap-2 w-full mt-1">
              <button
                onClick={onExploreOther}
                className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer text-center"
              >
                Practicar otra
              </button>

              <button
                onClick={onComplete}
                className="py-3 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer text-center"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Barra Fija Inferior con Botón de Avance */}
      {currentStep < 7 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-xs border-t border-slate-100 p-4 z-40">
          <button
            onClick={handleNext}
            disabled={currentStep === 2 && !selectedOption}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
              currentStep === 2 && !selectedOption
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20 active:scale-[0.99]'
            }`}
          >
            <span>Continuar al paso {currentStep + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillExperienceScreen;
