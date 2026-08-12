import { articles } from '../data/articles'

export interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  type: 'article' | 'fault'
  score: number
}

const normalize = (value: string) => value
  .toLocaleLowerCase('de')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j += 1) {
      const current = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1))
      previous = current
    }
  }
  return row[b.length]
}

const fuzzyTokenMatch = (query: string, value: string) => {
  const queryTokens = normalize(query).split(' ').filter(Boolean)
  const valueTokens = normalize(value).split(' ').filter(Boolean)
  return queryTokens.every((queryToken) => valueTokens.some((valueToken) => {
    if (valueToken.includes(queryToken) || queryToken.includes(valueToken)) return true
    const tolerance = queryToken.length >= 8 ? 2 : queryToken.length >= 5 ? 1 : 0
    return distance(queryToken, valueToken) <= tolerance
  }))
}

function fieldScore(query: string, values: string[], weight: number): number {
  const normalizedQuery = normalize(query)
  let best = 0
  values.forEach((value) => {
    const normalizedValue = normalize(value)
    if (normalizedValue === normalizedQuery) best = Math.max(best, weight + 30)
    else if (normalizedValue.includes(normalizedQuery)) best = Math.max(best, weight + 18)
    else if (fuzzyTokenMatch(query, value)) best = Math.max(best, weight)
  })
  return best
}

export function search(query: string): SearchResult[] {
  if (!normalize(query)) return []
  const articleResults = articles.map((article) => {
    const score = Math.max(
      fieldScore(query, [article.title], 100),
      fieldScore(query, article.keywords, 80),
      fieldScore(query, article.symptoms, 60),
      fieldScore(query, article.manufacturers, 40),
      fieldScore(query, [article.description], 20),
      fieldScore(query, [article.category], 10)
    )
    return { id: article.id, title: article.title, description: article.description, category: article.category, type: 'article' as const, score }
  }).filter((result) => result.score > 0)

  const faultScore = Math.max(
    fieldScore(query, ['Störung: Motor läuft nicht'], 100),
    fieldScore(query, ['motor läuft nicht', 'motor brummt', 'motor startet nicht'], 80)
  )
  const faultResults: SearchResult[] = faultScore ? [{
    id: 'motor-laeuft-nicht', title: 'Störung: Motor läuft nicht',
    description: 'Geführte Fehlersuche mit einem Prüfschritt pro Ansicht.',
    category: 'Störungssuche', type: 'fault', score: faultScore
  }] : []

  return [...articleResults, ...faultResults].sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'de'))
}

export { normalize }
