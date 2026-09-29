import React, { useState } from 'react';
import FeedbackFooter from './FeedbackFooter';
import { getHelpIntervention } from '../data/helpBank';
import { 
  Volume2, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  AlertTriangle, 
  RotateCcw, 
  Check, 
  PhoneCall, 
  Heart,
  Eye, 
  ShieldCheck, 
  Headphones,
  ChevronLeft
} from 'lucide-react';

const postCrisisEmotions = [
  { id: 'enojo', label: 'Enojo', emoji: '😡' },
  { id: 'frustracion', label: 'Frustración', emoji: '😤' },
  { id: 'impotencia', label: 'Impotencia', emoji: '🤦' },
  { id: 'culpa', label: 'Culpa', emoji: '😔' },
  { id: 'ansiedad', label: 'Ansiedad', emoji: '😰' },
  { id: 'cansancio', label: 'Cansancio', emoji: '😮‍💨' },
];

const CoachResponseScreen = ({ onBack, situation, pauseData }) => {
  // Obtener la intervención profesional para 3 a 6 años
  const intervention = getHelpIntervention(situation);

  // Estados de seguimiento posterior: null (en crisis / HUD activo) | 'calmed' | 'worse'
  const [followUpState, setFollowUpState] = useState(null);
  // Evaluación de riesgo para 'Está desbordado': null | true | false
  const [hasPhysicalRisk, setHasPhysicalRisk] = useState(null);
  // Estado para el Modo Oído / Audio Susurrado
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Desglosar frases para el teleprompter
  const phrases = intervention.puedesDecir
    ? intervention.puedesDecir.split(' / ').map(p => p.trim())
    : [];

  // Síntesis de alto impacto: 1 micro-acción inmediata y 2 prohibiciones críticas
  const coreAction = intervention.hazEstoAhora
    ? (intervention.hazEstoAhora.split('.')[0] + '.')
    : 'Presencia tranquila y palabras mínimas.';

  const avoidAction = (intervention.evita && intervention.evita.length > 0)
    ? (intervention.evita.slice(0, 2).join(' ni ') + '.')
    : 'Gritar ni ceder al límite fijado.';

  // Estados de la reflexión post-crisis del adulto (OCEARA en frío)
  const [stormIntensity, setStormIntensity] = useState(null);
  const [selectedPostEmotion, setSelectedPostEmotion] = useState(null);
  const [parentSuccessGoal, setParentSuccessGoal] = useState(null);
  const [savedPractice, setSavedPractice] = useState(false);

  const resetFollowUp = () => {
    setFollowUpState(null);
    setHasPhysicalRisk(null);
    setStormIntensity(null);
    setSelectedPostEmotion(null);
    setParentSuccessGoal(null);
    setSavedPractice(false);
  };

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
      const textToSpeak = `Respira hondo... baja a su altura. Repite conmigo con voz suave: ${phrases.join('. O también: ')}.`
        .replace(/[“”"']/g, '')
        .replace(/\//g, ' ');

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'es-ES';
      utterance.rate = 0.82; // Cadencia pausada y tranquilizadora
      utterance.pitch = 0.95;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 w-full relative pb-6">
      {/* Cabecera Compacta de Emergencia (Cero Distracciones) */}
      <header className="w-full bg-white border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between shadow-xs sticky top-0 z-30">
        <button 
          onClick={onBack}
          className="p-1.5 -ml-1 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer text-xs font-semibold"
          aria-label="Volver"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          <span>Atrás</span>
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-base">{intervention.icon}</span>
          <span className="text-xs font-bold text-slate-800 truncate max-w-[200px]">
            {intervention.title}
          </span>
        </div>

        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          3-6 años
        </span>
      </header>

      {/* ============================================================== */}
      {/* FASE 1: HUD DE CRISIS ACTIVA (CERO SCROLL - VISIBLE AL 100%)    */}
      {/* ============================================================== */}
      {!followUpState && (
        <div className="p-3.5 flex flex-col gap-3 max-w-md mx-auto w-full animate-fadeIn">
          
          {/* 1. CUERPO: 3 Claves Posturales Inmediatas */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-emerald-50/90 border border-emerald-200/90 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-emerald-800 text-[11px] font-bold shadow-xs">
              <Eye className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>A su altura</span>
            </div>
            <div className="bg-teal-50/90 border border-teal-200/90 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-teal-800 text-[11px] font-bold shadow-xs">
              <Volume2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
              <span>Voz suave</span>
            </div>
            <div className="bg-indigo-50/90 border border-indigo-200/90 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 text-indigo-800 text-[11px] font-bold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
              <span>Sin ceder</span>
            </div>
          </div>

          {/* 2. CONEXIÓN: Teleprompter de Lectura Rápida a 1 metro */}
          <div className="bg-white rounded-2xl p-4 border-2 border-indigo-200/90 shadow-sm flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A9A0EC] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Lo que le dices (Teleprompter)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Lectura rápida</span>
            </div>

            <div className="flex flex-col gap-2 py-0.5">
              {phrases.map((phrase, idx) => (
                <div 
                  key={idx} 
                  className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100"
                >
                  {phrases.length > 1 && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 block mb-0.5">
                      {idx === 0 ? 'Opción 1 • Conectar / Validar' : 'Opción 2 • Sostener Límite'}
                    </span>
                  )}
                  <p className="text-base sm:text-lg font-black text-slate-900 leading-snug tracking-tight">
                    {phrase}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. MODO OÍDO: Audio Asistente Susurrado (Demo para Sponsor) */}
          <button
            onClick={handleToggleAudio}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
              isPlayingAudio 
                ? 'bg-teal-600 text-white animate-pulse' 
                : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 active:scale-[0.99] text-white'
            }`}
          >
            <Headphones className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
            <span>{isPlayingAudio ? 'Escuchando al oído... (Toca para detener)' : '🎧 Modo Oído • Escuchar guía susurrada'}</span>
          </button>

          {/* 4. CONTENCIÓN: Semáforo de Acción Inmediata (Zero Párrafos) */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-xl p-2.5 flex flex-col gap-1 shadow-xs">
              <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Haz esto:</span>
              </span>
              <p className="text-xs text-emerald-950 font-bold leading-tight">
                {coreAction}
              </p>
            </div>

            <div className="bg-rose-50/90 border border-rose-200/90 rounded-xl p-2.5 flex flex-col gap-1 shadow-xs">
              <span className="text-[10px] font-extrabold text-rose-800 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-600" />
                <span>Evita ahora:</span>
              </span>
              <p className="text-xs text-rose-950 font-bold leading-tight">
                {avoidAction}
              </p>
            </div>
          </div>

          {/* 5. BARRA DE CIERRE DE CRISIS: ¿Qué ocurrió? */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex flex-col gap-2 mt-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 text-center">
              ¿Cómo respondió tu hijo tras aplicar el guion?
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setFollowUpState('calmed');
                  setHasPhysicalRisk(null);
                }}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-[0.98]"
              >
                <span className="text-sm">😊</span>
                <span>Ya se calmó</span>
              </button>

              <button
                onClick={() => {
                  setFollowUpState('worse');
                  setHasPhysicalRisk(null);
                }}
                className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
              >
                <span className="text-sm">⚠️</span>
                <span>Sigue desbordado</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* FASE 2: RESOLUCIÓN (CALMA O PROTOCOLO DE SEGURIDAD)            */}
      {/* ============================================================== */}
      {followUpState && (
        <div className="p-4 flex flex-col gap-4 max-w-md mx-auto w-full animate-fadeIn">
          {/* Botón para volver al guion de crisis */}
          <button 
            onClick={resetFollowUp}
            className="self-start text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Volver al guion de crisis</span>
          </button>

        {/* --- OPCIÓN 1: YA SE CALMÓ (FASE EN FRÍO - MODELO OCEARA) --- */}
        {followUpState === 'calmed' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {/* 1. Orientación para el niño */}
            <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Cuando el niño esté en calma (Aprendizaje)</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                {intervention.cuandoSeCalme}
              </p>
            </div>

            {/* 2. CHECK-IN EMOCIONAL DEL ADULTO (En Frío) */}
            <div className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <Heart className="w-4 h-4 text-[#A9A0EC]" />
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Check-in para ti • Ahora que hay calma
                </h4>
              </div>

              {/* ¿Qué tan intensa estuvo la situación? */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-700">
                  ¿Qué tan intensa estuvo la tormenta del niño?
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'leve', label: 'Manejable', emoji: '🌱' },
                    { id: 'fuerte', label: 'Fuerte', emoji: '😤' },
                    { id: 'desborde', label: 'Desborde', emoji: '🌋' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setStormIntensity(lvl.id)}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                        stormIntensity === lvl.id
                          ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold shadow-xs scale-102'
                          : 'bg-slate-50 border-slate-200/70 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base">{lvl.emoji}</span>
                      <span className="text-[11px]">{lvl.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ¿Qué sentiste? */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700">
                  ¿Qué emoción experimentaste durante la situación?
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {postCrisisEmotions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedPostEmotion(item.id)}
                      className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                        selectedPostEmotion === item.id
                          ? 'bg-[#EEF2FF] border-[#A9A0EC] text-indigo-900 font-bold shadow-xs scale-102'
                          : 'bg-slate-50 border-slate-200/70 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base">{item.emoji}</span>
                      <span className="text-[11px]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ¿Qué lograste modelar hoy? */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700">
                  ¿Qué habilidad parental pusiste en práctica hoy?
                </span>
                <div className="flex flex-col gap-2">
                  {[
                    'Mantuve la calma sin levantar la voz',
                    'Sostuve el límite sin ceder a la rabieta',
                    'Acompañé la emoción respetando el espacio',
                  ].map((goal, idx) => (
                    <button
                      key={idx}
                      onClick={() => setParentSuccessGoal(goal)}
                      className={`p-3 rounded-xl text-xs text-left font-medium transition-all cursor-pointer border ${
                        parentSuccessGoal === goal
                          ? 'bg-teal-50 border-teal-300 text-teal-900 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200/70 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón de Guardar en Mi Plan */}
              <button
                onClick={() => setSavedPractice(true)}
                disabled={savedPractice}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  savedPractice 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-[#A9A0EC] hover:bg-[#978ce6] text-white shadow-xs'
                }`}
              >
                {savedPractice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Registro guardado en Mi Plan!</span>
                  </>
                ) : (
                  <span>Guardar avance de hoy en Mi Plan</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* --- OPCIÓN 2: SIGUE IGUAL --- */}
        {followUpState === 'same' && (
          <div className="flex flex-col gap-3 animate-fadeIn">
            <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Guía de contención (Sigue igual)</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {intervention.sigueIgual}
              </p>
            </div>

            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 text-xs text-blue-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Recordatorio: No repitas el consejo verbal. Mantén presencia serena y conserva el límite sin ceder.</span>
            </div>
          </div>
        )}

        {/* --- OPCIÓN 3: ESTÁ EMPEORANDO --- */}
        {followUpState === 'worse' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className="bg-rose-50/90 border border-rose-200 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>Evaluación de seguridad inmediata</span>
              </div>
              <p className="text-xs text-rose-700 font-medium">
                {intervention.estaEmpeorando.riskQuestion}
              </p>
              
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setHasPhysicalRisk(true)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    hasPhysicalRisk === true 
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs' 
                      : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  Sí, hay riesgo de daño
                </button>
                <button
                  onClick={() => setHasPhysicalRisk(false)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    hasPhysicalRisk === false 
                      ? 'bg-slate-700 text-white border-slate-700 shadow-xs' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  No hay riesgo físico
                </button>
              </div>
            </div>

            {/* Protocolo si HAY riesgo de daño */}
            {hasPhysicalRisk === true && (
              <div className="bg-rose-600 text-white rounded-2xl p-4 shadow-md flex flex-col gap-3">
                <div className="flex items-center gap-2 border-b border-rose-500 pb-2">
                  <ShieldAlert className="w-5 h-5 text-amber-300" />
                  <h4 className="text-sm font-bold tracking-tight">
                    Protocolo de Seguridad (Código Rojo)
                  </h4>
                </div>
                <p className="text-xs text-rose-50 leading-relaxed font-medium">
                  {intervention.estaEmpeorando.withRisk}
                </p>
                <div className="bg-rose-700/80 rounded-xl p-3 text-[11px] text-rose-100 flex items-center justify-between mt-1">
                  <span>¿Necesitas líneas de ayuda profesional?</span>
                  <button className="bg-white text-rose-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 hover:bg-rose-50 transition-colors">
                    <PhoneCall className="w-3 h-3" />
                    <span>Líneas de ayuda</span>
                  </button>
                </div>
              </div>
            )}

            {/* Estrategia si NO HAY riesgo de daño */}
            {hasPhysicalRisk === false && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <h4>Estrategia de Desescalamiento</h4>
                </div>
                <p className="text-xs text-indigo-800 leading-relaxed font-medium">
                  {intervention.estaEmpeorando.withoutRisk}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Feedback de Utilidad */}
        <FeedbackFooter />
      </div>
    )}
  </div>
);
};

export default CoachResponseScreen;
