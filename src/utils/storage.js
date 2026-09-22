/**
 * Safe client-side localStorage persistence helpers
 */

const STORAGE_KEYS = {
  THEME: 'gradecompass_theme',
  SEMESTER_SUBJECTS: 'gradecompass_semester_subjects',
  CALCULATOR_STATE: 'gradecompass_calc_state',
}

export function loadFromStorage(key, fallbackValue) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallbackValue
  } catch (err) {
    console.warn(`Could not read localStorage key: ${key}`, err)
    return fallbackValue
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn(`Could not write localStorage key: ${key}`, err)
  }
}

export { STORAGE_KEYS }

