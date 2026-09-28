import React, { useState, useEffect } from 'react';
import HelpHeader from './HelpHeader';
import { ArrowRight, ShieldCheck, Check, RotateCcw } from 'lucide-react';

const parentAlterationData = [
  { 
    level: 1, 
    label: 'Calma', 
    emoji: '😌', 
    color: 'from-emerald-400 to-emerald-500', 
    textColor: 'text-emerald-700', 
    bgColor: 'bg-emerald-50 border-emerald-300', 
    summary: 'Me siento sereno/a' 
  },
  { 
    level: 2, 
    label: 'Tensión leve', 
    emoji: '😐', 
    color: 'from-teal-400 to-teal-500', 
    textColor: 'text-teal-700', 
    bgColor: 'bg-teal-50 border-teal-300', 
    summary: 'Algo molesto/a, pero en control' 
  },
  { 
    level: 3, 
    label: 'Impaciencia', 
    emoji: '😟', 
    color: 'from-amber-400 to-amber-500', 
    textColor: 'text-amber-700', 
    bgColor: 'bg-amber-50 border-amber-300', 
    summary: 'Siento frustración y prisa' 
  },
  { 
    level: 4, 
    label: 'Alta tensión', 
    emoji: '😤', 
    color: 'from-orange-500 to-orange-600', 
    textColor: 'text-orange-700', 
    bgColor: 'bg-orange-50 border-orange-300', 
    summary: 'Impulsos de gritar' 
  },
  { 
    level: 5, 
    label: 'Desbordado/a', 
    emoji: '🌋', 
    color: 'from-rose-500 to-red-600', 
    textColor: 'text-rose-700', 
    bgColor: 'bg-rose-50 border-rose-300', 
    summary: 'Al límite de perder el control' 
  },
];

const emotionList = [
  { id: 'enojo', label: 'Enojo', emoji: '😡' },
  { id: 'frustracion', label: 'Frustración', emoji: '😤' },
  { id: 'impotencia', label: 'Impotencia', emoji: '🤦' },
  { id: 'culpa', label: 'Culpa', emoji: '😔' },
  { id: 'ansiedad', label: 'Ansiedad', emoji: '😰' },
  { id: 'cansancio', label: 'Cansancio', emoji: '😮‍💨' },
];

const intentOptions = [
  { id: 'calma', label: 'Enseñar a autorregularse con calma', emoji: '🌱' },
  { id: 'sin_gritar', label: 'Resolver problemas sin gritar', emoji: '💬' },
  { id: 'seguridad', label: 'Mantener la seguridad y el límite', emoji: '🛡️' },
];

const PauseScreen = ({ situation, intensity, onBack, onContinue }) => {
  // Wizard por Pasos (Una sola pregunta/acción por pantalla):
  // 1: Termómetro de Alteración del Padre
  // 2: Respiración Exprés (Solo si alteración de padre >= 4)
  // 3: Identificación de Emoción (Chips grandes de un solo toque)
  // 4: Intención Educativa (Chips grandes de un solo toque)
  // 'result': Contención Final (Si alteración de padre fue 4 o 5)
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedAlteration, setSelectedAlteration] = useState(3);
  const [selectedEmotion, setSelectedEmotion] = useState('frustracion');
  const [selectedIntent, setSelectedIntent] = useState(intentOptions[0].label);

  // Animación de respiración de 5 segundos
  const [breathPhase, setBreathPhase] = useState('Inhala...');
  const [breathCycle, setBreathCycle] = useState(1);

  const activeAlterationItem = parentAlterationData.find(item => item.level === selectedAlteration) || parentAlterationData[2];

  useEffect(() => {
    let timer;
    if (wizardStep === 2) {
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
  }, [wizardStep]);

  const handleSelectAlteration = (level) => {
    setSelectedAlteration(level);
    if (level >= 4) {
      setWizardStep(2); // Si la alteración del padre es 4 o 5 -> Paso de Respiración
    } else {
      setWizardStep(3); // Si es 1, 2 o 3 -> Directo a Emoción
    }
  };

  const handleFinishPause = () => {
    if (selectedAlteration >= 4) {
      setWizardStep('result');
    } else {
      onContinue({
        adultAlteration: selectedAlteration,
        emotion: selectedEmotion,
        intent: selectedIntent,
      });
    }
  };

  const totalSteps = selectedAlteration >= 4 ? 4 : 3;
  const currentStepNumber = wizardStep === 'result' ? totalSteps : wizardStep === 2 && selectedAlteration < 4 ? 2 : wizardStep > 2 && selectedAlteration < 4 ? wizardStep - 1 : wizardStep;

  return (
    <div className="flex flex-col bg-slate-50 w-full relative min-h-screen">
      <HelpHeader 
        onBack={() => {
          if (wizardStep > 1 && wizardStep !== 'result') {
            setWizardStep(prev => prev - 1);
          } else {
            onBack();
          }
        }} 
        title="Modo PAUSA — Primero tú" 
      />

      <div className="p-4 flex flex-col gap-4">
        {/* Banner de Validación Empática del Coach (Bajo esfuerzo de lectura) */}
        <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-teal-100 p-0.5 flex-shrink-0 border border-teal-200 flex items-center justify-center overflow-hidden">
            <img src="/coach_mascot.png" alt="Coach" className="w-full h-full object-contain" />
          </div>
          <p className="text-xs text-emerald-900 font-semibold leading-snug">
            "Antes de corregir, primero aseguramos tu propia tranquilidad."
          </p>
        </div>

        {/* Indicador de pasos visual limpio */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {wizardStep === 'result' ? 'Contención' : `Paso ${currentStepNumber} de ${totalSteps}`}
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  wizardStep === 'result' || currentStepNumber >= num 
                    ? 'w-6 bg-[#A9A0EC]' 
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* --- PASO 1: TERMÓMETRO VISUAL DE ALTERACIÓN DEL PADRE --- */}
        {wizardStep === 1 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                ¿Qué tan alterado/a estás en este momento?
              </span>

              {/* Emoji Gigante Dinámico */}
              <div className="relative flex items-center justify-center my-1">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-b ${activeAlterationItem.color} flex items-center justify-center text-5xl shadow-md transition-all duration-300 transform scale-105`}>
                  {activeAlterationItem.emoji}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black text-slate-800">Nivel {activeAlterationItem.level}</span>
                  <span className="text-xs font-bold text-slate-400">/ 5</span>
                </div>
                <span className={`text-sm font-extrabold ${activeAlterationItem.textColor} mt-0.5`}>
                  {activeAlterationItem.label}
                </span>
                <span className="text-xs font-medium text-slate-500 mt-1">
                  {activeAlterationItem.summary}
                </span>
              </div>

              {/* Barra por segmentos */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 flex gap-1 border border-slate-200/60">
                {parentAlterationData.map((item) => (
                  <div 
                    key={item.level} 
                    className={`flex-1 h-full rounded-full transition-all duration-300 ${
                      item.level <= selectedAlteration 
                        ? `bg-gradient-to-r ${item.color}` 
                        : 'bg-slate-200/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Selector de 5 botones gráficos */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-700">Toca para seleccionar tu nivel:</span>
              <div className="grid grid-cols-5 gap-2">
                {parentAlterationData.map((item) => {
                  const isSelected = selectedAlteration === item.level;
                  return (
                    <button
                      key={item.level}
                      onClick={() => setSelectedAlteration(item.level)}
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

            <button
              onClick={() => handleSelectAlteration(selectedAlteration)}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer bg-gradient-to-r ${activeAlterationItem.color} hover:brightness-95 active:scale-[0.99]`}
            >
              <span>Continuar ({selectedAlteration}/5)</span>
              <span>→</span>
            </button>
          </div>
        )}

        {/* --- PASO 2: RESPIRACIÓN EXPRÉS ANIMADA (SOLO SI ALTERACIÓN DE PADRE ES 4 O 5) --- */}
        {wizardStep === 2 && (
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center text-center gap-5 animate-fadeIn">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                Nivel de alteración alto ({selectedAlteration}/5)
              </span>
              <h3 className="text-base font-bold text-slate-800">
                Pausa de respiración para ti
              </h3>
            </div>

            {/* Círculo Animado de Respiración de 5 segundos */}
            <div className="relative w-36 h-36 flex items-center justify-center my-2">
              <div 
                className={`w-32 h-32 rounded-full bg-gradient-to-tr from-rose-100 to-amber-100 border-4 border-rose-300 flex items-center justify-center text-slate-700 font-extrabold text-sm transition-all duration-1000 transform ${
                  breathPhase === 'Inhala...' ? 'scale-110 shadow-md' : breathPhase === 'Sostén...' ? 'scale-105' : 'scale-95 shadow-xs'
                }`}
              >
                {breathPhase}
              </div>
              <div className="absolute -bottom-2 bg-white px-3 py-0.5 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 shadow-xs">
                Ciclo {breathCycle}
              </div>
            </div>

            <p className="text-xs text-slate-600 italic bg-rose-50 p-3 rounded-xl border border-rose-100 max-w-[260px] leading-relaxed">
              "No actúes de forma impulsiva. La regla se mantendrá, pero enseñaremos con calma."
            </p>

            <button
              onClick={() => setWizardStep(3)}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
            >
              <Check className="w-4 h-4" />
              <span>Ya me siento más tranquilo/a. Continuar</span>
            </button>
          </div>
        )}

        {/* --- PASO 3: IDENTIFICACIÓN DE EMOCIÓN (CHIPS DE UN SOLO TOQUE) --- */}
        {wizardStep === 3 && (
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-5 animate-fadeIn">
            <div className="flex flex-col gap-1 text-center">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">Paso de emoción</span>
              <h3 className="text-base font-bold text-slate-800">
                ¿Qué estás sintiendo principalmente?
              </h3>
            </div>

            {/* Chips grandes de Emojis */}
            <div className="grid grid-cols-2 gap-3">
              {emotionList.map((item) => {
                const isSelected = selectedEmotion === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedEmotion(item.id);
                      setWizardStep(4);
                    }}
                    className={`p-4 rounded-2xl flex items-center gap-3 transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-800 shadow-sm font-bold scale-102'
                        : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-3xl leading-none">{item.emoji}</span>
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- PASO 4: INTENCIÓN EDUCATIVA (CHIPS DE UN SOLO TOQUE) --- */}
        {wizardStep === 4 && (
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-5 animate-fadeIn">
            <div className="flex flex-col gap-1 text-center">
              <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider">Intención</span>
              <h3 className="text-base font-bold text-slate-800">
                ¿Qué quieres enseñarle con lo que vas a hacer?
              </h3>
            </div>

            <div className="flex flex-col gap-2.5">
              {intentOptions.map((item) => {
                const isSelected = selectedIntent === item.label;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedIntent(item.label);
                      handleFinishPause();
                    }}
                    className={`p-4 rounded-2xl flex items-center gap-3.5 text-xs text-left font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-teal-50 border-teal-300 text-teal-900 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-2xl leading-none flex-shrink-0">{item.emoji}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* --- CONTENCIÓN Y AVANCE FINAL (SI ALTERACIÓN DE PADRE FUE 4 O 5) --- */}
        {wizardStep === 'result' && (
          <div className="bg-rose-50/90 border border-rose-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider border-b border-rose-200/60 pb-2">
              <ShieldCheck className="w-5 h-5 text-rose-600" />
              <span>Contención Inmediata del Cuidador</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="text-sm font-bold text-rose-900">
                Estrategia alternativa de bajo estrés:
              </h4>
              <p className="text-xs text-rose-800 leading-relaxed font-medium bg-white p-3 rounded-xl border border-rose-100">
                Tómate 30 segundos más, baja el tono de voz y repite para ti: <span className="font-bold italic">"Necesito un momento"</span>.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <button
                onClick={() => setWizardStep(2)}
                className="w-full py-3 px-4 bg-white border border-rose-200 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Hacer otra respiración exprés</span>
              </button>

              <button
                onClick={() => {
                  onContinue({
                    adultAlteration: 3,
                    emotion: selectedEmotion,
                    intent: selectedIntent,
                  });
                }}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Ya estoy más calmado/a. Volver a la situación</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PauseScreen;
