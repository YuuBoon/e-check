import { describe, expect, it } from 'vitest'
import { search } from './search'

describe('lokale Suche', () => {
  it.each([
    ['Initiator', 'Induktiven Sensor prüfen'],
    ['A1 A2', 'Schütz prüfen'],
    ['24v', '24 VDC prüfen'],
    ['multimter', 'Multimeter bedienen']
  ])('findet %s als %s', (query, title) => {
    expect(search(query)[0]?.title).toBe(title)
  })

  it('findet Artikel und Störung für Motor läuft nicht', () => {
    const titles = search('Motor läuft nicht').map((result) => result.title)
    expect(titles).toContain('Drehstrommotor ausmessen')
    expect(titles).toContain('Störung: Motor läuft nicht')
  })

  it('priorisiert einen Titeltreffer vor einem Beschreibungstreffer', () => {
    expect(search('Schütz')[0]?.title).toBe('Schütz prüfen')
  })

  it('ignoriert Groß-/Kleinschreibung und Akzente', () => {
    expect(search('NÄHERUNGSSENSOR')[0]?.title).toBe('Induktiven Sensor prüfen')
  })
})
