import React, { useState } from 'react';
import ResponseHeader from './ResponseHeader';
import SituationContext from './SituationContext';
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
  Flame,
  ThumbsUp
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

  // Estados de seguimiento posterior: null | 'calmed' | 'same' | 'worse'
  const [followUpState, setFollowUpState] = useState(null);
  // Evaluación de riesgo para 'Está empeorando': null | true | false
  const [hasPhysicalRisk, setHasPhysicalRisk] = useState(null);
  // Estado para el modo de audio simulado (Whisper Mode)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4500);
  };

  return (
    <div className="flex flex-col bg-slate-50 w-full relative pb-8">
      {/* Cabecera */}
      <ResponseHeader onBack={onBack} />

      <div className="p-4 flex flex-col gap-4">
        {/* Resumen de la situación seleccionada */}
        <SituationContext 
          situationTitle={intervention.title}
          childInfo="Etapa 3 a 6 años • Guion Inmediato"
          icon={intervention.icon}
        />

        {/* --- TELEPROMPTER DE CRISIS (Frase Modelo de Alto Impacto) --- */}
        <div className="bg-white rounded-3xl p-5 border-2 border-indigo-100 shadow-sm flex flex-col gap-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#A9A0EC] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teleprompter • Lo que dices</span>
            </span>

            {/* Botón de Audio Susurrado */}
            <button
              onClick={handleToggleAudio}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-teal-500 text-white animate-pulse' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? 'Reproduciendo...' : 'Modo Voz'}</span>
            </button>
          </div>

          {/* Frase Gigante Textual para leer de reojo */}
          <div className="bg-[#EEF2FF]/70 p-4 rounded-2xl border border-indigo-100/80 my-1">
            <p className="text-base sm:text-lg text-slate-900 font-extrabold leading-snug tracking-tight">
              {intervention.puedesDecir}
            </p>
          </div>

          <span className="text-[11px] text-slate-500 font-medium">
            💡 Mantén contacto visual a su altura y habla con volumen bajo y firme.
          </span>
        </div>

        {/* --- PICTOGRAMAS DE POSTURA CORPORAL (Lenguaje No Verbal de Crisis) --- */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Tu postura corporal (3 claves)
          </span>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-emerald-50/80 border border-emerald-100 p-2.5 rounded-xl flex flex-col items-center text-center gap-1">
              <Eye className="w-5 h-5 text-emerald-600" />
              <span className="text-[11px] font-bold text-emerald-800 leading-tight">A su altura</span>
              <span className="text-[9px] text-emerald-700 opacity-90">Agáchate</span>
            </div>

            <div className="bg-teal-50/80 border border-teal-100 p-2.5 rounded-xl flex flex-col items-center text-center gap-1">
              <Volume2 className="w-5 h-5 text-teal-600" />
              <span className="text-[11px] font-bold text-teal-800 leading-tight">Voz suave</span>
              <span className="text-[9px] text-teal-700 opacity-90">Un susurro</span>
            </div>

            <div className="bg-indigo-50/80 border border-indigo-100 p-2.5 rounded-xl flex flex-col items-center text-center gap-1">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span className="text-[11px] font-bold text-indigo-800 leading-tight">Firmeza</span>
              <span className="text-[9px] text-indigo-700 opacity-90">Sin ceder</span>
            </div>
          </div>
        </div>

        {/* --- ACCIÓN INMEDIATA + QUÉ EVITAR (Compacto y sin saturación) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Haz esto ahora */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              <span>✅ Haz esto ahora:</span>
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {intervention.hazEstoAhora}
            </p>
          </div>

          {/* Alerta de no hacer */}
          <div className="bg-rose-50/90 rounded-2xl p-4 border border-rose-200/80 shadow-xs flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">
              <span>🚫 Evita en este instante:</span>
            </span>
            <p className="text-xs text-rose-900 leading-relaxed font-medium">
              Gritar, dar discursos largos o retirar el límite para que deje de llorar.
            </p>
          </div>
        </div>

        {/* --- SEGUIMIENTO POSTERIOR: ¿CÓMO EVOLUCIONA LA SITUACIÓN? --- */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3.5 w-full mt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              ¿Cómo evoluciona la situación?
            </span>
            {followUpState && (
              <button 
                onClick={resetFollowUp} 
                className="text-[11px] font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setFollowUpState('calmed');
                setHasPhysicalRisk(null);
              }}
              className={`py-3 px-1.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                followUpState === 'calmed'
                  ? 'bg-emerald-600 text-white shadow-xs scale-[1.02]'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              <span className="text-base">😊</span>
              <span>Ya se calmó</span>
            </button>

            <button
              onClick={() => {
                setFollowUpState('same');
                setHasPhysicalRisk(null);
              }}
              className={`py-3 px-1.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                followUpState === 'same'
                  ? 'bg-amber-500 text-white shadow-xs scale-[1.02]'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              <span className="text-base">😐</span>
              <span>Sigue igual</span>
            </button>

            <button
              onClick={() => {
                setFollowUpState('worse');
                setHasPhysicalRisk(null);
              }}
              className={`py-3 px-1.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                followUpState === 'worse'
                  ? 'bg-rose-600 text-white shadow-xs scale-[1.02]'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              <span className="text-base">😫</span>
              <span>Está empeorando</span>
            </button>
          </div>
        </div>

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
    </div>
  );
};

export default CoachResponseScreen;
