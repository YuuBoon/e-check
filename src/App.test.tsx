// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { I18nProvider } from './i18n'

vi.mock('virtual:pwa-register/react', () => ({
  useRegisterSW: () => ({ needRefresh: [false, vi.fn()], updateServiceWorker: vi.fn() })
}))

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('echeck:prefs:v1:safety-seen', '1')
    window.scrollTo = vi.fn()
  })

  it('wechselt die gesamte Startseite auf Slowakisch', async () => {
    render(<I18nProvider><App /></I18nProvider>)
    await userEvent.click(screen.getByRole('button', { name: 'SK' }))
    expect(screen.getByText('Čo chceš skontrolovať?')).toBeTruthy()
    expect(screen.getByText('Motor nebeží')).toBeTruthy()
    expect(document.documentElement.lang).toBe('sk')
  })

  it('öffnet die zentrale Störungssuche', async () => {
    render(<I18nProvider><App /></I18nProvider>)
    await userEvent.click(screen.getByRole('button', { name: /Motor läuft nicht/i }))
    expect(screen.getByText('Hat der Motor einen Frequenzumrichter?')).toBeTruthy()
  })
})
