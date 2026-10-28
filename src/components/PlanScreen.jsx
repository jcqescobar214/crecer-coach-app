import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sun, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  X,
  Lightbulb,
  Flag,
  Info
} from 'lucide-react';
import { getSavedPlanHabits, getPracticeLogs, savePlanHabit } from '../data/planStorage';

export default function PlanScreen({ onRegisterPractice, onExploreSkills }) {
  const [activeTab, setActiveTab] = useState('pendientes'); // 'pendientes' | 'realizadas' | 'historial'
  const [habits, setHabits] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null); // Modal con detalle completo de un registro
  const [reschedulingHabitId, setReschedulingHabitId] = useState(null); // Control de reprogramación rápida

  const refreshData = () => {
    setHabits(getSavedPlanHabits());
    setLogs(getPracticeLogs());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const pendingHabits = habits.filter(h => h.status !== 'Realizada');
  const completedHabits = habits.filter(h => h.status === 'Realizada');

  const handleUpdateMoment = (habit, newMoment) => {
    savePlanHabit({
      ...habit,
      timeOfDay: newMoment
    });
    refreshData();
    setReschedulingHabitId(null);
  };

  return (
    <div className="flex flex-col bg-slate-50 w-full relative pb-24 animate-fadeIn">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-base font-black tracking-wider text-[#0F2942] uppercase">
            CRECER
          </span>
          <span className="text-[11px] font-semibold text-slate-500">
            Mi plan
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
            Mi plan
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            Aquí encontrarás tus prácticas. ¡Tú decides cuándo realizarlas!
          </p>
        </div>

        {/* 3 Pestañas: Pendientes, Realizadas, Historial */}
        <div className="flex gap-1.5 p-1 bg-slate-200/60 rounded-2xl">
          <button
            onClick={() => setActiveTab('pendientes')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'pendientes'
                ? 'bg-white text-[#0A3B5C] shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#00A896]" />
            <span>Pendientes</span>
            {pendingHabits.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#00A896] text-white text-[10px] font-black flex items-center justify-center">
                {pendingHabits.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('realizadas')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'realizadas'
                ? 'bg-white text-[#0A3B5C] shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Realizadas</span>
            {logs.filter(l => l.status === 'Realizada').length > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
                {logs.filter(l => l.status === 'Realizada').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('historial')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'historial'
                ? 'bg-white text-[#0A3B5C] shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Historial</span>
            {logs.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                {logs.length}
              </span>
            )}
          </button>
        </div>

        {/* CONTENIDO PESTAÑA PENDIENTES */}
        {activeTab === 'pendientes' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {pendingHabits.length > 0 ? (
              pendingHabits.map((habit) => (
                <div 
                  key={habit.id || habit.habitKey}
                  className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 p-2 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={habit.icon || '/conecta/icon_blocks.png'} 
                          alt="Icono" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-extrabold uppercase text-[#00A896]">
                          {habit.skillTitle || 'Conecta y juega'}
                        </span>
                        <h2 className="text-lg font-black text-[#0F2942]">
                          {habit.title || '5 minutos juntos'}
                        </h2>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{habit.status || 'Pendiente'}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                    {habit.description || 'Deja que tu hijo elija un juego seguro. Acompáñalo sin dirigir.'}
                  </p>

                  {/* Duración y Momento */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Duración</span>
                        <span className="text-xs font-extrabold text-slate-800">
                          {habit.duration || '5 minutos'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Sun className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Momento</span>
                        <span className="text-xs font-extrabold text-slate-800 capitalize">
                          {habit.timeOfDay || 'Tarde'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selector rápido de reprogramación si está activo */}
                  {reschedulingHabitId === (habit.id || habit.habitKey) && (
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col gap-2 animate-fadeIn">
                      <span className="text-[11px] font-bold text-slate-700">Cambiar momento del día:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['Mañana', 'Tarde', 'Noche', 'Elegir después'].map((momento) => (
                          <button
                            key={momento}
                            onClick={() => handleUpdateMoment(habit, momento)}
                            className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              habit.timeOfDay === momento 
                                ? 'bg-[#00A896] text-white shadow-xs' 
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {momento}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Botones de acción de la práctica */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onRegisterPractice?.(habit.skillId || 'conecta')}
                      className="flex-1 bg-[#00A896] hover:bg-[#009282] active:scale-[0.99] text-white font-extrabold text-sm py-3.5 px-4 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <span>Registrar mi práctica</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>

                    <button
                      onClick={() => setReschedulingHabitId(
                        reschedulingHabitId === (habit.id || habit.habitKey) ? null : (habit.id || habit.habitKey)
                      )}
                      title="Reprogramar momento del día"
                      className="w-12 h-12 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer flex-shrink-0"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 text-center flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#E0F7F6] text-[#00A896] flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h2 className="text-base font-black text-[#0F2942]">
                  No tienes prácticas pendientes
                </h2>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Explora las habilidades en Quiero aprender y añade una misión a tu plan para comenzar a practicar en casa.
                </p>
                <button
                  onClick={onExploreSkills}
                  className="mt-2 bg-[#00A896] text-white font-extrabold text-xs py-3 px-5 rounded-full cursor-pointer hover:bg-[#009282] transition-colors shadow-sm"
                >
                  Explorar nuevas prácticas
                </button>
              </div>
            )}

            {/* Próximas prácticas explicativas */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl flex-shrink-0">
                🗓️
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-xs font-black text-[#0F2942]">Próximas prácticas</span>
                <p className="text-xs text-slate-500 leading-snug">
                  Cuando completes esta práctica, te propondremos automáticamente tu siguiente reto.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CONTENIDO PESTAÑA REALIZADAS */}
        {activeTab === 'realizadas' && (
          <div className="flex flex-col gap-3 animate-fadeIn">
            {logs.filter(l => l.status === 'Realizada').length > 0 ? (
              logs.filter(l => l.status === 'Realizada').map((log) => (
                <div 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5 cursor-pointer hover:border-[#00A896]/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#00A896]">
                      {log.skillTitle || 'Conecta y juega'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      Realizada
                    </span>
                  </div>
                  <h2 className="text-sm font-extrabold text-[#0F2942] group-hover:text-[#00A896] transition-colors">
                    {log.habitTitle || '5 minutos juntos'}
                  </h2>
                  <p className="text-xs text-slate-600 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/60 leading-relaxed">
                    "{log.evaluation?.bien}"
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400">
                      {new Date(log.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="text-[11px] font-bold text-[#00A896] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Ver detalle</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 text-center flex flex-col items-center gap-2">
                <p className="text-xs text-slate-500">
                  Aún no has registrado prácticas completadas.
                </p>
              </div>
            )}
          </div>
        )}

        {/* CONTENIDO PESTAÑA HISTORIAL */}
        {activeTab === 'historial' && (
          <div className="flex flex-col gap-3 animate-fadeIn">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2 cursor-pointer hover:border-[#00A896]/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {new Date(log.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      log.status === 'Realizada' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {log.status || 'Registrada'}
                    </span>
                  </div>
                  <h2 className="text-sm font-extrabold text-[#0F2942] group-hover:text-[#00A896] transition-colors">
                    {log.habitTitle || 'Conecta y juega'}
                  </h2>
                  <div className="text-[11px] text-slate-500 flex flex-wrap gap-2 items-center">
                    <span>Duración: {log.duration || '5 min'}</span>
                    <span>•</span>
                    <span>Momento: {log.timeOfDay || 'Tarde'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-6 border border-slate-100 text-center flex flex-col items-center gap-2">
                <p className="text-xs text-slate-500">
                  No hay registros en el historial todavía.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL DE DETALLE COMPLETO DEL REGISTRO (Regla 4: Consulta de información histórica) */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase text-[#00A896]">
                  {selectedLog.skillTitle || 'Conecta y juega'}
                </span>
                <h3 className="text-base font-black text-[#0F2942]">
                  {selectedLog.habitTitle || '5 minutos juntos'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Metadatos */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Fecha</span>
                <span className="font-extrabold text-slate-800">
                  {new Date(selectedLog.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Estado</span>
                <span className="font-extrabold text-emerald-700">
                  {selectedLog.status || 'Realizada'}
                </span>
              </div>
              <div className="mt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Duración</span>
                <span className="font-extrabold text-slate-800">
                  {selectedLog.duration || '5 minutos'}
                </span>
              </div>
              <div className="mt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Momento</span>
                <span className="font-extrabold text-slate-800">
                  {selectedLog.timeOfDay || 'Tarde'}
                </span>
              </div>
            </div>

            {/* Respuestas reportadas */}
            {selectedLog.answers && (
              <div className="flex flex-col gap-1.5 text-xs">
                <span className="font-extrabold text-slate-700">Conductas reportadas:</span>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex flex-col gap-1 text-[11px] text-slate-600">
                  <div>• ¿Dejó elegir el juego?: <b className="text-slate-800">{selectedLog.answers.dejoElegir === 'si' ? 'Sí' : selectedLog.answers.dejoElegir === 'costo' ? 'Me costó' : 'A veces'}</b></div>
                  <div>• ¿Acompañó sin dirigir?: <b className="text-slate-800">{selectedLog.answers.acompanoSinDirigir === 'si' ? 'Sí' : selectedLog.answers.acompanoSinDirigir === 'costo' ? 'Me costó' : 'A veces'}</b></div>
                </div>
              </div>
            )}

            {/* Retroalimentación del Coach */}
            {selectedLog.evaluation && (
              <div className="flex flex-col gap-2.5">
                <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl flex flex-col gap-1">
                  <span className="text-[11px] font-black text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Lo que hiciste bien
                  </span>
                  <p className="text-xs text-emerald-900 leading-snug font-medium">
                    {selectedLog.evaluation.bien}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl flex flex-col gap-1">
                  <span className="text-[11px] font-black text-blue-800 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Recomendación
                  </span>
                  <p className="text-xs text-blue-900 leading-snug font-medium">
                    {selectedLog.evaluation.recomendacion}
                  </p>
                </div>

                {selectedLog.evaluation.reto && (
                  <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl flex flex-col gap-1">
                    <span className="text-[11px] font-black text-amber-800 flex items-center gap-1">
                      <Flag className="w-3.5 h-3.5" />
                      Siguiente reto
                    </span>
                    <p className="text-xs text-amber-900 leading-snug font-medium">
                      {selectedLog.evaluation.reto}
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setSelectedLog(null)}
              className="w-full bg-slate-900 text-white font-bold text-xs py-3 rounded-full mt-1 cursor-pointer hover:bg-slate-800 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
