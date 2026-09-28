import React, { useState } from 'react';
import ResponseHeader from './ResponseHeader';
import SituationContext from './SituationContext';
import GuidanceBlock from './GuidanceBlock';
import FeedbackFooter from './FeedbackFooter';
import { getHelpIntervention } from '../data/helpBank';
import { 
  CheckCircle2, 
  MessageSquareQuote, 
  AlertCircle, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  AlertTriangle,
  RotateCcw,
  Check,
  PhoneCall
} from 'lucide-react';

const CoachResponseScreen = ({ onBack, situation }) => {
  // Obtener la intervención profesional estructurada para 3 a 6 años
  const intervention = getHelpIntervention(situation);

  // Estados de seguimiento posterior: null | 'calmed' | 'same' | 'worse'
  const [followUpState, setFollowUpState] = useState(null);
  // Evaluación de riesgo para 'Está empeorando': null | true | false
  const [hasPhysicalRisk, setHasPhysicalRisk] = useState(null);
  // Estado para indicar guardado de práctica en Mi Plan
  const [savedPractice, setSavedPractice] = useState(false);

  const resetFollowUp = () => {
    setFollowUpState(null);
    setHasPhysicalRisk(null);
    setSavedPractice(false);
  };

  return (
    <div className="flex flex-col bg-slate-50 w-full relative">
      {/* Cabecera fija */}
      <ResponseHeader onBack={onBack} />

      {/* Contenido principal en flujo único sin overflow-y-auto duplicado */}
      <div className="p-4 flex flex-col gap-4">
        {/* Resumen de la situación seleccionada (Etapa 3 a 6 años) */}
        <SituationContext 
          situationTitle={intervention.title}
          childInfo="Etapa 3 a 6 años • Regulación y Límites"
          icon={intervention.icon}
        />

        {/* Bloque 1: Haz esto ahora */}
        <GuidanceBlock 
          title="Haz esto ahora"
          content={intervention.hazEstoAhora}
          icon={CheckCircle2}
          colorTheme="emerald"
        />

        {/* Bloque 2: Puedes decir */}
        <GuidanceBlock 
          title="Puedes decir"
          content={intervention.puedesDecir}
          icon={MessageSquareQuote}
          colorTheme="blue"
          isQuote={true}
        />

        {/* Bloque 3: Evita (Formato de lista con viñetas) */}
        <GuidanceBlock 
          title="Evita"
          content={intervention.evita}
          icon={AlertCircle}
          colorTheme="rose"
          isList={true}
        />

        {/* --- SECCIÓN DE CONTROL Y SEGUIMIENTO POSTERIOR --- */}
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

          {/* Botones de Control de Estado */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setFollowUpState('calmed');
                setHasPhysicalRisk(null);
              }}
              className={`py-2.5 px-1.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                followUpState === 'calmed'
                  ? 'bg-emerald-600 text-white shadow-xs scale-[1.02]'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              <span className="text-sm">😊</span>
              <span>Ya se calmó</span>
            </button>

            <button
              onClick={() => {
                setFollowUpState('same');
                setHasPhysicalRisk(null);
              }}
              className={`py-2.5 px-1.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                followUpState === 'same'
                  ? 'bg-amber-500 text-white shadow-xs scale-[1.02]'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              <span className="text-sm">😐</span>
              <span>Sigue igual</span>
            </button>

            <button
              onClick={() => {
                setFollowUpState('worse');
                setHasPhysicalRisk(null);
              }}
              className={`py-2.5 px-1.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                followUpState === 'worse'
                  ? 'bg-rose-600 text-white shadow-xs scale-[1.02]'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              <span className="text-sm">😫</span>
              <span>Está empeorando</span>
            </button>
          </div>
        </div>

        {/* --- DESPLIEGUE INTERACTIVO SEGÚN EL ESTADO --- */}

        {/* OPCIÓN 1: YA SE CALMÓ */}
        {followUpState === 'calmed' && (
          <div className="flex flex-col gap-4">
            <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-xl">🎉</span>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-emerald-800">
                  ¡Excelente! El niño ha entrado en calma.
                </h4>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                  Ahora que está más tranquilo podemos ayudarlo a aprender de lo que pasó.
                </p>
              </div>
            </div>

            {/* Bloque 4: Cuando se calme (Desplegado al estar tranquilo) */}
            <GuidanceBlock 
              title="Cuando se calme"
              content={intervention.cuandoSeCalme}
              icon={Sparkles}
              colorTheme="amber"
            />

            {/* Opción para practicar en Mi Plan */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800">¿Quieres practicar esta pauta?</span>
                <span className="text-[11px] text-slate-500">Añádela a tu plan de hoy para reforzarla.</span>
              </div>
              <button
                onClick={() => setSavedPractice(true)}
                disabled={savedPractice}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  savedPractice 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-[#A9A0EC] hover:bg-[#978ce6] text-white shadow-xs'
                }`}
              >
                {savedPractice ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Añadido</span>
                  </>
                ) : (
                  <span>Practicar</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* OPCIÓN 2: SIGUE IGUAL */}
        {followUpState === 'same' && (
          <div className="flex flex-col gap-3">
            <GuidanceBlock 
              title="Guía de contención (Sigue igual)"
              content={intervention.sigueIgual}
              icon={Clock}
              colorTheme="blue"
            />
            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 text-xs text-blue-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Recordatorio: No repitas el consejo verbal. Mantén presencia serena y conserva el límite sin ceder.</span>
            </div>
          </div>
        )}

        {/* OPCIÓN 3: ESTÁ EMPEORANDO */}
        {followUpState === 'worse' && (
          <div className="flex flex-col gap-4">
            {/* Pregunta inicial sobre riesgo físico */}
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
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    hasPhysicalRisk === true 
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs' 
                      : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  Sí, hay riesgo de daño
                </button>
                <button
                  onClick={() => setHasPhysicalRisk(false)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
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
