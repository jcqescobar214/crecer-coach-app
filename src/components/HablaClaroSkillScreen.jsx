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

// Dots pagination count for Habla claro
const TOTAL_DOTS = 9;

export default function HablaClaroSkillScreen({ onBack, onComplete, onGoToPlan }) {
  // Step index: 0 = Intro, 1 = Mira qué pasa, 2 = Elige, 3 = Mira cómo se hace, 
  // 4 = Practica, 5 = Puedes decir o hacer, 6 = Evita, 7 = Pruébalo hoy, 8 = ¡Listo!
  const [currentStep, setCurrentStep] = useState(0);

  // --- Step 2 (Elige) state ---
  const [step2Selection, setStep2Selection] = useState(null); // 'a' | 'b' | 'c'
  const [step2FeedbackVisible, setStep2FeedbackVisible] = useState(false);

  // --- Step 3 (Mira cómo se hace) audio / demo state ---
  const [activeAudioPanel, setActiveAudioPanel] = useState(null);

  // --- Step 4 (Practica) state ---
  const [activeActivity, setActiveActivity] = useState('juguetes'); // 'juguetes' | 'mesa' | 'calle' | 'voz'
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
      recordLearningStep('habla_claro', 'elige_instruccion', 'identificado');
    } else {
      recordLearningStep('habla_claro', 'elige_instruccion', 'practicando');
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
      recordLearningStep('habla_claro', `practica_${activeActivity}`, 'identificado');
    } else {
      recordLearningStep('habla_claro', `practica_${activeActivity}`, 'practicando');
    }
  };

  const handleRetryStep4 = () => {
    setStep4Selections(prev => ({ ...prev, [activeActivity]: null }));
    setStep4FeedbackVisible(prev => ({ ...prev, [activeActivity]: false }));
  };

  // Step 7 confirmation handler
  const handleSaveMission = () => {
    const habitData = {
      id: 'habla_claro_3_instrucciones',
      habitKey: 'habla_claro_3_instrucciones',
      skillId: 'habla_claro',
      title: `${selectedDuration === '2min' ? '2' : '5'} min: 3 Instrucciones Claras`,
      skillTitle: 'Habla claro',
      description: 'Acércate a su altura, da una sola indicación por vez y di exactamente la acción concreta que esperas.',
      duration: selectedDuration === '2min' ? '2 minutos' : '5 minutos',
      durationMinutes: selectedDuration === '2min' ? 2 : 5,
      timeOfDay: selectedMoment === 'manana' ? 'Mañana' 
                : selectedMoment === 'tarde' ? 'Tarde' 
                : selectedMoment === 'noche' ? 'Noche' 
                : 'Elegir después',
      status: 'Pendiente',
      icon: '/habla_claro/card_acercate.png'
    };
    savePlanHabit(habitData);
    recordLearningStep('habla_claro', 'mision_programada', 'completado');
    setCurrentStep(8); // Ir a pantalla ¡Listo!
  };

  // Practice activities definitions for Step 4
  const activitiesData = {
    juguetes: {
      name: 'Juguetes',
      icon: '🧸',
      image: '/habla_claro/practica_juguetes.png',
      question: '¿Cómo transformarías: “¡Ordena todo este reguero ahora!”?',
      options: [
        { id: 'a', text: 'A. “¡No dejes nada tirado en el piso!”', isCorrect: false, feedback: 'Le dices lo que quieres evitar, pero no le das la acción que debe realizar ahora.' },
        { id: 'b', text: 'B. “Pon los bloques dentro del baúl, por favor.”', isCorrect: true, feedback: '¡Exacto! Nombraste el objeto exacto, la acción física y el lugar con amabilidad.' },
        { id: 'c', text: 'C. “¿Quieres ayudarme a recoger tus cosas?”', isCorrect: false, feedback: 'Formularlo como pregunta da la opción de decir "no" cuando es una indicación necesaria.' }
      ]
    },
    mesa: {
      name: 'En la mesa',
      icon: '🥣',
      image: '/habla_claro/practica_mesa.png',
      question: '¿Cómo transformarías: “¡Pórtate bien mientras comemos!”?',
      options: [
        { id: 'a', text: 'A. “¡Deja de moverte tanto en la silla!”', isCorrect: false, feedback: 'Prohibir no orienta su postura física. El niño necesita saber qué hacer con su cuerpo.' },
        { id: 'b', text: 'B. “Siéntate derecho y toma la cuchara para la sopa.”', isCorrect: true, feedback: '¡Muy bien! Describiste dos acciones físicas concretas y alcanzables de inmediato.' },
        { id: 'c', text: 'C. “Come bien como los niños grandes.”', isCorrect: false, feedback: 'Es una comparación abstracta que suele generar frustración en vez de cooperación.' }
      ]
    },
    calle: {
      name: 'En la calle',
      icon: '🚶',
      image: '/habla_claro/practica_calle.png',
      question: '¿Cómo transformarías: “¡Ten mucho cuidado!” antes de cruzar?',
      options: [
        { id: 'a', text: 'A. “¡No se te ocurra soltarte o correr!”', isCorrect: false, feedback: 'Enfoca la mente del niño en la palabra "correr" en vez de indicarle detenerse.' },
        { id: 'b', text: 'B. “Detén tus pies en la línea y dame la mano para cruzar.”', isCorrect: true, feedback: '¡Eso es! Le diste una orden motora clara y precisa para garantizar su seguridad.' },
        { id: 'c', text: 'C. “¿Estás listo para pasar la calle?”', isCorrect: false, feedback: 'La seguridad no es una sugerencia; requiere una indicación protectora y clara.' }
      ]
    },
    voz: {
      name: 'Voz suave',
      icon: '🤫',
      image: '/habla_claro/practica_voz.png',
      question: '¿Cómo transformarías: “¡Deja de gritar de esa manera!”?',
      options: [
        { id: 'a', text: 'A. “¡Que te calles y dejes la bulla te dije!”', isCorrect: false, feedback: 'Gritarle para que no grite modela justamente la conducta que deseas reducir.' },
        { id: 'b', text: 'B. “Háblame con voz suave y bajita para poder escucharte.”', isCorrect: true, feedback: '¡Excelente! Sustituyes el grito por una conducta incompatible explicada con calma.' },
        { id: 'c', text: 'C. “¿Por qué siempre tienes que gritar?”', isCorrect: false, feedback: 'Las preguntas acusatorias generan defensa, no autorregulación.' }
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
    const activeDotIndex = currentStep;

    return (
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 flex flex-col items-center">
        <div className="w-full flex items-center justify-between">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Volver"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div className="flex flex-col items-center text-center">
            <span className="text-base font-black tracking-wider text-[#0F2942] uppercase">
              CRECER
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              Habilidad 2 de 9
            </span>
          </div>

          <div className="w-10 h-10 flex items-center justify-center">
            <span className="text-2xl">🗣️</span>
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
                    ? 'w-5 h-2 bg-amber-500' 
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
        {/* PASO 0: PANTALLA INICIAL · HABLA CLARO                                    */}
        {/* ========================================================================= */}
        {currentStep === 0 && (
          <div className="flex flex-col gap-5 animate-fadeIn">
            <h1 className="text-3xl font-black text-[#0F2942] text-center tracking-tight mt-1">
              Habla claro
            </h1>

            {/* Ilustración Principal */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/habla_claro/illustration_intro.png" 
                alt="Madre a la altura del niño hablándole con calma" 
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* Tarjeta ¿Por qué es importante? */}
            <div className="bg-amber-50/80 rounded-3xl p-5 border border-amber-200/80 flex flex-col items-center text-center shadow-xs">
              <h2 className="text-lg font-black text-[#0F2942] mb-2 tracking-tight">
                ¿Por qué es importante?
              </h2>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                Cuando le pides a tu hijo que "se porte bien", para él es una idea abstracta. Cuando le dices la acción física exacta que esperas, su cerebro sabe exactamente qué hacer.
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

        {/* ========================================================================= */}
        {/* PASO 1: 1. MIRA QUÉ PASA                                                  */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                1. Mira qué pasa
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Observa esta situación. Fíjate en cómo reacciona el niño cuando la indicación se da desde lejos y de forma imprecisa.
            </p>

            {/* Ilustración de la situación */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/habla_claro/illustration_mira.png" 
                alt="Adulto dando orden desde lejos" 
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* Tarjeta ¿Te ha pasado? */}
            <div className="bg-amber-50/80 rounded-3xl p-4 border border-amber-200/80 flex gap-3.5 items-start shadow-xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-base font-black text-[#0F2942] tracking-tight mb-1">
                  ¿Te ha pasado?
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  A veces decimos <em>“¡pórtate bien!”</em> o <em>“¡recoge todo ese desorden!”</em> creyendo que fuimos claros. Para un niño de 3 a 6 años, esos son conceptos abstractos que generan bloqueo o distracción.
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

        {/* ========================================================================= */}
        {/* PASO 2: 2. ELIGE                                                          */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                2. Elige
              </span>
            </div>

            {/* Pregunta */}
            <p className="text-sm font-medium text-slate-800 leading-snug">
              Tu hijo tiene sus juguetes esparcidos por la sala. <span className="font-extrabold">¿Cuál indicación es más efectiva?</span>
            </p>

            {/* Ilustración de situación */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/habla_claro/illustration_elige.png" 
                alt="Madre decidiendo instrucción con niño jugando" 
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
                    ? 'bg-amber-50 border-amber-500 shadow-xs' 
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  step2Selection === 'a' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                }`}>
                  {step2Selection === 'a' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="w-16 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src="/habla_claro/thumb_opt_a.png" alt="Opción A" className="w-full h-full object-cover" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  A. “¡Deja de ser tan desordenado!”
                </span>
              </button>

              {/* Opción B (Esperada / Correcta) */}
              <button
                onClick={() => handleSelectStep2('b')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  step2Selection === 'b' 
                    ? 'bg-amber-50 border-amber-500 shadow-xs' 
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  step2Selection === 'b' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                }`}>
                  {step2Selection === 'b' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="w-16 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src="/habla_claro/thumb_opt_b.png" alt="Opción B" className="w-full h-full object-cover" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  B. “Guarda los bloques en la caja amarilla, por favor.”
                </span>
              </button>

              {/* Opción C */}
              <button
                onClick={() => handleSelectStep2('c')}
                className={`p-2.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  step2Selection === 'c' 
                    ? 'bg-amber-50 border-amber-500 shadow-xs' 
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  step2Selection === 'c' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                }`}>
                  {step2Selection === 'c' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="w-16 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src="/habla_claro/thumb_opt_c.png" alt="Opción C" className="w-full h-full object-cover" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  C. “¿Cuántas veces tengo que decirte lo mismo?”
                </span>
              </button>
            </div>

            {/* Retroalimentación inmediata */}
            {step2FeedbackVisible && (
              <div className={`rounded-2xl p-4 border flex gap-3 items-start animate-fadeIn shadow-xs ${
                step2Selection === 'b' 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-rose-50 border-rose-100'
              }`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step2Selection === 'b' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-600'
                }`}>
                  <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col flex-1">
                  <h4 className={`text-sm font-black mb-1 ${
                    step2Selection === 'b' ? 'text-amber-900' : 'text-rose-800'
                  }`}>
                    {step2Selection === 'b' ? '¡Eso es!' : '¡Probemos otra forma!'}
                  </h4>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {step2Selection === 'b' && '¡Exacto! Nombraste la acción física directa (guardar), el objeto (bloques) y el lugar (caja amarilla) de manera respetuosa y alcanzable.'}
                    {step2Selection === 'a' && 'Esta frase desahoga la frustración del adulto y etiqueta al niño, pero no le dice qué acción física esperas que realice en este momento.'}
                    {step2Selection === 'c' && 'Hacer preguntas de reproche aumenta la tensión y no orienta su atención hacia la tarea concreta.'}
                  </p>
                </div>
              </div>
            )}

            {/* Botón de acción */}
            {step2FeedbackVisible && step2Selection !== 'b' ? (
              <button
                onClick={handleRetryStep2}
                className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
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

        {/* ========================================================================= */}
        {/* PASO 3: 3. MIRA CÓMO SE HACE                                              */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                3. Mira cómo se hace
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Observa dos momentos clave para dar una instrucción con cercanía, claridad y calma.
            </p>

            {/* Viñeta 1 */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40 group">
              <img 
                src="/habla_claro/demo_panel_1.png" 
                alt="Ejemplo 1: Acércate a su altura y nombra una sola acción" 
                className="w-full h-auto object-cover"
              />
              <button
                onClick={() => playSampleAudio(1, "Guarda el bloque amarillo en la canasta, por favor.")}
                className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                aria-label="Escuchar ejemplo 1"
              >
                <Play className={`w-5 h-5 ${activeAudioPanel === 1 ? 'animate-pulse' : ''}`} fill="currentColor" />
              </button>
            </div>

            {/* Viñeta 2 */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40 group">
              <img 
                src="/habla_claro/demo_panel_2.png" 
                alt="Ejemplo 2: Espera en silencio y reconoce la cooperación" 
                className="w-full h-auto object-cover"
              />
              <button
                onClick={() => playSampleAudio(2, "¡Muchas gracias por guardarlo en la canasta!")}
                className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                aria-label="Escuchar ejemplo 2"
              >
                <Play className={`w-5 h-5 ${activeAudioPanel === 2 ? 'animate-pulse' : ''}`} fill="currentColor" />
              </button>
            </div>

            {/* Mensaje del coach */}
            <div className="bg-amber-50/80 rounded-3xl p-4 border border-amber-200/80 flex gap-3.5 items-start shadow-xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-base font-black text-[#0F2942] tracking-tight mb-1">
                  Mensaje del coach
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  Dar instrucciones claras no es imponerse con gritos. Es hacer fácil para tu hijo entender exactamente qué debe hacer ahora con su cuerpo y sus manos.
                </p>
              </div>
            </div>

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

        {/* ========================================================================= */}
        {/* PASO 4: 4. PRACTICA                                                       */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                4. Practica
              </span>
            </div>

            {/* 1. Selector de Situación Cotidiana */}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-extrabold text-[#0F2942]">
                1. Elige una situación cotidiana
              </h3>
              <p className="text-xs font-medium text-slate-500">
                Selecciona el momento en el que más te gustaría mejorar tus indicaciones.
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
                      className={`p-2.5 rounded-2xl flex flex-col items-center gap-1.5 transition-all border cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-50 border-amber-500 shadow-xs scale-102' 
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <span className="text-2xl">{act.icon}</span>
                      <span className={`text-[10px] font-extrabold leading-tight text-center ${
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
                2. Observa el momento
              </h3>

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
                          ? 'bg-amber-50 border-amber-500 shadow-xs' 
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
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
            {step4FeedbackVisible[activeActivity] && (
              <div className={`rounded-2xl p-4 border flex gap-3 items-start animate-fadeIn shadow-xs ${
                step4Selections[activeActivity] === 'b' 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-rose-50 border-rose-100'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step4Selections[activeActivity] === 'b' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-600'
                }`}>
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col flex-1">
                  <h4 className={`text-xs font-black mb-0.5 ${
                    step4Selections[activeActivity] === 'b' ? 'text-amber-900' : 'text-rose-800'
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
            <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-200/70 flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-lg">
                💡
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-amber-900">Recuerda</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  Los niños cooperan mejor cuando escuchan una sola acción que pueden ejecutar con su cuerpo, en vez de prohibiciones abstractas.
                </p>
              </div>
            </div>

            {/* Botón de acción */}
            {step4FeedbackVisible[activeActivity] && step4Selections[activeActivity] !== 'b' ? (
              <button
                onClick={handleRetryStep4}
                className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
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

        {/* ========================================================================= */}
        {/* PASO 5: 5. PUEDES DECIR O HACER                                           */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Pill Badge */}
            <div className="self-start">
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                5. Puedes decir o hacer
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Para que tu indicación funcione a la primera, apóyate en estas cuatro pautas prácticas de comunicación:
            </p>

            {/* Grid 2x2 de conductas */}
            <div className="grid grid-cols-2 gap-3">
              {/* Acércate */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/habla_claro/card_acercate.png" 
                  alt="Acércate a su altura" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-[#0F2942]">Acércate</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Ponte a su altura física y busca contacto visual amable.</span>
              </div>

              {/* Una a la vez */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/habla_claro/card_una_instruccion.png" 
                  alt="Una indicación por vez" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-[#0F2942]">Una sola indicación</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Pide un solo paso por vez. Evita encadenar tareas.</span>
              </div>

              {/* Acción concreta */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/habla_claro/card_accion_concreta.png" 
                  alt="Acción física concreta" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-[#0F2942]">Acción concreta</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Nombra el objeto, el lugar y la acción física exacta.</span>
              </div>

              {/* Tono tranquilo */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/habla_claro/card_tono_calmo.png" 
                  alt="Tono firme y cálido" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-[#0F2942]">Tono firme y cálido</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Habla con calma y seguridad sin elevar la voz.</span>
              </div>
            </div>

            {/* Tarjeta Recuerda */}
            <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-200/70 flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-lg">
                🗣️
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-amber-900">Recuerda</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  Menos palabras y más cercanía física multiplican la capacidad de tu hijo para cooperar sin discusiones.
                </p>
              </div>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={() => {
                recordLearningStep('habla_claro', 'puedes_decir_hacer', 'revisado');
                handleNext();
              }}
              className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
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
              <span className="inline-block bg-rose-50 text-rose-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight border border-rose-100">
                6. Evita
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Estas formas de comunicarte dificultan que tu hijo responda a la primera. Aquí te mostramos cuatro cosas que conviene evitar:
            </p>

            {/* Grid 2x2 de errores */}
            <div className="grid grid-cols-2 gap-3">
              {/* A distancia */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/habla_claro/card_a_distancia.png" 
                  alt="A distancia" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-rose-800">A distancia</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Gritar la orden desde la cocina u otra habitación.</span>
              </div>

              {/* Términos abstractos */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/habla_claro/card_abstracto.png" 
                  alt="Términos abstractos" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-rose-800">Palabras abstractas</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Decir "sé bueno" o "pórtate bien" sin decir la acción.</span>
              </div>

              {/* Órdenes múltiples */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/habla_claro/card_cadenas.png" 
                  alt="Cadenas de órdenes" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-rose-800">Cadenas de órdenes</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Dar tres o cuatro indicaciones juntas que se olvidan.</span>
              </div>

              {/* Preguntar */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/habla_claro/card_preguntar.png" 
                  alt="Preguntar en vez de indicar" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-rose-800">Preguntar dudas</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Decir "¿quieres recoger?" cuando no es opcional.</span>
              </div>
            </div>

            {/* Tarjeta Recuerda */}
            <div className="bg-rose-50/70 rounded-2xl p-3.5 border border-rose-200/70 flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 text-lg">
                ⚠️
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-rose-900">Recuerda</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  Cuando gritamos desde lejos o encadenamos muchas órdenes, el niño no desobedece por rebeldía: simplemente no retiene lo que esperamos de él.
                </p>
              </div>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={() => {
                recordLearningStep('habla_claro', 'evita_conductas', 'revisado');
                handleNext();
              }}
              className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
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
              <span className="inline-block bg-amber-100 text-amber-900 font-extrabold text-2xl px-5 py-2 rounded-full tracking-tight">
                7. Pruébalo hoy
              </span>
            </div>

            {/* Subtítulo */}
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
              Te proponemos una práctica sencilla para aplicar en tu próxima rutina en casa.
            </p>

            {/* Misión Card con Imagen */}
            <div className="bg-amber-50/80 rounded-3xl p-4 border border-amber-200/80 flex flex-col gap-3 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Tu misión:
                  </span>
                  <h3 className="text-xl font-black text-[#0F2942] tracking-tight">
                    3 Instrucciones Claras y Específicas
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">
                    Acércate a su altura, da una sola instrucción por vez y di exactamente la acción concreta que esperas.
                  </p>
                </div>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-white/60 shadow-xs">
                <img 
                  src="/habla_claro/illustration_mision.png" 
                  alt="Misión 3 Instrucciones Claras" 
                  className="w-full h-auto object-cover" 
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
            <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-200/70 flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-lg">
                💡
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-amber-900">Recuerda</span>
                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  Pide una sola cosa concreta. Espera 5 segundos antes de repetir. Cuando inicie, reconócelo de inmediato.
                </p>
              </div>
            </div>

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

        {/* ========================================================================= */}
        {/* PASO 8: CONFIRMACIÓN: ¡LISTO!                                             */}
        {/* ========================================================================= */}
        {currentStep === 8 && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* Ilustración de Celebración */}
            <div className="w-full flex justify-center py-1">
              <img 
                src="/habla_claro/illustration_listo.png" 
                alt="Celebración madre e hijo" 
                className="w-64 h-auto object-contain rounded-2xl"
              />
            </div>

            {/* Tarjeta de Confirmación */}
            <div className="bg-amber-50/80 rounded-3xl p-5 border border-amber-200/80 flex flex-col items-center text-center shadow-xs">
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
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 p-1.5 flex items-center justify-center">
                    <img 
                      src="/habla_claro/card_acercate.png" 
                      alt="Habla claro" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-extrabold text-[#0F2942]">
                      3 Instrucciones Claras
                    </h4>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1">
                      Acércate a su altura y pide una sola acción.
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
