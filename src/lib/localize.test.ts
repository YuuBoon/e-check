import { expect, it } from 'vitest'
import { withFallback } from './localize'

it('never combines differently structured translated steps by position', () => {
  const source = { title: 'Prüfen', steps: [
    { instruction: 'Messen', warning: 'Nur spannungsfrei' },
    { instruction: 'Vergleichen' }
  ] }
  expect(withFallback(source, { title: ' ', steps: [{ instruction: 'Meraj' }] })).toEqual({
    title: 'Prüfen', steps: [
      { instruction: 'Meraj' }
    ]
  })
})

it('does not replace source content with empty translations', () => {
  expect(withFallback(['Hinweis'], [])).toEqual(['Hinweis'])
  expect(withFallback('Deutsch', undefined)).toBe('Deutsch')
})
