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

// Dots pagination count for Elogia
const TOTAL_DOTS = 9;

export default function ElogiaSkillScreen({ onBack, onComplete, onGoToPlan }) {
  // Step index: 0 = Intro, 1 = Mira qué pasa, 2 = Elige, 3 = Mira cómo se hace, 
  // 4 = Practica, 5 = Puedes decir o hacer, 6 = Evita, 7 = Pruébalo hoy, 8 = ¡Listo!
  const [currentStep, setCurrentStep] = useState(0);

  // --- Step 2 (Elige) state ---
  const [step2Selection, setStep2Selection] = useState(null); // 'a' | 'b' | 'c'
  const [step2FeedbackVisible, setStep2FeedbackVisible] = useState(false);

  // --- Step 3 (Mira cómo se hace) audio / demo state ---
  const [activeAudioPanel, setActiveAudioPanel] = useState(null);

  // --- Step 4 (Practica) state ---
  const [activeActivity, setActiveActivity] = useState('tarea'); // 'tarea' | 'ropa' | 'calma' | 'mesa'
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
      recordLearningStep('elogia', 'elige_elogio', 'identificado');
    } else {
      recordLearningStep('elogia', 'elige_elogio', 'practicando');
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
    const isCorrect = activitiesData[activeActivity]?.options?.find(o => o.id === optionId)?.isCorrect;
    if (isCorrect) {
      recordLearningStep('elogia', `practica_${activeActivity}`, 'identificado');
    } else {
      recordLearningStep('elogia', `practica_${activeActivity}`, 'practicando');
    }
  };

  const handleRetryStep4 = () => {
    setStep4Selections(prev => ({ ...prev, [activeActivity]: null }));
    setStep4FeedbackVisible(prev => ({ ...prev, [activeActivity]: false }));
  };

  // Step 7 confirmation handler
  const handleSaveMission = () => {
    const habitData = {
      id: 'elogia_3_descriptivos',
      habitKey: 'elogia_3_descriptivos',
      skillId: 'elogia',
      title: `${selectedDuration === '2min' ? '2' : '5'} min: 3 Elogios Descriptivos`,
      skillTitle: 'Elogia',
      description: 'Encuentra 3 conductas positivas cotidianas hoy y descríbelas en voz alta con entusiasmo y calidez apenas ocurran.',
      duration: selectedDuration === '2min' ? '2 minutos' : '5 minutos',
      durationMinutes: selectedDuration === '2min' ? 2 : 5,
      timeOfDay: selectedMoment === 'manana' ? 'Mañana' 
                : selectedMoment === 'tarde' ? 'Tarde' 
                : selectedMoment === 'noche' ? 'Noche' 
                : 'Elegir después',
      status: 'Pendiente',
      icon: '/elogia/demo_panel_1.png'
    };
    savePlanHabit(habitData);
    recordLearningStep('elogia', 'mision_programada', 'completado');
    setCurrentStep(8); // Ir a pantalla ¡Listo!
  };

  // Practice activities definitions for Step 4
  const activitiesData = {
    tarea: {
      name: 'La tarea',
      icon: '/elogia/tab_tarea.png',
      image: '/elogia/practica_tarea.png',
      sceneDescription: 'Tu hijo abrió sus cuadernos a la primera llamada sin discutir.',
      question: '¿Cómo elogiarías su iniciativa para fijar este hábito?',
      options: [
        { id: 'a', text: 'A. “Ya era hora de que fueras responsable con tus cosas.”', isCorrect: false, feedback: 'Suena a reproche por ocasiones anteriores y apaga la motivación.' },
        { id: 'b', text: 'B. “¡Me encantó ver tus cuadernos listos a la primera llamada! Gran esfuerzo hoy.”', isCorrect: true, feedback: '¡Brillante! Describiste la puntualidad y valoraste el esfuerzo de forma concreta.' },
        { id: 'c', text: 'C. “Muy bien, a ver si sacas una buena calificación.”', isCorrect: false, feedback: 'Pone la presión en el resultado futuro en lugar de premiar la iniciativa presente.' }
      ]
    },
    ropa: {
      name: 'Guardar ropa',
      icon: '/elogia/tab_ropa.png',
      image: '/elogia/practica_ropa.png',
      sceneDescription: 'Puso sus zapatos en el armario después de llegar del parque.',
      question: '¿Cómo reconoces la acción terminada?',
      options: [
        { id: 'a', text: 'A. “Gracias por poner tus zapatos dentro del armario justo al llegar.”', isCorrect: true, feedback: '¡Excelente! Nombraste el objeto exacto, el lugar y diste las gracias con cercanía.' },
        { id: 'b', text: 'B. “¿Ves que no te costaba nada hacerlo?”', isCorrect: false, feedback: 'Es un comentario irónico que genera molestia en vez de orgullo.' },
        { id: 'c', text: 'C. “Bien hecho.”', isCorrect: false, feedback: 'Es muy vago; no especifica qué conducta fue la que agradó.' }
      ]
    },
    calma: {
      name: 'Autocontrol',
      icon: '/elogia/tab_calma.png',
      image: '/elogia/practica_calma.png',
      sceneDescription: 'Sintió frustración porque se le cayó una torre de bloques y respiró hondo sin tirarla.',
      question: '¿Cómo refuerzas su autorregulación?',
      options: [
        { id: 'a', text: 'A. “Menos mal no rompiste nada hoy.”', isCorrect: false, feedback: 'Enfoca la atención en la conducta negativa pasada.' },
        { id: 'b', text: 'B. “Vi que estabas molesto y respiraste con calma antes de volver a armarla. ¡Qué gran autocontrol!”', isCorrect: true, feedback: '¡Eso es! Describiste la emoción, la acción positiva y la etiquetaste como fortaleza.' },
        { id: 'c', text: 'C. “No tenías por qué enojarte por un juego.”', isCorrect: false, feedback: 'Invalida su emoción real en vez de premiar que la supo gestionar.' }
      ]
    },
    mesa: {
      name: 'En la mesa',
      icon: '/elogia/tab_mesa.png',
      image: '/elogia/practica_mesa.png',
      sceneDescription: 'Permaneció sentado y comió su sopa usando la cuchara.',
      question: '¿Cómo reconoces su conducta en la mesa?',
      options: [
        { id: 'a', text: 'A. “¡Qué rico que comiste tu sopa sentado derecho y usando la cuchara! Fue muy agradable almorzar juntos.”', isCorrect: true, feedback: '¡Eso es! Refuerzas la postura física, el uso del cubierto y la conexión familiar.' },
        { id: 'b', text: 'B. “Ojalá comieras así todos los días.”', isCorrect: false, feedback: 'Muestra desconfianza en su capacidad futura en vez de disfrutar el logro de hoy.' },
        { id: 'c', text: 'C. “Termina rápido lo demás.”', isCorrect: false, feedback: 'Ignora el avance presente y salta de inmediato a una nueva exigencia.' }
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

  // Top Header with 9-dot pagination
  const renderHeader = () => {
    const activeDotIndex = currentStep;

    return (
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 flex flex-col items-center">
        <div className="w-full flex items-center justify-between">
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 hover:bg-amber-100 active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Volver"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div className="flex flex-col items-center text-center">
            <span className="text-base font-black tracking-wider text-[#0F2942] uppercase">
              CRECER
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              Habilidad 3 de 10
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
        {/* PASO 0: PANTALLA INICIAL · ELOGIA                                         */}
        {/* ========================================================================= */}
        {currentStep === 0 && (
          <div className="flex flex-col gap-5 animate-fadeIn">
            <h1 className="text-3xl font-black text-[#0F2942] text-center tracking-tight mt-1">
              Elogia
            </h1>

            {/* Ilustración Hero */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/elogia/illustration_intro.png" 
                alt="Madre reconociendo con cariño a su hija" 
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* Tarjeta ¿Por qué es importante? */}
            <div className="bg-amber-50/80 rounded-3xl p-5 border border-amber-200/80 flex flex-col items-center text-center shadow-xs">
              <h2 className="text-lg font-black text-[#0F2942] mb-2 tracking-tight">
                ¿Por qué es importante?
              </h2>
              <p className="text-sm font-medium text-slate-700 leading-relaxed">
                Un <em>“muy bien”</em> genérico se pierde en el aire. Cuando describes la acción concreta con entusiasmo apenas ocurre, el cerebro infantil conecta placer con la conducta adecuada y desea repetirla.
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
              Observa esta situación cotidiana. Fíjate en cómo reacciona la niña cuando el reconocimiento es vago o postergado desde lejos.
            </p>

            {/* Ilustración de situación */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/elogia/illustration_mira.png" 
                alt="Madre pasando distraída mientras la niña espera reconocimiento" 
                className="w-full h-auto object-cover rounded-3xl"
              />
            </div>

            {/* Diálogo cotidiano */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-gradient-to-b from-amber-50/60 to-white p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-amber-800">
                <span className="text-lg">💬</span>
                <span className="text-xs font-black uppercase tracking-wider">Situación común</span>
              </div>
              <blockquote className="text-base font-extrabold text-[#0F2942] italic bg-white p-4 rounded-2xl border border-amber-200/60 shadow-xs leading-relaxed">
                “Muy bien... pórtate así siempre.” <span className="text-xs font-normal text-slate-500 block mt-1">(Dicho al pasar desde otra habitación)</span>
              </blockquote>
              <p className="text-xs font-medium text-slate-600">
                <span className="font-bold text-slate-700">Reacción habitual: </span>
                La niña no sabe qué hizo bien ni siente cercanía; el entusiasmo se apaga con rapidez.
              </p>
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
                  El 80% de los elogios cotidianos son vagos o postergados. Los niños cooperan el triple cuando el elogio describe exactamente el verbo y el objeto con calidez en los primeros segundos.
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
              Tu hijo recogió sus materiales al terminar de pintar. <span className="font-extrabold">¿Cuál elogio refuerza más la conducta para que se repita?</span>
            </p>

            {/* Ilustración de situación */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/elogia/illustration_elige.png" 
                alt="Niño guardando pinceles en frasco con madre sonriendo" 
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
                  <img src="/elogia/thumb_opt_a.png" alt="Opción A" className="w-full h-full object-cover" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  A. “Por fin hiciste caso sin renegar.”
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
                  <img src="/elogia/thumb_opt_b.png" alt="Opción B" className="w-full h-full object-cover" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  B. “¡Me encantó que guardaras los pinceles en su frasco apenas terminaste!”
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
                  <img src="/elogia/thumb_opt_c.png" alt="Opción C" className="w-full h-full object-cover" />
                </div>

                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  C. “Muy bien, pero mañana hazlo más rápido.”
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
                    {step2Selection === 'b' && '¡Exacto! El niño sabe exactamente qué acción específica estás reconociendo y sentirá orgullo auténtico por repetirla.'}
                    {step2Selection === 'a' && 'Esta frase recuerda el error pasado y añade una pizca de queja que arruina el reconocimiento positivo.'}
                    {step2Selection === 'c' && 'El "pero" anula todo el efecto del elogio anterior y desmotiva el esfuerzo presente.'}
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
              Observa dos momentos clave para dar un elogio con entusiasmo, cercanía y especificidad.
            </p>

            {/* Viñeta 1 */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40 group">
              <img 
                src="/elogia/demo_panel_1.png" 
                alt="Ejemplo 1: Reconocimiento descriptivo al compartir colores" 
                className="w-full h-auto object-cover max-h-56"
              />
              <button
                onClick={() => playSampleAudio(1, "¡Noté que compartiste tus colores con tu hermano con una sonrisa! Me gustó mucho tu paciencia.")}
                className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                aria-label="Escuchar ejemplo 1"
              >
                <Play className={`w-5 h-5 ${activeAudioPanel === 1 ? 'animate-pulse' : ''}`} fill="currentColor" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs">
              <p className="text-xs sm:text-sm font-extrabold text-[#0F2942] italic leading-snug">
                “¡Noté que compartiste tus colores con tu hermano con una sonrisa! Me gustó mucho tu paciencia.”
              </p>
            </div>

            {/* Viñeta 2 */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40 group">
              <img 
                src="/elogia/demo_panel_2.png" 
                alt="Ejemplo 2: Celebración y choque de manos por ordenar los zapatos" 
                className="w-full h-auto object-cover max-h-56"
              />
              <button
                onClick={() => playSampleAudio(2, "Muchas gracias por colocar los zapatos dentro del mueble apenas llegaste de la calle. ¡Qué gran ayuda!")}
                className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                aria-label="Escuchar ejemplo 2"
              >
                <Play className={`w-5 h-5 ${activeAudioPanel === 2 ? 'animate-pulse' : ''}`} fill="currentColor" />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-2xs">
              <p className="text-xs sm:text-sm font-extrabold text-[#0F2942] italic leading-snug">
                “Muchas gracias por colocar los zapatos dentro del mueble apenas llegaste de la calle. ¡Qué gran ayuda!”
              </p>
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
                  La regla de oro del elogio: 1) Ponte cerca con una sonrisa, 2) Nombra la acción física exacta, 3) Reconoce el esfuerzo sin añadir un "pero".
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
                Selecciona la situación donde te gustaría ensayar un elogio específico:
              </p>

              {/* Grid 4 tabs con iconos */}
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
                      <div className="w-12 h-12 flex items-center justify-center">
                        <img 
                          src={act.icon} 
                          alt={act.name} 
                          className="w-full h-full object-contain"
                        />
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
                {activitiesData[activeActivity].sceneDescription}
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

            {/* Feedback paso 4 */}
            {step4FeedbackVisible[activeActivity] && (
              <div className={`rounded-2xl p-4 border flex gap-3 items-start animate-fadeIn shadow-xs ${
                activitiesData[activeActivity].options.find(o => o.id === step4Selections[activeActivity])?.isCorrect 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-rose-50 border-rose-100'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activitiesData[activeActivity].options.find(o => o.id === step4Selections[activeActivity])?.isCorrect 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-rose-100 text-rose-600'
                }`}>
                  <Lightbulb className="w-4 h-4" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col flex-1">
                  <h4 className={`text-xs font-black mb-0.5 ${
                    activitiesData[activeActivity].options.find(o => o.id === step4Selections[activeActivity])?.isCorrect 
                      ? 'text-amber-900' 
                      : 'text-rose-800'
                  }`}>
                    {activitiesData[activeActivity].options.find(o => o.id === step4Selections[activeActivity])?.isCorrect 
                      ? '¡Muy bien!' 
                      : '¡Probemos otra opción!'}
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
                  Elogiar la acción concreta y el esfuerzo en caliente es la herramienta más poderosa para cambiar conductas.
                </p>
              </div>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={handleNext}
              className="mt-1 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
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
              Para que tu elogio tenga máximo impacto pedagógico y afectivo, apóyate en estos cuatro pilares:
            </p>

            {/* Grid 2x2 de conductas */}
            <div className="grid grid-cols-2 gap-3">
              {/* Describe la acción */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/elogia/card_accion_exacta.png" 
                  alt="Describe la acción" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-[#0F2942]">Describe la acción</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Nombra el verbo concreto: “guardar”, “compartir”, “esperar”.</span>
              </div>

              {/* Elogia de inmediato */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/elogia/card_en_caliente.png" 
                  alt="Elogia de inmediato" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-[#0F2942]">Elogia de inmediato</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Reconoce en los primeros 3 segundos de ocurrir la acción.</span>
              </div>

              {/* Calidez y cercanía */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/elogia/card_calidez_fisica.png" 
                  alt="Calidez y cercanía" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-[#0F2942]">Calidez y cercanía</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Sonríe, haz contacto visual, choca las manos o da un abrazo.</span>
              </div>

              {/* Valora el esfuerzo */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/elogia/card_valora_esfuerzo.png" 
                  alt="Valora el esfuerzo" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-[#0F2942]">Valora el esfuerzo</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Reconoce el intento y el progreso paso a paso, no la perfección.</span>
              </div>
            </div>

            {/* Reminder */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/80 flex gap-3 items-start">
              <span className="text-xl">✨</span>
              <p className="text-xs font-semibold text-amber-900 leading-relaxed">
                Un elogio descriptivo e inmediato vale más que mil sermones o explicaciones.
              </p>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={() => {
                recordLearningStep('elogia', 'puedes_decir_hacer', 'revisado');
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
              Ciertas costumbres al elogiar pueden restarle todo el valor a tu reconocimiento. Conviene evitar:
            </p>

            {/* Grid 2x2 de errores */}
            <div className="grid grid-cols-2 gap-3">
              {/* El "pero" final */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/elogia/card_el_pero.png" 
                  alt="El pero final" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-rose-800">El "pero" final</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Decir “muy bien, pero la próxima hazlo más rápido” borra todo el reconocimiento.</span>
              </div>

              {/* Sarcasmo e ironía */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/elogia/card_sarcasmo.png" 
                  alt="Sarcasmo e ironía" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-rose-800">Sarcasmo e ironía</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Frases como “¡milagro que recogiste!” humillan en vez de motivar.</span>
              </div>

              {/* Elogios vacíos */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/elogia/card_elogio_vago.png" 
                  alt="Elogios vacíos" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-rose-800">Elogios vacíos</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Quedarte en un “bien” rutinario sin explicar qué hizo bien.</span>
              </div>

              {/* Esperar a la noche */}
              <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xs flex flex-col">
                <img 
                  src="/elogia/card_postergar.png" 
                  alt="Esperar a la noche" 
                  className="w-full h-auto object-cover rounded-2xl mb-1.5" 
                />
                <span className="text-xs font-black text-rose-800">Esperar a la noche</span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">Dejar pasar las horas hace que el niño olvide el contexto de la acción.</span>
              </div>
            </div>

            {/* Reminder */}
            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100 flex gap-3 items-start">
              <span className="text-xl">⚠️</span>
              <p className="text-xs font-semibold text-rose-900 leading-relaxed">
                El cerebro infantil necesita claridad absoluta: celebra lo que ocurrió hoy sin mezclar reproches del pasado.
              </p>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={() => {
                recordLearningStep('elogia', 'evita', 'revisado');
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

            {/* Tarjeta de Misión Principal */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-5 text-white flex flex-col gap-3 shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-200" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-100">
                  Tu misión de hoy
                </span>
              </div>
              <h3 className="text-xl font-black tracking-tight leading-tight">
                3 Elogios Descriptivos Hoy
              </h3>
              <p className="text-xs text-amber-50 leading-relaxed font-medium">
                Encuentra 3 conductas positivas cotidianas hoy y descríbelas en voz alta con entusiasmo y calidez apenas ocurran.
              </p>
            </div>

            {/* Selector de Duración */}
            <div className="flex flex-col gap-2 mt-1">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                Tiempo de práctica
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedDuration('2min')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedDuration === '2min' 
                      ? 'bg-amber-50 border-amber-500 shadow-xs' 
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-black text-slate-800">2 minutos</span>
                  <span className="text-[10px] text-slate-400 font-medium">Versión breve</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDuration('5min')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedDuration === '5min' 
                      ? 'bg-amber-50 border-amber-500 shadow-xs' 
                      : 'bg-white border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-black text-slate-800">5 minutos</span>
                  <span className="text-[10px] text-slate-400 font-medium">Tiempo completo</span>
                </button>
              </div>
            </div>

            {/* Selector de Momento del Día */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                ¿En qué momento lo harás?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'manana', label: 'Mañana', icon: Sun },
                  { id: 'tarde', label: 'Tarde', icon: Sunset },
                  { id: 'noche', label: 'Noche', icon: Moon },
                  { id: 'despues', label: 'Elegir después', icon: Calendar }
                ].map(moment => {
                  const Icon = moment.icon;
                  const isSelected = selectedMoment === moment.id;
                  return (
                    <button
                      key={moment.id}
                      type="button"
                      onClick={() => setSelectedMoment(moment.id)}
                      className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-50 border-amber-500 shadow-xs' 
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold text-slate-700">{moment.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Botón Guardar en Mi Plan */}
            <button
              onClick={handleSaveMission}
              className="mt-2 w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-5 h-5" strokeWidth={2.5} />
              <span>Guardar en Mi Plan</span>
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PASO 8: ¡LISTO!                                                           */}
        {/* ========================================================================= */}
        {currentStep === 8 && (
          <div className="flex flex-col gap-5 items-center text-center animate-fadeIn py-4">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner mt-2">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block bg-amber-100 text-amber-900 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2">
                ¡Misión guardada!
              </span>
              <h2 className="text-2xl font-black text-[#0F2942] tracking-tight">
                ¡Habilidad completada!
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                Has aprendido a reconocer y elogiar con precisión la conducta positiva de tu hijo.
              </p>
            </div>

            {/* Ilustración de Éxito */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-amber-50/40">
              <img 
                src="/elogia/illustration_listo.png" 
                alt="Familia celebrando el hábito" 
                className="w-full h-auto object-cover max-h-48"
              />
            </div>

            {/* Botones Finales */}
            <div className="flex flex-col gap-2.5 w-full mt-2">
              <button
                onClick={() => onGoToPlan?.()}
                className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Ver en Mi Plan</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>

              <button
                onClick={() => onComplete?.()}
                className="w-full bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-extrabold text-sm py-3.5 px-6 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                <span>Volver a Habilidades</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
