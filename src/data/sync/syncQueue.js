/**
 * Cola de Sincronización Local (Outbox Pattern)
 * 
 * Estructura arquitectónica para registrar operaciones de datos que deben enviarse
 * a la nube cuando haya conexión a internet y un usuario autenticado.
 * 
 * Regla: Almacena localmente las operaciones en cola; NO ejecuta llamadas de red.
 */

const QUEUE_STORAGE_KEY = 'crecer_sync_outbox';

const getQueueStorage = () => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(QUEUE_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveQueueStorage = (queue) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.warn('[SyncQueue] No se pudo guardar la cola de sincronización:', e);
  }
};

/**
 * Encola una operación de mutación para futura sincronización.
 * @param {string} collection - Nombre de la colección ('habits', 'practice_logs', 'learning_progress')
 * @param {'INSERT'|'UPDATE'|'DELETE'} action - Tipo de operación
 * @param {string} entityId - Identificador del registro
 * @param {Object} payload - Datos de la entidad
 */
export const enqueueChange = (collection, action, entityId, payload) => {
  const queue = getQueueStorage();
  const queueItem = {
    queueId: 'q_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    collection,
    action,
    entityId,
    payload,
    enqueuedAt: new Date().toISOString(),
    retryCount: 0
  };

  // Si ya existía una operación pendiente para la misma entidad, se actualiza o fusiona
  const filtered = queue.filter(item => !(item.collection === collection && item.entityId === entityId));
  const updatedQueue = [...filtered, queueItem];

  saveQueueStorage(updatedQueue);
  return queueItem;
};

/**
 * Obtiene todas las operaciones pendientes de sincronización.
 * @returns {Array} Lista de cambios en cola
 */
export const getPendingChanges = () => {
  return getQueueStorage();
};

/**
 * Remueve una operación completada de la cola.
 * @param {string} queueId
 */
export const dequeueChange = (queueId) => {
  const queue = getQueueStorage();
  const updated = queue.filter(item => item.queueId !== queueId);
  saveQueueStorage(updated);
  return updated;
};

/**
 * Limpia la cola de sincronización (útil al cerrar sesión o restablecer cuenta).
 */
export const clearSyncQueue = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(QUEUE_STORAGE_KEY);
  } catch (e) {
    // Ignore
  }
};
