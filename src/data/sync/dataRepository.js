/**
 * Repositorio de Datos Unificado (Repository Pattern)
 * 
 * Capa de abstracción que aísla la lógica de UI de la fuente física de datos.
 * Actualmente delega en el almacenamiento local con resiliencia, pero expone
 * ganchos arquitectónicos para conectar proveedores remotos (Supabase, Firebase, API REST)
 * sin requerir refactorizaciones en los componentes de React.
 */

import { withSyncMetadata } from './syncSchema';
import { enqueueChange } from './syncQueue';
import { 
  getSavedPlanHabits, 
  savePlanHabit as saveLocalHabit, 
  getPracticeLogs, 
  savePracticeLog as saveLocalLog,
  getLearningProgress,
  recordLearningStep as recordLocalStep
} from '../planStorage';

/**
 * Proveedor remoto abstracto (Placeholder para futura fase de base de datos)
 */
export const RemoteDataSource = {
  isConfigured: false,
  async fetchRemoteHabits(userId) {
    // A implementar en fase futura: return fetch('/api/habits', ...)
    return [];
  },
  async pushPendingChanges(pendingQueue) {
    // A implementar en fase futura: envío en lote de la cola de outbox
    return { success: true, syncedIds: [] };
  }
};

/**
 * Repositorio de Hábitos (Mi Plan)
 */
export const habitsRepository = {
  getAll: () => {
    return getSavedPlanHabits();
  },

  save: (habit, currentUserId = null) => {
    // 1. Estampar metadatos estándar de sincronización (versión, estado, timestamp)
    const syncReadyHabit = withSyncMetadata(habit, currentUserId);

    // 2. Persistir localmente con resiliencia y protección
    const updatedList = saveLocalHabit(syncReadyHabit);

    // 3. Registrar en cola de outbox para futura subida a BD
    enqueueChange('habits', habit.id ? 'UPDATE' : 'INSERT', syncReadyHabit.id, syncReadyHabit);

    return updatedList;
  }
};

/**
 * Repositorio de Registros de Práctica (Historial de Evaluaciones)
 */
export const practiceLogsRepository = {
  getAll: () => {
    return getPracticeLogs();
  },

  save: (logEntry, currentUserId = null) => {
    // 1. Estampar metadatos de sincronización
    const syncReadyLog = withSyncMetadata(logEntry, currentUserId);

    // 2. Persistir localmente
    const updatedLogs = saveLocalLog(syncReadyLog);

    // 3. Registrar en cola de outbox
    enqueueChange('practice_logs', 'INSERT', syncReadyLog.id, syncReadyLog);

    return updatedLogs;
  }
};

/**
 * Repositorio de Progreso de Aprendizaje ("Quiero aprender")
 */
export const learningProgressRepository = {
  get: () => {
    return getLearningProgress();
  },

  recordStep: (skillId, stepKey, result, currentUserId = null) => {
    recordLocalStep(skillId, stepKey, result);
    enqueueChange('learning_progress', 'UPDATE', `${skillId}_${stepKey}`, {
      skillId,
      stepKey,
      result,
      timestamp: new Date().toISOString(),
      userId: currentUserId
    });
  }
};
