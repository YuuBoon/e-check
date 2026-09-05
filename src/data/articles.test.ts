import { describe, expect, it } from 'vitest'
import { articles, localizedArticles } from './articles'
import { CONTENT_VERSION } from './meta'

describe('Artikeldaten', () => {
  it('vermischt slowakische Multimeter-Schritte und Ergebnisse nicht mit deutschen Positionen', () => {
    const source = articles.find((article) => article.id === 'multimeter-bedienen')!
    const translated = localizedArticles('sk').find((article) => article.id === source.id)!
    expect(translated.steps).toEqual(source.translations!.sk!.steps)
    expect(translated.results).toEqual(source.translations!.sk!.results)
    expect(translated.steps[2].measurement).toBe('Ω / spojitosť')
    expect(translated.steps[2].expected).toBeUndefined()
  })
  it('enthält 20 Artikel mit eindeutigen IDs', () => {
    expect(articles).toHaveLength(20)
    expect(new Set(articles.map((article) => article.id)).size).toBe(articles.length)
  })

  it('enthält alle Pflichtfelder und keine erfundenen leeren Schritte', () => {
    articles.forEach((article) => {
      expect(article.title).toBeTruthy()
      expect(article.category).toBeTruthy()
      expect(article.description).toBeTruthy()
      expect(article.keywords.length).toBeGreaterThan(4)
      expect(article.steps.length).toBeGreaterThan(2)
      expect(article.results.length).toBeGreaterThan(0)
      expect(article.steps.every((step) => step.title && step.instruction)).toBe(true)
      expect(article.contentVersion).toBe(CONTENT_VERSION)
      article.images.forEach((image) => {
        expect(image.src).toBeTruthy()
        expect(image.alt).toBeTruthy()
      })
    })
  })

  it('verweist nur auf vorhandene verwandte Artikel', () => {
    const ids = new Set(articles.map((article) => article.id))
    articles.forEach((article) => article.relatedArticles.forEach((id) => expect(ids.has(id)).toBe(true)))
  })

  it('liefert für jeden Artikel vollständigen slowakischen Kerninhalt', () => {
    localizedArticles('sk').forEach((article) => {
      expect(article.title).toBeTruthy()
      expect(article.description).toBeTruthy()
      expect(article.steps.length).toBeGreaterThan(2)
      expect(article.results.length).toBeGreaterThan(0)
      expect(article.translations?.sk).toBeTruthy()
    })
  })
})
