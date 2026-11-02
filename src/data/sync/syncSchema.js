/**
 * Esquema de Contrato y Metadatos para Sincronización en la Nube
 * 
 * Prepara las entidades locales de Crecer Coach para una futura sincronización
 * con bases de datos en la nube (ej. Supabase, Firebase, PostgreSQL REST API).
 * 
 * Regla: NO realiza llamadas de red ni sincronización activa; únicamente define
 * las propiedades estándar de versión, estado de sincronización y autoría.
 */

export const SYNC_STATUS = {
  SYNCED: 'synced',                 // Ya existe idéntico en la nube
  PENDING_INSERT: 'pending_insert', // Creado localmente, pendiente de subir a la BD
  PENDING_UPDATE: 'pending_update', // Modificado localmente, pendiente de actualizar
  PENDING_DELETE: 'pending_delete'  // Eliminado localmente, pendiente de borrar en BD
};

/**
 * Enriquece cualquier entidad local con metadatos estándar de sincronización.
 * @param {Object} entity - Objeto de datos (hábito, práctica, progreso)
 * @param {string|null} userId - ID del usuario autenticado (o null si es modo anónimo/invitado)
 * @returns {Object} Entidad con metadatos de sincronización
 */
export const withSyncMetadata = (entity, userId = null) => {
  const now = new Date().toISOString();
  const isExisting = Boolean(entity._version);

  return {
    ...entity,
    _syncStatus: isExisting ? SYNC_STATUS.PENDING_UPDATE : SYNC_STATUS.PENDING_INSERT,
    _version: (entity._version || 0) + 1,
    _userId: entity._userId || userId || null,
    _deviceTimestamp: now,
    updatedAt: now,
    createdAt: entity.createdAt || entity.addedAt || now
  };
};

/**
 * Marca una entidad local como confirmada y sincronizada con la nube.
 * @param {Object} entity
 * @param {string} remoteId - ID asignado por la base de datos en la nube (si difiere)
 * @returns {Object}
 */
export const markAsSynced = (entity, remoteId = null) => {
  return {
    ...entity,
    _syncStatus: SYNC_STATUS.SYNCED,
    _lastSyncedAt: new Date().toISOString(),
    ...(remoteId ? { _remoteId: remoteId } : {})
  };
};
