// Gestión de persistencia local para "Mi Plan" y "Mi Progreso" de la app Crecer

const STORAGE_KEY = 'crecer_plan_habits';
const LOGS_STORAGE_KEY = 'crecer_practice_logs';
const LEARN_PROGRESS_KEY = 'crecer_learn_progress';

export const getSavedPlanHabits = () => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer hábitos de Mi Plan:', error);
    return [];
  }
};

export const savePlanHabit = (habit) => {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getSavedPlanHabits();
    const alreadyExists = existing.some(h => h.id === habit.id || h.habitKey === habit.habitKey);
    
    let updated;
    if (alreadyExists) {
      updated = existing.map(h => (h.id === habit.id || h.habitKey === habit.habitKey) 
        ? { ...h, ...habit, updatedAt: new Date().toISOString() } 
        : h
      );
    } else {
      updated = [
        ...existing,
        {
          ...habit,
          addedAt: new Date().toISOString(),
          status: habit.status || 'Pendiente',
          completedCount: 0,
          isActive: true
        }
      ];
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error al guardar hábito en Mi Plan:', error);
    return getSavedPlanHabits();
  }
};

export const isHabitInPlan = (habitKey) => {
  const habits = getSavedPlanHabits();
  return habits.some(h => h.habitKey === habitKey || h.id === habitKey);
};

// --- Registro de Prácticas Realizadas (Logs) ---

export const getPracticeLogs = () => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(LOGS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al leer historial de prácticas:', error);
    return [];
  }
};

export const savePracticeLog = (logEntry) => {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getPracticeLogs();
    const newEntry = {
      id: 'log_' + Date.now(),
      createdAt: new Date().toISOString(),
      ...logEntry
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updated));

    // Si la práctica fue realizada, actualizar el estado en Mi Plan
    if (logEntry.pudoJugar === 'si') {
      const habits = getSavedPlanHabits();
      const updatedHabits = habits.map(h => {
        if (h.skillId === logEntry.skillId || h.id === logEntry.skillId) {
          return {
            ...h,
            status: 'Realizada',
            completedCount: (h.completedCount || 0) + 1,
            lastCompletedAt: new Date().toISOString()
          };
        }
        return h;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHabits));
    }

    return updated;
  } catch (error) {
    console.error('Error al guardar registro de práctica:', error);
    return getPracticeLogs();
  }
};

// Matriz clínica de evaluación para Conecta y juega
export const evaluateConectaPractice = (answers) => {
  const { pudoJugar, dejoElegir, acompanoSinDirigir, participacion, dificultad } = answers;

  if (pudoJugar === 'hoy_no' || pudoJugar === 'no') {
    return {
      type: 'hoy_no',
      title: 'Hoy no pudiste realizar la actividad',
      message: 'No te preocupes. Puedes intentarlo en otro momento. Lo valioso es mantener la intención.',
      bien: 'Reconociste que hoy no fue el momento oportuno.',
      recomendacion: 'Busca un espacio de 2 minutos donde puedas estar sin prisa.',
      reto: 'Reprogramar la práctica para cuando te sea más cómodo.',
      status: 'Reprogramada'
    };
  }

  // 1. Dejó elegir al niño y pudo acompañarlo sin dirigirlo. No reporta dificultades.
  if ((dejoElegir === 'si') && (acompanoSinDirigir === 'si') && (dificultad === 'nada' || dificultad === 'ninguna')) {
    return {
      type: 'perfect',
      bien: 'Dejaste que tu hijo eligiera cómo jugar y acompañaste su iniciativa.',
      recomendacion: 'Continúa observando, comentando, imitando y respondiendo a sus iniciativas cuando surjan oportunidades.',
      reto: 'Comparte otro momento de juego y practica estas formas de acompañarlo.',
      status: 'Realizada'
    };
  }

  // 2. Dejó elegir al niño, pero le costó no darle instrucciones.
  if (dejoElegir === 'si' && (acompanoSinDirigir === 'costo' || dificultad === 'no_instrucciones')) {
    return {
      type: 'costo_no_dirigir',
      bien: 'Permitiste que tu hijo eligiera cómo jugar.',
      recomendacion: 'Cuando quieras decirle qué hacer, observa unos segundos y comenta lo que está haciendo. Así puedes participar sin dirigirlo.',
      reto: 'Practica acompañarlo sin darle instrucciones durante dos minutos.',
      status: 'Realizada'
    };
  }

  // 3. Le costó dejar que el niño eligiera cómo jugar.
  if (dejoElegir === 'costo') {
    return {
      type: 'costo_dejar_elegir',
      bien: 'Encontraste un momento para compartir con tu hijo.',
      recomendacion: 'La próxima vez, deja que él escoja un juego seguro y espera a ver cómo decide empezar.',
      reto: 'Practica seguir su iniciativa sin proponerle qué hacer.',
      status: 'Realizada'
    };
  }

  // 4. Pudo acompañar el juego, pero le costó mantener la atención.
  if (dificultad === 'mantener_atencion') {
    return {
      type: 'costo_atencion',
      bien: 'Compartiste un momento de juego con tu hijo.',
      recomendacion: 'Busca un momento con pocas interrupciones y deja el celular a un lado.',
      reto: 'Intenta dedicar dos minutos de atención plena al juego.',
      status: 'Realizada'
    };
  }

  // 5. Le costó seguir la iniciativa del niño.
  if (dificultad === 'seguir_iniciativa') {
    return {
      type: 'costo_iniciativa',
      bien: 'Dedicaste un momento a jugar con tu hijo.',
      recomendacion: 'Antes de proponer una nueva actividad, observa qué quiere hacer y acompaña su idea.',
      reto: 'Deja que tu hijo decida cómo continúa el juego.',
      status: 'Realizada'
    };
  }

  // 6. Reportó dificultades tanto para dejar elegir como para no dirigir.
  if (dejoElegir !== 'si' && acompanoSinDirigir !== 'si') {
    return {
      type: 'dificultad_ambas',
      bien: 'Encontraste un momento para jugar con tu hijo.',
      recomendacion: 'Empieza por dejar que él elija el juego. Observa lo que hace antes de participar.',
      reto: 'Practica durante dos minutos siguiendo sus ideas.',
      status: 'Realizada'
    };
  }

  // Por defecto (completó con éxito con ligeros matices)
  return {
    type: 'general_positivo',
    bien: 'Dejaste que tu hijo llevara la iniciativa y dedicaste tiempo exclusivo a jugar.',
    recomendacion: 'Comenta lo que hace en lugar de hacer preguntas o darle órdenes.',
    reto: 'Practica dos minutos comentando lo que ves mientras él juega.',
    status: 'Realizada'
  };
};

// --- Progreso de Aprendizaje en "Quiero aprender" ---

export const getLearningProgress = () => {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(LEARN_PROGRESS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    return {};
  }
};

export const recordLearningStep = (skillId, stepKey, result) => {
  if (typeof window === 'undefined') return;
  try {
    const current = getLearningProgress();
    const skillData = current[skillId] || { steps: {}, completed: false };
    skillData.steps[stepKey] = {
      result, // 'identificado' | 'revisado' | 'practicando'
      timestamp: new Date().toISOString()
    };
    current[skillId] = skillData;
    localStorage.setItem(LEARN_PROGRESS_KEY, JSON.stringify(current));
  } catch (error) {
    console.error('Error al registrar aprendizaje:', error);
  }
};
