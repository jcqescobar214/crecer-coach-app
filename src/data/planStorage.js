// Gestión de persistencia local para "Mi Plan" de la app Crecer

const STORAGE_KEY = 'crecer_plan_habits';

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
      updated = existing.map(h => (h.id === habit.id || h.habitKey === habit.habitKey) ? { ...h, ...habit, updatedAt: new Date().toISOString() } : h);
    } else {
      updated = [
        ...existing,
        {
          ...habit,
          addedAt: new Date().toISOString(),
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
