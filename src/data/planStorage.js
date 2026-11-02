// Gestión de persistencia local segura para "Mi Plan" y "Mi Progreso" de la app Crecer

const STORAGE_KEY = 'crecer_plan_habits';
const LOGS_STORAGE_KEY = 'crecer_practice_logs';
const LEARN_PROGRESS_KEY = 'crecer_learn_progress';

// Almacén en memoria RAM para resiliencia en caso de que localStorage esté bloqueado o sin cuota
const memoryStore = new Map();

// Cifrado/ofuscación ligera de datos sensibles familiares (UTF-8 safe + compatibilidad retroactiva)
const encodeStorageData = (obj) => {
  try {
    const json = JSON.stringify(obj);
    return 'crx_' + btoa(unescape(encodeURIComponent(json)));
  } catch (e) {
    return JSON.stringify(obj);
  }
};

const decodeStorageData = (raw) => {
  if (!raw) return null;
  try {
    if (typeof raw === 'string' && raw.startsWith('crx_')) {
      const json = decodeURIComponent(escape(atob(raw.slice(4))));
      return JSON.parse(json);
    }
    return JSON.parse(raw);
  } catch (e) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
};

const safeGetItem = (key, fallback = null) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const parsed = decodeStorageData(raw);
      return parsed !== null ? parsed : fallback;
    }
    return memoryStore.get(key) || fallback;
  } catch (error) {
    console.warn(`[Crecer Storage] Error al leer ${key}, usando respaldo en memoria:`, error);
    return memoryStore.get(key) || fallback;
  }
};

const safeSetItem = (key, data) => {
  if (typeof window === 'undefined') return;
  const encoded = encodeStorageData(data);
  try {
    localStorage.setItem(key, encoded);
    memoryStore.set(key, data);
  } catch (error) {
    console.warn(`[Crecer Storage] Cuota excedida o almacenamiento no disponible para ${key}. Guardando en memoria RAM:`, error);
    memoryStore.set(key, data);
  }
};

export const getSavedPlanHabits = () => {
  return safeGetItem(STORAGE_KEY, []);
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
    
    safeSetItem(STORAGE_KEY, updated);
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
  return safeGetItem(LOGS_STORAGE_KEY, []);
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
    safeSetItem(LOGS_STORAGE_KEY, updated);

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
      safeSetItem(STORAGE_KEY, updatedHabits);
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

// Matriz clínica de evaluación para Habla claro (Instrucciones efectivas)
export const evaluateHablaClaroPractice = (answers) => {
  const { pudoPracticar, seAcerco, unaSolaCosa, tonoCalmo, dificultad } = answers;

  if (pudoPracticar === 'hoy_no' || pudoPracticar === 'no') {
    return {
      type: 'hoy_no',
      title: 'Hoy no pudiste realizar la práctica',
      message: 'No te preocupes. Lo fundamental es ser consciente del momento. Puedes intentarlo en tu próxima rutina.',
      bien: 'Reconociste que el momento no era propicio para dar indicaciones con calma.',
      recomendacion: 'Elige una rutina simple (guardar los zapatos o sentarse a almorzar) donde estés cerca.',
      reto: 'Programar una indicación clara para tu siguiente rutina del día.',
      status: 'Reprogramada'
    };
  }

  // 1. Acercamiento excelente, una sola indicación, tono firme y calmo, sin dificultad
  if (
    seAcerco === 'si' && 
    unaSolaCosa === 'si' && 
    (tonoCalmo === 'firme_calmo' || tonoCalmo === 'si') && 
    (dificultad === 'ninguna' || dificultad === 'nada')
  ) {
    return {
      type: 'perfect',
      bien: 'Te pusiste a su altura, pediste una sola acción motora concreta y mantuviste un tono sereno y seguro.',
      recomendacion: 'Apenas empiece a realizar la acción, reconóceselo de inmediato diciendo exactamente lo que hizo bien.',
      reto: 'Aplica esta misma fórmula de 3 pasos en dos momentos diferentes del día de mañana.',
      status: 'Realizada'
    };
  }

  // 2. Le costó acercarse o dio la orden desde lejos
  if (seAcerco === 'le_costo' || dificultad === 'grite_lejos') {
    return {
      type: 'costo_acercarse',
      bien: 'Fuiste consciente de cómo le estás pidiendo las cosas a tu hijo.',
      recomendacion: 'Antes de hablar, camina hasta donde esté tu hijo, ponte a su altura y asegúrate de tener su mirada antes de dar la orden.',
      reto: 'Practica no pedir nada a más de un metro de distancia en tu próxima indicación.',
      status: 'Realizada'
    };
  }

  // 3. Encadenó varias instrucciones juntas
  if (unaSolaCosa === 'varias_juntas' || dificultad === 'cadenas') {
    return {
      type: 'costo_una_instruccion',
      bien: 'Buscaste orientar la conducta de tu hijo hacia una tarea necesaria.',
      recomendacion: 'El cerebro infantil no retiene listas largas. Pide un solo paso motor a la vez: primero los zapatos, luego la mochila.',
      reto: 'Da una sola indicación física por vez y espera a que termine antes de la siguiente.',
      status: 'Realizada'
    };
  }

  // 4. Elevó la voz o le costó esperar los 5 segundos
  if (tonoCalmo === 'eleve_voz' || dificultad === 'esperar_pausa') {
    return {
      type: 'costo_pausa_tono',
      bien: 'Identificaste que el tono y los tiempos son decisivos para que coopere.',
      recomendacion: 'Los niños tardan entre 5 y 8 segundos en procesar una instrucción motora. Cuenta mentalmente hasta cinco en silencio antes de repetir.',
      reto: 'Habla con voz tranquila y espera 5 segundos en silencio con una actitud paciente.',
      status: 'Realizada'
    };
  }

  // Por defecto (completó con éxito)
  return {
    type: 'general_positivo',
    bien: 'Practicaste dar indicaciones más precisas, directas y alcanzables para tu hijo.',
    recomendacion: 'Continúa nombrando la acción física exacta (guardar, colocar, llevar) en vez de órdenes generales.',
    reto: 'Practica dar 3 instrucciones concretas a lo largo de tu jornada de mañana.',
    status: 'Realizada'
  };
};

// Dispatcher de evaluación por habilidad
export const evaluatePractice = (skillId, answers) => {
  if (skillId === 'habla_claro') {
    return evaluateHablaClaroPractice(answers);
  }
  return evaluateConectaPractice(answers);
};

// --- Progreso de Aprendizaje en "Quiero aprender" ---

export const getLearningProgress = () => {
  return safeGetItem(LEARN_PROGRESS_KEY, {});
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
    safeSetItem(LEARN_PROGRESS_KEY, current);
  } catch (error) {
    console.error('Error al registrar aprendizaje:', error);
  }
};
