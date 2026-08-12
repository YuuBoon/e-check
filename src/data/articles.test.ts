import { describe, expect, it } from 'vitest'
import { articles } from './articles'

describe('Artikeldaten', () => {
  it('enthält die fünf MVP-Artikel mit eindeutigen IDs', () => {
    expect(articles).toHaveLength(5)
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
    })
  })

  it('verweist nur auf vorhandene verwandte Artikel', () => {
    const ids = new Set(articles.map((article) => article.id))
    articles.forEach((article) => article.relatedArticles.forEach((id) => expect(ids.has(id)).toBe(true)))
  })
})
