import { describe, expect, it } from 'vitest'
import { search } from './search'
import { localizedArticles } from '../data/articles'

describe('lokale Suche', () => {
  it('wertet einzelne Buchstaben nicht als Treffer in beliebigen längeren Wörtern', () => {
    expect(search('multimter').some((result) => result.id === 'komponenten-schaltschrank-erkennen')).toBe(false)
  })
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

  it('findet Synonyme', () => {
    expect(search('Leitungsschutzschalter')[0]?.id).toBe('sicherung-leitungsschutz-pruefen')
  })

  it('durchsucht slowakische Inhalte und Suchbegriffe', () => {
    const results = search('istič', localizedArticles('sk'), 'sk')
    expect(results[0]?.id).toBe('sicherung-leitungsschutz-pruefen')
  })
})
