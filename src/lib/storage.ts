const STORAGE_PREFIX = 'echeck:prefs:v1:'

export function readPreference(key: string, legacyKey?: string): string | null {
  if (typeof window === 'undefined') return null
  try {
    const value = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`)
    return value ?? (legacyKey ? window.localStorage.getItem(legacyKey) : null)
  } catch {
    return null
  }
}

export function writePreference(key: string, value: string, legacyKey?: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, value)
    if (legacyKey) window.localStorage.removeItem(legacyKey)
  } catch {
    // Preferences remain session-local if storage is unavailable.
  }
}
