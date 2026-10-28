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

export default function ProgressScreen({ onSelectSkillToLearn, onRegisterPractice }) {
  const [selectedSkillDetail, setSelectedSkillDetail] = useState(null); // null | 'conecta'
  const [detailTab, setDetailTab] = useState('progreso'); // 'progreso' | 'practicas'
  const [logs, setLogs] = useState([]);
  const [learnProgress, setLearnProgress] = useState({});

  useEffect(() => {
    setLogs(getPracticeLogs());
    setLearnProgress(getLearningProgress());
  }, []);

  const conectaLogs = logs.filter(l => l.skillId === 'conecta' || !l.skillId);
  const completedPracticesCount = conectaLogs.filter(l => l.status === 'Realizada').length;

  // Evolution message calculation for Conecta y juega
  const getEvolutionInsights = () => {
    if (completedPracticesCount === 0) {
      return {
        logrando: 'Estás comenzando tu camino en esta habilidad. Da el primer paso con una práctica de 2 o 5 minutos.',
        fortaleciendo: 'Aprender a seguir la iniciativa de tu hijo fortalece su confianza y cercanía emocional.',
        siguientePaso: 'Comparte dos minutos de juego siguiendo sus ideas. Antes de darle una instrucción, observa y comenta lo que está haciendo.'
      };
    }

    const latest = conectaLogs[0]?.answers || {};
    const previous = conectaLogs[1]?.answers || null;

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

  const insights = getEvolutionInsights();

  // VISTA 2: DETALLE DE HABILIDAD (CONECTA Y JUEGA)
  if (selectedSkillDetail === 'conecta') {
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
          </div>
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/conecta/sprout_logo.png" alt="Sprout" className="w-7 h-7 object-contain" />
          </div>
        </header>

        <div className="p-4 flex flex-col gap-4 max-w-md mx-auto w-full">
          {/* Banner de Cabecera de la Habilidad */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-amber-50/50 flex-shrink-0 border border-slate-100">
              <img 
                src="/conecta/illustration_intro.png" 
                alt="Conecta y juega" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col flex-1">
              <h1 className="text-lg font-black text-[#0F2942] tracking-tight">
                Conecta y juega
              </h1>
              <p className="text-xs font-semibold text-[#00A896]">
                Vínculo y atención compartida
              </p>
            </div>
          </div>

          {/* Selector de Pestañas: Mi progreso | Mis prácticas */}
          <div className="flex gap-2 p-1 bg-slate-200/60 rounded-2xl">
            <button
              onClick={() => setDetailTab('progreso')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                detailTab === 'progreso'
                  ? 'bg-[#E0F7F6] text-[#0A3B5C] shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Mi progreso
            </button>
            <button
              onClick={() => setDetailTab('practicas')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                detailTab === 'practicas'
                  ? 'bg-[#E0F7F6] text-[#0A3B5C] shadow-xs'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Mis prácticas ({conectaLogs.length})
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
                  <span className="text-2xl font-black text-[#0F2942]">3</span>
                  <span className="text-[11px] text-slate-500 font-medium">contenidos completados</span>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <LineChart className="w-5 h-5" />
                    <span className="text-[11px] font-bold text-slate-700">Prácticas realizadas</span>
                  </div>
                  <span className="text-2xl font-black text-[#0F2942]">
                    {completedPracticesCount}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">en casa</span>
                </div>
              </div>

              {/* Lo que has aprendido */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#0F2942]">
                  <BookOpen className="w-4 h-4 text-[#00A896]" />
                  <h2 className="text-sm font-black">Lo que has aprendido</h2>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A896] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 font-medium leading-snug">
                      Reconocer cuándo acompañas el juego sin dirigirlo.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A896] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 font-medium leading-snug">
                      Identificar formas de participar: observar, describir, imitar y responder.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00A896] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 font-medium leading-snug">
                      Distinguir entre comentar lo que hace tu hijo y darle instrucciones.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cómo lo estás aplicando */}
              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#0F2942]">
                  <img src="/conecta/sprout_logo.png" alt="Leaf" className="w-4 h-4 object-contain" />
                  <h2 className="text-sm font-black">Cómo lo estás aplicando</h2>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl">
                    <span className="text-xl">👦</span>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {insights.logrando}
                    </p>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-2xl">
                    <Target className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {insights.fortaleciendo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tu siguiente paso */}
              <div className="bg-[#FFFBEB] rounded-3xl p-4 border border-amber-200/70 shadow-xs flex gap-3.5 items-start">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-sm font-black text-[#0F2942] tracking-tight mb-1">
                    Tu siguiente paso
                  </h3>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    {insights.siguientePaso}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PESTAÑA: MIS PRÁCTICAS (HISTORIAL DETALLADO) */}
          {detailTab === 'practicas' && (
            <div className="flex flex-col gap-3 animate-fadeIn">
              {conectaLogs.length > 0 ? (
                conectaLogs.map((log) => (
                  <div key={log.id} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/conecta/sprout_logo.png" alt="Leaf" className="w-4 h-4 object-contain" />
                        <span className="text-xs font-extrabold text-[#0F2942]">
                          {new Date(log.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        log.status === 'Realizada' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {log.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 flex flex-col gap-1 pt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{log.duration} • {log.timeOfDay}</span>
                      </div>
                      {log.answers && (
                        <>
                          <div className="text-[11px] text-slate-700 mt-1">
                            🌱 Dejé elegir: <span className="font-bold capitalize">{log.answers.dejoElegir || 'Sí'}</span>
                          </div>
                          <div className="text-[11px] text-slate-700">
                            👥 Sin dirigir: <span className="font-bold capitalize">{log.answers.acompanoSinDirigir || 'Sí'}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-6 border border-slate-100 text-center flex flex-col items-center gap-3">
                  <p className="text-xs text-slate-500">
                    Aún no tienes registros de práctica para esta habilidad.
                  </p>
                  <button
                    onClick={() => onRegisterPractice?.('conecta')}
                    className="bg-[#00A896] text-white font-extrabold text-xs py-3 px-5 rounded-full cursor-pointer hover:bg-[#009282]"
                  >
                    Registrar práctica
                  </button>
                </div>
              )}

              {conectaLogs.length > 0 && (
                <button
                  onClick={() => onRegisterPractice?.('conecta')}
                  className="mt-2 w-full bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
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

  // VISTA 1: MI PROGRESO (VISTA GENERAL)
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
            <span className="text-2xl font-black text-[#0F2942]">2 de 9</span>
            <span className="text-[11px] text-slate-500 font-medium">habilidades exploradas</span>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-1">
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <LineChart className="w-5 h-5" />
              <span className="text-[11px] font-bold text-slate-700">Estoy practicando</span>
            </div>
            <span className="text-2xl font-black text-[#0F2942]">
              {completedPracticesCount > 0 ? completedPracticesCount : '1'}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">prácticas realizadas</span>
          </div>
        </div>

        {/* Sección: Mis Habilidades */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-extrabold text-[#0F2942]">
            Mis habilidades
          </h2>

          {/* Tarjeta Destacada: Conecta y juega */}
          <button
            onClick={() => setSelectedSkillDetail('conecta')}
            className="bg-white rounded-3xl p-4 border border-emerald-200 shadow-xs flex items-center justify-between text-left group hover:border-[#00A896] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-amber-50 flex-shrink-0 border border-slate-100">
                <img 
                  src="/conecta/illustration_intro.png" 
                  alt="Conecta y juega" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex flex-col min-w-0">
                <h3 className="text-sm font-black text-[#0F2942] group-hover:text-[#00A896] transition-colors truncate">
                  Conecta y juega
                </h3>
                <span className="text-xs text-slate-500 font-medium truncate">
                  Vínculo y atención compartida
                </span>

                {/* Segmentos de progreso verde */}
                <div className="flex items-center gap-1 mt-2">
                  <div className="h-2 w-6 rounded-full bg-[#00A896]" />
                  <div className="h-2 w-6 rounded-full bg-[#00A896]" />
                  <div className="h-2 w-6 rounded-full bg-[#00A896]" />
                  <div className="h-2 w-6 rounded-full bg-slate-200" />
                  <div className="h-2 w-6 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#00A896] flex-shrink-0 transition-colors" />
          </button>

          {/* Otras habilidades del programa */}
          {[
            { id: 'comunica', title: 'Comunica y regula', subtitle: 'Comunicación y manejo emocional', icon: '💬' },
            { id: 'refuerza', title: 'Refuerza y motiva', subtitle: 'Conducta y motivación', icon: '⭐' },
            { id: 'rutinas', title: 'Establece rutinas', subtitle: 'Organización y predictibilidad', icon: '📅' },
            { id: 'desafios', title: 'Maneja desafíos', subtitle: 'Conductas difíciles', icon: '👥' }
          ].map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex items-center justify-between text-left opacity-80"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl flex-shrink-0 border border-slate-100">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-extrabold text-slate-800">
                    {item.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.subtitle}
                  </span>
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="h-1.5 w-5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-5 rounded-full bg-slate-200" />
                    <div className="h-1.5 w-5 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
