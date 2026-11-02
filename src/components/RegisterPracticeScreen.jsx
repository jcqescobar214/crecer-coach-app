import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ArrowRight, 
  Check, 
  Clock, 
  Sun, 
  CheckCircle2, 
  Lightbulb, 
  Flag, 
  RotateCcw,
  Sparkles,
  Eye,
  MessageCircle,
  Copy,
  Users,
  Ban,
  Hourglass,
  Calendar
} from 'lucide-react';
import { savePracticeLog, evaluatePractice, getSavedPlanHabits, savePlanHabit } from '../data/planStorage';
import { getSkillById } from '../data/learnBank';

export default function RegisterPracticeScreen({ onBack, onComplete, skillId = 'conecta' }) {
  const currentSkill = getSkillById(skillId);
  const isHablaClaro = skillId === 'habla_claro';
  const isConecta = skillId === 'conecta';

  // Practice info from saved plan
  const savedHabits = getSavedPlanHabits();
  const currentHabit = savedHabits.find(h => h.skillId === skillId) || {
    title: currentSkill?.pruebaloHoy?.title || (isHablaClaro ? '3 Instrucciones Claras' : '5 minutos juntos'),
    duration: '5 minutos',
    timeOfDay: 'Tarde',
    description: currentSkill?.pruebaloHoy?.description || (isHablaClaro 
      ? 'Acércate a su altura, da una sola instrucción por vez y di exactamente la acción concreta.'
      : 'Deja que tu hijo elija un juego seguro. Acompáñalo sin dirigir.')
  };

  // Form states - General & Conecta
  const [pudoJugar, setPudoJugar] = useState('si'); // 'si' | 'hoy_no'
  const [dejoElegir, setDejoElegir] = useState('si'); // 'si' | 'a_veces' | 'costo'
  const [acompanoSinDirigir, setAcompanoSinDirigir] = useState('si'); // 'si' | 'a_veces' | 'costo'
  const [participacion, setParticipacion] = useState('comente'); // 'observe' | 'comente' | 'imite' | 'comparti'
  const [dificultad, setDificultad] = useState('no_instrucciones'); // 'no_instrucciones' | 'mantener_atencion' | 'seguir_iniciativa' | 'nada'
  const [comentarios, setComentarios] = useState('');

  // Form states - Habla Claro
  const [seAcerco, setSeAcerco] = useState('si'); // 'si' | 'a_veces' | 'le_costo'
  const [unaSolaCosa, setUnaSolaCosa] = useState('si'); // 'si' | 'a_veces' | 'varias_juntas'
  const [tonoCalmo, setTonoCalmo] = useState('firme_calmo'); // 'firme_calmo' | 'neutro' | 'eleve_voz'
  const [dificultadHabla, setDificultadHabla] = useState('ninguna'); // 'ninguna' | 'ignoro' | 'grite_lejos' | 'esperar_pausa' | 'cadenas'

  // Result state
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleSubmit = () => {
    const answers = isHablaClaro ? {
      pudoPracticar: pudoJugar,
      seAcerco,
      unaSolaCosa,
      tonoCalmo,
      dificultad: dificultadHabla,
      comentarios: typeof comentarios === 'string' ? comentarios.trim().slice(0, 500) : ''
    } : {
      pudoJugar,
      dejoElegir,
      acompanoSinDirigir,
      participacion,
      dificultad,
      comentarios: typeof comentarios === 'string' ? comentarios.trim().slice(0, 500) : ''
    };

    const result = evaluatePractice(skillId, answers);
    
    // Save to logs
    savePracticeLog({
      skillId,
      skillTitle: currentSkill?.title || (isHablaClaro ? 'Habla claro' : 'Conecta y juega'),
      habitTitle: currentHabit.title,
      duration: currentHabit.duration || '5 minutos',
      timeOfDay: currentHabit.timeOfDay || 'Tarde',
      answers,
      evaluation: result,
      status: result.status
    });

    setEvaluationResult(result);
  };

  // If evaluation result is ready, show Screen 13 (Feedback)
  if (evaluationResult) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto w-full relative pb-10 animate-fadeIn">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Volver"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-base font-black tracking-wider text-[#0F2942]">
              Crecer
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {currentSkill?.badge || (isHablaClaro ? 'Habilidad 2 de 10' : 'Habilidad 1 de 10')}
            </span>
          </div>
          <div className="w-10 h-10" />
        </header>

        <div className="p-4 flex flex-col gap-4">
          {/* Ilustración de Celebración con Padre e Hijo */}
          <div className="bg-gradient-to-b from-[#E8F8F7] to-white rounded-3xl p-4 border border-[#C8EEEC] flex items-center gap-3">
            <div className="w-28 h-28 flex-shrink-0">
              <img 
                src={isHablaClaro ? "/habla_claro/illustration_listo.png" : "/conecta/illustration_buentrabajo.png"} 
                alt="Padre e hijo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = isHablaClaro ? '/habla_claro/illustration_mision.png' : '/conecta/illustration_listo.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-[#0F2942] tracking-tight">
                ¡Buen trabajo!
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-700 mt-1 leading-snug">
                {isHablaClaro ? 'Practicaste dar instrucciones claras y efectivas.' : 'Compartiste un momento de juego con tu hijo.'}
              </p>
            </div>
          </div>

          {/* Tarjeta 1: Lo que hiciste bien */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex gap-3.5 items-start">
            <div className="w-10 h-10 rounded-full bg-[#E0F7F6] text-[#00A896] flex items-center justify-center flex-shrink-0 mt-0.5">
              {isHablaClaro ? (
                <span className="text-xl">🗣️</span>
              ) : (
                <img src="/conecta/sprout_logo.png" alt="Icono" className="w-5 h-5 object-contain" />
              )}
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-sm font-black text-[#0F2942] tracking-tight mb-1">
                Lo que hiciste bien
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                {evaluationResult.bien}
              </p>
            </div>
          </div>

          {/* Tarjeta 2: Tu recomendación */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex gap-3.5 items-start">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-sm font-black text-[#0F2942] tracking-tight mb-1">
                Tu recomendación
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                {evaluationResult.recomendacion}
              </p>
            </div>
          </div>

          {/* Tarjeta 3: Tu próximo reto */}
          <div className="bg-amber-50/60 rounded-3xl p-4 border border-amber-200/70 shadow-xs flex gap-3.5 items-start">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Flag className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-sm font-black text-[#0F2942] tracking-tight mb-1">
                Tu próximo reto
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                {evaluationResult.reto}
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col gap-2.5 mt-2">
            <button
              onClick={() => {
                if (evaluationResult?.reto) {
                  savePlanHabit({
                    id: 'reto_' + Date.now(),
                    habitKey: 'reto_' + (skillId || 'conecta') + '_' + Date.now(),
                    skillId: skillId || 'conecta',
                    skillTitle: isHablaClaro ? 'Habla claro' : 'Conecta y juega',
                    title: 'Reto: ' + (evaluationResult.reto.length > 40 ? evaluationResult.reto.slice(0, 40) + '...' : evaluationResult.reto),
                    description: evaluationResult.reto,
                    duration: '2 minutos',
                    timeOfDay: currentHabit?.timeOfDay || 'Tarde',
                    status: 'Pendiente',
                    icon: isHablaClaro ? '/habla_claro/card_una_instruccion.png' : '/conecta/icon_blocks.png'
                  });
                }
                onComplete();
              }}
              className="w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Añadir siguiente reto a Mi plan</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>

            <button
              onClick={onBack}
              className="w-full text-slate-600 hover:text-slate-900 font-bold text-sm py-3 text-center transition-colors cursor-pointer"
            >
              Volver a mis habilidades
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Questionnaire form (Screen 12)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto w-full relative pb-12 animate-fadeIn">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#E0F7F6] text-[#00A896] hover:bg-[#cbf1ef] flex items-center justify-center transition-all cursor-pointer"
          aria-label="Volver"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-base font-black tracking-wider text-[#0F2942] uppercase">
            CRECER
          </span>
          <span className="text-[11px] font-semibold text-slate-500">
            Mi plan
          </span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
          <img src="/conecta/sprout_logo.png" alt="Sprout" className="w-7 h-7 object-contain" />
        </div>
      </header>

      <div className="p-4 flex flex-col gap-4">
        {/* Título de la pantalla */}
        <div>
          <h1 className="text-2xl font-black text-[#0F2942] tracking-tight">
            Registrar mi práctica
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            Cuéntanos cómo te fue. Esto nos ayudará a darte recomendaciones para la próxima vez.
          </p>
        </div>

        {/* Tarjeta resumen de la práctica activa */}
        <div className="bg-[#FFFBEB] rounded-3xl p-4 border border-amber-200/70 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white border border-amber-200 p-2 flex items-center justify-center flex-shrink-0">
              <img 
                src={isHablaClaro ? "/habla_claro/card_una_instruccion.png" : "/conecta/icon_blocks.png"} 
                alt="Icono" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold uppercase text-amber-700">
                {isHablaClaro ? 'Habla claro' : 'Conecta y juega'}
              </span>
              <h2 className="text-base font-black text-[#0F2942]">
                {currentHabit.title}
              </h2>
              <p className="text-xs text-slate-600 line-clamp-1">
                {currentHabit.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200/50 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold text-slate-700">Duración: 2 o 5 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-semibold text-slate-700">Momento: Tarde</span>
            </div>
          </div>
        </div>

        {/* Pregunta 1 */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#00A896] text-white text-xs font-black flex items-center justify-center">
              1
            </span>
            <h3 className="text-sm font-extrabold text-[#0F2942]">
              {isHablaClaro ? '¿Pudiste dar instrucciones claras hoy?' : '¿Pudiste compartir un momento de juego?'}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => setPudoJugar('si')}
              className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                pudoJugar === 'si'
                  ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-[#0F2942]">Sí</span>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  pudoJugar === 'si' ? 'bg-[#00A896] text-white' : 'border border-slate-300'
                }`}>
                  {pudoJugar === 'si' && <Check className="w-3 h-3" strokeWidth={3} />}
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-600">
                {isHablaClaro ? 'Di instrucciones claras y concretas.' : 'Compartí un momento de juego con mi hijo.'}
              </span>
            </button>

            <button
              onClick={() => setPudoJugar('hoy_no')}
              className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                pudoJugar === 'hoy_no'
                  ? 'bg-rose-50 border-rose-400 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-[#0F2942]">Hoy no</span>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  pudoJugar === 'hoy_no' ? 'bg-rose-500 text-white' : 'border border-slate-300'
                }`}>
                  {pudoJugar === 'hoy_no' && <Check className="w-3 h-3" strokeWidth={3} />}
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-600">
                No pude hacerlo en esta ocasión.
              </span>
            </button>
          </div>
        </div>

        {/* Si respondió 'hoy_no' */}
        {pudoJugar === 'hoy_no' && (
          <div className="bg-rose-50 rounded-3xl p-4 border border-rose-200 flex flex-col gap-3 animate-fadeIn">
            <h4 className="text-sm font-extrabold text-rose-900">
              No te preocupes. Puedes intentarlo en otro momento.
            </h4>
            <p className="text-xs text-rose-800">
              Crear hábitos lleva tiempo. Lo valioso es mantener la intención y encontrar un espacio sin prisas.
            </p>
            <button
              onClick={handleSubmit}
              className="w-full bg-[#00A896] hover:bg-[#009282] text-white font-extrabold text-sm py-3 px-4 rounded-full transition-all cursor-pointer"
            >
              Reprogramar práctica para mañana
            </button>
          </div>
        )}

        {/* Preguntas 2 a 5 si respondió 'si' */}
        {pudoJugar === 'si' && (
          <>
            {isHablaClaro ? (
              <>
                {/* Pregunta 2 (Habla claro): ¿Te acercaste a su altura física? */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00A896] text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F2942]">
                      ¿Te acercaste a su altura física con contacto visual?
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {[
                      { id: 'si', title: 'Sí', desc: 'Me agaché a su nivel y me miró.' },
                      { id: 'a_veces', title: 'A veces', desc: 'Estuve cerca en algunas ocasiones.' },
                      { id: 'le_costo', title: 'Me costó', desc: 'Di la orden desde lejos o parado.' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSeAcerco(item.id)}
                        className={`p-2.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                          seAcerco === item.id
                            ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black text-[#0F2942]">{item.title}</span>
                        <span className="text-[10px] text-slate-500 leading-tight">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregunta 3 (Habla claro): ¿Diste una sola indicación física por vez? */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00A896] text-white text-xs font-black flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F2942]">
                      ¿Diste una sola indicación física por vez?
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {[
                      { id: 'si', title: 'Sí', desc: 'Nombré una sola acción motora.' },
                      { id: 'a_veces', title: 'A veces', desc: 'A veces sumé un segundo paso.' },
                      { id: 'varias_juntas', title: 'Di varias', desc: 'Encadené varias cosas a la vez.' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setUnaSolaCosa(item.id)}
                        className={`p-2.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                          unaSolaCosa === item.id
                            ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black text-[#0F2942]">{item.title}</span>
                        <span className="text-[10px] text-slate-500 leading-tight">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregunta 4 (Habla claro): ¿Qué tono usaste al hablarle? */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00A896] text-white text-xs font-black flex items-center justify-center">
                      4
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F2942]">
                      ¿Qué tono usaste al hablarle?
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {[
                      { id: 'firme_calmo', title: 'Firme y calmo', desc: 'Tranquilo y seguro sin gritar.' },
                      { id: 'neutro', title: 'Neutro', desc: 'Tono habitual del día a día.' },
                      { id: 'eleve_voz', title: 'Elevé la voz', desc: 'Me impacienté o alcé la voz.' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setTonoCalmo(item.id)}
                        className={`p-2.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                          tonoCalmo === item.id
                            ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black text-[#0F2942]">{item.title}</span>
                        <span className="text-[10px] text-slate-500 leading-tight">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregunta 5 (Habla claro): ¿Qué fue lo más difícil? */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00A896] text-white text-xs font-black flex items-center justify-center">
                      5
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F2942]">
                      ¿Qué fue lo más difícil?
                    </h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {[
                      { id: 'ninguna', icon: Sparkles, title: 'Ninguna', desc: 'Cooperó bien.' },
                      { id: 'ignoro', icon: Hourglass, title: 'Ignoró la orden', desc: 'Siguió jugando.' },
                      { id: 'grite_lejos', icon: Ban, title: 'Grité de lejos', desc: 'Me costó acercarme.' },
                      { id: 'esperar_pausa', icon: Clock, title: 'Esperar 5 seg', desc: 'Repetí muy rápido.' }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = dificultadHabla === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setDificultadHabla(item.id)}
                          className={`p-2 rounded-2xl border text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs' 
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-[#00A896]' : 'text-slate-400'}`} />
                          <span className="text-[10px] font-black text-[#0F2942] leading-tight">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Pregunta 2: ¿Dejaste que tu hijo eligiera cómo jugar? */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00A896] text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F2942]">
                      ¿Dejaste que tu hijo eligiera cómo jugar?
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {[
                      { id: 'si', title: 'Sí', desc: 'Él o ella eligió la actividad.' },
                      { id: 'a_veces', title: 'A veces', desc: 'Le di algunas opciones.' },
                      { id: 'costo', title: 'Me costó', desc: 'Tuve dificultad para no dirigir.' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setDejoElegir(item.id)}
                        className={`p-2.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                          dejoElegir === item.id
                            ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black text-[#0F2942]">{item.title}</span>
                        <span className="text-[10px] text-slate-500 leading-tight">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregunta 3: ¿Pudiste acompañarlo sin dirigirlo? */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00A896] text-white text-xs font-black flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F2942]">
                      ¿Pudiste acompañarlo sin dirigirlo?
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {[
                      { id: 'si', title: 'Sí', desc: 'Lo acompañé sin dar instrucciones.' },
                      { id: 'a_veces', title: 'A veces', desc: 'En algunos momentos di indicaciones.' },
                      { id: 'costo', title: 'Me costó', desc: 'Me resultó difícil no dirigir el juego.' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setAcompanoSinDirigir(item.id)}
                        className={`p-2.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                          acompanoSinDirigir === item.id
                            ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs font-black text-[#0F2942]">{item.title}</span>
                        <span className="text-[10px] text-slate-500 leading-tight">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregunta 4: ¿Cómo participaste? */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00A896] text-white text-xs font-black flex items-center justify-center">
                      4
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F2942]">
                      ¿Cómo participaste?
                    </h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {[
                      { id: 'observe', icon: Eye, title: 'Observé', desc: 'Lo miré mientras jugaba.' },
                      { id: 'comente', icon: MessageCircle, title: 'Comenté', desc: 'Hice comentarios sobre lo que hacía.' },
                      { id: 'imite', icon: Copy, title: 'Lo imité', desc: 'Imité sus acciones o ideas.' },
                      { id: 'comparti', icon: Users, title: 'Compartí su actividad', desc: 'Me uní siguiendo su iniciativa.' }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = participacion === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setParticipacion(item.id)}
                          className={`p-2 rounded-2xl border text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs' 
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-[#00A896]' : 'text-slate-400'}`} />
                          <span className="text-[10px] font-black text-[#0F2942] leading-tight">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pregunta 5: ¿Qué fue lo más difícil? */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00A896] text-white text-xs font-black flex items-center justify-center">
                      5
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0F2942]">
                      ¿Qué fue lo más difícil?
                    </h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {[
                      { id: 'no_instrucciones', icon: Ban, title: 'No dar instrucciones', desc: 'Me costó no dirigir.' },
                      { id: 'mantener_atencion', icon: Hourglass, title: 'Mantener mi atención', desc: 'Me distraje con otras cosas.' },
                      { id: 'seguir_iniciativa', icon: ArrowRight, title: 'Seguir su iniciativa', desc: 'Me costó seguir sus ideas.' },
                      { id: 'nada', icon: Sparkles, title: 'Nada en particular', desc: 'No fue difícil.' }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = dificultad === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setDificultad(item.id)}
                          className={`p-2 rounded-2xl border text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#EBF8F7] border-[#00A896] shadow-xs' 
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-[#00A896]' : 'text-slate-400'}`} />
                          <span className="text-[10px] font-black text-[#0F2942] leading-tight">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Comentarios adicionales opcionales */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600">
                Comentarios adicionales (opcional)
              </label>
              <textarea
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value.slice(0, 200))}
                rows={2}
                placeholder="Cuéntanos algo más si lo consideras importante..."
                className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00A896] resize-none"
              />
              <span className="text-[10px] text-slate-400 self-end">
                {comentarios.length}/200
              </span>
            </div>

            {/* Botón Guardar y ver recomendación */}
            <button
              onClick={handleSubmit}
              className="mt-2 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Guardar y ver mi recomendación</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
