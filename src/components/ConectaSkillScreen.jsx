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
  Award
} from 'lucide-react';
import { savePlanHabit, recordLearningStep } from '../data/planStorage';

// Dots pagination count for Conecta y juega
const TOTAL_DOTS = 9;

export default function ConectaSkillScreen({ onBack, onComplete, onGoToPlan }) {
  // Step index: 0 = Intro, 1 = Mira qué pasa, 2 = Elige, 3 = Mira cómo se hace, 
  // 4 = Practica, 5 = Puedes decir o hacer, 6 = Evita, 7 = Pruébalo hoy, 8 = ¡Listo!
  const [currentStep, setCurrentStep] = useState(0);

  // --- Step 2 (Elige) state ---
  const [step2Selection, setStep2Selection] = useState(null); // 'a' | 'b' | 'c'
  const [step2FeedbackVisible, setStep2FeedbackVisible] = useState(false);

  // --- Step 3 (Mira cómo se hace) audio / demo state ---
  const [activeAudioPanel, setActiveAudioPanel] = useState(null);

  // --- Step 4 (Practica) state ---
  const [activeActivity, setActiveActivity] = useState('bloques'); // 'bloques' | 'carros' | 'dibujar' | 'munecos'
  const [step4Selections, setStep4Selections] = useState({}); // { [activityId]: optionId }
  const [step4FeedbackVisible, setStep4FeedbackVisible] = useState({}); // { [activityId]: boolean }

  // --- Step 7 (Pruébalo hoy) state ---
  const [selectedDuration, setSelectedDuration] = useState('5min'); // '2min' | '5min'
  const [selectedMoment, setSelectedMoment] = useState('tarde'); // 'manana' | 'tarde' | 'noche' | 'despues'

  // Navigation handlers
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

  // Step 2 selection handler
  const handleSelectStep2 = (optionId) => {
    setStep2Selection(optionId);
    setStep2FeedbackVisible(true);
    if (optionId === 'b') {
      recordLearningStep('conecta', 'elige_bloques', 'identificado');
    } else {
      recordLearningStep('conecta', 'elige_bloques', 'practicando');
    }
  };

  const handleRetryStep2 = () => {
    setStep2Selection(null);
    setStep2FeedbackVisible(false);
  };

  // Step 4 selection handler
  const handleSelectStep4 = (optionId) => {
    setStep4Selections(prev => ({ ...prev, [activeActivity]: optionId }));
    setStep4FeedbackVisible(prev => ({ ...prev, [activeActivity]: true }));
    if (optionId === 'b') {
      recordLearningStep('conecta', `practica_${activeActivity}`, 'identificado');
    } else {
      recordLearningStep('conecta', `practica_${activeActivity}`, 'practicando');
    }
  };

  const handleRetryStep4 = () => {
    setStep4Selections(prev => ({ ...prev, [activeActivity]: null }));
    setStep4FeedbackVisible(prev => ({ ...prev, [activeActivity]: false }));
  };

  // Step 7 confirmation handler
  const handleSaveMission = () => {
    const habitData = {
      id: 'conecta_5_minutos_juntos',
      habitKey: 'conecta_5_minutos_juntos',
      skillId: 'conecta',
      title: `${selectedDuration === '2min' ? '2' : '5'} minutos juntos`,
      skillTitle: 'Conecta y juega',
      description: 'Deja que tu hijo elija un juego seguro. Acompáñalo sin dirigir.',
      duration: selectedDuration === '2min' ? '2 minutos' : '5 minutos',
      durationMinutes: selectedDuration === '2min' ? 2 : 5,
      timeOfDay: selectedMoment === 'manana' ? 'Mañana' 
                : selectedMoment === 'tarde' ? 'Tarde' 
                : selectedMoment === 'noche' ? 'Noche' 
                : 'Elegir después',
      status: 'Pendiente',
      icon: '/conecta/icon_blocks.png'
    };
    savePlanHabit(habitData);
    recordLearningStep('conecta', 'mision_programada', 'completado');
    setCurrentStep(8); // Ir a pantalla ¡Listo!
  };

  // Practice activities definitions for Step 4
  const activitiesData = {
    bloques: {
      name: 'Bloques',
      icon: '/conecta/tab_bloques.png',
      image: '/conecta/practica_bloques.png',
      question: '¿Qué podrías decir para acompañar su juego?',
      options: [
        { id: 'a', text: 'A. Pon ese bloque aquí.', isCorrect: false, feedback: 'Le estás indicando dónde ponerlo. Prueba comentar lo que está haciendo.' },
        { id: 'b', text: 'B. Estás poniendo un bloque sobre otro.', isCorrect: true, feedback: '¡Muy bien! Comentaste lo que hace sin cambiar su juego.' },
        { id: 'c', text: 'C. Haz una torre más alta.', isCorrect: false, feedback: 'Así le estás diciendo cómo jugar. Prueba observar lo que está haciendo.' }
      ]
    },
    carros: {
      name: 'Carros',
      icon: '/conecta/tab_carros.png',
      image: '/conecta/card_describe.png',
      question: '¿Qué podrías decir para acompañar su juego?',
      options: [
        { id: 'a', text: 'A. Haz que el carro vaya más rápido.', isCorrect: false, feedback: 'Así le estás diciendo cómo jugar. Prueba observar lo que está haciendo.' },
        { id: 'b', text: 'B. Tu carro está recorriendo el piso.', isCorrect: true, feedback: '¡Muy bien! Comentaste lo que hace sin cambiar su juego.' },
        { id: 'c', text: 'C. Ahora lleva el carro al garaje.', isCorrect: false, feedback: 'Le estás indicando qué hacer después. En este momento buscamos seguir su iniciativa.' }
      ]
    },
    dibujar: {
      name: 'Dibujar',
      icon: '/conecta/tab_dibujar.png',
      image: '/conecta/tab_dibujar.png',
      question: '¿Qué podrías decir para acompañar su juego?',
      options: [
        { id: 'a', text: 'A. Dibuja un árbol.', isCorrect: false, feedback: 'Le estás diciendo qué dibujar. En este momento queremos dejar que él decida.' },
        { id: 'b', text: 'B. Estás haciendo muchas líneas de colores.', isCorrect: true, feedback: '¡Eso es! Describiste lo que está haciendo sin cambiar su dibujo.' },
        { id: 'c', text: 'C. Pinta también aquí.', isCorrect: false, feedback: 'Así estás dirigiendo su dibujo. Prueba comentar lo que ya está haciendo.' }
      ]
    },
    munecos: {
      name: 'Muñecos',
      icon: '/conecta/tab_munecos.png',
      image: '/conecta/card_responde.png',
      question: '¿Qué podrías decir para acompañar su juego?',
      options: [
        { id: 'a', text: 'A. Ahora dale de comer.', isCorrect: false, feedback: 'Estás proponiendo qué debe pasar después. Prueba seguir la historia que está creando.' },
        { id: 'b', text: 'B. Estás acostando a tu muñeco.', isCorrect: true, feedback: '¡Muy bien! Describiste lo que hace sin cambiar su juego.' },
        { id: 'c', text: 'C. No, primero tienes que bañarlo.', isCorrect: false, feedback: 'Así estás corrigiendo su manera de jugar. Deja que él decida cómo continúa la historia.' }
      ]
    }
  };

  // Synthesize audio sample for Step 3 panels
  const playSampleAudio = (panelId, phrase) => {
    setActiveAudioPanel(panelId);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      utterance.onend = () => setActiveAudioPanel(null);
      utterance.onerror = () => setActiveAudioPanel(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setActiveAudioPanel(null), 2500);
    }
  };

  // Render Top Header with 9-dot pagination
  const renderHeader = () => {
    // Determine which dot is active (currentStep: 0..8)
    const activeDotIndex = currentStep;

    return (
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 flex flex-col items-center">
        <div className="w-full flex items-center justify-between">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-[#E0F7F6] text-[#00A896] hover:bg-[#cbf1ef] active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Volver"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div className="flex flex-col items-center text-center">
            <span className="text-base font-black tracking-wider text-[#0F2942] uppercase">
              CRECER
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              Habilidad 1 de 9
            </span>
          </div>

          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/conecta/sprout_logo.png" 
              alt="Crecer Sprout" 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }} 
            />
          </div>
        </div>

        {/* 9 Dots Pagination Indicator */}
        <div className="flex items-center gap-1.5 mt-2 mb-1">
          {Array.from({ length: TOTAL_DOTS }).map((_, index) => {
            const isActive = index === activeDotIndex;
            return (
              <span
                key={index}
                className={`transition-all duration-300 rounded-full ${
                  isActive 
                    ? 'w-5 h-2 bg-[#00A896]' 
                    : 'w-2 h-2 bg-slate-200'
                }`}
              />
            );
          })}
        </div>
      </header>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto w-full relative pb-10">
      {renderHeader()}

      <div className="p-4 flex flex-col gap-4 flex-1">
        {/* ========================================================================= */}
        {/* PASO 0: PANTALLA INICIAL · CONECTA Y JUEGA                                 */}
        {/* ========================================================================= */}
        {currentStep === 0 && (
          <div className="flex flex-col gap-5 animate-fadeIn">
            <h1 className="text-3xl font-black text-[#0F2942] text-center tracking-tight mt-1">
              Conecta y juega
            </h1>

            {/* Ilustración Principal */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/conecta/illustration_intro.png" 
                alt="Madre e hijo jugando con bloques" 
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* Tarjeta ¿Por qué es importante? */}
            <div className="bg-[#E8F8F7] rounded-3xl p-5 border border-[#C8EEEC] flex flex-col items-center text-center shadow-xs">
              <h2 className="text-lg font-black text-[#0F2942] mb-2 tracking-tight">
                ¿Por qué es importante?
              </h2>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                Cuando dejas que tu hijo dirija el juego, le demuestras que te interesa lo que hace. Jugar juntos fortalece su vínculo.
              </p>
            </div>

            {/* Botón ¡Vamos a empezar! */}
            <button
              onClick={handleNext}
              className="mt-2 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>¡Vamos a empezar!</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 1: 1. MIRA QUÉ PASA                                                  */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-[#E0F7F6] text-[#0A3B5C] font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                1. Mira qué pasa
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Observa esta situación. Fíjate en lo que hace el adulto y cómo puede influir en el juego de su hijo.
            </p>

            {/* Ilustración de la situación con diálogo */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/conecta/illustration_mira.png" 
                alt="Adulto dando orden durante el juego" 
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* Tarjeta ¿Te ha pasado? */}
            <div className="bg-[#E8F8F7] rounded-3xl p-4 border border-[#C8EEEC] flex gap-3.5 items-start shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#D1F2EF] text-[#00A896] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-base font-black text-[#0F2942] tracking-tight mb-1">
                  ¿Te ha pasado?
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  A veces, sin darnos cuenta, les decimos a nuestros hijos cómo deben jugar. Aunque queremos ayudar, terminamos decidiendo por ellos y les dejamos poco espacio para explorar y crear a su manera.
                </p>
              </div>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={handleNext}
              className="mt-2 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 2: 2. ELIGE                                                          */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-[#E0F7F6] text-[#0A3B5C] font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                2. Elige
              </span>
            </div>

            {/* Pregunta */}
            <p className="text-sm font-medium text-slate-800 leading-snug">
              Tu hijo está construyendo una torre con bloques. <span className="font-extrabold">¿Qué harías?</span>
            </p>

            {/* Ilustración de situación */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/conecta/illustration_elige.png" 
                alt="Niño construyendo torre" 
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* Opciones con miniaturas */}
            <div className="flex flex-col gap-2.5">
              {/* Opción A */}
              <button
                onClick={() => handleSelectStep2('a')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  step2Selection === 'a' 
                    ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs' 
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  step2Selection === 'a' ? 'border-[#00A896] bg-[#00A896]' : 'border-slate-300'
                }`}>
                  {step2Selection === 'a' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="w-16 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src="/conecta/thumb_opt_a.png" alt="Opción A" className="w-full h-full object-cover" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  A. Le digo cómo hacerla más alta.
                </span>
              </button>

              {/* Opción B (Esperada / Correcta) */}
              <button
                onClick={() => handleSelectStep2('b')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  step2Selection === 'b' 
                    ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs' 
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  step2Selection === 'b' ? 'border-[#00A896] bg-[#00A896]' : 'border-slate-300'
                }`}>
                  {step2Selection === 'b' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="w-16 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src="/conecta/thumb_opt_b.png" alt="Opción B" className="w-full h-full object-cover" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  B. Observo y digo: “¡Estás construyendo una torre!”.
                </span>
              </button>

              {/* Opción C */}
              <button
                onClick={() => handleSelectStep2('c')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  step2Selection === 'c' 
                    ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs' 
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  step2Selection === 'c' ? 'border-[#00A896] bg-[#00A896]' : 'border-slate-300'
                }`}>
                  {step2Selection === 'c' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="w-16 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src="/conecta/thumb_opt_c.png" alt="Opción C" className="w-full h-full object-cover" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  C. Le pregunto qué colores está usando.
                </span>
              </button>
            </div>

            {/* Retroalimentación inmediata */}
            {step2FeedbackVisible && (
              <div className={`rounded-2xl p-4 border flex gap-3 items-start animate-fadeIn shadow-xs ${
                step2Selection === 'b' 
                  ? 'bg-[#E8F8F7] border-[#C8EEEC]' 
                  : 'bg-rose-50 border-rose-100'
              }`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step2Selection === 'b' ? 'bg-[#D1F2EF] text-[#00A896]' : 'bg-rose-100 text-rose-600'
                }`}>
                  <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col flex-1">
                  <h4 className={`text-sm font-black mb-1 ${
                    step2Selection === 'b' ? 'text-[#0A3B5C]' : 'text-rose-800'
                  }`}>
                    {step2Selection === 'b' ? '¡Eso es!' : '¡Probemos otra forma!'}
                  </h4>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {step2Selection === 'b' && '¡Eso es! Estás mostrando interés sin dirigir el juego.'}
                    {step2Selection === 'a' && 'Cuando le dices cómo hacer la torre, terminas dirigiendo su juego. Aunque quieres ayudar, es mejor dejar que él decida cómo construirla.'}
                    {step2Selection === 'c' && 'Preguntar no está mal. Ahora practica comentar lo que hace, sin convertir el juego en preguntas.'}
                  </p>
                </div>
              </div>
            )}

            {/* Botón de acción */}
            {step2FeedbackVisible && step2Selection !== 'b' ? (
              <button
                onClick={handleRetryStep2}
                className="mt-1 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
                <span>Intentar otra vez</span>
              </button>
            ) : (
              <button
                disabled={!step2FeedbackVisible || step2Selection !== 'b'}
                onClick={handleNext}
                className={`mt-1 w-full font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all ${
                  step2Selection === 'b'
                    ? 'bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Continuar</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 3: 3. MIRA CÓMO SE HACE                                              */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-[#E0F7F6] text-[#0A3B5C] font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                3. Mira cómo se hace
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Observa dos ejemplos de cómo acompañar el juego de tu hijo sin dirigirlo.
            </p>

            {/* Viñeta 1 */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40 group">
              <img 
                src="/conecta/demo_panel_1.png" 
                alt="Ejemplo 1: Estás poniendo un bloque sobre otro" 
                className="w-full h-auto object-cover"
              />
              <button
                onClick={() => playSampleAudio(1, "¡Estás poniendo un bloque sobre otro!")}
                className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-[#00A896] hover:bg-[#009282] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                aria-label="Escuchar ejemplo 1"
              >
                <Play className={`w-5 h-5 ${activeAudioPanel === 1 ? 'animate-pulse' : ''}`} fill="currentColor" />
              </button>
            </div>

            {/* Viñeta 2 */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40 group">
              <img 
                src="/conecta/demo_panel_2.png" 
                alt="Ejemplo 2: Gracias, voy a ponerlo contigo" 
                className="w-full h-auto object-cover"
              />
              <button
                onClick={() => playSampleAudio(2, "Gracias, voy a ponerlo contigo.")}
                className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-[#00A896] hover:bg-[#009282] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                aria-label="Escuchar ejemplo 2"
              >
                <Play className={`w-5 h-5 ${activeAudioPanel === 2 ? 'animate-pulse' : ''}`} fill="currentColor" />
              </button>
            </div>

            {/* Mensaje del coach */}
            <div className="bg-[#E8F8F7] rounded-3xl p-4 border border-[#C8EEEC] flex gap-3.5 items-start shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#D1F2EF] text-[#00A896] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-base font-black text-[#0F2942] tracking-tight mb-1">
                  Mensaje del coach
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  Puedes acompañar el juego observando, comentando o imitando lo que hace tu hijo, sin decirle cómo debe jugar.
                </p>
              </div>
            </div>

            {/* Botón Ahora practico */}
            <button
              onClick={handleNext}
              className="mt-1 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Ahora practico</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 4: 4. PRACTICA                                                       */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-[#E0F7F6] text-[#0A3B5C] font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                4. Practica
              </span>
            </div>

            {/* 1. Selector de Actividad */}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-extrabold text-[#0F2942]">
                1. Elige una actividad de juego
              </h3>
              <p className="text-xs font-medium text-slate-500">
                Selecciona la situación que más se parezca a lo que hace tu hijo.
              </p>

              {/* Grid 4 tabs */}
              <div className="grid grid-cols-4 gap-2 mt-1">
                {Object.keys(activitiesData).map((actKey) => {
                  const act = activitiesData[actKey];
                  const isSelected = activeActivity === actKey;

                  return (
                    <button
                      key={actKey}
                      onClick={() => {
                        setActiveActivity(actKey);
                      }}
                      className={`p-2 rounded-2xl flex flex-col items-center gap-1.5 transition-all border cursor-pointer ${
                        isSelected 
                          ? 'bg-[#E8F8F7] border-[#00A896] shadow-xs scale-102' 
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img 
                          src={act.icon} 
                          alt={act.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className={`text-[11px] font-extrabold ${
                        isSelected ? 'text-[#00A896]' : 'text-slate-600'
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
                Mira qué está haciendo tu hijo en su juego.
              </p>

              <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
                <img 
                  src={activitiesData[activeActivity].image} 
                  alt={activitiesData[activeActivity].name} 
                  className="w-full h-auto object-cover max-h-48"
                />
              </div>
            </div>

            {/* 3. Pregunta y Opciones */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-extrabold text-[#0F2942]">
                3. {activitiesData[activeActivity].question}
              </h3>

              <div className="flex flex-col gap-2">
                {activitiesData[activeActivity].options.map((opt) => {
                  const currentSelection = step4Selections[activeActivity];
                  const isChosen = currentSelection === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectStep4(opt.id)}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isChosen 
                          ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs' 
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isChosen ? 'border-[#00A896] bg-[#00A896]' : 'border-slate-300'
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
            {step4FeedbackVisible[activeActivity] && (
              <div className={`rounded-2xl p-4 border flex gap-3 items-start animate-fadeIn shadow-xs ${
                step4Selections[activeActivity] === 'b' 
                  ? 'bg-[#E8F8F7] border-[#C8EEEC]' 
                  : 'bg-rose-50 border-rose-100'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step4Selections[activeActivity] === 'b' ? 'bg-[#D1F2EF] text-[#00A896]' : 'bg-rose-100 text-rose-600'
                }`}>
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col flex-1">
                  <h4 className={`text-xs font-black mb-0.5 ${
                    step4Selections[activeActivity] === 'b' ? 'text-[#0A3B5C]' : 'text-rose-800'
                  }`}>
                    {step4Selections[activeActivity] === 'b' ? '¡Muy bien!' : '¡Probemos otra opción!'}
                  </h4>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {activitiesData[activeActivity].options.find(o => o.id === step4Selections[activeActivity])?.feedback}
                  </p>
                </div>
              </div>
            )}

            {/* Tarjeta Recuerda */}
            <div className="bg-[#F0F4FF] rounded-2xl p-3.5 border border-[#DCE4FF] flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-[#E0EAFF] flex items-center justify-center flex-shrink-0 text-lg">
                👩‍👦
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-[#1E3A8A]">Recuerda</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  Puedes acompañar el juego observando, comentando o imitando lo que hace tu hijo, sin dirigirlo.
                </p>
              </div>
            </div>

            {/* Botón de acción */}
            {step4FeedbackVisible[activeActivity] && step4Selections[activeActivity] !== 'b' ? (
              <button
                onClick={handleRetryStep4}
                className="mt-1 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
                <span>Intentar otra vez</span>
              </button>
            ) : (
              <button
                disabled={!step4FeedbackVisible[activeActivity] || step4Selections[activeActivity] !== 'b'}
                onClick={handleNext}
                className={`mt-1 w-full font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all ${
                  step4Selections[activeActivity] === 'b'
                    ? 'bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Continuar</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 5: 5. PUEDES DECIR O HACER                                           */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-[#E0F7F6] text-[#0A3B5C] font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                5. Puedes decir o hacer
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Durante el juego puedes acompañar a tu hijo de diferentes formas. Aquí te mostramos cuatro conductas que fortalecen la conexión y el disfrute.
            </p>

            {/* Grid 2x2 de conductas */}
            <div className="grid grid-cols-2 gap-3">
              {/* Observa */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/conecta/card_observa.png" 
                  alt="Observa" 
                  className="w-full h-auto object-cover rounded-2xl mb-1" 
                />
              </div>

              {/* Describe */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/conecta/card_describe.png" 
                  alt="Describe" 
                  className="w-full h-auto object-cover rounded-2xl mb-1" 
                />
              </div>

              {/* Imita */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/conecta/card_imita.png" 
                  alt="Imita" 
                  className="w-full h-auto object-cover rounded-2xl mb-1" 
                />
              </div>

              {/* Responde */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/conecta/card_responde.png" 
                  alt="Responde" 
                  className="w-full h-auto object-cover rounded-2xl mb-1" 
                />
              </div>
            </div>

            {/* Tarjeta Recuerda */}
            <div className="bg-[#F0F4FF] rounded-2xl p-3.5 border border-[#DCE4FF] flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-[#E0EAFF] flex items-center justify-center flex-shrink-0 text-lg">
                👩‍👦
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-[#1E3A8A]">Recuerda</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  Mientras juegan, puedes observar, comentar, imitar y responder a tu hijo. Lo importante es acompañarlo y dejar que él lleve la iniciativa.
                </p>
              </div>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={() => {
                recordLearningStep('conecta', 'puedes_decir_hacer', 'revisado');
                handleNext();
              }}
              className="mt-1 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 6: 6. EVITA                                                          */}
        {/* ========================================================================= */}
        {currentStep === 6 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge en tono suave rojizo */}
            <div className="self-start">
              <span className="inline-block bg-rose-50 text-[#0A3B5C] font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight border border-rose-100">
                6. Evita
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Algunas formas de interactuar pueden dificultar el juego y hacer que tu hijo pierda el interés. Aquí te mostramos cuatro cosas que es mejor evitar.
            </p>

            {/* Grid 2x2 de errores */}
            <div className="grid grid-cols-2 gap-3">
              {/* Órdenes */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/conecta/card_ordenes.png" 
                  alt="Órdenes" 
                  className="w-full h-auto object-cover rounded-2xl mb-1" 
                />
              </div>

              {/* Preguntas */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/conecta/card_preguntas.png" 
                  alt="Preguntas" 
                  className="w-full h-auto object-cover rounded-2xl mb-1" 
                />
              </div>

              {/* Correcciones */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/conecta/card_correcciones.png" 
                  alt="Correcciones" 
                  className="w-full h-auto object-cover rounded-2xl mb-1" 
                />
              </div>

              {/* Distracciones */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/conecta/card_distracciones.png" 
                  alt="Distracciones" 
                  className="w-full h-auto object-cover rounded-2xl mb-1" 
                />
              </div>
            </div>

            {/* Tarjeta Recuerda */}
            <div className="bg-[#F0F4FF] rounded-2xl p-3.5 border border-[#DCE4FF] flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-[#E0EAFF] flex items-center justify-center flex-shrink-0 text-lg">
                👩‍👦
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-[#1E3A8A]">Recuerda</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  Cuando das muchas órdenes, preguntas o correcciones, o miras el celular, es más difícil que tu hijo disfrute del juego y se sienta conectado contigo.
                </p>
              </div>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={() => {
                recordLearningStep('conecta', 'evita_conductas', 'revisado');
                handleNext();
              }}
              className="mt-1 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 7: 7. PRUÉBALO HOY                                                   */}
        {/* ========================================================================= */}
        {currentStep === 7 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-[#E0F7F6] text-[#0A3B5C] font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                7. Pruébalo hoy
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Te proponemos una actividad sencilla para que practiques el juego en casa.
            </p>

            {/* Misión Card con Imagen */}
            <div className="bg-[#E8F8F7] rounded-3xl p-4 border border-[#C8EEEC] flex flex-col gap-3 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D1F2EF] text-[#00A896] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Tu misión:
                  </span>
                  <h3 className="text-xl font-black text-[#0F2942] tracking-tight">
                    {selectedDuration === '2min' ? '2' : '5'} minutos juntos
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">
                    Deja que tu hijo escoja un juego seguro. Acompáñalo sin dirigir.
                  </p>
                </div>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-white/60 shadow-xs">
                <img 
                  src="/conecta/illustration_mision.png" 
                  alt="Misión 5 minutos juntos" 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>

            {/* Selector de Duración */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-800">
                <Clock className="w-4 h-4 text-[#00A896]" />
                <span className="text-xs font-bold">
                  Puedes elegir el tiempo que te funcione mejor:
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setSelectedDuration('2min')}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedDuration === '2min'
                      ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-[#0F2942]">2 minutos</span>
                    <span className="text-[11px] font-semibold text-slate-500">Versión breve</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedDuration === '2min' ? 'bg-[#00A896] text-white' : 'border border-slate-300'
                  }`}>
                    {selectedDuration === '2min' && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  </div>
                </button>

                <button
                  onClick={() => setSelectedDuration('5min')}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedDuration === '5min'
                      ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-[#0F2942]">5 minutos</span>
                    <span className="text-[11px] font-semibold text-slate-500">Tiempo completo</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedDuration === '5min' ? 'bg-[#00A896] text-white' : 'border border-slate-300'
                  }`}>
                    {selectedDuration === '5min' && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  </div>
                </button>
              </div>
            </div>

            {/* Selector de Momento del día */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-800">
                <Calendar className="w-4 h-4 text-[#00A896]" />
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
                          ? 'bg-[#EBF8F7] border-[#00A896] text-[#00A896] shadow-xs font-extrabold' 
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
            <div className="bg-[#F0F4FF] rounded-2xl p-3.5 border border-[#DCE4FF] flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-[#E0EAFF] flex items-center justify-center flex-shrink-0 text-lg">
                👩‍👦
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-[#1E3A8A]">Recuerda</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  Durante el juego, puedes observar, comentar, imitar y responder a tu hijo. Lo importante es acompañarlo y dejar que él lleve la iniciativa.
                </p>
              </div>
            </div>

            {/* Botón Añadir a Mi plan */}
            <button
              onClick={handleSaveMission}
              className="mt-1 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Añadir a Mi plan</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 8: CONFIRMACIÓN: ¡LISTO!                                             */}
        {/* ========================================================================= */}
        {currentStep === 8 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Ilustración de Celebración (High five) */}
            <div className="w-full flex justify-center py-1">
              <img 
                src="/conecta/illustration_listo.png" 
                alt="Madre e hijo chocando las manos" 
                className="w-64 h-auto object-contain"
              />
            </div>

            {/* Tarjeta de Confirmación */}
            <div className="bg-[#E8F8F7] rounded-3xl p-5 border border-[#C8EEEC] flex flex-col items-center text-center shadow-xs">
              <h2 className="text-2xl font-black text-[#0F2942] tracking-tight">
                ¡Listo!
              </h2>
              <h3 className="text-base font-extrabold text-[#0F2942] mt-1">
                Tu práctica quedó guardada.
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1 leading-relaxed">
                Cuando la realices, vuelve a Mi plan y cuéntanos cómo te fue.
              </p>
            </div>

            {/* Tarjeta Detalle de la Práctica Pendiente */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Tu práctica pendiente
              </span>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 p-2 flex items-center justify-center">
                    <img 
                      src="/conecta/icon_blocks.png" 
                      alt="Bloques" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-extrabold text-[#0F2942]">
                      {selectedDuration === '2min' ? '2' : '5'} minutos juntos
                    </h4>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      Deja que tu hijo elija un juego seguro.
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
                className="w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Ir a Mi plan</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>

              <button
                onClick={onComplete}
                className="w-full bg-white hover:bg-slate-50 border-2 border-[#00A896] active:scale-[0.99] text-[#00A896] font-extrabold text-base py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
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
