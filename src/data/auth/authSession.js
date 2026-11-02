/**
 * Gestión de Sesión y Autenticación (Contrato Arquitectónico)
 * 
 * Estructura para representar la identidad del usuario actual (anónimo o autenticado).
 * Permite que los repositorios asocien un `_userId` a las prácticas y hábitos
 * sin requerir un backend activo hoy.
 */

const SESSION_STORAGE_KEY = 'crecer_auth_session';

export const getCurrentUser = () => {
  if (typeof window === 'undefined') {
    return { id: 'anonymous', isAnonymous: true, email: null };
  }
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return {
        id: data.userId || 'guest',
        isAnonymous: false,
        email: data.email || null,
        name: data.name || 'Cuidador',
        token: data.token || null
      };
    }
  } catch (e) {
    // Ignore
  }

  // Por defecto: modo invitado / anónimo sin conexión
  return {
    id: 'guest_user',
    isAnonymous: true,
    email: null,
    name: 'Invitado'
  };
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !user.isAnonymous;
};

/**
 * Establece la sesión activa (A invocar en el futuro cuando se complete el login)
 * @param {string} token
 * @param {Object} userData
 */
export const setSession = (token, userData) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      token,
      userId: userData.id,
      email: userData.email,
      name: userData.name,
      savedAt: new Date().toISOString()
    }));
  } catch (e) {
    console.warn('[Auth] No se pudo guardar la sesión:', e);
  }
};

/**
 * Cierra la sesión activa
 */
export const clearSession = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {
    // Ignore
  }
};
