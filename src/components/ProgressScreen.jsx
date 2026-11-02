import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  LineChart, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Lightbulb, 
  Target, 
  Clock, 
  Calendar, 
  Sun, 
  Moon, 
  Plus, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { getPracticeLogs, getLearningProgress } from '../data/planStorage';
import { learnSkills } from '../data/learnBank';

export default function ProgressScreen({ onSelectSkillToLearn, onRegisterPractice }) {
  const [selectedSkillDetail, setSelectedSkillDetail] = useState(null); // null | skillId
  const [detailTab, setDetailTab] = useState('progreso'); // 'progreso' | 'practicas'
  const [logs, setLogs] = useState([]);
  const [learnProgress, setLearnProgress] = useState({});

  useEffect(() => {
    setLogs(getPracticeLogs());
    setLearnProgress(getLearningProgress());
  }, []);

  const activeSkillId = selectedSkillDetail || 'conecta';
  const currentSkill = learnSkills.find(s => s.id === activeSkillId) || learnSkills[0];

  const activeLogs = logs.filter(l => l.skillId === activeSkillId || (!l.skillId && activeSkillId === 'conecta' && l.skillTitle !== 'Habla claro'));
  const activeCompletedCount = activeLogs.filter(l => l.status === 'Realizada').length;

  const totalCompletedPractices = logs.filter(l => l.status === 'Realizada').length;
  const exploredSkillsCount = Math.max(2, Object.keys(learnProgress).length);

  // Evolution message calculation for Conecta y juega
  const getConectaInsights = () => {
    if (activeCompletedCount === 0) {
      return {
        logrando: 'Estás comenzando tu camino en esta habilidad. Da el primer paso con una práctica de 2 o 5 minutos.',
        fortaleciendo: 'Aprender a seguir la iniciativa de tu hijo fortalece su confianza y cercanía emocional.',
        siguientePaso: 'Comparte dos minutos de juego siguiendo sus ideas. Antes de darle una instrucción, observa y comenta lo que está haciendo.'
      };
    }

    const latest = activeLogs[0]?.answers || {};
    let logrando = 'En tus últimas prácticas has reportado mayor facilidad para dejar que tu hijo elija cómo jugar.';
    let fortaleciendo = 'Ahora estás practicando cómo acompañar su juego sin darle tantas instrucciones.';
    let siguientePaso = 'Comparte dos minutos de juego siguiendo sus ideas. Antes de darle una instrucción, observa y comenta lo que está haciendo.';

    if (latest.dificultad === 'mantener_atencion') {
      fortaleciendo = 'Estás fortaleciendo tu atención plena sin distractores.';
      siguientePaso = 'Busca un momento con menos interrupciones y deja el celular a un lado durante dos minutos.';
    } else if (latest.dificultad === 'no_instrucciones') {
      fortaleciendo = 'Estás practicando comentar lo que hace en lugar de decirle qué hacer.';
      siguientePaso = 'Practica acompañarlo sin darle instrucciones durante dos minutos.';
    }

    return { logrando, fortaleciendo, siguientePaso };
  };

  // Evolution message calculation for Habla claro
  const getHablaClaroInsights = () => {
    if (activeCompletedCount === 0) {
      return {
        logrando: 'Estás iniciando en instrucciones efectivas. Empieza con una sola rutina sencilla como recoger los zapatos.',
        fortaleciendo: 'Aprender a ponerte a la altura física de tu hijo y nombrar una sola acción concreta.',
        siguientePaso: 'Antes de hablar, camina hasta donde esté tu hijo, ponte a su altura y da una sola indicación con voz tranquila.'
      };
    }

    const latest = activeLogs[0]?.answers || {};
    let logrando = 'En tus últimas prácticas has aplicado mayor cercanía física antes de dar una indicación.';
    let fortaleciendo = 'Estás fortaleciendo pedir un solo paso motor a la vez con calma y firmeza.';
    let siguientePaso = 'Recuerda esperar 5 segundos en silencio tras dar la orden antes de repetir o intervenir.';

    if (latest.dificultad === 'grite_lejos' || latest.seAcerco === 'le_costo') {
      fortaleciendo = 'Estás practicando no pedir nada desde otra habitación o a distancia.';
      siguientePaso = 'Camina hasta colocarte a su altura física y busca contacto visual amable.';
    } else if (latest.dificultad === 'esperar_pausa' || latest.tonoCalmo === 'eleve_voz') {
      fortaleciendo = 'Estás fortaleciendo la pausa paciente de 5 segundos y el tono sereno.';
      siguientePaso = 'Cuenta mentalmente hasta cinco en silencio con calma mientras tu hijo procesa la indicación.';
    }

    return { logrando, fortaleciendo, siguientePaso };
  };

  // Generic evolution message calculation for other skills
  const getGenericInsights = () => {
    if (activeCompletedCount === 0) {
      return {
        logrando: `Has comenzado a explorar la habilidad ${currentSkill.title}.`,
        fortaleciendo: `${currentSkill.subtitle}.`,
        siguientePaso: `Activa tu misión de hoy en Mi plan para ponerla en práctica en tu próxima rutina.`
      };
    }

    const latest = activeLogs[0]?.answers || {};
    return {
      logrando: `Has registrado ${activeCompletedCount} práctica(s) activa(s) con foco en ${currentSkill.title.toLowerCase()}.`,
      fortaleciendo: `Estás consolidando una respuesta predecible y conectada con tu hijo.`,
      siguientePaso: activeLogs[0]?.evaluation?.reto || `Continúa aplicando ${currentSkill.tagline.toLowerCase()}`
    };
  };

  const insights = activeSkillId === 'conecta' 
    ? getConectaInsights() 
    : activeSkillId === 'habla_claro' 
    ? getHablaClaroInsights() 
    : getGenericInsights();

  // VISTA 2: DETALLE DE HABILIDAD SELECCIONADA
  if (selectedSkillDetail) {
    const isHablaClaro = activeSkillId === 'habla_claro';
    const isConecta = activeSkillId === 'conecta';

    return (
      <div className="flex flex-col bg-slate-50 w-full relative pb-24 animate-fadeIn">
        {/* Header con botón atrás */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setSelectedSkillDetail(null)}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Volver a lista"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-base font-black tracking-wider text-[#0F2942]">
              Crecer
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {currentSkill.badge || `Habilidad ${currentSkill.number} de 10`}
            </span>
          </div>
          <div className="w-10 h-10 flex items-center justify-center text-xl">
            {isConecta ? (
              <img src="/conecta/sprout_logo.png" alt="Sprout" className="w-7 h-7 object-contain" />
            ) : (
              <span>{currentSkill.emoji || '⭐'}</span>
            )}
          </div>
        </header>

        <div className="p-4 flex flex-col gap-4 max-w-md mx-auto w-full">
          {/* Banner de Cabecera de la Habilidad */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-amber-50/50 flex-shrink-0 border border-slate-100 flex items-center justify-center text-3xl">
              <img 
                src={`/${currentSkill.id}/illustration_intro.png`} 
                alt={currentSkill.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col flex-1">
              <h1 className="text-lg font-black text-[#0F2942] tracking-tight">
                {currentSkill.title}
              </h1>
              <p className="text-xs font-semibold text-amber-700">
                {currentSkill.subtitle}
              </p>
            </div>
          </div>

          {/* Selector de Pestañas: Mi progreso | Mis prácticas */}
          <div className="flex gap-2 p-1 bg-slate-200/60 rounded-2xl">
            <button
              onClick={() => setDetailTab('progreso')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                detailTab === 'progreso'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Mi progreso
            </button>
            <button
              onClick={() => setDetailTab('practicas')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                detailTab === 'practicas'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Mis prácticas ({activeLogs.length})
            </button>
          </div>

          {/* PESTAÑA: MI PROGRESO */}
          {detailTab === 'progreso' && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              {/* Tarjetas Resumen */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-[11px] font-bold text-slate-700">Lo que has aprendido</span>
                  </div>
                  <span className="text-2xl font-black text-[#0F2942]">
                    {Object.keys(learnProgress[activeSkillId]?.steps || {}).length > 0 
                      ? Object.keys(learnProgress[activeSkillId]?.steps || {}).length 
                      : (isConecta || isHablaClaro ? 3 : 1)}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">pasos completados</span>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <LineChart className="w-5 h-5" />
                    <span className="text-[11px] font-bold text-slate-700">Prácticas realizadas</span>
                  </div>
                  <span className="text-2xl font-black text-[#0F2942]">
                    {activeCompletedCount}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">sesiones registradas</span>
                </div>
              </div>

              {/* Tu evolución en esta habilidad */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#0F2942]">
                    Tu evolución en esta habilidad
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-emerald-900 uppercase">Lo que estás logrando</span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{insights.logrando}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-blue-900 uppercase">Lo que estás fortaleciendo</span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{insights.fortaleciendo}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-100 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-amber-900 uppercase">Tu siguiente paso</span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{insights.siguientePaso}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de acción */}
              <button
                onClick={() => onSelectSkillToLearn(currentSkill)}
                className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-base py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Explorar recorrido interactivo</span>
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* PESTAÑA: MIS PRÁCTICAS */}
          {detailTab === 'practicas' && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              {activeLogs.length === 0 ? (
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#0F2942]">Aún no hay prácticas registradas</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 mb-4">
                    Cuando apliques esta habilidad en casa, registra tus reflexiones aquí.
                  </p>
                  <button
                    onClick={() => onRegisterPractice?.(activeSkillId)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm py-3 px-4 rounded-full"
                  >
                    Registrar práctica
                  </button>
                </div>
              ) : (
                activeLogs.map((log) => (
                  <div 
                    key={log.id}
                    className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#0F2942]">
                        {log.habitTitle || currentSkill.title}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        log.status === 'Realizada' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.status || 'Realizada'}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{log.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-600" />
                        <span>{log.timeOfDay}</span>
                      </div>
                    </div>

                    {log.evaluation && (
                      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex flex-col gap-1 text-xs">
                        <span className="font-extrabold text-emerald-800">Lo que hiciste bien:</span>
                        <p className="text-slate-700 font-medium">{log.evaluation.bien}</p>
                      </div>
                    )}
                  </div>
                ))
              )}

              {activeLogs.length > 0 && (
                <button
                  onClick={() => onRegisterPractice?.(activeSkillId)}
                  className="w-full bg-white hover:bg-slate-50 border-2 border-amber-500 text-amber-700 font-bold text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 mt-2"
                >
                  <Plus className="w-4 h-4" strokeWidth={3} />
                  <span>Registrar nueva práctica</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // VISTA 1: MI PROGRESO (VISTA GENERAL CON LAS 10 HABILIDADES)
  return (
    <div className="flex flex-col bg-slate-50 w-full relative pb-24 animate-fadeIn">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-base font-black tracking-wider text-[#0F2942] uppercase">
            CRECER
          </span>
          <span className="text-[11px] font-semibold text-slate-500">
            Mi progreso
          </span>
        </div>

        <div className="w-8 h-8 flex items-center justify-center">
          <img src="/conecta/sprout_logo.png" alt="Sprout" className="w-7 h-7 object-contain" />
        </div>
      </header>

      <div className="p-4 flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Título Principal */}
        <div>
          <h1 className="text-2xl font-black text-[#0F2942] tracking-tight">
            Mi progreso
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            Descubre lo que has aprendido y cómo lo estás poniendo en práctica.
          </p>
        </div>

        {/* Resumen General 2 Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-1">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <BookOpen className="w-5 h-5" />
              <span className="text-[11px] font-bold text-slate-700">Estoy aprendiendo</span>
            </div>
            <span className="text-2xl font-black text-[#0F2942]">{exploredSkillsCount} de 10</span>
            <span className="text-[11px] text-slate-500 font-medium">habilidades exploradas</span>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-1">
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <LineChart className="w-5 h-5" />
              <span className="text-[11px] font-bold text-slate-700">Estoy practicando</span>
            </div>
            <span className="text-2xl font-black text-[#0F2942]">
              {totalCompletedPractices > 0 ? totalCompletedPractices : '1'}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">prácticas realizadas</span>
          </div>
        </div>

        {/* Sección: Mis Habilidades (Las 10 habilidades completas) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#0F2942]">
              Mis habilidades
            </h2>
            <span className="text-xs font-bold text-slate-400">10 habilidades clave</span>
          </div>

          {learnSkills.map((skill) => {
            const isSkillConecta = skill.id === 'conecta';
            const isSkillHabla = skill.id === 'habla_claro';
            const isSkillActive = isSkillConecta || isSkillHabla || learnProgress[skill.id];

            return (
              <button
                key={skill.id}
                onClick={() => setSelectedSkillDetail(skill.id)}
                className={`bg-white rounded-3xl p-4 border shadow-xs flex items-center justify-between text-left group transition-all cursor-pointer ${
                  isSkillConecta 
                    ? 'border-emerald-200 hover:border-[#00A896]' 
                    : isSkillHabla 
                    ? 'border-amber-200 hover:border-amber-500' 
                    : 'border-slate-100 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className={`w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 flex items-center justify-center text-2xl relative ${
                    isSkillConecta ? 'bg-[#E0F7F6]' : 'bg-amber-50'
                  }`}>
                    <img 
                      src={`/${skill.id}/illustration_intro.png`} 
                      alt={skill.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center">
                      {skill.number}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="text-sm font-black text-[#0F2942] group-hover:text-amber-700 transition-colors truncate">
                      {skill.title}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium truncate">
                      {skill.subtitle}
                    </span>

                    {/* Segmentos de progreso */}
                    <div className="flex items-center gap-1 mt-2">
                      <div className={`h-2 w-5 rounded-full ${isSkillActive ? (isSkillConecta ? 'bg-[#00A896]' : 'bg-amber-500') : 'bg-slate-200'}`} />
                      <div className={`h-2 w-5 rounded-full ${isSkillActive ? (isSkillConecta ? 'bg-[#00A896]' : 'bg-amber-500') : 'bg-slate-200'}`} />
                      <div className={`h-2 w-5 rounded-full ${isSkillActive ? (isSkillConecta ? 'bg-[#00A896]/60' : 'bg-amber-500/60') : 'bg-slate-200'}`} />
                      <div className="h-2 w-5 rounded-full bg-slate-200" />
                      <div className="h-2 w-5 rounded-full bg-slate-200" />
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 flex-shrink-0 transition-colors ml-2" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
