import { useEffect } from 'react'

/** Installed apps can remain open offline for an entire shift. */
export function usePwaUpdateCheck() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    const check = () => {
      if (!navigator.onLine || document.visibilityState === 'hidden') return
      void navigator.serviceWorker.getRegistration(import.meta.env.BASE_URL)
        .then((registration) => registration?.update())
        .catch(() => { /* An unavailable network must never interrupt a check. */ })
    }
    window.addEventListener('online', check)
    document.addEventListener('visibilitychange', check)
    const interval = window.setInterval(check, 60 * 60 * 1000)
    return () => {
      window.removeEventListener('online', check)
      document.removeEventListener('visibilitychange', check)
      window.clearInterval(interval)
    }
  }, [])
}
