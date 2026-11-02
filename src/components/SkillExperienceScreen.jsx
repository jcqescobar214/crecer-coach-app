import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Lightbulb, 
  Clock, 
  Calendar, 
  Sun, 
  Sunset, 
  Moon, 
  Play, 
  CheckCircle2, 
  Sparkles,
  Award,
  Volume2
} from 'lucide-react';
import { savePlanHabit, recordLearningStep } from '../data/planStorage';

// Total de pasos en el recorrido de 8 fases (Paso 0 a 8 = 9 estados)
const TOTAL_DOTS = 9;

export default function SkillExperienceScreen({ skill, onBack, onComplete, onGoToPlan, onExploreOther }) {
  // 0 = Intro, 1 = Mira qué pasa, 2 = Elige, 3 = Mira cómo se hace, 
  // 4 = Practica, 5 = Puedes decir o hacer, 6 = Evita, 7 = Pruébalo hoy, 8 = ¡Listo!
  const [currentStep, setCurrentStep] = useState(0);

  // --- Step 2 (Elige) state ---
  const [step2Selection, setStep2Selection] = useState(null); // 'a' | 'b' | 'c'
  const [step2FeedbackVisible, setStep2FeedbackVisible] = useState(false);

  // --- Step 3 (Mira cómo se hace) audio state ---
  const [activeAudioPanel, setActiveAudioPanel] = useState(null);

  // --- Step 4 (Practica) state ---
  const activities = skill?.practica?.activities || [];
  const defaultActivityId = activities[0]?.id || 'act_1';
  const [activeActivity, setActiveActivity] = useState(defaultActivityId);
  const [step4Selections, setStep4Selections] = useState({});
  const [step4FeedbackVisible, setStep4FeedbackVisible] = useState({});

  // --- Step 7 (Pruébalo hoy) state ---
  const [selectedDuration, setSelectedDuration] = useState('5min'); // '2min' | '5min'
  const [selectedMoment, setSelectedMoment] = useState('tarde'); // 'manana' | 'tarde' | 'noche' | 'despues'

  // Si no hay datos de habilidad, pantalla de seguridad
  if (!skill) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <p className="text-slate-600 font-bold mb-4">No se encontró la habilidad seleccionada.</p>
        <button 
          onClick={onBack}
          className="bg-amber-500 text-white font-bold py-2 px-6 rounded-full"
        >
          Volver
        </button>
      </div>
    );
  }

  // Reproducir voz para Step 3
  const playSampleAudio = (panelIndex, text) => {
    if (activeAudioPanel === panelIndex) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setActiveAudioPanel(null);
      return;
    }

    setActiveAudioPanel(panelIndex);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[“”"']/g, ''));
      utterance.lang = 'es-ES';
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      utterance.onend = () => setActiveAudioPanel(null);
      utterance.onerror = () => setActiveAudioPanel(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setActiveAudioPanel(null), 3500);
    }
  };

  // Navegación
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack?.();
    }
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  // Step 2 selection
  const handleSelectStep2 = (optionId) => {
    setStep2Selection(optionId);
    setStep2FeedbackVisible(true);
    const chosen = skill.elige?.options?.find(o => o.id === optionId);
    if (chosen?.isCorrect) {
      recordLearningStep(skill.id, 'elige_opcion', 'identificado');
    } else {
      recordLearningStep(skill.id, 'elige_opcion', 'practicando');
    }
  };

  const handleRetryStep2 = () => {
    setStep2Selection(null);
    setStep2FeedbackVisible(false);
  };

  // Step 4 selection
  const handleSelectStep4 = (optionId) => {
    setStep4Selections(prev => ({ ...prev, [activeActivity]: optionId }));
    setStep4FeedbackVisible(prev => ({ ...prev, [activeActivity]: true }));
    const currentAct = activities.find(a => a.id === activeActivity);
    const chosen = currentAct?.options?.find(o => o.id === optionId);
    if (chosen?.isCorrect) {
      recordLearningStep(skill.id, `practica_${activeActivity}`, 'identificado');
    } else {
      recordLearningStep(skill.id, `practica_${activeActivity}`, 'practicando');
    }
  };

  const handleRetryStep4 = () => {
    setStep4Selections(prev => ({ ...prev, [activeActivity]: null }));
    setStep4FeedbackVisible(prev => ({ ...prev, [activeActivity]: false }));
  };

  // Step 7 guardado en plan
  const handleSaveMission = () => {
    const habitData = {
      id: skill.pruebaloHoy?.habitKey || `${skill.id}_mision`,
      habitKey: skill.pruebaloHoy?.habitKey || `${skill.id}_mision`,
      skillId: skill.id,
      title: `${selectedDuration === '2min' ? '2' : '5'} min: ${skill.pruebaloHoy?.title || skill.title}`,
      skillTitle: skill.title,
      description: skill.pruebaloHoy?.description || skill.tagline,
      duration: selectedDuration === '2min' ? '2 minutos' : '5 minutos',
      durationMinutes: selectedDuration === '2min' ? 2 : 5,
      timeOfDay: selectedMoment === 'manana' ? 'Mañana' 
                : selectedMoment === 'tarde' ? 'Tarde' 
                : selectedMoment === 'noche' ? 'Noche' 
                : 'Elegir después',
      status: 'Pendiente',
      icon: skill.emoji || '⭐'
    };
    savePlanHabit(habitData);
    recordLearningStep(skill.id, 'mision_programada', 'completado');
    setCurrentStep(8); // Ir a pantalla ¡Listo!
  };

  // Colores dinámicos con respaldo seguro
  const themeColor = skill.color || '#EAB308';
  const currentActData = activities.find(a => a.id === activeActivity) || activities[0] || {};
  const step2SelectedOpt = skill.elige?.options?.find(o => o.id === step2Selection);
  const step4SelectedOpt = currentActData.options?.find(o => o.id === step4Selections[activeActivity]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto w-full relative pb-12 select-none">
      {/* ========================================================================= */}
      {/* HEADER SUPERIOR CON NAVEGACIÓN Y PAGINACIÓN POR PUNTOS (9 DOTS)            */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-all cursor-pointer active:scale-95"
          aria-label="Volver"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-base font-black tracking-wider text-[#0F2942]">
            Crecer
          </span>
          <span className="text-[11px] font-semibold text-slate-500">
            Habilidad {skill.number || 3} de 10
          </span>
        </div>

        <div className="w-10 h-10 flex items-center justify-center text-xl">
          {skill.emoji || '⭐'}
        </div>
      </header>

      {/* Paginador de 9 puntos */}
      <div className="bg-white/80 backdrop-blur-xs py-2 px-4 border-b border-slate-100 flex items-center justify-center gap-1.5">
        {Array.from({ length: TOTAL_DOTS }).map((_, idx) => (
          <div 
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentStep 
                ? 'w-7 bg-amber-500' 
                : idx < currentStep 
                ? 'w-2 bg-amber-300' 
                : 'w-2 bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* CONTENIDO PRINCIPAL POR PASOS                                             */}
      {/* ========================================================================= */}
      <div className="p-4 flex flex-col gap-4">

        {/* ------------------------------------------------------------------------- */}
        {/* PASO 0: INTRODUCCIÓN                                                      */}
        {/* ------------------------------------------------------------------------- */}
        {currentStep === 0 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Badge de habilidad */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                Habilidad {skill.number} de 10
              </span>
            </div>

            {/* Título y subtítulo */}
            <div>
              <h1 className="text-3xl font-black text-[#0F2942] tracking-tight">
                {skill.title}
              </h1>
              <p className="text-sm font-semibold text-amber-700 mt-1">
                {skill.subtitle}
              </p>
            </div>

            {/* Hero Card con Ilustración y Resumen Pedagógico */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src={`/${skill.id}/illustration_intro.png`} 
                alt={skill.title} 
                className="w-full h-auto object-cover rounded-3xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Tarjeta ¿Por qué es importante? */}
            <div className="bg-amber-50/80 rounded-3xl p-5 border border-amber-200/80 flex flex-col items-center text-center shadow-xs">
              <h2 className="text-lg font-black text-[#0F2942] mb-2 tracking-tight">
                ¿Por qué es importante?
              </h2>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                {skill.whyImportant}
              </p>
            </div>

            {/* Botón ¡Vamos a empezar! */}
            <button
              onClick={handleNext}
              className="mt-2 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>¡Vamos a empezar!</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PASO 1: 1. MIRA QUÉ PASA                                                  */}
        {/* ------------------------------------------------------------------------- */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                {skill.miraQuePasa?.tag || '1. Mira qué pasa'}
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              {skill.miraQuePasa?.subtitle}
            </p>

            {/* Ilustración de la situación */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src={`/${skill.id}/illustration_mira.png`} 
                alt={skill.title} 
                className="w-full h-auto object-cover rounded-3xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Diálogo / Escenario Cotidiano */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-gradient-to-b from-amber-50/60 to-white p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-amber-800">
                <span className="text-lg">💬</span>
                <span className="text-xs font-black uppercase tracking-wider">Situación común</span>
              </div>
              <blockquote className="text-base font-extrabold text-[#0F2942] italic bg-white p-4 rounded-2xl border border-amber-200/60 shadow-xs leading-relaxed">
                {skill.miraQuePasa?.dialogue}
              </blockquote>
              {skill.miraQuePasa?.childReaction && (
                <p className="text-xs font-medium text-slate-600">
                  <span className="font-bold text-slate-700">Reacción habitual: </span>
                  {skill.miraQuePasa.childReaction}
                </p>
              )}
            </div>

            {/* Tarjeta ¿Sabías que...? */}
            <div className="bg-amber-50/80 rounded-3xl p-4 border border-amber-200/80 flex gap-3.5 items-start shadow-xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-base font-black text-[#0F2942] tracking-tight mb-1">
                  ¿Sabías que...?
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {skill.miraQuePasa?.didYouKnow}
                </p>
              </div>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={handleNext}
              className="mt-2 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PASO 2: 2. ELIGE                                                          */}
        {/* ------------------------------------------------------------------------- */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                {skill.elige?.tag || '2. Elige'}
              </span>
            </div>

            {/* Pregunta */}
            <p className="text-sm font-medium text-slate-800 leading-snug">
              {skill.elige?.prompt}
            </p>

            {/* Ilustración de situación */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src={skill.elige?.image || `/${skill.id}/illustration_elige.png`} 
                alt="Situación cotidiana" 
                className="w-full h-auto object-cover rounded-3xl"
                onError={(e) => {
                  e.currentTarget.parentElement.style.display = 'none';
                }}
              />
            </div>

            {/* Opciones con miniaturas */}
            <div className="flex flex-col gap-2.5">
              {skill.elige?.options?.map((opt) => {
                const isSelected = step2Selection === opt.id;
                const thumbSrc = opt.thumb || `/${skill.id}/thumb_opt_${opt.id}.png`;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectStep2(opt.id)}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-amber-50 border-amber-500 shadow-xs' 
                        : 'bg-white border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="w-16 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 bg-slate-50">
                      <img 
                        src={thumbSrc} 
                        alt={`Opción ${opt.id.toUpperCase()}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.parentElement.style.display = 'none';
                        }}
                      />
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug flex-1">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Retroalimentación inmediata */}
            {step2FeedbackVisible && step2SelectedOpt && (
              <div className={`rounded-2xl p-4 border flex gap-3 items-start animate-fadeIn shadow-xs ${
                step2SelectedOpt.isCorrect
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-rose-50 border-rose-100'
              }`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step2SelectedOpt.isCorrect ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-600'
                }`}>
                  <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col flex-1">
                  <h4 className={`text-sm font-black mb-1 ${
                    step2SelectedOpt.isCorrect ? 'text-amber-900' : 'text-rose-800'
                  }`}>
                    {step2SelectedOpt.isCorrect ? '¡Eso es!' : '¡Probemos otra forma!'}
                  </h4>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {step2SelectedOpt.feedback}
                  </p>
                </div>
              </div>
            )}

            {/* Botón de acción */}
            {step2FeedbackVisible && !step2SelectedOpt?.isCorrect ? (
              <button
                onClick={handleRetryStep2}
                className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
                <span>Intentar otra vez</span>
              </button>
            ) : (
              <button
                disabled={!step2FeedbackVisible || !step2SelectedOpt?.isCorrect}
                onClick={handleNext}
                className={`mt-1 w-full font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all ${
                  step2SelectedOpt?.isCorrect
                    ? 'bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Continuar</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PASO 3: 3. MIRA CÓMO SE HACE                                              */}
        {/* ------------------------------------------------------------------------- */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                {skill.miraComoSeHace?.tag || '3. Mira cómo se hace'}
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              {skill.miraComoSeHace?.subtitle}
            </p>

            {/* 2 Paneles de Demostración con Audio */}
            {skill.miraComoSeHace?.panels?.map((panel, idx) => {
              const panelImg = panel.image || `/${skill.id}/demo_panel_${idx + 1}.png`;
              const phraseText = panel.phrase || panel.text || '';
              return (
                <div key={idx} className="flex flex-col gap-2.5">
                  <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40 group">
                    <img 
                      src={panelImg} 
                      alt={`Ejemplo ${idx + 1}`} 
                      className="w-full h-auto object-cover max-h-56"
                      onError={(e) => {
                        e.currentTarget.parentElement.style.display = 'none';
                      }}
                    />
                    <button
                      onClick={() => playSampleAudio(idx + 1, panel.audioText || phraseText)}
                      className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                      aria-label={`Escuchar ejemplo ${idx + 1}`}
                    >
                      <Play className={`w-5 h-5 ${activeAudioPanel === (idx + 1) ? 'animate-pulse' : ''}`} fill="currentColor" />
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs">
                    <p className="text-xs sm:text-sm font-extrabold text-[#0F2942] italic leading-snug">
                      "{phraseText}"
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Mensaje del coach */}
            {skill.miraComoSeHace?.coachTip && (
              <div className="bg-amber-50/80 rounded-3xl p-4 border border-amber-200/80 flex gap-3.5 items-start shadow-xs">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-base font-black text-[#0F2942] tracking-tight mb-1">
                    Mensaje del coach
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                    {skill.miraComoSeHace.coachTip}
                  </p>
                </div>
              </div>
            )}

            {/* Botón Ahora practico */}
            <button
              onClick={handleNext}
              className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Ahora practico</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PASO 4: 4. PRACTICA                                                       */}
        {/* ------------------------------------------------------------------------- */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                {skill.practica?.tag || '4. Practica'}
              </span>
            </div>

            {/* 1. Selector de Actividades / Situaciones Cotidianas */}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-extrabold text-[#0F2942]">
                1. Elige una situación cotidiana
              </h3>
              <p className="text-xs font-medium text-slate-500">
                Selecciona el momento en el que más te gustaría poner a prueba esta habilidad:
              </p>

              {/* Grid 4 tabs */}
              <div className="grid grid-cols-4 gap-2 mt-1">
                {activities.map((act) => {
                  const isSelected = activeActivity === act.id;
                  const isImageIcon = typeof act.icon === 'string' && (act.icon.startsWith('/') || act.icon.includes('.png'));
                  return (
                    <button
                      key={act.id}
                      onClick={() => setActiveActivity(act.id)}
                      className={`p-2 rounded-2xl flex flex-col items-center gap-1.5 transition-all border cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-50 border-amber-500 shadow-xs scale-102' 
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="w-12 h-12 flex items-center justify-center">
                        {isImageIcon ? (
                          <img src={act.icon} alt={act.name} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-2xl">{act.icon}</span>
                        )}
                      </div>
                      <span className={`text-[11px] font-extrabold leading-tight text-center ${
                        isSelected ? 'text-amber-800' : 'text-slate-600'
                      }`}>
                        {act.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Observa la situación */}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-extrabold text-[#0F2942]">
                2. Observa la situación
              </h3>
              <p className="text-xs font-medium text-slate-500">
                {currentActData.sceneDescription || currentActData.situation || 'Observa la escena y reflexiona sobre la respuesta adecuada.'}
              </p>

              <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
                <img 
                  src={currentActData.image || currentActData.sceneImage || `/${skill.id}/practica_${activeActivity}.png`} 
                  alt={currentActData.name || 'Situación'} 
                  className="w-full h-auto object-cover max-h-48"
                  onError={(e) => {
                    e.currentTarget.parentElement.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* 3. Pregunta y Opciones */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-extrabold text-[#0F2942]">
                {currentActData.question}
              </h3>

              <div className="flex flex-col gap-2">
                {currentActData.options?.map((opt) => {
                  const currentSelection = step4Selections[activeActivity];
                  const isChosen = currentSelection === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectStep4(opt.id)}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        isChosen 
                          ? 'bg-amber-50 border-amber-500 shadow-xs' 
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isChosen ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                      }`}>
                        {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback de la opción seleccionada */}
            {step4FeedbackVisible[activeActivity] && step4SelectedOpt && (
              <div className={`rounded-2xl p-4 border flex gap-3 items-start animate-fadeIn shadow-xs ${
                step4SelectedOpt.isCorrect 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-rose-50 border-rose-100'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step4SelectedOpt.isCorrect ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-600'
                }`}>
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col flex-1">
                  <h4 className={`text-xs font-black mb-0.5 ${
                    step4SelectedOpt.isCorrect ? 'text-amber-900' : 'text-rose-800'
                  }`}>
                    {step4SelectedOpt.isCorrect ? '¡Muy bien!' : '¡Probemos otra opción!'}
                  </h4>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {step4SelectedOpt.feedback}
                  </p>
                </div>
              </div>
            )}

            {/* Tarjeta Recuerda */}
            <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-200/70 flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-lg">
                💡
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-amber-900">Recuerda</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  {skill.tagline}
                </p>
              </div>
            </div>

            {/* Botón de acción */}
            {step4FeedbackVisible[activeActivity] && !step4SelectedOpt?.isCorrect ? (
              <button
                onClick={handleRetryStep4}
                className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
                <span>Intentar otra vez</span>
              </button>
            ) : (
              <button
                disabled={!step4FeedbackVisible[activeActivity] || !step4SelectedOpt?.isCorrect}
                onClick={handleNext}
                className={`mt-1 w-full font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all ${
                  step4SelectedOpt?.isCorrect
                    ? 'bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Continuar</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PASO 5: 5. PUEDES DECIR O HACER                                           */}
        {/* ------------------------------------------------------------------------- */}
        {currentStep === 5 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                {skill.puedesDecirOHacer?.tag || '5. Puedes decir o hacer'}
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              {skill.puedesDecirOHacer?.subtitle}
            </p>

            {/* Grid 2x2 de conductas */}
            <div className="grid grid-cols-2 gap-3">
              {skill.puedesDecirOHacer?.cards?.map((card, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col justify-between">
                  <div>
                    {card.image && (
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                      />
                    )}
                    <span className="text-xs font-black text-[#0F2942] block mb-1">
                      {card.title}
                    </span>
                    {card.phrase && (
                      <p className="text-xs font-extrabold text-amber-800 italic leading-snug mb-1.5">
                        "{card.phrase}"
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 leading-tight">
                    {card.desc || card.tip}
                  </span>
                </div>
              ))}
            </div>

            {/* Tarjeta Recuerda */}
            {skill.puedesDecirOHacer?.reminder && (
              <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-200/70 flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-lg">
                  🗣️
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-amber-900">Recuerda</span>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {skill.puedesDecirOHacer.reminder}
                  </p>
                </div>
              </div>
            )}

            {/* Botón Continuar */}
            <button
              onClick={() => {
                recordLearningStep(skill.id, 'puedes_decir_hacer', 'revisado');
                handleNext();
              }}
              className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PASO 6: 6. EVITA                                                          */}
        {/* ------------------------------------------------------------------------- */}
        {currentStep === 6 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge en tono suave rojizo */}
            <div className="self-start">
              <span className="inline-block bg-rose-50 text-rose-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight border border-rose-100">
                {skill.evita?.tag || '6. Evita'}
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              {skill.evita?.subtitle}
            </p>

            {/* Grid 2x2 de errores */}
            <div className="grid grid-cols-2 gap-3">
              {skill.evita?.cards?.map((card, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col justify-between">
                  <div>
                    {card.image && (
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                      />
                    )}
                    <span className="text-xs font-black text-rose-800 block mb-1">
                      {card.title}
                    </span>
                    {card.phrase && (
                      <p className="text-xs font-bold text-slate-700 italic leading-snug mb-1.5">
                        "{card.phrase}"
                      </p>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 leading-tight">
                    {card.desc || card.why}
                  </span>
                </div>
              ))}
            </div>

            {/* Tarjeta Recuerda */}
            {skill.evita?.reminder && (
              <div className="bg-rose-50/70 rounded-2xl p-3.5 border border-rose-200/70 flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 text-lg">
                  ⚠️
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-rose-900">Recuerda</span>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {skill.evita.reminder}
                  </p>
                </div>
              </div>
            )}

            {/* Botón Continuar */}
            <button
              onClick={() => {
                recordLearningStep(skill.id, 'evita_conductas', 'revisado');
                handleNext();
              }}
              className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PASO 7: 7. PRUÉBALO HOY                                                   */}
        {/* ------------------------------------------------------------------------- */}
        {currentStep === 7 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                {skill.pruebaloHoy?.tag || '7. Pruébalo hoy'}
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Te proponemos una práctica sencilla para aplicar en tu próxima rutina en casa.
            </p>

            {/* Misión Card */}
            <div className="bg-amber-50/80 rounded-3xl p-5 border border-amber-200/80 flex flex-col gap-3 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    {skill.pruebaloHoy?.badge || 'Tu misión'}:
                  </span>
                  <h3 className="text-xl font-black text-[#0F2942] tracking-tight">
                    {skill.pruebaloHoy?.title || skill.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1">
                    {skill.pruebaloHoy?.description || skill.tagline}
                  </p>
                </div>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-white/60 shadow-xs mt-1">
                <img 
                  src={`/${skill.id}/illustration_mision.png`} 
                  alt={skill.title} 
                  className="w-full h-auto object-cover max-h-48" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Selector de Duración */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-800">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold">
                  Puedes elegir el tiempo que te funcione mejor:
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setSelectedDuration('2min')}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedDuration === '2min'
                      ? 'bg-amber-50 border-amber-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-[#0F2942]">2 minutos</span>
                    <span className="text-[11px] font-semibold text-slate-500">Versión breve</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedDuration === '2min' ? 'bg-amber-500 text-white' : 'border border-slate-300'
                  }`}>
                    {selectedDuration === '2min' && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  </div>
                </button>

                <button
                  onClick={() => setSelectedDuration('5min')}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedDuration === '5min'
                      ? 'bg-amber-50 border-amber-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-[#0F2942]">5 minutos</span>
                    <span className="text-[11px] font-semibold text-slate-500">Tiempo completo</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedDuration === '5min' ? 'bg-amber-500 text-white' : 'border border-slate-300'
                  }`}>
                    {selectedDuration === '5min' && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  </div>
                </button>
              </div>
            </div>

            {/* Selector de Momento del día */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-800">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold">
                  ¿Cuándo podrías hacerlo? Elige el momento del día:
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'manana', label: 'Mañana', icon: Sun },
                  { id: 'tarde', label: 'Tarde', icon: Sunset },
                  { id: 'noche', label: 'Noche', icon: Moon },
                  { id: 'despues', label: 'Elegir después', icon: Calendar }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedMoment === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedMoment(item.id)}
                      className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-xs font-extrabold' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 font-semibold'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[10px] leading-tight text-center">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tarjeta Recuerda */}
            {skill.pruebaloHoy?.reminder && (
              <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-200/70 flex gap-3 items-start">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-lg">
                  💡
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-amber-900">Recuerda</span>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {skill.pruebaloHoy.reminder}
                  </p>
                </div>
              </div>
            )}

            {/* Botón Añadir a Mi plan */}
            <button
              onClick={handleSaveMission}
              className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Añadir a Mi plan</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* PASO 8: CONFIRMACIÓN: ¡LISTO!                                             */}
        {/* ------------------------------------------------------------------------- */}
        {currentStep === 8 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Ilustración de Celebración */}
            <div className="w-full flex justify-center py-1">
              <img 
                src={`/${skill.id}/illustration_listo.png`} 
                alt="Celebración" 
                className="w-64 h-auto object-contain rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = "/habla_claro/illustration_listo.png";
                }}
              />
            </div>

            {/* Tarjeta de Confirmación */}
            <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-200/80 flex flex-col items-center text-center shadow-xs">
              <h2 className="text-2xl font-black text-[#0F2942] tracking-tight">
                ¡Listo!
              </h2>
              <h3 className="text-base font-extrabold text-[#0F2942] mt-1">
                Tu práctica quedó guardada.
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 leading-relaxed">
                Cuando la realices en tu rutina, vuelve a Mi plan y cuéntanos cómo te fue.
              </p>
            </div>

            {/* Tarjeta Detalle de la Práctica Pendiente */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Tu práctica pendiente
              </span>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 p-1 flex items-center justify-center overflow-hidden">
                    <img 
                      src={`/${skill.id}/illustration_intro.png`} 
                      alt={skill.title} 
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-extrabold text-[#0F2942]">
                      {skill.pruebaloHoy?.title || skill.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      {skill.pruebaloHoy?.description || skill.tagline}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold">
                  Pendiente
                </span>
              </div>

              {/* Grid 2 columnas: Duración y Momento */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Duración</span>
                    <span className="text-xs font-extrabold text-slate-800">
                      {selectedDuration === '2min' ? '2 minutos' : '5 minutos'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Momento del día</span>
                    <span className="text-xs font-extrabold text-slate-800 capitalize">
                      {selectedMoment === 'despues' ? 'Por definir' : selectedMoment}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones Finales */}
            <div className="flex flex-col gap-2.5 mt-2">
              <button
                onClick={onGoToPlan}
                className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Ir a Mi plan</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>

              <button
                onClick={onComplete}
                className="w-full bg-white hover:bg-slate-50 border-2 border-amber-500 active:scale-[0.99] text-amber-600 font-extrabold text-base py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Seguir aprendiendo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
