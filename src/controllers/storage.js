/** Accès sécurisé au localStorage (navigation privée, stockage bloqué…). */
export function readJSON(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* stockage indisponible : on garde l'état en mémoire */
  }
}
