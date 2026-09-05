import { describe, expect, it } from 'vitest'
import { getArticleCountLabel, getBasicLabel, getCategoryLabel, getMessage } from './i18n'

describe('Lokalisierung', () => {
  it('liefert deutsche und slowakische UI-Texte', () => {
    expect(getMessage('de-CH', 'searchQuestion')).toBe('Was möchtest du prüfen?')
    expect(getMessage('sk', 'searchQuestion')).toBe('Čo chceš skontrolovať?')
  })

  it('fällt bei unbekannter Sprache kontrolliert auf de-CH zurück', () => {
    expect(getMessage('fr', 'home')).toBe('Home')
  })

  it('lokalisiert Kategorien und Grundlagen', () => {
    expect(getCategoryLabel('sk', 'Sensorik')).toBe('Snímače')
    expect(getBasicLabel('sk', 'Sicherung')).toBe('Poistka')
  })

  it('dekliniert slowakische Artikelzahlen', () => {
    expect(getArticleCountLabel('sk', 1)).toBe('1 článok')
    expect(getArticleCountLabel('sk', 4)).toBe('4 články')
    expect(getArticleCountLabel('sk', 5)).toBe('5 článkov')
  })
})
